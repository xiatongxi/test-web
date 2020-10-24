"use strict";

angular.module('app.synth')
.controller("personSynthCtrl", function($scope, $rootScope, $state, keeperService, APP_CONFIG) {

	// 获取列表数据
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.search = {realName:""};
	$scope.loadData = function() {
		keeperService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.search.realName).then(function(data){
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
 
})

.controller("personSynthViewCtrl", 
	function($scope, $rootScope, $state, $stateParams, keeperService, psersonSynthService, APP_CONFIG) {

	// 获取数据
	$scope.loadData = function() {
		keeperService.findBasicKeeper($stateParams.id).then(function(data){
	        $scope.data = data;
	        $scope.age = new Date().getYear() - new Date(data.keeper.birthday).getYear();
	        // 获取仓房信息
	    	keeperService.getUnitStoreKeepList($stateParams.id, data.keeper.grainId).then(function(data){
	    		$scope.storeList = data.storeList;
	    	},function(data){
	    		console.log(data);
	    	});
	    	// 获取作业记录
	    	psersonSynthService.getCcZy(data.keeper.id).then(function(data) {
	    		$scope.worklist = data;
	    	})
	    },function(data){
	        console.log(data);
	    });
	}
	$scope.loadData();
	
	// 返回.
	$scope.retList = function() {
		$state.go("app.synth.person");
	}
})