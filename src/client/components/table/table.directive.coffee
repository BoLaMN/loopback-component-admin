'use strict'

angular.module 'loopback-admin'

.directive 'cmsTable', ->
  bindToController:
    properties: '='
    columnLimit: '='
    model: '='
    template: '@'
  controller: 'TableCtrl'
  controllerAs: 'table'
  scope: {}
  templateUrl: 'templates/table/table.tpl.html'
