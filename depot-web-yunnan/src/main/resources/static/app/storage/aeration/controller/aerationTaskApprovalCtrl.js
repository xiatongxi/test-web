"use strict";

angular.module('app.storage')
.controller("approvalCtrl", function($scope, $rootScope, $state, $http, $stateParams, aerationTaskService,
		selectService, approvalService, APP_CONFIG) {

	// 通风申请执行状态
    $scope.approvalStatuses = [
         {
             "key" : 2,
             "value" : "待审批"
         },
         {
             "key" : 3,
             "value" : "审批中"
         },
         {
             "key" : 4,
             "value" : "审批通过"
         },
         {
             "key" : 0,
             "value" : "审批驳回"
         },
         {
             "key" : 5,
             "value" : "作业结束"
         }
     ];

	var houseId = null;

	//通风审批列表数据查询
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.loadData = function() {
    	houseId = $rootScope.currentStore;
    	//查询当前登录人能审批的通风数据
    	selectService.getPageInfo(null, null, "todo", null, null, "storageAeration", $rootScope.userInfo.userId, "desc").then(function(data){
    		var jsonStr = [];
    		var jsonApproval = {};
    		if (data.list.length > 0) {
    			var ids = new Array();
    			for (var i = 0; i < data.list.length; i++) {
    				jsonApproval.id = data.list[i].projectId;
    				jsonStr.push(jsonApproval);
    				jsonApproval = {};
    			}
    		}
    		aerationTaskService.getPageInfoApproval($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, jsonStr, $rootScope.userInfo.userId).then(function(datas){
        		$scope.pageInfo = datas;
            },function(datas){
                console.log(datas);
            });
        },function(data){
            console.log(data);
        });
    	
    }
    
    $scope.loadData();

    // 翻页
 	$scope.goPage = function(pageNum) {
 		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
      		$scope.pageInfo.pageNum = pageNum;
      		$scope.loadData();
      	}
 	}

 	// 接收广播，切换仓房
	$scope.$on("storeChangeed", function(event, storehouseId) {
		houseId = storehouseId;
        $scope.loadData();
    	//$scope.loadWare();
    })

    //审批或查看跳转到编辑页面
    $scope.edit = function(id,butId,pageType,taskId,auditId) {
    	//id:数据ID；buttonId:按钮类型，如查看是要只读的；pageType:页面标识，0是申请，1是审批
    	$state.go('app.storage.taskDispatch.aerationTaskApplyEdit',{id:id,butId:butId,pageType:pageType,taskId:taskId,auditId:auditId});
    }
    
    //提交审批
    $scope.submit = function(id) {
    	aerationTaskService.submit(id).then(function(data){
    		$scope.loadData();
    		if (data.status == 'success') {
    			alert("保存成功！");
    		} else {
                alert("保存失败！");
            }
        },function(data){
        	console.log(data);
        });
    }
});