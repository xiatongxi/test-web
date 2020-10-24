"use strict";
angular.module('app.intelligent').controller("showProcessDetectionListModalCtrl", function($scope, $state, $rootScope,$uibModalInstance,items,bathcTaskSchemaService,$filter) {
    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    // 筛选条件
    $scope.search = {};

    // 加载列表
    $scope.loadData = function() {
        bathcTaskSchemaService.getDetectionHistory($scope.pageInfo, $scope.search,items).then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();

    // 清空搜索条件
    $scope.empty = function () {
        $scope.search.vcfcode = '';
        $scope.search.time = '';
        $scope.loadData();
    };

    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

    // 关闭模态窗口
    $scope.cancel = function() {
        $uibModalInstance.close();
    }

});