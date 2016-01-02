'use strict'

angular.module 'loopback-admin'

.factory 'ChoicesProperty', (ChoiceProperty) ->
  class ChoicesProperty extends ChoiceProperty
    constructor: (name, property) ->
      super name, property

      @type = "choices"

