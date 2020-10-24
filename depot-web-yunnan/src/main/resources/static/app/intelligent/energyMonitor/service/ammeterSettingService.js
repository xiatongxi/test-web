"use strict";
angular.module('app.intelligent').service("ammeterSettingService", function ($http, $q, APP_CONFIG) {
    // 列表
    this.getPageInfo = function (pageInfo, orgId, vcfcode, vHhtype) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.intelligentUrl + '/intelligents/energyDetection/getAmmeterPageInfo',
            params: {
                pageNum: pageInfo.pageNum,
                pageSize: pageInfo.pageSize,
                orgId: orgId == undefined ? "" : orgId,
                vcfcode: vcfcode == undefined ? "" : vcfcode,
                vhhtype: vHhtype == undefined ? "" : vHhtype
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

    // 保存,修改
    this.save = function (tEnergyInfoJson) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/energyDetection/saveAmmeter',
            data: {
            	tEnergyInfoJson: angular.toJson(tEnergyInfoJson)
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });

        return d.promise;
    };
    
    // 验证编码是否重复.
    this.validCode = function (id,vNhCode) {
    	var d = $q.defer();
    	$http({
    		method: 'GET',
    		url: APP_CONFIG.intelligentUrl + '/intelligents/energyDetection/validCode',
    		params: {
    			id: id,
    			vNhCode: vNhCode
    		}
    	}).then(function successCallback(response) {
    		d.resolve(response.data);
    	}, function errorCallback(response) {
    	});
    	return d.promise;
    };

    // 根据id加载数据.
    this.loadDataById = function (id) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.intelligentUrl + '/intelligents/energyDetection/getById',
            params: {
                id: id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };

    // 根据id删除
    this.remove = function (ammeter) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/energyDetection/deleteById',
            data: {
                id: ammeter.id,
                ammeterJson: angular.toJson(ammeter)
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };
    // 数据同步
    this.synchronizationAll = function (orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/energyDetection/synchronizationAll',
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
    };

});