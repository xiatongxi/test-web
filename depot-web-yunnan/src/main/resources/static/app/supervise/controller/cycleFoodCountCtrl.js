"use strict";
angular.module('app.supervise').controller("cycleFoodCountCtrl",function($scope, $rootScope, $state, crkRecordService, StorehouseService, $stateParams, warehouseService) {
    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};

    // 出入库监管统计
    $scope.searchCount = {storehouseId:"", warehouseId:"", cazylx:"", pz:"", beginDate:"", endDate:""};
    $scope.loadDataCycleFoodCount = function() {
        crkRecordService.getCycleFoodCountPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCount).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadDataCycleFoodCount();

    // 出入库监管统计出入库详情
    $scope.cycleFoodView = function(obj){
        if ('火车入仓' == obj.ywlx || '火车出仓' == obj.ywlx) {
            $state.go('app.supervise.decisionSupport.cycleFoodCount.trainDetail', {obj : angular.toJson(obj)});
        } else {
            // 汽车
        	obj.lspzid = obj.lspzCode;
            $state.go('app.supervise.decisionSupport.cycleFoodCount.truckDetail', {obj : angular.toJson(obj)});
        }
    };

    // 翻页
    $scope.goPage = function(pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadDataCycleFoodCount();
        }
    };

    // 货位列表
    $scope.loadWare = function() {
        warehouseService.getStorehouse($rootScope.orgInfo.orgId, $scope.searchCount.storehouseId).then(function(data){
            $scope.warehouseList = data.wareList;  //下拉列表数据
            $scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
        },function(data){
            console.log(data);
        });
    };
    $scope.loadWare();

});