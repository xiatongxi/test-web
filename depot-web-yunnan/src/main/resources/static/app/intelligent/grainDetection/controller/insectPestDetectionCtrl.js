"use strict";
angular.module('app.intelligent').controller("insectPestDetectionCtrl", function ($scope, $stateParams, $state, $rootScope, insectPestDetectionService, $interval) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {};

    if ($stateParams.show == 'true') {
        $scope.isShow = true;
    }

    if ($stateParams.vCfCode){
        $scope.search.vCfCode = $stateParams.vCfCode.substr(1);
    }
    // 加载列表
    $scope.loadData = function () {
        insectPestDetectionService.getInsectPestDetectionPageInfo($scope.pageInfo, $scope.search).then(function (data) {
            $scope.pageInfo = data.data;
        }, function (data) {
            // console.log(data);
        });
    };
    $scope.loadData();

    // 新增页面
    $scope.showAdd = function() {
        $state.go("app.intelligent.grainDetection.insectPestDetectionEdit",{type: "add"});
    };

    // 修改页面
    $scope.showUpdate = function(insertId) {
        $state.go("app.intelligent.grainDetection.insectPestDetectionEdit",{type: "edit",insertId: insertId});
    };

    // 获取所有仓房code
    /*$scope.getCodeList = function () {
        var storeList = $rootScope.storelist;
        var storeCode = [];
        for (var i = 0; i < storeList.length; i++) {
            storeCode.push(storeList[i].storehouseCode);
        }
        $scope.storeCode = storeCode.toString();
    };*/

    // 虫情实时检测
    /*$scope.nowInsectPest = function () {
        if (!confirm("您确认发送虫情全库实时检测请求!")) {
            return;
        }
        // alert("请求已发送!请耐心等待数据返回!");
        $scope.getCodeList();
        // $(".player-loader").show();
        insectPestDetectionService.nowInsectPest($scope.storeCode).then(function (data) {
            if (data.retCode == '200' && data.message == 'success') {
                // $(".player-loader").hide();
                var resultStr = data.data;
                var alertResult = '';
                for (var key in resultStr) {
                    if (key == 'error') {
                        alertResult = resultStr[key];
                        alert(alertResult);
                        return;
                    }
                    alertResult += $rootScope.storeHouseCodeObj[key].storehouseName + ':' + resultStr[key] + '; ';
                }
                alert(alertResult);
            } else {
                if (data.retCode == '600' && data.message == '3232302D46696C') {
                    alert("无法连接到设备!");
                } else {
                    alert("请求失败!");
                }
            }
        }, function (data) {
            console.log(data);
        });
    };*/

    // 单仓检测
    $scope.onlyInsectPestDetection = function (vCfCode) {
        if (!confirm("您确认检测" + $rootScope.storeHouseCodeObj[vCfCode].storehouseName + "虫情!")) {
            return;
        }
        insectPestDetectionService.onlyInsectPestDetection(vCfCode).then(function (data) {
            if (data.retCode === '200' && data.message === 'success') {
                if (data.data === '3232302D46696C') {
                    alert("无法连接到设备!");
                    return;
                }
                alert(data.data);
            }
        }, function (data) {
            console.log(data);
        });
    };

    // 所有仓检测
    $scope.allStoreGrainTemperatureDetection = function () {
        if (!confirm("您确认发送虫情全库检测请求!")) {
            return;
        }
        insectPestDetectionService.allInsectPestDetection().then(function (data) {
            if (data.retCode === '200' && data.message === 'success') {
                if (data.data === '3232302D46696C') {
                    alert("无法连接到设备!");
                    return;
                }
                alert(data.data);
            }
        }, function (data) {
            console.log(data);
        });
    };

    // 定时刷新列表(3分钟)
    $interval(function () {
        $scope.loadData();
    }, 1000 * 60 * 3, -1);

    // 清空搜索条件
    $scope.emptyCondition = function () {
        $scope.search.iBeginTdh = '';
        $scope.search.iEndTdh = '';
        $scope.search.vCfCode = '';
        $scope.loadData();
    };

    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };
    // 返回,取消
    $scope.retList = function () {
        $rootScope.back();
    };

    // 图表展示
    $scope.contrastCahrt = function () {
        $state.go('app.intelligent.grainDetection.insectPestDetectionList.chart');
    };

}).controller("insectPestDetectionChart", function ($scope, $state, $rootScope, $stateParams, APP_CONFIG, insectPestDetectionService, $filter) {

    // 筛选条件
    $scope.search = {};
    // 接收参数
    if ($scope.search.vCfCode == undefined) {
        $scope.search.vCfCode = "001";
    }
    if ($scope.search.searchEndDate == undefined || $scope.search.searchStartDate == searchStartDate) {
        // 默认7天数据(有重复只取时间最近7条)
        $scope.search.searchEndDate = $filter('date')(new Date(), "yyyy-MM-dd");
        var curDate = new Date();
        var startDate = new Date(curDate.setDate(curDate.getDate() - 6));
        $scope.search.searchStartDate = $filter('date')(startDate, "yyyy-MM-dd");
    }
    $scope.isNotEdit = true;


    $("#showChartsTrend").html($("" +
        "<div class=\"charts-histogram-1\" id=\"quxt\" style=\"height: 100%;width:100%;z-index:1;\" >" +
        "</div>"));


    $scope.loadData = function () {
        insectPestDetectionService.getByCfCode($scope.search).then(function (data) {

            var xAxiss = [];
            var seriess = [];
            console.log(data.data);
            console.log(seriess);
            if (data.data != null) {
                xAxiss = data.data.xAxis;
                seriess = data.data.series;
            }

            var option = {
                title: {
                    text: '虫害检测分析',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '4%',
                    right: '6%',
                    bottom: '13%',
                    containLabel: true
                },
                legend: {
                    data: ['最大值(只)', '最小值(只)', '平均值(只)'],
                    x: 'left'
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: [
                    {
                        name: '时间',
                        type: 'category',
                        boundaryGap: false,
                        data: xAxiss,
                        axisLabel: {
                            interval: 0,
                            rotate: -20
                        }
                    }
                ],
                yAxis: {
                    type: 'value'
                },
                series: seriess
            };

            var myChart = echarts.init(document.getElementById('quxt'));
            myChart.setOption(option, true);
        }, function (data) {
            // console.log(data);
        });
    }
    $scope.loadData();

    // 清空查询条件
    $scope.empty = function () {
        $scope.search.vCfCode = '';
        $scope.search.searchStartDate = '';
        $scope.search.searchEndDate = '';
        $scope.loadData();
    };

    // 返回,取消
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
            $rootScope.back();
        } else {
            $state.go("app.intelligent.grainDetection.insectPestDetectionList");
        }
    };
})
// 虫害手工录入
.controller("insectPestEditCtrl", function($scope, $filter, $http, $stateParams, $state, $rootScope, $uibModal, insectPestDetectionService,
                                           warehouseService) {

    $scope.insectPests = {};
    $scope.saveFlag = false;

    $(document).ready(function() {
        $("#dtBox").DateTimePicker({
        });
    });

    $scope.loadDataById = function(id) {
        insectPestDetectionService.getInsectPestDeatil(id).then(function(data){
            $scope.insectPests = data.data[0];
            $scope.houseId = Number($rootScope.storeHouseCodeObj[data.data[0].vCcCode].storehouseId);
            $scope.insectPests.vHwCode = Number(data.data[0].vHwCode);
            $scope.insectPests.hczl = Number(data.data[0].hczl);
            $scope.loadWare($scope.houseId);
        },function(data){
            console.log(data);
        });
    };

    if ($stateParams.type == "add") {//新增
        $scope.insectPests.vUpdatePeople = $rootScope.userInfo.realName;
        $scope.insectPests.orgId = $rootScope.depotInfo.orgId;
    }else if($stateParams.type == "detail"){//详情
        $scope.isNotSave = true;
        $("#fumigationPlan-form input").attr("disabled",true);
        $("#fumigationPlan-form select").attr("disabled",true);
        $scope.loadDataById($stateParams.insertId);
    }else if($stateParams.type == "edit"){//修改
        $("#fumigationPlan-form input").attr("disabled",false);
        $("#fumigationPlan-form select").attr("disabled",false);
        $scope.loadDataById($stateParams.insertId);
    }

    var validator = $("#insectPests-form").validate();

    // 自定义验证，验证熏蒸次数
    $.validator.addMethod("validFrequency",function(value,element, params) {
        var checkNumber = /^\+?[1-9]\d*$/;
        return this.optional(element)||(checkNumber.test(value));
    },"请输入大于0的整数！");

    // 货位列表
    $scope.loadWare = function(houseId) {
        $scope.insectPests.vCfCode = $rootScope.storehouseObj[houseId].storehouseCode;
        warehouseService.getStorehouse($rootScope.orgInfo.orgId, houseId).then(function(data){
            $scope.warelist = data.wareList;
        },function(data){
            console.log(data);
        });
    };

    // 返回.
    $scope.retList = function () {
        $rootScope.back();
    };

    // 保存.
    $scope.saveData = function () {
        if (!$scope.saveFlag) {
            if (validator.form()) {
                // 设置saveFlag为true,防止重复提交.
                $scope.saveFlag = true;
                $("input[name='vUpdateTime']").each(function(j,item){
                    if(item.value != '' && item.value != null && typeof item.value != 'undefined'){
                        $scope.insectPests.vUpdateTime = $filter('date')(item.value, "yyyy-MM-dd HH:mm:ss");
                    }
                });
                $("input[name='standTime']").each(function(j,item){
                    if(item.value != '' && item.value != null && typeof item.value != 'undefined'){
                        $scope.insectPests.standTime = $filter('date')(item.value, "yyyy-MM-dd HH:mm:ss");
                    }
                });

                //保存熏蒸数据
                insectPestDetectionService.saveInsectPestDate($scope.insectPests).then(function(data){
                    if(data.message == "success"){
                        alert("保存成功！");
                        $scope.retList();
                    } else {
                        alert("保存失败！");
                        $scope.saveFlag = false;
                    }
                },function(data){
                    console.log(data);
                });
            }
        }
    }
})