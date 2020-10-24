angular.module('app.basic')
	.controller("processListCtrl", function($scope, $rootScope, $http, $uibModal, $location, $state, processService, StorehouseService, enumService, APP_CONFIG) {

     // 获取货位列表数据
	 $scope.pageInfo = {pageNum : 1, pageSize : 10};
     $scope.loadData = function() {
    	 processService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $rootScope.orgInfo.orgId).then(function(data){
             $scope.pageInfo = data;
         },function(data){
             console.log(data);
         });
     }
     $scope.loadData();

     // 新增、修改或查看跳转到录入页面
     $scope.edit = function(id, btnType) {
    	 $state.go('app.basic.processEdit',{id:id, btnType:btnType});//btnType=0是新增,1是修改,3是查看
     }

    // 删除一条记录
    $scope.remove = function(id) {
         if (!confirm("确定要删除吗？")) {
             return;
         }
         processService.remove(id, $rootScope.orgInfo.orgId).then(function(data){
        	 if (data.status == 'success') {
        		 alert("删除成功！");
                 // 重新加载数据
                 $scope.loadData();
             } else {
                 alert("删除失败！");
             }
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