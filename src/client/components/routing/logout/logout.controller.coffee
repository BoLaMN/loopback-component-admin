'use strict'

angular.module 'loopback-admin'

.controller 'logoutController', ($location, $rootScope, User) ->
  User.logout()

  $location.path '/login'

  return
