'use strict'

angular.module 'loopback-admin'

.factory 'NumberProperty', (Property) ->
  class NumberProperty extends Property
    constructor: (name, property) ->
      super name, property

      @type = "number"

      @format = undefined
