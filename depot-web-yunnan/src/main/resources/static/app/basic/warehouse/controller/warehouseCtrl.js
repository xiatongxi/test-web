angular.module('app.basic')
	.controller("warehouseCtrl", function($scope, $rootScope, $uibModal, $http, $location, $state, $stateParams, warehouseService, enumService, StorehouseService, agentStorehouseService ) {

	$scope.ware = {storehouseId:"",warehouseName:""};

	//判断是否是代储点货物信息
	if($stateParams.libraryType == '1'){
        $scope.libraryType = $stateParams.libraryType;
    }else{
        $scope.libraryType = '0';
    }

	$scope.getStorehouseDate = function() {
		StorehouseService.getPageInfo(null, null, null, $rootScope.orgInfo.orgId, $scope.libraryType,null).then(function(data){
            $scope.storeHouseList = data.list;
        },function(data){
            console.log(data);
        });
        // 获取仓房列表
        StorehouseService.getStorehouseList($rootScope.orgInfo.orgId, $scope.libraryType).then(function(data){
            $scope.storehouseObj = data.houseObj;
        },function(data){
            console.log(data);
        });
	}
	$scope.getStorehouseDate();

	$scope.loadWare = function(houseId) {
		warehouseService.getStorehouse($rootScope.orgInfo.orgId, houseId, $scope.libraryType).then(function(data){
			$scope.warelist = data.wareList;  //下拉列表数据
			$scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
		},function (data) {
			console.log(data);
		});
	}
	$scope.loadWare(null);

     // 获取货位列表数据
	 $scope.pageInfo = {pageNum : 1, pageSize : 10};
     $scope.loadData = function() {
         if($scope.libraryType == '1'){
             // 获取货位列表
             agentStorehouseService.getWareList($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.agentDepotName).then(function(data){
                 $scope.pageInfo = data;
             },function(data){
                 console.log(data);
             });
         }else {
             warehouseService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,
                 $scope.ware, $rootScope.orgInfo.orgId, $scope.libraryType, null).then(function (data) {
                 $scope.pageInfo = data;
             }, function (data) {
                 console.log(data);
             });
         }
     }
     $scope.loadData();

     // 点击新增或者修改时弹出模态窗
	 $scope.edit = function(id, btnType) {
		 var uibModalInstance = $uibModal.open({
             size:'md',
             templateUrl: 'app/basic/warehouse/views/warehouse-edit.html',
             controller: 'warehouseCtrlEdit',
             resolve: {
            	 id : id,
            	 btnType : function(){return btnType;},
                 libraryType : function(){return $scope.libraryType;}
             }
         });
		 uibModalInstance.result.then(function (result) {
		 	$scope.loadData();	// 关闭模态框时刷新页面数据
	     }, function (reason) {
	         console.log(reason);
	     });
	 };

    // 删除一条记录
    $scope.remove = function(id,storehouseId) {
//         if (!confirm("确定要删除吗？")) {
//             return;
//         }
         warehouseService.remove(id,storehouseId).then(function(data){
        	 if (data.status == 'success') {
        		 alert("操作成功！");
                 // 重新加载数据
                 $scope.loadData();
             } else {
                 alert("操作失败！");
             }
         },function(data){
             console.log(data);
         });
    };

    // 删除一条已有代储仓房
    $scope.removeAgentWare = function(id) {
        agentStorehouseService.removeAgentWare(id).then(function(data){
            if (data.status == 'success') {
                alert("操作成功！");
                // 重新加载数据
                $scope.loadData();
            } else {
                alert("操作失败！");
            }
        },function(data){
            console.log(data);
        });
    };
     
    // 翻页
 	$scope.goPage = function(pageNum) {
 		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
      		$scope.pageInfo.pageNum = pageNum;
      		$scope.loadData();
      	}
 	}

})
.controller("warehouseCtrlEdit", function(FileUploader, $scope, $rootScope, $http, $filter, $location, $uibModalInstance, $stateParams, id,
              agentDepotService, btnType, libraryType, warehouseService, StorehouseService, enumService, APP_CONFIG) {
    $scope.storehouseList;//仓房信息
    $scope.warehouse = {};//货物信息
    $scope.depotList = {};//粮库信息
	// 获取基础数据
	$scope.getBasicData = function() {
        $scope.pageInfo = {pageNum : 1, pageSize : 100};
        $scope.search = {storehouseId:""};
        //判断是否是代储点仓房信息
        if(libraryType == '1'){
            $scope.warehouse.libraryType = libraryType;
            agentDepotService.getAgentDepotHouse("","").then(function(data){
                $scope.depotList = data.map(function(item) {
                    return {
                        depotId: item.id,
                        depotName: item.agentDepotName
                    }
                });
                $scope.getHouseList($scope.warehouse.depotId);
            },function(data){
                console.log();
            });
        }else{
            libraryType = '0';
            $scope.storehouseList = $rootScope.storelist; 
            $scope.warehouse.depotName = $rootScope.orgInfo.orgName;
            $scope.warehouse.depotId = $rootScope.orgInfo.orgId;
            $scope.warehouse.libraryType = "0";
            $scope.depotList = [{depotId: $rootScope.orgInfo.orgId, depotName: $rootScope.orgInfo.orgName}];
        }
	};

    //根据代储库获取仓房列表
    $scope.getHouseList = function(depotId) {
        StorehouseService.getAgentList(depotId,$rootScope.orgInfo.orgId,libraryType).then(function(data){
            $scope.storehouseList = data;
        },function(data){
            console.log(data);
        });
    };
	
	// 初始化模态窗口数据
    $scope.edit = function() {
    	warehouseService.findByWarehouse(id).then(function(datas){
            $scope.warehouse = datas;
            $scope.warehouse.warehouseUseTime = $filter('date')($scope.warehouse.warehouseUseTime, "yyyy-MM-dd");
            if (btnType == '1') {
                $scope.isNotEdit = true;
            }
            $scope.getBasicData();
        },function(datas){
        	console.log(datas);
        });

    }
    $scope.edit();

    //去重
    $scope.warehouseCode = function(){
    	if (id == "" || id == undefined) {
    		id = 0;
    	}
    	warehouseService.findWarehouseCode($scope.warehouse.storehouseId, $scope.warehouse.warehouseCode, id, libraryType).then(function(data){
    		if(data == '0'){
				alert("编码重复");
				$scope.warehouse.warehouseCode = "";
			}
		},function(data){
    	    console.log(data);
        });
    }
    
    // 货位编码最多只能输入2位数字
    $scope.checkUp = function() {
    	var text = $scope.warehouse.warehouseCode;
    	if (text != null && text != "") {
    		var a = text.substring(text.length - 1, text.length);
	    	var reg = /^\d$/g;
	    	if (!reg.test(a)) {
	    		$scope.warehouse.warehouseCode = text.replace(a, "");
	    	}
    	}
    }
    
    // 文件上传实例
	$scope.uploader = new FileUploader({
		url : APP_CONFIG.basicUrl + '/fileUpload/uploadFile',
		autoUpload : true, // 将文件添加到队列后自动上传
		formData : [{fileType:'image'}], // 与文件一起发送的数据
		removeAfterUpload : true, // 从队列上传后删除文件
		// 上传进度
		onProgressItem : function(fileItem, progress) {
			console.info("正在上传：" + progress + "%");
		},
		// 回调函数，在一个文件上传成功后触发
		onSuccessItem : function(fileItem, response, status, headers) {
			$scope.warehouse.wareImg = response;
		}
	});
	
	$.validator.addMethod("validThan0",function(value,element, params) {
    	if(value == 0){
    		return this.optional(element); 
    	}else{
    		return this.optional(element) || true;
    	}
    },"请输大于0的数！");
	
	$.validator.addMethod("validCapacity",function(value,element, params) {
		if(value == 0){
			return this.optional(element); 
		}else{
			if($scope.warehouse.storehouseId != null && $scope.warehouse.storehouseId != ""){
				for(var i=0;i<$scope.storehouseList.length;i++){
					if($scope.warehouse.storehouseId == $scope.storehouseList[i].storehouseId){
						if(parseFloat($scope.storehouseList[i].designCapacity) < parseFloat($scope.warehouse.warehouseCapacity)){
							return this.optional(element) || false;
						}else{
							return this.optional(element) || true;
						}
						break;
					}
				}
			}else{
				return this.optional(element) || true;
			}
		}
	},"请输大于0的数且要小于仓房的设计容量！");
    
	var validator;
    // 提交表单
    $scope.save = function() {
    	validator = $("#warehouse-form").validate();
    	if (validator.form()) {
	    	warehouseService.save($scope.warehouse, $rootScope.userInfo).then(function(data){
	    		if (data.status == 'success') {
	    			alert("保存成功！");
	    		} else {
	                alert("保存失败！");
	            }
	    		$scope.cancel();
	        },function(data){
	            console.log(data);
	        });
    	}
    }
    
    $scope.change = function(){
		validator = $("#warehouse-form").validate();
	}
    
    $.validator.addMethod("validThan0",function(value,element, params) {
    	if(value == 0){
    		return this.optional(element); 
    	}else{
    		return this.optional(element) || true;
    	}
    },"请输大于0的数！");
    
    // 关闭模态窗口
	$scope.cancel = function() {
		$uibModalInstance.close();
	}
})