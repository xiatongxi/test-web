"use strict";

angular.module('app.storage').service("safeproduceService", function($http, $q, APP_CONFIG, $rootScope) {
	
	this.getPageInfo = function(pageNum, pageSize, type, fileName){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.safeProduceUrl + '/safeProduce/getList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				type : type,
				fileName : fileName,
				orgId : $rootScope.orgInfo.orgId
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

	this.edit = function(id){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.safeProduceUrl + '/safeProduce/edit',
			params : {
				id : id
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

	this.save = function(storageSafeProduce){
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.safeProduceUrl + '/safeProduce/save',
			data : {
				storageSafeProduceJson : angular.toJson(storageSafeProduce)
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

	this.delete = function(id, fileUrl){
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.safeProduceUrl + '/safeProduce/remove',
			data : {
				id : id,
                fileUrl: fileUrl
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

    this.deleteOnlyFile = function(fileUrl){
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.safeProduceUrl + '/safeProduce/deleteOnlyFile',
            params : {
                fileUrl: fileUrl
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
	
});
