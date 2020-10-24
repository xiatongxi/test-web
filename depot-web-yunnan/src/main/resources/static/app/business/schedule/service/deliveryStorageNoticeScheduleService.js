"use strict";
angular.module('app.business').service("deliveryStorageNoticeScheduleService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, searchCondition) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.businessUrl + '/depot/business/deliveryStorageNotice/getScheduleList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                billType : searchCondition == undefined ? "" : searchCondition.billType, 
                billNumber : searchCondition == undefined ? "" : searchCondition.billNumber,
        		planBid : searchCondition == undefined ? "" : searchCondition.planBid,
				rootContractBid : searchCondition == undefined ? "" : searchCondition.rootContractBid
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
