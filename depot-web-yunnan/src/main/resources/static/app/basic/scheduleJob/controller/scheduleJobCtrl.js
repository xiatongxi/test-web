angular.module('app.basic').controller("scheduleJobCtrl", function($rootScope, $scope, $http, $state, $uibModal,
		scheduleJobService, APP_CONFIG) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
    // 获取列表数据
    $scope.loadData = function() {
    	 scheduleJobService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $rootScope.orgInfo.orgId).then(function(data){
             $scope.pageInfo = data;
         },function(data){
             console.log(data);
         });
    }
    
    $scope.loadData();
     
    // 新增
    $scope.showAdd = function() {
        $state.go("app.basic.scheduleJob.add");
    }
    
    // 查看页面
    $scope.showView = function(id) {
        $state.go("app.basic.scheduleJob.view", {id : id});
    }
    
    // 编辑页面
    $scope.showEdit = function(id) {
        $state.go("app.basic.scheduleJob.edit", {id : id});
    }
    
    // 删除一条记录
    $scope.remove = function(id) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        scheduleJobService.remove(id).then(function(data) {
        	alert("删除成功！");
        	$scope.loadData();
        },function(data){
            console.log(data);
        });
    }
    
    // 暂停.
    $scope.pause = function(id) {
        scheduleJobService.pause(id).then(function(data) {
            alert("暂停成功！");
            $scope.loadData();
        },function(data){
            console.log(data);
        });
    }
    
    // 启动.
    $scope.resume = function(id) {
        scheduleJobService.resume(id).then(function(data) {
            alert("启动成功！");
            $scope.loadData();
        },function(data){
            console.log(data);
        });
    }
    
    // 立即执行.
    $scope.run = function(id) {
        scheduleJobService.run(id).then(function(data) {
            alert("执行成功！");
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