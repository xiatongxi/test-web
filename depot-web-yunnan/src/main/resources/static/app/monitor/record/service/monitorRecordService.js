"use strict";

angular.module('app.cameraRecord')
    .service("cameraRecordService", function($http,alertService, $q, APP_CONFIG, $rootScope) {
        var playRecordOcx;
        this.initOBJ = function () {
            var OBJ = "<OBJECT ID=\"playRecordOcx\" classid=\"CLSID:A9A5DEC8-62AB-4444-9024-874FF35D3FD1\">\n" +
                "<PARAM NAME=\"wmode\" VALUE=\"transparent\">" +
                "<PARAM NAME=\"_Version\" VALUE=\"65536\">\n" +
                "<PARAM NAME=\"_ExtentX\" VALUE=\"12806\">\n" +
                "<PARAM NAME=\"_ExtentY\" VALUE=\"1747\">\n" +
                "<PARAM NAME=\"_StockProps\" VALUE=\"0\">\n" +
                "</OBJECT>";

            var width = $("#cameraRecordThroughDIV").width();
            var height = document.documentElement.clientHeight*1;
            $("#cameraRecordThroughDIV").html($(OBJ));

            playRecordOcx = document.getElementById('playRecordOcx');//加载控件，给控件赋值用
            playRecordOcx.width=(width-5)+"px";
            playRecordOcx.height=(height-200)+"px";
            playRecordOcx.SetLiveLayout(1);
        }

        //绑定下拉菜单
        this.changeWin = function(winRecordSum){
            playRecordOcx.SetLiveLayout(winRecordSum);
        };

        var factoryData = "";
        //点击摄像头名字回放
        this.itemCheckedChanged = function(item,date,starttime,endtime){
            // var start =date+" "+starttime+":00";
            // var end =date+" "+endtime+":00";
            var startTimes = starttime.split(":");
            var endTimes = endtime.split(":");
            var dates = date?date.split("-"):null;
            if(dates.length<2 || startTimes.length<1 || endTimes.length<1){
                alert("请选择回放时间");
                return;
            }

            if(playRecordOcx == null && !item.isParent){
                alertService.showError("提示","控件未成功加载");
                return;
            }
            if(!item.isParent){
            	if(item.nvrFactory == 1){
            		item.nvrFactory = 200;
            	}
                if(item.nvrIp!=null&&item.nvrIp!=""){
                	for(var i=0;i<64;i++){
                        playRecordOcx.VideoPlaybackControl(i,0,0);//关闭回放
                    }
                    // playRecordOcx.Login(item.nvrIp,item.nvrName,item.nvrPassword,item.nvrPort,item.factory,"");
                    // playRecordOcx.PlayBackByTime(start,end,0,0xff,0xff,2);
                    // playRecordOcx.PlayBackByTime(start,end,item.channelNumber,0xff,0xff,2);
                     playRecordOcx.DeviceLogin_NOPOINT(item.nvrIp,item.nvrPort,item.nvrName,item.nvrPassword,item.nvrFactory); //登录设备 IP/端口号/账号/密码/海康设备200,大华300
                    if(item.nvrFactory == 900){//如果是宇视的需要执行特殊方法
                        factoryData = item.nvrFactory;
                        playRecordOcx.VideoPlaybackFindFileFirst(item.nvrIp,item.nvrPort,item.nvrName,item.nvrPassword,item.nvrFactory,item.channelNumber,0,0,
                            dates[0]*1,dates[1]*1,dates[2]*1,startTimes[0]*1,startTimes[1]*1,0,dates[0]*1,dates[1]*1,dates[2]*1,endTimes[0]*1,endTimes[1]*1,0);
                    }

                     playRecordOcx.VideoPlaybackStart(item.nvrIp,item.nvrPort,item.nvrName,item.nvrPassword,item.nvrFactory,item.channelNumber,playRecordOcx.GetCurSel(),
                        dates[0]*1,dates[1]*1,dates[2]*1,startTimes[0]*1,startTimes[1]*1,0,dates[0]*1,dates[1]*1,dates[2]*1,endTimes[0]*1,endTimes[1]*1,0)
                }else{
                    alertService.showError("提示",item.alias+"播放失败");
                }
            }
        };

        //停止回放
        this.stopAllRecord = function(winRecordSum){
            var stopType = 0;
            for(var i=0;i<winRecordSum;i++){
                playRecordOcx.VideoPlaybackControl(i,stopType,0);
            }
        };
        var nums = 9;
        this.VideoPlaybackControl = function (type) {
            //宇视摄像头修改
            if(factoryData == 900){
                if(type == 5){
                    nums++;
                    if(nums >= 14){
                        return;
                    }
                    playRecordOcx.VideoPlaybackControl(playRecordOcx.GetCurSel(),2,nums);
                }else if(type == 6){
                    nums--;
                    if(nums <= 6){
                        return;
                    }
                    playRecordOcx.VideoPlaybackControl(playRecordOcx.GetCurSel(),2,nums);
                }else{
                    playRecordOcx.VideoPlaybackControl(playRecordOcx.GetCurSel(),type,0);
                }
            }else{
                playRecordOcx.VideoPlaybackControl(playRecordOcx.GetCurSel(),type,0);
            }
        }

        //查询详细数据
        this.getAllCamera = function(){
        	var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method: 'GET',
                url: APP_CONFIG.monitorUrl + '/camera/getNVRVideo',
                params: {orgid:orgId}
            }).then(function successCallback(response) {
                // 请求成功执行代码
                d.resolve(response.data);
            }, function errorCallback(response) {
                // 请求失败执行代码
                d.reject("error");
            });
            return d.promise;
        };



})