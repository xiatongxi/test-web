"use strict";

angular.module('app.storage').service("foodothercheckService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, foodothercheckData,storehouseId){
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.grainInspectionUrl + '/foodotherCheck/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                searchStartDate:foodothercheckData == undefined ? "":foodothercheckData.searchStartDate,
                searchEndDate:foodothercheckData == undefined ? "":foodothercheckData.searchEndDate,
                houseId:storehouseId,
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
            url: APP_CONFIG.grainInspectionUrl + '/foodotherCheck/loadDataById',
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
            url: APP_CONFIG.grainInspectionUrl + '/foodotherCheck/remove',
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

    //粮情检查表单保存
    this.savefoodothercheck = function(foodothercheck) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.grainInspectionUrl + '/foodotherCheck/save',
            data: {
                foodotherCheckJson : angular.toJson(foodothercheck),
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

    //根据id移除数据
    this.removeById = function(id){
        if (!confirm("确定要删除吗？")) {
            return;
        }
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.grainInspectionUrl + '/foodotherCheck/remove',
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
