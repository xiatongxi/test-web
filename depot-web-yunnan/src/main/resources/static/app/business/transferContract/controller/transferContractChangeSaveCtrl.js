angular.module('app.business').controller("transferContractChangeSaveCtrl", 
		function($scope, $filter,$http, $stateParams, $state, $uibModal,$rootScope, userService,FileUploader,
				contractService, storeWareDetailService, commonUtilService, enumService,transferContractService, APP_CONFIG) {
    
    $scope.isNotEdit = false;
    $scope.saveFlag = false;
    // 显示新增明细的按钮(选择计划后，隐藏).
    $scope.addRowButtonShow = true;
    // 是否选择计划,默认为false.
    $scope.selectPlan = false;
    
  //日期时间的比较
    $scope.changeDate = function() {
		
        if($scope.contract.enableDate != "" && $scope.contract.enableDate != null && 
                $scope.contract.disableDate != "" && $scope.contract.disableDate != null){
			
            $scope.contract.enableDate = $filter('date')($scope.contract.enableDate, "yyyy-MM-dd");//生效日期
            $scope.contract.disableDate = $filter('date')($scope.contract.disableDate, "yyyy-MM-dd");//截止日期
            
            if($scope.contract.enableDate > $scope.contract.disableDate){
                    alert("合同截止日期要大于或者等于合同生效日期");
                    $scope.contract.disableDate = null;
            }
        }
			
			
            if($scope.contract.enableDate!="" && $scope.contract.enableDate!=null && 
                    $scope.contract.signingTime!="" && $scope.contract.signingTime!=null){
				
                $scope.contract.signingTime = $filter('date')($scope.contract.signingTime, "yyyy-MM-dd");//签订日期
                $scope.contract.enableDate = $filter('date')($scope.contract.enableDate, "yyyy-MM-dd");//生效日期
				
                if($scope.contract.enableDate < $scope.contract.signingTime){
                    alert("合同签订日期要小于或者等于合同生效日期");
                    $scope.contract.signingTime = null;
                 }
            }
		
    }
    
  //签订人 信息
    $scope.userInfoMessage = function() {
	    userService.getPageInfo(null, null, null,null, null, null).then(function(data){
	            $scope.userInfoList = data.list;
	        },function(data){
	            console.log(data);
	        });
    }
    $scope.userInfoMessage();
    
    
   
    //----------------------------------------提交---------------------------------------------
    
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.searchCondition = {};
	
    // 获取列表数据
    $scope.loadData = function() {
    	transferContractService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, "change", $scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
    
    // 选择审批人.
	$scope.choice = function(contract,variable) {
		if (contract.auditState != "0" && contract.auditState != "3") {
            alert("您已经提交该数据，无法再次提交！");
            return;
        }
        $scope.contract = contract;

 		$scope.modelItem = [];
        $scope.modelItem.allContent = contract;
        $scope.modelItem.originalContractBid = $stateParams.id;
        $scope.modelItem.variable = variable;
        //$scope.modelItem.type = "transferContract";
        $scope.modelItem.type = "transferContractChange";


        if(contract.auditState == "3"){
            //获取上一审批人
            contractService.loadDataByIdAndProcessInstanceId(contract.id, contract.processInstanceId).then(function(data){
                //上一审批人(驳回时，获取上一审批人 为当前审批人)
                if(data.subAudit!=null){
                    $scope.assigneeName = data.subAudit.assigneeName;
                    $scope.returnResult = [];
                    //驳回到员工，为第一节点，此时显示审批人
                    $scope.returnResult.returnType = "submit";
                    $scope.submit($scope.assigneeName);
                }

            },function(data){
            });

        }else{
            // 展开下一个审批人模态框.
            var modalInstance = $uibModal.open({
                size : 'md',
                templateUrl: 'app/business/util/views/choiceUser-view.html',
                controller: 'choiceUserModalCtrl',
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
                        $scope.contract.id = null;
                    }else{
                        //不做操作
                    }
                    $scope.saveFlag = false;
                } else if (result.returnType == "submit") {
                    // 审批人.
                    $scope.submit(result.assignee);
                } else if (result.returnType == "isEnd") {
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
             url: APP_CONFIG.businessUrl + '/depot/business/contract/submit',
             data: {
            	 id : $scope.contract.id,
                 assignee : assignee,
                 userId : $rootScope.userInfo.userId,
                 realName : $rootScope.userInfo.realName
             }
         }).then(function successCallback(response) {
            if (response.data.success == 'success') {
                // 请求成功执行代码
                $state.go("app.business.transferContract-change");
                // 重新加载数据
                $scope.loadData();
                alert("提交成功！");
            } else {
                alert(response.data.msg);
            }
         }, function errorCallback(response) {
             // 请求失败执行代码
             console.log(response);
         });
    }
    
    //---------------------------------------------------------------------------------------------------
    
    $scope.loadDataById = function(id, type) {
        contractService.loadDataById(id, type, $scope.editType).then(function(data){
            $scope.contract = data.contract;
            $scope.changeDetailList = data.changeDetailList;
            $scope.fileList = data.fileList;
            $scope.contract.signingMan=parseInt(data.contract.signingMan);
            $scope.contract.customerId=parseInt(data.contract.customerId);
            $scope.contract.signingTime = $filter('date')($scope.contract.signingTime, "yyyy-MM-dd"); 
            $scope.contract.enableDate = $filter('date')($scope.contract.enableDate, "yyyy-MM-dd"); 
            $scope.contract.disableDate = $filter('date')($scope.contract.disableDate, "yyyy-MM-dd"); 
            if ($scope.editType == "add") {
            	$scope.contract.changeContent = '';
            	$scope.contract.changeReason = '';
            }
            // 历次变更记录为空，就不显示.
            if ($scope.changeDetailList == null || $scope.changeDetailList.length == 0) {
            	$scope.changeDetailListHide = true;
            } else {
            	$scope.changeDetailListHide = false;
            }
            
            if (data.contract.planBid != undefined && data.contract.planBid != null) {
            	// 隐藏新增明细按钮.
            	$scope.addRowButtonShow = false;
            	// 选择了计划.
            	$scope.selectPlan = true;
            }
            // 子表数据.
            $scope.storeWareDetailList = data.storeWareDetailList;
            for (var i=0; i < data.storeWareDetailList.length; i++) {
                $scope.addedDetail.push(angular.copy(data.storeWareDetailList[i]));
            }
            
            // 获取粮食性质 下拉树.
            $scope.getAttributeData();
            // 获取粮食产地 下拉树.
            $scope.getAreaData();
            // 获取粮食明细品种 下拉树.
            $scope.getGrainDetailKind();
        },function(data){
        });
    }
    
    $scope.loadDataByIdAndProcessInstanceId = function(id, processInstanceId, type) {
        contractService.loadDataByIdAndProcessInstanceId(id, processInstanceId, type).then(function(data){
            $scope.contract = data.contract;
            $scope.auditList = data.auditList;
            $scope.fileList = data.fileList;
            $scope.contract.signingMan=parseInt(data.contract.signingMan);
            $scope.contract.customerId=parseInt(data.contract.customerId);
            $scope.changeDetailList = data.changeDetailList;
            $scope.processDefinitionId = data.contract.processDefinitionId;
            $scope.processInstanceId = data.contract.processInstanceId;
            $scope.contract.signingTime = $filter('date')($scope.contract.signingTime, "yyyy-MM-dd"); 
            $scope.contract.enableDate = $filter('date')($scope.contract.enableDate, "yyyy-MM-dd"); 
            $scope.contract.disableDate = $filter('date')($scope.contract.disableDate, "yyyy-MM-dd"); 
            if ($scope.editType == "add") {
            	$scope.contract.changeContent = '';
            	$scope.contract.changeReason = '';
            }
            // 历次变更记录为空，就不显示.
            if ($scope.changeDetailList == null || $scope.changeDetailList.length == 0) {
            	$scope.changeDetailListHide = true;
            } else {
            	$scope.changeDetailListHide = false;
            }
            
            if (data.contract.planBid != undefined && data.contract.planBid != null) {
            	// 隐藏新增明细按钮.
            	$scope.addRowButtonShow = false;
            	// 选择了计划.
            	$scope.selectPlan = true;
            }
            // 子表数据.
            $scope.storeWareDetailList = data.storeWareDetailList;
            for (var i=0; i < data.storeWareDetailList.length; i++) {
                $scope.addedDetail.push(angular.copy(data.storeWareDetailList[i]));
            }
            
            // 获取粮食性质 下拉树.
            $scope.getAttributeData();
            // 获取粮食产地 下拉树.
            $scope.getAreaData();
            // 获取粮食明细品种 下拉树.
            $scope.getGrainDetailKind();
        },function(data){
        });
    }
    
    
    var validator = $("#contract-form").validate();
    
    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;  
        return this.optional(element)||(checkNumber.test(value));  
    },"请输入正确的数字类型，最多两位小数！");
    
    $scope.retList = function () {
        //$state.go("app.business.transferContract-change");
    	if ($rootScope.previousState_name != '') {
        	if($rootScope.previousState_name.indexOf("app.additionalHome") != -1){//首页跳转的返回首页
        		$rootScope.isIndexPage = true;
        	}
            $rootScope.back();
        } else {
        	$state.go("app.business.transferContract-change");
        }
    }
    
    // 选择客户.
    $scope.getCustomer = function() {
		 var params = [];
		 params.type = "addBlacklist"; //不是黑名单人员
		 var uibModalInstance = $uibModal.open({
			 size:'lg',  
             templateUrl: 'app/business/util/views/customer-list-modal.html',
             controller: 'customerListModalCtrl',
             resolve: {
          	    // items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params; 
              }
          }  
         }); 
		 uibModalInstance.result.then(function (result) {
			 if (result != null) {
		        if ($scope.contract == null || $scope.contract == undefined) {
		            $scope.contract = {};
		        }
		        // 客户编号
		        $scope.contract.customerNumber = result.customerNumber;
		        // 客户表id.
		        $scope.contract.customerBid = result.id;
		        // 客户姓名.
		        $scope.contract.customerName = result.name;
		        
		        // 联系方式.
                if (result.classify == 3152) {
                    // 个人.
                    // 手机号码.
                    $scope.contract.mobile = result.mobile;
                } else if (result.classify == 3153) {
                    // 企业.
                    // 企业电话.
                    $scope.contract.mobile = result.enterprisePhone;
                }
		        // 开户行名称.
		        $scope.contract.bankName = result.bankName;
		        // 银行账户名称.
		        $scope.contract.accountName = result.accountName;
		        // 开户账号
		        $scope.contract.accountNumber = result.accountNumber;
		        // 客户种粮面积
		        $scope.contract.plantAcreage = result.plantAcreage;
		        // 每亩补贴数量
		        $scope.contract.subsidy = result.subsidy;
			 }
			 // 关闭模态框时刷新页面数据
	     }, function (reason) {    
	         console.log(reason);
	     });
	}
    
	// ----------------------------------------------    明细列表     开始          --------------------------------------------------
	// 子表数据模型.
	$scope.storeWareDetail = {};
    // 用于存放 子表数据 的数组.
    $scope.addedDetail = [];
    
	 // 点击新增或者修改时弹出模态窗
    $scope.addRow = function() {
    	// 先判断数量才能新增.
    	if ($scope.contract.contractType == '' || $scope.contract.contractType == null) {
    		alert("合同类型必须填写！");
    		return;
    	}
		var params = [];
		
		params.detailType = "contract";
		// 合同类型.
		params.executeType = $scope.contract.contractType;
		// 粮食品种.
		params.grainKind = $scope.contract.grainKind;
		// 粮食明细品种.
		params.grainDetailKind = $scope.contract.grainDetailKind;
		// 粮食等级.
		params.grainGrade = $scope.contract.grainGrade;
		
		var uibModalInstance = $uibModal.open({
            size:'md',  
            templateUrl: 'app/business/storeWareDetail/views/transferStoreWareDetailModal.html',
            controller: 'transferStoreWareDetailModalCtrl',
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
				$scope.addedDetail.push(angular.copy(result));
				// 通过明细数量计算合同数量.
				$scope.countSumAmount();
			}
	    }, function (reason) {
	        console.log(reason);
	    });
	}
	
    
	// 修改时弹出模态窗
	$scope.editRow = function(detailInfo) {
    	// 索引，用来保存模态框返回的数据.
    	var index = $scope.addedDetail.indexOf(detailInfo);
    	
		var params = [];
    	
		params.detailType = "contract";
        params.grainKind = detailInfo.grainKind;
		params.grainDetailKind = detailInfo.grainDetailKind;
		params.inCount = detailInfo.inCount;
		
		// 合同类型.
		params.executeType = $scope.contract.contractType;
		
		
		params.onlyCanChangeAmount = $scope.selectPlan;
		
		var uibModalInstance = $uibModal.open({
				size:'md',  
	            templateUrl: 'app/business/storeWareDetail/views/transferStoreWareDetailModal.html',
	            controller: 'transferStoreWareDetailModalCtrl',
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
				// 子表数量.
				$scope.addedDetail[index].inCount = result.inCount;
				$scope.addedDetail[index].grainKind = result.grainKind;
				
				$scope.addedDetail[index].grainDetailKind = result.grainDetailKind;
				// 通过明细数量计算合同数量.
				$scope.countSumAmount();
		 }
		 }, function (reason) {
			 console.log(reason);
		 });
	}  
	 
    // 删除一行
    $scope.deleteRow = function(detail) {
        if ($scope.addedDetail.length <= 1 ) {
            alert("必须填写一条明细信息！");
            return;
        }
        if (detail.id != null && detail.id != undefined && detail.id != '') {
            if (!confirm("此条数据为之前保存的数据，确定要删除吗？")) {
                return;
            }
            storeWareDetailService.deleteDetailDataById(detail.id).then(function(data) {
				// 计算合同数量 = 明细总数量
				$scope.countSumAmount();
            },function(data){
                console.log(data);
            });
        }
        var index = $scope.addedDetail.indexOf(detail);
        if (index != -1) {
            $scope.addedDetail.splice(index, 1);
			// 通过明细数量计算合同数量.
			$scope.countSumAmount();
        }
        
    }
	
    // 计算总数量 = 明细数量之和.
    $scope.countSumAmount = function() {
		var detailSumAmount = 0;
		for (var i = 0; i < $scope.addedDetail.length; i++) {
			if ($scope.addedDetail[i].inCount != null && $scope.addedDetail[i].inCount != '') {
				// 累加明细数量.
				detailSumAmount += parseFloat($scope.addedDetail[i].inCount);
			}
		}
		$scope.contract.grainQuantity = detailSumAmount;
    }

    
    
	// ----------------------------------------------    计划明细列表     结束          --------------------------------------------------
    
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
		formData : [{type : 'contract',userId:$rootScope.userInfo.userId,orgId:$rootScope.userInfo.orgId}], // 与文件一起发送的数据
		
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
    
	// -----------------------------------------------   上传下载相关     结束           ------------------------------------------------
	
	
	
    
    // ----------------------------------------------    树形下拉框     开始          --------------------------------------------------
    // 树形下拉框(粮食性质)
    $scope.getAttributeData = function() {
        enumService.getTreeList($scope.contract.grainAttribute, "grainAttribute").then(function(data) {
            $scope.grainAttributeTreeData = data;
        },function(data) {
            console.log(data);
        })
    };

    // 树形下拉框(粮食产地)
    $scope.getAreaData = function() {
        enumService.getTreeList($scope.contract.grainProducingArea, "grainProducingArea").then(function(data) {
            $scope.grainProducingAreaTreeData = data;
        },function(data){
            console.log(data);
        })
    };
    
    // 树形下拉框(明细品种)
    $scope.getGrainDetailKind = function() {
    	enumService.getTreeListByTypeId( "grainDetailKind", $scope.storeWareDetail.grainKind).then(function(data) {
            $scope.grainDetailKindTreeData = data;
        },function(data) {
            console.log(data);
        })
    };
    // ----------------------------------------------    树形下拉框     结束          --------------------------------------------------
    
    
    if ($stateParams.id != 0) {
        $scope.isNotEdit = $stateParams.isNotEdit;
        // 编辑类型，是add 或者  edit
        $scope.editType = $stateParams.editType;
        //提交按钮的显示
        $scope.showCommit = true;
        if ($stateParams.isNotEdit == true) {
            $scope.loadDataByIdAndProcessInstanceId($stateParams.id, $stateParams.processInstanceId, "change");
        } else {
            $scope.loadDataById($stateParams.id, "change");
        }
    }else {
        $scope.showCommit = true ; //提交按钮展示
    }
    
    // 保存.
    $scope.save = function (variable) {
       
    	if (!$scope.saveFlag) {
    		if (validator.form()) {
    			
    			// 设置saveFlag为true,防止重复提交.
    			$scope.saveFlag = true;
    			
    			var url = "";
    			if ($scope.editType == "add") {
    				url = '/depot/business/contract/saveChange';
    			} else if ($scope.editType == "edit") {
    				url = '/depot/business/contract/updateChange';
    			}
    			$http({
    				method: 'POST',
    				url: APP_CONFIG.businessUrl + url,
    				data: {
    					contractJson : angular.toJson($scope.contract),
                        id : $stateParams.id,
    					businessStoreWareDetailJson : angular.toJson($scope.addedDetail),
    					userId : $rootScope.userInfo.userId,
    					userName : $rootScope.userInfo.userName,
    					realName : $rootScope.userInfo.realName,
    					depotInfoOrgId : $rootScope.orgInfo.orgId,
    					fileIds : angular.toJson($scope.fileIds),
    					deleteFileIds : angular.toJson($scope.deleteFileIds)
    				}
    			}).then(function successCallback(response) {

                    if(response.data.status == "success"){
                        if(variable != null && variable != "" && typeof variable != 'undefined' ){
                            if($scope.editType == "add"){
                                //新增数据返回 id
                                var id = response.data.id;
                            }else {
                                //修改页面
                                var id = $stateParams.id;
                                variable = "2";
                            }
                            contractService.loadDataById(id).then(function(data){
                                $scope.contract = data.contract;
                                $scope.choice($scope.contract,variable);
                                $scope.contract.signingMan=parseInt(data.contract.signingMan);
                                $scope.contract.customerId=parseInt(data.contract.customerId);
                            },function(data){
                            });
                        }else{
                            alert("保存成功！");
                            $scope.retList();
                        }
                    }else{
                        alert(response.data.msg);
                        $scope.saveFlag = false;
                    }
    				
    			}, function errorCallback(response) {
    				// 请求失败执行代码
    			});
    		}
    		
    	}

    }
});
