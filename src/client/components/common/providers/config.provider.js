'use strict';
angular.module('loopback-admin').provider('LoopBackAdminConfiguration', function (LoopBackResourceProvider) {
    var config, configOptions, initialized;
    config = null;
    initialized = false;
    configOptions = null;
    return {
        setConfig: function (newConfig) {
            return configOptions = newConfig;
        },
        $get: function (Model, $q, $http, $injector) {
            var application, buildMenuFromModels;
            buildMenuFromModels = function () {
                return application.models.map(function (model) {
                    return {
                        name: model.label,
                        state: "list",
                        params: {
                            model: model.name
                        }
                    };
                });
            };
            application = {
                models: [],
                urlBase: LoopBackResourceProvider.getUrlBase(),
                options: configOptions,
                defaultErrorMessage: function (response) {
                    var body;
                    body = response.data;
                    if (typeof body === 'object') {
                        body = JSON.stringify(body);
                    }
                    return 'Oops, an error occured else (code: ' + response.status + ') ' + body;
                },
                errorMessage: this.defaultErrorMessage,
                getErrorMessage: function (response) {
                    if (typeof this.errorMessage === 'function') {
                        return this.errorMessage(response);
                    }
                    return this.errorMessage;
                },
                userModel: $injector.get(configOptions.userModel),
                userLoginField: configOptions.userLoginField,
                addModel: function (model) {
                    var foundModel;
                    if (!model) {
                        throw new Error("No model given");
                    }
                    foundModel = this.getModelByName(this.models, model.name);
                    if (!foundModel) {
                        this.models.push(model);
                    }
                    return this;
                },
                getModel: function (modelName) {
                    var foundModel;
                    foundModel = this.getModelByName(this.models, modelName);
                    if (!foundModel) {
                        foundModel = this.getModelByName(this.config.models, modelName);
                        if (foundModel) {
                            foundModel = new Model(modelName, foundModel);
                            this.addModel(foundModel);
                        }
                    }
                    return foundModel;
                },
                getModels: function () {
                    var defer;
                    defer = $q.defer();
                    application.initialize().then(function (cfg) {
                        return defer.resolve(cfg.models);
                    });
                    return defer.promise;
                },
                getModelByName: function (models, modelName) {
                    return models.filter(function (e) {
                        return e.name === modelName;
                    })[0];
                },
                initialize: function () {
                    var defer;
                    defer = $q.defer();
                    if (initialized && application.models.length) {
                        defer.resolve(application);
                    } else {
                        if (angular.isString(configOptions.resourcePath)) {
                            $http.get(configOptions.resourcePath).success(function (data) {
                                var i, len, model, models;
                                models = data.models;
                                application.config = data;
                                for (i = 0, len = models.length; i < len; i++) {
                                    model = models[i];
                                    application.addModel(new Model(model.name, model));
                                }
                                application.menu = buildMenuFromModels();
                                defer.resolve(application);
                                return initialized = true;
                            }).error(function (err) {
                                return defer.reject(err);
                            });
                        } else {
                            defer.resolve(application);
                        }
                    }
                    return defer.promise;
                }
            };
            return application;
        }
    };
});
