'use strict'

angular.module 'loopback-admin'

.directive 'lbDateProperty', ->
  scope:
    property: '='
    value: '='
  restrict: 'E'
  templateUrl: 'templates/property/date.tpl.html'
  link: (scope, element) ->
    property = scope.property

    scope.name = property.name
    scope.rawValue = scope.value

    scope.$watch 'rawValue', (rawValue) ->
      scope.value = property.parse(rawValue)
      return

    scope.v = property.validation

    return
