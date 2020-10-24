"use strict";
// 质量安全追溯列表
angular.module('app.synth').controller("qualitySafeCtrl",function ($scope, $rootScope, $state, $filter,
		warehouseService, fcbgzService) {

	// 获取基础数据
	$scope.getBasicData = function() {
		//按照单位获取单位下的仓房信息
		var depotId = $rootScope.orgInfo.orgId;
		//获取货位信息
		var cfh = '';
		warehouseService.getStorehouse(depotId, cfh, "0").then(function(data){
			$scope.warelist = data.wareList;  //下拉列表数据
			$scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
		},function (data) {
			console.log(data);
		});
	}
	
	//根据仓房获取货位列表
	$scope.getWareList = function(houseId) {
		//按照单位获取单位下的仓房信息
		var depotId = $rootScope.orgInfo.orgId;
		warehouseService.getStorehouse(depotId, houseId, "0").then(function(data){
			$scope.warelist = data.wareList;  //下拉列表数据
		},function (data) {
			console.log(data);
		});
	}

	//初始化加载
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.loadData = function() {
    	//$scope.getBasicData();
    	fcbgzService.queryRkZsList($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, 
    			$rootScope.orgInfo.orgId, $scope.storehouseId, $scope.wareId).then(function(data){
    		$scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }

	//初始化加载
	$scope.loadData();
	$scope.getBasicData();

	// 翻页
 	$scope.goPage = function(pageNum) {
 		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
      		$scope.pageInfo.pageNum = pageNum;
      		$scope.loadData();
      	}
 	}

 	// 查看、粮情信息、作业记录、质检信息
    $scope.view = function(obj, btnType) {
    	if (btnType == 1) {//查看
    		$state.go('app.synth.warehouseSource.view',{fcbgz:angular.toJson(obj), btnType:btnType});
    	} else if (btnType == 2) {//质检信息
    		//获取化验数据
    		fcbgzService.queryCrkJyxx(obj.DataID).then(function(data){
    			$scope.zjxx_list = data.zjxx;
        		if (null != $scope.zjxx_list) {
        		   	// 构建组织等级
        		   	$scope.fillLevel(data.parentId, 0);
        		   	// 构建树表格
        			$scope.drawTable();
        		}
	        },function(data){
	            console.log(data);
	        });

	        // 显示弹出层
	        $("#jyxxDetail_Model").modal("show");
    	} else if (btnType == 3) {//粮情信息
    		var ch = $rootScope.storehouseObj[parseInt(obj.ch)].storehouseCode;
    		$state.go('app.storage.safeproduce.safeCheck.ttplist',{houseId:ch});
    	} else if (btnType == 4) {//作业记录
    		$state.go("app.supervise.operation.ccZy", {houseId: parseInt(obj.ch)});
    	} else if (btnType == 5) {//报警信息
    		$state.go("app.supervise.situation.temperature", {houseId: parseInt(obj.ch)});
    	}
    }

    // 通过递归给组织赋等级
	$scope.fillLevel = function(parentId, level) {
		angular.forEach($scope.zjxx_list, function(item, index) {
			if (item.parentid == parentId) {
				item.level = level;
				item.parentId = parentId;
				$scope.fillLevel(item.zbxmc, level+1);
			}
		})
	}

	// 生成表格树
	$scope.drawTable = function() {
		$("#tb").bootstrapTable('destroy');
		$('#tb').bootstrapTable({
	        data: $scope.zjxx_list,	//数据源，必须包含parentId属性
	        treeView: true,
	        treeId: "zbxmc",
	        treeField: "enumname",
	        formatLoadingMessage: function () {  
	            return "";  
	        },
	        columns: [{
	        	field: 'zbxmc',
	        },{  
	            field: 'enumname',  
	        }, {  
	            field: 'jyz',  
	        },{  
	            field: 'jykl',  
	        },{  
	            field: 'jykj',  
	        }] 
		})
	}
});