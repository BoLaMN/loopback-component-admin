'use strict'

fs = require 'fs'

{ defaults,
  extend,
  clone } = require 'lodash'

{ services } = require 'loopback-sdk-angular'

path = require 'path'

formatProperties = (properties) ->
  result = {}

  for key of properties
    result[key] = clone properties[key]

    if Array.isArray properties[key].type
      result[key].type = 'Array'
      result[key].subtype = properties[key].type[0]
    else
      result[key].type = properties[key].type.name

  result

_models = {}

getModelInfo = (loopbackApplication, modelName) ->
  if _models[modelName]
    return _models[modelName]

  model = loopbackApplication.models[modelName]

  baseModel = undefined
  baseProperties = undefined

  if model.definition.base
    baseModel = getModelInfo loopbackApplication, model.definition.base
    baseProperties = formatProperties baseModel.definition.properties

  properties = formatProperties model.definition.properties

  result =
    name: model.definition.name
    properties: extend properties, baseProperties

  keys = [
    'description'
    'plural'
    'idInjection'
    'persistUndefinedAsNull'
    'strict'
    'hidden'
    'validations'
    'relations'
    'acls'
    'methods'
    'mixins'
  ]

  keys.forEach (key) ->
    result[key] = model.definition?.settings?[key]
    return

  _models[modelName] = result

  result

module.exports = (loopbackApplication, options, callback) ->
  mountPath = options.mountPath

  host = loopbackApplication.get 'host'
  port = loopbackApplication.get 'port'
  api  = loopbackApplication.get 'restApiRoot'

  url = 'http://' + host + ':' + port + api

  sdkFile = services loopbackApplication, 'loopback-admin.services', url
  sdkFilePath = path.join __dirname, 'public/js/loopback-admin.resources.js'

  fs.writeFileSync sdkFilePath, sdkFile, 'utf-8'

  handler = loopbackApplication.handler 'rest'
  models = []

  process.nextTick ->
    handler.adapter.getClasses().forEach (modelClass) ->
      if modelClass.ctor
        models.push getModelInfo loopbackApplication, modelClass.name

    config =
      options: options
      models: models.sort()

    configFile = path.join __dirname, 'public/config.json'
    configJSON = JSON.stringify config

    fs.writeFileSync configFile, configJSON, 'utf-8'

    callback configJSON

    return
  return
