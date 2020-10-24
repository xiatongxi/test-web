"use strict";

angular.module('app.basic').service("strategyService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/strategyInfo/getStrategy',
            params : {
                pageNum : pageNum,
                pageSize : pageSize
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

    // 查询一条数据
    this.edit = function(id) {
   	    var d = $q.defer();
    	$http({
    		method: 'GET',
    		url: APP_CONFIG.baseUrl + '/strategyInfo/edit',
    		params: {
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
    }
    
    //提交表单
    this.save = function(strategy) {
        var d = $q.defer();
    	$http({
            method: 'POST',
            url: APP_CONFIG.baseUrl + '/strategyInfo/update',
            data: {
            	strategyJson : angular.toJson(strategy)
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
    
    // 删除一条记录
    this.remove = function(id) {
         var d = $q.defer();
         $http({
             method: 'POST',
             url: APP_CONFIG.baseUrl + '/strategyInfo/remove',
             params: {
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
    }

});
