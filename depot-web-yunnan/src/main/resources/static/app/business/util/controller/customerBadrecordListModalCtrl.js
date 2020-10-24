angular.module('app.business').controller("customerBadrecordListModalCtrl", 
	function($scope, $uibModalInstance, $filter, $http, $uibModal, customerBadrecordService, APP_CONFIG, items) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	
    // 获取列表数据
    $scope.loadData = function(pageNum, customerId) {
        $http({
            method: 'GET',
            url: APP_CONFIG.customerUrl + '/depot/business/customerBadrecord/getList',
            params: {
                pageNum : pageNum,
                pageSize : 10,
                customerId : $scope.customerId,
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
        	$scope.pageInfo = response.data;
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
    }
    
    // id不为空，回显.
    if (items.customerId != null && items.customerId != undefined && items.customerId != '') {
    	$scope.customerId = items.customerId;
    	if (items.isInBlacklist != null && items.isInBlacklist != undefined && items.isInBlacklist == 1) {
    		$scope.putInBlackListButton = true;
    	}
    	$scope.customerId = items.customerId;
    	$scope.loadData(1);
    }
    
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData(pageNum);
     	}
	}
    
	// 关闭模态窗口
	$scope.putInBlackList = function() {
		$http({
            method: 'GET',
            url: APP_CONFIG.customerUrl + '/depot/business/customer/putInBlackList',
            params: {
            	id : $scope.customerId
            }
        }).then(function successCallback(response) {
        	alert("加入黑名单成功！");
        	$scope.putInBlackListButton = true;
        	$scope.loadData(1, items.customerId);
        }, function errorCallback(response) {
            // 请求失败执行代码
        });
	}
    
	// 关闭模态窗口
	$scope.cancel = function() {
		$uibModalInstance.close();
	}
	
	// 点击新增或者修改时弹出模态窗
	$scope.view = function(id) {
		 var params = [];
		 params.id = id;
		 params.isNotEdit = true;
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
			 // 关闭模态框时刷新页面数据
	     }, function (reason) {    
	         console.log(reason);
	     });
	 }
	 

});