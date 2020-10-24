"use strict";

angular.module('app.business')
    .service("agentTankService", function($http, $q, APP_CONFIG, $rootScope) {
        //分页数据查询
        this.getPageInfo = function(pageNum, pageSize, agentDepotName) {
        	var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agentTank/getAgentTankList',
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

        //添加或修改数据
        this.saveAndUpdata = function (dates,orgId) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.agentUrl + '/agentTank/saveAgentTank',
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
                url: APP_CONFIG.agentUrl + '/agentTank/removeAgentTank',
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
                url: APP_CONFIG.agentUrl + '/agentTank/edit',
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
});