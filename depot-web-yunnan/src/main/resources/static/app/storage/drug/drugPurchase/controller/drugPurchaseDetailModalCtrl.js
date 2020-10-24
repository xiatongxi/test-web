angular.module('app.storage').controller("drugPurchaseDetailModalCtrl", 
    function($scope, $http, $state, $uibModalInstance, APP_CONFIG, items) {
    // items为上一个模态窗穿过来的drugPurchaseId
    // 获取列表数据
    $scope.loadData = function() {
        $http({
            method: 'GET',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugPurchaseDetail/getList',
            params: {
               pageNum : 1,
               pageSize : 10,
               zid : items
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            $scope.pageInfo = response.data;
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
    };
    
    $scope.loadData();

    // 关闭模态窗口
    $scope.cancel = function() {
        // close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
        $uibModalInstance.close();
    };
    
    // 选择药剂采购申请.
    $scope.selectDrugPurchaseDetail = function(drugPurchaseDetail) {
        // 关闭模态窗.
        $uibModalInstance.close(drugPurchaseDetail);
    };
});