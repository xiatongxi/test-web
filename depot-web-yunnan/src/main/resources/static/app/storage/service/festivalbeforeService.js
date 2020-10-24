"use strict";

angular.module('app.storage').service("festivalbeforeService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, festivalbeforeData,storehouseId){
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.grainInspectionUrl + '/festivalbeforeCheck/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                searchStartDate:festivalbeforeData == undefined ? "":festivalbeforeData.searchStartDate,
                searchEndDate:festivalbeforeData == undefined ? "":festivalbeforeData.searchEndDate,
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
            url: APP_CONFIG.grainInspectionUrl + '/festivalbeforeCheck/loadDataById',
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
            url: APP_CONFIG.grainInspectionUrl + '/festivalbeforeCheck/remove',
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
