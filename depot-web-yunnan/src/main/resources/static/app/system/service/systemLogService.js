"use strict";

angular.module('app.system').service("systemLogService", function($http, $q, APP_CONFIG) {
	
	/**
	 * 查询日志列表
	 */
	this.getPageInfo = function(pageNum, pageSize, username, realName, roleId, orgIds) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/systemLog/getSystemLog',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				username : username
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
	
	/**
	 * 保存日志
	 */
	this.save = function() {
		
		var d = $q.defer();
    	$http({
            method: 'POST',
            url : APP_CONFIG.systemUrl + '/systemLog/save',
//            data: {
//           	    enumJson : angular.toJson(basicEnum)
//            }
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

