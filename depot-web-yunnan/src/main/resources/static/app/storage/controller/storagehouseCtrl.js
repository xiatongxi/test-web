"use strict";

angular.module('app.storage')
//仓房检查记录
    .controller("housecheckCtrl", function($scope, $http,$state,$rootScope,StorehouseService,warehouseService, $stateParams,storagehouseService, APP_CONFIG) {
        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.search = {storehouseId:""};
        $scope.loadData = function() {
            storagehouseService.getPageInfoCheck($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.houserepair,$scope.search.storehouseId).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log(data);
            });
        }
        $scope.loadData();

        // 仓房列表
        $scope.loadStore = function() {
            StorehouseService.getStorehouseList($rootScope.orgInfo.orgId).then(function(data){
                $scope.storelist = data.houseList;
            },function(data){
                console.log(data);
            });
        }
        $scope.loadStore();

        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }

        // 接收广播，切换仓房
        $scope.$on("storeChangeed", function(event, storehouseId) {
            $scope.search.storehouseId = storehouseId;
            $scope.loadData();
        })

        //------------------仓房维修记录开始--------------------//
        //新增维修页面
        $scope.showRepair = function (id) {
            $state.go('app.storage.storehouse.repair', {id:id,isNotEdit:false});
        }

        // 显示增加页面
        $scope.showAddHck = function () {
            $state.go('app.storage.storehouse.hckadd', {id:0,isNotEdit:false});
        }
        //修改编辑页面
        $scope.showEditHck= function (id) {
            $state.go('app.storage.storehouse.hckadd', {id:id,isNotEdit:true});
        }

        //------------------仓房维修记录结束--------------------//

        // 根据id删除信息
        $scope.remove = function(id) {
            storagehouseService.removeById(id).then(function (data) {
                if(data.msg == "success"){
                    alert("删除成功");
                    $scope.loadData();
                }else if(data.msg == "error"){
                    alert("删除失败");
                }else{
                    alert(data.msg);
                }
            });
        }
    })

    .controller("housecheckSaveCtrl", function($scope, $http,$state,$stateParams,$rootScope,StorehouseService, $filter,storagehouseService, APP_CONFIG) {
        //控制禁用和启用
        if($stateParams.isNotEdit != null){
            if ($stateParams.isNotEdit == "false") {
                $scope.isNotEdit = false;
            } else if ($stateParams.isNotEdit == "true") {
                $scope.isNotEdit = true;
            }
        }else{
            $scope.isNotEdit = false;
        }

        $scope.loadDataById = function(id) {
            storagehouseService.loadDataById(id).then(function(data){
                console.log(data);
                $scope.houserepair = data;
                $scope.houserepair.checkDate = $filter('date')($scope.houserepair.checkDate, "yyyy-MM-dd");
                $scope.houserepair.repairStartDate = $filter('date')($scope.houserepair.repairStartDate, "yyyy-MM-dd");
                $scope.houserepair.repairEndDate = $filter('date')($scope.houserepair.repairEndDate, "yyyy-MM-dd");
                //设置登录人为登记人
                $scope.houserepair.checkPerson=$rootScope.userInfo.realName;

            },function(data){
                // console.log(data);
            });
        }
        $scope.loadDataById($stateParams.id);

        // 仓房列表
        $scope.loadStore = function() {
            StorehouseService.getStorehouseList($rootScope.orgInfo.orgId).then(function(data){
                $scope.storelist = data.houseList;
            },function(data){
                console.log(data);
            });
        }
        $scope.loadStore();


        // 接收广播，切换仓房
        $scope.$on("storeChangeed", function(event, storehouseId) {
            $scope.houserepair.storehouseId = storehouseId;
            $scope.loadData();
        })



        // 提交表单（检查）
        var validatorCheck = $("#housecheck-form").validate();
        $scope.saveDataCheck = function () {
            //用于获取仓房对应的仓房编码进行保存并且展示
            var houseId = $scope.houserepair.storehouseId;
            StorehouseService.findByStorehouse(houseId, $rootScope.orgInfo.orgId).then(function (data) {
                $scope.houserepair.storehouseCode = data.storehouseCode;
                $scope.houserepair.orgId = $rootScope.orgInfo.orgId;
                //进行保存
                $scope.savehouseCheck();
            },function(data) {
                console.log(data);
            });

        }
        $scope.savehouseCheck = function () {
            if (validatorCheck.form()) {
                if($scope.houserepair.repairStatus != null){
                    alert("设备已维修,不可修改!");
                }else{
                    storagehouseService.saveCheck($scope.houserepair).then(function (data) {
                        if (data.status == 'success') {
                            alert("保存成功！");
                            $state.go('app.storage.storehouse.hcklist');
                        } else {
                            alert("保存失败！");
                        }
                    }, function (data) {
                        console.log(data);
                    });
                }
            }
        }

        // 提交表单（维修）
        var validatorRepair = $("#houserepair-form").validate();
        $scope.saveDataRepair = function () {
            if (validatorRepair.form()) {
                storagehouseService.saveRepair($scope.houserepair).then(function(data){
                    if (data.status == 'success') {
                        alert("保存成功！");
                        $state.go('app.storage.storehouse.hrplist');
                    } else {
                        alert("保存失败！");
                    }
                },function(data) {
                    console.log(data);
                });
            }
        }


    })

    //仓房维修记录
    .controller("houserepairCtrl", function($scope,$state, $http,$rootScope,$filter,$uibModal,StorehouseService,warehouseService, $stateParams,storagehouseService, APP_CONFIG) {
        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.search = {storehouseId:""};
        $scope.loadData = function() {

            //判断是否显示返回按钮
            $scope.isShow = "0";
            if ($stateParams.id != "") {
                $scope.isShow = "1";
                $scope.search.storehouseId = $stateParams.id;
            }

            storagehouseService.getPageInfoRepair($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.houserepair,$scope.search.storehouseId).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log(data);
            });
        }
        $scope.loadData();

        // 仓房列表
        $scope.loadStore = function() {
            StorehouseService.getStorehouseList($rootScope.orgInfo.orgId).then(function(data){
                $scope.storelist = data.houseList;
            },function(data){
                console.log(data);
            });
        }

        $scope.loadStore();

        // 返回页面
        $scope.returnUp = function() {
            $state.go('app.supervise.storage.barnBasic');
        };

        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }

        // 接收广播，切换仓房
        $scope.$on("storeChangeed", function(event, storehouseId) {
            $scope.search.storehouseId = storehouseId;
            $scope.loadData();
        })

        //查看维修完成的记录
        $scope.showRepair = function (id) {
            $state.go('app.storage.storehouse.repair',{id:id,isNotEdit:true});
        }

        //修改维修记录
        $scope.showEditRepair = function (id) {
            $state.go('app.storage.storehouse.repair', {id:id,isNotEdit:false});
        }

        //点击维修记录的新增按钮，弹出仓房检查记录的列表数据，用于维修
        $scope.showHouseCheckPage = function () {
            var params = [];
            var uibModalInstance = $uibModal.open({
                size:'lg',
                templateUrl: 'app/storage/views/storehouse/house-check-list.html',
                controller: 'repairCtrl',
                resolve: {
                    // items是一个回调函数
                    items: function () {
                        // 这个值会被模态框的控制器获取到
                        return params;
                    }
                }
            });
            uibModalInstance.result.then(function (result) {
                $scope.loadData();// 关闭模态框时刷新页面数据
            }, function (reason) {
                console.log(reason);
            });

        }
        //------------------仓房维修记录结束--------------------//

    })

    //仓房信息列表
    .controller("houseinfoCtrl", function($scope, $state,$rootScope,$filter, $http,$stateParams,paymentService,StorehouseService, APP_CONFIG) {
        // 获取对应角色管理的列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.search = {storehouseId:""};
        $scope.loadData = function() {
            StorehouseService.findStoreHouseListByRole($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,
                $scope.search.storehouseId).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log(data);
            });
        }
        $scope.loadData();


        // 仓房列表
        $scope.loadStore = function() {
            StorehouseService.getStorehouseList($rootScope.orgInfo.orgId).then(function(data){
                $scope.storelist = data.houseList;
            },function(data){
                console.log(data);
            });
        }
        $scope.loadStore();

        //切换仓号
        $scope.searchouseinfo={};
        $scope.loadBasicInfoByHouseId = function() {
            StorehouseService.findByStorehouse($scope.searchouseinfo.storehouseId).then(function(data){
                $scope.basicStorehouse = data;
                $scope.basicStorehouse.usedate = $filter('date')($scope.basicStorehouse.usedate, "yyyy-MM-dd");
            },function(data){
                // console.log(data);
            });
        }

        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }

        // 接收广播，切换仓房
        $scope.$on("storeChangeed", function(event, storehouseId) {
            $scope.search.storehouseId = storehouseId;
            $scope.loadData();
        })

        var houseId=$stateParams.storehouseId;
        //用于在详情仓房展示数据
        StorehouseService.findByStorehouse(houseId).then(function(data){
            $scope.basicStorehouseView = data;
            $scope.basicStorehouseView.usedate = $filter('date')($scope.basicStorehouseView.usedate, "yyyy-MM-dd");
        },function(data){
            // console.log(data);
        });

        //查看仓房信息
        $scope.showHouseInfo = function (storehouseId){
            $state.go('app.storage.storehouse.houseOtherInfo',{storehouseId:storehouseId});
        }
        //返回上一页
        $scope.retbaseHouse = function () {
            $state.go('app.storage.storehouse.houseinfo');
        }
        //保存仓房的工作状态
        $scope.saveHouseworkStatus = function (storehouseId) {
            $scope.basicStorehouse.storehouseId=storehouseId;
            StorehouseService.save($scope.basicStorehouse).then(function(data){
                if (data.status == 'success') {
                    alert("保存成功！");
                } else {
                    alert("保存失败！");
                }
            },function(data){
                console.log(data);
            });

        }

        $scope.upList = function(){
            $rootScope.back();
        }
    })

    .controller("repairCtrl",
        function($scope, $uibModalInstance, $state, $filter, $http, $uibModal, $rootScope,
                 storagehouseService, APP_CONFIG, items) {

            $scope.pageInfo = {pageNum : 1, pageSize : 10};
            $scope.loadData = function() {
                storagehouseService.getPageInfoCheck($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.houserepair,null).then(function(data){
                    $scope.pageInfo = data;
                },function(data){
                    console.log(data);
                });
            }
            $scope.loadData();

            // 翻页
            $scope.goPage = function(pageNum) {
                if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
                    $scope.pageInfo.pageNum = pageNum;
                    $scope.loadData(pageNum);
                }
            }

            // 关闭模态窗口
            $scope.cancel = function() {
                $uibModalInstance.close();
            }

            //维修
            $scope.showModelRepair = function (id) {
                $uibModalInstance.close(id);
                $state.go('app.storage.storehouse.repair', {id:id,isNotEdit:false});
            }
        });
