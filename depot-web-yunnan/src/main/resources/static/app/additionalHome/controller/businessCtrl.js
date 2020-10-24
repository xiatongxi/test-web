'use strict';

angular.module('app.additionalHome').controller('businessCtrl', function ($rootScope,$scope,$state,$filter,$compile,$http,selectService,
		safeProduceNotifyService,safeproduceService,planService,contractService,
		deliveryStorageNoticeService,liangspzService,APP_CONFIG) {
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
		
		$scope.pageInfo = {pageNum : 1, pageSize : 100000};
		//全部（计划）
		planService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
            $scope.planTotal = data.total;
            var buyPlanNum = 0;//收储计划数量
            var salePlanNum = 0;//销售计划数量
            for(var i=0;i<data.list.length;i++){
            	var executeType = data.list[i].executeType
            	if(executeType == 3154){
            		buyPlanNum = buyPlanNum+1;
            	}
            	if(executeType == 3155){
            		salePlanNum = salePlanNum+1;
            	}
            }
            $scope.buyPlanNum = buyPlanNum;
            $scope.salePlanNum = salePlanNum;
            $scope.rotationPlanNum = $scope.planTotal-$scope.buyPlanNum-$scope.salePlanNum;
        },function(data){
            console.log(data);
        });
        
        //全部、收储、销售（合同）
		contractService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, "", $scope.searchCondition).then(function(data){
            $scope.contractTotal = data.total;
            var buyNum = 0;//收储数量
            var saleNum = 0;//销售数量
            for(var i=0;i<data.list.length;i++){
            	var contractType = data.list[i].contractType
            	if(contractType == 3147){
            		buyNum = buyNum+1;
            	}
            	if(contractType == 3148){
            		saleNum = saleNum+1;
            	}
            }
            $scope.buyNum = buyNum; 
            $scope.saleNum = saleNum;
        },function(data){
            console.log(data);
        });
		
		//全部、出库、入库（通知单）
		deliveryStorageNoticeService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
            $scope.noticeTotal = data.total;
            var outBoundNum = 0;//出库数量
            for(var i=0;i<data.list.length;i++){
            	var billType = data.list[i].billType
            	if(billType == 3){
            		outBoundNum = outBoundNum+1;
            	}
            }
            $scope.outNoticeNum = outBoundNum;
            $scope.inNoticeNum = $scope.noticeTotal-$scope.outNoticeNum;
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
        	 $state.go("app.business.contract-audit-save",{type: null,id:id,
        		 processInstanceId:processInstanceId,taskId:taskId,auditId:auditId});
         }
         if(taskType=="contractChange"){
        	 $state.go("app.business.contract-change-audit-save",{type: null,id:id,
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
    
    // 编制计划
    $scope.planApply=function (id) {
    	var className = $("#"+id).parent().parent().attr("class");
    	if(className.indexOf("flip-current") != -1){
    		$scope.switchTopMenu(8);
    		$state.go("app.business.plan-edit",{id: 0});
    	}
    };
    
    // 编制合同
    $scope.contractApply=function (id) {
    	var className = $("#"+id).parent().parent().attr("class");
    	if(className.indexOf("flip-current") != -1){
    		$scope.switchTopMenu(8);
    		$state.go("app.business.contract-edit", {id: 0});
    	}
    };
    // 编制入库通知单
    $scope.inNoticeApply=function (id) {
    	var className = $("#"+id).parent().parent().attr("class");
    	if(className.indexOf("flip-current") != -1){
    		$scope.switchTopMenu(8);
    		$state.go("app.business.storageNotice-edit", {id : 0});
    	}
    };
    // 编制出库通知单
    $scope.outNoticeApply=function (id) {
    	var className = $("#"+id).parent().parent().attr("class");
    	if(className.indexOf("flip-current") != -1){
    		$scope.switchTopMenu(8);
    		$state.go("app.business.deliveryNotice-edit", {id : 0});
    	}
    };
    
    // 轮换计划上报
    $scope.rotationPlanApply=function (id) {
    	var className = $("#"+id).parent().parent().attr("class");
    	if(className.indexOf("flip-current") != -1){
    		$scope.switchTopMenu(8);
    		$state.go("app.business.grainReservesPlan-rotation-apply-edit",{id: 0,attributeType:1});
    	}
    };
    
    //计划
    $scope.planList = function(id){
    	$scope.switchTopMenu(8);
    	$state.go("app.business.plan",{executeType:id});
    }
    
    //合同
    $scope.contractList = function(id){
    	$scope.switchTopMenu(8);
    	$state.go("app.business.contract",{contractType:id});
    }
    
    //通知单
    $scope.storageNotice = function(type){
    	$scope.switchTopMenu(8);
    	$state.go("app.business.deliveryStorageNotice",{billType:type});
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