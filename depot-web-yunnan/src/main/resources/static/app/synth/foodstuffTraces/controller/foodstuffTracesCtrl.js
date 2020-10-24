angular.module('app.synth')
	.controller("foodstuffTracesListCtrl", function($scope, $state, $rootScope, $http, $location, $stateParams, 
			StorehouseService, warehouseService, foodTracesService, APP_CONFIG) {

	// 获取基础数据
	$scope.getBasicData = function() {
		//按照单位获取单位下的仓房信息
		var depotId = $rootScope.depotInfo.orgId;
		StorehouseService.getStorehouseList(depotId).then(function(data){
			$scope.storehouseList = data.houseList;
			$scope.storehouseObj = data.houseObj;
		},function (data) {
			console.log(data);
		});
		//获取货位信息
		var depotId = $rootScope.depotInfo.orgId;
		var cfh = '';
		warehouseService.getStorehouse(depotId,cfh).then(function(data){
			$scope.warehouseList = data.houseList;  //下拉列表数据
			$scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
		},function (data) {
			console.log(data);
		});
	}

    //初始化粮食追溯列表
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.loadData = function() {
    	$scope.getBasicData();
        foodTracesService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.obj).then(function(data){
    		$scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }

    $scope.loadData();

    //翻页
    $scope.goPage = function(pageNum) {
 		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
      		$scope.pageInfo.pageNum = pageNum;
      		$scope.loadData();
      	}
 	}

    // 详情
    $scope.edit = function(food) {
    	if (food.ch == null || food.hwh == null || food.shnd == null || food.lspz == null) {
    		alert("数据有误！");
    		return;
    	}
    	var foodStr = angular.toJson(food);
    	$state.go('app.synth.foodstuffTraces.foodstuffTracesView',{food:foodStr});
    }

})

