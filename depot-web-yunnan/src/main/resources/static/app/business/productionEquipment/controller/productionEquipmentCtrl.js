"use strict";

angular.module('app.business').controller("productionEquipmentCtrl", 
		function($scope,$stateParams, $rootScope,$timeout, $uibModal, productionEquipmentService, $state, APP_CONFIG) {
	
	$("#sheb").html($("" +
            "<div class=\"sheb-charts\" id=\"sheb\" style=\"height:100%;width:100%;\" >" +
            "</div>"));
	
	$scope.loadData = function() {
		productionEquipmentService.getDate().then(function(data){

			if(data.sumCount!="" ){
				//总数量
	            var sumCount = data.sumCount;
	            sumCount = sumCount.split(",");
			}else{
				sumCount = 0 ;
			}
			
			if(data.useCount!=""){
				//使用数量
	            var useCount = data.useCount;
	            useCount = useCount.split(",");
			}else{
				useCount = 0;
			}
            
            
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('sheb'));

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
            	    color: ['#98FB98', '#006699', '#4cabce', '#e5323e'],
            	    tooltip: {
            	        trigger: 'axis',
            	        axisPointer: {
            	            type: 'shadow'
            	        }
            	    },
            	    //******样式******//*
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
            	        data: ['总数量', '使用数量']
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
            	            data: ['仓储器材','粮库设备','零配件','物资' ],
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
            	            name: '总数量',
            	            type: 'bar',
            	            barGap: '5%', //  柱间隔
            	            label: labelOption,
            	            barWidth : 20,
            	            data: sumCount
            	            
            	        },
            	        /*{
            	            name: '玉米',
            	            type: 'bar',
            	            label: labelOption,
            	            barWidth : 20,
            	            data: [10,150]
            	        },*/
            	        /*{
            	            name: '小麦',
            	            type: 'bar',
            	            label: labelOption,
            	            //设置宽度
            	            barWidth : 20,
            	            data: xiaomais [10, 22, 51,20,40,50]
            	        },*/
            	        {
            	            name: '使用数量',
            	            type: 'bar',
            	            label: labelOption,
            	            barWidth : 20,
            	            data: useCount
            	        }
            	    ]
            	};


            
            option.grid.height = $("#sheb").height()/1.5-25;
            option.grid.width = $("#sheb").width()*0.8;

            
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },function(data){
            console.log(data);
            
        });
    }
	
	$scope.loadData();
	
	
	//药剂
	$("#yj").html($("" +
            "<div class=\"yj-charts\" id=\"yj\" style=\"height:100%;width:100%;\" >" +
            "</div>"));
	
	$scope.loadDrugData = function() {
		productionEquipmentService.getDrugDate().then(function(data){

			if(data.InputCount!="" ){
				//入库数量
	            var inputCount = data.InputCount;
	            inputCount = inputCount.split(",");
			}else{
				inputCount = 0 ;
			}
			
			if(data.UseCount!=""){
				//使用数量
	            var useCount = data.UseCount;
	            useCount = useCount.split(",");
			}else{
				UseCount = 0;
			}
            
			
            
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('yj'));

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
            	    color: ['#4cabce', '#e5323e','#98FB98', '#006699'],
            	    tooltip: {
            	        trigger: 'axis',
            	        axisPointer: {
            	            type: 'shadow'
            	        }
            	    },
            	    //******样式******//*
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
            	        data: ['总数量', '使用数量']
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
            	            data: ['防护剂','熏蒸剂','空仓、器材杀虫剂'],
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
            	            name: '总数量',
            	            type: 'bar',
            	            barGap: '5%', //  柱间隔
            	            label: labelOption,
            	            barWidth : 20,
            	            data: inputCount
            	            
            	        },
            	       
            	        {
            	            name: '使用数量',
            	            type: 'bar',
            	            label: labelOption,
            	            barWidth : 20,
            	            data: useCount
            	        }
            	    ]
            	};


            
            option.grid.height = $("#yj").height()/1.5-25;
            option.grid.width = $("#yj").width()*0.8;

            
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },function(data){
            console.log(data);
            
        });
    }
	
	$scope.loadDrugData();
	
})
