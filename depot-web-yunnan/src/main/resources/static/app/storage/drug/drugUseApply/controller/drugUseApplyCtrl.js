angular.module('app.storage').controller("drugUseApplyCtrl", function ($scope, $rootScope, $http, $state, drugUseApplyService,
                                                                        APP_CONFIG, codeRuleService, $uibModal) {
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    $scope.searchCondition = {drugKind: "", drugName: "", startTime: "", endTime: ""};

    // 获取列表数据
    $scope.loadData = function () {
        drugUseApplyService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function (data) {
            $scope.pageInfo = data;
        }, function (data) {
            console.log(data);
        });
    };
    $scope.loadData();

    // 新增页面
    $scope.showAdd = function () {
        $state.go("app.storage.drug.useApply.edit", {id: 0});
    };

    // 编辑页面
    $scope.showEdit = function (id) {
        $state.go("app.storage.drug.useApply.edit", {id: id, updateUser: 1});//为时1修改
    };

    // 查看页面
    $scope.showView = function (id) {
        $state.go("app.storage.drug.useApply.view", {id: id, check: 2});//为时2查看
    };

    // 删除一条记录
    $scope.delete = function (drugUseApplyId) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        drugUseApplyService.deleteDataById(drugUseApplyId).then(function (data) {
            if (data.status === 'success') { // 请求成功
                alert("删除成功！");
                $scope.loadData(); // 重新加载数据
            } else {
                alert("数据有误,删除失败！");
            }
        }, function (data) {
            console.log(data);
        });
    };

    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

    //暂时使用标记流程,选择审批人
    $scope.showSubmit = function (drugUseApply) {
        if (drugUseApply.state != "0" && drugUseApply.state != "3") {
            alert("您已经提交该数据，无法再次提交！");
            return;
        } else {
            $scope.modelItem = [];
            $scope.modelItem.processInstanceId = drugUseApply.processInstanceId;
            // 审批状态("0"待提交,"1"审批中,"2"审批结束,"3"审批驳回,"4"审批拒绝.)
            $scope.modelItem.auditState = drugUseApply.state;
            // 展开下一个审批人模态框.
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
                    $scope.submit(drugUseApply, result.assignee);
                } else if (result.returnType == "isEnd") {
                }
            }, function (reason) {
                console.log(reason);
            });
        }

    };
    //提交 assignee 为userId
    $scope.submit = function (drugUseApply, assignee) {
        drugUseApplyService.updateAuditState(drugUseApply, assignee).then(function (data) {
            if (data.status == "success") {
                alert("提交成功！");
                $scope.loadData();
            } else {
                alert(data.msg);
            }
        }, function (data) {
            console.log(data);
        });
    };

});