"use strict";

angular.module('app.business')
    .controller("agentNumberCtrl", function($scope, $rootScope, $http, $state, agentNumberService, FileUploader,agentService, agentDepotService,
               warehouseService, StorehouseService, agentBgmxzService, agentStorehouseService, kcswService, APP_CONFIG) {
        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.grainStorageNumber = {};
        $scope.loadData = function() {
            agentNumberService.getGrainStorageNumberData($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.grainStorageNumber, $rootScope.orgInfo.orgId)
            .then(function(data){
                $scope.pageInfo = data;

                //获取代储点名称
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
            $state.go('app.business.agent.grainStorage.numberEdit',{id:id,type:type});
        };

        // 同步代储库保管明细账数据
        $scope.synchro = function() {
        	//查询代储库仓房货位信息
        	agentBgmxzService.selectAgentHouseWareList($rootScope.orgInfo.orgId,"kcsw").then(function (data) {
                var data = data.strResult;
        		if(data != null && "" != data){
                    //把数据传到出入库用做条件拿到明细账数据传回来
                    //把传回来的数据在插入到代储点的保管明细账表中
                    agentNumberService.editCrkKcswData(angular.toJson(data), $rootScope.orgInfo.orgId, $rootScope.userInfo.realName).then(function(agentNumberData){
//        						alert(agentNumberData.msg);
//        						if (agentNumberData.status == "200") {
//        						}
                        $scope.loadData();
                    },function(agentNumberData){
                        console.log(agentNumberData);
                    });
                    }
            },function(data){
                console.log(data);
            });
        };

        // 根据id删除信息
        $scope.remove = function(id) {
            agentNumberService.removeById(id).then(function (data) {
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

        // 文件上传实例
        $scope.uploader = new FileUploader({
            url : APP_CONFIG.agentUrl + '/agentNumber/importFile',
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
    .controller("agentNumberSaveCtrl", function($scope, $http, $state, $stateParams, $rootScope, $filter, FileUploader, agentNumberService, agentService,
         agentStorehouseService, agentDepotService, StorehouseService, warehouseService, enumService) {
        $scope.disabled = false;
        $scope.isShow = "1";
        $scope.agentNumberEdit = {};
        $scope.loadDataById = function(id) {
            agentNumberService.getAgentNumberEdit(id).then(function(data){
                $scope.getEditData();+
                $scope.getAgentDepotData(data.agentId);
                $scope.getHouseList(data.agentDepotId);
                $scope.getWareList(data.storehouseId);

                $scope.agentNumberEdit = data;
                $scope.agentNumberEdit.crkTime = $filter('date')($scope.agentNumberEdit.crkTime, "yyyy-MM-dd");

                $("#agentNumber-form input").attr("disabled",$scope.disabled );
                $("#agentNumber-form select").attr("disabled",$scope.disabled );

                $scope.getTreeListByTypeId();
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

        $scope.getTreeListByTypeId = function(){
            // 树形下拉框(粮食性质)
            var deviceTypeId = 1032;
            enumService.getTreeListByTypeId($scope.agentNumberEdit.nature, deviceTypeId).then(function(data) {
                var data_new = $scope.data_add(data);
                $scope.grainAttributeTreeData = data_new;
            },function(data) {
                console.log(data);
            });
        };

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
            $scope.getTreeListByTypeId();
        }

        $scope.getEmptying = function () {
            $scope.agentNumberEdit = {};
            $state.go('app.business.agent.grainStorage.numberList');
        };

        // 新增或修改保存数据
        var validator = $("#agentNumber-form").validate();
        $scope.saveData = function() {
            if (validator.form()) {
                $scope.agentNumberEdit.nature = $scope.agentNumberEdit.nature[0].id;
                var dates = angular.toJson($scope.agentNumberEdit);
                agentNumberService.saveAndUpdata(dates).then(function (data) {
                    if (data.status == "success") {
                        alert("保存成功");
                        $state.go('app.business.agent.grainStorage.numberList');
                    } else {
                        alert("保存失败");
                    }
                });
            }
        };

        $scope.retList = function(){
            $rootScope.back();
        };

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
    });