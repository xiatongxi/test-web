'use strict';

angular.module('app.additionalHome').controller('qualityCtrl', function ($rootScope,$scope,$state,$filter,$compile,$http, 
		safeProduceNotifyService,safeproduceService,acceptanceService,qualitycheckService,StorehouseService,
		threetempcheckService,grainTempService,liangspzService,APP_CONFIG) {
	$scope.pageInfo = {pageNum : 1, pageSize : 5};
	$scope.loadData = function() {
		//公告
		safeProduceNotifyService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, null)
		.then(function(data) {
			$scope.qualityPageInfo = data;
			$scope.safeProduceNumber = data.total;
			if(data.list.length < 1){
            	$(".list").html("<img src='styles/img/qualityCheck/timg.jpg' style='width:100%;height:100%;'>");
            }
		}, function(data) {
			console.log(data);
		});
		
		//公共文档
		safeproduceService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, 1, null)
		.then(function(data) {
			$scope.documentsNumber = data.total;
		}, function(data) {
			console.log(data);
		});
		
		//全部（验收）
        $scope.searchCondition = {planNumber:null,planTitle:null,customerPlanState:null};
        // 获取列表数据
        acceptanceService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, 
        		$scope.searchCondition, null).then(function(data){
            $scope.acceptanceTotal = data.total;
        },function(data){
            console.log(data);
        });
        //已验收（验收）
        $scope.searchCondition = {planNumber:null,planTitle:null,customerPlanState:100};
        // 获取列表数据
        acceptanceService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, 
        		$scope.searchCondition, null).then(function(data){
			$scope.acceptancedNumber = data.total;
		},function(data){
			console.log(data);
		});
        //未验收（验收）
        $scope.searchCondition = {planNumber:null,planTitle:null,customerPlanState:-100};
        // 获取列表数据
        acceptanceService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, 
        		$scope.searchCondition, null).then(function(data){
			$scope.noAcceptanceNumber = data.total;
		},function(data){
			console.log(data);
		});
        
        //全部（春秋普查）
        qualitycheckService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,2,null,null,null).then(function(data){
            $scope.generalSurveyTotal = data.total;
        },function(data){
            console.log(data);
        });
        //合格（春秋普查）
        qualitycheckService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,2,"0",null,null).then(function(data){
        	$scope.qualifiedNumber = data.total;
        },function(data){
        	console.log(data);
        });
        //不合格（春秋普查）
        qualitycheckService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,2,"1",null,null).then(function(data){
        	$scope.unqualifiedNumber = data.total;
        },function(data){
        	console.log(data);
        });
        
        //全部（第三方检查）
        qualitycheckService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,5,null,null,null).then(function(data){
        	$scope.thirdPartyTotal = data.total;
        },function(data){
        	console.log(data);
        });
        //合格（第三方检查）
        qualitycheckService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,5,"0",null,null).then(function(data){
        	$scope.passNumber = data.total;
        },function(data){
        	console.log(data);
        });
        //不合格（第三方检查）
        qualitycheckService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,5,"1",null,null).then(function(data){
        	$scope.noPassNumber = data.total;
        },function(data){
        	console.log(data);
        });
        
        //仓房信息下拉
        StorehouseService.getStorehouseList($rootScope.orgInfo.orgId).then(function(data){
            if((data.houseList).length>0){
                $scope.storehouseList = data.houseList;  //下拉列表数据
            }
        },function (data) {
            console.log(data);
        });
		
	};
	
	// 查看页面
    $scope.showViewNotify = function(id) {
    	$scope.switchTopMenu(19);
        $state.go('app.storage.safeproduce.notifyAdd', {id:id,isNotEdit:true});
    };
    
    // 发布通知公告
    $scope.showAddNotify=function (id) {
    	var className = $("#"+id).parent().parent().attr("class");
    	if(className.indexOf("flip-current") != -1){
    		$scope.switchTopMenu(19);
    		$state.go('app.storage.safeproduce.notifyAdd', {id:0,isNotEdit:false,topRow:$rootScope.orgInfo.orgName+"通告:\n"});
    	}
    };
    
    //验收
    $scope.acceptance = function(type){
    	$scope.switchTopMenu(19);
    	$state.go("app.storage.acceptanceList",{customerPlanState:type});
    }
    
    //验收申请
    $scope.acceptanceApplication = function(type,id){
    	var className = $("#"+id).parent().parent().attr("class");
    	if(className.indexOf("flip-current") != -1){
    		$scope.switchTopMenu(19);
    		$scope.searchCondition = {planNumber:null,planTitle:null,customerPlanState:50};
    		// 获取列表数据
    		acceptanceService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, 
    				$scope.searchCondition, null).then(function(data){
    					for(var i=0;i<data.list.length;i++){ 
    						var ids = data.list[i].id;
    						$state.go("app.storage.acceptanceEditYS",{id:ids});
    						break;
    					}
    				},function(data){
    					console.log(data);
    				});
    	}
    }
    
    //春秋普查
    $scope.generalSurvey = function(type){
    	$scope.switchTopMenu(19);
    	$state.go("app.storage.qualitycheck.spr.sprlist",{type:2,checkResult:type});
    }
    
    //第三方检查
    $scope.thirdParty = function(type){
    	$scope.switchTopMenu(19);
    	$state.go("app.storage.qualitycheck.spr.sprlist",{type:5,checkResult:type});
    }
    
    // 安全生产通知
    $scope.safeProduceNotifyTodo=function() {
    	$scope.switchTopMenu(19);
    	$state.go("app.storage.safeproduce.notifyList");
    }
    
    // 安全生产管理制度
    $scope.safeProduceTodo=function(layerType,id) {
    	if("publish" == layerType){//跳转文档发布页面
    		var className = $("#"+id).parent().parent().attr("class");
        	if(className.indexOf("flip-current") != -1){
        		$scope.switchTopMenu(19);
        		$state.go('app.storage.safeproduce.list', {type:1,layerType:'publish'});
        	}
    	}else if("list" == layerType) {//跳转文档列表页面
    		$scope.switchTopMenu(19);
    		$state.go('app.storage.safeproduce.list', {type:1});
    	}
    }
    
    $scope.switchTopMenu = function(funcId) {
		if (!$("#menu-"+funcId).hasClass('open')) {
			$("#menu-"+funcId).smartCollapseToggle();
		}
		if (funcId==18) {
			$('body').addClass("minified");
		} else {
			$('body').removeClass("minified");
		}
		$rootScope.childSysId = funcId;
		sessionStorage.setItem("childSysId", funcId);
	}
    
    // 三温检查列表
    $scope.loadThreeTemperature= function() {
        //查询三温检查列表最新数据所对应的仓房
    	StorehouseService.getThreeTempCheckList($rootScope.orgInfo.orgId).then(function(data){
            if((data.houseList).length>0){
            	$scope.houseId = data.houseList[0].storehouseId;
            }else{
        		$scope.houseId = "";
        	}
            $scope.initThree();
        },function (data) {
            console.log(data);
        });
    }
    
    $scope.initThree = function(){
    	grainTempService.getThreeConditionHomePage($rootScope.orgInfo.orgId,$scope.houseId,"13").then(function(data){
        	//初始化echarts 图表
            var option = {
                tooltip : {
                    trigger: 'axis'
                },
                grid:{
                	left: '3%',
                    right: '7%',
                    bottom: '3%',
                    containLabel: true
                },
                color:['#00FF00','#ffdb43','#4bb4ff'],
                legend: {
                    data:['粮温','仓内温','仓外温'],
                    icon: "circle",
                    itemWidth: 10,
                    itemHeight: 10,
                    itemGap: 20,
                    right: '4%',                 // 垂直安放位置，默认为全图顶端，可选为：
                    textStyle: {
                        color: '#000'          // 图例文字颜色
                    }
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['周一','周二','周三','周四','周五','周六','周日'],
                        axisLabel: {
                            textStyle: {
                                color: '#000',//坐标值得具体的颜色
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#000', 
                                width: 1 
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle:{
                                 color: ['#eee'],
                                 width: 1,
                                type: 'solid'
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        show : true,
                        axisLabel: {
                            textStyle: {
                                color: '#000',//坐标值得具体的颜色
                            }
                        },
                        axisLine : {
                            lineStyle: {
                                type: 'solid',
                                color:'#000000',
                                width:'1'
                            }
                        }
                    }
                ],
                series : [
                    {
                        name:'粮温',
                        type:'line',
                        smooth:true,
                        data:[10, 12, 21, 54, 260, 830, 710]
                    },
                    {
                        name:'仓内温',
                        type:'line',
                        smooth:true,
                        data:[30, 182, 434, 791, 390, 30, 10]
                    },
                    {
                        name:'仓外温',
                        type:'line',
                        smooth:true,
                        data:[1320, 1132, 601, 234, 120, 90, 20]
                    },
                    {
                        name:'仓内湿',
                        type:'line',
                        smooth:true,
                        data:[1320, 1132, 601, 234, 120, 90, 20]
                    },
                    {
                        name:'仓外湿',
                        type:'line',
                        smooth:true,
                        data:[1320, 1132, 601, 234, 120, 90, 20]
                    }
                ]
            };

            //获取实时数据--具体点的数据
            $scope.getRealTemp = function (data) {
                var timeList = [];// 时间集合
                var lswd = [];// 粮食温度
                var cwwd = [];// 仓外温度
                var cnwd = [];// 仓内温度
                var cnsd = [];// 仓内湿度
                var cwsd = [];// 仓外湿度
                for (var i=0;i<data.length;i++){
                    lswd.push(data[i].lswd);
                    cwwd.push(data[i].cwwd);
                    cnwd.push(data[i].cnwd);
                    cnsd.push(data[i].cnsd);
                    cwsd.push(data[i].cwsd);
                    timeList.push(data[i].days);
                }
                option.series[0].data = lswd;
                option.series[1].data = cnwd;
                option.series[2].data = cwwd;
                option.series[3].data = cnsd;
                option.series[4].data = cwsd;
                option.xAxis[0].data= timeList;
            }

            var myChart = echarts.init(document.getElementById("Thermometer"));
            $scope.getRealTemp(data);
            myChart.setOption(option);
            
        },function(data){
            console.log(data);
        });
    }
    
    //粮食品种柱形图
    $scope.loadFoodstuff = function(){
    	liangspzService.getDate().then(function(data){
    		var xiaomai=data.xiaomai;
            var yumi=data.yumi;
            var daogu=data.daogu;
            var dadou=data.dadou;
            
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById("foodstuff"));
            
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
            	    color: ['#003366', '#006699', '#4cabce', '#e5323e'],
            	    tooltip: {
            	        trigger: 'axis'
            	    },
            	    legend: {
            	        data: ['大豆', '玉米', '小麦', '稻谷'],
            	        itemGap: 20,
                        right: '4%'
            	    },
              	    //控制边距　
                    grid: {
                    	left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
            	    calculable: true,
            	    xAxis: [
            	        {
            	            type: 'category',
            	            data: data.years,
            	            splitLine: {
                                show: true,
                                lineStyle:{
                                    color: ['#eee'],
                                    width: 1,
                                    type: 'solid'
                                }
                            },
                            axisLabel:{
                            	show: true,  
                                textStyle:{  
                                    color:"#000"
                                }  
                            },
                            axisLine: {
            	                lineStyle: {
            	                    color:'#000',
            	                    width:'1'
            	                }
            	            }
            	        }
            	    ],
            	    yAxis: [
            	        {
            	            type: 'value',
            	            splitLine: {
            	            	show: true,
            	            	lineStyle:{
                                   color: ['#eee'],
                                   width: 1,
                                   type: 'solid'
                               }
            	            },
            	            axisLine: {
            	                lineStyle: {
            	                    color:'#000',
            	                    width:'1'
            	                }
            	            },
            	            axisLabel: {
            	            	show: true,
                                textStyle: {
                                    color: '#928f8f'
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
            	            barWidth : 10,
            	            data: xiaomai
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
            
            myChart.setOption(option);
        },function(data){
            console.log(data);
            
        });
    }
    
    $scope.loadData();
    $scope.loadThreeTemperature();
    $scope.loadFoodstuff();
    
});