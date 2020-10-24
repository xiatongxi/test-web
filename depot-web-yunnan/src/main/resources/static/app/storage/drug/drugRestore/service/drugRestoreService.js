"use strict";
angular.module('app.storage').service("drugRestoreService", function($http, $q, APP_CONFIG,$rootScope) {
    this.getPageInfo = function(pageNum, pageSize,searchCondition) {
        var url = '/depot/business/drugRestore/getList';
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.drugManageUrl + url,
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                drugKind : searchCondition == undefined ? '':searchCondition.drugKind,
                drugName : searchCondition == undefined ? '':searchCondition.drugName,
                startTime : searchCondition == undefined ? '':searchCondition.startTime,
                endTime : searchCondition == undefined ? '':searchCondition.endTime
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
    
    //根据id加载数据
    this.loadDataById = function(id) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugRestore/edit',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };

    //保存修改接口
    this.saveData = function (drugRestore,addedDetail) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugRestore/save',
            data: {
                drugRestoreJson : angular.toJson(drugRestore),
                drugRestoreDetailJson: angular.toJson(addedDetail),
                orgId : $rootScope.orgInfo.orgId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            d.reject(response.msg);
        });
        return d.promise;
    };

});
