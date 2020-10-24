"use strict";

angular.module('app.business')
    .service("agentFcbgzService", function($http, $q, APP_CONFIG, $rootScope) {
        //查询分仓保管账列表数据
        this.getfcbgzList = function(pageNum, pageSize, conditions) {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agent_bgmxz/getFcbgzList',
                params : {
                    pageNum : pageNum,
                    pageSize : pageSize,
                    bgmxzJson : conditions
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

        //按条件查询分仓保管账数据
        this.getList = function(pageNum, pageSize, fcbgzJson) {
        	var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agent_fcbgz/getList',
                params : {
                    pageNum : pageNum,
                    pageSize : pageSize,
                    fcbgzJson : fcbgzJson //数据对象
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
                url: APP_CONFIG.agentUrl + '/agent_fcbgz/edit',
                data: {
                	fcbgzJson : dates,
                	type : type
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                console.log(response);
            });
            return d.promise;
        };

        //根据数据对象查询详细数据
        this.getFindByKeyData = function(obj){
            var d = $q.defer();
            $http({
                method: 'GET',
                url: APP_CONFIG.agentUrl + '/agent_fcbgz/findByfcbgz',
                params: {
                    dataJson: obj
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