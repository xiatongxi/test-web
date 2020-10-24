"use strict";

angular.module('app.business').service("businessFileService", function($http, $q, APP_CONFIG) {
    this.remove = function(fileId) {
        var d = $q.defer();
        $http({
	        method: 'POST',
	        url: APP_CONFIG.businessUrl + '/depot/business/file/remove',
	        data: {
	        	id : fileId
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

    //修改文件存储数据
    this.getUpdateFile = function(fileIds, bid, fileType){
        var d = $q.defer();
        $http({
            method: 'POST',
            url : APP_CONFIG.businessUrl + '/depot/business/file/updateFile',
            data: {
                fileIds : angular.toJson(fileIds),
                bid : bid,
                fileType : fileType
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
    
    //获取文件数据
    this.getList = function(bid, fileType, orgId, order){
        var d = $q.defer();
        $http({
            method: 'GET',
            url : APP_CONFIG.businessUrl + '/depot/business/file/getList',
            params: {
            	fileType : fileType,
                bid : bid,
                orgId : orgId,
                order : order
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