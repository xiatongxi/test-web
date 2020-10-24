angular.module('app.storage').controller("drugUseApplyAuditSaveCtrl", function ($scope, $http, $stateParams, $filter, $uibModal, drugUseApplyAuditService, drugUseApplyService, APP_CONFIG, $rootScope, drugShelfService) {

    $scope.applyNumber = {};
    $scope.applyUser = {};
    $scope.drugUseApply = {};
    $scope.loadDataById = function (id) {
        drugUseApplyService.loadDataById(id).then(function (data) {
            $scope.drugUseApply = data.drugUseApply;
            $scope.applyUser = $scope.drugUseApply.applyUser;
            $scope.addedDetail = data.detailList;
            $scope.drugUseApply.useDate = $filter('date')($scope.drugUseApply.useDate, "yyyy-MM-dd");
            $scope.drugUseApply.createTime = $filter('date')($scope.drugUseApply.createTime, "yyyy-MM-dd");
            // 审批判断节点使用
            $scope.drugUseApply.processDefinitionId = data.drugUseApply.processDefinitionId;
            //审批详情
            drugUseApplyAuditService.loadDataByApplyName($scope.drugUseApply.applyNumber).then(function (data) {
                $scope.auditList = data.auditList;
            }, function (data) {
            });
        }, function (data) {
        });
    };
    $scope.loadDataById($stateParams.id);

    // 获取货架号数据
    $scope.getShelfData = function () {
        drugShelfService.getShelfMap().then(function (data) {
            $scope.shelfMap = data;
        }, function (data) {
            console.log(data);
        });
    };
    $scope.getShelfData();

    // 输入框禁止修改.
    // $scope.saveFlag = false;
    $scope.isAudit = true;
    $scope.isNotEdit = true;
    // 用于存放新增的数据
    $scope.addedDetail = [];

    if ($stateParams.id != 0) {
        $scope.isAudit = $stateParams.isAudit;
        $scope.processInstanceId = $stateParams.processInstanceId;
        $scope.auditId = $stateParams.auditId;
    }

    //返回,取消
    $scope.retList = function () {
        $scope.drugUseApply = {};
        $scope.auditList = {};
        if ($rootScope.previousState_name != '') {
            $rootScope.back();
        } else {
            $state.go("app.storage.drug.useApplyAudit");
        }
    };

    // 选择审批人.
    $scope.choice = function (auditResult) {
        if ($scope.audit.content == null) {
            $scope.audit.content = '同意';
        }
        $scope.modelItem = [];
        $scope.modelItem.auditResult = auditResult;
        $scope.modelItem.processInstanceId = $scope.processInstanceId;
        // 当前节点(processDefinitionId为空是员工提交->仓储部经理审批,为仓储部经理审批->库领导审批)
        $scope.modelItem.processDefinitionId = $scope.drugUseApply.processDefinitionId;
        // 展开药品申请详情.
        if ($stateParams.taskName === '仓储部经理审批') { //如果是仓储部经理审批说明是库主任在操作审批
            $scope.audit($scope.modelItem.auditResult, null);
        } else {
            var modalInstance = $uibModal.open({
                size: 'md',
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
                }
            }, function (reason) {
                console.log(reason);
            });
        }

    };


    // 审批.
    $scope.audit = function (auditResult, assignee) {
        if ($scope.audit.content == null) {
            alert("请填写审批意见");
        } else {

            $http({
                method: 'POST',
                url: APP_CONFIG.drugManageUrl + '/depot/business/drugUseApply/audit/audit',
                data: {
                    drugUseApplyId: $scope.drugUseApply.id,
                    result: auditResult,
                    content: $scope.audit.content,
                    processInstanceId: $scope.processInstanceId,
                    id: $scope.auditId,
                    assignee: assignee,
                    userInfoJson: angular.toJson($rootScope.userInfo),
                    orgInfoJson: angular.toJson($rootScope.orgInfo)
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
