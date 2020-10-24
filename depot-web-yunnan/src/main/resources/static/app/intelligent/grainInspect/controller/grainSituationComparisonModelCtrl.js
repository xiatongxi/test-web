"use strict";
angular.module('app.intelligent').controller("grainSituationComparisonModelCtrl", function($scope, $state,$compile, $rootScope,$stateParams,$uibModal,$uibModalInstance,$filter,temperatureRecordService,items) {

    // 左侧图表
    $("#showChartsGrainComparisonLeft").html($("" +
        "<div class=\"home-module-content\" id=\"showChartsGrainComparisonLeft\" style=\"height: 100%;width:100%;\" >" +
        "</div>"));

    // 右侧图表
    $("#showChartsGrainComparisonRight").html($("" +
        "<div class=\"home-module-content\" id=\"showChartsGrainComparisonRight\" style=\"height: 100%;width:100%;\" >" +
        "</div>"));

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 30};
    // 查询条件
    $scope.search = {};
    // 区分单仓和自定义查询
    $scope.isNotEdit = false;

    if (items.vCfCode != undefined && items.time != undefined) { // 详情查看指定仓房信息图表
        $scope.isNotEdit = true;
        // left开始时间
        var formatTime = items.time.replace(new RegExp(/-/gm), '/'); // 兼容ie浏览器将时间格式yyyy-MM-dd替换yyyy/MM/dd
        var stamp= Date.parse(formatTime); // 获取当期时间毫秒1970年1月1日
        stamp = stamp/1000-3600*24*3;
        var newDate = new Date(stamp*1000); // 获取date类型时间 $filter
        $scope.search.startTimeLeft = $filter('date')(newDate, "yyyy-MM-dd");
        // left结束时间
        var endDate = Date.parse(formatTime);
        endDate = new Date(endDate);
        $scope.search.endTimeLeft = $filter('date')(endDate, "yyyy-MM-dd");
        // 仓房号
        $scope.search.vCfCodeLeft = items.vCfCode;
        $scope.search.vCfCodeRight = items.vCfCode;
    } else { // 默认查看指定仓房信息图表
        // 默认仓
        $scope.search.vCfCodeLeft = $rootScope.storelist[0].storehouseCode; // 仓房code
        $scope.search.vCfCodeRight = $rootScope.storelist[0].storehouseCode; // 仓房code
        // 默认时间(一周)
        var dateTime = new Date(); // 当前时间
        // 一周前时间
        var beforeDate = Date.parse(dateTime); // 获取当期时间毫秒1970年1月1日
        beforeDate = beforeDate/1000-3600*24*3;
        var newDate = new Date(beforeDate*1000); // 获取date类型时间 $filter
        $scope.search.startTimeLeft = $filter('date')(newDate, "yyyy-MM-dd");
        $scope.search.endTimeLeft = $filter('date')(dateTime, "yyyy-MM-dd");
        $scope.search.startTimeRight = $filter('date')(newDate, "yyyy-MM-dd");
        $scope.search.endTimeRight = $filter('date')(dateTime, "yyyy-MM-dd");
    }

    // 查询left
    $scope.loadDataLeft = function () {
        temperatureRecordService.getComparisonLeft($scope.pageInfo, $scope.search,'0').then(function(data){
            // 分页
            // $scope.pageInfo = data.data;
            // 初始化echarts
            var myChart = echarts.init(document.getElementById('showChartsGrainComparisonLeft'));
            // 获取实时数据
            var dataList = data.data.list;
            var avg = []; // 平均粮温
            var max = []; // 最高粮温
            var min = []; // 最低粮温
            var time = [];// 时间集合
            for (var i=dataList.length-1;i>=0;i--){
                avg.push(dataList[i].avg);
                max.push(dataList[i].max);
                min.push(dataList[i].min);
                time.push(dataList[i].time);
            }
            //初始化eCharts图表
            var option = {
                title: {
                    text: '左图',
                    x: 'left'
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid:{
                    left: '4%',
                    right: '10%',
                    bottom: '3%',
                    containLabel: true
                },
                legend: {
                    data:['平均粮温','最高粮温','最低粮温'],
                    x: 'center'
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: [
                    {
                        name: '日期',
                        type : 'category',
                        // boundaryGap : false, // 图表内边界
                        data : []
                    }
                ],
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'平均粮温',
                        type:'line',
                        // smooth:true, // 曲线,直线
                        data:[]
                    },
                    {
                        name:'最高粮温',
                        type:'bar',
                        barWidth : 3,
                        data:[]
                    },
                    {
                        name:'最低粮温',
                        type:'bar',
                        barWidth : 3,
                        data:[]
                    }
                ]
            };
            // 获取option传入参数
            option.series[0].data = avg;
            option.series[1].data = max;
            option.series[2].data = min;
            option.xAxis[0].data= time;
            myChart.setOption(option);
        },function(data){
            console.log(data);
        });
    };
    $scope.loadDataLeft();

    // 查询right
    $scope.loadDataRight = function () {
        temperatureRecordService.getComparisonRight($scope.pageInfo, $scope.search,'0').then(function(data){
            // 分页
            // $scope.pageInfo = data.data;
            // 初始化echarts
            var myChart = echarts.init(document.getElementById('showChartsGrainComparisonRight'));
            // 获取实时数据
            var dataList = data.data.list;
            var avg = []; // 平均粮温
            var max = []; // 最高粮温
            var min = []; // 最低粮温
            var time = [];// 时间集合
            for (var i=dataList.length-1;i>=0;i--){
                avg.push(dataList[i].avg);
                max.push(dataList[i].max);
                min.push(dataList[i].min);
                time.push(dataList[i].time);
            }
            //初始化eCharts图表
            var option = {
                title: {
                    text: '右图',
                    x: 'left'
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid:{
                    left: '4%',
                    right: '10%',
                    bottom: '3%',
                    containLabel: true
                },
                legend: {
                    data:['平均粮温','最高粮温','最低粮温'],
                    x: 'center'
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: [
                    {
                        name: '日期',
                        type : 'category',
                        // boundaryGap : false, // 图表内边界
                        data : []
                    }
                ],
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'平均粮温',
                        type:'line',
                        // smooth:true, // 曲线,直线
                        data:[]
                    },
                    {
                        name:'最高粮温',
                        type:'bar',
                        barWidth : 3,
                        data:[]
                    },
                    {
                        name:'最低粮温',
                        type:'bar',
                        barWidth : 3,
                        data:[]
                    }
                ]
            };
            // 获取option传入参数
            option.series[0].data = avg;
            option.series[1].data = max;
            option.series[2].data = min;
            option.xAxis[0].data= time;
            myChart.setOption(option);
        },function(data){
            console.log(data);
        });
    };
    $scope.loadDataRight();



    // 清空Left
    $scope.emptySearchLeft = function () {
        // $scope.search.vCfCodeLeft = '';
        $scope.search.startTimeLeft = '';
        $scope.search.endTimeLeft = '';
        $scope.loadDataLeft();
    };

    // 清空Right
    $scope.emptySearchRight = function () {
        // $scope.search.vCfCodeRight = '';
        $scope.search.startTimeRight = '';
        $scope.search.endTimeRight = '';
        $scope.loadDataRight();
    };

    // 关闭模态窗口
    $scope.cancel = function() {
        $uibModalInstance.close();
    };

});