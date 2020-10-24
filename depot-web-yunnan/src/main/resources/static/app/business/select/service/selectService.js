"use strict";

angular.module('app.business').service("selectService", function($http,$rootScope, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, type, approval, projectId, taskType, operator, orderByClause) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.businessUrl + '/depot/business/select/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                type  : type,
                projectName : approval == undefined?"":approval.projectName, //仓房
                applyName : approval == undefined?"":approval.applyName,
                taskId : approval == undefined?"":approval.taskId,
                userId : operator,
                projectId : projectId,
                taskType : taskType,
                orderByClause : orderByClause
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
    //获取待办的条数.
    this.getloadTodoData = function() {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.businessUrl + '/depot/business/select/getListSize',
            params : {
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
    
})
