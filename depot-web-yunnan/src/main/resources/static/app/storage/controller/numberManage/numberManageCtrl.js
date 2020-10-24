"use strict";

angular.module('app.numbermanage').controller("numberManageCtrl", function($scope,$rootScope, $http, $state, $filter,
		numberMangaeService, sheetService, StorehouseService, warehouseService, enumService, 
		kcswService, foodbasicinfoService) {

	$scope.searchCondition = {houseId : "", warehouseId : "", kcsl:"", pz : "", hwxz : ""};
	$scope.getBasicData = function() {
		//按照单位获取单位下的仓房信息
		var depotId = $rootScope.orgInfo.orgId;
		warehouseService.getStorehouse(depotId, $scope.searchCondition.houseId,"0").then(function(data){
			$scope.warehouseList = data.wareList;  //下拉列表数据
			$scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
		},function (data) {
			console.log(data);
		});
		// 树形下拉框(粮食性质)
        enumService.getTreeListByTypeId($scope.searchCondition.hwxz, 1032).then(function(data) {
        	var data_new = $scope.data_add(data);
        	$scope.grainAttributeTreeData = data_new;
        },function(data) {
            console.log(data);
        });
	};
	
	/* 分页信息 */
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.loadDataSelect = function() {
    	/* 先拿到库存实物表的数据 */
    	var serchCh = null;
    	var serchHwh = null;
    	var serchKcsl = null;
    	var serchPz = null;
    	var serchHwxz = null;
    	if (undefined != $scope.searchCondition) {
    		if (undefined != $scope.searchCondition.houseId) {
    			serchCh = $scope.searchCondition.houseId;
    		}
    		if (undefined != $scope.searchCondition.warehouseId) {
    			serchHwh = $scope.searchCondition.warehouseId;
    		}
    		if (undefined != $scope.searchCondition.kcsl) {
    			serchKcsl = $scope.searchCondition.kcsl;
    		}
    		if (undefined != $scope.searchCondition.pz) {
    			serchPz = $scope.searchCondition.pz;
    		}
    		if (undefined != $scope.searchCondition.hwxz) {
    			if($scope.searchCondition.hwxz != undefined && $scope.searchCondition.hwxz != ""){
    				serchHwxz = $scope.searchCondition.hwxz[0].id;
    	   	 	}
    		}
    		$scope.kcswStr = {ch : serchCh, hwh : serchHwh, unitid : $rootScope.orgInfo.orgId, kcsl:serchKcsl, pz:serchPz, hwxz:serchHwxz};
    	} else {
    		$scope.kcswStr = {ch : null, hwh : null, unitid : $rootScope.orgInfo.orgId, kcsl: null, pz : "", hwxz : ""};
    	}
    	kcswService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.kcswStr, "ch").then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    	kcswService.getCountKczl($rootScope.orgInfo.orgId).then(function(data){
            $scope.kczl = data;
        },function(data){
            console.log(data);
        });
    }

	$scope.getBasicData();
	$scope.loadDataSelect();

    $scope.searchCondition = {};

    //清空
    $scope.clearConditions = function() {
    	$scope.searchCondition = {};
    	$scope.loadData();
    };
    
    // 分页相关方法.
    $scope.go_pages = function(type, pageNum, pigeSize, pages) {
        var pageNumC = pageNum;
        if (type == 'previousPage') {
            if (pageNum <= 1) {
                return;
            }
            pageNumC = pageNum - 1
        } else if (type == 'nextPage') {
            if (pageNum >= pages) {
                return;
            }
            pageNumC = pageNum + 1
        } else if (type == 'firstPage') {
            if (pageNum == 1) {
                return;
            }
            pageNumC = 1;
        } else if (type == 'lastPage') {
            if (pageNum == pages) {
                return;
            }
            pageNumC = pages;
        }
         $scope.loadData = function() {
        	 kcswService.getPageInfo(pageNumC, pigeSize,$scope.kcswStr, "ch").then(function(data){
                 $scope.pageInfo = data;
             },function(data){
                 //console.log(data);
             });
         };
         $scope.loadData();
    };
     
    // 改变页码.
    $scope.change_pageSize = function(pigeSizeChange) {
        $scope.loadData = function() {
            kcswService.getPageInfo(1, pigeSizeChange,$scope.kcswStr).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                //console.log(data);
            });
        };
        $scope.loadData();
    }

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
	}
     
});