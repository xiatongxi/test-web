"use strict";

angular.module('app.qualityDlag')
    .service("qualityKindService", function($http, $q, APP_CONFIG) {

        this.initList = function () {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.monitorUrl + '/quality/getKindList',
                params : {
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                d.reject("error");
            });
            return d.promise;
        }

        this.updateThresholdValue = function (id, ThresholdValue) {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.monitorUrl + '/quality/updateKindList',
                params : {
                    id : id,
                    ThresholdValue : ThresholdValue
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                d.reject("error");
            });
            return d.promise;
        }

        this.allSave = function (val, index) {
            var d = $q.defer();
            $http({
                method : 'POST',
                url : APP_CONFIG.monitorUrl + '/quality/allSave',
                params : {
                   val : val,
                   index:index
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                d.reject("error");
            });
            return d.promise;
        }
})