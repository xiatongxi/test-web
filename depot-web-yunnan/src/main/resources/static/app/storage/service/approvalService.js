"use strict";

angular.module('app.storage').service("approvalService", function($http, $q, APP_CONFIG) {
	//通风审批查询
	this.getPageInfo = function (pageNum, pageSize, aerationTaskApproval, houseId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.baseUrl + '/AerationTasks/audit/getList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				taskId : aerationTaskApproval==undefined?"":aerationTaskApproval.taskId,
				houseId : houseId
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