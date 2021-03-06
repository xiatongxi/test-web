angular.module('app.business').controller("acceprancePlanListModalCtrl",
    function($scope, $uibModalInstance, $filter, $http, $uibModal, acceptanceService, APP_CONFIG, items) {

        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.searchCondition = {};
        $scope.searchCondition = {executeType:3156,customerPlanState:50}; //轮换计划,上报通过的

        // 获取列表数据
        $scope.loadData = function(pageNum, pageSize, searchCondition) {
            acceptanceService.getPassStartPageInfo(pageNum, pageSize, searchCondition)
                .then(function(data) {
                    $scope.pageInfo = data;
                })
                .catch(function(data) {
                    if (data.status == 601) {
                        // session失效，关闭模态框.
                        $uibModalInstance.close();
                    }
                });
        }

        if (items != undefined && items != null) {
            if (items.billType != undefined && items.billType != null) {
                $scope.searchCondition.billType = items.billType;
            }
        }

        // 默认执行.
        $scope.loadData(1, 10, $scope.searchCondition);

        // 翻页
        $scope.goPage = function(pageNum) {
            if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
                $scope.pageInfo.pageNum = pageNum;
                $scope.loadData(pageNum, 10, $scope.searchCondition);
            }
        }

        // 关闭模态窗口
        $scope.cancel = function() {
            $uibModalInstance.close();
        }

        // 选择计划，
        $scope.selectPlan = function(plan) {
            $uibModalInstance.close(plan);
        }


    });