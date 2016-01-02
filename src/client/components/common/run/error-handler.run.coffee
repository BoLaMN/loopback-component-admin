'use strict'

angular.module 'loopback-admin'

.run ($state, $window, $rootScope, $log, LoopBackAdminConfiguration) ->
  User = LoopBackAdminConfiguration.userModel

  $rootScope.$on '$stateChangeSuccess', ->
    $window.scrollTo 0, 0

  $rootScope.$on '$stateChangeError', (event, toState, toParams, fromState, fromParams, error) ->
    if error.status is 404
      $state.go 'error'
      event.preventDefault()
    else if error.status is 401
      $state.go 'logout'
    else
      $log.error 'State change error: ' + error.message
      throw error

    return

  $rootScope.$on '$stateChangeStart', ($event, toState, toParams, fromState, fromParams) ->
    if !User.isAuthenticated()
      if toState.name isnt 'login' and toState.name isnt 'register' and toState.name isnt 'landing'
        $event.preventDefault()

        changeState = $state.go 'login'

        changeState.then ->
          $rootScope.$broadcast '$stateChangeSuccess', toState.self, toParams, fromState.self, fromParams
          return

      return true
    true

  return
