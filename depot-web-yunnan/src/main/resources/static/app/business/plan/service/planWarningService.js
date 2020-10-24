"use strict";

angular.module('app.business').service("planWarningService", function($http, $q,$rootScope, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, days,listquilt) {
        var url = '/agile/kcsw/getWarningList';
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.agileUrl + url,
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                days : days,
                list : listquilt,
                orgId :$rootScope.userInfo.orgId
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
    
    
    this.getWarningTime = function(orgId) {
    	var d = $q.defer();
    	$http({
    		method : 'GET',
    		url : APP_CONFIG.businessUrl + '/depot/business/warning/getWarningTime',
    		params : {
    			orgId :orgId
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
