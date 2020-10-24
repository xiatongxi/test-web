"use strict";

angular.module('app.system').service("funcService", function($http, $q, APP_CONFIG) {
	
	/**
	 * 查询功能列表
	 */
	this.getPageInfo = function(funcName) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/funcInfo/getFunc',
			params : {
				funcName : funcName
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
	 * 编辑功能信息，新增或修改
	 */
	this.editFunc = function(funcId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/funcInfo/edit',
			params : {
		    	 funcId : funcId
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
	 * 保存功能信息，新增或修改
	 */
	this.saveFunc = function(func) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.systemUrl + '/funcInfo/save',
			data : {
				funcInfoJson : angular.toJson(func)
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
	 * 删除功能信息
	 */
	this.deleteFunc = function(funcId) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.systemUrl + '/funcInfo/remove',
			data : {
				funcId : funcId
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
