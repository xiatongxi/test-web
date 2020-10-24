"use strict";

angular.module('app.process').controller("actProcessCtrl", function($scope, $http,FileUploader, actProcessService,$rootScope, APP_CONFIG) {

	 // 获取列表数据
	 $scope.loadData = function() {
		 actProcessService.getPageInfo(1, 10).then(function(data){
	         $scope.pageInfo = data;
	     },function(data){
	         console.log(data);
	     });
	 }
	 $scope.loadData();
	 
	// 历史审批意见
	  $scope.seeActProcess = function(procInsId,diagramResourceName) {
	      location.href=APP_CONFIG.businessUrl + '/#/process/seeProcess/'+procInsId;
	  }
	 
	// 提交表单
		 $scope.seeXml= function(procDefId,procInsId) {
			 $http({
			     method: 'POST',
			     url: APP_CONFIG.businessUrl + '/act/process/resource/read',
			     data: {
			    	 procDefId : procDefId,
			    	 procInsId : procInsId
			     }
			 }).then(function successCallback(response) {
				 console.log(response);
			 }, function errorCallback(response) {
				 console.log(response);
			     // 请求失败执行代码
			 });
			 // 关闭弹出层
			 $("#myModalAct").modal("hide");
		 }
	 
	 
	 // 新增或者修改用户信息
	 $scope.editAct = function(id) {
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
	 
	 // 分页相关方法.
	    $scope.go_pages = function(type, pageNum, pigeSize, pages) {
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
	        	 actProcessService.getPageInfo(pageNumC, pigeSize).then(function(data){
	                 $scope.pageInfo = data;
	             },function(data){
	                 console.log(data);
	             });
	         }
	         $scope.loadData();
	    }
	     
	    // 改变页码.
	    $scope.change_pageSize = function(pigeSizeChange) {
	        $scope.loadData = function() {
	        	actProcessService.getPageInfo(1, pigeSizeChange).then(function(data){
	                $scope.pageInfo = data;
	            },function(data){
	                console.log(data);
	            });
	        }
	        $scope.loadData();
	    }
	    
	    $scope.editAct = function() {
			 // 显示弹出层
	    	 document.getElementById("fileType").value="";
			 $("#myModalAct").modal("show");
		 }	
	    
	    // 提交表单
		 $scope.convertToModel= function(procDefId) {
			 $http({
			     method: 'POST',
			     url: APP_CONFIG.businessUrl + '/act/template/convert/toModel',
			     data: {
			    	 procDefId : procDefId
			     }
			 }).then(function successCallback(response) {
			     // 请求成功执行代码
				 alert("转换成功！");
				 // 重新加载数据
			 }, function errorCallback(response) {
			     // 请求失败执行代码
				 console.log(response);
			 });
		 }
	    
	
	 // 文件上传实例
		$scope.uploader = new FileUploader({
			url : APP_CONFIG.businessUrl + '/act/template/actDeploy',
			autoUpload : true, // 将文件添加到队列后自动上传
			formData : [{orgId:$rootScope.userInfo.orgId}], // 与文件一起发送的数据
			removeAfterUpload : true, // 从队列上传后删除文件
			// 上传进度
			onProgressItem : function(fileItem, progress) {
				console.info("正在上传：" + progress + "%"+fileItem+"*******");
			},
			// 回调函数，在一个文件上传成功后触发
			onSuccessItem : function(fileItem, response, status, headers) {
				alert(response);
				var nextDiv = document.activeElement.parentNode.nextSibling;
				$scope.orgInfo[nextDiv.name] = response;
				$("#myModalAct").modal("hide");
				$scope.loadData();
			}
		});
		 
});