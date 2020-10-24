"use strict";

angular.module('app.business')
    .service("agentQcService", function($http, $q, APP_CONFIG, $rootScope) {
        //分页数据查询
        this.getGrainStorageQcData = function(pageNum, pageSize, grainStorageQc, orgId) {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agentQc/getAgentQcList',
                params : {
                    pageNum : pageNum,
                    pageSize : pageSize,
                    agentId : grainStorageQc.agentId == undefined?"":grainStorageQc.agentId,
                    agentDepotId : grainStorageQc.agentDepotId == undefined?"":grainStorageQc.agentDepotId,
                    storehouseId : grainStorageQc.storehouseId == undefined?"":grainStorageQc.storehouseId,
                    warehouseId : grainStorageQc.warehouseId == undefined?"":grainStorageQc.warehouseId,
                    businessType : grainStorageQc.businessType == undefined?"":grainStorageQc.businessType,
                    lspz : grainStorageQc.lspz == undefined?"":grainStorageQc.lspz,
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
                url: APP_CONFIG.agentUrl + '/agentQc/saveAgent',
                data: {
                    agentQcJson : dates,
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
                url: APP_CONFIG.agentUrl + '/agentQc/removeAgentQc',
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
        this.getAgentQcEdit = function(id){
            var d = $q.defer();
            $http({
                method: 'GET',
                url: APP_CONFIG.agentUrl + '/agentQc/getAgentQcEdit',
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

        //把出入库的汽车出入库记录数据保存到代储点的汽车出入库记录表中
        this.editQcCrkRecordData = function(qcCrkRecordData, orgId, realName){
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.agentUrl + '/agentQc/editQcCrkRecordData',
                data: {
                	qcCrkRecordData: qcCrkRecordData,
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
                url: APP_CONFIG.agentUrl + '/agentQc/selectAgentHouseWareList',
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