'use strict'

angular.module 'loopback-admin'

.filter 'modelToHuman', ->
  (input = '') ->
    input.replace /([a-z])([A-Z])/g, '$1 $2'
