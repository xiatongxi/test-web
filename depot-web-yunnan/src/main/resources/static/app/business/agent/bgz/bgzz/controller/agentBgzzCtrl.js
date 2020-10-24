"use strict";

angular.module('app.business')
    .controller("agentBgzzCtrl", function($scope, $rootScope, $http, $state, $filter, agentBgzzService, 
    		agentService, agentDepotService, warehouseService, StorehouseService, APP_CONFIG) {

    	// 分页信息
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        // 查询条件
        $scope.conditions = {};
        // 获取列表数据
        $scope.loadData = function() {
        	$scope.conditions.orgId = $rootScope.orgInfo.orgId;
        	agentBgzzService.getBgzzList($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.conditions).then(function(data){
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

        // 记账、审核页面跳转
        $scope.showEdit = function(obj, type) {
        	var obj_str = angular.toJson(obj);
    		$scope.bgzz = angular.fromJson(obj_str);
    		if ($scope.bgzz.agentId == null || $scope.bgzz.dckId == null 
				|| $scope.bgzz.lspz == null || $scope.bgzz.lsxz == null 
				|| $scope.bgzz.fssj == null) {

    	 		alert("数据有误!");
    			return;

    		}
    		if (type != 3) { //记账、审核、查看
    			agentBgzzService.getList(null, null, obj_str).then(function(data){
    				if (type == "jizhang") { //记账
    					if (data.list.length > 0 && data.list[0].shr != null) {
    						alert("当前记录已审核，不可再记账！");
    						return;
    					}
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
    				} else if (type == "show") { //查看
    					if (null == data.list|| data.list.length == 0) {
    						alert("当前记录还尚未记账，请先记账！");
    						return;
    					}
    				}
    				$state.go('app.business.agent.grainStorage.bgz.bgzz.edit',{obj:obj_str, type:type});
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
    .controller("agentBgzzEditCtrl", function($scope, $http, $state, $stateParams, $rootScope, $filter, 
    		agentBgzzService, agentService, agentDepotService, StorehouseService, warehouseService, enumService) {
        $scope.disabled = false;
        $scope.isShow = "1";
        $scope.fcbgz = {};

        $scope.loadDataById = function(obj, type) {
        	agentBgzzService.getList(null, null, obj).then(function(data){
        		if (data.list != null && data.list.length > 0) {
        			$scope.bgzz = data.list[0];
        		} else {
        			$scope.bgzz = angular.fromJson(obj);
        		}

        		$scope.getEditData();
                $scope.getAgentDepotData($scope.bgzz.agentId);
                if (type == "jizhang") {
                	$scope.shenhe = true;
                	$scope.bgzz.jzr = $rootScope.userInfo.realName;
                	$scope.bgzz.jzsj = $filter('date')(new Date(), "yyyy-MM-dd");
                } else if (type == "shenhe") {
                	$scope.shenhe = false;
                	$scope.bgzz.shr = $rootScope.userInfo.realName;
                	$scope.bgzz.shsj = $filter('date')(new Date(), "yyyy-MM-dd");
                	$scope.bgzz.jzsj = $filter('date')($scope.bgzz.jzsj, "yyyy-MM-dd");
                } else {
                	$scope.bgzz.shsj = $filter('date')(new Date(), "yyyy-MM-dd");
                	$scope.bgzz.jzsj = $filter('date')($scope.bgzz.jzsj, "yyyy-MM-dd");
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
        	enumService.getTreeListByTypeId($scope.bgzz.lspz, 1061).then(function(data) {
        		var data_new = $scope.data_add(data);
        		$scope.grainAttributeTreeLspzData = data_new;
        	},function(data) {
        		console.log(data);
        	});
            // 树形下拉框(粮食性质)
            enumService.getTreeListByTypeId($scope.bgzz.lsxz, 1032).then(function(data) {
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

        if($stateParams.obj != null && ($stateParams.type == "shenhe" || $stateParams.type == "jizhang")){//审核页面查询后台数据，并且赋值页面
            $scope.loadDataById($stateParams.obj, $stateParams.type);
        }else if($stateParams.type == "show" || $stateParams.type == "shenhe"){//查看页面
            $scope.loadDataById($stateParams.obj, $stateParams.type);
            $scope.disabled = true;
            $scope.isShow = "0";
        }

        // 新增或修改保存数据
        var validator = $("#agentFcbgz-form").validate();
        $scope.saveData = function() {
        	//粮食品种必选的验证
        	$scope.grainAttribute_lspz = angular.fromJson($scope.bgzz.lspz);
        	if ($scope.grainAttribute_lspz == '' || $scope.grainAttribute_lspz == null || $scope.grainAttribute_lspz[0].id == null || $scope.grainAttribute_lspz.length == 0) {
        		$("#grainAttribute_lspz-error").text("必须填写");
        		return;
        	} else {
        		$("#grainAttribute_lspz-error").text("");
        	}
        	//粮食性质必选的验证
            $scope.grainAttribute_lsxz = angular.fromJson($scope.bgzz.lsxz);
            if ($scope.grainAttribute_lsxz == '' || $scope.grainAttribute_lsxz == null || $scope.grainAttribute_lsxz[0].id == null || $scope.grainAttribute_lsxz.length == 0) {
                $("#grainAttribute_lsxz-error").text("必须填写");
                return;
            } else {
                $("#grainAttribute_lsxz-error").text("");
            }
            if (validator.form()) {
                $scope.bgzz.lspz = $scope.bgzz.lspz[0].id;
                $scope.bgzz.lsxz = $scope.bgzz.lsxz[0].id;
                if($stateParams.type == "jizhang"){
                	$scope.bgzz.createPerson = $rootScope.userInfo.realName;
                	$scope.bgzz.createDate = $filter('date')(new Date(), "yyyy-MM-dd");
                	$scope.bgzz.orgId = $rootScope.orgInfo.orgId;
                }
                var dates = angular.toJson($scope.bgzz);
                agentBgzzService.saveAndUpdata(dates, $stateParams.type).then(function (data) {
                    if (data.status == "success") {
                        alert(data.msg);
                    } else {
                    	alert(data.msg);
                    }
                    $state.go('app.business.agent.grainStorage.bgz.bgzz');
                });
            }
        };

        $scope.retList = function(){
        	if ($rootScope.previousState_name != '') {
            	$rootScope.back();
            } else {
            	$state.go("app.business.agent.grainStorage.bgz.bgzz");
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