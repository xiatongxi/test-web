"use strict";
angular.module('app.intelligent').service("warningThresholdService", function($http, $q, APP_CONFIG) {

    // 分页列表数据
    this.getInsectPestDetectionPageInfo = function (pageInfo,search,showType) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/warning/getList',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                vCfCode : search == undefined ? "":search.vCfCode,
                state : search == undefined ? "":search.state,
                searchStartDate : search == undefined ? "":search.searchStartDate,
                searchEndDate : search == undefined ? "":search.searchEndDate,
                showType : showType
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

    // 检测概览查询预警信息 0测温，1测虫，2测气
    this.getWarningInfo = function(vCfCode,wTime,wMode){
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/warning/getWarningInfo',
            params : {
                vCfCode : vCfCode,
                wTime : wTime,
                wMode : wMode
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject(response.data);
        });
        return d.promise;
    };

});