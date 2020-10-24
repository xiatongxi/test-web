angular.module('app.business').controller("deliveryStorageNoticeAuditCtrl", function($scope, $http, $state, $stateParams, 
		deliveryStorageNoticeAuditService, APP_CONFIG) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	
     // 获取列表数据
     $scope.loadData = function() {
        deliveryStorageNoticeAuditService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
     
    $scope.isNotEdit = true;
    $scope.searchCondition = {};
    $scope.loadData();
    
    //清空
    $scope.clearConditions = function() {
   	    $scope.searchCondition = {};
   	    $scope.loadData();
    }
    
    
    // 审批页面.
    $scope.auditPage = function(deliveryStorageNotice) {
        if (deliveryStorageNotice.result != "待审批") {
           alert("您已经提交该数据，无法再次提交！");
           return;
        }
        if (deliveryStorageNotice.billType == "1") {
        	$state.go("app.business.storageNotice-audit-edit",
        			{id : deliveryStorageNotice.id, processInstanceId : deliveryStorageNotice.processInstanceId,
        			taskId : deliveryStorageNotice.taskId, auditId : deliveryStorageNotice.auditId});
        	
            /*location.href=APP_CONFIG.baseUrl + '/#/business/storageNotice-audit-edit/'+deliveryStorageNotice.id + '/' + deliveryStorageNotice.processInstanceId +'/'
            				+ deliveryStorageNotice.taskId +'/' + deliveryStorageNotice.auditId;*/
        } else if (deliveryStorageNotice.billType == "3") {
        	$state.go("app.business.deliveryNotice-audit-edit",
        			{id : deliveryStorageNotice.id, processInstanceId : deliveryStorageNotice.processInstanceId,
        			taskId : deliveryStorageNotice.taskId, auditId : deliveryStorageNotice.auditId});
        	
            /*location.href=APP_CONFIG.baseUrl + '/#/business/deliveryNotice-audit-edit/'+deliveryStorageNotice.id + '/' + deliveryStorageNotice.processInstanceId +'/'
            				+ deliveryStorageNotice.taskId +'/' + deliveryStorageNotice.auditId;*/
        }
    }
    
    // 查看审批页面.
    $scope.viewAuditPage = function(deliveryStorageNotice) {
        if (deliveryStorageNotice.billType == "1") {
        	$state.go("app.business.storageNotice-audit-view",
        			{id : deliveryStorageNotice.id, processInstanceId : deliveryStorageNotice.processInstanceId,
        			taskId : deliveryStorageNotice.taskId, auditId : deliveryStorageNotice.auditId});
        	
            /*location.href=APP_CONFIG.baseUrl + '/#/business/storageNotice-audit-view/'+deliveryStorageNotice.id + '/' + deliveryStorageNotice.processInstanceId+'/'
            				+ deliveryStorageNotice.taskId +'/' + deliveryStorageNotice.auditId;*/
        } else if (deliveryStorageNotice.billType == "3") {
        	$state.go("app.business.deliveryNotice-audit-view",
        			{id : deliveryStorageNotice.id, processInstanceId : deliveryStorageNotice.processInstanceId,
        			taskId : deliveryStorageNotice.taskId, auditId : deliveryStorageNotice.auditId});
        	
            /*location.href=APP_CONFIG.baseUrl + '/#/business/deliveryNotice-audit-view/'+deliveryStorageNotice.id + '/' + deliveryStorageNotice.processInstanceId +'/'
            			+ deliveryStorageNotice.taskId +'/' + deliveryStorageNotice.auditId;*/
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