"use strict";
angular.module('app.business').controller("noticeScheduleListModalCtrl", 
	function($scope, $uibModalInstance, $filter, $http, $uibModal, deliveryStorageNoticeScheduleService, APP_CONFIG, items) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	
    // 获取列表数据
    $scope.loadData = function() {
    	deliveryStorageNoticeScheduleService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
    $scope.searchCondition = {};
    
    if (items.planBid != null && items.planBid != undefined) {
    	$scope.searchCondition.planBid = items.planBid;
    }
    if (items.rootContractBid != null && items.rootContractBid != undefined) {
    	$scope.searchCondition.rootContractBid = items.rootContractBid;
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