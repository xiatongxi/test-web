"use strict";

angular.module('app.business')
    .service("agentService", function($http, $q, APP_CONFIG, $rootScope) {
        //分页数据查询
        this.getPageInfo = function(pageNum, pageSize, agentName, orgId) {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agent/getAgentList',
                params : {
                    pageNum : pageNum,
                    pageSize : pageSize,
                    agentName : agentName == undefined?"":agentName,
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

        //代储点查询信息
        this.getQueryAgentList = function(orgId) {
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.agentUrl + '/agent/getQueryAgentList',
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

        //添加或修改数据
        this.saveAndUpdata = function (dates) {
            var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.agentUrl + '/agent/saveAgent',
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
                url: APP_CONFIG.agentUrl + '/agent/removeAgent',
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
                url: APP_CONFIG.agentUrl + '/agent/edit',
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

        //修改文件存储数据
        this.getUpdateFile = function(fileIds,bid,fileType){
            var d = $q.defer();
            $http({
                method: 'POST',
                url : APP_CONFIG.basicUrl + '/depot/basic/file/updateFile',
                params: {
                    fileIds : angular.toJson(fileIds),
                    bid : bid,
                    fileType : fileType
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

        //根据仓房id删除仓房
        this.removeStoreHouse = function(storehouseId,depotId){
            var d = $q.defer();
            $http({
                method: 'POST',
                url : APP_CONFIG.agentUrl + '/agentStorehouse/removeStoreHouse',
                params: {
                    depotId : depotId,
                    storehouseId : storehouseId
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

        //查找文件存储数据
        this.getFileList = function(bid,fileType){
            var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method: 'GET',
                url : APP_CONFIG.basicUrl + '/depot/basic/file/getList',
                params: {
                    bid : bid,
                    fileType : fileType,
                    order : null,
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
});