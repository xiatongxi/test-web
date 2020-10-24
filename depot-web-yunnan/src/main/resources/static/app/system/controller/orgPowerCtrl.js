"use strict";

angular.module('app.system').controller("orgPowerCtrl", 
		function($scope,$rootScope, orgPowerService, userService, orgService, APP_CONFIG) {

	// 加载行政机构用户数据
	userService.getPageInfoByOrgClass(null,null,5317).then(function(data){
    	$scope.userlist = data.list;
    	// 构建树形数据
    	$scope.userTree = $scope.getChildUser(0);
		//$scope.fillUserTree($scope.userTree);
    },function(data){
        console.log(data);
    });
	
	// 加载机构数据
	orgService.getPageInfo(null,null,null,"").then(function(data){
    	$scope.orglist = data.list;
    	// 构建树形数据
    	$scope.orgTree = $scope.getChildOrg($rootScope.orgInfo.parentId);
		$scope.fillOrgTree($scope.orgTree);
    },function(data){
        console.log(data);
    });
	
	// 提交数据
	$scope.save = function() {
		if (!$scope.userId) {
			alert("请选择用户！");
			return;
		}
		var checkedOrgId = [];
		angular.forEach($scope.orglist, function(org, index) {
			if (org.isChecked) {
				checkedOrgId.push(org.orgId);
			}
		})
		if (checkedOrgId.length == 0) {
			alert("请选择机构");
			return;
		}
		orgPowerService.saveUserOrg($scope.userId, checkedOrgId, $rootScope.orgInfo.orgId).then(function(data){
	    	alert("保存成功！");
	    },function(data){
	        console.log(data);
	    });
	}
	
	//重置
	$scope.reset = function(){
		angular.forEach($scope.orglist, function(item, index) {
			item.isChecked = false;
		});
	}
	
	// 加载已有机构
	$scope.loadOrgByUser = function() {
		// 加载机构权限
		orgPowerService.getUserOrg($scope.userId).then(function(data){
			// 查询已有机构
			var existOrgId = [];
			angular.forEach(data, function(org, index) {
				existOrgId.push(org.departId);
			});
			// 选中已有功能
			angular.forEach($scope.orglist, function(org, index) {
				if ($.inArray(org.orgId, existOrgId) != -1) {
					org.isChecked = true;
				} else {
					org.isChecked = false;
				}
			})
	    },function(data){
	        console.log(data);
	    });
	}

	// 点击树节点事件
	$scope.itemClicked = function (item) {
		// 点击用户
		if (item.userId) {
			$scope.userId = item.userId;
			item.isChecked = true;
			// 取消前一个选中角色的选中状态，实现单选效果
			if ($scope.prevUser && $scope.prevUser!=item) {
				$scope.prevUser.isChecked = false;
			}
			$scope.prevUser = item;
			// 加载已有机构
			$scope.loadOrgByUser();
		}
		// 点击机构
		if (item.orgId) {
			angular.forEach($scope.orglist, function(org, index) {
				if (item.orgId == org.orgId) {
					org.isChecked = !item.isChecked;
				}
			})
			//$scope.itemCheckedChanged(item);
		}
    };
	
    // 复选框改变事件
    $scope.itemCheckedChanged = function(item){
		// 选择所有上级
    	$scope.checkParentOrg(item.parentId,item.isChecked);
	};
    
    // 选中当前项的同时，选中所有上级
    $scope.checkParentOrg = function(parentId,isCheckedParent) {
		angular.forEach($scope.orglist, function(item, index) {
			if (item.orgId == parentId && isCheckedParent) {
				item.isChecked = true;
				if (item.parentId != 0) {
			    	$scope.checkParentOrg(item.parentId,item.isChecked);
				}
			}
		})
    }
	
    // 获取下级用户
	$scope.getChildUser = function(parentId) {
		var children = [];
		angular.forEach($scope.userlist, function(item, index) {
			item.parentId = parentId;
			item.isExpend = true;
			children.push(item);
		})
		return children;
	}
	
	// 递归构建用户树形数据
	$scope.fillUserTree = function(children) {
		angular.forEach(children, function(item, index) {
			var children1 = $scope.getChildUser(item.userId);
			if (children1!=null && children1.length>0) {
				$scope.fillUserTree(children1);
			}
			item.children = children1;
		})
	}
	
	// 获取下级功能
	$scope.getChildOrg = function(parentId) {
		var children = [];
		angular.forEach($scope.orglist, function(item, index) {
			if (item.parentId == parentId) {
				item.isExpend = true;
				children.push(item);
			}
		})
		return children;
	}
	
	// 递归构建机构树形数据
	$scope.fillOrgTree = function(children) {
		angular.forEach(children, function(item, index) {
			var children1 = $scope.getChildOrg(item.orgId);
			if (children1!=null && children1.length>0) {
				$scope.fillOrgTree(children1);
			}
			item.children = children1;
		})
	}
	 
});

