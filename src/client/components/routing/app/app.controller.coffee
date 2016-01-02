'use strict'

angular.module 'loopback-admin'

.controller 'BrowserController', ($scope, $state, LoopBackAdminConfiguration) ->
  vm = this

  application = LoopBackAdminConfiguration

  vm.menu = application.menu

  return