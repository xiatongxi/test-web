"use strict";
angular.module('app.intelligent').controller("insideCirculationHistoryCtrl", function ($scope, $state, $rootScope, $stateParams, $uibModal,insideCirculationService) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {};

    // 加载列表
    $scope.loadData = function () {
    	insideCirculationService.getJobHistoryPageInfo($scope.pageInfo, $scope.search,$rootScope.orgInfo.orgId).then(function (data) {
            $scope.pageInfo = data.data;
        }, function (data) {
            console.log(data);
        });
    };
    $scope.loadData();

    // 清空搜索条件
    $scope.empty = function () {
        $scope.search.vcfcode = '';
        $scope.loadData();
    };

    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

});