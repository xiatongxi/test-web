"use strict";

angular.module('app.business').service("agentTemperatureService", function ($http, $q, APP_CONFIG, $rootScope) {
    //分页数据查询
    this.getGrainStorageTemperatureData = function (pageNum, pageSize, grainStorageTemperature, temperId, orgId) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.agentUrl + '/agentTemperature/getAgentTemperatureList',
            params: {
                pageNum: pageNum,
                pageSize: pageSize,
                agentId: grainStorageTemperature.agentId == undefined ? "" : grainStorageTemperature.agentId,
                agentDepotId: grainStorageTemperature.agentDepotId == undefined ? "" : grainStorageTemperature.agentDepotId,
                storehouseId: grainStorageTemperature.storehouseId == undefined ? "" : grainStorageTemperature.storehouseId,
                startTime: grainStorageTemperature.startTime == undefined ? "" : grainStorageTemperature.startTime,
                endTime: grainStorageTemperature.endTime == undefined ? "" : grainStorageTemperature.endTime,
                temperId: temperId,
                orgid: orgId
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

    //添加或修改数据
    this.saveAndUpdata = function (agentTemperatureJson) {
        var orgId = $rootScope.orgInfo.orgId;
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.agentUrl + '/agentTemperature/saveAgent',
            data: {
                agentTemperatureJson: agentTemperatureJson,
                orgId: orgId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            //console.log(response);
        });
        return d.promise;
    };

    // 删除一条记录
    this.removeById = function (id) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.agentUrl + '/agentTemperature/removeAgentTemperature',
            data: {
                id: id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            //console.log(response);
        });
        return d.promise;
    };

    //根据id查询详细数据
    this.getAgentTemperatureEdit = function (id) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.agentUrl + '/agentTemperature/getAgentTemperatureEdit',
            params: {
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

    //根据id层数据
    this.findLayerByLQId = function (id) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.agentUrl + '/agentTemperature/findLayerByLQId',
            params: {
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

    //根据id层数据
    this.findTemperById = function (temperId, sign) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.agentUrl + '/agentTemperature/findTemperById',
            params: {
                temperId: temperId,
                sign: sign
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

    //根据id查询详细数据
    this.getAgentStoreInfoMap = function () {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.agentUrl + '/agentTemperature/getAgentStoreInfo',
            params: {
                orgId: $rootScope.userInfo.orgId
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