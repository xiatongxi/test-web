"use strict";

angular.module('app.supervise').controller("crkRecordCtrl",
    function($scope, $rootScope, $state, crkRecordService, StorehouseService, $stateParams, warehouseService, APP_CONFIG) {

        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.search = {storehouseId:"", warehouseId:"", cazylx:"", pz:"", beginDate:"", endDate:""};
        $scope.loadData = function() {
        	if ($scope.search.pzs != null && $scope.search.pzs != '') {
        		$scope.search.pz = $rootScope.dicData[$scope.search.pzs];
        	}else{
        		$scope.search.pz = "";
        	}
        	if ($stateParams.type == 'hc') {
        		crkRecordService.getHcPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.search, $rootScope.orgInfo.orgId).then(function(data){
        			$scope.pageInfo = data;
        		},function(data){
        			console.log(data);
        		});
        	} else if ($stateParams.type == 'qc') {
        		crkRecordService.getQcPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.search, $rootScope.orgInfo.orgId).then(function(data){
        			$scope.pageInfo = data;
        		},function(data){
        			console.log(data);
        		});
        	}
        };

        // 货位列表
        $scope.loadWare = function() {
            warehouseService.getStorehouse($rootScope.orgInfo.orgId, $scope.search.storehouseId, "0").then(function(data){
            	$scope.warehouseList = data.wareList;  //下拉列表数据
    			$scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
            },function(data){
                console.log(data);
            });
        };
        $scope.loadWare();

        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        };

        //判断是否显示返回按钮
        $scope.isShow = "0";
        if ($stateParams.id != 0) {
            $rootScope.isIndexPage = true;
            $scope.search.storehouseId = $stateParams.id;
            $scope.search.cazylx = $stateParams.states;
            $scope.isShow = "1";
            $scope.loadData();
        }else{
            $scope.loadData();
        }

        //返回上一个链接页面
        $scope.returnUp = function(){
            if($stateParams.homePage == "SY"){//判断是否是从首页进来
                $state.go('app.dashboard');
            }else{
                $state.go('app.supervise.cameraPT');
            }
        }

        // 详情
        $scope.view = function(obj) {
            $state.go('app.supervise.operation.detail', {obj : angular.toJson(obj)});
        };

    })

    .controller("crkRecordDetailCtrl", function($scope, $state, $rootScope, $stateParams, crkRecordService, APP_CONFIG) {

        $scope.crkType = {"1":"入库","3":"出库"};
        $scope.obj = angular.fromJson($stateParams.obj);
        var orgId = $rootScope.orgInfo.orgId;
        // 火车出入库详情
        if ('火车入仓' == $scope.obj.ywlx || '火车出仓' == $scope.obj.ywlx) {
            crkRecordService.getTrainDetail($scope.obj.bizNo, orgId).then(function (data) {
                //称重信息
                $scope.czxx = data.czxx;
                //质检信息
                $scope.zjxx = data.zjxx;
            },function(data){
                // console.log(data);
            });
        } else {
            if(typeof($scope.obj.agentOrgId) !=="undefined" || $scope.obj.agentOrgId !=='' || $scope.obj.agentOrgId !==null){
                orgId = $scope.obj.agentOrgId
            }
            // 汽车出入库详情
            crkRecordService.getDetail($scope.obj.bizNo, orgId, $scope.obj.ywlx, $scope.obj.lspzid).then(function(data){
                //称重信息
                $scope.czxx = data.czxx;
                //质检信息
                $scope.zjxx = data.zjxx;
                if (null != $scope.zjxx) {
        		   	// 构建组织等级
        		   	$scope.fillLevel(data.parentId, 0);
        		   	// 构建树表格
        			$scope.drawTable();
        		}
                //出库不显示质检信息
                if ($scope.obj.ywlx == "出仓") {
                    $scope.isNotEdit = true;
                }
            },function(data){
                console.log(data);
            });
        }

     // 通过递归给组织赋等级
    	$scope.fillLevel = function(parentId, level) {
    		angular.forEach($scope.zjxx, function(item, index) {
    			if (item.parentid == parentId) {
    				item.level = level;
    				item.parentId = parentId;
    				$scope.fillLevel(item.zbxmc, level+1);
    			}
    		})
    	}

    	// 生成表格树
    	$scope.drawTable = function() {
    		$("#tb").bootstrapTable('destroy');
    		$('#tb').bootstrapTable({
    	        data: $scope.zjxx,	//数据源，必须包含parentId属性
    	        treeView: true,
    	        treeId: "zbxmc",
    	        treeField: "enumname",
    	        formatLoadingMessage: function () {  
    	            return "";  
    	        },
    	        columns: [{
    	        	field: 'zbxmc',
    	        },{  
    	            field: 'enumname',  
    	        }, {  
    	            field: 'jyz',  
    	        },{  
    	            field: 'jykl',  
    	        },{  
    	            field: 'jykj',  
    	        }] 
    		})
    	}

        //返回上一个链接页面
        $scope.returnUp = function(){
            //出入库监管统计返回
            if ('火车入仓' == $scope.obj.ywlx || '火车出仓' == $scope.obj.ywlx || '汽车入仓' == $scope.obj.ywlx || '汽车出仓' == $scope.obj.ywlx) {
                if ($rootScope.previousState_name != '') {
                    $rootScope.back();
                } else {
                    $state.go("app.supervise.decisionSupport.cycleFoodCount");
                }
            } else {
                // 其他模块调用
                if ($rootScope.previousState_name != '') {
                    $rootScope.back();
                } else {
                    $state.go("app.supervise.operation.truckList");
                }
            }
        }
    });