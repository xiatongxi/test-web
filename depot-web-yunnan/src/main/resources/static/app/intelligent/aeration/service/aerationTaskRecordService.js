"use strict";

angular.module('app.intelligent').service("aerationTaskRecordService", function($http, $q,$rootScope, APP_CONFIG) {
	//通风记录查询
	this.getPageInfo = function (pageNum, pageSize, aerationTaskRecord,type) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.intelligentUrl + '/intelligents/aerationRecord/getList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				vCfCode : aerationTaskRecord==undefined?"":aerationTaskRecord.vCfCode,
				vDevKindCode : aerationTaskRecord==undefined?"":aerationTaskRecord.vDevKindCode,
				type : type
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
	
	
	//通风记录保存
	this.save = function(operationRecord) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.intelligentUrl + '/intelligents/aerationRecord/add',
			data : {
				tVentilationJson : angular.toJson(operationRecord),
				orgId : $rootScope.userInfo.orgId
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
	
	
	//删除
	this.remove = function(id) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.intelligentUrl + '/intelligents/aerationRecord/deleteById',
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
	
	
	//通风详情查询
	this.edit = function(id) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.intelligentUrl + '/intelligents/aerationRecord/getById',
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
});