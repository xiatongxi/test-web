"use strict";
angular.module('app.business').service("planScheduleService", function($http, $q,$rootScope, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, searchCondition) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.businessUrl + '/depot/business/plan/getScheduleList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                planNumber : searchCondition == undefined?"" : searchCondition.planNumber,
                executeType : searchCondition == undefined?"" : searchCondition.executeType
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
    
    this.getPassPageInfo = function(pageNum, pageSize) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.businessUrl + '/depot/business/plan/getAuditPassList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize
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
    
    //根据id加载数据
    this.loadDataById = function(id) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.businessUrl + '/depot/business/plan/edit',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
    
    //根据id加载数据
    this.loadDataById = function(id, processInstanceId) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.businessUrl + '/depot/business/plan/audit/getAudit',
            data: {
                id : id,
                processInstanceId : processInstanceId,
                userName:$rootScope.userInfo.userName,
                userId:$rootScope.userInfo.userId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
})
