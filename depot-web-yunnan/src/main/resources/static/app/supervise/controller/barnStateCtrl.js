"use strict";

angular.module('app.supervise')
    .controller("barnStateCtrl", function($scope,$rootScope,$state, StorehouseService, enumService, windrainsnowService, APP_CONFIG) {

        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        var depotId = $rootScope.depotInfo.orgId;
        $scope.loadBarnDate = function() {
            enumService.enumData().then(function(data){
                $scope.parentObj = data;
            },function(data){
                console.log(data);
            });

            StorehouseService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.store).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log(data);
            });

            StorehouseService.getStorehouseList(depotId).then(function(data){
                $scope.storehouseList = data.houseList;  //下拉列表数据
                $scope.storehouseObj = data.houseObj;	//查询数据列表仓房信息转换
            },function (data) {
                console.log(data);
            });
        }
        $scope.loadBarnDate();

        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadBarnDate();
        }
        // 重置
        $scope.getResetting = function() {
            $scope.msg.name = "";
            $scope.msg.houseNo = "";
            $scope.msg.startTime = "";
            $scope.msg.endTime = "";
            $scope.loadBarnDate();
        };

        // 查看仓房信息
        $scope.showEdit = function(barnId) {
            $state.go('app.storage.storehouse.houseOtherInfo',{storehouseId:barnId});
        };
        // 维修
        $scope.maintenance = function(barnId) {
            $state.go('app.storage.storehouse.hrplist',{id:barnId});
        };
        // 风雨雪三查
        $scope.rainOrSnow = function(barnId) {
            windrainsnowService.getPageInfo(1, 10,undefined,barnId).then(function(data){
                $scope.barnDate = data;
                $state.go('app.supervise.storage.barnBasic.rainOrSnow',{id:$scope.barnDate.list[0].id});
            },function(data){
                console.log(data);
            });
        };
    })
.controller("rainOrSnowCtrl", function($scope, $stateParams, $state, $filter,$rootScope,windrainsnowService, APP_CONFIG) {
    $scope.loadDataById = function(id) {
        windrainsnowService.loadDataById(id).then(function(data){
            $scope.rainOrSnow = data;
            $scope.rainOrSnow.checkDate = $filter('date')($scope.rainOrSnow.checkDate, "yyyy-MM-dd");
            $scope.rainOrSnow.postCheckDate = $filter('date')($scope.rainOrSnow.postCheckDate, "yyyy-MM-dd");
        },function(data){
            // console.log(data);
        });
    }
    if($stateParams.isNotEdit != null){
        if ($stateParams.isNotEdit == "false") {
            $scope.isNotEdit = false;
        } else if ($stateParams.isNotEdit == "true") {
            $scope.isNotEdit = true;
        }
    }else{
        $scope.isNotEdit = false;
    }
    if($stateParams.id != 0){//新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
        $scope.loadDataById($stateParams.id);
    }

    $scope.retList = function () {
        $scope.rainOrSnow = {};
        $state.go('app.supervise.storage.barnBasic');
    }

    $scope.getup = function(){
        $rootScope.back();
    }
});