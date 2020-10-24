"use strict";
angular.module('app.intelligent').service("grainDetectionService", function($http, $q, APP_CONFIG) {

    // 分页列表数据
    /*this.getGrainDetectionPageInfo = function (pageInfo,vDatatime,vCfCode) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligent/temperatureRecord/getList',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                vDatatime : vDatatime == undefined ? "":vDatatime,
                vCfCode : vCfCode == undefined ? "":vCfCode
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }*/

});