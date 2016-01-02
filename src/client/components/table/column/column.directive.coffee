'use strict'

angular.module 'loopback-admin'

.directive 'lbColumn', ->
  restrict: 'E'
  scope:
    property: '='
    row: '='
    model: '='
    rows: '='
  template: """<span ng-include="property.type + '-column'"></span>"""
