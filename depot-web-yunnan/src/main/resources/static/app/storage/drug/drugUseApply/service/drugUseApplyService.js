"use strict";
angular.module('app.storage').service("drugUseApplyService", function ($http, $q, APP_CONFIG, $rootScope) {
    this.getPageInfo = function (pageNum, pageSize, searchCondition) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugUseapply/getList',
            params: {
                pageNum: pageNum,
                pageSize: pageSize,
                drugKind: searchCondition.drugKind,
                drugName: searchCondition.drugName,
                startTime: searchCondition.startTime,
                endTime: searchCondition.endTime,
                state: searchCondition.state,
                isUse: searchCondition.isUse
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

    //根据id加载数据
    this.loadDataById = function (id) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugUseapply/edit',
            data: {
                id: id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };

    // 根据id，获取子表列表.
    this.getDetailPageInfo = function (zid) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugUseapplyDetail/getList',
            params: {
                pageNum: 1,
                pageSize: 10,
                zid: zid
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

    // 获取子表信息.
    this.loadDetailDataById = function (id) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugUseapplyDetail/edit',
            params: {
                id: id
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

    // 删除子表数据.
    this.deleteDetailDataById = function (id) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugUseapplyDetail/remove',
            params: {
                id: id
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

    // 删除数据
    this.deleteDataById = function (id) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugUseapply/remove',
            data: {
                id: id
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject(response);
        });
        return d.promise;
    };

    //更新数据为待审批 assignee为审批人的userId
    this.updateAuditState = function (drugUseApply, assignee) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugUseapply/updateData',
            data: {
                id: drugUseApply.id,
                userInfoJson: angular.toJson($rootScope.userInfo),
                orgInfoJson: angular.toJson($rootScope.orgInfo),
                auditUserId: assignee
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };

});
