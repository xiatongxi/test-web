"use strict";

angular.module('app.system').service("depotUrlService", function($http, $q, APP_CONFIG) {
	
	/**
	 * 查询url配置列表
	 */
	this.getPageInfo = function(pageNum, pageSize, intranetUrl, orgName, updateStatus) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/urlConfig/getUrlConfig',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				intranetUrl : intranetUrl,
				orgName : orgName,
				updateStatus : updateStatus
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
	 * 编辑url配置信息，新增或修改
	 */
	this.editUrlConfig = function(id) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/urlConfig/edit',
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
	}
	
	/**
	 * 保存用户信息，新增或修改
	 */
	this.saveUrlConfig = function(urlConfig) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.systemUrl + '/urlConfig/save',
			data : {
				urlConfigJson : angular.toJson(urlConfig)
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
	 * 删除用户信息
	 */
	this.deleteUrlConfig = function(id) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.systemUrl + '/urlConfig/remove',
			data : {
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
	
	/**
	 * 验证用户名是否可用
	 */
	this.validUsername = function(userId, username) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/userInfo/validUsername',
			data : {
				userId : userId,
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
	
})
