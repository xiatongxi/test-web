"use strict";
angular.module('app.synth').controller("barnSynthCtrl", function($scope, $http, $state, barnSynthService, enumService, APP_CONFIG) {

    // 获取列表数据
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.search = {realName:""};
    $scope.loadData = function() {
        barnSynthService.loadAllDataById($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.search.orgId,$scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
    $scope.loadData();

    // 查看页面
    $scope.showView = function(id) {
        $state.go("app.synth.barn.view", {id : id});
    }
    
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData();
     	}
	}
});