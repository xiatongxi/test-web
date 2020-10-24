"use strict";

angular.module('app.business').service("deviceRepairService", function($http, $q, APP_CONFIG) {
    //器材列表
	this.getPageInfoDevice = function(pageNum, pageSize,repairStatus,orgName){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.deviceUrl + '/deviceRepair/getDeviceList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				repairStatus:repairStatus,
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

  /*//根据id移除数据
    this.removeById = function(id){
        if (!confirm("确定要删除吗？")) {
            return;
        }
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.baseUrl + '/deviceInput/remove',
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
  */
    
   //根据id加载数据
    this.loadDataById = function(id){
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.deviceUrl + '/deviceRepair/loadDataById',
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
    
    //获取维修的设备名称
    this.getDeviceName = function(){
    	var d = $q.defer();
    	$http({
    		method: 'GET',
    		url: APP_CONFIG.deviceUrl + '/deviceRepair/getDeviceNameList',
    	}).then(function successCallback(response) {
    		d.resolve(response.data);
    	}, function errorCallback(response) {
    		console.log(response);
    	});
    	return d.promise;
    }
    
   /* //获取仓房对应的设备名称
    this.getdeviceNameList = function(depotId){
    	var d = $q.defer();
    	$http({
    		method: 'GET',
    		url: APP_CONFIG.baseUrl + '/deviceRepair/getDeviceName',
    		params: {
    			 depotId : depotId
             }
    	}).then(function successCallback(response) {
    		d.resolve(response.data);
    	}, function errorCallback(response) {
    		console.log(response);
    	});
    	return d.promise;
    }
    */
    //获取设备名称对应的型号
    this.getDeviceModel = function(deviceName){
    	var d = $q.defer();
    	$http({
    		method: 'GET',
    		url: APP_CONFIG.deviceUrl + '/deviceRepair/getDeviceModel',
    		params: {
    			deviceName : deviceName
    		}
    	}).then(function successCallback(response) {
    		d.resolve(response.data);
    	}, function errorCallback(response) {
    		console.log(response);
    	});
    	return d.promise;
    }
    
   /* //获取型号对应的编号
    this.getNumberList = function(deviceModel){
    	var d = $q.defer();
    	$http({
    		method: 'GET',
    		url: APP_CONFIG.baseUrl + '/deviceRepair/getDeviceNumber',
    		params: {
    			deviceModel : deviceModel
    		}
    	}).then(function successCallback(response) {
    		d.resolve(response.data);
    	}, function errorCallback(response) {
    		console.log(response);
    	});
    	return d.promise;
    }*/
    
    
   /* //获取编号对应的数量
    this.getUseCount = function(number){
    	var d = $q.defer();
    	$http({
    		method: 'GET',
    		url: APP_CONFIG.baseUrl + '/deviceRepair/getDeviceCount',
    		params: {
    			number : number,
    			model:model
    		}
    	}).then(function successCallback(response) {
    		d.resolve(response.data);
    	}, function errorCallback(response) {
    		console.log(response);
    	});
    	return d.promise;
    }
*/

})
