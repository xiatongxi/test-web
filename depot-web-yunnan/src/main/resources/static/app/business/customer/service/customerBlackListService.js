"use strict";

angular.module('app.business').service("customerBlackListService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, searchCondition) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.customerUrl + '/depot/business/customer/getBlackList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                name : searchCondition == undefined?"" : searchCondition.name, 
                classify : searchCondition == undefined?"" : searchCondition.classify
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
    
    //根据id加载数据
    this.loadDataById = function(id) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.customerUrl + '/depot/business/customer/edit',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
    
    // 加入黑名单.
    this.addBlackList = function(id) {
    	var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.customerUrl + '/depot/business/customer/putInBlackList',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
})
