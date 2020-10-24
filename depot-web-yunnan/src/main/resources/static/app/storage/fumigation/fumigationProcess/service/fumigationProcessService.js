"use strict";
angular.module('app.storage').service("fumigationProcessService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, searchCondition, orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.taskUrl + '/depot/storage/fumigationProcess/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
        		fumigationType : searchCondition == undefined ? "" : searchCondition.fumigationType, 
                drugName : searchCondition == undefined ? "" : searchCondition.drugName,
        		houseId : searchCondition == undefined ? "" : searchCondition.houseId,
        		grainKind : searchCondition == undefined ? "" : searchCondition.grainKind,
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
    
    //根据id加载数据
    this.loadDataById = function(id) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.taskUrl + '/depot/storage/fumigationProcess/edit',
            params: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
    
    // 根据id删除数据
    this.deleteById = function(id) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.taskUrl + '/depot/storage/fumigationProcess/deleteById',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
    
    // 根据id删除数据
    this.deleteDetailByDetailId = function(id) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.taskUrl + '/depot/storage/fumigationProcess/deleteDetailByDetailId',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }

    // 根据id删除数据
    this.save = function(fumigationProcess, addedDetail, userInfo) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.taskUrl + '/depot/storage/fumigationProcess/save',
            data: {
            	storageFumigationProcessJson : angular.toJson(fumigationProcess),
				detailJson : angular.toJson(addedDetail),
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
