angular.module('app.business').controller("fumigationPassListModalCtrl", 
	function($scope, $uibModalInstance, $filter, $http, $uibModal, $rootScope,
			fumigationService, StorehouseService, APP_CONFIG, items) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.searchCondition = {};
	
    // 获取列表数据
    $scope.loadData = function() {
        fumigationService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
    
    // 获取基础数据
 	$scope.getBasicData = function() {
 		//按照单位获取单位下的仓房信息
 		$scope.storehouseList = $rootScope.storelist;
		$scope.storehouseObj = $rootScope.storehouseObj;
 	}
 	
 	if (items.type != null) {
 		$scope.searchCondition.type = items.type;
 	}
 		
	$scope.getBasicData();
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
	
	// 选择，
	$scope.selectFumigationProgram = function(id) {
		$uibModalInstance.close(id);
	}
	 
	 

});