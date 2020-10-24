"use strict";

angular.module('app.supervise').service("grainTempService", function($http, $q, APP_CONFIG) {

    this.loadData = function (pageNum, pageSize,houseNo,orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.superviseUrl + '/grainCondition/getDataList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                houseNo : houseNo,
                orgId : orgId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            d.reject("error");
        });
        return d.promise;
    }

    this.getThreeCondition = function (orgId,houseId,dayCount,TestDate) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.superviseUrl + '/grainCondition/getThreeCondition',
            params : {
                orgId:orgId,
                barnNumber : houseId,
                dayCount : dayCount,
                TestDate : TestDate
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            d.reject("error");
        });
        return d.promise;
    }

    this.getThreeConditionHomePage = function (orgId,houseId,dayCount) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.superviseUrl + '/grainCondition/getThreeConditionForPad',
            params : {
                orgId:orgId,
                barnNumber : houseId,
                dayCount : dayCount
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            d.reject("error");
        });
        return d.promise;
    }

    //获取三温表格数据
    this.loadSwTabData = function (houseNo,orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.superviseUrl + '/grainCondition/getTempByHouseNo',
            params : {
                houseNo : houseNo,
                orgId : orgId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            d.reject("error");
        });
        return d.promise;
    }
})
