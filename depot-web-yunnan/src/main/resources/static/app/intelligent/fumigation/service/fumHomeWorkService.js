"use strict";
angular.module('app.intelligent').service("homeWorkService", function($http, $q, APP_CONFIG) {

    // 分页列表数据
    this.getFumigationProcessList = function (pageInfo, houseId, orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/fumigationProcess/getFumigationProcessList',
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

    // 新增/修改熏蒸作业数据
    this.saveFumigationProcessDate = function (fumigationProcess) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.intelligentUrl + '/intelligents/fumigationProcess/saveFumigationProcessDate',
            params : {
                fumigationProcess : fumigationProcess
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
    this.removeDetail = function (processId,fumigationId) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.intelligentUrl + '/intelligents/fumigationProcess/removeProcessPlan',
            params : {
                processId : processId,
                fumigationId : fumigationId,
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

    // 根据id获取作业过程详情
    this.getProcessDeatil = function (processId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/fumigationProcess/getProcessDeatil',
            params : {
                processId : processId
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

    // 根据id获取作业过程详情
    this.getFumIdByProcessDeatil = function (fumId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/fumigationProcess/getFumIdByProcessDeatil',
            params : {
                fumId : fumId
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

    // 作业善后分页列表数据
    this.getFumigationAfterList = function (pageInfo, houseId, orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/fumigationAfter/getFumigationAfterList',
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

    // 新增/修改熏蒸善后数据
    this.saveFumigationAfterDate = function (fumigationAfter) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.intelligentUrl + '/intelligents/fumigationAfter/saveFumigationAfterDate',
            params : {
                fumigationAfter : fumigationAfter
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

    // 根据id获取善后详情
    this.getAfterDeatil = function (afterId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/fumigationAfter/getAfterDeatil',
            params : {
                afterId : afterId
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

    // 删除熏蒸善后数据
    this.removeAfterDetail = function (afterId,fumigationId) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.intelligentUrl + '/intelligents/fumigationAfter/removeAfterPlan',
            params : {
                afterId : afterId,
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

    // 分页作业查询列表列表数据
    this.getHomeWorkQueryList = function (pageInfo, houseId, orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/fumigationAfter/getHomeWorkQueryList',
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
});