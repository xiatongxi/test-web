"use strict";
angular.module('app.intelligent').controller("recordCtrl", function($scope, $state,$stateParams, $rootScope,gasDetectionPlanService) {

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    // 筛选条件
    $scope.search = {};

    if ($stateParams.show == 'true') {
        $scope.isShow = true;
    }

    if ($stateParams.vCfCode){
        $scope.search.vCfCode = $stateParams.vCfCode.substr(1);
    }

    // 加载列表
    $scope.loadData = function() {
        gasDetectionPlanService.getGasDetectionPageInfo($scope.pageInfo, $scope.search).then(function(data){
                    $scope.pageInfo = data.data;
                },function(data){
                    // console.log(data);
                });
    };
    $scope.loadData();

    // 翻页
    $scope.goPage = function(pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

    // 清空搜索条件

    $scope.empty = function() {
        $scope.search.startTime = '';
        $scope.search.endTime = '';
        $scope.search.vCfCode = '';
        $scope.loadData();
    };

    // 返回,取消
    $scope.retList = function () {
        $rootScope.back();
    }
});