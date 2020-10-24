"use strict";

angular.module('app.business')
    .service("agentBgzzService", function($http, $q, APP_CONFIG, $rootScope) {
        //查询保管总账列表数据
        this.getBgzzList = function(pageNum, pageSize, conditions) {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agent_fcbgz/getBgzzList',
                params : {
                    pageNum : pageNum,
                    pageSize : pageSize,
                    fcbgzJson : conditions
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

        //按条件查询保管总账数据
        this.getList = function(pageNum, pageSize, bgzzJson) {
        	var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agent_bgzz/getList',
                params : {
                    pageNum : pageNum,
                    pageSize : pageSize,
                    bgzzJson : bgzzJson //数据对象
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

        //添加或修改数据
        this.saveAndUpdata = function (dates, type) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.agentUrl + '/agent_bgzz/edit',
                data: {
                	bgzzJson : dates,
                	type : type
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                console.log(response);
            });
            return d.promise;
        };

});