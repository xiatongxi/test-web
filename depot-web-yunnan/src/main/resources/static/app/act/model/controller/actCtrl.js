"use strict";

angular.module('app.act').controller("actCtrl", function($scope, $http, actService, APP_CONFIG) {

	 // 获取列表数据
	 $scope.loadData = function() {
		 actService.getPageInfo(1, 10).then(function(data){
	         $scope.pageInfo = data;
	     },function(data){
	         console.log(data);
	     });
	 }
	 $scope.loadData();
	 
	 // 新增或者修改用户信息
	 $scope.editAct = function(id) {
		 if (id != null) {
			 $http({
				 method: 'GET',
				 url: APP_CONFIG.businessUrl + '/act/model/edit',
				 params: {
					 id : id
				 }
			 }).then(function successCallback(response) {
				 // 请求成功执行代码
				 $scope.act = response.data;
			 }, function errorCallback(response) {
				 // 请求失败执行代码
				 console.log(response);
			 });
		 }
		 // 显示弹出层
		 $("#myModalAct").modal("show");
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
			 alert("保存成功！");
			 /*$scope.user = {};*/
			 /*window.location.href="/app/act/model/views/process-editor/modeler.html?modelId="+response.data;*/
			 window.location.href="/act/modeler.html?modelId="+response.data;
			 // 重新加载数据
		 }, function errorCallback(response) {
		     // 请求失败执行代码
			 console.log(response);
		 });
		 // 关闭弹出层
		 $("#myModalAct").modal("hide");
	 }
	 
	 // 删除一条记录
	 $scope.deleteAct = function(id) {
		 if (!confirm("确定要删除吗？")) {
			 return;
		 }
		 
		 $http({
		     method: 'POST',
		     url: APP_CONFIG.businessUrl + '/act/model/delete',
		     data: {
		    	 id : id
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
	 
	// 部署一条记录
	 $scope.deployAct = function(id) {
		 if (!confirm("确定要部署吗？")) {
			 return;
		 }
		 
		 $http({
		     method: 'POST',
		     url: APP_CONFIG.businessUrl + '/act/model/deploy',
		     data: {
		    	 id : id
		     }
		 }).then(function successCallback(response) {
		     // 请求成功执行代码
			 alert("部署成功！");
			 // 重新加载数据
			 $scope.loadData();
		 }, function errorCallback(response) {
		     // 请求失败执行代码
			 console.log(response);
		 });
		 // 关闭弹出层
		 $("#myModalAct").modal("hide");
	 }
	 
	// 导出记录
	 $scope.exportAct = function(id) {
		 $http({
		     method: 'POST',
		     url: APP_CONFIG.businessUrl + '/act/model/export',
		     data: {
		    	 id : id
		     }
		 }).then(function successCallback(response) {
			 // 打印
			 $scope.loadData();
		 }, function errorCallback(response) {
		     // 请求失败执行代码
			 console.log(response);
		 });
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
	        	 actService.getPageInfo(pageNumC, pigeSize).then(function(data){
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
	        	actService.getPageInfo(1, pigeSizeChange).then(function(data){
	                $scope.pageInfo = data;
	            },function(data){
	                //console.log(data);
	            });
	        }
	        $scope.loadData();
	    }
	 
		
	 
});