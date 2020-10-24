"use strict";

angular.module('app.task').controller("actTaskCtrl", function($scope, $http, actTaskService, APP_CONFIG) {

	 // 获取列表数据
	 $scope.loadData = function() {
		 actTaskService.getPageInfo(1, 10).then(function(data){
	         $scope.pageInfo = data;
	     },function(data){
	         console.log(data);
	     });
	 }
	 $scope.loadData();
	 
	 
	 
	// 历史审批意见
	  $scope.hitList = function(procInsId) {
	      location.href=APP_CONFIG.businessUrl + '/#/task/hislist/'+procInsId;
	  }
	 
	 
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
	 
	// 分页相关方法.
	    $scope.go_page = function(type, pageNum, pigeSize, pages) {
	        var pageNumC = pageNum;
	        if (type == 'previousPage') {
	            if (pageNum <= 1) {
	                return;
	            }
	            pageNumC = pageNum - 1
	        } else if (type == 'nextPage') {
	            if (pageNum >= pages) {
	                return;
	            }
	            pageNumC = pageNum + 1
	        } else if (type == 'firstPage') {
	            if (pageNum == 1) {
	                return;
	            }
	            pageNumC = 1;
	        } else if (type == 'lastPage') {
	            if (pageNum == pages) {
	                return;
	            }
	            pageNumC = pages;
	        }
	         $scope.loadData = function() {
	        	 actTaskService.getPageInfo(pageNumC, pigeSize).then(function(data){
	                 $scope.pageInfo = data;
	             },function(data){
	                 //console.log(data);
	             });
	         }
	         $scope.loadData();
	    }
	     
	    // 改变页码.
	    $scope.change_pageSize = function(pigeSizeChange) {
	        $scope.loadData = function() {
	        	actTaskService.getPageInfo(1, pigeSizeChange).then(function(data){
	                $scope.pageInfo = data;
	            },function(data){
	                //console.log(data);
	            });
	        }
	        $scope.loadData();
	    }
		
	 
});