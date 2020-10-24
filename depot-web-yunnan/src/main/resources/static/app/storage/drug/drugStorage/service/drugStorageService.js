"use strict";
angular.module('app.storage').service("drugStorageService", function ($http, $q, APP_CONFIG) {
    this.getPageInfo = function (pageNum, pageSize, searchCondition) {
        var url = '/depot/business/drugStorage/getList';
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.drugManageUrl + url,
            params: {
                pageNum: pageNum,
                pageSize: pageSize,
                drugKind: searchCondition.drugKind,
                drugName: searchCondition.drugName,
                startTime: searchCondition.startTime,
                endTime: searchCondition.endTime
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

    //根据id加载数据
    this.loadDataById = function (id) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugStorage/edit',
            data: {
                id: id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };

    //根据id加载数据
    this.loadDataByIdAndProcessInstanceId = function (id, processInstanceId) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.baseUrl + '/depot/business/drugStorage/audit/getAudit',
            data: {
                id: id,
                processInstanceId: processInstanceId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };

    // 获取药剂生产厂家
    this.getManufacturer = function () {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugStorage/getManufacturer'
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };

});
