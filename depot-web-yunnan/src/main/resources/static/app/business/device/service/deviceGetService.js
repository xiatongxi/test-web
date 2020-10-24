"use strict";

angular.module('app.business').service("deviceGetService", function($http, $q,$rootScope, APP_CONFIG) {
    //器材列表
	this.getPageInfoGet = function(pageNum, pageSize,deviceName,deviceType,orgName){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.deviceUrl + '/deviceGet/getDeviceList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				deviceName:deviceName,
				deviceType:deviceType,
				orgName:orgName
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
	
	/*this.getHouseList = function(){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.baseUrl + '/deviceGet/getHouseList'
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		
		return d.promise;
	}*/
	
	/*this.getTypeGetList = function(depotId){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.baseUrl + '/deviceGet/getTypeList',
			params : {
				depotId:depotId
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		
		
		return d.promise;
	}*/
	
	
	//根据类型获取名称
	this.getNameGetList = function(depotTypeId){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.deviceUrl + '/deviceGet/getNameList',
			params : {
				depotTypeId:depotTypeId
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
	//根据名称获取货架
	this.getShelfGetList = function(deviceName){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.deviceUrl + '/deviceGet/getShelfGetList',
			params : {
				deviceName:deviceName
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
	//根据货架获取规格型号
	this.getModelGetList = function(shelfId,deviceName){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.deviceUrl + '/deviceGet/getModelGetList',
			params : {
				shelfId:shelfId,
				deviceName:deviceName
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
	
	//根据规格型号获取编号
	this.getNumberGetList = function(deviceTypeId,deviceName,shelfId,model,orgId){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.deviceUrl + '/deviceGet/getNumberGetList',
			params : {
				deviceTypeId:deviceTypeId,
				deviceName:deviceName,
				shelfId:shelfId,
				model:model,
				orgId:orgId
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
	
	//根据编号和规格型号获取可用数量
	this.getUseCountGetList = function(deviceTypeId,deviceName,shelfId,number,model){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.deviceUrl + '/deviceGet/getUseCountGetList',
			params : {
				deviceTypeId:deviceTypeId,
				deviceName:deviceName,
				shelfId:shelfId,
				number:number,
				model:model,
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
	
	this.getcontentNameList = function(depotTypeId){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.deviceUrl + '/deviceGet/getcontentNameList',
			params : {
				depotTypeId:depotTypeId
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
	
	//根据ID获取借取信息
	this.getDeviceGetById = function(id){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.deviceUrl + '/deviceGet/getDeviceGetById',
			params : {
				id:id
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
	//获取归还信息
	this.getDeviceBackById = function(id){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.deviceUrl + '/deviceGet/getDeviceBackById',
			params : {
				id:id
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
	
	/*this.updateDeviceGetById = function(deviceGet){
		var d = $q.defer();
		$http({
			method : 'GET',
			params : {
				deviceGet
			},
			url : APP_CONFIG.baseUrl + '/deviceGet/updateDeviceGetById'
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		
		return d.promise;
	}*/

})
