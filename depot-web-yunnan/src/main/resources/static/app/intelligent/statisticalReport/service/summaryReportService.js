"use strict";
angular.module('app.intelligent').service("summaryReportService", function($http, $q, APP_CONFIG) {

    // 分页列表数据
    this.getSummaryReportListPageInfo = function (pageInfo, orgId, searchStartDate, searchEndDate) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/statisticalReport/getSummaryReportInfo',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                orgId : orgId,
                startDate : searchStartDate == undefined ? "":searchStartDate,
                endDate : searchEndDate == undefined ? "":searchEndDate
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