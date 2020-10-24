"use strict";

angular.module('app.storage').service("fumigationService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, searchCondition, userId) {
    	var url = '/depot/storage/fumigation/getList';
    	if (searchCondition != null && searchCondition.type != null) {
    		if (searchCondition.type == "addProcess") {
    			url = "/depot/storage/fumigation/getAddProcessList";
    		} else if (searchCondition.type == "addDealwith") {
    			url = "/depot/storage/fumigation/getAddDealwithList";
    		}
    	}
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.taskUrl + url,
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                auditState : searchCondition == undefined ? "" : searchCondition.auditState, 
        		fumigationType : searchCondition == undefined ? "" : searchCondition.fumigationType, 
                drugName : searchCondition == undefined ? "" : searchCondition.drugName,
        		houseId : searchCondition == undefined ? "" : searchCondition.houseId,
        		userId : userId
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
    
    this.getPassPageInfo = function(pageNum, pageSize ,houseId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.taskUrl + '/depot/storage/fumigation/getAuditPassList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
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
    
    //根据id加载数据
    this.loadDataById = function(id) {
    	var d = $q.defer();
    	$http({
    		method: 'GET',
    		url: APP_CONFIG.taskUrl + '/depot/storage/fumigation/edit',
    		params: {
    			id : id
    		}
    	}).then(function successCallback(response) {
    		d.resolve(response.data);
    	}, function errorCallback(response) {
    	});
    	return d.promise;
    }
    
    // 根据id加载数据 和 process数据.
    this.loadDataAndProcessById = function(id) {
    	var d = $q.defer();
    	$http({
    		method: 'GET',
    		url: APP_CONFIG.taskUrl + '/depot/storage/fumigation/getDataAndProcessById',
    		params: {
    			id : id
    		}
    	}).then(function successCallback(response) {
    		d.resolve(response.data);
    	}, function errorCallback(response) {
    	});
    	return d.promise;
    }
    
    //根据id加载数据
//    this.loadDataByIdAndPID = function(id) {
//        var d = $q.defer();
//        $http({
//            method: 'POST',
//            url: APP_CONFIG.baseUrl + '/depot/storage/fumigation/audit/getAudit',
//            data: {
//                id : id
//            }
//        }).then(function successCallback(response) {
//            d.resolve(response.data);
//        }, function errorCallback(response) {
//        });
//        return d.promise;
//    }
    
    // 判断该仓是否有未结束的熏蒸 或者 审批未结束的熏蒸.
    this.findIfExitByHouseId = function (houseId, orgId) {
    	var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.taskUrl + '/depot/storage/fumigation/findIfExitByHouseId',
            params: {
            	houseId : houseId,
            	orgId : orgId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }

    //保存
    this.save = function (fumigation, userInfo) {
    	var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.taskUrl + '/depot/storage/fumigation/save',
            data: {
            	fumigationJson : angular.toJson(fumigation),
				userInfo : angular.toJson(userInfo)
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        	// 请求失败执行代码
			d.reject("error");
        });
        return d.promise;
    }

    //删除
    this.remove = function (id) {
    	var d = $q.defer();
    	$http({
            method: 'POST',
            url: APP_CONFIG.taskUrl + '/depot/storage/fumigation/remove',
            data: {
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

    //提交
    this.submit = function (id, approvalStatus) {
    	var d = $q.defer();
    	$http({
            method: 'POST',
            url: APP_CONFIG.taskUrl + '/depot/storage/fumigation/submit',
            data: {
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

    // 危险作业备案
    this.getDangerJobRecordPageInfo = function(pageNum, pageSize, searchCondition) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.taskUrl + '/depot/storage/fumigation/getDangerJobRecordList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                grainKind : searchCondition.grainKind,
                fumigationType : searchCondition == undefined ? "" : searchCondition.fumigationType,
                drugName : searchCondition == undefined ? "" : searchCondition.drugName,
                houseId : searchCondition == undefined ? "" : searchCondition.houseId,
                fumigateProgramNumber : searchCondition == undefined ? "" : searchCondition.fumigateProgramNumber
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
