'use strict'

angular.module 'loopback-admin'

.factory 'HasManyProperty', (Property, LoopBackAdminConfiguration) ->
  class HasManyProperty extends Property
    constructor: (name, property) ->
      super name, property

      @type = "hasMany"

    getModel: ->
      LoopBackAdminConfiguration.getModel @model
