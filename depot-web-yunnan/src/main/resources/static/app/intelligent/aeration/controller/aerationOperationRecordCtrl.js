"use strict";

angular.module('app.intelligent')
.controller("aerationOperationRecordCtrl", function($scope, $rootScope, $state, $http, $stateParams, 
		enumService, aerationTaskRecordService, APP_CONFIG) {

	
	//通风记录列表数据查询
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.operationRecord = {operationId : ""};
    $scope.loadData = function() {

    	aerationTaskRecordService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.operationRecord,'0').then(function(data){
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


    
    // 新增页面operationRecord
    $scope.showAdd = function() {
        $state.go("app.intelligent.aeration.control.operationRecord-add", {id: '0'});
    };
    // 编辑页面
    $scope.showEdit = function(id) {
        $state.go("app.intelligent.aeration.control.operationRecord-edit", {id: id});
    };
    // 查看页面
    $scope.showView = function(id) {
        $state.go("app.intelligent.aeration.control.operationRecord-view", {id: id});
    };
    
   // 删除一条记录.
    $scope.remove = function(id) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        aerationTaskRecordService.remove(id).then(function(data) {
            if (data.retCode == '200') {
                alert("删除成功！");
                $scope.loadData();
            } else {
                alert(data.message);
            }
        });
    };

    
})

.controller("aerationOperationRecordEditCtrl", function($scope, $filter,$state, $rootScope, $stateParams, APP_CONFIG, aerationTaskRecordService,aerationJobService,aerationTaskService) {
    // 防止重复提交标记
    $scope.saveFlag = false;
    $scope.isNotEdit = false;
    if ($scope.operationRecord == null) {
        $scope.operationRecord = {};
    }

    
    $scope.getJobNumber = function() {
    	aerationJobService.getPageInfo(null,null,null).then(function(data){
    		$scope.JobNumberList = data.data.list;
        },function(data){
            console.log(data);
        });
    }
    $scope.getJobNumber();
    
    $scope.getCh = function(zybh) {  
    	$scope.aerationJob = { taskNumber: zybh};
    	aerationJobService.getPageInfo(null,null,$scope.aerationJob).then(function(data){
    		if(data.data.total>0){
    			$scope.planNumber = data.data.list[0].aerationPlanNumber;
    			$scope.aerationTask= {areationPlanNumber:$scope.planNumber};
    			aerationTaskService.getPageInfo(null,null,$scope.aerationTask).then(function(datas){
    				if(data.data.total>0){
    					$scope.operationRecord.vCfCode = datas.data.list[0].vCfCode;
    				}
    				
    			},function(datas){
    				console.log(datas);
    			});
    		}
        },function(data){
            console.log(data);
        });
    }
    
    // 加载数据.
    $scope.loadDataById = function(id) {
    	aerationTaskRecordService.edit(id).then(function(data){
            $scope.operationRecord = data.data;
        },function(data){
        	console.log(data);
        });
    	
    }
    if ($stateParams.id != '0') { // 查看,修改
        $scope.isNotEdit = $stateParams.isNotEdit;
        $scope.loadDataById($stateParams.id);
    } 

    // 校验
    var validator = $("#operationRecord-form").validate();

    // 保存
    $scope.save = function () {
        if (!$scope.saveFlag) {
            if (validator.form()) {
                $scope.saveFlag = true;
                // 提交
                $scope.operationRecord.vUpdatePerson = $rootScope.userInfo.realName;
                $scope.operationRecord.orgId = $rootScope.orgInfo.orgId;
                $scope.operationRecord.vUpdateTime = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");

                aerationTaskRecordService.save($scope.operationRecord).then(function(data){
                    if (data.message == 'success' && data.retCode == '200') {
                        alert('保存成功!');
                        $scope.retList();
                    } else {
                        alert("保存失败！");
                        $scope.saveFlag = false;
                    }
                },function(data){
                    console.log(data);
                });
            }
        }
    };

    // 返回,取消
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
            $rootScope.back();
        } else {
            $state.go("app.intelligent.aeration.control.operationRecord");
        }
    }

});
