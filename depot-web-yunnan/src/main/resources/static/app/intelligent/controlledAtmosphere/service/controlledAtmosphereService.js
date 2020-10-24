"use strict";
angular.module('app.intelligent').service("controlledAtmosphereService", function($http, $q, APP_CONFIG) {

    // 空调控制接口
    this.sendAirConditionDir = function (vcfcode,vdevcode,type,ktinfo,uperson) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.intelligentUrl + '/intelligents/gas/sendAirConditionDir',
            data : {
                vcfcode : vcfcode,
                vdevcode : vdevcode,
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

    // 分页列表数据
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
                energy : 0
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