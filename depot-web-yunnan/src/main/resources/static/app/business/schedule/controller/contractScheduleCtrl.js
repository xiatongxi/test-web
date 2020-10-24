"use strict";
angular.module('app.business').controller("contractScheduleCtrl", function($scope, $http, $state, $uibModal,
		contractScheduleService, APP_CONFIG, $stateParams) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	
    // 获取列表数据
    $scope.loadData = function() {
    	contractScheduleService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition,$stateParams.contractType).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
    $scope.searchCondition = {};
    $scope.loadData();
    
    //清空
    $scope.clearConditions = function() {
    	$scope.searchCondition = {};
    	$scope.loadData();
    }
    
    
    // 查看页面
    $scope.showView = function(id, processInstanceId,contractType) {
    	if ($stateParams.SalesStatistics) {
            $state.go("app.supervise.decisionSupport.SalesStatistics.contract-schedule.contract-view", {id : id, processInstanceId : processInstanceId});
            return;
		}
        //$state.go("app.business.contract-view", {id : id, processInstanceId : processInstanceId});
    	if(contractType == 6913){
            $state.go("app.business.transferContract-view", {id : id, processInstanceId : processInstanceId});
        }else{
            $state.go("app.business.contract-view", {id : id, processInstanceId : processInstanceId});
        }
    };
    
    // 查看对应的通知单的执行进度.
    $scope.showNoticeScheduleList = function(rootContractBid) {
		var params = [];
		params.rootContractBid = rootContractBid;
		var uibModalInstance = $uibModal.open({    
			size:'lg',  
	            templateUrl: 'app/business/util/views/notice-schedule-list-modal.html',
	            controller: 'noticeScheduleListModalCtrl',
	            resolve: {
	         	    // items是一个回调函数
	               items: function () {
	                   // 这个值会被模态框的控制器获取到
	                   return params; 
	             }
	        }  
        }); 
		uibModalInstance.result.then(function (result) {
	    }, function (reason) {    
	        console.log(reason);
	    });
    }
    
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData();
     	}
	}
     
});