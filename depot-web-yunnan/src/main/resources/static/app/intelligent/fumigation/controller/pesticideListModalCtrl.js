angular.module('app.intelligent').controller("pesticideListModalCtrl",
    function($scope, $uibModalInstance, $filter, $http, $uibModal, $rootScope, fumigationPlanService, APP_CONFIG, items) {

    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.searchCondition = {};
    var orgId = $rootScope.depotInfo.orgId;
    $scope.storehouseObj = $rootScope.storehouseObj;

    // 获取列表数据
    $scope.loadData = function() {
        fumigationPlanService.getFumigationPlanList($scope.pageInfo, undefined, orgId, items.dataType).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    };

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
    
    // 选择计划，
    $scope.selectPlan = function(plan) {
        $uibModalInstance.close(plan);
    }
})
.controller("dcsqtinfoListModalCtrl",
function($scope, $uibModalInstance, $filter, $http, $uibModal, $rootScope, gasDetectionPlanService, APP_CONFIG, items) {

    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.searchCondition = {};
    var orgId = $rootScope.depotInfo.orgId;
    $scope.storehouseObj = $rootScope.storehouseObj;
    // $scope.searchCondition.vCfCode = items.houseId;

    // 获取列表数据
    $scope.loadData = function() {
        gasDetectionPlanService.getGasDetectionPageInfo($scope.pageInfo, $scope.searchCondition).then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    };

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

    // 选择计划，
    $scope.selectPlan = function(plan) {
        $uibModalInstance.close(plan);
    }
});