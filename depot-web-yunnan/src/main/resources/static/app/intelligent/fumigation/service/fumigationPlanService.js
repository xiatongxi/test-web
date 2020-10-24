"use strict";
angular.module('app.intelligent').service("fumigationPlanService", function($http, $q, APP_CONFIG) {

    // 分页列表数据
    this.getFumigationPlanList = function (pageInfo, houseId, orgId, queryType) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/fumigationPlan/getFumigationPlanList',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                houseId : houseId == undefined ? "":houseId,
                orgId : orgId == undefined ? "":orgId,
                queryType : queryType
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

    // 根据id查询熏蒸方案申请数据
    this.getFumigationPlanDeatil = function (fumigationId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/fumigationPlan/getFumigationPlanDeatil',
            params : {
                fumigationId : fumigationId
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

    // 新增/修改熏蒸方案申请数据
    this.saveFumigationPlanDate = function (fumigation,pesticide,fumPlanId) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.intelligentUrl + '/intelligents/fumigationPlan/saveFumigationPlanDate',
            params : {
                fumigation : fumigation,
                pesticide : pesticide,
                fumPlanId : fumPlanId
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

    // 删除熏蒸方案申请数据
    this.removeDetail = function (fumigationId) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.intelligentUrl + '/intelligents/fumigationPlan/removefumigationPlan',
            params : {
                fumigationId : fumigationId
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

    // 分页列表数据
    this.getFumigationApproveList = function (pageInfo, houseId, orgId,userId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/fumigationPlan/getFumigationApproveList',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                houseId : houseId == undefined ? "":houseId,
                orgId : orgId == undefined ? "":orgId,
                userId : userId == undefined ? "":userId
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

    // 新增/修改熏蒸方案申请数据
    this.saveFumigationApproveDate = function (fumigation,pesticide) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.intelligentUrl + '/intelligents/fumigationPlan/saveFumigationApproveDate',
            params : {
                fumigation : fumigation,
                pesticide : pesticide
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

    // 分页方案查询列表列表数据
    this.getPlanQueryList = function (pageInfo, houseId, orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/fumigationPlan/getPlanQueryList',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                houseId : houseId == undefined ? "":houseId,
                orgId : orgId == undefined ? "":orgId
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
    
    // 分页方案查询列表列表数据
    this.getJcd = function (houseId,fumigationId) {
    	var d = $q.defer();
    	$http({
    		method : 'GET',
    		url : APP_CONFIG.intelligentUrl + '/intelligents/fumigationPlan/getJcd',
    		params : {
    			houseId : houseId == undefined ? "":houseId,
    			fumigationId : (fumigationId == undefined || fumigationId == "") ? "-1":fumigationId
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
    
    //提交
    this.submit = function(id, state) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.intelligentUrl + '/intelligents/fumigationPlan/submit',
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
    };
});