"use strict";

angular.module('app.storage')
.controller("monthAnalysisCtrl", function($scope, $rootScope, $state, $http, $uibModal,
		StorehouseService, $stateParams, monthAnalysisService, APP_CONFIG) {

	//月粮情分析列表数据查询
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.grain = {storehouseId : "", year : "", month : ""}
    $scope.loadData = function() {
    	if ($scope.grain.storehouseId == "") {
    		$scope.grain.storehouseId = $rootScope.currentStore;
    	}
    	monthAnalysisService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.grain).then(function(data){
    		$scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
    
    $scope.loadData();

    // 翻页
 	$scope.goPage = function(pageNum) {
 		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
      		$scope.pageInfo.pageNum = pageNum;
      		$scope.loadData();
      	}
 	}

 	// 接收广播，切换仓房
	$scope.$on("storeChangeed", function(event, storehouseId) {
		$scope.grain.storehouseId = storehouseId;
        $scope.loadData();
    })

    //新增或审核、查看跳转到编辑页面
    $scope.edit = function(id, butType) {
    	$state.go('app.storage.grainAnalysis.monthEdit',{id:id,butType:butType});
    }

})
.controller("monthAnalysisEditCtrl", function($scope, $filter, $state, $rootScope,$uibModal, $http, $stateParams, StorehouseService, 
		warehouseService, monthAnalysisService, foodbasicinfoService, threetempcheckService, APP_CONFIG) {
    var depotId = $rootScope.depotInfo.orgId;
    var userId = $rootScope.userInfo.userId;

	//存放异常情况与四无检查数据
	$scope.exceptionAndOnforeList = [];

	//通风申请列表数据查询
    $scope.edit = function() {
    	monthAnalysisService.edit($stateParams.id, 1).then(function(data){
    		$scope.grain = data.grain;
            if (null != $stateParams.id && "" != $stateParams.id) {
                $scope.exceptionAndOnforeList = data.exceptionAndOnforeList;

                if (data.threeTempCheckList != undefined && data.threeTempCheckList.length > 0) {
                	monthAnalysisService.editTwo(data.threeTempCheckList).then(function (dataTwo) {
                		$scope.threeTempList = dataTwo.threeTempCheckList;
                	});
                }
            }

    		//初始化时间格式
    		$scope.grain.submitDate = $filter('date')($scope.grain.submitDate, "yyyy-MM-dd");
    		$scope.grain.auditorDate = $filter('date')($scope.grain.auditorDate, "yyyy-MM-dd");
    		if ($stateParams.butType == 0) { //新增
        		var date = $filter('date')(new Date(), "yyyy-MM-dd_HHmmss");
        		//生成编号
        		$scope.grain.analysisId = "Y_LQFX_"+date;
        		//当前库名
        		$scope.grain.orgName = $rootScope.depotInfo.orgName;
        		//提交人
        		$scope.grain.submitPerson = $rootScope.userInfo.realName;
        		//提交时间
        		$scope.grain.submitDate = $filter('date')(new Date(), "yyyy-MM-dd");

        		//审核信息不可见
        		$scope.auditor_data = true;

        		//影藏审核按钮
        		$scope.sh_isNotEdit = true;
        	} else if ($stateParams.butType == 1) { //审核

        		//赋值货位下拉框并初始化值
        		$scope.getWarehouseList('house');

        		//审核信息显示出来，审核信息以上数据不可编辑
        		$scope.auditor_data = false;
        		$scope.isNotEdit = true;
        		//影藏提交按钮
        		$scope.tj_isNotEdit = true;

        		//审核人
        		$scope.grain.auditor = $rootScope.userInfo.realName;
        		//审核日期,默认当前时间
        		$scope.grain.auditorDate = $filter('date')(new Date(), "yyyy-MM-dd");
        	} else if ($stateParams.butType == 2) { //查看
        		//赋值货位下拉框并初始化值
        		$scope.getWarehouseList('house');

        		//页面中所有信息都显示出来，并且不可编辑
        		$scope.auditor_data = false;
        		$scope.isNotEdit = true;
        		$scope.auditor_isNotEdit = true;
        		
        		//影藏提交和审核按钮
        		$scope.sh_isNotEdit = true;
        		$scope.tj_isNotEdit = true;
        	}
        },function(data){
            console.log(data);
        });
    };
    
    $scope.edit();
    
    //仓房和货位编号onchange事件
    $scope.getWarehouseList = function(type) {
    	var houseId = $scope.grain.storehouseId;
    	var wareId = $scope.grain.warehouseId;
    	if (type=='house') { //仓房事件
    		//通过仓房获取货位下拉数据
        	if (houseId != '' && houseId != undefined) {
        		warehouseService.getStorehouse($rootScope.depotInfo.orgId, houseId).then(function(data){
        			$scope.warehouseList = data.wareList;
        		},function(data){
    	            console.log(data);
        	    });
        	}
    	} else if (type=='ware') { //货位事件
    		//通过仓房和货位获取仓房类型、粮食品种、责任保管员
    		monthAnalysisService.getLqzkDate(houseId, wareId).then(function(data){
    			//仓房类型
    			$scope.grain.storehouseType = data.houseType;
    			//粮食品种
    			$scope.grain.foodstuffType = data.subType;
    			//责任保管员
    			$scope.grain.keeperName = data.recorder;
    		},function(data){
	            console.log(data);
    	    });
    	}
    }
    
    //通过时间范围获取三温数据事件
    $scope.getThreeTempList = function() {
    	var houseId = $scope.grain.storehouseId;
    	var wareId = $scope.grain.warehouseId;
    	var year = $scope.grain.year;
    	var month = $scope.grain.month;
    	if (year == null || houseId == null || wareId == null || month == null) {
        	alert("请先录入仓房编号、货位编号、检查年份！");
        	$scope.grain.month = "";
        	return;
    	}
    	//通过仓房、货位、年份、月份查询对应的三温检查数据
    	monthAnalysisService.getThreeTempDate(houseId, wareId, year, month, depotId).then(function(data){

			monthAnalysisService.editTwo(data.threeTempCheckList).then(function(dataTwo) {
                $scope.threeTempList = dataTwo.threeTempCheckList;

                var threeList = new Array()
                if (dataTwo.threeTempCheckList.length == 1) {
                    threeList[0] = dataTwo.threeTempCheckList[0];
                    threeList[1] = "";
                }else{
                    threeList = dataTwo.threeTempCheckList;
                }

                monthAnalysisService.getThreeTempDateTwo(threeList).then(function(datathree) {

                    if (dataTwo.threeTempCheckList.length > 0) {
                        $scope.exceptionAndOnforeList = datathree.exceptionAndOnforeList;
                        for (var i = 0; i < datathree.exceptionAndOnforeList.length; i++) {
                            $scope.exceptionAndOnforeList[i].checkDate = $filter('date')(dataTwo.threeTempCheckList[i].checkDate, "yyyy-MM-dd");
                        }
                    }
                });
			});
		},function(data){
            console.log(data);
	    });
    }

    //页面校验
    var validator = $("#grain-form").validate();

    //周粮情分析提交
    $scope.save = function(type) {
        // 自定义验证，验证数字
        $.validator.addMethod("validYear",function(value,element, params) {
            var checkNumber = /^(1|2){1}[0-9]{3}$/g;
            if (this.optional(element)||(checkNumber.test(value))) {
                return true
            } else {
                return false;
            }
        },"请输入正确的年份，如：2019");
        $.validator.addMethod("validMonth",function(value,element, params) {
            var checkNumber = /^(0[1-9]{1})|(1[0-2]{1})$/g;
            if (this.optional(element)||(checkNumber.test(value))) {
                return true
            } else {
                return false;
            }
        },"请输入正确的月份，如：06或12");
    	if (validator.form()) {
    		if ($scope.exceptionAndOnforeList.length == 0) {
    			alert("没有当前条件下的检查数据，不允许提交！");
    			return;
    		}
    		monthAnalysisService.save($scope.grain, $scope.exceptionAndOnforeList, type, depotId, userId).then(function(data){
	    		if (data.status == 'success') {
	    			alert(data.msg);
	    		} else {
	                alert("保存失败！");
	            }
	    		$state.go('app.storage.grainAnalysis.monthList');
	        },function(data){
	            console.log(data);
	        });
    	}
    }

    //审核提交
    $scope.auditor_submit = function(type) {
    	if (validator.form()) {
    		monthAnalysisService.auditor_submit($scope.grain).then(function(data){
	    		if (data.status == 'success') {
	    			alert(data.msg);
	    		} else {
	                alert("审核失败！");
	            }
	    		$state.go('app.storage.grainAnalysis.monthList');
	        },function(data){
	            console.log(data);
	        });
    	}
    }

    //取消按钮
    $scope.retList = function() {
    	if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go('app.storage.grainAnalysis.monthList');
        }
    }
    
});