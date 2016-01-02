'use strict'

angular.module 'loopback-admin'

.directive 'lbChoicesColumn', ->
  restrict: 'E'
  scope:
    values: '='
  templateUrl: 'templates/table/column/choices.tpl.html'