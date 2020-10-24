"use strict";
angular.module('app.intelligent').controller("humitureDetectionCtrl", function ($scope, $state, $rootScope, $stateParams, $uibModal, temperatureRecordService, $interval, basicThresholdSetService) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {};

    // 加载列表
    $scope.loadData = function () {
        // 检测类型0测温，1粮油,2测水分
        temperatureRecordService.getTemperatureRecordPageInfo($scope.pageInfo, $scope.search,'0').then(function (data) {
            $scope.pageInfo = data.data;
        }, function (data) {
            console.log(data);
        });
    };
    $scope.loadData();

    // 详情(层温)
    $scope.grainDetectionDetail = function (humitureDetection) {
        var params = [];
        params.vCfCode = humitureDetection.storehouse; // 仓房编码
        params.time = humitureDetection.time; // 检测时间
        params.intemp = humitureDetection.intemp; // 仓内温
        params.inh = humitureDetection.inh; // 仓内湿
        params.outtemp = humitureDetection.outtemp; // 仓外温
        params.outh = humitureDetection.outh; // 仓外湿
        params.max = humitureDetection.max; // 最高粮温
        params.min = humitureDetection.min; // 最低粮温
        params.avg = humitureDetection.avg; // 平均粮温
        params.id = humitureDetection.id;
        $uibModal.open({
            size: 'lg',
            templateUrl: 'app/intelligent/grainDetection/views/humitureDetection-model.html',
            controller: 'humitureDetectionModel',
            resolve: {
                // 传入参数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params;
                }
            }
        });
    };

    // 所有仓检测
    $scope.allStoreGrainTemperatureDetection = function () {
        if (!confirm("您确认发送粮温全库检测请求!")) {
            return;
        }
        // 检测类型0测温，1粮油,2测水分
        temperatureRecordService.allStoreGrainTemperatureDetection('0').then(function (data) {
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

    // 单仓检测
    $scope.onlyStoreGrainTemperatureDetection = function (storehouse) {
        if (!confirm("您确认检测" + $rootScope.storeHouseCodeObj[storehouse].storehouseName + "粮温!")) {
            return;
        }
        // 检测类型0测温，1粮油,2测水分
        temperatureRecordService.onlyStoreDetection(storehouse,'0').then(function (data) {
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
    }, 1000*60*3, -1);

    // 清空搜索时间
    $scope.emptyTime = function () {
        $scope.search.time = '';
        $scope.search.vCfCode = '';
        $scope.loadData();
    };

    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum !== pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

});