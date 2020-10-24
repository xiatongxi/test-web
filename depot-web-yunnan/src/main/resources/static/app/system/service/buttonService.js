"use strict";

angular.module('app.system').service("buttonService", function($http, $q, APP_CONFIG) {
	
	/**
	 * 查询功能列表
	 */
	this.getPageInfo = function(funcId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/buttonInfo/getButton',
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
	 * 编辑功能信息，新增或修改
	 */
	this.editButton = function(btnId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/buttonInfo/edit',
			params : {
		    	 btnId : btnId
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
	this.saveButton = function(addedButton) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.systemUrl + '/buttonInfo/save',
			data : {
				buttonInfoJson : angular.toJson(addedButton)
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
	this.deleteButton = function(btnId) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.systemUrl + '/buttonInfo/remove',
			data : {
				btnId : btnId
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
