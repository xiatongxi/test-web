"use strict";

angular.module('app.storage')
.controller("aerationTaskCtrl", function($scope, $rootScope, $state, $http, $uibModal, $filter,
		businessApprovalService, $stateParams, aerationTaskService, APP_CONFIG) {
	
	// 通风申请执行状态
    $scope.applyStatuses = [
         {
             "key" : 1,
             "value" : "未提交"
         },
         {
             "key" : 2,
             "value" : "待审批"
         },
         {
             "key" : 3,
             "value" : "审批中"
         },
         {
             "key" : 4,
             "value" : "审批通过"
         },
         {
             "key" : 0,
             "value" : "审批驳回"
         },
         {
             "key" : 5,
             "value" : "作业结束"
         },
         {
             "key" : 6,
             "value" : "拒绝"
         }
     ];

    var houseId = null;

	//通风申请列表数据查询
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.loadData = function() {
    	houseId = $rootScope.currentStore;
    	aerationTaskService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.aerationTask, houseId, $rootScope.userInfo).then(function(data){
    		$scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
    
    $scope.loadData();

    // 翻页
 	$scope.goPage = function(pageNum) {
 		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
      		$scope.pageInfo.pageNum = pageNum;
      		$scope.loadData();
      	}
 	}
 	
 	// 接收广播，切换仓房
	$scope.$on("storeChangeed", function(event, storehouseId) {
		houseId = storehouseId;
        $scope.loadData();
    	//$scope.loadWare();
    })

    //新增或修改、查看跳转到编辑页面
    $scope.edit = function(id,butId,pageType,taskId,auditId) {
    	$state.go('app.storage.taskDispatch.aerationTaskApplyEdit',{id:id,butId:butId,pageType:pageType,taskId:taskId,auditId:auditId});
    }

    //删除
    $scope.remove = function(id) {
    	if (!confirm("确定要删除吗？")) {
            return;
        }
    	aerationTaskService.remove(id).then(function(data){
    		if (data.status == 'success') {
    			alert("删除成功！");
    		} else {
                alert("保存失败！");
            }
    		$scope.loadData();
        },function(data){
        	console.log(data);
        });
    }

    // 选择要提交的什么人(通风申请提交按钮).
 	$scope.choice = function(apply) {
        if (apply.taskStatus > 1) {
            alert("您已经提交该数据，无法再次提交！");
            return;
        }
        $scope.apply=apply;

	 	// 展开下一个审批人模态框.
        var modalInstance = $uibModal.open({
            size : 'md',  
            templateUrl: 'app/storage/aeration/views/approvalUser-view.html',
            controller: 'approvalTaskCtrl',
            resolve: {
            	roleId : 10 //提交给保管科长
            }
        });

        // 回调函数.
        modalInstance.result.then(function (result) {
			if (result.returnType == "cancel") {
				// 不做操作.
			} else if (result.returnType == "submit") {
				// 审批人.
				$scope.submit(result.assignee, result.list);
			} else if (result.returnType == "isEnd") {
				
			}
		}, function (reason) {
			console.log(reason);
		});
	}

    //选择好下一环节处理人后点提交
    $scope.submit = function(assignee, userList) {
    	aerationTaskService.submit($scope.apply.id, 2).then(function(data){
    		if (data.success == 'success') {
                // 请求成功后要往轨迹表里面添加流程轨迹数据
    			$scope.saveBusinessApproval($scope.apply, assignee, userList);
                // 重新加载数据
                alert("提交成功！");
                $("#myUserList").modal("hide");
                $scope.loadData();
            } else {
                alert(data.msg);
            }
        },function(data){
        	console.log(data);
        });
    }

    //往流程轨迹表添加轨迹数据
    $scope.saveBusinessApproval = function(apply, assignee, userList) {
    	var date = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
    	$scope.businessApproval = {
    			taskTypeName : "通风任务 作业单号:"+apply.taskId,
    			projectId : apply.id,
    			fromDepartment : $rootScope.orgInfo.orgName,
    			fromPeople : $rootScope.userInfo.realName,
    			fromUserName : $rootScope.userInfo.realName,
    			taskType : "storageAeration",
    			projectName : "通风作业申请",
    			result : "待审批",
    			isHide : 0,
    			createTime : new Date(),
    	        //保存申请人的信息,时间.
    			applyName : $rootScope.userInfo.realName,
    			applyNameId : $rootScope.userInfo.userId,
    			applyTime : new Date(),
    	        //下一个待审批人
    			operator : assignee,  //下一个审批人的用户ID
    			operatorName : $rootScope.userInfo.realName,  //当前登录人的realName
    			taskName : "员工提交",
    			taskId : apply.taskId,
    			content : "同意"
    	};
    	for (var i = 0; i < userList.length; i++) {
    		var obj = userList[i];
    		if (obj.userId == assignee) {
    			$scope.businessApproval.operatorName = obj.realName;
    		}
    	}

    	businessApprovalService.add($scope.businessApproval, apply.taskStatus+1).then(function(data){
    		if (data.status == 'success') {
                //标识流程数据保存成功
            }
        },function(data){
        	console.log(data);
        });
    }

})
.controller("aerationTaskEdit", function($scope, $filter, $state, $rootScope,$uibModal, $http, $stateParams, 
		aerationTaskService, foodbasicinfoService, threetempcheckService, businessApprovalService, selectService, APP_CONFIG) {
	$scope.processInstanceId = $stateParams.processInstanceId;
	$scope.auditId = $stateParams.auditId;
	
	$(document).ready(function() {
        $("#dtBox").DateTimePicker({
        });
    });

	//通风申请列表数据查询
    $scope.edit = function() {
		$scope.approvalStatus = null;
    	aerationTaskService.edit($stateParams.id,$stateParams.processInstanceId).then(function(data){
    		$scope.taskApply = data.aerationTask;
    		$scope.approvalStatus = data.aerationTask.taskStatus;
    		$scope.processDefinitionId = data.aerationTask.processDefinitionId;
            $scope.processInstanceId = data.aerationTask.processInstanceId;
    		$scope.taskApply.depotName = $rootScope.depotInfo.orgName;
    		$scope.taskApply.applyTime = $filter('date')($scope.taskApply.applyTime, "yyyy-MM-dd");
    		$scope.pageType = $stateParams.pageType; //页面类型，0：申请页面，1：审批页面
    		var btnId = $stateParams.butId;
    		if ($stateParams.pageType == 0) {//申请页面
    			if (data.aerationTask.id == null) { //只要是新增状态，因为还没有生成
    				$scope.taskApply.taskId = "TF-TASK_" + $filter('date')(new Date(), "yyyyMMddHHmmss");
    				$scope.taskApply.applePerson = $rootScope.userInfo.realName;
    				$scope.isNotShow=true;
    				$scope.isNotSave = true;
    				$scope.showNextButton = true;
    				$scope.isNext = false;
    				$scope.isLast = true;
    			} else {
    				$scope.isNotShow=false;
    				$scope.taskApply.estStarTime = $filter('date')($scope.taskApply.estStarTime, "yyyy-MM-dd HH:mm:ss");
    	    		$scope.taskApply.estEndTime = $filter('date')($scope.taskApply.estEndTime, "yyyy-MM-dd HH:mm:ss");
    			}
    			if (btnId == 1) {//是查看就全设置为只读
        			$scope.isNotEdit = true;
        			$scope.isNotSave = true;
        			//$scope.isNotEditHouseId = true;
        		} else if (btnId == 0) {//是修改就设置为可读
        			$scope.last();
        			$scope.isNotEditHouseId = true;
        			$scope.isNotEdit = false;
        		} else if (btnId == 2) {
        			$scope.taskApply.applyTime = $filter('date')(new Date(), "yyyy-MM-dd");
        		}
    		} else if ($stateParams.pageType == 1) {//审批页面
    			if (btnId == 1) {//查看
        			$scope.isNotEdit = true;
        			$scope.isNotSave = true;
        			$scope.isAudit = false;
        		} else if (btnId == 0) {//审批
        			$scope.isNotEdit = true;
        			$scope.isNotSave = true;
        			$scope.isAudit = true;
        		}
    			$scope.taskApply.estStarTime = $filter('date')($scope.taskApply.estStarTime, "yyyy-MM-dd HH:mm:ss");
    			$scope.taskApply.estEndTime = $filter('date')($scope.taskApply.estEndTime, "yyyy-MM-dd HH:mm:ss");
    			$scope.isNotEditHouseId = true;
    		}
        },function(data){
            console.log(data);
        });
    	//查询当前数据的流程轨迹和审批信息
    	selectService.getPageInfo(null, null, null, null, $stateParams.id, "storageAeration", null, "asc").then(function(data){
    		$scope.auditList = data.list;
    	},function(data){
            console.log(data);
        });
    }
    
    $scope.edit();
    
    //根据仓房号赋值仓房类型和仓房尺寸
    $scope.storeData = function (obj) {
    	//获取仓房信息
    	var houseId = obj.taskApply.houseId;
    	if (houseId == undefined) {
    		$scope.taskApply.houseType = '';
        	$scope.taskApply.houseSize = '';
    	} else {
    		$scope.taskApply.houseType = $scope.storehouseObj[houseId].storehouseType;
        	var cfcc = $scope.storehouseObj[houseId].length * $scope.storehouseObj[houseId].width;
        	$scope.taskApply.houseSize = cfcc;
    	}
    	
    	//获取储粮转卡信息
    	if (houseId != undefined) {
	    	foodbasicinfoService.findBasicinfoByStoreWarehouse(houseId,'').then(function(data){
	    		if (data != null && data.length > 0) {
	    			$scope.taskApply.goodsKinds = data[0].subType; //粮食品种
	    			$scope.taskApply.goodsNumber = data[0].number; //粮食数量
	    			$scope.taskApply.ladeLineHeight = data[0].lineHeight; //粮线高度
	    		} else {
	    			$scope.taskApply.goodsKinds = ''; //粮食品种
	    			$scope.taskApply.goodsNumber = ''; //粮食数量
	    			$scope.taskApply.ladeLineHeight = ''; //粮线高度
	    		}
	        },function(data){
	            console.log(data);
	        });
    	} else {
    		$scope.taskApply.goodsKinds = ''; //粮食品种
			$scope.taskApply.goodsNumber = ''; //粮食数量
			$scope.taskApply.ladeLineHeight = ''; //粮线高度
    	}
    	
    	if (houseId != undefined) {
    		threetempcheckService.getPageInfo(1, 1, '',houseId).then(function(data){
        		if (data != null && data.list.length > 0) {
        			var obj = data.list[0];
        			$scope.taskApply.maxFootTemperature = obj.maxTemp; //粮食最高温
        			$scope.taskApply.minFootTemperature = obj.minTemp; //粮食最低温
        			$scope.taskApply.avgFootTemperature = obj.avgTemp; //粮线平均温
        		} else {
        			$scope.taskApply.maxFootTemperature = ''; //粮食最高温
        			$scope.taskApply.minFootTemperature = ''; //粮食最低温
        			$scope.taskApply.avgFootTemperature = ''; //粮线平均温
        		}
            },function(data){
                console.log(data);
            });
    	} else {
    		$scope.taskApply.maxFootTemperature = ''; //粮食最高温
			$scope.taskApply.minFootTemperature = ''; //粮食最低温
			$scope.taskApply.avgFootTemperature = ''; //粮线平均温
    	}
    	
    }

    //下一步
    $scope.next= function () {
    	if (validator.form()) {
    		$scope.isLast = false;
    		$scope.isNext = true;
    		$scope.isNotSave = false;
    		$scope.showLastButton = true;
    		$scope.showNextButton = false;
    	}
    }
    //上一步
    $scope.last= function () {
    	$scope.isLast = true;
    	$scope.isNext = false;
    	$scope.isNotSave = true;
    	$scope.showLastButton = false;
    	$scope.showNextButton = true;
    }

    //通风方案申请保存
    var validator = $("#taskApply-form").validate();
    $scope.save = function() {
    	if (validator.form()) {
    		$scope.taskApply.taskStatus = 1; //1：未提交，2：待审批，3：审批通过，4：审批驳回
    		if ($scope.taskApply.estStarTime != undefined && $scope.taskApply.estStarTime != null && $scope.taskApply.estStarTime != '') {
				$scope.taskApply.estStarTime = new Date($scope.taskApply.estStarTime.replace(new RegExp(/-/gm) ,"/"));
			}
    		if ($scope.taskApply.estEndTime != undefined && $scope.taskApply.estEndTime != null && $scope.taskApply.estEndTime != '') {
				$scope.taskApply.estEndTime = new Date($scope.taskApply.estEndTime.replace(new RegExp(/-/gm) ,"/"));
			}

    		aerationTaskService.save($scope.taskApply, $rootScope.userInfo).then(function(data){
	    		if (data.status == 'success') {
	    			alert(data.msg);
	    		} else {
	                alert("保存失败！");
	            }
	    		if ($stateParams.pageType == 1) {//1位审批页面
	    			$state.go('app.storage.taskDispatch.aerationTaskApprovalList');
	    		} else if ($stateParams.pageType == 0) { //0为申请页面
	    			$state.go('app.storage.taskDispatch.aerationTaskApplyList');
	    		}
	        },function(data){
	            console.log(data);
	        });
    	}
    }

    // 选择审批人.
    $scope.choice = function(content, approvalStatus) {
		var roleId = "";
		if (approvalStatus == '3') {
			roleId = 8; //库主任角色
			// 展开通风申请详情
	        var modalInstance = $uibModal.open({
	            size : 'md',  
	            templateUrl: 'app/storage/aeration/views/approvalUser-view.html',
	            controller: 'approvalTaskCtrl',
	            resolve: {
	            	// items是一个回调函数
	            	roleId : roleId
	            }
	        });

	        // 回调函数.
	        modalInstance.result.then(function (result) {
	        	if (result.returnType == "cancel") {
	        		// 不做操作.
	        	} else if (result.returnType == "submit") {
	        		// 审批人.
	        		$scope.audit($scope.taskApply, result, content, approvalStatus);
	        	} else if (result.returnType == "isEnd") {
	        		$scope.audit(null);
	        	}
	        }, function (reason) {
	            console.log(reason);
	        });
		} else if (approvalStatus == '4') {
			$scope.audit($scope.taskApply, null, content, approvalStatus);
		}

    }

    // 审批菜单中选择审批人后调用、驳回、拒绝.
    $scope.audit = function (taskApply, result, content, approvalStatus) {
    	aerationTaskService.submit(taskApply.id, approvalStatus).then(function(data){
    		if (data.success == 'success') {
                // 请求成功后要往轨迹表里面添加流程轨迹数据
    			var approvalPeople = null;
    			var approvalPeople_list = null;
    			if (null != result) {
    				approvalPeople = result.assignee;
    				approvalPeople_list = result.list;
    			}
    			$scope.saveBusinessApproval(taskApply, approvalPeople, approvalPeople_list, content, approvalStatus);

            	// 重新加载数据
            	alert("提交成功！");
            	$("#myUserList").modal("hide");
            	//$state.go('app.storage.taskDispatch.aerationTaskApprovalList');
            } else {
                alert(data.msg);
            }
        },function(data){
        	console.log(data);
        });
    }

    //往流程轨迹表添加轨迹数据
    $scope.saveBusinessApproval = function(apply, assignee, userList, content, approvalStatus) {
    	var taskName = null;
    	if (approvalStatus == '3') {
    		taskName = "保管科长审批";
    		content = "[同意]" + content;
		} else if (approvalStatus == '4') {
    		taskName = "库主任审批";
    		content = "[同意]" + content;
		} else if (approvalStatus == '0') {
			if (apply.taskStatus == '2') {
				taskName = "保管科长审批";
			} else if (apply.taskStatus == '3') {
				taskName = "库主任审批";
			}
    		content = "[驳回]" + content;
		} else if (approvalStatus == '6') {
			if (apply.taskStatus == '2') {
				taskName = "保管科长审批";
			} else if (apply.taskStatus == '3') {
				taskName = "库主任审批";
			}
    		content = "[拒绝]" + content;
		}
    	var date = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
    	$scope.businessApproval = {
    			taskTypeName : "通风任务 作业单号:"+apply.taskId,
    			projectId : apply.id,
    			fromDepartment : $rootScope.orgInfo.orgName,
    			fromPeople : $rootScope.userInfo.realName,
    			fromUserName : $rootScope.userInfo.realName,
    			taskType : "storageAeration",
    			projectName : "通风作业申请",
    			result : "待审批",
    			isHide : 0,
    			createTime : new Date(),
    	        //保存申请人的信息,时间.
    			applyName : $rootScope.userInfo.realName,
    			applyNameId : $rootScope.userInfo.userId,
    			applyTime : new Date(),
    	        //下一个待审批人
    			operator : assignee,  //下一个审批人的用户ID
    			operatorName : $rootScope.userInfo.realName,  //当前登录人的realName
    			taskName : taskName,
    			taskId : apply.taskId,
    			content : content
    	};
    	//等于4就说明是最后一个人审批通过了，否则就是自己选择的，0是驳回，6是拒绝
    	if (approvalStatus == '1' || approvalStatus == '2' || approvalStatus == '3') {
    		for (var i = 0; i < userList.length; i++) {
        		var obj = userList[i];
        		if (obj.userId == assignee) {
        			$scope.businessApproval.operatorName = obj.realName;
        		}
        	}
    	}

    	businessApprovalService.add($scope.businessApproval, approvalStatus).then(function(data){
    		if (data.status == 'success') {
                //标识流程数据保存成功
    			$state.go('app.storage.taskDispatch.aerationTaskApprovalList');
            }
        },function(data){
        	console.log(data);
        });
    }

    //取消按钮
    $scope.retList = function () {
    	if ($stateParams.fromModule != null && $stateParams.fromModule != undefined  && $stateParams.fromModule != '') {
    		$state.go($stateParams.fromModule);
    		return;
    	}

    	if ($stateParams.pageType == 1) {//1为审批页面
    		if ($rootScope.previousState_name != '') {
            	$rootScope.back();
            } else {
            	$state.go('app.storage.taskDispatch.aerationTaskApprovalList');
            }
		} else if ($stateParams.pageType == 0) { //0为申请页面
			if ($rootScope.previousState_name != '') {
            	$rootScope.back();
            } else {
            	$state.go('app.storage.taskDispatch.aerationTaskApplyList');
            }
		}
    }
    
})
.controller("approvalTaskCtrl", function($scope, $uibModalInstance, userService, selectService,
		roleId, APP_CONFIG) {
	$scope.returnResult = {};
	$scope.loadData = function() {
    	userService.getPageInfo(null, null, null, null, roleId, null).then(function(data){
        	if (data.isEnd) {
        		// 最后的审批节点.
        		// 关闭模态窗.
        		$scope.returnResult.returnType = "isEnd"
        		$uibModalInstance.close($scope.returnResult);
        	} else {
        		// 不是最后的审批节点.
        		// 显示审批人
        		$scope.userList = data.list;
        		$scope.returnResult.list = data.list;
        	}
        },function(data){
            console.log(data);
        });
    }

    $scope.loadData();

    // 关闭模态窗口
    $scope.cancel = function() {
  	$scope.returnResult.returnType = "cancel";
      // close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
      $uibModalInstance.close($scope.returnResult);
    }
  
    // 选择审批人后提交.
    $scope.choiceUser = function(assignee) {
	  	if (assignee == null || assignee == undefined || assignee == '') {
	  		alert("请选择审批人！");
	  		return;
	  	}
	  	$scope.returnResult.returnType = "submit";
	  	$scope.returnResult.assignee = assignee;
	  	// 关闭模态窗.
	  	$uibModalInstance.close($scope.returnResult);
    }
})
