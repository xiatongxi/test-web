"use strict";

angular.module('app.intelligent')
.controller("aerationTaskCtrl", function($scope, $rootScope, $state, $http, $uibModal, $filter,
		businessApprovalService, $stateParams, aerationTaskService, APP_CONFIG) {
	
	// 通风申请执行状态  0审批驳回，1未提交，2待审批，3审批中，4审批通过，5作业结束，6拒绝
    $scope.applyStatuses = [
         {
             "key" : 0,
             "value" : "审批驳回"
         },
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
             "key" : 5,
             "value" : "作业结束"
         },
         {
             "key" : 6,
             "value" : "拒绝"
         }
     ];


	//通风申请列表数据查询
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.aerationTask = {state : ""};
    $scope.loadData = function() {
    	//$stateParams.approvalState = 4; //审批通过的状态
    	aerationTaskService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.aerationTask ,$stateParams.approvalState).then(function(data){
    		$scope.pageInfo = data.data;
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
 	
 	

    //新增或修改、查看跳转到编辑页面
    $scope.edit = function(id,butId,pageType,taskId,auditId) {
    	$state.go('app.intelligent.aeration.plan.applyEdit',{id:id,butId:butId,pageType:pageType,taskId:taskId,auditId:auditId});
    }

    //删除
    $scope.remove = function(id) {
    	if (!confirm("确定要删除吗？")) {
            return;
        }
    	aerationTaskService.remove(id).then(function(data){
    		if (data.message == 'success') {
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
 	$scope.choices = function(apply,variable) {
        if (apply.state > 1) {
            alert("您已经提交该数据，无法再次提交！");
            return;
        }
        $scope.apply=apply;
        $scope.modelItem = [];
        $scope.modelItem.roleName='仓储部经理';
	 	// 展开下一个审批人模态框.  //提交给仓储部经理
        var modalInstance = $uibModal.open({
            size : 'md',  
            templateUrl: 'app/intelligent/aeration/views/approvalUser-view.html',
            controller: 'choiceUserCtrl',
            resolve: {
            	items: function () {  
					// 这个值会被模态框的控制器获取到
					return $scope.modelItem; 
				} 
            }
        });

        // 回调函数.
        modalInstance.result.then(function (result) {
			if (result.returnType == "cancel") {
				if(variable == 1){
					// 新增则id
					aerationTaskService.remove(id).then(function(data){
						if (data.message == 'success')
							aerationTaskService.remove(id);
							$scope.apply.id = null;
					},function(data){
						console.log(data);
					});
				}else{
					//不做操作
				}
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
    		if (data.message == 'success') {
                // 请求成功后要往轨迹表里面添加流程轨迹数据
    			$scope.saveBusinessApproval($scope.apply, assignee, userList);
                // 重新加载数据
                alert("提交成功！");
                $("#myU-+serList").modal("hide");
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
    			taskType : "aerationApply",
    			taskTypeName : "通风申请编号："+apply.areationPlanNumber,
    			processInstanceId : apply.id,
    			fromDepartment : $rootScope.orgInfo.orgName,
    			fromPeople : $rootScope.userInfo.userId,
    			fromUserName : $rootScope.userInfo.realName,
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
    			operatorName : assignee,  //下一审批人的name (存的id)
    			taskName : "员工提交",
    			taskId : apply.id,
    			content : "同意"
    	};
    	for (var i = 0; i < userList.length; i++) {
    		var obj = userList[i];
    		if (obj.userId == assignee) {
    			$scope.businessApproval.operatorName = obj.realName;
    		}
    	}

    	businessApprovalService.add($scope.businessApproval, apply.state+1).then(function(data){
    		if (data.status == 'success') {
                //标识流程数据保存成功
            }
        },function(data){
        	console.log(data);
        });
    }

})
.controller("aerationTaskEdit", function($scope, $filter, $state, $rootScope,$uibModal, $http, $stateParams, 
		aerationTaskService, codeRuleService, foodbasicinfoService,commonUtilService, temperatureRecordService, businessApprovalService, APP_CONFIG) {
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
    		
    		if(data.data!=null){
    			$scope.taskApplyPlan = data.data;
        		$scope.taskApplyPlan.vCfCode=data.data.vCfCode;
        		$scope.taskApplyPlan.aerationTarget=parseInt(data.data.aerationTarget);
        		$scope.taskApplyPlan.ventilationMode=parseInt(data.data.ventilationMode);
        		$scope.state = data.data.state;
        		//根据仓房id去查找其他信息
        		$scope.taskApply={};
        		$scope.storeData($scope.taskApplyPlan.vCfCode);
        		
    		}
    		
    		
    		
    		$scope.pageType = $stateParams.pageType; //页面类型，0：申请页面，1：审批页面
    		var btnId = $stateParams.butId;
    		if ($stateParams.pageType == 0) {//申请页面
    			
    			
    			
    			if (data.data == null) { //只要是新增状态，因为还没有生成
    				$scope.taskApplyPlan={};
    				$scope.taskApplyPlan.applyPerson = $rootScope.userInfo.realName;
    				$scope.isNotShow=true;
    				$scope.isNotSave = true;
    				$scope.showNextButton = true;
    				$scope.isNext = false;
    				$scope.isLast = true;
    				
        			
    			} else {
    				$scope.isNotShow=false;
    				$scope.isNotEdit = false;
    				//$scope.taskApplyPlan={};
    				$scope.taskApplyPlan.testTime = $filter('date')($scope.taskApplyPlan.testTime, "yyyy-MM-dd HH:mm:ss");
    	    		$scope.taskApplyPlan.endTime = $filter('date')($scope.taskApplyPlan.endTime, "yyyy-MM-dd HH:mm:ss");
    			}
    			if (btnId == 1) {//是查看就全设置为只读
        			$scope.isNotEdit = true;
        			$scope.isNotSave = true;
        			/*$scope.isNotEditHouseId = true;*/
        		} else if (btnId == 0) {//是修改就设置为可读
        			//$scope.last();
        			$scope.isNotEditHouseId = true;
        			$scope.isNotEdit = false;
        		} else if (btnId == 2) {
        			//$scope.taskApplyPlan.applyTime = $filter('date')(new Date(), "yyyy-MM-dd");
    	    		$scope.taskApplyPlan.applyTime = $filter('date')($scope.taskApplyPlan.applyTime, "yyyy-MM-dd");
    	    		//获取通风计划编号
    	    		codeRuleService.getCodeValueByType("areationPlan", $rootScope.userInfo.orgId).then(function(data) {
    	                if (data.status == "success") {
    	                    //$scope.planNumber.status = "success";
    	                    $scope.taskApplyPlan.areationPlanNumber = data.codeValue;
    	                } else if (data.status == "error") {
    	                    $scope.taskApplyPlan.msg = data.msg;
    	                    $scope.taskApplyPlan.status = "error";
    	                    if(confirm("通风计划编号有误！该页面无法保存！原因：" + $scope.taskApplyPlan.msg + " 是否返回到列表页！")) {
    	                        $scope.retList();
    	                    }
    	                }
    	            });
    	    		
    	    		
    	    		
    	    		
        			$scope.isNotEdit = false;
        		}
    		} else if ($stateParams.pageType == 1) {//审批页面
    			$scope.isNotEditHouseId = true;
    			if (btnId == 1) {//查看
        			$scope.isNotEdit = true;
        			$scope.isNotSave = true;
        			$scope.isAudit = false;
        		} else if (btnId == 0) {//审批
        			$scope.isNotEdit = true;
        			$scope.isNotSave = true;
        			$scope.isAudit = true;
        		}else if (btnId == 2) {//修改
        			$scope.isNotEdit = false;
        			$scope.isNotSave = true;
        			$scope.isAudit = true;
        			$scope.isNotEditHouseId = false;
        		}
    			//$scope.taskApply.estStarTime = $filter('date')($scope.taskApply.estStarTime, "yyyy-MM-dd HH:mm:ss");
    			//$scope.taskApply.estEndTime = $filter('date')($scope.taskApply.estEndTime, "yyyy-MM-dd HH:mm:ss");
    			
    			
    		}
        },function(data){
            console.log(data);
        });
    	//查询当前数据的流程轨迹和审批信息
    	
    	$scope.approval={taskId :$stateParams.id};
    	aerationTaskService.getSelectPageInfo(null, null, null ,$scope.approval, null, "aerationApply",$rootScope.userInfo.userId, "asc").then(function(data){
    		$scope.auditList = data.list;
    	},function(data){
            console.log(data);
        });
    }
   
    $scope.edit();
    
    
    //根据仓房号赋值仓房类型和仓房尺寸
    $scope.storeData = function (vCfCode) {
    	$scope.taskApply={};
    	//var houseId = $rootScope.storeHouseCodeObj[vCfCode].storehouseId;
    	//获取仓房信息
    	var houseId = vCfCode;
    	/*if (houseId == undefined) {
    		$scope.taskApply.houseType = '';
        	$scope.taskApply.houseSize = '';
    	} else {
    		
    		$scope.taskApply.houseType = $rootScope.storeHouseCodeObj[vCfCode].storehouseType;
			

    		//$scope.taskApply.houseType = $rootScope.storeHouseCodeObj[houseId].storehouseType;
        	var cfcc = $rootScope.storeHouseCodeObj[vCfCode].length * $rootScope.storeHouseCodeObj[vCfCode].width;
        	$scope.taskApply.houseSize = cfcc;
    	}*/
    	
    	if (houseId == undefined || houseId == null) {
    		$scope.taskApply.houseType = '';
        	$scope.taskApply.houseSize = '';
        	$scope.taskApply.ladeLineHeight = '';
        	$scope.taskApplyPlan.packingmode = '';
    	} else {
    		$scope.taskApply.houseType = $rootScope.storeHouseCodeObj[vCfCode].storehouseType;
    		$scope.taskApply.ladeLineHeight = $rootScope.storeHouseCodeObj[vCfCode].grainHeigth;
    		$scope.taskApplyPlan.packingmode = parseInt($rootScope.storeHouseCodeObj[vCfCode].keepingWay);
        	$scope.taskApply.houseSize = commonUtilService.accMul($rootScope.storeHouseCodeObj[vCfCode].length,$rootScope.storeHouseCodeObj[vCfCode].width);
    	}
    	
    	
    	if (houseId != undefined) {
    		var warehouseId = $rootScope.storeHouseCodeObj[vCfCode].storehouseId;
	    	//查询库存数据
    		aerationTaskService.queryKcData($rootScope.userInfo.orgId,warehouseId,null).then(function(data){
    		
	    		if (data != null && data.length > 0) {
	    			$scope.taskApply.goodsKinds = parseInt(data[0].pz); //粮食品种
	    			$scope.taskApply.goodsNumber = commonUtilService.accDiv(data[0].kcsl,1000);
	    			
	    			
	    		} else {
	    			$scope.taskApply.goodsKinds = ''; //粮食品种
	    			$scope.taskApply.goodsNumber = ''; //粮食数量
	    			
	    		}
	        },function(data){
	            console.log(data);
	        });
    	} else {
    		$scope.taskApply.goodsKinds = ''; //粮食品种
			$scope.taskApply.goodsNumber = ''; //粮食数量
			
    	}
    	/*if (houseId != undefined) {
	    	foodbasicinfoService.queryBasicInfo(houseId,'').then(function(data){
	    		
	    		if (data != null && data.length > 0) {
	    			//console.log($rootScope.storeHouseCodeObj);
	    			$scope.taskApply.goodsKinds = data[0].subType; //粮食品种
	    			$scope.taskApply.goodsNumber = data[0].number; //粮食数量
	    			$scope.taskApply.ladeLineHeight = data[0].lineHeight; //粮线高度grain_heigth
	    			
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
			
    	}*/
    	
    	if (houseId != undefined) {
    		$scope.search = {vCfCode : ''};
    		$scope.search.vCfCode = houseId;
    		$scope.pageInfo = {pageNum : 1, pageSize : 1};
    		temperatureRecordService.getTemperatureRecordPageInfo($scope.pageInfo, $scope.search).then(function(data){
    			
    			if (data.data.list[0] != null ) {
        			var obj = data.data.list[0];
        			$scope.taskApply.maxFootTemperature = obj.max; //粮食最高温
        			$scope.taskApply.minFootTemperature = obj.min; //粮食最低温
        			$scope.taskApply.avgFootTemperature = obj.avg; //粮线平均温
        			$scope.taskApplyPlan.maxAter = obj.intemp; //仓内温
        			$scope.taskApplyPlan.minWater = obj.inh; //仓内湿
        		} else {
        			$scope.taskApply.maxFootTemperature = ''; //粮食最高温
        			$scope.taskApply.minFootTemperature = ''; //粮食最低温
        			$scope.taskApply.avgFootTemperature = ''; //粮线平均温
        			$scope.taskApplyPlan.maxAter = ''; //仓内温
        			$scope.taskApplyPlan.minWater = ''; //仓内湿
        		}
            },function(data){
                console.log(data);
            });
    	} else {
    		$scope.taskApply.maxFootTemperature = ''; //粮食最高温
			$scope.taskApply.minFootTemperature = ''; //粮食最低温
			$scope.taskApply.avgFootTemperature = ''; //粮线平均温
			$scope.taskApplyPlan.maxAter = ''; //仓内温
			$scope.taskApplyPlan.minWater = ''; //仓内湿
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
    	//申请人
    	$scope.taskApplyPlan.applyPerson = $rootScope.userInfo.realName;
    	$scope.taskApplyPlan.aid = $rootScope.userInfo.userId;
    	//申请日期
    	$scope.taskApplyPlan.applyTime = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
    	
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
    $scope.save = function(variable) {
    	if (validator.form()) {

			$scope.taskApplyPlan.state = 1; // 0审批驳回，1未提交，2待审批，3审批中，4审批通过，5作业结束，6拒绝
			aerationTaskService.save($scope.taskApplyPlan).then(function(data){
				if(variable==1){
					if (data.message == 'success') {
						if($stateParams.id == 0){
							//新增数据返回 id
							var id = data.data;
						}else {
							//修改页面
							var id = $stateParams.id;
							variable = "2";
						}
						aerationTaskService.edit(id).then(function(data){
							$scope.apply = data.data;
							$scope.choices($scope.apply,variable);
						},function(data){
						});
					} else {
						alert("保存失败！");
					}
				}else{
					if (data.message == 'success') {
						alert("保存成功！");
					} else {
						alert("保存失败！");
					}
					if ($stateParams.pageType == 1) {//1位审批页面
						$state.go('app.intelligent.aeration.plan.audit');
					} else if ($stateParams.pageType == 0) { //0为申请页面
						$state.go('app.intelligent.aeration.plan.apply',{approvalState:0});
					}
				}

			},function(data){
				console.log(data);
			});

    	}
    }

    // 审批菜单中选择审批人后调用、驳回、拒绝.
    $scope.audit = function (taskApplyPlan, result, content, state) {
    	if(state == '0' || state == '6'){
    		if(null == content || content == 'undefined'){
    			alert("请填写审批意见！");
        		return ;
        	}else{
        		content = "," + content;
        	}
    	}
    	aerationTaskService.submit($scope.taskApplyPlan.id, state).then(function(data){
    		if (data.message == 'success') {
                // 请求成功后要往轨迹表里面添加流程轨迹数据
    			if (null != result) {
    				$scope.approvalPeople = result.assignee; 
    				$scope.approvalPeople_list = result.list;
    			}
    			$scope.saveBusinessApproval($scope.taskApplyPlan, $scope.approvalPeople, $scope.approvalPeople_list, content, state);

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
    
    // 选择审批人.
    $scope.choice = function(content, state) {
		if (state == '3') {
			// 展开通风申请详情
			$scope.modelItem = [];
	        $scope.modelItem.roleName='库领导';
		 	// 展开下一个审批人模态框.  //提交给库领导
	        var modalInstance = $uibModal.open({
	            size : 'md',  
	            templateUrl: 'app/intelligent/aeration/views/approvalUser-view.html',
	            controller: 'choiceUserCtrl',
	            resolve: {
	            	items: function () {  
						// 这个值会被模态框的控制器获取到
						return $scope.modelItem; 
					} 
	            }
	        });

	        // 回调函数.
	        modalInstance.result.then(function (result) {
	        	if (result.returnType == "cancel") {
	        		// 不做操作.
	        	} else if (result.returnType == "submit") {
	        		// 审批人.
	        		$scope.audit($scope.taskApplyPlan, result, content, state);
	        	} else if (result.returnType == "isEnd") {
	        		$scope.audit(null);
	        	}
	        }, function (reason) {
	            console.log(reason);
	        });
		} else if (state == '4') {
			$scope.audit($scope.taskApplyPlan, null, content, state);
		}

    }

  

    //往流程轨迹表添加轨迹数据
    $scope.saveBusinessApproval = function(apply, assignee, userList, content, state) {
    	var taskName = null;
    	if (state == '3') {
    		taskName = "仓储部经理审批";
    		if(null == content || content == 'undefined'){
    			content = "同意" ;
    		}else{
    			content = "同意" + content;
    		}
    		
		} else if (state == '4') {
    		taskName = "库领导审批";
    		if(null == content || content == 'undefined'){
    			content = "同意" ;
    		}else{
    			content = "同意" + content;
    		}
		} else if (state == '0') {
			if (apply.state == '2') {
				taskName = "仓储部经理审批";
			} else if (apply.state == '3') {
				taskName = "库领导审批";
			}
			if(null == content || content == 'undefined'){
    			content = "驳回" ;
    		}else{
    			content = "驳回" + content;
    		}
		} else if (state == '6') {
			if (apply.state == '2') {
				taskName = "仓储部经理审批";
			} else if (apply.state == '3') {
				taskName = "库领导审批";
			}
			if(null == content || content == 'undefined'){
    			content = "拒绝" ;
    		}else{
    			content = "拒绝" + content;
    		}
		}
    	var date = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
    	$scope.businessApproval = {
    			taskType : "aerationApply",
    			taskTypeName : "通风申请编号："+apply.areationPlanNumber,
    			processInstanceId : apply.taskId,
    			fromDepartment : $rootScope.orgInfo.orgName,
    			fromPeople : $rootScope.userInfo.realName,
    			fromUserName : $rootScope.userInfo.realName,
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
    			operatorName : assignee,  //下一个审批人的用户ID
    			taskName : taskName,
    			taskId : apply.id,
    			content : content
    	};
    	//等于4就说明是最后一个人审批通过了，否则就是自己选择的，0是驳回，6是拒绝
    	if (state == '1' || state == '2' || state == '3') {
    		for (var i = 0; i < userList.length; i++) {
        		var obj = userList[i];
        		if (obj.userId == assignee) {
        			$scope.businessApproval.operatorName = obj.realName;
        		}
        	}
    	}
    	if(state == '4'){
    		$scope.businessApproval.operator = $rootScope.userInfo.userId;
    	}
    	businessApprovalService.add($scope.businessApproval, state).then(function(data){
    		if (data.status == 'success') {
                //标识流程数据保存成功
    			$state.go('app.intelligent.aeration.plan.audit');
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
            	//$rootScope.back();
            	$state.go('app.intelligent.aeration.plan.apply',{approvalState:'00'});
            } else {
            	$state.go('app.storage.taskDispatch.aerationTaskApplyList');
            }
		}
    }

	// 通风申请执行状态  0审批驳回，1未提交，2待审批，3审批中，4审批通过，5作业结束，6拒绝
	$scope.applyStatuses = [
		{
			"key" : 0,
			"value" : "审批驳回"
		},
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
			"key" : 5,
			"value" : "作业结束"
		},
		{
			"key" : 6,
			"value" : "拒绝"
		}
	];


	//通风申请列表数据查询
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.aerationTask = {state : ""};
	$scope.loadData = function() {
		//$stateParams.approvalState = 4; //审批通过的状态
		aerationTaskService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.aerationTask ,$stateParams.approvalState).then(function(data){
			$scope.pageInfo = data.data;
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



	//新增或修改、查看跳转到编辑页面
	$scope.edit = function(id,butId,pageType,taskId,auditId) {
		$state.go('app.intelligent.aeration.plan.applyEdit',{id:id,butId:butId,pageType:pageType,taskId:taskId,auditId:auditId});
	}

	//删除
	$scope.remove = function(id) {
		if (!confirm("确定要删除吗？")) {
			return;
		}
		aerationTaskService.remove(id).then(function(data){
			if (data.message == 'success') {
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
	$scope.choices = function(apply,variable) {
		if (apply.state > 1) {
			alert("您已经提交该数据，无法再次提交！");
			return;
		}
		$scope.apply=apply;
		$scope.modelItem = [];
		$scope.modelItem.roleName='仓储部经理';
		// 展开下一个审批人模态框.  //提交给仓储部经理
		var modalInstance = $uibModal.open({
			size : 'md',
			templateUrl: 'app/intelligent/aeration/views/approvalUser-view.html',
			controller: 'choiceUserCtrl',
			resolve: {
				items: function () {
					// 这个值会被模态框的控制器获取到
					return $scope.modelItem;
				}
			}
		});

		// 回调函数.
		modalInstance.result.then(function (result) {
			if (result.returnType == "cancel") {
				if(variable == 1){
					// 新增则id
					aerationTaskService.remove(id).then(function(data){
						if (data.message == 'success')
							aerationTaskService.remove(id);
						$scope.apply.id = null;
					},function(data){
						console.log(data);
					});
				}else{
					//不做操作
				}
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
			if (data.message == 'success') {
				// 请求成功后要往轨迹表里面添加流程轨迹数据
				$scope.saveBusinessApprovals($scope.apply, assignee, userList);
				// 重新加载数据
				alert("提交成功！");
				$("#myU-+serList").modal("hide");
				$scope.loadData();
				$scope.retList();
			} else {
				alert(data.msg);
			}
		},function(data){
			console.log(data);
		});
	}

	//往流程轨迹表添加轨迹数据
	$scope.saveBusinessApprovals = function(apply, assignee, userList) {
		var date = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
		$scope.businessApproval = {
			taskType : "aerationApply",
			taskTypeName : "通风申请编号："+apply.areationPlanNumber,
			processInstanceId : apply.id,
			fromDepartment : $rootScope.orgInfo.orgName,
			fromPeople : $rootScope.userInfo.userId,
			fromUserName : $rootScope.userInfo.realName,
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
			operatorName : assignee,  //下一审批人的name (存的id)
			taskName : "员工提交",
			taskId : apply.id,
			content : "同意"
		};
		for (var i = 0; i < userList.length; i++) {
			var obj = userList[i];
			if (obj.userId == assignee) {
				$scope.businessApproval.operatorName = obj.realName;
			}
		}

		businessApprovalService.add($scope.businessApproval, apply.state+1).then(function(data){
			if (data.status == 'success') {
				//标识流程数据保存成功
			}
		},function(data){
			console.log(data);
		});
	}

})

