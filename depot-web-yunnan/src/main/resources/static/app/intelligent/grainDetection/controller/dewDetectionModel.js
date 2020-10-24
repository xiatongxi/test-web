"use strict";
angular.module('app.intelligent').controller("dewDetectionModel", function($scope, $state, $rootScope,$uibModalInstance,items,temperatureRecordService,$filter,$uibModal,keeperService) {

    $scope.vCfCode = items.vCfCode; // 仓房编码
    $scope.time = items.time; // 检测时间
    $scope.intemp = items.intemp; // 仓内温
    $scope.inh = items.inh; // 仓内湿
    $scope.outtemp = items.outtemp; // 仓外温
    $scope.outh = items.outh; // 仓外湿
    $scope.max = items.max; // 最高粮温
    $scope.min = items.min; // 最低粮温
    $scope.avg = items.avg; // 平均粮温 'yyyy-MM-dd HH:mm:ss'
    $scope.tableTime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'); // 制表时间

    // 获取保管员姓名
    if (items.vCfCode !== undefined && items.vCfCode !== null && items.vCfCode !== '') {
        var storeHouseId = $rootScope.storeHouseCodeObj[items.vCfCode].storehouseId;
        keeperService.getKeeperNamesByHouseId(storeHouseId).then(function(data){
            $scope.keeperNames = data.keeperNames;
        },function (data) {
            console.log(data);
        });
    }

    // 动态表
    $scope.getDataToCFCodeAndTime = function () {
        // 仓温仓湿
        temperatureRecordService.findByHouseAndTime(items.vCfCode, items.time, items.id).then(function(data){
            // 动态添加html
            var dataLayerList = data.data;
            if (dataLayerList != null && dataLayerList.length > 0) {
                for (var i=0;i<dataLayerList.length;i++) {
                    var lavg = dataLayerList[i].lavg;
                    var lmax = dataLayerList[i].lmax;
                    var lmin = dataLayerList[i].lmin;
                    $(document).ready(function(){
                        // 第一个tr添加td
                        $("#table_5 tr").eq(0).append(
                            "<td style=\"border: 1px solid #000;text-align: center;\">"
                            + dataLayerList[i].layernumber + '层' + "</td>");
                        // 第二个tr添加td
                        $("#table_5 tr").eq(1).append(
                            "<td style=\"border: 1px solid #000;text-align: center;\">"
                            + lavg + "</td>");
                        // 第三个tr添加td
                        $("#table_5 tr").eq(2).append(
                            "<td style=\"border: 1px solid #000;text-align: center;\">"
                            + lmax + "</td>");
                        // 第四个tr添加td
                        $("#table_5 tr").eq(3).append(
                            "<td style=\"border: 1px solid #000;text-align: center;\">"
                            + lmin + "</td>");
                    });
                }
            }
        },function(data){
            console.log(data);
        });
        // 根-层
        temperatureRecordService.findByHouseAndTimes(items.vCfCode, items.time, items.id).then(function(data){
            var detailList = data.data;
            if (detailList != null && detailList.length > 0) {
                for (var i=0;i<Object.keys(detailList[0]).length;i++) {
                    $(document).ready(function () {
                        // 第一个tr添加td(首行)
                        if (i==0) {
                            $("#table_6 tr").eq(0).append(
                                "<th style=\"border: 1px solid #000;text-align: center;\">"
                                + '根-层' + "</th>");
                            return;
                        }
                        $("#table_6 tr").eq(0).append(
                            "<th style=\"border: 1px solid #000;text-align: center;\">"
                            + i + '#' + "</th>");
                    });
                }
                // 填充数据
                for (var i=0;i<detailList.length;i++) {
                    $(document).ready(function () {
                        // 获取每一个对象
                        var obj = detailList[i];
                        // 添加tr
                        $("#table_6 thead").append("<tr></tr>");
                        // tr下添加td
                        for (var index in obj) {
                            var tier = obj[index];
                            $("#table_6 tr").eq(i+1).append(
                                "<td style=\"border: 1px solid #000;text-align: center;\">"
                                + tier + "</td>");
                        }
                    });
                }
            }
        },function(data){
            console.log(data);
        });

    };
    $scope.getDataToCFCodeAndTime();

    // 粮情趋势(图)
    $scope.vCfCodeGrainSituationTrend = function () {
        var params = [];
        params.vCfCode = items.vCfCode; // 仓房编码
        params.time = items.time; // 检测时间
        $uibModal.open({
            size:'lg',
            templateUrl: 'app/intelligent/grainInspect/views/grainSituationTrend-model.html',
            controller: 'grainSituationTrendModelCtrl',
            resolve: {
                // 传入参数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params;
                }
            }
        });
    };
    // 粮情对比
    $scope.vCfCodeGSituationComparison = function () {
        var params = [];
        params.vCfCode = items.vCfCode; // 仓房编码
        params.time = items.time; // 检测时间
        $uibModal.open({
            size:'lg',
            templateUrl: 'app/intelligent/grainInspect/views/grainSituationComparison-model.html',
            controller: 'grainSituationComparisonModelCtrl',
            resolve: {
                // 传入参数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params;
                }
            }
        });
    };
    // 所有点粮情对比
    $scope.vCfCodePointAllGrainComparison = function () {
        var params = [];
        params.vCfCode = items.vCfCode; // 仓房编码
        params.time = items.time; // 检测时间
        params.id = items.id;
        $uibModal.open({
            size:'lg',
            templateUrl: 'app/intelligent/grainInspect/views/grainPointAllComparison-model.html',
            controller: 'grainPointAllComparisonModelCtrl',
            resolve: {
                // 传入参数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params;
                }
            }
        });
    };

    // 打印
    $scope.print = function() {
        $("#print").printArea();
    };

    // 关闭模态窗口
    $scope.cancel = function() {
        $uibModalInstance.close();
    }

});