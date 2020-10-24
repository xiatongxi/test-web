"use strict";

angular.module('app.storage')
.controller("dumpCtrl", function($scope, $rootScope, $state, $stateParams, 
		enumService, warehouseService, dumpService, APP_CONFIG) {

	var all_houseId = null;//切换仓房功能仓房ID

	// 货位列表
	$scope.loadWare = function(houseId) {
		warehouseService.getStorehouse($rootScope.orgInfo.orgId, houseId, "0").then(function(data){
			$scope.warelist = data.wareList;  //下拉列表数据
			$scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
		},function (data) {
			console.log(data);
		});
	}

	$scope.loadWare(null);

	//通风申请列表数据查询
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.search = {houseId:"", wareId:"", yLsxz:"", xLsxz:"", startTime:"", endTime:""};
	$scope.getBasicData = function() {
		var deviceTypeId = null;
    	// 树形下拉框(粮食性质)
    	deviceTypeId = 1032;
    	enumService.getTreeListByTypeId($scope.search.yLsxz, deviceTypeId).then(function(data) {
    		var data_new = $scope.data_add(data);
    		$scope.grainAttributeTreeYData = data_new;
    	},function(data) {
    		console.log(data);
    	});
    	enumService.getTreeListByTypeId($scope.search.xLsxz, deviceTypeId).then(function(data) {
    		var data_new = $scope.data_add(data);
    		$scope.grainAttributeTreeXData = data_new;
    	},function(data) {
    		console.log(data);
    	});
	}
	$scope.getBasicData();
    $scope.loadData = function() {
    	var deviceTypeId = null;
    	//all_houseId = $rootScope.currentStore;
    	if($scope.search.xLsxz != undefined && $scope.search.xLsxz != ""){
			$scope.search.xLsxz = $scope.search.xLsxz[0].id;
   	 	}
    	if($scope.search.yLsxz != undefined && $scope.search.yLsxz != ""){
			$scope.search.yLsxz = $scope.search.yLsxz[0].id;
   	 	}
    	dumpService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.search, $rootScope.orgInfo.orgId).then(function(data){
    		$scope.pageInfo = data;
    		$scope.getBasicData();
        },function(data){
            console.log(data);
        });
    }

    $scope.loadData();

    $scope.data_add = function(data) {
		var e = [];
    	if (data.length != 0) {
    		//要插入的json对象串
    		var newObj = {"id":null,"name":"请选择","children":[]};
    		//将返回的json对象和要插入的json对象串转换为字符串格式
    		var f = angular.toJson(newObj);
    		var b = angular.toJson(data);
    		//把要插入的json对象串插入返回数据的最前面
    		var c = b.substring(0,1);
    		var d = b.substring(1,b.length);
    		e = c + f + "," + d;
    	}
    	//最后在转换为json对象返回去
    	return angular.fromJson(e);
	}

    // 翻页
 	$scope.goPage = function(pageNum) {
 		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
      		$scope.pageInfo.pageNum = pageNum;
      		$scope.loadData();
      	}
 	}

 	// 接收广播，切换仓房
	$scope.$on("storeChangeed", function(event, storehouseId) {
		all_houseId = storehouseId;
        $scope.loadData();
    })

    //新增或查看跳转到编辑页面
    $scope.edit = function(id, butType) {
    	$state.go('app.storage.dumpEdit',{id:id,butType:butType});
    }

})
