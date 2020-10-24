"use strict";

angular.module('app.system').service("depotImageService", function($http, $q, APP_CONFIG) {

    /**
     * 获取列表
     */
    this.getByOrgId = function(orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.systemUrl + '/depotImage/list',
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
    }

    /**
     * 保存
     */
    this.save = function(orgId, depotImages) { 
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.systemUrl + '/depotImage/save',
            data : {
                orgId : orgId,
                imglistStr : depotImages.join(",")
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

})
