"use strict";

angular.module('app.business').controller("sheetCtrl", function($scope,$rootScope,$stateParams, $http, $state, sheetService,StorehouseService,warehouseService, enumService, APP_CONFIG) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.searchCondition = {searchStartDate: "", searchEndDate:"", houseId:"", warehouseId:""};

	$scope.getBasicData = function() {
		warehouseService.getStorehouse($rootScope.orgInfo.orgId, $scope.searchCondition.houseId).then(function(data){
			$scope.warehouseList = data.wareList;  //下拉列表数据
			$scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
		},function (data) {
			console.log(data);
		});
	}

    // 货位列表
    $scope.loadWare = function() {
        warehouseService.getStorehouse($rootScope.orgInfo.orgId, $scope.searchCondition.houseId).then(function(data){
            $scope.warelist = data.wareList;
        },function(data){
            console.log(data);
        });
    }

    //返回上一个链接页面
    $scope.returnUp = function(){
        $state.go('app.supervise.cameraPT');
    }

    //判断是否显示返回按钮
    $scope.isShow = "0";
    if ($stateParams.id != 0 && $stateParams.id != undefined && $stateParams.id != "") {
        $scope.searchCondition.houseId = $stateParams.id*1;
        $scope.isShow = "1";
    }

    if($stateParams.jumpType == "DT"){//动态粮情统计
        $scope.functionName = "动态粮情统计";
    }else if($stateParams.jumpType == "KC"){//库存统计
        $scope.functionName = "库存统计";
    }

    // 获取列表数据
    $scope.loadData = function() {
        if($scope.searchCondition.searchStartDate > $scope.searchCondition.searchEndDate){
            alert("开始时间不能大于结束时间，请重新选择后再查询！");
            return;
        }
    	$scope.getBasicData();
    	sheetService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
    $scope.loadData();
     
    // 新增页面
    $scope.showAdd = function() {
        $state.go("app.numbermanage.numbermanage.sheet-edit",{id: 0});
    }

    // 编辑页面
    $scope.showEdit = function(id) {
        $state.go("app.numbermanage.numbermanage.sheet-edit",{id: id});
    }
    
    // 查看页面
    $scope.showView = function(id) {
        if($stateParams.jumpType == "DT"){//动态粮情统计
            $state.go("app.supervise.decisionSupport.dynamicFoodDetail",{id : id});
        }else if($stateParams.jumpType == "KC"){//库存统计
            $state.go("app.supervise.storage.inventoryDetails",{id : id});
        }else{
            $state.go("app.numbermanage.numbermanage.sheet-view",{id : id});
        }
    }
    //清空
    $scope.clearConditions = function() {
    	$scope.searchCondition = {};
    	$scope.loadData();
    }
    
     // 删除一条记录
     $scope.deletes = function(id) {
         if (!confirm("确定要删除吗？")) {
             return;
         }
         $http({
             method: 'POST',
             url: APP_CONFIG.numberManageUrl + '/storageSheet/remove',
             data: {
                 id : id
             }
         }).then(function successCallback(response) {
             // 请求成功执行代码
             alert("删除成功！");
             // 重新加载数据
             $scope.loadData();
         }, function errorCallback(response) {
             // 请求失败执行代码
             console.log(response);
         });
         // 关闭弹出层
         $("#myModal").modal("hide");
     }
     
     // 接收广播，切换仓房
     $scope.$on("storeChangeed", function(event, storehouseId) {
         $scope.searchCondition.houseId = storehouseId;
         $scope.loadData();
         $scope.loadWare();
     })
     
    // 分页相关方法.
    $scope.go_page = function(type, pageNum, pigeSize, pages) {
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
        	 sheetService.getPageInfo(pageNumC, pigeSize).then(function(data){
                 $scope.pageInfo = data;
             },function(data){
                 //console.log(data);
             });
         }
         $scope.loadData();
    }
     
    // 改变页码.
    $scope.change_pageSize = function(pigeSizeChange) {
        $scope.loadData = function() {
        	sheetService.getPageInfo(1, pigeSizeChange).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                //console.log(data);
            });
        }
        $scope.loadData();
    }
     
});