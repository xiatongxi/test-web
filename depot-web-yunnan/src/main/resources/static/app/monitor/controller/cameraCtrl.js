"use strict";

angular.module('app.camera')
    .controller("cameraCtrl", function($scope, $rootScope, $http, $state,cameraService, nvrService, enumService, FileUploader, APP_CONFIG) {
        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.loadData = function() {
            enumService.enumData().then(function(data){
                $scope.parentObj = data.parentMap;
                $scope.enumObj = data.enumMap;

                cameraService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.car)
                .then(function(data){
                    $scope.pageInfo = data;
                },function(data){
                    console.log();
                });
            },function(data){
                console.log(data);
            });
        };
        $scope.loadData();

        // 重置
        $scope.getResetting = function() {
            $scope.car.name = "";
            $scope.loadData();
        };

        // 查看或者修改摄像头信息
        $scope.showEdit = function(id,type) {
            $state.go('app.basic.cameraEdit',{id:id,type:type});
        };

        // 新增摄像头信息
        $scope.addCameraEdit = function() {
            nvrService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,undefined).then(function(data){
                if(data.size>0){
                    $state.go('app.basic.cameraAdd');
                }else{
                    alert("请先添加硬盘录像机信息！");
                }
            },function(data){
                console.log(data);
            });
        };

        // 根据id删除信息
        $scope.remove = function(id) {
            cameraService.removeById(id).then(function (data) {
                if(data.status == "success"){
                    alert("删除成功");
                    $scope.loadData();
                }else{
                    alert("删除失败");
                }
            });
        };
        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        };

        // 文件上传实例
        $scope.uploader = new FileUploader({
            url : APP_CONFIG.monitorUrl + '/camera/importFile',
            autoUpload : true, // 将文件添加到队列后自动上传
            formData : [{fileType:'xlsx',orgId:$rootScope.orgInfo.orgId}], // 与文件一起发送的数据
            removeAfterUpload : true, // 从队列上传后删除文件
            // 上传进度
            onProgressItem : function(fileItem, progress) {
                // $scope.jd = progress + "%";
                console.info("正在上传：" + progress + "%");
            },
            // 回调函数，在一个文件上传成功后触发
            onSuccessItem : function(fileItem, response, status, headers) {
                if(fileItem.isSuccess && response == ''){
                	alert("导入成功！");
                } else {
                	alert(response);
                }
                $scope.loadData();
            }
        });
    })
    .controller("cameraSaveCtrl", function($scope, $http, $state, $stateParams, $uibModal, $rootScope, cameraService,orgService, enumService, APP_CONFIG) {

        // 用于存放新增的硬盘录像机数据
        $scope.addedDetail = [];
        /**
         * 查询组织列表
         */
        $scope.getOrgList = function() {
            orgService.getPageInfo(null,null,null,null).then(function(data){
                $scope.orgList = data.list;
            },function(data){
                console.log(data);
            });
        };
        $scope.getOrgList();

        $scope.changeEvent = function(){
        	if($scope.cameraEdit.live == 1){//仓内
        		$("#storehouseId").attr("disabled",false);
        	}else{
        		$scope.cameraEdit.storehouseId = "";
        		$("#storehouseId").attr("disabled",true);
        	}
        }

        $scope.loadDataById = function(id) {
            enumService.enumData().then(function(data){
                $scope.parentObj = data.parentMap;
                $scope.enumObj = data.enumMap;

                cameraService.getCameraDite(id).then(function(data){
                    $scope.cameraEdit = data.cameraEdit;//摄像头数据
                    $scope.addedDetail[0] = data.nvrEdit;//nvr数据
                    $scope.cameraEdit.orgId = $scope.cameraEdit.orgId*1;
                    $("#camera-form input").attr("disabled",disabled);
                    $("#camera-form select").attr("disabled",disabled);
                    if($scope.cameraEdit.live == 1){//仓内
                		$scope.cameraEdit.storehouseId = parseInt($scope.cameraEdit.storehouseId);
                	}else{
                		$("#storehouseId").attr("disabled",true);
                	}
                },function(data){
                    console.log();
                });
            },function(data){
                console.log(data);
            });
        };
        $scope.loadData = function(){
            enumService.enumData().then(function(data){
                $scope.parentObj = data.parentMap;
                $scope.enumObj = data.enumMap;
            },function(data){
                console.log(data);
            });
        };

        if($stateParams.id != null){//新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
            $scope.loadDataById($stateParams.id);
        }else{
            $scope.isShow = "1";
            $scope.loadData();
        }

        var disabled = true;
        if($stateParams.type == "edit"){
            disabled = false;
            $scope.isShow = "1";
        }

        $scope.getEmptying = function () {
            $scope.cameraEdit = {};
            $state.go('app.camera.list');
        };

        // 新增或修改保存数据
        var validator = $("#camera-form").validate();
        $scope.saveData = function() {
            if (validator.form()) {
            	if($scope.addedDetail.length == 0){
                    alert("请添加硬盘录像机数据！");
                    return;
                }
            	$scope.cameraEdit.orgId = $rootScope.userInfo.orgId;
                var dates = angular.toJson($scope.cameraEdit);
                var nvrId = $scope.addedDetail[0].id;
                cameraService.saveAndUpdata(dates,nvrId).then(function (data) {
                    if (data.status == "success") {
                        alert("保存成功");
                        $state.go('app.camera.list');
                    } else {
                        alert("保存失败");
                    }
                });
            }
        };

        // NVR信息添加
        $scope.addRow = function() {
            if($scope.addedDetail.length != 0){
                alert("只能添加一条硬盘录像机数据！");
                return;
            }
            var params = [];
            var uibModalInstance = $uibModal.open({
                size:'lg',
                templateUrl: 'app/monitor/views/nvr-list-modal.html',
                controller: 'nvrListModalCtrl',
                resolve: {
                    // items是一个回调函数
                    items: function () {
                        // 这个值会被模态框的控制器获取到
                        return params;
                    }
                }
            });
            uibModalInstance.result.then(function (result) {
                if (result != null) {
                    $scope.addedDetail.push(result);
                }
                // 关闭模态框时刷新页面数据
            }, function (reason) {
                console.log(reason);
            });
        };

        // NVR信息删除一行
        $scope.deleteRow = function(detail) {
            var index = $scope.addedDetail.indexOf(detail);
            if (index != -1) {
                $scope.addedDetail.splice(index, 1);
            }
        };

        $scope.retList = function(){
            $rootScope.back();
        }
    })
    //ocx插件使用的js
    .controller("cameraPlayCtrl", function($scope, $rootScope, $timeout, $interval, cameraPlayService, cameraSettingService) {
        $scope.addressName = $rootScope.orgInfo.orgName;
        // 初始化ocx控件--控件加载放最后，防止控件加载失败导致下面代码无法执行
        $scope.init = function () {
            cameraSettingService.loadSetting().then(function (data) {
                $timeout(function(){
                    cameraPlayService.initOBJ(data.imgpath,data.recordpath);
                },500)
            },function (data) {
                console.log(data);
            });
        };
        //初始化亮度、对比度、色度的ui
        $scope.initSlider = function () {
            cameraPlayService.initSlider();
        };

        $scope.winsum = '4';//绑定下拉菜单
        $scope.changeWin = function () {
            cameraPlayService.changeWin($scope.winsum);
        };

        // $scope.usePTZ = function (id,type) {
        //     cameraPlayService.usePTZ(id,type);
        // }

        $scope.usePTZ = function(hcCtrl,dhCtrl,ysCtrl,type){
            cameraPlayService.usePTZ(hcCtrl,dhCtrl,ysCtrl,type);
        };

        $scope.cameralist;
        $scope.getAllCamera = function(){
            cameraPlayService.getAllCamera().then(function (data){
                $scope.cameralist = data;
                // 构建树形数据
                $scope.generateTree();
            });
        };
        // 获取下级角色
        $scope.generateTree = function() {
            // $scope.cameraTree = [
            //     {
            //         cameraId : "",
            //         alias : "仓内",
            //         children : []
            //     },
            //     {
            //         cameraId : "",
            //         alias : "仓外",
            //         children : []
            //     }
            // ];
            // angular.forEach($scope.cameralist, function(item) {
            //     item.isExpend = false;
            //     if (item.live == 1) {
            //         angular.forEach(hasFuncList, function(funItem) {
            //             // if (funItem.funcId == 213) {
            //                 $scope.cameraTree[0].children.push(item);
            //             // }
            //         })
            //     } else {
            //         angular.forEach(hasFuncList, function(funItem) {
            //             // if (funItem.funcId == 213) {
            //                 $scope.cameraTree[1].children.push(item);
            //             // }
            //         })
            //     }
            // });
            // if($scope.cameraTree[0].children.length == 0){
            //     $scope.cameraTree.splice(0,1);
            // }else if($scope.cameraTree[1].children.length == 0){
            //     $scope.cameraTree.splice(1,1);
            // }
            $scope.cameraTree = [
                {
                    cameraId : "",
                    alias : "仓内",
                    children : []
                }
            ];
            $scope.cameraTree1 = [
            	{
            		cameraId : "",
            		alias : "仓外",
            		children : []
            	}
            ];
            angular.forEach($scope.cameralist, function(item) {
                item.isExpend = false;
                if (item.live == 1) {
                    $scope.cameraTree[0].children.push(item);
                } else {
                    $scope.cameraTree1[0].children.push(item);
                }
            })
        };

        // 点击树节点事件
        $scope.itemClicked = function (item) {
            item.isChecked = true;
            // 取消前一个选中角色的选中状态，实现单选效果
            if ($scope.prevCamera && $scope.prevCamera!=item) {
                $scope.prevCamera.isChecked = false;
            }
            $scope.prevCamera = item;
            //判断窗口是否全部在播放
            if(cameraPlayService.isNotPlay($scope.winsum)){
                $scope.closeCameraByWinIndex();
            }
            $scope.itemCheckedChanged(item);
        };

        //点击摄像头名字播放摄像头
        $scope.itemCheckedChanged = function(item){
            if(item.nvrIp!=null&&item.nvrIp!="")
                cameraPlayService.play(item);
        };
        
        
        $scope.showQP = function () {
            cameraPlayService.showQP();
        };
        

        //轮巡事件
        var roundNumber,roundRoundDate;//初始轮训数目
        var Videointerval,index;// 一次播放窗口数目(定值) index 下组播放的设备区间
        var roundCamera;//控件用到
        $scope.getRoundRound = function(){
            roundCamera = document.getElementById('playOcx');//加载控件，给控件赋值用
            index = roundNumber = $scope.winsum;
            roundRoundDate = $scope.cameralist;
            $scope.closeAllCamera();//关闭圈闭窗口

            this.startRound($scope.cameralist);
        };

        $scope.startRound = function(value){
            //启动定时器
            Videointerval=$interval(function(){$scope.roundCameraStart(roundRoundDate.length)},10000);
            if(value.length>index){ //如果轮巡设备大于一次轮巡数目
                $scope.RoundCameraInit(0,roundNumber);//先播放一次轮巡数目
            }else{
                $scope.RoundCameraInit(0,value.length);
            }
        };

        //固定间隔执行
        $scope.roundCameraStart = function(leng){
            $scope.closeAllCamera();//关闭全部窗口
            if(leng>index){//如果还有没有播放的轮巡设备
                if(leng>index+roundNumber){//如果剩余没有播放的设备够一次轮巡  4,8 8 16
                    $scope.RoundCameraInit(index,index+roundNumber);
                }else{
                    $scope.RoundCameraInit(index,leng);
                }
                index=index+roundNumber;
            }else{
                $interval.cancel(Videointerval);
                $scope.startRound(roundRoundDate);
            }
        };

        //播放设备区间
        $scope.RoundCameraInit = function(a,b){
            var v=roundRoundDate;
            var tdh = 0;//通道号
            var zm = "";//字幕
            var winIndex = -1;//窗口索引
            for(var i=a;i<b;i++){
                roundCamera.VideoPlay_NOPOINT(v[i].nvrIp,v[i].nvrPort,v[i].nvrName,v[i].nvrPassword,v[i].nvrFactory,v[i].channelNumber ,zm ,winIndex);
            }
        };

        //终止轮训
        $scope.stopRoundRound = function(){
            $interval.cancel(Videointerval);
            $scope.closeAllCamera();//关闭全部窗口
        };

        //关闭全部摄像头
        $scope.closeAllCamera = function () {
            cameraPlayService.closeAllCamera($scope.winsum);
        };

        //根据窗口关闭摄像头
        $scope.closeCameraByWinIndex = function () {
            cameraPlayService.closeCameraByWinIndex();
        };

        //根据窗口抓图
        $scope.batchCameraByWinIndex = function () {
            cameraPlayService.batchCameraByWinIndex();
        };

        $scope.batchAllCamera = function () {
            cameraPlayService.batchAllCamera($scope.winsum);
        };

        var numberS = 0;
        //录像开始
        $scope.vedioBegin = function () {
            if(numberS >= 1){
                alert("已经点击过录像开始，请不要重复点击！");
                return;
            }else{
                alert("录像开始，请尽量不要进行任何操作，如果到达预定的录像结束时间请点击录像结束按钮！");
            }
        	cameraPlayService.vedioBegin();
            numberS++;
        };
        //录像结束
        $scope.vedioEnd = function () {
            if(numberS == 0){
                alert("请点击录像开始按钮！");
                return;
            }
        	cameraPlayService.vedioEnd();
            numberS = 0;
        };

        //照明开始
        $scope.lightingBegin = function () {
            cameraPlayService.lightingBegin();
        };
        //照明结束
        $scope.lightingEnd = function () {
            cameraPlayService.lightingEnd();
        };

        $scope.$on("$destroy", function() {
            $interval.cancel(Videointerval);
            cameraPlayService.stoprefresh();
        });

        $scope.init();
        $scope.getAllCamera();
    })
    /*.controller("cameraPlayCtrl", function($scope, $rootScope, $timeout, $interval, cameraPlayService, cameraSettingService) {//使用海康api的js
        $scope.addressName = $rootScope.orgInfo.orgName;
        var cIndexCode;//监控点编号，用于选中窗口时，赋值当前窗口的监控点编号
        var width = $("#throughDIV").width();
        var height = document.documentElement.clientHeight*1-235;
        $("#throughDIV").css("height",height).css("margin-bottom","13px");

        var imgpath='D:\\SnapDir',recordpath='D:\\VideoDir';//图片路径，录像路径
        var oWebControl;
        //声明公用变量
        var initCount = 0;
        var pubKey = '';
        //创建播放实例
        $scope.initPlugin = function () {
            cameraSettingService.loadSetting().then(function (data) {
            	if(data.imgpath != null){
            		if(data.imgpath.substr(data.imgpath.length-1,1) == "\\"){
            			imgpath = data.imgpath;
            			recordpath = data.recordpath;
            		}else{
            			imgpath = data.imgpath+"/";
            			recordpath = data.recordpath+"/";
            		}
            	}

            	oWebControl = new WebControl({
                    szPluginContainer: "throughDIV",                       // 指定容器id
            		iServicePortStart: 15900,                           // 指定起止端口号，建议使用该值
            		iServicePortEnd: 15909,
            		szClassId:"23BF3B0A-2C56-4D97-9C03-0CB103AA8F11",   // 用于IE10使用ActiveX的clsid
            		cbConnectSuccess: function () {                     // 创建WebControl实例成功
            			oWebControl.JS_StartService("window", {         // WebControl实例创建成功后需要启动服务
            				dllPath: "./VideoPluginConnect.dll"         // 值"./VideoPluginConnect.dll"写死
            			}).then(function () {                           // 启动插件服务成功
            				oWebControl.JS_SetWindowControlCallback({   // 设置消息回调
            					cbIntegrationCallBack: $scope.cbIntegrationCallBack
            				});
            				oWebControl.JS_CreateWnd("throughDIV", width, height).then(function () { //JS_CreateWnd创建视频播放窗口，宽高可设定
            					$scope.init();  // 创建播放实例成功后初始化
            				});
            			}, function () { // 启动插件服务失败
            			});
            		},
            		cbConnectError: function () { // 创建WebControl实例失败
            			oWebControl = null;
            			$("#throughDIV").html("插件未启动，正在尝试启动，请稍候...");
            			WebControl.JS_WakeUp("VideoWebPlugin://"); // 程序未启动时执行error函数，采用wakeup来启动程序
            			initCount ++;
            			if (initCount < 3) {
            				setTimeout(function () {
            					$scope.initPlugin();
            				}, 3000)
            			} else {
            				$("#throughDIV").html("插件启动失败，请检查插件是否安装！");
            			}
            		},
            		cbConnectClose: function (bNormalClose) {
            			// 异常断开：bNormalClose = false
            			// JS_Disconnect正常断开：bNormalClose = true
            			console.log("cbConnectClose");
            			oWebControl = null;
            		}
            	});
            	$rootScope.webCtrl = oWebControl;
            },function (data) {
                console.log(data);
            });
        };

        //初始化
        $scope.init = function(){
        	$scope.getPubKey(function () {
        		////////////////////////////////// 请自行修改以下变量值	////////////////////////////////////
                var appkey = "26469219";                           		//综合安防管理平台提供的appkey，必填
                var secret = $scope.setEncrypt("w4GKdMLvVTxDLUgtzV2L"); //综合安防管理平台提供的secret，必填
                var ip = "106.3.145.75";                           		//综合安防管理平台IP地址，必填
                var playMode = 0;                                  		//初始播放模式：0-预览，1-回放
                var port = 443;                                    		//综合安防管理平台端口，若启用HTTPS协议，默认443
                var snapDir = imgpath;                       			//抓图存储路径
                var videoDir = recordpath;                     			//紧急录像或录像剪辑存储路径
                var layout = "2x2";                                		//playMode指定模式的布局
                var enableHTTPS = 1;                               		//是否启用HTTPS协议与综合安防管理平台交互，是为1，否为0
                var encryptedFields = 'secret';					   		//加密字段，默认加密领域为secret
        		var showToolbar = 1;                               		//是否显示工具栏，0-不显示，非0-显示
        		var showSmart = 1;                                 		//是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
        		var buttonIDs = "0,16,256,257,258,259,260,512,513,514,515,516,517,768,769";  //自定义工具条按钮
        		////////////////////////////////// 请自行修改以上变量值	////////////////////////////////////
                oWebControl.JS_RequestInterface({
                    funcName: "init",
                    argument: JSON.stringify({
                        appkey: appkey,                            //API网关提供的appkey
                        secret: secret,                            //API网关提供的secret
                        ip: ip,                                    //API网关IP地址
                        playMode: playMode,                        //播放模式（决定显示预览还是回放界面）
                        port: port,                                //端口
                        snapDir: snapDir,                          //抓图存储路径
                        videoDir: videoDir,                        //紧急录像或录像剪辑存储路径
                        layout: layout,                            //布局
                        enableHTTPS: enableHTTPS,                  //是否启用HTTPS协议
                        encryptedFields: encryptedFields,          //加密字段
        				showToolbar: showToolbar,                  //是否显示工具栏
        				showSmart: showSmart,                      //是否显示智能信息
        				buttonIDs: buttonIDs                       //自定义工具条按钮
                    })
                }).then(function (oData) {
        			oWebControl.JS_Resize(width, height);  // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
                });
            });
        }
        //获取公钥
        $scope.getPubKey = function(callback) {
            oWebControl.JS_RequestInterface({
                funcName: "getRSAPubKey",
                argument: JSON.stringify({
                    keyLength: 1024
                })
            }).then(function (oData) {
                if (oData.responseMsg.data) {
                    pubKey = oData.responseMsg.data;
                    callback();
                }
            })
        }
        //RSA加密
        $scope.setEncrypt = function(value) {
            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(pubKey);
            return encrypt.encrypt(value);
        }
        // 监听resize事件，使插件窗口尺寸跟随DIV窗口变化
        $("#throughDIV").resize(function () {
            if (oWebControl != null) {
            	//当div窗口大小改变时，重新获取长宽数值,并且给插件div重新赋值高度
            	width = $("#throughDIV").width();
                height = document.documentElement.clientHeight*1-235;
                $("#throughDIV").css("height",height);
                oWebControl.JS_Resize(width, height);
                $scope.setWndCover();
            }
        });
        // 监听滚动条scroll事件，使插件窗口跟随浏览器滚动而移动
        $(window).scroll(function () {
            if (oWebControl != null) {
                oWebControl.JS_Resize(width, height);
                $scope.setWndCover();
            }
        });
        // 设置窗口裁剪，当因滚动条滚动导致窗口需要被遮住的情况下需要JS_CuttingPartWindow部分窗口
        $scope.setWndCover = function() {
            var iWidth = $(window).width();
            var iHeight = $(window).height();
            var oDivRect = $("#throughDIV").get(0).getBoundingClientRect();

            var iCoverLeft = (oDivRect.left < 0) ? Math.abs(oDivRect.left): 0;
            var iCoverTop = (oDivRect.top < 0) ? Math.abs(oDivRect.top): 0;
            var iCoverRight = (oDivRect.right - iWidth > 0) ? Math.round(oDivRect.right - iWidth) : 0;
            var iCoverBottom = (oDivRect.bottom - iHeight > 0) ? Math.round(oDivRect.bottom - iHeight) : 0;

            iCoverLeft = (iCoverLeft > width) ? width : iCoverLeft;
            iCoverTop = (iCoverTop > height) ? height : iCoverTop;
            iCoverRight = (iCoverRight > width) ? width : iCoverRight;
            iCoverBottom = (iCoverBottom > height) ? height : iCoverBottom;

        	oWebControl.JS_RepairPartWindow(0, 0, width+1, height);    // 多1个像素点防止还原后边界缺失一个像素条
            if (iCoverLeft != 0) {
        		oWebControl.JS_CuttingPartWindow(0, 0, iCoverLeft, height);
            }
            if (iCoverTop != 0) {
                oWebControl.JS_CuttingPartWindow(0, 0, width+1, iCoverTop);    // 多剪掉一个像素条，防止出现剪掉一部分窗口后出现一个像素条
            }
            if (iCoverRight != 0) {
                oWebControl.JS_CuttingPartWindow(width - iCoverRight, 0, iCoverRight, height);
            }
            if (iCoverBottom != 0) {
                oWebControl.JS_CuttingPartWindow(0, height - iCoverBottom, width, iCoverBottom);
            }
        }
        //设置窗口控制回调
        $scope.setCallbacks = function() {
            oWebControl.JS_SetWindowControlCallback({
                cbIntegrationCallBack: $scope.cbIntegrationCallBack
            });
        }
        // 推送消息
        $scope.cbIntegrationCallBack = function(oData) {
        	var data = oData.responseMsg.msg;
        	var map = JSON.parse(data);
        	cIndexCode = map.cameraIndexCode;
        }
        //视频预览功能
        $scope.preview = function(cameraIndexCode) {
            var cameraIndexCode  = "53230100581314000082";     		//获取输入的监控点编号值，必填
            var streamMode = 0;                                     //主子码流标识：0-主码流，1-子码流
            var transMode = 1;                                      //传输协议：0-UDP，1-TCP
            var gpuMode = 0;                                        //是否启用GPU硬解，0-不启用，1-启用

            cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "");
            cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, "");

            oWebControl.JS_RequestInterface({
                funcName: "startPreview",
                argument: JSON.stringify({
                    cameraIndexCode:cameraIndexCode,                //监控点编号
                    streamMode: streamMode,                         //主子码流标识
                    transMode: transMode,                           //传输协议
                    gpuMode: gpuMode,                               //是否开启GPU硬解
                    wndId:-1                                     	//可指定播放窗口
                })
            })
        };
        //标签关闭
        $(window).unload(function () {
            if (oWebControl != null){
        		oWebControl.JS_HideWnd();   // 先让窗口隐藏，规避可能的插件窗口滞后于浏览器消失问题
                oWebControl.JS_Disconnect().then(function(){  // 断开与插件服务连接成功
        		},
        		function() {  // 断开与插件服务连接失败
        		});
            }
        });

        $scope.cameralist;
        $scope.getAllCamera = function(){
            cameraPlayService.getAllCamera().then(function (data){
                $scope.cameralist = data;
                // 构建树形数据
                $scope.generateTree();
            });
        };
        // 获取下级角色
        $scope.generateTree = function() {
            $scope.cameraTree = [
                {
                    cameraId : "",
                    alias : "仓内",
                    children : []
                },
                {
                    cameraId : "",
                    alias : "仓外",
                    children : []
                }
            ];
            angular.forEach($scope.cameralist, function(item, index) {
                item.isExpend = false;
                if (item.live == 1) {
                    $scope.cameraTree[0].children.push(item);
                } else {
                    $scope.cameraTree[1].children.push(item);
                }
            })
        };
        // 点击树节点事件
        $scope.itemClicked = function (item) {
            item.isChecked = true;
            // 取消前一个选中角色的选中状态，实现单选效果
            if ($scope.prevCamera && $scope.prevCamera!=item) {
                $scope.prevCamera.isChecked = false;
            }
            $scope.prevCamera = item;
            $scope.preview();
        };

        //轮巡事件
        var roundNumber,roundRoundDate;//初始轮训数目
        var Videointerval,index;// 一次播放窗口数目(定值) index 下组播放的设备区间
        $scope.getRoundRound = function(){
        	//停止所有预览窗口的预览
        	oWebControl.JS_RequestInterface({
                funcName: "stopAllPreview"
            });
        	//获取当前布局
        	oWebControl.JS_RequestInterface({
                funcName: "getLayout"
            }).then(function (oData) {
            	var data = oData ? oData.responseMsg : '';
            	var map = JSON.parse(data.data);
            	index = roundNumber = map.wndNum;//窗口数量
            	roundRoundDate = $scope.cameralist;
            	$scope.startRound($scope.cameralist);
            });
        };
        $scope.startRound = function(value){
            if(value.length>index){ //如果轮巡设备大于一次轮巡数目
                $scope.RoundCameraInit(0,roundNumber);//先播放一次轮巡数目
                //启动定时器
                Videointerval=$interval(function(){$scope.roundCameraStart(value.length)},10000);
            }else{
                $scope.RoundCameraInit(0,value.length);
            }
        };
        //固定间隔执行
        $scope.roundCameraStart = function(leng){
        	oWebControl.JS_RequestInterface({
                funcName: "stopAllPreview"
            });//关闭全部窗口
            if(leng>index){//如果还有没有播放的轮巡设备
                if(leng>index+roundNumber){//如果剩余没有播放的设备够一次轮巡  4,8 8 16
                    $scope.RoundCameraInit(index,index+roundNumber);
                }else{
                    $scope.RoundCameraInit(index,leng);
                }
                index=index+roundNumber;
            }else{
                $interval.cancel(Videointerval);
            }
        };
        //播放设备区间
        $scope.RoundCameraInit = function(a,b){
            var v=roundRoundDate;
            for(var i=0;i<b-a;i++){
            	$scope.previewRound("53230100581314000082",(i+1));
            }
        };

        //终止轮训
        $scope.stopRoundRound = function(){
        	$interval.cancel(Videointerval);
        	oWebControl.JS_RequestInterface({
                funcName: "stopAllPreview"
            });
        };
        //视频轮训预览功能
        $scope.previewRound = function(cameraIndexCode,wndId) {
            var streamMode = 0;                                     //主子码流标识：0-主码流，1-子码流
            var transMode = 1;                                      //传输协议：0-UDP，1-TCP
            var gpuMode = 0;                                        //是否启用GPU硬解，0-不启用，1-启用

            cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "");
            cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, "");

            oWebControl.JS_RequestInterface({
                funcName: "startPreview",
                argument: JSON.stringify({
                    cameraIndexCode:cameraIndexCode,                //监控点编号
                    streamMode: streamMode,                         //主子码流标识
                    transMode: transMode,                           //传输协议
                    gpuMode: gpuMode,                               //是否开启GPU硬解
                    wndId:wndId                                     //可指定播放窗口
                })
            })
        };
        //云台控制
        $scope.usePTZ = function(hcCtrl,dhCtrl,type){
			cameraPlayService.hkControl(hcCtrl,type,cIndexCode);
		};
        $scope.initPlugin();
        $scope.getAllCamera();
    })*/
    .controller("cameraAgentPlayCtrl", function($scope, $rootScope, $timeout, $interval, cameraPlayService, cameraSettingService) {
        $scope.addressName = $rootScope.orgInfo.orgName;
        var cIndexCode;//监控点编号，用于选中窗口时，赋值当前窗口的监控点编号
        var width = $("#throughDIV").width();
        var height = document.documentElement.clientHeight*1-235;
        $("#throughDIV").css("height",height).css("margin-bottom","13px");

        var imgpath='D:\\SnapDir',recordpath='D:\\VideoDir';//图片路径，录像路径
        var oWebControl;
        //声明公用变量
        var initCount = 0;
        var pubKey = '';
        //创建播放实例
        $scope.initPlugin = function () {
            cameraSettingService.loadSetting().then(function (data) {
                if(data.imgpath != null){
                    if(data.imgpath.substr(data.imgpath.length-1,1) == "\\"){
                        imgpath = data.imgpath;
                        recordpath = data.recordpath;
                    }else{
                        imgpath = data.imgpath+"/";
                        recordpath = data.recordpath+"/";
                    }
                }

                oWebControl = new WebControl({
                    szPluginContainer: "throughDIV",                       // 指定容器id
                    iServicePortStart: 15900,                           // 指定起止端口号，建议使用该值
                    iServicePortEnd: 15909,
                    szClassId:"23BF3B0A-2C56-4D97-9C03-0CB103AA8F11",   // 用于IE10使用ActiveX的clsid
                    cbConnectSuccess: function () {                     // 创建WebControl实例成功
                        oWebControl.JS_StartService("window", {         // WebControl实例创建成功后需要启动服务
                            dllPath: "./VideoPluginConnect.dll"         // 值"./VideoPluginConnect.dll"写死
                        }).then(function () {                           // 启动插件服务成功
                            oWebControl.JS_SetWindowControlCallback({   // 设置消息回调
                                cbIntegrationCallBack: $scope.cbIntegrationCallBack
                            });
                            oWebControl.JS_CreateWnd("throughDIV", width, height).then(function () { //JS_CreateWnd创建视频播放窗口，宽高可设定
                                $scope.init();  // 创建播放实例成功后初始化
                            });
                        }, function () { // 启动插件服务失败
                        });
                    },
                    cbConnectError: function () { // 创建WebControl实例失败
                        oWebControl = null;
                        $("#throughDIV").html("插件未启动，正在尝试启动，请稍候...");
                        WebControl.JS_WakeUp("VideoWebPlugin://"); // 程序未启动时执行error函数，采用wakeup来启动程序
                        initCount ++;
                        if (initCount < 3) {
                            setTimeout(function () {
                                $scope.initPlugin();
                            }, 3000)
                        } else {
                            $("#throughDIV").html("插件启动失败，请检查插件是否安装！");
                        }
                    },
                    cbConnectClose: function (bNormalClose) {
                        // 异常断开：bNormalClose = false
                        // JS_Disconnect正常断开：bNormalClose = true
                        console.log("cbConnectClose");
                        oWebControl = null;
                    }
                });
                $rootScope.webCtrl = oWebControl;
            },function (data) {
                console.log(data);
            });
        };

        //初始化
        $scope.init = function(){
            $scope.getPubKey(function () {
                ////////////////////////////////// 请自行修改以下变量值	////////////////////////////////////
                var appkey = "24421703";                           		//综合安防管理平台提供的appkey，必填
                var secret = $scope.setEncrypt("kwqBBk5io9oo970ueCQm"); //综合安防管理平台提供的secret，必填
                var ip = "172.16.3.55";                           		//综合安防管理平台IP地址，必填
                var playMode = 0;                                  		//初始播放模式：0-预览，1-回放
                var port = 443;                                    		//综合安防管理平台端口，若启用HTTPS协议，默认443
                var snapDir = imgpath;                       			//抓图存储路径
                var videoDir = recordpath;                     			//紧急录像或录像剪辑存储路径
                var layout = "2x2";                                		//playMode指定模式的布局
                var enableHTTPS = 1;                               		//是否启用HTTPS协议与综合安防管理平台交互，是为1，否为0
                var encryptedFields = 'secret';					   		//加密字段，默认加密领域为secret
                var showToolbar = 1;                               		//是否显示工具栏，0-不显示，非0-显示
                var showSmart = 1;                                 		//是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
                var buttonIDs = "0,16,256,257,258,259,260,512,513,514,515,516,517,768,769";  //自定义工具条按钮
                ////////////////////////////////// 请自行修改以上变量值	////////////////////////////////////
                oWebControl.JS_RequestInterface({
                    funcName: "init",
                    argument: JSON.stringify({
                        appkey: appkey,                            //API网关提供的appkey
                        secret: secret,                            //API网关提供的secret
                        ip: ip,                                    //API网关IP地址
                        playMode: playMode,                        //播放模式（决定显示预览还是回放界面）
                        port: port,                                //端口
                        snapDir: snapDir,                          //抓图存储路径
                        videoDir: videoDir,                        //紧急录像或录像剪辑存储路径
                        layout: layout,                            //布局
                        enableHTTPS: enableHTTPS,                  //是否启用HTTPS协议
                        encryptedFields: encryptedFields,          //加密字段
                        showToolbar: showToolbar,                  //是否显示工具栏
                        showSmart: showSmart,                      //是否显示智能信息
                        buttonIDs: buttonIDs                       //自定义工具条按钮
                    })
                }).then(function (oData) {
                    oWebControl.JS_Resize(width, height);  // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
                });
            });
            $scope.setCallbacks();
        }
        //获取公钥
        $scope.getPubKey = function(callback) {
            oWebControl.JS_RequestInterface({
                funcName: "getRSAPubKey",
                argument: JSON.stringify({
                    keyLength: 1024
                })
            }).then(function (oData) {
                if (oData.responseMsg.data) {
                    pubKey = oData.responseMsg.data;
                    callback();
                }
            })
        }
        //RSA加密
        $scope.setEncrypt = function(value) {
            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(pubKey);
            return encrypt.encrypt(value);
        }
        // 监听resize事件，使插件窗口尺寸跟随DIV窗口变化
        $("#throughDIV").resize(function () {
            if (oWebControl != null) {
                //当div窗口大小改变时，重新获取长宽数值,并且给插件div重新赋值高度
                width = $("#throughDIV").width();
                height = document.documentElement.clientHeight*1-235;
                $("#throughDIV").css("height",height);
                oWebControl.JS_Resize(width, height);
                $scope.setWndCover();
            }
        });
        // 监听滚动条scroll事件，使插件窗口跟随浏览器滚动而移动
        $(window).scroll(function () {
            if (oWebControl != null) {
                oWebControl.JS_Resize(width, height);
                $scope.setWndCover();
            }
        });
        // 设置窗口裁剪，当因滚动条滚动导致窗口需要被遮住的情况下需要JS_CuttingPartWindow部分窗口
        $scope.setWndCover = function() {
            var iWidth = $(window).width();
            var iHeight = $(window).height();
            var oDivRect = $("#throughDIV").get(0).getBoundingClientRect();

            var iCoverLeft = (oDivRect.left < 0) ? Math.abs(oDivRect.left): 0;
            var iCoverTop = (oDivRect.top < 0) ? Math.abs(oDivRect.top): 0;
            var iCoverRight = (oDivRect.right - iWidth > 0) ? Math.round(oDivRect.right - iWidth) : 0;
            var iCoverBottom = (oDivRect.bottom - iHeight > 0) ? Math.round(oDivRect.bottom - iHeight) : 0;

            iCoverLeft = (iCoverLeft > width) ? width : iCoverLeft;
            iCoverTop = (iCoverTop > height) ? height : iCoverTop;
            iCoverRight = (iCoverRight > width) ? width : iCoverRight;
            iCoverBottom = (iCoverBottom > height) ? height : iCoverBottom;

            oWebControl.JS_RepairPartWindow(0, 0, width+1, height);    // 多1个像素点防止还原后边界缺失一个像素条
            if (iCoverLeft != 0) {
                oWebControl.JS_CuttingPartWindow(0, 0, iCoverLeft, height);
            }
            if (iCoverTop != 0) {
                oWebControl.JS_CuttingPartWindow(0, 0, width+1, iCoverTop);    // 多剪掉一个像素条，防止出现剪掉一部分窗口后出现一个像素条
            }
            if (iCoverRight != 0) {
                oWebControl.JS_CuttingPartWindow(width - iCoverRight, 0, iCoverRight, height);
            }
            if (iCoverBottom != 0) {
                oWebControl.JS_CuttingPartWindow(0, height - iCoverBottom, width, iCoverBottom);
            }
        }
        //设置窗口控制回调
        $scope.setCallbacks = function() {
            oWebControl.JS_SetWindowControlCallback({
                cbIntegrationCallBack: $scope.cbIntegrationCallBack
            });
        }
        // 推送消息
        $scope.cbIntegrationCallBack = function(oData) {
            var data = oData.responseMsg.msg;
            var map = JSON.parse(data);
            cIndexCode = map.cameraIndexCode;
        }
        //视频预览功能
        $scope.preview = function(cameraIndexCode) {
            var cameraIndexCode  = cameraIndexCode;     		//获取输入的监控点编号值，必填
            var streamMode = 0;                                     //主子码流标识：0-主码流，1-子码流
            var transMode = 1;                                      //传输协议：0-UDP，1-TCP
            var gpuMode = 0;                                        //是否启用GPU硬解，0-不启用，1-启用

            cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "");
            cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, "");

            oWebControl.JS_RequestInterface({
                funcName: "startPreview",
                argument: JSON.stringify({
                    cameraIndexCode:cameraIndexCode,                //监控点编号
                    streamMode: streamMode,                         //主子码流标识
                    transMode: transMode,                           //传输协议
                    gpuMode: gpuMode,                               //是否开启GPU硬解
                    wndId:-1                                     	//可指定播放窗口
                })
            })
        };
        //标签关闭
        $(window).unload(function () {
            if (oWebControl != null){
                oWebControl.JS_HideWnd();   // 先让窗口隐藏，规避可能的插件窗口滞后于浏览器消失问题
                oWebControl.JS_Disconnect().then(function(){  // 断开与插件服务连接成功
                    },
                    function() {  // 断开与插件服务连接失败
                    });
            }
        });

        $scope.cameralist;
        $scope.getAllCamera = function(){
            cameraPlayService.getAgentVideo().then(function (data){
                $scope.cameralist = data;
                // 构建树形数据
                $scope.generateTree();
            });
        };
        // 获取下级角色
        $scope.generateTree = function() {
            $scope.cameraTree = new Array();
            angular.forEach($scope.cameralist, function(depotData,index) {
                var cameraSon = {
                    alias : "",
                    children : []
                };

                $scope.cameraTree.push(cameraSon);
                $scope.cameraTree[index].alias = depotData[0].agentDepotName;
                angular.forEach(depotData, function(cameraData) {
                    cameraData.isExpend = false;
                    $scope.cameraTree[index].children.push(cameraData);
                });
            });
        };
        // 点击树节点事件
        $scope.itemClicked = function (item) {
            item.isChecked = true;
            // 取消前一个选中角色的选中状态，实现单选效果
            if ($scope.prevCamera && $scope.prevCamera!=item) {
                $scope.prevCamera.isChecked = false;
            }
            $scope.prevCamera = item;
            $scope.preview(item.cameraIndexCode);
        };

        //轮巡事件
        var roundNumber,roundRoundDate;//初始轮训数目
        var Videointerval,index;// 一次播放窗口数目(定值) index 下组播放的设备区间
        $scope.getRoundRound = function(){
            //停止所有预览窗口的预览
            oWebControl.JS_RequestInterface({
                funcName: "stopAllPreview"
            });
            //获取当前布局
            oWebControl.JS_RequestInterface({
                funcName: "getLayout"
            }).then(function (oData) {
                var data = oData ? oData.responseMsg : '';
                var map = JSON.parse(data.data);
                index = roundNumber = map.wndNum;//窗口数量
                roundRoundDate = $scope.cameralist;
                $scope.startRound($scope.cameralist);
            });
        };
        $scope.startRound = function(value){
            for (let i = 0; i < value.length; i++) {
                roundRoundDate = value[i];
                //每个库都循环一遍播放
                if (value[i].length > index) { //如果轮巡设备大于一次轮巡数目
                    $scope.RoundCameraInit(0, roundNumber);//先播放一次轮巡数目
                    //启动定时器
                    Videointerval = $interval(function () {
                        $scope.roundCameraStart(value[i].length)
                    }, 10000);
                } else {
                    $scope.RoundCameraInit(0, value[i].length);
                }
            }
        };
        //固定间隔执行
        $scope.roundCameraStart = function(leng){
            oWebControl.JS_RequestInterface({
                funcName: "stopAllPreview"
            });//关闭全部窗口
            if(leng>index){//如果还有没有播放的轮巡设备
                if(leng>index+roundNumber){//如果剩余没有播放的设备够一次轮巡  4,8 8 16
                    $scope.RoundCameraInit(index,index+roundNumber);
                }else{
                    $scope.RoundCameraInit(index,leng);
                }
                index=index+roundNumber;
            }else{
                $interval.cancel(Videointerval);
            }
        };
        //播放设备区间
        $scope.RoundCameraInit = function(a,b){
            var v=roundRoundDate;
            for(var i=0;i<b-a;i++){
                $scope.previewRound(roundRoundDate.cameraIndexCode,(i+1));
            }
        };

        //终止轮训
        $scope.stopRoundRound = function(){
            $interval.cancel(Videointerval);
            oWebControl.JS_RequestInterface({
                funcName: "stopAllPreview"
            });
        };
        //视频轮训预览功能
        $scope.previewRound = function(cameraIndexCode,wndId) {
            var streamMode = 0;                                     //主子码流标识：0-主码流，1-子码流
            var transMode = 1;                                      //传输协议：0-UDP，1-TCP
            var gpuMode = 0;                                        //是否启用GPU硬解，0-不启用，1-启用

            cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "");
            cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, "");

            oWebControl.JS_RequestInterface({
                funcName: "startPreview",
                argument: JSON.stringify({
                    cameraIndexCode:cameraIndexCode,                //监控点编号
                    streamMode: streamMode,                         //主子码流标识
                    transMode: transMode,                           //传输协议
                    gpuMode: gpuMode,                               //是否开启GPU硬解
                    wndId:wndId                                     //可指定播放窗口
                })
            })
        };
        //云台控制
        $scope.usePTZ = function(hcCtrl,dhCtrl,type){
            cameraPlayService.hkControl(hcCtrl,type,cIndexCode);
        };
        $scope.initPlugin();
        $scope.getAllCamera();
    });