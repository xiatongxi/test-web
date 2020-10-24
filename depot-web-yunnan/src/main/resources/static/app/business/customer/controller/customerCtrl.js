angular.module('app.business').controller("customerCtrl", function($scope, $rootScope, $stateParams, $http, $uibModal, $state,
		customerService, APP_CONFIG) {
	$scope.userInfo={};
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	
	//经营管理下的客户管理
	$scope.menu = $stateParams.menu;
    // 获取列表数据
    $scope.loadData = function() {
    	$scope.orgId=$rootScope.userInfo.orgId;
        customerService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition,$scope.orgId).then(function(data){
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
    		$state.go('app.business.management.customer.add', {id : 0,menu:$scope.menu});
    	}else{
    		$state.go('app.business.customer.add', {id : 0});
    	}
        
    }

    // 编辑页面
    $scope.showEdit = function(id) {
    	if($scope.menu!=null){
    		$state.go('app.business.management.customer.edit', {id : id,menu:$scope.menu});
    	}else{
    		$state.go('app.business.customer.edit', {id : id});
    	}
    }
    
    // 查看不良记录列表.
    $scope.showBadrecord = function(customer) {
		 var params = [];
		 params.customerId = customer.id;
		 params.isInBlacklist = customer.isInBlacklist;
		 var uibModalInstance = $uibModal.open({
            size:'lg',  
            templateUrl: 'app/business/util/views/customerBadrecordListModal.html',
            controller: 'customerBadrecordListModalCtrl',
            resolve: {
          	  // items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params; 
                }
             }  
		 }); 
		 uibModalInstance.result.then(function (result) {
			 // 重新加载.
			 $scope.loadData();
	     }, function (reason) {    
	         console.log(reason);
	     });
	 }  
	 
    
    // 删除一条记录
    $scope.delete = function(id) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        
        $http({
            method: 'POST',
            url: APP_CONFIG.customerUrl + '/depot/business/customer/remove',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            alert("删除成功！");
            // 重新加载数据
            $scope.loadData();
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
        // 关闭弹出层
        $("#myModal").modal("hide");
    }
    
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData();
     	}
	}
     
});