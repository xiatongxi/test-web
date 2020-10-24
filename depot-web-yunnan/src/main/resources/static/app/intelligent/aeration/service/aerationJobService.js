"use strict";

angular.module('app.intelligent').service("aerationJobService", function($http, $q,$rootScope, APP_CONFIG) {
	//通风作业查询
	this.getPageInfo = function(pageNum, pageSize, aerationJob) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.intelligentUrl + '/intelligents/aerationJob/getList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				taskNumber : aerationJob==undefined?"":aerationJob.taskNumber,
				
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
			url : APP_CONFIG.intelligentUrl + '/intelligents/aerationJob/getById',
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

	//通风作业保存
	this.save = function(apply,taskNumber) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.intelligentUrl + '/intelligents/aerationJob/save',
			data : {
				applyJobJson : angular.toJson(apply),
				taskNumber : taskNumber,
				creator : $rootScope.userInfo.realName,
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
			url : APP_CONFIG.intelligentUrl + '/intelligents/aerationJob/remove',
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

});