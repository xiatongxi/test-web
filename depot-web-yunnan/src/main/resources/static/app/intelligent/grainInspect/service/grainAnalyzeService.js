"use strict";
angular.module('app.intelligent').service("grainAnalyzeService", function($http, $q, APP_CONFIG) {

    // 分页列表数据
    this.getAnalyzeListPageInfo = function (pageInfo, search) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/grainCheckAnalyze/getList',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                vDataTime : search == undefined ? "":search.vDataTime
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