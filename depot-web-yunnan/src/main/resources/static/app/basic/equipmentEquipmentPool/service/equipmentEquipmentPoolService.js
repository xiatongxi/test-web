"use strict";

angular.module('app.basic').service("equipmentEquipmentPoolService", function($http, $rootScope, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, pool) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.deviceUrl + '/BasicEquipmentEquipmentPool/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                shelfId : pool==undefined?"":pool.shelfId,
                warehouseId : pool==undefined?"":pool.warehouseId,
                orgId : $rootScope.userInfo.orgId
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

    
    // 查询一条数据
    this.edit = function(id) {
   	    var d = $q.defer();
    	$http({
    		method: 'GET',
    		url: APP_CONFIG.deviceUrl + '/BasicEquipmentEquipmentPool/edit',
    		params: {
    			id : id
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
    
    //提交表单
    this.save = function(pool, orgId, userId) {
        var d = $q.defer();
    	$http({
            method: 'POST',
            url: APP_CONFIG.deviceUrl + '/BasicEquipmentEquipmentPool/update',
            data: {
           	    poolJson : angular.toJson(pool),
           	    orgId : orgId,
           	    userId : userId
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
    
    // 删除一条记录
    this.remove = function(id) {
         var d = $q.defer();
         $http({
             method: 'POST',
             url: APP_CONFIG.deviceUrl + '/BasicEquipmentEquipmentPool/remove',
             data: {
                 id : id
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
