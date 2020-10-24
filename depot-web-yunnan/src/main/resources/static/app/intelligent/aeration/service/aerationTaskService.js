"use strict";

angular.module('app.intelligent').service("aerationTaskService", function($http, $q,$rootScope, APP_CONFIG) {
	//通风申请查询
	this.getPageInfo = function(pageNum, pageSize, aerationTask,approvalState) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.intelligentUrl + '/intelligents/aerationTask/getList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				state : aerationTask==undefined?"":aerationTask.state,
				vCfCode : aerationTask==undefined?"":aerationTask.vCfCode,
				areationPlanNumber : aerationTask==undefined?"":aerationTask.areationPlanNumber,
				approvalState : approvalState,
				userId: $rootScope.userInfo.userId
						
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
	
	//查询已经属于通风作业的计划
	this.getCtrlPageInfo = function(pageNum, pageSize,aerationTask) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.intelligentUrl + '/intelligents/aerationTask/getJobCtrlList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				vCfCode : aerationTask == undefined?"" : aerationTask.vCfCode
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
	this.getPageInfoApproval = function(pageNum, pageSize, aerationAudit, userId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.intelligentUrl + '/intelligents/aerationTask/getApprovalList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				userId : userId,
				result : aerationAudit==undefined?"":aerationAudit.result
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
			method : 'POST',
			url : APP_CONFIG.intelligentUrl + '/intelligents/aerationTask/edit',
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
	this.save = function(taskApply) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.intelligentUrl + '/intelligents/aerationTask/save',
			data : {
				taskApplyJson : angular.toJson(taskApply),
				orgId : $rootScope.userInfo.orgId
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
	this.submit = function(id, state) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.intelligentUrl + '/intelligents/aerationTask/submit',
			data : {
				id : id,
				approvalStatus : state
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
			url : APP_CONFIG.intelligentUrl + '/intelligents/aerationTask/remove',
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
	
	
	//根据计划编号 获取 仓房
	this.getHouseByNumber = function(aerationPlanNumber) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.intelligentUrl + '/intelligents/aerationTask/getHouseByNumber',
			data : {
				aerationPlanNumber : aerationPlanNumber
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
            url : APP_CONFIG.intelligentUrl + '/intelligents/approval/getList',
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
	
	
	
	this.queryKcData = function(orgId,houseId,warehouseId) {
    	var d = $q.defer();
    	$http({
    		method : 'GET',
    		url : APP_CONFIG.intelligentUrl + '/agile/kcsw/queryKcData',
    		params : {
    			orgId : orgId,
    			houseId : houseId,
    			warehouseId : warehouseId
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