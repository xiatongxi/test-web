"use strict";

angular.module('app.storage').service("threetempcheckService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, threetempcheckData,storehouseId){
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.grainInspectionUrl + '/threetempCheck/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                searchStartDate:threetempcheckData == undefined ? "":threetempcheckData.searchStartDate,
                searchEndDate:threetempcheckData == undefined ? "":threetempcheckData.searchEndDate,
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

    //获得三温图列表
    this.chartData = function(storehouseId,checkDate){
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.grainInspectionUrl + '/threetempCheck/chartData',
            params : {
                houseId:storehouseId,
                checkDate:checkDate
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
            url: APP_CONFIG.grainInspectionUrl + '/threetempCheck/loadDataById',
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

    //从一体化中取出数据保存到本地
    /*this.addthreetempFromYTH = function() {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.grainInspectionUrl + '/threetempCheck/save',
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });

        return d.promise;
    }*/

    //根据id移除数据
    this.removeById = function(id){
        if (!confirm("确定要删除吗？")) {
            return;
        }
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.grainInspectionUrl + '/threetempCheck/remove',
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


})
