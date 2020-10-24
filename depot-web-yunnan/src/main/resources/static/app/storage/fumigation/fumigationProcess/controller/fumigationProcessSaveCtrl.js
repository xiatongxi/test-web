"use strict";
angular.module('app.storage').controller("fumigationProcessSaveCtrl",
		function($scope, $filter, $http, $stateParams, $state, $rootScope, $uibModal,
				fumigationProcessService, fumigationService, paymentService,
				commonUtilService, StorehouseService, APP_CONFIG) {
	
    $(document).ready(function() {
        $("#dtBox").DateTimePicker({
        });
    });

    
	$scope.fumigation = {};
	$scope.fumigationProcess = {};
	
	// 获取仓房数据
	$scope.getBasicData = function() {
		//按照单位获取单位下的仓房信息
		$scope.storehouseList = $rootScope.storelist;
		$scope.storehouseObj = $rootScope.storehouseObj;
	}
	
    $scope.loadDataById = function(id) {
    	$scope.showLastButton = false;
    	fumigationProcessService.loadDataById(id).then(function(data){
            $scope.fumigation = data.fumigationProgram;
            $scope.fumigationProcess = data.fumigationProcess;
            
            // 初次施药时间.
            $scope.fumigationProcess.firstUseDrugTime = $filter('date')($scope.fumigationProcess.firstUseDrugTime, "yyyy-MM-dd HH:mm:ss");
            // 初次补药.
            $scope.fumigationProcess.firstSupplementDrugTime = $filter('date')($scope.fumigationProcess.firstSupplementDrugTime, "yyyy-MM-dd");
            // 最后补药日期.
            $scope.fumigationProcess.lastSupplementDrugTime = $filter('date')($scope.fumigationProcess.lastSupplementDrugTime, "yyyy-MM-dd");
            
            $scope.fumigationProcess.bulkStartTime = $filter('date')($scope.fumigationProcess.bulkStartTime, "yyyy-MM-dd HH:mm:ss");
            $scope.fumigationProcess.bulkEndTime = $filter('date')($scope.fumigationProcess.bulkEndTime, "yyyy-MM-dd HH:mm:ss");
            
            $scope.formatFumigateData();
            
            // 没有结束就显示结束按钮.
    		if ($scope.isNotEdit && $scope.fumigationProcess.taskState != 2) {
    			$scope.showEndTaskButton = true;
    		}
    		
    		// 子表数据.
            $scope.detailList = data.detailList;
            for (var i=0; i < data.detailList.length; i++) {
            	data.detailList[i].checkTime = $filter('date')(data.detailList[i].checkTime, "yyyy-MM-dd hh:mm:ss");
                $scope.addedDetail.push(angular.copy(data.detailList[i]));
            }
        },function(data){
        	console.log(data);
        });
    }
    
    
    
    $scope.isNotEdit = false;
    $scope.saveFlag = false;
    $scope.showNextButton = true;
    
        
    
    if ($stateParams.id != 0) { // 修改 查看
        $scope.isNotEdit = $stateParams.isNotEdit;
        if ($scope.isNotEdit) {
        	$scope.isNext = false;
        	$scope.isLast = true;
        	$scope.showNextButton = false;
        	$scope.showLastButton = false;
        	$scope.showEndTaskButton = false;
        } else {
        	$scope.showNextButton = true;
        }
        
        $scope.loadDataById($stateParams.id);
    } else if ($stateParams.fumigateProgramId != 0) { // 新增

    	$scope.fumigationProcess.fumigateProgramId = $stateParams.fumigateProgramId;
    	
    	// 通过 熏蒸方案，获取数据.
    	fumigationService.loadDataById($stateParams.fumigateProgramId).then(function(data){
            $scope.fumigation = data;

            $scope.formatFumigateData();
        },function(data){
        	console.log("走下面这里");
        });
    }
    
    $scope.formatFumigateData = function () {
    	// 按照单位获取单位下的仓房信息
    	$scope.storehouseList = $rootScope.storelist;
    	$scope.storehouseObj = $rootScope.storehouseObj;
    	// 获取粮库名称.
        if ($scope.fumigation.orgId == $rootScope.orgInfo.orgId) {
        	$scope.fumigation.orgName = $rootScope.depotInfo.orgName;
        }

        if ($scope.fumigation.houseId != null) {
        	// 通过仓房id，获取仓房名称和保管员
        	$scope.fumigation.storehouseName = $scope.storehouseObj[$scope.fumigation.houseId].storehouseName;
	        paymentService.getKepperByHouseId($scope.fumigation.houseId).then(function(data){
		        $scope.keeperList = data;
		    },function(data){
		        console.log(data);
		    });
        }
        
    }
    
    var validator = $("#fumigation-form").validate();
    
    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;  
        return this.optional(element)||(checkNumber.test(value));  
    },"请输入正确的数字类型，最多两位小数！");  
        
    // 自定义验证，验证整数数字
    $.validator.addMethod("validPositiveInteger",function(value,element, params) {
    	var checkNumber = /^\d*$/g;  
    	return this.optional(element)||(checkNumber.test(value));  
    },"请输入正整数！");
    
    // 返回.
    $scope.retList = function () {
    	if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go("app.storage.fumigationProcess.list");
        }
    }
    
    // 下一页.
    $scope.next= function () {
    	if (validator.form()) {
    		$scope.isLast = true;
    		$scope.isNext = true;
    		$scope.showLastButton = true;
    		$scope.showNextButton = false;
    		// 没有结束就显示结束按钮.
    		if ($scope.fumigationProcess.taskState != 2) {
    			$scope.showEndTaskButton = true;
    		}
    	} else {
    		
    	}
    }
    
    // 上一页.
    $scope.last= function () {
    	$scope.isLast = false;
    	$scope.isNext = false;
    	$scope.showLastButton = false;
    	$scope.showNextButton = true;
    	$scope.showEndTaskButton = false;
    }

    
    $scope.endTask = function () {
    	if(confirm("是否确认结束该熏蒸过程！")) {
    		$scope.save("endTask");
    	}
    }
    
	// ----------------------------------------------    明细列表     开始          --------------------------------------------------
	// 子表数据模型.
	$scope.detail = {};
    // 用于存放 子表数据 的数组.
    $scope.addedDetail = [];
    
	// 点击新增或者修改时弹出模态窗
    $scope.addRow = function() {
		var params = [];
		
		var uibModalInstance = $uibModal.open({
            size:'md',
            templateUrl: 'app/storage/fumigation/fumigationProcess/views/fumigationProcessDetailModal.html',
            controller: 'fumigationProcessDetailModalCtrl',
            resolve: {
            	// items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params; 
                }
            }  
		}); 
		uibModalInstance.result.then(function (result) {
			if (result != null && result != undefined && result != '') {
				$scope.addedDetail.push(angular.copy(result));
				
			}
	    }, function (reason) {
	        console.log(reason);
	    });
	}
	
    
	// 修改时弹出模态窗
	$scope.editRow = function(detailInfo) {
    	// 索引，用来保存模态框返回的数据.
    	var index = $scope.addedDetail.indexOf(detailInfo);
    	
		var params = [];
		
		params.checkTime = detailInfo.checkTime;
		
		params.checkPointOne = detailInfo.checkPointOne;
		params.checkPointTwo = detailInfo.checkPointTwo;
		params.checkPointThree = detailInfo.checkPointThree;
		params.checkPointFour = detailInfo.checkPointFour;
		params.checkPointFive = detailInfo.checkPointFive;
		params.checkSpace = detailInfo.checkSpace;
		params.minimumConcentration = detailInfo.minimumConcentration;
		params.checkMan = detailInfo.checkMan;
		
		var uibModalInstance = $uibModal.open({
		       size:'md',  
		       templateUrl: 'app/storage/fumigation/fumigationProcess/views/fumigationProcessDetailModal.html',
		       controller: 'fumigationProcessDetailModalCtrl',
		       resolve: {
		       	// items是一个回调函数
		           items: function () {
		               // 这个值会被模态框的控制器获取到
		               return params; 
		           }
		       }  
		});
		uibModalInstance.result.then(function (result) {
			if (result != null && result != undefined && result != '') {
				$scope.addedDetail[index].checkTime = result.checkTime;
				$scope.addedDetail[index].checkPointOne = result.checkPointOne;
				$scope.addedDetail[index].checkPointTwo = result.checkPointTwo;
				$scope.addedDetail[index].checkPointThree = result.checkPointThree;
				$scope.addedDetail[index].checkPointFour = result.checkPointFour;
				$scope.addedDetail[index].checkPointFive = result.checkPointFive;
				$scope.addedDetail[index].checkSpace = result.checkSpace;
				$scope.addedDetail[index].minimumConcentration = result.minimumConcentration;
				$scope.addedDetail[index].checkMan = result.checkMan;
			}
		 }, function (reason) {
			 console.log(reason);
		 });
	}  
	 
    // 删除一行
    $scope.deleteRow = function(detailInfo) {

        if (detailInfo.id != null && detailInfo.id != undefined && detailInfo.id != '') {
            if (!confirm("此条数据为之前保存的数据，确定要删除吗？")) {
                return;
            }
            fumigationProcessService.deleteDetailByDetailId(detailInfo.id).then(function(data) {
            },function(data){
                console.log(data);
            });
        }
        var index = $scope.addedDetail.indexOf(detailInfo);
        if (index != -1) {
            $scope.addedDetail.splice(index, 1);
        }
        
    }
    
	
	// ----------------------------------------------    明细列表     结束          --------------------------------------------------
    
    // 保存.
    $scope.save = function (type) {
    	if (!$scope.saveFlag) {
    		if (validator.form()) {
    			// 设置saveFlag为true,防止重复提交.
    			$scope.saveFlag = true;
    			// 格式化时间，防止后台转换报错.
    			if ($scope.fumigationProcess.firstUseDrugTime != undefined && $scope.fumigationProcess.firstUseDrugTime != null && $scope.fumigationProcess.firstUseDrugTime != '') {
    				$scope.fumigationProcess.firstUseDrugTime = new Date($scope.fumigationProcess.firstUseDrugTime.replace(new RegExp(/-/gm) ,"/"));
    			}
    			if ($scope.fumigationProcess.bulkStartTime != undefined && $scope.fumigationProcess.bulkStartTime != null && $scope.fumigationProcess.bulkStartTime != '') {
    				$scope.fumigationProcess.bulkStartTime = new Date($scope.fumigationProcess.bulkStartTime.replace(new RegExp(/-/gm) ,"/"));
    			}
    			if ($scope.fumigationProcess.bulkEndTime != undefined && $scope.fumigationProcess.bulkEndTime != null && $scope.fumigationProcess.bulkEndTime != '') {
    				$scope.fumigationProcess.bulkEndTime = new Date($scope.fumigationProcess.bulkEndTime.replace(new RegExp(/-/gm) ,"/"));
    			}
    			
    			// 如果是结束过程，就设置状态为2.
    			if (type == "endTask") {
    				$scope.fumigationProcess.taskState = 2;
    			}
    			
    			// 将主表的数据值给字表的相同字段
    			$scope.fumigationProcess.houseId = $scope.fumigation.houseId;
    			$scope.fumigationProcess.houseName = $scope.fumigation.storehouseName;
    			$scope.fumigationProcess.fumigateProgramNumber = $scope.fumigation.fumigateProgramNumber;
    			$scope.fumigationProcess.grainKind = $scope.fumigation.grainKind;
    			$scope.fumigationProcess.fumigationType = $scope.fumigation.fumigationType;
    			$scope.fumigationProcess.drugName = $scope.fumigation.drugName;

    			for (var i = 0; i < $scope.addedDetail.length; i++) {
					if ($scope.addedDetail[i].checkTime != undefined 
							&& $scope.addedDetail[i].checkTime != null && $scope.addedDetail[i].checkTime != '') {
						$scope.addedDetail[i].checkTime = new Date($scope.addedDetail[i].checkTime.replace(new RegExp(/-/gm) ,"/"));
					}
				}

    			fumigationProcessService.save($scope.fumigationProcess, $scope.addedDetail, $rootScope.userInfo).then(function(data) {
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
