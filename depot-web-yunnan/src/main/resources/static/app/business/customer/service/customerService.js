"use strict";
angular.module('app.business').service("customerService", function($http, $q, APP_CONFIG) {
    // 获取列表.
    this.getPageInfo = function(pageNum, pageSize,  searchCondition ,orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.customerUrl + '/depot/business/customer/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                name : searchCondition == undefined ? "" : searchCondition.name, 
                classify : searchCondition == undefined ? "" : searchCondition.classify,
                isInBlacklist : searchCondition == undefined ? "" : searchCondition.isInBlacklist,
                orgId:orgId
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject(response);
        });
        return d.promise;
    }
    
    // 根据id加载数据
    this.loadDataById = function(id) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.customerUrl + '/depot/business/customer/edit',
            params: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
    
    this.save = function (customer,orgId) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.customerUrl + '/depot/business/customer/save',
            data: {
                customerJson : angular.toJson(customer),
                orgId : orgId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
})
