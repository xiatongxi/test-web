"use strict";

angular.module('app.intelligent')
.controller("aerationTaskRecordCtrl", function($scope, $rootScope, $state, $http, $stateParams, 
		enumService, aerationTaskRecordService, APP_CONFIG) {

	

	//通风记录列表数据查询
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.aerationTaskRecord = {vCfCode : "", vDevKindCode : ""};
    $scope.loadData = function() {
    	
    	aerationTaskRecordService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.aerationTaskRecord).then(function(data){
    		$scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    }

    $scope.loadData();

    // 翻页
 	$scope.goPage = function(pageNum) {
 		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
      		$scope.pageInfo.pageNum = pageNum;
      		$scope.loadData();
      	}
 	}


    //新增、查看或修改跳转到编辑页面
    $scope.edit = function(id,butId) {
    	$state.go('app.storage.taskDispatch.aerationTaskRecordEdit',{id:id,butId:butId});
    }
    
})
