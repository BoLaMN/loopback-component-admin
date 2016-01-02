'use strict'

angular.module 'loopback-admin'

.filter 'numeraljs', ->
  (input, format) ->
    if input == null or format == null
      return input
    if format == ''
      return ''
    numeral(input).format format

