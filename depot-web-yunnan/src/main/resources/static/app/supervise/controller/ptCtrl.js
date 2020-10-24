"use strict";
/**
 * 点位ctrl，
 */
angular.module('app.supervise')
/**
 * 摄像头点位控制类
 */
    .controller("cameraPTCtrl", function($scope,$rootScope,$filter,$state,$compile,$timeout,$interval,$stateParams, alertService, $http,ptService,
                 keepAccountService, warningThresholdService,APP_CONFIG) {
        $scope.birdsRemoteUrl = $rootScope.orgInfo.birdsRemote;
        // 默认分页
        $scope.pageInfo = {pageNum: 1, pageSize: 100};
        // 筛选条件
        $scope.search = {};
        //传入type:1监控，2粮情，3作业，4储粮
        var arrayObj = new Array();
        $scope.tempFun = function (types) {
            $(".ycjk-btn").removeClass("active");
            $(".ycjk-btn"+types).addClass("active");
            if(types == "3"){
                types = "3.1";
            }
            ptService.getIndex(types).then(function(data){
                var showDiv = $("#showDiv");
                showDiv.html("");
                $("#yjDiv").show();
                // $("#yjDiv").html(($compile("<a ng-click=showJkErrList() style=\"color: red;\"><img src=\"styles/img/page-img/icon-yujing.png\"/><span id=\"yjsm\">监控报警</span>（<span id=\"wdyj\">0</span>）</a>")($scope)));
                if(types == "1"){//监控
                    $("#yjDiv").hide();
                    ptService.getCameraErrCount().then(function(data){//获取当前库摄像头异常总数量
                        // $("#yjDiv").html(($compile("<a ng-click=showJkErrList() style=\"color: red;\"><img src=\"styles/img/page-img/icon-yujing.png\"/><span id=\"yjsm\">监控报警</span>（<span id=\"wdyj\">"+data.count+"</span>）</a>")($scope)));
                    })

                    $scope.cameraList = data;
                    $timeout(function () {
                        for(var i=0;i<data.length;i++){
                            var img = "styles/img/camera.png";
                            if(data[i].cameraType == "1"){
                                img = "styles/img/camera_qiu.png";
                            }
                            showDiv.append($compile("<img ng-click='playCamera(\""+i+"\")' src='"+img+"' style='"+data[i].styles+";z-index:1;cursor:pointer;'/>")($scope));
                        }
                    },100)
                }else if(types == "2"){//粮情
                    warningThresholdService.getInsectPestDetectionPageInfo($scope.pageInfo, $scope.search,"WD").then(function (anErrorData) {
                        $("#yjDiv").html(($compile("<a ng-click='showLqBj()'  style=\"color: red;\"><img src=\"styles/img/page-img/icon-yujing.png\"/><span id=\"yjsm\">粮情报警</span>（<span id=\"wdyj\">"+anErrorData.data.list.length+"</span>）</a>")($scope)));
                    }, function (data) {
                        // console.log(data);
                    });

                    $timeout(function () {
                        arrayObj.splice(0,arrayObj.length);
                        for(var i=0;i<data.length;i++){
                            var grain = "";
                            grain += "<div class='jk-icon-box'>"+
                                "<div id='"+i+"' style='"+data[i].styles+";text-align:center;'><canvas ng-mousemove='showData(\""+i+"canvas\","+i+");' ng-mouseleave='hideData("+i+");' id='"+i+"canvas' style='opacity:0;'></canvas></div></div>";
                            showDiv.append($compile(grain)($scope));
                            data[i].TestDate = $filter('date')(data[i].TestDate, "yyyy-MM-dd");
                            var pop = "";
                            pop += "<div id='popContainer'><div class='popover-con' ><h3>&nbsp;"+data[i].barnName+"</h3>"+
                                "<div class='popover-main'><p class='p1'><span>入仓时间："+ (data[i].TestDate==undefined?'无':data[i].TestDate)  +"</span><span>品种："+(data[i].sub_type==undefined?'无':$rootScope.dicData[data[i].sub_type]) +"</span></p>"+
                                "<div class='tit1'><span>温度信息</span></div><table><tr><td style='width:143px;'>最高粮温："+(data[i].MaxT==undefined?'无':data[i].MaxT+'℃')+"</td>"+
                                "<td>仓内温度："+(data[i]._InT==undefined?'无':data[i]._InT+'℃')+"</td></tr><tr><td>平均粮温："+(data[i].AvgT==undefined?'无':data[i].AvgT+'℃')+"</td><td>仓外温度："+(data[i].OutT==undefined?'无':data[i].OutT+'℃')+"</td></tr><tr>"+
                                "<td colspan='2'>最低粮温："+(data[i].MinT==undefined?'无':data[i].MinT+'℃')+"</td></tr></table><div class='tit1'><span>粮情状态</span></div>"+
                                "<div class='state1'><img src='styles/img/page-img/zhengchang.png'/>&nbsp;正常</div><div class='tit1'>"+
                                "<a data-ui-sref='app.supervise.situation.threeTempChart({id:"+data[i].house_id+"})'>查看详情></a></div></div></div></div>";
                            arrayObj.push(pop);

                            var data_x=$("#"+i+"canvas").width();
                            var data_Y=$("#"+i+"canvas").height();
                            var img = new Image();
                            img.setAttribute('crossOrigin', 'anonymous');
                            img.src = data[i].imgdata;
                            $scope.addImg(img,i,data_x,data_Y);
                            $scope.showText(i+"canvas",i);
                            }
                        },100);
                }else if(types == "3.1"){//通风
                    $("#yjDiv").hide();
                    $timeout(function () {
                        for(var i=0;i<data.length;i++){
                            showDiv.append($compile("<img ng-click='getJobDate(\"3.1\",\""+data[i].house_id+"\",\""+data[i].task_status+"\")' src='styles/img/zy_tf.gif' title='通风作业' style='"+data[i].styles+";z-index:1;cursor:pointer;'/>")($scope));
                        }
                    },100);
                    ptService.getIndex("3.2").then(function(data){//熏蒸
                        $timeout(function () {
                            for(var i=0;i<data.length;i++){
                                showDiv.append($compile("<img ng-click='getJobDate(\"3.2\",\""+data[i].house_id+"\",\"0\")' src='styles/img/zy_xz.gif' title='熏蒸作业' style='"+data[i].styles+";z-index:1;cursor:pointer;'/>")($scope));
                            }
                        },100)
                    });
                    ptService.getIndex("3.3").then(function(data){//入库
                        $timeout(function () {
                            for(var i=0;i<data.length;i++){
                                showDiv.append($compile("<img ng-click='getJobDate(\"3.3\",\""+data[i].house_id+"\",\""+data[i].process_instance_id+"\")' src='styles/img/zy_rk.gif' title='入库作业' style='"+data[i].styles+";z-index:1;cursor:pointer;'/>")($scope));
                            }
                        },100)
                    });
                    ptService.getIndex("3.4").then(function(data){//出库
                        $timeout(function () {
                            for(var i=0;i<data.length;i++){
                                showDiv.append($compile("<img ng-click='getJobDate(\"3.4\",\""+data[i].house_id+"\",\""+data[i].process_instance_id+"\")' src='styles/img/zy_ck.gif' title='出库作业' style='"+data[i].styles+";z-index:1;cursor:pointer;'/>")($scope));
                            }
                        },100)
                    })
                }else if(types == "4"){//储粮信息
                    $("#yjDiv").hide();
                    $timeout(function () {
                        arrayObj.splice(0,arrayObj.length);
                        var crkObj = {};//当前仓房的储量信息
                        for(var i=0;i<data.length;i++){
                            crkObj = {};
                            for(var j=0;j<crkArr.length;j++){
                                if(data[i].house_id == crkArr[j].ch){
                                    crkObj = crkArr[j];
                                    break;
                                }
                            }

                            var grain = "";
                            grain += "<div class='jk-icon-box'>"+
                                "<div id='"+i+"' style='"+data[i].styles+";text-align:center'><canvas ng-mousemove='showData(\""+i+"canvas\","+i+");' ng-mouseleave='hideData("+i+");' id='"+i+"canvas' style='opacity:0;'></canvas></div></div>";
                            showDiv.append($compile(grain)($scope));
                            crkObj.rq = $filter('date')(crkObj.rq, "yyyy-MM-dd");
                            var pop = "";
                            pop += "<div id='popContainer'><div class='popover-con'>"+
                                "<h3>&nbsp;"+data[i].barnName+"</h3><div class='popover-main'>"+
                                "<table><tr><td style='width:143px;'>入仓时间："+(crkObj.rq?crkObj.rq:"空")+"</td></tr><tr>"+
                                "</tr><tr><td colspan='2'>实际仓容："+(data[i].capacity?data[i].capacity:"0")+"吨</td></tr><tr>"+
                                "<td colspan='2'>状&#12288;&#12288;态："+($scope.dicData[data[i].housestate]?$scope.dicData[data[i].housestate]:"空")+"</td></tr></table><div class='tit1'>"+
                                "<span>储粮信息</span></div><table><tr><td colspan='2'>品&#12288;&#12288;种："+($rootScope.dicData[crkObj.pz]?$rootScope.dicData[crkObj.pz]:"空")+"</td>"+
                                "</tr><tr><td colspan='2'>数&#12288;&#12288;量："+(crkObj.kcsl!=undefined?(crkObj.kcsl/1000).toFixed(2):'0')+"吨</td>"+
                                "</tr><tr><td colspan='2'>性&#12288;&#12288;质："+ ($rootScope.dicData[crkObj.hwxz]?$rootScope.dicData[crkObj.hwxz]:"空")+"</td>"+
                                "</tr><tr><td colspan='2'>等&#12288;&#12288;级："+($rootScope.dicData[crkObj.dj]?$rootScope.dicData[crkObj.dj]:"空")+"</td></tr>"+
                                /*"<tr><td colspan='2'>粮权所属："+(data[i].recordUnite?data[i].recordUnite:"空")+"</td></tr>"+*/
                                "</table><div class='tit1'><a data-ui-sref='app.supervise.storage.houseKeepAccount({houseId:"+data[i].house_id+"})'>查看详情></a>"+
                                "</div></div></div></div>";
                            arrayObj.push(pop);

                            var data_x=$("#"+i+"canvas").width();
                            var data_Y=$("#"+i+"canvas").height();
                            var img = new Image();
                            img.setAttribute('crossOrigin', 'anonymous');
                            img.src = data[i].imgdata;
                            $scope.addImg(img,i,data_x,data_Y);
                            $scope.showText(i+"canvas",i);
                        }
                    },100)
                }
                $timeout(function () {
                    $scope.changes();//调用样式
                },200);
            },function(data){
                console.log(data);
            });
        }

        //跳转到摄像头异常列表
        $scope.showJkErrList = function (url) {
            $state.go("app.qualityDlag.resultNewList",{isShow :'1'});
        }
        //跳转到粮情异常信息列表
        $scope.showLqBj = function () {
            $state.go("app.supervise.situation.temperature",{isShow :'true'});
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
            var dates = $compile(arrayObj[nums])($scope);
            $(_this).popover({
                placement: "auto left",
                html: true,
                title: $("#popContainer h3").html(),
                content: '<div id="content">'+dates[0].innerHTML+'</div>',
                width: "271",
                delay: {
                    show: 100,
                    hide: 400
                }
            })
        };

        var e;
        $scope.showData = function(id,nums){
            var canvas=$("#"+id);
            e=event||window.event;
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
                $scope.leftOut(nums);
            }
        };

        //判断鼠标是从左边移出
        $scope.leftOut = function(nums){
            var _this = "#"+nums+"canvas";
            var mouse=$("#"+nums);
            var mouseOffset = mouse.offset();
            var w = mouse.outerWidth();
            var h = mouse.outerHeight();
            var x = (e.pageX - mouseOffset.left - (w / 2)) * (w > h ? (h / w) : 1);
            var y = (e.pageY - mouseOffset.top - (h / 2)) * (h > w ? (w / h) : 1);
            var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;  //direction的值为“0,1,2,3”分别对应着“上，右，下，左”
            if(direction != 3 || e.type=="mouseleave"){
                $(_this).popover("hide");
            }
        };

        $scope.hideData = function(id){
            var _this = "#"+id+"canvas";
            $timeout(function () {
                if (!$(".popover:hover").length) {
                    $scope.leftOut(id);
                }
            }, 100);
        };

        $scope.changes = function(){
            var dom = ".img-bo";
            for(var a=0;a<$(dom).length;a++){
                var SXT=$(dom).eq(a)
                var t=SXT.width();
                var h=SXT.height();
                var c=t*0.8;
                var w= c/(SXT.text().length)
                SXT.css("font-size",w)
                SXT.css("line-height",h*0.8+"px")
                SXT.css("text-align","center")
            }
        };
        $scope.changes();
        $(window).resize(function() {
            $scope.changes();
        })
        //TODO 显示弹框并且播放控件
        $scope.playCamera = function (index) {
            var data = $scope.cameraList[index];
            $("#cameraPlayModal").modal("show");

            setTimeout(function(){
                var width=document.getElementById("ocxDiv").clientWidth*0.95,height=document.getElementById("ocxDiv").clientHeight*0.95;
                var OBJ = "<OBJECT ID=\"cameraocx\" width="+width+"px height="+height+"px classid=\"CLSID:A9A5DEC8-62AB-4444-9024-874FF35D3FD1\">" +
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
                playocx.DeviceLogin_NOPOINT(data.nvrIp,data.nvrPort,data.nvrName,data.nvrPassword,data.factory);
                playocx.VideoPlay_NOPOINT(data.nvrIp,data.nvrPort,data.nvrName,data.nvrPassword,data.factory,data.channelNumber ,zm ,winIndex);
            },1000)
        }

        $scope.distroy = function () {
            $timeout(function () {
                if(document.getElementById("cameraPlayModal").style.display != "block"){
                    $("#ocxDiv").html("");
                }else{
                    $scope.distroy();
                }
            },1000)
        }

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

        $scope.getJobDate = function(type,id,process_instance_id) {
            if (type == "3.1") {
                $state.go("app.storage.taskDispatch.aerationSummaryList",{id : id});
                $rootScope.childSysId = 19;
                sessionStorage.setItem("childSysId", 19);
                // $state.go('app.storage.taskDispatch.aerationSummaryEdit',{id:id,butType:process_instance_id});
            } else if (type == "3.2") {
                // $state.go("app.storage.fumigationTaskRecord-view",{id : id});
                $state.go("app.intelligent.fumigation.fumigationList",{id : id});
                $rootScope.childSysId = 19;
                sessionStorage.setItem("childSysId", 19);
            }else if (type == "3.3") {console.log(msg);
                // $state.go("app.business.storageNotice-audit-pass-view", {id : id, processInstanceId : process_instance_id});
                $state.go("app.supervise.operation.list",{id:id,type:"1"});
            } else if (type == "3.4") {
                // $state.go("app.business.deliveryNotice-audit-pass-view", {id : id, processInstanceId : process_instance_id});
                $state.go("app.supervise.operation.list",{id:id,type:"3"});
            }
        }

        //获取当前实时粮库信息-从敏捷平台出入库获取
        var crkArr=[];
        $scope.getIndex = function (types) {
            $.ajax({
                type: "GET",
                dataType: "json",
                url: APP_CONFIG.agileUrl + "/agile/kcsw/queryLKNewData",
                data: {
                    orgId:$rootScope.orgInfo.orgId
                },
                success: function (msg) {
                    crkArr = msg;
                    $scope.tempFun(types);//初始化粮情信息
                }
            });
        };

        if($stateParams.showType == "2"){
            $scope.getIndex('2');//默认加载粮情模块
        }else{
            $scope.getIndex('1');//默认加载视频模块
        }
    })
