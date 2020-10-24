"use strict";

angular.module('app.storage')
    .controller("festivalbeforeCtrl", function($scope,$state, $http,$rootScope, $stateParams,StorehouseService,warehouseService,festivalbeforeService, APP_CONFIG) {
        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.search = {storehouseId:""};
        $scope.loadData = function() {
            festivalbeforeService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.festivalbefore,
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
        $scope.showAddFbe=function () {
            $state.go('app.storage.safeproduce.safeCheck.fbelist.add', {id:0,isNotEdit:false});
        };
        //修改编辑页面
        $scope.showEditFbe = function (id) {
            $state.go('app.storage.safeproduce.safeCheck.fbelist.edit', {id:id,isNotEdit:false});
        };
        // 查看页面
        $scope.showViewFbe = function(id) {
            $state.go('app.storage.safeproduce.safeCheck.fbelist.view', {id:id,isNotEdit:true});
        };

        // 根据id删除信息
        $scope.remove = function(id) {
            festivalbeforeService.removeById(id).then(function (data) {
                if(data.msg == "success"){
                    alert("删除成功");
                    $scope.loadData();
                }else{
                    alert("删除失败");
                }
            });
        }

    })
    .controller("festivalbeforeSaveCtrl", function($scope,$rootScope,$state, $http,$stateParams,$filter,StorehouseService,festivalbeforeService, APP_CONFIG) {
        $scope.loadDataById = function(id) {
            festivalbeforeService.loadDataById(id).then(function(data){
                $scope.festivalbefore = data;
                $scope.festivalbefore.checkDate = $filter('date')($scope.festivalbefore.checkDate, "yyyy-MM-dd");
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
            $scope.festivalbefore.houseId = storehouseId;
            $scope.loadData();
        });

        // 提交表单
        var validator = $("#festivalbefore-form").validate();
        $scope.saveData = function () {
            if (validator.form()) {
                $scope.festivalbefore.orgId = $rootScope.userInfo.orgId;
                $http({
                    method: 'POST',
                    url: APP_CONFIG.grainInspectionUrl + '/festivalbeforeCheck/save',
                    data: {
                        festivalbeforeJson: angular.toJson($scope.festivalbefore)
                    }
                }).then(function successCallback(response) {
                    if (response.data.status == "success") {
                        alert("保存成功！");
                        if ($rootScope.previousState_name != '') {
                            $rootScope.back();
                        } else {
                            $state.go('app.storage.safeproduce.safeCheck.fbelist');
                        }
                    } else {
                        alert("保存失败！");
                    }

                }, function errorCallback(response) {
                    // 请求失败执行代码
                });
            }
        }
    });