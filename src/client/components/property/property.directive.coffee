'use strict'

angular.module 'loopback-admin'

.directive 'lbProperty', ->
  restrict: 'E'
  scope:
    property: '='
    row: '='
    model: '='
    errorMessages: '='
    form: '='
  template: """<div id="row-{{ property.name }}" ng-include="property.type + '-field'"></div>"""
