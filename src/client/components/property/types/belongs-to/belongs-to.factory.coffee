'use strict'

angular.module 'loopback-admin'

.factory 'BelongsToProperty', (Property, LoopBackAdminConfiguration) ->
  class BelongsToProperty extends Property
    constructor: (name, property) ->
      super name, property

      @type = "belongsTo"

    getModel: ->
      LoopBackAdminConfiguration.getModel @model
