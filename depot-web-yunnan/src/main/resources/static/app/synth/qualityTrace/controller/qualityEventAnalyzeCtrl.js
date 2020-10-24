"use strict";
// 质量事件追溯分析列表
angular.module('app.synth').controller("qualityEventAnalyzeCtrl",function ($scope, $rootScope, $state, $filter, 
		qualityEventService, warehouseService) {

	// 获取基础数据
	$scope.getBasicData = function(houseId) {
		//按照单位获取单位下的仓房信息
		var depotId = $rootScope.orgInfo.orgId;
		//获取货位信息
		warehouseService.getStorehouse(depotId, houseId, "0").then(function(data){
			$scope.warelist = data.wareList;  //下拉列表数据
			$scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
	    },function(data){
	        console.log(data);
	    });
	}

	//初始化加载
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.loadData = function() {
    	//$scope.getBasicData();
		qualityEventService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, 
				$rootScope.orgInfo.orgId, $scope.houseId, $scope.wareId).then(function(data){
    		$scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
	
	//初始化加载
	$scope.getBasicData(null);
	$scope.loadData();
	
	// 查看、新增、修改
    $scope.view = function(id, btnType) {
    	if (id != null) {
    		//查看、修改
    		$state.go('app.synth.qualityEvent.edit',{id:id, btnType:btnType});
    	} else {//新增
    		$state.go('app.synth.qualityEvent.edit', {id: null});
    	}
    }
	
	// 质检信息
    $scope.showQualityCheckInfo = function (event) {
        $state.go('app.synth.lifecycle.qualityCheck',{houseId:event.houseId,warehouseId:event.wareId});
    };
});