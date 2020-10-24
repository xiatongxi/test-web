angular.module('app.storage').controller("drugCheckCtrl", function($scope, $http, $state, 
		drugCheckService) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.searchCondition = {drugKind:"",drugName:"",startTime:"",endTime:""};//查询条件
    // 获取列表数据
    $scope.loadData = function() {
        drugCheckService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
    
    $scope.loadData();
    
    // 新增页面
    $scope.showAdd = function() {
        $state.go("app.storage.drug.check.edit", {id: 0});
    }

    // 查看页面
    $scope.showView = function(id) {
        $state.go("app.storage.drug.check.view", {id: id});
    }
    
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData();
     	}
	}
});