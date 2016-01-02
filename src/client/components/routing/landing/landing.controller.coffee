'use strict'

angular.module 'loopback-admin'

.controller 'LandingPageController', (background) ->
  vm = this

  vm.background = background

  return
