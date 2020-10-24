"use strict";

angular.module('app.system').controller("powerCtrl", 
		function($scope, powerService, roleService, funcService, buttonService, APP_CONFIG) {

	// 加载角色数据
	roleService.getPageInfo().then(function(data){
    	$scope.rolelist = data.list;
    	// 构建树形数据
    	$scope.roleTree = $scope.getChildRole(0);
		$scope.fillRoleTree($scope.roleTree);
    },function(data){
        console.log(data);
    });
	
	// 加载按钮数据
	buttonService.getPageInfo().then(function(data){
    	$scope.btnlist = data.list;
    	// 加载功能数据
    	funcService.getPageInfo().then(function(data){
        	$scope.funclist = data.list;
        	// 构建树形数据
        	$scope.funcTree = $scope.getChildFunc(0);
    		$scope.fillFuncTree($scope.funcTree);
        },function(data){
            console.log(data);
        });
    },function(data){
        console.log(data);
    });
	
	// 提交数据
	$scope.save = function() {
		if (!$scope.roleId) {
			alert("请选择角色！");
			return;
		}
		var checkedFuncId = [];
		angular.forEach($scope.funclist, function(func, index) {
			if (func.isChecked) {
				checkedFuncId.push(func.funcId);
			}
		})
		if (checkedFuncId.length == 0) {
			alert("请选择功能");
			return;
		}
		var checkedBtnId = [];
		angular.forEach($scope.btnlist, function(btn, index) {
			if (btn.isChecked) {
				checkedBtnId.push(btn.btnId);
			}
		})
		powerService.saveRoleFunc($scope.roleId, checkedFuncId).then(function(data){
	    	alert("保存成功！");
	    },function(data){
	        console.log(data);
	    });
		if (checkedBtnId.length) {
			powerService.saveRoleButton($scope.roleId, checkedBtnId).then(function(data){
		    	
		    },function(data){
		        console.log(data);
		    });
		}
	}
	
	//重置
	$scope.reset = function(){
		angular.forEach($scope.funclist, function(item, index) {
			item.isChecked = false;
		});
		angular.forEach($scope.btnlist, function(btn, index) {
			btn.isChecked = false;
		});
	}
	
	// 加载已有权限
	$scope.loadFuncByRole = function() {
		// 加载功能权限
		powerService.getRoleFunc($scope.roleId).then(function(data){
			// 查询已有功能
			var existFuncId = [];
			angular.forEach(data, function(func, index) {
				existFuncId.push(func.funcId);
			});
			// 选中已有功能
			angular.forEach($scope.funclist, function(func, index) {
				if ($.inArray(func.funcId, existFuncId) != -1) {
					func.isChecked = true;
				} else {
					func.isChecked = false;
				}
			})
	    },function(data){
	        console.log(data);
	    });
		// 加载按钮权限
		powerService.getRoleButton($scope.roleId).then(function(data){
			// 查询已有按钮
			var existBtnId = [];
			angular.forEach(data.list, function(roleButton, index) {
				existBtnId.push(roleButton.btnId);
			});
			// 选中已有按钮
			angular.forEach($scope.btnlist, function(btn, index) {
				if ($.inArray(btn.btnId, existBtnId) != -1) {
					btn.isChecked = true;
				} else {
					btn.isChecked = false;
				}
			})
	    },function(data){
	        console.log(data);
	    });
	}

	// 点击树节点事件
	$scope.itemClicked = function (item) {
		// 点击角色
		if (item.roleId) {
			$scope.roleId = item.roleId;
			item.isChecked = true;
			// 取消前一个选中角色的选中状态，实现单选效果
			if ($scope.prevRole && $scope.prevRole!=item) {
				$scope.prevRole.isChecked = false;
			}
			$scope.prevRole = item;
			// 加载已有权限
			$scope.loadFuncByRole();
		}
		// 点击功能
		if (item.funcId) {
			angular.forEach($scope.funclist, function(func, index) {
				if (item.funcId == func.funcId) {//当前节点
					func.isChecked = !item.isChecked;
					$scope.checkChilFunc(func,$scope.btnlist,item);
					/*angular.forEach(func.children, function(funcChil, indexChil) {//一级子节点
						funcChil.isChecked = item.isChecked;
						angular.forEach($scope.btnlist, function(itemBtn, indexBtn) {
							if (itemBtn.funcId == funcChil.funcId) {
								itemBtn.isChecked = item.isChecked;
							}
						});
						angular.forEach(funcChil.children, function(funcChilEr, indexChilEr) {//二级子节点
							funcChilEr.isChecked = item.isChecked;
							angular.forEach($scope.btnlist, function(itemBtn, indexBtn) {
								if (itemBtn.funcId == funcChilEr.funcId) {
									itemBtn.isChecked = item.isChecked;
								}
							});
							angular.forEach(funcChilEr.children, function(funcChilSan, indexChilSan) {//三级子节点
								funcChilSan.isChecked = item.isChecked;
								angular.forEach($scope.btnlist, function(itemBtn, indexBtn) {
									if (itemBtn.funcId == funcChilSan.funcId) {
										itemBtn.isChecked = item.isChecked;
									}
								});
								angular.forEach(funcChilSan.children, function(funcChilSi, indexChilSi) {//四级子节点
									funcChilSi.isChecked = item.isChecked;
									angular.forEach($scope.btnlist, function(itemBtn, indexBtn) {
										if (itemBtn.funcId == funcChilSi.funcId) {
											itemBtn.isChecked = item.isChecked;
										}
									});
								});
							});
						});
					});*/
					
				}
			})
			
			$scope.itemCheckedChanged(item);
		}
    };
    
    // 循环选中下级
    $scope.checkChilFunc = function(funclist,btnlist,item) {
    	angular.forEach(funclist.children, function(func, index) {
			func.isChecked = item.isChecked;
			angular.forEach(btnlist, function(itemBtn, indexBtn) {
				if (itemBtn.funcId == func.funcId) {
					itemBtn.isChecked = item.isChecked;
				}
			});
			
			$scope.checkChilFunc(func,btnlist,item);
		});
    }
    
    // 点击按钮数据
    $scope.btnClicked = function (item) {
    	item.isChecked = !item.isChecked;
    }
	
    // 复选框改变事件
    $scope.itemCheckedChanged = function(item){
		// 选择所有上级
    	$scope.checkParentFunc(item.parentId);
	};
    
    // 选中当前项的同时，选中所有上级
    $scope.checkParentFunc = function(parentId) {
		angular.forEach($scope.funclist, function(item, index) {
			if (item.funcId == parentId) {
				item.isChecked = true;
				if (item.parentId != 0) {
			    	$scope.checkParentFunc(item.parentId);
				}
			}
		})
    }
	
    // 获取下级角色
	$scope.getChildRole = function(parentId) {
		var children = [];
		angular.forEach($scope.rolelist, function(item, index) {
			if (item.parentId == parentId) {
				item.isExpend = true;
				children.push(item);
			}
		})
		return children;
	}
	
	// 递归构建角色树形数据
	$scope.fillRoleTree = function(children) {
		angular.forEach(children, function(item, index) {
			var children1 = $scope.getChildRole(item.roleId);
			if (children1!=null && children1.length>0) {
				$scope.fillRoleTree(children1);
			}
			item.children = children1;
		})
	}
	
	// 获取下级功能
	$scope.getChildFunc = function(parentId) {
		var children = [];
		angular.forEach($scope.funclist, function(item, index) {
			if (item.parentId == parentId) {
				item.isExpend = true;
				children.push(item);
			}
		})
		return children;
	}
	
	// 递归构建功能树形数据
	$scope.fillFuncTree = function(children) {
		angular.forEach(children, function(item, index) {
			//把按钮数据合并到功能数据里面
			var childrenBtn = [];
			angular.forEach($scope.btnlist, function(itemBtn, indexBtn) {
				if (itemBtn.funcId == item.funcId) {
					childrenBtn.push(itemBtn);
				}
			});
			item.btnData = childrenBtn;
			var children1 = $scope.getChildFunc(item.funcId);
			if (children1!=null && children1.length>0) {
				$scope.fillFuncTree(children1);
			}
			item.children = children1;
		})
	}
	 
});

