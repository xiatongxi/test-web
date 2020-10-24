"use strict";
angular.module('app.intelligent').controller("nitrogenChargingCtrl", function ($scope, $state, $rootScope, $stateParams, basicNitrogenSetService, $uibModal,nitrogenChargingService) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {vcfcode: ''};

    // 加载列表
    $scope.loadData = function () {
        basicNitrogenSetService.getBasicGrainSetPageInfo($scope.pageInfo, $scope.search).then(function(data){
    		$scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    	
    };
    $scope.loadData();

    // 关闭
    $scope.sendClose = function(ktinfo){
        if (!confirm("您确认发送指令!")){
            return;
        }
        $(".player-loader").show();
        nitrogenChargingService.sendAirConditionDir('close',ktinfo,$rootScope.userInfo.realName).then(function (data) {
            if (data.retCode == '200' && data.message == 'success'){
                ktinfo.vstatue = '0'; // 修改状态为关闭
                $(".player-loader").hide();
                var resultStr = data.data;
                var alertResult = $scope.ifGeneralReturn(resultStr);
                alert(alertResult);
                $scope.loadData();
            } else {
                $(".player-loader").hide();
                if (data.retCode == '600' && data.message == '3232302D46696C'){
                    alert("无法连接到设备!");
                }else {
                    alert("请求失败!");
                }
            }
        }, function (data) {
            console.log(data);
        });
    };
    // 打开
    $scope.sendOpen = function(ktinfo){
        if (!confirm("您确认发送指令!")){
            return;
        }
        $(".player-loader").show();
        nitrogenChargingService.sendAirConditionDir('open',ktinfo,$rootScope.userInfo.realName).then(function (data) {
            if (data.retCode == '200' && data.message == 'success'){
                ktinfo.vstatue = '1'; // 修改状态为开启
                $(".player-loader").hide();
                var resultStr = data.data;
                var alertResult = $scope.ifGeneralReturn(resultStr);
                alert(alertResult);
                $scope.loadData();
            } else {
                $(".player-loader").hide();
                if (data.retCode == '600' && data.message == '3232302D46696C'){
                    alert("无法连接到设备!");
                }else {
                    alert("请求失败!");
                }
            }
        }, function (data) {
            console.log(data);
        });
    };

    // 通用返回值
    $scope.ifGeneralReturn = function(resultStr){
        var alertResult = '';
        for (var key in resultStr) {
            if (key == 'error') {
                alertResult=resultStr[key];
                return alertResult;
            } else if (key == 'type') {
                alertResult=resultStr[key];
                return alertResult;
            } else if (key == 'S_EM') {
                alertResult=resultStr[key];
                return alertResult;
            }
            return alertResult = resultStr[key]+'!';
        }
    };

    // 详情
    $scope.showDetails = function (ktinfo) {
        // 初始参数
        var params = [];
        params.id = ktinfo.id; // 空调信息id
        params.orgId = ktinfo.orgId; // 库房id
        params.vdevcode = ktinfo.vdevcode; // 氮气房编码
        params.nitrogenhouse = ktinfo.nitrogenhouse; // 氮气房名称
        params.sitecode = ktinfo.sitecode; // 站点编码
        params.purity = ktinfo.purity; // 纯度
        params.temperature = ktinfo.temperature; // 温度
        params.pressure = ktinfo.pressure; // 压力
        params.flow = ktinfo.flow; // 流量
        params.signal = ktinfo.signal; // 制氮机信号
        params.airsignal = ktinfo.airsignal; // 空压机信号
        params.valarmstatue = ktinfo.valarmstatue; // 设备状态 0:正常；1：异常
        params.vstatue = ktinfo.vstatue; // 操作状态 0关闭，1打开，2反正，3停止
        params.updatetime = ktinfo.updatetime; // 更新时间
        params.remark = ktinfo.remark; // 备注
        $uibModal.open({
            size: 'lg',
            templateUrl: 'app/intelligent/controlledAtmosphere/views/nitrogenChargingDetail.html',
            controller: 'nitrogenChargingDetailsCtrl',
            resolve: {
                // 传入参数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params;
                }
            }
        });
    };

    // 清空搜索条件
    $scope.empty = function () {
        $scope.search.vcfcode = '';
        $scope.loadData();
    };

    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

})
.controller("nitrogenChargingDetailsCtrl", function ($scope, $uibModalInstance,items,$rootScope) {

    $scope.vdevcode = items.vdevcode; // 氮气房编码
    $scope.nitrogenhouse = items.nitrogenhouse; // 氮气房名称
    $scope.sitecode = items.sitecode; // 站点编码
    $scope.purity = items.purity; // 纯度
    $scope.temperature = items.temperature; // 温度
    $scope.pressure = items.pressure; // 压力
    $scope.flow = items.flow; // 流量
    $scope.signal = items.signal; // 制氮机信号
    $scope.airsignal = items.airsignal; // 空压机信号
    $scope.valarmstatue = items.valarmstatue; // 设备状态 0:正常；1：异常
    $scope.vstatue = items.vstatue; // 操作状态 0关闭，1打开，2反正，3停止
    $scope.updatetime = items.updatetime; // 更新时间
    $scope.remark = items.remark; // 备注

    // 关闭模态窗口
    $scope.cancel = function() {
        $uibModalInstance.close();
    }

}).controller("nitrogenChargingHistoryCtrl", function ($scope, $state, $rootScope, $stateParams, $uibModal,nitrogenChargingService) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {};

    // 加载列表
    $scope.loadData = function () {
        nitrogenChargingService.getJobHistoryPageInfo($scope.pageInfo, $scope.search,$rootScope.orgInfo.orgId).then(function (data) {
            $scope.pageInfo = data.data;
        }, function (data) {
            console.log(data);
        });
    };
    $scope.loadData();

    // 清空搜索条件
    $scope.empty = function () {
        $scope.search.vcfcode = '';
        $scope.loadData();
    };

    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

});