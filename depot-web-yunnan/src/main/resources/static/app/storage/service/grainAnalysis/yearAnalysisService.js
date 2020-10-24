"use strict";

angular.module('app.storage').service("yearAnalysisService", function($http, $q, APP_CONFIG) {
	//通风记录查询
	this.getPageInfo = function (pageNum, pageSize, grain) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.grainAnalysis + '/yearStorageGrainAnalysis/getList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				storehouseId : grain == undefined ? "" : grain.storehouseId,
				year : grain == undefined?"":grain.year
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

	//月粮情分析详情查询
	this.edit = function (id, analysisType) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.grainAnalysis + '/yearStorageGrainAnalysis/edit',
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
	}
	
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
	
	//查询三温检查数据
	this.getThreeTempDate = function (houseId, wareId, year, depotId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.grainAnalysis + '/yearStorageGrainAnalysis/getThreeTempDate',
			params : {
				houseId : houseId,
				wareId : wareId,
				year : year,
				orgId : depotId
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
            url : APP_CONFIG.grainAnalysis + '/yearStorageGrainAnalysis/getThreeTempDateTwo',
            params : {
                threeList : angular.toJson(threeTempCheckList)
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
			url : APP_CONFIG.grainAnalysis + '/yearStorageGrainAnalysis/update',
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
			url : APP_CONFIG.grainAnalysis + '/yearStorageGrainAnalysis/auditor_submit',
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