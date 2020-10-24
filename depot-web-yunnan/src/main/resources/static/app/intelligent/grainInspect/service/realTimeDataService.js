"use strict";
angular.module('app.intelligent').service("realTimeDataService", function($http, $q, APP_CONFIG) {

    // 加载实时数据查询列表,分页列表数据
    this.getRealTimeDataPageInfo = function (pageInfo,search) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/realTimeData/getList',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                storehouse : search == undefined ? "":search.storehouse
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