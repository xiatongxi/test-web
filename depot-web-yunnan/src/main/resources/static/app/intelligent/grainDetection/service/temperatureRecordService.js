"use strict";
angular.module('app.intelligent').service("temperatureRecordService", function($http, $q, APP_CONFIG) {
    // 测温记录
    // 分页列表数据
    this.getTemperatureRecordPageInfo = function (pageInfo,search,tType) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/temperatureRecord/getList',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                vDatatime : search == undefined ? "":search.time,
                startTime : search == undefined ? "":search.startTime,
                endTime : search == undefined ? "":search.endTime,
                vCfCode : search == undefined ? "":search.vCfCode,
                tType: tType
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

    // 根据仓号和检测时间获取数据
    this.findByHouseAndTime = function (vCfCode, vDatatime,id) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/temperatureRecord/findByHouseAndTime',
            params : {
                vDatatime : vCfCode == undefined ? "":vDatatime,
                vCfCode : vDatatime == undefined ? "":vCfCode,
                lqId: id
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

    // 根据仓号和检测时间获取数据
    this.findByHouseAndTimes = function (vCfCode, vDatatime, id) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/temperatureRecord/findByHouseAndTimes',
            params : {
                vDatatime : vDatatime == undefined ? "":vDatatime,
                vCfCode : vCfCode == undefined ? "":vCfCode,
                lqId: id,
                viewFlag: true
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

    // 粮情对比图左
    this.getComparisonLeft = function (pageInfo,search,tType) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/temperatureRecord/getComparisonLeft',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                startTimeLeft : search == undefined ? "":search.startTimeLeft,
                endTimeLeft : search == undefined ? "":search.endTimeLeft,
                vCfCodeLeft : search == undefined ? "":search.vCfCodeLeft,
                tType: tType
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

    // 粮情对比图右
    this.getComparisonRight = function (pageInfo,search,tType) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/temperatureRecord/getComparisonRight',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                startTimeRight : search == undefined ? "":search.startTimeRight,
                endTimeRight : search == undefined ? "":search.endTimeRight,
                vCfCodeRight : search == undefined ? "":search.vCfCodeRight,
                tType: tType
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

    // 所有点粮情分页列表数据
    this.getGrainPointAllPageInfo = function (pageInfo,search,id) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/temperatureRecord/getGrainPointAll',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                time : search == undefined ? "":search.time,
                storehouse : search == undefined ? "":search.storehouse,
                id: id
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

    // 温湿度实时检测接口
    this.nowGrainTemperatureDetection = function (storeCode) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.intelligentUrl + '/intelligents/temperatureRecord/sendTemperatureDetection',
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
    };

    // 全库检测接口
    this.allStoreGrainTemperatureDetection = function (tType) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/temperatureRecord/sendTemperatureDetectionAll',
            params : {
                tType: tType
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
    this.onlyStoreDetection = function (storehouse,tType) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.intelligentUrl + '/intelligents/temperatureRecord/sendOnlyStoreDetection',
            data : {
                storeCode : storehouse,
                tType: tType
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

});