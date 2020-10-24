angular.module('app.business').controller("deliveryStorageNoticeScheduleCtrl", function($scope, $http, $state, 
		deliveryStorageNoticeScheduleService, APP_CONFIG,$stateParams) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	
     // 获取列表数据
     $scope.loadData = function() {
         deliveryStorageNoticeScheduleService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
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
    $scope.showView = function(id, billType, processInstanceId) {
         if ($stateParams.SalesStatistics) {
             if (billType == "1") {
                 $state.go("app.supervise.decisionSupport.SalesStatistics.deliveryStorageNotice-schedule.storageNotice-view", {id : id, processInstanceId : processInstanceId});
             } else if (billType == "3") {
                 $state.go("app.supervise.decisionSupport.SalesStatistics.deliveryStorageNotice-schedule.deliveryNotice-view", {id : id, processInstanceId : processInstanceId});
             }
             return;
         }
        if (billType == "1") {
            $state.go("app.business.storageNotice-view", {id : id, processInstanceId : processInstanceId});
        } else if (billType == "3") {
            $state.go("app.business.deliveryNotice-view", {id : id, processInstanceId : processInstanceId});
        }else if(billType == "2"){
            $state.go("app.business.transferNotice-view", {id : id, processInstanceId : processInstanceId});
        }else{
            $state.go("app.business.lading-view", {id : id,type:0}); //自定义了一个参数
        }
    }
    
    
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData();
     	}
	}
     
});