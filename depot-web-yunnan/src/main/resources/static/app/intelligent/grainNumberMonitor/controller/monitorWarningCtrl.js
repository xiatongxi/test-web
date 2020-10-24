"use strict";
angular.module('app.intelligent').controller("monitorWarningCtrl", function($scope, $state, $rootScope,$stateParams,$uibModal,quantityDetectionService,monitorWarningService) {

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    // 筛选条件
    $scope.search = {};

    // 加载列表
    $scope.loadData = function() {
        monitorWarningService.getMonitorWarningPageInfo($scope.pageInfo, $scope.search).then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();

    // 数量全仓检测
    $scope.allNumberDetection = function(){
        if (!confirm("您确认发送全仓数量检测请求!")){
            return;
        }
        // 获取检测仓房编码和WS接口地址 vcfcode用于显示,vcf用于检测条件
        monitorWarningService.getMonitorWarningPageInfo({pageNum : null, pageSize : null}).then(function(data){
            var vCode = '';
            var vws = '';
            for(var obj in data.data.list){
                vCode += data.data.list[obj].vcf + ',';
                vws += data.data.list[obj].ws + ',';
            }
            // 发送全仓检测
            monitorWarningService.sendAllNumberDetection(vCode.substring(0,vCode.length - 1),vws.substring(0,vws.length - 1)).then(function (data) {
                alert(data.data);
            },function (data) {
                console.log(data);
            });
        },function(data){
            console.log(data);
        });
    };

    // 数量单仓检测 vcfcode用于显示,vcf用于检测条件
    $scope.onlyNumberDetection = function(vCode,vws,vcfcode){
        if (!confirm("您确认发送" + $rootScope.storeHouseCodeObj[vcfcode].storehouseName + "数量检测请求!")){
            return;
        }
        monitorWarningService.sendAllNumberDetection(vCode,vws).then(function (data) {
            alert(data.data);
        },function (data) {
            console.log(data);
        });
    };

    // 查看检测进度
    $scope.getDetectionProgress = function(vCode,vws){
        monitorWarningService.sendDetectionProgress(vCode,vws).then(function (data) {
            alert(data.data);
        },function (data) {
            console.log(data);
        });
    };

    // 获取检测结果
    $scope.getDetectionResult = function(vCode,vws,jccode){
        monitorWarningService.sendDetectionResult(vCode,vws,jccode).then(function (data) {
            if(data.data.indexOf("message_delayed") !== -1){
                alert('检测执行中,点击检测进度可查看进度!');
            } else {
                alert(data.data);
            }
            $scope.loadData();
        },function (data) {
            console.log(data);
        });
    };

    // 清空
    $scope.emptyTime = function() {
        $scope.search.vcfcode = '';
        $scope.loadData();
    };

    // 翻页
    $scope.goPage = function(pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

});