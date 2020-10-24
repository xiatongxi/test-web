"use strict";

angular.module('app.business')
    .service("agentBgmxzService", function($http, $q, APP_CONFIG, $rootScope) {
        //分页数据查询
        this.getList = function(pageNum, pageSize, conditions, orgId) {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agent_bgmxz/getList',
                params : {
                    pageNum : pageNum,
                    pageSize : pageSize,
                    agentId : conditions.agentId == undefined?"":conditions.agentId,
                    szlkOrgId : conditions.szlkOrgId == undefined?"":conditions.szlkOrgId,
                    houseId : conditions.houseId == undefined?"":conditions.houseId,
                    wareId : conditions.wareId == undefined?"":conditions.wareId,
                    fssj : conditions.fssj == undefined?"":conditions.fssj,
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

        //添加或修改数据
        this.saveAndUpdata = function (dates) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.agentUrl + '/agent_bgmxz/edit',
                data: {
                	bgmxzJson : dates
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
                url: APP_CONFIG.agentUrl + '/agent_bgmxz/remove',
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
        this.getFindByKeyData = function(id){
            var d = $q.defer();
            $http({
                method: 'GET',
                url: APP_CONFIG.agentUrl + '/agent_bgmxz/findByMxbgz',
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

        //查询代储库正常使用的货位数据信息
        this.selectAgentHouseWareList = function(orgId,stateType){
            var d = $q.defer();
            $http({
                method: 'GET',
                url: APP_CONFIG.agentUrl + '/agent_bgmxz/selectAgentHouseWareList',
                params: {
                	orgId: orgId,
                    stateType: stateType
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

        //将代储出入库的明细保管账保存到代储功能下的明细保管账表中
        this.addCrkFcbgzData = function(fcbgzData, orgId, realName) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.agentUrl + '/agent_bgmxz/addCrkFcbgzData',
                data: {
                	fcbgzData : fcbgzData,
                	orgId : orgId,
                	realName : realName
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                //console.log(response);
            });
            return d.promise;
        };
});