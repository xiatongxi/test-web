"use strict";

angular.module('app.storage').service("foodbasicinfoService", function($http, $q, APP_CONFIG) {
    //粮情专卡的列表
    this.findBasicinfoPageInfo = function(pageNum, pageSize,storehouseId,warehouseId){
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.qualitycheckUrl + '/foodbasicinfo/basicinfoPageInfo',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                houseId:storehouseId,
                warehouseId:warehouseId
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

    //按条件查询粮情专卡的列表
    this.findByCondition = function(storehouseId, warehouseId, lsnq, lspz, lsxz){
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.qualitycheckUrl + '/foodbasicinfo/findByCondition',
            params : {
                houseId:storehouseId,
                warehouseId:warehouseId,
                lsnq : lsnq,
                lspz : lspz,
                lsxz : lsxz
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

    //根据id查找当前的记录
    this.loadDataById = function(id) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.qualitycheckUrl + '/foodbasicinfo/loadDataById',
            params: {
                id : id
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


    //粮食基本信息(粮情专卡 对外的接口)
    this.findBasicinfoByStoreWarehouse = function (houseId,warehouseId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.qualitycheckUrl + '/foodbasicinfo/getFoodbasicInfoByHouseId',
            params : {
                houseId:houseId,
                warehouseId:warehouseId
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

    //货位变更记录
    this.getPageInfoLocation = function(pageNum, pageSize,houseId,warehouseId,foodbasicinfoId){
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.qualitycheckUrl + '/foodbasicinfolocation/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                houseId : houseId,
                warehouseId : warehouseId,
                foodbasicinfoId : foodbasicinfoId

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

    /**
     * 从第三方检查选择数据保存到粮食质量检测记录中
     * @param foodbasicinfo
     */
    this.saveSelectcheck = function(qualitycheck,foodbasicinfoId,orgId) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.qualitycheckUrl + '/foodbasicinfocheck/saveSelectcheck',
            data: {
                houseId:qualitycheck.houseId,
                warehouseId:qualitycheck.warehouseId,
                foodbasicinfoId:foodbasicinfoId,
                qualitycheckId:qualitycheck.id,
                orgId:orgId
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


    //根据id查找当前的记录
    this.showAddFoodinfoCheck = function(id) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.qualitycheckUrl + '/foodbasicinfocheck/loadDataById',
            params: {
                id : id
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


    //货位变更表单保存
    this.saveFoodinfoLocation = function(foodinfoLocation,orgId,id) {
        var d = $q.defer();

        $http({
            method: 'POST',
            url: APP_CONFIG.qualitycheckUrl + '/foodbasicinfolocation/save',
            data: {
                foodinfoLocationJson : angular.toJson(foodinfoLocation),
                orgId : orgId,
                id:id
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

    //根据id查找当前的记录
    this.showAddFoodinfoLocation = function(id) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.qualitycheckUrl + '/foodbasicinfolocation/loadDataById',
            params: {
                id : id
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

    //得到原货位号
    this.getWarehouseByWarehouseId = function(warehouseId){
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.basicUrl + '/Warehouse/findByWarehouse',
            params: {
                id : warehouseId
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
    
    //粮食基本信息(粮情专卡 对外的接口) 用于智能通风
    this.queryBasicInfo=function(houseId,warehouseId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/aerationTask/getFoodbasicInfoByHouseId',
            params : {
                houseId:houseId,
                warehouseId:warehouseId
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

angular.module('app.storage').service("foodsealhouseService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize,storehouseId,warehouseId){
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.qualitycheckUrl + '/qualitycheck/getFoodsealList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                houseId:storehouseId,
                warehouseId:warehouseId
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

    //粮情卡保存
    this.saveFoodBasicCard = function(foodbasicinfo,storageQualitycheckVo,orgId) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.qualitycheckUrl + '/foodbasicinfo/save',
            data: {
                foodbasicinfoJson : angular.toJson(foodbasicinfo),
                storageQualitycheckJson : angular.toJson(storageQualitycheckVo),
                orgId : orgId
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
    /**
     * 更新粮情专卡为历史数据 setFoodBasicInfoHistoryStatus
     */
     this.setFoodBasicInfoHistoryStatus=function (profitLossSheet) {
         var d = $q.defer();
         $http({
             method: 'POST',
             url: APP_CONFIG.qualitycheckUrl + '/foodbasicinfo/setFoodBasicInfoHistoryStatus',
         data: {
             houseId : profitLossSheet.houseId,
             warehouseId : profitLossSheet.warehouseId
         }
         }).then(function successCallback(response){
          d.resolve(response.data);
         }, function errorCallback(response) {
             // 请求失败执行代码
             d.reject("error");
         });
         return d.promise;
     };


    
     

})

