angular.module('app.business').controller("customerBlackListCtrl", 
		function($scope, $http, $uibModal, customerBlackListService, APP_CONFIG) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
    // 获取列表数据
    $scope.loadData = function() {
        customerBlackListService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
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
        location.href=APP_CONFIG.customerUrl + '/#/business/customer-add/0';
    }

    // 编辑页面
    $scope.showEdit = function(id) {
        location.href=APP_CONFIG.customerUrl + '/#/business/customer-edit/'+id;
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
	     }, function (reason) {    
	         console.log(reason);
	     });
	 }  
    
    // 移出黑名单.
    $scope.removeBlackList = function(id) {
        $http({
            method: 'POST',
            url: APP_CONFIG.customerUrl + '/depot/business/customer/removeBlackList',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            $scope.loadData();
            alert("移出黑名单成功！");
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
    }
    
    // 选择客户.
    $scope.getCustomer = function() {
		 var params = [];
		 params.type = "addBlacklist";
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
				 customerBlackListService.addBlackList(result.id).then(function() {
					 $scope.loadData();
					 alert("添加黑名单成功！");
				 });
			 }
			 // 关闭模态框时刷新页面数据
	     }, function (reason) {    
	         console.log(reason);
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