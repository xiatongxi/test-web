"use strict";

angular.module('app.business').service("storeWareDetailService", function($rootScope,$http, $q, APP_CONFIG) {
    
    this.deleteDetailDataById = function(id) {
    	var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.businessUrl + '/depot/business/storeWareDetail/remove',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
    
    // 通过 zid和 type获取 数据.
    this.getByZidAndType = function(zid, type) {
    	var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.businessUrl + '/depot/business/storeWareDetail/getByZidAndType',
            params: {
                zid : zid,
                type : type
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
    
    this.getChFromDsfjy = function(StoreQualitydata) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.agileUrl + '/agile/kcsw/getHouseOrWareList',
            params : {
				list : StoreQualitydata,
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
    
   /* this.getHwhFromDsfjy = function(grainDetailKind, grainGrade, houseId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/qualitycheck/getHouseOrWareList',
            params : {
            	subTypeDetailed : grainDetailKind,
				level : grainGrade,
				houseId : houseId
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }*/
     this.getchByfat = function(grainDetailKind, grainGrade) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.qualitycheckUrl + '/qualitycheck/getHouseByfat',
            params : {
            	grainDetailKind : grainDetailKind,
            	grainGrade : grainGrade
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
     
     this.getCountBych = function(grainDetailKind, grainGrade,storehouseId,warehouseId) {
    	 var d = $q.defer();
    	 $http({
    		 method : 'GET',
    		 url : APP_CONFIG.agileUrl + '/agile/kcsw/getCountBych',
    		 params : {
    			 grainDetailKind : grainDetailKind,
    			 grainGrade : grainGrade,
    			 storehouseId:storehouseId,
    			 warehouseId:warehouseId
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
    
     //从库存根据仓房和货位号获取相应信息
    this.getMassageFromKc = function(houseId,warehouseId,qualitycheckList) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.agileUrl + '/agile/kcsw/getMassageBych',
            params : {
            	storehouseId : houseId,
            	warehouseId : warehouseId,
            	qualitycheckList :angular.toJson(qualitycheckList)
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
    
    this.queryStoreWareDetailInfo = function(id) {
    	var d = $q.defer();
    	$http({
    		method : 'GET',
    		url : APP_CONFIG.businessUrl + '/depot/business/storeWareDetail/queryStoreWareDetailInfo',
    		params : {
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
})
