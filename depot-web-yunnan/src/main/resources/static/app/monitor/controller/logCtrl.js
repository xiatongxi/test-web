"use strict";

angular.module('app.log')
    .controller("logCtrl", function($scope, $http, $state,logService, APP_CONFIG) {
        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.loadData = function() {
        	logService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.ip, $scope.operaMan, $scope.operaDepartment, $scope.level)
            .then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log();
            });
        };
        $scope.loadData();

        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        };
    });