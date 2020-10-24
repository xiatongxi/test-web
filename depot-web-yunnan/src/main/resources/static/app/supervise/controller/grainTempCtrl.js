"use strict";

angular.module('app.supervise')
    .controller("grainTempCtrl", function($scope,$rootScope,$timeout,$stateParams, $http, $interval, grainTempService, StorehouseService, $state) {

        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        var depotId = $rootScope.depotInfo.orgId;
        $scope.loadData = function () {
            // 粮食生命周期管理 --粮情列表
            if (null != $stateParams.houseId && "" != $stateParams.houseId && undefined != $stateParams.houseId) {
                $scope.houseNo = $stateParams.houseId;
            }
            grainTempService.loadData($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.houseNo,$scope.orgInfo.orgId)
                .then(function(data){
                    $scope.pageInfo = data;
                },function(data){
                    console.log(data);
                });
            StorehouseService.getStorehouseList(depotId, "0").then(function(data){
                $scope.storehouseList = data.houseList;  //下拉列表数据
                $scope.storehouseObj = data.houseObj;	//查询数据列表仓房信息转换
            },function (data) {
                console.log(data);
            });
        };

        $scope.loadData();
        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        };

        //跳转到三温页面
        var lineOptions = {
            ///Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines : true,
            //String - Colour of the grid lines
            scaleGridLineColor : "rgba(0,0,0,.05)",
            //Number - Width of the grid lines
            scaleGridLineWidth : 1,
            //Boolean - Whether the line is curved between points
            bezierCurve : true,
            //Number - Tension of the bezier curve between points
            bezierCurveTension : 0.4,
            //Boolean - Whether to show a dot for each point
            pointDot : true,
            //Number - Radius of each point dot in pixels
            pointDotRadius : 4,
            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth : 1,
            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius : 20,
            //Boolean - Whether to show a stroke for datasets
            datasetStroke : true,
            //Number - Pixel width of dataset stroke
            datasetStrokeWidth : 2,
            //Boolean - Whether to fill the dataset with a colour
            datasetFill : true,
            //Boolean - Re-draw chart on page resize
            responsive: true,
            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        };
        var lineData = {
            // labels: ["28","48","40","19","86","27","90"],
            datasets: [
                {
                    label: "仓温",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [15, 16, 29, 20, 5, 10, 20]
                },
                {
                    label: "粮温",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [25, 20, 27, 15, 10, 20, 28]
                },
                {
                    label: "外温",
                    fillColor: "rgba(251,127,105,0.2)",
                    strokeColor: "rgba(251,127,105,1)",
                    pointColor: "rgba(251,127,105,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [35, 30, 31, 29, 15, 30, 20]
                }
            ]
        };
        $scope.showsw = function (houseId) {
            var dayCount=6;
            grainTempService.getThreeCondition($rootScope.depotInfo.orgId,houseId,dayCount).then(function(data){
                $("#swModal").modal("show");
                $timeout(function () {
                    var ctx = $("#swCanVas").get(0).getContext("2d");
                    var myNewChart = new Chart(ctx).Line(lineData, lineOptions);
                },500);
                $scope.initQXTBfx(data,data[0].time);
            },function(data){
                console.log();
            });
        }
        //曲线图
        $scope.initQXTBfx = function(data,TestDate) {//根据时间显示种类数量
            var dataNum = 0;
            var timeList = [];// 时间集合
            var lswd = [];// 粮食温度
            var cwwd = [];// 仓外温度
            var cnwd = [];// 仓内温度
            var newDays = ""//7天温度
            for ( var i = 6; i >= 0; i--) {
                newDays = $scope.gainTimes(i,TestDate);
                timeList.push(newDays);
                if(data.length > dataNum && newDays == data[dataNum].jcsj){
                    if(data[dataNum].lswd != 250 && (data[dataNum].lswd!=null&&data[dataNum].lswd!="")){
                        lswd.push(data[dataNum].lswd);
                    }else{
                        lswd.push(null);
                    };
                    if(data[dataNum].cwwd != 250 && (data[dataNum].cwwd!=null&&data[dataNum].cwwd!="")){
                        cwwd.push(data[dataNum].cwwd);
                    }else{
                        cwwd.push(null);
                    };
                    if(data[dataNum].cnwd != 250 && (data[dataNum].cnwd!=null&&data[dataNum].cnwd!="")){
                        cnwd.push(data[dataNum].cnwd);
                    }else{
                        cnwd.push(null);
                    };
                    dataNum++;
                }else{
                    lswd.push(null);
                    cwwd.push(null);
                    cnwd.push(null);
                };
            };
            lineData.labels = timeList;
            lineData.datasets[0].data = lswd;
            lineData.datasets[1].data = cnwd;
            lineData.datasets[2].data = cwwd;
        };

        // 获取列表数据
        $scope.gainTimes = function(number,TestDate) {
            var date = new Date(TestDate.split("T")[0].replace(/-/g,"/"));
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
            return currentdate;
        };
        //三温结束***********************************************************

        // 粮食安全追溯-返回主列表页面
        $scope.returnHomePage = function(){
            $state.go('app.synth.lifecycle');
        }

    })

    .controller("threeTempChartCtrl", function($scope,$stateParams,$rootScope,$timeout, $state, grainTempService, StorehouseService, APP_CONFIG) {
        //跳转到三温页面
        var lineOptions = {
            ///Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines : true,
            //String - Colour of the grid lines
            scaleGridLineColor : "rgba(0,0,0,.05)",
            //Number - Width of the grid lines
            scaleGridLineWidth : 1,
            //Boolean - Whether the line is curved between points
            bezierCurve : true,
            //Number - Tension of the bezier curve between points
            bezierCurveTension : 0.4,
            //Boolean - Whether to show a dot for each point
            pointDot : true,
            //Number - Radius of each point dot in pixels
            pointDotRadius : 4,
            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth : 1,
            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius : 20,
            //Boolean - Whether to show a stroke for datasets
            datasetStroke : true,
            //Number - Pixel width of dataset stroke
            datasetStrokeWidth : 2,
            //Boolean - Whether to fill the dataset with a colour
            datasetFill : true,
            //Boolean - Re-draw chart on page resize
            responsive: true,
            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        };
        var lineData = {
            // labels: ["28","48","40","19","86","27","90"],
            datasets: [
                {
                    label: "仓温",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [15, 16, 29, 20, 5, 10, 20]
                },
                {
                    label: "粮温",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [25, 20, 27, 15, 10, 20, 28]
                },
                {
                    label: "外温",
                    fillColor: "rgba(251,127,105,0.2)",
                    strokeColor: "rgba(251,127,105,1)",
                    pointColor: "rgba(251,127,105,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [35, 30, 31, 29, 15, 30, 20]
                }
            ]
        };
        var dayCount = 20;
        var depotId = $rootScope.depotInfo.orgId;
        $scope.showsw = function () {
            grainTempService.getThreeCondition(depotId,$scope.houseId,dayCount).then(function(data){
                if(data.length>0){
                    $scope.initQXTBfx(data);
                }else{
                    lineData.labels = "";
                    lineData.datasets[0].data = "";
                    lineData.datasets[1].data = "";
                    lineData.datasets[2].data = "";
                }
                $timeout(function () {
                    $("#canvass").html("");
                    $("#canvass").html("<canvas style=\"display: block;\" id=\"threeTempChart\" height=\"120\" ></canvas>");
                    var ctx = $("#threeTempChart").get(0).getContext("2d");
                    var myNewChart = new Chart(ctx);
                    myNewChart.Line(lineData, lineOptions);
                },500);
            },function(data){
                console.log();
            });

            StorehouseService.getStorehouseList(depotId).then(function(data){
                $scope.storehouseList = data.houseList;  //下拉列表数据
                $scope.storehouseObj = data.houseObj;	//查询数据列表仓房信息转换
            },function (data) {
                console.log(data);
            });
        }
        //曲线图
        $scope.initQXTBfx = function(data) {//根据时间显示种类数量
            var dataNum = 0;
            var timeList = [];// 时间集合
            var lswd = [];// 粮食温度
            var cwwd = [];// 仓外温度
            var cnwd = [];// 仓内温度
            var newDays = ""//7天温度
            var detectionTime = data[0].time;//最新检测时间
            for ( var i = dayCount; i >= 0; i--) {
                newDays = $scope.gainTimes(i,detectionTime);
                timeList.push(($scope.gainTimes(i,detectionTime)).substring(5,($scope.gainTimes(i,detectionTime)).length));
                if(data.length > dataNum && newDays == data[dataNum].jcsj){
                    if(data[dataNum].lswd != 250 && (data[dataNum].lswd!=null&&data[dataNum].lswd!="")){
                        lswd.push(data[dataNum].lswd);
                    }else{
                        lswd.push(null);
                    };
                    if(data[dataNum].cwwd != 250 && (data[dataNum].cwwd!=null&&data[dataNum].cwwd!="")){
                        cwwd.push(data[dataNum].cwwd);
                    }else{
                        cwwd.push(null);
                    };
                    if(data[dataNum].cnwd != 250 && (data[dataNum].cnwd!=null&&data[dataNum].cnwd!="")){
                        cnwd.push(data[dataNum].cnwd);
                    }else{
                        cnwd.push(null);
                    };
                    dataNum++;
                }else{
                    lswd.push(null);
                    cwwd.push(null);
                    cnwd.push(null);
                };
            };
            lineData.labels = timeList;
            lineData.datasets[0].data = lswd;
            lineData.datasets[1].data = cnwd;
            lineData.datasets[2].data = cwwd;
        };
        // 获取时间
        $scope.gainTimes = function(number,detectionTime) {
            var date = new Date(detectionTime);
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
            var currentdate = years +"-"+month + "-" + strDate;
            return currentdate;
        };
        //三温结束***********************************************************
        //判断是否显示返回按钮
        $scope.isShow = "0";
        if ($stateParams.id != 0) {
            $scope.isShow = "1";
        }
        //分局仓房编号，获取温度信息
        $scope.loadSwTabData = function () {
            grainTempService.loadSwTabData($scope.houseId,$rootScope.orgInfo.orgId).then(function(data){
                $scope.houseTemp = data;
                $scope.houseId = $scope.houseTemp.house;
                $scope.showsw();
            },function(data){
                console.log(data);
            });
        };

        //返回上一个链接页面
        $scope.returnUp = function(){
            $state.go('app.supervise.cameraPT',{showType:"2"});
        }
        if($stateParams.id!=0 && $stateParams.id!= ''){
            $scope.houseId = $stateParams.id;
        }

        $scope.loadSwTabData();
        //$scope.showsw();
    })

    .controller("warnPromptCtrl", function($scope,$rootScope,$timeout,$stateParams, $http, $interval, grainTempService, StorehouseService, $state) {

        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        var currentTime = moment().quarter();
        $scope.loadData = function () {
            grainTempService.loadData($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.houseNo,$scope.orgInfo.orgId)
                .then(function(data){
                    for(var i = 0; i < 3; i++){
                        var current = data.list[i].OutT*1;
                        if(Math.abs(current - data.list[i+1].OutT*1) < 20){//如果两个仓房的仓外温度区别过大则说明有测温硬件损坏
                            if((current >= 8 || current <= 13) && currentTime == 1){
                                $scope.warnPromptTixt = "已经入春,粮库宜采取自然降温通风，来降低仓温和粮温之间的差值。";
                            }else if(current >= 22 && currentTime == 2){
                                $scope.warnPromptTixt = "已经入夏,请注意仓内粮食温度情况，充分利用轴流风机适时进行排积热通风,来降低仓温和粮温之间的差值!";
                            }else if((current <= 22 || current >= 13) && currentTime == 3){
                                $scope.warnPromptTixt = "已经入秋,粮库宜采取自然降温通风，来降低仓温和粮温之间的差值。";
                            }else if(current <= 8 && currentTime == 4){
                                $scope.warnPromptTixt = "已经入冬,请注意仓内粮食温度情况，降低通风作业以防止仓内温度过低。";
                            }else{
                                $scope.warnPromptTixt = "仓外温度与季节温度有差异，请注意是否需要进行调控温度进行通风作业！";
                            }
                                return;
                        }
                    }
                },function(data){
                    console.log(data);
                });
        };
        $scope.loadData();
    });