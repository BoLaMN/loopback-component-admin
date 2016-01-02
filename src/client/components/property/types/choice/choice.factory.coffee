'use strict'

angular.module 'loopback-admin'

.factory 'ChoiceProperty', (Property) ->
  class ChoiceProperty extends Property
    constructor: (name, property) ->
      super name, property

      @type = "choice"
      @choices = []

      return

    getLabelForChoice: (value, row) ->
      choices = if typeof(@choices) is 'function' then @choices(row) else @choices

      choice = choices
        .filter (c) -> c.value is value
        .pop()

      if choice
        choice.label
      else null

