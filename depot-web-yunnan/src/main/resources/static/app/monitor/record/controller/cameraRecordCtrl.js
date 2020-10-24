"use strict";

angular.module('app.cameraRecord')
    .controller("cameraRecordCtrl", function($scope,$interval,$timeout, $http,alertService, $state,cameraRecordService, APP_CONFIG) {

        $scope.record = {date:"",starttime:"",endtime:""};
        //初始化ocx控件--控件加载放最后，防止控件加载失败导致下面代码无法执行
        $scope.initOCX = function () {
            $scope.record.starttime = "10:00:00";
            $scope.record.endtime = "12:00:00";

        	$timeout(function(){
        		cameraRecordService.initOBJ();
            },500);
        }

        $scope.winRecordSum = '1';
        $scope.ChangeWin = function () {
            cameraRecordService.changeWin($scope.winRecordSum);
        }

        $scope.cameraRecordlist;
        $scope.getAllCamera = function(){
            cameraRecordService.getAllCamera().then(function (data){
                $scope.cameraRecordlist = data;
                // 构建树形数据
                $scope.generateTree();
            });
        };

        /*$scope.cameralist;
        $scope.getAllCamera = function(){
            cameraRecordService.getAllCamera().then(function (data){
                $scope.cameraRecordlist = data;
                // 构建树形数据
                $scope.generateTree();
            });
        };*/

        // 获取下级数据
        $scope.generateTree = function() {
            $scope.cameraRecordTree = [
                {
                    isParent : true,
                    cameraId : "",
                    alias : "仓内",
                    children : []
                }
            ];
            $scope.cameraRecordTree1 = [
            	{
            		isParent : true,
            		cameraId : "",
            		alias : "仓外",
            		children : []
            	}
            ];
            angular.forEach($scope.cameraRecordlist, function(item, index) {
                item.isExpend = true;
                if (item.live == 1) {
                    $scope.cameraRecordTree[0].children.push(item);
                } else {
                    $scope.cameraRecordTree1[0].children.push(item);
                }
            })
        }

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

        //点击摄像头名字回放
        $scope.itemCheckedChanged = function(item){
            if(!$scope.record || !$scope.record.date || !$scope.record.starttime || !$scope.record.endtime){
                alert("请选择回放时间");
                return;
            }
            cameraRecordService.itemCheckedChanged(item,$scope.record.date,$scope.record.starttime,$scope.record.endtime);
        };

        //回放全部停止
        $scope.stopAllRecord = function () {
            cameraRecordService.stopAllRecord($scope.winRecordSum);
        }
        
        $scope.VideoPlaybackControl = function (type) {
            cameraRecordService.VideoPlaybackControl(type);
        }

        //DownRecordByTime($scope.startTime,$scope.endTime,filename,type);//按时间下载，
        //GetJinDuValue("DownBackVideoFile");//获取下载进度

        $scope.getAllCamera();

        $scope.initOCX();

        //按时间下载DownRecordByTime(starttime,endtime,filename,type);
        //获取下载进度GetJinDuValue("DownBackVideoFile");
    })
    .controller("cameraAgentRecordCtrl", function($scope,$interval,$timeout, $http,alertService, $state,cameraRecordService, cameraPlayService) {

        $scope.record = {date:"",starttime:"",endtime:""};
        //初始化ocx控件--控件加载放最后，防止控件加载失败导致下面代码无法执行
        $scope.initOCX = function () {
            $scope.record.starttime = "10:00:00";
            $scope.record.endtime = "12:00:00";

            $timeout(function(){
                cameraRecordService.initOBJ();
            },500);
        }

        $scope.winRecordSum = '1';
        $scope.ChangeWin = function () {
            cameraRecordService.changeWin($scope.winRecordSum);
        }

        $scope.cameraRecordlist;
        $scope.getAllCamera = function(){
            cameraPlayService.getAgentVideo().then(function (data){
                $scope.cameraRecordlist = data;
                // 构建树形数据
                $scope.generateTree();
            });
        };

        // 获取下级数据
        $scope.generateTree = function() {
            $scope.cameraRecordTree = new Array();
            angular.forEach($scope.cameraRecordlist, function(depotData,index) {
                var cameraSon = {
                    isParent : true,
                    alias : "",
                    children : []
                };

                $scope.cameraRecordTree.push(cameraSon);
                $scope.cameraRecordTree[index].alias = depotData[0].agentDepotName;
                angular.forEach(depotData, function(cameraData) {
                    cameraData.isExpend = false;
                    $scope.cameraRecordTree[index].children.push(cameraData);
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
            $scope.itemCheckedChanged(item);
        };

        //点击摄像头名字回放
        $scope.itemCheckedChanged = function(item){
            if(!$scope.record || !$scope.record.date || !$scope.record.starttime || !$scope.record.endtime){
                alert("请选择回放时间");
                return;
            }
            cameraRecordService.itemCheckedChanged(item,$scope.record.date,$scope.record.starttime,$scope.record.endtime);
        };

        //回放全部停止
        $scope.stopAllRecord = function () {
            cameraRecordService.stopAllRecord($scope.winRecordSum);
        }

        $scope.VideoPlaybackControl = function (type) {
            cameraRecordService.VideoPlaybackControl(type);
        }

        $scope.getAllCamera();

        $scope.initOCX();
    });