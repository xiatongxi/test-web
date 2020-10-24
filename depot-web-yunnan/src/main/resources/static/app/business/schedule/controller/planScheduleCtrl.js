angular.module('app.business').controller("planScheduleCtrl", function($scope, $http, $state, $uibModal,
		planScheduleService, enumService, APP_CONFIG,$stateParams) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	
     // 获取列表数据
     $scope.loadData = function() {
         planScheduleService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
             $scope.pageInfo = data;
         },function(data){
             console.log(data);
         });
     }
     
    $scope.searchCondition = {};
    $scope.loadData();
    
    // 查看页面
    $scope.showView = function(id, processInstanceId) {
        // 粮食购销统计 计划执行进度详情
        if ($stateParams.SalesStatistics) {
            $state.go("app.supervise.decisionSupport.SalesStatistics.plan-schedule.plan-view",{id : id, processInstanceId : processInstanceId});
            return;
        }
        $state.go("app.business.plan-view",{id : id, processInstanceId : processInstanceId});
    };
    
    // 清空条件
    $scope.clearConditions = function() {
    	$scope.searchCondition = {};
    	$scope.loadData();
    }
    
    // 查看对应的合同的执行进度.
    $scope.showContractScheduleList = function(planBid) {
		var params = [];
		params.planBid = planBid;
		var uibModalInstance = $uibModal.open({    
		 size:'lg',  
            templateUrl: 'app/business/util/views/contract-schedule-list-modal.html',
            controller: 'contractScheduleListModalCtrl',
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
    
    // 查看对应的通知单的执行进度.
    $scope.showNoticeScheduleList = function(planBid) {
		var params = [];
		params.planBid = planBid;
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