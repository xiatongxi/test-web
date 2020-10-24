angular.module('app.business').controller("customerBadrecordCtrl", function($scope, $http, $filter, $uibModal, customerBadrecordService, customerService, APP_CONFIG) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
    // 获取列表数据
    $scope.loadData = function() {
        customerBadrecordService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
        },function(data) {
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
    
    // 选择客户.
    $scope.getCustomer = function() {
		 var params = [];
		 var uibModalInstance = $uibModal.open({
			 size:'lg',  
             templateUrl: 'app/business/util/views/customer-list-modal.html',
             controller: 'customerListModalCtrl',
             resolve: {
          	    // items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params; 
              }
          }  
         }); 
		 uibModalInstance.result.then(function (result) {
			 if (result != null) {
		        $scope.addBadRecord(result.id, result.name);
			 }
			 // 关闭模态框时刷新页面数据
	     }, function (reason) {    
	         console.log(reason);
	     });
	}
     
	 // 点击新增或者修改时弹出模态窗
	 $scope.addBadRecord = function(customerId, name) {
		 var params = [];
		 params.customerId = customerId;
		 params.name = name;
		 var uibModalInstance = $uibModal.open({    
            size:'md',  
            templateUrl: 'app/business/util/views/customerBadrecordModal.html',
            controller: 'customerBadrecordModalCtrl',
            resolve: {
            	// items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params; 
                }
            }  
        }); 
		 uibModalInstance.result.then(function (result) {    
			 $scope.loadData();	// 关闭模态框时刷新页面数据
	     }, function (reason) {    
	         console.log(reason);
	     });
	 }  
    
    // 编辑
    $scope.edit = function(id) {
		 var params = [];
		 params.id = id;
		 params.name = name;
		 var uibModalInstance = $uibModal.open({    
            size:'md',  
            templateUrl: 'app/business/util/views/customerBadrecordModal.html',
            controller: 'customerBadrecordModalCtrl',
            resolve: {
            	// items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params; 
                }
            }  
        }); 
		 uibModalInstance.result.then(function (result) {    
			 $scope.loadData();	// 关闭模态框时刷新页面数据
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
            url: APP_CONFIG.customerUrl + '/depot/business/customerBadrecord/remove',
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
    }
    
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData();
     	}
	}
    
});