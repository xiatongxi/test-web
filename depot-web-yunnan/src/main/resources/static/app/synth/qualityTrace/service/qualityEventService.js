"use strict";

angular.module('app.synth').service("qualityEventService", function($http, $q, APP_CONFIG) {

    /**
     * 查询质量事件数据列表
     */
    this.getPageInfo = function(pageNum, pageSize, orgId, houseId, wareId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.qualitycheckUrl + '/qualityEvent/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                orgId : orgId,
                houseId : houseId,
                wareId : wareId
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

    /**
     * 查询一条质量事件信息（包括附件信息）
     */
    this.findByIdObj = function(id) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.qualitycheckUrl + '/qualityEvent/findByIdObj',
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

    /**
     * 查询一条质量事件信息（包括附件信息）
     */
    this.save = function(event, eventFile, fileIds, userInfo) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.qualitycheckUrl + '/qualityEvent/update',
            data : {
            	event : angular.toJson(event),
            	eventFile : angular.toJson(eventFile),
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

});