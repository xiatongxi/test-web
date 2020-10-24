"use strict";
angular.module('app.intelligent').service("energyAnalyzeService", function($http, $q, APP_CONFIG) {
    
    this.getTrendThree = function (orgId,searchStartDate,searchEndDate) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/energyDetection/getTrendThreePage',
            params : {
            	orgId:orgId,
                startDate : searchStartDate == undefined ? "":searchStartDate,
                endDate : searchEndDate == undefined ? "":searchEndDate
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
    
    this.getTimePointThree = function (orgId,searchStartDate,searchEndDate) {
    	var d = $q.defer();
    	$http({
    		method : 'GET',
    		url : APP_CONFIG.intelligentUrl + '/intelligents/energyDetection/getTimePointThreePage',
    		params : {
    			orgId:orgId,
    			startDate : searchStartDate == undefined ? "":searchStartDate,
    			endDate : searchEndDate == undefined ? "":searchEndDate
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
    
    this.getTimeThree = function (orgId,vHhtype,oneTimeStart,oneTimeEnd,twoTimeStart,twoTimeEnd) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/energyDetection/getTimeThreePage',
            params : {
            	orgId:orgId,
                vHhtype : vHhtype,
                oneTimeStart : oneTimeStart == undefined ? "":oneTimeStart,
                oneTimeEnd : oneTimeEnd == undefined ? "":oneTimeEnd,
                twoTimeStart : twoTimeStart == undefined ? "":twoTimeStart,
                twoTimeEnd : twoTimeEnd == undefined ? "":twoTimeEnd
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