'use strict'

angular.module 'loopback-admin'

.factory 'entryFormatter', ($filter) ->

  formatDate: (format) ->
    (date) -> $filter('date') new Date(date), format

  formatNumber: (format) ->
    (number) -> $filter('numeraljs') number, format

  formatProperty: (property) ->
    label = property.label or property.name
    type = property.type

    switch type
      when 'boolean', 'choice', 'choices', 'string', 'text', 'wysiwyg', 'email', 'json', 'file', 'template'
        (entry) ->
          name: label
          value: entry.values[property.name]

      when 'number', 'float'
        format = property.format
        formatNumber = @formatNumber(format)

        (entry) ->
          name: label
          value: formatNumber(entry.values[property.name])

      when 'date', 'datetime'
        format = property.format

        if !format
          format = if type == 'date' then 'yyyy-MM-dd' else 'yyyy-MM-dd HH:mm:ss'

        formatDate = @formatDate(format)

        (entry) ->
          name: label
          value: formatDate(entry.values[property.name])

      when 'reference'
        (entry) ->
          name: label
          value: entry.values[property.name]

      when 'referenced_many', 'referenced_list'
        return

    return

  getFormatter: (properties) ->
    propertiesFormatters = properties.map @formatProperty.bind(this)

    (entry) ->
      result = {}

      propertiesFormatters
        .map (formatter) ->
          if !formatter
            return
          formatter entry
        .forEach (property) ->
          if !property
            return
          result[property.name] = property.value
          return

      result