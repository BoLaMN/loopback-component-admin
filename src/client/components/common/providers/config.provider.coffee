'use strict'

angular.module 'loopback-admin'

.provider 'LoopBackAdminConfiguration', (LoopBackResourceProvider) ->
  config = null
  initialized = false
  configOptions = null

  setConfig: (newConfig) ->
    configOptions = newConfig

  $get: (Model, $q, $http, $injector) ->

    buildMenuFromModels = ->
      application.models
        .map (model) ->
          name: model.label
          state: "list"
          params:
            model: model.name

    application =
      models: []

      urlBase: LoopBackResourceProvider.getUrlBase()

      options: configOptions

      defaultErrorMessage: (response) ->
        body = response.data

        if typeof body is 'object'
          body = JSON.stringify(body)

        'Oops, an error occured else (code: ' + response.status + ') ' + body

      errorMessage: @defaultErrorMessage

      getErrorMessage: (response) ->
        if typeof(@errorMessage) is 'function'
          return @errorMessage(response)

        @errorMessage

      userModel: $injector.get configOptions.userModel
      userLoginField: configOptions.userLoginField

      addModel: (model) ->
        if !model
          throw new Error "No model given"

        foundModel = @getModelByName @models, model.name

        if not foundModel
          @models.push model

        @

      getModel: (modelName) ->
        foundModel = @getModelByName @models, modelName

        if !foundModel
          foundModel = @getModelByName @config.models, modelName

          if foundModel
            foundModel = new Model modelName, foundModel

            @addModel foundModel

        return foundModel

      getModels: ->
        defer = $q.defer()

        application.initialize().then (cfg) ->
          defer.resolve cfg.models

        defer.promise

      getModelByName: (models, modelName) ->
        models
          .filter((e) -> e.name is modelName)[0]

      initialize: ->
        defer = $q.defer()

        if initialized and application.models.length
          defer.resolve application
        else
          if angular.isString configOptions.resourcePath
            $http.get configOptions.resourcePath
              .success (data) ->
                { models } = data

                application.config = data

                for model in models
                  application.addModel new Model model.name, model

                application.menu = buildMenuFromModels()

                defer.resolve application
                initialized = true

              .error (err) -> defer.reject err
          else defer.resolve application

        defer.promise

    application