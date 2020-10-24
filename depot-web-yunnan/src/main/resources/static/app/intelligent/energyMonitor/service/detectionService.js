"use strict";
angular.module('app.intelligent').service("detectionService", function($http, $q, APP_CONFIG) {

    // 分页列表数据
    this.getDetectionPageInfo = function (pageInfo,search,orgId,type) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/energyDetection/getList',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                orgId : orgId,
                vnhcode : search == undefined ? "":search.vnhcode,
                vhhtype : search == undefined ? "":search.vhhtype,
                type : type == undefined ? "":type
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
    
    // 能耗监测插入数据
    this.detectionTest = function () {
    	var d = $q.defer();
    	$http({
    		method : 'POST',
    		url : APP_CONFIG.intelligentUrl + '/intelligents/energyDetection/addHistoryData',
    		data : {
    			
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