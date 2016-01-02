'use strict'

angular.module 'loopback-admin'

.controller 'registerController', ($state, LoopBackAdminConfiguration) ->
  vm = this

  User = LoopBackAdminConfiguration.userModel

  vm.login = ->
    request = User.login vm.data

    request.$promise
      .then (data) ->
        $state.go 'dashboard'
        return
      .catch (err) ->
        vm.error = err
        return

  return
