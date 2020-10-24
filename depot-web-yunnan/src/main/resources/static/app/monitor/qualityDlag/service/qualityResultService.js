"use strict";

angular.module('app.qualityDlag')
    .service("qualityResultService", function($http, $q, APP_CONFIG) {

        this.initList = function (pageNum, pageSize,cameraId) {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.monitorUrl + '/quality/getResultList',
                params : {
                    pageNum : pageNum,
                    pageSize : pageSize,
                    cameraId : cameraId
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                d.reject("error");
            });
            return d.promise;
        };

        //获取结果详情
        this.getResultEdit = function (id) {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.monitorUrl + '/quality/getResultEdit',
                params : {
                    id : id
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                d.reject("error");
            });
            return d.promise;
        }
});