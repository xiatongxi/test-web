angular.module('app.business').controller("contractPayReceviceCtrl", function($scope, $http, $stateParams,$state, $uibModal,
		contractPayReceviceService, APP_CONFIG) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	
	//经营管理下的合同管理
	$scope.menu = $stateParams.menu;
	$scope.searchCondition = {};

    // 获取列表数据
    $scope.loadData = function() {
    	if($stateParams.contractNum!=null){
    		
    		$scope.searchCondition = {contractNum : $stateParams.contractNum};
    	}
    	
    	contractPayReceviceService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
    		$scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
    $scope.searchCondition = {};
    $scope.loadData();
    
    //清空
    $scope.clearConditions = function() {
    	$scope.searchCondition = {};
    	$scope.loadData();
    }
    
    // 新增页面
    $scope.showAdd = function() {
    	if($scope.menu!=null){
    		$state.go("app.business.management.contract.pay-recevice-view", {id: 0,menu:$scope.menu});
    	}else{
    		$state.go("app.business.contract-pay-recevice-view", {id: 0});
    	}
        
    }

    
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData();
     	}
	}
	
});