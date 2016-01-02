'use strict'

angular.module 'loopback-admin'

.directive 'lbStringColumn', ->
  restrict: 'E'
  scope:
    value: '='
  templateUrl: 'templates/table/column/string.tpl.html'