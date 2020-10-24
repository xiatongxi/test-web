"use strict";
angular.module('app.business').controller("planAuditSaveCtrl", function($scope, $http,$rootScope, $filter,$state, $stateParams, $uibModal, planAuditService, enumService, APP_CONFIG) {

	// 子表数据模型.
	$scope.planDetail = {};
    // 用于存放 子表数据 的数组.
    $scope.addedDetail = [];
    // 输入框禁止修改.
    $scope.isNotEdit = true;
    $scope.hidden=false; //明细按钮
    
    $scope.attributeType = $stateParams.attributeType;
    
    
    // 加载页面.
    $scope.userName=$rootScope.userInfo.userName;
	$scope.loadDataById = function(id, processInstanceId,userName) {
        planAuditService.loadDataById(id, processInstanceId,userName).then(function(data){
            $scope.plan = data.plan;
            // 审批信息.
            $scope.auditList = data.auditList;
            // 附件.
            $scope.fileList = data.fileList;

            // 子表数据.
            $scope.storeWareDetailList = data.storeWareDetailList;
            for (var i=0; i < data.storeWareDetailList.length; i++) {
                $scope.addedDetail.push(angular.copy(data.storeWareDetailList[i]));
            }
            
            $scope.processDefinitionId = data.plan.processDefinitionId;
            $scope.processInstanceId = data.plan.processInstanceId;
            /*$scope.plan.storageBeginTime = $filter('date')($scope.plan.storageBeginTime, "yyyy-MM-dd"); 
            $scope.plan.storageEndTime = $filter('date')($scope.plan.storageEndTime, "yyyy-MM-dd"); 
            $scope.plan.salesBeginTime = $filter('date')($scope.plan.salesBeginTime, "yyyy-MM-dd"); 
            $scope.plan.salesEndTime = $filter('date')($scope.plan.salesEndTime, "yyyy-MM-dd");*/
            $scope.plan.jhnd = parseInt(data.plan.jhnd);
            $scope.plan.kszxrq = $filter('date')($scope.plan.kszxrq, "yyyy-MM-dd"); 
            $scope.plan.jzzxrq = $filter('date')($scope.plan.jzzxrq, "yyyy-MM-dd"); 
            
            $scope.getAttributeData();
            $scope.getGrainDetailKind();
        },function(data){
        });
    }
    
    // 返回.
    $scope.retList = function () {
    	if ($rootScope.previousState_name != '') {
        	if($rootScope.previousState_name.indexOf("app.additionalHome") != -1){//首页跳转的返回首页
        		$rootScope.isIndexPage = true;
        	}
            $rootScope.back();
        } else {
        	if($stateParams.type=="todo"){
        		$scope.plan = {};
        		//location.href = APP_CONFIG.businessUrl +'/#/business/handle-view';	
        		$state.go("app.business.handle-view");
           		 
        	}else if($stateParams.type=="complete"){
        		$scope.plan = {};
        		//location.href = APP_CONFIG.businessUrl +'/#/business/handles-view';
        		$state.go("app.business.handles-view");
        	}else{
        		$scope.plan = {};
        		//location.href = APP_CONFIG.businessUrl + '/#/business/plan-audit';
        		
        		if($scope.attributeType==1){
                    $state.go("app.business.grainReservesPlan-rotation-audit");
            	}else if($scope.attributeType==2){
                    $state.go("app.business.grainReservesPlan-sales-audit");
            	}else if($scope.attributeType==3){
                    $state.go("app.business.grainReservesPlan-acquisition-audit");
            	}else{
            		$state.go("app.business.plan-audit");

            	}
        	}
        }

    	
    }
    
    // 选择审批人.
    $scope.choice = function(auditResult) {
    	
		$scope.modelItem = [];

        $scope.modelItem.allContent = $scope.plan;
		$scope.modelItem.auditResult = auditResult;
        $scope.modelItem.variable = "2";

        if($scope.plan.currentApprovePath == '经营部经理审批'){ //如果是库领导审批审批说明是最后一步，直接通过
            $scope.audit($scope.modelItem.auditResult, null);
        }else{
            var modalInstance = $uibModal.open({
                size : 'md',
                templateUrl: 'app/business/util/views/choiceUser-view.html',
                controller: 'choiceUserModalCtrl',
                resolve: {
                    // items是一个回调函数
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
                    $scope.audit($scope.modelItem.auditResult, result.assignee);
                } else if (result.returnType == "isEnd") {
                    $scope.audit($scope.modelItem.auditResult, null);
                }
            }, function (reason) {
                console.log(reason);
            });
        }

    }

    
	// 回显预览附件.
	$scope.showFile = function(filePath, originalFileName) {
		window.open(filePath);
	}
	
	// 下载文件
	$scope.download = function(filePath, originalFileName) {
		$("#filePath").val(filePath);
		$("#type").val("business");
		$("#download-form").attr("action", APP_CONFIG.businessUrl + '/download');
		$("#download-form").submit();
	}
	
	
	
    // 树形下拉框(粮食性质)
    $scope.getAttributeData = function() {
        enumService.getTreeList($scope.plan.grainAttribute, "grainAttribute").then(function(data) {
            $scope.grainAttributeTreeData = data;
        },function(data) {
            console.log(data);
        })
    }
	
    // 树形下拉框(明细品种)
    $scope.getGrainDetailKind = function() {
        enumService.getTreeListByTypeId ($scope.plan.grainDetailKind, $scope.plan.grainKind).then(function(data) {
            $scope.grainDetailKindTreeData = data;
        },function(data) {
            console.log(data);
        })
    };
	
	// 审批.
	$scope.audit = function (auditResult,assignee) {

		if($scope.audit.content==null && auditResult != 1){
			alert("请填写审批意见");
		}else{
				$http({
		        method: 'POST',
		        url: APP_CONFIG.businessUrl + '/depot/business/plan/audit/audit',
		        data: {
		            planId : $scope.planId,
		            result : auditResult,
		            content : $scope.audit.content,
		            processInstanceId : $scope.processInstanceId,
		            taskId : $scope.taskId,
		            id : $scope.auditId,
		            assignee : assignee,
		            userId : $rootScope.userInfo.userId,
		            realName : $rootScope.userInfo.realName
			        }
			    }).then(function successCallback(response) {
			        // 请求成功执行代码
			        alert("执行成功！");
			        $scope.retList();
			    }, function errorCallback(response) {
			        // 请求失败执行代码
			        console.log(response);
			    });
		}
		
	    
	}
	
    if ($stateParams.id != 0) {
        $scope.processInstanceId = $stateParams.processInstanceId;
        $scope.taskId = $stateParams.taskId;
        $scope.planId = $stateParams.id;
        $scope.auditId = $stateParams.auditId;
        $scope.isAudit = $stateParams.isAudit;
        //新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
        $scope.hidden=true; //隐藏明细按钮
        $scope.Edit = true;//不可更改计划类型
        $scope.loadDataById($stateParams.id, $stateParams.processInstanceId);
    }
     
});
