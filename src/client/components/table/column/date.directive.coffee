'use strict'

angular.module 'loopback-admin'

.directive 'lbDateColumn', ->
  restrict: 'E'
  scope:
    value: '='
    property: '='
  templateUrl: 'templates/table/column/date.tpl.html'
  link: (scope) ->
    property = scope.property
    scope.format = property.format

    if !scope.format
      scope.format = if property.type == 'date' then 'yyyy-MM-dd' else 'yyyy-MM-dd HH:mm:ss'

    return
