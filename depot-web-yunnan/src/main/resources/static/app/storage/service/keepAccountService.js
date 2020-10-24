"use strict";

angular.module('app.storage').service("keepAccountService", function($http, $q, APP_CONFIG) {

	/**
	 * 查询保管明细账列表
	 */
	this.getPageInfo = function(pageNum, pageSize, search) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.agileUrl + '/keepAccount/list',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                ch : search==undefined?"":search.ch,
                hwh : search==undefined?"":search.hwh,
                lspz : search==undefined?"":search.lspz,
                lsxz : search==undefined?"":search.hwxz,
                startDate : search==undefined?"":search.startDate,
                endDate : search==undefined?"":search.endDate
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

    this.getPageInfoA = function(pageNum, pageSize, ch, hwh, returndata) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.agileUrl + '/keepAccount/list',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                ch : ch,
                hwh : hwh
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            var keeperDatail=new Object();
			if (response.data.list[0] != undefined) {
                keeperDatail.pz = response.data.list[0].pz;
                keeperDatail.kcsl = response.data.list[0].kcsl;
                keeperDatail.storehouseId = returndata.storehouseId;
                keeperDatail.warehouseId = returndata.warehouseId;
                keeperDatail.warehouseName = returndata.warehouseName;
			}

            d.resolve(keeperDatail);


        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }

	/**
	 * 查询分仓保管账列表
	 */
	this.getHouseKeepAccountPageInfo = function(pageNum, pageSize, search) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.agileUrl + '/keepAccount/houseKeepAccountList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				ch : search==undefined?"":search.ch,
                hwh : search==undefined?"":search.hwh,
                lspz : search==undefined?"":search.lspz,
                lsxz : search==undefined?"":search.lsxz,
                startDate : search==undefined?"":search.startDate,
                endDate : search==undefined?"":search.endDate
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
	 * 查询保管总账列表
	 */
	this.getSumAccountPageInfo = function(pageNum, pageSize, search) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.keeperHouseUrl + '/StorageAccountRecord/sumAccountList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
                lspz : search==undefined?"":search.lspz,
                lsxz : search==undefined?"":search.lsxz
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

    //分仓保管账中获取某条数据对象
    this.accountingRecord = function(houseId, wareId, pz, hwxz, rq, accountType) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.keeperHouseUrl + '/StorageAccountRecord/edit',
            params : {
            	houseId : houseId,
            	wareId : wareId,
            	lspz : pz,
            	hwxz : hwxz,
            	rq : rq,
            	accountType : accountType
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

    //分仓保管账记账提交
    this.submit = function(account, accountType, orgId) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.keeperHouseUrl + '/StorageAccountRecord/update',
            data : {
            	recordJson : angular.toJson(account),
            	accountType : accountType,
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

    /**
     * 查询保管明细账列表
     */
    this.getPageInfo_qualitycheck = function(pageNum, pageSize, houseId, warehouseId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.agileUrl + '/keepAccount/list',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                ch : houseId,
                hwh : warehouseId
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
