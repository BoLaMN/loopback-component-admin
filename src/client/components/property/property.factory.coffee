'use strict'

angular.module 'loopback-admin'

.factory 'Property', (stringUtils) ->
  class Property
    constructor: (name, property = {}) ->
      @default = null

      @name = name or Math.random().toString(36).substring(7)
      @label = stringUtils.camelCase @name

      @type = "string"

      @validation =
        required: false
        minlength: 0
        maxlength: 99999

      for own key, value of property
        @[key] = value

      @type = @type.toLowerCase()
