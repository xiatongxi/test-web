"use strict";
angular.module('app.intelligent').service("insectPestDetectionService", function($http, $q, APP_CONFIG, $rootScope) {

    // 分页列表数据
    this.getInsectPestDetectionPageInfo = function (pageInfo,search) {
        var orgId = $rootScope.orgInfo.orgId;
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/insectPestDetection/getList',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                vCfCode : search == undefined ? "":search.vCfCode,
                iBeginTdh : search == undefined ? "":search.iBeginTdh,
                iEndTdh : search == undefined ? "":search.iEndTdh,
                orgId : orgId
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

    // 查询图表数据
    this.getByCfCode = function (search) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/insectPestDetection/getByCfCode',
            params : {
                vCfCode : search == undefined ? "":search.vCfCode,
                searchStartDate : search == undefined ? "":search.searchStartDate,
                searchEndDate : search == undefined ? "":search.searchEndDate
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

    /*// 虫害逐仓实时检测接口
    this.nowInsectPest = function (storeCode) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.intelligentUrl + '/intelligents/insectPestDetection/sendNowInsectPest',
            data : {
                storeCode : storeCode
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    };*/

    // 虫害单仓检测接口
    this.onlyInsectPestDetection = function (vCfCode) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.intelligentUrl + '/intelligents/insectPestDetection/sendOnlyInsectPestDetection',
            data : {
                vCfCode : vCfCode,
                orgId: $rootScope.depotInfo.orgId
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

    // 虫害全库检测接口
    this.allInsectPestDetection = function () {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/insectPestDetection/sendInsectPestDetectionAll',
            params : {
                orgId: $rootScope.depotInfo.orgId
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

    // 虫害单仓手工录入
    this.saveInsectPestDate = function (insectPests) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.intelligentUrl + '/intelligents/insectPestDetection/addInsectPestData',
            data : {
                insectPests : angular.toJson(insectPests)
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

    // 修改虫害单仓手工录入数据
    this.getInsectPestDeatil = function (insectPestId) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.intelligentUrl + '/intelligents/insectPestDetection/getInsectPestDeatil',
            data : {
                insectPestId : insectPestId
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