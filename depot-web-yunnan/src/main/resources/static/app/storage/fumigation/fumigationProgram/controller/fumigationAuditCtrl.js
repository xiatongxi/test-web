"use strict";

angular.module('app.storage').controller("fumigationAuditCtrl", 
		function($scope, $stateParams, $state, $http, $rootScope, 
				fumigationAuditService, selectService, APP_CONFIG) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};

	// 获取列表数据
	$scope.loadData = function() {
        //查询当前登录人能审批的通风数据
    	selectService.getPageInfo(null, null, "todo", null, null, "fumigationProgram", $rootScope.userInfo.userId, "desc").then(function(data){
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
    		fumigationAuditService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, jsonStr, $rootScope.userInfo.userId, $scope.searchCondition).then(function(datas){
        		$scope.pageInfo = datas;
            },function(datas){
                console.log(datas);
            });
        },function(data){
            console.log(data);
        });
    }
     
    // 获取基础数据
// 	$scope.getBasicData = function() {
// 		//按照单位获取单位下的仓房信息
// 		$scope.storehouseList = $rootScope.storelist;
//		$scope.storehouseObj = $rootScope.storehouseObj;
// 	}
 	
    $scope.searchCondition = {};
    //$scope.getBasicData();
    $scope.loadData();
    
    $scope.isNotEdit = true;
    
    // 清空查询条件.
    $scope.clearConditions = function() {
    	$scope.searchCondition = {};
    	$scope.loadData();
    }
     
     // 审批按钮.
     $scope.auditPage = function(fumigation) {
         $state.go("app.storage.fumigation-audit-save", {id : fumigation.id, 
        	 processInstanceId : fumigation.processInstanceId, taskId : fumigation.taskId, auditId : fumigation.auditId});
     }
     
     // 查看审批页面.
     $scope.viewAuditPage = function(fumigation) {
         $state.go("app.storage.fumigation-audit-view", {id : fumigation.id, 
        	 taskId : fumigation.taskId, auditId : fumigation.auditId});
     }
     
     // 接收广播，切换仓房
     $scope.$on("storeChangeed", function(event, storehouseId) {
         $scope.searchCondition.houseId = storehouseId;
         $scope.loadData();
     })
     
     // 选择代办人.
     $scope.SelectAgent = function(id,processInstanceId) {
         $scope.id = id;
         $scope.processInstanceId = processInstanceId;
         $http({
             method: 'GET',
             url: APP_CONFIG.baseUrl + '/userInfo/getUser',
             params: {
                pageNum : 1,
                pageSize : 10
             }
         }).then(function successCallback(response) {
             // 请求成功执行代码
             $scope.userList = response.data.list;
             console.log($scope.userList);
         }, function errorCallback(response) {
             // 请求失败执行代码
             console.log(response);
         });
         // 显示弹出层
         $("#myUserList").modal("show");
     }
     
     // 提交代办人.
     $scope.SubmintAgent = function(assignee) {
         $http({
             method: 'GET',
             url: APP_CONFIG.baseUrl + '/act/task/submintAgent',
             params: {
            	 userId : assignee,
            	 processInstanceId : $scope.processInstanceId
             }
         }).then(function successCallback(response) {
        	 console.log(response);
        	 alert("提交成功！");
                 // 请求成功执行代码
                 // 重新加载数据
                 $scope.loadData();
                 
             // 请求成功执行代码
             /*$scope.userList = response.data.list;*/
         }, function errorCallback(response) {
             // 请求失败执行代码
             console.log(response);
         });
         // 显示弹出层
         $("#myUserList").modal("hide");
     }
     
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData();
     	}
	}
     
});