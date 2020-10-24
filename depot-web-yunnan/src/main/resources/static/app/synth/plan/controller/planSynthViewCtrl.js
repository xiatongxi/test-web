"use strict";
angular.module('app.synth').controller("planSynthViewCtrl", 
		function($scope, $state, $rootScope, $filter, $http, $stateParams, 
				planSynthService, deliveryStorageNoticeService, APP_CONFIG) {
    $scope.loadDataById = function(id) {
    	planSynthService.loadDataById(id).then(function(data){
            $scope.plan = data.plan;
            $scope.planList = data.planList;
            $scope.contractFirstDate = data.contractFirstDate;
            $scope.noticeFirstDate = data.noticeFirstDate;
        },function(data){
        });
    }
    
    if ($scope.plan == null) {
        $scope.plan = {};
    }
    
    $scope.searchCondition = {};
    if ($stateParams.id != 0) {
    	$scope.planBid = $stateParams.id;
    	$scope.searchCondition.planBid = $stateParams.id;
        $scope.loadDataById($stateParams.id);
    }
    

    // 返回
    $scope.retList = function () {
        // console.log($rootScope.previousState_name); 这个是来的路由
        // console.log($rootScope.previousState_params); 这个暂时不知道.
        /*if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go("app.synth.plan");
        }*/
    	$state.go("app.synth.plan");
    }

    // 获取计划列表数据
    $scope.getPlanList = function() {
    	$(".saf-asc-row4 table").hide();
		$("#planTableId").show();
    }
    
    // 获取合同列表数据
    $scope.getContractList = function() {
    	if ($scope.contractList != undefined && $scope.contractList != null && $scope.contractList != '') {
    		$(".saf-asc-row4 table").hide();
			$("#contractTableId").show();
    	} else {
    		$http({
    			method: 'GET',
    			url: APP_CONFIG.baseUrl + '/depot/business/contract/getAuditPassList',
    			params: {
    				pageNum : 1,
    				pageSize : 99,
    				planBid : $scope.planBid
    				//inApplication : 1 // 只查询应用中的
    			}
    		}).then(function successCallback(response) {
    			// 请求成功执行代码
    			$scope.contractList = response.data;
    			$(".saf-asc-row4 table").hide();
    			$("#contractTableId").show();
    		}, function errorCallback(response) {
    			// 请求失败执行代码
    			console.log(response);
    		});
    	}
    }
    
    // 获取通知单列表数据
    $scope.getNoticeList = function() {
    	if ($scope.noticeList != undefined && $scope.noticeList != null && $scope.noticeList != '') {
    		$(".saf-asc-row4 table").hide();
			$("#noticeTableId").show();
    	} else {
    	    // 获取列表数据
	        deliveryStorageNoticeService.getPassPageInfo(1, 99, $scope.searchCondition).then(function(data) {
	        	// 请求成功执行代码
    			$scope.noticeList = data;
    			$(".saf-asc-row4 table").hide();
    			$("#noticeTableId").show();
	        },function(data){
	        });
    	}
    }
    
    
    $scope.showView = function(type, id, processInstanceId, billType) {
    	if (type == "plan") {
    		$state.go("app.business.plan-view",{id : id, processInstanceId : processInstanceId});
    	} else if (type == "contract") {
    		$state.go("app.business.contract-audit-pass-view",{id : id, processInstanceId : processInstanceId});
    	} else if (type == "notice") {
    		if (billType == "1") {
                $state.go("app.business.storageNotice-view", {id : id, processInstanceId : processInstanceId});
            } else if (billType == "3") {
                $state.go("app.business.deliveryNotice-view", {id : id, processInstanceId : processInstanceId});
            }
    	}
    }
    
    
     
    
    
});
