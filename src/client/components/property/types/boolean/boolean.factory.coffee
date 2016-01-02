'use strict'

angular.module 'loopback-admin'

.factory 'BooleanProperty', (ChoiceProperty) ->
  class BooleanProperty extends ChoiceProperty
    constructor: (name, property) ->
      super name, property

      @type = "boolean"

      @choices = [
        { value: null, label: 'undefined' },
        { value: true, label: 'true' },
        { value: false, label: 'false' }
      ]

