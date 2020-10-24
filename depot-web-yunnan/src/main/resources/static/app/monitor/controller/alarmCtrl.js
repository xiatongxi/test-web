"use strict";

angular.module('app.alarm')
    .controller("alarmCtrl", function($scope, $http, $state,$stateParams,alarmService, APP_CONFIG) {
        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.queryCriteria = null;
        if($stateParams.queryCriteria == "currentMonth"){
        	$scope.queryCriteria = "currentMonth";
        }
        $scope.loadData = function() {
            alarmService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.car, $scope.queryCriteria)
            .then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log();
            });
        };
        $scope.loadData();
        // 详细信息
        $scope.showDetails = function() {
            $state.go('app.camera.edit');
        };

        $scope.getPicture = function (picture) {
            $scope.picture = picture;
            $("#pictureModal").modal("show");
        };
    })

    .controller("alarmTypeCtrl", function($scope, $http, $state,alarmService, APP_CONFIG) {
        // 获取报警设置信息
        $scope.loadData = function() {
            alarmService.getAlarmType().then(function(data){
                if(data.length > 0){
                    $scope.alarmType = data;

                    $scope.alarmType[0].smsalarm = $scope.alarmType[0].smsalarm == '1' ? true : false;
                    $scope.alarmType[0].systemalarm = $scope.alarmType[0].systemalarm == '1' ? true : false;
                    $scope.alarmType[1].smsalarm = $scope.alarmType[1].smsalarm == '1' ? true : false;
                    $scope.alarmType[1].systemalarm = $scope.alarmType[1].systemalarm == '1' ? true : false;
                }else{
                    //如果没有此库的数据则新添加
                    $scope.alarmType = [{alarmType: 1, alarmGrade: 1, smsalarm: 0, systemalarm: 0},{alarmType: 2, alarmGrade: 1, smsalarm: 0, systemalarm: 0}];
                    alarmService.saveAlarmType(angular.toJson($scope.alarmType)).then(function(data){
                        $scope.loadData();
                    });
                }
            })
        };
        $scope.loadData();

        $scope.saveAlarmData = function () {
            alarmService.updateAlarmType(angular.toJson($scope.alarmType)).then(function(data){
                if(data.status == "success"){
                    alert("保存成功");
                }else{
                    alert("保存失败");
                }
            })
        }
    });