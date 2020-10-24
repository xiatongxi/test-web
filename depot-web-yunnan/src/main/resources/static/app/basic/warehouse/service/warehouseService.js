"use strict";

angular.module('app.basic').service("warehouseService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, ware, orgId, libraryType, delFlag) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/Warehouse/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                storehouseId : ware == undefined?"":ware.storehouseId, //仓房
                warehouseId : ware == undefined?"":ware.warehouseId,  //货位id
                warehouseName : ware == undefined?"":ware.warehouseName,  //货位名称
                graindepotId : orgId,
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
    
    // 货位下拉框获取(以单位和仓房为条件获取)
    this.getStorehouse = function(unitId, storehouseId, libraryType) { //传值单位ID和仓房ID
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/Warehouse/getWarehouse',
            params : {
            	unitId : unitId,
            	storehouseId : storehouseId,
            	libraryType : libraryType
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
        	// data.wareList的值用于货位下拉列表
        	// data.wares 的值用于查询列表中货位名称的转换
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }
    
    // 提交表单
    this.save = function(warehouse, userInfo) {
        var d = $q.defer();
    	$http({
            method: 'POST',
            url: APP_CONFIG.basicUrl + '/Warehouse/edit',
            data: {
            	warehouseJson : angular.toJson(warehouse),
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
    
    //新增或修改查询后台一条数据信息
    this.findByWarehouse = function(id) {
    	var d = $q.defer();
    	$http({
	        method: 'GET',
	        url: APP_CONFIG.basicUrl + '/Warehouse/findByWarehouse',
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

    // 删除一条记录
    this.remove = function(id,storehouseId) {
    	var d = $q.defer(); 
    	$http({
             method: 'POST',
             url: APP_CONFIG.basicUrl + '/Warehouse/remove',
             data: {
                 id : id,
                 storehouseId : storehouseId
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
    
    //去重
    this.findWarehouseCode = function(storehouseId, warehouseCode, id, libraryType) {
    	var d = $q.defer();
    	$http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/Warehouse/findWareCode',
            params : {
            	storehouseId : storehouseId,
            	warehouseCode : warehouseCode,
            	wareId : id,
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

});
