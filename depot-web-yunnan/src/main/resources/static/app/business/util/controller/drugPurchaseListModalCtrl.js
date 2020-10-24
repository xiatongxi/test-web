angular.module('app.business').controller("drugPurchaseListModalCtrl",
    function($scope, $uibModalInstance, $filter, $http, $uibModal, drugInfoService, APP_CONFIG, items) {

        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.searchCondition = {};//搜索条件

        // 获取列表数据
        $scope.loadData = function() {
            drugInfoService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.searchCondition)
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
            if (items.drugNumber != undefined && items.drugNumber != null) {
                $scope.searchCondition.drugNumber = items.drugNumber;
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
        $scope.selectDrugInfo = function(drugInfo) {
            $uibModalInstance.close(drugInfo);
        }


    });
