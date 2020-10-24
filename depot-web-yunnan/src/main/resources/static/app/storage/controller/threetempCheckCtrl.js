"use strict";

angular.module('app.storage')
    .controller("threetempCheckCtrl", function($scope,$state, $http, $filter, $rootScope, $stateParams,StorehouseService,warehouseService,threetempcheckService, keeperService, APP_CONFIG) {
        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.search = {storehouseId:""};
        $scope.loadData = function() {
        	if ($stateParams.houseId != null && $stateParams.houseId != '') {
        		$scope.search.storehouseId = $stateParams.houseId;
        		$scope.isDisb = true;
        	}
            threetempcheckService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,
                $scope.threetempcheck,$scope.search.storehouseId).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log(data);
            });
        }
        $scope.loadData();

        // 仓房列表
        $scope.loadStore = function() {
            StorehouseService.getStorehouseList($rootScope.orgInfo.orgId).then(function(data){
                $scope.storelist = data.houseList;
            },function(data){
                console.log(data);
            });
        }
        $scope.loadStore();

        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }

        //返回上一个链接页面
        $scope.returnUp = function(){
            $rootScope.back();
        }

        // 接收广播，切换仓房
        $scope.$on("storeChangeed", function(event, storehouseId) {
            $scope.search.storehouseId = storehouseId;
            $scope.loadData();
        })

//从一体化中取出数据
        /*$scope.addthreetempFromYTH = function () {
            threetempcheckService.addthreetempFromYTH().then(function(data){
                alert("更新成功！");
                $scope.loadData();
            },function(data){
                console.log(data);
            });
        }*/

//详情
        $scope.showViewthreeTemp = function (id) {
            if (id != '' && id != undefined && id != null) {
                threetempcheckService.loadDataById(id).then(function(data){
                    $scope.threetempcheck = data;
                    if($scope.threetempcheck.checkSign!=null){
                        $scope.threetempcheck.checkSign=$scope.threetempcheck.checkSign;
                    }
                    $scope.threetempcheck.checkDate = $filter('date')($scope.threetempcheck.checkDate, "yyyy-MM-dd");
                },function(data){
                    console.log(data);
                });
            }

            // 显示弹出层
            $("#threetempCheckModal").modal("show");
            //查看页面 需要禁用框
            $("#threetempCheck-form select").attr("disabled",true);
            $("#threetempCheck-form input").attr("disabled",true);
            $("#threetempCheck-form textarea").attr("disabled",true);
            $("#operation").hide();
        }


//保存三温检查
// 提交表单
        var validator = $("#threetempCheck-form").validate();
        $scope.savethreetempcheck = function () {
            // 模态框的校验器，有时会为空，可能是controller先于页面加载的原因，所以要在保存时，再判断一下校验器是否为undefined.
            if (validator == undefined) {
                validator = $("#threetempCheck-form").validate();
                $scope.savethreetempcheck();
            }else{
                if(validator.form()) {
                    //$scope.threetempcheck.checkSign=angular.fromJson($scope.keeper.name);
                    threetempcheckService.savethreetempcheck($scope.threetempcheck).then(function (data) {
                        if (data.status == 'success') {
                            alert("保存成功！");
                            $scope.threetempcheck = {};
                        } else {
                            alert("保存失败！");
                        }
                        $scope.loadData();
                        // 关闭弹出层
                        $("#threetempCheckModal").modal("hide");
                    }, function (data) {
                        console.log(data);
                    });
                }
            }
        }


