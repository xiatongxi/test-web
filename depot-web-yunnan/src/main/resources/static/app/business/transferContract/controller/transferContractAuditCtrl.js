angular.module('app.business').controller("transferContractAuditCtrl", function($scope, $http, $state, $stateParams,
		transferContractAuditService, APP_CONFIG) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	
     // 获取列表数据
     $scope.loadData = function() {
         $scope.auditType = $stateParams.auditType;
         if ($scope.auditType == "change") {
        	 transferContractAuditService.getContractChangePageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
                 $scope.pageInfo = data;
             },function(data){
                 console.log(data);
             });
        } else {
        	transferContractAuditService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
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
        	$state.go("app.business.transferContract-change-audit-save", {id : id, processInstanceId : processInstanceId, taskId : taskId, auditId : auditId});
        } else {
        	$state.go("app.business.transferContract-audit-save", {id : id, processInstanceId : processInstanceId, taskId : taskId, auditId : auditId});
        }
    }
    
    // 查看审批页面.
    $scope.viewAuditPage = function(id, processInstanceId, taskId, auditId) {
        if ($scope.auditType == "change") {
        	$state.go("app.business.transferContract-change-audit-view", {id : id, processInstanceId : processInstanceId, taskId : taskId, auditId : auditId});
        } else {
        	$state.go("app.business.transferContract-audit-view", {id : id, processInstanceId : processInstanceId, taskId : taskId, auditId : auditId});
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