"use strict";

angular.module('app.system').service("powerService", function($http, $q, APP_CONFIG) {
	
	/**
	 * 根据角色查询角色功能权限列表
	 */
	this.getRoleFunc = function(roleId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/roleFunc/getByRoleId',
			params : {
				roleId : roleId
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
	 * 提交角色功能权限
	 */
	this.saveRoleFunc = function(roleId, funcIds) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.systemUrl + '/roleFunc/save',
			params : {
				roleId : roleId,
				funcIds : funcIds.join(",")
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
	 * 获取角色按钮权限
	 */
	this.getRoleButton = function(roleId) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.systemUrl + '/roleButton/getRoleButton',
			params : {
				roleId : roleId
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
	 * 提交角色按钮权限
	 */
	this.saveRoleButton = function(roleId, btnIds) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.systemUrl + '/roleButton/save',
			params : {
				roleId : roleId,
				btnIds : btnIds.join(",")
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
	 * 根据角色查询功能列表
	 */
	this.getFuncByRoleId = function(roleId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/roleFunc/getFuncByRoleId',
			params : {
				roleId : roleId
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
	 * 根据用户查询功能列表
	 */
	this.getFuncByUserId = function() {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/roleFunc/getFuncByUserId'
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
	 * 根据用户查询按钮列表
	 */
	this.getButtonByUserId = function() {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/roleButton/getByUser'
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
