"use strict";
angular.module('app.intelligent').service("basicThresholdSetService", function($http, $q, APP_CONFIG,$rootScope) {
    // 列表
    this.getThresholdPageInfo = function (pageInfo, search) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/WarningThreshold/getList',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                vCfCode : search == undefined ? "":search.vCfCode
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

    // 查询报警阀值设置详情
    this.loadDataByVcfCode = function (vCfCode) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/WarningThreshold/getByCfCode',
            params : {
                vCfCode : vCfCode == undefined ? "":vCfCode
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

    // 保存,修改(deleteRowId为点击保存时才删除的详情id)
    this.save = function(addedDetail,deleteRowId) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/WarningThreshold/save',
            data: {
                thresholdListJson : angular.toJson(addedDetail),
                deleteRowId : deleteRowId
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });

        return d.promise;
    };

    // 根据id删除列表并删除详情数据
    this.removeThreshold = function (id,thresholdSetList) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/WarningThreshold/deleteThreshold',
            data: {
                id : id,
                vCfCode : thresholdSetList.vCfCode,
                thresholdSetListJson : angular.toJson(thresholdSetList)
                
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };

    // 根据orgId或仓房code查询测温预警,报警阀值.
    this.getValueByOrgIdOrCfCode = function(vCfCode){
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/WarningThreshold/getValueByOrgIdOrCfCode',
            params : {
                vCfCode : vCfCode===undefined?"":vCfCode,
                orgId : $rootScope.orgInfo.orgId
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject(response.data);
        });
        return d.promise;
    };

});