"use strict";

angular.module('app.business').service("trainService", function($http,$rootScope, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize,dataId) {
        var url = '/agile/hcxz/getData';
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.agileUrl + url,
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                dataId : dataId
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
    this.loadDataById = function(id, type, editType) {
    	var url = '/depot/business/contract/edit';
        if (type == "change") {
            if (editType == "add") {
                url = '/depot/business/contract/addForChange';
            } else if (editType == "edit") {
            	url = '/depot/business/contract/editForChange';
            }
        }
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.businessUrl + url,
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
    
    this.getPassPageInfo = function(pageNum, pageSize, searchCondition) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.businessUrl + '/depot/business/contract/getAuditPassList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                contractNumber : searchCondition == undefined?"" : searchCondition.contractNumber, 
                grainKind : searchCondition == undefined?"" : searchCondition.grainKind
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
    this.loadDataByIdAndProcessInstanceId = function(id, processInstanceId, type) {
    	var url = '/depot/business/contract/audit/getAudit';
        if (type == "change") {
            url = '/depot/business/contract/audit/getAuditForChange';
        }
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.businessUrl + url,
            data: {
                id : id,
                processInstanceId : processInstanceId,
                userName:$rootScope.userInfo.username
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
    
    // 获取可变更合同列表.
    this.getCanChangeList = function(pageNum, pageSize) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.businessUrl + '/depot/business/contract/getCanChangeList',
            data: {
                pageNum : pageNum,
                pageSize : pageSize,
                userId : $rootScope.userInfo.userId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
    
});
