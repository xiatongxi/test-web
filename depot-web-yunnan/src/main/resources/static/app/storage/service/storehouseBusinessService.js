"use strict";

angular.module('app.storage').service("storehouseBusinessService", function($http, $q, APP_CONFIG) {
	//通风审批查询
	this.updateAerationTaskStatus = function (houseId, wareId, orgId, aerationStatus) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.qualitycheckUrl + '/storehouseBusiness/updateAerationTaskStatus',
			data : {
				houseId : houseId,
				wareId : wareId,
				orgId : orgId,
				aerationStatus : aerationStatus
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