"use strict";

angular.module('app.storage').service("aerationSummaryService", function($http, $q, APP_CONFIG) {
	//通风记录查询
	this.getPageInfo = function (pageNum, pageSize, summary) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.taskUrl + '/AerationSummary/getList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				goodsKinds : summary == undefined?"":summary.goodsKinds,
				aerationTarget : summary == undefined?"":summary.aerationTarget,
                houseId : summary == undefined ? "" : summary.houseId
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
	
	//通风申请查询
	this.edit = function (id) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.taskUrl + '/AerationSummary/edit',
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
	
	//保存
	this.save = function (record, taskStatus, orgId) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.taskUrl + '/AerationSummary/update',
			data : {
				recordJson : angular.toJson(record),
				taskStatus : taskStatus,
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
	
	//删除
	this.remove = function (summary) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.taskUrl + '/AerationSummary/delete',
			data : {
				summaryJson : angular.toJson(summary)
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