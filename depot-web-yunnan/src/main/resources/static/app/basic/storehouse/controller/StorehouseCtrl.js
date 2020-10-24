angular.module('app.basic')
	.controller("StorehouseCtrl", function($scope, $rootScope, $state,$stateParams, $http, FileUploader, $location, StorehouseService, enumService,
                APP_CONFIG, WareHouseBasicInfoService,agentStorehouseService) {
 
     // 获取列表数据
	 $scope.pageInfo = {pageNum : 1, pageSize : 10};
     $scope.search = {storehouseId:""};
     $scope.storehouseList;
     $scope.agentDepotName;
     var drNum;

	//判断是否是代储点仓房信息
	if($stateParams.libraryType == '1'){
        $scope.libraryType = $stateParams.libraryType;
        drNum = 0;
	}else{
        $scope.libraryType = '0';
        drNum = 0;
	}

	$scope.getStorehouseDate = function() {
		StorehouseService.getPageInfo(null, null, null, $rootScope.orgInfo.orgId, $scope.libraryType,null).then(function(data){
            $scope.storeHouseList = data.list;
        },function(data){
            console.log(data);
        });
	}
	$scope.getStorehouseDate();

     $scope.loadData = function() {
         if($scope.libraryType == '1'){
             // 获取仓房列表
             agentStorehouseService.getStoreList($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.agentDepotName).then(function(data){
                 $scope.pageInfo = data;
             },function(data){
                 console.log(data);
             });
         }else {
             StorehouseService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,
                 $scope.search.storehouseId, $rootScope.orgInfo.orgId, '0', null).then(function (data) {
                 $scope.pageInfo = data;
                 if (drNum == 0) {
                     drNum++;
                     $scope.storehouseList = data.list;
                 }
             }, function (data) {
                 console.log(data);
             });
         }

    	 //用于判断仓储业务中的仓房管理和基础数据中的仓房信息是否要操作按钮(仓储业务不需要按钮 只要查看)
        if($stateParams.type == 1){
            $scope.isShow = false;
		}else if ($stateParams.type == 2){
             $scope.isShow = true;
		}
     }
     $scope.loadData();

    // 接收广播，切换仓房
    $scope.$on("storeChangeed", function(event, storehouseId) {
        $scope.search.storehouseId = storehouseId;
        $scope.loadData();
    })

     // 新增或修改跳转
     $scope.add = function(id, btnType) {
    	 $state.go('app.basic.storehouseEditReq',{id:id, btnType:btnType, orgId:$rootScope.orgInfo.orgId, libraryType:$scope.libraryType});
     }

    // 新增或修改代储库跳转
    $scope.addAgentDepot = function(storehouseId) {
        $state.go('app.basic.agentLaoDepot',{storehouseId:storehouseId});
    }

    // 删除一条记录
    $scope.remove = function(storehouse) {
//         if (!confirm("确定要删除吗？")) {
//             return;
//         }
         StorehouseService.remove(storehouse.storehouseId).then(function(data){
      		 if (data.status == 'success') {
                 WareHouseBasicInfoService.synchronizationStoreHouse(storehouse,'D').then(function (data) {

                 },function (data) {
                     console.log(data);
                 });
      			 alert("操作成功！");
      			 $scope.loadData();
      		 } else {
      			 alert("操作失败！");
             }
         },function(data){
              console.log(data);
         });
    }

    // 翻页
 	$scope.goPage = function(pageNum) {
 		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
      		$scope.pageInfo.pageNum = pageNum;
      		$scope.loadData();
      	}
 	}

 	// 文件上传实例
    $scope.uploader = new FileUploader({
        url : APP_CONFIG.basicUrl + '/Storehouse/importFile',
        autoUpload : true, // 将文件添加到队列后自动上传
        formData : [{fileType:'xlsx', userInfo : angular.toJson($rootScope.userInfo)}], // 与文件一起发送的数据
        removeAfterUpload : true, // 从队列上传后删除文件
        // 上传进度
        onProgressItem : function(fileItem, progress) {
            // $scope.jd = progress + "%";
            console.info("正在上传：" + progress + "%");
        },
        // 回调函数，在一个文件上传成功后触发
        onSuccessItem : function(fileItem, response, status, headers) {
            if(fileItem.isSuccess && response == ''){
            	alert("导入成功！");
            } else {
            	alert(response);
            }
            $scope.loadData();
        }
    });

})
.controller("StorehouseCtrlEdit", function($scope, $state, $rootScope, $http, $filter, $location, $stateParams, FileUploader, StorehouseService, enumService,
                                           agentDepotService, APP_CONFIG,WareHouseBasicInfoService) {
	// 修改用户信息
    $scope.edit = function() {
    	StorehouseService.findByStorehouse($stateParams.id, $stateParams.orgId).then(function(data){
            $scope.basicStorehouse = data;
            $scope.basicStorehouse.roof = parseInt($scope.basicStorehouse.roof);
            $scope.basicStorehouse.house = parseInt($scope.basicStorehouse.house);
            $scope.basicStorehouse.ground = parseInt($scope.basicStorehouse.ground);
            //判断如果是代储库新增则默认输入登陆用户库名。
            $scope.basicStorehouse.libraryType = $stateParams.libraryType;
            if($stateParams.libraryType == "1"){
                //获取代储库名称做成下拉列表；
                agentDepotService.getAgentDepotHouse("","").then(function(data){
                    $scope.depotList = data.map(function(item) {
                        return {
                            depotId: item.id,
                            depotName: item.agentDepotName
                        }
                    });
                },function(data){
                    console.log(data);
                });
            }else{
                $scope.basicStorehouse.depotName = $rootScope.depotInfo.orgName;
                $scope.basicStorehouse.libraryType = "0";
                document.getElementsByName("depotName").readOnly = true;
                $scope.depotList = [{depotId: $rootScope.orgInfo.orgId, depotName: $rootScope.orgInfo.orgName}];
            }
            $scope.basicStorehouse.usedate = $filter('date')($scope.basicStorehouse.usedate, "yyyy-MM-dd");
            
            $scope.basicStorehouse.nfszcc = $scope.basicStorehouse.nfszcc == null ? 0 : $scope.basicStorehouse.nfszcc;
            $scope.basicStorehouse.ywfsfqfczz = $scope.basicStorehouse.ywfsfqfczz == null ? 0 : $scope.basicStorehouse.ywfsfqfczz;
            $scope.basicStorehouse.ywfhfbfdss = $scope.basicStorehouse.ywfhfbfdss == null ? 0 : $scope.basicStorehouse.ywfhfbfdss;
            $scope.basicStorehouse.ywlqjcss = $scope.basicStorehouse.ywlqjcss == null ? 0 : $scope.basicStorehouse.ywlqjcss;
            $scope.basicStorehouse.ywjxtfss = $scope.basicStorehouse.ywjxtfss == null ? 0 : $scope.basicStorehouse.ywjxtfss;
            $scope.basicStorehouse.nfhlxzsc = $scope.basicStorehouse.nfhlxzsc == null ? 0 : $scope.basicStorehouse.nfhlxzsc;
            $scope.basicStorehouse.nffddyqtcl = $scope.basicStorehouse.nffddyqtcl == null ? 0 : $scope.basicStorehouse.nffddyqtcl;
            $scope.basicStorehouse.nfcwcc = $scope.basicStorehouse.nfcwcc == null ? 0 : $scope.basicStorehouse.nfcwcc;
            
            if ($stateParams.btnType == '1') {
            	$scope.isNotEdit = true;
            }
            
            //判断是否是圆筒仓（部分字段要做校验控制）
            if($scope.basicStorehouse.storehouseType == "2972"){//仓房类型为圆筒仓
            	$scope.basicStorehouse.storeOutsideLength = 0;
            	$scope.basicStorehouse.storeOutsideWidth = 0;
            	$scope.basicStorehouse.length = 0;
            	$scope.basicStorehouse.width = 0;
        		$("input[name='storeOutsideLength']").attr("readonly","readonly");
        		$("input[name='storeOutsideWidth']").attr("readonly","readonly");
        		$("input[name='length']").attr("readonly","readonly");
        		$("input[name='width']").attr("readonly","readonly");
        		//筒仓外径、筒仓内径（圆筒仓时加验证）
        		$("input[name='outsideSiloDiameter']").attr("validThan0",true);
        		$("input[name='siloDiameter']").attr("validThan0",true);
            }else if($scope.basicStorehouse.storehouseType != "2972" && $scope.basicStorehouse.storehouseType != null){
            	$("input[name='storeOutsideLength']").attr("validThan0",true);
            	$("input[name='storeOutsideLength']").attr("validOutsideLength",true);
        		$("input[name='storeOutsideWidth']").attr("validThan0",true);
        		$("input[name='storeOutsideWidth']").attr("validOutsideWidth",true);
        		$("input[name='length']").attr("validThan0",true);
        		$("input[name='length']").attr("validOutsideLength",true);
        		$("input[name='width']").attr("validThan0",true);
        		$("input[name='width']").attr("validOutsideWidth",true);
        		//非圆筒仓 筒仓外径为0且不能编辑
        		$scope.basicStorehouse.outsideSiloDiameter = 0;
        		$("input[name='outsideSiloDiameter']").attr("readonly","readonly");
        		//非圆筒仓 筒仓内径为0且不能编辑
        		$scope.basicStorehouse.siloDiameter = 0;
        		$("input[name='siloDiameter']").attr("readonly","readonly");
            }
            
        },function(data){
        	console.log(data);
        });
   };

    $scope.edit();
    //去重
    $scope.storehouseCode = function(){
    	if ($stateParams.id == "" || $stateParams.id == undefined) {
    		$stateParams.id = 0;
    	}
    	StorehouseService.findStorehouseCode($scope.basicStorehouse.storehouseCode,$stateParams.id,$stateParams.libraryType).then(function(data){
    		if(data == '0'){
				alert("编码重复");
				$scope.basicStorehouse.storehouseCode = "";
			}
		},function(data){
    	    console.log(data);
        });
    }
    // 仓房编码最多只能输入2位数字
    $scope.checkUp = function() {
    	var text = $scope.basicStorehouse.storehouseCode;
    	if (text != null && text != "") {
    		var a = text.substring(text.length - 1, text.length);
	    	var reg = /^\d$/g;
	    	if (!reg.test(a)) {
	    		$scope.basicStorehouse.storehouseCode = text.replace(a, "");
	    	}
    	}
    }
    
    $scope.change = function(){
    	if($scope.basicStorehouse.storehouseType == "2972"){//仓房类型为圆筒仓
    		$scope.basicStorehouse.storeOutsideLength = 0;//圆筒仓 仓外长为0
    		$("input[name='storeOutsideLength']").attr("readonly","readonly");
    		$("input[name='storeOutsideLength']").removeAttr("validThan0");
    		$("input[name='storeOutsideLength']").removeAttr("validOutsideLength");
    		$scope.basicStorehouse.storeOutsideWidth = 0;//圆筒仓 仓外宽为0
    		$("input[name='storeOutsideWidth']").attr("readonly","readonly");
    		$("input[name='storeOutsideWidth']").removeAttr("validThan0");
    		$("input[name='storeOutsideWidth']").removeAttr("validOutsideWidth");
    		$scope.basicStorehouse.length = 0;//圆筒仓 仓内长为0
    		$("input[name='length']").attr("readonly","readonly");
    		$("input[name='length']").removeAttr("validThan0");
    		$("input[name='length']").removeAttr("validOutsideLength");
    		$scope.basicStorehouse.width = 0;//圆筒仓 仓内宽为0
    		$("input[name='width']").attr("readonly","readonly");
    		$("input[name='width']").removeAttr("validThan0");
    		$("input[name='width']").removeAttr("validOutsideWidth");
    		//筒仓外径、筒仓内径（圆筒仓时加验证）
    		$("input[name='outsideSiloDiameter']").attr("validThan0",true);
    		$("input[name='outsideSiloDiameter']").removeAttr("readonly");
    		$("input[name='siloDiameter']").attr("validThan0",true);
    		$("input[name='siloDiameter']").removeAttr("readonly");
    	}else{
    		$("input[name='storeOutsideLength']").attr("validThan0",true);
    		$("input[name='storeOutsideLength']").attr("validOutsideLength",true);
    		$("input[name='storeOutsideLength']").removeAttr("readonly");
    		$("input[name='storeOutsideWidth']").attr("validThan0",true);
    		$("input[name='storeOutsideWidth']").attr("validOutsideWidth",true);
    		$("input[name='storeOutsideWidth']").removeAttr("readonly");
    		$("input[name='length']").attr("validThan0",true);
    		$("input[name='length']").attr("validOutsideLength",true);
    		$("input[name='length']").removeAttr("readonly");
    		$("input[name='width']").attr("validThan0",true);
    		$("input[name='width']").attr("validOutsideWidth",true);
    		$("input[name='width']").removeAttr("readonly");
    		//筒仓外径、筒仓内径（非圆筒仓时去掉验证）
    		$scope.basicStorehouse.outsideSiloDiameter = 0;//非圆筒仓 筒仓外径为0
    		$("input[name='outsideSiloDiameter']").attr("readonly","readonly");
    		$("input[name='outsideSiloDiameter']").removeAttr("validThan0");
    		$scope.basicStorehouse.siloDiameter = 0;//非圆筒仓 筒仓内径为0
    		$("input[name='siloDiameter']").attr("readonly","readonly");
    		$("input[name='siloDiameter']").removeAttr("validThan0");
    	}
    	validator.form();
    }
    
    $.validator.addMethod("validOutsideLength",function(value,element, params) {
    	if(value == 0){ 
    		return this.optional(element); 
    	}else{
    		if(parseFloat($("input[name='length']").val()) > parseFloat($("input[name='storeOutsideLength']").val())){
    			return this.optional(element);
    		}else{
    			return this.optional(element) || true;
    		}
    	}
    },"请输大于0的数且仓外长大于等于仓内长！");
    
    $.validator.addMethod("validOutsideWidth",function(value,element, params) {
    	if(value == 0){ 
    		return this.optional(element); 
    	}else{
    		if(parseFloat($("input[name='width']").val()) > parseFloat($("input[name='storeOutsideWidth']").val())){
    			return this.optional(element);
    		}else{
    			return this.optional(element) || true;
    		}
    	}
    },"请输大于0的数且仓外宽大于等于仓内宽！");
    
    $.validator.addMethod("validTop",function(value,element, params) {
    	if(value == 0){ 
    		return this.optional(element); 
    	}else{
    		if(parseFloat($("input[name='heigth']").val()) > parseFloat($("input[name='storeOutsideHeigth']").val())){
    			return this.optional(element);
    		}else{
    			return this.optional(element) || true;
    		}
    	}
    },"请输大于0的数且仓外檐高大于等于仓内檐高！");
    
    $.validator.addMethod("validOutTop",function(value,element, params) {
    	if(value == 0){ 
    		return this.optional(element); 
    	}else{
    		if(parseFloat($("input[name='storeOutsideHeigth']").val()) > parseFloat($("input[name='storeOutsideTopHeigth']").val())){
    			return this.optional(element);
    		}else{
    			return this.optional(element) || true;
    		}
    	}
    },"请输大于0的数且仓外檐高小于等于仓外顶高！");
    
    $.validator.addMethod("validGrainHeigth",function(value,element, params) {
    	if(value == 0){
    		return this.optional(element); 
    	}else{
    		if(parseFloat($("input[name='grainLineHeigth']").val()) > parseFloat($("input[name='heigth']").val())){
    			return this.optional(element);
    		}else{
    			return this.optional(element) || true;
    		}
    	}
    },"请输大于0的数且仓内檐高大于等于仓内装粮线高！");
    
    $.validator.addMethod("validHeigth",function(value,element, params) {
    	if(value == 0){
    		return this.optional(element); 
    	}else{
    		if(parseFloat($("input[name='grainLineHeigth']").val()) > parseFloat($("input[name='storeOutsideTopHeigth']").val())){
    			return this.optional(element);
    		}else{
    			return this.optional(element) || true;
    		}
    	}
    },"请输大于0的数且仓外顶高大于等于仓内装粮线高！");
    
    $.validator.addMethod("validThan0",function(value,element, params) {
    	if(value == 0){
    		return this.optional(element); 
    	}else{
    		return this.optional(element) || true;
    	}
    },"请输大于0的数！");
    
    // 提交表单
    var validator = $("#basicStorehouse-form").validate();
    $scope.save = function() {
    	if (validator.form()) {
            if($stateParams.libraryType == "1"){
                $scope.basicStorehouse.depotName = $("#depotId option:selected").text();
            }
    		StorehouseService.save($scope.basicStorehouse, $rootScope.userInfo).then(function(data){
    			if (data.status == 'success') {
    			    // 同步数据-库点编码
                    $scope.basicStorehouse.orgId = $rootScope.userInfo.orgId;
                    WareHouseBasicInfoService.synchronizationStoreHouse($scope.basicStorehouse).then(function (data) {

                    },function (data) {
                        console.log(data);
                    });
    				alert("保存成功！");
    			} else {
    				alert("保存失败！");
    			}

                if($stateParams.libraryType == "1"){
                    $state.go('app.business.agent.basic.storehouseList',{type:2,libraryType:'1'});
                } else {
                    $state.go("app.basic.storehouseList",{type:2,libraryType:$stateParams.libraryType});
                }
    		},function(data){
    			console.log(data);
    		});
    	}
    };

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
            $scope.basicStorehouse.storeImg = response;
        }
    });

	$scope.returnTop = function() {
    	if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else if($stateParams.libraryType == "1"){
            $state.go('app.business.agent.basic.storehouseList',{type:2,libraryType:'1'});
        } else {
            $state.go("app.basic.storehouseList",{type:2,libraryType:$stateParams.libraryType});
        }
    }
	
	$scope.falseEnum = [{id:0,value:"否"},{id:1,value:"能"},{id:9,value:"其他或不确定"}];

});