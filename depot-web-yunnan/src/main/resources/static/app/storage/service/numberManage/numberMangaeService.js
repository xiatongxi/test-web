"use strict";

angular.module('app.numbermanage').service("numberMangaeService", function($http, $q, APP_CONFIG) {
    
    //根据仓号，货位号查询实际库存
    /*this.getPageInfo = function(pageNum, pageSize, searchCondition) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.numberManageUrl + '/stocknumberManage/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                houseId: searchCondition == undefined?"" : searchCondition.houseId,
                warehouseId : searchCondition == undefined?"" : searchCondition.warehouseId
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
    
  //根据仓号，货位号查询实际库存
    this.getPageInfos = function(pageNum, pageSize,searchCondition) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.numberManageUrl + '/stocknumberManage/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                houseId : searchCondition == undefined?"" : searchCondition.houseId,
                warehouseId : searchCondition == undefined?"" : searchCondition.warehouseId,
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
    
    //查询所有的仓房
    this.getPageInfowares = function(pageNum, pageSize) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.numberManageUrl + '/stocknumberManage/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }*/
    
});
