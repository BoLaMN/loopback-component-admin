'use strict'

angular.module 'loopback-admin'

.directive 'lbBelongsToProperty', ->
  scope:
    property: '='
    value: '='
    form: '='
    errorMessages: '='
  templateUrl: 'templates/property/belongs-to.tpl.html'
  restrict: 'E'
  link: (scope, element) ->
    property = scope.property

    scope.model = property.getModel()

    { resource } = scope.model

    scope.count = 0
    scope.rows = []

    for value in scope.value
      scope.rows.push new resource value
      scope.count++

    scope.name = property.name
    scope.v = property.validation

    return