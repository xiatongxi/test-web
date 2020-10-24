angular.module('app.business').controller("deliveryStorageNoticeAuditPassCtrl", function($scope, $http, $state, 
		$uibModal,deliveryStorageNoticeService,$rootScope, APP_CONFIG) {
	
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.searchCondition = {orgId : $rootScope.userInfo.orgId};
    // 获取列表数据
    $scope.loadData = function() {
        deliveryStorageNoticeService.getPassPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
    
    
    $scope.loadData();
    
    // 清空查询条件.
    $scope.clearConditions = function() {
   	    $scope.searchCondition = {};
   	    $scope.loadData();
    }



    // 查看页面.
    $scope.showView = function(deliveryStorageNotice) {
        if (deliveryStorageNotice.billType == "1") {
            $state.go("app.business.storageNotice-audit-pass-view", {id : deliveryStorageNotice.id, processInstanceId : deliveryStorageNotice.processInstanceId,check:1});
        } else if (deliveryStorageNotice.billType == "3") {
            $state.go("app.business.deliveryNotice-audit-pass-view", {id : deliveryStorageNotice.id, processInstanceId : deliveryStorageNotice.processInstanceId,check:1});
        }
    }
    
    // 启用
    $scope.application = function(id) {
        $http({
            method: 'POST',
            url: APP_CONFIG.businessUrl + '/depot/business/deliveryStorageNotice/application',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
        	if (response.data.status == "error") {
        		alert(response.data.msg);
        	} else {
        		alert("启用成功！");
        		// 重新加载数据
        		$scope.loadData();
        	}
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
    }
    
    // 暂停
    $scope.discontinue = function(id) {
    	var params = [];
		params.id = id;
		params.type = "noticeDiscontinue";
    	var uibModalInstance = $uibModal.open({
            size : 'md',  
            templateUrl: 'app/business/util/views/refuseReason-view.html',
            controller: 'refuseReasonCtrl',
            resolve: {
            	// items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params; 
                }
            }  
        });
    	uibModalInstance.result.then(function (result) {
    		if(result.returnType == "success"){
    			$scope.loadData();
    		}
	    }, function (reason) {    
	        console.log(reason);
	    });
    	
    }
    
    // 终止
    $scope.finish = function(id) {
    	var params = [];
		params.id = id;
		params.type = "noticeFinish";
    	var uibModalInstance = $uibModal.open({
            size : 'md',  
            templateUrl: 'app/business/util/views/refuseReason-view.html',
            controller: 'refuseReasonCtrl',
            resolve: {
            	// items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params; 
                }
            }  
        });
    	uibModalInstance.result.then(function (result) {
    		if(result.returnType == "success"){
    			$scope.loadData();
    		}
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