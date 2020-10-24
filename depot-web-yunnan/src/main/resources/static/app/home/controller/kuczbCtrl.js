"use strict";

angular.module('app.system').controller("kuczbCtrl", 
		function($scope,$stateParams, $rootScope,$timeout, $uibModal, liangspzService, $state, APP_CONFIG) {
	
	$("#kuczb").html($("" +
            "<div class=\"kuczb-charts\" id=\"kuczb\" style=\"height: 100%;width:100%;\" >" +
            "</div>"));
	
	$scope.loadData = function() {
		liangspzService.getDateBl($rootScope.orgInfo.orgId).then(function(data){
			$scope.pageInfo = data;
			var sj=data;
			// 基于准备好的dom，初始化echarts实例
	        var myChart = echarts.init(document.getElementById('kuczb'));
	        
	        // 指定图表的配置项和数据
	        var option = {
	        		radius: '50%',
	        	    tooltip : {
	        	        formatter: "{a} <br/>{b} : {c}%"
	        	    },
	        	    grid: {
                        x: 20,
                        y: 50,
                        x2: 60, // x轴间距，值越大，间距越小
                        y2: 60, // y轴间距，值越大，间距越小
                        height:100,
                        width:100 
                    },
	        	    series: [
	        	        {
//	        	            name: '业1务指标',
	        	            type: 'gauge',
	        	            z: 3,
//	        	            splitNumber: 11,
	        	            radius: '80%',
            	            center: ['50%', '60%'],
	        	            axisLine: {            // 坐标轴线
	        	                lineStyle: {       // 属性lineStyle控制线条样式
	        	                    width: 20
	        	                }
	        	            },
	        	            axisTick: {            // 坐标轴小标记
	        	                length: 5,        // 属性length控制线长
	        	                lineStyle: {       // 属性lineStyle控制线条样式
	        	                    color: '#fff'
	        	                }
	        	            },
	        	            splitLine: {           // 分隔线
	        	                length: 20,         // 属性length控制线长
	        	                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
	        	                    color: '#fff'
	        	                }
	        	            },
	        	            //设置仪表盘的刻度相关属性
	        	            axisLabel: {
	        	            	fontSize:8
	        	            },
	        	            title : {
	        	            	show: false,
	        	            	x:'center',
	        	            	y: 'center',
	       	                    fontWeight: 'bolder',
	        	                fontSize:12,
	        	                fontStyle: 'italic',
	        	             // 设置上下的内边距为 5，左右的内边距为 10
	        	                textStyle:{
	        	                    //文字颜色
	        	                    color:'#ccc',
	        	                    //字体风格,'normal','italic','oblique'
	        	                    fontStyle:'normal',
	        	                    //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
	        	                    fontWeight:'lighter',
	        	                    //字体系列
	        	                    fontFamily:'sans-serif',
	        	                    verticalAlign : 'middle',
	        	                }
	        	            },
	        	            detail: {
	        	            	formatter:'{value}%',
	        	            	offsetCenter: [0, '75%'],
	        	            	fontSize: 16
	        	            	},
	        	            data: [{value: sj, name: '库存占比'}]
	        	        }
	        	    ]
	        	};
	        
	        option.grid.height = $("#kuczb").height()/1.5-25;
            option.grid.width = $("#kuczb").width()*0.8;

	        // 使用刚指定的配置项和数据显示图表。
	        myChart.setOption(option);
            
        },function(data){
            console.log(data);
            
        });
    }
	
	$scope.loadData();
	
})
