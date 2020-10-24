"use strict";

angular.module('app.business')
    .service("agentNumberService", function($http, $q, APP_CONFIG, $rootScope) {
        //分页数据查询
        this.getGrainStorageNumberData = function(pageNum, pageSize, grainStorageNumber, orgId) {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agentNumber/getAgentNumberList',
                params : {
                    pageNum : pageNum,
                    pageSize : pageSize,
                    agentId : grainStorageNumber.agentId == undefined?"":grainStorageNumber.agentId,
                    agentDepotId : grainStorageNumber.agentDepotId == undefined?"":grainStorageNumber.agentDepotId,
                    storehouseId : grainStorageNumber.storehouseId == undefined?"":grainStorageNumber.storehouseId,
                    warehouseId : grainStorageNumber.warehouseId == undefined?"":grainStorageNumber.warehouseId,
                    businessType : grainStorageNumber.businessType == undefined?"":grainStorageNumber.businessType,
                    lspz : grainStorageNumber.lspz == undefined?"":grainStorageNumber.lspz,
                    orgid : orgId
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
                url: APP_CONFIG.agentUrl + '/agentNumber/saveAgent',
                data: {
                    agentNumberJson : dates,
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
                url: APP_CONFIG.agentUrl + '/agentNumber/removeAgentNumber',
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
        this.getAgentNumberEdit = function(id){
            var d = $q.defer();
            $http({
                method: 'GET',
                url: APP_CONFIG.agentUrl + '/agentNumber/getAgentNumberEdit',
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

        //将代储库的库存实物数据同步到代储功能下的库存实物表中
        this.editCrkKcswData = function(kcswData, orgId, realName) {
        	var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.agentUrl + '/agentNumber/editCrkKcswData',
                data: {
                	kcswData : kcswData,
                	orgId : orgId,
                	realName : realName
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                //console.log(response);
            });
            return d.promise;
        }
});