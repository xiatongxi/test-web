angular.module('app.business').controller("contractAuditSaveCtrl", 
		function($rootScope, $scope, $http, $stateParams, $state, $uibModal, $filter, userService,
		        contractAuditService, enumService, APP_CONFIG) {
    
    // 输入框禁止修改.
    $scope.isNotEdit = true;
    $scope.isAudit = true;
    
   //签订人 信息
    $scope.userInfoMessage = function() {
	    userService.getPageInfo(null, null, null,null, null, null).then(function(data){
	            $scope.userInfoList = data.list;
	        },function(data){
	            console.log(data);
	        });
    }
    $scope.userInfoMessage();
    
    // 用于存放 子表数据 的数组.
    $scope.addedDetail = [];
    $scope.loadDataById = function(id, processInstanceId) {
            contractAuditService.loadDataById(id, processInstanceId, $scope.auditType).then(function(data){
            $scope.contract = data.contract;
            $scope.contract.contractType = data.contract.contractType+"";
            $scope.auditList = data.auditList;
            $scope.fileList = data.fileList;
            $scope.contract.signingMan=parseInt(data.contract.signingMan);
            $scope.processDefinitionId = data.contract.processDefinitionId;
            $scope.processInstanceId = data.contract.processInstanceId;
            
            $scope.contract.signingTime = $filter('date')($scope.contract.signingTime, "yyyy-MM-dd"); 
            $scope.contract.enableDate = $filter('date')($scope.contract.enableDate, "yyyy-MM-dd"); 
            $scope.contract.disableDate = $filter('date')($scope.contract.disableDate, "yyyy-MM-dd"); 
            
            $scope.changeDetailList = data.changeDetailList;
            // 历次变更记录为空，就不显示.
            if ($scope.changeDetailList == null || $scope.changeDetailList.length == 0) {
            	$scope.changeDetailListHide = true;
            } else {
            	$scope.changeDetailListHide = false;
            }
            
        	// 隐藏新增明细按钮.
        	$scope.addRowButtonShow = false;
            // 子表数据.
            $scope.storeWareDetailList = data.storeWareDetailList;
            for (var i=0; i < data.storeWareDetailList.length; i++) {
                $scope.addedDetail.push(angular.copy(data.storeWareDetailList[i]));
            }
            
            // 获取粮食性质 下拉树.
            $scope.getAttributeData();
            // 获取粮食产地 下拉树.
            $scope.getAreaData();
            // 获取粮食明细品种 下拉树.
           // $scope.getGrainDetailKind();
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
            $state.go("app.business.contract-audit");
        }
    }
    
    // 选择审批人.
    $scope.choice = function(auditResult) {
		$scope.modelItem = [];

        $scope.modelItem.allContent = $scope.contract;

		$scope.modelItem.auditResult = auditResult;
        $scope.modelItem.variable = "2";

        if($scope.contract.taskName == '中转部/经营部经理审批'){ //如果是库领导审批审批说明是最后一步，直接通过
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
    
    
    // ----------------------------------------------    树形下拉框     开始          --------------------------------------------------
    // 树形下拉框(粮食性质)
    $scope.getAttributeData = function() {
        enumService.getTreeList($scope.contract.grainAttribute, "grainAttribute").then(function(data) {
            $scope.grainAttributeTreeData = data;
        },function(data) {
            console.log(data);
        })
    }

    // 树形下拉框(粮食产地)
    $scope.getAreaData = function() {
        enumService.getTreeList($scope.contract.grainProducingArea, "grainProducingArea").then(function(data) {
            $scope.grainProducingAreaTreeData = data;
        },function(data){
            console.log(data);
        })
    }
    
    // 树形下拉框(明细品种)
    /*$scope.getGrainDetailKind = function() {
    	enumService.getTreeListByTypeId ( $scope.storeWareDetail.grainDetailKind, $scope.storeWareDetail.grainKind).then(function(data) {
            $scope.grainDetailKindTreeData = data;
        },function(data) {
            console.log(data);
        })
    };*/
    // ----------------------------------------------    树形下拉框     结束          --------------------------------------------------
    
    // 进入页面加载.
    if ($stateParams.id != 0) {
        $scope.processInstanceId = $stateParams.processInstanceId;
        $scope.taskId = $stateParams.taskId;
        $scope.contractId = $stateParams.id;
        $scope.auditId = $stateParams.auditId;
        $scope.isAudit = $stateParams.isAudit;
        $scope.auditType = $stateParams.auditType;
        $scope.selectPlan=true; //合同类型 不可更改
        //新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
        $scope.loadDataById($stateParams.id, $scope.processInstanceId);
    }
    
    
    // 审批.
    $scope.audit = function (auditResult, assignee) {
    	if($scope.audit.content==null && auditResult != 1 ){
			alert("请填写审批意见");
		}else{
			
			$http({
				method: 'POST',
				url: APP_CONFIG.businessUrl + '/depot/business/contract/audit/audit',
				data: {
					contractId : $scope.contractId,
					result : auditResult,
					content : $scope.audit.content,
					processInstanceId : $scope.processInstanceId,
					taskId : $scope.taskId,
					id : $scope.auditId,
					assignee : assignee,
					userId :$rootScope.userInfo.userId,
					realName : $rootScope.userInfo.realName
				}
			}).then(function successCallback(response) {
				// 请求成功执行代码
				alert("审批成功！");
				// 返回.
				$scope.retList();
			}, function errorCallback(response) {
				// 请求失败执行代码
				console.log(response);
			});
		}
         
    }
     
});
