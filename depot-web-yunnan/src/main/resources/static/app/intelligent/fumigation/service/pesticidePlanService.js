"use strict";
angular.module('app.intelligent').service("pesticidePlanService", function($http, $q, APP_CONFIG) {

    // 分页列表数据
    this.getPesticidePlanList = function (pageInfo, houseId, orgId, planType) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/pesticidePlan/getPesticidePlanList',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                houseId : houseId == undefined ? "":houseId,
                orgId : orgId == undefined ? "":orgId,
                planType : planType
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

    // 根据id查询施药方案申请数据
    this.gePesticideDeatil = function (pesticideId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/pesticidePlan/gePesticideDeatil',
            params : {
                pesticideId : pesticideId
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

    // 新增/修改施药方案申请数据
    this.savePesticidePlanDate = function (pesticide) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.intelligentUrl + '/intelligents/pesticidePlan/savePesticidePlanDate',
            params : {
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

    // 删除施药方案申请数据
    this.removeDetail = function (pesticideId) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.intelligentUrl + '/intelligents/pesticidePlan/removePesticidePlan',
            params : {
                pesticideId : pesticideId
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
    this.getPesticideApproveList = function (pageInfo, houseId, orgId, userId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/pesticidePlan/getPesticideApproveList',
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

    // 新增/修改施药方案申请数据
    this.savePesticideApproveDate = function (pesticide) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.intelligentUrl + '/intelligents/pesticidePlan/savePesticideApproveDate',
            params : {
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

    // 根据熏蒸id查询施药数据
    this.geByFumigationId = function (fumigationId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/pesticidePlan/geByFumigationId',
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

    //提交
    this.submit = function(id, state) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.intelligentUrl + '/intelligents/pesticidePlan/submit',
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
});