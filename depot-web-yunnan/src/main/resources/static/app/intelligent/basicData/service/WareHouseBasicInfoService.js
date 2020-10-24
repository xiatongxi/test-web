"use strict";
angular.module('app.intelligent').service("WareHouseBasicInfoService", function ($http, $q, APP_CONFIG) {
    // 接口封装仓房基本信息
    this.WareHouseBasicInfo = function (unitId, libraryType) { //传值单位ID和仓房性质
        // 默认主粮库(代储库需要传参'1')
        if (libraryType != '1') {
            libraryType = '0';
        }
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.intelligentUrl + '/intelligents/wareHouseBasicInfo/getWareHouseInfo',
            params: {
                unitId: unitId,
                libraryType: libraryType
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

    // 接口推送库点信息
    this.saveGrainpoint = function (org,cOrU) {
        if (org.completeDate != null) {
            org.completeDate = org.completeDate + " 00:00:00";
        }
        if (org.useDate != null) {
            org.useDate = org.useDate + " 00:00:00";
        }
        org.registDate = null;

        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/wareHouseBasicInfo/saveGrainpoint',
            data: {
                orgInfoJson: angular.toJson(org),
                CUD: cOrU
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

    // 接口推送同步仓房信息设置
    this.synchronizationStoreHouse = function (basicStorehouse,del) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/wareHouseBasicInfo/synchronizationStoreHouse',
            data: {
                basicStorehouseJson: angular.toJson(basicStorehouse),
                del: del == undefined ? '':del
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