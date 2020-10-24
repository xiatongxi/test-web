"use strict";
angular.module('app.business').controller("qualityTraceCtrl", function($scope,$state,$rootScope,$filter,StorehouseService,warehouseService, qualitycheckService) {
    // 获取列表数据
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.searchCondition = {storehouseId:"", warehouseId:""};
    $scope.loadData = function() {
        qualitycheckService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.searchCondition.checkType, '', $scope.searchCondition.storehouseId).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();

    // 仓房列表
    $scope.loadStore = function() {
        StorehouseService.getStorehouseList($rootScope.orgInfo.orgId).then(function(data){
            $scope.storelist = data.houseList;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadStore();

    // 货位列表
    $scope.loadWare = function() {
        warehouseService.getStorehouse($rootScope.orgInfo.orgId, $scope.searchCondition.storehouseId).then(function(data){
            $scope.warelist = data.wareList;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadWare();

    // 翻页
    $scope.goPage = function(pageNum) {
        $scope.pageInfo.pageNum = pageNum;
        qualitycheckService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    };

    // 粮食初检信息查看页面
    $scope.showViewFck = function(id) {
        $state.go('app.supervise.decisionSupport.qualityTraceList.firstCheckDetail',{id:id,isNotEdit:true});
    };
    // 粮食验收信息查看页面
    $scope.showViewAck = function(id) {
        $state.go('app.supervise.decisionSupport.qualityTraceList.acceptCheckDetail',{id:id,isNotEdit:true});
    };
    // 春秋普查信息查看页面
    $scope.showViewSpr = function(id) {
        $state.go('app.supervise.decisionSupport.qualityTraceList.springCheckDetail',{id:id,isNotEdit:true});
    };
    // 粮食出库信查看页面
    $scope.showViewOut = function(id) {
        $state.go('app.supervise.decisionSupport.qualityTraceList.outCheckDetail',{id:id,isNotEdit:true});
    };
    // 日常检查查看页面
    $scope.showViewDak = function(id) {
        $state.go('app.supervise.decisionSupport.qualityTraceList.dayCheckDetail',{id:id,isNotEdit:true});
    };
    // 第三方检查查看页面
    $scope.showViewTrk = function(id) {
        $state.go('app.supervise.decisionSupport.qualityTraceList.thirdCheckDetail',{id:id,isNotEdit:true});
    };


});