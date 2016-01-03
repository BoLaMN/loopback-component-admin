'use strict'

angular.module 'loopback-admin'

.factory 'Model', ($injector, stringUtils, $log, Property, PropertyTypeConfiguration, LoopbackInjector) ->

  class Model
    constructor: (name, model) ->
      @name = name
      @label = stringUtils.camelCase @name

      @properties = []

      @propertyNames = []
      @relationNames = []

      @resource = LoopbackInjector name

      for key, value of model when key not in [ 'properties', 'relations' ]
        @[key] = value

      @constructProperties model.properties
      @constructRelations model.relations

    constructRelations: (modelRelations) ->
      _propertyTypes = PropertyTypeConfiguration

      if modelRelations
        Object.keys(modelRelations).forEach (relationName) =>
          relation = modelRelations[relationName]

          if relation?.foreignKey
            @relationNames.push relationName

          if _propertyTypes[relation.type]
            propertyConstructor = $injector.get _propertyTypes[relation.type]

            @properties.push new propertyConstructor relationName, relation
          else
            $log.warn 'no such type defined for', relation.type, relation

      return

    constructProperties: (modelProperties) ->
      _propertyTypes = PropertyTypeConfiguration

      if modelProperties
        Object.keys(modelProperties).forEach (propertyName) =>
          property = modelProperties[propertyName]

          if Object.keys(property).length
            if property.id
              @identifier = new Property propertyName

            if _propertyTypes[(property.type).toLowerCase()]
              @propertyNames.push propertyName
              propertyConstructor = $injector.get _propertyTypes[(property.type).toLowerCase()]

              @properties.push new propertyConstructor propertyName, property
            else
              $log.warn 'no such type defined for', property.type, property

        return
