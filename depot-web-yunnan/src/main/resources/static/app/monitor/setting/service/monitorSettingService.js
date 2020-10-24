"use strict";

angular.module('app.cameraSetting')
    .service("cameraSettingService", function($http,alertService, $q, APP_CONFIG, $rootScope) {

        this.loadSetting = function (id) {
        	var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method: 'GET',
                url: APP_CONFIG.monitorUrl + '/cameraSetting/getAllPath',
                params: {
                	orgId : orgId
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                //console.log(response);
            });
            return d.promise;
        }
        this.savePath = function (paths) {
        	var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.monitorUrl + '/cameraSetting/savePath',
                data: {
                    pathJson : paths,
                    orgId : orgId
                }
            }).then(function successCallback(response) {
                alertService.showSuccess();
            }, function errorCallback(response) {
                alertService.showError();
            });
            return d.promise;
        }
        //分页数据查询
        this.getAlarmPhone = function(pageNum, pageSize, alarmData, orgId) {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.monitorUrl + '/alarmSetting/getAlarmPhone',
                params : {
                    pageNum : pageNum,
                    pageSize : pageSize,
                    detectionType : alarmData.detectionType == undefined?"":alarmData.detectionType,
                    alarmRole : alarmData.alarmRole == undefined?"":alarmData.alarmRole,
                    orgId : orgId
                }
            }).then(function successCallback(response) {
                // 请求成功执行代码
                d.resolve(response.data);
            }, function errorCallback(response) {
                // 请求失败执行代码
                d.reject("error");
            });
            return d.promise;
        }
        //删除数据
        this.deleteAlarmPhone = function(alarmId) {
            var d = $q.defer();
            $http({
                method : 'POST',
                url : APP_CONFIG.monitorUrl + '/alarmSetting/deleteAlarmPhone',
                params : {
                    alarmId : alarmId
                }
            }).then(function successCallback(response) {
                // 请求成功执行代码
                d.resolve(response.data);
            }, function errorCallback(response) {
                // 请求失败执行代码
                d.reject("error");
            });
            return d.promise;
        }

        //添加或修改数据
        this.saveAlarmPhone = function (dates) {
        	var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.monitorUrl + '/alarmSetting/saveAlarmPhone',
                data: {
                    alarmJson : dates,
                    orgid : orgId
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                //console.log(response);
            });
            return d.promise;
        }
})