"use strict";
/**
 * 点位ctrl，
 */
angular.module('app.intelligent')
/**
 * 摄像头点位控制类
 */
    .controller("cameraPTCtrlIndex", function ($scope, $rootScope, $filter, $state, $compile, $timeout, $interval, $stateParams, alertService, $http, ptServiceIndex, APP_CONFIG,basicThresholdSetService) {
        // 加载测温预警,报警阀值
        $scope.getWarningValue = function () {
            basicThresholdSetService.getValueByOrgIdOrCfCode().then(function (data) {
                $rootScope.warningValueList = data.data;
            }, function (data) {
                console.log(data);
            });
        };
        $scope.getWarningValue();

        $scope.birdsRemoteUrl = $rootScope.orgInfo.birdsRemote;
        var cfCode;

        var arrayObj = new Array();
        $scope.getIndex = function (types) {
            $(".ycjk-btns").removeClass("active");
            $(".ycjk-btns" + types).addClass("active");
            ptServiceIndex.getIndex(types).then(function (data) {
                var showDiv = $("#showDiv");
                showDiv.html("");
                // $("#yjDiv").show();
                // $("#yjDiv").html(($compile("<a ng-click=showJkErrList() style=\"color: red;\"><img src=\"styles/img/page-img/icon-yujing.png\"/><span id=\"yjsm\">监控报警</span>（<span id=\"wdyj\">0</span>）</a>")($scope)));
                if (types == "2") {//粮情
                    $("#yjDiv").show();
                    $("#yjDiv").html(($compile("<a ng-click='showLqBj()'  style=\"color: red;\"><img src=\"styles/img/page-img/icon-yujing.png\"/><span id=\"yjsm\">粮情报警</span>（<span id=\"wdyj\">0</span>）</a>")($scope)));
                    $timeout(function () {
                        arrayObj.splice(0, arrayObj.length);
                        for (var i = 0; i < data.length; i++) {
                            var grain = "";
                            var vCfCode = data[i].vCf===undefined?'0000':data[i].vCf;
                            grain += "<div class='jk-icon-box'>" +
                                "<div id='" + i + "' style='" + data[i].styles + ";text-align:center;'><canvas ng-mousemove='showData(\"" + i + "canvas\"," + i + ");' ng-mouseleave='hideData(" + i + ");' id='" + i + "canvas' style='opacity:0;'></canvas></div></div>";
                            showDiv.append($compile(grain)($scope));
                            data[i].time = $filter('date')(data[i].time, "yyyy-MM-dd HH:mm:ss");
                            data[i].TestDate = $rootScope.storehouseCode[vCfCode] == undefined ? '':$filter('date')($rootScope.storehouseCode[vCfCode].rcrq, "yyyy-MM-dd");
                            data[i].sub_type = $rootScope.dicData[$rootScope.storehouseCode[vCfCode]] == undefined ? '无' :$rootScope.dicData[$rootScope.storehouseCode[vCfCode].pz];
                            var pop = "";
                            pop += "<div id='popContainer'><div class='popover-con' ><h3>&nbsp;" + data[i].barnName + "</h3>" +
                                "<div class='popover-main'><p class='p1'><span>入仓时间：" + (data[i].TestDate == undefined ? '无' : data[i].TestDate) + "</span><span>品种：" + (data[i].sub_type) + "</span></p>" +
                                "<div class='tit1'><span>温度信息</span></div><table><tr><td style='width:143px;'>最高粮温：" + (data[i].MaxT == undefined ? '无' : data[i].MaxT + '℃') + "</td>" +
                                "<td>仓内湿度：" + (data[i].InH == undefined ? '无' : data[i].InH + '℃') + "</td></tr><tr><td>平均粮温：" + (data[i].AvgT == undefined ? '无' : data[i].AvgT + '℃') + "</td><td>仓外湿度：" + (data[i].OutH == undefined ? '无' : data[i].OutH + '℃') + "</td></tr>" +
                                "<tr><td colspan='2'>最低粮温：" + (data[i].MinT == undefined ? '无' : data[i].MinT + '℃') + "</td></tr></table>" +
                                "<tr><td colspan='2'>采集时间：" + (data[i].time == undefined ? '无' : data[i].time) + "</td></tr></table>" +
                                "<div class='tit1'>" +
                                "<a data-ui-sref='app.intelligent.grainDetection.temperatureRecordList({show: true,vCfCode:" + ("1" + vCfCode) + "})'>查看详情></a></div></div></div></div>";
                            arrayObj.push(pop);
                            var data_x = $("#" + i + "canvas").width();
                            var data_Y = $("#" + i + "canvas").height();
                            var img = new Image();
                            img.setAttribute('crossOrigin', 'anonymous');
                            img.src = data[i].imgdata;
                            $scope.addImg(img, i, data_x, data_Y);
                            $scope.showText(i + "canvas", i);
                        }
                    }, 100)
                } else if (types == "1") {
                    $("#yjDiv").html(($compile("<a ng-click='showLqBj()'  style=\"color: red;\"><img src=\"styles/img/page-img/icon-yujing.png\"/><span id=\"yjsm\">粮情报警</span>（<span id=\"wdyj\">0</span>）</a>")($scope)));
                    $timeout(function () {
                        arrayObj.splice(0, arrayObj.length);
                        for (var i = 0; i < data.length; i++) {
                            var grain = "";
                            var vCfCode = data[i].vCf===undefined?'0000':data[i].vCf;
                            grain += "<div class='jk-icon-box'>" +
                                "<div id='" + i + "' style='" + data[i].styles + ";text-align:center;'><canvas ng-mousemove='showData(\"" + i + "canvas\"," + i + ");' ng-mouseleave='hideData(" + i + ");' id='" + i + "canvas' style='opacity:0;'></canvas></div></div>";
                            showDiv.append($compile(grain)($scope));
                            data[i].TestDate = $rootScope.storehouseCode[vCfCode] == undefined ? '':$filter('date')($rootScope.storehouseCode[vCfCode].rcrq, "yyyy-MM-dd");
                            data[i].sub_type = $rootScope.dicData[$rootScope.storehouseCode[vCfCode]] == undefined ? '无' :$rootScope.dicData[$rootScope.storehouseCode[vCfCode].pz];
                            var pop = "";
                            pop += "<div id='popContainer'><div class='popover-con' ><h3>&nbsp;" + data[i].barnName + "</h3>" +
                                "<div class='popover-main'><p class='p1'><span>入仓时间：" + (data[i].TestDate == undefined ? '无' : data[i].TestDate) + "</span><span>品种：" + (data[i].sub_type) + "</span></p>" +
                                "<div class='tit1'><span>气体信息</span></div><table><tr><td style='width:143px;'>磷化氢(ppm)：" + (data[i].ph3avg == undefined ? '无' : data[i].ph3avg + '℃') + "</td>" +
                                "<td>二氧化氮(%)：" + (data[i].o2avg == undefined ? '无' : data[i].o2avg + '℃') + "</td></tr><tr><td>氮气(%)：" + (data[i].co2avg == undefined ? '无' : data[i].co2avg + '℃') + "</td></tr>" +
                                "<tr><td colspan='2'>采集时间：" + (data[i].time == undefined ? '无' : data[i].time) + "</td></tr></table>" +
                                "<div class='tit1'>" +
                                "<a data-ui-sref='app.intelligent.gasDetection.recordList({show: true,vCfCode:" + ("1" + vCfCode) + "})'>查看详情></a></div></div></div></div>";
                            arrayObj.push(pop);
                            var data_x = $("#" + i + "canvas").width();
                            var data_Y = $("#" + i + "canvas").height();
                            var img = new Image();
                            img.setAttribute('crossOrigin', 'anonymous');
                            img.src = data[i].imgdata;
                            $scope.addImg(img, i, data_x, data_Y);
                            $scope.showText(i + "canvas", i);
                        }
                    }, 100)
                } else if (types == "3") {
                    $("#yjDiv").html(($compile("<a ng-click='showLqBj()'  style=\"color: red;\"><img src=\"styles/img/page-img/icon-yujing.png\"/><span id=\"yjsm\">粮情报警</span>（<span id=\"wdyj\">0</span>）</a>")($scope)));
                    $timeout(function () {
                        arrayObj.splice(0, arrayObj.length);
                        for (var i = 0; i < data.length; i++) {
                            var grain = "";
                            var vCfCode = data[i].vCf===undefined?'0000':data[i].vCf;
                            grain += "<div class='jk-icon-box'>" +
                                "<div id='" + i + "' style='" + data[i].styles + ";text-align:center;'><canvas ng-mousemove='showData(\"" + i + "canvas\"," + i + ");' ng-mouseleave='hideData(" + i + ");' id='" + i + "canvas' style='opacity:0;'></canvas></div></div>";
                            showDiv.append($compile(grain)($scope));
                            data[i].TestDate = $rootScope.storehouseCode[vCfCode] == undefined ? '':$filter('date')($rootScope.storehouseCode[vCfCode].rcrq, "yyyy-MM-dd");
                            data[i].sub_type = $rootScope.dicData[$rootScope.storehouseCode[vCfCode]] == undefined ? '无' :$rootScope.dicData[$rootScope.storehouseCode[vCfCode].pz];
                            var pop = "";
                            pop += "<div id='popContainer'><div class='popover-con' ><h3>&nbsp;" + data[i].barnName + "</h3>" +
                                "<div class='popover-main'><p class='p1'><span>入仓时间：" + (data[i].TestDate == undefined ? '无' : data[i].TestDate) + "</span><span>品种：" + (data[i].sub_type) + "</span></p>" +
                                "<div class='tit1'><span>害虫信息</span></div><table><tr><td style='width:143px;'>最大值(只)：" + (data[i].max == undefined ? '无' : data[i].max) + "</td>" +
                                "<td>最小值(只)：" + (data[i].min == undefined ? '无' : data[i].min) + "</td></tr><tr><td>平均值(只)：" + (data[i].avg == undefined ? '无' : data[i].avg) + "</td></tr>" +
                                "<tr><td colspan='2'>采集时间：" + (data[i].time == undefined ? '无' : data[i].time) + "</td></tr></table>" +
                                "<div class='tit1'>" +
                                "<a data-ui-sref='app.intelligent.grainDetection.insectPestDetectionList({show: true,vCfCode:" + ("1" + vCfCode) + "})'>查看详情></a></div></div></div></div>";
                            arrayObj.push(pop);
                            var data_x = $("#" + i + "canvas").width();
                            var data_Y = $("#" + i + "canvas").height();
                            var img = new Image();
                            img.setAttribute('crossOrigin', 'anonymous');
                            img.src = data[i].imgdata;
                            $scope.addImg(img, i, data_x, data_Y);
                            $scope.showText(i + "canvas", i);
                        }
                    }, 100)
                }else if (types == "4") {
                    $("#yjDiv").html(($compile("<a ng-click='showLqBj()'  style=\"color: red;\"><img src=\"styles/img/page-img/icon-yujing.png\"/><span id=\"yjsm\">粮情报警</span>（<span id=\"wdyj\">0</span>）</a>")($scope)));
                    $timeout(function () {
                        arrayObj.splice(0, arrayObj.length);
                        for (var i = 0; i < data.length; i++) {
                            var grain = "";
                            var vCfCode = data[i].vCf===undefined?'0000':data[i].vCf;
                            grain += "<div class='jk-icon-box'>" +
                                "<div id='" + i + "' style='" + data[i].styles + ";text-align:center;line-height: 6;'><div class=\"aaa\"></div><div class=\"bbb\"></div><canvas ng-mousemove='showData(\"" + i + "canvas\"," + i + ");' ng-mouseleave='hideData(" + i + ");' id='" + i + "canvas' style='opacity:0;'></canvas></div></div>";
                            showDiv.append($compile(grain)($scope));
                            data[i].TestDate = $rootScope.storehouseCode[vCfCode] == undefined ? '':$filter('date')($rootScope.storehouseCode[vCfCode].rcrq, "yyyy-MM-dd");
                            data[i].sub_type = $rootScope.dicData[$rootScope.storehouseCode[vCfCode]] == undefined ? '无' :$rootScope.dicData[$rootScope.storehouseCode[vCfCode].pz];
                            var pop = "";
                            pop += "<div id='popContainer'><div class='popover-con' ><h3>&nbsp;" + data[i].barnName + "</h3>" +
                                "<div class='popover-main'><p class='p1'><span>入仓时间：" + (data[i].TestDate == undefined ? '无' : data[i].TestDate) + "</span><span>品种：" + (data[i].sub_type) + "</span></p>" +
                                "<div class='tit1'><span>报警信息</span></div><table><tr><td style='width:143px;'>阈值：" + (data[i].wThreshold == undefined ? '无' : data[i].wThreshold) + "</td>" +
                                "<td>检测值：" + (data[i].threshold == undefined ? '无' : data[i].threshold) + "</td></tr><tr><td>报警信息：" + (data[i].wRemark == undefined ? '无' : data[i].wRemark) + "</td></tr>" +
                                "<tr><td colspan='2'>采集时间：" + (data[i].time == undefined ? '无' : data[i].time) + "</td></tr></table>" +
                                "<div class='tit1'>" +
                                "<a data-ui-sref='app.intelligent.grainDetection.warningThreshold({show: true,vCfCode:" + ("1" + vCfCode) + "})'>查看详情></a></div></div></div></div>";
                            arrayObj.push(pop);
                            var data_x = $("#" + i + "canvas").width();
                            var data_Y = $("#" + i + "canvas").height();
                            var img = new Image();
                            img.setAttribute('crossOrigin', 'anonymous');
                            img.src = data[i].imgdata;
                            $scope.addImg(img, i, data_x, data_Y);
                            $scope.showText(i + "canvas", i);
                            if(data[i].vCfCode){
                                cfCode = data[i].vCfCode;
                                let t1 = setInterval(function () {
                                    $(cfCode + " .aaa").toggleClass('insert1')
                                    $(cfCode + " .bbb").toggleClass('insert2')
                                }, 500);
                                getalarm("#"+i, t1)
                            }
                        }
                    }, 100)
                }
                $timeout(function () {
                    $scope.changes();//调用样式
                }, 200);
            }, function (data) {
                console.log(data);
            });
        }


        function getalarm(idname, variableName) {
            variableName = setInterval(function () {
                $(idname + " .aaa").toggleClass('insert1')
                $(idname + " .bbb").toggleClass('insert2')
            }, 500);
        }
        //传入type:1气体，2粮情，3虫害，4报警
        if ($stateParams.showType == "2") {
            $scope.getIndex('4');//默认加载粮情模块
            // $scope.getIndex('2');//默认加载粮情模块
        }
        var X_data = new Array();
        var Y_data = new Array();
        $scope.addImg = function (img, id, data_x, data_Y) {
            $timeout(function () {
                $("#" + id + "canvas").width("100%");
                $("#" + id + "canvas").height("100%");
                data_x = data_x / $("#" + id + "canvas").width();
                data_Y = data_Y / $("#" + id + "canvas").height();
                X_data[id] = data_x;
                Y_data[id] = data_Y;
                var canvas = document.getElementById(id + "canvas");
                var context = canvas.getContext("2d");
                context.fillStyle = 'rgba(0, 0, 0, 0)';
                context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
            }, 100);
        };

        //加载鼠标移动显示信息
        $scope.showText = function (id, nums) {
            var _this = "#" + id;
            var dates = $compile(arrayObj[nums])($scope);
            $(_this).popover({
                placement: "auto left",
                html: true,
                title: $("#popContainer h3").html(),
                content: '<div id="content">' + dates[0].innerHTML + '</div>',
                width: "271",
                delay: {
                    show: 100,
                    hide: 400
                }
            })
        };

        var e;
        $scope.showData = function (id, nums) {
            var canvas = $("#" + id);
            e = event || window.event;
            var canvasOffset = canvas.offset();
            var x, y;
            x = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
            y = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
            var canvasX = Math.floor(x - canvasOffset.left);
            var canvasY = Math.floor(y - canvasOffset.top);
            var colorData = document.getElementById(id).getPixelColor(canvasX * X_data[nums], canvasY * Y_data[nums]);
            // 获取该点像素的数据
            var color = colorData.a;
            var _this = "#" + id;
            if (color != "0") {
                //循环判断是否有正在显示的弹窗
                if (document.getElementById(nums).getElementsByTagName("div").length != 0) {
                    return;
                }
                //如果有正在显示则不让别的显示
                $(_this).popover("show");
                //鼠标移出弹出框后弹出框消失
                $(_this).siblings('.popover').on('mouseleave', function () {
                    $(_this).popover('hide');
                });
            } else {
                $scope.leftOut(nums);
            }
        };

        //判断鼠标是从左边移出
        $scope.leftOut = function (nums) {
            var _this = "#" + nums + "canvas";
            var mouse = $("#" + nums);
            var mouseOffset = mouse.offset();
            var w = mouse.outerWidth();
            var h = mouse.outerHeight();
            var x = (e.pageX - mouseOffset.left - (w / 2)) * (w > h ? (h / w) : 1);
            var y = (e.pageY - mouseOffset.top - (h / 2)) * (h > w ? (w / h) : 1);
            var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;  //direction的值为“0,1,2,3”分别对应着“上，右，下，左”
            if (direction != 3 || e.type == "mouseleave") {
                $(_this).popover("hide");
            }
        };

        $scope.hideData = function (id) {
            var _this = "#" + id + "canvas";
            $timeout(function () {
                if (!$(".popover:hover").length) {
                    $scope.leftOut(id);
                }
            }, 100);
        };

        $scope.changes = function () {
            var dom = ".img-bo";
            for (var a = 0; a < $(dom).length; a++) {
                var SXT = $(dom).eq(a)
                var t = SXT.width();
                var h = SXT.height();
                var c = t * 0.8;
                var w = c / (SXT.text().length)
                SXT.css("font-size", w)
                SXT.css("line-height", h * 0.8 + "px")
                SXT.css("text-align", "center")
            }
        };
        $scope.changes();
        $(window).resize(function () {
            $scope.changes();
        })

        $scope.distroy = function () {
            $timeout(function () {
                if (document.getElementById("cameraPlayModal").style.display != "block") {
                    $("#ocxDiv").html("");
                } else {
                    $scope.distroy();
                }
            }, 1000)
        }

        HTMLElement.prototype.getPixelColor = function (x, y) {
            var thisContext = this.getContext("2d");
            var imageData = thisContext.getImageData(x, y, 1, 1);
            // 获取该点像素数据
            var pixel = imageData.data;
            var r = pixel[0];
            var g = pixel[1];
            var b = pixel[2];
            var a = pixel[3] / 255;
            a = Math.round(a * 100) / 100;
            var rHex = r.toString(16);
            r < 16 && (rHex = "0" + rHex);
            var gHex = g.toString(16);
            g < 16 && (gHex = "0" + gHex);
            var bHex = b.toString(16);
            b < 16 && (bHex = "0" + bHex);
            var rgbaColor = "rgba(" + r + "," + g + "," + b + "," + a + ")";
            var rgbColor = "rgb(" + r + "," + g + "," + b + ")";
            var hexColor = "#" + rHex + gHex + bHex;
            return {
                rgba: rgbaColor,
                rgb: rgbColor,
                hex: hexColor,
                r: r,
                g: g,
                b: b,
                a: a
            };
        };
    });