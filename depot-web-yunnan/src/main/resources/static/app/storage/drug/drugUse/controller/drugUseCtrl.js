angular.module('app.storage').controller("drugUseCtrl", function($scope, $http, $state, drugUseService) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.searchCondition = {drugKind:"",drugName:"",startTime:"",endTime:""};//搜索条件
    // 获取列表数据
    $scope.loadData = function() {
        drugUseService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();
    
    // 新增页面
    $scope.showAdd = function() {
        $state.go("app.storage.drug.use.edit", {id: 0});
    };

    // 查看页面
    $scope.showView = function(id) {
        $state.go("app.storage.drug.use.view", {id: id});
    };
    
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData();
     	}
	};

});