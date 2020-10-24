"use strict";

angular.module('app.storage').service("weekAnalysisService", function($http, $q, APP_CONFIG) {
	//通风记录查询
	this.getPageInfo = function (pageNum, pageSize, grain) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.grainAnalysis + '/weekStorageGrainAnalysis/getList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				storehouseId : grain == undefined ? "" : grain.storehouseId,
				storehouseCode : grain == undefined ? "" : grain.storehouseCode,
				startTime : grain == undefined?"":grain.checkDateStart,
				endTime : grain == undefined?"":grain.checkDateEnd
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
	
	//通风申请查询
	this.edit = function (id, analysisType) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.grainAnalysis + '/weekStorageGrainAnalysis/edit',
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
	
	//查询三温检查数据--1
	this.getThreeTempDateOne = function (houseId, wareId, startDate, endDate, orgId) {
        var map = {
            houseId : houseId,
            wareId : wareId,
            startDate : startDate,
            endDate : endDate,
            orgId : orgId
        };

		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.grainInspectionUrl + '/threetempCheck/editTwo',
			params : {
                map : angular.toJson(map),
                weekParams : 1
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

    //查询三温检查数据--2
    this.getThreeTempDateTwo = function (data) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.grainAnalysis + '/weekStorageGrainAnalysis/getThreeTempDate',
            params : {
                threeTempList : data
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
	
	//提交
	this.save = function (grain, exceptionAndOnforeList, type, orgId, userId) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.grainAnalysis + '/weekStorageGrainAnalysis/update',
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
			url : APP_CONFIG.grainAnalysis + '/weekStorageGrainAnalysis/auditor_submit',
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