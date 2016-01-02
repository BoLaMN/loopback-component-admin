'use strict'

angular.module 'loopback-admin'

.directive 'lbBooleanColumn', ->
  restrict: 'E'
  scope:
    value: '='
  templateUrl: 'templates/table/column/boolean.tpl.html'
  link: (scope) ->
    scope.isOk = ! !scope.value

    return
