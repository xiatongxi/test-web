"use strict";

angular.module('app.storage')
    .controller("foodbasicinfoCtrl", function($scope, $state,$http,$filter, $stateParams,StorehouseService,warehouseService,$rootScope, foodbasicinfoService, APP_CONFIG) {
//================粮食基本信息(粮食专卡)开始=================//
        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.search = {storehouseId:"", warehouseId:""};
        $scope.findBasicinfoPageInfo = function() {
            foodbasicinfoService.findBasicinfoPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,
                $scope.search.storehouseId, $scope.search.warehouseId).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                // console.log(data);
            });
        }
        $scope.findBasicinfoPageInfo();

        // 仓房列表
        $scope.loadStore = function() {
            StorehouseService.getStorehouseList($rootScope.orgInfo.orgId).then(function(data){
                $scope.storelist = data.houseList;
            },function(data){
                console.log(data);
            });
        }
        $scope.loadStore();

        // 货位列表
        $scope.loadWare = function() {
            warehouseService.getStorehouse($rootScope.orgInfo.orgId, $scope.search.storehouseId).then(function(data){
                $scope.warelist = data.wareList;
            },function(data){
                console.log(data);
            });
        }
        $scope.loadWare();

        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.findBasicinfoPageInfo();
        }

        // 接收广播，切换仓房
        $scope.$on("storeChangeed", function(event, storehouseId) {
            $scope.search.storehouseId = storehouseId;
            $scope.findBasicinfoPageInfo();
            $scope.loadWare();
        })

        //========================查看粮情专卡开始=============================

        $scope.showfoodDetails = function (id,houseId,warehouseId,quality,subType) {
            if((quality == 6877) && (subType == 3164)){
                //查看粮情专卡信息(省储粮-小麦)
                $state.go('app.storage.foodbasicinfo.centralWheat',{id:id,houseId:houseId,warehouseId:warehouseId});
            }else if((quality == 6878)&& (subType == 3164)){
                //查看粮情专卡信息(市(州)储粮-小麦)
                $state.go('app.storage.foodbasicinfo.stateWheat',{id:id,houseId:houseId,warehouseId:warehouseId});
            }else if(((quality == 6879)) && (subType == 3164)){
                //查看粮情专卡信息(县储粮-小麦)
                $state.go('app.storage.foodbasicinfo.prefeWheat',{id:id,houseId:houseId,warehouseId:warehouseId});
            }else if((quality == 6877) && (subType == 3165)){
                //查看粮情专卡信息(省储粮-玉米)
                $state.go('app.storage.foodbasicinfo.centralCorn',{id:id,houseId:houseId,warehouseId:warehouseId});
            }else if((quality == 6878)&& (subType == 3165)){
                //查看粮情专卡信息(市(州)地储粮-玉米)
                $state.go('app.storage.foodbasicinfo.stateCorn',{id:id,houseId:houseId,warehouseId:warehouseId});
            }else if(((quality == 6879)) && (subType == 3165)){
                //查看粮情专卡信息(县储粮-玉米)
                $state.go('app.storage.foodbasicinfo.prefeCorn',{id:id,houseId:houseId,warehouseId:warehouseId});
            }else if((quality == 6877) && (subType == 6905)){
                //查看粮情专卡信息(省储粮-油)
                $state.go('app.storage.foodbasicinfo.centralOil',{id:id,houseId:houseId,warehouseId:warehouseId});
            }else if((quality == 6878)&& (subType == 6905)){
                //查看粮情专卡信息(市(州)地储粮-油)
                $state.go('app.storage.foodbasicinfo.stateOil',{id:id,houseId:houseId,warehouseId:warehouseId});
            }else if(((quality == 6879)) && (subType == 6905)){
                //查看粮情专卡信息(县储粮-油)
                $state.go('app.storage.foodbasicinfo.prefeOil',{id:id,houseId:houseId,warehouseId:warehouseId});
            }else{
                $state.go('app.storage.foodbasicinfo.foodDetails',{id:id,houseId:houseId,warehouseId:warehouseId});
            }
        }

        //========================查看粮情专卡结束=============================
