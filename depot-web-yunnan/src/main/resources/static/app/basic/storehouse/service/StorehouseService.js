"use strict";

angular.module('app.basic').service("StorehouseService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, storehouseId, orgId, libraryType, delFlag) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/Storehouse/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                houseId : storehouseId, //仓房id
                orgId : orgId,
                libraryType : libraryType,
                delFlag : delFlag
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

    this.getAgentList = function(depotId,orgId,libraryType) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/Storehouse/getAgentList',
            params : {
                depotId : depotId,
                orgId : orgId,
                libraryType : libraryType
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
    
    // 以单位为条件的的仓房下拉列表(统一对外接口)
    this.getStorehouseList = function(unitId, libraryType) { //传值单位ID和仓房性质
        // 默认主粮库(代储库需要传参'1')
        if (libraryType != '1') {
            libraryType = '0';
        }
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/Storehouse/getStorehouseList',
            params : {
            	unitId : unitId,
            	libraryType : libraryType
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
    //去重
    this.findStorehouseCode = function(storehouseCode,id,libraryType) {
    	var d = $q.defer();
    	$http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/Storehouse/findStoreCode',
            params : {
            	storehouseCode : storehouseCode,
            	storeId : id,
                libraryType : libraryType
            }
        }).then(function successCallback(response) {
        	// 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });

        return d.promise;
    }
    	
    // 提交表单
    this.save = function(basicStorehouse, userInfo) {
        var d = $q.defer();
    	$http({
            method: 'POST',
            url: APP_CONFIG.basicUrl + '/Storehouse/edit',
            data: {
           	    storehouseJson : angular.toJson(basicStorehouse),
           	    userInfo : angular.toJson(userInfo)
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
           d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
        
        return d.promise;
    }
    
    this.findByStorehouse = function(id, orgId) {
    	var d = $q.defer();
    	$http({
	        method: 'GET',
	        url: APP_CONFIG.basicUrl + '/Storehouse/findByStorehouse',
	        params: {
	            id : id,
	            orgId : orgId
	        }
	    }).then(function successCallback(response) {
	   	 	// 请求成功执行代码
	    	d.resolve(response.data);
	    }, function errorCallback(response) {
	        // 请求失败执行代码
	        console.log(response);
	    });
    	return d.promise;
    }
    this.remove = function(id) {
    	var d = $q.defer();
    	$http({
    		method: 'POST',
    		url: APP_CONFIG.basicUrl + '/Storehouse/remove',
    		params: {
    			id : id
    		}
    	}).then(function successCallback(response) {
    		// 请求成功执行代码
    		d.resolve(response.data);
    	}, function errorCallback(response) {
    		// 请求失败执行代码
    		console.log(response);
    	});
    	return d.promise;
    }

    //根据角色不同查询不同的仓房
    this.findStoreHouseListByRole = function(pageNum, pageSize, storehouseId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/Storehouse/findStoreHouseListByRole',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                houseNo : storehouseId

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

    //当前登录人保管的仓房
    this.findStoreHouseListByLoginUser = function(userInfo) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/Storehouse/findStoreHouseListByLoginUser',
            params : {
                userInfo:angular.toJson(userInfo)
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
    
    // 查询三温检查列表最新数据所对应的仓房
    this.getThreeTempCheckList = function(orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/Storehouse/getThreeTempCheckList',
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
});
