"use strict";
angular.module('app.business').controller("agentTemperatureCtrl", function ($scope, $rootScope, $http, $state, $uibModal, agentTemperatureService, FileUploader, agentService,
        agentStorehouseService, agentDepotService, warehouseService, StorehouseService, APP_CONFIG) {
    // 获取列表数据
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    $scope.grainStorageTemperature = {};
    $scope.loadData = function () {
        agentTemperatureService.getGrainStorageTemperatureData($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,
            $scope.grainStorageTemperature, $scope.temperId, $rootScope.orgInfo.orgId).then(function (data) {
                $scope.pageInfo = data;

                //获取代储点名称
                $scope.pageAgent = {pageNum: 1, pageSize: 100};
                agentService.getPageInfo($scope.pageAgent.pageNum, $scope.pageAgent.pageSize, "", $rootScope.orgInfo.orgId).then(function (data) {
                    $scope.agentData = data;
                }, function (data) {
                    console.log(data);
                });
            }, function (data) {
                console.log(data);
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

    //根据代储库获取仓房列表
    $scope.getHouseList = function (depotId) {
        if (depotId != null) {
            agentStorehouseService.getDepotToStoreList($rootScope.orgInfo.orgId, depotId).then(function(data){
                $scope.storehouseList = data;
            }, function (data) {
                console.log(data);
            })
        } else {
            $scope.storehouseList = {};
        }
    };

    // 修改用户信息
    $scope.showEdit = function (id) {
        $state.go('app.business.agent.temperature.dataEdit', {id: id});
    };

    // 详情(层温)
    $scope.grainTemperatureDetail = function (temperature) {
        var params = [];
        params.id = temperature.id;
        params.sign = temperature.sign;
        params.storehouseName = temperature.storehouseName;
        params.detectionTime = temperature.detectionTime;
        params.storehouseType = temperature.storehouseType;
        params.designCapacity = temperature.designCapacity;
        params.enterTime = temperature.enterTime;
        params.lspz = temperature.lspz;
        params.nature = temperature.nature;
        params.level = temperature.level;
        params.actualAmount = temperature.actualAmount;
        params.harvestYear = temperature.harvestYear;
        params.keeper = temperature.keeper;
        params.houseTemperature = temperature.houseTemperature;
        params.houseHumidity = temperature.houseHumidity;
        params.avg = temperature.avg;
        params.gasTemperature = temperature.gasTemperature;
        params.max = temperature.max;
        params.gasHumidity = temperature.gasHumidity;
        params.min = temperature.min;
        params.agentDepotName = temperature.agentDepotName;
        $uibModal.open({
            size: 'lg',
            templateUrl: 'app/business/agent/temperature/views/temperatureDetection-model.html',
            controller: 'temperatureDetectionModel',
            resolve: {
                // 传入参数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params;
                }
            }
        });
    };

    // 根据id删除信息
    $scope.remove = function (id) {
        agentTemperatureService.removeById(id).then(function (data) {
            if (data.status == "success") {
                alert("删除成功");
                $scope.loadData();
            } else {
                alert("删除失败");
            }
        });
    };
    // 翻页
    $scope.goPage = function(pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

    // 文件上传实例
    $scope.uploader = new FileUploader({
        url: APP_CONFIG.agentUrl + '/agentTemperature/importFile',
        autoUpload: true, // 将文件添加到队列后自动上传
        formData: [{fileType: 'xlsx', orgId: $rootScope.orgInfo.orgId}], // 与文件一起发送的数据
        removeAfterUpload: true, // 从队列上传后删除文件
        // 上传进度
        onProgressItem: function (fileItem, progress) {
            // $scope.jd = progress + "%";
            console.info("正在上传：" + progress + "%");
        },
        // 回调函数，在一个文件上传成功后触发
        onSuccessItem: function (fileItem, response, status, headers) {
            if (fileItem.isSuccess && response.errormsg == '') {
                alert("导入成功！");
            } else {
                alert(response.errormsg);
            }
            $scope.loadData();
        }
    });
})
.controller("agentTemperatureSaveCtrl", function ($scope, $http, $state, $stateParams, $rootScope, $filter, FileUploader, agentTemperatureService, agentService,
      agentStorehouseService, agentDepotService, StorehouseService, warehouseService, enumService) {
    $scope.disabled = false;
    $scope.isShow = "1";
    $scope.agentTemperatureEdit = {};
    $scope.addCheckSon = [];//用于定义保存检测信息的孩子

    $scope.loadDataById = function (id) {
        agentTemperatureService.getAgentTemperatureEdit(id).then(function (data) {
            $scope.getEditData();
            $scope.getAgentDepotData(data.agentTemper.agentId);
            $scope.getHouseList(data.agentTemper.agentDepotId);

            $scope.agentTemperatureEdit = data.agentTemper;
            $scope.agentTemperatureEdit.enterTime = $filter('date')($scope.agentTemperatureEdit.enterTime, "yyyy-MM-dd");
            $scope.agentTemperatureEdit.detectionTime = $filter('date')($scope.agentTemperatureEdit.detectionTime, "yyyy-MM-dd");

            $("#agentTemperature-form input").attr("disabled", $scope.disabled);
            $("#agentTemperature-form select").attr("disabled", $scope.disabled);

            // 树形下拉框(粮食性质)
            var deviceTypeId = 1032;
            enumService.getTreeListByTypeId($scope.agentTemperatureEdit.nature, deviceTypeId).then(function (data) {
                var data_new = $scope.data_add(data);
                $scope.grainAttributeTreeData = data_new;
            }, function (data) {
                console.log(data);
            });

            for (var i = 0; i < data.tPoints.length; i++) {
                $scope.addCheckSon.push(angular.copy(data.tPoints[i]));
            }
        }, function (data) {
            console.log();
        });
    };

    $scope.getEditData = function () {
        //获取代储点名称
        agentService.getPageInfo("1", "100", "", $rootScope.orgInfo.orgId).then(function (data) {
            $scope.agentData = data;
        }, function (data) {
            console.log();
        });
    };

    $scope.getAgentDepotData = function (agentId) {
        if (agentId != null) {
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
        } else {
            $scope.depotList = {};
        }
    };

    //根据代储库获取仓房列表
    $scope.getHouseList = function (depotId) {
        if (depotId != null) {
            agentStorehouseService.getDepotToStoreList($rootScope.orgInfo.orgId, depotId).then(function(data){
                $scope.storehouseList = data;
            }, function (data) {
                console.log(data);
            });
        } else {
            $scope.storehouseList = {};
        }
    };

    // 树形下拉框(粮食性质)
    $scope.getQualityData = function () {
        var deviceTypeId = 1032;
        enumService.getTreeListByTypeId($scope.agentTemperatureEdit.nature, deviceTypeId).then(function (data) {
            var data_new = $scope.data_add(data);
            $scope.grainAttributeTreeData = data_new;
        }, function (data) {
            console.log(data);
        });
    };

    if ($stateParams.id != null) {//修改页面查询后台数据，并且赋值页面
        $scope.loadDataById($stateParams.id);
        $scope.getQualityData();
    } else {//新增页面，不进行操作；
        $scope.getEditData();
        $scope.getQualityData();
    }

    $scope.getEmptying = function () {
        $scope.agentTemperatureEdit = {};
        $state.go('app.business.agent.temperature.dataList');
    };

    // 新增或修改保存数据
    var validator = $("#agentTemperature-form").validate();
    $scope.saveData = function () {
        if (validator.form()) {
            $scope.agentTemperatureEdit.nature = $scope.agentTemperatureEdit.nature[0].id;
            $scope.agentTemperatureEdit.tPoints = angular.toJson($scope.addCheckSon);
            var agentTemperatureJson = angular.toJson($scope.agentTemperatureEdit);
            agentTemperatureService.saveAndUpdata(agentTemperatureJson).then(function (data) {
                if (data.status == "success") {
                    alert("保存成功");
                    $state.go('app.business.agent.temperature.dataList');
                } else {
                    alert("保存失败");
                }
            });
        }
    };

    $scope.retList = function () {
        $rootScope.back();
    };

    $scope.data_add = function (data) {
        var e = [];
        if (data.length != 0) {
            //要插入的json对象串
            var newObj = {"id": null, "name": "请选择", "children": []};
            //将返回的json对象和要插入的json对象串转换为字符串格式
            var f = angular.toJson(newObj);
            var b = angular.toJson(data);
            //把要插入的json对象串插入返回数据的最前面
            var c = b.substring(0, 1);
            var d = b.substring(1, b.length);
            e = c + f + "," + d;
        }
        //最后在转换为json对象返回去
        return angular.fromJson(e);
    }

    // 新增一行
    $scope.addTR = function (temperId) {
        $scope.addCheckSon.push({temperId: temperId});
    }
    // 删除一行
    $scope.deleteTR = function (obj) {
        var index;
        // 如果有ID，说明当前数据已经是存在于数据库的，那么要郑重删除
        if (obj.id != undefined) {
            $scope.deleteSon(obj.id);
        }
        index = $scope.addCheckSon.indexOf(obj);
        $scope.addCheckSon.splice(index, 1);
    }
});