"use strict";

angular.module('app.log')
    .service("logService", function($http, $q, APP_CONFIG, $rootScope) {
        //分页数据查询
        this.getPageInfo = function(pageNum, pageSize, ip, operaMan, operaDepartment, level) {
        	var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.monitorUrl + '/Log/getLogList',
                params : {
                    pageNum : pageNum,
                    pageSize : pageSize,
                    ip : ip ,
                    operaMan : operaMan ,
                    operaDepartment : operaDepartment ,
                    level : level ,
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
})