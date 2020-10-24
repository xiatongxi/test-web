"use strict";
angular.module('app.storage').service("drugPurchaseAuditService", function($http, $q, APP_CONFIG,$rootScope) {
    this.getPageInfo = function(pageNum, pageSize,searchCondition) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.drugManageUrl + '/depot/business/drugPurchase/audit/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                userId : $rootScope.userInfo.userId,
                applyNumber : searchCondition.applyNumber,
                auditState : searchCondition.auditState
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

    //获取审批详情 loadDataByApplyName
    this.loadDataByApplyName = function(applyNumber) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugPurchase/audit/getAudit',
            data: {
                applyNumber : applyNumber
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };
    
    // 获取合同变更审批数据.
    /*this.getContractChangePageInfo = function(pageNum, pageSize) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.drugManageUrl + '/depot/business/drugPurchase/audit/getContractChangeList',
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
    }*/
    
    //根据id加载数据
    /*this.loadDataById = function(id, processInstanceId) {
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
    }*/
});
