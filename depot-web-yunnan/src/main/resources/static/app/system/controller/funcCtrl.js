"use strict";

angular.module('app.system').controller("funcCtrl", 
		function($scope, $uibModal, funcService, permissions, APP_CONFIG) {

	// 获取列表数据
	$scope.search = {funcName:""};
	$scope.loadData = function() {
		// 加载数据
		funcService.getPageInfo($scope.search.funcName).then(function(data){
		   	$scope.funclist = data.list;
		   	// 构建功能等级
		   	$scope.fillLevel(0, 0);
	        // 构建树表格
		   	$scope.drawTable();
	    },function(data){
	        console.log(data);
	    });
	}
	$scope.loadData();

	// 通过递归给功能赋等级
	$scope.fillLevel = function(parentId, level) {
		angular.forEach($scope.funclist, function(item, index) {
			if (item.parentId == parentId) {
				item.level = level;
				$scope.fillLevel(item.funcId, level+1);
			}
		})
	}

	$scope.search = function() {
		$("#tb").bootstrapTable('destroy');
		$scope.loadData();
	}
	
	// 删除一条记录
	$scope.delete = function(funcId) {
		if (!confirm("确定要删除吗？(注：将同时删除所有子功能，请慎重操作！)")) {
			return;
		}
		funcService.deleteFunc(funcId).then(function(data){
			// 重新加载数据
			$scope.loadData($scope.parentId);
	    },function(data){
	        console.log(data);
	    });
	}
	
	// 点击新增或者修改时弹出模态窗
	$scope.edit = function(funcId, parentId) {
		var modalInstance = $uibModal.open({    
             size:'md',  
             templateUrl: 'app/system/views/func-edit.html',
             controller: 'funcEditCtrl',
             resolve: {    
            	funcId : funcId,
            	parentId : parentId
             }  
         }); 
		modalInstance.result.then(function (result) {    
			$scope.loadData();	// 关闭模态框时刷新页面数据
	    }, function (reason) {    
	        console.log(reason);
	    });
	}  

		
	// 弹出按钮列表
	$scope.openBtnPage = function(funcId) {
		var modalInstance = $uibModal.open({    
             size:'md',  
             templateUrl: 'app/system/views/button-list.html',
             controller: 'buttonCtrl',
             resolve: {    
            	funcId : funcId
             }  
         }); 
	}
		
	// 生成表格树
	$scope.drawTable = function() {
		$("#tb").bootstrapTable('destroy');
		$('#tb').bootstrapTable({
	       data: $scope.funclist,	//数据源，必须包含parentId属性
	       treeView: true,
	       treeId: "funcId",
	       treeField: "funcName",
	       formatLoadingMessage: function () {  
	           return "";  
	       },  
	       columns: [{  
	           field: 'funcId',  
	       }, {  
	           field: 'funcName',  
	       }, {  
	           field: 'funcUrl',  
	       },{  
	    	   events: operateEvents,
	           formatter: operateFormatter
	       }] 
		})
	}
	
	// 操作列按钮
	function operateFormatter(value, row, index) {  
       var btns = [  
   			'<a href="javascript:void(0)" id="add"><i class="fa fa-edit"></i> 添加子功能</a>&nbsp;'
       ];
       if (permissions.hasPermission(173)) {
    	   btns.push('<a href="javascript:void(0)" id="edit"><i class="fa fa-edit"></i> 修改</a>&nbsp;');
       }
       if (permissions.hasPermission(300)) {
    	   btns.push('<a href="javascript:void(0)" id="delete"><i class="fa fa-trash-o"></i> 删除</a>&nbsp;');
       }
       if (row.parentId != 0 && permissions.hasPermission(418)) {
    	   btns.push(
			'<a href="javascript:void(0)" id="button"><i class="fa fa-cogs"></i> 自定义按钮</a>');
       }
       return btns;
   }
	
	// 为操作列按钮绑定事件
	window.operateEvents = {
		'click #add': function (e, value, row, index) {
			$scope.edit(null, row.funcId);
		},
		'click #edit': function (e, value, row, index) {
			$scope.edit(row.funcId, row.parentId);
		},
		'click #delete': function (e, value, row, index) {
			$scope.delete(row.funcId);
		},
		'click #button': function (e, value, row, index) {
			$scope.openBtnPage(row.funcId);
		}
	};
	
});

angular.module('app.system').controller("funcEditCtrl", 
	function($scope, $uibModalInstance, FileUploader, funcId, parentId, funcService, APP_CONFIG) {

	// 获取功能信息
	funcService.editFunc(funcId).then(function(data) {
		$scope.funcInfo = data;
		$scope.funcInfo.parentId = parentId;
	}, function(data) {
		console.log(data);
	});

	// 提交表单
	$scope.save = function() {
		var validator = $("#func-form").validate();
		if (validator.form()) {
			funcService.saveFunc($scope.funcInfo).then(function(data) {
				alert("保存成功！");
				// 关闭模态窗口
				$scope.cancel();
			}, function(data) {
				console.log(data);
			});
		}
	}

	// 文件上传实例
	$scope.uploader = new FileUploader({
		url : APP_CONFIG.basicUrl + '/fileUpload/uploadFile',
		autoUpload : true, // 将文件添加到队列后自动上传
		formData : {}, // 与文件一起发送的数据
		removeAfterUpload : true, // 从队列上传后删除文件
		// 上传进度
		onProgressItem : function(fileItem, progress) {
			console.info("正在上传：" + progress + "%");
		},
		// 回调函数，在一个文件上传成功后触发
		onSuccessItem : function(fileItem, response, status, headers) {
			$scope.funcInfo.icoUrl = response;
		}
	});

	// 关闭模态窗口
	$scope.cancel = function() {
		$uibModalInstance.close();
	}

});