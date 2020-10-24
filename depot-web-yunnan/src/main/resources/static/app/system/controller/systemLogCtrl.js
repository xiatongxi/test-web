"use strict";

angular.module('app.system').controller("systemLogCtrl",
    function($scope,$stateParams,$rootScope, systemLogService, APP_CONFIG) {

        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.search = {username:""};
        $scope.loadData = function() {
    		systemLogService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, 
    				$scope.search.username).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log(data);
            });
        }
        $scope.loadData();

        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }

    });
