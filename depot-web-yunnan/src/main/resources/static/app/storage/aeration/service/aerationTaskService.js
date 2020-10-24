"use strict";

angular.module('app.storage').service("aerationTaskService", function($http, $q, APP_CONFIG) {
	//通风申请查询
	this.getPageInfo = function(pageNum, pageSize, aerationTask, houseId, userInfo) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.taskUrl + '/AerationTask/getList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				applyTime : aerationTask==undefined?"":aerationTask.applyTime,
				taskId : aerationTask==undefined?"":aerationTask.taskId,
				taskStatus : aerationTask==undefined?"":aerationTask.taskStatus,
				houseId : houseId,
				userInfo : angular.toJson(userInfo)
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

	//通风审批查询
	this.getPageInfoApproval = function(pageNum, pageSize, ids, userId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.taskUrl + '/AerationTask/getApprovalList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				userId : userId,
				ids : angular.toJson(ids)
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
	
	//通风详情查询
	this.edit = function(id,processInstanceId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.taskUrl + '/AerationTask/edit',
			params : {
				id : id,
				processInstanceId : processInstanceId
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

	//通风方案申请保存
	this.save = function(taskApply, userInfo) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.taskUrl + '/AerationTask/save',
			data : {
				taskApply : angular.toJson(taskApply),
				userInfo : angular.toJson(userInfo)
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
	
	//提交
	this.submit = function(id, approvalStatus) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.taskUrl + '/AerationTask/submit',
			data : {
				id : id,
				approvalStatus : approvalStatus
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

	//根据仓号获取一条审批通过的的作业信息
	this.getTaskRecord = function(houseId, orgId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.taskUrl + '/AerationTask/getTaskRecord',
			params : {
				houseId : houseId,
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
	}

	//删除
	this.remove = function(id) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.taskUrl + '/AerationTask/remove',
			data : {
				id : id
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
	
	this.getSelectPageInfo = function(pageNum, pageSize, type, approval, projectId, taskType, operator, orderByClause) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.businessUrl + '/intelligents/approval/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                type  : type,
                projectName : approval == undefined?"":approval.projectName, //仓房
                applyName : approval == undefined?"":approval.applyName,
                taskId : approval == undefined?"":approval.taskId,
                userId : operator,
                projectId : projectId,
                taskType : taskType,
                orderByClause : orderByClause
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