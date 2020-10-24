"use strict";

angular.module('app.system').controller("liangspzCtrl", 
		function($scope,$stateParams, $rootScope,$timeout, $uibModal, liangspzService, $state, APP_CONFIG) {
	
	$("#lspz").html($("" +
            "<div class=\"liangspz-charts\" id=\"lspz\" style=\"height: 100%;width:100%;\" >" +
            "</div>"));
	
	$scope.loadData = function() {
		liangspzService.getDate($rootScope.orgInfo.orgId).then(function(data){
            $scope.pageInfo = data.dad;

            var xiaomai=data.xiaomai;

            var yumi=data.yumi;

            var daogu=data.daogu;

            var dadou=data.dadou;

            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('lspz'));
            
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
            	    color: ['#003366', '#006699', '#4cabce', '#e5323e'],
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
            	    	    fontSize:8
            	    	  },
            	        data: ['大豆', '玉米', '小麦', '稻谷']
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
            	            data: data.years,
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
            	            name: '大豆',
            	            type: 'bar',
            	            barGap: '5%', //  柱间隔
            	            label: labelOption,
            	            barWidth : 10,
            	            data: dadou
            	            
            	        },
            	        {
            	            name: '玉米',
            	            type: 'bar',
            	            label: labelOption,
            	            barWidth : 10,
            	            data: yumi
            	        },
            	        {
            	            name: '小麦',
            	            type: 'bar',
            	            label: labelOption,
            	            //设置宽度
            	            barWidth : 10,
            	            data: xiaomai /*[10, 22, 51,20,40,50]*/
            	        },
            	        {
            	            name: '稻谷',
            	            type: 'bar',
            	            label: labelOption,
            	            barWidth : 10,
            	            data: daogu
            	        }
            	    ]
            	};
            
            option.grid.height = $("#lspz").height()/1.5-25;
            option.grid.width = $("#lspz").width()*0.8;

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },function(data){
            console.log(data);
            
        });
    }
	
	$scope.loadData();
	
})
