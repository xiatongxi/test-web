"use strict";
angular.module('app.storage').controller("fumigationAuditSaveCtrl", 
		function($scope, $http, $filter, $stateParams, $state, $uibModal, $rootScope, selectService,
				fumigationService, paymentService, businessApprovalService, APP_CONFIG) {
	
	// 获取基础数据
//	$scope.getBasicData = function() {
//		//按照单位获取单位下的仓房信息
//		$scope.storehouseList = $rootScope.storelist;
//		$scope.storehouseObj = $rootScope.storehouseObj;
//	}
//	$scope.getBasicData();

	$scope.loadDataById = function(id) {
//        fumigationAuditService.loadDataByIdAndPID(id, processInstanceId).then(function(data){
//            $scope.fumigation = data.fumigationProgram;
//            $scope.auditList = data.auditList;
//            $scope.processDefinitionId = data.fumigationProgram.processDefinitionId;
//            $scope.processInstanceId = data.fumigationProgram.processInstanceId;
//            // 保管员列表.
//            $scope.keeperList = [];
//            $scope.keeperList.push(data.keeper);
//            
//            $scope.fumigation.insectProductTime = $filter('date')($scope.fumigation.insectProductTime, "yyyy-MM-dd"); 
//            $scope.fumigation.storageTime = $filter('date')($scope.fumigation.storageTime, "yyyy-MM-dd"); 
//            $scope.fumigation.lastTimeFumigation = $filter('date')($scope.fumigation.lastTimeFumigation, "yyyy-MM-dd"); 
//            $scope.fumigation.circulationTime = $filter('date')($scope.fumigation.circulationTime, "yyyy-MM-dd"); 
//            $scope.fumigation.bulkGasDate = $filter('date')($scope.fumigation.bulkGasDate, "yyyy-MM-dd"); 
//            $scope.fumigation.bulkGasDate = $filter('date')($scope.fumigation.bulkGasDate, "yyyy-MM-dd"); 
//            
//        },function(data){
//        	console.log(data);
//        });
		$scope.showLastButton = false;
		$scope.isNotSave = true;
        fumigationService.loadDataById(id).then(function(data){
            $scope.fumigation = data;
            $scope.approvalStatus = $scope.fumigation.auditState;
            // 生虫时间
            $scope.fumigation.insectProductTime = $filter('date')($scope.fumigation.insectProductTime, "yyyy-MM-dd"); 
            $scope.fumigation.storageTime = $filter('date')($scope.fumigation.storageTime, "yyyy-MM-dd"); 
            $scope.fumigation.lastTimeFumigation = $filter('date')($scope.fumigation.lastTimeFumigation, "yyyy-MM-dd"); 
            $scope.fumigation.circulationTime = $filter('date')($scope.fumigation.circulationTime, "yyyy-MM-dd"); 
            $scope.fumigation.bulkGasDate = $filter('date')($scope.fumigation.bulkGasDate, "yyyy-MM-dd");

            if ($scope.fumigation.houseId != null) {
            	// 通过仓房id，获取保管员.
    	        paymentService.getKepperByHouseId($scope.fumigation.houseId).then(function(datas){
    		        $scope.keeperList = datas;
    		    },function(data){
    		        console.log(datas);
    		    });
            }

        },function(data){
        	console.log(data);
        });
        //查询当前数据的流程轨迹和审批信息
    	selectService.getPageInfo(null, null, null, null, $stateParams.id, "fumigationProgram", null, "asc").then(function(data){
    		$scope.auditList = data.list;
    	},function(data){
            console.log(data);
        });
    }
    // 输入框禁止修改.
    $scope.isNotEdit = true;
    
    if ($stateParams.id != 0) {
    	$scope.isLast = true;
    	$scope.processInstanceId = $stateParams.processInstanceId;
    	$scope.taskId = $stateParams.taskId;
    	$scope.fumigationId = $stateParams.id;
    	$scope.auditId = $stateParams.auditId;
    	$scope.isAudit = $stateParams.isAudit;
        //新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
        $scope.loadDataById($stateParams.id);
    }
    
    // 返回.
    $scope.retList = function () {
    	if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go("app.storage.fumigation-audit");
        }
    }
    
    // 选择审批人.
    $scope.choice = function(content, approvalStatus) {
    	approvalStatus = parseInt($scope.approvalStatus) + 1;
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
	        		$scope.audit($scope.fumigation, result, content, approvalStatus);
	        	} else if (result.returnType == "isEnd") {
	        		$scope.audit(null);
	        	}
	        }, function (reason) {
	            console.log(reason);
	        });
		} else if (approvalStatus == '4') {
			$scope.audit($scope.fumigation, null, content, approvalStatus);
		}
    }
    
    // 审批.
    $scope.audit = function (fumigation, result, content, approvalStatus) {
    	fumigationService.submit($scope.fumigation.id, approvalStatus).then(function(data){
    		if (data.success == 'success') {
                // 请求成功后要往轨迹表里面添加流程轨迹数据
    			var approvalPeople = null;
    			var approvalPeople_list = null;
    			if (null != result) {
    				approvalPeople = result.assignee;
    				approvalPeople_list = result.list;
    			}
    			$scope.saveBusinessApproval($scope.fumigation, approvalPeople, approvalPeople_list, content, approvalStatus);

            	// 重新加载数据
            	alert("提交成功！");
            	$("#myUserList").modal("hide");
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
			if (apply.auditState == '2') {
				taskName = "保管科长审批";
			} else if (apply.auditState == '3') {
				taskName = "库主任审批";
			}
    		content = "[驳回]" + content;
		} else if (approvalStatus == '6') {
			if (apply.auditState == '2') {
				taskName = "保管科长审批";
			} else if (apply.auditState == '3') {
				taskName = "库主任审批";
			}
    		content = "[拒绝]" + content;
		}
    	var date = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
    	$scope.businessApproval = {
    			taskTypeName : "熏蒸任务 作业单号:"+apply.fumigateProgramNumber,
    			projectId : apply.id,
    			fromDepartment : $rootScope.orgInfo.orgName,
    			fromPeople : $rootScope.userInfo.realName,
    			fromUserName : $rootScope.userInfo.realName,
    			taskType : "fumigationProgram",
    			projectName : "熏蒸作业申请",
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
    			taskId : apply.fumigateProgramNumber,
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
    			$state.go('app.storage.fumigation-audit');
            }
        },function(data){
        	console.log(data);
        });
    }

});
