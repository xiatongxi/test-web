"use strict";

angular.module('app.business').service("deviceCheckService", function($http, $q, APP_CONFIG) {
    //盘点列表
	this.getPageInfoDevice = function(pageNum, pageSize,pdNum,starttime,endtime){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.deviceUrl + '/deviceCheck/getCheckList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
                pdNum: pdNum,
                starttime: starttime,
                endtime: endtime
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

	//获取盘点单号
	this.getCheckListNoPage = function(pageNum, pageSize,pdNum,starttime,endtime){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.deviceUrl + '/deviceCheck/getCheckListNoPage',
			params : {
			}
		}).then(function successCallback(response) {
			d.resolve(response.data);
		}, function errorCallback(response) {
			d.reject("error");
		});
		return d.promise;
	}
	
	this.getCount = function (depotId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.deviceUrl + '/deviceCheck/getCountForDate',
            params : {
                depotId : depotId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            d.reject("error");
        });
        return d.promise;
    }

	//根据盘点种类，获取子盘点种类
	this.changePdzl = function (depotId,deviceType) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.deviceUrl + '/deviceCheck/childZlList',
            params : {
                position : depotId,
                deviceType : deviceType
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            d.reject("error");
        });
        return d.promise;
    }
    
  //根据id加载数据
    this.loadDataById = function(id,pddh){
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.deviceUrl + '/deviceCheck/loadDataByDepotId',
            params: {
                id : id == ""?-1:id*1,
                pddh : pddh
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            //console.log(response);
        });
        return d.promise;
    }

  //根据id移除数据
    this.remove = function(houseId,checkNum){
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.deviceUrl + '/deviceCheck/remove',
            data: {
                depotId : houseId,
                checkNum : checkNum
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            //console.log(response);
        });
        return d.promise;
    }
})
