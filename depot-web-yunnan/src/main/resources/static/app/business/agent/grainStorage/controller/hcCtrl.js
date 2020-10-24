"use strict";

angular.module('app.business')
    .controller("agentHcCtrl", function($scope, $rootScope, $http, $state, agentHcService, FileUploader,agentService, agentDepotService,
               warehouseService, StorehouseService, agentStorehouseService, crkRecordService, APP_CONFIG) {
        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.grainStorageHc = {};
        $scope.loadData = function() {
            agentHcService.getGrainStorageHCData($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.grainStorageHc, $rootScope.orgInfo.orgId)
            .then(function(data){
                $scope.pageInfo = data;

                //获取代储点名称--下拉
                $scope.pageAgent = {pageNum : 1, pageSize : 100};
                agentService.getPageInfo($scope.pageAgent.pageNum, $scope.pageAgent.pageSize, "", $rootScope.orgInfo.orgId).then(function(data){
                    $scope.agentData = data;
                },function(data){
                    console.log();
                });
            },function(data){
                console.log();
            });
        };
        $scope.loadData();

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

        // 修改或者查看用户信息
        $scope.showEdit = function(id,type) {
            $state.go('app.business.agent.grainStorage.crk.trainEdit',{id:id,type:type});
        };

        // 根据id删除信息
        $scope.remove = function(id) {
            agentHcService.removeById(id).then(function (data) {
                if(data.status == "success"){
                    alert("删除成功");
                    $scope.loadData();
                }else{
                    alert("删除失败");
                }
            });
        };
        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        };

        // 同步代储库火车出入库记录数据
        $scope.synchro = function() {
        	//查询代储库仓房货位信息
        	agentHcService.selectAgentHouseWareList($rootScope.orgInfo.orgId).then(function (data) {
                var data = data.strResult;
        		if(data != null && "" != data){
                    //把数据传到出入库用做条件拿到明细账数据传回来
                    //把传回来的数据在插入到代储点的火车出入库记录表中
                    agentHcService.editHcCrkRecordData(angular.toJson(data), $rootScope.orgInfo.orgId, $rootScope.userInfo.realName).then(function(agentHcData){
                        $scope.loadData();
                    },function(agentHcData){
                        console.log(agentHcData);
                    });
                }
            },function(data){
                console.log(data);
            });
        };

        // 文件上传实例
        $scope.uploader = new FileUploader({
            url : APP_CONFIG.agentUrl + '/agentHc/importFile',
            autoUpload : true, // 将文件添加到队列后自动上传
            formData : [{fileType:'xlsx',orgId:$rootScope.orgInfo.orgId}], // 与文件一起发送的数据
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
    .controller("agentHcSaveCtrl", function($scope, $http, $state, $stateParams, $rootScope, $filter, FileUploader, agentHcService, agentService,
                                            agentStorehouseService, agentDepotService) {
        $scope.disabled = false;
        $scope.isShow = "1";
        $scope.loadDataById = function(id) {
            agentHcService.getAgentHcEdit(id).then(function(data){
                $scope.getEditData();
                $scope.getAgentDepotData(data.agentId,data.agentDepotId);
                $scope.getWareList(data.storehouseId);

                $scope.agentHcEdit = data;
                $scope.agentHcEdit.crkTime = $filter('date')($scope.agentHcEdit.crkTime, "yyyy-MM-dd");

                $("#agentHc-form input").attr("disabled",$scope.disabled );
                $("#agentHc-form select").attr("disabled",$scope.disabled );
            },function(data){
                console.log();
            });
        };

        $scope.getEditData = function(){
            //获取代储点名称
            agentService.getPageInfo("1", "100", "", $rootScope.orgInfo.orgId).then(function(data){
                $scope.agentData = data;
            },function(data){
                console.log();
            });
        };

        $scope.getAgentDepotData = function(agentId,depotId){
            if(agentId != null){
                //获取代储库名称做成下拉列表；
                agentDepotService.getAgentDepotHouse("",agentId).then(function(data){
                    $scope.depotList = data.map(function(item) {
                        return {
                            depotId: item.id,
                            depotName: item.agentDepotName
                        }
                    });
                    $scope.getHouseList(depotId);
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
            }else{
                $scope.warelist = {};
            }
        };

        if($stateParams.id != null && $stateParams.type == "edit"){//修改页面查询后台数据，并且赋值页面
            $scope.loadDataById($stateParams.id);
        }else if($stateParams.type == "detail"){//详情页面
            $scope.loadDataById($stateParams.id);
            $scope.disabled = true;
            $scope.isShow = "0";
        }else{//新增页面，不进行操作；
            $scope.getEditData();
        }

        $scope.getEmptying = function () {
            $scope.agentHcEdit = {};
            $state.go('app.business.agent.grainStorage.crk.trainList');
        };

        // 新增或修改保存数据
        var validator = $("#agentHc-form").validate();
        $scope.saveData = function() {
            if (validator.form()) {
                var dates = angular.toJson($scope.agentHcEdit);
                agentHcService.saveAndUpdata(dates).then(function (data) {
                    if (data.status == "success") {
                        alert("保存成功");
                        $state.go('app.business.agent.grainStorage.crk.trainList');
                    } else {
                        alert("保存失败");
                    }
                });
            }
        };

        $scope.retList = function(){
            $rootScope.back();
        };
    });