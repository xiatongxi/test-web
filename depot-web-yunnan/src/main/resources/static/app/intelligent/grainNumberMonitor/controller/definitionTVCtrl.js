"use strict";

angular.module('app.intelligent')
    /*.controller("cameraCtrl", function($scope, $rootScope, $http, $state,cameraService, nvrService, enumService, FileUploader, APP_CONFIG) {
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
    })*/
    /*.controller("cameraSaveCtrl", function($scope, $http, $state, $stateParams, $uibModal, $rootScope, cameraService,orgService, enumService, APP_CONFIG) {

        // 用于存放新增的硬盘录像机数据
        $scope.addedDetail = [];
        /!**
         * 查询组织列表
         *!/
        $scope.getOrgList = function() {
            orgService.getPageInfo(null,null,null,null).then(function(data){
                $scope.orgList = data.list;
            },function(data){
                console.log(data);
            });
        };
        $scope.getOrgList();


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
    })*/
    .controller("definitionTVCtrl", function($scope,$timeout, $interval, definitionTVService,$rootScope) {
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