"use strict";

angular.module('app.storage').service("aerationTaskRecordService", function($http, $q, APP_CONFIG) {
	//通风申请查询
	this.getPageInfo = function (pageNum, pageSize, aerationTaskRecord, orgId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.taskUrl + '/aerationTaskRecord/getList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				houseId : aerationTaskRecord==undefined?"":aerationTaskRecord.houseId,
				foodType : aerationTaskRecord==undefined?"":aerationTaskRecord.foodType,
				aerationType : aerationTaskRecord==undefined?"":aerationTaskRecord.aerationType,
				taskStatus : aerationTaskRecord==undefined?"":aerationTaskRecord.taskStatus,
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
	
	//通风申请查询
	this.edit = function (id) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.taskUrl + '/aerationTaskRecord/edit',
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
	this.save = function (record, tempList, waterList, userInfo) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.taskUrl + '/aerationTaskRecord/update',
			data : {
				userInfo : angular.toJson(userInfo),
				recordJson : angular.toJson(record),
				tempListJson : angular.toJson(tempList),
				waterListJson : angular.toJson(waterList)
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
	
	//删除整条通风过程和他的子表数据
	this.remove = function (id) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.taskUrl + '/aerationTaskRecord/delete',
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

	//删除整条通风过程的一条子表数据
	this.removeCheckRecord = function (id) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.taskUrl + '/aerationTaskRecord/deleteCheckRecord',
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

	//校验这个仓房有没有还没结束的数据
	this.checkHouseIsJS = function(houseId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.taskUrl + '/aerationTaskRecord/checkHouseIsJS',
			params : {
				houseId : houseId
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

	//获取已经结束通风但是没有进行善后工作的仓房数据
	this.getNotAftercareHouseList = function(orgId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.taskUrl + '/aerationTaskRecord/getNotAftercareHouseList',
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
	
	//获取已经结束通风但是没有进行善后工作的仓房数据
	this.getTaskRecord = function(houseId, orgId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.taskUrl + '/aerationTaskRecord/getTaskRecord',
			params : {
				houseId : houseId,
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
});