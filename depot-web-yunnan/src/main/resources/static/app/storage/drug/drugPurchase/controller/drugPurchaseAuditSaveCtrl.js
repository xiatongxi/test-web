angular.module('app.storage').controller("drugPurchaseAuditSaveCtrl", function($scope, $http, $stateParams, $filter, $uibModal, drugPurchaseAuditService, drugPurchaseService, APP_CONFIG,$rootScope) {

    $scope.drugPurchase={};
    $scope.loadDataById = function(id) {
        drugPurchaseService.loadDataById(id).then(function(data) {
            $scope.drugPurchase = data;
            // 审批判断节点使用
            $scope.drugPurchase.processDefinitionId = data.processDefinitionId;
            //审批详情 $scope.drugPurchase.applyNumber
            drugPurchaseAuditService.loadDataByApplyName($scope.drugPurchase.applyNumber).then(function(data) {
                $scope.auditList = data.auditList;
            },function(data){
            });
        },function(data){
        });
    };
    // 输入框禁止修改.
    $scope.saveFlag = false;
    $scope.isAudit = true;
    // 用于存放新增的数据
    $scope.addedDetail = [];
    // 查询子表的结构.
    drugPurchaseService.loadDetailDataById().then(function(data){
        $scope.drugPurchaseDetail = data;
        $scope.drugPurchaseDetail.zid = $stateParams.id;

        // 如果id不为0，说明是查询或者查看，需要查询后台.
        if ($stateParams.id != 0) {
            $scope.isNotEdit = true;
            if ($stateParams.isNotEdit == true) {
                $scope.loadDataById($stateParams.id);
            } else {
                //新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
                $scope.loadDataById($stateParams.id);
            }

            // 查询子表数据.
            drugPurchaseService.getDetailPageInfo($stateParams.id).then(function(data){
                $scope.detailPageInfo = data;
                for (var i=0; i < data.size; i++) {
                    $scope.total = $scope.addedDetail.push(data.list[i]);
                }
            }, function(data){
            });
        }
    }, function(data){
    });
    
    if ($stateParams.id != 0) {
        $scope.isAudit = $stateParams.isAudit;
        $scope.processInstanceId = $stateParams.processInstanceId;
        $scope.auditId = $stateParams.auditId;
    }

    //返回,取消
    $scope.retList = function () {
        $scope.drugPurchase = {};
        $scope.auditList = {};
        if ($rootScope.previousState_name != '') {
            $rootScope.back();
        } else {
            $state.go("app.storage.drug.purchaseAudit");
        }
    };
    
    // 选择审批人.
    $scope.choice = function(auditResult) {
		if ($scope.audit.content==null) {
            $scope.audit.content = '同意';
		 }
		$scope.modelItem = [];
		//'1':通过,'2':驳回,'3':拒绝
		$scope.modelItem.auditResult = auditResult;
		// 流程id
		$scope.modelItem.processInstanceId = $scope.processInstanceId;
        // 当前节点(processDefinitionId为空是员工提交->仓储部经理审批,为仓储部经理审批->库领导审批)
        $scope.modelItem.processDefinitionId = $scope.drugPurchase.processDefinitionId;
        // 展开药品采购详情.
        if ($stateParams.taskName === '仓储部经理审批') { //如果是仓储部经理审批说明是库主任在操作审批
            $scope.audit($scope.modelItem.auditResult, null);
        } else {
            var modalInstance = $uibModal.open({
                size : 'md',
                templateUrl: 'app/business/util/views/choiceAuditUser-view.html',
                controller: 'choiceAuditUserModalCtrl',
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

    };

    // 审批.
    $scope.audit = function (auditResult, assignee) {
    	if($scope.audit.content==null){
			alert("请填写审批意见");
		}else{
			
			$http({
				method: 'POST',
				url: APP_CONFIG.drugManageUrl + '/depot/business/drugPurchase/audit/audit',
				data: {
					drugPurchaseId : $scope.drugPurchase.id,
					result : auditResult,
					content : $scope.audit.content,
					processInstanceId : $scope.processInstanceId,
					id : $scope.auditId,
					assignee : assignee,
					userInfoJson : angular.toJson($rootScope.userInfo),
					orgInfoJson : angular.toJson($rootScope.orgInfo)
				}
			}).then(function successCallback(response) {
				// 请求成功执行代码
				alert("审批成功！");
			}, function errorCallback(response) {
				// 请求失败执行代码
				console.log(response);
			});
			
			// 返回到审批列表.
			$scope.retList();
		}
    };

});
