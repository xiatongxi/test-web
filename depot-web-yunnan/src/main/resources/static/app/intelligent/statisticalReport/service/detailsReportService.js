"use strict";
angular.module('app.intelligent').service("detailsReportService", function($http, $q, APP_CONFIG) {

    // 分页列表数据
    this.getDetailsReportInfo = function (orgId, searchStorehouseCode, searchStartDate) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/statisticalReport/getDetailsReportInfo',
            params : {
                orgId : orgId,
                storehouseCode : searchStorehouseCode,
                startDate : searchStartDate == undefined ? "":searchStartDate
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