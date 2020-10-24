angular.module('app.basic')
	.controller("keeperCtrl", function($scope, $rootScope, $http, $uibModal, $location, $state, keeperService,$stateParams) {

     // 获取货位列表数据
	 $scope.pageInfo = {pageNum : 1, pageSize : 10};
     $scope.loadData = function() {
    	 $scope.keeperName = $scope.keper == undefined ? "" : $scope.keper.name;
    	 keeperService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.keeperName, $rootScope.orgInfo.orgId).then(function(data){
             $scope.pageInfo = data;
         },function(data){
             console.log(data);
         });
     }
     $scope.loadData();
     
     // 新增或修改跳转到录入页面
     $scope.edit = function(id, showType) {
    	 $state.go('app.basic.keeperEdit',{id:id, showType:showType});
     }
     
     // 查看
     $scope.view = function(id) {
    	 $state.go('app.basic.keeperView',{id:id, types : $stateParams.functionType});
     }

    // 删除一条记录
    $scope.remove = function(id) {
         if (!confirm("确定要删除吗？")) {
             return;
         }
         keeperService.remove(id, $rootScope.orgInfo.orgId).then(function(data){
        	 if (data.status == 'success') {
        		 alert("删除成功！");
                 // 重新加载数据
                 $scope.loadData();
             } else {
                 alert("删除失败！");
             }
         },function(data){
             console.log(data);
         });
    }
     
    // 翻页
 	$scope.goPage = function(pageNum) {
 		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
      		$scope.pageInfo.pageNum = pageNum;
      		$scope.loadData();
      	}
 	}
    
    $scope.selected = []; //仓房数组
    //$scope.orgId = ""; //当前保管员的单位
    $scope.bgyId = ""; //当前保管员的ID
    // 获取当前保管员所在粮库的所有仓房和当前保管员的权限
    $scope.getUnitStoreList = function(id, orgId) {
        var modalInstance = $uibModal.open({
            size:'md',  
            templateUrl: 'app/basic/keeper/views/housePower-edit.html',
            controller: 'keeperPowerCtrl',
            resolve: {
            	id : id,
            	orgId : orgId
            }
        });
    	modalInstance.result.then(function (result) {
			$scope.selected = []; //仓房数组
			$scope.orgId = ""; //当前保管员的单位
			$scope.bgyId = ""; //当前保管员的ID
	    }, function (reason) {
	        console.log(reason);
	    });
    }

})
.controller("keeperCtrlEdit", function(FileUploader, $rootScope, $filter, $scope, $http, $state, $location, 
		$stateParams, keeperService, enumService, roleService, userService, APP_CONFIG) {
	// 获取基础数据
	$scope.getBasicData = function() {

		//获取角色数据
		roleService.getPageInfo().then(function(data){
	    	$scope.rolelist = data.list;
	    },function(data){
	        console.log(data);
	    });

		// 获取用户数据
		userService.getPageInfo(null, null, null, null, null, $rootScope.orgInfo.orgId).then(function(data){
            $scope.keeperList = data.list;
        },function(data){
            console.log(data);
        });

	}
	
	// 获取对应角色下的用户数据
	$scope.getUserList = function() {
		var roleInfoId = $scope.keeper.postType;
		if (roleInfoId == 14 || roleInfoId == 16) {
			alert("请注意：您所选择的岗位类别需要录入“职业资格及等级”信息和“上岗证”信息！");
		}
		userService.getPageInfo(null, null, null, null, roleInfoId, $rootScope.orgInfo.orgId).then(function(data){
            $scope.keeperList = data.list;
        },function(data){
            console.log(data);
        });
	}
	
	// 保管员ID
	$scope.bgyId = ""; //当前保管员的ID
	// 用于存放新增的学位学历数据行
    $scope.addXwxl = [];
    // 用于存放新增的专业技术数据行
    $scope.addZyjs = [];
    // 用于存放新增的职业资格数据行
    $scope.addZyzg = [];
    // 用于存放新增的上岗证
    //$scope.addSgz = [];
	
	// 新增或修改保管员信息跳转页面加载数据
    $scope.edit = function() {
    	
    	$scope.getBasicData();
    	
    	keeperService.findBasicKeeper($stateParams.id).then(function(data){
    		$scope.keeper = data.keeper;
    		$scope.keeper.depotName = $rootScope.depotInfo.orgName;
    		$scope.keeper.birthday = $filter('date')($scope.keeper.birthday, "yyyy-MM-dd");
    		$scope.keeper.isdepartmentTime = $filter('date')($scope.keeper.isdepartmentTime, "yyyy-MM-dd");
    		$scope.keeper.entryTime = $filter('date')($scope.keeper.entryTime, "yyyy-MM-dd");
    		
    		$scope.addXwxl = data.xlxwList;
    		$scope.addZyjs = data.zyjsList;
    		for (var i = 0; i < $scope.addZyjs.length; i++) {
    			$scope.addZyjs[i].issueTime = $filter('date')($scope.addZyjs[i].issueTime, "yyyy-MM-dd");
    		}
    		$scope.addZyzg = data.zyzgList;
    		for (var i = 0; i < $scope.addZyzg.length; i++) {
    			$scope.addZyzg[i].issueTime = $filter('date')($scope.addZyzg[i].issueTime, "yyyy-MM-dd");
    		}
    		$scope.addSgz = data.sgzList;
    		for (var i = 0; i < $scope.addSgz.length; i++) {
    			$scope.addSgz[i].issueTime = $filter('date')($scope.addSgz[i].issueTime, "yyyy-MM-dd");
    		}
    		$scope.bgyId = data.keeper.id;
    		if ($stateParams.showType == 1) {
    			$scope.isNotEdit = true;
    		}
    		
        },function(data){
        	console.log(data);
        });

    }
    $scope.edit();
    
    //选择用户名称后带出用户其它信息
    $scope.setKeeperName = function() {
    	var id = $scope.keeper.userId;
    	userService.editUser(id).then(function(data){
            $scope.keeper.name = data.realName; //姓名
            $scope.keeper.userAlias = data.userAlias; //别名
            $scope.keeper.sex = data.sex;  //性别
            $scope.keeper.phone = data.mobile; //电话
            $scope.keeper.email = data.email;  //邮箱
            $scope.keeper.avatorUrl = data.imgUrl; //头像
        },function(data){
            console.log(data);
        });
    }

    // 提交表单
    var validator = $("#keeper-form").validate();
    $scope.save = function() {
    	if (validator.form()) {
    		// 提交
    		keeperService.save($scope.keeper, $scope.addXwxl, $scope.addZyjs, $scope.addZyzg, $scope.addSgz, $rootScope.userInfo).then(function(data){
	    		if (data.status == 'success') {
	    			alert(data.msg);
	    		} else {
	                alert("保存失败！");
	            }
	    		$state.go('app.basic.keeperList');
	        },function(data){
	            console.log(data);
	        });
    	}
    }

    // 新增一行
    $scope.addEducation = function(kId,typeId) {
    	var i;
    	if (typeId === 1) {
    		i = $scope.addXwxl.length;
    		if (null == $scope.addXwxl[i-1].type) {
    			alert("请先录入空行！");
    			return;
    		}
    		$scope.addXwxl.push({datatype: 1,keeperId:kId});
    	} else if (typeId === 2) {
    		i = $scope.addZyjs.length;
    		if (null == $scope.addZyjs[i-1].department) {
    			alert("请先录入空行！");
    			return;
    		}
    		$scope.addZyjs.push({datatype: 2,keeperId:kId});
    	} else if (typeId === 3) {
    		i = $scope.addZyzg.length;
    		if (null == $scope.addZyzg[i-1].occupation) {
    			alert("请先录入空行！");
    			return;
    		}
    		$scope.addZyzg.push({datatype: 3,keeperId:kId});
    	}
    }

    // 删除一行
    $scope.delRow = function(kId, typeId, obj) {
	    var index;
	    if (typeId === 1) {
	    	if ($scope.addXwxl.length <=1 ) {
	            alert("至少要有一条学历学位信息！");
	            return;
	        }
	    	// 如果有ID，说明当前数据已经是存在于数据库的，那么要郑重删除
		    if (obj.id != undefined) {
		    	$scope.deleteEdu(obj.id);
		    }
	    	index = $scope.addXwxl.indexOf(obj);
	    	$scope.addXwxl.splice(index, 1);
   	    } else if (typeId === 2) {
   	    	if ($scope.addZyjs.length <=1 ) {
	            alert("至少要有一条专业技术职称信息！");
	            return;
	        }
   	    	// 如果有ID，说明当前数据已经是存在于数据库的，那么要郑重删除
   		    if (obj.id != undefined) {
   		    	$scope.deleteEdu(obj.id);
   		    }
   	    	index = $scope.addZyjs.indexOf(obj);
   	    	$scope.addZyjs.splice(index, 1);
   	    } else if (typeId === 3) {
   	    	if ($scope.addZyzg.length <=1 ) {
	            alert("至少要有一条职业资格信息！");
	            return;
	        }
   	    	// 如果有ID，说明当前数据已经是存在于数据库的，那么要郑重删除
   		    if (obj.id != undefined) {
   		    	$scope.deleteEdu(obj.id);
   		    }
   		    index = $scope.addZyzg.indexOf(obj);
   		    $scope.addZyzg.splice(index, 1);
   	    }
    }
    
    $scope.deleteEdu = function(id) {
    	if (!confirm("当前数据已近存在于系统中，确定要删除吗？")) {
            return;
        }
		// 提交
		keeperService.removeEdu(id).then(function(data){
    		if (data.status == 'success') {
    			alert("删除成功！");
    		} else {
                alert("删除失败！");
            }
        },function(data){
            console.log(data);
        });
    }
    
    // 文件上传实例
	$scope.uploader = new FileUploader({
		url : APP_CONFIG.basicUrl + '/fileUpload/uploadFile',
		autoUpload : true, // 将文件添加到队列后自动上传
		formData : [{fileType:'image'}], // 与文件一起发送的数据
		removeAfterUpload : true, // 从队列上传后删除文件
		// 上传进度
		onProgressItem : function(fileItem, progress) {
			console.info("正在上传：" + progress + "%");
		},
		// 回调函数，在一个文件上传成功后触发
		onSuccessItem : function(fileItem, response, status, headers) {
			$scope.keeper.avatorUrl = response;
		}
	});
	
	//返回和取消
	$scope.returnTop = function() {
		if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go("app.basic.keeperList");
        }
	}

})
.controller("keeperPowerCtrl", function($scope, $rootScope, $http, $location, $uibModalInstance, $stateParams, id, orgId, keeperService, enumService, APP_CONFIG) {

	
	$scope.selected = []; //仓房数组
    // 获取当前保管员所在粮库的所有仓房和当前保管员的权限
    $scope.edit = function() {
    	keeperService.getUnitStoreKeepList(id, orgId, "0").then(function(data){
    		$scope.housePowerList = data.storeList;
    		//初始化选中仓房的数组
    		for (var i = 0; i < data.storeList.length; i++) {
    			if (data.storeList[i].delFlag == 5) {
    				$scope.selected.push(data.storeList[i].storehouseId);
    			}
    		}
    	},function(data){
    		console.log(data);
    	});
    }
    
    $scope.edit();

    // 更新仓房数组的值
    $scope.updateSelection = function($event,hid) {
    	var checkbox = $event.target;
        var checked = checkbox.checked;
        if(checked){
            $scope.selected.push(hid) ;
        }else{
            var idx = $scope.selected.indexOf(hid);
            $scope.selected.splice(idx,1);
        }
    }

    // 提交保管员权限分配
    $scope.save = function() {
    	var checkArray = angular.toJson($scope.selected);
    	keeperService.saveKeeperHouse(checkArray, $rootScope.userInfo, id).then(function(data){
    		if (data.status == 'success') {
    			alert("保存成功！");
    		} else {
                alert("保存失败！");
            }
    	},function(data){
    		console.log(data);
    	});
    	//清空变量
    	$scope.selected = []; //仓房数组
    	
    	$scope.cancel();
    }
    
    // 关闭模态窗口
	$scope.cancel = function() {
		$uibModalInstance.close();
	}

})
.controller("keeperViewCtrl", function($scope, $rootScope, $state, $location, $stateParams, keeperService, enumService, APP_CONFIG) {

	// 查看保管员跳转页面加载数据
    $scope.findKeepView = function() {
    	keeperService.getBasicKeeper($stateParams.id).then(function(data){
    		$scope.keeper = data;
    		var url = data.avatorUrl;
    		$scope.keeper.avatorUrl = data.avatorUrl;
    		if (null == url) {
    			$scope.keeper.avatorUrl = "app/mould/admin.jpg";
    		}
    		console.log($scope.keeper.avatorUrl);
        },function(data){
        	console.log(data);
        });

    }
    $scope.findKeepView();
    
    // 新增或修改跳转到录入页面
    $scope.showKeeper = function(id) {
       // 新增或修改跳转到录入页面
    	$state.go('app.basic.keeperEdit',{id:id, showType:1});
    }
    
    //返回和取消
	$scope.returnTop = function() {
		if ($rootScope.previousState_name != '') {
            if($stateParams.types == "LKJC"){
                $state.go("app.supervise.storage.keeperList");
            }else if($stateParams.types != ''){
                $state.go("app.synth.barn.view", {id : $stateParams.types});
            }else{
                $state.go("app.basic.keeperList");
            }
        }else{
            $rootScope.back();
        }
	}

});