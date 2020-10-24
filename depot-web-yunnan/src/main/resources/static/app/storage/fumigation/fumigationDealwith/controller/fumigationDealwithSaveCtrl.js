"use strict";
angular.module('app.storage').controller("fumigationDealwithSaveCtrl",
		function($scope, $filter, $http, $stateParams, $state, $rootScope, $uibModal,
				fumigationDealwithService, fumigationService, paymentService,
				commonUtilService, StorehouseService, APP_CONFIG) {
	
    $(document).ready(function() {
        $("#dtBox").DateTimePicker({
        });
    });

    
	$scope.fumigation = {};
	$scope.fumigationDealwith = {};
	
	// 获取仓房数据
	$scope.getBasicData = function() {
		//按照单位获取单位下的仓房信息
		$scope.storehouseList = $rootScope.storelist;
		$scope.storehouseObj = $rootScope.storehouseObj;
	}
	
    $scope.loadDataById = function(id) {
    	fumigationDealwithService.loadDataById(id).then(function(data){
            $scope.fumigation = data.fumigationProgram;
            $scope.fumigationDealwith = data.fumigationDealwith;
            $scope.fumigationProcess = data.fumigationProcess;
            
            $scope.fumigationDealwith.checkInsectCageTime = $filter('date')($scope.fumigationDealwith.checkInsectCageTime, "yyyy-MM-dd HH:mm:ss");
            
            $scope.formatFumigateData();
            
    		
        },function(data){
        	console.log(data);
        });
    }
    
    
    
    $scope.isNotEdit = false;
    $scope.saveFlag = false;
    
    
    if ($stateParams.id != 0) { // 修改 查看
    	
        $scope.isNotEdit = $stateParams.isNotEdit;
        
        $scope.loadDataById($stateParams.id);
        
    } else if ($stateParams.fumigateProgramId != 0) { // 新增
    	
    	$scope.fumigationDealwith.fumigateProgramId = $stateParams.fumigateProgramId;
    	
    	// 通过 熏蒸方案，获取数据.
    	fumigationService.loadDataAndProcessById($stateParams.fumigateProgramId).then(function(data){
            $scope.fumigation = data.fumigationProgram;
            $scope.fumigationProcess = data.fumigationProcess;

            $scope.formatFumigateData();
        },function(data){
        });
    }
    
    $scope.formatFumigateData = function () {

    	// 生虫时间.
    	$scope.fumigation.insectProductTime = $filter('date')($scope.fumigation.insectProductTime, "yyyy-MM-dd"); 

        // 散气开始.
        $scope.fumigationProcess.bulkStartTime = $filter('date')($scope.fumigationProcess.bulkStartTime, "yyyy-MM-dd HH:mm:ss");
        // 散气结束.
        $scope.fumigationProcess.bulkEndTime = $filter('date')($scope.fumigationProcess.bulkEndTime, "yyyy-MM-dd HH:mm:ss");

    	// 获取粮库名称.

        $scope.fumigation.orgName = $rootScope.depotInfo.orgName;

        if ($scope.fumigation.houseId != null) {
        	// 通过仓房id，获取保管员.
	        paymentService.getKepperByHouseId($scope.fumigation.houseId).then(function(data){
		        $scope.keeperList = data;
		    },function(data){
		        console.log(data);
		    });
        }
        
        // 按照单位获取单位下的仓房信息
        $scope.storehouseObj = $rootScope.storehouseObj;
		$scope.fumigation.storehouseName = $scope.storehouseObj[$scope.fumigation.houseId].storehouseName;
    }
    
    var validator = $("#fumigationDealwith-form").validate();
    
    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;  
        return this.optional(element)||(checkNumber.test(value));  
    },"请输入正确的数字类型，最多两位小数！");  
        
    // 自定义验证，验证正整数数字
    $.validator.addMethod("validPositiveInteger",function(value,element, params) {
    	var checkNumber = /^\d*$/g;  
    	return this.optional(element)||(checkNumber.test(value));  
    },"请输入正整数！");
    
    // 返回.
    $scope.retList = function () {
    	if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go("app.storage.fumigationDealwith.list");
        }
    }
    
    // 保存.
    $scope.save = function (type) {
    	if (!$scope.saveFlag) {
    		if (validator.form()) {
    			// 设置saveFlag为true,防止重复提交.
    			$scope.saveFlag = true;

    			// 格式化时间，防止后台转换报错.
    			if ($scope.fumigationDealwith.checkInsectCageTime != undefined && $scope.fumigationDealwith.checkInsectCageTime != null && $scope.fumigationDealwith.checkInsectCageTime != '') {
    				$scope.fumigationDealwith.checkInsectCageTime = new Date($scope.fumigationDealwith.checkInsectCageTime.replace(new RegExp(/-/gm) ,"/"));
    			}

    			fumigationDealwithService.save($scope.fumigationDealwith, $rootScope.userInfo).then(function(data){
    				if(data.status == "success"){
    					alert("保存成功！");
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
    }
});
