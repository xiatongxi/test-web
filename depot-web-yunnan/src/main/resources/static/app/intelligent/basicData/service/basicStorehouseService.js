"use strict";

angular.module('app.basic').service("basicStorehouseService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, store, orgId, libraryType) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/Storehouse/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                storeName : store == undefined?"":store.storehouseName,  //仓房名称
                houseId : store == undefined?"":store.storehouseId,
                orgId : orgId,
                storehouseState : store == undefined?"":store.storehouseState,
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

    //判断仓房名称是否存在
    this.itExistName = function(vCfName) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/house/getBycfName',
            params : {
                vCfName:vCfName
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
    //判断仓房编码是否存在
    this.itExistCode = function(vCfCode) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/house/getBycfCode',
            params : {
                vCfCode:vCfCode
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
