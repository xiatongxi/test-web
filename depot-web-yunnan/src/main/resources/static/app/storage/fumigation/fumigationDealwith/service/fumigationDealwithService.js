"use strict";

angular.module('app.storage').service("fumigationDealwithService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.taskUrl + '/depot/storage/fumigationDealwith/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                orgId : orgId
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
            method: 'GET',
            url: APP_CONFIG.taskUrl + '/depot/storage/fumigationDealwith/edit',
            params: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        	// 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }

    this.deleteById = function(id) {
    	var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.taskUrl + '/depot/storage/fumigationDealwith/deleteById',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        	// 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }

    //保存
    this.save = function(fumigationDealwith, userInfo) {
    	var d = $q.defer();
    	$http({
			method: 'POST',
			url: APP_CONFIG.taskUrl + '/depot/storage/fumigationDealwith/save',
			data: {
				storageFumigationDealwithJson : angular.toJson(fumigationDealwith),
				userInfo : angular.toJson(userInfo)
			}
		}).then(function successCallback(response) {
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
            d.reject("error");
		});
        return d.promise;
    }

})
