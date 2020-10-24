"use strict";
angular.module('app.intelligent')
/*.service("cameraService", function($http, $q, APP_CONFIG, $rootScope) {
    //分页数据查询
    this.getPageInfo = function(pageNum, pageSize, cameraData) {
        var orgId = $rootScope.orgInfo.orgId;
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.monitorUrl + '/camera/getCamera',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                cameraName : cameraData == undefined?"":cameraData.name,
                orgid : orgId
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }
    //根据id查询详细数据
    this.getCameraDite = function(id){
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.monitorUrl + '/camera/edit',
            params: {
                id: id
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }
    // 删除一条记录
    this.removeById = function(id) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.monitorUrl + '/camera/removeCamera',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            //console.log(response);
        });
        return d.promise;
    }
    //添加或修改数据
    this.saveAndUpdata = function (dates,nvrId) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.monitorUrl + '/camera/saveCamera',
            data: {
                cameraJson : dates,
                nvrId : nvrId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            //console.log(response);
        });
        return d.promise;
    }


})*/
    .service("definitionTVService", function ($http, $q, APP_CONFIG) {
        //查询详细数据
        this.getAllCamera = function () {
            var d = $q.defer();
            $http({
                method: 'GET',
                url : APP_CONFIG.intelligentUrl + '/intelligents/cameraVideo/getVideo',
                params: {

                }
            }).then(function successCallback(response) {
                // 请求成功执行代码
                d.resolve(response.data);
            }, function errorCallback(response) {
                // 请求失败执行代码
                d.reject("error");
            });
            return d.promise;
        };

        var playocx;
        this.initOBJ = function () {
            var OBJ = "<OBJECT ID=\"playOcx\" classid=\"CLSID:A9A5DEC8-62AB-4444-9024-874FF35D3FD1\">" +
                "<PARAM NAME=\"vmode\" VALUE=\"transparent\">" +
                "<PARAM NAME=\"_Version\" VALUE=\"65536\">" +
                "<PARAM NAME=\"_ExtentX\" VALUE=\"12806\">" +
                "<PARAM NAME=\"_ExtentY\" VALUE=\"1747\">" +
                "<PARAM NAME=\"_StockProps\" VALUE=\"0\">" +
                "</OBJECT>";

            var width = $("#throughDIV").width();
            var height = document.documentElement.clientHeight * 1;
            document.getElementById("throughDIV").innerHTML = "";
            $("#throughDIV").html($(OBJ));
            playocx = document.getElementById('playOcx');//加载控件，给控件赋值用

            playocx.width = (width - 5) + "px";
            playocx.height = (height - 230) + "px";
            playocx.SetLiveLayout(4);
        }


        this.play = function (item) {//item.cameraIp,0, item.factory, 0, item.cameraType);
            var tdh = 0;//通道号
            var zm = "";//字幕
            var winIndex = -1;//窗口索引

            if (playocx.GetPaneIndex(item.vVedioIp, item.iVedioPort, item.vVedioUser, item.vJcpp, item.vVedioTdh, 0) < 0) {
                // 登录
                playocx.DeviceLogin_NOPOINT(item.vVedioIp, item.iVedioPort, item.vVedioUser, item.vVedioPwd, item.vJcpp);
                // 打开
                playocx.VideoPlay_NOPOINT(item.vVedioIp, item.iVedioPort, item.vVedioUser, item.vVedioPwd, item.vJcpp, item.vVedioTdh, zm, winIndex);
            } else {
                alert("已经在" + (playIndex + 1) + "号窗口播放");
            }
        };

        // 设置全屏(全屏画面播放)
        this.showQP = function () {
            if (!playocx.IsFullScreen()) {
                playocx.FullScreen();
            }
        };

        this.usePTZ = function (hcCtrl,dhCtrl,ysCtrl,type){
            var ret = playocx.GetCameraInfoOnIndex(playocx.GetCurSel());//获取窗格设备信息 return  string   ip:192.168.1.1;port:8000;user:admin;code:admin;channel:1;vendor=300;
            if(ret.split("vendor=").length>1 && ret.split("vendor=")[1]==300){
                playocx.PTZControl(playocx.GetCurSel(),dhCtrl,4,type);
            }else if(ret.split("vendor=").length>1 && ret.split("vendor=")[1]==200){
                playocx.PTZControl(playocx.GetCurSel(),hcCtrl,4,type);
            }else if(ret.split("vendor=").length>1 && ret.split("vendor=")[1]==900){
                playocx.PTZControl(playocx.GetCurSel(),parseInt(ysCtrl),4,type);
            }
        };
        this.changeWin = function (winsum) {
            playocx.SetLiveLayout(winsum);
        }

        this.closeAllCamera = function (winsum) {
            for (var i = 0; i < winsum; i++) {
                playocx.VideoStopOnPane(i);
            }
            playocx.DeviceAllLogout();
        }

        this.closeCameraByWinIndex = function () {
            playocx.VideoStopOnPane(playocx.GetCurSel());
        }

        var vedioName = "";
        this.vedioBegin = function () {
            vedioName = Date.parse(new Date());
            playocx.VideoRecord(playocx.GetCurSel(), "D:\\" + vedioName + ".mp4");
        }

        this.vedioEnd = function () {
            playocx.VideoRecordStop(playocx.GetCurSel());
            alert("录制的视频路径为：D:\\" + vedioName + ".mp4");
        }

        this.batchCameraByWinIndex = function () {
            var name = Date.parse(new Date());
            playocx.SetCaptureMode(1);//截图模式  0--bitmap 1--jpeg
            playocx.CapturePictureOnIndex(playocx.GetCurSel(), "D:\\" + name + ".png");//依据索引截图
            alert("视频的截图路径路径为：D盘根目录");
        }

        //批量抓图
        this.batchAllCamera = function (winsum) {
            // var PICTYPE = 1;//bmp,0jpg
            // var WINCOUNT = 16;
            // var val = Monitor.OnAllCapture("",PICTYPE,0,WINCOUNT);
            var Camerainterval = setInterval(function () {
                var name = Date.parse(new Date());
                playocx.SetCaptureMode(1);//截图模式  0--bitmap 1--jpeg
                var winIndexInfo = playocx.GetCameraInfoOnIndex(playocx.GetCurSel());//ip:192.168.1.1;port:8000;user:admin;code:admin;channel:1;
                playocx.CapturePictureOnIndex(winsum, "D:\\" + name + ".png");//依据索引截图
                winsum--;
                if (winsum < 0) {
                    window.clearInterval(Camerainterval);
                }
            }, 1000);
            alert("视频的截图路径路径为：D盘根目录");
        }

        this.initSlider = function () {

            var light = 6, squar = 6, chroma = 6;

            $("#light").slider({
                min: 1,
                max: 10,
                value: 6,
                slide: function (event, ui) {
                    light = $(this).slider("value");
                    playocx.SetVideoEffect(light, squar, 6, chroma, 1 * 1);
                }
            })
            $("#squar").slider({
                min: 1,
                max: 10,
                value: 6,
                slide: function (event, ui) {
                    squar = $(this).slider("value");
                    playocx.SetVideoEffect(light, squar, 6, chroma, 1 * 1);
                }
            })
            $("#chroma").slider({
                min: 1,
                max: 10,
                value: 6,
                slide: function (event, ui) {
                    chroma = $(this).slider("value");
                    playocx.SetVideoEffect(light, squar, 6, chroma, 1 * 1);
                }
            })
        }
    })