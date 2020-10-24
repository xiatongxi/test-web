angular.module('app.storage').controller("drugPurchaseAuditCtrl", function($scope, $http, $state, $stateParams, drugPurchaseAuditService, $timeout) {
     // 获取列表数据
    $scope.searchCondition={}; //applyNumber auditState
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
     $scope.loadData = function() {
        drugPurchaseAuditService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
        },function(data) {
            console.log(data);
        });
    };
     // $scope.loadData();
    $timeout(function () {
        $scope.loadData();
    },100);

    $scope.isNotEdit = true;
    
    // 审批页面.
    $scope.auditPage = function(drugPurchase) {
        if (drugPurchase.result != "待审批") {
           alert("您已经提交该数据，无法再次提交！");
           return;
        }
        $state.go("app.storage.drug.purchaseAudit-save", {id : drugPurchase.id, processInstanceId : drugPurchase.processInstanceId, taskId : drugPurchase.taskId, auditId : drugPurchase.auditId,taskName: drugPurchase.taskName});
    };
    
    // 审批查看页面.
    $scope.viewAuditPage = function(drugPurchase) {
        $state.go("app.storage.drug.purchaseAudit-view", {id : drugPurchase.id, processInstanceId : drugPurchase.processInstanceId, taskId : drugPurchase.taskId, auditId : drugPurchase.auditId});
    };

    // 翻页
    $scope.goPage = function(pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };
    
});