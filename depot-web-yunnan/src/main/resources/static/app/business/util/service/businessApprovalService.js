"use strict";

angular.module('app.business').service("businessApprovalService", function($http, $q,$rootScope, APP_CONFIG) {

    // 往流程轨迹表插入数据
    this.add = function(businessApproval, approvalStatus, taskType) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/approval/update',
            data: {
            	businessApproval : angular.toJson(businessApproval),
            	approvalStatus : approvalStatus
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        	// 请求失败执行代码
			d.reject("error");
        });
        return d.promise;
    }

    //删除轨迹数据
	this.removeList = function (projectId, taskType) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.intelligentUrl + '/intelligents/approval/removeList',
			data : {
				projectId : projectId,
				taskType : taskType
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