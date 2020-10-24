"use strict";

angular.module('app.business').service("deliveryStorageNoticeAuditService", function($http, $q,$rootScope, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, searchCondition) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.businessUrl + '/depot/business/deliveryStorageNotice/audit/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                billType : searchCondition == undefined ? "" : searchCondition.billType, 
                auditState : searchCondition == undefined ? "" : searchCondition.auditState,
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
    this.loadDataById = function(id, processInstanceId) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.businessUrl + '/depot/business/deliveryStorageNotice/audit/getAudit',
            params: {
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

})
