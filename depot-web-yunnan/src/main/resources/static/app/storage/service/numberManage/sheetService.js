"use strict";

angular.module('app.business').service("sheetService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, searchCondition) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.numberManageUrl + '/storageSheet/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                houseId : searchCondition == undefined?"" : searchCondition.houseId,
                warehouseId : searchCondition == undefined?"" : searchCondition.warehouseId,
                searchStartDate : searchCondition == undefined?"" : searchCondition.searchStartDate,
                searchEndDate : searchCondition == undefined?"" : searchCondition.searchEndDate
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
    
    //根据id加载数据
    this.loadDataById = function(id) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.numberManageUrl + '/storageSheet/edit',
            params: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(angular.fromJson(angular.toJson(response.data)));
//            console.log(angular.fromJson(angular.toJson(response.data)));
        }, function errorCallback(response) {
        });
        return d.promise;
    }
    //根据仓号，货位号查询实际库存
    this.getPageInfobeen = function(pageNum, pageSize,houseId,warehouseId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.numberManageUrl + '/storageSheet/getLists',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                houseId : houseId == undefined?"" : houseId,
                warehouseId : warehouseId == undefined?"" : warehouseId
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

    /**
     * 保存
     */
    this.save = function(profitlossSheet, userInfo) {
    	var d = $q.defer();
	    $http({
	        method: 'POST',
	        url: APP_CONFIG.numberManageUrl + '/storageSheet/save',
	        data: {
	        	storageProfitlossSheetJson : angular.toJson(profitlossSheet),
	        	userInfo : angular.toJson(userInfo)
	        }
	    }).then(function successCallback(response) {
	    	d.resolve(response.data);
	    }, function errorCallback(response) {
	    	// 请求失败执行代码
            d.reject("error");
	    });
	    return d.promise;
    }
})
