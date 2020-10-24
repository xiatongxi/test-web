"use strict";
angular.module('app.intelligent').controller("grainSituationTrendModelCtrl", function($scope, $state,$compile, $rootScope,$stateParams,$uibModal,$uibModalInstance,$filter,temperatureRecordService,items) {

    $("#showChartsGrainTrend").html($("" +
        "<div class=\"home-module-content\" id=\"showChartsGrainTrend\" style=\"height: 100%;width:100%;\" >" +
        "</div>"));

    $scope.search = {};
    // 默认分页
    $scope.pageInfo = {pageNum : null, pageSize : null};
    $scope.isNotEdit = false;

    // 按仓查看和单仓查看
    var defStartTime = '';
    var defNndTime = '';
    if (items.vCfCode == undefined && items.time == undefined) { // 查看所有仓图表,可选任意仓
        // 设置默认条件
        var nowTime = new Date(); //获取系统当前时间
        // 开始时间
        var stamp= Date.parse(nowTime); // 获取当期时间毫秒1970年1月1日
        stamp = stamp/1000-3600*24*3;
        var newDate = new Date(stamp*1000); // 获取date类型时间 $filter
        defStartTime = $filter('date')(newDate, "yyyy-MM-dd");
        // 结束时间
        defNndTime = $filter('date')(nowTime, "yyyy-MM-dd");
        // 默认仓
        items.vCfCode = $rootScope.storelist[0].storehouseCode;
    } else { // 单仓查看图表
        $scope.isNotEdit = true;
        // 开始时间
        var formatTime = items.time.replace(new RegExp(/-/gm), '/'); // 兼容ie浏览器将时间格式yyyy-MM-dd替换yyyy/MM/dd
        var stamp= Date.parse(formatTime); // 获取当期时间毫秒1970年1月1日
        stamp = stamp/1000-3600*24*3;
        var newDate = new Date(stamp*1000); // 获取date类型时间 $filter
        defStartTime = $filter('date')(newDate, "yyyy-MM-dd");
        // 结束时间
        var endDate = Date.parse(formatTime);
        endDate = new Date(endDate);
        defNndTime = $filter('date')(endDate, "yyyy-MM-dd");
    }

    // 查询条件
    $scope.search = {startTime:defStartTime,endTime:defNndTime,vCfCode:''};
    // 仓房
    $scope.search.vCfCode = items.vCfCode;

    $scope.beforeDate = function(){
        var ms = Date.parse($scope.search.startTime); // millisecond
        ms = ms/1000+3600*24*3;
        var msDate = new Date(ms*1000); // 获取date类型时间 $filter
        var endDateTime = $filter('date')(msDate, "yyyy-MM-dd");
        $scope.search.endTime = endDateTime;
    };

    // 查询
    $scope.loadData = function () {
        temperatureRecordService.getTemperatureRecordPageInfo($scope.pageInfo, $scope.search,'0').then(function(data){
            // 分页
            $scope.pageInfo = data.data;
            // 初始化echarts
            var myChart = echarts.init(document.getElementById('showChartsGrainTrend'));
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
                    text: '粮情趋势折柱图',
                    x: 'left'
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid:{
                    left: '2%',
                    right: '5%',
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
    $scope.loadData();

    // 清空搜索
    $scope.emptySearch = function () {
        // $scope.search.vCfCode = '';
        $scope.search.startTime = '';
        $scope.search.endTime = '';
        $scope.loadData();
    };

    // 关闭模态窗口
    $scope.cancel = function() {
        $uibModalInstance.close();
    };

    // 翻页
    $scope.goPage = function(pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

});