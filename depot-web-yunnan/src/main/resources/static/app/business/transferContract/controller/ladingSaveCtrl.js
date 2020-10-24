angular.module('app.business').controller("ladingSaveCtrl", 
        function($scope, $http, $filter, $stateParams, $state, $uibModal, $rootScope,
                ladingService, deliveryStorageNoticeAuditService, commonUtilService,
                storeWareDetailService, enumService, codeRuleService, APP_CONFIG) {
    
    $scope.lading = {};
    $scope.ladingNumber = {};
    
    //获取制单人
    $scope.lading.creater=$rootScope.userInfo.realName;
    
    //获取当前时间
    var nowTime=new Date();
    $scope.lading.billDate=nowTime;
    
    
    // 是否选择合同,默认为false.
    $scope.selectContract = false;
    // 默认是编辑.
    $scope.isNotEdit = false;
    // 保存标识，防止重复提交.
    $scope.saveFlag = false;
    // 显示新增明细的按钮(选择计划后，隐藏).
    $scope.addRowButtonShow = true;
    
    // 用于存放新增的数据
    $scope.addedDetail = [];
    
    $scope.loadDataById = function(id) {
    	ladingService.loadDataById(id).then(function(data) {
            $scope.lading = data;
            $scope.lading.billDate = $filter('date')($scope.lading.billDate, "yyyy-MM-dd");
            $scope.lading.deliveryDate = $filter('date')($scope.lading.deliveryDate, "yyyy-MM-dd");
            
            if ($scope.lading.inboundNumber != undefined && $scope.lading.inboundNumber != null) {
                // 选择了合同.
                $scope.selectContract = true;
            }
        }, function(data){
        });
    }
    
    
    $('input[readOnlyButValid]').on("focusin", function() {
        $(this).prop('readOnly', true);
    });

    $('input[readOnlyButValid]').on("focusout", function() {
        $(this).prop('readOnly', false); 
    });
    
    
    $scope.dataId={};
    // 选择入站单.
    $scope.getInbound = function() {
        var params = [];
        var uibModalInstance = $uibModal.open({
            size:'lg',  
            templateUrl: 'app/business/util/views/inbound-list-modal.html',
            controller: 'inboundListModalCtrl',
            resolve: {
               items: function () { // items是一个回调函数
                  // 这个值会被模态框的控制器获取到
                  return params; 
               }
            }  
        }); 
        uibModalInstance.result.then(function (result) {
            if (result != null) {
            	// 入站单号
            	$scope.lading.inboundNumber = result.rzdh;
                // 客户名称
                $scope.lading.customerName = result.khmc;
                //编号
                $scope.dataId = result.dataid;
                // 选择合同标识.
                $scope.selectContract = true;
            }
             // 关闭模态框时刷新页面数据
         }, function (reason) {    
             console.log(reason);
         });
    }
    
    
    // 选择火车皮号.
    $scope.gethcph = function() {
    	var params = [];
    	params.dataId=$scope.dataId;
    	if(params.dataId==null){
    		alert("请先选择入站单号");
    	}
    	
    	var uibModalInstance = $uibModal.open({
    		size:'lg',  
    		templateUrl: 'app/business/util/views/train-list-modal.html',
    		controller: 'trainListModalCtrl',
    		resolve: {
    			items: function () { // items是一个回调函数
    				// 这个值会被模态框的控制器获取到
    				return params; 
    			}
    		}  
    	}); 
    	uibModalInstance.result.then(function (result) {
    		if (result != null) {
    			
    			 // 火车皮号
                $scope.lading.trainNumber = result.hcph;
    			// 粮油品种.
                $scope.lading.grainKind = parseInt(result.lypz);
                // 规格型号
                $scope.lading.model = result.ggxh;
    			 //卸载件数
                $scope.lading.unloadNumber = result.xzjs;
                //站台
                $scope.lading.platform = result.zt;
                //货位
                $scope.lading.warehouseName = result.hw;
                //单件重量(公斤)
                $scope.lading.salesDepartment = result.djzl;
               
    			// 选择合同标识.
    			$scope.selectContract = true;
    			
    			
    		}
    		// 关闭模态框时刷新页面数据
    	}, function (reason) {    
    		console.log(reason);
    	});
    }
    
    // 清空入站单号以及相关连的火车皮号.
    $scope.removeInbound = function() {
    	if (!$scope.isNotEdit && $scope.lading.inboundNumber != null) {
    		// 入站单号.
    		$scope.lading.inboundNumber = null;
    		// 客户名称.
    		$scope.lading.customerName = null;
    		// 火车皮号
    		$scope.lading.trainNumber = null;
    		// 粮油品种.
    		$scope.lading.grainKind = null;
    		// 规格型号
    		$scope.lading.model = null;
    		//卸载件数
    		$scope.lading.unloadNumber = null;
    		//站台
    		$scope.lading.platform = null;
    		//货位
    		$scope.lading.warehouseName = null;
    		//清空关联的火车皮号
    		$scope.dataId=null;
    	}
    }
    
    // 清空火车皮号.
    $scope.removeHcph = function() {
        if (!$scope.isNotEdit && $scope.lading.trainNumber != null) {
        	 // 火车皮号
            $scope.lading.trainNumber = null;
			// 粮油品种.
            $scope.lading.grainKind = null;
            // 规格型号
            $scope.lading.model = null;
			 //卸载件数
            $scope.lading.unloadNumber = null;
            //站台
            $scope.lading.platform = null;
            //货位
            $scope.lading.warehouseName = null;
        }
    }
    

    
    // ----------------------------------------------    树形下拉框     开始          --------------------------------------------------
    
    // 树形下拉框(明细品种)
    $scope.getGrainDetailKind = function() {
        enumService.getTreeListByParentId($scope.deliveryStorageNotice.grainDetailKind, "grainDetailKind", $scope.deliveryStorageNotice.goodsKind).then(function(data) {
            $scope.grainDetailKindTreeData = data;
        },function(data) {
            console.log(data);
        })
    };
    
    // ----------------------------------------------    树形下拉框     结束          --------------------------------------------------
    
    // 如果id不为0，说明是查询或者查看，需要查询后台.
    if ($stateParams.id != 0) {
        //$scope.isNotEdit = $stateParams.isNotEdit;
    	$scope.isNotEdit = true ;
        $scope.loadDataById($stateParams.id);
       
    } else {
        // 新增.
        
        // 编码类型.
        var codeType = "";
        codeType = "lading";
        // 获取提货单编号.
        codeRuleService.getCodeValueByType(codeType, $rootScope.orgInfo.orgId).then(function(data) {
            if (data.status == "success") {
                $scope.ladingNumber.status = "success";
                $scope.lading.ladingNumber = data.codeValue;
            } else if (data.status == "error") {
                $scope.ladingNumber.msg = data.msg;
                $scope.ladingNumber.status = "error";
                if(confirm("提货单编号有误！该页面无法保存！原因：" + $scope.ladingNumber.msg + " 是否返回到列表页！")) {
                    $scope.retList();
                }
            }
        });
    }
    
    // 返回.
    $scope.retList = function () {
        $state.go("app.business.lading");
    }
    
    var validator = $("#lading-form").validate();
    // 保存.
    $scope.save = function () {
    	
        if ($scope.ladingNumber.status != undefined && $scope.ladingNumber.status == "error") {
            if (confirm("提货单编号有误！该页面无法保存！原因：" + $scope.ladingNumber.msg + " 是否返回到列表页！")) {
                $scope.retList();
                return;
            } else {
                return;
            }
        }
        if ($scope.lading.measurementMethod == '' || $scope.lading.measurementMethod == null) {
            $("#measurementMethod-error").text("必须填写");
            return ;
        } else {
            $("#measurementMethod-error").text("");
        }
        
       
        if (!$scope.saveFlag) {
            if (validator.form()) {
                // 设置saveFlag为true,防止重复提交.
                $scope.saveFlag = true;
                $scope.lading.orgId = $rootScope.userInfo.orgId;
                $http({
                    method: 'POST',
                    url: APP_CONFIG.businessUrl + '/depot/business/lading/save',
                    data: {
                        ladingJson : angular.toJson($scope.lading)
                    }
                }).then(function successCallback(response) {
                    if(response.data.status == "success") {
                        alert("保存成功！");
                        $scope.retList();
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
