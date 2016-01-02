'use strict'

angular.module 'loopback-admin'

.directive 'uiSelectRequired', ->
  restrict: 'A'
  require: 'ngModel'
  link: (scope, elm, attrs, ctrl) ->

    ctrl.$validators.uiSelectRequired = (modelValue, viewValue) ->
      if angular.isArray(modelValue)
        determineVal = modelValue
      else if angular.isArray(viewValue)
        determineVal = viewValue
      else return false

      determineVal.length > 0

    return
