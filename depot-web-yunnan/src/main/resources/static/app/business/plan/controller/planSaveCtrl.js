"use strict";
angular.module('app.business').controller("planSaveCtrl", function($scope, $filter, $http, $stateParams, $state, $rootScope,$uibModal,
		planService, storeWareDetailService, commonUtilService,agentDepotService, enumService, codeRuleService, businessFileService, FileUploader, APP_CONFIG) {
	
    $scope.plan = {};
	$scope.planNumber = {};
    $scope.isNotEdit = false;
    $scope.saveFlag = false;
    $scope.hidden=true; //明细按钮的显示
    
    //计划类型改变 清空子表数据
    $scope.planTypeChange = function(){
    	$scope.addedDetail = [];
    }
    
    
    //储备粮计划
    $scope.plan.attributeType = $stateParams.attributeType;
    //经营业务下的计划管理
    $scope.menu = $stateParams.menu;

    //日期时间的比较
    $scope.changeDate = function() {
		
        if($scope.plan.kszxrq != "" && $scope.plan.kszxrq != null && 
                $scope.plan.jzzxrq != "" && $scope.plan.jzzxrq != null){
			
            $scope.plan.kszxrq = $filter('date')($scope.plan.kszxrq, "yyyy-MM-dd");//开始日期
            $scope.plan.jzzxrq = $filter('date')($scope.plan.jzzxrq, "yyyy-MM-dd");//结束日期
            
            if($scope.plan.kszxrq > $scope.plan.jzzxrq){
                    alert("计划截止日期要大于或者等于计划开始日期");
                    $scope.plan.jzzxrq = null;
            }
        }
    }
   
    
	// 获取计划编号.
	$scope.gainPlan = function() {
		codeRuleService.getCodeValueByType("plan", $rootScope.userInfo.orgId).then(function(data) {
			if (data.status == "success") {
				$scope.planNumber.status = "success";
				$scope.plan.planNumber = data.codeValue;
			} else if (data.status == "error") {
				$scope.planNumber.msg = data.msg;
				$scope.planNumber.status = "error";
				if(confirm("计划编号有误！该页面无法保存！原因：" + $scope.planNumber.msg + " 是否返回到列表页！")) {
					$scope.retList();
				}
			}
		});
	}
	
//------------------------------------------------提交(选择审批人)----------------------------------
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.loadData = function() {
        planService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, null).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
    
   // 选择审批人.
	$scope.choice = function(plan,variable) {
		if (plan.auditState != "0" && plan.auditState != "3") {
            alert("您已经提交该数据，无法再次提交！");
            return;
        }
        $scope.plan = plan;
 		
 		$scope.modelItem = [];

		$scope.modelItem.allContent = plan;
		$scope.modelItem.variable = variable;
		$scope.modelItem.type = "plan";

 		if(plan.auditState == "3"){

			//获取上一审批人
			planService.loadDataById(plan.id, plan.processInstanceId).then(function(data){
				$scope.assigneeName = data.subAudit.assigneeName;
				$scope.returnResult = [];
				$scope.returnResult.returnType = "submit";
				$scope.submit($scope.assigneeName);
				//上一审批人(驳回时，获取上一审批人 为当前审批人)
				/*if(data.subAudit!=null){
					$scope.returnResult = [];
					$http({
						method: 'GET',
						url: APP_CONFIG.businessUrl + '/act/roleList/getUserList',
						params: {
							procInstId : $scope.modelItem.processInstanceId,
							type : $scope.modelItem.type,
							orgId : $rootScope.userInfo.orgId
						}
					}).then(function successCallback(response) {
						console.log(response.data);
						$scope.returnResult.returnType = "submit";
						$scope.submit($scope.assigneeName);
					}, function errorCallback(response) {
						// 请求失败执行代码
						console.log(response);
					});
				}*/

			},function(data){
			});
 		}else{

 	         // 展开下一个审批人模态框.
 	         var modalInstance = $uibModal.open({
 	             size : 'md',
 	             templateUrl: 'app/business/util/views/choiceUser-view.html',
 	             controller: 'choiceUserModalCtrl',
				 backdrop: 'static',
 	             resolve: {
 	             	// items是一个回调函数
 	                 items: function () {
 	                     // 这个值会被模态框的控制器获取到
 	                     return $scope.modelItem;
 	                 }
 	             }
 	         });

 	         // 回调函数.
 	         modalInstance.result.then(function (result) {
 	         	if (result.returnType == "cancel") {
					if(variable == "1"){
						// 新增则id
						$scope.plan.id = null;
					}else{
						//不做操作
					}
					$scope.saveFlag = false;
 	         	} else if (result.returnType == "submit") {
 	         		// 审批人.
 	         		$scope.submit(result.assignee);
 	         	} else if (result.returnType == "isEnd") {
 	         		$scope.audit($scope.modelItem.auditResult, null);
 	         	}
 	         }, function (reason) {
 	             console.log(reason);
 	         });
 		}

     }
     
     
     // 提交.
     $scope.submit = function(assignee) {
         
         $http({
             method: 'POST',
             url: APP_CONFIG.businessUrl + '/depot/business/plan/submit',
             data: {
                 id : $scope.plan.id,
                 assignee : assignee,
                 userId :$rootScope.userInfo.userId,
                 realName: $rootScope.userInfo.realName
             }
         }).then(function successCallback(response) {
            if (response.data.success == 'success') {
                // 请求成功执行代码
                // 重新加载数据
            	$scope.retList();
                alert("提交成功！");
                $scope.loadData();
            } else {
                alert(response.data.msg);
            }
         }, function errorCallback(response) {
             // 请求失败执行代码
             console.log(response);
         });
     }
   //------------------------------------------------提交(选择审批人)  结束----------------------------------    
     
     
    
    
  //--------------------------------------------------主体--------------------------------------------
    //获取申请人
    $scope.plan.creater=$rootScope.userInfo.realName;
    
    //获取当前时间
    var nowTime=new Date();
    $scope.plan.createTime=nowTime;
    
    
    //修改
	$scope.loadDataByIdEdit = function(id) {
        planService.loadDataById(id).then(function(data){
            $scope.plan = data.plan;
            $scope.fileList = data.fileList;
            
            // 子表数据.
            $scope.storeWareDetailList = data.storeWareDetailList;
            for (var i=0; i < data.storeWareDetailList.length; i++) {
                $scope.addedDetail.push(angular.copy(data.storeWareDetailList[i]));
            }
            
            /*$scope.plan.storageBeginTime = $filter('date')($scope.plan.storageBeginTime, "yyyy-MM-dd"); 
            $scope.plan.storageEndTime = $filter('date')($scope.plan.storageEndTime, "yyyy-MM-dd"); 
            $scope.plan.salesBeginTime = $filter('date')($scope.plan.salesBeginTime, "yyyy-MM-dd"); 
            $scope.plan.salesEndTime = $filter('date')($scope.plan.salesEndTime, "yyyy-MM-dd");*/
            
            $scope.plan.jhnd = parseInt(data.plan.jhnd);
            $scope.plan.kszxrq = $filter('date')($scope.plan.kszxrq, "yyyy-MM-dd"); 
            $scope.plan.jzzxrq = $filter('date')($scope.plan.jzzxrq, "yyyy-MM-dd"); 
            $scope.getAttributeData();
            $scope.getGrainDetailKind();
        },function(data){
        });
    }
    
	// 查看.
    $scope.loadDataById = function(id, processInstanceId) {
        planService.loadDataById(id, processInstanceId).then(function(data){
            $scope.plan = data.plan;
            $scope.fileList = data.fileList;
            
            $scope.auditList = data.auditList;
            
            // 子表数据.
            $scope.storeWareDetailList = data.storeWareDetailList;
            for (var i=0; i < data.storeWareDetailList.length; i++) {
                $scope.addedDetail.push(data.storeWareDetailList[i]);
            }
            console.log(data.storeWareDetailList);
            $scope.processDefinitionId = data.plan.processDefinitionId;
            $scope.processInstanceId = data.plan.processInstanceId;
            /*$scope.plan.storageBeginTime = $filter('date')($scope.plan.storageBeginTime, "yyyy-MM-dd"); 
            $scope.plan.storageEndTime = $filter('date')($scope.plan.storageEndTime, "yyyy-MM-dd"); 
            $scope.plan.salesBeginTime = $filter('date')($scope.plan.salesBeginTime, "yyyy-MM-dd"); 
            $scope.plan.salesEndTime = $filter('date')($scope.plan.salesEndTime, "yyyy-MM-dd");*/
            
            $scope.plan.jhnd = parseInt(data.plan.jhnd);
            $scope.plan.kszxrq = $filter('date')($scope.plan.kszxrq, "yyyy-MM-dd"); 
            $scope.plan.jzzxrq = $filter('date')($scope.plan.jzzxrq, "yyyy-MM-dd"); 
            
            
            $scope.getAttributeData();
            $scope.getGrainDetailKind();
        },function(data){
        });
    }
    

    
    $('input[readOnlyButValid]').on("focusin", function() {
        $(this).prop('readOnly', true);  
    });

	$('input[readOnlyButValid]').on("focusout", function() {
		$(this).prop('readOnly', false); 
	});
	
    
    
    // 返回
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
        	if($rootScope.previousState_name.indexOf("app.additionalHome") != -1){//首页跳转的返回首页
        		$rootScope.isIndexPage = true;
        	}
        	$rootScope.back();
        } else if($stateParams.attributeType==1){
        	$state.go("app.business.grainReservesPlan-rotation-apply");
        }else if($stateParams.attributeType==2){
        	$state.go("app.business.grainReservesPlan-sales-apply");
        }else if($stateParams.attributeType==3){
        	$state.go("app.business.grainReservesPlan-acquisition-apply");
        }else {
        	$state.go("app.business.plan");
        }
                 
    }

    // -----------------------------------------------   上传下载相关     开始------------------------------------------------
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
			alert("请先添加文件,在添加浏览框.");
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
		formData : [{type : 'plan',userId:$rootScope.userInfo.userId,orgId:$rootScope.userInfo.orgId}], // 与文件一起发送的数据
		
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
    	/*$http({
            method: 'POST',
            url: APP_CONFIG.baseUrl + '/download',
            responseType:'arraybuffer',
            data: {
            	filePath : filePath
            }
        }).then(function successCallback(response) {
        	var blob = new Blob([response], {});
        	var objectUrl = URL.createObjectURL(blob);
        	var a = document.createElement('a');
        	document.body.appendChild(a);
        	a.setAttribute('style', 'display:none');
        	a.setAttribute('href', objectUrl);
        	a.setAttribute('download', originalFileName);
        	a.click();
        	URL.revokeObjectURL(objectUrl);
        	
        	
        	
        }, function errorCallback(response) {
        });*/
		// planService.downloadByFilePath(filePath ,originalFileName);
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
    
	// -----------------------------------------------   上传下载相关     结束           ------------------------------------------------
	
	
	
	// ----------------------------------------------    计划明细列表     开始          --------------------------------------------------
	// 子表数据模型.
	$scope.planDetail = {};
    // 用于存放 子表数据 的数组.
    $scope.addedDetail = [];
    
	// 点击新增或者修改时弹出模态窗
    $scope.addRow = function() {
    	// 先判断数量,如果数量没填写，需要先填写，才能新增.
    	if ($scope.plan.executeType == '' || $scope.plan.executeType == null ) {
    		alert("客户计划执行类型必须填写！");
    		return;
    	}
    	
		var params = [];
		
		params.detailType = "plan";
		// 计划类型.
		params.executeType = $scope.plan.executeType;
		//储备粮计划类型
		params.attributeType = $scope.plan.attributeType;
		var uibModalInstance = $uibModal.open({
            size:'lg',  
            clickOutsideToClose:true,
            templateUrl: 'app/business/storeWareDetail/views/storeWareDetailModal.html',
            controller: 'storeWareDetailModalCtrl',
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
				if($rootScope.userInfo.orgId != result.state){
					//代储库
					agentDepotService.getQueryAgentDepotList($rootScope.userInfo.orgId,result.state).then(function(data) {
						//仓房名称
						if(data!=null ){
							for(var agentDepotId in data){
								//根据agentDepotId和orgId获取仓房列表
								agentDepotService.getAgentStorehouseList(agentDepotId, $rootScope.userInfo.orgId).then(function(datas){
									for (var i = 0; i < datas.length; i++) {
										if(datas[i].storehouseId == result.houseId){
											result.houseName = datas[i].storehouseName;
										}
									}
								}, function (datas) {
									console.log(datas);
								});
							}
						}
						
					}, function (data) {
						console.log(data);
					});
					//货位名称
					agentDepotService.getAgentStoreWareList($rootScope.userInfo.orgId,result.houseId).then(function(data) {
						for (var i = 0; i < data.length; i++) {
							if(data[i].warehouseId == result.warehouseId){
								result.warehouseName = data[i].warehouseName;
							}
						}
					}, function (data) {
						console.log(data);
					});
          		 }
				
				$scope.addedDetail.push(result);
				
				// 计算总数量.
				$scope.countSumAmount();
				//计算总金额
				$scope.sumPrice();
			}
	    }, function (reason) {
	        console.log(reason);
	    });
	}
	
    
	// 修改时弹出模态窗
	$scope.editRow = function(detailInfo) {
		
		// 计划类型.
		if ($scope.plan.executeType == '' || $scope.plan.executeType == null) {
			alert("计划类型必须填写！");
    		return;
    	}
		
        
    	// 索引，用来保存模态框返回的数据.
    	var index = $scope.addedDetail.indexOf(detailInfo);
    	
		var params = [];
		
		params.detailType = "plan";
		params.state = detailInfo.state;
		params.houseName = detailInfo.houseName;
		params.houseId = detailInfo.houseId;
		params.warehouseName = detailInfo.warehouseName;
		params.warehouseId = detailInfo.warehouseId;
		
		params.grainKind = detailInfo.grainKind;
		
		params.grainDetailKind = detailInfo.grainDetailKind;
		params.grainAttribute = detailInfo.grainAttribute;
		params.grainGrade = detailInfo.grainGrade;
		params.grainAnnual = detailInfo.grainAnnual;
		params.productiveYear = detailInfo.productiveYear;
		params.inputTime = $filter('date')(detailInfo.inputTime, "yyyy-MM-dd");
		params.grainProducingArea = detailInfo.grainProducingArea;
		params.inPrice = detailInfo.inPrice;
		params.inCount = detailInfo.inCount;
		params.inDetailTotalPrice = detailInfo.inDetailTotalPrice;
		params.outPrice = detailInfo.outPrice;
		params.outCount = detailInfo.outCount;
		params.outDetailTotalPrice = detailInfo.outDetailTotalPrice;
		
		if(detailInfo!=null){
			$scope.warehouseIdEdit = false; //不可编辑
		}

		// 计划类型.
		params.executeType = $scope.plan.executeType;
		/*params.planCustomer = $scope.plan.planCustomer;
		params.planNumber = $scope.plan.planNumber;
		params.planTitle = $scope.plan.planTitle;
		params.referenceNumber = $scope.plan.referenceNumber;
		params.creater = $scope.plan.creater;
		params.createUnit = $scope.plan.createUnit;
		params.createTime = $scope.plan.createTime;*/
		
		
		var uibModalInstance = $uibModal.open({
		       size:'lg',  
		       templateUrl: 'app/business/storeWareDetail/views/storeWareDetailModal.html',
		       controller: 'storeWareDetailModalCtrl',
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
				
				if(result.state != $rootScope.userInfo.orgId){
					//仓房名称
					agentDepotService.getQueryAgentDepotList($rootScope.userInfo.orgId,result.state).then(function(data) {
						//代储库
						if(data!=null ){
							for(var agentDepotId in data){
								//根据agentDepotId和orgId获取仓房列表
								agentDepotService.getAgentStorehouseList(agentDepotId, $rootScope.userInfo.orgId).then(function(datas){
									for (var i = 0; i < datas.length; i++) {
										if(datas[i].storehouseId == result.houseId){
											$scope.addedDetail[index].houseName = datas[i].storehouseName;
										}
									}
								}, function (datas) {
									console.log(datas);
								});
							}
						}
						
					}, function (data) {
						console.log(data);
					});
					//货位名称
					agentDepotService.getAgentStoreWareList($rootScope.userInfo.orgId,result.houseId).then(function(data) {
						for (var i = 0; i < data.length; i++) {
							if(data[i].warehouseId == result.warehouseId){
								$scope.addedDetail[index].warehouseName = data[i].warehouseName;
							}
						}
					}, function (data) {
						console.log(data);
					});
				}else{
					$scope.addedDetail[index].houseName = result.houseName;
					$scope.addedDetail[index].warehouseName = result.warehouseName;
				}
				$scope.addedDetail[index].state = result.state;
				$scope.addedDetail[index].houseId = result.houseId;
				$scope.addedDetail[index].warehouseId = result.warehouseId;
				$scope.addedDetail[index].grainKind = result.grainKind;
				$scope.addedDetail[index].grainDetailKind = result.grainDetailKind;
				$scope.addedDetail[index].grainAttribute = result.grainAttribute;
				$scope.addedDetail[index].grainGrade = result.grainGrade;
				$scope.addedDetail[index].grainAnnual = result.grainAnnual;
				$scope.addedDetail[index].grainProducingArea = result.grainProducingArea;
				$scope.addedDetail[index].productiveYear = result.productiveYear;
				$scope.addedDetail[index].inputTime = result.inputTime;
				
				//字表的单价、数量、总价
				$scope.addedDetail[index].outDetailTotalPrice = result.outDetailTotalPrice;
				$scope.addedDetail[index].outCount = result.outCount;
				$scope.addedDetail[index].outPrice = result.outPrice;
				$scope.addedDetail[index].inDetailTotalPrice = result.inDetailTotalPrice;
				$scope.addedDetail[index].inCount = result.inCount;
				$scope.addedDetail[index].inPrice = result.inPrice;
				
				// 计算总数量.
				$scope.countSumAmount();
				//计算总金额
				$scope.sumPrice();
				
			}
		 }, function (reason) {
			 console.log(reason);
		 });
		
		
	}  
	 
    // 删除一行
    $scope.deleteRow = function(detailInfo) {
    	
        if ($scope.addedDetail.length <= 1 ) {
            alert("必须填写一条计划详情信息！");
            return;
        }
        
        if (detailInfo.id != null && detailInfo.id != undefined && detailInfo.id != '') {
            if (!confirm("此条数据为之前保存的数据，确定要删除吗？")) {
                return;
            }
            storeWareDetailService.deleteDetailDataById(detailInfo.id).then(function(data) {
				//总数量变更
		        $scope.countSumAmount();
		        //总金额变更
		        $scope.sumPrice();
            },function(data){
                console.log(data);
            });
        }
        
      //从数组中移除
    	var index = $scope.addedDetail.indexOf(detailInfo);
        if (index != -1) {
        	// 从addedDetail移除.
            $scope.addedDetail.splice(index, 1);
            //总数量变更
	        $scope.countSumAmount();
	        //总金额变更
	        $scope.sumPrice();
        }
        
    }
    
    // 计算总数量 = 明细数量之和.
    $scope.countSumAmount = function() {
		/*var inTotalAmount = 0;
		var outTotalAmount = 0;*/
		var inAmount = 0;
		var outAmount = 0;
		for (var i = 0; i < $scope.addedDetail.length; i++) {
			if ($scope.addedDetail[i].inCount != null && $scope.addedDetail[i].inCount != '') {
				// 累加明细数量.
				inAmount += parseFloat($scope.addedDetail[i].inCount);
			}
			if ($scope.addedDetail[i].outCount != null && $scope.addedDetail[i].outCount != '') {
				// 累加明细数量.
				outAmount += parseFloat($scope.addedDetail[i].outCount);
			}
			
		}
		//轮出总数量
		$scope.plan.outAmount = outAmount;
		$scope.plan.inAmount = inAmount;
		
		
    }
    
    // 计算总金额= 明细金额之和.
    $scope.sumPrice = function() {
    	var inDetailTotalPrice = 0;
    	var outDetailTotalPrice = 0;
    	for (var i = 0; i < $scope.addedDetail.length; i++) {
    		if ($scope.addedDetail[i].inDetailTotalPrice != null && $scope.addedDetail[i].inDdetailTotalPrice != '') {
    			// 累加明细金额.
    			inDetailTotalPrice += parseFloat($scope.addedDetail[i].inDetailTotalPrice);
    		}
    		if ($scope.addedDetail[i].outDetailTotalPrice != null && $scope.addedDetail[i].outDdetailTotalPrice != '') {
    			// 累加明细金额.
    			outDetailTotalPrice += parseFloat($scope.addedDetail[i].outDetailTotalPrice);
    		}
    	}
    	$scope.plan.outTotalPrice = outDetailTotalPrice;
    	$scope.plan.inTotalPrice = inDetailTotalPrice;
    	
    }
	
	// ----------------------------------------------    计划明细列表     结束          --------------------------------------------------
    
	// 保存相关
    var validator = $("#plan-form").validate();
    
    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;  
        return this.optional(element)||(checkNumber.test(value));  
    },"请输入正确的数字类型，最多两位小数！");  
    
    
    
    // 树形下拉框(粮食性质)
    $scope.getAttributeData = function() {
        enumService.getTreeList($scope.plan.grainAttribute, "grainAttribute").then(function(data) {
            $scope.grainAttributeTreeData = data;
        },function(data) {
            console.log(data);
        })
    };
    
    // 树形下拉框(明细品种)
    $scope.getGrainDetailKind = function() {
        enumService.getTreeListByTypeId ($scope.plan.grainDetailKind, $scope.plan.grainKind).then(function(data) {
            $scope.grainDetailKindTreeData = data;
        },function(data) {
            console.log(data);
        })
    };
    
    // 新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
    if ($stateParams.id != 0) {
        // 编辑，查看.
        $scope.isNotEdit = $stateParams.isNotEdit;
        if ($stateParams.isNotEdit == true) {
            // 查看.
        	$scope.Edit = true;//不可更改
            $scope.loadDataById($stateParams.id, $stateParams.processInstanceId);
            $scope.getAttributeData();
        } else {
            // 编辑.
			$scope.showCommit = true ; //提交按钮展示
            $scope.loadDataByIdEdit($stateParams.id);

        }

    } else {
        // 新增.
		$scope.showCommit = true ; //提交按钮展示
    	if($scope.plan.attributeType==1){
    		$scope.plan.executeType=3156;//轮换计划
    		$scope.Edit = true;//不可更改
    	}else if($scope.plan.attributeType==2){
    		$scope.plan.executeType=3155;//销售计划
    		$scope.Edit = true;//不可更改
    	}else if($scope.plan.attributeType==3){
    		$scope.plan.executeType=3154;//收储计划
    		$scope.Edit = true;//不可更改
    	}
        //$scope.getAttributeData();
        $scope.hidden=false; //隐藏明细按钮

        // 获取计划编号.
        codeRuleService.getCodeValueByType("plan", $rootScope.userInfo.orgId).then(function(data) {
            if (data.status == "success") {
                $scope.planNumber.status = "success";
                $scope.plan.planNumber = data.codeValue;
            } else if (data.status == "error") {
                $scope.planNumber.msg = data.msg;
                $scope.planNumber.status = "error";
                if(confirm("计划编号有误！该页面无法保存！原因：" + $scope.planNumber.msg + " 是否返回到列表页！")) {
                    $scope.retList();
                }
            }
        });
    }
    
    
    // 保存.
    $scope.save = function (variable) {
    	if ($scope.planNumber.status != undefined && $scope.planNumber.status == "error") {
    		if (confirm("计划编号有误！该页面无法保存！原因：" + $scope.planNumber.msg + " 是否返回到列表页！")) {
				$scope.retList();
				return;
			} else {
				return;
			}
    	}
    	
    	if ($scope.addedDetail.length == 0) {
			alert("至少填写一条完整的明细信息！");
			return;
		}
    	
    	//计划描述长度的限制
    	if($scope.plan.planDesc!=null){
    		$scope.planDesc = $scope.plan.planDesc;
        	if($scope.planDesc.length>=50){
        		alert("计划描述不超过50字！");
        		return;
        	}
    	}
        
    	if (!$scope.saveFlag) {
    		if (validator.form()) {
    			// 设置saveFlag为true,防止重复提交.
    			$scope.saveFlag = true;
    			$http({
    				method: 'POST',
    				url: APP_CONFIG.businessUrl + '/depot/business/plan/save',
    				data: {
    					businessPlanJson : angular.toJson($scope.plan),
    					fileIds : angular.toJson($scope.fileIds),
    					deleteFileIds : angular.toJson($scope.deleteFileIds),
    					businessStoreWareDetailJson : angular.toJson($scope.addedDetail),
    					userId : $rootScope.userInfo.userId,
    					orgId : $rootScope.userInfo.orgId,
    					name : $rootScope.userInfo.realName,
    					depotInfoOrgId : $rootScope.orgInfo.orgId
    					
    				}
    			}).then(function successCallback(response) {

					if (response.data.status == "success") {
						//如果type有值，则为提交（先保存在提交），不然是保存
						if(variable != null && variable != "" && typeof variable != 'undefined' ) {
							if($stateParams.id == 0){
								//新增数据返回 id
								var id = response.data.id;
							}else {
								//修改页面
								var id = $stateParams.id;
								variable = "2";
							}
							planService.loadDataById(id).then(function (data) {
								$scope.plan = data.plan;
								$scope.choice($scope.plan,variable);
							}, function (data) {

							});
						}else{
							alert("保存成功！");
							$scope.retList();
						}
					} else {
						$scope.saveFlag = false;
						alert(response.data.msg);
					}

    			}, function errorCallback(response) {
    				// 请求失败执行代码
    			});
    		}
    	}
    }
});
