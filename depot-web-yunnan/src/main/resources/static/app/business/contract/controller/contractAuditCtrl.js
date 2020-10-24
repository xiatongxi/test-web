angular.module('app.business').controller("contractAuditCtrl", function($scope, $http, $state, $stateParams,
		contractAuditService, APP_CONFIG) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	
	//经营业务下的计划管理
	$scope.menu = $stateParams.menu;
	
     // 获取列表数据
     $scope.loadData = function() {
         $scope.auditType = $stateParams.auditType;
         if ($scope.auditType == "change") {
             contractAuditService.getContractChangePageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
                 $scope.pageInfo = data;
             },function(data){
                 console.log(data);
             });
        } else {
            contractAuditService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log(data);
            });
        }
    }
     
    $scope.searchCondition = {};
    $scope.loadData();
    
    //清空
    $scope.clearConditions = function() {
    	$scope.searchCondition = {};
    	$scope.loadData();
    }
    
    $scope.isNotEdit = true;
    
    // 审批页面.
    $scope.auditPage = function(id, processInstanceId, taskId, auditId, result) {
        if (result != "待审批") {
           alert("您已经提交该数据，无法再次提交！");
           return;
        }
        if ($scope.auditType == "change") {
        	$state.go("app.business.contract-change-audit-save", {id : id, processInstanceId : processInstanceId, taskId : taskId, auditId : auditId});
        } else if($scope.menu!=null){
        	$state.go("app.business.management.contract-audit-save", {id : id, processInstanceId : processInstanceId, taskId : taskId, 
        															 auditId : auditId,menu:$scope.menu});
        }else {
        	$state.go("app.business.contract-audit-save", {id : id, processInstanceId : processInstanceId, taskId : taskId, auditId : auditId});
        }
    }
    
    // 查看审批页面.
    $scope.viewAuditPage = function(id, processInstanceId, taskId, auditId) {
        if ($scope.auditType == "change") {
        	$state.go("app.business.contract-change-audit-view", {id : id, processInstanceId : processInstanceId, taskId : taskId, auditId : auditId});
        } else if($scope.menu!=null){
        	$state.go("app.business.management.contract-audit-view", {id : id, processInstanceId : processInstanceId, taskId : taskId, 
        															auditId : auditId,menu:$scope.menu});
        }else {
        	$state.go("app.business.contract-audit-view", {id : id, processInstanceId : processInstanceId, taskId : taskId, auditId : auditId});
        }
    }
    
    
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData();
     	}
	}
     
});