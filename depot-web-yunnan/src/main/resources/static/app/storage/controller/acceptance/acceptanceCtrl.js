"use strict";
angular.module('app.storage')
	//计划验收
	.controller("acceptanceCtrl",function($scope, $filter, $http, $state, $stateParams, $uibModal, $rootScope, FileUploader,codeRuleService , acceptanceService, planService, qualitycheckService,businessFileService, APP_CONFIG) {
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.plan = {};
        $scope.isNotEdit = false; 
        $scope.userId = $rootScope.userInfo.userId;
        $scope.acceptanceNumber = '';
        $scope.searchCondition = {customerPlanState:null};
        if($stateParams.customerPlanState != null){
        	$scope.searchCondition.customerPlanState = $stateParams.customerPlanState;
        }
        // 获取列表数据
        $scope.loadData = function() {
            acceptanceService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition, $scope.userId).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log(data);
            });
        };

        $scope.gainAcceptance = function() {
            codeRuleService.getCodeValueByType("acceptance", $rootScope.userInfo.orgId).then(function(data) {
                if (data.status == "success") {
                	//$scope.plan = {};
                    $scope.plan.acceptanceNumber = data.codeValue;
                } else if (data.status == "error") {
                    if(confirm("验收申请编号有误！该页面无法保存！原因：" + data.msg + " 是否返回到列表页！")) {
                        $scope.retList();
                    }
                }
            });
        };

        // 清空计划.
        $scope.removePlan = function() {
            if (true) {
                $scope.plan.planNumber = null;
                $scope.plan.planTitle = null;
                $scope.plan.referenceNumber = null;
                $scope.plan.executeType = null;

            }
        }

        //存放仓房的数据
        $scope.houseIds = [];
        $scope.warehouseIds = [];
        $scope.loadDataById = function(id,planId,acceptanceNumber) {
        	
            planService.loadDataById(planId).then(function(data){
                $scope.plan = data.plan;
                $scope.plan.acceptanceNumber = acceptanceNumber;
                
                $scope.plan.createTime = $filter('date')($scope.plan.createTime, "yyyy-MM-dd");
                // 子表数据.
                $scope.houseIdDetail = [];
                
                $scope.storeWareDetailList = data.storeWareDetailList;
                for (var i=0; i < data.storeWareDetailList.length; i++) {
                    $scope.houseIdDetail.push(angular.copy(data.storeWareDetailList[i]));
                    $scope.houseIds.push(angular.copy($scope.houseIdDetail[i].houseId));
                    $scope.warehouseIds.push(angular.copy($scope.houseIdDetail[i].warehouseId));
                }
                
            },function(data){
                console.log(data);
            });
            if($stateParams.isNotEdit){
                qualitycheckService.getDataByZJId(id,planId).then(function(qualityData){
                    $scope.addedDetail = qualityData.qualitycheck;
                    /*acceptanceService.loadDataByZJId(id,"acceptance").then(function(data){
                        $scope.fileList = data.fileList;
                    },function(data){
                        console.log(data);
                    });*/
                    businessFileService.getList(id,"acceptance",$rootScope.userInfo.orgId,null).then(function(data){
                        $scope.fileList = data;
                    },function(data){
                        console.log(data);
                    });
                },function(data){
                    console.log(data);
                });
            }
        };
        
       

        $scope.searchCondition = {};
        // 用于存放新增的数据
        $scope.addedDetail = [];

        if($stateParams.id == "" || $stateParams.id == null){
            $scope.loadData();
        }else if($stateParams.id == "0" ){
            $scope.gainAcceptance();
        }else{
            $scope.isNotEdit = $stateParams.isNotEdit;
            $scope.loadDataById($stateParams.id,$stateParams.plan_id,$stateParams.acceptance_number);
        }

        // 新增
        $scope.showAdd = function(id) {
            $state.go("app.storage.acceptanceSaveCX", {id:0});
        };

        // 查看页面
        $scope.getView = function(id,planId,acceptanceNumber) {
            $state.go("app.storage.acceptanceEditCX", {id:id,plan_id:planId,acceptance_number:acceptanceNumber});
        };

        // 查看质检详情
        $scope.showRow = function(id) {
            $state.go('app.storage.qualitycheck.trkedit',{id:id,isNotEdit:true});
        };
        // 检验列表.
        $scope.addRow = function() {
        	
            // 选择计划，选择后不能修改合同类型，粮食品种，明细品种，粮食等级，粮食性质.
            var params = [];
            params.houseIds=$scope.houseIds;
            params.warehouseIds=$scope.warehouseIds;
            var uibModalInstance = $uibModal.open({
                size:'lg',
                templateUrl: 'app/storage/views/acceptance/checkout-list-modal.html',
                controller: 'checkoutListModalCtrl',
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
                    $scope.addedDetail.push(angular.copy(result));
                }
                // 关闭模态框时刷新页面数据
            }, function (reason) {
                console.log(reason);
            });
        };

        // 返回
        $scope.retList = function () {
            $state.go("app.storage.acceptanceList");
        };

        // 翻页
        $scope.goPage = function(pageNum) {
            if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
                $scope.pageInfo.pageNum = pageNum;
                $scope.loadData();
            }
        };

        // 删除一行
        $scope.deleteRow = function(detail) {
            var index = $scope.addedDetail.indexOf(detail);
            if (index != -1) {
                $scope.addedDetail.splice(index, 1);
            }
        };

        //获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
        function getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
            return currentdate;
        }

        // 计划列表.
        $scope.getPlan = function() {

            // 选择计划，选择后不能修改合同类型.
            var params = [];
            var uibModalInstance = $uibModal.open({
                size:'lg',
                templateUrl: 'app/storage/views/acceptance/acceptancePlan-list-modal.html',
                controller: 'acceprancePlanListModalCtrl',
                resolve: {
                    // items是一个回调函数
                    items: function () {
                        // 这个值会被模态框的控制器获取到
                        return params;
                    }
                }
            });
            uibModalInstance.result.then(function (result) {
                //说明选择了计划
                if (result != null) {
                    $scope.plan = result;
                    $scope.plan.createTime = $filter('date')($scope.plan.createTime, "yyyy-MM-dd");
                    $scope.gainAcceptance();
                    //$scope.plan.acceptanceNumber = $scope.acceptanceNumber;
                }
                // 关闭模态框时刷新页面数据
            }, function (reason) {
                console.log(reason);
            });
        }

        // 保存.
        $scope.save = function () {
            if ($scope.addedDetail.length == 0) {
                alert("至少填写一条完整的质检信息！");
                return;
            }
           
            
            var plan = angular.toJson($scope.plan);
            var addedDetail = angular.toJson($scope.addedDetail);
            var file = angular.toJson($scope.fileIds);
            acceptanceService.report(plan,addedDetail,file).then(function(data){

            	if(data.status=="success"){
            		
	            	 var qualityIds = "";
	                 for (var i = 0; i < $scope.addedDetail.length; i++) {
	                     qualityIds += $scope.addedDetail[i].id+",";
	                 }
	            	var businessPlanId = $scope.plan.id;
	            	var businessPlancreateTime = $scope.plan.createTime;
	            	var fileIds = angular.toJson($scope.fileIds);
	            	var acceptanceNumber = $scope.plan.acceptanceNumber;
            	
	            	var qualityIds = qualityIds.substring(0,qualityIds.length-1);
                 
                    	//alert("点击验收后不可再取消，确认？");
                    	acceptanceService.saveAcceptance(businessPlanId,businessPlancreateTime,fileIds,qualityIds,acceptanceNumber).then(function(data){
                    		//console.log(businessPlanId+"-1-"+businessPlancreateTime+"-2-"+fileIds+"-3-"+qualityIds+"--4--");
                            if(data.status=="success" || data.msg=="成功！"){
                            	 $state.go("app.storage.acceptanceList");
                                 alert("申请验收成功！");
                                 $scope.loadData();
                            }
                            
                        },function(data){
                            console.log(data);
                        });
                    	
            	}else{
            		alert("接收数据有误");
            	}
            	
        	},function(data){
                console.log(data);
            });
        	
        	       
           /* $http({
                method: 'POST',
                url: APP_CONFIG.businessUrl + '/depot/business/plan/audit/save',
                data: {
                   
                }
            }).then(function successCallback(response) {
                if (response.data.status == "success") {
                    alert("保存成功！");
                    $state.go("app.storage.acceptanceList");
                }
            }, function errorCallback(response) {
                // 请求失败执行代码
            });*/
        };

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
    		url : APP_CONFIG.basicUrl + '/fileUpload/updateFileBusiness',
    		autoUpload : true, // 将文件添加到队列后自动上传.
    		formData : [{type : 'acceptance',userId:$rootScope.userInfo.userId,orgId:$rootScope.userInfo.orgId}], // 与文件一起发送的数据
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
    });