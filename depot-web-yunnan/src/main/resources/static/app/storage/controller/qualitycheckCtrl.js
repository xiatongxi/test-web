"use strict";

angular.module('app.storage')
    .controller("qualitycheckCtrl", function($scope,$state,$rootScope,$uibModal, $http,$filter,StorehouseService,warehouseService, $stateParams,qualitycheckService, APP_CONFIG) {

        $scope.dicDataList = $rootScope.dicDataList;

        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.search = {storehouseId:"", warehouseId:"",checkResult:null};

        if($stateParams.checkResult != null){
            $scope.search.checkResult = $stateParams.checkResult;
        }
        $scope.loadData = function() {
            qualitycheckService.getPageInfo($scope.pageInfo.pageNum,   $scope.pageInfo.pageSize,$stateParams.type, $scope.search.checkResult,$scope.search.storehouseId, $scope.search.warehouseId).then(function(data){
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

//------------------粮食初检信息开始--------------------//
        // 显示增加页面,checkType:0代表初检
        $scope.showAddFck = function () {
            //用于在点击初检新增按钮 从分仓保管账取出数据添加到中间表，用于选择出仓房和货位
            $http({
                method : 'POST',
                url : APP_CONFIG.qualitycheckUrl + '/storehouseBusiness/insertStorehouseBusinessFromFcbgz',
            }).then(function successCallback(response) {
                $state.go('app.storage.qualitycheck.fck.fckadd', {id:0,checkType:0,isNotEdit:false});
            }, function errorCallback(response) {
            });

        }

        //修改编辑页面
        $scope.showEditFck = function (id) {
            $state.go('app.storage.qualitycheck.fck.fckedit',{id:id,isNotEdit:false});
        }

        // 查看页面
        $scope.showViewFck = function(id) {
            $state.go('app.storage.qualitycheck.fck.fckedit',{id:id,isNotEdit:true});
        }
//------------------粮食初检信息结束--------------------//

//------------------粮食验收信息开始--------------------//
        // 显示增加页面
        $scope.showAddAck = function (id,houseId,warehouseId) {
            $state.go('app.storage.qualitycheck.ack.ackadd', {id:0,houseId:houseId,warehouseId:warehouseId,checkType:1,isNotEdit:false});
        }
        //修改编辑页面
        $scope.showEditAck = function (id) {
            $state.go('app.storage.qualitycheck.ack.ackedit',{id:id,isNotEdit:false});
        }
        // 查看页面
        $scope.showViewAck = function(id) {
            $state.go('app.storage.qualitycheck.ack.ackedit',{id:id,isNotEdit:true});
        }
        //从验收页面点击新增按钮弹出初检的列表 让选择验收那条记录
        $scope.showFirstCheckPage = function () {
            /*   var isActFlag = false;
             $state.go('app.storage.qualitycheck.fck.fcklist',{type:0,isActFlag:false});*/
            var params = [];
            params.type = 0;//查询初检的列表
            var uibModalInstance = $uibModal.open({
                size:'lg',
                templateUrl: 'app/storage/views/qualitycheck/accept-first-list.html',
                controller: 'actSprModalCtrl',
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
                    // $scope.loadData_check(foodbasicinfoId);//用于刷新列表页面
                }
                // 关闭模态框时刷新页面数据
            }, function (reason) {
                console.log(reason);
            });

        }
//------------------粮食验收信息结束--------------------//

//------------------春秋普查信息开始--------------------//
        //修改编辑页面
        $scope.showEditSpr = function (id) {
            $state.go('app.storage.qualitycheck.spr.spredit',{id:id,isNotEdit:false});
        }
        // 查看页面
        $scope.showViewSpr = function(id) {
            $state.go('app.storage.qualitycheck.spr.spredit',{id:id,isNotEdit:true});
        }

        $scope.showAcctCheckPage = function () {
            $state.go('app.storage.qualitycheck.spr.spradd', {id:0,isNotEdit:false});
        }
        //在春秋普查页面添加新增按钮弹出验收列表的框
        /*$scope.showAcctCheckPage = function () {
            /!*  var isActFlag = false;
             $state.go('app.storage.qualitycheck.ack.acklist',{type:1,isActFlag:false});*!/
            var params = [];
            params.type = 1;//查询初检的列表
            var uibModalInstance = $uibModal.open({
                size:'lg',
                templateUrl: 'app/storage/views/qualitycheck/spring-accept-list.html',
                controller: 'actSprModalCtrl',
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
                    // $scope.loadData_check(foodbasicinfoId);//用于刷新列表页面
                }
                // 关闭模态框时刷新页面数据
            }, function (reason) {
                console.log(reason);
            });
        }*/
//------------------春秋普查信息结束--------------------//
//------------------日常检查开始--------------------//
        $scope.showAddDak = function () {
            $state.go('app.storage.qualitycheck.dakadd', {id:0,isNotEdit:false});
        }
        //修改编辑页面
        $scope.showEditDak = function (id) {
            $state.go('app.storage.qualitycheck.dakedit',{id:id,isNotEdit:false});
        }
        // 查看页面
        $scope.showViewDak = function(id) {
            $state.go('app.storage.qualitycheck.dakedit',{id:id,isNotEdit:true});
        }
//------------------日常检查结束--------------------//

//------------------第三方检查开始--------------------//
        $scope.showAddTrk = function () {
            $state.go('app.storage.qualitycheck.trkadd', {id:0,isNotEdit:false});
        }
        //修改编辑页面
        $scope.showEditTrk = function (id) {
            $state.go('app.storage.qualitycheck.trkedit',{id:id,isNotEdit:false});
        }
        // 查看页面
        $scope.showViewTrk = function(id) {
            $state.go('app.storage.qualitycheck.trkedit',{id:id,isNotEdit:true});
        }
//------------------第三方检查结束--------------------//

//------------------粮食出库信息开始--------------------//
        $scope.showAddOut = function () {
            $state.go('app.storage.qualitycheck.out.outadd', {id:0,isNotEdit:false});
        }
        //修改编辑页面
        $scope.showEditOut = function (id) {
            $state.go('app.storage.qualitycheck.out.outedit',{id:id,isNotEdit:false});
        }
        // 查看页面
        $scope.showViewOut = function(id) {
            $state.go('app.storage.qualitycheck.out.outedit',{id:id,isNotEdit:true});
        }

//------------------粮食出库信息结束--------------------//
        // 根据id删除信息
        $scope.remove = function(id) {
            qualitycheckService.removeById(id).then(function (data) {
                if(data.msg == "success"){
                    alert("删除成功");
                    $scope.loadData();
                }else{
                    alert("删除失败");
                }
            });
        }

    })
    .controller("qualitycheckSaveCtrl", function($scope,$state, $http, $stateParams, StorehouseService, warehouseService, kcswService, keeperService,
                                                 $rootScope, $filter, enumService, qualitycheckService,keepAccountService, APP_CONFIG) {

        $scope.isAgentData = false;
        $scope.loadDataById = function(id) {
            qualitycheckService.loadDataById(id).then(function(data){
                $scope.qualitycheck = data;
                $scope.qualitycheck.wareHouseName = data.wareHouseName;//用于验收，春秋的回显
                $scope.qualitycheck.inspectionStandardBasis = parseInt($scope.qualitycheck.inspectionStandardBasis);
                $scope.qualitycheck.inputTime = $filter('date')($scope.qualitycheck.inputTime, "yyyy-MM-dd");
                $scope.qualitycheck.chooseTime = $filter('date')($scope.qualitycheck.chooseTime, "yyyy-MM-dd");
                $scope.qualitycheck.checkTime = $filter('date')($scope.qualitycheck.checkTime, "yyyy-MM-dd");
                $scope.qualitycheck.applyCheckTime = $filter('date')($scope.qualitycheck.applyCheckTime, "yyyy-MM-dd");
                $scope.qualitycheck.keeperAdvicesTime = $filter('date')($scope.qualitycheck.keeperAdvicesTime, "yyyy-MM-dd");
                $scope.qualitycheck.chiefAdvicesTime = $filter('date')($scope.qualitycheck.chiefAdvicesTime, "yyyy-MM-dd");
                $scope.qualitycheck.viceManagerAdvicesTime = $filter('date')($scope.qualitycheck.viceManagerAdvicesTime, "yyyy-MM-dd");
                $scope.qualitycheck.managerAdvicesTime = $filter('date')($scope.qualitycheck.managerAdvicesTime, "yyyy-MM-dd");
                $scope.qualitycheck.improveTime = $filter('date')($scope.qualitycheck.improveTime, "yyyy-MM-dd");
                $scope.qualitycheck.checkResultTime = $filter('date')($scope.qualitycheck.checkResultTime, "yyyy-MM-dd");
                $scope.qualitycheck.qysj = $filter('date')($scope.qualitycheck.qysj, "yyyy-MM-dd");
                $scope.qualitycheck.harvestTime = $scope.qualitycheck.harvestTime+"";
                if($stateParams.storeName != null && $stateParams.storeName != "" && $stateParams.storeName != undefined){
                    $scope.isAgentData = true;
                    $scope.storeName = $stateParams.storeName;
                    $scope.wareName = $stateParams.wareName;
                }else{
                    $scope.isAgentData = false;
                    $scope.change(0);//点击仓房切换货位
                    $scope.edit();
                }
            },function(data){
            });
        }

        $scope.addCheckSon = [];//用于定义保存检测信息的孩子
        //取出子表数据  根据主表id()
        // 新增或修改保管员信息跳转页面加载数据
        $scope.edit = function() {
            var qcSonId=$stateParams.id;//接收主表的id关联着子表的ktId
            qualitycheckService.findQualitycheckSonByQcSonId(qcSonId).then(function (data) {
                for (var i=0; i < data.length; i++) {
                    $scope.addCheckSon.push(angular.copy(data[i]));
                }
            })
        }

        /**
         * 级联仓房和货位号
         */
        $scope.getBasicData = function() {
            //按照单位获取单位下的仓房信息
            $scope.kcswStr = {ch : null, hwh : null, unitid : $rootScope.orgInfo.orgId, kcsl: null};
            kcswService.getPageInfo(null, null, $scope.kcswStr, "ch").then(function(data){
                $scope.storehouseList = data.list;
                for (var idx in $scope.storehouseList) {
                    $scope.storehouseName = $rootScope.storehouseObj[$scope.storehouseList[idx].ch].storehouseName;
                    $scope.storehouseList[idx].storehouseName = $scope.storehouseName;
                }
            },function(data){
                console.log(data);
            });

        }
        $scope.getBasicData();

        //通过仓房号，获取货位号.
        $scope.change = function (type) {
            if ($scope.qualitycheck.houseId != null && $scope.qualitycheck.houseId != undefined && $scope.qualitycheck.houseId != '') {
                warehouseService.getStorehouse($rootScope.orgInfo.orgId, $scope.qualitycheck.houseId, "0").then(function(data){
                	$scope.warehouseList = data.wareList;  //下拉列表数据
        			$scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
        	    },function(data){
        	        console.log(data);
        	    });
                if (type != 0)
                    $scope.findKeeperNames();

            } else {
                // 设置货位号为空.
                $scope.qualitycheck.warehouseId = null;
            }
        }

        //用于初检，验收，春秋普查，日常检查和第三方检查带出的保管员
        $scope.findKeeperNames = function () {
            //通过仓房号获取保管员，用于在第三方检查和日常检查中显示保管员的名字
            keeperService.getKeeperNamesByHouseId($scope.qualitycheck.houseId).then(function (data) {
                $scope.keeper = data;
                $scope.qualitycheck.keeper = $scope.keeper.keeperNames;
            }, function (data) {
                console.log(data);
            });
        }
        //得到分仓保管账中的信息
        $scope.changeGetInfo = function () {
            if ($scope.qualitycheck.houseId != null && $scope.qualitycheck.houseId != undefined && $scope.qualitycheck.houseId != ''
                && $scope.qualitycheck.warehouseId != null&& $scope.qualitycheck.warehouseId != undefined&& $scope.qualitycheck.warehouseId != '') {

                if($stateParams.checkType == 0){
                    //先判断表中是否已经存在初检，验收
                    qualitycheckService.findByStoreWarehouse($scope.qualitycheck.houseId,$scope.qualitycheck.warehouseId,$stateParams.checkType).then(function(data) {
                        if (data) {
                            alert("该仓已经初检,不能再次初检,您可以从列表中选择进行修改!");
                            $state.go('app.storage.qualitycheck.fck.fcklist', {type: 0});
                            return true;
                        }
                    },function(data){
                        console.log(data);
                    });
                }

                $scope.kcswStr = {ch : $scope.qualitycheck.houseId, hwh : $scope.qualitycheck.warehouseId, unitid : $rootScope.orgInfo.orgId};
                kcswService.getPageInfoOrRcsj( $scope.kcswStr).then(function(data){
                    //如果从分仓保管账查找到数据就取出赋值到对应的数据  否则清空上次的数据
                    if (typeof(data[0] ) != "undefined") {
                        $scope.keepaccount = data[0];//根据仓房和货位获取分仓保管账的降序的第一条记录
                        $scope.qualitycheck.subType = parseInt($scope.keepaccount.pz);//品种
                        $scope.qualitycheck.subTypeDetailed = parseInt($scope.keepaccount.mxpz);//明细品种
                        $scope.qualitycheck.number = $scope.keepaccount.kcsl;//数量
                        $scope.qualitycheck.harvestTime = $filter('date')($scope.keepaccount.rq, "yyyy");//收货年度
                        $scope.qualitycheck.inputTime = $filter('date')($scope.keepaccount.cjsj, "yyyy-MM-dd");//入仓时间
                        $scope.qualitycheck.quality = $scope.keepaccount.hwxz; //货位性质 (储粮性质)主要用于封仓管理中验证某个性质
                        $scope.qualitycheck.location = parseInt($scope.keepaccount.gb); //产地
                        //用于判断品种的检验标准依据的值  该值从词典枚举中取出的()
                        if ($scope.qualitycheck.subType == 3164) {
                            // 小麦
                            $scope.qualitycheck.inspectionStandardBasis = 5523;
                        } else if($scope.qualitycheck.subType == 3165) {
                            // 玉米
                            $scope.qualitycheck.inspectionStandardBasis = 5524;
                        }else if($scope.qualitycheck.subType == 3166) {
                            // 稻谷
                            $scope.qualitycheck.inspectionStandardBasis = 5526;
                        }else if($scope.qualitycheck.subType == 2777) {
                            // 大豆
                            $scope.qualitycheck.inspectionStandardBasis = 5525;
                        }else if($scope.qualitycheck.subType == 6905) {
                            // 粮油
                            $scope.qualitycheck.inspectionStandardBasis = 6908;
                        }

                    }else{
                        $scope.qualitycheck.subType="";//品种
                        $scope.qualitycheck.subTypeDetailed="";//明细品种
                        $scope.qualitycheck.number="";//数量
                        $scope.qualitycheck.harvestTime="";//收货年度
                        $scope.qualitycheck.inputTime="";//入仓日期
                    }
                },function(data){
                    console.log(data);
                });
            } else {

            }
        }

        $scope.qualitycheck = {};
        var houseId=$stateParams.houseId;
        var warehouseId=$stateParams.warehouseId;
        if ($stateParams.id != 0) {//说明是的查看和修改
            $scope.loadDataById($stateParams.id);
            //这些新增可以变动,修改不可以
            $("#houseNameDis").attr("disabled",true);
            $("#wareNameDis").attr("disabled",true);
            $("#keeps").attr("disabled",true);
        }else if(typeof(houseId)!="undefined" && typeof(warehouseId)!="undefined"){//如果仓号和货位号没有值说明是初检的 需要去输入 否则就是从初检取出数据进行下面的赋值
            qualitycheckService.findByStoreWarehouse(houseId,warehouseId,"0").then(function(data){
                //  $scope.qualitycheck = data;
                // $scope.qualitycheck.id = data.id;//传入Id用于更新该记录的状态
                $scope.qualitycheck.houseId = data.houseId;
                $scope.qualitycheck.warehouseId = data.warehouseId;
                $scope.qualitycheck.wareHouseName = data.wareHouseName;//货位名称
                $scope.qualitycheck.subType = data.subType; //品种
                $scope.qualitycheck.subTypeDetailed = data.subTypeDetailed;//品种明细
                $scope.qualitycheck.number=data.number;//数量
                $scope.qualitycheck.harvestTime=data.harvestTime+"";//收货年度
                $scope.qualitycheck.inputTime=$filter('date')(data.inputTime, "yyyy-MM-dd");//入仓时间
                $scope.qualitycheck.quality=data.quality;//储粮性质
                $scope.qualitycheck.location=data.location;//产地
                $scope.qualitycheck.keeper=data.keeper;//保管员

                $scope.qualitycheck.inspectionStandardBasis = parseInt(data.inspectionStandardBasis);//检验标准依据

                //通过仓房号获取保管员,用于春秋普查中显示保管员的名字
                //$scope.findKeeperNames();

            },function(data){
            });
        }else{
            var curDate=getNowFormatDate();
            $scope.qualitycheck.chooseTime=curDate;//扦样日期
            $scope.qualitycheck.checkTime=curDate;//检验日期
            $scope.qualitycheck.applyCheckTime=curDate;//申请验收日期

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

        // 提交表单
        var validator = $("#qualitycheck-form").validate();
        $scope.saveData = function (checktype) {
            if (validator.form()) {
                $scope.qualitycheck.type = checktype;
                $scope.qualitycheck.orgId = $rootScope.userInfo.orgId;
                $scope.qualitycheck.inspectionStandardBasis = parseInt($scope.qualitycheck.inspectionStandardBasis);
                $scope.qualitycheck.inputTime = $filter('date')($scope.qualitycheck.inputTime, "yyyy-MM-dd");
                $scope.qualitycheck.chooseTime = $filter('date')($scope.qualitycheck.chooseTime, "yyyy-MM-dd");
                $scope.qualitycheck.checkTime = $filter('date')($scope.qualitycheck.checkTime, "yyyy-MM-dd");
                $scope.qualitycheck.applyCheckTime = $filter('date')($scope.qualitycheck.applyCheckTime, "yyyy-MM-dd");
                $scope.qualitycheck.keeperAdvicesTime = $filter('date')($scope.qualitycheck.keeperAdvicesTime, "yyyy-MM-dd");
                $scope.qualitycheck.chiefAdvicesTime = $filter('date')($scope.qualitycheck.chiefAdvicesTime, "yyyy-MM-dd");
                $scope.qualitycheck.viceManagerAdvicesTime = $filter('date')($scope.qualitycheck.viceManagerAdvicesTime, "yyyy-MM-dd");
                $scope.qualitycheck.managerAdvicesTime = $filter('date')($scope.qualitycheck.managerAdvicesTime, "yyyy-MM-dd");
                $scope.qualitycheck.improveTime = $filter('date')($scope.qualitycheck.improveTime, "yyyy-MM-dd");
                $scope.qualitycheck.checkResultTime = $filter('date')($scope.qualitycheck.checkResultTime, "yyyy-MM-dd");
                $http({
                    method: 'POST',
                    url: APP_CONFIG.qualitycheckUrl + '/qualitycheck/save',
                    data: {
                        qualitycheckJson: angular.toJson($scope.qualitycheck),
                        qualityOneJson:angular.toJson($scope.addCheckSon)
                    }
                }).then(function successCallback(response) {
                    if (response.data.status == "success") {
                        alert("保存成功！");
                        //0:初检 1：验收 2：质量普查 3：出库
                        if (checktype == 0) {
                            $state.go('app.storage.qualitycheck.fck.fcklist',{type:0});
                        } else if (checktype == 1) {
                            $state.go('app.storage.qualitycheck.ack.acklist',{type:1});
                        } else if (checktype == 2) {
                            $state.go('app.storage.qualitycheck.spr.sprlist',{type:2});
                        } else if (checktype == 3) {
                            $state.go('app.storage.qualitycheck.out.outlist',{type:3});
                        } else if (checktype == 4) {
                            $state.go('app.storage.qualitycheck.daklist',{type:4});
                        } else if (checktype == 5) {
                            $state.go('app.storage.qualitycheck.trklist',{type:5});
                        }

                    } else {
                        alert("保存失败！");
                    }
                }, function errorCallback(response) {
                    // 请求失败执行代码
                });
            }
        }


        //获取当前的日期时间 格式“yyyy-MM-dd HH:mm:ss”
        function getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
            return currentdate;
        }

        // 新增一行
        $scope.addTR = function(qualitycheckId) {
            $scope.addCheckSon.push({qualitycheckId:qualitycheckId});
        }
        // 删除一行
        $scope.deleteTR = function(obj) {
            var index;
            // 如果有ID，说明当前数据已经是存在于数据库的，那么要郑重删除
            if (obj.id != undefined) {
                $scope.deleteSon(obj.id);
            }
            index = $scope.addCheckSon.indexOf(obj);
            $scope.addCheckSon.splice(index, 1);
        }

        $scope.deleteSon = function(id) {
            if (!confirm("当前数据已近存在于系统中，确定要删除吗？")) {
                return;
            }
            // 提交
            qualitycheckService.removeSon(id).then(function(data){
                if (data.status == 'success') {
                    alert("删除成功！");
                } else {
                    alert("删除失败！");
                }
            },function(data){
                console.log(data);
            });
        }
    })