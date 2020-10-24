"use strict";
angular.module('app.intelligent').service("meterQueryService", function($http, $q, APP_CONFIG) {

    // 分页列表数据
    this.getMeterPageInfo = function (pageInfo,deviceNumber,orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/energyDetection/queryMeterList',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                deviceNumber : deviceNumber,
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
    
    // 分页列表数据
    this.getDeviceInfo = function (orgId) {
    	var d = $q.defer();
    	$http({
    		method : 'GET',
    		url : APP_CONFIG.intelligentUrl + '/intelligents/energyDetection/queryDeviceList',
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