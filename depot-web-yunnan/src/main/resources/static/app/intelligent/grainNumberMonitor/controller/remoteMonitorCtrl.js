"use strict";

angular.module('app.intelligent').controller("remoteMonitorCtrl", function($scope,$timeout, $interval, definitionTVService,$rootScope) {
        // 初始化ocx控件--控件加载放最后，防止控件加载失败导致下面代码无法执行
        $scope.init = function () {
            $timeout(function(){
                definitionTVService.initOBJ();
            },500)
        };
        //初始化亮度、对比度、色度的ui
        $scope.initSlider = function () {
            definitionTVService.initSlider();
        };

        $scope.winsum = '4';//绑定下拉菜单
        $scope.changeWin = function () {
            definitionTVService.changeWin($scope.winsum);
        };

        $scope.usePTZ = function(hcCtrl,dhCtrl,ysCtrl,type){
            definitionTVService.usePTZ(hcCtrl,dhCtrl,ysCtrl,type);
        };

        $scope.cameralist;
        $scope.getAllCamera = function(){
            definitionTVService.getAllCamera().then(function (data){
                $scope.cameralist = data;
                // 构建树形数据
                $scope.generateTree();
            });
        };
        // 获取下级角色(摄像头列表)
        $scope.generateTree = function() {
            $scope.cameraTree = [
                {
                    id : "",
                    vCfCode : "仓房",
                    children : []
                }
            ];
            angular.forEach($scope.cameralist, function(item, index) {
                item.isExpend = false;
                item.vCfCode = $rootScope.storeHouseCodeObj[item.vCfCode].storehouseName;
                $scope.cameraTree[0].children.push(item);
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
            $scope.itemCheckedChanged(item);
        };

        //点击摄像头名字播放摄像头
        $scope.itemCheckedChanged = function(item){
            // if(item.nvrIp!=null&&item.nvrIp!="")
            if(item.vVedioIp!=null&&item.vVedioIp!="")
                definitionTVService.play(item);
        };

        // 全屏画面播放
        $scope.showQP = function () {
            definitionTVService.showQP();
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
                roundCamera.VideoPlay_NOPOINT(v[i].vVedioIp,v[i].iVedioPort,v[i].vVedioUser,v[i].vVedioPwd,v[i].vJcpp,v[i].vVedioTdh ,zm ,winIndex);
            }
        };

        //终止轮训
        $scope.stopRoundRound = function(){
            $interval.cancel(Videointerval);
            $scope.closeAllCamera();//关闭全部窗口
        };

        //关闭全部摄像头
        $scope.closeAllCamera = function () {
            definitionTVService.closeAllCamera($scope.winsum);
        };

        //根据窗口关闭摄像头
        $scope.closeCameraByWinIndex = function () {
            definitionTVService.closeCameraByWinIndex();
        };

        //根据窗口抓图
        $scope.batchCameraByWinIndex = function () {
            definitionTVService.batchCameraByWinIndex();
        };

        $scope.batchAllCamera = function () {
            definitionTVService.batchAllCamera($scope.winsum);
        };

        //录像开始
        $scope.vedioBegin = function () {
            definitionTVService.vedioBegin();
        };
        //录像结束
        $scope.vedioEnd = function () {
            definitionTVService.vedioEnd();
        };

        $scope.$on("$destroy", function() {
            $interval.cancel(Videointerval);
        });

        $scope.init();
        $scope.getAllCamera();
    });