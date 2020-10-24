"use strict";

angular.module('app.business').service("deviceInputService", function($http, $q,$rootScope, APP_CONFIG) {
    //器材列表
	this.getPageInfoDevice = function(pageNum, pageSize,deviceName,deviceType,orgName){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.deviceUrl + '/deviceInput/getDeviceList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				deviceName:deviceName,
				deviceType : deviceType,
				orgName : orgName
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

  //根据id移除数据
    this.removeById = function(id){
        if (!confirm("确定要删除吗？")) {
            return;
        }
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.deviceUrl + '/deviceInput/remove',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            //console.log(response);
        });
        return d.promise;
    }
  
    
   //根据id加载数据
    this.loadDataById = function(id){
        var d = $q.defer();
        $http({
        	method : 'GET',
            url: APP_CONFIG.deviceUrl + '/deviceInput/loadDataById',
            params: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            //console.log(response);
        });
        return d.promise;
    }

  /*//增加
    this.save = function(device){
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.deviceUrl + '/deviceInput/save',
            data: {
            	deviceInputJson : angular.toJson(device)
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            //console.log(response);
        });
        return d.promise;
    }
    */
    
    //设备管理台账
	this.getDeviceAccount = function(pageNum, pageSize,deviceType){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.deviceUrl + '/deviceInput/getDeviceAccountList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				deviceType : deviceType,
				orgName : $rootScope.orgInfo.orgName
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