// 根据id删除信息
        $scope.remove = function(id) {
            threetempcheckService.removeById(id).then(function (data) {
                if(data.msg == "success"){
                    alert("删除成功");
                    $scope.loadData();
                }else{
                    alert("删除失败");
                }
            });
        }


        //用于获取三温图的列表
        $scope.temp={searchTempDate:1}

        //打开三温图
        $scope.showCharData = function (houseId,checkDate) {
            //获取三温图的列表
            $scope.loadThreeTemperature(houseId,checkDate);
            // 显示弹出层
            $("#threeTemperature").modal("show");
        }

        //用于获取三温图的列表
        /* $scope.temp={searchTempDate:1};
         $scope.CFhouseId={};*/
        $scope.loadThreeTemperature = function(houseId,checkDate) {
            var date = new Date(checkDate);
            date = date.Format("yyyy-MM-dd");
            threetempcheckService.chartData(houseId,date).then(function(data){
                $scope.initThreeTemperature(data);
            },function(data){
                console.log(data);
            });
        }
        Date.prototype.Format = function(fmt)
        {
            var o = {
                "M+" : this.getMonth()+1,                 //月份
                "d+" : this.getDate(),                    //日
                "H+" : this.getHours(),                   //小时
                "m+" : this.getMinutes(),                 //分
                "s+" : this.getSeconds(),                 //秒
                "q+" : Math.floor((this.getMonth()+3)/3), //季度
                "S"  : this.getMilliseconds()             //毫秒
            };
            if(/(y+)/.test(fmt))
                fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
            for(var k in o)
                if(new RegExp("("+ k +")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            return fmt;
        };

        //曲线图
        $scope.initThreeTemperature = function(data) {//根据时间显示种类数量
            var myChart = echarts.init(document.getElementById('gsi-graph-view-chart'));
            // 指定图表的配置项和数据
            var timeList = [];// 时间集合
            var lswd = [];// 粮温度
            var cwwd = [];// 仓外温度
            var cnwd = [];// 仓内温度
            if(data != null) {
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    /*var date = new Date(data[i].checkDate);
                    date = date.Format("yyyy/MM/dd hh:mm:ss");*/
                    var date = $filter('date')(data[i].checkDate, "yyyy/MM/dd hh:mm:ss");
                    timeList.push(date);
                    if(data[i].inTemp!=null){
                        cnwd.push(data[i].inTemp)
                    }else{
                        cnwd.push(0)
                    }
                    if(data[i].outTemp!=null){
                        cwwd.push(data[i].outTemp)
                    }else{
                        cwwd.push(0)
                    }
                    if(data[i].lsTemp!=null){
                        lswd.push(data[i].lsTemp)
                    }else{
                        lswd.push(0)
                    }
                }
            }

            var series = [];
            series[0] =
                {
                    name:'粮食温度（℃）',
                    type:'line',
                    smooth:true,
                    symbol:'emptyrect',
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    },
                    data:lswd
                };

            series[1] =
                {
                    name: '仓内温度（℃）',
                    type: 'line',
                    smooth:true,
                    symbol:'emptyrect',
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    },
                    data: cnwd
                }

            series[2] =
                {
                    name: '仓外温度（℃）',
                    type: 'line',
                    smooth:true,
                    symbol:'emptyrect',
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    },
                    data: cwwd
                }

            var option = {
                grid: {
                    bottom: 80
                },
                legend: {    //图表上方的类别显示
                    show:true,
                    data:['粮食温度（℃）','仓内温度（℃）','仓外温度（℃）']
                },
                color:[
                    '#FF3333',    //粮食温度曲线颜色
                    '#53FF53',    //仓内温度曲线颜色
                    '#B15BFF'     //仓外温度颜色

                ],
                /*  toolbox: {
                 feature: {
                 saveAsImage: {}
                 }
                 },*/
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                /*dataZoom: [
                 {
                 show: true,
                 realtime: true,
                 start: 65,
                 end: 85
                 },
                 {
                 type: 'inside',
                 realtime: true,
                 start: 65,
                 end: 85
                 }
                 ],*/
                //x轴时间轴
                xAxis : [
                    {
                        name: '时间',
                        type : 'category',
                        data : timeList.map(function (str) {
                            return str.replace(' ', '\n')
                        })
                    }
                ],
                yAxis: [
                    {
                        name: '温度',
                        type: 'value',
                        axisLabel : {
                            formatter: '{value} ℃'    //控制输出格式
                        }
                    }
                ],
                //y轴
                series:series
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            //自适应
            window.onresize = myChart.resize;
        };
    })
