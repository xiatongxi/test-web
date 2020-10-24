"use strict";

angular.module('app.business').service("planService", function($http, $rootScope,$q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, searchCondition,executeType) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.businessUrl + '/depot/business/plan/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                planNumber : searchCondition == undefined?"" : searchCondition.planNumber, 
                auditState : searchCondition == undefined?"" : searchCondition.auditState,
                grainKind : searchCondition == undefined?"" : searchCondition.grainKind,
                attributeType : searchCondition == undefined?"" : searchCondition.attributeType,
                userId : $rootScope.userInfo.userId,	
                executeType : executeType

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
    
    this.getPassPageInfo = function(pageNum, pageSize, searchCondition) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.businessUrl + '/depot/business/plan/getAuditPassList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                planNumber : searchCondition == undefined?"" : searchCondition.planNumber, 
                grainKind : searchCondition == undefined?"" : searchCondition.grainKind,
                attributeType : searchCondition == undefined?"" : searchCondition.attributeType
		
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
                billType : searchCondition == undefined ? "" : searchCondition.billType
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
    
    //根据id加载数据
    this.loadDataById = function(id) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.businessUrl + '/depot/business/plan/edit',
            params: {
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
            method: 'GET',
            url: APP_CONFIG.businessUrl + '/depot/business/plan/audit/getAudit',
            params: {
                id : id,
                processInstanceId : processInstanceId,
                userName:$rootScope.userInfo.username,
                userId:$rootScope.userInfo.userId,
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
    
    
    //上报列表展示
    this.getReportPageInfo = function(pageNum, pageSize, searchCondition) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.businessUrl + '/depot/business/plan/getAuditPassList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                planNumber : searchCondition == undefined?"" : searchCondition.planNumber,
                billType : searchCondition == undefined ? "" : searchCondition.billType,
                executeType : 3156, 
                inApplication : 1, // 只查询启动的
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
    
    
    //根据id加载除审批的数据用于上报的查看
    this.loadDataByIdForReport = function(id) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.businessUrl + '/depot/business/plan/getReportEduit',
            params: {
                id : id,
                userName : $rootScope.userInfo.userName
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
    
    
    //上报省平台数据
    /*this.reportPlan = function(plan) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.reportUrl + '/business-management/businessPlan/save',
            params: {
            	businessPlan : plan
            },
            headers: { 'Content-Type': 'application/json;dataType:"json"' }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }*/
    this.reportPlan = function(plan) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.businessUrl + '/depot/business/plan/reportSave',
            params: {
            	businessPlan : plan
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
    
    //修改上报状态
    this.updateStatus = function(id) {
    	var d = $q.defer();
    	$http({
    		method: 'POST',
            url: APP_CONFIG.businessUrl + '/depot/business/plan/updatePlanStatus',
            data: {
            	id :id,
            	status : 10
            }
    	}).then(function successCallback(response) {
    		d.resolve(response.data);
    	}, function errorCallback(response) {
    	});
    	return d.promise;
    }
    
})
