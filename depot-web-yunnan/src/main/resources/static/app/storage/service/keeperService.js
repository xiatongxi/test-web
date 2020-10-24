"use strict";

angular.module('app.storage').service("keepertransferService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize,keepertransferData,storehouseId,roleId){
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.houseKeeperRepairUrl + '/keeperTransfer/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                searchStartDate:keepertransferData == undefined ? "":keepertransferData.searchStartDate,
                searchEndDate:keepertransferData == undefined ? "":keepertransferData.searchEndDate,
                houseId:storehouseId,
                roleId:roleId
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
            url: APP_CONFIG.houseKeeperRepairUrl + '/keeperTransfer/loadDataById',
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
            url: APP_CONFIG.houseKeeperRepairUrl + '/keeperTransfer/remove',
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

    //当前库下所有的保管员
    this.findreceivedUser = function (userInfo,roleId) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.basicUrl + '/Keeper/receivedUserByOrgId',
            params: {
                userInfo : angular.toJson(userInfo),
                roleId : roleId
            }

        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            //console.log(response);
        });
        return d.promise;
    }

    //根据登录者得到当前的保管员
    this.getKeeperByLoginUser = function (userId,roleId) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.basicUrl + '/Keeper/getKeeperByLoginUser',
            params: {
                userId:userId,
                roleId:roleId
            }

        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            //console.log(response);
        });
        return d.promise;
    }

    //当前库下所有的用户
    this.findAllUserByOrgId = function () {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.systemUrl + '/userInfo/findAllUserByOrgId',
            params: {
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            //console.log(response);
        });
        return d.promise;
    }

    //查询用户
    this.getKeeperBySuperiorUser = function (superiorUser) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.systemUrl + '/userInfo/edit',
            params: {
                userId:superiorUser
            }

        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            //console.log(response);
        });
        return d.promise;
    }

    //查询保管员移交的字表
    this.findKeepertransferDetailsByKtId = function (ktId) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.houseKeeperRepairUrl + '/keeperTransferDetails/findKtDetailsByKtId',
            params: {
                ktId:ktId,
            }

        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            //console.log(response);
        });
        return d.promise;
    }

    this.saveKeepertransfer = function(keepertransfer,keepertransferDetail) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.houseKeeperRepairUrl + '/keeperTransfer/save',
            data: {
                keepertransferJson: angular.toJson(keepertransfer),
                keepertransferDetailJson : angular.toJson(keepertransferDetail)
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
