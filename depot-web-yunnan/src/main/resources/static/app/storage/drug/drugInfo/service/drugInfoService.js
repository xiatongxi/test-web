"use strict";
angular.module('app.storage').service("drugInfoService", function($http, $q, APP_CONFIG) {
	// 获取列表.
    this.getPageInfo = function(pageNum, pageSize, drugInfo) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.drugManageUrl + '/depot/business/drugInfo/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                drugKind : drugInfo == undefined?"" : drugInfo.drugKind, //类别
                drugName : drugInfo == undefined?"" : drugInfo.drugName, //名称
                isEffective : drugInfo == undefined?"" : drugInfo.isEffective //状态
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject(response);
        });
        return d.promise;
    };

	// 获取使用中列表.
    this.getEffectiveList = function(pageNum, pageSize, searchCondition) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.drugManageUrl + '/depot/business/drugInfo/getEffectiveList',
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
    };


    // 根据id加载数据.
    this.loadDataById = function(id,orgId) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugInfo/edit',
            data: {
                id: id,
                orgId: orgId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };

    // 删除.
    this.remove = function(id,orgId) {
    	var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugInfo/remove',
            data: {
                id : id,
                orgId: orgId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };

    // 生效.
    this.effective = function(id) {
    	var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugInfo/effective',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };

});
