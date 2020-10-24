"use strict";
angular.module('app.intelligent').controller("temperatureRecordCtrl", function($scope, $state, $rootScope,$stateParams,$uibModal,temperatureRecordService) {

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    // 筛选条件
    $scope.search = {vCfCode:'',time:''};

    $scope.isShow = false;

    if ($stateParams.show == 'true') {
        $scope.isShow = true;
    }

    if ($stateParams.vCfCode){
        $scope.search.vCfCode = $stateParams.vCfCode.substr(1);
    }
    // 加载列表
    $scope.loadData = function() {
        temperatureRecordService.getTemperatureRecordPageInfo($scope.pageInfo, $scope.search,'0').then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();

    // 查看
    $scope.showView = function(thermometryData) {
        var params = [];
        params.vCfCode = thermometryData.storehouse; // 仓房编码
        params.time = thermometryData.time; // 检测时间
        params.intemp = thermometryData.intemp; // 仓内温
        params.inh = thermometryData.inh; // 仓内湿
        params.outtemp = thermometryData.outtemp; // 仓外温
        params.outh = thermometryData.outh; // 仓外湿
        params.max = thermometryData.max; // 最高粮温
        params.min = thermometryData.min; // 最低粮温
        params.avg = thermometryData.avg; // 平均粮温
        params.id = thermometryData.id;
        $uibModal.open({
            size:'lg',
            templateUrl: 'app/intelligent/grainDetection/views/temperatureRecord-model.html',
            controller: 'temperatureRecordModelCtrl',
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
    $scope.empty = function() {
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
    // 返回,取消
    $scope.retList = function () {
        $rootScope.back();
    }

});