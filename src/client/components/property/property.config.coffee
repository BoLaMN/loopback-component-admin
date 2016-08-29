'use strict'

angular.module 'loopback-admin'

.provider 'PropertyTypeConfiguration', ($injector) ->
  propertyTypes = {}

  registerPropertyType: (type, PropertyType) ->
    if type is 'string' or type is 'objectid'
      PropertyType = ''

    propertyTypes[type] = PropertyType + 'Property'

  $get: -> propertyTypes

.provider 'PropertyViewConfiguration', (PropertyTypeConfigurationProvider, stringUtilsProvider) ->
  { camelCase } = stringUtilsProvider
  { registerPropertyType } = PropertyTypeConfigurationProvider

  propertyViews = {}

  registerAlias: (alias, type) ->
    if propertyViews[type]
      propertyViews[alias] = propertyViews[type]
      registerPropertyType alias, camelCase type
    else
      console.warn 'no such type defined for', type, alias

  registerPropertyView: (type, PropertyView) ->
    propertyViews[type] = PropertyView
    registerPropertyType type, camelCase type

    return

  $get: -> propertyViews

.run ($templateCache, PropertyViewConfiguration) ->

  Object.keys(PropertyViewConfiguration).forEach (propertyName) ->
    propery = PropertyViewConfiguration[propertyName]

    $templateCache.put propertyName + '-column', propery.column
    $templateCache.put propertyName + '-field', propery.field