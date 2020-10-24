"use strict";

//保管明细账
angular.module('app.storage').controller("keepDetailedAccountCtrl", 
		function($scope, $rootScope, $state, $window, $stateParams, $filter, enumService, keepAccountService, StorehouseService, warehouseService, APP_CONFIG) {

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

	// 获取列表数据
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.search = {ch:"", hwh:"", lspz:"", lsxz:"", startDate:"", endDate:""};
	$scope.loadData = function() {
		var deviceTypeId = null;
		if ($stateParams.type == 3) {
			$scope.fcbgz = angular.fromJson($stateParams.account);
			$scope.returnTotals = false;
			$scope.Show = true;
			$scope.search.ch = $scope.fcbgz.ch;
			$scope.search.hwh = $scope.fcbgz.hwh;
			$scope.search.lspz = parseInt($scope.fcbgz.pz);
			$scope.search.hwxz = parseInt($scope.fcbgz.hwxz);
			$scope.search.startDate = $filter('date')($scope.fcbgz.rq, "yyyy-MM-dd");
			$scope.search.endDate = $filter('date')($scope.fcbgz.rq, "yyyy-MM-dd");
		} else {
			if ($scope.search.ch == "") {
				$scope.search.ch = $rootScope.currentStore;
			}
			if($scope.search.hwxz != undefined && $scope.search.hwxz != ""){
				$scope.search.hwxz = $scope.search.hwxz[0].id;
	   	 	}
			if($scope.search.lspz != undefined && $scope.search.lspz != ""){
				$scope.search.lspz = $scope.search.lspz[0].id;
	   	 	}
		}
		//显示列表数据
		//加载打印区域的数据
		keepAccountService.getPageInfo(null, null, $scope.search).then(function(data){
			$scope.printList = data.list;
		},function(data){
			console.log(data);
		});

		keepAccountService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.search).then(function(data){
			$scope.pageInfo = data;
	    },function(data){
	        console.log(data);
	    });
		
		// 树形下拉框(粮食性质)
		deviceTypeId = 1032;
        enumService.getTreeListByTypeId($scope.search.hwxz, deviceTypeId).then(function(data) {
        	var data_new = $scope.data_add(data);
        	$scope.grainAttributeTreeData = data_new;
        },function(data) {
            console.log(data);
        });
        // 树形下拉框(粮食品种)
		deviceTypeId = 1061;
        enumService.getTreeListByTypeId($scope.search.lspz, deviceTypeId).then(function(data) {
        	var data_new = $scope.data_add(data);
            $scope.grainAttributeTreeDataLspz = data_new;
        },function(data) {
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
		$scope.pageInfo.pageNum = pageNum;
		$scope.loadData();
	}
	
	// 接收广播，切换仓房
	$scope.$on("storeChangeed", function(event, storehouseId) {
		$scope.search.ch = storehouseId;
        $scope.loadData();
    	$scope.loadWare();
    })
     
    //打印
	$scope.print = function() {
		$("#print").printArea();
	}
	
	$scope.selectOnly1Or2 = function(item, selectedItems) {
	    if (selectedItems  !== undefined && selectedItems.length >= 20) {
	      return false;
	    } else {
	      return true;
	    }
	};
	
});
