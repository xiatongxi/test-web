"use strict";
angular.module('app.business').controller("planAuditPassCtrl",
		function($scope, $http, $state, $stateParams,$uibModal, planService, APP_CONFIG) {
	$scope.searchCondition = {};
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.searchCondition.attributeType = $stateParams.attributeType;
	$scope.attributeType = $stateParams.attributeType;
	
    // 获取列表数据
    $scope.loadData = function() {
        planService.getPassPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
     
     
     $scope.isNotEdit = true;
     
     $scope.loadData();
     
     
     // 清空查询
     $scope.clearConditions = function() {
     	$scope.searchCondition = {};
     	$scope.loadData();
     }
     
    // 查看页面
    $scope.showView = function(id, processInstanceId) {
        
        if($scope.attributeType==1){
            $state.go("app.business.grainReservesPlan-rotation-pass-view",{id : id, processInstanceId : processInstanceId});
    	}else if($scope.attributeType==2){
            $state.go("app.business.grainReservesPlan-sales-pass-view",{id : id, processInstanceId : processInstanceId});
    	}else if($scope.attributeType==3){
            $state.go("app.business.grainReservesPlan-acquisition-pass-view",{id : id, processInstanceId : processInstanceId});
    	}else{
            $state.go("app.business.plan-audit-pass-view", {id:id, processInstanceId : processInstanceId});
    	}
    }
    
    //查看审批
    $scope.viewAuditPage = function(id, processInstanceId, taskId, auditId) {
        // location.href=APP_CONFIG.businessUrl + '/#/business/plan-audit-view/'+id + '/' + processInstanceId +'/' + taskId +'/' + auditId;
    	if($scope.attributeType==1){
            $state.go("app.business.grainReservesPlan-rotation-pass-view",{id : id, processInstanceId : processInstanceId,taskId:taskId,auditId:auditId});
    	}else if($scope.attributeType==2){
            $state.go("app.business.grainReservesPlan-sales-pass-view",{id : id, processInstanceId : processInstanceId,taskId:taskId,auditId:auditId});
    	}else if($scope.attributeType==3){
            $state.go("app.business.grainReservesPlan-acquisition-pass-view",{id : id, processInstanceId : processInstanceId,taskId:taskId,auditId:auditId});
    	}else{
            $state.go("app.business.plan-audit-pass-view", {id:id, processInstanceId : processInstanceId,taskId:taskId,auditId:auditId});
    	}  
    }
    // 启用
    $scope.application = function(id) {
        $http({
            method: 'POST',
            url: APP_CONFIG.businessUrl + '/depot/business/plan/application',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            alert("启用成功！");
            // 重新加载数据
            $scope.loadData();
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
    }
    
    // 暂停
    $scope.discontinue = function(id) {
    	var params = [];
		params.id = id;
		params.type = "discontinue";
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
    
    //终止
    $scope.finish = function(id) {
    	var params = [];
    	params.id = id;
    	params.type = "finish";
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