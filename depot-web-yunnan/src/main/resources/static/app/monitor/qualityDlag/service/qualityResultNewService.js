"use strict";

angular.module('app.qualityDlag')
    .service("qualityResultNewService", function($http, $q, APP_CONFIG, $rootScope) {

        this.initList = function (pageNum, pageSize,cameraName) {
        	var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.monitorUrl + '/quality/getResultNewList',
                params : {
                    pageNum : pageNum,
                    pageSize : pageSize,
                    cameraName : !cameraName?"":cameraName,
                    orgId : orgId
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                d.reject("error");
            });
            return d.promise;
        };

        this.getCameraResultList = function (pageNum, pageSize,cameraId) {
        	var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.monitorUrl + '/quality/getResultList',
                params : {
                    pageNum : pageNum,
                    pageSize : pageSize,
                    cameraId : cameraId,
                    orgId : orgId
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