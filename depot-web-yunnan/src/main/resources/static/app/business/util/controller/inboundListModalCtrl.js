angular.module('app.business').controller("inboundListModalCtrl", 
	function($scope, $uibModalInstance, $filter, $http, $uibModal, inboundService, transferContractService,APP_CONFIG, items) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	
    // 获取列表数据
    $scope.loadData = function() {
    	inboundService.getZzPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize)
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
    
    $scope.loadData();
    
    
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData();
     	}
	}
    
	// 关闭模态窗口
	$scope.cancel = function() {
		$uibModalInstance.close();
	}
	
	// 选择合同，
	$scope.selectContract = function(inbound) {
		$uibModalInstance.close(inbound);
	}
	 
	 

});