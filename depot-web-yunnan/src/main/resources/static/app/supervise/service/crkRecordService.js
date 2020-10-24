"use strict";

angular.module('app.supervise').service("crkRecordService", function($http, $q, APP_CONFIG, $rootScope) {

    /**
     * 查询火车出入库记录列表
     */
    this.getHcPageInfo = function(pageNum, pageSize, search, orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.agileUrl + '/crkRecord/getHcCrkPageList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                cazylx : search==undefined?"":search.cazylx,
                pz : search==undefined?"":search.pz,
                beginDate : search==undefined?"":search.beginDate,
                endDate : search==undefined?"":search.endDate,
                houseId : search==undefined?"":search.storehouseId,
                warehouseId : search==undefined?"":search.warehouseId,
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
    };

    /**
     * 查询汽车出入库记录列表
     */
    this.getQcPageInfo = function(pageNum, pageSize, search, orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.agileUrl + '/crkRecord/getQcCrkPageList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                cazylx : search==undefined?"":search.cazylx,
                pz : search==undefined?"":search.pz,
                beginDate : search==undefined?"":search.beginDate,
                endDate : search==undefined?"":search.endDate,
                houseId : search==undefined?"":search.storehouseId,
                warehouseId : search==undefined?"":search.warehouseId,
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
    };

    /**
     * 查询汽车出入库记录详情
     */
    this.getDetail = function(bizNo, orgId, ywlx, lspz) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.agileUrl + '/crkRecord/detail',
            params : {
            	bizNo : bizNo,
            	orgId : orgId,
            	ywlx : ywlx,
            	lspz : lspz
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

    // 出入库监管统计
    this.getCycleFoodCountPageInfo = function(pageNum, pageSize, search) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.agileUrl + '/crkRecord/getCycleFoodCount',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                cazylx : search==undefined?"":search.cazylx,
                pz : search==undefined?"":search.pz,
                beginDate : search==undefined?"":search.beginDate,
                endDate : search==undefined?"":search.endDate,
                houseId : search==undefined?"":search.storehouseId,
                warehouseId : search==undefined?"":search.warehouseId,
                orgId : $rootScope.orgInfo.orgId
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
    
    // 火车出入库详情
    this.getTrainDetail = function (bizNo, orgId) {
        var d = $q.defer();
        $http({
            method : "GET",
            url : APP_CONFIG.agileUrl + '/crkRecord/getTrainDetail',
            params : {
                bizNo : bizNo,
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
    
    // 代储点下汽车出入库记录
    this.queryQcCrkRecordData = function (datas) {
        var d = $q.defer();
        $http({
            method : "GET",
            url : APP_CONFIG.agileUrl + '/crkRecord/queryQcCrkRecordData',
            params : {
            	datas : datas
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

    // 代储点下火车出入库记录
    this.queryHcCrkRecordData = function (datas) {
        var d = $q.defer();
        $http({
            method : "GET",
            url : APP_CONFIG.agileUrl + '/crkRecord/queryHcCrkRecordData',
            params : {
            	datas : datas
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