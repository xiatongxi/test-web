"use strict";

angular.module('app.business')
    .service("agentDepotService", function($http, $q, APP_CONFIG, $rootScope) {
        //分页数据查询
        this.getPageInfo = function(pageNum, pageSize, agentName, agentId) {
        	var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agentDepot/getAgentDepotList',
                params : {
                    pageNum : pageNum,
                    pageSize : pageSize,
                    agentDepotName : agentName == undefined?"":agentName,
                    orgid : orgId,
                    agentId : agentId
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

        //代储库信息信息记录--仓房用
        this.getAgentDepotHouse = function(agentName, agentId) {
        	var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agentDepot/getAgentDepotHouse',
                params : {
                    agentDepotName : agentName == undefined?"":agentName,
                    orgid : orgId,
                    agentId : agentId
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

        //添加或修改数据
        this.saveAndUpdata = function (dates) {
            var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.agentUrl + '/agentDepot/saveAgentDepot',
                data: {
                    agentJson : dates,
                    orgId : orgId
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                //console.log(response);
            });
            return d.promise;
        };

        // 删除一条记录
        this.removeById = function(id) {
            if (!confirm("确定要删除吗？")) {
                return;
            }
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.agentUrl + '/agentDepot/removeAgentDepot',
                data: {
                    id : id
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                //console.log(response);
            });
            return d.promise;
        };

        //根据id查询详细数据
        this.getAgentDite = function(id){
            var d = $q.defer();
            $http({
                method: 'GET',
                url: APP_CONFIG.agentUrl + '/agentDepot/editDepot',
                params: {
                    id: id
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

        //代储库查询信息
        this.getQueryAgentDepotList = function(orgId,depotId) {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agentDepot/getQueryAgentDepotList',
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


        //根据orgId和agentDepotId获取仓房列表
        this.getAgentStorehouseList = function(agentDepotId,orgId) {
        	var d = $q.defer();
        	$http({
        		method : 'GET',
        		url : APP_CONFIG.agentUrl + '/agentStorehouse/getAgentStorehouseInfo',
        		params : {
        			agentDepotId : agentDepotId,
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


        //根据orgId和agentDepotId获取货位列表
        this.getAgentStoreWareList = function(orgId,houseId) {
        	var d = $q.defer();
        	$http({
        		method : 'GET',
        		url : APP_CONFIG.agentUrl + '/agentStoreWare/getAgentWarehouseList',
        		params : {
        			agentStorehouseId : houseId,
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

        /**
         * 查询所有粮库
         */
        this.getDepotList = function(orgName,storehouseId) {
            var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agentDepot/getDepotList',
                params : {
                    orgName : orgName,
                    storehouseId : storehouseId,
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

        //保存已有粮库代储库信息
        this.saveLaoDepot = function (agentDepotId,storehouseId,warehouIds) {
            var orgId = $rootScope.orgInfo.orgId;
            var orgName = $rootScope.orgInfo.orgName;
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.agentUrl + '/agentDepot/saveLaoDepot',
                data: {
                    agentDepotId : agentDepotId,
                    storehouseId : storehouseId,
                    warehouIds : warehouIds,
                    orgName : orgName,
                    orgId : orgId
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                //console.log(response);
            });
            return d.promise;
        };

        //保存粮库代储企业信息
        this.addAgentId = function (id,agentId) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.agentUrl + '/agentDepot/addAgentId',
                data: {
                    id : id,
                    agentId : agentId
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                //console.log(response);
            });
            return d.promise;
        };
});