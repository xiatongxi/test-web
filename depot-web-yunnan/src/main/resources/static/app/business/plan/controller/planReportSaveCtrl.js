"use strict";
angular.module('app.business').controller("planReportSaveCtrl", function($scope,$rootScope, $filter,$http, $state, $uibModal,
		planService, enumService, $stateParams, APP_CONFIG) {
	
	
	// 子表数据模型.
	$scope.planDetail = {};
    // 用于存放 子表数据 的数组.
    $scope.addedDetail = [];
    
    // 查看
    $scope.loadDataById = function(id,processInstanceId) {
    	planService.loadDataById(id,processInstanceId).then(function(data){
            $scope.plan = data.plan;
            $scope.fileList = data.fileList;
            $scope.auditList = data.auditList;
            
            $scope.processDefinitionId = data.plan.processDefinitionId;
            $scope.processInstanceId = data.plan.processInstanceId;
            
            // 子表数据.
            $scope.storeWareDetailList = data.storeWareDetailList;
            for (var i=0; i < data.storeWareDetailList.length; i++) {
            	
                $scope.addedDetail.push(angular.copy(data.storeWareDetailList[i]));
                
            }

            $scope.plan.jhnd = parseInt(data.plan.jhnd);
            $scope.plan.kszxrq = $filter('date')($scope.plan.kszxrq, "yyyy-MM-dd"); 
            $scope.plan.jzzxrq = $filter('date')($scope.plan.jzzxrq, "yyyy-MM-dd"); 
            //$scope.plan.salesBeginTime = $filter('date')($scope.plan.salesBeginTime, "yyyy-MM-dd"); 
            //$scope.plan.salesEndTime = $filter('date')($scope.plan.salesEndTime, "yyyy-MM-dd");
            $scope.getAttributeData();
            $scope.getGrainDetailKind();
    	},function(data){
            console.log(data);
        });
    }
     
    
    if ($stateParams.id != 0) {
        //查看
    	$scope.isNotEdit = $stateParams.isNotEdit;
    	$scope.loadDataById($stateParams.id,$stateParams.processInstanceId);
    }
    
    
 // 树形下拉框(粮食性质)
    $scope.getAttributeData = function() {
        enumService.getTreeList($scope.plan.grainAttribute, "grainAttribute").then(function(data) {
            $scope.grainAttributeTreeData = data;
        },function(data) {
            console.log(data);
        })
    };
    
    // 树形下拉框(明细品种)
    $scope.getGrainDetailKind = function() {
        enumService.getTreeListByTypeId ($scope.plan.grainDetailKind, $scope.plan.grainKind).then(function(data) {
            $scope.grainDetailKindTreeData = data;
        },function(data) {
            console.log(data);
        })
    };
    
     

    /*// 点击上报，修改其状态
    $scope.report = function(id) {
        alert("点击上报后不可再取消，确认上报");
        $http({
            method: 'POST',
            url: APP_CONFIG.businessUrl + '/depot/business/plan/updatePlanStatus',
            data: {
            	id : id,
            	status : 10
            }
        }).then(function successCallback(response) {
           if (response.data.success == 'success') {
               // 请求成功执行代码
               // 重新加载数据
        	   $scope.loadData();
               alert("上报成功！");
           } else {
               //alert(response.data.msg);
           }
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
       
    }*/
    

    // 返回
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
        	if($rootScope.previousState_name.indexOf("app.additionalHome") != -1){//首页跳转的返回首页
        		$rootScope.isIndexPage = true;
        	}
        	$rootScope.back();
        } else {
        	$state.go("app.business.plan-report");
        }
    }
     
    
 // 下载文件
	$scope.download = function(filePath, originalFileName) {
		$("#filePath").val(filePath);
		$("#type").val("business");
		$("#originalFileName").val(originalFileName);
		$("#download-form").attr("action", APP_CONFIG.businessUrl + '/download');
		$("#download-form").submit();
	}
     
	// 回显预览.
	$scope.showFile = function(filePath, originalFileName) {
		window.open(filePath);
	}
     
});