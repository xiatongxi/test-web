"use strict";

angular.module('app.nvr').service("nvrService", function($http, $q, APP_CONFIG, $rootScope) {
        //分页数据查询
    this.getPageInfo = function(pageNum, pageSize,nvrData) {
    	var orgId = $rootScope.orgInfo.orgId;
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.monitorUrl + '/nvr/getNvr',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                nvrName : nvrData == undefined?"":nvrData.name,
                orgid : orgId
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
        this.loadDataById = function(id){
            var d = $q.defer();
            $http({
                method: 'GET',
                url: APP_CONFIG.monitorUrl + '/nvr/loadDataById',
                params: {
                    id : id
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                //console.log(response);
            });
            return d.promise;
        }

        //根据id移除数据
        this.removeById = function(id){
            if (!confirm("确定要删除吗？")) {
                return;
            }
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.monitorUrl + '/nvr/remove',
                data: {
                    id : id
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                //console.log(response);
            });
            return d.promise;
        }

    //通道号更新（弹窗显示）
    this.throughEdit = function (nvrId) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.monitorUrl + '/nvr/getThroughByNVRId',
            params: {
                nvrId : nvrId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            //console.log(response);
        });
        return d.promise;
    };

    //通道号更新（数据更新）
    this.updateChannelNumber = function (nvrId, nvrIp, nvrUsername, nvrPassword, nvrPort, nvrType) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.monitorUrl + '/nvr/saveChannelNumber',
            params: {
                nvrId : nvrId,
                nvrIp : nvrIp,
                nvrUsername : nvrUsername,
                nvrPassword : nvrPassword,
                nvrPort : nvrPort,
                nvrType : nvrType
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            //console.log(response);
        });
        return d.promise;
    }
});