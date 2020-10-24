"use strict";
angular.module('app.intelligent').controller("aerationCompareCtrl", function($scope, $state, $rootScope, $stateParams,aerationCompareService,$http, APP_CONFIG, gasDetectionPlanService,$filter) {

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 7};
    // 筛选条件
    $scope.search = {};
    // 接收参数
    
    $scope.isNotEdit = true;

    
    $scope.getTime = function() {
    	
    	$http({
            method: 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/aerationCompare/getJobTime',
			params : {
				vCfCode : $scope.search.vCfCode
			}
        }).then(function successCallback(response) {
            // 请求成功执行代码
        	$scope.search.startTime = response.data.data[0].taskStartTime;
        	$scope.search.endTime = response.data.data[0].taskEndTime;
           

        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
    	
    	
    	
    }
    

    $("#showChartsGasDetection").html($("" +
        "<div class=\"charts-histogram-1\" id=\"quxt\" style=\"height: 100%;width:100%;z-index:1;\" >" +
        "</div>"));

    $scope.loadData = function () {
        gasDetectionPlanService.getGasDetectionPageInfo($scope.pageInfo, $scope.search).then(function(data){
            //初始化eCharts图表
            var option = {
                title: {
                    text: '',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid:{
                    left: '4%',
                    right: '6%',
                    bottom: '13%',
                    containLabel: true
                },
                legend: {
                    data:['氧气','二氧化碳','磷化氢'],
                    x: 'left'
                },
                /*toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },*/
                xAxis: [
                    {
                        name: '时间',
                        type : 'category',
                        boundaryGap : false,
                        data : []
                    }
                ],
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'氧气',
                        type:'line',
                        smooth:true,
                        data:[]
                    },
                    {
                        name:'二氧化碳',
                        type:'line',
                        smooth:true,
                        data:[]
                    },
                    {
                        name:'磷化氢',
                        type:'line',
                        smooth:true,
                        data:[]
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
                for (var i=dataList.length-1;i>=0;i--){
                    ph3avg.push(dataList[i].ph3avg);
                    co2avg.push(dataList[i].co2avg);
                    o2avg.push(dataList[i].o2avg);
                    vValueTime.push(dataList[i].vValueTime);
                }
                // 获取option传入参数
                option.series[0].data = o2avg;
                option.series[1].data = co2avg;
                option.series[2].data = ph3avg;
                option.xAxis[0].data= vValueTime;
            };
            // 改变eCharts参数
            var myChart = echarts.init(document.getElementById('quxt'));
            $scope.getRealTemp(data);
            myChart.setOption(option);
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();

    /*// 返回,取消
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
            $rootScope.back();
        } else {
            $state.go("app.intelligent.gasDetection.gasDetectionList");
        }
    };*/

});