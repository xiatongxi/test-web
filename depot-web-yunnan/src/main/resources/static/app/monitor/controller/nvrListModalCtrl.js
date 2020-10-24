angular.module('app.business').controller("nvrListModalCtrl",
    function($scope, $uibModalInstance, $filter, $http, $uibModal, $stateParams, nvrService, APP_CONFIG, items) {

    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.searchCondition = {};

    // 获取列表数据
    $scope.loadData = function() {
        nvrService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,undefined).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    };
    
    if (items != undefined && items != null) {
        if (items.billType != undefined && items.billType != null) {
            $scope.searchCondition.billType = items.billType;
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