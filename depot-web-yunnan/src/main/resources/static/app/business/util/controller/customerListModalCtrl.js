angular.module('app.business').controller("customerListModalCtrl", 
    function($scope, $uibModalInstance, $filter, $http, $uibModal,$rootScope, customerService, APP_CONFIG, items) {

    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.searchCondition = {};
    // 获取列表数据
    $scope.orgId=$rootScope.userInfo.orgId;
    $scope.loadData = function() {
        customerService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition, $scope.orgId)
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
    
    if (items != undefined) {
        if (items.type == "addBlacklist") {
            $scope.type = "addBlacklist";
            $scope.searchCondition.isInBlacklist = 0;
        }
    }
    $scope.loadData();
    
    
    // 翻页
    $scope.goPage = function(pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
             $scope.pageInfo.pageNum = pageNum;
             $scope.loadData();
         }
    }
    
    // 关闭模态窗口
    $scope.cancel = function() {
        $uibModalInstance.close();
    }
    
    // 选择.
    $scope.selectCustomer = function(customer) {
        $uibModalInstance.close(customer);
    }
     
     

});