"use strict";

angular.module('app.intelligent')
    .service("basicTemperaturAalarmService", function($http,alertService, $q, APP_CONFIG, $rootScope) {



        //分页数据查询
        this.getAlarmPhoneNum = function(pageNum, pageSize, alarmData, orgId) {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.intelligentUrl + '/intelligents/alarm/getAlarmPhone',
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


        // 根据id加载数据.
        this.loadDataById = function(alarmId) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.intelligentUrl + '/intelligents/alarm/getByIdGetAlarmPhone',
                data: {
                    alarmId : alarmId
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
            });
            return d.promise;
        };


        //判断编码名称是否存在
        this.itExistCode = function(name,tpl) {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.intelligentUrl + '/intelligents/alarm/getByNameOrtpl',
                params : {
                    alarmMan:name,
                    alarmPhone:tpl
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

        //分页数据查询
        this.getPageInfo = function(pageNum, pageSize, alarmData) {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.intelligentUrl + '/intelligents/alarm/getAllAlarmPhone',
                params : {
                    pageNum : pageNum,
                    pageSize : pageSize,
                    alarmData : alarmData == undefined?"":alarmData.name
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
        this.deleteAlarmPhoneDetil = function(alarmId) {
            var d = $q.defer();
            $http({
                method : 'POST',
                url : APP_CONFIG.intelligentUrl + '/intelligents/alarm/deleteAlarmPhone',
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
        this.saveAlarmPhoneNum = function (dates) {
            var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.intelligentUrl + '/intelligents/alarm/saveAlarmPhone',
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
    });
