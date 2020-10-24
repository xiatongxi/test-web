"use strict";
angular.module('app.intelligent').service("energyStatisticsService", function($http, $q, APP_CONFIG) {

    // 分页列表数据
    this.getDailyConsumptionPageInfo = function (pageInfo,orgId,vHhtype,searchStartDate,searchEndDate) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/energyDetection/getDailyConsumptionList',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                orgId : orgId,
                vHhtype : vHhtype,
                startDate : searchStartDate,
                endDate : searchEndDate
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
    this.getTaskConsumptionPageInfo = function (pageInfo,orgId,vHhtype,searchStartDate,searchEndDate) {
    	var d = $q.defer();
    	$http({
    		method : 'GET',
    		url : APP_CONFIG.intelligentUrl + '/intelligents/energyDetection/getTaskConsumptionList',
    		params : {
    			pageNum : pageInfo.pageNum,
    			pageSize : pageInfo.pageSize,
    			orgId : orgId,
    			vHhtype : vHhtype,
    			startDate : searchStartDate,
    			endDate : searchEndDate
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