"use strict";
angular.module('app.business').controller("sheetSaveCtrl", function($scope,$rootScope, $state, $filter, $http, $stateParams, 
		sheetService,StorehouseService,warehouseService,foodbasicinfoService, 
		commonUtilService, enumService,foodsealhouseService,qualitycheckService, kcswService) {
	// 损益比列,实际库存计算得出不需要编辑(只读)
	$scope.sheetNotEdit = true;

	$scope.loadDataById = function(id) {
		sheetService.loadDataById(id).then(function(data){
			$scope.profitlossSheet = data;

			// 树形下拉框(粮食性质)
	        enumService.getTreeList($scope.profitlossSheet.lsxzId, "grainAttribute").then(function(data) {
	        	var data_new = $scope.data_add(data);
	            $scope.grainAttributeTreeData = data_new;
	        },function(data) {
	            console.log(data);
	        });

			warehouseService.getStorehouse($rootScope.depotInfo.orgId, $scope.profitlossSheet.houseId).then(function(data){
				$scope.warehouseList = data.wareList;  //下拉列表数据
				$scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
			},function (data) {
				console.log(data);
			});
			
			$scope.profitlossSheet.fillTime = $filter('date')($scope.profitlossSheet.fillTime, "yyyy-MM-dd"); 
		},function(data){
			console.log(data);
		});
	};

	$scope.returnUp = function(){
        $rootScope.back();
	};

	// 获取基础数据
	$scope.getBasicData = function() {

		if ($stateParams.id != 0) {
			$scope.loadDataById($stateParams.id);
		} else {
			// 树形下拉框(粮食性质)
	        enumService.getTreeList($scope.profitlossSheet.lsxzId, "grainAttribute").then(function(data) {
	        	var data_new = $scope.data_add(data);
	            $scope.grainAttributeTreeData = data_new;
	        },function(data) {
	            console.log(data);
	        });
		}
	};

	$scope.data_add = function(data) {
    	//var data_new = $scope.data_add(data);
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
	};

	//通过仓房号，获取货位号.
	$scope.change = function () {
		if ($scope.profitlossSheet.houseId != null 
				&& $scope.profitlossSheet.houseId != undefined 
				&& $scope.profitlossSheet.houseId != '') {
			warehouseService.getStorehouse($rootScope.orgInfo.orgId, $scope.profitlossSheet.houseId).then(function(data){
				$scope.warehouseList = data.wareList;  //下拉列表数据
				$scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
				
				$scope.profitlossSheet.grainGrade = null;
				$scope.profitlossSheet.grainKind = null;
				$scope.profitlossSheet.inventoryYear = null;
				$scope.profitlossSheet.lossType = null;
				$scope.profitlossSheet.productionYear = null;
				$scope.profitlossSheet.lsxzId = null;
				enumService.getTreeList($scope.profitlossSheet.lsxzId, "grainAttribute").then(function(data) {
    	        	var data_new = $scope.data_add(data);
    	            $scope.grainAttributeTreeData = data_new;
    	        },function(data) {
    	            console.log(data);
    	        });
			},function (data) {
				console.log(data);
			});
		} else {
			// 设置货位号为空.
			$scope.profitlossSheet.warehouseId = null;
			$scope.profitlossSheet.grainGrade = null;
			$scope.profitlossSheet.grainKind = null;
			$scope.profitlossSheet.inventoryYear = null;
			$scope.profitlossSheet.lossType = null;
			$scope.profitlossSheet.productionYear = null;
			$scope.profitlossSheet.lsxzId = null;
			enumService.getTreeList($scope.profitlossSheet.lsxzId, "grainAttribute").then(function(data) {
	        	var data_new = $scope.data_add(data);
	            $scope.grainAttributeTreeData = data_new;
	        },function(data) {
	            console.log(data);
	        });
		}
	};
	//获取粮情专卡数据
	$scope.findBasicinfoByStoreWarehouse = function() {
		if ($scope.profitlossSheet.warehouseId == "" || $scope.profitlossSheet.warehouseId == undefined) {
			$scope.profitlossSheet.grainGrade = null;
			$scope.profitlossSheet.grainKind = null;
			$scope.profitlossSheet.inventoryYear = null;
			$scope.profitlossSheet.lossType = null;
			$scope.profitlossSheet.productionYear = null;
			$scope.profitlossSheet.lsxzId = null;
			enumService.getTreeList($scope.profitlossSheet.lsxzId, "grainAttribute").then(function(data) {
	        	var data_new = $scope.data_add(data);
	            $scope.grainAttributeTreeData = data_new;
	        },function(data) {
	            console.log(data);
	        });
			return;
		}
        sheetService.getPageInfobeen(1, 10, $scope.profitlossSheet.houseId,$scope.profitlossSheet.warehouseId).then(function(data){
    		//查询出list为空的时候，需要判断。
			if(data.list[0]!=null){
    			$scope.profitlossSheet.grainKind= Number(data.list[0].grainKind);
    			$scope.profitlossSheet.grainGrade=Number(data.list[0].grainGrade);
    			$scope.profitlossSheet.inventoryYear=Number(data.list[0].actualStock);
    			$scope.profitlossSheet.productionYear=data.list[0].productionYear;
                $scope.profitlossSheet.lsxzId=Number(data.list[0].lsxzId);
                enumService.getTreeList($scope.profitlossSheet.lsxzId, "grainAttribute").then(function(data) {
    	        	var data_new = $scope.data_add(data);
    	            $scope.grainAttributeTreeData = data_new;
    	        },function(data) {
    	            console.log(data);
    	        });
    		} else {
    			//仓带过来的仓号
    			foodbasicinfoService.findBasicinfoByStoreWarehouse($scope.profitlossSheet.houseId,$scope.profitlossSheet.warehouseId).then(function(data){
    				if(typeof(data[0])=="undefined"){
    					$scope.profitlossSheet.grainGrade = null;
    					$scope.profitlossSheet.grainKind = null;
    					$scope.profitlossSheet.lossType = null;
    					$scope.profitlossSheet.productionYear = null;
                        $scope.profitlossSheet.lsxzId = null;
    				} else {
    					$scope.profitlossSheet.grainKind= data[0].subType;
    					$scope.profitlossSheet.grainGrade=Number(data[0].level);
    					$scope.profitlossSheet.inventoryYear=Number(data[0].number);
    					$scope.profitlossSheet.productionYear=data[0].growYear;
                        $scope.profitlossSheet.lsxzId = Number(data[0].quality);
                        enumService.getTreeList($scope.profitlossSheet.lsxzId, "grainAttribute").then(function(data) {
            	        	var data_new = $scope.data_add(data);
            	            $scope.grainAttributeTreeData = data_new;
            	        },function(data) {
            	            console.log(data);
            	        });
    				}
    			},function(data){
    				console.log(data);
    			});
    		}
        });
	    
	};
	
	$scope.profitlossSheet = {};
	$scope.getBasicData();
	
	// 输入运费单价，计算.
    $scope.countByincomeTonnage = function () {
        if ($scope.profitlossSheet.lossType =="1") {
            // 实际库存 = 年度库存-损益数量.
            $scope.profitlossSheet.actualStock = commonUtilService.accSub($scope.profitlossSheet.inventoryYear,$scope.profitlossSheet.incomeTonnage);
            //损益比例=损益数量/年度库存.
            var aa=commonUtilService.accMul(commonUtilService.accDiv($scope.profitlossSheet.incomeTonnage,$scope.profitlossSheet.inventoryYear),100);
            //四舍五入
            var shuliang=aa.toFixed(2);
            $scope.profitlossSheet.profitRatio=shuliang;
            if ($scope.profitlossSheet.actualStock == 'NaN' || $scope.profitlossSheet.profitRatio == 'NaN') {
                $scope.profitlossSheet.actualStock="";
                $scope.profitlossSheet.profitRatio="";
			}
        } else if ($scope.profitlossSheet.lossType =="2"){
        	 $scope.profitlossSheet.actualStock = commonUtilService.accAdd($scope.profitlossSheet.inventoryYear,$scope.profitlossSheet.incomeTonnage);
             //损益比例=损益数量/年度库存.
        	 var aa=commonUtilService.accMul(commonUtilService.accDiv($scope.profitlossSheet.incomeTonnage,$scope.profitlossSheet.inventoryYear),100);
             //四舍五入
             var shuliang=aa.toFixed(2);
             $scope.profitlossSheet.profitRatio=shuliang;
             if ($scope.profitlossSheet.actualStock == 'NaN' || $scope.profitlossSheet.profitRatio == 'NaN') {
                 $scope.profitlossSheet.actualStock="";
                 $scope.profitlossSheet.profitRatio="";
           }
        } else {
        	$scope.profitlossSheet.actualStock="";
            $scope.profitlossSheet.profitRatio="";
        }
    }

	
    if ($stateParams.isNotEdit==false) {
    	$scope.isNotEdit = true;
	}

    // 定义效验
    var validator = validator = $("#profitLossSheet-form").validate();

    // 保存.
    $scope.save = function () {

    	// 自定义验证，验证数字
        $.validator.addMethod("validNumber",function(value,element, params) {
            var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;
            if (this.optional(element)||(checkNumber.test(value))) {
                return true;
            } else {
                return false;
            }
        },"请输入正确的数字类型，最多两位小数！");

        // 获取粮食性质.
        $scope.lsxzObj=angular.fromJson($scope.profitlossSheet.lsxzId);
        console.log("save..");
        if ($scope.lsxzObj.length == 0 || $scope.lsxzObj[0].id == '' || $scope.lsxzObj[0].id == null) {
            $("#grainAttribute-error").text("必须填写");
            return;
        } else {
            $("#grainAttribute-error").text("");
            $scope.profitlossSheet.lsxzId = $scope.lsxzObj[0].id;
        }
        
        if (validator.form()) {
            sheetService.save($scope.profitlossSheet, $rootScope.userInfo).then(function(data){
                if(data.status == "success"){
                    //更新粮情专卡为历史数据
                    foodsealhouseService.setFoodBasicInfoHistoryStatus($scope.profitlossSheet);
                    //更新质量管理为历史数据
                    qualitycheckService.setQualityCheckByHistoryStatus($scope.profitlossSheet);
                    //清空当前仓房的库存
                    kcswService.emptyKcsw($rootScope.userInfo, $scope.profitlossSheet);
                    alert("保存成功！");
                    $state.go("app.numbermanage.numbermanage",{id: 0});
                }else{
                    alert("保存失败！");
                }
            },function(data){
                console.log(data);
            });
        }

    };

    // 返回
    $scope.retList = function () {
    	if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go("app.numbermanage.numbermanage");
        }
    };

    // 客户计划执行类型
    $scope.profitlossSheet.lossType = [
         {
             "key" : 1,
             "value" : "收储计划"
         },
         {
             "key" : 2,
             "value" : "销售计划"
         },
         {
             "key" : 3,
             "value" : "轮换计划"
         }
     ];
     
});
