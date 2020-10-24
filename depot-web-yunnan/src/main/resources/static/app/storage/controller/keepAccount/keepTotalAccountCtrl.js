"use strict";

//保管总账
angular.module('app.storage').controller("keepTotalAccountCtrl", 
		function($scope, $rootScope, $state, $stateParams, $filter, enumService, keepAccountService, StorehouseService, warehouseService, APP_CONFIG) {

	// 获取列表数据
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.search = {lspz:"", lsxz:"", startDate:"", endDate:""};
	$scope.loadData = function() {
		if($scope.search.lsxz != undefined && $scope.search.lsxz != ""){
			$scope.search.lsxz = $scope.search.lsxz[0].id;
   	 	}
		if($scope.search.lspz != undefined && $scope.search.lspz != ""){
			$scope.search.lspz = $scope.search.lspz[0].id;
   	 	}
		keepAccountService.getSumAccountPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.search).then(function(data){
	        $scope.pageInfo = data;
	        $scope.deptName = $rootScope.depotInfo.orgName;
	    },function(data){
	        console.log(data);
	    });
		//加载打印区域的数据
		keepAccountService.getSumAccountPageInfo(null, null, $scope.search).then(function(data){
	        $scope.pageInfo = data;
	        $scope.printList = data.list;
	    },function(data){
	        console.log(data);
	    });
		// 树形下拉框(粮食性质)
        enumService.getTreeListByTypeId($scope.search.lsxz, 1032).then(function(data) {
        	var data_new = $scope.data_add(data);
            $scope.grainAttributeTreeData = data_new;
        },function(data) {
            console.log(data);
        });
        // 树形下拉框(粮食品种)
        enumService.getTreeListByTypeId($scope.search.lspz, 1061).then(function(data) {
        	var data_new = $scope.data_add(data);
        	$scope.grainAttributeTreeDataLspz = data_new;
        },function(data) {
            console.log(data);
        });
	}
	$scope.loadData();

	$scope.data_add = function(data) {
    	//var data_new = $scope.data_add(data);
		var e = [];
    	if (data.length != 0) {
    		//要插入的json对象串
    		var a = {"id":null,"name":"请选择","children":[]};
    		//将返回的json对象和要插入的json对象串转换为字符串格式
    		var f = angular.toJson(a);
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

    //页面跳转
    $scope.edit = function(account, butType) {
		var obj_str = angular.toJson(account);
		$scope.fcbgz = angular.fromJson(obj_str);
		var rq = $filter('date')($scope.fcbgz.rq, "yyyy-MM");
		if (butType != 3) { //记账、审核、查看
			keepAccountService.accountingRecord(null, null, $scope.fcbgz.lspz, $scope.fcbgz.hwxz, rq, 1).then(function(data){
				$scope.account = data.obj;
				if (butType == 0) { //记账
					if (data.obj.id != null || data.obj.id != undefined) {
						alert("当前记录已记账！");
						return;
					}
				} else if (butType == 1) { //审核
					if (data.obj.id == null || data.obj.id == undefined) {
						alert("当前记录还尚未记账，请先记账！");
						return;
					} else {
						if (data.obj.auditor != null || data.obj.auditor != undefined) {
							alert("当前记录已审核！");
							return;
						}
					}
				} else if (butType == 2) { //查看
					if (data.obj.id == null || data.obj.id == undefined) {
						alert("当前记录还尚未记账，请先记账！");
						return;
					}
				}
				$state.go('app.storage.account.keepTotalAccount.keepTotalAccountEdit',{account:angular.toJson(account), butType:butType});
			},function(data){
		        console.log(data);
		    });
		} else { //分仓账
			$state.go('app.storage.account.houseKeepAccount',{account:angular.toJson(account), type:butType});
		}
	}
	//打印
	$scope.print = function() {
		$("#print").printArea();
	}
	
})
.controller("keepTotalAccountEditCtrl", 
		function($scope, $rootScope, $state, $stateParams, $filter, keepAccountService, StorehouseService, warehouseService, APP_CONFIG) {

	// 获取列表日数据
	$scope.edit = function() {
		$scope.fcbgz = angular.fromJson($stateParams.account);
		$scope.fcbgz.lcmc = $rootScope.depotInfo.orgName;
		var rq = $filter('date')($scope.fcbgz.rq, "yyyy-MM");
		keepAccountService.accountingRecord($scope.fcbgz.ch, $scope.fcbgz.hwh, $scope.fcbgz.lspz, $scope.fcbgz.hwxz, rq, 1).then(function(data){
			$scope.account = data.obj;

			if ($stateParams.butType == 0) { //记账
				//初始化数据记账表对象数据
				$scope.account.lspz = $scope.fcbgz.lspz;
				$scope.account.hwxz = $scope.fcbgz.hwxz;
				$scope.account.rq = rq;
				$scope.account.srsl = $scope.fcbgz.srsl;
				$scope.account.zcsl = $scope.fcbgz.zcsl;
				$scope.account.kcsl = $scope.fcbgz.kcsl;
				$scope.account.accountingPerson = $rootScope.userInfo.realName; //记账人
				$scope.account.accountingDate = $filter('date')(new Date(), "yyyy-MM-dd"); //记账时间
				//设置状态为记账
				//$scope.accountType = 0;

				//影藏审核信息
				$scope.auditor_th = true;
			} else if ($stateParams.butType == 1) { //审核
				//设置记账时间格式化和不可编辑
				$scope.account.accountingDate = $filter('date')($scope.account.accountingDate, "yyyy-MM-dd");
				$scope.accounting_isNotEdit = true;
				//显示审核信息
				$scope.auditor_th = false;
				//设置审核人为当前用户，审核时间为当前时间
				$scope.account.auditor = $rootScope.userInfo.realName;
				$scope.account.auditorDate = $filter('date')(new Date(), "yyyy-MM-dd");
			} else if ($stateParams.butType == 2) { //查看
				//设置记账时间格式化和不可编辑
				$scope.account.accountingDate = $filter('date')($scope.account.accountingDate, "yyyy-MM-dd");
				$scope.accounting_isNotEdit = true;
				//显示审核信息
				$scope.auditor_th = false;
				//审核信息设置不可编辑
				$scope.account.auditorDate = $filter('date')($scope.account.auditorDate, "yyyy-MM-dd");
				$scope.auditor_isNotEdit = true;
				//提交按钮影藏
				$scope.isNotEdit = true;
			}
			//初始分仓保管账表对象数据
			$scope.fcbgz.hwxz = $rootScope.dicData[$scope.fcbgz.hwxz];
			$scope.fcbgz.lspz = $rootScope.dicData[$scope.fcbgz.lspz];
			$scope.fcbgz.dj = $rootScope.dicData[$scope.fcbgz.dj];
			$scope.fcbgz.rq = rq;
		},function(data){
	        console.log(data);
	    });

	}
	$scope.edit();
	
	//提交
	$scope.submit = function() {
		keepAccountService.submit($scope.account, 1, $rootScope.orgInfo.orgId).then(function(data){
			if (data.status = 'success') {
				alert(data.msg);
			} else {
				alert("保存失败！");
			}
			$scope.retList();
		},function(data){
			alert("保存失败！");
	    });
	}
	
	//返回
    $scope.retList = function () {
		if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go('app.storage.account.keepTotalAccount');
        }
    }
});
