"use strict";
angular.module('app.intelligent').controller("dailyConsumptionCtrl", function($scope, $state, $rootScope,$stateParams,$uibModal,energyStatisticsService,meterQueryService) {

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    //搜索条件
    $scope.search = {};
    //$scope.vHhtype=$rootScope.dicDataList[6946][0].enumid;
    // 列表
    $scope.loadData = function () {
    	energyStatisticsService.getDailyConsumptionPageInfo($scope.pageInfo,$rootScope.orgInfo.orgId,$scope.vHhtype,$scope.searchStartDate,$scope.searchEndDate).then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    };
    
    // 设备号下拉列表
    /*$scope.loadDatas = function () {
    	meterQueryService.getDeviceInfo($rootScope.orgInfo.orgId).then(function(data){
            $scope.deviceInfo = data.data;
            $scope.deviceNumber = $scope.deviceInfo.list[0].vNhCode;//默认选中第一个
            $scope.loadData();
        },function(data){
            console.log(data);
        });
    };*/
    
    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };
    
    $scope.loadData();

}).controller("taskConsumptionCtrl", function($scope, $state, $rootScope,$stateParams,$uibModal,energyStatisticsService,meterQueryService) {

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    //搜索条件
    $scope.search = {};
    // 列表
    $scope.loadData = function () {
    	energyStatisticsService.getTaskConsumptionPageInfo($scope.pageInfo,$rootScope.orgInfo.orgId,$scope.vHhtype,$scope.searchStartDate,$scope.searchEndDate).then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    };
    
    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };
    
    $scope.loadData();

});