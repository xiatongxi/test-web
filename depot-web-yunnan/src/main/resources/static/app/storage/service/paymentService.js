"use strict";

angular.module('app.storage').service("paymentService", function($http, $q, APP_CONFIG) {
    this.loadData = function (pageNum, pageSize,houseId,type,searchStartDate,searchEndDate) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.paymentUrl + '/storagePayMent/getpaymentList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                houseId : houseId,
                type : type,
                searchStartDate : searchStartDate,
                searchEndDate : searchEndDate
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            d.reject("error");
        });
        return d.promise;
    }

    this.loadDataById = function (fyid) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.paymentUrl + '/storagePayMent/getpaymentListById',
            params : {
                id: fyid
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            d.reject("error");
        });
        return d.promise;
    }

    this.getKepperByHouseId = function (houseid) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/Keeper/getKepperByHouseId',
            params : {
                houseId: houseid
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            d.reject("error");
        });
        return d.promise;
    }

    this.saveData = function (paymentJson,orgId) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.paymentUrl + '/storagePayMent/edit',
            data: {
                paymentJson : paymentJson,
                orgId : orgId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
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
            url: APP_CONFIG.paymentUrl + '/storagePayMent/remove',
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

    //根据登录用户获取保管员仓房
    this.queryByBarn = function(){
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.basicUrl + '/Keeper/getKeeperByBarn',
            data: {}
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            //console.log(response);
        });
        return d.promise;
    }
})
