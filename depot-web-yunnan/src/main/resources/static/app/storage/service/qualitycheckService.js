"use strict";

angular.module('app.storage').service("qualitycheckService", function($http, $q, APP_CONFIG) {
	this.getPageInfo = function(pageNum, pageSize,type,checkResult,storehouseId,warehouseId){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.qualitycheckUrl + '/qualitycheck/getList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
                //type可以取的值：0:初检 1：验收 2：春秋普查 3：出库检验 4：日常检验 5：第三方检查
                checktype:type,
                checkResult:checkResult,
                houseId:storehouseId,
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

	this.getNewPageInfo = function(pageNum, pageSize, checkType, checkResult, storehouseId, warehouseId, orgId, historyStatus){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.qualitycheckUrl + '/qualitycheck/getNewList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
                //type可以取的值：0:初检 1：验收 2：春秋普查 3：出库检验 4：日常检验 5：第三方检查
				checkType:checkType,
                checkResult:checkResult,
                houseId:storehouseId,
                wareId:warehouseId,
                orgId:orgId,
                historyStatus:historyStatus
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
    this.loadDataById = function(id){
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.qualitycheckUrl + '/qualitycheck/loadDataById',
            params: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            //console.log(response);
        });
        return d.promise;
    }

    //根据id移除数据
    this.removeById = function(id){
        if (!confirm("确定要删除吗？")) {
            return;
        }
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.qualitycheckUrl + '/qualitycheck/remove',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            //console.log(response);
        });
        return d.promise;
    }

    //根据仓房和货位号查询中验收的信息
    this.findByStoreWarehouse = function(houseId, warehouseId, type, checkResult) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.qualitycheckUrl + '/qualitycheck/findByStoreWarehouse',
            params: {
                houseId : houseId,
                warehouseId:warehouseId,
                type:type,
                checkResult : checkResult
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

    //根据仓房和货位号查询中封仓的信息
    this.findByStoreWarehouseData = function(houseId,warehouseId,type,id) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.qualitycheckUrl + '/qualitycheck/findByStoreWarehouseData',
            params: {
                houseId : houseId,
                warehouseId:warehouseId,
                type:type,
                id:id
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

    //粮食质量检测记录(关联质量管理)
    this.getQualitycheckListByFoodbasicinfoCheck = function(houseId,warehouseId,foodbasicinfoId){
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.qualitycheckUrl + '/qualitycheck/getQualitycheckListByFoodbasicinfoCheck',
            params : {
                houseId : houseId,
                warehouseId : warehouseId,
                foodbasicinfoId : foodbasicinfoId
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

    //查询质量管理的子表
    this.findQualitycheckSonByQcSonId = function (qcSonId) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.qualitycheckUrl + '/qualitycheckSon/findQualitycheckSonBySonId',
            params: {
                qcSonId:qcSonId,
            }

        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            //console.log(response);
        });
        return d.promise;
    }

    // 删除关联的质量检查子表信息
    this.removeSon = function(id) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.qualitycheckUrl + '/qualitycheckSon/removeSon',
            data: {
                sonId : id
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

    //根据分仓保管账中的仓房名称
    this.getStorehouseListFromBusiness = function() {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.qualitycheckUrl + '/storehouseBusiness/getStorehouseListFromBusiness',
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }

    //根据分仓保管账中的仓房名称
    this.getWarehouseListFromBusiness = function(houseId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.qualitycheckUrl + '/storehouseBusiness/getWarehouseListFromBusiness',
            params : {
                ch:houseId
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

    //获取第三方检查的不宜存的可用数据
    this.getStoreQualityList = function(orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.qualitycheckUrl + '/qualitycheck/getStoreQualityList',
            params : {
            	orgId:orgId
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
    
    //获取第三方检查的不宜存的可用数据
    this.getTrdStoreQualityList = function() {
    	var d = $q.defer();
    	$http({
    		method : 'GET',
    		url : APP_CONFIG.qualitycheckUrl + '/qualitycheck/getTrdStoreQualityList',
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
     * 更新质量管理为历史数据 setQualityCheckByHistoryStatus
     */
    this.setQualityCheckByHistoryStatus=function (profitLossSheet) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.qualitycheckUrl + '/qualitycheck/setQualityCheckByHistoryStatus',
            data: {
                houseId : profitLossSheet.houseId,
                warehouseId : profitLossSheet.warehouseId
            }
        }).then(function successCallback(response){
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    };

    this.getDataByZJId = function(id,ZZid){
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.qualitycheckUrl + '/qualitycheck/getDataByZJId',
            params : {
            	id : id,
                ZZid : ZZid
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
    
    //根据仓房获取第三方检查中的数据(用于轮换计划验收)
    this.getPageInfoByhouseId = function(pageNum, pageSize,type,houseIds,warehouseIds){
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.qualitycheckUrl + '/qualitycheck/getListByhouseId',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
                //type可以取的值：0:初检 1：验收 2：春秋普查 3：出库检验 4：日常检验 5：第三方检查
                checktype:type,
                houseIds:houseIds,
                warehouseIds:warehouseIds
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
