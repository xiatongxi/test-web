"use strict";
angular.module('app.intelligent').service("comprehensiveDeviceService", function($http, $q, APP_CONFIG) {

    //通风记录查询
    this.getPageInfo = function (pageInfo, search) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/comprehensive/getList',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                vCfCode : search==undefined?"":search.vcfcode,
                vDistinguishState : search==undefined?"":search.vDistinguishState
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
    //根据id查询
    this.getById = function (id) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/comprehensive/getById',
            params : {
                id : id
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