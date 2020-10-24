"use strict";

angular.module('app.intelligent')
    .controller("basicTemperaturAalarmCtrl", function($rootScope,$scope,alertService, $state,basicTemperaturAalarmService, APP_CONFIG) {


        //获取报警短信发送人信息
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.alarm = {alarmRole : "", detectionType : 2};
        $scope.loadAlarm = function() {
            basicTemperaturAalarmService.getAlarmPhoneNum($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.alarm, $rootScope.orgInfo.orgId).then(function(data){
                    $scope.pageInfo = data;
                },function(data){

                    console.log();
                });
        }
        // 清空搜索条件
        $scope.empty = function () {
            $scope.alarm.alarmRole = "";
            $scope.loadAlarm();
        };

        //删除报警短信发送人信息
        $scope.deleteAlarmPhoneNum = function (alarmId) {
            if (!confirm("确定要删除吗？")) {
                return;
            }
            basicTemperaturAalarmService.deleteAlarmPhoneDetil(alarmId).then(function (data) {
                if (data.status == 'success') {
                    alert("删除成功！");
                     $scope.loadAlarm();
                } else {
                    alert("删除失败"+data.message);
                }
            });
        }
        $scope.loadAlarm();
    })
    .controller("basicTemperaturAalarmSaveCtrl", function($scope,$rootScope,$http, $state, $stateParams, basicTemperaturAalarmService, APP_CONFIG) {

        // 防止重复提交标记
        $scope.saveFlag = false;
        $scope.isNotEdit = false;
        if ($scope.alarm == null) {
            $scope.alarm = {};
        }



        // 加载数据.
        $scope.loadDataById = function(id) {
            basicTemperaturAalarmService.loadDataById(id).then(function(data){
                $scope.alarm = data.data;
            },function(data){
            });
        };

        if ($stateParams.id != '0') { // 查看,修改
            $scope.isNotEdit = $stateParams.isNotEdit;
            $scope.isAdd = false;
            $scope.loadDataById($stateParams.id);
        } else {
            $scope.isAdd = true; // 新增
        }
        //保存报警短信发送人信息
        $scope.saveAlarmPhoneNum = function () {
            $scope.alarm.detectionType = 2;


            basicTemperaturAalarmService.saveAlarmPhoneNum(angular.toJson($scope.alarm)).then(function (data) {


                if (data.status == 'success') {
                    alert('保存成功!');
                    $scope.returnUp();
                } else {
                    alert("保存失败！");
                    $scope.saveFlag = false;
                }
            }, function (data) {
                console.log(data);
            });

        //


            //返回上一个链接页面
            $scope.returnUp = function () {
                if ($rootScope.previousState_name != '') {
                    $rootScope.back();
                } else {
                    $state.go("app.intelligent.basicData.basicTemperaturAalarmList");
            }
            }
        }


        //校验编码是否存在
        $scope.itExistCode = function(alarmMan,alarmPhone){
            if (typeof alarmMan != undefined && alarmMan != ''&& alarmMan != null){
                basicTemperaturAalarmService.itExistCode(alarmMan,alarmPhone).then(function (data) {
                    if (data.data == true ){
                        alert("接收人名称已存在！");
                        $scope.alarm.alarmMan = '';
                    }
                },function(data){
                });
            }
            if (typeof alarmPhone != undefined && alarmPhone != '' && alarmPhone != null){
                basicTemperaturAalarmService.itExistCode(alarmMan,alarmPhone).then(function (data) {
                    if (data.data == true){
                        alert("接受人电话已存在！");
                        $scope.alarm.alarmPhone = '';
                    }
                },function(data){
                });
            }
        };
    });

