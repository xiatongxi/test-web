angular.module('app.intelligent').controller("choiceUserCtrl", 
    function($scope,$rootScope, $http, $state,userService,roleService, $uibModalInstance, APP_CONFIG, items) {
	
	
	$scope.returnResult = {};
	
	/*$scope.loadUserInfo = function(roleId) {
    	userService.getPageInfo(null, null, null, null, roleId, null).then(function(data){
        	if (data.isEnd) {
        		// 最后的审批节点.
        		// 关闭模态窗.
        		$scope.returnResult.returnType = "isEnd"
        		$uibModalInstance.close($scope.returnResult);
        	} else {
        		// 不是最后的审批节点.
        		// 显示审批人
        		$scope.userList = data.list;
        		$scope.returnResult.list = data.list;
        	}
        },function(data){
            console.log(data);
        });
    }*/
	
	$scope.loadData = function() {
		
		$http({
            method: 'GET',
            url: APP_CONFIG.systemUrl + '/userInfo/getAuditUser',
            params: {
                roleName : items.roleName,
                orgId : $rootScope.orgInfo.orgId
            }
        }).then(function(data){
        	/*if(items.roleName=='仓储部经理'){
        		$scope.userList = data.data;
        		$scope.returnResult.list = data.data;
        		
        	}
        	if(items.roleName=='库领导'){
        		$scope.userList = data.data;
        		$scope.returnResult.returnType = "isEnd"
            	$uibModalInstance.close($scope.returnResult);
        	}*/
        	$scope.userList = data.data;
    		$scope.returnResult.list = data.data;
        	
            
        }, function(data) {
            // 请求失败执行代码
            console.log(data);
        });
		
		/*roleService.getPageInfo(items.roleName).then(function(data){
			$scope.roleId = data.list[0].roleId;
			debugger;
			$scope.loadUserInfo($scope.roleId);
		},function(data){
            console.log(data);
		});*/
		
    }

    $scope.loadData();
    
    

    // 关闭模态窗口
    $scope.cancel = function() {
  	$scope.returnResult.returnType = "cancel";
      // close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
      $uibModalInstance.close($scope.returnResult);
    }
  
    // 选择审批人后提交.
    $scope.choiceUser = function(assignee) {
    	
	  	if (assignee == null || assignee == undefined || assignee == '') {
	  		alert("请选择审批人！");
	  		return;
	  	}
	  	$scope.returnResult.returnType = "submit";
	  	$scope.returnResult.assignee = assignee;
	  	// 关闭模态窗.
	  	$uibModalInstance.close($scope.returnResult);
    }
    
  
});