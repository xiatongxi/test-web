"use strict";

angular.module('app.business')
    .controller("agentStorehouseCtrl", function($scope, $http, $state, $stateParams, $rootScope, FileUploader, agentStorehouseService) {
        $scope.depotId;
        $scope.storehouseList = {};
        $scope.loadDataById = function(depotId) {
            agentStorehouseService.getStorehouseList(depotId).then(function(data){
                $scope.storehouseList = data;
                for (var i = 0; i < $scope.storehouseList.length; i++) {
                    for (var j = 0; j < $scope.storehouseList[i].length; j++) {
                        $scope.storehouseList[i][j].stateValue = $scope.storehouseList[i][j].stateValue == '1'?true:false;
                    }
                }
            },function(data){
                console.log();
            });
        };

        $scope.getAgentDepotName = function () {
            //获取代储库名称
            agentStorehouseService.getDepotInfo($rootScope.orgInfo.orgId).then(function(data){
                $scope.depotList = data.map(function(item) {
                    return {
                        depotId: item.id,
                        depotName: item.agentDepotName
                    }
                });
            },function(data){
                console.log();
            });
        };

        $scope.getAgentDepotName();

        $scope.getEmptying = function () {
            $scope.storehouseList = {};
            $state.go('app.business.agent.basic.storehouseList',{type:2,libraryType:'1'});
        };

        // 新增或修改保存数据
        $scope.saveLaoStorehouse = function() {
            var dates = angular.toJson($scope.storehouseList);
            agentStorehouseService.saveLaoStorehouse(dates,$scope.depotId).then(function (data) {
                if (data.status == "success") {
                    alert("保存成功");
                    $state.go('app.business.agent.basic.storehouseList',{type:2,libraryType:'1'});
                } else {
                    alert("保存失败");
                }
            });
        };

        $scope.retList = function(){
            $rootScope.back();
        };
    });