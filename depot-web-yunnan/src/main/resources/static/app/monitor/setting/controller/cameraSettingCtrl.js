"use strict";

angular.module('app.cameraSetting')
    .controller("cameraSettingCtrl", function($scope,$rootScope,alertService, $state,cameraSettingService, APP_CONFIG) {

        //路径
        $scope.loadSetting = function () {
            cameraSettingService.loadSetting().then(function (data) {
                $scope.monitorSavepath = data;
            },function (data) {
                console.log(data);
            });
        }

        //图片保存路径
        $scope.saveCameraPath = function () {
            cameraSettingService.savePath(angular.toJson($scope.monitorSavepath)).then(function (data) {
                alertService.showSuccess();
            },function (data) {
                console.log(data);
            });
        }

        $scope.loadSetting();

        //获取报警短信发送人信息
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.alarm = {alarmRole : "", detectionType : 1};
        $scope.loadAlarmData = function() {
            cameraSettingService.getAlarmPhone($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.alarm, $rootScope.orgInfo.orgId)
                .then(function(data){
                    $scope.pageInfo = data;
                },function(data){
                    console.log();
                });
        }

        //删除报警短信发送人信息
        $scope.deleteAlarmPhone = function (alarmId) {
            cameraSettingService.deleteAlarmPhone(alarmId).then(function (data) {
                $scope.loadAlarmData();
            },function (data) {
                console.log(data);
            });
        }
        $scope.loadAlarmData();

    })
    .controller("cameraSettingSave", function($scope,$rootScope,$http, $state, $stateParams, cameraSettingService, APP_CONFIG) {
        //保存报警短信发送人信息
        $scope.saveAlarmPhone = function () {
            $scope.alarm.detectionType = 1;
            cameraSettingService.saveAlarmPhone(angular.toJson($scope.alarm)).then(function (data) {
                $state.go('app.cameraSetting.alarmList');
            },function (data) {
                console.log(data);
            });
        }

        //返回上一个链接页面
        $scope.returnUp = function(){
            $rootScope.back();
        }
    })