//================粮食基本信息(粮食专卡)结束=================//

    })

    /**
     * 粮情专卡详情
     */
    .controller("foodDetailsCtrl", function($scope, $http,$filter,$uibModal,qualitycheckService,$stateParams,StorehouseService,warehouseService,$rootScope, foodbasicinfoService, APP_CONFIG) {
        $scope.foodinfoLocation ={};
        var id=$stateParams.id;
        $scope.loadData = function () {
            foodbasicinfoService.loadDataById(id).then(function (data) {
                $scope.foodbasicinfo = data;
                $scope.foodbasicinfo.inputYear = $filter('date')($scope.foodbasicinfo.inputYear, "yyyy-MM-dd");
                $scope.isShow = true;//用于粮情专卡中的质量检测记录和货位变更列表是否显示 true:显示 false:不显示
                //执行储粮专卡中的粮食质量检测记录和货位变更记录
                var foodbasicinfoId = id;
                $scope.loadData_location(foodbasicinfoId);//粮情专卡的Id
                $scope.loadData_check(foodbasicinfoId); //粮情专卡的Id
                $scope.loadWarehouse_shape();//得到货位形状
            }, function (data) {
            });
        };

        $scope.loadDataByHouseIdWarehouseId = function () {
            var houseId=$stateParams.houseId;//查询当前仓房  当前货位对应的专卡
            var warehouseId=$stateParams.warehouseId;
            foodbasicinfoService.findBasicinfoByStoreWarehouse(houseId,warehouseId).then(function (data) {
                if(typeof(data[0])=="undefined"){
                    $scope.foodbasicinfo ={};
                }else{
                    $scope.isShow = true;//用于粮情专卡中的质量检测记录和货位变更列表是否显示  true:显示 false:不显示
                    $scope.foodbasicinfo = data[0];
                    var foodbasicinfoId = $scope.foodbasicinfo.id;
                    $scope.loadData_location(foodbasicinfoId);//粮情专卡的Id
                    $scope.loadData_check(foodbasicinfoId); //粮情专卡的Id
                    $scope.loadWarehouse_shape();//得到货位形状
                    $scope.foodbasicinfo.inputYear = $filter('date')($scope.foodbasicinfo.inputYear, "yyyy-MM-dd");
                }
            }, function (data) {
            });
        };
//如果为0则是封仓管理中的查找粮情专卡 否则是储粮专卡中的粮情专卡
        if($stateParams.id != 0){
            $scope.loadData();
        }else{
            $scope.loadDataByHouseIdWarehouseId();
        }
//================粮食质量检测列表开始=================//
        // 获取粮食质量检测记录数据
        $scope.loadData_check = function(foodbasicinfoId) {
            var houseId=$stateParams.houseId;//查询当前仓房  当前货位的质量检测记录
            var warehouseId=$stateParams.warehouseId;
            qualitycheckService.getQualitycheckListByFoodbasicinfoCheck(houseId,warehouseId,foodbasicinfoId).then(function(data){
                $scope.thirdqualitycheck = data;
                console.log($scope.thirdqualitycheck);
            },function(data){
            });
        }

//================粮食质量检测记录结束=================//

//================货位基本形状开始=================//
        $scope.loadWarehouse_shape = function () {
            var orgId = $rootScope.userInfo.orgId;//当前登录者的库id
            $scope.ware = {storehouseId:$stateParams.houseId, warehouseId:$stateParams.warehouseId};
            warehouseService.getPageInfo(null, null,$scope.ware,orgId).then(function(data){
                $scope.wareInfo = data.list[0];
            },function(data){
                console.log(data);
            });
        }
//================货位基本形状结束=================//

//================货位变更记录开始=================//
        // 获取货位变更记录列表数据
        $scope.loadData_location = function(foodbasicinfoId) {
            var houseId=$stateParams.houseId;//查询原仓房(当前仓房)  原货位(当前货位)的变更记录列表
            var warehouseId=$stateParams.warehouseId;
            foodbasicinfoService.getPageInfoLocation(1, 10,houseId,warehouseId,foodbasicinfoId).then(function(data){
                $scope.pageInfoLocation = data;
            },function(data){
                console.log(data);
            });
        }

//================货位变更记录列表结束=================//


        //================粮食质量检测记录弹窗页面开始=================//
        //得到第三方检查记录的列表
        //该方法是 地级(省级)储备粮 公用的 因为不管是哪种玉米弹出的该页面是一样的
        $scope.getPrefeThreeCheckRecord = function(foodbasicinfoId) {
            var params = [];
            params.houseId = $stateParams.houseId;
            params.warehouseId = $stateParams.warehouseId;
            params.foodbasicinfoId=foodbasicinfoId;
            var uibModalInstance = $uibModal.open({
                size:'lg',
                templateUrl: 'app/storage/views/foodbasicinfo/foodCardDetails/foodbasicinfo-check-profeedit.html',
                controller: 'checkModalCtrl',
                resolve: {
                    // items是一个回调函数
                    items: function () {
                        // 这个值会被模态框的控制器获取到
                        return params;
                    }
                }
            });
            uibModalInstance.result.then(function (result) {
                if (result != null) {
                    $scope.loadData_check(foodbasicinfoId);//用于刷新列表页面
                }
                // 关闭模态框时刷新页面数据
            }, function (reason) {
                console.log(reason);
            });
        }

        //该方法是 中央储备粮 公用的 因为不管是哪种玉米弹出的该页面是一样的
        $scope.getCentralThreeCheckRecord = function(foodbasicinfoId) {
            var params = [];
            params.houseId = $stateParams.houseId;
            params.warehouseId = $stateParams.warehouseId;
            params.foodbasicinfoId=foodbasicinfoId;
            var uibModalInstance = $uibModal.open({
                size:'lg',
                templateUrl: 'app/storage/views/foodbasicinfo/foodCardDetails/foodbasicinfo-check-centraledit.html',
                controller: 'checkModalCtrl',
                resolve: {
                    // items是一个回调函数
                    items: function () {
                        // 这个值会被模态框的控制器获取到
                        return params;
                    }
                }
            });
            uibModalInstance.result.then(function (result) {
                if (result != null) {
                    $scope.loadData_check(foodbasicinfoId);//用于刷新列表页面
                }
                // 关闭模态框时刷新页面数据
            }, function (reason) {
                console.log(reason);
            });
        }

        //================粮食质量检测记录弹窗页面结束=================//


        // ================货位变更记录开始=================//
        // 新增数据字典信息跳转到录入页面
        $scope.showAddFoodinfoLocation = function(id) {
            $scope.addShowLocation(id);
            //$scope.change();
            // 显示弹出层
            $("#foodinfoLocationModal").modal("show");
            //修改页面 需要将禁用的框再次开启
            $("#foodinfoLocation-form select").attr("disabled",false);
            $("#foodinfoLocation-form input").attr("readonly",false);
            $("#foodinfoLocation-form textarea").attr("readonly",false);
            $("#operation").show();

        }


        // 提交粮货位变更表单
        var validator = $("#foodinfoLocation-form").validate()
        $scope.saveFoodinfoLocation = function() {
            // $scope.foodinfoLocation.houseId=$stateParams.houseId;
            // 模态框的校验器，有时会为空，可能是controller先于页面加载的原因，所以要在保存时，再判断一下校验器是否为undefined.
            if (validator == undefined) {
                validator = $("#foodinfoLocation-form").validate();
                $scope.saveFoodinfoLocation();
            }else{
                if(validator.form()) {
                    var orgId = $rootScope.orgInfo.orgId;
                    $scope.foodinfoLocation.changeTime = $filter('date')($scope.foodinfoLocation.changeTime, "yyyy-MM-dd");
                    foodbasicinfoService.saveFoodinfoLocation($scope.foodinfoLocation,orgId).then(function(data){
                        if (data.status == 'success') {
                            alert("保存成功！");
                            $scope.foodinfoLocation = {};
                        } else {
                            alert("保存失败！");
                        }
                        // 关闭弹出层
                        $("#foodinfoLocationModal").modal("hide");
                        //如果为0则是封仓管理中的查找粮情专卡 否则是储粮专卡中的粮情专卡
                        if($stateParams.id != 0){
                            $scope.loadData_location(id); //相当于局部刷新  重新调用数据列表 该id是粮情专卡的id
                        }else{
                            $scope.loadDataByHouseIdWarehouseId();
                        }
                    },function(data){
                        console.log(data);
                    });
                }
            }
        }

        //用于在页面进行显示所需的数据
        $scope.addShowLocation = function(id){
            //给原货位号赋值
            var warehouseId=$stateParams.warehouseId;
            var houseId=$stateParams.houseId;

            foodbasicinfoService.getWarehouseByWarehouseId(warehouseId).then(function(data){
                $scope.oldfoodinfoLocation = data;
                //原货位编号
                $scope.foodinfoLocation.warehouseCode=$scope.oldfoodinfoLocation.warehouseCode;
                //原货位id
                $scope.foodinfoLocation.warehouseId=warehouseId;
                //原仓房id
                $scope.foodinfoLocation.houseId=houseId;
                //原货位名称
                $scope.warehouseName=$scope.oldfoodinfoLocation.warehouseName;
            },function(data){
                // console.log(data);
            });
            if(id){
                foodbasicinfoService.showAddFoodinfoLocation(id).then(function(data){
                    $scope.foodinfoLocation = data;
                    //原变更日期
                    $scope.foodinfoLocation.changeTime=$scope.foodinfoLocation.changeTime;
                    //仓房名称：
                    $scope.foodinfoLocation.newHouseId=$scope.foodinfoLocation.newHouseId;
                    $scope.change();
                    //新货位号
                    $scope.foodinfoLocation.newWarehouseId=$scope.foodinfoLocation.newWarehouseId;
                    //描述
                    $scope.foodinfoLocation.remarks=$scope.foodinfoLocation.remarks;
                    //原id
                    $scope.foodinfoLocation.id=$scope.foodinfoLocation.id;
                },function(data){
                    // console.log(data);
                });
            }else{
                // console.log(insert);
            }

            //给仓房赋值
            //按照单位获取单位下的仓房信息
            var depotId = $rootScope.depotInfo.orgId;//当前登录者的库id
            StorehouseService.getStorehouseList(depotId).then(function(data){
                $scope.storehouseList = data.houseList;
                $scope.storehouseObj = data.houseObj;
            },function (data) {
                console.log(data);
            });
            // $scope.change();
        }


        //通过仓房号，获取货位号.
        $scope.change = function () {
            if ($scope.foodinfoLocation.newHouseId!= null&& $scope.foodinfoLocation.newHouseId != undefined&& $scope.foodinfoLocation.newHouseId != '') {
                warehouseService.getStorehouse($rootScope.depotInfo.orgId, $scope.foodinfoLocation.newHouseId).then(function(data){
                    $scope.warehouseList = data.wareList;  //下拉列表数据
                    $scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
                },function (data) {
                    console.log(data);
                });
            } else {
                // 设置货位号为空.
                $scope.foodinfoLocation.newWarehouseId = "";
            }
        }
        /*//详情
         $scope.showViewLocation = function (id) {
         if (id != '' && id != undefined && id != null) {
         foodbasicinfoService.showAddFoodinfoLocation(id).then(function(data){
         $scope.foodinfoLocation = data;
         },function(data){
         console.log(data);
         });
         }

         // 显示弹出层
         $("#foodinfoLocationModal").modal("show");
         //查看页面 需要禁用框
         $("#foodinfoLocation-form select").attr("disabled",true);
         $("#foodinfoLocation-form input").attr("readonly",true);
         $("#foodinfoLocation-form textarea").attr("readonly",true);
         $("#operation").hide();
         }*/
        //$scope.isNotEditLocation = true;

        // ================货位变更记录结束=================//
    })


    /**
     * 封仓管理开始
     */
    .controller("foodsealhouseCtrl", function($scope, $state,$http, qualitycheckService,StorehouseService,warehouseService,$rootScope,$stateParams, foodsealhouseService, APP_CONFIG) {
        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.search = {storehouseId:"", warehouseId:""};
        $scope.loadData = function() {
            foodsealhouseService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.search.storehouseId, $scope.search.warehouseId).then(function(data){
                $scope.pageInfo = data;
                //仓房有值，货位无值 （货位有值，仓房无值）(仓房货位都有值)
                if(
                    ($scope.search.storehouseId != null && $scope.search.storehouseId != "" && ($scope.search.warehouseId == null || $scope.search.warehouseId == ""))
                    || ($scope.search.warehouseId != null && $scope.search.warehouseId != "" && ($scope.search.storehouseId == null || $scope.search.storehouseId == ""))
                    || ($scope.search.storehouseId != null && $scope.search.storehouseId != "" && $scope.search.warehouseId != null && $scope.search.warehouseId != "")
                ){
                    //无数据
                    if($scope.pageInfo.list.length == 0) {
                        alert("该仓房/货位还未生成库存识别码");
                    }

                    //仓房查出一条数据并且未封仓
                    if( $scope.pageInfo.list.length == 1 && $scope.pageInfo.list[0].sealStatus == 0){
                        $scope.pageInfo.list.splice($scope.pageInfo.list,1);
                        alert("该仓房/货位还未生成库存识别码");
                    }

                    //有多条数据 只展示封仓的
                    if($scope.pageInfo.list.length > 1 ){
                        for(var i=0; i < $scope.pageInfo.list.length; i++){
                            if($scope.pageInfo.list[i].sealStatus == 0)$scope.pageInfo.list.splice(i,1);
                        }
                    }
                }
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

        // 货位列表
        $scope.loadWare = function() {
            warehouseService.getStorehouse($rootScope.orgInfo.orgId, $scope.search.storehouseId).then(function(data){
                $scope.warelist = data.wareList;
            },function(data){
                console.log(data);
            });
        }
        $scope.loadWare();

        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }

        // 接收广播，切换仓房
        $scope.$on("storeChangeed", function(event, storehouseId) {
            $scope.search.storehouseId = storehouseId;
            $scope.loadData();
            $scope.loadWare();
        })

        //封仓按钮
        $scope.showSealHouse = function (houseId,warehouseId,id) {
            $state.go('app.storage.foodbasicinfo.sealhouse',{houseId:houseId,warehouseId:warehouseId,id:id});
        }

        //查看验收质量信息
        $scope.showViewSealHouse = function (id) {
            var isNotEdit = true;
            $state.go('app.storage.foodbasicinfo.acceptcheck',{id:id,isNotEdit:isNotEdit});
            //$state.go('app.storage.foodbasicinfo.acceptcheck',{houseId:houseId,warehouseId:warehouseId,isNotEdit:isNotEdit});
        }

        //封仓管理中的查看粮情卡按钮
        $scope.showfoodhouseCard = function (id,quality,subType,houseId,warehouseId) {
            if((quality == 6877) && (subType == 3164)){
                //查看粮情专卡信息(省储粮-小麦)
                $state.go('app.storage.foodbasicinfo.centralWheat',{id:0,houseId:houseId,warehouseId:warehouseId});
            }else if((quality == 6878)&& (subType == 3164)){
                //查看粮情专卡信息(市(州)储粮-小麦)
                $state.go('app.storage.foodbasicinfo.stateWheat',{id:0,houseId:houseId,warehouseId:warehouseId});
            }else if(((quality == 6879)) && (subType == 3164)){
                //查看粮情专卡信息(县储粮-小麦)
                $state.go('app.storage.foodbasicinfo.prefeWheat',{id:0,houseId:houseId,warehouseId:warehouseId});
            }else if((quality == 6877) && (subType == 3165)){
                //查看粮情专卡信息(省储粮-玉米)
                $state.go('app.storage.foodbasicinfo.centralCorn',{id:0,houseId:houseId,warehouseId:warehouseId});
            }else if((quality == 6878)&& (subType == 3165)){
                //查看粮情专卡信息(市(州)地储粮-玉米)
                $state.go('app.storage.foodbasicinfo.stateCorn',{id:0,houseId:houseId,warehouseId:warehouseId});
            }else if(((quality == 6879)) && (subType == 3165)){
                //查看粮情专卡信息(县储粮-玉米)
                $state.go('app.storage.foodbasicinfo.prefeCorn',{id:0,houseId:houseId,warehouseId:warehouseId});
            }else if((quality == 6877) && (subType == 6905)){
                //查看粮情专卡信息(省储粮-油)
                $state.go('app.storage.foodbasicinfo.centralOil',{id:0,houseId:houseId,warehouseId:warehouseId});
            }else if((quality == 6878)&& (subType == 6905)){
                //查看粮情专卡信息(市(州)地储粮-油)
                $state.go('app.storage.foodbasicinfo.stateOil',{id:0,houseId:houseId,warehouseId:warehouseId});
            }else if(((quality == 6879)) && (subType == 6905)){
                //查看粮情专卡信息(县储粮-油)
                $state.go('app.storage.foodbasicinfo.prefeOil',{id:0,houseId:houseId,warehouseId:warehouseId});
            }else{
                $state.go('app.storage.foodbasicinfo.foodDetails',{id:0,houseId:houseId,warehouseId:warehouseId});
            }

        }

        //库存识别码
        $scope.showfoodQrCode = function (houseId,warehouseId) {
            qualitycheckService.findByStoreWarehouse(houseId,warehouseId,"1","1").then(function(data){
                $scope.qualitycheckCode = data;
                console.log($scope.qualitycheckCode);
            },function(data){
                // console.log(data);
            });
            $("#foodBasicinfoQrCode").modal("show");
        }

    })

    /**
     * 该controller用于粮权所属单位填写后的提交
     */
    .controller("foodsealhouseSubmitCtrl", function($scope,$stateParams,qualitycheckService, $rootScope ,$state) {
        //获取仓号和货位号
        var houseId=$stateParams.houseId;
        var warehouseId=$stateParams.warehouseId;
        //提交表单
        var validator = $("#foodbasicinfoForm").validate();
        $scope.submitFoodBasic = function () {
            //submitType代表填写粮权所属单位后提交转向是否封仓页面
            if (validator.form()) {
                //还没保存的的粮情专卡页面
                $scope.foodbasicDetails = function () {
                    var houseId=$stateParams.houseId;
                    var warehouseId=$stateParams.warehouseId;
                    var id = $stateParams.id;
                    qualitycheckService.findByStoreWarehouse(houseId,warehouseId,"1").then(function(data){
                        $scope.qualitycheck = data;
                        if(($scope.qualitycheck.quality==6877) && ($scope.qualitycheck.subType==3164)){
                            //查看粮情专卡信息(省储粮-小麦)
                            $state.go('app.storage.foodbasicinfo.sealhouse.centralWheat',{foodbasic:angular.toJson($scope.foodbasicinfo),houseId:houseId,warehouseId:warehouseId});
                        }else if(($scope.qualitycheck.quality == 6878)&& ($scope.qualitycheck.subType == 3164)){
                            //查看粮情专卡信息(市(州)储粮-小麦)
                            $state.go('app.storage.foodbasicinfo.sealhouse.stateWheat',{foodbasic:angular.toJson($scope.foodbasicinfo),houseId:houseId,warehouseId:warehouseId});
                        }else if((($scope.qualitycheck.quality==6879)) && ($scope.qualitycheck.subType==3164)){
                            //查看粮情专卡信息(县储粮-小麦)
                            $state.go('app.storage.foodbasicinfo.sealhouse.prefeWheat',{foodbasic:angular.toJson($scope.foodbasicinfo),houseId:houseId,warehouseId:warehouseId});
                        }else if(($scope.qualitycheck.quality==6877) && ($scope.qualitycheck.subType==3165)){
                            //查看粮情专卡信息(省储粮-玉米)
                            $state.go('app.storage.foodbasicinfo.sealhouse.centralCorn',{foodbasic:angular.toJson($scope.foodbasicinfo),houseId:houseId,warehouseId:warehouseId});
                        }else if(($scope.qualitycheck.quality == 6878)&& ($scope.qualitycheck.subType == 3165)){
                            //查看粮情专卡信息(市(州)地储粮-玉米)
                            $state.go('app.storage.foodbasicinfo.sealhouse.stateCorn',{foodbasic:angular.toJson($scope.foodbasicinfo),houseId:houseId,warehouseId:warehouseId});
                        }else if(($scope.qualitycheck.quality==6879) && ($scope.qualitycheck.subType==3165)){
                            //查看粮情专卡信息(县储粮-玉米)
                            $state.go('app.storage.foodbasicinfo.sealhouse.prefeCorn',{foodbasic:angular.toJson($scope.foodbasicinfo),houseId:houseId,warehouseId:warehouseId});
                        }else if(($scope.qualitycheck.quality==6877) && ($scope.qualitycheck.subType==6905)){
                            //查看粮情专卡信息(省储粮-油)
                            $state.go('app.storage.foodbasicinfo.sealhouse.centralOil',{foodbasic:angular.toJson($scope.foodbasicinfo),houseId:houseId,warehouseId:warehouseId});
                        }else if(($scope.qualitycheck.quality==6878) && ($scope.qualitycheck.subType==6905)){
                            //查看粮情专卡信息(市(州)地储粮-油)
                            $state.go('app.storage.foodbasicinfo.sealhouse.stateOil',{foodbasic:angular.toJson($scope.foodbasicinfo),houseId:houseId,warehouseId:warehouseId});
                        }else if(($scope.qualitycheck.quality==6879) && ($scope.qualitycheck.subType==6905)){
                            //查看粮情专卡信息(县储粮-油)
                            $state.go('app.storage.foodbasicinfo.sealhouse.prefeOil',{foodbasic:angular.toJson($scope.foodbasicinfo),houseId:houseId,warehouseId:warehouseId});
                        }else{//原始页面
                            $state.go('app.storage.foodbasicinfo.basicCard',{foodbasic:angular.toJson($scope.foodbasicinfo),houseId:houseId,warehouseId:warehouseId,id:id});
                        }
                    },function(data){
                        // console.log(data);
                    });

                }
                $scope.foodbasicDetails();
            }
        }

        //排除不是数字的
        $scope.clearNoNum = function(obj,attr){
            //先把非数字的都替换掉，除了数字和.
            obj[attr] = obj[attr].replace(/[^\d.]/g,"");
            //必须保证第一个为数字而不是.
            obj[attr] = obj[attr].replace(/^\./g,"");
            //保证只有出现一个.而没有多个.
            obj[attr] = obj[attr].replace(/\.{2,}/g,"");
            //保证.只出现一次，而不能出现两次以上
            obj[attr] = obj[attr].replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            //只能输入两个小数
            obj[attr] = obj[attr].replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
        }

        $scope.retList = function () { $state.go('app.storage.foodbasicinfo.fshlist'); }


        $scope.loadShow = function () {
            var houseId=$stateParams.houseId;
            var warehouseId=$stateParams.warehouseId;
            var id = $stateParams.id;
            qualitycheckService.findByStoreWarehouseData(houseId,warehouseId,"1",id).then(function(data){
                $scope.foodbasicinfo = data;
                $scope.foodbasicinfo.keepMethod = $rootScope.dicData[$scope.foodbasicinfo.keepMethod];
                console.log($scope.foodbasicinfo);
            },function(data){
                // console.log(data);
            });
        }
        $scope.loadShow();

    })

    //将粮权所属单位填写后的提交后数据取出来以及仓房和其他表的数据取出来赋值给粮情专卡进行保存
    .controller("sealhouseSaveCtrl", function($scope, $state,$http,$filter, $rootScope,$stateParams,keeperService,enumService,warehouseService,
                                              kcswService,qualitycheckService,foodsealhouseService, StorehouseService, orgService,APP_CONFIG) {

        //往详情的粮情卡中填充数据
        $scope.loadData= function () {
            //①从仓房带出
            var houseId=$stateParams.houseId;
            StorehouseService.findByStorehouse(houseId,$rootScope.userInfo.orgId).then(function(data){
                $scope.storehouse = data;
                console.log($scope.storehouse);
            },function(data){
                // console.log(data);
            });

            //②货位
            var warehouseId=$stateParams.warehouseId;
            warehouseService.findByWarehouse(warehouseId).then(function(data){
                $scope.warehouse = data;
            }, function (data) {
                console.log(data);
            });

            //②从保管账带出(获取最新一条的记录,接口按照时间降序排序)
            $scope.kcswStr = {ch : houseId, hwh : warehouseId, unitid : $rootScope.orgInfo.orgId};
            kcswService.getPageInfo(null, null, $scope.kcswStr).then(function(data){
                $scope.keepaccount = data.list[0];//根据仓房和货位获取分仓保管账的降序的第一条记录
                if(typeof($scope.keepaccount) == 'undefined'){
                   $scope.keepaccount.kcsl = 0;
                }else{
                    //获取品种编号
                    enumService.edit($scope.keepaccount.pz).then(function(data){
                        $scope.basicEnum = data;
                    },function(data){
                        console.log(data);
                    });
                    //获取产地编号
                    enumService.edit($scope.keepaccount.gb).then(function(data){
                        $scope.basicEnumData = data;
                    },function(data){
                        console.log(data);
                    });
                }

            },function(data){
                console.log(data);
            });

            var id=$stateParams.id;
            qualitycheckService.loadDataById(id).then(function(data){
                $scope.qualitycheck = data;
                $scope.qualitycheck.inputTime = $filter('date')($scope.qualitycheck.inputTime, "yyyy-MM-dd");

            },function(data){
                // console.log(data);
            });
            //④带出该仓的保管员
            var houseId=$stateParams.houseId;
            keeperService.getKeeperNamesByHouseId(houseId).then(function(data){
                $scope.keeper = data;
                console.log($scope.storehouse);
            },function(data){
                // console.log(data);
            });

            //⑤从粮权框中带出
            $scope.foodbasicinfo=angular.fromJson($stateParams.foodbasic);

            //设置入仓时间和填卡时间为当前的时间
            Date.prototype.Format = function (fmt) { // author: meizz
                var o = {
                    "M+": this.getMonth() + 1, // 月份
                    "d+": this.getDate(), // 日
                    "h+": this.getHours(), // 小时
                    "m+": this.getMinutes(), // 分
                    "s+": this.getSeconds(), // 秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
                    "S": this.getMilliseconds() // 毫秒
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
            var datestr = new Date().Format("yyyy-MM-dd");
            $scope.foodbasicinfo.fillingTime=datestr;

            console.log($scope.foodbasicinfo);
        };

        $scope.loadData();


        $scope.retList = function () { $state.go('app.storage.foodbasicinfo.fshlist'); }

        var depotId = $rootScope.depotInfo.orgId;//当前登录者的库id
        //确定封仓(保存粮情专卡submitFoodCard)
        // 提交表单
        $scope.storageQualitycheckVo = {};
        $scope.submitSaveFoodCard = function () {
            var houseId=$stateParams.houseId;
            var warehouseId=$stateParams.warehouseId;
            $scope.foodbasicinfo.houseId = houseId;
            $scope.foodbasicinfo.warehouseId = warehouseId;
            $scope.foodbasicinfo.recorder=$rootScope.userInfo.realName;

            //提交表单之前需要查出仓房，货位，仓房和保管员关联以及分仓保管账
            //①查询仓房
            var storehouseType = $scope.storehouse.storehouseType;//仓房类型
            var designCapacity = $scope.storehouse.designCapacity;//设计仓容
            var length =  $scope.storehouse.length;//长
            var depotName =  $scope.storehouse.depotName;//保管单位
            var width =  $scope.storehouse.width;//宽
            var storehouseCode =  $scope.storehouse.storehouseCode;//仓房编号
            var warehouseCode =  $scope.warehouse.warehouseCode;//货位编号
            //封装仓房参数
            $scope.storageQualitycheckVo.storehouseType = storehouseType;
            $scope.storageQualitycheckVo.designCapacity = designCapacity;
            $scope.storageQualitycheckVo.length = length;
            $scope.storageQualitycheckVo.depotName = depotName;
            $scope.storageQualitycheckVo.width = width;
            $scope.storageQualitycheckVo.storehouseCode = storehouseCode;
            $scope.storageQualitycheckVo.warehouseCode = warehouseCode;

            //③仓房对应的保管员
            //封装仓房对应保管员参数
            $scope.storageQualitycheckVo.keeperNames = $scope.keeper.keeperNames;

            //④分仓保管账
            //封装分仓保管账参数
            //④分仓保管账
            //封装分仓保管账参数
            $scope.storageQualitycheckVo.hwxz = $scope.keepaccount.hwxz;
            $scope.storageQualitycheckVo.pz = $scope.keepaccount.pz;
            $scope.storageQualitycheckVo.mxpz = $scope.keepaccount.mxpz;
            $scope.storageQualitycheckVo.kcsl = $scope.keepaccount.kcsl;
            $scope.storageQualitycheckVo.hwcd = parseInt($scope.keepaccount.gb); //产地
            $scope.storageQualitycheckVo.scnf = $filter('date')($scope.keepaccount.rq, "yyyy");//收货年度
            $scope.storageQualitycheckVo.wjh = $scope.keepaccount.wjh;

            //获取生产年份的名字
            //封装生产年份，品种编号，产地编号
            $scope.storageQualitycheckVo.scnfName = $rootScope.dicData[$scope.keepaccount.scnf];
            //获取品种编号
            if($scope.basicEnum != null){
                $scope.storageQualitycheckVo.pzCode = $scope.basicEnum.enumcode;
            }else {
                scope.storageQualitycheckVo.pzCode = '';
            }
            //获取产地编号
            if($scope.basicEnumData != null){
                $scope.storageQualitycheckVo.placeCode = $scope.basicEnumData.enumcode;
            }else {
                $scope.storageQualitycheckVo.placeCode = '';
            }

            //获取机构相关的数据
            orgService.editOrg(depotId).then(function(data) {
                $scope.orgInfo = data;
            }, function(data) {
                console.log(data);
            });

            $scope.storageQualitycheckVo.companyNature = $scope.orgInfo.creditCode;
            $scope.storageQualitycheckVo.orgCode = $scope.orgInfo.orgCode;
            $scope.storageQualitycheckVo.qualitycheckId = $stateParams.id;
            var orgId = $rootScope.orgInfo.orgId;

            foodsealhouseService.saveFoodBasicCard($scope.foodbasicinfo,$scope.storageQualitycheckVo,orgId).then(function (data) {
                if (data.status == 'success') {
                    alert("封仓成功！");
                    $scope.foodbasicinfo = {};
                    //保存成功后跳转到封仓列表页面
                    $state.go('app.storage.foodbasicinfo.fshlist');
                } else {
                    alert("封仓失败！");
                }
            }, function (data) {
                console.log(data);
            });
        }

    })
    //下面的controller用于对生成的粮情卡进行查看
    .controller("foodbasicDetailsCtrl", function($scope, $http, $filter,$stateParams, foodbasicinfoService, APP_CONFIG) {
        var houseId=$stateParams.houseId;
        var warehouseId=$stateParams.warehouseId;
        foodbasicinfoService.findBasicinfoByStoreWarehouse(houseId,warehouseId).then(function(data){
            console.log(data)
            if(typeof(data[0])=="undefined"){
                $scope.foodbasicinfo ={};
            }else{
                $scope.foodbasicinfo = data[0];
                $scope.foodbasicinfo.inputYear = $filter('date')($scope.foodbasicinfo.inputYear, "yyyy-MM-dd");
            }
        },function(data){
            // console.log(data);
        });
    })
