'use strict'

angular.module 'loopback-admin'

.directive 'lbCheckboxProperty', ->
  scope:
    property: '='
    value: '='
  restrict: 'E'
  templateUrl: 'templates/property/checkbox.tpl.html'
  link: (scope, element) ->
    property = scope.property

    scope.name = property.name
    scope.v = property.validation

    scope.value = ! !scope.value

    return
