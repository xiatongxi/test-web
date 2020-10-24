"use strict";
angular.module('app.storage').service("drugUseApplyAuditService", function ($http, $q, APP_CONFIG, $rootScope) {
    this.getPageInfo = function (pageNum, pageSize, searchCondition) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugUseApply/audit/getList',
            params: {
                pageNum: pageNum,
                pageSize: pageSize,
                userId: $rootScope.userInfo.userId,
                applyNumber: searchCondition.applyNumber,
                state: searchCondition.state
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
    this.loadDataByApplyName = function (applyNumber) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugUseApply/audit/getAudit',
            data: {
                applyNumber: applyNumber
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };

});
