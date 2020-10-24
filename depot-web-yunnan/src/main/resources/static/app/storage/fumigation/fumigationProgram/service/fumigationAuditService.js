"use strict";

angular.module('app.storage').service("fumigationAuditService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, ids, userId, searchCondition) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.taskUrl + '/depot/storage/fumigation/getApprovalList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                ids : angular.toJson(ids), 
                userId : userId, 
                searchCondition : angular.toJson(searchCondition)
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
//    this.loadDataByIdAndPID = function(id, processInstanceId) {
//        var d = $q.defer();
//        $http({
//            method: 'POST',
//            url: APP_CONFIG.baseUrl + '/depot/storage/fumigation/audit/getAudit',
//            data: {
//                id : id,
//                processInstanceId : processInstanceId
//            }
//        }).then(function successCallback(response) {
//            d.resolve(response.data);
//        }, function errorCallback(response) {
//        });
//        return d.promise;
//    }
    
    this.getPassPageInfo = function(pageNum, pageSize, searchCondition) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/depot/storage/fumigation/getAuditPassList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                fumigationType : searchCondition == undefined ? "" : searchCondition.fumigationType, 
                drugName : searchCondition == undefined ? "" : searchCondition.drugName,
        		houseId : searchCondition == undefined ? "" : searchCondition.houseId
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
    
    this.startTask = function(id) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/depot/storage/fumigation/startTask',
            params : {
                id : id
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
