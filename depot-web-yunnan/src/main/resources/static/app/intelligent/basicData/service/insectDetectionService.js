"use strict";
angular.module('app.intelligent').service("insectDetectionService", function($http, $q, APP_CONFIG) {

    // 列表
    this.getBasicGrainSetPageInfo = function (pageInfo, search) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/insect/getList',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                vCfCode : search == undefined ? "":search.vcfcode
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
    this.save = function(basicGrainSet) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/insect/save',
            data: {
                grainJson : angular.toJson(basicGrainSet)
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
    this.loadDataById = function(id) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/insect/getById',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };

    // 根据id删除
    this.remove = function (insect) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/insect/deleteById',
            data: {
                id : insect.id,
                insectJson: angular.toJson(insect)
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
//判断编码名称是否存在
    this.itExistCode = function(vdevcode,vdevname) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/insect/getBycfCode',
            params : {
                vdevcode:vdevcode,
                vdevname:vdevname
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

    // 数据同步
    this.synchronizationAll = function (orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/insect/synchronizationAll',
            params : {
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
});