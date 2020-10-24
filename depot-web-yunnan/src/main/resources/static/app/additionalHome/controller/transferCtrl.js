'use strict';

angular.module('app.additionalHome').controller('transferCtrl', function ($rootScope,$scope,$state,$filter,$compile,$http,
		selectService,safeProduceNotifyService,safeproduceService,transferContractService,contractScheduleService,
		liangspzService,APP_CONFIG) {
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
		
        //全部（合同）
		transferContractService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, "", $scope.searchCondition).then(function(data){
            $scope.transferContractTotal = data.total;
        },function(data){
            console.log(data);
        });
		
		//中转合同执行进度
		contractScheduleService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition,"6913").then(function(data){
            $scope.transferContractInfo = data;
        },function(data){
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
         if (taskType=="plan") {
        	 $state.go("app.business.plan-audit-save",{type: null,id:id,
        		 processInstanceId:processInstanceId,taskId:taskId,auditId:auditId});
         }
         if (taskType=="contract"){
        	 /*$state.go("app.business.contract-audit-save",{type: null,id:id,
        		 processInstanceId:processInstanceId,taskId:taskId,auditId:auditId});*/
        	 $state.go("app.business.transferContract-audit-save",{type: null,id:id,
        		 processInstanceId:processInstanceId,taskId:taskId,auditId:auditId});
         }
         if(taskType=="contractChange"){
        	 /*$state.go("app.business.contract-change-audit-save",{type: null,id:id,
        		 processInstanceId:processInstanceId,taskId:taskId,auditId:auditId});*/
        	 $state.go("app.business.transferContract-change-audit-save",{type: null,id:id,
        		 processInstanceId:processInstanceId,taskId:taskId,auditId:auditId});
         }
         if(taskType=="storageNotice"){
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
    
    // 编制中转合同
    $scope.transferContractApply=function (id) {
    	var className = $("#"+id).parent().parent().attr("class");
    	if(className.indexOf("flip-current") != -1){
    		$scope.switchTopMenu(8);
    		$state.go("app.business.transferContract-edit", {id: 0});
    	}
    };
    
    //中转合同
    $scope.transferContractList = function(){
    	$scope.switchTopMenu(8);
    	$state.go("app.business.transferContract");
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
    
    //中转合同执行进度更多
    $scope.transferContractMore=function(){
    	$scope.switchTopMenu(8);
    	$state.go("app.business.contract-schedule",{contractType:6913}); 
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
    $scope.loadFoodstuff();
    
});