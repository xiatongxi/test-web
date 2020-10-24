"use strict";

angular.module('app.business').service("customerBadrecordService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, searchCondition) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.customerUrl + '/depot/business/customerBadrecord/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                name : searchCondition == undefined?"" : searchCondition.name
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
