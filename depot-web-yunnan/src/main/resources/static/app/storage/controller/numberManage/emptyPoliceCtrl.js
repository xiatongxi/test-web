"use strict";

angular.module('app.business')
    .controller("emptyPoliceCtrl", function($scope, $rootScope, $http, $state, $filter, StorehouseService, warehouseService,
           kcswService, foodbasicinfoService, APP_CONFIG) {
        // 获取列表数据
        var hwh = "KC";
        $scope.searchCondition = {};
        $scope.loadDataSelect = function() {
            $scope.getBasicData();
            /* 分页信息 */
            $scope.pageInfo = {pageNum : 1, pageSize : 10};
            $scope.kcswStr = {ch : null, hwh : null, unitid : $rootScope.orgInfo.orgId};
            kcswService.getEmptyList(null, null, $scope.kcswStr).then(function(data){
                if (null != data.list && undefined != data.list && data.list.length != 0) {
                    for (var i = 0; i < data.list.length; i++) {
                        hwh += data.list[i].hwh + ",";
                        if(i == data.list.length - 1 ){
                            hwh = hwh.substring(0,hwh.length);
                            $scope.loadData();
                        }
                    }
                }else{
                    $scope.loadData();
                }
            },function(data){
                console.log(data);
            });
        };

        $scope.loadData = function () {
            warehouseService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,
                $scope.ware, $rootScope.orgInfo.orgId, hwh, null).then(function (data) {
                $scope.pageInfo = data;
            }, function (data) {
                console.log(data);
            });
        }

        // 翻页
        $scope.goPage = function(pageNum) {
            if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
                $scope.pageInfo.pageNum = pageNum;
                $scope.loadData();
            }
        };

        // 货位列表
        $scope.loadWare = function() {
            warehouseService.getStorehouse($rootScope.orgInfo.orgId, $scope.searchCondition.houseId).then(function(data){
                $scope.warelist = data.wareList;
            },function(data){
                console.log(data);
            });
        };

        // 仓房列表
        $scope.loadStore = function() {
            $scope.getBasicData();
            StorehouseService.getStorehouseList($rootScope.orgInfo.orgId).then(function(data){
                $scope.storelist = data.houseList;
            },function(data){
                console.log(data);
            });
        };

        $scope.getBasicData = function() {
            //按照单位获取单位下的仓房信息
            var depotId = $rootScope.orgInfo.orgId;
            StorehouseService.getStorehouseList(depotId).then(function(data){
                $scope.storehouseList = data.houseList;
                $scope.storehouseObj = data.houseObj;
            },function (data) {
                console.log(data);
            });
            var depotId = $rootScope.depotInfo.orgId;
            var cfh = '';
            warehouseService.getStorehouse(depotId,cfh).then(function(data){
                $scope.warehouseList = data.houseList;  //下拉列表数据
                $scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
            },function (data) {
                console.log(data);
            });
        };

        $scope.loadDataSelect();
    });