"use strict";

angular.module('app.system').controller("roleCtrl", 
	function($scope, $uibModal, roleService, permissions, APP_CONFIG) {

	 // 获取列表数据
	 $scope.search = {roleName:""};
	 $scope.loadData = function() {
		 roleService.getPageInfo($scope.search.roleName).then(function(data){
	    	 $scope.rolelist = data.list;
		   	// 构建组织等级
		   	$scope.fillLevel(0, 0);
		   	// 构建树表格
			$scope.drawTable();
	     },function(data){
	         console.log(data);
	     });
	 }
	 $scope.loadData();

	// 通过递归给角色赋等级
	$scope.fillLevel = function(parentId, level) {
		angular.forEach($scope.rolelist, function(item, index) {
			if (item.parentId == parentId) {
				item.level = level;
				$scope.fillLevel(item.roleId, level+1);
			}
		})
	}
	 
	 // 删除一条记录
	 $scope.delete = function(roleId) {
		 if (!confirm("确定要删除吗？")) {
			 return;
		 }
		 roleService.deleteRole(roleId).then(function(data){
			 // 重新加载数据
			 $scope.loadData();
	     },function(data){
	         console.log(data);
	     });
	 }
	
	 // 点击新增或者修改时弹出模态窗
	 $scope.edit = function(roleId, parentId) {
		 var uibModalInstance = $uibModal.open({    
             size:'md',  
             templateUrl: 'app/system/views/role-edit.html',
             controller: 'roleEditCtrl',
             resolve: {    
            	 roleId : roleId,
            	 parentId : parentId
             }  
         }); 
		 uibModalInstance.result.then(function (result) {    
			 $scope.loadData();	// 关闭模态框时刷新页面数据
	     }, function (reason) {    
	         console.log(reason);
	     });
	 }  
		
	// 生成表格树
	$scope.drawTable = function() {
		$("#tb").bootstrapTable('destroy');
		$('#tb').bootstrapTable({
	       data: $scope.rolelist,	//数据源，必须包含parentId属性
	       treeView: true,
	       treeId: "roleId",
	       treeField: "roleName",
	       formatLoadingMessage: function () {  
	           return "";  
	       },  
	       columns: [{  
	           field: 'roleId',  
	       }, {  
	           field: 'roleName',  
	       },{  
	    	   events: operateEvents,
	           formatter: operateFormatter
	       }] 
		})
	}
	
	// 操作列按钮
	function operateFormatter(value, row, index) {  
		var btns = ['<a href="javascript:void(0)" id="add"><i class="fa fa-edit"></i> 添加下级</a>&nbsp;'];
		if (permissions.hasPermission(172)) {
			btns.push('<a href="javascript:void(0)" id="edit"><i class="fa fa-edit"></i> 修改</a>&nbsp;');
		}
		if (permissions.hasPermission(299)) {
			btns.push('<a href="javascript:void(0)" id="delete"><i class="fa fa-trash-o"></i> 删除</a>');
		}
       return btns.join('');  
   }
	
	// 为操作列按钮绑定事件
	window.operateEvents = {
		'click #add': function (e, value, row, index) {
			$scope.edit(null, row.roleId);
		},
		'click #edit': function (e, value, row, index) {
			$scope.edit(row.roleId, row.parentId);
		},
		'click #delete': function (e, value, row, index) {
			$scope.delete(row.roleId);
		},
	};
	 
});

angular.module('app.system').controller("roleEditCtrl", 
	function($scope, $uibModalInstance, roleId, parentId, roleService, APP_CONFIG) {

	// 获取用户信息
	roleService.editRole(roleId).then(function(data) {
		$scope.roleInfo = data;
		$scope.roleInfo.parentId = parentId;
	}, function(data) {
		console.log(data);
	});

	// 提交表单
	$scope.save = function() {
		var validator = $("#role-form").validate();
		if (validator.form()) {
			roleService.saveRole($scope.roleInfo).then(function(data) {
				alert("保存成功！");
				// 关闭模态窗口
				$scope.cancel();
			}, function(data) {
				console.log(data);
			});
		}
	}

	// 关闭模态窗口
	$scope.cancel = function() {
		$uibModalInstance.close();
	}

});