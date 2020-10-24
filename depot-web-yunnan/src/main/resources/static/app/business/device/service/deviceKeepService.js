"use strict";

angular.module('app.business').service("deviceKeepService", function($http, $q, APP_CONFIG) {
    //器材列表
	this.getPageInfoDevice = function(pageNum, pageSize,deviceName,keepStatus,orgId,orgName){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.deviceUrl + '/deviceKeep/getDeviceList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				deviceName:deviceName,
				keepStatus:keepStatus,
				orgId:orgId,
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

  //根据id移除数据
    this.removeById = function(id){
        if (!confirm("确定要删除吗？")) {
            return;
        }
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.deviceUrl + '/deviceKeep/remove',
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
            method: 'GET',
            url: APP_CONFIG.deviceUrl + '/deviceKeep/loadDataById',
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
    

    //获取名称
    this.getDeviceName=function(){
    	var d = $q.defer();
    	$http({
    		method:"GET",
    		url:APP_CONFIG.deviceUrl + '/deviceKeep/getDeviceNameList'
    	}).then(function successCallback(response){
    		// 请求成功执行代码
    		d.resolve(response.data);
    	},function errorCallback(response){
    		// 请求失败执行代码
			d.reject("error");
    	})
    	 return d.promise;
    }
    
    //获取规格型号
    this.getDeviceModel=function(deviceName){
    	var d = $q.defer();
    	$http({
    		method:"GET",
    		url:APP_CONFIG.deviceUrl + '/deviceKeep/getDeviceModelList',
    		params:{
    			deviceName:deviceName
    		}
    	}).then(function successCallback(response){
    		// 请求成功执行代码
    		d.resolve(response.data);
    	},function errorCallback(response){
    		// 请求失败执行代码
    		d.reject("error");
    	})
    	return d.promise;
    }
    
    /**/
})
