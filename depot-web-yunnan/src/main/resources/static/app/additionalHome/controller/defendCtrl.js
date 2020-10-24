'use strict';

angular.module('app.additionalHome').controller('defendCtrl', function ($rootScope,$scope,$state,$filter,$compile,$http, 
		safeProduceNotifyService,safeproduceService,liangspzService,alarmService,APP_CONFIG) {
	//库区缩略图
	$scope.birdsEyeUrl = $rootScope.orgInfo.birdsEye;
	
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
		
		//报警记录信息(全部)
		alarmService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, null, null)
        .then(function(data){
            $scope.alarmMessageTotal = data.total;
        },function(data){
            console.log();
        });
		//报警记录信息(本月)
		alarmService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, null, "currentMonth")
		.then(function(data){
			$scope.monthMessageTotal = data.total;
		},function(data){
			console.log();
		});
		
	};
	
	// 查看页面
    $scope.showViewNotify = function(id) {
    	$scope.switchTopMenu(19);
        $state.go('app.storage.safeproduce.notifyAdd', {id:id,isNotEdit:true});
    };
    
    // 发布通知公告
    $scope.showAddNotify=function () {
    	$scope.switchTopMenu(19);
        $state.go('app.storage.safeproduce.notifyAdd', {id:0,isNotEdit:false,topRow:$rootScope.orgInfo.orgName+"通告:\n"});
    };
    
    // 安全生产通知
    $scope.safeProduceNotifyTodo=function() {
    	$scope.switchTopMenu(19);
    	$state.go("app.storage.safeproduce.notifyList");
    }
    
    //跳转报警信息列表
    $scope.queryAlarmMessage=function(type){
    	$scope.switchTopMenu(19);
    	if(type == "all"){
    		$state.go("app.alarm.list");
    	}else{
    		$state.go("app.alarm.list",{queryCriteria:"currentMonth"});
    	}
    }
    
    // 安全生产管理制度
    $scope.safeProduceTodo=function(layerType) {
    	$scope.switchTopMenu(19);
    	if("publish" == layerType){//跳转文档发布页面
    		$state.go('app.storage.safeproduce.list', {type:1,layerType:'publish'});
    	}else if("list" == layerType) {//跳转文档列表页面
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
    
    //获取摄像头信息
    var cameraVal=[];
    $scope.cameraFun = function () {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: APP_CONFIG.superviseUrl + "/depotStyle/getAllPointChart",
            data: {
                type : "1"
            },
            success: function (msg) {
                var iconDiv = $("#iconDiv");
                iconDiv.html("");
                for(var i=0;i<msg.length;i++){
                    var obj = msg[i];
                    cameraVal[i] = obj;
                    var img = "styles/img/camera.png";
                    if(obj.cameraType == "1"){
                        img = "styles/img/camera_qiu.png";
                    }
                    iconDiv.append($compile("<img ng-click='playCamera("+i+")' src=\""+img+"\" style=\""+obj.styles+";cursor: pointer;\" class=\"ng-scope\">")($scope));
                }
            }
        });
    };
    
    //初始化摄像头
    $scope.playCamera = function (index) {
        $("#cameraPlayModal").modal("show");
        setTimeout(function(){
            var OBJ = "<OBJECT ID=\"cameraocx\" width=100% height=250px classid=\"CLSID:A9A5DEC8-62AB-4444-9024-874FF35D3FD1\">" +
                "<PARAM NAME=\"vmode\" VALUE=\"transparent\">" +
                "<PARAM NAME=\"_Version\" VALUE=\"65536\">" +
                "<PARAM NAME=\"_ExtentX\" VALUE=\"12806\">" +
                "<PARAM NAME=\"_ExtentY\" VALUE=\"1747\">" +
                "<PARAM NAME=\"_StockProps\" VALUE=\"0\">" +
                "</OBJECT>";
            $("#ocxDiv").html(OBJ);
            var playocx = document.getElementById('cameraocx');//加载控件，给控件赋值用
            playocx.SetLiveLayout(1);
            var tdh = 0;//通道号
            var zm = "";//字幕
            var winIndex = -1;//窗口索引
            var err = playocx.DeviceLogin_NOPOINT(cameraVal[index].nvrIp,cameraVal[index].nvrPort*1,cameraVal[index].nvrName,cameraVal[index].nvrPassword,cameraVal[index].factory*1);
            err = playocx.VideoPlay_NOPOINT(cameraVal[index].nvrIp,cameraVal[index].nvrPort*1,cameraVal[index].nvrName,cameraVal[index].nvrPassword,cameraVal[index].factory*1,cameraVal[index].channelNumber ,zm ,winIndex);
            $scope.alias = cameraVal[index].alias;
        },500)
    };
    
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
    $scope.cameraFun();//初始化摄像头信息
    $scope.loadFoodstuff();
    
});