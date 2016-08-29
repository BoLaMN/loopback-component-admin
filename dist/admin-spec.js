'use strict';
var _models, clone, defaults, extend, formatProperties, fs, getModelInfo, path, ref, services;

fs = require('fs');

ref = require('lodash'), defaults = ref.defaults, extend = ref.extend, clone = ref.clone;

services = require('loopback-sdk-angular').services;

path = require('path');

formatProperties = function(properties) {
  var key, result;
  result = {};
  for (key in properties) {
    result[key] = clone(properties[key]);
    if (Array.isArray(properties[key].type)) {
      result[key].type = 'Array';
      result[key].subtype = properties[key].type[0];
    } else {
      result[key].type = properties[key].type.name;
    }
  }
  return result;
};

_models = {};

getModelInfo = function(loopbackApplication, modelName) {
  var baseModel, baseProperties, keys, model, properties, result;
  if (_models[modelName]) {
    return _models[modelName];
  }
  model = loopbackApplication.models[modelName];
  baseModel = void 0;
  baseProperties = void 0;
  if (model.definition.base) {
    baseModel = getModelInfo(loopbackApplication, model.definition.base);
    baseProperties = formatProperties(baseModel.definition.properties);
  }
  properties = formatProperties(model.definition.properties);
  result = {
    name: model.definition.name,
    properties: extend(properties, baseProperties)
  };
  keys = ['description', 'plural', 'idInjection', 'persistUndefinedAsNull', 'strict', 'hidden', 'validations', 'relations', 'acls', 'methods', 'mixins'];
  keys.forEach(function(key) {
    var ref1, ref2;
    result[key] = (ref1 = model.definition) != null ? (ref2 = ref1.settings) != null ? ref2[key] : void 0 : void 0;
  });
  _models[modelName] = result;
  return result;
};

module.exports = function(loopbackApplication, options, callback) {
  var api, handler, host, models, mountPath, port, sdkFile, sdkFilePath, url;
  mountPath = options.mountPath;
  host = loopbackApplication.get('host');
  port = loopbackApplication.get('port');
  api = loopbackApplication.get('restApiRoot');
  url = options.url || 'http://' + host + ':' + port + api;
  sdkFile = services(loopbackApplication, 'loopback-admin.services', url);
  sdkFilePath = path.join(__dirname, 'public/js/loopback-admin.resources.js');
  fs.writeFileSync(sdkFilePath, sdkFile, 'utf-8');
  handler = loopbackApplication.handler('rest');
  models = [];
  process.nextTick(function() {
    var config, configFile, configJSON;
    handler.adapter.getClasses().forEach(function(modelClass) {
      if (modelClass.ctor) {
        return models.push(getModelInfo(loopbackApplication, modelClass.name));
      }
    });
    config = {
      options: options,
      models: models.sort()
    };
    configFile = path.join(__dirname, 'public/config.json');
    configJSON = JSON.stringify(config);
    fs.writeFileSync(configFile, configJSON, 'utf-8');
    callback(configJSON);
  });
};
