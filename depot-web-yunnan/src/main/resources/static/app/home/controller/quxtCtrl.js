"use strict";

angular.module('app.system').controller("quxtCtrl",
    function($scope,$stateParams,$compile, $rootScope,$timeout,$interval, $uibModal, grainTempService,threetempcheckService, StorehouseService, $state, APP_CONFIG) {

        $("#showChartsTemp").html($("" +
            "<div class=\"charts-histogram-1\" id=\"quxt\" style=\"height: 100%;width:100%;\" >" +
            "</div>"));

        var dayCount = 6;
        //获取number天前的日期
        $scope.gainTimes = function(number) {
            var date = new Date();
            date.setDate(date.getDate()-number);//获取number天后的日期
            var years = date.getFullYear();
            var month = date.getMonth()+1;//获取当前月份的日期
            var strDate = date.getDate();

            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = years + "-" + month + "-" + strDate;
            // var currentdate = month + "-" + strDate;
            return currentdate;
        };

        // 三温检查列表
        $scope.loadThreeTemperature= function() {
            //查询三温检查列表最新数据所对应的仓房
        	StorehouseService.getThreeTempCheckList($rootScope.orgInfo.orgId).then(function(data){
                if((data.houseList).length>0){
                	$scope.houseId = data.houseList[0].storehouseId;
                }else{
            		$scope.houseId = "";
            	}
                $scope.newInit();
            },function (data) {
                console.log(data);
            });

        }

        $scope.loadThreeTemperature();


        $scope.newInit = function () {
            grainTempService.getThreeConditionHomePage($rootScope.orgInfo.orgId,$scope.houseId,"13").then(function(data){
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
                        data:['粮温','仓内温','仓外温'],
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
                            axisLine : {
                            	lineStyle: {
                            		type: 'solid',
                            		color:'#ffffff',
                            		width:'1'
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
                            name:'粮温',
                            type:'line',
                            smooth:true,
                            // itemStyle: {normal: {areaStyle: {type: 'default'}}}, //面积图和曲线图的区别
                            data:[10, 12, 21, 54, 260, 830, 710]
                        },
                        {
                            name:'仓内温',
                            type:'line',
                            smooth:true,
                            // itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            data:[30, 182, 434, 791, 390, 30, 10]
                        },
                        {
                            name:'仓外温',
                            type:'line',
                            smooth:true,
                            //  itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            data:[1320, 1132, 601, 234, 120, 90, 20]
                        },
                        {
                            name:'仓内湿',
                            type:'line',
                            smooth:true,
                            //  itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            data:[1320, 1132, 601, 234, 120, 90, 20]
                        },
                        {
                            name:'仓外湿',
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
                    var lswd = [];// 粮食温度
                    var cwwd = [];// 仓外温度
                    var cnwd = [];// 仓内温度
                    var cnsd = [];// 仓内湿度
                    var cwsd = [];// 仓外湿度
                    for (var i=data.length-1;i>=0;i--){
                        if(data[i].lswd != 250) {
                            lswd.push(data[i].lswd);
                        }
                        if(data[i].cwwd != 250) {
                            cwwd.push(data[i].cwwd);
                        }
                        if(data[i].cnwd != 250) {
                            cnwd.push(data[i].cnwd);
                        }
                        if(data[i].cnsd != 250) {
                            cnsd.push(data[i].cnsd);
                        }
                        if(data[i].cwsd != 250) {
                            cwsd.push(data[i].cwsd);
                        }
                        timeList.push(data[i].days);
                    }
                    option.series[0].data = lswd;
                    option.series[1].data = cnwd;
                    option.series[2].data = cwwd;
                    option.series[3].data = cnsd;
                    option.series[4].data = cwsd;
                    option.xAxis[0].data= timeList;
                }

                var myChart = echarts.init(document.getElementById('quxt'));
                $scope.getRealTemp(data);
                option.grid.height = $("#quxtDiv").height()/1.5-25;
                option.grid.width = $("#quxt").width()*0.8;
                myChart.setOption(option);
                if($("#houseSele").html() == undefined){
                    var sele = "<select id='houseSele' ng-change='newInit()' ng-model=\"houseId\" " +
                        "ng-options=\"store.storehouseId as store.storehouseName for store in storehouseList\" style=\"float:right;margin-right:20px;background-color:transparent;color:#999;min-width:65px;\">\n" +
                        // "        <option value=\"\">--仓房--</option>\n" +
                        "    </select>";
                    $("#quxt").prepend($compile(sele)($scope));
                    //查询仓房下拉菜单

                    StorehouseService.getStorehouseList($rootScope.orgInfo.orgId).then(function(data){
                        if((data.houseList).length>0){
                            $scope.storehouseList = data.houseList;  //下拉列表数据
                            if($scope.houseId == ""){
                            	$scope.houseId = data.houseList[0].storehouseId;
                            }
                        }
                    },function (data) {
                        console.log(data);
                    });

                }
            },function(data){
                console.log(data);
            });
        }
    })
