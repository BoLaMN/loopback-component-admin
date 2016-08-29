'use strict'

angular.module 'loopback-admin'

.controller 'logoutController', ($location, $rootScope, LoopBackAdminConfiguration) ->
  User = LoopBackAdminConfiguration.userModel
  User.logout()

  $location.path '/login'

  return
