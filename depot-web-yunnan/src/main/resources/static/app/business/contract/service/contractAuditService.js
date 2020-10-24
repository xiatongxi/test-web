"use strict";

angular.module('app.business').service("contractAuditService", function($http, $q,$rootScope, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, searchCondition) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.businessUrl + '/depot/business/contract/audit/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                contractNumber : searchCondition == undefined?"" : searchCondition.contractNumber, 
                auditState : searchCondition == undefined?"" : searchCondition.auditState,
                grainKind : searchCondition == undefined?"" : searchCondition.grainKind,
                userId: $rootScope.userInfo.userId
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
    
    // 获取合同变更审批数据.
    this.getContractChangePageInfo = function(pageNum, pageSize, searchCondition) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.businessUrl + '/depot/business/contract/audit/getContractChangeList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                contractNumber : searchCondition == undefined?"" : searchCondition.contractNumber, 
                auditState : searchCondition == undefined?"" : searchCondition.auditState,
                grainKind : searchCondition == undefined?"" : searchCondition.grainKind,
                userId : $rootScope.userInfo.userId
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
    this.loadDataById = function(id, processInstanceId, type) {
    	
    	var url = '/depot/business/contract/audit/getAudit';
        if (type == "change") {
            url = '/depot/business/contract/audit/getAuditForChange';
        }
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.businessUrl + url,
            params: {
                id : id,
                processInstanceId : processInstanceId,
                userName : $rootScope.userInfo.username
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
})
