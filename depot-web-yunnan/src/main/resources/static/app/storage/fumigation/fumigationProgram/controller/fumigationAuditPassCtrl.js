"use strict";
angular.module('app.storage').controller("fumigationAuditPassCtrl",
		function($scope, $http, $state, $rootScope, $stateParams,
				fumigationAuditService, StorehouseService, APP_CONFIG) {
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
    // 获取列表数据
    $scope.loadData = function() {
    	fumigationAuditService.getPassPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
     
    // 获取基础数据
  	$scope.getBasicData = function() {
  		//按照单位获取单位下的仓房信息
  		var depotId = $rootScope.depotInfo.orgId;
  		StorehouseService.getStorehouseList(depotId).then(function(data){
  			$scope.storehouseList = data.houseList;
  			$scope.storehouseObj = data.houseObj;
  		},function (data) {
  			console.log(data);
  		});
  	}
  	
  	
    $scope.searchCondition = {};
    $scope.getBasicData();

    $scope.isNotEdit = true;
    
    // 清空查询条件.
    $scope.clearConditions = function() {
    	$scope.searchCondition = {};
    	$scope.loadData();
    }
    
    // 接收广播，切换仓房
    $scope.$on("storeChangeed", function(event, storehouseId) {
        $scope.searchCondition.houseId = storehouseId;
        $scope.loadData();
    })
    
    // 查看页面
    $scope.showView = function(fumigation) {
        $state.go("app.storage.fumigation-audit-pass-view", 
        		{id:fumigation.id, processInstanceId : fumigation.processInstanceId});
    }
    
    // 新增 熏蒸作业单
    $scope.addTaskList = function(fumigation) {
    	$state.go("app.storage.fumigationTaskList-add", 
        		{fumigateProgramBid : fumigation.id});
    }
    
    // 编辑熏蒸作业单
    $scope.editTaskList = function(fumigation) {
    	$state.go("app.storage.fumigationTaskList-edit", 
        		{id : fumigation.isHaveTaskList});
    }
    
    // 查看熏蒸作业单
    $scope.viewTaskList = function(fumigation) {
    	$state.go("app.storage.fumigationTaskList-view", 
        		{id : fumigation.isHaveTaskList});
    }
    
    
    
    // 新增 熏蒸作业记录
    $scope.addTaskRecord = function(fumigation) {
    	$state.go("app.storage.fumigationTaskRecord-add", 
        		{fumigateProgramBid : fumigation.id});
    }
    
    // 编辑熏蒸作业记录
    $scope.editTaskRecord = function(fumigation) {
    	$state.go("app.storage.fumigationTaskRecord-edit", 
        		{id : fumigation.isHaveTaskRecord});
    }
    
    // 查看熏蒸作业记录
    $scope.viewTaskRecord = function(fumigation) {
    	$state.go("app.storage.fumigationTaskRecord-view", 
        		{id : fumigation.isHaveTaskRecord});
    }
    
    
    // 翻页
    $scope.goPage = function(pageNum) {
    	if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
    		$scope.pageInfo.pageNum = pageNum;
    		$scope.loadData();
    	}
    }

    //判断是否显示返回按钮
    $scope.isShow = "0";
    if ($stateParams.id != 0) {
        $scope.searchCondition.houseId = $stateParams.id;
        $scope.isShow = "1";
        $scope.loadData();
    }else{
        $scope.loadData();
    }

    //返回上一个链接页面
    $scope.returnUp = function(){
        if($stateParams.homePage == "SY"){//判断是否是从首页进来
            $state.go('app.dashboard');
        }else {
            $state.go('app.supervise.cameraPT');
        }
    }
     
});