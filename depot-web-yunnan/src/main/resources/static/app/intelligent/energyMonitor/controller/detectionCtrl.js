"use strict";
angular.module('app.intelligent').controller("detectionCtrl", function($scope, $state, $rootScope,$stateParams,$uibModal,detectionService,meterQueryService,$interval) {

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    //搜索条件
    $scope.search = {vnhcode:""};
    $scope.type = $stateParams.type;

    // 列表
    $scope.loadData = function () {
        detectionService.getDetectionPageInfo($scope.pageInfo, $scope.search, $rootScope.orgInfo.orgId,$scope.type).then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            // console.log(data);
        });
    };
    
    //能耗监测方法
    $scope.detectionTest = function(){
    	// $(".player-loader").show();
    	if (!confirm("您确认发送能耗检测请求!")) {
            return;
        }
    	detectionService.detectionTest().then(function(data){
    		if (data.retCode === '200' && data.message === 'success') {
    			if (data.data === '3232302D46696C') {
                    alert("无法连接到设备!");
                    return;
                }
    			alert(data.data);
    		}
    		// $(".player-loader").hide();
    	},function(data){
    		// $(".player-loader").hide();
            console.log(data);
        })
    }
    
    // 定时刷新列表(3分钟)
    $interval(function () {
        $scope.loadData();
    }, 1000*60*3, -1);
    
    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };
    
    // 设备号下拉列表
    $scope.loadDatas = function () {
    	meterQueryService.getDeviceInfo($rootScope.orgInfo.orgId).then(function(data){
            $scope.deviceInfo = data.data;
            //$scope.search.vnhcode = $scope.deviceInfo.list[0].vNhCode;//默认选中第一个
            $scope.loadData();
        },function(data){
            console.log(data);
        });
    };
    $scope.loadDatas();

});