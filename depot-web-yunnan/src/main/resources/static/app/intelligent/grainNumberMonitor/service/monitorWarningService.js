"use strict";
angular.module('app.intelligent').service("monitorWarningService", function ($http, $q, APP_CONFIG,$rootScope) {

    // 分页列表数据
    this.getMonitorWarningPageInfo = function (pageInfo,search) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/monitorWarning/getList',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                vcfcode : search == undefined ? "":search.vcfcode
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

    // 单仓数量检测指令
    this.sendNumberMonitor = function (vCfCode,vJcCode,jctableId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/monitorWarning/sendNumberMonitor',
            params : {
                vcfcode : vCfCode == undefined ? "":vCfCode,
                vJcCode : vJcCode == undefined ? "":vJcCode,
                jctableId : jctableId == undefined ? "":jctableId,
                operator: $rootScope.userInfo.realName,
                orgId: $rootScope.orgInfo.orgId
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

    // 全仓数量检测指令
    this.sendAllNumberDetection = function (vCode,vws) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/monitorWarning/sendNumberMonitor',
            params : {
                vcfcode : vCode,
                ws : vws
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

    // 查看检测进度
    this.sendDetectionProgress = function (vCode,vws) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/monitorWarning/getScanResult',
            params : {
                vcfcode : vCode,
                ws : vws
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

    // 获取检测结果
    this.sendDetectionResult = function (vCode,vws,jccode) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/monitorWarning/getmeasureweight',
            params : {
                vcfcode : vCode,
                devcode:jccode,
                operator:$rootScope.userInfo.realName,
                orgId:$rootScope.orgInfo.orgId,
                ws : vws
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

    // 数量检测历史列表分页列表数据
    this.getWarningHistoryPageInfo = function (pageInfo,search) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/monitorWarning/getListHistory',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                vcfcode : search == undefined ? "":search.vcfcode,
                startTime : search == undefined ? "":search.startTime,
                endTime : search == undefined ? "":search.endTime
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