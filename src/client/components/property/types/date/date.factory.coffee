'use strict'

angular.module 'loopback-admin'

.factory 'DateProperty', (Property) ->
  class DateProperty extends Property
    constructor: (name, property) ->
      super name, property

      @format = null

      @parse = (date = null) ->
        if date instanceof Date
          return date
        else if angular.isString date
          return new Date date
        else null

      @type = "date"

      return

.factory 'DateTimeProperty', (DateProperty) ->
  class DateTimeProperty extends DateProperty
    constructor: (name, property) ->
      super name, property

      @format = null

      @parse = (date) ->
        return date

      @type = 'datetime'

