"use strict";
angular.module('app.intelligent').controller("gasDetectionCtrl", function ($scope, $state, $rootScope, gasDetectionPlanService, $interval) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {};

    // 加载列表
    $scope.loadData = function () {
        gasDetectionPlanService.getGasDetectionPageInfoGroup($scope.pageInfo, $scope.search).then(function (data) {
            $scope.pageInfo = data.data;
        }, function (data) {
            console.log(data);
        });
    };
    $scope.loadData();

    // 单仓检测
    $scope.onlyGasDetection = function (vCfCode) {
        if (!confirm("您确认检测" + $rootScope.storeHouseCodeObj[vCfCode].storehouseName + "气体!")) {
            return;
        }
        gasDetectionPlanService.onlyGasDetection(vCfCode).then(function (data) {
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

    // 全库气体检测
    $scope.allGasDetection = function () {
        if (!confirm("您确认发送气体全库检测请求!")) {
            return;
        }
        gasDetectionPlanService.allGasDetection().then(function (data) {
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

    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

    // 清空搜索条件
    $scope.empty = function () {
        $scope.search.startTime = '';
        $scope.search.endTime = '';
        $scope.search.vCfCode = '';
        $scope.loadData();
    };

})

    .controller("gasDetectionViewCtrl", function ($scope, $state, $rootScope, $stateParams, APP_CONFIG, gasDetectionPlanService, $filter) {

        // 默认分页
        $scope.pageInfo = {pageNum: null, pageSize: null};
        // 筛选条件
        $scope.search = {};
        // 接收参数
        $scope.search.vCfCode = $stateParams.vCfCode;
        // 时间格式化
        var time = $filter('date')($stateParams.vValueTime, "yyyy-MM-dd HH:mm:ss");;
        time = time.replace(/-/g, ':').replace(' ', ':');
        time = time.split(':');
        var valueTime = new Date(time[0], (time[1] - 1), time[2]);
        $scope.isNotEdit = true;

        // 默认7天数据(有重复只取时间最近7条)
        $scope.search.endTime = $filter('date')(valueTime, "yyyy-MM-dd");
       // var startDate = new Date(valueTime.setDate(valueTime.getDate() - 6));
        $scope.search.startTime = $filter('date')(valueTime, "yyyy-MM-dd");
        // 改变时间
       /* $scope.updateCheckTime = function () {
            var updateStartDate = new Date($scope.search.startTime.replace(/-/g, "/"));
            var newUpdateEndDate = updateStartDate.setDate(updateStartDate.getDate() + 6);
            $scope.search.endTime = $filter('date')(newUpdateEndDate, "yyyy-MM-dd");
        };*/

        $("#showChartsGasDetection").html($("" +
            "<div class=\"charts-histogram-1\" id=\"quxt\" style=\"height: 100%;width:100%;z-index:1;\" >" +
            "</div>"));

        $scope.loadData = function () {
            gasDetectionPlanService.getGasDetectionPageInfo($scope.pageInfo, $scope.search).then(function (data) {
                //初始化eCharts图表
                var option = {
                    title: {
                        text: '气体检测折线图',
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
                        data: ['二氧化碳', '氧气', '磷化氢'],
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
                            data: [],
                            axisLabel: {
                                interval: 0,
                                rotate: -20
                            }
                        }
                    ],
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '二氧化碳',
                            type: 'line',
                            smooth: true,
                            data: []
                        },
                        {
                            name: '氧气',
                            type: 'line',
                            smooth: true,
                            data: []
                        },
                        {
                            name: '磷化氢',
                            type: 'line',
                            smooth: true,
                            data: []
                        }
                    ]
                };

                //获取实时数据
                $scope.getRealTemp = function (data) {
                    var dataList = data.data.list;
                    var vValueTime = [];// 时间集合
                    var ph3avg = []; // 磷化氢
                    var co2avg = []; // 二氧化碳
                    var o2avg = []; // 氧气
                    for (var i = dataList.length - 1; i >= 0; i--) {
                        ph3avg.push(dataList[i].ph3avg);
                        co2avg.push(dataList[i].co2avg);
                        o2avg.push(dataList[i].o2avg);
                        vValueTime.push($filter('date')(dataList[i].vValueTime, "yyyy-MM-dd"));
                    }
                    // 获取option传入参数
                    option.series[0].data = o2avg;
                    option.series[1].data = co2avg;
                    option.series[2].data = ph3avg;
                    option.xAxis[0].data = vValueTime;
                };
                // 改变eCharts参数
                var myChart = echarts.init(document.getElementById('quxt'));
                $scope.getRealTemp(data);
                myChart.setOption(option);
            }, function (data) {
                console.log(data);
            });
        };
        $scope.loadData();

        // 返回,取消
        $scope.retList = function () {
            if ($rootScope.previousState_name != '') {
                $rootScope.back();
            } else {
                $state.go("app.intelligent.gasDetection.gasDetectionList");
            }
        };

    });