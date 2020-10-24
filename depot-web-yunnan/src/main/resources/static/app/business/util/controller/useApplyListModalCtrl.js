angular.module('app.business').controller("useApplyListModalCtrl",
    function($scope, $uibModalInstance, $filter, $http, $uibModal, drugUseApplyService, APP_CONFIG, items) {

        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        // 判断归还和领用登记
        if (items.restoring != undefined) {
            $scope.searchCondition = {state : 2, isUse: 0};//审批状态 0待提交，1审批中，2同意，3驳回，4拒绝   查询未领用 是否领用 0:已领用 1未领用
        } else {
            $scope.searchCondition = {state : 2, isUse: 1};//审批状态 0待提交，1审批中，2同意，3驳回，4拒绝   查询未领用 是否领用 0:已领用 1未领用
        }

        // 获取列表数据
        $scope.loadData = function() {
            drugUseApplyService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.searchCondition)
                .then(function(data) {
                    $scope.pageInfo = data;
                }).catch(function(data) {
                if (data.status == 601) {
                    // session失效，关闭模态框.
                    $uibModalInstance.close();
                }
            });
        };

        if (items != undefined && items != null) {
            if (items.applyNumber != undefined && items.applyNumber != null) {
                $scope.searchCondition.applyNumber = items.applyNumber;
            }
        }

        // 默认执行.
        $scope.loadData();

        // 翻页
        $scope.goPage = function(pageNum) {
            if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
                $scope.pageInfo.pageNum = pageNum;
                $scope.loadData(pageNum, 10, $scope.searchCondition);
            }
        };

        // 关闭模态窗口
        $scope.cancel = function() {
            $uibModalInstance.close();
        };

        // 选择
        $scope.selectUseApply = function(drugUseApply) {
            $uibModalInstance.close(drugUseApply);
        }


    });
