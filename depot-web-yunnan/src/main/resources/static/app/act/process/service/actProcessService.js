"use strict";

angular.module('app.process').service("actProcessService", function($http, $q, APP_CONFIG) {
	this.getPageInfo = function(pageNum, pageSize) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.businessUrl + '/act/process/processList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize
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
