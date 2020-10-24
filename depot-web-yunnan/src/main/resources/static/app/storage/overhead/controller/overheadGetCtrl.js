"use strict";

angular.module('app.storage')
.controller("overheadGetCtrl", function($scope, commonUtilService, $rootScope, $state, $uibModal, enumService, overheadSetService, APP_CONFIG) {

	 $scope.linDcsl = [];
	 // 获取列表数据
	 var pattern = /(\d{4})(\d{2})(\d{2})/;
	 $scope.pageInfo = {pageNum : 1, pageSize : 10};
	 //查询分页
	 $scope.searchCondition = {
			 applyTimeA : "",
			 applyTimeB : "",
			 lhEndA : "",
			 lhEndB : ""
		};
     $scope.loadData = function() {
    	 overheadSetService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition.applyTimeA,
    			 $scope.searchCondition.applyTimeB, $scope.searchCondition.lhEndA, $scope.searchCondition.lhEndB).then(function(data){
    			$.ajax({
    	            type: "GET",
    	            dataType: "json",
    	            async: false,
    	            url: APP_CONFIG.qualitycheckUrl + '/StorageOverheadSetController/findHwxz',
    	            data: {
    	            	pageNum : $scope.pageInfo.pageNum,
    	            	pageSize : $scope.pageInfo.pageSize,
    	            	overheadGetJson : angular.toJson(data)
    	            },
    	            success: function (dat) {
    	            	$scope.pageInfo = dat;
    	            }
    	        });
    	 },function(data){
    		 console.log(data);
    	 });
     }
   //清空
     $scope.clearConditions = function() {
     	$scope.loadData();
     }
     $scope.loadData();
})