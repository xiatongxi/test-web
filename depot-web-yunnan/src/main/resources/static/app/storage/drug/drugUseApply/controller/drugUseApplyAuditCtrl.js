angular.module('app.storage').controller("drugUseApplyAuditCtrl", function ($scope, $http, $state, $stateParams, drugUseApplyAuditService, $timeout) {
    // 获取列表数据
    $scope.searchCondition = {}; //applyNumber state
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    $scope.loadData = function () {
        drugUseApplyAuditService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function (data) {
            $scope.pageInfo = data;
        }, function (data) {
            console.log(data);
        });
    };
    $timeout(function () {
        $scope.loadData();
    }, 100);

    $scope.isNotEdit = true;

    // 审批页面.
    $scope.auditPage = function (drugUseApply) {
        if (drugUseApply.result != "待审批") {
            alert("您已经提交该数据，无法再次提交！");
            return;
        }
        $state.go("app.storage.drug.useApplyAudit-save", {
            id: drugUseApply.id,
            processInstanceId: drugUseApply.processInstanceId,
            taskId: drugUseApply.taskId,
            auditId: drugUseApply.auditId,
            taskName: drugUseApply.taskName
        });
    };

    // 审批查看页面.
    $scope.viewAuditPage = function (drugUseApply) {
        $state.go("app.storage.drug.useApplyAudit-view", {
            id: drugUseApply.id,
            processInstanceId: drugUseApply.processInstanceId,
            taskId: drugUseApply.taskId,
            auditId: drugUseApply.auditId
        });
    };

    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

});