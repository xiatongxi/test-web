"use strict";

//分仓保管账
angular.module('app.storage').controller("houseKeepAccountCtrl", 
		function($scope, $rootScope, $state, $stateParams, $filter, enumService, keepAccountService, StorehouseService, warehouseService, APP_CONFIG) {

	$scope.setDays = function(rq) {
		var day = '_01_03_05_07_08_10_12';
		var year = rq.substr(0,4);
		var month = rq.substr(5,7);
		$scope.search.startDate = rq + "-01"
		//2月要判断是否是闰年
		if (month == '02') {
			//判断是是不是世纪年(100的整数倍)，如果是世纪年就除以400，否则就除以4
			var checkYear = parseInt(year)%100;
			var checkFlag;
			if (checkYear == 0) { //世纪年
				checkFlag = parseInt(year)%400;
			} else { //不是世纪年
				checkFlag = parseInt(year)%4;
			}
			//如果checkFlag==0，那么当前年是闰年，否则就是平年
			if (checkFlag == 0) {
				$scope.search.endDate = rq+"-29";
			} else {
				$scope.search.endDate = rq+"-28";
			}
		} else {
			var flag = day.indexOf("_"+month);
			if (flag != -1) {
				$scope.search.endDate = rq + "-31";
			} else {
				$scope.search.endDate = rq + "-30";
			}
		}
	};

	// 获取列表数据
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.search = {ch:"", hwh:"", lspz:"", lsxz:"", startDate:"", endDate:""};
	if($stateParams.houseId != "" && $stateParams.houseId != null){
		$scope.search.ch = $stateParams.houseId;
	}
	$scope.loadData = function() {
		if ($stateParams.type == 3) {
			$scope.fcbgz = angular.fromJson($stateParams.account);
			$scope.search.ch = $scope.fcbgz.ch;
			$scope.search.hwh = $scope.fcbgz.hwh;
			$scope.search.lspz = parseInt($scope.fcbgz.lspz);
			$scope.search.lsxz = parseInt($scope.fcbgz.hwxz);
			var rq = $filter('date')($scope.fcbgz.rq, "yyyy-MM");
			$scope.setDays(rq);
		} else { //通过保管总账跳过来的就显示返回按钮，并且影藏记账按钮，审核按钮，否则相反
			$scope.returnTotals = true;
			if ($scope.search.ch == "") {
				$scope.search.ch = $rootScope.currentStore;
			}
			if($scope.search.lsxz != undefined && $scope.search.lsxz != ""){
				$scope.search.lsxz = $scope.search.lsxz[0].id;
	   	 	}
			if($scope.search.lspz != undefined && $scope.search.lspz != ""){
				$scope.search.lspz = $scope.search.lspz[0].id;
	   	 	}
		}
		keepAccountService.getHouseKeepAccountPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.search).then(function(data){
	        $scope.pageInfo = data;
	    },function(data){
	        console.log(data);
	    });

		//加载打印区域的数据
		keepAccountService.getHouseKeepAccountPageInfo(null, null, $scope.search).then(function(data){
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

	// 货位列表
	$scope.loadWare = function() {
		warehouseService.getStorehouse($rootScope.orgInfo.orgId, $scope.search.ch, "0").then(function(data){
			$scope.warelist = data.wareList;  //下拉列表数据
			$scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
	    },function(data){
	        console.log(data);
	    });
	}
	$scope.loadWare();
	
	// 翻页
	$scope.goPage = function(pageNum) {
		$scope.pageInfo.pageNum = pageNum;
		$scope.loadData();
	}
	
	// 接收广播，切换仓房
	$scope.$on("storeChangeed", function(event, storehouseId) {
		console.log(storehouseId);
		$scope.search.ch = storehouseId;
        $scope.loadData();
    	$scope.loadWare();
    })

    //页面跳转
    $scope.edit = function(account, butType) {
		var obj_str = angular.toJson(account);
		$scope.fcbgz = angular.fromJson(obj_str);
		var rq = $filter('date')($scope.fcbgz.rq, "yyyy-MM-dd");
		if ($scope.fcbgz.ch == null || $scope.fcbgz.hwh == null || $scope.fcbgz.pz == null || $scope.fcbgz.hwxz == null || $scope.fcbgz.rq == null) {
			alert("数据有误!");
			return;
		}
		if (butType != 3) { //记账、审核、查看
			keepAccountService.accountingRecord($scope.fcbgz.ch, $scope.fcbgz.hwh, $scope.fcbgz.pz, $scope.fcbgz.hwxz, rq, 0).then(function(data){
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
				$state.go('app.storage.account.houseKeepAccount.houseKeepAccountEdit',{account:angular.toJson(account), butType:butType});
			},function(data){
		        console.log(data);
		    });
		} else { //明细账
			$state.go('app.storage.account.keepDetailedAccount',{account:angular.toJson(account), type:butType});
		}
	}
	
	//打印
	$scope.print = function() {
		$("#print").printArea();
	}
	
	//返回保管总账列表
	$scope.returnTotal = function() {
		$state.go('app.storage.account.keepTotalAccount');
	}

	//返回粮库决策
	$scope.returnUp = function(){
		$state.go('app.supervise.cameraPT');
	}
	
})
.controller("houseKeepAccountEditCtrl", 
		function($scope, $rootScope, $state, $stateParams, $filter, keepAccountService, StorehouseService, warehouseService, APP_CONFIG) {

	// 仓房列表
	$scope.storeMap = {};
	$scope.loadStore = function() {
		StorehouseService.getStorehouseList($rootScope.orgInfo.orgId).then(function(data){
	        $scope.storelist = data.houseList;
			angular.forEach($scope.storelist, function(item, index) {
				$scope.storeMap[item.storehouseId] = item.storehouseCode;
			})
	    },function(data){
	        console.log(data);
	    });
	}
	$scope.loadStore();

	// 货位列表
	$scope.wareMap = {};
	$scope.loadWare = function() {
		warehouseService.getStorehouse($rootScope.orgInfo.orgId, null).then(function(data){
	        $scope.warelist = data.wareList;
	    	angular.forEach($scope.warelist, function(item, index) {
				$scope.wareMap[item.warehouseId] = item.warehouseCode;
	    	})
	    },function(data){
	        console.log(data);
	    });
	}
	$scope.loadWare();

	// 获取列表日数据
	$scope.edit = function() {
		$scope.fcbgz = angular.fromJson($stateParams.account);
		$scope.fcbgz.lcmc = $rootScope.depotInfo.orgName;
		var rq = $filter('date')($scope.fcbgz.rq, "yyyy-MM-dd");
		$scope.fcbgz.rq = $filter('date')($scope.fcbgz.rq, "yyyy-MM-dd");
		keepAccountService.accountingRecord($scope.fcbgz.ch, $scope.fcbgz.hwh, $scope.fcbgz.pz, $scope.fcbgz.hwxz, rq, 0).then(function(data){
			$scope.account = data.obj;

			if ($stateParams.butType == 0) { //记账
				//初始化数据记账表对象数据
				$scope.account.houseId = $scope.fcbgz.ch; //仓房
				$scope.account.wareId = $scope.fcbgz.hwh; //货位
				$scope.account.recordUnite = $scope.fcbgz.lqgs; //粮权归属
				$scope.account.lspz = $scope.fcbgz.pz; //粮食品种
				$scope.account.hwxz = $scope.fcbgz.hwxz; //货物性质
				$scope.account.rq = rq; //日期
				$scope.account.remark = $scope.fcbgz.wjh; //摘要
				$scope.account.level = $scope.fcbgz.dj; //粮食等级
				$scope.account.srsl = $scope.fcbgz.srsl; //入库数量
				$scope.account.zcsl = $scope.fcbgz.zcsl; //出库数量
				$scope.account.kcsl = $scope.fcbgz.kcsl; //库存数量
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
			$scope.fcbgz.pz = $rootScope.dicData[$scope.fcbgz.pz];
			$scope.fcbgz.dj = $rootScope.dicData[$scope.fcbgz.dj];
			$scope.fcbgz.rq = rq;
		},function(data){
	        console.log(data);
	    });

	}
	$scope.edit();
	
	//提交
	$scope.submit = function() {
		keepAccountService.submit($scope.account, 0, $rootScope.orgInfo.orgId).then(function(data){
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
        	$state.go('app.storage.account.houseKeepAccount');
        }
    }
});
