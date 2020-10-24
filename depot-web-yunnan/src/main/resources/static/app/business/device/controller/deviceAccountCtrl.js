"use strict";
//器材信息
angular.module('app.business')
    .controller("deviceAccountCtrl", function($scope, $http,$state,$rootScope,deviceInputService,$stateParams, APP_CONFIG) {
    // 获取列表数据
     $scope.pageInfo = {pageNum : 1, pageSize : 10};
     $scope.device = {deviceType:""};
	 $scope.loadData = function() {
		 deviceInputService.getDeviceAccount($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.device.deviceType).then(function(data){
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
	    
	 // 查看页面
	    $scope.showViewInput = function(id) {
	    	$state.go('app.business.accountEdit',{id:id,isNotEdit:true});
	    }
	 
})