.controller("foodstuffTracesViewCtrl", function($scope, $state, $rootScope, $filter, $http, $location, $stateParams, 
			StorehouseService, warehouseService, foodTracesService, APP_CONFIG) {

	// 获取基础数据
	$scope.getBasicData = function() {
		//按照单位获取单位下的仓房信息
		var depotId = $rootScope.depotInfo.orgId;
		StorehouseService.getStorehouseList(depotId).then(function(data){
			$scope.storehouseList = data.houseList;
			$scope.storehouseObj = data.houseObj;
		},function (data) {
			console.log(data);
		});
		//获取货位信息
		var depotId = $rootScope.depotInfo.orgId;
		var cfh = '';
		warehouseService.getStorehouse(depotId,cfh).then(function(data){
			$scope.warehouseList = data.houseList;  //下拉列表数据
			$scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
		},function (data) {
			console.log(data);
		});
	}

	//查看粮情专卡信息和他的整个工作进程
    $scope.edit = function() {
    	$scope.getBasicData();
    	var foodObj = angular.fromJson($stateParams.food);
   	 	foodTracesService.edit(foodObj).then(function(data){
   	 		if (data.flag == "error") {
   	 			alert("数据有误！");
   	 			return;
   	 		} else {
				$scope.foodInfo = data.foodInfo; //粮情卡信息
	
				$scope.rkPlanList = data.rkPlanList; //入库计划信息
				$scope.rkPlanTime = $filter('date')(data.rkPlanTime, "yyyy/MM/dd"); //入库计划审批通过时间
	
				$scope.ckPlanList = data.ckPlanList; //出库计划信息
				$scope.ckPlanTime = $filter('date')(data.ckPlanTime, "yyyy/MM/dd"); //出库计划审批通过时间
	
				$scope.rkHtList = data.rkHtList; //入库合同信息
				$scope.rkHtTime = $filter('date')(data.rkHtApprovalTime, "yyyy/MM/dd"); //入库合同审批通过时间
	
				$scope.ckHtList = data.ckHtList; //出库合同信息
				$scope.ckHtTime = $filter('date')(data.ckHtApprovalTime, "yyyy/MM/dd"); //出库合同审批通过时间
	
				$scope.rkList = data.rkList; //入库管理信息
				$scope.rkTime = $filter('date')(data.rkTime, "yyyy/MM/dd"); //入库时间(第一车粮食入库的时间)
	
				$scope.ckList = data.ckList; //出库管理信息
				$scope.ckTime = $filter('date')(data.ckTime, "yyyy/MM/dd"); //出库时间(第一车粮食出库的时间)
				 
				$scope.fcGlList = data.fcGlList; //质量管理信息
				$scope.fcGlTime = $filter('date')(data.fcGlTime, "yyyy/MM/dd"); //质量管理检验时间
				 
				$scope.zlGlList = data.zlGlList; //质量管理信息
				$scope.zlGlTime = $filter('date')(data.zlGlTime, "yyyy/MM/dd"); //质量管理检验时间
				 
				$scope.fyList = data.fyList;  //费用管理
				$scope.fyTime = $filter('date')(data.fyTime, "yyyy/MM/dd");  //费用产生时间
				
				//作业管理
				$scope.xzList = data.xzList;  //熏蒸数据
				$scope.tfList = data.tfList;  //通风数据
				$scope.fyxList = data.fyxList;  //风雨雪数据
				$scope.zyTime = $filter('date')(data.zyTime, "yyyy/MM/dd");  //作业产生时间
   	 		}
        },function(data){
            console.log(data);
        });
    }

    $scope.edit();
    
    $scope.getList = function(flowType) {
    	if (flowType == 'rkPlan') { //入库计划
    		$("#rkPlan").show();
    		$("#rkHt").hide();
    		$("#rkGl").hide();
    		$("#fcGl").hide();
    		$("#zlGl").hide();
    		$("#zyGl").hide();
    		$("#ckPlan").hide();
    		$("#ckHt").hide();
    		$("#ckGl").hide();
    		$("#fyGl").hide();
    		$("#gdGl").hide();
    	} else if (flowType == 'rkHt') {  //入库合同
    		$("#rkPlan").hide();
    		$("#rkHt").show();
    		$("#rkGl").hide();
    		$("#fcGl").hide();
    		$("#zlGl").hide();
    		$("#zyGl").hide();
    		$("#ckPlan").hide();
    		$("#ckHt").hide();
    		$("#ckGl").hide();
    		$("#fyGl").hide();
    		$("#gdGl").hide();
    	} else if (flowType == 'rkGl') {  //入库管理
    		$("#rkPlan").hide();
    		$("#rkHt").hide();
    		$("#rkGl").show();
    		$("#fcGl").hide();
    		$("#zlGl").hide();
    		$("#zyGl").hide();
    		$("#ckPlan").hide();
    		$("#ckHt").hide();
    		$("#ckGl").hide();
    		$("#fyGl").hide();
    		$("#gdGl").hide();
    	} else if (flowType == 'fcGl') {  //封仓管理
    		$("#rkPlan").hide();
    		$("#rkHt").hide();
    		$("#rkGl").hide();
    		$("#fcGl").show();
    		$("#zlGl").hide();
    		$("#zyGl").hide();
    		$("#ckPlan").hide();
    		$("#ckHt").hide();
    		$("#ckGl").hide();
    		$("#fyGl").hide();
    		$("#gdGl").hide();
    	} else if (flowType == 'zlGl') {  //质量管理
    		$("#rkPlan").hide();
    		$("#rkHt").hide();
    		$("#rkGl").hide();
    		$("#fcGl").hide();
    		$("#zlGl").show();
    		$("#zyGl").hide();
    		$("#ckPlan").hide();
    		$("#ckHt").hide();
    		$("#ckGl").hide();
    		$("#fyGl").hide();
    		$("#gdGl").hide();
    	} else if (flowType == 'zyGl') {  //作业管理
    		$("#rkPlan").hide();
    		$("#rkHt").hide();
    		$("#rkGl").hide();
    		$("#fcGl").hide();
    		$("#zlGl").hide();
    		$("#zyGl").show();
    		$("#ckPlan").hide();
    		$("#ckHt").hide();
    		$("#ckGl").hide();
    		$("#fyGl").hide();
    		$("#gdGl").hide();
    	} else if (flowType == 'ckPlan') {  //轮出计划
    		$("#rkPlan").hide();
    		$("#rkHt").hide();
    		$("#rkGl").hide();
    		$("#fcGl").hide();
    		$("#zlGl").hide();
    		$("#zyGl").hide();
    		$("#ckPlan").show();
    		$("#ckHt").hide();
    		$("#ckGl").hide();
    		$("#fyGl").hide();
    		$("#gdGl").hide();
    	} else if (flowType == 'ckHt') {  //出库合同
    		$("#rkPlan").hide();
    		$("#rkHt").hide();
    		$("#rkGl").hide();
    		$("#fcGl").hide();
    		$("#zlGl").hide();
    		$("#zyGl").hide();
    		$("#ckPlan").hide();
    		$("#ckHt").show();
    		$("#ckGl").hide();
    		$("#fyGl").hide();
    		$("#gdGl").hide();
     	} else if (flowType == 'ckGl') {  //出库管理
     		$("#rkPlan").hide();
    		$("#rkHt").hide();
    		$("#rkGl").hide();
    		$("#fcGl").hide();
    		$("#zlGl").hide();
    		$("#zyGl").hide();
    		$("#ckPlan").hide();
    		$("#ckHt").hide();
    		$("#ckGl").show();
    		$("#fyGl").hide();
    		$("#gdGl").hide();
     	} else if (flowType == 'fyGl') {  //费用管理
     		$("#rkPlan").hide();
    		$("#rkHt").hide();
    		$("#rkGl").hide();
    		$("#fcGl").hide();
    		$("#zlGl").hide();
    		$("#zyGl").hide();
    		$("#ckPlan").hide();
    		$("#ckHt").hide();
    		$("#ckGl").hide();
    		$("#fyGl").show();
    		$("#gdGl").hide();
     	} else if (flowType == 'gdGl') {  //归档管理
     		$("#rkPlan").hide();
    		$("#rkHt").hide();
    		$("#rkGl").hide();
    		$("#fcGl").hide();
    		$("#zlGl").hide();
    		$("#zyGl").hide();
    		$("#ckPlan").hide();
    		$("#ckHt").hide();
    		$("#ckGl").hide();
    		$("#fyGl").hide();
    		$("#gdGl").show();
     	}
    }

    //返回
    $scope.retureTop = function() {
    	if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go('app.synth.foodstuffTraces.foodstuffTracesList');
        }
    }

    //查看
    $scope.lookUp = function(id, flowType, processInstanceId, type) {
    	if (flowType == 'rkPlan') {
    		$state.go("app.business.plan-view",{id : id, processInstanceId : processInstanceId});
    	} else if (flowType == 'rkHt') {
    		$state.go("app.business.contract-view", {id : id, processInstanceId : processInstanceId});
    	} else if (flowType == 'rkGl') {
    		$state.go("app.supervise.operation.detail", {dataid:id});
    	} else if (flowType == 'fcGl') {
    		if (type == '0') {
    			$state.go('app.storage.qualitycheck.fck.fckedit',{id:id,isNotEdit:true});
    		} else if (type == '1') {
    			$state.go('app.storage.qualitycheck.ack.ackedit',{id:id,isNotEdit:true});
    		}
    	} else if (flowType == 'zlGl') {
    		if (type == '0') {
    			$state.go('app.storage.qualitycheck.fck.fckedit',{id:id,isNotEdit:true});
    		} else if (type == '1') {
    			$state.go('app.storage.qualitycheck.ack.ackedit',{id:id,isNotEdit:true});
    		} else if (type == '2') {
    			$state.go('app.storage.qualitycheck.spr.spredit',{id:id,isNotEdit:true});
    		} else if (type == '3') {
    			$state.go('app.storage.qualitycheck.out.outedit',{id:id,isNotEdit:true});
    		}
    	} else if (flowType == 'zyGl') {
    		if (type == 'xz') {
    			// 熏蒸
    			$state.go("app.storage.fumigationProcess.view", {id : id});
    		} else if (type == 'tf') {
    			// 通风
    			$state.go('app.storage.taskDispatch.aerationSummaryEdit',{id:id,butType:1});
    		} else if (type == 'fyx') {
    			// 风雨雪三查
    			var isNotEdit = true;
    	        $state.go('app.storage.safeproduce.wrsedit',{id:id,isNotEdit:isNotEdit});
    		}
    	} else if (flowType == 'ckPlan') {
    		$state.go("app.business.plan-view",{id : id, processInstanceId : processInstanceId});
    	} else if (flowType == 'ckHt') {
    		$state.go("app.business.contract-view", {id : id, processInstanceId : processInstanceId});
    	} else if (flowType == 'ckGl') {
    		$state.go("app.supervise.operation.detail", {dataid:id});
    	} else if (flowType == 'fyGl') {
    		$state.go("app.business.plan-view",{id : id, processInstanceId : processInstanceId});
    	}
    }

})
;