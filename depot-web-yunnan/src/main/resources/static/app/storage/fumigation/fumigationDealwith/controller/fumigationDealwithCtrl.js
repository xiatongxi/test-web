"use strict";
angular.module('app.storage').controller("fumigationDealwithCtrl", function($scope, $http, $state, $rootScope, $uibModal,
		fumigationDealwithService, enumService, StorehouseService, APP_CONFIG) {
	
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	
    // 获取列表数据
    $scope.loadData = function() {
    	fumigationDealwithService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $rootScope.orgInfo.orgId).then(function(data){
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
		var params = [];
		params.type = "addDealwith";
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
				$state.go("app.storage.fumigationDealwith.add", {id : 0, fumigateProgramId : result});
			}
	    }, function (reason) {    
	        console.log(reason);
	    });
	}
    
    // 编辑页面
    $scope.showEdit = function(fumigationDealwith) {
        $state.go("app.storage.fumigationDealwith.edit", {id : fumigationDealwith.id});
    }
    
    // 查看页面
    $scope.showView = function(fumigationDealwith) {
        $state.go("app.storage.fumigationDealwith.view", {id : fumigationDealwith.id});
    }
    
    // 删除.
    $scope.deleteById = function(fumigationDealwith) {
    	fumigationDealwithService.deleteById(fumigationDealwith.id).then(function() {
    		$scope.loadData();
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

	// 粮食安全生产管理善后详情
    $scope.showSafeProduceView = function(fumigationDealwith) {
        $state.go("app.storage.safeproduce.recordManage.fumigationDealWith.view", {id : fumigationDealwith.id});
    }
     
});