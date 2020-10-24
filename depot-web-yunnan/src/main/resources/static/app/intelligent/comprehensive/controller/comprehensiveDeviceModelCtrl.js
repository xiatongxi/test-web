"use strict";
angular.module('app.intelligent').controller("comprehensiveDeviceModelCtrl", function ($scope, $state, $rootScope, $stateParams, $uibModal,$uibModalInstance,$filter,items,comprehensiveDeviceService) {

    // 定义对象
    $scope.device = {};
    $scope.vDeviceCode = "";
    $scope.vPattern = "";
        $scope.loadData = function() {
        comprehensiveDeviceService.getById(items).then(function(data){
            $scope.device = data.data;
            $scope.vDeviceCode = $rootScope.dicData[$scope.device.vDeviceCode];
            $scope.vPattern = $rootScope.dicData[$scope.device.vPattern];
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();

    // 关闭模态窗口
    $scope.cancel = function() {
        $uibModalInstance.close();
    }

});