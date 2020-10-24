"use strict";

angular.module('app.system').controller("chuldjCtrl", 
		function($scope,$stateParams, $rootScope,$timeout, $uibModal, liangspzService, $state, APP_CONFIG) {
	$("#cldj").html($("" +
            "<div class=\"home-module-content\" id=\"cldj\" style=\"height: 100%;width:100%;\" >" +
            "</div>"));
	
	$scope.loadData = function() {
		liangspzService.getDateDj($rootScope.orgInfo.orgId).then(function(data){
            $scope.pageInfo = data;
            var yi=data.yi;
            var er=data.er;
            var san=data.san;
            var myChart = echarts.init(document.getElementById('cldj'));
            var option = {
//            	    backgroundColor: '#1b1b1b', // 背景颜色
            	    title : {
            	        x:'center',
            	        y: 'center'
            	    },
            	    tooltip : {
            	        trigger: 'item',
            	        formatter: "{a} <br/>{b} : {c} ({d}%)"
            	    },
                    grid: {
                        x: 20,
                        y: 50,
                        x2: 60, // x轴间距，值越大，间距越小
                        y2: 60, // y轴间距，值越大，间距越小
                        height:100,
                        width:100 
                    },
            	    legend: {
            	    	show: true,
            	    	x: 'right',
            	    	y: 'center',
            	        orient: 'vertical',
            	        left: 'right',
            	        textStyle:{    //图例文字的样式
            	    	    color:'#fff',
            	    	    fontSize:8
            	    	  },
            	        data: ['一级','二级','三级']
            	    },
            	    series : [
            	        {
            	            name: '储粮等级',
            	            type: 'pie',
            	            radius : '65%',
            	            center: ['50%', '50%'],
            	            data:[
            	                {value:yi, name:'一级'},
            	                {value:er, name:'二级'},
            	                {value:san, name:'三级'}
            	            ],
            	            itemStyle: {
            	                emphasis: {
            	                    shadowBlur: 10,
            	                    shadowOffsetX: 0,
            	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
            	                }
            	            }
            	        }
            	    ],
            	    //颜色顺序123
            	    color: ['#c33430','#FFE06B','#60A1A9','rgb(200,200,169)','rgb(131,175,155)']
            	};
            
            option.grid.height = $("#cldj").height()/1.5-25;
            option.grid.width = $("#cldj").width()*0.8;
            
            myChart.setOption(option);
            
        },function(data){
            console.log(data);
            
        });
    }
	
	$scope.loadData();
	
})
