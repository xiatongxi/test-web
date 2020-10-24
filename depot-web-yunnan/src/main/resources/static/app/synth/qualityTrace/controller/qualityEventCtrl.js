"use strict";
// 质量事件数据管理列表
angular.module('app.synth').controller("qualityEventCtrl",function ($scope, $rootScope, $state, $filter,
		warehouseService, qualityEventService) {

	// 获取基础数据
	$scope.getBasicData = function() {
		//按照单位获取单位下的仓房信息
		var depotId = $rootScope.orgInfo.orgId;
		//获取货位信息
		var cfh = '';
		warehouseService.getStorehouse(depotId, cfh, "0").then(function(data){
			$scope.warelist = data.wareList;  //下拉列表数据
			$scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
		},function (data) {
			console.log(data);
		});
	}
	
	//根据仓房获取货位列表
	$scope.getWareList = function(houseId) {
		//按照单位获取单位下的仓房信息
		var depotId = $rootScope.orgInfo.orgId;
		warehouseService.getStorehouse(depotId, houseId, "0").then(function(data){
			$scope.warelist = data.wareList;  //下拉列表数据
		},function (data) {
			console.log(data);
		});
	}

	//初始化加载
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.loadData = function() {
    	//$scope.getBasicData();
		qualityEventService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, 
    			$rootScope.orgInfo.orgId, $scope.houseId, $scope.wareId).then(function(data){
    		$scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }

	//初始化加载
	$scope.loadData();
	$scope.getBasicData();

	// 翻页
 	$scope.goPage = function(pageNum) {
 		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
      		$scope.pageInfo.pageNum = pageNum;
      		$scope.loadData();
      	}
 	}

 	// 查看、新增、修改
    $scope.view = function(id, btnType) {
    	if (id != null) {
    		//查看、修改
    		$state.go('app.synth.qualityEvent.edit',{id:id, btnType:btnType});
    	} else {//新增
    		$state.go('app.synth.qualityEvent.edit', {id: null});
    	}
    }
})
.controller("qualityEventEditCtrl",function ($scope, $rootScope, $state, $filter, $stateParams, FileUploader, APP_CONFIG,
		warehouseService, keeperService, enumService, qualityEventService, kcswService, businessFileService) {

	// 获取基础数据
	$scope.getBasicData = function() {
		//按照单位获取单位下的仓房信息
		var depotId = $rootScope.orgInfo.orgId;
		//获取货位信息
		var cfh = '';
		warehouseService.getStorehouse(depotId, cfh, "0").then(function(data){
			$scope.warelist = data.wareList;  //下拉列表数据
			$scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
		},function (data) {
			console.log(data);
		});
	}

	//根据仓房获取货位列表
	$scope.getWareList = function(houseId) {
		//按照单位获取单位下的仓房信息
		var depotId = $rootScope.orgInfo.orgId;
		warehouseService.getStorehouse(depotId, houseId, "0").then(function(data){
			$scope.warelist = data.wareList;  //下拉列表数据
		},function (data) {
			console.log(data);
		});
	}

	$scope.getData = function() {
		//获取保管员
		keeperService.getKeeperNamesByHouseId($scope.event.houseId).then(function(data){
			$scope.event.bgy = data.keeperNames;
		},function (data) {
			console.log(data);
		});
		//获取粮食品种
		var kcswStr = {ch:$scope.event.houseId, hwh: $scope.event.wareId, unitid:$rootScope.orgInfo.orgId};
		kcswService.getPageInfo(null, null, kcswStr, " ModifyDate desc ").then(function(data){
			if (data.list != null) {
				$scope.event.lspz = data.list[0].mxpz;  //下拉列表数据
				// 树形下拉框(粮食品种)
	            enumService.getTreeListByTypeId($scope.event.lspz, 1061).then(function(data) {
	            	var data_new = $scope.data_add(data);
	            	$scope.lspzTreeData = data_new;
	            },function(data) {
	            	console.log(data);
	            });
			}
		},function (data) {
			console.log(data);
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

	//查看
	$scope.view = function(butType) {
    	$scope.getBasicData();
    	qualityEventService.findByIdObj($stateParams.id).then(function(data){
            $scope.event = data.qualityEvent;
            $scope.event.inputDate = $filter('date')($scope.event.inputDate, "yyyy-MM-dd");
            if ($stateParams.id == '') {
            	$scope.event.inputPersonName  = $rootScope.userInfo.realName;
            } else {
            	businessFileService.getList($stateParams.id, "qualityEvent", $rootScope.orgInfo.orgId, "id asc").then(function(data) {
            		$scope.fileList = data;
            	},function(data) {
            		console.log(data);
            	});
            }
            if (butType == '2') {
            	$scope.isEdit = true;
            }
            //给下拉树赋值
            // 树形下拉框(粮食品种)
            enumService.getTreeListByTypeId($scope.event.lspz, 1061).then(function(data) {
            	var data_new = $scope.data_add(data);
            	$scope.lspzTreeData = data_new;
            },function(data) {
            	console.log(data);
            });
        },function(data){
            console.log(data);
        });
    }

    // -----------------------------------------------   文件上传下载相关     开始------------------------------------------------
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
		} else {
			var maxlinenumber = Math.max.apply(null, $scope.linenumbers);
			$scope.linenumbers.push(maxlinenumber + 1);
		}
	}

	// 文件上传实例
	$scope.fileIds = [];

	// 以linenumber为key,以新增的附件对应为value.
	$scope.fileMap = new Map();

	// 上传.
	$scope.uploader = new FileUploader({
		url : APP_CONFIG.basicUrl + '/fileUpload/updateFileBusiness',
		autoUpload : true, // 将文件添加到队列后自动上传.
		formData : [{type : 'qualityEvent', userId:$rootScope.userInfo.userId,orgId:$rootScope.orgInfo.orgId}], // 与文件一起发送的数据
		removeAfterUpload : true, // 从队列上传后删除文件
		// 上传进度
		onProgressItem : function(fileItem, progress) {
			// console.info("正在上传：" + progress + "%");
		},
		// 回调函数，在一个文件上传成功后触发
		onSuccessItem : function(fileItem, response, status, headers) {
			// 将新fileId加入到fileIds，用于最后在保存的时候会写附件表的主表ID.
			$scope.fileIds.push(response.id);
			// 如果已经存在对应的fileId，先从$scope.fileIds中移除，再添加.
			if ($scope.fileMap.has($scope.linenumber)) {
				// 原fileId.
				var fileId = $scope.fileMap.get($scope.linenumber).id;
				// 从$scope.fileIds中移除原fileId.
				var index = $scope.fileIds.indexOf(fileId);
		        if (index != -1) {
		            // 后台删除.
		            $scope.deleteFileByFileIds(fileId);
		        }
			}
			
			$scope.fileMap.set($scope.linenumber, response);
			
		}
	});

	// 下载文件
	$scope.download = function(filePath, originalFileName) {
		$("#filePath").val(filePath);
		$("#type").val("business");
		$("#originalFileName").val(originalFileName);
		$("#download-form").attr("action", APP_CONFIG.basicUrl + '/download');
		$("#download-form").submit();
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

	// 点击浏览按钮.
	$scope.clickFileInput = function(index) {
		$scope.linenumber = index;
	}

	// 文件上传实例
	$scope.deleteFileIds = [];
	// 回显删除.
	$scope.deleteFile = function(file) {
		// 回显删除，先不真正删除，把要删除的附件id保存在数组中，再最后保存的时候传递给后台，进行删除.
		$scope.deleteFileIds.push(file.id);
		// 从$scope.fileList 移除.
		var index = $scope.fileList.indexOf(file);
		if (index != -1) {
			$scope.fileList.splice(index, 1);
		}
		$scope.deleteFileByFileIds(file.id);
	}

	// 正常删除.
	$scope.deleteFileByLinenumber = function(linenumber) {
		var index = $scope.linenumbers.indexOf(linenumber);
        if (index != -1) {
        	// 从linenumbers移除.
            $scope.linenumbers.splice(index, 1);
            
            if ($scope.fileMap.has($scope.linenumber)) {
            	// 以linenumber为key从$scope.fileMap获取fileId.
            	var fileId = $scope.fileMap.get($scope.linenumber).id;
				
		        	// 后台删除数据和文件.
		        	$scope.deleteFileByFileIds(fileId, index);

		        	// 从$scope.fileMap移除.
		        	$scope.fileMap.delete(linenumber);

			}
        }
	}

	$scope.deleteFileByFileIds = function(fileId) {
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

	// -----------------------------------------------   上传下载相关     结束           ------------------------------------------------

	// 提交表单
    var validator = $("#qualityEvent-form").validate();
    $scope.save = function() {
    	if (validator.form()) {
    		if($scope.event.lspz.length != 0 && $scope.event.lspz != null){
    			$scope.event.lspz = $scope.event.lspz[0].id;
	   	 	} else {
	   	 		$scope.event.lspz = null;
	   	 	}
    		$scope.event.orgId = $rootScope.orgInfo.orgId;
    		qualityEventService.save($scope.event).then(function(data){
    			if (data.status == 'success') {
    				alert("保存成功！");
    				//更新文件表里面的主表ID
    				businessFileService.getUpdateFile($scope.fileIds, data.id, "qualityEvent").then(function(data){
    				},function(data){
    	    			console.log(data);
    	    		});

    				$state.go("app.synth.qualityEvent");
    			} else {
    				alert("保存失败！");
    			}
    		},function(data){
    			console.log(data);
    		});
    	}
    }

 	//返回、取消
 	$scope.returnTop = function() {
 		if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go("app.synth.qualityEvent");
        }
 	}

	$scope.view($stateParams.btnType);
});;