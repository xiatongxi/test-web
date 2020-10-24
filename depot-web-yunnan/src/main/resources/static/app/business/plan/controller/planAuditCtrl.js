"use strict";
angular.module('app.business').controller("planAuditCtrl", function($scope,$stateParams,$state, $http, planAuditService, APP_CONFIG) {
	
	$scope.searchCondition = {};
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.searchCondition.attributeType = $stateParams.attributeType;
	$scope.attributeType = $stateParams.attributeType;
	
	//经营业务下的计划管理
	$scope.menu = $stateParams.menu;
    // 获取列表数据
    $scope.loadData = function() {
        planAuditService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
     $scope.loadData();
     
     
     $scope.isNotEdit = true;
     
     $scope.clearConditions=function(){
    	 $scope.searchCondition = {}; 
    	 $scope.loadData();
     }
     
     // 审批页面.
     $scope.auditPage = function(id, processInstanceId, taskId, auditId, result) {
         if (result != "待审批") {
            alert("您已经提交该数据，无法再次提交！");
            return;
         }
         //location.href=APP_CONFIG.businessUrl + '/#/business/plan-audit-save/'+id + '/' + processInstanceId +'/' + taskId +'/' + auditId;
         if($scope.attributeType!=null){
        	 if($scope.attributeType==1){
                 $state.go("app.business.grainReservesPlan-rotation-audit-save",{id : id, processInstanceId : processInstanceId,taskId:taskId,auditId:auditId});
         	 }else if($scope.attributeType==2){
                 $state.go("app.business.grainReservesPlan-sales-audit-save",{id : id, processInstanceId : processInstanceId,taskId:taskId,auditId:auditId});
         	 }else if($scope.attributeType==3){
                 $state.go("app.business.grainReservesPlan-acquisition-audit-save",{id : id, processInstanceId : processInstanceId,taskId:taskId,auditId:auditId});
         	 }
         }else if($scope.menu!=null){
             $state.go("app.business.management.plan-audit-save",{id : id, processInstanceId : processInstanceId,taskId:taskId,auditId:auditId});
         }else{
             $state.go("app.business.plan-audit-save", {id:id, processInstanceId : processInstanceId,taskId:taskId,auditId:auditId});
     	 }        
         
         
     }
     
     // 查看审批页面.
     $scope.viewAuditPage = function(id, processInstanceId, taskId, auditId) {
        // location.href=APP_CONFIG.businessUrl + '/#/business/plan-audit-view/'+id + '/' + processInstanceId +'/' + taskId +'/' + auditId;
    	 
         if($scope.attributeType!=null){
        	 if($scope.attributeType==1){
                 $state.go("app.business.grainReservesPlan-rotation-audit-view",{id : id, processInstanceId : processInstanceId,taskId:taskId,auditId:auditId,attributeType:$scope.attributeType});
         	 }else if($scope.attributeType==2){
                 $state.go("app.business.grainReservesPlan-sales-audit-view",{id : id, processInstanceId : processInstanceId,taskId:taskId,auditId:auditId,attributeType:$scope.attributeType});
         	 }else if($scope.attributeType==3){
                 $state.go("app.business.grainReservesPlan-acquisition-audit-view",{id : id, processInstanceId : processInstanceId,taskId:taskId,auditId:auditId,attributeType:$scope.attributeType});
         	 }
         }else if($scope.menu!=null){
             $state.go("app.business.management.plan-audit-view", {id:id, processInstanceId : processInstanceId,taskId:taskId,auditId:auditId,menu:$scope.menu});

         }else{
             $state.go("app.business.plan-audit-view", {id:id, processInstanceId : processInstanceId,taskId:taskId,auditId:auditId,attributeType:$scope.attributeType});
     	 }
         
         
     }
     
     // 选择代办人.
     $scope.SelectAgent = function(id,processInstanceId) {
         $scope.id = id;
         $scope.processInstanceId = processInstanceId;
         $http({
             method: 'GET',
             url: APP_CONFIG.systemUrl + '/userInfo/getUser',
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
             url: APP_CONFIG.businessUrl + '/act/task/submintAgent',
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
     
     
     // 查看代办流程
     $scope.seeProcess = function(id) {
         $http({
             method: 'POST',
             url: APP_CONFIG.businessUrl + '/act/task/todoList',
             data: {
                 id : id
             }
         }).then(function successCallback(response) {
             // 请求成功执行代码
             alert("启动成功！");
             // 重新加载数据
             $scope.loadData();
         }, function errorCallback(response) {
             // 请求失败执行代码
             console.log(response);
         });
         // 关闭弹出层
         $("#myModal").modal("hide");
     }
     
     // 翻页
 	$scope.goPage = function(pageNum) {
 		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
      		$scope.pageInfo.pageNum = pageNum;
      		$scope.loadData();
      	}
 	}
     
});