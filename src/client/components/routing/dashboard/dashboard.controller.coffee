'use strict'

angular.module 'loopback-admin'

.controller 'DashboardController', (models) ->
  vm = this

  vm.models = models

  return

