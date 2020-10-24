"use strict";

angular.module('app.intelligent')
.controller("aerationTaskControl", function($scope, $rootScope, $state, $http, $uibModal, $filter, homeWorkService,
		businessApprovalService, $stateParams, aerationTaskService, APP_CONFIG) {
	

	//通风申请列表数据查询
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.aerationTask = {vCfCode : ""};
    var orgId = $rootScope.depotInfo.orgId;
    var params = [];
    $scope.loadData = function() {
    	 //$stateParams.approvalState = 4; //审批通过的状态

		if($stateParams.aerationType == "fumigation"){
            homeWorkService.getFumigationProcessList($scope.pageInfo, $scope.storehouseId, orgId).then(function(data){
                $scope.pageInfo = data;
                params.dataType = "fumigationData";
            },function(data){
                console.log(data);
            });
		}else{
            aerationTaskService.getCtrlPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.aerationTask).then(function(data){
                $scope.pageInfo = data.data;
                console.log(data.data+"////");
            },function(data){
                console.log(data);
            });
		}
    };
    
    $scope.loadData();

    // 翻页
 	$scope.goPage = function(pageNum) {
 		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
      		$scope.pageInfo.pageNum = pageNum;
      		$scope.loadData();
      	}
 	}

    //新增或修改、查看跳转到编辑页面
    /*$scope.edit = function(id,butId,pageType,taskId,auditId) {
    	
    	$state.go('app.intelligent.aeration.plan.applyEdit',{id:id,butId:butId,pageType:pageType,taskId:taskId,auditId:auditId});
    }
*/
    $scope.edit = function(id) {
		params.id = id;

		var uibModalInstance = $uibModal.open({
            size:'lg',  
            templateUrl: 'app/intelligent/aeration/views/aerationTaskControlModal.html',
            controller: 'aerationTaskControlModalCtrl',
            resolve: {
            	// items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params; 
                }
            }  
		}); 
		/*uibModalInstance.result.then(function (result) {
			//$scope.cancel();
			$scope.loadData();
			alert(1);
	    }, function (reason) {
	        console.log(reason);
	    });*/
	}
    
    
 // 关闭模态窗口
	/*$scope.cancel = function() {
		$uibModalInstance.close();
	}*/

   

})
