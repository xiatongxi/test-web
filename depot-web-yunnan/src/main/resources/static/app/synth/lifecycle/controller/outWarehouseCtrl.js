"use strict";
angular.module('app.synth').controller("outWarehouseCtrl",function ($scope, $rootScope, $state, crkRecordService, StorehouseService, $stateParams, warehouseService) {
    // 获取当前登录人组织机构编码
     var orgId = $rootScope.orgInfo.orgId;
    // 出库明细
    // 获取列表数据
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.search = {cazylx:"3",storehouseId:$stateParams.houseId,warehouseId:$stateParams.warehouseId};
    $scope.loadData = function() {
        if (null != $stateParams.houseId) {
            $scope.houseId = $stateParams.houseId;
            $scope.warehouseId = $stateParams.warehouseId;
        }
        if ($stateParams.type == 'hc') {
        	$scope.hc_show;
        	$scope.qc_show;
            crkRecordService.getHcPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.search, orgId).then(function(data){
                $scope.pageInfo = data;
                if (data.list != null && data.list.length > 0) {
                	$scope.qc_show = false;
                } else {
                	$scope.qc_show = true;
                }
                /*crkRecordService.getQcPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.search, orgId).then(function(datas){
                	if (datas.list != null && datas.list.length > 0) {
                		$scope.hc_show = false;
                	} else {
                		$scope.hc_show = true;
                	}
                	if (!$scope.hc_show && !$scope.qc_show) {
                		$scope.loadDataTruck();
                	}
                },function(datas){
                    console.log(datas);
                });*/
            },function(data){
                console.log(data);
            });
        } else if ($stateParams.type == 'qc') {
        	$scope.hc_show;
        	$scope.qc_show;
            crkRecordService.getQcPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.search, orgId).then(function(data){
                $scope.pageInfo = data;
                if (data.list != null && data.list.length > 0) {
                	$scope.qc_show = true;
                } else {
                	$scope.qc_show = false;
                }
                /*crkRecordService.getHcPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.search, orgId).then(function(datas){
                	if (datas.list != null && datas.list.length > 0) {
                		$scope.hc_show = false;
                	} else {
                		$scope.hc_show = true;
                	}
                	if (!$scope.hc_show && $scope.qc_show) {
                		$scope.loadDataTrain();
                	}
                },function(datas){
                	console.log(datas);
                });*/
            },function(data){
                console.log(data);
            });
        }
    };
    $scope.loadData();

    // 汽车入库
    $scope.loadDataTruck = function(){
        $state.go('app.synth.lifecycle.outWarehouseTruck',{type:'qc',houseId:$scope.houseId,warehouseId:$scope.warehouseId,isShowReturn:'lifecycle'});
    };
    // 火车入库
    $scope.loadDataTrain = function(){
        $state.go('app.synth.lifecycle.outWarehouseTrain',{type:'hc',houseId:$scope.houseId,warehouseId:$scope.warehouseId,isShowReturn:'lifecycle'});
    };

    // 仓房列表
    $scope.storeMap = {};
    $scope.loadStore = function() {
        StorehouseService.getStorehouseList($rootScope.orgInfo.orgId).then(function(data){
            $scope.storelist = data.houseList;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadStore();

    // 货位列表
    $scope.wareMap = {};
    $scope.loadWare = function() {
        warehouseService.getStorehouse($rootScope.orgInfo.orgId, $scope.search.storehouseId).then(function(data){
            $scope.warelist = data.wareList;
        },function(data){
            console.log(data);
        });
    };

    // 详情
    $scope.view = function(obj) {
        $state.go('app.synth.lifecycle.warehouseTruckDetail', {obj : angular.toJson(obj)});
    };

    // 翻页
    $scope.goPage = function(pageNum) {
        $scope.pageInfo.pageNum = pageNum;
        $scope.loadData();
    };

    //返回主列表页面
    $scope.returnHomePage = function(){
        if ($stateParams.isShowReturn == 'lifecycle') {
            $state.go('app.synth.lifecycle');
        } else {
            $rootScope.back();
        }
    }

});