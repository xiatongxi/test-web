"use strict";

angular.module('app.business')
    .service("agentHcService", function($http, $q, APP_CONFIG, $rootScope) {
        //分页数据查询
        this.getGrainStorageHCData = function(pageNum, pageSize, grainStorageHc, orgId) {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agentHc/getAgentHcList',
                params : {
                    pageNum : pageNum,
                    pageSize : pageSize,
                    agentId : grainStorageHc.agentId == undefined?"":grainStorageHc.agentId,
                    agentDepotId : grainStorageHc.agentDepotId == undefined?"":grainStorageHc.agentDepotId,
                    storehouseId : grainStorageHc.storehouseId == undefined?"":grainStorageHc.storehouseId,
                    warehouseId : grainStorageHc.warehouseId == undefined?"":grainStorageHc.warehouseId,
                    businessType : grainStorageHc.businessType == undefined?"":grainStorageHc.businessType,
                    lspz : grainStorageHc.lspz == undefined?"":grainStorageHc.lspz,
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
                url: APP_CONFIG.agentUrl + '/agentHc/saveAgent',
                data: {
                    agentHcJson : dates,
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
                url: APP_CONFIG.agentUrl + '/agentHc/removeAgentHc',
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
        this.getAgentHcEdit = function(id){
            var d = $q.defer();
            $http({
                method: 'GET',
                url: APP_CONFIG.agentUrl + '/agentHc/getAgentHcEdit',
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

        //把出入库系统的火车出入库记录数据保存到代储点的火车出入库记录表中
        this.editHcCrkRecordData = function(hcCrkRecordData, orgId, realName){
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.agentUrl + '/agentHc/editHcCrkRecordData',
                data: {
                	hcCrkRecordData: hcCrkRecordData,
                	orgId: orgId,
                	realName: realName
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

        //查询代储库正常使用的货位数据信息
        this.selectAgentHouseWareList = function(orgId){
            var d = $q.defer();
            $http({
                method: 'GET',
                url: APP_CONFIG.agentUrl + '/agentHc/selectAgentHouseWareList',
                params: {
                	orgId: orgId
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