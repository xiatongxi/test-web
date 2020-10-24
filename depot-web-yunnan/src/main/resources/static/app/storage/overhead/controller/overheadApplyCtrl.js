"use strict";

angular.module('app.storage')
.controller("overheadApplyCtrl", function($scope, $rootScope, $state, $uibModal, enumService, overheadSetService, APP_CONFIG) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.searchCondition = {
			isUpload : "", //状态
			sqrqA: "",  //申请日期
			sqrqB : ""  //申请日期
	 };
    $scope.loadData = function() {
    	overheadSetService.getApplyPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition.isUpload,
    			$scope.searchCondition.sqrqA, $scope.searchCondition.sqrqB).then(function(data){
    		$scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }

    $scope.loadData();
  //新增功能
    $scope.add = function() {
   	 $state.go('app.storage.overhead.overheadAddCtrl',{orgId:$rootScope.orgInfo.orgId});
    }
  //查看功能
    $scope.showdata = function(yqsqNo) {
   	 $state.go('app.storage.overhead.overheadAddCtrl',{id:yqsqNo, orgId:$rootScope.orgInfo.orgId, isNotEdit:true});
    }
    //修改功能
    $scope.update = function(yqsqNo) {
   	 $state.go('app.storage.overhead.overheadAddCtrl',{id:yqsqNo, orgId:$rootScope.orgInfo.orgId});
    }
    //删除功能
    $scope.remove = function(overApply){
   	 if (overApply.id != null && overApply.id != undefined && overApply.id != '') {
            if (!confirm("此条数据为之前保存的数据，确定要删除吗？")) {
                return;
            }
            overheadSetService.removeOverApplyData(overApply.yqsqNo).then(function(data){
           	 if (data.status == 'success') {
    				alert("删除成功！");
    				$scope.loadData();
    			} else {
    				alert("删除失败！");
    			}
    			$state.go('app.storage.overhead.getApplyList');
           	 });
        }
    }
    //提交数据到省平台
 	$scope.present = function(yqsqNo, isUpload) {
 		overheadSetService.present(yqsqNo, isUpload).then(function(data){
 			if (data.status == 'success') {
 				alert("上传成功！");
 				$scope.loadData();
 			} else {
 				alert("上传失败！");
 			}
 			$state.go('app.storage.overhead.getApplyList');
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

.controller("overheadAddCtrl", function($scope, $rootScope, $state, $filter, $stateParams, $uibModal, enumService, codeRuleService, 
		overheadSetService, APP_CONFIG, foodbasicinfoService, userService, FileUploader,contractService, storeWareDetailService,
		businessFileService) {
	$scope.addDcsl = [];
	$scope.overhead = {};
	$scope.isNotEdit = false;
	$scope.overFlag = 0;
	var now = new Date();
	$scope.linData = {
			 modifydate : "",
			 ch : "",
			 hwh : "",
			 jhbh : "",
			 pz : "",
			 jkqEnd : "",
			 sqyqTime : ""
	 };
	//获取架空期延期申请单号
	$scope.initializaTionChange = function() {
		// 获取倒仓申请单号.
		$scope.Edit = true;
	    codeRuleService.getCodeValueByType("applyNo", $rootScope.userInfo.orgId).then(function(data) {
	        if (data.status == "success") {
	            $scope.overhead.yqsqNo = data.codeValue;
	        } else if (data.status == "error") {
	            if(confirm("架空期延期申请单号有误！该页面无法保存")) {
	                $scope.retList();
	            }
	        }
	    });
	}
	//进行判断若id不为0则无单号
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
            templateUrl: 'app/storage/overhead/views/overheadApply-Modal.html',
            controller: 'overheadApplyCtrlModal',
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
				angular.forEach(result , function (i) {
					$scope.linData.modifydate = i.modifydate;
					$scope.linData.ch = i.ch;
					$scope.linData.hwh = i.hwh;
					$scope.linData.jhbh = i.jhbh;
					$scope.linData.pz = i.pz;
					$scope.linData.jkqEnd = i.jkqEnd; 
					$scope.linData.sqyqTime = i.sqyqTime;
					$scope.addDcsl.push(angular.copy($scope.linData));
				})
			}
	    }, function (result) {
	        console.log(result);
	    });
	}
  //查看,修改功能
    $scope.showData = function(id, orgId) {
    	overheadSetService.findOverheadData(id, orgId).then(function(data){
    		$scope.overhead= data.DataKcglJkqyqDefaultList[0];
    		$scope.DataKcglJkqyqDefault1List = data.DataKcglJkqyqDefault1List;
    		$scope.fileList = data.fileList;
    		 for (var i=0; i < data.DataKcglJkqyqDefault1List.length; i++) {
                 $scope.addDcsl.push(angular.copy(data.DataKcglJkqyqDefault1List[i]));
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
        	//$scope.isEdit = true;
        	$scope.Edit = true;
        	$scope.overFlag = 1;
        	$scope.showData($stateParams.id, $stateParams.orgId);
        }
   }
    // 删除一行
    $scope.delRow = function(overhead) {
	    var index;
	    	if ($scope.addDcsl.length <=1 ) {
	            alert("至少要有一条倒仓数据！");
	            return;
	        }
	    	// 如果有ID，说明当前数据已经是存在于数据库的，那么要郑重删除
	    	index = $scope.addDcsl.indexOf(overhead);
	    	$scope.addDcsl.splice(index, 1);
	    }
    
    //-----------------------------------------------   上传下载相关     开始------------------------------------------------
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
		formData : [{type : 'jkq',userId:$rootScope.userInfo.userId,orgId:$rootScope.userInfo.orgId}], // 与文件一起发送的数据
		
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
 // 提交表单
    var validator = $("#overhead-form").validate();
    $scope.save = function() {
    	if (validator.form()) {
    		if ($scope.addDcsl.length == 0) {
    			alert("至少填写一条完整的明细信息！");
    			return;
    		}
    		overheadSetService.add($scope.overFlag,$scope.overhead, $scope.addDcsl, $scope.fileIds).then(function(data){
    			if (data.status == 'success') {
    				alert("保存成功！");
    			} else {
    				alert("保存失败！");
    			}
    			$state.go("app.storage.overhead.getApplyList");
    		},function(data){
    			console.log(data);
    		});
    		}
    	}
    //返回
    $scope.returnTop = function() {
    	if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go("app.storage.overhead.getApplyList");
        }
    }
})
.controller("overheadApplyCtrlModal", function($scope, commonUtilService, $rootScope, $state, $uibModalInstance, $uibModal, enumService, overheadSetService, APP_CONFIG) {
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.addDcsl = [];
	var linTime;
	var lsxz;
	 // 获取列表数据
	var pattern = /(\d{4})(\d{2})(\d{2})/;
	$scope.linData = {
			 modifydate : "",
			 ch : "",
			 hwh : "",
			 pz : "",
			 hwxz : "",
			 jhbh : "",
			 jkqEnd : "",
			 sqyqTime : ""
			 
	 };
	// 获取列表数据
	 $scope.loadData = function() {
	    	overheadSetService.getJkqOveHeadList($scope.pageInfo.pageNum, $scope.pageInfo.pageSize).then(function(data){
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
	$scope.sqT = function (jkqEnd, sqyqTime){
		//计算架空期预警间隔时间
	    	//获取当前时间
	    	var dateEnd = sqyqTime.replace(pattern, '$1-$2-$3');
	    	//将时间字符串转换成时间格式
	    	var endDate = jkqEnd.replace(pattern, '$1-$2-$3');
	    	//将时间格式“-”，转换为“/"分隔符
	    	var dateE = new Date(endDate.replace(/-/g, "/"));
	    	var dateY = new Date(dateEnd.replace(/-/g, "/"));
	    	//计算时间差的毫秒数
	    	var date=dateY.getTime()-dateE.getTime();
	    	////计算出相差天数
	    	var dayDiff = Math.floor(date / (24 * 3600 * 1000));
	    	if(dayDiff < 0){
	    		alert("请输入的延期日期大于截止日期！");
	    	}
	}
	//点确定按钮
	$scope.check = function () {
		$uibModalInstance.close($scope.selected);
	}
})