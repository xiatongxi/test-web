angular.module('app.storage').controller("drugPurchaseModalCtrl", 
    function($scope, $http, $state, $uibModalInstance,  $uibModal, APP_CONFIG) {
    
    // 获取列表数据
    $scope.loadData = function() {
        $http({
            method: 'GET',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugPurchase/getList',
            params: {
               pageNum : 1,
               pageSize : 10
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
        $uibModalInstance.close();
    };
    
    // 选择药品采购.
    $scope.selectDrugPurchase = function(drugPurchase) {
        $scope.drugPurchaseId = drugPurchase.id;
        // 展开药品采购详情.
        var modalInstance = $uibModal.open({
            size:'lg',  
            templateUrl: 'app/business/drug/drugPurchase/views/drugPurchaseDetail-view-list.html',
            controller: 'drugPurchaseDetailModalCtrl',
            resolve: {
                // items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return $scope.drugPurchaseId; 
                }
            }  
        });
        
        modalInstance.result.then(function (result) {
            result.drugPurchaseNumber = drugPurchase.applyNumber;
            result.drugPurchaseBid = drugPurchase.bid;
            // 关闭药品采购模态窗.
            $uibModalInstance.close(result);
        }, function (reason) {
            console.log(reason);
        });
    };
    
});