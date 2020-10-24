"use strict";

angular.module('app.business').service("contractPayReceviceService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, searchCondition) {
        var url = '/depot/business/contractPay/getList';
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.businessUrl + url,
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                contractNum : searchCondition == undefined?"" : searchCondition.contractNum, 
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
