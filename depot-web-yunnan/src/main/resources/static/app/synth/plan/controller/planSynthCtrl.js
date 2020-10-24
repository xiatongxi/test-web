"use strict";
angular.module('app.synth').controller("planSynthCtrl", function($scope, $http, $state, planSynthService, enumService, APP_CONFIG) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	
     // 获取列表数据
     $scope.loadData = function() {
         planSynthService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
             $scope.pageInfo = data;
         },function(data){
             console.log(data);
         });
     }
     
    $scope.searchCondition = {};
    $scope.loadData();
     
    
    // 查看页面
    $scope.showView = function(id) {
        $state.go("app.synth.plan-view", {id : id});
    }
    
    //清空
    $scope.clearConditions = function() {
    	$scope.searchCondition = {};
    	$scope.loadData();
    }
    
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData();
     	}
	}
     
});