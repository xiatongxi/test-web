"use strict";
angular.module('app.storage').controller("fumigationProcessCtrl", function($scope, $http, $state, $rootScope, $uibModal,
		fumigationProcessService, enumService, StorehouseService, APP_CONFIG) {
	
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	
    // 获取列表数据
    $scope.loadData = function() {
    	fumigationProcessService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition, $rootScope.orgInfo.orgId).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }

    $scope.searchCondition = {};
    $scope.loadData();

    // 清空查询条件.
    $scope.clearConditions = function() {
    	$scope.searchCondition = {};
    	$scope.loadData();
    }
    
    // 熏蒸方案列表.
    $scope.getFumigationProgram = function() {
    	// 选择计划，选择后不能修改合同类型，粮食品种，明细品种，粮食等级，粮食性质.
		var params = [];
		params.type = "addProcess";
		var uibModalInstance = $uibModal.open({    
			size:'lg',  
            templateUrl: 'app/storage/fumigation/fumigationProgram/views/fumigation-pass-list-modal.html',
            controller: 'fumigationPassListModalCtrl',
            resolve: {
         	    // items是一个回调函数
               items: function () {
                   // 这个值会被模态框的控制器获取到
                   return params; 
               }
            }  
        }); 
		uibModalInstance.result.then(function (result) {
			if (result != null) {
				// 新增页面
				$state.go("app.storage.fumigationProcess.add", {id : 0, fumigateProgramId : result});
			}
	    }, function (reason) {    
	        console.log(reason);
	    });
	}
    
    // 编辑页面
    $scope.showEdit = function(fumigationProcess) {
        $state.go("app.storage.fumigationProcess.edit", {id : fumigationProcess.id});
    }
    
    // 查看页面
    $scope.showView = function(fumigationProcess) {
        $state.go("app.storage.fumigationProcess.view", {id : fumigationProcess.id});
    }
    
    // 删除.
    $scope.deleteById = function(fumigationProcess) {
    	fumigationProcessService.deleteById(fumigationProcess.id).then(function() {
    		$scope.loadData();
    		alert("删除成功！");
    	});
    }
    
    // 接收广播，切换仓房
    $scope.$on("storeChangeed", function(event, storehouseId) {
        $scope.searchCondition.houseId = storehouseId;
        $scope.loadData();
    })
    
    
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData();
     	}
	}

	// 粮食安全生产管理查看详情
    $scope.showSafeProduceView = function(fumigationProcess) {
        $state.go("app.storage.safeproduce.recordManage.fumigationProcess.view", {id : fumigationProcess.id});
    }
     
});