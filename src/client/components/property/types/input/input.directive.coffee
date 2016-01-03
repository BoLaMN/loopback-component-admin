'use strict'

angular.module 'loopback-admin'

.directive 'lbInputProperty', ->
  scope:
    property: '='
    value: '='
    form: '='
    errorMessages: '='
  templateUrl: 'templates/property/input.tpl.html'
  restrict: 'E'
  link: (scope, element) ->
    property = scope.property

    scope.name = property.name
    scope.v = property.validation

    return