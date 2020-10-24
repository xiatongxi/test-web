angular.module('app.business').controller("transferStoreWareDetailModalCtrl", 
	function($scope, $uibModalInstance, $filter, $http, $rootScope, APP_CONFIG, items,
			storeWareDetailService, StorehouseService, warehouseService,enumService, commonUtilService) {
	$scope.storeWareDetail={};
	
	
	// 树形下拉框(明细品种)
    $scope.getGrainDetailKind = function(grainKind) {
    	$scope.storeWareDetail.grainKind=grainKind;
        enumService.getTreeListByTypeId($scope.storeWareDetail.grainDetailKind, $scope.storeWareDetail.grainKind).then(function(data) {
            $scope.grainDetailKindTreeData = data;
        },function(data) {
            console.log(data);
        })
    };
    
   //明细品种必选的验证
    $scope.selectOnlyDetailKind = function(item, selectedItems) {
        if (item  !== undefined) {
             $("#grainDetailKind-error").text("");
             var treeInput=document.getElementsByClassName("tree-input")[0];
             treeInput.style.background="#fff";
             treeInput.style.borderColor="#ccc"
        } else {
             $("#grainDetailKind-error").text("必须填写");
        }
		
    };
	
	// 获取从触发方法带过来的数据.
	if (items != undefined) {
		//$scope.storeWareDetail = {};
		
		
		$scope.storeWareDetail.grainKind = items.grainKind;
		$scope.storeWareDetail.grainDetailKind = items.grainDetailKind;
		$scope.storeWareDetail.inCount = items.inCount;

		 $scope.getGrainDetailKind(items.grainKind);
		// 明细类型，区分是合同还是计划还是通知单.
		$scope.detailType = items.detailType;
		
		if ($scope.detailType == "plan") { // 明细类型为计划.
		} else if ($scope.detailType == "contract") { // 明细类型为合同.
		} else if ($scope.detailType == "notice") { // 明细类型为通知单.
			$scope.executeType = items.executeType;
		}
		
		
		// 粮食品种.
		$scope.grainKind = items.grainKind;
		// 粮食明细品种.
		$scope.grainDetailKind = items.grainDetailKind;
		
	}
	
	
	
    var validator = null;
    
    
 
    // 提交表单
    $scope.save = function() {
    	// 模态框的校验器，进入时为空.
    	if (validator == null) {
    		validator = $("#storeWareDetail-form").validate();
    		$.validator.addMethod("validModalNumber",function(value,element, params) {
    			var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;
    			if (this.optional(element)||(checkNumber.test(value))) {
					return true
    			} else {
    				return false;
    			}
    		},"请输入正确的数字类型，最多两位小数！");
    		
    		//明细品种必选的验证
    		$scope.grainDetailKind = angular.fromJson($scope.storeWareDetail.grainDetailKind);
             if ($scope.grainDetailKind == '' || $scope.grainDetailKind == null) {
                 $("#grainDetailKind-error").text("必须填写");
                 var treeInput=document.getElementsByClassName("tree-input")[0];
                 treeInput.style.background="#fff0f0";
                 treeInput.style.borderColor="#A90329"
             } else {
                 $("#grainDetailKind-error").text("");
             }
             
    		$scope.save();
            
    	} else {
            if (validator.form()) {
            	//明细品种必选
            	//明细品种
         	    $scope.grainDetailKind = angular.fromJson($scope.storeWareDetail.grainDetailKind);
         	    //console.log(typeof($scope.grainDetailKind));
         	   // typeof($scope.grainDetailKind);
         	    var num = angular.isNumber($scope.grainDetailKind);
         	    if(!num){
         	    	 $scope.storeWareDetail.grainDetailKind = $scope.grainDetailKind[0].id;
         	    }
                
                 
                
            	StorehouseService.findByStorehouse($scope.storeWareDetail.houseId).then(function(dataE){
            		$scope.storeWareDetail.houseName =dataE.storehouseName;
            		warehouseService.findByWarehouse($scope.storeWareDetail.warehouseId).then(function(datas){
                		$scope.storeWareDetail.warehouseName=datas.warehouseName;
                		$uibModalInstance.close($scope.storeWareDetail);
    				},function (data) {
    					console.log(data);
    				});
				},function (dataE) {
	            	console.log(dataE);
				});

            }
    	}

    }
    
	// 关闭模态窗口
	$scope.cancel = function() {
		$uibModalInstance.close();
	}
});