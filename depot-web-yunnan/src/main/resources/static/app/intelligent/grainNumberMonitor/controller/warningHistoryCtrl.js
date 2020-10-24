"use strict";
angular.module('app.intelligent').controller("warningHistoryCtrl", function($scope, $rootScope, monitorWarningService) {
    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    // 筛选条件
    $scope.search = {};

    // 加载列表
    $scope.loadData = function() {
        monitorWarningService.getWarningHistoryPageInfo($scope.pageInfo, $scope.search).then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();

    // 清空
    $scope.empty = function() {
        $scope.search.vcfcode = '';
        $scope.search.startTime = '';
        $scope.search.endTime = '';
        $scope.loadData();
    };

    // 翻页
    $scope.goPage = function(pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

});