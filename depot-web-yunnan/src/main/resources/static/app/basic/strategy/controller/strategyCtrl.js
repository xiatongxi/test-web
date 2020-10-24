angular.module('app.basic')
	.controller("strategyCtrl", function($scope, $rootScope, strategyService, permissions, $uibModal, APP_CONFIG) {

    // 获取列表数据
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.loadData = function() {
    	strategyService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize).then(function(data){
            $scope.pageInfo = data;
            console.log(data);
        },function(data){
            console.log(data);
        });
    }
    
    $scope.loadData();
    
    
    // 新增或者修改跳转到录入页面
    $scope.edit = function(id, butType) {

        var uibModalInstance = $uibModal.open({
            size:'md',
            templateUrl: 'app/basic/strategy/views/strategy-edit.html',
            controller: 'strategyCtrlEdit',
            resolve: {
           	   id : id,
           	   butType : function(){return butType;}
            }
        });
		 uibModalInstance.result.then(function (result) {
		 	$scope.loadData();	// 关闭模态框时刷新页面数据
	     }, function (reason) {
	         console.log(reason);
	     });
    }

    // 删除一条记录
    $scope.remove = function(id) {
        if (!confirm("确定要删除吗？")) {
            return;
        }

        strategyService.remove(id).then(function(data){
        	if (data.status == 'success') {
                // 重新加载数据
        		$scope.loadData();
            } else {
                alert("删除失败！");
            }
        },function(data){
            console.log(data);
        });
    }

    

})
.controller("strategyCtrlEdit", function($scope, strategyService, id, butType, $uibModalInstance, APP_CONFIG) {

	$scope.edit = function() {
    	strategyService.edit(id).then(function(data){
            $scope.strategy = data;
            if (butType == 2) {
            	$scope.isNotEdit = true;
            }
        },function(data){
            console.log(data);
        });
    }
	
	$scope.edit();

    //提交
    $scope.save = function() {
    	var validator = $("#strategy-form").validate();
    	if (validator.form()) {
	    	strategyService.save($scope.strategy).then(function(data){
	    		if (data.status == 'success') {
	    			alert(data.msg);
	    		} else {
	                alert("保存失败！");
	            }
	    		$scope.cancel();
	        },function(data){
	            console.log(data);
	        });
    	}
    }

    // 关闭模态窗口
	$scope.cancel = function() {
		$uibModalInstance.close();
	}

});
