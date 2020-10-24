"use strict";

angular.module('app.cameraGroup')
    .service("cameraGroupService", function($http, $q, APP_CONFIG, $rootScope) {

        this.initList = function (pageNum, pageSize) {
        	var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.monitorUrl + '/group/getGroupList',
                params : {
                    pageNum : pageNum,
                    pageSize : pageSize,
                    orgId : orgId
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                d.reject("error");
            });
            return d.promise;
        }

        this.saveData = function (group,CameraId) {
        	var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.monitorUrl + '/group/groupSave',
                data: {
                    groupJson : group,
                    CameraId:CameraId,
                    orgId:orgId
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                // 请求失败执行代码
            });
            return d.promise;
        }
        
        this.removebyid = function (groupid) {
            var d = $q.defer();
            $http({
                method : 'POST',
                url : APP_CONFIG.monitorUrl + '/group/removebyid',
                params : {
                    groupid : groupid
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                d.reject("error");
            });
            return d.promise;
        }

        this.queryCameraForGroup = function (groupid) {
        	var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.monitorUrl + '/group/queryCameraForGroup',
                params : {
                    groupid : groupid,
                    orgId : orgId
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                d.reject("error");
            });
            return d.promise;
        }
        
        this.editGroupCamera = function (groupid,cameraid,type) {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.monitorUrl + '/group/editGroupCamera',
                params : {
                    groupid : groupid,
                    cameraid:cameraid,
                    type : type //区分新增还是删除1是新增，0是删除
                }
            }).then(function successCallback(response) {console.log(response.data);
                d.resolve(response.data);
            }, function errorCallback(response) {
                d.reject("error");
            });
            return d.promise;
        }
})