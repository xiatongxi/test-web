"use strict";
angular.module('app.storage').service("drugDestroyService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize,searchCondition) {
        var url = '/depot/business/drugDestroy/getList';
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.drugManageUrl + url,
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                destroyType : searchCondition == undefined ? '':searchCondition.destroyType,
                startTime: searchCondition == undefined ? '':searchCondition.startTime,
                endTime: searchCondition == undefined ? '':searchCondition.endTime
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
    
    //根据id加载数据
    this.loadDataById = function(id) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugDestroy/edit',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
    
});
