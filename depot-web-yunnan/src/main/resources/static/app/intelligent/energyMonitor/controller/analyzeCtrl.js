"use strict";
angular.module('app.intelligent').controller("trendCtrl", function($scope, $state,$compile, $rootScope,$stateParams,$uibModal,energyAnalyzeService,meterQueryService) {
	// 默认分页
	/*$scope.pageInfo = {pageNum : 1, pageSize : 10};
	// 设备号下拉列表
    $scope.loadDatas = function () {
    	meterQueryService.getDeviceInfo($rootScope.orgInfo.orgId).then(function(data){
            $scope.pageInfo = data.data;
            $scope.deviceNumber = $scope.pageInfo.list[0].vNhCode;//默认选中第一个
            $scope.loadData();
        },function(data){
            console.log(data);
        });
    };*/
	
	$("#showChartsTrend").html($("" +
            "<div class=\"charts-histogram-1\" id=\"quxt\" style=\"height: 100%;width:100%;z-index:1;\" >" +
            "</div>"));
	
	$scope.loadData = function () {
		energyAnalyzeService.getTrendThree($rootScope.orgInfo.orgId,$scope.searchStartDate,$scope.searchEndDate).then(function(data){
            //初始化echarts 图表
            var option = {
                tooltip : {
                    trigger: 'axis'
                },
                grid:{
                    height:90,
                    width:100,
                    y : 10
                },
                color:['#00FF00','#ffdb43','#4bb4ff','#ff6953','#ed19ff'],
                legend: {
                    // data:['粮温','仓内温','仓外温','仓内湿','仓外湿'],
                    data:['风机','照明','插座'],
                    orient: 'vertical',      // 布局方式，默认为水平布局，可选为：
                    // 'horizontal' ¦ 'vertical'
                    x: 'right',               // 水平安放位置，默认为全图居中，可选为：
                    // 'center' ¦ 'left' ¦ 'right'
                    // ¦ {number}（x坐标，单位px）
                    y: '15px',                  // 垂直安放位置，默认为全图顶端，可选为：
                    // 'top' ¦ 'bottom' ¦ 'center'
                    // ¦ {number}（y坐标，单位px）
                    textStyle: {
                        color: '#fff'          // 图例文字颜色
                    }
                },
                calculable: true,
                xAxis : [
                    {
                        name: '时间',
                        type : 'category',
                        boundaryGap : false,
                        data : ['周一','周二','周三','周四','周五','周六','周日'],
                        axisLabel: {
                            textStyle: {
                                color: '#fff',//坐标值得具体的颜色
                            }
                        },
                        lineStyle: {
                            type: 'solid',
                            color:'#ffffff',
                            width:'1'
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        show : true,
                        axisLabel: {
                            textStyle: {
                                color: '#fff',//坐标值得具体的颜色
                            }
                        },
                        axisLine : {
                            lineStyle: {
                                type: 'solid',
                                color:'#ffffff',
                                width:'1'
                            }
                        }
                    }
                ],
                series : [
                    {
                        name:'风机',
                        type:'line',
                        smooth:true,
                        // itemStyle: {normal: {areaStyle: {type: 'default'}}}, //面积图和曲线图的区别
                        data:[10, 12, 21, 54, 260, 830, 710]
                    },
                    {
                        name:'照明',
                        type:'line',
                        smooth:true,
                        // itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[30, 182, 434, 791, 390, 30, 10]
                    },
                    {
                        name:'插座',
                        type:'line',
                        smooth:true,
                        //  itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[1320, 1132, 601, 234, 120, 90, 20]
                    }
                ]
            };

            //获取实时数据--具体点的数据
            $scope.getRealTemp = function (data) {
                var timeList = [];// 时间集合
                var fj = [];// 风机
                var zm = [];// 照明
                var cz = [];// 插座
                for (var i=0;i<data.length;i++){
                	fj.push(data[i].fj);
                	zm.push(data[i].zm);
                	cz.push(data[i].cz);
                    timeList.push(data[i].vUpdateTime);
                }
                option.series[0].data = fj;
                option.series[1].data = zm;
                option.series[2].data = cz;
                option.xAxis[0].data= timeList;
            }

            var myChart = echarts.init(document.getElementById('quxt'));
            $scope.getRealTemp(data);
            option.grid.height = $("#showChartsTrend").height()/1.5-25;
            option.grid.width = $("#showChartsTrend").width()*0.8;
            myChart.setOption(option);
            
        },function(data){
            console.log(data);
        });
    }
	
	$scope.loadData();
});
angular.module('app.intelligent').controller("timePointComparisonCtrl", function($scope, $state, $rootScope,$stateParams,$uibModal,energyAnalyzeService,meterQueryService) {
	
	// 默认分页
	/*$scope.pageInfo = {pageNum : 1, pageSize : 10};
	// 设备号下拉列表
    $scope.loadDatas = function () {
    	meterQueryService.getDeviceInfo($rootScope.orgInfo.orgId).then(function(data){
            $scope.pageInfo = data.data;
            $scope.deviceNumber = $scope.pageInfo.list[0].vNhCode;//默认选中第一个
            $scope.loadData();
        },function(data){
            console.log(data);
        });
    };*/
    
    $("#showChartsTimePoint").html($("" +
            "<div class=\"liangspz-charts\" id=\"sjd\" style=\"height: 100%;width:100%;z-index:1;\" >" +
            "</div>"));
    
    $scope.loadData = function() {
    	energyAnalyzeService.getTimePointThree($rootScope.orgInfo.orgId,$scope.searchStartDate,$scope.searchEndDate).then(function(data){
    		
            var labelOption = {
            	    normal: {
            	        show: false,
            	        formatter: '{c}  {name|{a}}',
            	        fontSize: 16,
            	        rich: {
            	            name: {
            	                textBorderColor: '#fff'
            	            }
            	        }
            	    }
            	};
            
            // 指定图表的配置项和数据
            var option = {
            		// backgroundColor: '#1b1b1b', // 背景颜色
            	    color: ['#003366', '#4cabce', '#e5323e'],
            	    tooltip: {
            	        trigger: 'axis',
            	        axisPointer: {
            	            type: 'shadow'
            	        }
            	    },
            	    /******样式******/
            	    legend: {
            	    	show: true,
            	    	//图例显示在右边
            	    	orient : 'vertical',  //布局  纵向布局
            	    	x: 'right',
            	    	y: 'center',
            	    	textStyle:{    //图例文字的样式
            	    	    color:'#fff',
            	    	    fontSize:12
            	    	  },
            	        data: ['风机', '照明', '插座']
            	    },
              	    //控制边距　
                    grid: {
                        x: 50,
                        y: 50,
                        height:100,
                        width:100 // y轴间距，值越大，间距越小
                    },
            	    calculable: true,
            	    xAxis: [
            	        {
//            	        	name: '年度',
            	            type: 'category',
            	            axisTick: {show: false},
            	            data: ['2014','2015','2016','2017','2018' ],
            	            //设置字体倾斜  
                            axisLabel:{
                                interval:0,  
                                rotate:0,//倾斜度 -90 至 90 默认为0  
                                margin:2,  
                                textStyle:{  
                                    fontWeight:"bolder",  
                                    color:"#fff"  //白色
                                }  
                            },
                            axisLine: {
            	                lineStyle: {
            	                    type: 'solid',
            	                    color:'#fff',
            	                    width:'1'
            	                }
            	            }
            	        }
            	    ],
            	    yAxis: [
            	        {
            	        	//name: '数量',
            	            type: 'value',
            	            splitLine: {show: true},//去除网格线
            	            splitArea : {show : false},//保留网格区域
            	            axisLine: {
            	                lineStyle: {
            	                    type: 'solid',
            	                    color:'#fff',
            	                    width:'1'
            	                }
            	            },
            	            axisLabel: {
            	              interval:0,  
                                rotate:0,//倾斜度 -90 至 90 默认为0
            	                textStyle: {
            	                    color: '#fff'
            	                }
            	            }
            	        }
            	    ],
            	    series: [
            	        {
            	            name: '风机',
            	            type: 'bar',
            	            barGap: '5%', //  柱间隔
            	            label: labelOption,
            	            barWidth : 10,
            	            data: [10, 22, 51,20,40,50]
            	            
            	        },
            	        {
            	            name: '照明',
            	            type: 'bar',
            	            label: labelOption,
            	            barWidth : 10,
            	            data: [10, 22, 51,20,40,50]
            	        },
            	        {
            	            name: '插座',
            	            type: 'bar',
            	            label: labelOption,
            	            //设置宽度
            	            barWidth : 10,
            	            data: [10, 22, 51,20,40,50]
            	        }
            	    ]
            	};
            
            //获取实时数据--具体点的数据
            $scope.getRealTemp = function (data) {
                var timeList = [];// 时间集合
                var fj = [];// 风机
                var zm = [];// 照明
                var cz = [];// 插座
                for (var i=0;i<data.length;i++){
                	fj.push(data[i].fj);
                	zm.push(data[i].zm);
                	cz.push(data[i].cz);
                    timeList.push(data[i].vUpdateTime);
                }
                option.series[0].data = fj;
                option.series[1].data = zm;
                option.series[2].data = cz;
                option.xAxis[0].data= timeList;
            }
            var myChart = echarts.init(document.getElementById('sjd'));
            $scope.getRealTemp(data);
            option.grid.height = $("#showChartsTimePoint").height()/1.5-25;
            option.grid.width = $("#showChartsTimePoint").width()*0.8;

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },function(data){
            console.log(data);
            
        });
    }
    
    $scope.loadData();
	
});
angular.module('app.intelligent').controller("timeComparisonCtrl", function($scope, $state, $rootScope,$stateParams,$uibModal,energyAnalyzeService,meterQueryService) {
	
	// 默认分页
	/*$scope.pageInfo = {pageNum : 1, pageSize : 10};
	// 设备号下拉列表
    $scope.loadDatas = function () {
    	meterQueryService.getDeviceInfo($rootScope.orgInfo.orgId).then(function(data){
            $scope.pageInfo = data.data;
            $scope.deviceNumber = $scope.pageInfo.list[0].vNhCode;//默认选中第一个
            var date=new Date();
            $scope.oneTimeEnd = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            $scope.oneTimeStart = date.getFullYear()+"-"+(date.getMonth()+1)+"-01";
            $scope.loadData();
        },function(data){
            console.log(data);
        });
    };*/
    
    //时间段二根据时间段一规则获得
    $scope.timeChange = function(){
    	if($scope.twoTimeStart == null || $scope.twoTimeStart == ""){
    		$scope.twoTimeEnd = "";
    	}else{
    		var day = $scope.DateSub($scope.oneTimeStart,$scope.oneTimeEnd);
    		$scope.twoTimeEnd = $scope.DateSum($scope.twoTimeStart,day);
    	}
    }
    //日期相减求天数
    $scope.DateSub = function(date1,date2){//date1:小日期   date2:大日期
	  　　var mindate = Date.parse(new Date(date1)); 
	  　　var maxdate = Date.parse(new Date(date2)); 
	  　　var day = Math.abs(parseInt((maxdate - mindate)/1000/3600/24)); 
	  　　return day;  
    }
    //日期加天数求新日期
    $scope.DateSum = function(date,day){//date:小日期   day:天数
    	var time = new Date(date); 
    	var time = new Date(time.setDate(time.getDate()+day));
    	var month = time.getMonth()+1;
    	if(month < 10){
        	month = "0"+month;
        }
    	var day = time.getFullYear()+"-"+month+"-"+(time.getDate()); 
    	return day; 
    }
	
	$("#showChartsTime").html($("" +
            "<div class=\"charts-histogram-1\" id=\"quxt\" style=\"height: 100%;width:100%;z-index:1;\" >" +
            "</div>"));
	
	$scope.loadData = function () {
		if($scope.oneTimeStart == null || $scope.oneTimeStart == "" || $scope.oneTimeEnd == null || $scope.oneTimeEnd == ""){
			alert("时间段一不能为空！");
			return false;
		}
		energyAnalyzeService.getTimeThree($rootScope.orgInfo.orgId,$scope.vHhtype,
				$scope.oneTimeStart,$scope.oneTimeEnd,$scope.twoTimeStart,$scope.twoTimeEnd).then(function(data){
            //初始化echarts 图表
            var option = {
                tooltip : {
                    trigger: 'axis'
                },
                grid:{
                    height:90,
                    width:100,
                    y : 10
                },
                color:['#00FF00','#4bb4ff','#ff6953','#ed19ff'],
                legend: {
                    // data:['粮温','仓内温','仓外温','仓内湿','仓外湿'],
                    data:['时间段一','时间段二'],
                    orient: 'vertical',      // 布局方式，默认为水平布局，可选为：
                    // 'horizontal' ¦ 'vertical'
                    x: 'right',               // 水平安放位置，默认为全图居中，可选为：
                    // 'center' ¦ 'left' ¦ 'right'
                    // ¦ {number}（x坐标，单位px）
                    y: '15px',                  // 垂直安放位置，默认为全图顶端，可选为：
                    // 'top' ¦ 'bottom' ¦ 'center'
                    // ¦ {number}（y坐标，单位px）
                    textStyle: {
                        color: '#fff'          // 图例文字颜色
                    }
                },
                calculable: true,
                xAxis : [
                    {
                        name: '时间段',
                        type : 'category',
                        boundaryGap : false,
                        data : ['周一','周二','周三','周四','周五','周六','周日'],
                        axisLabel: {
                            textStyle: {
                                color: '#fff',//坐标值得具体的颜色
                            }
                        },
                        lineStyle: {
                            type: 'solid',
                            color:'#ffffff',
                            width:'1'
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        show : true,
                        axisLabel: {
                            textStyle: {
                                color: '#fff',//坐标值得具体的颜色
                            }
                        },
                        axisLine : {
                            lineStyle: {
                                type: 'solid',
                                color:'#ffffff',
                                width:'1'
                            }
                        }
                    }
                ],
                series : [
                    {
                        name:'时间段一',
                        type:'line',
                        smooth:true,
                        // itemStyle: {normal: {areaStyle: {type: 'default'}}}, //面积图和曲线图的区别
                        data:[10, 12, 21, 54, 260, 830, 710]
                    },
                    {
                        name:'时间段二',
                        type:'line',
                        smooth:true,
                        // itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[30, 182, 434, 791, 390, 30, 10]
                    }
                ]
            };

            //获取实时数据--具体点的数据
            $scope.getRealTemp = function (data) {
            	var oneTimeList = data.oneTime;
            	var twoTimeList = data.twoTime;
            	
                var timeList = [];// 时间段集合
                var one = [];// 时间段一
                var two = [];// 时间段二
                for (var i=0;i<oneTimeList.length;i++){
                	one.push(oneTimeList[i].fTotalNh);
                }
                for (var i=0;i<twoTimeList.length;i++){
                	two.push(twoTimeList[i].fTotalNh);
                }
                if(oneTimeList.length >= twoTimeList.length){
                	for (var i=0;i<oneTimeList.length;i++){
                        timeList.push(i+1);
                    }
                }else{
                	for (var i=0;i<twoTimeList.length;i++){
                        timeList.push(i+1);
                    }
                }
                
                option.series[0].data = one;
                option.series[1].data = two;
                option.xAxis[0].data= timeList;
            }

            var myChart = echarts.init(document.getElementById('quxt'));
            $scope.getRealTemp(data);
            option.grid.height = $("#showChartsTime").height()/1.5-25;
            option.grid.width = $("#showChartsTime").width()*0.8;
            myChart.setOption(option);
            
        },function(data){
            console.log(data);
        });
    }
	
	$scope.loadDatas = function () {
        var date=new Date();
        var month = date.getMonth()+1;
        if(month < 10){
        	month = "0"+month;
        }
        $scope.oneTimeEnd = date.getFullYear()+"-"+month+"-"+date.getDate();
        $scope.oneTimeStart = date.getFullYear()+"-"+month+"-01";
        $scope.loadData();
    };
    $scope.loadDatas();
	
});