angular.module('app.business').controller("transferContractListModalCtrl", 
	function($scope, $uibModalInstance, $filter, $http, $uibModal, contractService, transferContractService,APP_CONFIG, items) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.searchCondition = {};
	 //选择中转合同
    $scope.loadDataTransfer = function() {
    	transferContractService.getModalList($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition)
	    	.then(function(data) {
	    		$scope.pageInfo = data;
	    	})
	    	.catch(function(data) {
	    		if (data.status == 601) {
	    			// session失效，关闭模态框.
	    			$uibModalInstance.close();
	    		}
	    	});
    }
    
    
    if (items != undefined && items != null) {
        if (items.billType != undefined && items.billType != null) {
            $scope.searchCondition.billType = items.billType;
        }
        if (items.planBid != null && items.planBid != undefined) {
        	$scope.searchCondition.planBid = items.planBid;
        }
    }
    
    // 默认执行.
    $scope.loadDataTransfer(1, 10, $scope.searchCondition);
    
    
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadDataTransfer();
     	}
	}
    
	// 关闭模态窗口
	$scope.cancel = function() {
		$uibModalInstance.close();
	}
	
	// 选择合同，
	$scope.selectContract = function(contract) {
		$uibModalInstance.close(contract);
	}
	 
	 

});