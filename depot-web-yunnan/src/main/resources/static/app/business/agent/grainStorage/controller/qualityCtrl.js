"use strict";

angular.module('app.business')
    .controller("agentQualityCtrl", function($scope,$state,$rootScope,$uibModal, $http,$filter,StorehouseService,warehouseService,
          agentService, agentDepotService, $stateParams,agentQualityService, agentStorehouseService, FileUploader, APP_CONFIG) {

        $scope.dicDataList = $rootScope.dicDataList;

        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.search = {storehouseId:"", warehouseId:"",checkResult:null};

        if($stateParams.checkResult != null){
            $scope.search.checkResult = $stateParams.checkResult;
        }
        $scope.loadData = function() {
            agentQualityService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$stateParams.type, $scope.search.checkResult,
                $scope.search.agentId,$scope.search.agentDepotId,$scope.search.storehouseId, $scope.search.warehouseId).then(function(data){
                $scope.pageInfo = data;

                //获取代储点名称--下拉
                $scope.pageAgent = {pageNum : 1, pageSize : 100};
                agentService.getPageInfo($scope.pageAgent.pageNum, $scope.pageAgent.pageSize, "", $rootScope.orgInfo.orgId).then(function(data){
                    $scope.agentData = data;
                },function(data){
                    console.log();
                });
            },function(data){
                console.log(data);
            });
        }

        $scope.getAgentDepotData = function(agentId){
            if(agentId != null){
                //获取代储库名称做成下拉列表；
                agentDepotService.getPageInfo("1", "100", "",agentId).then(function(data){
                    $scope.depotList = data.list.map(function(item) {
                        return {
                            depotId: item.id,
                            depotName: item.agentDepotName
                        }
                    });
                },function(data){
                    console.log(data);
                });
            }else{
                $scope.depotList = {};
            }
        };

        $scope.orgIds;
        //根据代储库获取仓房列表
        $scope.getHouseList = function(depotId) {
            if(depotId != null){
                agentStorehouseService.getDepotToStoreList($rootScope.orgInfo.orgId, depotId).then(function(data){
                    for (var i = 0; i < $scope.depotList.length; i++) {
                        if($scope.depotList[i].depotId == depotId){
                            $scope.orgIds = $scope.depotList[i].orgId;
                            $scope.storehouseList = data;
                        }
                    }
                },function(data){
                    console.log(data);
                })
            }else{
                $scope.storehouseList = {};
            }
        };

        //根据仓房获取货位列表
        $scope.getWareList = function(houseId) {
            if(houseId != null){
                //按照单位获取单位下的仓房信息
                agentStorehouseService.getStorehouse($scope.orgIds, houseId).then(function(data){
                    $scope.warelist = data.wareList;  //下拉列表数据
                },function (data) {
                    console.log(data);
                });
            }else{
                $scope.warelist = {};
            }
        }
        $scope.loadData();

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
                $state.go('app.business.agent.grainStorage.quality.fck.fckadd', {id:0,checkType:0,isNotEdit:false});
            }, function errorCallback(response) {
            });
        }

        //修改编辑页面
        $scope.showEditFck = function (id) {
            $state.go('app.business.agent.grainStorage.quality.fck.fckedit',{id:id,isNotEdit:false});
        }

        // 查看页面
        $scope.showViewFck = function(id,stateType,storeName,wareName) {
            if(stateType == '0'){
                $state.go('app.business.agent.grainStorage.quality.fck.fckedit',{id:id,isNotEdit:true});
            }else if(stateType == '1'){
                $state.go('app.storage.qualitycheck.fck.fckedit',{id:id,isNotEdit:true,storeName:storeName,wareName:wareName});
            }
        }
//------------------粮食初检信息结束--------------------//

