"use strict";

angular.module('app.business').service("productionEquipmentService", function($http, $q, APP_CONFIG,$rootScope) {
    this.getDate = function() {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.deviceUrl + '/deviceInput/getDate',
            params : {
            	
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
    
    
    this.getDrugDate = function() {
    	var d = $q.defer();
    	$http({
    		method : 'GET',
    		url : APP_CONFIG.drugManageUrl + '/depot/business/drugStandingBook/getDate',
    		params : {
    			
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
