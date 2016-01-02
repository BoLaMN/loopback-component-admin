'use strict'

cors = require 'cors'
path = require 'path'
url = require 'url'
fs  = require 'fs'

{ defaults } = require 'lodash'

createUser = require './create-user'
generateAdminSpec = require './admin-spec'

STATIC_ROOT = path.join __dirname, 'public'

attachXTotalCount = (loopbackApplication) ->
  remotes = loopbackApplication.remotes()

  remotes.after '*.find', (ctx, next) ->
    filter = undefined

    if ctx.args and ctx.args.filter
      filter = JSON.parse(ctx.args.filter).where

    if !ctx.res._headerSent
      @count filter, (err, count) ->
        ctx.res.set 'Access-Control-Expose-Headers', 'X-Total-Count'
        ctx.res.set 'X-Total-Count', count
        next()
        return
    else
      next()

    return
  return

writeConfig = (config) ->
  configJSON = JSON.stringify config

  configJS = """
    angular.module('loopback-admin')

    .config(["LoopBackAdminConfigurationProvider", function(LoopBackAdminConfigurationProvider) {
      LoopBackAdminConfigurationProvider.setConfig(#{ configJSON });
    }]);
  """

  fs.writeFileSync(path.join(__dirname, 'public/js/loopback-admin.config.js'), configJS, 'utf-8')

  return

mountAdmin = (loopbackApplication, adminApp, opts) ->
  generateAdminSpec loopbackApplication, opts, (adminObject) ->
    resourcePath = opts.resourcePath

    if resourcePath[0] isnt '/'
      resourcePath = '/' + resourcePath

    remotes = loopbackApplication.remotes()

    setupCors adminApp, remotes

    adminApp.get resourcePath, (req, res) ->
      res.status(200).send adminObject
      return
    return

setupCors = (adminApp, remotes) ->
  corsOptions = remotes.options and remotes.options.cors or
    origin: true
    credentials: true

  adminApp.use cors(corsOptions)

  return

routes = (loopbackApplication, options) ->
  loopback = loopbackApplication.loopback

  options = defaults({}, options,
    resourcePath: 'config.json'
    mountPath: '/admin'
    userModel: 'User'
    apiInfo: loopbackApplication.get('apiInfo') or {})

  router = new loopback.Router()

  attachXTotalCount loopbackApplication
  # createUser loopbackApplication, options
  mountAdmin loopbackApplication, router, options
  writeConfig options

  router.use loopback.static STATIC_ROOT

  router

module.exports = (loopbackApplication, options) ->
  options = defaults {}, options, mountPath: '/admin'

  loopbackApplication.use options.mountPath, routes(loopbackApplication, options)
  loopbackApplication.set 'loopback-component-admin', options

  loopbackApplication.once 'started', ->
    baseUrl = loopbackApplication.get('url').replace /\/$/, ''
    adminPath = options.mountPath or options.route

    console.log 'Browse your Admin UI at %s%s', baseUrl, adminPath

  return