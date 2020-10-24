"use strict";

angular.module('app.storage')
    .controller("keepertransferCtrl", function($scope,$rootScope, $http,$state, $stateParams,StorehouseService,keepertransferService,roleService) {
        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.search = {storehouseId:""};

        $scope.loadData = function() {

            //获取角色数据
            roleService.getPageInfo("保管员").then(function(data){
                $scope.rolelist = data.list[0];
                var roleId = $scope.rolelist.roleId;

                keepertransferService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.keepertransfer,$scope.search.storehouseId,roleId).then(function(data){
                    $scope.pageInfo = data;
                },function(data){
                    console.log(data);
                });

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
        // 显示增加页面
        $scope.showAddTransfer = function () {
            $state.go('app.storage.keeper.transferadd', {id:0,isNotEdit:false});
        }

        // 编辑页面
        $scope.showEditTransfer = function(id) {
            $state.go('app.storage.keeper.transferedit', {id:id,isNotEdit:false});
        }

        // 查看页面
        $scope.showViewTransfer = function(id) {
            $state.go('app.storage.keeper.transferedit', {id:id,isNotEdit:true})
        }

        //------------------仓房维修记录结束--------------------//

        // 根据id删除信息
        $scope.remove = function(id) {
            keepertransferService.removeById(id).then(function (data) {
                if(data.msg == "success"){
                    alert("删除成功");
                    $scope.loadData();
                }else{
                    alert("删除失败");
                }
            });
        }
    })

    .controller("keepertransferSaveCtrl", function($scope,$rootScope, $state,$http,$stateParams,keeperService,
                                                   $filter,keepertransferService,warehouseService,roleService,StorehouseService,foodbasicinfoService,keepAccountService) {
        //下面的判断用于查看页面只读状态
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
            debugger;
            keepertransferService.loadDataById(id).then(function(data){
                //console.log(data);
                $scope.keepertransfer = data;
                if (id==0){
                    $scope.keepertransferAddshow();
                }else{
                    //移交人
                    var transUser= $scope.keepertransfer.transUser;
                    keepertransferService.getKeeperByLoginUser(transUser).then(function(data){
                        $scope.transUser = data;
                        $scope.transUserName=$scope.transUser.name;//给移交人赋值
                    },function(data){
                        // console.log(data);
                    });

                    //接收人
                    var receiveUser= $scope.keepertransfer.receiveUser;
                    keepertransferService.getKeeperByLoginUser(receiveUser).then(function(data){
                        $scope.receiveUsers = data;
                        $scope.receiveUserName=$scope.receiveUsers.name;//给接收人赋值

                    },function(data){
                        // console.log(data);
                    });

                    //监交人
                    var superiorUser= $scope.keepertransfer.superiorUser;
                    keepertransferService.getKeeperBySuperiorUser(superiorUser).then(function(data){
                        $scope.superiorUsers = data;
                        $scope.superiorUserName=$scope.superiorUsers.realName;//给监交人赋值

                    },function(data){
                        // console.log(data);
                    });

                    //按照单位获取单位下的仓房信息
                    var depotId = $rootScope.depotInfo.orgId;
                    StorehouseService.getStorehouseList(depotId).then(function(data){
                        $scope.storehouseList = data.houseList;
                        $scope.storehouseObj = data.houseObj;
                    }, function (data) {
                        console.log(data);
                    });

                    //格式化交接时间
                    if($scope.keepertransfer.transTime !=null){
                        $scope.keepertransfer.transTime = $filter('date')($scope.keepertransfer.transTime, "yyyy-MM-dd");
                    }

                    //取出字表数据  根据主表id()
                    $scope.keepertransferDetail = [];
                    //var ktId= $scope.keepertransfer.ktId;
                    var ktId=$stateParams.id;//接收主表的id关联着字表的ktId
                    keepertransferService.findKeepertransferDetailsByKtId(ktId).then(function (data) {
                        for (var i=0; i < data.length; i++) {
                            $scope.keepertransferDetail.push(angular.copy(data[i]));
                        }
                    })
                }
            },function(data){
                // console.log(data);
            });
        }

        $scope.loadDataById($stateParams.id);

        // 仓房列表
        $scope.loadStore = function() {
            StorehouseService.findStoreHouseListByLoginUser($rootScope.userInfo).then(function(data){
                $scope.storelist = data;
            },function(data){
                console.log(data);
            });
        }
        $scope.loadStore();


        // 接收广播，切换仓房
        $scope.$on("storeChangeed", function(event, storehouseId) {
            $scope.keepertransfer.storehouseId = storehouseId;
            $scope.loadData();
        })


        // 提交表单
        var validator = $("#keepertransfer-form").validate();
        $scope.saveData = function () {
            if (validator.form()) {
                $scope.keepertransfer.orgId = $rootScope.userInfo.orgId;
                keepertransferService.saveKeepertransfer($scope.keepertransfer,$scope.keepertransferDetail).then(function(data){
                    if (data.status == 'success') {
                        //如果保存成功，则更新移交人和接收人在仓房和保管员表中的记录basic_keeper_house表
                        $scope.saveTransferkeeperhouse();
                    } else {
                        alert("保存失败！");
                    }
                },function(data) {
                    console.log(data);
                });

            }
        }

        //如果保存成功，则更新移交人和接收人在仓房和保管员表中的记录basic_keeper_house表
        $scope.saveTransferkeeperhouse = function () {
            //获取角色数据
            roleService.getPageInfo("保管员").then(function(data){
                $scope.rolelist = data.list[0];
                var roleId = $scope.rolelist.roleId;

                //①根据移交人的id和仓号删除在basic_keeper_house表中的记录
                //②往basic_keeper_house表中添加新的接收人和负责的仓房id
                var houseId = $scope.keepertransfer.houseId;
                var receiveId = $scope.keepertransfer.receiveUser;
                var transferId=$rootScope.userInfo.userId;//当前移交的人就是登陆的保管员
                keeperService.updateKeeperHouse(houseId,receiveId,transferId,roleId).then(function (data) {
                    if (data.msg == 'success') {
                        alert("保存成功！");
                        $state.go('app.storage.keeper.keepertransferlist');
                    }else {
                        alert("保存失败！");
                    }
                },function(data) {
                    console.log(data);
                });

            },function(data){
                console.log(data);
            });


        }

        //保管员移交执行的方法
        $scope.keepertransferAddshow = function () {
            var roleId = 0;
            //获取角色数据
            roleService.getPageInfo("保管员").then(function(data){
                $scope.rolelist = data.list[0];
                roleId = $scope.rolelist.roleId;
                if(roleId != 0){
                    //移交人(当前登录人)
                    var userId=$rootScope.userInfo.userId;
                    keepertransferService.getKeeperByLoginUser(userId,roleId).then(function(data){
                        $scope.transUser = data;
                        //给移交人赋值 该移交人是登录的保管员
                        //$("#transUser").val($scope.transUser.name);
                        $scope.keepertransfer.transUser=$scope.transUser.userId;//给移交人赋值
                        $scope.transUserName=$scope.transUser.name;//给移交人赋值
                    },function(data){
                        // console.log(data);
                    });

                    //接收人(当前登录人所在库的所有保管员) 库id通过在后台的session中获取
                    keepertransferService.findreceivedUser($rootScope.userInfo,roleId).then(function(data){
                        $scope.receiveUsers = data;
                    },function(data){
                        // console.log(data);
                    });
                }
            },function(data){
                console.log(data);
            });

            //监交人(当前库下所有的用户)
            keepertransferService.findAllUserByOrgId().then(function (data) {
                $scope.superiorUsers = data;
            }),function (data) {

            }

            //字典表数据
            $scope.dicDataList = $rootScope.dicDataList;


            // 用于存放新增的数据
            $scope.keepertransferDetail = [];
            //通过仓房号，获取货位号.
            $scope.change = function () {
                if ($scope.keepertransfer.houseId != null
                    && $scope.keepertransfer.houseId != undefined
                    && $scope.keepertransfer.houseId != '') {
                    warehouseService.getStorehouse($rootScope.depotInfo.orgId, $scope.keepertransfer.houseId,"0").then(function(data){
                        $scope.keepertransferDetail = [];
                        //循环取出list中的货位Id 然后根据仓号和货位号从分仓保管账中取出品种和粮食数量
                        var warehouseId="";
                        var storehouseId="";
                        for(var i=0;i<data.wareList.length;i++){
                            storehouseId=data.wareList[i].storehouseId;
                            warehouseId=data.wareList[i].warehouseId;
                            keepAccountService.getPageInfoA(null, null, storehouseId,warehouseId, data.wareList[i]).then(function(data){
                                if (data.storehouseId != undefined && data.storehouseId != null && data.storehouseId != '' ) {
                                    $scope.keepertransferDetail.push(angular.copy(data));
                                }
                            },function(data){
                                console.log(data);
                            });
                        }

                        $scope.warehouseList = data.wareList;  //下拉列表数据
                        $scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
                    },function (data) {
                        console.log(data);
                    });
                } else {
                    // 设置货位号为空.
                    $scope.keepertransfer.warehouseId = null;
                }
            }
        }

    })

    .controller("keeperSaveCtrl", function($scope,$state,$rootScope,$http,$stateParams,roleService,StorehouseService, keeperService, APP_CONFIG) {
        if ($stateParams.showType == 1) {
            $scope.isNotEdit = true;
        }

        // 获取货位列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.search = {storehouseId:"",name:""};
        $scope.keeper = {};
        $scope.loadData = function() {
            //获取角色数据
            roleService.getPageInfo("保管员").then(function(data){
                $scope.rolelist = data.list[0];
                var roleId = $scope.rolelist.roleId;

                keeperService.getKeeperListPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.search.name,
                    $scope.search.storehouseId,$rootScope.userInfo.orgId,roleId).then(function(data){
                    $scope.pageInfo = data;
                },function(data){
                    console.log(data);
                });

            },function(data){
                console.log(data);
            });

        }
        $scope.loadData();

        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }

        // 查看
        $scope.keeperView = function(id) {
            $state.go('app.storage.keeper.keeperDetails',{id:id, showType:1});
        }

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
            $scope.search.storehouseId = storehouseId;
            $scope.loadData();
        })

    })
