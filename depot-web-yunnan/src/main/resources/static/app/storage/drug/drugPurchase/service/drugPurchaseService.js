"use strict";
angular.module('app.storage').service("drugPurchaseService", function($http, $q, APP_CONFIG,$rootScope) {
    this.getPageInfo = function(pageNum, pageSize,startTime,endTime) {
        var url = '/depot/business/drugPurchase/getList';
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.drugManageUrl + url,
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                startTime: startTime,
                endTime: endTime
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    };
    
    
    //根据id加载数据
    this.loadDataById = function(id) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugPurchase/edit',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };
    
    // 根据id，获取子表列表.
    this.getDetailPageInfo = function(zid) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.drugManageUrl + '/depot/business/drugPurchaseDetail/getList',
            params : {
                pageNum : 1,
                pageSize : 100,
                zid : zid
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    };
    
    // 获取子表信息.
    this.loadDetailDataById = function(id) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.drugManageUrl + '/depot/business/drugPurchaseDetail/edit',
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
    };
    
    // 删除子表数据.
    this.deleteDetailDataById = function(id) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.drugManageUrl + '/depot/business/drugPurchaseDetail/remove',
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
    };

    // 删除数据.
    this.deleteDataById = function(id) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugPurchase/remove',
            params : {
                id : id
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject(response);
        });
        return d.promise;
    };

    //根据id加载数据,获取审批相关数据.
    this.loadDataByIdAndProcessInstanceId = function(id, processInstanceId) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugPurchase/audit/getAudit',
            data: {
                id : id,
                processInstanceId : processInstanceId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };

    //更新数据为待审批 assignee为审批人的userId
    this.updateAuditState=function(drugPurchase,assignee) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugPurchase/updateData',
            data: {
                id : drugPurchase.id,
                userInfoJson : angular.toJson($rootScope.userInfo),
                orgInfoJson : angular.toJson($rootScope.orgInfo),
                auditUserId : assignee
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };

});

