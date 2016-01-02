'use strict'

angular.module 'loopback-admin'

.factory 'Model', ($injector, stringUtils, $log, Property, PropertyTypeConfiguration, LoopbackInjector) ->

  class Model
    constructor: (name, model) ->
      @name = name
      @label = stringUtils.camelCase @name

      @properties = []
      @propertyNames = []

      @relations = []
      @relationNames = []

      @resource = LoopbackInjector name

      for key, value of model when key not in [ 'properties', 'relations' ]
        @[key] = value

      @constructRelations model.relations
      @constructProperties model.properties

    constructRelations: (modelRelations) ->
      _propertyTypes = PropertyTypeConfiguration
      _relations = []

      if modelRelations
        Object.keys(modelRelations).forEach (relationName) =>
          relation = modelRelations[relationName]

          if relation?.foreignKey
            @relationNames.push relation.foreignKey

          if _propertyTypes[relation.type]
            propertyConstructor = $injector.get _propertyTypes[relation.type]

            _relations.push new propertyConstructor relationName, relation
          else
            $log.warn 'no such type defined for', relation.type, relation

      @flattenAndStore _relations, @relations

    constructProperties: (modelProperties) ->
      _propertyTypes = PropertyTypeConfiguration
      _properties = []

      if modelProperties
        Object.keys(modelProperties).forEach (propertyName) =>
          property = modelProperties[propertyName]

          if Object.keys(property).length
            if property.id
              @identifier = new Property propertyName

            if propertyName not in @relationNames
              if _propertyTypes[(property.type).toLowerCase()]
                @propertyNames.push propertyName
                propertyConstructor = $injector.get _propertyTypes[(property.type).toLowerCase()]

                _properties.push new propertyConstructor propertyName, property
              else
                $log.warn 'no such type defined for', property.type, property

      @flattenAndStore _properties, @properties

    addProperty: (property, properties) ->
      if property.order is null
        property.order = properties.length

      properties.push property
      properties = properties.sort (a, b) -> (a.order - b.order)

      @

    flattenAndStore: (_properties, properties) ->
      [].slice.call(_properties).map (argument) =>
        @flatten(argument).map (arg) => @addProperty arg, properties
      , this

    flatten: (arg) ->
      return [arg]
