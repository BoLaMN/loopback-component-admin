'use strict'

angular.module 'loopback-admin'

.factory 'LoopbackInjector', ($injector) ->
  (modelName) ->
    if $injector.has modelName
      return $injector.get modelName
    else
      undefined