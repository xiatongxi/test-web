"use strict";
angular.module('app.intelligent').service("bathcTaskSchemaService", function($http, $q, APP_CONFIG) {

    // 分页列表数据
    this.getTaskSchemaPageInfo = function (pageInfo,search,type) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/task/getList',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                tName : search == undefined ? "":search.tName,
                tState : search == undefined ? "":search.tState,
                tCategory : type
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

    // 根据tId查询
    this.loadDataById = function(tId) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/task/getById',
            data: {
                tId : tId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            d.reject(response.msg);
        });
        return d.promise;
    };

    //保存修改接口
    this.saveData = function (taskSchema) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/task/save',
            data: {
                taskSchemaJson : angular.toJson(taskSchema)
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            d.reject(response.msg);
        });
        return d.promise;
    };

    // 根据id删除
    this.deleteById = function (id) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/task/deleteById',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }

    // 分页查询历史列表数据
    this.getDetectionHistory = function (pageInfo,search,items) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/task/getDetectionHistory',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                vcfcode : search == undefined ? "":search.vcfcode,
                time : search == undefined ? "":search.time,
                tid : items.tid,
                type : items.type
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