//------------------粮食验收信息开始--------------------//
        // 显示增加页面
        $scope.showAddAck = function (id,houseId,warehouseId) {
            $state.go('app.business.agent.grainStorage.quality.ack.ackadd', {id:0,houseId:houseId,warehouseId:warehouseId,isNotEdit:false});
        }
        //修改编辑页面
        $scope.showEditAck = function (id) {
            $state.go('app.business.agent.grainStorage.quality.ack.ackedit',{id:id,isNotEdit:false});
        }
        // 查看页面
        $scope.showViewAck = function(id,stateType,storeName,wareName) {
            if(stateType == '0'){
                $state.go('app.business.agent.grainStorage.quality.ack.ackedit',{id:id,isNotEdit:true});
            }else if(stateType == '1'){
                $state.go('app.storage.qualitycheck.ack.ackedit',{id:id,isNotEdit:true,storeName:storeName,wareName:wareName});
            }
        }
        //从验收页面点击新增按钮弹出初检的列表 让选择验收那条记录
        $scope.showFirstCheckPage = function () {
            /*   var isActFlag = false;
             $state.go('app.business.agent.grainStorage.quality.fck.fcklist',{type:0,isActFlag:false});*/
            var params = [];
            params.type = 0;//查询初检的列表
            var uibModalInstance = $uibModal.open({
                size:'lg',
                templateUrl: 'app/business/agent/grainStorage/views/quality/accept-first-list.html',
                controller: 'agentSprModalCtrl',
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
        $scope.showAddSpr = function (houseId,warehouseId) {
            $state.go('app.business.agent.grainStorage.quality.spr.spradd', {id:0,houseId:houseId,warehouseId:warehouseId,isNotEdit:false});
        }
        //修改编辑页面
        $scope.showEditSpr = function (id) {
            $state.go('app.business.agent.grainStorage.quality.spr.spredit',{id:id,isNotEdit:false});
        }
        //新增
        $scope.showAcctCheckPage = function () {
            $state.go('app.business.agent.grainStorage.quality.spr.spradd', {id:0,isNotEdit:false});
        }
        // 查看页面
        $scope.showViewSpr = function(id,stateType,storeName,wareName) {
            if(stateType == '0'){
                $state.go('app.business.agent.grainStorage.quality.spr.spredit',{id:id,isNotEdit:true});
            }else if(stateType == '1'){
                $state.go('app.storage.qualitycheck.spr.spredit',{id:id,isNotEdit:true,storeName:storeName,wareName:wareName});
            }
        }
//------------------春秋普查信息结束--------------------//
//------------------日常检查开始--------------------//
        $scope.showAddDak = function () {
            $state.go('app.business.agent.grainStorage.quality.dakadd', {id:0,isNotEdit:false});
        }
        //修改编辑页面
        $scope.showEditDak = function (id) {
            $state.go('app.business.agent.grainStorage.quality.dakedit',{id:id,isNotEdit:false});
        }
        // 查看页面
        $scope.showViewDak = function(id,stateType,storeName,wareName) {
            if(stateType == '0'){
                $state.go('app.business.agent.grainStorage.quality.dakedit',{id:id,isNotEdit:true});
            }else if(stateType == '1'){
                $state.go('app.storage.qualitycheck.dakedit',{id:id,isNotEdit:true,storeName:storeName,wareName:wareName});
            }
        }
//------------------日常检查结束--------------------//

//------------------第三方检查开始--------------------//
        $scope.showAddTrk = function () {
            $state.go('app.business.agent.grainStorage.quality.trkadd', {id:0,isNotEdit:false});
        }
        //修改编辑页面
        $scope.showEditTrk = function (id) {
            $state.go('app.business.agent.grainStorage.quality.trkedit',{id:id,isNotEdit:false});
        }
        // 查看页面
        $scope.showViewTrk = function(id,stateType,storeName,wareName) {
            if(stateType == '0'){
                $state.go('app.business.agent.grainStorage.quality.trkedit',{id:id,isNotEdit:true});
            }else if(stateType == '1'){
                $state.go('app.storage.qualitycheck.trkedit',{id:id,isNotEdit:true,storeName:storeName,wareName:wareName});
            }
        }
//------------------第三方检查结束--------------------//

//------------------粮食出库信息开始--------------------//
        $scope.showAddOut = function () {
            $state.go('app.business.agent.grainStorage.quality.out.outadd', {id:0,isNotEdit:false});
        }
        //修改编辑页面
        $scope.showEditOut = function (id) {
            $state.go('app.business.agent.grainStorage.quality.out.outedit',{id:id,isNotEdit:false});
        }
        // 查看页面
        $scope.showViewOut = function(id,stateType,storeName,wareName) {
            if(stateType == '0'){
                $state.go('app.business.agent.grainStorage.quality.out.outedit',{id:id,isNotEdit:true});
            }else if(stateType == '1'){
                $state.go('app.storage.qualitycheck.out.outedit',{id:id,isNotEdit:true,storeName:storeName,wareName:wareName});
            }
        }

//------------------粮食出库信息结束--------------------//
        // 根据id删除信息
        $scope.remove = function(id) {
            agentQualityService.removeById(id).then(function (data) {
                if(data.msg == "success"){
                    alert("删除成功");
                    $scope.loadData();
                }else{
                    alert("删除失败");
                }
            });
        }

        // 文件上传实例
        $scope.uploader = new FileUploader({
            url : APP_CONFIG.agentUrl + '/agentQuality/importFile',
            autoUpload : true, // 将文件添加到队列后自动上传
            formData : [{fileType:'xlsx',orgId:$rootScope.orgInfo.orgId,checktype:$stateParams.type}], // 与文件一起发送的数据
            removeAfterUpload : true, // 从队列上传后删除文件
            // 上传进度
            onProgressItem : function(fileItem, progress) {
                // $scope.jd = progress + "%";
                console.info("正在上传：" + progress + "%");
            },
            // 回调函数，在一个文件上传成功后触发
            onSuccessItem : function(fileItem, response, status, headers) {
                if(fileItem.isSuccess && response.errormsg == ''){
                    alert("导入成功！");
                } else {
                    alert(response.errormsg);
                }
                $scope.loadData();
            }
        });
    })
    .controller("agentQualitySaveCtrl", function($scope,$state, $http, $stateParams, StorehouseService, warehouseService, keeperService,agentStorehouseService,
                                                 $timeout, agentService, agentDepotService, $rootScope, $filter, enumService, agentQualityService,keepAccountService, APP_CONFIG) {
        $scope.qualitycheck = null;

        $scope.loadDataById = function(id) {
            agentQualityService.loadDataById(id).then(function(data){
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

                $scope.getAgentDepotData(data.agentId);
                $scope.getHouseList(data.agentDepotId);
                $timeout(function () {
                    $scope.getWareList(data.storehouseId);
                },600);
                $scope.getGrainDetailKind();//加载明细品种
                $scope.getQualityData();//加载粮食性质
                $scope.edit();
            },function(data){
            });
        }

        $scope.getEditData = function(){
            //获取代储点名称
            agentService.getPageInfo("1", "100", "", $rootScope.orgInfo.orgId).then(function(data){
                $scope.agentData = data;
            },function(data){
                console.log();
            });
        };
        $scope.getEditData();

        $scope.getAgentDepotData = function(agentId){
            if(agentId != null){
                //获取代储库名称做成下拉列表；
                agentDepotService.getAgentDepotHouse("",agentId).then(function(data){
                    $scope.depotList = data.map(function(item) {
                        return {
                            depotId: item.id,
                            depotName: item.agentDepotName
                        }
                    });
                },function(data){
                    console.log(data);
                });
            }else{
                $scope.depotList = {};
            }
        };

        $scope.orgIds;
        //根据代储库获取仓房列表
        $scope.getHouseList = function(depotId) {
            if(depotId != null){
                agentStorehouseService.getDepotToStoreList($rootScope.orgInfo.orgId, depotId).then(function(data){
                    for (var i = 0; i < $scope.depotList.length; i++) {
                        if($scope.depotList[i].depotId == depotId){
                            $scope.orgIds = $scope.depotList[i].orgId;
                            $scope.storehouseList = data;
                        }
                    }
                },function(data){
                    console.log(data);
                });
            }else{
                $scope.storehouseList = {};
            }
        };

        //根据仓房获取货位列表
        $scope.getWareList = function(houseId) {
            if(houseId != null){
                //按照单位获取单位下的仓房信息
                agentStorehouseService.getStorehouse($scope.orgIds, houseId).then(function(data){
                    $scope.warelist = data.wareList;  //下拉列表数据

                },function (data) {
                    console.log(data);
                });
                //
                // for (var i = 0; i < $scope.storehouseList.length; i++) {
                //     if(houseId == $scope.storehouseList[i].storehouseId){
                //         $scope.qualitycheck.keeper = $scope.storehouseList[i].dutystoreman;
                //     }
                // }
            }else{
                $scope.warelist = {};
                // 设置货位号为空.
                $scope.qualitycheck.warehouseId = null;
            }
        };

        $scope.addCheckSon = [];//用于定义保存检测信息的孩子
        //取出子表数据  根据主表id()
// 新增或修改保管员信息跳转页面加载数据
        $scope.edit = function() {
            var qcSonId=$stateParams.id;//接收主表的id关联着子表的ktId
            agentQualityService.findQualitycheckSonByQcSonId(qcSonId).then(function (data) {
                for (var i=0; i < data.length; i++) {
                    $scope.addCheckSon.push(angular.copy(data[i]));
                }
            })
        }

        //根据粮食品种修改数值
        $scope.getVarietiesData = function() {
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

            $scope.getGrainDetailKind();
        };

        // 树形下拉框(明细品种)
        $scope.getGrainDetailKind = function() {
            enumService.getTreeListByTypeId($scope.qualitycheck.subTypeDetailed, $scope.qualitycheck.subType).then(function(data) {
                $scope.grainDetailKindTreeData = data;
            },function(data) {
                console.log(data);
            })
        };

        // 树形下拉框(粮食性质)
        $scope.getQualityData = function() {
            var deviceTypeId = 1032;
            enumService.getTreeListByTypeId($scope.qualitycheck.quality, deviceTypeId).then(function(data) {
                var data_new = $scope.data_add(data);
                $scope.grainAttributeTreeData = data_new;
            },function(data) {
                console.log(data);
            });
        };

        //得到分仓保管账中的信息
        $scope.changeGetInfo = function () {
            if ($scope.qualitycheck.storehouseId != null && $scope.qualitycheck.storehouseId != undefined && $scope.qualitycheck.storehouseId != ''
                && $scope.qualitycheck.warehouseId != null&& $scope.qualitycheck.warehouseId != undefined&& $scope.qualitycheck.warehouseId != '') {

                //只有是初检或者验收的时候才执行下面的方法
                if($stateParams.checkType == 0 || $stateParams.checkType == 1){
                    //先判断表中是否已经存在初检，验收
                    agentQualityService.findByStoreWarehouse($scope.qualitycheck.storehouseId,$scope.qualitycheck.warehouseId,$stateParams.checkType).then(function(data) {
                        //$scope.qualitycheck = data;
                        if (data) {
                            if ($stateParams.checkType == 0) {
                                alert("该仓已经初检,不能再次初检,您可以从列表中选择进行修改!");
                                $state.go('app.business.agent.grainStorage.quality.fck.fcklist', {type: 0});
                            } else if ($stateParams.checkType == 1) {
                                alert("该仓已经验收,不能再次验收,您可以从列表中选择进行修改!");
                                $state.go('app.business.agent.grainStorage.quality.ack.acklist', {type: 1});
                            }
                            return true;
                        }
                    },function(data){
                        console.log(data);
                    });
                }
            }
        }

        $scope.qualitycheck = {};
        var houseId=$stateParams.houseId;
        var warehouseId=$stateParams.warehouseId;
        if ($stateParams.id != 0) {//说明是的查看和修改
            $scope.loadDataById($stateParams.id);
            $scope.getQualityData();
        }else if(typeof(houseId)!="undefined" && typeof(warehouseId)!="undefined"){//如果仓号和货位号没有值说明是初检的 需要去输入 否则就是从初检取出数据进行下面的赋值
            agentQualityService.findByStoreWarehouse(houseId,warehouseId,"0").then(function(data){
                //  $scope.qualitycheck = data;
                // $scope.qualitycheck.id = data.id;//传入Id用于更新该记录的状态
                $scope.qualitycheck.number=data.number;//数量
                $scope.qualitycheck.harvestTime=data.harvestTime;//收货年度
                $scope.qualitycheck.inputTime=$filter('date')(data.inputTime, "yyyy-MM-dd");//入仓时间
                $scope.qualitycheck.quality=data.quality;//储粮性质
                $scope.qualitycheck.location=data.location;//产地
                $scope.qualitycheck.agentId = data.agentId;
                $scope.qualitycheck.agentDepotId = data.agentDepotId;
                $scope.qualitycheck.storehouseId = data.storehouseId;
                $scope.qualitycheck.warehouseId = data.warehouseId;
                $scope.qualitycheck.subType = data.subType; //品种
                $scope.qualitycheck.subTypeDetailed = data.subTypeDetailed;//品种明细
                $scope.qualitycheck.keeper = data.keeper;//保管员

                $scope.qualitycheck.inspectionStandardBasis = parseInt(data.inspectionStandardBasis);//检验标准依据

                $scope.getAgentDepotData(data.agentId);
                $scope.getHouseList(data.agentDepotId);
                $timeout(function () {
                    $scope.getWareList(data.storehouseId);
                },600);
                $scope.getGrainDetailKind();//加载明细品种

                $scope.getQualityData();

            },function(data){
            });
        }else{
            var curDate=getNowFormatDate();
            $scope.qualitycheck.chooseTime=curDate;//扦样日期
            $scope.qualitycheck.checkTime=curDate;//检验日期
            $scope.qualitycheck.applyCheckTime=curDate;//申请验收日期

            $scope.getQualityData();
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
                $scope.qualitycheck.subTypeDetailed = parseInt($scope.qualitycheck.subTypeDetailed[0].id);
                if(typeof($scope.qualitycheck.quality) != "undefined"){
                    $scope.qualitycheck.quality = parseInt($scope.qualitycheck.quality[0].id);
                }
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
                    url: APP_CONFIG.agentUrl + '/agentQuality/save',
                    data: {
                        qualitycheckJson: angular.toJson($scope.qualitycheck),
                        qualityOneJson:angular.toJson($scope.addCheckSon)
                    }
                }).then(function successCallback(response) {
                    if (response.data.status == "success") {
                        alert("保存成功！");
                        //0:初检 1：验收 2：质量普查 3：出库
                        if (checktype == 0) {
                            $state.go('app.business.agent.grainStorage.quality.fck.fcklist',{type:0});
                        } else if (checktype == 1) {
                            $state.go('app.business.agent.grainStorage.quality.ack.acklist',{type:1});
                        } else if (checktype == 2) {
                            $state.go('app.business.agent.grainStorage.quality.spr.sprlist',{type:2});
                        } else if (checktype == 3) {
                            $state.go('app.business.agent.grainStorage.quality.out.outlist',{type:3});
                        } else if (checktype == 4) {
                            $state.go('app.business.agent.grainStorage.quality.daklist',{type:4});
                        } else if (checktype == 5) {
                            $state.go('app.business.agent.grainStorage.quality.trklist',{type:5});
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
            agentQualityService.removeSon(id).then(function(data){
                if (data.status == 'success') {
                    alert("删除成功！");
                } else {
                    alert("删除失败！");
                }
            },function(data){
                console.log(data);
            });
        }

        $scope.data_add = function(data) {
            var e = [];
            if (data.length != 0) {
                //要插入的json对象串
                var newObj = {"id":null,"name":"请选择","children":[]};
                //将返回的json对象和要插入的json对象串转换为字符串格式
                var f = angular.toJson(newObj);
                var b = angular.toJson(data);
                //把要插入的json对象串插入返回数据的最前面
                var c = b.substring(0,1);
                var d = b.substring(1,b.length);
                e = c + f + "," + d;
            }
            //最后在转换为json对象返回去
            return angular.fromJson(e);
        }
    })
    .controller("agentSprModalCtrl", function($scope, $uibModalInstance, $state,$filter, $http, $uibModal,agentQualityService,$stateParams, APP_CONFIG, items) {

        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        // 获取列表数据
        $scope.loadData = function(pageNum) {
            $http({
                method: 'GET',
                url: APP_CONFIG.agentUrl + '/agentQuality/getList',
                params: {
                    pageNum : pageNum,
                    pageSize : 10,
                    //type可以取的值：0:初检 1：验收 2：春秋普查 3：出库检验 4：日常检验 5：第三方检查
                    checktype:items.type
                }
            }).then(function successCallback(response) {
                // 请求成功执行代码
                $scope.pageInfo = response.data;
            }, function errorCallback(response) {
                // 请求失败执行代码
                console.log(response);
            });
        }
        // 默认执行.
        $scope.loadData(1);

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
        // 选择一个初检信息进行验收
        $scope.showAddAck = function (id,houseId,warehouseId) {
            $uibModalInstance.close();//跳转之前关闭提示框
            $state.go('app.business.agent.grainStorage.quality.ack.ackadd', {id:0,houseId:houseId,warehouseId:warehouseId,isNotEdit:false});
        }
    });