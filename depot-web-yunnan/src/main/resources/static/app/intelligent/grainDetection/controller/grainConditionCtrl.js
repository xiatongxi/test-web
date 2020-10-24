"use strict";
angular.module('app.intelligent').controller("grainConditionCtrl", function($scope, $state, $rootScope,temperatureRecordService,$uibModal) {
    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    // 筛选条件
    $scope.search = {};

    // 加载列表
    $scope.loadData = function() {
        temperatureRecordService.getTemperatureRecordPageInfo($scope.pageInfo, $scope.search,'0').then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();

    // 详情
    $scope.grainDetectionDetail = function (grainCondition) {
        // 初始参数
        var params = [];
        params.vCfCode  = grainCondition.storehouse; // 仓房编码
        params.time = grainCondition.time; // 检测时间
        params.intemp = grainCondition.intemp; // 仓内温
        params.inh = grainCondition.inh; // 仓内湿
        params.outtemp = grainCondition.outtemp; // 仓外温
        params.outh = grainCondition.outh; // 仓外湿
        params.max = grainCondition.max; // 最高粮温
        params.min = grainCondition.min; // 最低粮温
        params.avg = grainCondition.avg; // 平均粮温
        params.id = grainCondition.id;
        $uibModal.open({
            size:'lg',
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

    // 点击列表仓房-根据仓房获取所有指定仓房下的检测数据
    $scope.getStoreHouseByData = function (grainCondition) {
        // 初始参数
        var params = [];
        params.vCfCode  = grainCondition.storehouse; // 仓房编码
        params.time = grainCondition.time; // 检测时间
        params.intemp = grainCondition.intemp; // 仓内温
        params.inh = grainCondition.inh; // 仓内湿
        params.outtemp = grainCondition.outtemp; // 仓外温
        params.outh = grainCondition.outh; // 仓外湿
        params.max = grainCondition.max; // 最高粮温
        params.min = grainCondition.min; // 最低粮温
        params.avg = grainCondition.avg; // 平均粮温
        params.id = grainCondition.id;
        $uibModal.open({
            size:'lg',
            templateUrl: 'app/intelligent/grainDetection/views/grainCondition-model.html',
            controller: 'grainConditionModelCtrl',
            resolve: {
                // 传入参数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params;
                }
            }
        });
    };

    // 清空搜索时间
    $scope.emptyTime = function() {
        $scope.search.time = '';
        $scope.search.vCfCode = '';
        $scope.loadData();
    };

    // 翻页
    $scope.goPage = function(pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

});