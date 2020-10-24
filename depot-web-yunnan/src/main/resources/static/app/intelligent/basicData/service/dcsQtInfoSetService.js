"use strict";
angular.module('app.intelligent').service("dcsQtInfoSetService", function ($http, $q, APP_CONFIG, $rootScope) {

    // 列表
    this.getDcsQtInfoSetPageInfo = function (pageInfo, search) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.intelligentUrl + '/intelligents/gaseous/getList',
            params: {
                pageNum: pageInfo.pageNum,
                pageSize: pageInfo.pageSize,
                vCfCode: search == undefined ? "" : search.vCfCode
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

    // 保存,修改
    this.save = function (dcsQtInfo) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/gaseous/save',
            data: {
                grainJson: angular.toJson(dcsQtInfo)
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
        return d.promise;
    };

    // 根据id加载数据.
    this.loadDataById = function (id) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/gaseous/getById',
            data: {
                id: id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };

    // 根据id删除
    this.remove = function (dcsQtInfoSetInfo) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/gaseous/deleteById',
            data: {
                id: dcsQtInfoSetInfo.id,
                dcsQtInfoInfoJson: angular.toJson(dcsQtInfoSetInfo)
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };

    // 数据同步
    this.synchronizationAll = function () {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/gaseous/synchronizationAll',
            params : {
                orgId : $rootScope.depotInfo.orgId,
                vUpdatePerson : $rootScope.userInfo.realName
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