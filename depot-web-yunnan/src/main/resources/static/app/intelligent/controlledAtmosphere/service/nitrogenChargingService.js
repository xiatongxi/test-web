"use strict";
angular.module('app.intelligent').service("nitrogenChargingService", function($http, $q, APP_CONFIG) {

    // 氮气房控制接口
    this.sendAirConditionDir = function (vcfcode,vdevcode,type,ktinfo,uperson) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.intelligentUrl + '/intelligents/nitrogen/sendAirConditionDir',
            data : {
                type : type,
                ktinfoJson : angular.toJson(ktinfo),
                uperson : uperson
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

    // 氮气房分页列表数据
    this.getJobHistoryPageInfo = function (pageInfo,search,orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/gas/getHistoryList',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                orgId : orgId,
                vcfcode : search == undefined ? "":search.vcfcode,
                energy : 1
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