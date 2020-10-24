"use strict";
angular.module('app.intelligent').controller("meterQueryCtrl", function($scope, $state, $rootScope,$stateParams,$uibModal,meterQueryService) {

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    //搜索条件
    $scope.search = {};
    // 列表
    $scope.loadData = function () {
    	meterQueryService.getMeterPageInfo($scope.pageInfo, $scope.deviceNumber,$rootScope.orgInfo.orgId).then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    };
    
    // 设备下拉列表
    $scope.loadData1 = function () {
    	meterQueryService.getDeviceInfo($rootScope.orgInfo.orgId).then(function(data){
    		$scope.deviceInfo = data.data;
    		//$scope.deviceNumber = $scope.deviceInfo.list[0].vNhCode;//默认选中第一个
    		$scope.loadData();
    	},function(data){
    		console.log(data);
    	});
    };
    $scope.loadData1();

    // 清空
    $scope.emptyTime = function () {
    	$scope.deviceNumber = "";
    	$scope.loadData();
    };
    
    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

});