'use strict';

angular.module('app.dashboard').controller('cangtCtrl', function ($rootScope,$scope,$state,$filter,$timeout,$compile,$http, $interval,APP_CONFIG, CalendarEvent,ptService) {
    //获取所有的温度信息
    var tempVal=[];
    $scope.tempFun = function () {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: APP_CONFIG.superviseUrl + "/depotStyle/getAllPointChart",
            data: {
                type : "2"
            },
            success: function (msg) {
                var iconDiv = $("#iconDiv");
                iconDiv.html("");
                tempVal=[];
                var clObj = {};//当前仓房的储量信息
                var crkObj = {};//当前仓房的储量信息
                for(var i=0;i<msg.length;i++){
                    var obj = msg[i];
                    clObj = {};
                    crkObj = {};
                    for(var j=0;j<clArr.length;j++){
                        if(obj.house_id == clArr[j].house_id){
                            clObj = clArr[j];
                            break;
                        }
                    }
                    for(var j=0;j<crkArr.length;j++){
                        if(obj.house_id == crkArr[j].ch){
                            crkObj = crkArr[j];
                            break;
                        }
                    }
                    //转换下以便触发效果
                    var grain="";
                    grain = "<div id='"+i+"' style='"+obj.styles+";text-align:center;'><canvas ng-mousemove='showData(\""+i+"canvas\","+i+");' ng-mouseleave='hideData("+i+");' id='"+i+"canvas' style='opacity:0'></canvas></div>";
                    iconDiv.append($compile(grain)($scope));
                    tempVal[i] = "<div class=\"popover-con\">\n" +
                        "<h3>\n" +
                        "    <img src=\"styles/img/page-img/wz.png\"/>&nbsp;<b>"+obj.storehouse_name+"</b>\n" +
                        "</h3>\n" +
                        "<div class=\"popover-main\">\n" +
                        "    <table>\n" +
                        "        <tr>\n" +
                        "            <td><b>仓号："+(clObj.barnName!=undefined?clObj.barnName:'无')+"</b></td>\n" +
                        "            <td><b>等&#12288;级：<b/>"+($rootScope.dicData[crkObj.dj]!=undefined?$rootScope.dicData[crkObj.dj]:'无')+"</td>\n" +
                        "        </tr>\n" +
                        "        <tr>\n" +
                        "            <td><b>仓房状态：</b>"+($rootScope.dicData[clObj.housestate]!=undefined?$rootScope.dicData[clObj.housestate]:'无')+"</td>\n" +
                        "            <td><b>仓&#12288;型：</b>"+($rootScope.dicData[obj.storehouse_type]!=undefined?$rootScope.dicData[obj.storehouse_type]:'')+"</td>\n" +
                        "        </tr>\n" +
                        "        <tr>\n" +
                        "            <td><b>品&#12288;种：</b><span>"+($rootScope.dicData[crkObj.pz]!=undefined?$rootScope.dicData[crkObj.pz]:'无')+"</span></td>\n" +
                        "            <td><b>仓&#12288;容：</b><span>"+(clObj.housecapacity!=undefined?clObj.housecapacity:'无')+"吨</span></td>\n" +
                        "        </tr>\n" +
                        "        <tr>\n" +
                        "            <td><b>仓管员：</b>"+(obj.dutyStoreman!=undefined?obj.dutyStoreman:'无')+"</td>\n" +
                        "            <td><b>储粮量：</b>"+ (crkObj.kcsl!=undefined?(crkObj.kcsl/1000).toFixed(2):'无-')+"吨</td>\n" +
                        "        </tr>\n" +
                        "        <tr>\n" +
                        "            <td colspan='2'><b>性&#12288;质：</b>"+($rootScope.dicData[crkObj.hwxz]!=undefined?$rootScope.dicData[crkObj.hwxz]:'')+"</td>\n" +
                        "        </tr>\n"+
                        /*"        <tr>\n" +
                        "            <td colspan='2'><b>粮权所属：</b>"+(clObj.recordUnite!=undefined?clObj.recordUnite:'')+"</td>\n" +
                        "        </tr>\n" +*/
                        "    </table>\n" +
                        "    <div class=\"tit1\">\n" +
                        "        <span>粮情</span>\n" +
                        "        <div class=\"tit1-line\"></div>\n" +
                        "    </div>\n" +
                        "    <table cellpadding=\"0\" cellspacing=\"0\">\n" +
                        "        <tr>\n" +
                        "            <td colspan='2' ><b>检测时间：</b>"+ (obj.TestDate != undefined?$filter('date')(obj.TestDate, "yyyy-MM-dd HH:mm:ss"):'无')+"</td>\n" +
                        "        </tr>\n" +
                        "        <tr>\n" +
                        "            <td><b>最高粮温：</b>"+(obj.MaxT==undefined?'无':obj.MaxT)+"℃</td>\n" +
                        "            <td><b>仓内湿度：</b>"+(obj.InH==undefined?'无':obj.InH)+"%RH</td>\n" +
                        "        </tr>\n" +
                        "        <tr>\n" +
                        "            <td><b>平均粮温：</b>"+(obj.AvgT==undefined?'无':obj.AvgT)+"℃</td>\n" +
                        "            <td><b>仓外湿度：</b>"+(obj.OutH==undefined?'无':obj.OutH)+"%RH</td>\n" +
                        "        </tr>\n" +
                        "        <tr>\n" +
                        "            <td><b>最低温度：</b>"+(obj.MinT==undefined?'无':obj.MinT)+"℃</td>\n" +
                        "            <td></td>\n" +
                        "        </tr>\n" +
                        "    </table>\n" +
                        "    </div>\n" +
                        "</div>";

                    var data_x=$("#"+i+"canvas").width();
                    var data_Y=$("#"+i+"canvas").height();
                    var img = new Image();
                    img.setAttribute('crossOrigin', 'anonymous');
                    img.src = obj.imgdata;
                    $scope.addImg(img,i,data_x,data_Y);
                    $scope.showText(i+"canvas",i);
                }
            }
        });
    }

    //初始化摄像头
    $scope.playCamera = function (index) {
        $("#cameraPlayModal").modal("show")
        setTimeout(function(){
            var width=document.getElementById("ocxDiv").clientWidth*0.95,height=document.getElementById("ocxDiv").clientHeight*0.95;
            var OBJ = "<OBJECT ID=\"cameraocx\" width=100% height=250px classid=\"CLSID:A9A5DEC8-62AB-4444-9024-874FF35D3FD1\">" +
                "<PARAM NAME=\"vmode\" VALUE=\"transparent\">" +
                "<PARAM NAME=\"_Version\" VALUE=\"65536\">" +
                "<PARAM NAME=\"_ExtentX\" VALUE=\"12806\">" +
                "<PARAM NAME=\"_ExtentY\" VALUE=\"1747\">" +
                "<PARAM NAME=\"_StockProps\" VALUE=\"0\">" +
                "</OBJECT>";
            $("#ocxDiv").html(OBJ);
            var playocx = document.getElementById('cameraocx');//加载控件，给控件赋值用
            playocx.width=(width)+"px";
            playocx.height=(height)+"px";
            playocx.SetLiveLayout(1);
            var tdh = 0;//通道号
            var zm = "";//字幕
            var winIndex = -1;//窗口索引
            var err = playocx.DeviceLogin_NOPOINT(cameraVal[index].nvrIp,cameraVal[index].nvrPort*1,cameraVal[index].nvrName,cameraVal[index].nvrPassword,cameraVal[index].factory*1);
            err = playocx.VideoPlay_NOPOINT(cameraVal[index].nvrIp,cameraVal[index].nvrPort*1,cameraVal[index].nvrName,cameraVal[index].nvrPassword,cameraVal[index].factory*1,cameraVal[index].channelNumber ,zm ,winIndex);

        },500)
    };

    var X_data = new Array();
    var Y_data = new Array();
    $scope.addImg = function(img,id,data_x,data_Y){
        $timeout(function(){
            $("#"+id+"canvas").width("100%");
            $("#"+id+"canvas").height("100%");
            data_x=data_x/$("#"+id+"canvas").width();
            data_Y=data_Y /$("#"+id+"canvas").height();
            X_data[id] = data_x;
            Y_data[id] = data_Y;
            var canvas = document.getElementById(id+"canvas");
            var context = canvas.getContext("2d");
            context.fillStyle = 'rgba(0, 0, 0, 0)';
            context.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height);
        },100);
    };

    //加载鼠标移动显示信息
    $scope.showText = function(id,nums){
        var _this = "#"+id;
        $(_this).popover({
            placement: "auto right",
            html: true,
            title: $("#popContainer h3").html(),
            content: tempVal[nums],
            width: "271",
            delay: {
                show: 100,
                hide: 400
            }
        })
    };

    $scope.showData = function(id,nums){
        var canvas=$("#"+id);
        var e=event||window.event;
        var canvasOffset = canvas.offset();
        var x,y;
        x = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        y = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        var canvasX = Math.floor(x - canvasOffset.left);
        var canvasY = Math.floor(y - canvasOffset.top);
        var colorData = document.getElementById(id).getPixelColor(canvasX*X_data[nums], canvasY*Y_data[nums]);
        // 获取该点像素的数据
        var color = colorData.a;
        var _this = "#"+id;
        if(color!="0"){
            //循环判断是否有正在显示的弹窗
            if(document.getElementById(nums).getElementsByTagName("div").length!=0){
                return;
            }
            //如果有正在显示则不让别的显示
            $(_this).popover("show");
            //鼠标移出弹出框后弹出框消失
            $(_this).siblings( '.popover' ).on( 'mouseleave' , function () {
                $(_this).popover( 'hide' );
            });
        }else{
            $(_this).popover("hide");
        }
    };

    $scope.hideData = function(id){
        var _this = "#"+id+"canvas";
        $timeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
    };

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
    }

    //获取储量信息
    var clArr=[];
    $scope.getClInfo = function () {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: APP_CONFIG.superviseUrl + "/depotStyle/getAllPointChart",
            data: {
                type : "4"
            },
            success: function (msg) {
                clArr = msg;
                $scope.getCrkInfo();
            }
        });
    };

    //获取当前实时粮库信息-从敏捷平台出入库获取
    var crkArr=[];
    $scope.getCrkInfo = function () {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: APP_CONFIG.agileUrl + "/agile/kcsw/queryLKNewData",
            data: {
            	orgId:$rootScope.orgInfo.orgId
            },
            success: function (msg) {
                crkArr = msg;
                $scope.tempFun();//初始化粮情信息
            }
        });
    };

    //跳转到摄像头bug页面
    $scope.skipCameraBugList = function () {
        $scope.switchTopMenu(17,"app.camera.index");
        $state.go("app.qualityDlag.resultNewList",{isShow :'2'});
    }
    //跳转到粮情bug页面
    $scope.skipLqBugList = function () {
        $scope.switchTopMenu(18,"app.supervise.cameraPT");
        $state.go("app.supervise.situation.temperature",{isShow :'true'});
    }

    $scope.seleVal = "2";
    $scope.birdsEyeUrl = $rootScope.orgInfo.birdsEye;
    $scope.tempCameraChange = function () {
        if($scope.seleVal == "2"){//粮温
            $("#indexBJ-ul").html($compile("<li ng-click='skipLqBugList()' style='cursor: pointer;'><img src=\"../../styles/img/home-1/baoj.png\"/>粮情报警</li>>")($scope));
            $scope.getClInfo();//初始化储粮信息
        }else if($scope.seleVal == "1"){//摄像头
            //获取当前库摄像头异常总数量
            // ptService.getCameraErrCount().then(function(data){
            //     $("#indexBJ-ul").html($compile("<li ng-click='skipCameraBugList()' style='cursor: pointer;'><img src=\"../../styles/img/home-1/baoj.png\"/>摄像头异常数量："+data.count+"</li>")($scope));
            // });
            $("#indexBJ-ul").html("");
            $scope.cameraFun();//初始化摄像头信息
        }
    };

    HTMLElement.prototype.getPixelColor = function(x, y){
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
            rgba : rgbaColor,
            rgb : rgbColor,
            hex : hexColor,
            r : r,
            g : g,
            b : b,
            a : a
        };
    };
    // window.onload = function(){
    $scope.tempCameraChange();
    // };

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
});