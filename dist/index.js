'use strict';
var STATIC_ROOT, attachXTotalCount, cors, createUser, defaults, fs, generateAdminSpec, mountAdmin, path, routes, setupCors, url, writeConfig;

cors = require('cors');

path = require('path');

url = require('url');

fs = require('fs');

defaults = require('lodash').defaults;

createUser = require('./create-user');

generateAdminSpec = require('./admin-spec');

STATIC_ROOT = path.join(__dirname, 'public');

attachXTotalCount = function(loopbackApplication) {
  var remotes;
  remotes = loopbackApplication.remotes();
  remotes.after('*.find', function(ctx, next) {
    var filter;
    filter = void 0;
    if (ctx.args && ctx.args.filter) {
      filter = JSON.parse(ctx.args.filter).where;
    }
    if (!ctx.res._headerSent) {
      this.count(filter, function(err, count) {
        ctx.res.set('Access-Control-Expose-Headers', 'X-Total-Count');
        ctx.res.set('X-Total-Count', count);
        next();
      });
    } else {
      next();
    }
  });
};

writeConfig = function(config) {
  var configJS, configJSON;
  configJSON = JSON.stringify(config);
  configJS = "angular.module('loopback-admin')\n\n.config([\"LoopBackAdminConfigurationProvider\", function(LoopBackAdminConfigurationProvider) {\n  LoopBackAdminConfigurationProvider.setConfig(" + configJSON + ");\n}]);";
  fs.writeFileSync(path.join(__dirname, 'public/js/loopback-admin.config.js'), configJS, 'utf-8');
};

mountAdmin = function(loopbackApplication, adminApp, opts) {
  return generateAdminSpec(loopbackApplication, opts, function(adminObject) {
    var remotes, resourcePath;
    resourcePath = opts.resourcePath;
    if (resourcePath[0] !== '/') {
      resourcePath = '/' + resourcePath;
    }
    remotes = loopbackApplication.remotes();
    setupCors(adminApp, remotes);
    adminApp.get(resourcePath, function(req, res) {
      res.status(200).send(adminObject);
    });
  });
};

setupCors = function(adminApp, remotes) {
  var corsOptions;
  corsOptions = remotes.options && remotes.options.cors || {
    origin: true,
    credentials: true
  };
  adminApp.use(cors(corsOptions));
};

routes = function(loopbackApplication, options) {
  var loopback, router;
  loopback = loopbackApplication.loopback;
  options = defaults({}, options, {
    resourcePath: 'config.json',
    mountPath: '/admin',
    userModel: 'User',
    userLoginField: 'username',
    apiInfo: loopbackApplication.get('apiInfo') || {}
  });
  router = new loopback.Router();
  attachXTotalCount(loopbackApplication);
  mountAdmin(loopbackApplication, router, options);
  writeConfig(options);
  router.use(loopback["static"](STATIC_ROOT));
  return router;
};

module.exports = function(loopbackApplication, options) {
  options = defaults({}, options, {
    mountPath: '/admin'
  });
  loopbackApplication.use(options.mountPath, routes(loopbackApplication, options));
  loopbackApplication.set('loopback-component-admin', options);
  loopbackApplication.once('started', function() {
    var adminPath, baseUrl;
    baseUrl = loopbackApplication.get('url').replace(/\/$/, '');
    adminPath = options.mountPath || options.route;
    return console.log('Browse your Admin UI at %s%s', baseUrl, adminPath);
  });
};
