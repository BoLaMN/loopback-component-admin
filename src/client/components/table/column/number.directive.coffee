'use strict'

angular.module 'loopback-admin'

.directive 'lbNumberColumn', ->
  restrict: 'E'
  scope:
    value: '='
    property: '='
  templateUrl: 'templates/table/column/number.tpl.html'
