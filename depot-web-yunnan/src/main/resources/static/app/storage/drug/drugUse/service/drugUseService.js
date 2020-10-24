"use strict";
angular.module('app.storage').service("drugUseService", function ($http, $q, APP_CONFIG) {
    // 获取列表.
    this.getPageInfo = function (pageNum, pageSize, searchCondition) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugUse/getList',
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

    // 根据id加载数据.
    this.loadDataById = function (id) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugUse/edit',
            data: {
                id: id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };

    this.numberVerifyService = function (drugRestore) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugUse/numberVerify',
            data: {
                drugRestoreJson: angular.toJson(drugRestore)
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject(response);
        });
        return d.promise;
    };

});
