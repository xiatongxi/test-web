"use strict";
angular.module('app.intelligent').controller("weatherDetectionCtrl", function ($scope, $state, $rootScope, $stateParams, $uibModal,wertherinfoService, $interval) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {searchStartDate:'',searchEndDate:''};
    // 存放单个对象
    $scope.werther = {};

    // 加载列表
    $scope.loadData = function() {
        wertherinfoService.getWeatherPageInfo($scope.pageInfo, $scope.search).then(function(data){
            $scope.pageInfo = data.data;
            $scope.werther = data.data.list[0];
        },function(data){
            // console.log(data);
        });
    };
    $scope.loadData();

    // 清空搜索时间
    $scope.empty = function() {
        $scope.search.vqxzname = '';
        $scope.search.searchStartDate = '';
        $scope.search.searchEndDate = '';
        $scope.loadData();
    };

    // 所有仓检测
    $scope.sendNowWeatherDetection = function () {
        if (!confirm("您确认发送气象检测请求!")) {
            return;
        }
        wertherinfoService.sendNowWeatherDetection().then(function (data) {
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
    // 查看历史数据
    $scope.shows = function() {
        $state.go("app.intelligent.weather.weatherHsitory");
    };

    // 返回,取消
    $scope.retList = function () {
        $rootScope.back();
    }

    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

    // 定时刷新列表(3分钟)
    $interval(function () {
        $scope.loadData();
    }, 1000*60*3, -1);
});