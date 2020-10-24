"use strict";
angular.module('app.business').controller("contractScheduleListModalCtrl", 
	function($scope, $uibModalInstance, $filter, $http, $uibModal, contractScheduleService, APP_CONFIG, items) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	
    // 获取列表数据
    $scope.loadData = function() {
    	contractScheduleService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
    $scope.searchCondition = {};
    
    if (items.planBid != null && items.planBid != undefined) {
    	$scope.searchCondition.planBid = items.planBid;
    }
    $scope.loadData();
    
    
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData(pageNum);
     	}
	}
    
	// 关闭模态窗口
	$scope.cancel = function() {
		$uibModalInstance.close();
	}
	
	 

});