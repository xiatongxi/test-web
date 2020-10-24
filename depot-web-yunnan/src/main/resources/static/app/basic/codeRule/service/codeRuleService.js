"use strict";
angular.module('app.basic').service("codeRuleService", function($http, $q, APP_CONFIG) {
	// 获取编码规范列表.
    this.getPageInfo = function(pageNum, pageSize, orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/depot/basic/codeRule/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
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

    // 获取编码规范列表.
    this.getDetailPageInfo = function(bid) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/depot/basic/codeRule/getDetailList',
            params : {
                pageNum : 1,
                pageSize : 100,
                bid : bid
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

    // 根据id加载数据
    this.loadDataById = function(id) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.basicUrl + '/depot/basic/codeRule/edit',
            params: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }

    // 获取子表信息.
    this.loadDetailDataById = function(id) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/depot/basic/codeRuleDetail/edit',
            params : {
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
    this.edit = function(codeRuleJson, codeRuleDetailJson, userInfo) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.basicUrl + '/depot/basic/codeRule/save',
            data: {
				codeRuleJson : angular.toJson(codeRuleJson),
				codeRuleDetailJson : angular.toJson(codeRuleDetailJson),
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
    
    // 删除数据.
    this.remove = function(id) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.basicUrl + '/depot/basic/codeRule/remove',
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

    // 根据编码类型名称获取编码.
    this.getCodeValueByType = function(type, orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/depot/basic/codeRule/getCodeValueByType',
            params : {
                codeRuleType : type,
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
})
