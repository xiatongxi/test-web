angular.module('app.storage').controller("drugInfoCtrl", function($scope, $http, $state, drugInfoService) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.drugInfo = {};//搜索条件
    // 获取列表数据
    $scope.loadData = function() {
        drugInfoService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.drugInfo).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    };
    
    $scope.loadData();

    // 新增页面
    $scope.showAdd = function() {
        $state.go("app.storage.drug.info.edit", {id: 0});
    };

    // 编辑页面
    $scope.showEdit = function(id,orgId) {
        $state.go("app.storage.drug.info.edit", {id: id,orgId:orgId});
    };
    
    // 查看页面
    $scope.showView = function(id,orgId) {
        $state.go("app.storage.drug.info.view", {id: id,orgId:orgId});
    };
    
    // 删除一条记录.
    $scope.delete = function(id,orgId) {
    	if (!confirm("确定要删除吗？")) {
    		return;
    	}
    	
    	drugInfoService.remove(id,orgId).then(function(data) {
    	    if (data.status === 'success') {
    		    alert("删除成功！");
                // 重新加载数据
                $scope.loadData();
            } else if (data.status === 'error') {
                alert("删除失败！");
            }
    	});
    };
    
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData();
     	}
	};

});