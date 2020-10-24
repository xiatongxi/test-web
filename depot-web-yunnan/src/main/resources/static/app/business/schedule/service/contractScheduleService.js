"use strict";

angular.module('app.business').service("contractScheduleService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, searchCondition,contractType) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.businessUrl + '/depot/business/contract/getScheduleList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                contractNumber : searchCondition == undefined ? "" : searchCondition.contractNumber, 
                grainKind : searchCondition == undefined ? "" : searchCondition.grainKind,
        		planBid : searchCondition == undefined ? "" : searchCondition.planBid,
        		contractType : contractType
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
