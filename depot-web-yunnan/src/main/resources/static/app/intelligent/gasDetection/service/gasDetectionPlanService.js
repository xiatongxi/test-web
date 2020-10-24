"use strict";
angular.module('app.intelligent').service("gasDetectionPlanService", function ($rootScope, $http, $q, APP_CONFIG) {
    // 分页列表数据
    this.getGasDetectionPageInfo = function (pageInfo, search) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.intelligentUrl + '/intelligents/gasDetection/getList',
            params: {
                pageNum: pageInfo.pageNum,
                pageSize: pageInfo.pageSize,
                vCfCode: search.vCfCode == undefined ? "" : search.vCfCode,
                startTime: search.startTime == undefined ? "" : search.startTime,
                endTime: search.endTime == undefined ? "" : search.endTime
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
    // 分页列表数据
    this.getGasDetectionPageInfoGroup = function (pageInfo, search) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.intelligentUrl + '/intelligents/gasDetection/getListGroup',
            params: {
                pageNum: pageInfo.pageNum,
                pageSize: pageInfo.pageSize,
                vCfCode: search.vCfCode == undefined ? "" : search.vCfCode
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

    // 气体实时检测接口
    this.nowGasDetection = function (storeCode) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/gasDetection/sendNowGasDetection',
            data: {
                storeCode: storeCode
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

    // 全库检测接口
    this.allGasDetection = function () {
        var orgId = $rootScope.depotInfo.orgId;
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.intelligentUrl + '/intelligents/gasDetection/sendGasDetectionAll',
            params: {
                orgId: orgId
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

    // 单仓检测接口
    this.onlyGasDetection = function (vCfCode) {
        var orgId = $rootScope.depotInfo.orgId;
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/gasDetection/sendOnlyGasDetection',
            data: {
                vCfCode: vCfCode,
                orgId: orgId
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

});