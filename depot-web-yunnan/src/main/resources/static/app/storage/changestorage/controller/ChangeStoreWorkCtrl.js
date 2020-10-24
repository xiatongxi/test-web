angular.module('app.storage')
	.controller("ChangeStoreWorkCtrl", function($scope, $rootScope, $state,$stateParams, ChangestoreService) {
	 $scope.changestorage = {};
     // 获取列表数据
	 $scope.pageInfo = {pageNum : 1, pageSize : 10};
	 $scope.searchCondition = {
			planStartDateA : "", //倒仓日期
			planStartDateB : "" //倒仓日期
	 };
     //查询分页
     $scope.loadData = function() {
    	 ChangestoreService.getWorkPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, 
    			 $scope.depotId, $scope.searchCondition.planStartDateA, $scope.searchCondition.planStartDateB).then(function(data){
    				 $scope.pageInfo = data;
    	 },function(data){
    		 console.log(data);
    	 });
     }
     $scope.loadData();
    
     //新增功能
     $scope.add = function(id, btnType) {
    	 $state.go('app.storage.changestorage.changeStoreWorkCtrlEdit',{id:id, orgId:$rootScope.orgInfo.orgId});
     }
     //查看功能
     $scope.showdata = function(workNo) {
    	 $state.go('app.storage.changestorage.changeStoreWorkCtrlEdit',{id:workNo, orgId:$rootScope.orgInfo.orgId});
     }
     // 翻页
   	$scope.goPage = function(pageNum) {
   		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
        		$scope.pageInfo.pageNum = pageNum;
        		$scope.loadData();
        	}
   	}
})
.controller("changeStoreWorkCtrlEdit", function($scope, commonUtilService, $rootScope, $state, $stateParams, ChangestoreService, warehouseService, $uibModal, enumService, foodbasicinfoService, codeRuleService) {
	//初始化获取单号，总重量等...
	 $scope.changestorage = {};
	 $scope.changestorageDeta = {};
	 $scope.change = 0;
	 $scope.addDcsl = [];
	 $scope.linDcsl = [];
	 $scope.taskDetail = 0;
	 $scope.linData = {
			 houseId : "",
	 		 wareId : "",
	 		 lspz : "",
	 		 changIndex : "",
	 		 qichuNum : "",
	 		 pourOutNum : "",
	 		 surplusNum :"",
	 		 storehouseId : "",
	 		 warehouseId : "",
	 		 beginNum : "",
	 		 pourInNum : "",
	 		 resultNum : ""
	 };
	 $scope.initializaTionChange = function() {
	 // 获取倒仓作业单号.
	    codeRuleService.getCodeValueByType("workNo", $rootScope.userInfo.orgId).then(function(data) {
	        if (data.status == "success") {
	            $scope.changestorage.workNo = data.codeValue;
	        } else if (data.status == "error") {
	            if(confirm("倒仓申请单号有误！该页面无法保存！原因：" + $scope.planNumber.msg + " 是否返回到列表页！")) {
	                $scope.retList();
	            }
	        }
	    });
	}
	// 点击倒仓申请单号时弹出模态框
	$scope.addRow = function() {

		var params = [];
		var uibModalInstance = $uibModal.open({
			size:'lg',
			templateUrl: 'app/storage/changestorage/views/ChangeWorkModal.html',
			controller: 'changeWorkModelCtrl',
			resolve: {
				// items是一个回调函数
				items: function () {
					// 这个值会被模态框的控制器获取到
					return params;
				}
			}
		});
		uibModalInstance.result.then(function(result) {
			if (result != null && result != undefined && result != '') {
				angular.forEach(result , function (i) {
					$scope.linData.houseId = i.houseId;
					$scope.linData.wareId = i.wareId;
					$scope.linData.lspz = i.lspz;
					$scope.linData.qichuNum = i.qichuNum;
					$scope.linData.pourOutNum = i.pourOutNum;
					$scope.linData.surplusNum = commonUtilService.accSub($scope.linData.qichuNum, $scope.linData.pourOutNum);
					$scope.linData.storehouseId = i.storehouseId;
					$scope.linData.warehouseId = i.warehouseId;
					$scope.linData.beginNum = i.qichuNum;
					$scope.linData.pourInNum = i.pourOutNum;
					$scope.linData.resultNum = commonUtilService.accSub($scope.linData.beginNum, $scope.linData.pourInNum);
					$scope.linDcsl.push(angular.copy(i)); 
					$scope.linData.changIndex = $scope.addDcsl.length;
					$scope.addDcsl.push(angular.copy($scope.linData));
		        })
		        $scope.initializaTionChange();
		        $scope.showChangeWorkData();
			}
		}, function (result) {
			console.log(result);
		});
	}
	//通过修改计划倒出数量计算结余数量
	$scope.changeNum = function(changestorageDetail){
		if(changestorageDetail.pourOutNum>$scope.addDcsl[changestorageDetail.changIndex].qichuNum){
			alert("输入数量不可大于期初数量");
			$scope.addDcsl[changestorageDetail.changIndex].pourOutNum = "";
			$scope.addDcsl[changestorageDetail.changIndex].pourInNum = "";
			$scope.addDcsl[changestorageDetail.changIndex].surplusNum = commonUtilService.accSub($scope.addDcsl[changestorageDetail.changIndex].qichuNum, $scope.addDcsl[changestorageDetail.changIndex].pourOutNum);
			$scope.addDcsl[changestorageDetail.changIndex].resultNum = commonUtilService.accSub($scope.addDcsl[changestorageDetail.changIndex].beginNum, $scope.addDcsl[changestorageDetail.changIndex].pourOutNum);
		}else{
			$scope.addDcsl[changestorageDetail.changIndex].pourOutNum = changestorageDetail.pourOutNum;
			$scope.addDcsl[changestorageDetail.changIndex].pourInNum = changestorageDetail.pourOutNum;
			$scope.addDcsl[changestorageDetail.changIndex].surplusNum = commonUtilService.accSub($scope.addDcsl[changestorageDetail.changIndex].qichuNum, $scope.addDcsl[changestorageDetail.changIndex].pourOutNum);
			$scope.addDcsl[changestorageDetail.changIndex].resultNum = commonUtilService.accSub($scope.addDcsl[changestorageDetail.changIndex].beginNum, $scope.addDcsl[changestorageDetail.changIndex].pourOutNum);
		}
	}
   //通过子表中的申请单号取主表数据进行回显
	$scope.showChangeWorkData = function(){
		$scope.changeBusinessNo = $scope.linDcsl[0].businessNo;
		ChangestoreService.fandChangeWorkData($scope.changeBusinessNo).then(function(data){
			$scope.changestorage = data.ChangeStoragehouseTask[0];
		});
	}
	
  $scope.data_add = function(data) {
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
	//查看功能
	  $scope.showData = function(id, orgId) {
	  	ChangestoreService.findWorkData(id, orgId).then(function(data){
	  		$scope.changestorage= data.ChangeStoragehouseTask[0];
	  		$scope.StorageChangeStoragehouseWorkTask = data.StorageChangeStoragehouseWorkTask;
	  		 for (var i=0; i < data.StorageChangeStoragehouseWorkTask.length; i++) {
	               $scope.addDcsl.push(angular.copy(data.StorageChangeStoragehouseWorkTask[i]));
	           }
	  	});
	  }
	//判断功能点
	  if($stateParams.id != 0) {
	 	 $scope.isNotEdit = true;
	      // 查看.
	      $scope.showData($stateParams.id, $stateParams.orgId);
	 }
   // 删除一行
   $scope.delRow = function(changestorageDetail) {
	    var index;
	    	if ($scope.addDcsl.length <=1 ) {
	            alert("至少要有一条倒仓数据！");
	            return;
	        }
	    	// 如果有ID，说明当前数据已经是存在于数据库的，那么要郑重删除
	    	index = $scope.addDcsl.indexOf(changestorageDetail);
	    	$scope.addDcsl.splice(index, 1);
	    }
	// 提交表单
   var validator = $("#changeStore-form").validate();
   $scope.save = function() {
   	if (validator.form()) {
   		if ($scope.addDcsl.length == 0) {
   			alert("至少填写一条完整的明细信息！");
   			return;
   		}
   		ChangestoreService.updataChangeWork($scope.changestorage, $scope.addDcsl).then(function(data){
   			if (data.status == 'success') {
   				alert("保存成功！");
   			} else {
   				alert("保存失败！");
   			}
   			$state.go("app.storage.changestorage.changestorework");
   		},function(data){
   			console.log(data);
   		});
   		}
   	}
   //查看时调用函数
   $scope.returnTop = function() {
   	if ($rootScope.previousState_name != '') {
       	$rootScope.back();
       } else {
       	$state.go("app.storage.changestorage.changeList");
       }
   }
})
.controller("changeWorkModelCtrl", function($scope, $rootScope, $uibModalInstance, $state, $stateParams, ChangestoreService, warehouseService, $uibModal, enumService, foodbasicinfoService, codeRuleService) {
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.changeWorkDetail = [];
	$scope.changestorageDetail = {};
	// 获取列表数据
	$scope.loadData = function(applyStatus) {
		ChangestoreService.getChangeDataPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, applyStatus).then(function(data) {
			$scope.pageInfo = data;
		}).catch(function(data) {
			if (data.status == 601) {
				// session失效，关闭模态框.
				$uibModalInstance.close();
			}
		});
	}
	// 默认执行.
	$scope.loadData(2);

	// 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
			 $scope.pageInfo.pageNum = pageNum;
			 $scope.loadData(pageNum, 10, $scope.changestorageDetail);
		 }
	}

	// 关闭模态窗口
	$scope.cancel = function() {
		$uibModalInstance.close();
	}

	//被选中的数据对象
	$scope.selected = [];
	
	// 勾选一条验收数据
	$scope.selectData = function($event, check) {
		var checkbox = $event.target;
        var checked = checkbox.checked;
        if(checked){
            $scope.selected.push(check);
        }else{
            var idx = $scope.selected.indexOf(check);
            $scope.selected.splice(idx,1);
        }
	}

	//点确定按钮
	$scope.check = function () {
		$uibModalInstance.close($scope.selected);
	}
	// 选择计划，
    $scope.selectCheck = function(check) {
        $uibModalInstance.close(check);
    }
})