"use strict";

angular.module('app.system').service("roleService", function($http, $q, APP_CONFIG) {
	
	/**
	 * 查询角色列表
	 */
	this.getPageInfo = function(roleName) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/roleInfo/getRole',
			params : {
				roleName : roleName
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
	 * 编辑角色信息，新增或修改
	 */
	this.editRole = function(roleId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/roleInfo/edit',
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
	 * 保存角色信息，新增或修改
	 */
	this.saveRole = function(role) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.systemUrl + '/roleInfo/save',
			data : {
				roleInfoJson : angular.toJson(role)
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
	 * 删除角色信息
	 */
	this.deleteRole = function(roleId) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.systemUrl + '/roleInfo/remove',
			data : {
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
	
	//获取所有角色
	this.getRoleTree = function() {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/roleInfo/getRoleTree',
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}
	
	//根据机构获取角色
	this.getRoleTreeByOrg = function(orgId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/roleInfo/getRoleTreeByOrg',
			params : {
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
