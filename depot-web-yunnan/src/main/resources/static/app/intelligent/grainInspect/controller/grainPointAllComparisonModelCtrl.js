"use strict";
angular.module('app.intelligent').controller("grainPointAllComparisonModelCtrl", function($scope, $state,$compile, $rootScope,$stateParams,$uibModal,$uibModalInstance,$filter,temperatureRecordService,items,$timeout) {

    $("#showChartsGrainPointAllComparison").html($("" +
        "<div class='home-module-content' id='showChartsGrainPointAllComparison' style='height: 100%;width:100%;' >" +
        "</div>"));

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 30};
    // 查询条件
    $scope.search = {};

    // 按仓查看和单仓查看
    if (items.vCfCode != undefined && items.time != undefined) { // 单仓
        $scope.isNotEdit = true;
        // 兼容ie浏览器将时间格式yyyy-MM-dd替换yyyy/MM/dd
        var formatTime = items.time.replace(new RegExp(/-/gm), '/');
        var stamp= Date.parse(formatTime);
        var dataDate = new Date(stamp);
        $scope.search.storehouse = items.vCfCode;
        $scope.search.time = $filter('date')(dataDate, "yyyy-MM-dd");
    } else { // 按仓查看
        $scope.search.time = $filter('date')(new Date(), "yyyy-MM-dd");
        // 默认仓
        $scope.search.storehouse = $rootScope.storelist[0].storehouseCode;
    }

    $scope.eCharsData = function(){
        temperatureRecordService.getGrainPointAllPageInfo($scope.pageInfo, $scope.search,$scope.itemsId).then(function(data){
            // 分页
            $scope.pageInfo = data.data;
            // 初始化echarts
            var myChart = echarts.init(document.getElementById('showChartsGrainPointAllComparison'));
            // 获取实时数据
            var dataList = data.data.list;
            /**
             * X: 测温点在仓内的X坐标代表长度 代表列
             * Y: 测温点在仓内的Y坐标宽度方向 代表行
             * Z: 测温点在仓内的Z坐标高度
             * @type {Array}
             */
            var tempS = []; // 点温度
            var XYZ = []; // 拼接坐标
            for (var i=0;i<dataList.length;i++){
                tempS.push(dataList[i].temp);
                XYZ.push(dataList[i].X+'-'+dataList[i].Y+'-'+dataList[i].Z);
            }
            //初始化eCharts图表
            var option = {
                title: {
                    text: '所有点粮情对比',
                    x: 'center'
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
                    data:['点粮温(°C)'],
                    x: 'left'
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: [
                    {
                        name: '坐标',
                        type : 'category',
                        boundaryGap : false, // 图表内边界
                        data : []
                    }
                ],
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'点粮温(°C)',
                        type:'line',
                        // smooth:true, // 曲线,直线
                        data:[]
                    }
                ]
            };
            // 获取option传入参数
            option.series[0].data = tempS;
            option.xAxis[0].data= XYZ;
            myChart.setOption(option);
        },function(data){
            console.log(data);
        });
    };

    // 查询
    $scope.loadData = function () {
        // 多数据查询
        if (items.listId === 'listId') {
            $scope.search.vCfCode = $scope.search.storehouse;
            var ids = '';
            temperatureRecordService.getTemperatureRecordPageInfo($scope.pageInfo,$scope.search,'0').then(function (data) {
                for(var obj in data.data.list){
                    ids += (data.data.list[obj].id + ',');
                }
                $scope.itemsId = ids.substring(0,ids.length-1);
                $scope.eCharsData();
            });
        } else {
            // id数据
            $scope.itemsId = items.id;
            $scope.eCharsData();
        }
    };
    $scope.loadData();

    // 清空搜索
    $scope.emptySearch = function () {
        $scope.search.storehouse = '';
        $scope.search.time = '';
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