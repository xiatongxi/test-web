angular.module('app.storage')
	.controller("ChangestoreCtrl", function($scope, $rootScope, $state,$stateParams, ChangestoreService, $http) {

     // 获取列表数据
	 $scope.pageInfo = {pageNum : 1, pageSize : 10};
	 $scope.searchCondition = {
			businessNo : "", //申请倒仓单号
			applyTimeA : "", //申请日期
			applyTimeB : "" //申请日期
	 };
     //查询分页
     $scope.loadData = function() {
    	 ChangestoreService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, 
    			 $scope.depotId, $scope.searchCondition.businessNo, $scope.searchCondition.applyTimeA,
    			 $scope.searchCondition.applyTimeB).then(function(data){
    				 $scope.pageInfo = data;
    	 },function(data){
    		 console.log(data);
    	 });
     }
     $scope.loadData();
    
     //新增功能
     $scope.add = function(id, btnType) {
    	 $state.go('app.storage.changestorage.ChangeStorageCtrlEdit',{id:id, orgId:$rootScope.orgInfo.orgId});
     }
     //查看功能
     $scope.showdata = function(businessNo) {
    	 $state.go('app.storage.changestorage.ChangeStorageCtrlEdit',{id:businessNo, orgId:$rootScope.orgInfo.orgId, isNotEdit:true});
     }
     //修改功能
     $scope.update = function(businessNo) {
    	 $state.go('app.storage.changestorage.ChangeStorageCtrlEdit',{id:businessNo, orgId:$rootScope.orgInfo.orgId});
     }
     //删除一条记录
     $scope.remove = function(changestorage){
    	 if (changestorage.isUpload != "0" && changestorage.isUpload == "1") {
    		  alert("您已经提交该数据，无法删除！");
              return;
           }
           	if (!confirm("确定要删除吗？")) {
               return;
           	}
             ChangestoreService.removeChangeData(changestorage.businessNo).then(function(data){
            	 if (data.status == 'success') {
     				alert("删除成功！");
     				$scope.loadData();
     			} else {
     				alert("删除失败！");
     			}
            	 });
             }
    
     //提交数据到省平台
 	$scope.present = function(changestorage) {
 		ChangestoreService.present(changestorage, $rootScope.crk_webserviceip).then(function(data){
 			if (data.status == 'success') {
 				alert("上传成功！");
 				$scope.loadData();
 			} else {
 				alert("上传失败！");
 			}
 			$state.go('app.storage.changestorage.changeList');
 		});
 	}
     // 翻页
   	$scope.goPage = function(pageNum) {
   		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
        		$scope.pageInfo.pageNum = pageNum;
        		$scope.loadData();
        	}
   	}
})
.controller("ChangeStorageCtrlEdit", function($scope, commonUtilService, $rootScope, $state, $stateParams, ChangestoreService, warehouseService, $uibModal, 
		enumService, foodbasicinfoService, codeRuleService, userService,FileUploader,
        contractService, storeWareDetailService, APP_CONFIG, businessFileService) {
	//初始化获取单号，总重量等...
	 $scope.changestorage = {};
	 $scope.addDcsl = [];
	 $scope.linenumbers = [];
	 $scope.isNotEdit = false;
	 $scope.change = 0;
	 $scope.taskDetail = 0;
	 $scope.initializaTionChange = function() {
		// 获取倒仓申请单号.
		$scope.Edit = true;
	    codeRuleService.getCodeValueByType("busineNo", $rootScope.userInfo.orgId).then(function(data) {
	        if (data.status == "success") {
	            $scope.changestorage.businessNo = data.codeValue;
	        } else if (data.status == "error") {
	            if(confirm("倒仓申请单号有误！该页面无法保存")) {
	                $scope.retList();
	            }
	        }
	    });
	}
	 if($stateParams.id == 0) {
	$scope.initializaTionChange();
	 }
	// 点击新增时弹出模态窗
    $scope.addRow = function() {
    	// 先判断数量,如果数量没填写，需要先填写，才能新增.
		var params = [];
		var uibModalInstance = $uibModal.open({
            size:'lg',  
            clickOutsideToClose:true,
            templateUrl: 'app/storage/changestorage/views/ChangeModal.html',
            controller: 'ChangeModalCtrlModal',
            resolve: {
            	// items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params; 
                }
            }  
		}); 
		uibModalInstance.result.then(function (result) {
			if (result != null && result != undefined && result != '') {
				$scope.addDcsl.push(angular.copy(result));
				  $scope.ChangePlanPour();
			}
	    }, function (result) {
	        console.log(result);
	    });
	}
    //遍历得到总数量值
    $scope.ChangePlanPour = function() {
    	for (var i=0; i < $scope.addDcsl.length; i++) {
    		if(i == 0){
    			$scope.changestorage.planPourInSum = $scope.addDcsl[i].pourOutNum;
    			$scope.changestorage.planPourOutSum = $scope.addDcsl[i].pourOutNum;
    		}else{
    			$scope.changestorage.planPourOutSum = commonUtilService.accAdd($scope.changestorage.planPourInSum,$scope.addDcsl[i].pourOutNum);
    			$scope.changestorage.planPourInSum = commonUtilService.accAdd($scope.changestorage.planPourInSum,$scope.addDcsl[i].pourOutNum);
    		}
    	 }
    }
    //子表编辑
    $scope.editRow = function(changestorageDetail){
    	// 索引，用来保存模态框返回的数据.
    	var index = $scope.addDcsl.indexOf(changestorageDetail);
    	var params = [];
    	params.houseId = changestorageDetail.houseId;
    	params.wareId = changestorageDetail.wareId;
    	params.lspz = changestorageDetail.lspz;
    	params.pourOutNum = changestorageDetail.pourOutNum;
    	params.rksj = changestorageDetail.rksj;
    	params.ccfs = changestorageDetail.ccfs;
    	params.storehouseId = changestorageDetail.storehouseId;
    	params.warehouseId = changestorageDetail.warehouseId;
    	params.pourInNum = changestorageDetail.pourInNum;
    	params.keepingWay = changestorageDetail.keepingWay;
    	var uibModalInstance = $uibModal.open({
            size:'lg',  
            clickOutsideToClose:true,
            templateUrl: 'app/storage/changestorage/views/ChangeModal.html',
            controller: 'ChangeModalCtrlModal',
            resolve: {
            	// items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params; 
                }
            }  
		});
    	uibModalInstance.result.then(function (result) {
			if (result != null && result != undefined && result != '') {
				$scope.addDcsl[index].houseId = result.houseId;
				$scope.addDcsl[index].wareId = result.wareId;
				$scope.addDcsl[index].lspz = result.lspz;
				$scope.addDcsl[index].pourOutNum = result.pourOutNum;
				$scope.addDcsl[index].rksj = result.rksj;
				$scope.addDcsl[index].ccfs = result.ccfs;
				$scope.addDcsl[index].storehouseId = result.storehouseId;
				$scope.addDcsl[index].warehouseId = result.warehouseId;
				$scope.addDcsl[index].pourInNum = result.pourInNum;
				$scope.addDcsl[index].keepingWay = result.keepingWay;
			}
    	}, function (result) {
    		console.log(result);
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
  /*//新增一行附件信息
	$scope.addFile = function() {
		if ($scope.linenumbers.length == 0 ) {
			$scope.linenumbers.push(0);
		} else {
			var maxlinenumber = Math.max.apply(null, $scope.linenumbers);
			$scope.linenumbers.push(maxlinenumber + 1);
		}
	}*/
    //查看功能
    $scope.showData = function(id, orgId) {
    	ChangestoreService.findChangeData(id, orgId).then(function(data){
    		$scope.changestorage= data.ChangeStoragehouseTask[0];
    		$scope.StorageChangeStoragehouseTaskDetail = data.StorageChangeStoragehouseTaskDetail;
    		$scope.fileList = data.fileList;
    		 for (var i=0; i < data.StorageChangeStoragehouseTaskDetail.length; i++) {
                 $scope.addDcsl.push(angular.copy(data.StorageChangeStoragehouseTaskDetail[i]));
             }
    	});
    }
  //判断功能点
    if($stateParams.id != 0) {
   	 $scope.isNotEdit = $stateParams.isNotEdit;
        if ($stateParams.isNotEdit == "true") {
            // 查看.
        	$scope.isEdit = true;
            $scope.showData($stateParams.id, $stateParams.orgId);
        } else {
            // 编辑
        	$scope.isEdit = false;
        	$scope.Edit = true;
        	$scope.change = 1;
        	$scope.showData($stateParams.id, $stateParams.orgId);
        }
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
	    	$scope.ChangePlanPour();
	    }
    
	  //提交数据到省平台
	 	$scope.up = function(businessNo) {
	 		ChangestoreService.up(businessNo).then(function(data){
	 			if (data.status == 'success') {
	 				alert("上传成功！");
	 			} else {
	 				alert("上传失败！");
	 			}
	 			$state.go('app.storage.changestorage.changeList');
	 		});
	 	}
	 	//-----------------------------------------------   文件上传下载相关     开始------------------------------------------------
	    var bid = null;
		// 添加一行，取最大值加1放入数组
		$scope.linenumber = 0;
		$scope.linenumbers = [];
		if ($stateParams.id == '') {
			$scope.linenumbers = [0];
		}
		
		// 新增一行
		$scope.addFile = function() {
			if ($scope.linenumbers.length == 0 ) {
				$scope.linenumbers.push(0);
			} else if($scope.fileItem === undefined || $scope.fileItem === null){
				alert("请先添加文件,再添加浏览框.");
				return;
			}else {
				var maxlinenumber = Math.max.apply(null, $scope.linenumbers);
				$scope.linenumbers.push(maxlinenumber + 1);
				$scope.fileItem = null;
			}
		}
		
		// 文件上传实例
		$scope.fileIds = [];
		
		// 以linenumber为key,以新增的附件对应为value.
		$scope.fileMap = new Map();
		
		// 上传.
		$scope.uploader = new FileUploader({
			//url : APP_CONFIG.businessUrl + '/depot/business/file/uploadFile',
			url : APP_CONFIG.basicUrl + '/fileUpload/updateFileBusiness',
			autoUpload : true, // 将文件添加到队列后自动上传.
			formData : [{type : 'change',userId:$rootScope.userInfo.userId,orgId:$rootScope.userInfo.orgId}], // 与文件一起发送的数据
			
			//url : APP_CONFIG.basicUrl + '/fileUpload/uploadFile',
			//headers : {'content-type':"text/plain;charset=UTF-8"},
			//formData : [{type : 'plan'}], // 与文件一起发送的数据
			removeAfterUpload : true, // 从队列上传后删除文件
			// 上传进度
			
			onProgressItem : function(fileItem, progress) {
				$scope.fileItem = fileItem;
				if(progress==100){
					alert("上传成功！");
				}
				// console.info("正在上传：" + progress + "%");
			},
			// 回调函数，在一个文件上传成功后触发
			
			onSuccessItem : function(fileItem, response, status, headers) {
				
				// 将新fileId加入到fileIds.
				$scope.fileIds.push(response.id);
				// 如果已经存在对应的fileId，先从$scope.fileIds中移除，再添加.
				if ($scope.fileMap.has($scope.linenumber)) {
					// 原fileId.
					var fileId = $scope.fileMap.get($scope.linenumber).id;
					// 从$scope.fileIds中移除原fileId.
					var index = $scope.fileIds.indexOf(fileId);
			        if (index != -1) {
			            // 后台删除.
			            $scope.deleteFileByFileId(fileId);
			        }
				}
				
				$scope.fileMap.set($scope.linenumber, response);
				
			}
		});
		
		// 点击文件框
		$scope.clickInput = function(index) {
			$scope.linenumber = index;
	        document.activeElement.previousSibling.children[0].click();
			// console.log(angular.element("#fileInputId" + index));
			// angular.element("#fileInputId" + index).trigger('click');
		}
		
		
		// 点击浏览按钮.
		$scope.clickFileInput = function(index) {
			$scope.linenumber = index;
		}
		
		// 下载文件
		$scope.download = function(filePath, originalFileName) {
			$("#filePath").val(filePath);
			$("#type").val("business");
			$("#originalFileName").val(originalFileName);
			$("#download-form").attr("action", APP_CONFIG.businessUrl + '/download');
			$("#download-form").submit();
	    	
		}
		
		// 文件上传实例
		$scope.deleteFileIds = [];
		// 回显删除.
		$scope.deleteFile = function(file) {
			// 回显删除，先不真正删除，把要删除的附件id保存在数组中，再最后保存的时候传递给后台，进行删除.
			$scope.deleteFileIds.push(file.id);
			
			// 删除文件和数据库信息.
			// $scope.deleteFileByFileId(file.id);
			
			// 从$scope.fileList 移除.
			var index = $scope.fileList.indexOf(file);
			if (index != -1) {
				$scope.fileList.splice(index, 1);
			}
		}
		
		$scope.deleteFileByLinenumber = function(linenumber) {
			var index = $scope.linenumbers.indexOf(linenumber);
	        if (index != -1) {
	        	// 从linenumbers移除.
	            $scope.linenumbers.splice(index, 1);
	            
	            if ($scope.fileMap.has($scope.linenumber)) {
	            	// 以linenumber为key从$scope.fileMap获取fileId.
	            	   var fileId = $scope.fileMap.get($scope.linenumber).id;
			        	// 后台删除数据和文件.
			        	$scope.deleteFileByFileId(fileId, index);
			        	
			        	// 从$scope.fileMap移除.
			        	$scope.fileMap.delete(linenumber);
				}
	        }
		}
		
		$scope.deleteFileByFileId = function(fileId) {
			businessFileService.remove(fileId).then(function(data){
				if (data.status == "success") {
		    		// 删除成功.
		    		var index = $scope.fileIds.indexOf(fileId);
		        	if (index != -1) {
			        	// 从$scope.fileIds中移除.
			        	$scope.fileIds.splice(index, 1);
		        	}
		    	}
			},function (data) {
				console.log(data);
			});
		}
		
		// 新增预览.
		$scope.showFileByLinenumber = function(linenumber) {
			if ($scope.fileMap.has($scope.linenumber)) {
	        	// 以linenumber为key从$scope.fileMap获取filePath.
	        	var filePath = $scope.fileMap.get($scope.linenumber).filePath;
	        	window.open(filePath);
			}
		}
		
		// 回显预览.
		$scope.showFile = function(filePath, originalFileName) {
			window.open(filePath);
		}
		//-----------------------------------------------   保存数据------------------------------------------------
	// 提交表单
    var validator = $("#changeStore-form").validate();
    $scope.save = function() {
    	if (validator.form()) {
    		if ($scope.addDcsl.length == 0) {
    			alert("至少填写一条完整的明细信息！");
    			return;
    		}
    		ChangestoreService.save($scope.change, $rootScope.crk_webserviceip, $scope.changestorage, $scope.addDcsl, $scope.fileIds).then(function(data){
    			if (data.status == 'success') {
    				alert("保存成功！");
    			} else {
    				alert("保存失败！");
    			}
    			$state.go("app.storage.changestorage.changeList");
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
.controller("ChangeModalCtrlModal", function($scope, items, $uibModalInstance, $rootScope, $state,$stateParams, ChangestoreService, warehouseService, 
		enumService, foodbasicinfoService, userService,FileUploader,
        contractService, storeWareDetailService, commonUtilService, codeRuleService, APP_CONFIG) {
	//获取
	$scope.changestorageDeta = {};
	$scope.changestorageDetail = {houseId : "", wareId : ""};
	$scope.getChangestorageData = function(houseId) {
		var depotId = $rootScope.orgInfo.orgId;
		warehouseService.getStorehouse(depotId, houseId, "0").then(function(data){
			$scope.warehouseList = data.wareList;
			$scope.changestorageDetail.wareId = "";
			$scope.changestorageDetail.pourOutNum = "";
			$scope.changestorageDetail.pourInNum = "";
			$scope.changestorageDetail.rksj = "";
			$scope.changestorageDetail.lspz = "";
		},function (data) {
			console.log(data);
		});
	};
	//获取粮食品种树形下拉
	$scope.findLspz = function(){
    	enumService.getTreeListByTypeId($scope.changestorageDetail.lspz, 1061).then(function(data) {
    		$scope.grainAttributeTreeDataLspz = data;
    	},function(data) {
    		console.log(data);
    	});
    }
    $scope.findLspz();
	//根据仓房货位带出储量专卡
	$scope.getFoodBasicInfoList = function(houseId, wareId){
		foodbasicinfoService.findBasicinfoByStoreWarehouse(houseId, wareId).then(function(data){
			$scope.changestorageDeta = data[0];
			$scope.changestorageDetail.pourOutNum = $scope.changestorageDeta.number;
			$scope.changestorageDetail.pourInNum = $scope.changestorageDeta.number;
			$scope.changestorageDetail.rksj = $scope.changestorageDeta.fillingTime;
			$scope.changestorageDetail.lspz = $scope.changestorageDeta.subType;
		},function (data) {
			console.log(data);
		});
		
	};
	$scope.getPourInNum = function(pourOutNum) {
		if (pourOutNum > $scope.changestorageDeta.number){
			alert("请输入少于所带出数量");
			$scope.changestorageDetail.pourOutNum = "";
			$scope.changestorageDetail.pourInNum = "";
		}else{
			$scope.changestorageDetail.pourInNum = pourOutNum;	
		}
	};
	//倒入仓房货位
	$scope.changestorageDetail = {storehouseId : "", warehouseId : ""};
	$scope.getChangeData = function(storehouseId) {
		//按照单位获取单位下的仓房信息
		var depotId = $rootScope.orgInfo.orgId;
		warehouseService.getStorehouse(depotId, storehouseId).then(function(data){
			$scope.warehouList = data.wareList;  //下拉列表数据
			$scope.warehouseObj = data.wares;	//查询数据列表货位信息转换	
		},function (data) {
			console.log(data);
		});
	};
	$scope.getChangeData();
	
	if (items != undefined) {
		$scope.changestorageDetail.houseId = items.houseId;
		$scope.changestorageDetail.wareId = items.wareId;
		$scope.changestorageDetail.lspz = items.lspz;
		$scope.changestorageDetail.pourOutNum = items.pourOutNum;
		$scope.changestorageDetail.rksj = items.rksj;
		$scope.changestorageDetail.ccfs = items.ccfs;
		$scope.changestorageDetail.storehouseId = items.storehouseId;
		$scope.changestorageDetail.warehouseId = items.warehouseId;
		$scope.changestorageDetail.pourInNum = items.pourInNum;
		$scope.changestorageDetail.keepingWay = items.keepingWay;
	}
	 // 提交表单
    $scope.save = function() {
    	if($scope.changestorageDetail.houseId != null && $scope.changestorageDetail.houseId != undefined && $scope.changestorageDetail.houseId != ''){
    		$uibModalInstance.close($scope.changestorageDetail);
    	}else{
    		alert("请至少输入一条数据");
    	}
    	
    }
	// 关闭模态窗口
	$scope.cancel = function() {
		$uibModalInstance.close();
	}
})