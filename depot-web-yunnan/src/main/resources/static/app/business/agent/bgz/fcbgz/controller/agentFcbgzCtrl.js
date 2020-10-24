"use strict";

angular.module('app.business')
    .controller("agentFcbgzCtrl", function($scope, $rootScope, $http, $state, $filter, agentFcbgzService, 
    		agentService, agentDepotService, warehouseService, agentStorehouseService, APP_CONFIG) {

    	// 分页信息
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        // 查询条件
        $scope.conditions = {};
        // 获取列表数据
        $scope.loadData = function() {
        	$scope.conditions.orgId = $rootScope.orgInfo.orgId;
        	agentFcbgzService.getfcbgzList($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.conditions).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log(data);
            });
        };
        $scope.loadData();

        // 获取代储点名称
    	$scope.getEditData = function(){
            agentService.getPageInfo("1", "100", "", $rootScope.orgInfo.orgId).then(function(data){
                $scope.agentData = data;
            },function(data){
                console.log();
            });
        };

        $scope.getEditData();

        //获取代储库名称做成下拉列表；
        $scope.getAgentDepotData = function(agentId){
            if(agentId != null){
                agentDepotService.getPageInfo("1", "100", "",agentId).then(function(data){
                    $scope.depotList = data.list.map(function(item) {
                        return {
                            depotId: item.id,
                            depotName: item.agentDepotName
                        }
                    });
                },function(data){
                    console.log(data);
                });
            }else{
                $scope.depotList = {};
            }
        };

        //根据代储库获取仓房列表
        $scope.getHouseList = function(depotId) {
            if(depotId != null){
                agentStorehouseService.getDepotToStoreList($rootScope.orgInfo.orgId, depotId).then(function(data){
                    for (var i = 0; i < $scope.depotList.length; i++) {
                        if($scope.depotList[i].depotId == depotId){
                            $scope.orgIds = $scope.depotList[i].orgId;
                            $scope.storehouseList = data;
                        }
                    }
                },function(data){
                    console.log(data);
                })
            }else{
                $scope.storehouseList = {};
            }
        };

        //根据仓房获取货位列表
        $scope.getWareList = function(houseId) {
            if(houseId != null){
                //按照单位获取单位下的仓房信息
                agentStorehouseService.getStorehouse($scope.orgIds, houseId).then(function(data){
                    $scope.warelist = data.wareList;  //下拉列表数据
                },function (data) {
                    console.log(data);
                });
            }else{
                $scope.warelist = {};
            }
        }

        // 记账、审核页面跳转
        $scope.showEdit = function(obj, type) {
        	var obj_str = angular.toJson(obj);
    		$scope.fcbgz = angular.fromJson(obj_str);
    		var rq = $filter('date')($scope.fcbgz.fssj, "yyyy-MM-dd");
    		if ($scope.fcbgz.agentId == null || $scope.fcbgz.dckId == null 
				|| $scope.fcbgz.houseId == null || $scope.fcbgz.wareId == null 
				|| $scope.fcbgz.lspz == null || $scope.fcbgz.lsxz == null 
				|| $scope.fcbgz.fssj == null) {

    	 		alert("数据有误!");
    			return;

    		}
    		if (type != 3) { //记账、审核、查看
    			agentFcbgzService.getList(null, null, obj_str).then(function(data){
    				$scope.account = data.obj;
    				if (type == "jizhang") { //记账
    					if (data.list.length > 0 && data.list[0].shr != null) {
    						alert("当前记录已审核，不可再记账！");
    						return;
    					}
    					//$state.go('app.business.agent.grainStorage.bgz.fcbgz.edit',{obj:obj_str, type:type});
    				} else if (type == "shenhe") { //审核
    					if (data.list.length == 0) {
    						alert("当前记录还尚未记账，请先记账！");
    						return;
    					} else {
    						if (data.list[0].shr != null || data.list[0].shr != undefined) {
    							alert("当前记录已审核！");
    							return;
    						}
    					}
    					//$state.go('app.business.agent.grainStorage.bgz.fcbgz.edit',{obj:angular.toJson(data.obj), type:type});
    				} else if (type == "show") { //查看
    					if (null == data.list|| data.list.length == 0) {
    						alert("当前记录还尚未记账，请先记账！");
    						return;
    					}
    				}
    				$state.go('app.business.agent.grainStorage.bgz.fcbgz.edit',{obj:obj_str, type:type});
    			},function(data){
    		        console.log(data);
    		    });
    		} else { //明细账
    			$state.go('app.business.agent.grainStorage.bgz.bgmxz',{obj:obj_str, type:type});
    		}
        };

        // 翻页
     	$scope.goPage = function(pageNum) {
     		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
          		$scope.pageInfo.pageNum = pageNum;
          		$scope.loadData();
          	}
     	}

    })
    .controller("agentFcbgzEditCtrl", function($scope, $http, $state, $stateParams, $rootScope, $filter, 
    		agentFcbgzService, agentService, agentDepotService, StorehouseService, warehouseService, enumService) {
        $scope.disabled = false;
        $scope.isShow = "1";
        $scope.fcbgz = {};

        $scope.loadDataById = function(obj, type) {
        	agentFcbgzService.getList(null, null, obj).then(function(data){
        		if (data.list != null && data.list.length > 0) {
        			$scope.fcbgz = data.list[0];
        		} else {
        			$scope.fcbgz = angular.fromJson(obj);
        		}

        		$scope.getEditData();
                $scope.getAgentDepotData($scope.fcbgz.agentId);
                $scope.getHouseList($scope.fcbgz.dckId);
                $scope.getWareList($scope.fcbgz.houseId);
                if (type == "jizhang") {
                	$scope.shenhe = true;
                	$scope.fcbgz.jzr = $rootScope.userInfo.realName;
                	$scope.fcbgz.jzsj = $filter('date')(new Date(), "yyyy-MM-dd");
                } else if (type == "shenhe") {
                	$scope.shenhe = false;
                	$scope.fcbgz.shr = $rootScope.userInfo.realName;
                	$scope.fcbgz.shsj = $filter('date')(new Date(), "yyyy-MM-dd");
                	$scope.fcbgz.jzsj = $filter('date')($scope.fcbgz.jzsj, "yyyy-MM-dd");
                } else {
                	$scope.fcbgz.shsj = $filter('date')(new Date(), "yyyy-MM-dd");
                	$scope.fcbgz.jzsj = $filter('date')($scope.fcbgz.jzsj, "yyyy-MM-dd");
                }

                $scope.getTreeListByTypeId();
            },function(data){
                console.log(data);
            });
        };

        //获取代储点名称
        $scope.getEditData = function(){
            agentService.getPageInfo("1", "100", "", $rootScope.orgInfo.orgId).then(function(data){
                $scope.agentData = data;
            },function(data){
                console.log();
            });
        };

        $scope.getTreeListByTypeId = function(){
        	//粮食品种
        	enumService.getTreeListByTypeId($scope.fcbgz.lspz, 1061).then(function(data) {
        		var data_new = $scope.data_add(data);
        		$scope.grainAttributeTreeLspzData = data_new;
        	},function(data) {
        		console.log(data);
        	});
            // 树形下拉框(粮食性质)
            enumService.getTreeListByTypeId($scope.fcbgz.lsxz, 1032).then(function(data) {
                var data_new = $scope.data_add(data);
                $scope.grainAttributeTreeLsxzData = data_new;
            },function(data) {
                console.log(data);
            });
        };

        $scope.getAgentDepotData = function(agentId){
            if(agentId != null){
                //获取代储库名称做成下拉列表；
                agentDepotService.getPageInfo("1", "100", "",agentId).then(function(data){
                    $scope.depotList = data.list.map(function(item) {
                        return {
                            depotId: item.id,
                            depotName: item.agentDepotName
                        }
                    });
                },function(data){
                    console.log(data);
                });
            }else{
                $scope.depotList = {};
            }
        };

        //根据代储库获取仓房列表
        $scope.getHouseList = function(depotId) {
            if(depotId != null){
                StorehouseService.getAgentList(depotId,$rootScope.orgInfo.orgId,"1").then(function(data){
                    $scope.storehouseList = data;
                },function(data){
                    console.log(data);
                });
            }else{
                $scope.storehouseList = {};
            }
        };

        //根据仓房获取货位列表
        $scope.getWareList = function(houseId) {
            if(houseId != null){
                //按照单位获取单位下的仓房信息
                warehouseService.getStorehouse($rootScope.orgInfo.orgId, houseId, "1").then(function(data){
                    $scope.warelist = data.wareList;  //下拉列表数据
                },function (data) {
                    console.log(data);
                });
            }else{
                $scope.warelist = {};
            }
        };

        if($stateParams.obj != null && ($stateParams.type == "shenhe" || $stateParams.type == "jizhang")){//审核页面查询后台数据，并且赋值页面
            $scope.loadDataById($stateParams.obj, $stateParams.type);
        }else if($stateParams.type == "show" || $stateParams.type == "shenhe"){//查看页面
            $scope.loadDataById($stateParams.obj, $stateParams.type);
            $scope.disabled = true;
            $scope.isShow = "0";
        }
//        else{//新增页面，不进行操作；
//            $scope.getEditData();//获取代储点名称
//            $scope.getTreeListByTypeId();//初始化树形菜单数据
//        }

        // 新增或修改保存数据
        var validator = $("#agentFcbgz-form").validate();
        $scope.saveData = function() {
        	//粮食品种必选的验证
        	$scope.grainAttribute_lspz = angular.fromJson($scope.fcbgz.lspz);
        	if ($scope.grainAttribute_lspz == '' || $scope.grainAttribute_lspz == null || $scope.grainAttribute_lspz[0].id == null || $scope.grainAttribute_lspz.length == 0) {
        		$("#grainAttribute_lspz-error").text("必须填写");
        		return;
        	} else {
        		$("#grainAttribute_lspz-error").text("");
        	}
        	//粮食性质必选的验证
            $scope.grainAttribute_lsxz = angular.fromJson($scope.fcbgz.lsxz);
            if ($scope.grainAttribute_lsxz == '' || $scope.grainAttribute_lsxz == null || $scope.grainAttribute_lsxz[0].id == null || $scope.grainAttribute_lsxz.length == 0) {
                $("#grainAttribute_lsxz-error").text("必须填写");
                return;
            } else {
                $("#grainAttribute_lsxz-error").text("");
            }
            if (validator.form()) {
                $scope.fcbgz.lspz = $scope.fcbgz.lspz[0].id;
                $scope.fcbgz.lsxz = $scope.fcbgz.lsxz[0].id;
                if($stateParams.type == "jizhang"){
                	$scope.fcbgz.createPerson = $rootScope.userInfo.realName;
                	$scope.fcbgz.createDate = $filter('date')(new Date(), "yyyy-MM-dd");
                	$scope.fcbgz.orgId = $rootScope.orgInfo.orgId;
                }
                var dates = angular.toJson($scope.fcbgz);
                agentFcbgzService.saveAndUpdata(dates, $stateParams.type).then(function (data) {
                    if (data.status == "success") {
                        alert(data.msg);
                    } else {
                    	alert(data.msg);
                    }
                    $state.go('app.business.agent.grainStorage.bgz.fcbgz');
                });
            }
        };

        $scope.retList = function(){
        	if ($rootScope.previousState_name != '') {
            	$rootScope.back();
            } else {
            	$state.go("app.business.agent.grainStorage.bgz.fcbgz");
            }
        };

        $scope.data_add = function(data) {
            var e = [];
            if (data.length != 0) {
                //要插入的json对象串
                var newObj = {"id":null,"name":"请选择","children":[]};
                //将返回的json对象和要插入的json对象串转换为字符串格式
                var f = angular.toJson(newObj);
                var b = angular.toJson(data);
                //把要插入的json对象串插入返回数据的最前面
                var c = b.substring(0,1);
                var d = b.substring(1,b.length);
                e = c + f + "," + d;
            }
            //最后在转换为json对象返回去
            return angular.fromJson(e);
        }
    });