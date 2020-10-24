"use strict";

angular.module('app.synth').service("foodTracesService", function($http,$filter, $q, APP_CONFIG) {
	//粮食追溯查询列表
	this.getPageInfo = function (pageNum, pageSize, obj) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.baseUrl + '/FoodstuffTraces/getList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				idx : obj==undefined?"":obj.idx
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
	
	//查询一条粮情转卡数据
	this.edit = function (food) {
		var d = $q.defer();
		var modifyDate = $filter('date')(food.modifyDate, "yyyy-MM-dd HH:mm:ss");
		$http({
			method : 'GET',
			url : APP_CONFIG.baseUrl + '/FoodstuffTraces/queryStorageFoodbasicinfo',
			params : {
				houseId : food == undefined?"":food.ch,
				wareHouse : food == undefined?"":food.hwh,
				shnd : food == undefined?"":food.shnd,
				lqdw : food == undefined?"":food.recordUnite,
				rcrq : food == undefined?"":modifyDate,
				lspz : food == undefined?"":food.lspz
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