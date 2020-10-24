"use strict";
angular.module('app.basic').service("scheduleJobService", function($http, $q, APP_CONFIG) {
	// 获取编码规范列表.
    this.getPageInfo = function(pageNum, pageSize, orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/depot/basic/scheduleJob/getList',
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

    // 根据id加载数据
    this.loadDataById = function(id) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.basicUrl + '/depot/basic/scheduleJob/edit',
            params: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }

    //更新定时任务
    this.save = function(scheduleJobJson, userInfo) {
    	var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.basicUrl + '/depot/basic/scheduleJob/save',
            data: {
            	scheduleJobJson : angular.toJson(scheduleJobJson),
            	userInfo : angular.toJson(userInfo)
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }

    // 删除一条定时任务
    this.remove = function(id) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.basicUrl + '/depot/basic/scheduleJob/remove',
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
    
    // 暂停.
    this.pause = function(id) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/depot/basic/scheduleJob/pause',
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
    
    // 启动.
    this.resume = function(id) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/depot/basic/scheduleJob/resume',
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
    
    // 立即执行.
    this.run = function(id) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/depot/basic/scheduleJob/run',
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
    
    
})
