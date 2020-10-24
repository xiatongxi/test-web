"use strict";
angular.module('app.storage').controller("fumigationSaveCtrl", 
		function($scope, $filter, $http, $stateParams, $state, $rootScope, fumigationService, 
				StorehouseService, foodbasicinfoService, threetempcheckService, paymentService, 
				commonUtilService, codeRuleService, selectService, APP_CONFIG) {
	
    $scope.fumigation = {};
	$scope.fumigateProgramNumber = {};
    $scope.isNotEdit = false;
    $scope.saveFlag = false;
    $scope.showNextButton = true;

    $scope.loadDataById = function(id) {
    	$scope.showLastButton = false;
        fumigationService.loadDataById(id).then(function(data){
            $scope.fumigation = data;
            // 生虫时间
            $scope.fumigation.insectProductTime = $filter('date')($scope.fumigation.insectProductTime, "yyyy-MM-dd"); 
            $scope.fumigation.storageTime = $filter('date')($scope.fumigation.storageTime, "yyyy-MM-dd"); 
            $scope.fumigation.lastTimeFumigation = $filter('date')($scope.fumigation.lastTimeFumigation, "yyyy-MM-dd"); 
            $scope.fumigation.circulationTime = $filter('date')($scope.fumigation.circulationTime, "yyyy-MM-dd"); 
            $scope.fumigation.bulkGasDate = $filter('date')($scope.fumigation.bulkGasDate, "yyyy-MM-dd");

            if ($scope.fumigation.houseId != null) {
            	// 通过仓房id，获取保管员.
    	        paymentService.getKepperByHouseId($scope.fumigation.houseId).then(function(datas){
    		        $scope.keeperList = datas;
    		    },function(data){
    		        console.log(datas);
    		    });
            }

        },function(data){
        	console.log(data);
        });
        //查询当前数据的流程轨迹和审批信息
    	selectService.getPageInfo(null, null, null, null, $stateParams.id, "fumigationProgram", null, "asc").then(function(data){
    		$scope.auditList = data.list;
    	},function(data){
            console.log(data);
        });
    }

    $scope.loadDataByIdAndPID = function(id) {
        fumigationService.loadDataByIdAndPID(id).then(function(data){
            $scope.fumigation = data.fumigationProgram;
            $scope.auditList = data.auditList;
            $scope.processDefinitionId = data.fumigationProgram.processDefinitionId;
            $scope.processInstanceId = data.fumigationProgram.processInstanceId;
            // 保管员列表.
            $scope.keeperList = [];
            $scope.keeperList.push(data.keeper);
            
            // 生虫时间
            $scope.fumigation.insectProductTime = $filter('date')($scope.fumigation.insectProductTime, "yyyy-MM-dd"); 
            $scope.fumigation.storageTime = $filter('date')($scope.fumigation.storageTime, "yyyy-MM-dd"); 
            $scope.fumigation.lastTimeFumigation = $filter('date')($scope.fumigation.lastTimeFumigation, "yyyy-MM-dd"); 
            $scope.fumigation.circulationTime = $filter('date')($scope.fumigation.circulationTime, "yyyy-MM-dd"); 
            $scope.fumigation.bulkGasDate = $filter('date')($scope.fumigation.bulkGasDate, "yyyy-MM-dd");

        },function(data){
        	console.log(data);
        });
    }
    
    $('input[readOnlyButValid]').on("focusin", function() {
        $(this).prop('readOnly', true);  
    });

	$('input[readOnlyButValid]').on("focusout", function() {
		$(this).prop('readOnly', false); 
	});

    if ($stateParams.id != 0) {
        $scope.isNotEdit = $stateParams.isNotEdit;
        $scope.isNext = $stateParams.isNext;
        $scope.isLast = $stateParams.isLast;
        $scope.isNotSave = true;
        $scope.showNextButton = $stateParams.showNextButton;
        $scope.showLastButton = $stateParams.showLastButton;
        if ($stateParams.isNotEdit == true) {
            //$scope.loadDataByIdAndPID($stateParams.id);
        	$scope.loadDataById($stateParams.id);
        } else {
            //新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
            $scope.loadDataById($stateParams.id);
        }
    } else {
    	$scope.isNotSave = true;
        codeRuleService.getCodeValueByType("fumigationProgram", $rootScope.orgInfo.orgId).then(function(data) {
    		if (data.status == "success") {
    			$scope.fumigateProgramNumber.status = "success";
    			$scope.fumigation.fumigateProgramNumber = data.codeValue;
    		} else if (data.status == "error") {
    			$scope.fumigateProgramNumber.msg = data.msg;
    			$scope.fumigateProgramNumber.status = "error";
    			if(confirm("方案编号有误！该页面无法保存！原因：" + $scope.fumigateProgramNumber.msg + " 是否返回到列表页！")) {
    				$scope.retList();
    			}
    		}
    	});
    }
    
    var validator = $("#fumigation-form").validate();
    
    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;  
        return this.optional(element)||(checkNumber.test(value));  
    },"请输入正确的数字类型，最多两位小数！");  

    //根据仓房号赋值仓型和仓房尺寸
    $scope.storeData = function (obj) {
    	// 获取仓房信息.仓房id.
    	var houseId = obj.fumigation.houseId;
    	$scope.emptyByChangeHouseId();
    	
    	// 判断该仓是否有未结束的熏蒸 或者 审批未结束的熏蒸.
    	fumigationService.findIfExitByHouseId(houseId, $rootScope.orgInfo.orgId).then(function(data) {
    		if (data.error != undefined && data.error != null && data.error != '' ) {
    			// 仓号置空.
    			$scope.fumigation.houseId = '';
    			alert(data.error);
    			return;
    		} else {
    			// 仓房类型
    	    	$scope.fumigation.houseType = Number($scope.storehouseObj[houseId].storehouseType);
    	    	// 仓房结构_地面
    	    	$scope.fumigation.houseGround = $scope.storehouseObj[houseId].ground;
    	    	// 仓房结构_墙体
    	    	$scope.fumigation.houseWall = $scope.storehouseObj[houseId].wall;
    	    	// 仓房结构_屋顶
    	    	$scope.fumigation.houseRoof = $scope.storehouseObj[houseId].roof;
    	    	// 仓房结构_房架
    	    	$scope.fumigation.houseFrame = $scope.storehouseObj[houseId].house;

    	    	// 仓房体积
    	    	var cfcc = commonUtilService.accMul(
    	    			commonUtilService.accMul($scope.storehouseObj[houseId].length, $scope.storehouseObj[houseId].width), 
    	    			$scope.storehouseObj[houseId].height);

    	    	$scope.fumigation.houseCapacity = cfcc;
    	    	$scope.fumigation.houseSpaceCapacity = cfcc;

    	    	//获取储粮转卡信息
    	    	foodbasicinfoService.findBasicinfoByStoreWarehouse(houseId, null).then(function(data){
    	    		if (data != null && data.length > 0) {
    	    			$scope.fumigation.grainKind = Number(data[0].subType); //粮食品种
    	    			$scope.fumigation.grainCount = data[0].number; // 粮食数量
    	    			$scope.fumigation.grainProducingArea = Number(data[0].placeOfOrigin); // 粮食产地
    	    			$scope.fumigation.grainWater = data[0].water; // 粮食水分
    	    			$scope.fumigation.grainImpurity = data[0].impurity; // 粮食杂质
    	    			$scope.fumigation.houseHeapGrainCapacity = data[0].disperseCapacity; // 粮堆体积
    	    			$scope.fumigation.houseHeapGrainHeight = data[0].lineHeight; // 粮堆高度
    	    			$scope.fumigation.storageTime = $filter('date')(data[0].inputYear, "yyyy-MM-dd"); // 储存日期
    	    		} else {
    	    			
    	    		}
    	        },function(data){
    	            console.log(data);
    	        });

    	    	// 三温.
    	    	threetempcheckService.getPageInfo(1, 1, '', houseId).then(function(data) {
    	    		if (data != null && data.list.length > 0) {
    	    			var obj = data.list[0];
    	    			$scope.fumigation.highestGrainTemperature = obj.maxTemp; //粮食最高温
    	    			$scope.fumigation.minimumGrainTemperature = obj.minTemp; //粮食最低温
    	    			$scope.fumigation.averageGrainTemperature = obj.avgTemp; //粮线平均温
    	    			$scope.fumigation.storageTemperature = obj.inTemp; //仓内温度
    	    			$scope.fumigation.airTemperature = obj.outTemp; //仓外温度
    	    			$scope.fumigation.siloHumidity = obj.inWater; //仓内湿度
    	    			$scope.fumigation.atmosphericHumidity = obj.outWater; //仓外湿度
    	    		} else {
    	    			
    	    		}
    	        },function(data){
    	            console.log(data);
    	        });

    	    	// 判断曾经是否熏蒸过，根据仓号查询已经审批通过的熏蒸方案.
    	    	fumigationService.getPassPageInfo(1, 1, houseId).then(function(data) {
    	    		if (data != null && data.list.length > 0) {
    	    			var obj = data.list[0];
    	    			$scope.fumigation.isFirstFumigation = 1;
    	    			// 上次熏蒸时间 等于 上次的 作业开始时间
    	    			$scope.fumigation.lastTimeFumigation = $filter('date')(obj.taskStartTime, "yyyy-MM-dd");
    	    		} else {
    	    			
    	    		}
    	    	},function(data){
    	            console.log(data);
    	        });

    	    	// 通过仓房id，获取保管员.
    	        paymentService.getKepperByHouseId(houseId).then(function(data){
    		        $scope.keeperList = data;
    		    },function(data){
    		        console.log(data);
    		    });
    		}
    	},function(data){
            console.log(data);
        });
    	
    }
    
    // 置空根据houseId获取的数据.
    $scope.emptyByChangeHouseId = function () {
    	$scope.fumigation.houseType = '';
		$scope.fumigation.houseGround = '';
		$scope.fumigation.houseWall = '';
		$scope.fumigation.houseRoof = '';
		$scope.fumigation.houseCapacity = '';
		$scope.fumigation.houseSpaceCapacity = '';
		
		// 粮情相关.
		$scope.fumigation.grainKind = "";
		$scope.fumigation.grainCount = "";
		$scope.fumigation.grainProducingArea = "";
		$scope.fumigation.grainWater = "";
		$scope.fumigation.grainImpurity = "";
		$scope.fumigation.houseHeapGrainCapacity = "";
		$scope.fumigation.houseHeapGrainHeight = "";
		$scope.fumigation.storageTime = "";
		
		
		// 三温.
		$scope.fumigation.highestGrainTemperature = ""; //粮食最高温
		$scope.fumigation.minimumGrainTemperature = ""; //粮食最低温
		$scope.fumigation.averageGrainTemperature = ""; //粮线平均温
		
		
		// 曾经是否熏蒸 为 0，否.
		$scope.fumigation.isFirstFumigation = 0;
		// 上次熏蒸时间 等于 上次的 作业开始时间
		$scope.fumigation.lastTimeFumigation = "";
		
		// 保管员列表.
		$scope.keeperList = [];
    }
    


    // 返回.
    $scope.retList = function () {
    	if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go("app.storage.fumigation");
        }
    }
    
    $scope.next= function () {
    	if (validator.form()) {
    		$scope.isLast = true;
    		$scope.isNext = true;
    		$scope.isNotSave = false;
    		$scope.showLastButton = true;
    		$scope.showNextButton = false;
    	}else{
    		
    	}
    }
    $scope.last= function () {
    	$scope.isLast = false;
    	$scope.isNext = false;
    	$scope.isNotSave = true;
    	$scope.showLastButton = false;
    	$scope.showNextButton = true;
    }

    // 保存.
    $scope.save = function () {
    	if ($scope.fumigateProgramNumber.status != undefined && $scope.fumigateProgramNumber.status == "error") {
    		if(confirm("方案编号有误！该页面无法保存！原因：" + $scope.fumigateProgramNumber.msg + " 是否返回到列表页！")) {
				$scope.retList();
				return;
			} else {
				return;
			}
    	}

    	if (!$scope.saveFlag) {
    		if (validator.form()) {
    			// 设置saveFlag为true,防止重复提交.
    			$scope.saveFlag = true;
    			fumigationService.save($scope.fumigation, $rootScope.userInfo).then(function(data){
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
})
