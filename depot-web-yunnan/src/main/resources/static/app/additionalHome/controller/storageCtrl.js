'use strict';

angular.module('app.additionalHome').controller('storageCtrl', function ($rootScope,$scope,$state,$filter,$compile,$http,selectService,
		safeProduceNotifyService,safeproduceService,warningThresholdService,aerationJobService,StorehouseService,
		fumigationPlanService,homeWorkService,threetempcheckService,grainTempService,liangspzService,APP_CONFIG) {
	$scope.pageInfo = {pageNum : 1, pageSize : 5};
	$scope.loadData = function() {
		//待办
		$scope.operator = $rootScope.userInfo.userId;
	   	selectService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, "todo",$scope.approval,null,null,$scope.operator,"desc").then(function(data){
            $scope.handleInfo = data;
            if(data.list.length < 1){
            	$(".list").html("<img src='styles/img/qualityCheck/timg.jpg' style='width:100%;height:100%;'>");
            }
        },function(data){
            console.log(data);
        });
	   	
	   	//通知公告
		safeProduceNotifyService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, null)
		.then(function(data) {
			$scope.safeProduceNumber = data.total;
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
		
		//全部（预警报警）
		warningThresholdService.getInsectPestDetectionPageInfo($scope.pageInfo, $scope.search,"WD").then(function (data) {
			$scope.warnTotal = data.data.total;
        }, function (data) {
            console.log(data);
        });
        
		$scope.pageInfo = {pageNum : 1, pageSize : 100000};
        //全部、已完成、进行中（通风作业）
		aerationJobService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.aerationJob).then(function(data){
    		$scope.ventilateTotal = data.data.total;
    		var finshNum = 0;
    		for(var i=0;i<data.data.list.length;i++){
    			var taskState = data.data.list[i].taskState;
    			if(taskState == 2){
    				finshNum=finshNum+1;
    			}
    		}
    		$scope.ventilateFinsh = finshNum;
    		$scope.ventilateNoFinsh = $scope.ventilateTotal-$scope.ventilateFinsh;
    		
        },function(data){
            console.log(data); 
        });
		
		//全部、已完成、进行中（熏蒸作业）
		var orgId = $rootScope.orgInfo.orgId;
		fumigationPlanService.getFumigationPlanList($scope.pageInfo, "", orgId, "LB").then(function(data){
            $scope.fumigationTotal = data.total;
            homeWorkService.getFumigationAfterList($scope.pageInfo, null, orgId).then(function(data){
                $scope.fumigationTaskFinsh = data.total;
                $scope.fumigationTaskNoFinsh = $scope.fumigationTotal-$scope.fumigationTaskFinsh;
            },function(data){
                console.log(data);
            });
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
	
	// 审批页面
    $scope.auditPage = function(id,processInstanceId,taskType,taskId,auditId,result) {
    	$scope.switchTopMenu(8);
    	if (result != "待审批") {
            alert("您已经提交该数据，无法再次提交！");
            return;
         }
         if (taskType=="plan") {//计划
        	 $state.go("app.business.plan-audit-save",{type: null,id:id,
        		 processInstanceId:processInstanceId,taskId:taskId,auditId:auditId});
         }
         if (taskType=="contract"){//合同
        	 $state.go("app.business.contract-audit-save",{type: null,id:id,
        		 processInstanceId:processInstanceId,taskId:taskId,auditId:auditId});
         }
         if(taskType=="contractChange"){//合同变更
        	 $state.go("app.business.contract-change-audit-save",{type: null,id:id,
        		 processInstanceId:processInstanceId,taskId:taskId,auditId:auditId});
         }
         if(taskType=="storageNotice"){//通知单
        	 $state.go("app.business.storageNotice-audit-edit",{type: null,id:id,
        		 processInstanceId:processInstanceId,taskId:taskId,auditId:auditId});
         }
         if(taskType=="deliveryNotice"){
        	 $state.go("app.business.deliveryNotice-audit-edit",{type: null,id:id,
        		 processInstanceId:processInstanceId,taskId:taskId,auditId:auditId});
         }
         if(taskType=="storageAeration"){
        	 $state.go("app.business.aerationTask-audit-save",{type: null,id:id,
        		 processInstanceId:processInstanceId,taskId:taskId,auditId:auditId});
         }
    };

    // 更多
    $scope.more=function() {
    	$scope.switchTopMenu(8);
    	$state.go("app.business.handle-view");
    }
    
    // 发布通知公告
    $scope.showAddNotify=function (id) {
    	var className = $("#"+id).parent().parent().attr("class");
    	if(className.indexOf("flip-current") != -1){
    		$scope.switchTopMenu(19);
    		$state.go('app.storage.safeproduce.notifyAdd', {id:0,isNotEdit:false,topRow:$rootScope.orgInfo.orgName+"通告:\n"});
    	}
    };
    
    // 编制通风申请
    $scope.ventilateApply=function (id) {
    	var className = $("#"+id).parent().parent().attr("class");
    	if(className.indexOf("flip-current") != -1){
    		$scope.switchTopMenu(218);
    		$state.go('app.intelligent.aeration.plan.applyEdit', {id:'',butId:2,pageType:0,taskId:null,auditId:null});
    	}
    };
    
    // 编制熏蒸申请
    $scope.fumigationApply=function (id) {
    	var className = $("#"+id).parent().parent().attr("class");
    	if(className.indexOf("flip-current") != -1){
    		$scope.switchTopMenu(218);
    		$state.go('app.intelligent.fumigation.fumigationPlanEdit',{fumType:'add',fumigationId:''});
    	}
    };
    
    // 倒仓申请
    $scope.wareHouseApply=function (id) {
    	var className = $("#"+id).parent().parent().attr("class");
    	if(className.indexOf("flip-current") != -1){
    		
    	}
    };
    
    //预警报警
    $scope.warnWD = function(){
    	$scope.switchTopMenu(8);
    	$state.go("app.supervise.situation.temperature");
    }
    
    //通风作业
    $scope.ventilateTask = function(){
    	$scope.switchTopMenu(218);
    	$state.go("app.intelligent.aeration.control.aerationJob");
    }
    
    //熏蒸作业
    $scope.fumigationTask = function(){
    	$scope.switchTopMenu(218);
    	$state.go("app.intelligent.fumigation.fumigationPlanList");
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