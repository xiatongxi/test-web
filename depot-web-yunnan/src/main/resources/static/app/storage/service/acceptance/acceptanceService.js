"use strict";

angular.module('app.business').service("acceptanceService", function($http, $q,$rootScope, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, searchCondition, userId) {
        var d = $q.defer();
        $http({
        	method : 'GET',
            url : APP_CONFIG.businessUrl + '/depot/business/plan/getAcceptanceList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                planNumber : searchCondition == undefined?"" : searchCondition.planNumber,
                planTitle : searchCondition == undefined ? "" : searchCondition.planTitle,
                customerPlanState : searchCondition == undefined ? "" :searchCondition.customerPlanState, 
                userId : userId	,
                orgId : $rootScope.userInfo.orgId
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
    this.loadDataById = function(id, processInstanceId) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.businessUrl + '/depot/business/plan/audit/getAudit',
            data: {
                id : id,
                processInstanceId : processInstanceId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }

    /*//根据id查询质检数据
    this.loadDataByZJId = function(AcceptanceId,fileType) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.businessUrl + '/depot/business/plan/audit/getDataByZJId',
            params : {
                bid : AcceptanceId,
                fileType : fileType
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
    
    
    
   //申请验收把数据传给省平台
    /*this.report = function(plan,addedDetail,file) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.reportUrl + '/business-management/businessPlan/houseSave',
            params: {
            	planJson : plan,
            	houseJson : addedDetail,
            	fileJson : file
            },
            headers: { 'Content-Type': 'application/json;dataType:"json"' }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }*/
    this.report = function(plan,addedDetail,file) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.businessUrl + '/depot/business/plan/acceptanceSave',
            params: {
            	planJson : plan,
            	houseJson : addedDetail,
            	fileJson : file
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }

    // 获取审批通过，并且启动的计划.
    this.getPassStartPageInfo = function(pageNum, pageSize, searchCondition) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.businessUrl + '/depot/business/plan/getAuditPassList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                inApplication : 1, // 只查询启动的
                billType : searchCondition == undefined ? "" : searchCondition.billType,
                executeType : searchCondition == undefined ? "" : searchCondition.executeType,
                customerPlanState : searchCondition == undefined ? "" : searchCondition.customerPlanState,
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject(response);
        });
        return d.promise;
    }
    
    //保存申请验收信息
    this.saveAcceptance = function(businessPlanId,businessPlancreateTime,fileIds,qualityIds,acceptanceNumber) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.businessUrl + '/depot/business/plan/audit/save',
            data: {
            	businessPlanId : businessPlanId,
                businessPlancreateTime : businessPlancreateTime,
                fileIds : fileIds,
                qualityIds : qualityIds,
                acceptanceNumber : acceptanceNumber
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
    
});
