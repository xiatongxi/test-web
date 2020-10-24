'use strict';

angular.module('app.dashboard').controller('cangtCtrl', function ($rootScope,$scope,$state,$timeout,$compile,$http, $interval, CalendarEvent) {
    $scope.initPop = function () {
        $(".jk-text-box").on("mouseenter", function () {
            var _this = this;
            var num = $(_this).attr("id");
            //放置内容切换
            $(_this).popover({
                placement: "auto top",
                html: true,
                title: $("#popContainer h3").html(),
                content: tempVal[num],
                width: "271",
                delay: {
                    show: 100,
                    hide: 400
                }
            })
            $(".popover").hide();
            $(_this).popover("show");
        }).on("mouseleave", function(){
            $(".popover").hide();
        });
    }

    //获取所有的温度信息
    var tempVal=[];
    $scope.tempFun = function () {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/depotStyle/getAllPointChart",
            data: {
                type : "2"
            },
            success: function (msg) {
                var iconDiv = $("#iconDiv");
                iconDiv.html("");
                tempVal=[];
                for(var i=0;i<msg.length;i++){
                    var obj = msg[i];
                    var clObj;//当前仓房的储量信息
                    for(var j=0;j<clArr.length;j++){
                        if(obj.house_id = clArr[j].house_id){
                            clObj = clArr[j];
                            break;
                        }
                    }
                    iconDiv.append("<div id="+i+" class='jk-text-box' style='"+obj.styles+";text-align:center;line-height: 6;z-index:1;cursor:pointer;'></div>");
                    tempVal[i] = "<div class=\"popover-con\">\n" +
                        "<h3>\n" +
                        "    <img src=\"styles/img/page-img/wz.png\"/>&nbsp;"+obj.storehouse_name+"\n" +
                        "</h3>\n" +
                        "<div class=\"popover-main\">\n" +
                        "    <table>\n" +
                        "        <tr>\n" +
                        "            <td>仓&#12288;型："+obj.storehouse_type+"</td>\n" +
                        "            <td>品&#12288;种：<span>"+($rootScope.dicData[clObj.sub_type]!=undefined?$rootScope.dicData[clObj.sub_type]:clObj.sub_type)+"</span></td>\n" +
                        "        </tr>\n" +
                        "        <tr>\n" +
                        "            <td>仓管员："+obj.dutyStoreman+"</td>\n" +
                        "            <td>储粮量："+clObj.number+"吨</td>\n" +
                        "        </tr>\n" +
                        "    </table>\n" +
                        "    <div class=\"tit1\">\n" +
                        "        <span>粮情</span>\n" +
                        "        <div class=\"tit1-line\"></div>\n" +
                        "    </div>\n" +
                        "    <table cellpadding=\"0\" cellspacing=\"0\">\n" +
                        "        <tr>\n" +
                        "            <th>最高粮温："+obj.MaxT+"℃</th>\n" +
                        "            <th>仓内湿度："+obj.InH+"℃</th>\n" +
                        "        </tr>\n" +
                        "        <tr>\n" +
                        "            <th>平均粮温："+obj.AvgT+"℃</th>\n" +
                        "            <th>仓外湿度："+obj.OutH+"℃</th>\n" +
                        "        </tr>\n" +
                        "        <tr>\n" +
                        "            <th>最低温度："+obj.MinT+"℃</th>\n" +
                        "            <th></th>\n" +
                        "        </tr>\n" +
                        "    </table>\n" +
                        "    <div class=\"tit1\">\n" +
                        "        <span>储粮</span>\n" +
                        "        <div class=\"tit1-line\"></div>\n" +
                        "    </div>\n" +
                        "    <table cellpadding=\"0\" cellspacing=\"0\">\n" +
                        "        <tr>\n" +
                        "            <th>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;质："+($rootScope.dicData[clObj.quality]!=undefined?$rootScope.dicData[clObj.quality]:'')+"</th>\n" +
                        "        </tr>\n"+
                        "        <tr>\n" +
                        "            <th>等&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级："+($rootScope.dicData[clObj.level]!=undefined?$rootScope.dicData[clObj.level]:'')+"</th>\n" +
                        "        </tr>\n" +
                        "        <tr>\n" +
                        "            <th>粮权所属："+(clObj.record_unite!=undefined?clObj.record_unite:'')+"</th>\n" +
                        "        </tr>\n" +
                        "    </table>\n" +
                        "    </div>\n" +
                        "</div>";
                }
                $scope.initPop();
            }
        });
    }

    //初始化摄像头
    $scope.playCamera = function (index) {
        $("#cameraPlayModal").modal("show")
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
        },500)
    }

    //获取摄像头信息
    var cameraVal=[];
    $scope.cameraFun = function () {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/depotStyle/getAllPointChart",
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
    }

    //获取储量信息
    var clArr=[];
    $scope.getClInfo = function () {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/depotStyle/getAllPointChart",
            data: {
                type : "4"
            },
            success: function (msg) {
                clArr = msg;
                $scope.tempFun();//初始化粮情信息
            }
        });
    }



    $scope.seleVal = "2";
    $scope.tempCameraChange = function () {
        if($scope.seleVal == "2"){//粮温
            $scope.getClInfo();//初始化储粮信息
        }else if($scope.seleVal == "1"){//摄像头
            $scope.cameraFun();//初始化摄像头信息
        }
    }
    $scope.tempCameraChange();
});