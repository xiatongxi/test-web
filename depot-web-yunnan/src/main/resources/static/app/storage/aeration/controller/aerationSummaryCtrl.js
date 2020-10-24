"use strict";

angular.module('app.storage')
.controller("aerationSummaryCtrl", function($scope, $rootScope, $state, $http, $stateParams, enumService,
		aerationSummaryService, APP_CONFIG) {
	
	// 获取基础数据
	$scope.getBasicData = function() {
		// 树形下拉框(粮食品种)
		enumService.getTreeListByTypeId($scope.summary.goodsKinds, 1061).then(function(data) {
        	var data_new = $scope.data_add(data);
            $scope.grainAttributeTreeDataLspz = data_new;
        },function(data) {
            console.log(data);
        });
	}

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

	//通风记录列表数据查询
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.summary = {houseId : "", goodsKinds : "", aerationTarget : ""};
    $scope.loadData = function() {
    	$scope.getBasicData();
    	if ($scope.summary.houseId == "") {
    		$scope.summary.houseId = $rootScope.currentStore;
    	}
    	if($scope.summary.goodsKinds != undefined && $scope.summary.goodsKinds != ""){
    		$scope.summary.goodsKinds = $scope.summary.goodsKinds[0].id;
   	 	}
    	aerationSummaryService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.summary).then(function(data){
    		$scope.pageInfo = data;
    		$scope.deptName = $rootScope.depotInfo.orgName;
        },function(data){
            console.log(data);
        });
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
		$scope.summary.houseId = storehouseId;
        $scope.loadData();
    })

    //新增、修改或查看跳转到编辑页面
    $scope.edit = function(id, butType) {
    	//id:数据ID
    	$state.go('app.storage.taskDispatch.aerationSummaryEdit',{id:id,butType:butType});
    }

    //判断是否显示返回按钮
    $scope.isShow = "0";
    if ($stateParams.id != 0) {
        $rootScope.isIndexPage = true;
        $scope.summary.houseId = $stateParams.id*1;
        $scope.isShow = "1";
        $scope.loadData();
    }else{
        $scope.loadData();
    }

    //返回上一个链接页面
    $scope.returnUp = function(){
        if($stateParams.homePage == "SY"){//判断是否是从首页进来
            $state.go('app.dashboard');
        }else {
            $state.go('app.supervise.cameraPT');
        }
    }
})
.controller("aerationSummaryEdit", function($scope, $filter, $rootScope, $state, $http, $stateParams, 
		foodbasicinfoService, aerationTaskRecordService, aerationSummaryService, aerationTaskService, APP_CONFIG) {
    $(document).ready(function() {
        $("#dtBox").DateTimePicker({
        });
    });

	// 获取基础数据
	$scope.getBasicData = function() {
		//获取已经结束通风但是没有进行善后工作的仓房数据
		aerationTaskRecordService.getNotAftercareHouseList($rootScope.orgInfo.orgId).then(function(data){
			if (data != null && data.length > 0) {
				for (var i = 0; i < data.length; i++) {
					data[i].taskId = $rootScope.storehouseObj[data[i].houseId].storehouseName;
				}
			}
			$scope.houseList = data;
		},function (data) {
			console.log(data);
		});
	}

	//通风记录编辑页面初始化
    $scope.edit = function() {
    	if ($stateParams.butType != 1) {//查看
    		$scope.getBasicData();
    	}
    	aerationSummaryService.edit($stateParams.id).then(function(data){
    		$scope.summary = data;
    		$scope.lkmc = $rootScope.depotInfo.orgName;
    		
    		//通风开始和结束时间格式化
    		$scope.summary.startAerationTime = $filter('date')($scope.summary.startAerationTime, "yyyy-MM-dd HH:mm:ss");
    		$scope.summary.endAerationTime = $filter('date')($scope.summary.endAerationTime, "yyyy-MM-dd HH:mm:ss");
    		$scope.summary.inputDate = $filter('date')($scope.summary.inputDate, "yyyy-MM-dd");
    		if ($stateParams.butType == 1) {//查看
    			$scope.viewHouse = false;
    			$scope.editHouse = true;
    			$scope.isNotEdit = true;
    			$scope.isNotEditHouseId = true;
    			
    		} else if ($stateParams.butType == 2) {//修改
    			$scope.viewHouse = false;
    			$scope.editHouse = true;
    			$scope.isNotEdit = false;
    			$scope.isNotEditHouseId = true;
    			$scope.isNotViewHouseId = true;
    		} else {//新增
    			$scope.summary.createPerson = $rootScope.userInfo.realName;
    			$scope.summary.inputDate = $filter('date')(new Date(), "yyyy-MM-dd");
    			$scope.viewHouse = true;
    			$scope.editHouse = false;
    			$scope.isNotEdit = false;
    			$scope.isNotViewHouseId = true;
    		}
        },function(data){
            console.log(data);
        });
    }

    $scope.edit();
    
    $scope.getTaskRecord = function(houseId) {
    	aerationTaskRecordService.getTaskRecord(houseId, $rootScope.orgInfo.orgId).then(function(data){
    		$scope.summary.taskCode = data.taskId; //任务号
    		$scope.summary.goodsKinds = data.foodType; //粮食品种
    		$scope.summary.aerationTarget = data.aerationType; //通风方式
    		$scope.summary.keeperName = data.keeperIds; //保管员
    		$scope.summary.startAerationTime = $filter('date')(data.startAerationTime, "yyyy-MM-dd HH:mm:ss"); //开始通风时间
    		$scope.summary.endAerationTime = $filter('date')(data.endAerationTime, "yyyy-MM-dd HH:mm:ss"); //结束通风时间
    		$scope.summary.stopAerationTime = data.stopAerationTime; //停机时间
    		$scope.summary.sumAerationTime = data.sumAerationTime; //累计通风时间
        },function(data){
            console.log(data);
        });
    }
    
    //保存
    var validator = $('#summary-form').validate();
    $scope.save = function(type) {
    	if (validator.form()) {
    		$scope.taskStatus = 5; 
    		if ($scope.summary.startAerationTime != undefined && $scope.summary.startAerationTime != null && $scope.summary.startAerationTime != '') {
				$scope.summary.startAerationTime = new Date($scope.summary.startAerationTime.replace(new RegExp(/-/gm) ,"/"));
			}
    		if ($scope.summary.endAerationTime != undefined && $scope.summary.endAerationTime != null && $scope.summary.endAerationTime != '') {
				$scope.summary.endAerationTime = new Date($scope.summary.endAerationTime.replace(new RegExp(/-/gm) ,"/"));
			}

    		aerationSummaryService.save($scope.summary, $scope.taskStatus, $rootScope.orgInfo.orgId).then(function(data){
    			if (data.status == 'success') {
    				alert(data.msg);
    			} else {
    				alert("保存失败！");
    			}
    			$state.go('app.storage.taskDispatch.aerationSummaryList');
    		},function(data){
    			console.log(data);
    		});
    	}
    }

    //取消
    $scope.retrunTop = function() {
    	if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go('app.storage.taskDispatch.aerationSummaryList');
        }
    }

});