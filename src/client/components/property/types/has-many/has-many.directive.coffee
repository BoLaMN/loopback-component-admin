'use strict'

angular.module 'loopback-admin'

.directive 'lbHasManyProperty', ->
  scope:
    property: '='
    value: '='
    form: '='
    errorMessages: '='
  templateUrl: 'templates/property/has-many.tpl.html'
  restrict: 'E'
  link: (scope, element) ->
    property = scope.property

    scope.model = property.getModel()

    resource = scope.model.resource

    scope.count = 0
    scope.rows = []

    for value in scope.value
      scope.rows.push new resource value
      scope.count++

    scope.name = property.name
    scope.v = property.validation

    return