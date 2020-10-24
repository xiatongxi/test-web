angular.module('app.business').controller("transferContractCanChangeListModalCtrl", 
	function($scope, $uibModalInstance, $filter, $http, $uibModal, contractService,transferContractService, APP_CONFIG, items) {

	//$scope.pageInfo = {pageNum : 1, pageSize : 10};
	
    // 获取可变更合同列表.
   /* $scope.loadData = function() {
    	contractService.getCanChangeList($scope.pageInfo.pageNum, $scope.pageInfo.pageSize).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
    
    $scope.loadData();*/
    
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    // 获取可变更合同列表(中转合同).
    $scope.loadDataTransfer = function() {
    	transferContractService.getCanChangeList($scope.pageInfo.pageNum, $scope.pageInfo.pageSize).then(function(data){
    		$scope.pageInfo = data;
    	},function(data){
    		console.log(data);
    	});
    }
    
    $scope.loadDataTransfer();
    
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