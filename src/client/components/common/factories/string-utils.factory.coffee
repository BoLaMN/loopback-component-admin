'use strict'

angular.module 'loopback-admin'

.provider 'stringUtils', ->
  camelCase: (text) ->
    if !text
      return text

    f = text.charAt(0).toUpperCase()
    text = f + text.substr(1)

    return text.replace /[-_.\s](.)/g, (match, group1) ->
      return ' ' + group1.toUpperCase()

  $get: -> camelCase: @camelCase
