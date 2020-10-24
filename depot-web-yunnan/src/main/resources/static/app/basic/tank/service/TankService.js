"use strict";

angular.module('app.basic').service("TankService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize,storagetankName,orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/Tank/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                storagetankName : storagetankName,
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
    }

    // 提交表单
    this.save = function(tank, orgId) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.basicUrl + '/Tank/edit',
            data: {
                tankJson : angular.toJson(tank),
                orgId : orgId
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });

        return d.promise;
    }

    //去重
    this.findStorageTankCode = function(storageTankCode,id) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/Tank/findStorageTankCode',
            params : {
                storageTankCode : storageTankCode,
                id:id
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });

        return d.promise;
    }

    this.findByTank = function(id) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.basicUrl + '/Tank/findByTank',
            params: {
                id : id
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
        return d.promise;
    }

    this.remove = function(id,delFlag) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.basicUrl + '/Tank/remove',
            params: {
                id : id,
                delFlag : delFlag
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
        return d.promise;
    }

});
