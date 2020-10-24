"use strict";
angular.module('app.intelligent').controller("realTimeDataListCtrl", function ($scope, $state, $rootScope, $stateParams, $uibModal, realTimeDataService, temperatureRecordService, $interval) {
    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {};

    // 加载实时数据查询列表
    $scope.loadData = function () {
        realTimeDataService.getRealTimeDataPageInfo($scope.pageInfo, $scope.search).then(function (data) {
            $scope.pageInfo = data.data;
        }, function (data) {
            console.log(data);
        });
    };
    $scope.loadData();

    // 详情
    $scope.grainDetectionDetail = function (realTimeList) {
        // 初始参数
        var params = [];
        params.vCfCode = realTimeList.storehouse; // 仓房编码
        params.time = realTimeList.time; // 检测时间
        params.intemp = realTimeList.intemp; // 仓内温
        params.inh = realTimeList.inh; // 仓内湿
        params.outtemp = realTimeList.outtemp; // 仓外温
        params.outh = realTimeList.outh; // 仓外湿
        params.max = realTimeList.max; // 最高粮温
        params.min = realTimeList.min; // 最低粮温
        params.avg = realTimeList.avg; // 平均粮温
        params.id = realTimeList.id;
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

    // 单仓检测
    $scope.onlyStoreGrainTemperatureDetection = function (storehouse) {
        if (!confirm("您确认检测" + $rootScope.storeHouseCodeObj[storehouse].storehouseName + "粮温!")) {
            return;
        }
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

    // 清空搜索条件
    $scope.emptyCondition = function () {
        $scope.search.storehouse = '';
        $scope.loadData();
    };

    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };


});