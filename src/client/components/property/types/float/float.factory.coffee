'use strict'

angular.module 'loopback-admin'

.factory 'FloatProperty', (NumberProperty) ->
  class FloatProperty extends NumberProperty
    constructor: (name, property) ->
      super name, property

      @type = 'float'

      @format = '0.000'

