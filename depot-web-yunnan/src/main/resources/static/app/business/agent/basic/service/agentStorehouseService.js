"use strict";

angular.module('app.business')
    .service("agentStorehouseService", function($http, $q, APP_CONFIG, $rootScope) {
        //分页数据查询
        this.getStoreList = function(pageNum, pageSize, agentDepotName) {
            var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agentStorehouse/getStoreList',
                params : {
                    pageNum : pageNum,
                    pageSize : pageSize,
                    agentDepotName : agentDepotName == undefined?"":agentDepotName,
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
        };

        //选择的仓房
        this.getStorehouseList = function(depotId) {
        	var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agentStorehouse/getStorehouseList',
                params : {
                    depotId : depotId,
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
        };

        //货位的仓房
        this.getAgentStoreInfo = function(depotId) {
        	var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agentStorehouse/getAgentStoreInfo',
                params : {
                    depotId : depotId,
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
        };

        // 货位的货位
        this.getStorehouse = function(unitId, storehouseId) { //传值单位ID和仓房ID
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agentStoreWare/getWarehouse',
                params : {
                    unitId : unitId,
                    storehouseId : storehouseId
                }
            }).then(function successCallback(response) {
                // 请求成功执行代码
                // data.wareList的值用于货位下拉列表
                d.resolve(response.data);
            }, function errorCallback(response) {
                // 请求失败执行代码
                d.reject("error");
            });
            return d.promise;
        }

        /**
         * 查询所有粮库
         */
        this.getDepotInfo = function(orgName,agentId) {
            var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agentStorehouse/getDepotInfo',
                params : {
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
        };

        //保存已有仓房信息
        this.saveLaoStorehouse = function (storehouseList,depotId) {
            var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.agentUrl + '/agentStorehouse/saveLaoStorehouse',
                data: {
                    storehouseList : storehouseList,
                    depotId : depotId,
                    orgId : orgId
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                //console.log(response);
            });
            return d.promise;
        };

        //保存已有货位信息
        this.saveWarehouseData = function (warehouseId,storeId) {
            var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.agentUrl + '/agentStoreWare/saveWarehouseData',
                data: {
                    warehouseId : warehouseId,
                    storeId : storeId,
                    orgId : orgId
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                //console.log(response);
            });
            return d.promise;
        }

        //分页货位查询
        this.getWareList = function(pageNum, pageSize, agentDepotName) {
            var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agentStoreWare/getWareList',
                params : {
                    pageNum : pageNum,
                    pageSize : pageSize,
                    agentDepotName : agentDepotName == undefined?"":agentDepotName,
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
        };

        //删除一条已有代储货位
        this.removeAgentWare = function(wareId) {
            var d = $q.defer();
            $http({
                method : 'POST',
                url : APP_CONFIG.agentUrl + '/agentStoreWare/removeAgentWare',
                params : {
                    wareId : wareId
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
        
        
       //获取本库的代储仓房(启用着的)
        this.getAgentHouseId = function() {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agentStorehouse/getAgentHouseId',
                params : {
                    orgId : $rootScope.userInfo.orgId
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
        
        
       //获取本库的代储仓房(启用着的)
        this.getAgentWareId = function() {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agentStoreWare/getAgentWareHouseId',
                params : {
                    orgId : $rootScope.userInfo.orgId
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

       //获取代储库下边的仓房信息，已有粮库和手加粮库都有
        this.getDepotToStoreList = function(orgId, depotId) {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agentStorehouse/getDepotToStoreList',
                params : {
                    orgId : orgId,
                    depotId : depotId
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
});