/**
 * 省级平台跳转
 */
.controller("provinceCameraCtrl", function($scope,$rootScope,$filter,$state,$compile,$timeout,$interval,$stateParams, alertService,
                                           StorehouseService, userService, $http,ptService,basicStationSetService,WareHouseBasicInfoService,
                                           powerService) {
    $scope.getCameraData = function () {
        //先退出清空session
        userService.exitLogin().then(function(data) {
            // 退出登录，userInfo设置为空.
            $rootScope.userInfo = null;
            //再登陆
            userService.loginByProvince($stateParams.userName+"_"+$stateParams.pOrgId, $stateParams.pOrgId).then(function(data) {
                if (data.status == true) {
                    userService.getLoginInfo().then(function(data) {
                        // 当前登录用户
                        $rootScope.userInfo = data.userInfo;
                        // 当前用户所属组织
                        $rootScope.orgInfo = data.orgInfo;
                        // 当前用户所属粮库
                        $rootScope.depotInfo = data.depotInfo;
                        // 当前用户所属粮库编号
                        $rootScope.depotId = data.depotId;

                        // 获取仓房列表
                        StorehouseService.getStorehouseList(data.depotId, "0").then(function(data){
                            $rootScope.storelist = data.houseList;
                            $rootScope.storehouseObj = data.houseObj;
                            $rootScope.storeHouseCodeObj = data.houseCodeObj;
                        },function(data){
                            console.log(data);
                        });

                        // 获取仓房基本信息
                        WareHouseBasicInfoService.WareHouseBasicInfo(data.depotId, "0").then(function(data){
                            $rootScope.storehouseCode = data.storehouseCode;
                        },function(data){
                            console.log(data);
                        });
                        //获取站点数据信息
                        basicStationSetService.getStations(data).then(function(data){
                            $rootScope.stations = data.data;
                        },function(data){
                            console.log(data);
                        });

                        $timeout(function () {
                            // 获取权限后再跳转
                            powerService.getFuncByUserId().then(function(data) {
                                hasFuncList = data;
                                sessionStorage.setItem("hasFuncList", angular.toJson(data));
                                powerService.getButtonByUserId().then(function(data) {
                                    permissionList = data;
                                    sessionStorage.setItem("permissionList", angular.toJson(data));
                                    //$scope.switchTopMenu(18,'app.supervise.cameraPT');//跳到粮库决策页面
                                    $state.go("app.dashboard");
                                })
                            })
                        },500);
                    })
                } else {
                    if(window.confirm("该用户的权限不能跳转到此页面，请确定权限后再跳转！")){
                        window.opener=null;
                        window.open('','_self');
                        window.close();
                    }
                }
            }, function(data) {
                console.log(data);
            });
        });
    };

    $scope.switchTopMenu = function(funcId, stateName) {
        if (funcId!=null) {
            if (!$("#menu-"+funcId).hasClass('open')) {
                $("#menu-"+funcId).smartCollapseToggle();
            }
            if (funcId==18) {
                $('body').addClass("minified");
            } else {
                $('body').removeClass("minified");
            }
            $state.go(stateName);
        } else {
            $rootScope.isIndexPage = true;
            $state.go("app.dashboard");
        }
        $rootScope.childSysId = funcId;
        sessionStorage.setItem("childSysId", funcId);
    };

    //传入type:1监控，2粮情，3作业，4储粮
    var arrayObj = new Array();
    $scope.getIndex = function (types) {
        $scope.birdsRemoteUrl = $rootScope.orgInfo.birdsRemote;

        $(".ycjk-btn").removeClass("active");
        $(".ycjk-btn"+types).addClass("active");
        ptService.getIndex(types).then(function(data){
            var showDiv = $("#showDiv");
            showDiv.html("");
            $("#yjDiv").show();
            // $("#yjDiv").html(($compile("<a ng-click=showJkErrList() style=\"color: red;\"><img src=\"styles/img/page-img/icon-yujing.png\"/><span id=\"yjsm\">监控报警</span>（<span id=\"wdyj\">0</span>）</a>")($scope)));
            if(types == "1"){//监控
                $("#yjDiv").hide();
                ptService.getCameraErrCount().then(function(data){//获取当前库摄像头异常总数量
                    // $("#yjDiv").html(($compile("<a style=\"color: red;\"><img src=\"styles/img/page-img/icon-yujing.png\"/><span id=\"yjsm\">监控报警</span>（<span id=\"wdyj\">"+data.count+"</span>）</a>")($scope)));
                })

                $scope.cameraList = data;
                $timeout(function () {
                    for(var i=0;i<data.length;i++){
                        var img = "styles/img/camera.png";
                        if(data[i].cameraType == "1"){
                            img = "styles/img/camera_qiu.png";
                        }
                        showDiv.append($compile("<img ng-click='playCamera(\""+i+"\")' src='"+img+"' style='"+data[i].styles+";z-index:1;cursor:pointer;'/>")($scope));
                    }
                },100)

                //去除头和左侧信息
                $("#header").css("display", "none");
                $("#left-panel").css("display", "none");
                $("#ribbon").css("display", "none");
                $("#main").css("margin-left", "0px").css("margin-top", "0px");
                $(".page-footer").css("display", "none").css("height", "0px");
            }
        },function(data){
            console.log(data);
        });
    };

    //TODO 显示弹框并且播放控件
    $scope.playCamera = function (index) {
        var data = $scope.cameraList[index];
        $("#cameraPlayModal").modal("show");

        setTimeout(function(){
            var width=document.getElementById("ocxDiv").clientWidth*0.95,height=250;
            var OBJ = "<OBJECT ID=\"cameraocx\" width="+width+"px height="+height+"px classid=\"CLSID:A9A5DEC8-62AB-4444-9024-874FF35D3FD1\">" +
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
            playocx.DeviceLogin_NOPOINT(data.nvrIp,data.nvrPort,data.nvrName,data.nvrPassword,data.factory);
            playocx.VideoPlay_NOPOINT(data.nvrIp,data.nvrPort,data.nvrName,data.nvrPassword,data.factory,data.channelNumber ,zm ,winIndex);
        },1000)
    }

    $scope.distroy = function () {
        $timeout(function () {
            if(document.getElementById("cameraPlayModal").style.display != "block"){
                $("#ocxDiv").html("");
            }else{
                $scope.distroy();
            }
        },1000)
    }

    $scope.getCameraData();
})

/**
 * 仓房状态
 */
.controller("houseStatePTCtrl", function($scope,$rootScope,$filter,$state,$compile,$timeout,$interval,$stateParams, alertService, $http,ptService, APP_CONFIG) {
    $scope.birdsRemoteUrl = $rootScope.orgInfo.birdsRemote;
    var arrayObj = new Array();
    $scope.getIndex = function () {
        ptService.getHouseStatePointChart().then(function(data){
            var houseData = data.houseData;
            if(houseData != "null"){
                var showDiv = $("#showDiv");
                showDiv.html("");
                $timeout(function () {
                    for(var i=0;i<houseData.length;i++){
                        if(houseData[i].wName == "6991"){
                            //黄色预警
                            showDiv.append($compile("<img src='styles/img/temperature/gwyj.jpg' style='"+houseData[i].styles+";z-index:1;'/>")($scope));
                        }else if(houseData[i].wName == "6983"){
                            //红色报警
                            showDiv.append($compile("<img src='styles/img/temperature/gwbj.jpg' style='"+houseData[i].styles+";z-index:1;'/>")($scope));
                        }
                    }
                },100)
            }
        },function(data){
            console.log(data);
        });
    };

    $scope.getIndex();//默认加载粮情模块
});