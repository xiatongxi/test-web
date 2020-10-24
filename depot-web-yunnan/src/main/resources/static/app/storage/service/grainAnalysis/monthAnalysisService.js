"use strict";

angular.module('app.storage').service("monthAnalysisService", function($http, $q, APP_CONFIG) {
	//通风记录查询
	this.getPageInfo = function (pageNum, pageSize, grain) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.grainAnalysis + '/monthStorageGrainAnalysis/getList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				storehouseId : grain == undefined ? "" : grain.storehouseId,
				year : grain == undefined?"":grain.year,
				month : grain == undefined?"":grain.month
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
	
	//通风申请查询-1
	this.edit = function (id, analysisType) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.grainAnalysis + '/monthStorageGrainAnalysis/edit',
			params : {
				id : id,
				analysisType : analysisType
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

    //三温检查数据查询-2
    this.editTwo = function (threeTemp) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.grainInspectionUrl + '/threetempCheck/monthEditTwo',
            params : {
                threeTempJson : angular.toJson(threeTemp)
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
	
	//查询粮情转卡数据
	this.getLqzkDate = function (houseId, wareId) {
		var d = $q.defer();
		$http({
			method : 'GET',
            url : APP_CONFIG.qualitycheckUrl + '/foodbasicinfo/getGrainSituation',
			params : {
				houseId : houseId,
				wareId : wareId
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

	//查询三温检查数据--1
	this.getThreeTempDate = function (houseId, wareId, year, month, orgId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.grainAnalysis + '/monthStorageGrainAnalysis/getThreeTempDate',
			params : {
				houseId : houseId,
				wareId : wareId,
				year : year,
				month : month,
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

    //查询三温检查数据--3
    this.getThreeTempDateTwo = function (threeTempCheckList) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.grainAnalysis + '/monthStorageGrainAnalysis/getThreeTempDateTwo',
            params : {
                threeList : threeTempCheckList
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

    //查询三温检查数据--年粮情分析用到
    this.getMonithThreeTempDate = function (houseId, wareId, year, month,orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.grainAnalysis + '/monthStorageGrainAnalysis/getMonithThreeTempDate',
            params : {
                houseId : houseId,
                wareId : wareId,
                year : year,
                month : month,
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

	//提交
	this.save = function (grain, exceptionAndOnforeList, type, orgId, userId) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.grainAnalysis + '/monthStorageGrainAnalysis/update',
			params : {
				grainJson : angular.toJson(grain),
				exceptionJson : angular.toJson(exceptionAndOnforeList),
				type : type,
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
	
	//审核
	this.auditor_submit = function (grain) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.grainAnalysis + '/monthStorageGrainAnalysis/auditor_submit',
			params : {
				grainJson : angular.toJson(grain)
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