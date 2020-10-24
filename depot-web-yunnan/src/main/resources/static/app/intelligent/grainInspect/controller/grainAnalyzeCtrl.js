"use strict";
angular.module('app.intelligent').controller("grainAnalyzeCtrl", function($scope, $state, $rootScope,$stateParams,$uibModal,temperatureRecordService) {

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
    $scope.grainDetectionDetail = function(grainAnalyzeList) {
        // 初始参数
        var params = [];
        params.vCfCode  = grainAnalyzeList.storehouse; // 仓房编码
        params.time = grainAnalyzeList.time; // 检测时间
        params.intemp = grainAnalyzeList.intemp; // 仓内温
        params.inh = grainAnalyzeList.inh; // 仓内湿
        params.outtemp = grainAnalyzeList.outtemp; // 仓外温
        params.outh = grainAnalyzeList.outh; // 仓外湿
        params.max = grainAnalyzeList.max; // 最高粮温
        params.min = grainAnalyzeList.min; // 最低粮温
        params.avg = grainAnalyzeList.avg; // 平均粮温
        params.id = grainAnalyzeList.id;
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

    // 粮情趋势(图)
    $scope.grainSituationTrend = function () {
        var params = [];
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
    $scope.grainSituationComparison = function () {
        var params = [];
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
    $scope.PointAllGrainComparison = function () {
        var params = [];
        params.listId = 'listId';
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
    // 清空
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