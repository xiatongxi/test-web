"use strict";
angular.module('app.intelligent').controller("warningThresholdCtrl", function ($scope, $state, $rootScope,$stateParams, warningThresholdService) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {};

    $scope.isShow = $stateParams.isShow;

    if ($stateParams.vCfCode){
        $scope.search.vCfCode = $stateParams.vCfCode.substr(1);
    }
    if ($stateParams.houseId != null && $stateParams.houseId != '') {
        $scope.search.vCfCode = $stateParams.houseId;
    }
    // 加载列表
    $scope.loadData = function () {
        if($scope.search.searchStartDate > $scope.search.searchEndDate){
            alert("开始时间不能大于结束时间，请重新选择后再查询！");
            return;
        }
        warningThresholdService.getInsectPestDetectionPageInfo($scope.pageInfo, $scope.search,$stateParams.showType).then(function (data) {
            $scope.pageInfo = data.data;
        }, function (data) {
            // console.log(data);
        });
    };
    $scope.loadData();

    // 清空搜索条件
    $scope.emptyTime = function () {
        $scope.search.searchEndDate = '';
        $scope.search.searchStartDate = '';
        $scope.search.state = '';
        $scope.search.vCfCode = '';
        $scope.loadData();
    };

    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };
    // 打印 导出PDF
    $scope.print = function() {
        $("#print").printArea();
    };

    // 返回,取消
    $scope.retList = function () {
        $rootScope.isIndexPage = true;
        $rootScope.back();
    }

});