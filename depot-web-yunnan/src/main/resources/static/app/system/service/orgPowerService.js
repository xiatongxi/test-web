"use strict";

angular.module('app.system').service("orgPowerService", function($http, $q, APP_CONFIG) {
	
	/**
	 * 根据用户查询机构权限列表
	 */
	this.getUserOrg = function(userId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/userOrg/getByUserId',
			params : {
				userId : userId
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
	 * 提交用户机构权限
	 */
	this.saveUserOrg = function(userId, orgIds, orgId) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.systemUrl + '/userOrg/save',
			params : {
				userId : userId,
				departIds : orgIds.join(","),
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
	
})
