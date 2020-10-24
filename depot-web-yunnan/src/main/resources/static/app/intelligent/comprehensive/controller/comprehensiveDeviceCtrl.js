"use strict";
angular.module('app.intelligent').controller("comprehensiveDeviceCtrl", function ($scope, $state, $rootScope, $stateParams, $uibModal,comprehensiveDeviceService) {

    //通风记录列表数据查询
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.search = {vcfcode : "", vDistinguishState : ""};
    $scope.loadData = function() {
        comprehensiveDeviceService.getPageInfo($scope.pageInfo, $scope.search).then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    }
    $scope.loadData();

    // 清空搜索时间
    $scope.empty = function() {
        $scope.search.vcfcode = '';
        $scope.search.vDistinguishState = '';
        $scope.loadData();
    };

    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };
    // 返回,取消
    $scope.retList = function () {
        $rootScope.back();
    }

    // 详情
    $scope.detail = function (deviceId) {
        $uibModal.open({
            size:'lg',
            templateUrl: 'app/intelligent/comprehensive/views/comprehensiveDevice-model.html',
            controller: 'comprehensiveDeviceModelCtrl',
            resolve: {
                // 传入参数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return deviceId;
                }
            }
        });
    };

});