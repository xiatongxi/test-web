"use strict";
angular.module('app.intelligent').controller("dewDetectionCtrl", function ($scope, $state, $rootScope, $stateParams, $uibModal, temperatureRecordService, $interval) {
    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {};

    // 加载列表
    $scope.loadData = function () {
        // 检测类型0测温，1粮油,2测水分
        temperatureRecordService.getTemperatureRecordPageInfo($scope.pageInfo, $scope.search, '2').then(function (data) {
            $scope.pageInfo = data.data;
        }, function (data) {
            console.log(data);
        });
    };
    $scope.loadData();

    // 详情(层温)
    $scope.grainDetectionDetail = function (dewDetection) {
        var params = [];
        params.vCfCode = dewDetection.storehouse; // 仓房编码
        params.time = dewDetection.time; // 检测时间
        params.intemp = dewDetection.intemp; // 仓内温
        params.inh = dewDetection.inh; // 仓内湿
        params.outtemp = dewDetection.outtemp; // 仓外温
        params.outh = dewDetection.outh; // 仓外湿
        params.max = dewDetection.max; // 最高粮温
        params.min = dewDetection.min; // 最低粮温
        params.avg = dewDetection.avg; // 平均粮温
        params.id = dewDetection.id;
        $uibModal.open({
            size: 'lg',
            templateUrl: 'app/intelligent/grainDetection/views/dewDetection-model.html',
            controller: 'dewDetectionModel',
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
    $scope.allStoreDewDetection = function () {
        if (!confirm("您确认发送水分全库检测请求!")) {
            return;
        }
        temperatureRecordService.allStoreGrainTemperatureDetection('2').then(function (data) {
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
    $scope.onlyStoreDewDetection = function (storehouse) {
        if (!confirm("您确认检测" + $rootScope.storeHouseCodeObj[storehouse].storehouseName + "水分!")) {
            return;
        }
        temperatureRecordService.onlyStoreDetection(storehouse,'2').then(function (data) {
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