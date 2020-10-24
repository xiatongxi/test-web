"use strict";

angular.module('app.storage')
    .controller("windrainsnowCtrl", function($scope,$state, $http,$rootScope, $stateParams,StorehouseService,warehouseService,windrainsnowService, APP_CONFIG) {
        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.search = {storehouseId:""};
        $scope.loadData = function() {
            windrainsnowService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.windrainsnow,
                $scope.search.storehouseId).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log(data);
            });
        };

        $scope.loadData();

        // 仓房列表
        $scope.loadStore = function() {
            StorehouseService.getStorehouseList($rootScope.orgInfo.orgId).then(function(data){
                $scope.storelist = data.houseList;
            },function(data){
                console.log(data);
            });
        };
        $scope.loadStore();

        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        };

        // 接收广播，切换仓房
        $scope.$on("storeChangeed", function(event, storehouseId) {
            $scope.search.storehouseId = storehouseId;
            $scope.loadData();
        });


        // 显示增加页面
        $scope.showAddWrs=function () {
            $state.go('app.storage.safeproduce.safeCheck.wrslist.add', {id:0,isNotEdit:false});
        };
        //修改编辑页面
        $scope.showEditWrs = function (id) {
            $state.go('app.storage.safeproduce.safeCheck.wrslist.edit', {id:id,isNotEdit:false});
        };
        // 查看页面
        $scope.showViewWrs = function(id) {
            $state.go('app.storage.safeproduce.safeCheck.wrslist.view', {id:id,isNotEdit:true});
        };

        // 根据id删除信息
        $scope.remove = function(id) {
            windrainsnowService.removeById(id).then(function (data) {
                if(data.msg == "success"){
                    alert("删除成功");
                    $scope.loadData();
                }else{
                    alert("删除失败");
                }
            });
        }

    })
    .controller("windrainsnowSaveCtrl", function($scope,$rootScope,$state, $http,$stateParams,$filter,StorehouseService,windrainsnowService, APP_CONFIG) {
        $scope.loadDataById = function(id) {
            windrainsnowService.loadDataById(id).then(function(data){
                $scope.windrainsnow = data;
                $scope.windrainsnow.checkDate = $filter('date')($scope.windrainsnow.checkDate, "yyyy-MM-dd");
                $scope.windrainsnow.postCheckDate = $filter('date')($scope.windrainsnow.postCheckDate, "yyyy-MM-dd");
                $scope.getBasicData();
            },function(data){
                // console.log(data);
            });
        };
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

        /**
         * 级联仓房
         */
        $scope.getBasicData = function() {
            //按照单位获取单位下的仓房信息
            var depotId = $rootScope.depotInfo.orgId;
            StorehouseService.getStorehouseList(depotId).then(function(data){
                $scope.storehouseList = data.houseList;
                $scope.storehouseObj = data.houseObj;
            },function (data) {
                console.log(data);
            });
        };
        $scope.getBasicData();

        // 接收广播，切换仓房
        $scope.$on("storeChangeed", function(event, storehouseId) {
            $scope.windrainsnow.houseId = storehouseId;
            $scope.loadData();
        });

        // 提交表单
        var validator = $("#windrainsnow-form").validate();
        $scope.saveData = function () {
            if (validator.form()) {
                $scope.windrainsnow.orgId = $rootScope.userInfo.orgId;
                $http({
                    method: 'POST',
                    url: APP_CONFIG.grainInspectionUrl + '/windrainsnow/save',
                    data: {
                        windrainsnowJson: angular.toJson($scope.windrainsnow)
                    }
                }).then(function successCallback(response) {
                    if (response.data.status == "success") {
                        alert("保存成功！");
                        $state.go('app.storage.safeproduce.safeCheck.wrslist');
                        //   location.href = APP_CONFIG.baseUrl + '/#/safeproduce/wrslist';
                    } else {
                        alert("保存失败！");
                    }

                }, function errorCallback(response) {
                    // 请求失败执行代码
                });
            }
        }
    });