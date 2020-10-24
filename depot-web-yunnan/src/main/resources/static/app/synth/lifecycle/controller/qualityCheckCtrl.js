"use strict";
angular.module('app.synth').controller("qualityCheckCtrl",function ($scope, $rootScope, qualitycheckService,$state,
                                                                    StorehouseService,warehouseService,$stateParams) {
    // 质检信息
    $scope.dicDataList = $rootScope.dicDataList;

    // 获取列表数据
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.search = {storehouseId:$stateParams.houseId,warehouseId:$stateParams.warehouseId, checkType:null};
    $scope.loadData = function() {
        qualitycheckService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.search.checkType, null, $scope.search.storehouseId, $scope.search.warehouseId).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();


    // 货位列表
    $scope.loadWare = function(houseId) {
    	//按照单位获取单位下的仓房信息
		var depotId = $rootScope.orgInfo.orgId;
		//获取货位信息
		warehouseService.getStorehouse(depotId, houseId, "0").then(function(data){
			$scope.warelist = data.wareList;  //下拉列表数据
			$scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
	    },function(data){
	        console.log(data);
	    });
    };
    $scope.loadWare(null);

    // 翻页
    $scope.goPage = function(pageNum) {
        $scope.pageInfo.pageNum = pageNum;
        $scope.loadData();
    };

    // 接收广播，切换仓房
    $scope.$on("storeChangeed", function(event, storehouseId) {
        $scope.search.storehouseId = storehouseId;
        $scope.loadData();
        $scope.loadWare();
    });

    // 查看页面
    $scope.showViewDetail = function(id) {
        $state.go('app.synth.lifecycle.qualityCheckDetail',{id:id,isNotEdit:true});
    };

    //返回主列表页面
    $scope.returnHomePage = function(){
        if ($stateParams.isShowReturn == 'lifecycle') {
            $state.go('app.synth.lifecycle');
        } else {
            $rootScope.back();
        }
    }

});