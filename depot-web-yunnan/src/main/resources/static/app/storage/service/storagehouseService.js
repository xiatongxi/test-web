"use strict";

angular.module('app.storage').service("storagehouseService", function($http, $q, APP_CONFIG) {
    //仓房检查记录列表
    this.getPageInfoCheck = function(pageNum, pageSize,houserepairData,storehouseId){
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.houseKeeperRepairUrl + '/houseRepair/getCheckList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                searchStartDate:houserepairData == undefined ? "":houserepairData.searchStartDate,
                searchEndDate:houserepairData == undefined ? "":houserepairData.searchEndDate,
                houseId:storehouseId
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
            url: APP_CONFIG.houseKeeperRepairUrl + '/houseRepair/loadDataById',
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
            url: APP_CONFIG.houseKeeperRepairUrl + '/houseRepair/remove',
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


    //仓房维修记录列表
    this.getPageInfoRepair = function(pageNum, pageSize,houserepairData,storehouseId){
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.houseKeeperRepairUrl + '/houseRepair/getRepairList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                repairStatus:houserepairData == undefined ? "":houserepairData.repairStatus,
                houseId:storehouseId
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

    //保存仓房检查
    this.saveCheck = function(houserepair) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.houseKeeperRepairUrl + '/houseRepair/saveCheck',
            data: {
                houserepairJson: angular.toJson(houserepair)
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

    //保存仓房维修
    this.saveRepair = function(houserepair) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.houseKeeperRepairUrl + '/houseRepair/saveRepair',
            data: {
                houserepairJson: angular.toJson(houserepair)
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
