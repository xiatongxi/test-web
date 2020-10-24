"use strict";

angular.module('app.task').controller("actHisTaskCtrl", function($scope,$stateParams, $http, actHisTaskService, APP_CONFIG) {
	 // 获取列表数据
	 $scope.loadData = function(procInsId) {
		 actHisTaskService.loadDataById(procInsId).then(function(data){
			     $scope.histoicFlowList = data;
			     console.log(data)
			 },function(data){
				 console.log(data)
			 });
	 }
	 
	 
	 
	 $scope.loadData($stateParams.procInsId);
	 
	 // 办理任务
	 $scope.handleTask = function(taskId,taskName,taskDefKey,procInsId,procDefId,status) {
		 $http({
		     method: 'GET',
		     url: APP_CONFIG.businessUrl + '/act/task/form',
		     params: {
		    	 taskId : taskId,
		    	 taskName : taskName,
		    	 taskDefKey : taskDefKey,
		    	 procInsId : procInsId,
		    	 procDefId : procDefId,
		    	 status : status
		     }
		 }).then(function successCallback(response) {
			// 请求成功执行代码
			 var url=response.data.url;
			 var taskId=response.data.taskId;
			 var taskName=response.data.taskName;
			 var taskDefKey=response.data.taskDefKey;
			 var procInsId=response.data.procInsId;
			 var procDefId=response.data.procDefId;
			 var status=response.data.status;
			 var id=response.data.id;
			 alert(url+"?act.taskId="+taskId+"&act.taskName="+taskName+"&act.taskDefKey="+taskDefKey+"&act.procInsId="+procInsId+"&act.procDefId="+procDefId+"&act.status="+status+"&id="+id);
		     // 请求成功执行代码
			 /*$scope.act = response.data;*/
			 alert(APP_CONFIG.businessUrl + url);
			 location.href=APP_CONFIG.businessUrl + url;
			 
		 }, function errorCallback(response) {
		     // 请求失败执行代码
			 //console.log(response);
		 });
		 // 显示弹出层
		 /*$("#myModalAct").modal("show");*/
	 }
	 
	 // 提交表单
	 $scope.saveAct= function() {
		 $http({
		     method: 'POST',
		     /*url: APP_CONFIG.baseUrl + '/user/save',*/
		     url: APP_CONFIG.businessUrl + '/act/model/create',
		     data: {
		    	 name : $scope.act.name,
		    	 key : $scope.act.key,
		    	 description : $scope.act.description,
		    	 category : $scope.act.category
		    	 
		     }
		 }).then(function successCallback(response) {
		     // 请求成功执行代码
			 alert("保存成功111！");
			 $scope.user = {};
			 // 重新加载数据
		 }, function errorCallback(response) {
		     // 请求失败执行代码
			 console.log(response);
		 });
		 // 关闭弹出层
		 $("#myModalAct").modal("hide");
	 }
	 
	 
	// 删除一条记录
	 $scope.deleteActProcess = function(id) {
		 if (!confirm("确定要删除吗？")) {
			 return;
		 }
		 $http({
		     method: 'POST',
		     url: APP_CONFIG.businessUrl + '/act/process/delete',
		     data: {
		    	 deploymentId : id
		     }
		 }).then(function successCallback(response) {
		     // 请求成功执行代码
			 alert("删除成功！");
			 // 重新加载数据
			 $scope.loadData();
		 }, function errorCallback(response) {
		     // 请求失败执行代码
			 console.log(response);
		 });
		 // 关闭弹出层
		 $("#myModalAct").modal("hide");
	 }
	 
	 // 省份枚举数据
	 $scope.provinces = [
		 {
			 "key" : "01",
			 "value" : "北京"
		 },
		 {
			 "key" : "02",
			 "value" : "河北省"
		 }
	 ];
		
	 
});