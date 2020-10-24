"use strict";
angular.module('app.business').controller("planAuditPassSaveCtrl",
		function($scope, $http, $filter,$state, $stateParams, $rootScope,$uibModal, 
		        planService, enumService, APP_CONFIG) {
	
	$scope.addedDetail = [];
	$scope.isNotEdit = true;
	$scope.hidden=false; //明细按钮
	
	
    
    $scope.loadDataById = function(id, processInstanceId) {
        planService.loadDataById(id, processInstanceId).then(function(data){
            $scope.plan = data.plan;
            $scope.auditList = data.auditList;
            $scope.processDefinitionId = data.plan.processDefinitionId;
            $scope.processInstanceId = data.plan.processInstanceId;
            /*$scope.plan.storageBeginTime = $filter('date')($scope.plan.storageBeginTime, "yyyy-MM-dd"); 
            $scope.plan.storageEndTime = $filter('date')($scope.plan.storageEndTime, "yyyy-MM-dd"); 
            $scope.plan.salesBeginTime = $filter('date')($scope.plan.salesBeginTime, "yyyy-MM-dd"); 
            $scope.plan.salesEndTime = $filter('date')($scope.plan.salesEndTime, "yyyy-MM-dd");
            $scope.plan.createTime = $filter('date')($scope.plan.createTime, "yyyy-MM-dd");  */
            
            $scope.plan.jhnd = parseInt(data.plan.jhnd);
            $scope.plan.kszxrq = $filter('date')($scope.plan.kszxrq, "yyyy-MM-dd"); 
            $scope.plan.jzzxrq = $filter('date')($scope.plan.jzzxrq, "yyyy-MM-dd"); 
            
            // 附件.
            $scope.fileList = data.fileList;
            
            // 子表数据.
            $scope.storeWareDetailList = data.storeWareDetailList;
            for (var i=0; i < data.storeWareDetailList.length; i++) {
                $scope.addedDetail.push(angular.copy(data.storeWareDetailList[i]));
            }
            
            $scope.getAttributeData();
            $scope.getGrainDetailKind();
        },function(data){
        });
    }
    
    
    // 返回
    $scope.retList = function () {
    	/*if ($rootScope.previousState_name != '') {
        	if($rootScope.previousState_name.indexOf("app.additionalHome") != -1){//首页跳转的返回首页
        		$rootScope.isIndexPage = true;
        	}
            $rootScope.back();
        } else {
        	$state.go("app.business.plan-audit-pass");
        }*/

    	
        if ($rootScope.previousState_name != '') {
        	if($rootScope.previousState_name.indexOf("app.additionalHome") != -1){//首页跳转的返回首页
        		$rootScope.isIndexPage = true;
        	}
            $rootScope.back();
        } else {
        	
        	if($scope.attributeType==1){
                $state.go("app.business.grainReservesPlan-rotation-pass");
        	}else if($scope.attributeType==2){
                $state.go("app.business.grainReservesPlan-sales-pass");
        	}else if($scope.attributeType==3){
                $state.go("app.business.grainReservesPlan-acquisition-pass");
        	}else{
        		$state.go("app.business.plan-audit-pass");
        	}
        }
    }

	// 回显预览附件.
	$scope.showFile = function(filePath, originalFileName) {
		window.open(filePath);
	}
	
	// 下载文件
	$scope.download = function(filePath, originalFileName) {
		$("#filePath").val(filePath);
		$("#type").val("business");
		$("#download-form").attr("action", APP_CONFIG.businessUrl + '/download');
		$("#download-form").submit();
	}
	
	
    // 树形下拉框(粮食性质)
    $scope.getAttributeData = function() {
        enumService.getTreeList($scope.plan.grainAttribute, "grainAttribute").then(function(data) {
            $scope.grainAttributeTreeData = data;
        },function(data) {
            console.log(data);
        })
    }
    
    // 树形下拉框(明细品种)
    $scope.getGrainDetailKind = function() {
        enumService.getTreeListByTypeId ($scope.plan.grainDetailKind, $scope.plan.grainKind).then(function(data) {
            $scope.grainDetailKindTreeData = data;
        },function(data) {
            console.log(data);
        })
    };
    
    if ($stateParams.id != 0) {
        //新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
        $scope.loadDataById($stateParams.id, $stateParams.processInstanceId);
        //暂停、启用、终止 按钮的显示
        $scope.auditPass = true ;
        $scope.hidden=true; //隐藏明细按钮
        $scope.Edit = true;//不可更改计划类型
    }
    
    //----------------------------------暂停、启用、终止--------------------------------------
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
	
    // 获取列表数据
    $scope.loadData = function() {
        planService.getPassPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, null).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
    
    // 启用
    $scope.application = function(id) {
        $http({
            method: 'POST',
            url: APP_CONFIG.businessUrl + '/depot/business/plan/application',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            alert("启用成功！");
            $state.go("app.business.plan-audit-pass");
            // 重新加载数据
            $scope.loadData();
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
    }
    
    // 暂停
    $scope.discontinue = function(id) {
    	var params = [];
		params.id = id;
		params.type = "discontinue";
    	var uibModalInstance = $uibModal.open({
            size : 'md',  
            templateUrl: 'app/business/util/views/refuseReason-view.html',
            controller: 'refuseReasonCtrl',
            resolve: {
            	// items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params; 
                }
            }  
        });
    	uibModalInstance.result.then(function (result) {
    		if(result.returnType == "success"){
    			$state.go("app.business.plan-audit-pass");
    			$scope.loadData();
    		}
    		    
    		
	    }, function (reason) {    
	        console.log(reason);
	    });
        
    }
    
    //终止
    $scope.finish = function(id) {
    	var params = [];
    	params.id = id;
    	params.type = "finish";
    	var uibModalInstance = $uibModal.open({
    		size : 'md',  
    		templateUrl: 'app/business/util/views/refuseReason-view.html',
    		controller: 'refuseReasonCtrl',
    		resolve: {
    			// items是一个回调函数
    			items: function () {
    				// 这个值会被模态框的控制器获取到
    				return params; 
    			}
    		}  
    	});
    	uibModalInstance.result.then(function (result) {
    		if(result.returnType == "success"){
    			$state.go("app.business.plan-audit-pass");
    			$scope.loadData();
    		}
    		
    	}, function (reason) {    
    		console.log(reason);
    	});
    	
    }
    
    
});
