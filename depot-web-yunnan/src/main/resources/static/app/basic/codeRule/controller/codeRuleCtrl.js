angular.module('app.basic').controller("codeRuleCtrl", function($scope, $rootScope, $http, $state, $uibModal,
		codeRuleService, APP_CONFIG) {
	
	$scope.searchCondition = {};
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
    // 获取列表数据
    $scope.loadData = function() {
    	 codeRuleService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $rootScope.orgInfo.orgId).then(function(data){
             $scope.pageInfo = data;
         },function(data){
             console.log(data);
         });
    }
    
    $scope.loadData();

    // 新增
    $scope.showAdd = function() {
        $state.go("app.basic.codeRule.add");
    }
    
    // 查看页面
    $scope.showView = function(id) {
        $state.go("app.basic.codeRule.view", {id : id});
    }
    
    // 编辑页面
    $scope.showEdit = function(id) {
        $state.go("app.basic.codeRule.edit", {id : id});
    }
    
    // 删除一条记录
    $scope.remove = function(id) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        codeRuleService.remove(id).then(function(data) {
        	alert("删除成功！");
        	$scope.loadData();
        },function(data){
            console.log(data);
        });
    }
    
    
    // 翻页
 	$scope.goPage = function(pageNum) {
 		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
      		$scope.pageInfo.pageNum = pageNum;
      		$scope.loadData();
      	}
 	}
     
});