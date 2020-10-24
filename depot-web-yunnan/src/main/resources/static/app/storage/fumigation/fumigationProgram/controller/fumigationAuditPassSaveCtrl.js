"use strict";
angular.module('app.storage').controller("fumigationAuditPassSaveCtrl",
		function($scope, $http, $filter, $stateParams, $state, $rootScope, 
				fumigationService, StorehouseService, APP_CONFIG) {
	
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
	$scope.getBasicData();
	
	
    $scope.loadDataByIdAndPID = function(id, processInstanceId) {
        fumigationService.loadDataByIdAndPID(id, processInstanceId).then(function(data){
            $scope.fumigation = data.fumigationProgram;
            $scope.auditList = data.auditList;
            $scope.processDefinitionId = data.fumigationProgram.processDefinitionId;
            $scope.processInstanceId = data.fumigationProgram.processInstanceId;
            // 保管员列表.
            $scope.keeperList = [];
            $scope.keeperList.push(data.keeper);
            
            $scope.fumigation.insectProductTime = $filter('date')($scope.fumigation.insectProductTime, "yyyy-MM-dd"); 
            $scope.fumigation.storageTime = $filter('date')($scope.fumigation.storageTime, "yyyy-MM-dd"); 
            $scope.fumigation.lastTimeFumigation = $filter('date')($scope.fumigation.lastTimeFumigation, "yyyy-MM-dd"); 
            $scope.fumigation.circulationTime = $filter('date')($scope.fumigation.circulationTime, "yyyy-MM-dd"); 
            $scope.fumigation.bulkGasDate = $filter('date')($scope.fumigation.bulkGasDate, "yyyy-MM-dd"); 
            $scope.fumigation.bulkGasDate = $filter('date')($scope.fumigation.bulkGasDate, "yyyy-MM-dd"); 
            $scope.fumigation.createTime = $filter('date')($scope.fumigation.createTime, "yyyy-MM-dd"); 
        },function(data){
        });
    }
    
    $scope.isNotEdit = true;
    
    if ($stateParams.id != 0) {
        $scope.loadDataByIdAndPID($stateParams.id, $stateParams.processInstanceId);
    }
    
    $scope.retList = function () {
        
    	if ($stateParams.type=="todo") {
    		// 返回用户待办页
    		$scope.fumigation = {};
    		$state.go("app.business.handle-view");
    	} else if ($stateParams.type=="complete") {
    		// 返回用户已办页
    		$scope.fumigation = {};
    		$state.go("app.business.handles-view");
    	} else {
    		// 返回熏蒸审批页.
    		$scope.fumigation = {};
    		$state.go("app.storage.fumigation-audit-pass");
    	}
    }
});
