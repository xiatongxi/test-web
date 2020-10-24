angular.module('app.storage').controller("checkDataModalCtrl", 
	function($scope, $uibModalInstance, $filter, $http, $rootScope, $uibModal, 
			dumpService, APP_CONFIG, items) {


	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.searchCondition = {};

	// 获取列表数据
	$scope.loadData = function(pageNum, pageSize, items) {
		dumpService.getYswDataPageInfo(pageNum, pageSize).then(function(data) {
			$scope.pageInfo = data;
		}).catch(function(data) {
			if (data.status == 601) {
				// session失效，关闭模态框.
				$uibModalInstance.close();
			}
		});
	}

	// 默认执行.
	$scope.loadData(1, 10, items);

	// 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
			 $scope.pageInfo.pageNum = pageNum;
			 $scope.loadData(pageNum, 10, $scope.searchCondition);
		 }
	}

	// 关闭模态窗口
	$scope.cancel = function() {
		$uibModalInstance.close();
	}

	//被选中的数据对象
	$scope.selected = [];

	// 勾选一条验收数据
	$scope.selectData = function($event, check) {
		var checkbox = $event.target;
        var checked = checkbox.checked;
        if(checked){
            $scope.selected.push(check);
        }else{
            var idx = $scope.selected.indexOf(check);
            $scope.selected.splice(idx,1);
        }
	}

	//点确定按钮
	$scope.check = function () {
		$uibModalInstance.close($scope.selected);
	}

});