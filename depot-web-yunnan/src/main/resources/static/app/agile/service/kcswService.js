"use strict";

angular.module('app.agile').service("kcswService", function($rootScope,$http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, kcswStr, order) {
        var d = $q.defer();
        $http({
            method : 'GET', 
            url : APP_CONFIG.agileUrl + '/agile/kcsw/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                kcswStr : angular.toJson(kcswStr),
                order : order,
                kcsl : kcswStr==undefined?"":kcswStr.kcsl
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

    this.getCountKczl = function(orgId) {
        var d = $q.defer();
        $http({
            method : 'GET', 
            url : APP_CONFIG.agileUrl + '/agile/kcsw/countByBl',
            params : {
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
    };

    this.getEmptyList = function(pageNum, pageSize, kcswStr) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.agileUrl + '/agile/kcsw/getEmptyList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                kcswStr : angular.toJson(kcswStr)
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

    //清空仓房的库存信息
    this.emptyKcsw = function(userInfo, profitlossSheet) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.agileUrl + '/agile/kcsw/emptyKcsw',
            data : {
            	userInfo : angular.toJson(userInfo),
                profitlossSheet : angular.toJson(profitlossSheet)
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
    
    
    //根据orgId查询
    this.queryKcData = function(orgId,houseId,warehouseId) {
    	var d = $q.defer();
    	$http({
    		method : 'GET',
    		url : APP_CONFIG.agileUrl + '/agile/kcsw/queryKcData',
    		params : {
    			orgId : orgId,
    			houseId : houseId,
    			warehouseId : warehouseId
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

    //根据orgId查询
    this.queryKcswData = function(datas) {
    	var d = $q.defer();
    	$http({
    		method : 'POST',
    		url : APP_CONFIG.agileUrl + '/agile/kcsw/queryKcswData',
    		params : {
    			datas : datas
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
    
    //根据orgId查询符合条件的轮换计划
    this.queryLhData = function(orgId) {
    	var d = $q.defer();
    	$http({
    		method : 'GET',
    		url : APP_CONFIG.agileUrl + '/agile/kcsw/queryLhData',
    		params : {
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

    //查询库存数量和入库时间
    this.getPageInfoOrRcsj = function( kcswStr) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.agileUrl + '/agile/kcsw/getListOrRcsj',
            params : {
                kcswStr : angular.toJson(kcswStr)
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
});
