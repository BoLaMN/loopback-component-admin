'use strict'

angular.module 'loopback-admin'

.directive 'lbChoiceProperty', ->
  scope:
    property: '='
    value: '='
    row: '=?'
  restrict: 'E'
  templateUrl: 'templates/property/choice.tpl.html'
  compile: ->
    pre: (scope, element) ->
      property = scope.property

      scope.name = property.name
      scope.v = property.validation

      scope.$watch 'value', (newValue, oldValue) ->
        if newValue != oldValue and newValue == undefined
          scope.value = null
        return

      choices = if property.choices then property.choices else []

      scope.choices = if typeof choices is 'function' then choices(scope.row) else choices

      return
    post: (scope) ->
      updateChoices = (choices) ->
        scope.choices = choices
        scope.$root.$$phase or scope.$digest()

      listener = scope.$on 'choices:update', (e, data) ->
        updateChoices data.choices

      scope.$on '$destroy', ->
        listener()

      return
