angular.module('app.business').controller("drugInfoListModalCtrl", function($scope, $http, $state, $uibModalInstance,
		drugInfoService, APP_CONFIG) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.searchCondition = {};
    // 获取列表数据
    $scope.loadData = function() {
        drugInfoService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition)
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
	
	// 选择.
	$scope.select = function(drugInfo) {
		$uibModalInstance.close(drugInfo);
	}
});