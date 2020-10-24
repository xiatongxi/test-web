"use strict";

angular.module('app.storage').service("dumpService", function($http, $q, APP_CONFIG) {
	//转储管理查询
	this.getPageInfo = function (pageNum, pageSize, search, orgId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.qualitycheckUrl + '/StorageDumpController/getList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				houseId : search == undefined?"":search.houseId,
				wareId : search == undefined?"":search.wareId,
				ylsxz : search == undefined?"":search.yLsxz,
				xlsxz : search == undefined?"":search.xLsxz,
				startTime : search == undefined?"":search.startTime,
				endTime : search == undefined?"":search.endTime,
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

	//查询验收完的数据
	this.getYswDataPageInfo = function (pageNum, pageSize, search, orgId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.qualitycheckUrl + '/StorageDumpController/selectYswData',
			params : {
				pageNum : pageNum,
				pageSize : pageSize
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

	//详情
	this.edit = function (id) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.qualitycheckUrl + '/StorageDumpController/edit',
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
	this.save = function (dump, crk_ip) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.qualitycheckUrl + '/StorageDumpController/save',
			data : {
				dumpJson : angular.toJson(dump),
				crk_ip : crk_ip
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