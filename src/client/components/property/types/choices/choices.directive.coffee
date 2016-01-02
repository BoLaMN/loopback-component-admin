'use strict'

angular.module 'loopback-admin'

.directive 'lbChoicesProperty', ($compile, $templateCache) ->
  scope:
    property: '='
    value: '='
    row: '=?'
  restrict: 'E'
  templateUrl: 'templates/property/choices.tpl.html'
  compile: ->
    pre: (scope, element) ->
      property = scope.property

      scope.name = property.name
      scope.v = property.validation

      choices = if property.choices then property.choices else []

      scope.choices = if typeof choices == 'function' then choices(scope.row) else choices

    post: (scope) ->
      listener = scope.$on 'choices:update', (e, data) ->
        scope.scope.choices = data.choices
        scope.$root.$$phase or scope.$digest()

      scope.$on '$destroy', ->
        listener()

      return
