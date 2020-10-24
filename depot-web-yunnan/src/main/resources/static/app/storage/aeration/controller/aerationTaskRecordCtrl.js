"use strict";

angular.module('app.storage')
.controller("aerationTaskRecordCtrl", function($scope, $rootScope, $state, $http, $stateParams, 
		enumService, aerationTaskRecordService, APP_CONFIG) {

	// 获取基础数据
	$scope.getBasicData = function() {
		// 树形下拉框(粮食品种)
		enumService.getTreeListByTypeId($scope.aerationTaskRecord.foodType, 1061).then(function(data) {
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

	//通风申请列表数据查询
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.aerationTaskRecord = {houseId : "", foodType : "", aerationType : "", taskStatus : ""};
    $scope.loadData = function() {
    	$scope.getBasicData();
    	if ($scope.aerationTaskRecord.houseId == "") {
    		$scope.aerationTaskRecord.houseId = $rootScope.currentStore;
    	}
    	if($scope.aerationTaskRecord.foodType != undefined && $scope.aerationTaskRecord.foodType != ""){
    		$scope.aerationTaskRecord.foodType = $scope.aerationTaskRecord.foodType[0].id;
   	 	}
    	aerationTaskRecordService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.aerationTaskRecord, $rootScope.orgInfo.orgId).then(function(data){
    		$scope.pageInfo = data;
    		$scope.deptName = $rootScope.depotInfo.orgName;
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
		$scope.aerationTaskRecord.houseId = storehouseId;
        $scope.loadData();
    })

    //新增、查看或修改跳转到编辑页面
    $scope.edit = function(id,butId) {
    	$state.go('app.storage.taskDispatch.aerationTaskRecordEdit',{id:id,butId:butId});
    }
    
    //删除一条通风时间记录
    $scope.remove = function(id) {
    	if (!confirm("确定要删除吗？")) {
            return;
        }
    	aerationTaskRecordService.remove(id).then(function(data){
    		$scope.loadData();
    		if (data.status == 'success') {
    			alert("删除成功！");
    		} else {
                alert("删除失败！");
            }
        },function(data){
        	console.log(data);
        });
    }
})
.controller("aerationTaskRecordEdit", function($scope, $filter, $state, $rootScope, $http, $stateParams, 
		aerationTaskRecordService, aerationTaskService, foodbasicinfoService, storehouseBusinessService, APP_CONFIG) {
	
	$(document).ready(function() {
        $("#dtBox").DateTimePicker({
        });
    });

	// 获取基础数据
	$scope.getBasicData = function() {

//		$scope.storehouseList = $rootScope.storelist;
		$scope.storehouseObj = $rootScope.storehouseObj;

		//获取审批通过的通风作业数据中的仓房
		$scope.aerationTask = {taskStatus:"4"};
		$scope.userInfo = {userId: null};
		aerationTaskService.getPageInfo(null, null, $scope.aerationTask, null, $rootScope.userInfo).then(function(data){
			if (data != null) {
				var id = "";
				for (var i = 0; i < data.list.length; i++) {
					id = data.list[i].houseId;
					console.log($rootScope.storehouseObj[id].storehouseName);
					data.list[i].depotName = $rootScope.storehouseObj[id].storehouseName;
				}
			}
			$scope.houseList = data.list;
		},function (data) {
			console.log(data);
		});

	}
	
	// 用于存放粮温数据行
    $scope.tempList = [];
    // 用于存放水分数据行
    $scope.waterList = [];
	
	//通风时间记录初始化录入页面
    $scope.edit = function() {
    	$scope.getBasicData();
    	aerationTaskRecordService.edit($stateParams.id).then(function(data){
    		$scope.record = data.record;
    		$scope.tempList = data.tempList;
    		if ($scope.tempList != undefined) {
    			for (var i = 0; i < $scope.tempList.length; i++) {
    				$scope.tempList[i].checkDate = $filter('date')($scope.tempList[i].checkDate, "yyyy-MM-dd");
    			}
    		} else {
    			$scope.tempList = [];
    		}
    		$scope.waterList = data.waterList;
    		if ($scope.waterList != undefined) {
    			for (var i = 0; i < $scope.waterList.length; i++) {
    				$scope.waterList[i].checkDate = $filter('date')($scope.waterList[i].checkDate, "yyyy-MM-dd");
    			}
    		} else {
    			$scope.waterList = [];
    		}
    		$scope.lkmc = $rootScope.depotInfo.orgName;
    		$scope.last();
    		//格式化三个时间字段
    		$scope.record.startAerationTime = $filter('date')($scope.record.startAerationTime, "yyyy-MM-dd HH:mm:ss");
    		$scope.record.endAerationTime = $filter('date')($scope.record.endAerationTime, "yyyy-MM-dd HH:mm:ss");
    		console.log($stateParams.butId);
    		if ($stateParams.butId == 1) {
    			$scope.isNotEdit = true;
    			$scope.isNotEditHouseId = true;
    			$scope.notviewHouseId = false;
    			$scope.viewHouseId = true;
    		} else if($stateParams.butId == 2) {
    			$scope.isNotEditHouseId = true;
    			$scope.viewHouseId = false;
    			$scope.notviewHouseId = true;
    		} else if($stateParams.butId == 0){
    			$scope.record.inputDate = $filter('date')(new Date(), "yyyy-MM-dd");
    			$scope.viewHouseId = false;
    			$scope.notviewHouseId = true;
    		}
        },function(data){
            console.log(data);
        });
    }

    $scope.edit();
    
    //下一步
    $scope.next= function () {
    	if (validator.form()) {
    		$scope.isNext = true;
    		$scope.isLast = false;
    		$scope.nextButton = true;
    		$scope.lastButton = false;
    	}
    }
    //上一步
    $scope.last= function () {
    	$scope.isLast = true;
    	$scope.isNext = false;
    	$scope.nextButton = false;
    	$scope.lastButton = true;
    }

    //根据仓房ID获取一些数据
    $scope.getTaskRecord = function(houseId) {
    	//校验这个仓房有没有还没结束的数据
    	aerationTaskRecordService.checkHouseIsJS(houseId).then(function(data){
    		var flag = data.flag;
    		if (flag == 1) {
    			alert("您选择的仓房有未结束的通风任务，请不要重复添加！");
    			$scope.retrunTop();
    			return;
    		}
    		//获取作业申请信息
        	aerationTaskService.getTaskRecord(houseId, $rootScope.orgInfo.orgId).then(function(data){
        		$scope.record.taskId = data.taskId; //作业单号
        		$scope.record.aerationMachineCode = data.aerationMachineCode; //风机类型及型号
        		$scope.record.aerationType = data.aerationType; //通风方式
        		$scope.record.airflowDirection = data.airflowDirection; //气流方向
            },function(data){
                console.log(data);
            });
        	//仓房类型
        	$scope.record.houseType = $scope.storehouseObj[houseId].storehouseType;
    		//仓房尺寸
    		var cfcc = $scope.storehouseObj[houseId].length * $scope.storehouseObj[houseId].width;
        	$scope.record.houseSize = cfcc;
        	//获取储粮转卡信息
        	var keeper_ids = null;
        	foodbasicinfoService.findBasicinfoByStoreWarehouse(houseId,'').then(function(data){
        		if (data != null && data.length > 0) {
        			$scope.record.foodType = data[0].subType; //粮食品种
        			$scope.record.goodsNumber = data[0].number; //粮食数量
        			$scope.record.lineHeight = data[0].lineHeight; //粮线高度
        			$scope.record.keepUnite = data[0].keepUnite; //保管单位
        			$scope.record.recordUnite = data[0].recordUnite; //填卡单位
        			$scope.record.keeperIds = data[0].recorder;
        		} else {
        			$scope.record.foodType = ''; //粮食品种
        			$scope.record.goodsNumber = ''; //粮食数量
        			$scope.record.lineHeight = ''; //粮线高度
        			$scope.record.keepUnite = ''; //保管单位
        			$scope.record.recordUnite = ''; //填卡单位
        			$scope.record.keeperIds = '';
        		}
            },function(data){
                console.log(data);
            });
    	},function(data){
            console.log(data);
        });
    	
    }
    
    // 新增一行
    $scope.addRows = function(typeId) {
    	if (typeId === 0) {
    		$scope.tempList.push({checkType: 0});
    	} else if (typeId === 1) {
    		$scope.waterList.push({checkType: 1});
    	}
    }

    // 删除一行
    $scope.delRows = function(typeId, obj) {
	    var index;
	    if (typeId === 0) {
	    	// 如果有ID，说明当前数据已经是存在于数据库的，那么要郑重删除
		    if (obj.id != undefined) {
		    	$scope.deleteEdu(obj.id);
		    }
	    	index = $scope.tempList.indexOf(obj);
	    	$scope.tempList.splice(index, 1);
   	    } else if (typeId === 1) {
   	    	// 如果有ID，说明当前数据已经是存在于数据库的，那么要郑重删除
   		    if (obj.id != undefined) {
   		    	$scope.deleteEdu(obj.id);
   		    }
   	    	index = $scope.waterList.indexOf(obj);
   	    	$scope.waterList.splice(index, 1);
   	    }
    }
    
    $scope.deleteEdu = function(id) {
    	if (!confirm("当前数据已近存在于系统中，确定要删除吗？")) {
            return;
        }
		//提交
    	aerationTaskRecordService.removeCheckRecord(id).then(function(data){
    		if (data.status == 'success') {
    			alert("删除成功！");
    		} else {
                alert("删除失败！");
            }
        },function(data){
            console.log(data);
        });
    }

    //通风过程信息保存
    var validator = $("#aerationTaskRecord-form").validate();
    $scope.save = function() {
    	if (validator.form()) {
    		if ($scope.record.startAerationTime != undefined && $scope.record.startAerationTime != null && $scope.record.startAerationTime != '') {
				$scope.record.startAerationTime = new Date($scope.record.startAerationTime.replace(new RegExp(/-/gm) ,"/"));
			}
    		if ($scope.record.endAerationTime != undefined && $scope.record.endAerationTime != null && $scope.record.endAerationTime != '') {
				$scope.record.endAerationTime = new Date($scope.record.endAerationTime.replace(new RegExp(/-/gm) ,"/"));
			}
    		if (!confirm("是否要结束作业？结束作业后将不可以在做修改！")) {
    			$scope.record.taskStatus = 0;
            } else {//结束作业
            	$scope.record.taskStatus = 5;
            	$scope.record.taskEndTime = $filter('date')(new Date(), "yyyy-MM-dd");
            }
    		aerationTaskRecordService.save($scope.record, $scope.tempList, $scope.waterList, $rootScope.userInfo).then(function(data){
	    		if (data.status == 'success') {
	    			alert("保存成功！");
	    			//保存成功后更新仓房业务表的状态
	    			if ($scope.record.taskStatus == 5) {
	    				storehouseBusinessService.updateAerationTaskStatus($scope.record.houseId, null, $rootScope.orgInfo.orgId, "OFF").then(function(datas){
	    					
	    				},function(datas){
	    		            console.log(datas);
	    		        });
	    			}
	    		} else {
	                alert("保存失败！");
	            }
	    		$scope.retrunTop();
	        },function(data){
	            console.log(data);
	        });
    	}
    }
    
    //取消按钮
    $scope.retrunTop = function () {
    	if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go('app.storage.taskDispatch.aerationTaskRecordList');
        }
    }

});