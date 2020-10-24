"use strict";
angular.module('app.intelligent').controller("controlledAtmosphereCtrl", function ($scope, $state, $rootScope, $stateParams, basicGasSetService, $uibModal,controlledAtmosphereService) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {vcfcode: ''};

    // 加载列表
    $scope.loadData = function () {
        basicGasSetService.getBasicGrainSetPageInfo($scope.pageInfo, $scope.search).then(function(data){
    		$scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    	
    };
    $scope.loadData();

    // 关闭
    $scope.sendClose = function(vcfcode,vdevcode,ktinfo){
        if (!confirm("您确认发送指令!")){
            return;
        }
        $(".player-loader").show();
        controlledAtmosphereService.sendAirConditionDir(vcfcode,vdevcode,'close',ktinfo,$rootScope.userInfo.realName).then(function (data) {
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
    $scope.sendOpen = function(vcfcode,vdevcode,ktinfo){
        if (!confirm("您确认发送指令!")){
            return;
        }
        $(".player-loader").show();
        controlledAtmosphereService.sendAirConditionDir(vcfcode,vdevcode,'open',ktinfo,$rootScope.userInfo.realName).then(function (data) {
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
    // 反正
    $scope.sendReverse = function(vcfcode,vdevcode,ktinfo){
        if (!confirm("您确认发送指令!")){
            return;
        }
        $(".player-loader").show();
        controlledAtmosphereService.sendAirConditionDir(vcfcode,vdevcode,'reverse',ktinfo,$rootScope.userInfo.realName).then(function (data) {
            if (data.retCode == '200' && data.message == 'success'){
                $(".player-loader").hide();
                var resultStr = data.data;
                var alertResult = $scope.ifGeneralReturn(resultStr);
                alert(alertResult);
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
    // 停止
    $scope.sendStop = function(vcfcode,vdevcode,ktinfo){
        if (!confirm("您确认发送指令!")){
            return;
        }
        $(".player-loader").show();
        controlledAtmosphereService.sendAirConditionDir(vcfcode,vdevcode,'stop',ktinfo,$rootScope.userInfo.realName).then(function (data) {
            if (data.retCode == '200' && data.message == 'success'){
                $(".player-loader").hide();
                var resultStr = data.data;
                var alertResult = $scope.ifGeneralReturn(resultStr);
                alert(alertResult);
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
        params.vdevcode = ktinfo.vdevcode; // 设备编码
        params.vdevname = ktinfo.vdevname; // 设备名称
        params.idevtdh = ktinfo.idevtdh; // 通道号
        params.sitecode = ktinfo.sitecode; // 站点编码
        params.vcfcode = ktinfo.vcfcode; // 仓房编码
        params.valve1 = ktinfo.valve1; // 电磁阀1
        params.valve2 = ktinfo.valve2; // 电磁阀2
        params.valve3 = ktinfo.valve3; // 电磁阀3
        params.n2value1 = ktinfo.n2value1; // 氮气浓度1
        params.n2value2 = ktinfo.n2value2; // 氮气浓度2
        params.n2value3 = ktinfo.n2value3; // 氮气浓度3
        params.n2value4 = ktinfo.n2value4; // 氮气浓度4
        params.n2value5 = ktinfo.n2value5; // 氮气浓度5
        params.valarmstatue = ktinfo.valarmstatue; // 设备状态 0:正常；1：异常
        params.vstatue = ktinfo.vstatue; // 操作状态 0关闭，1打开，2反正，3停止
        params.updatetime = ktinfo.updatetime; // 更新时间
        params.remark = ktinfo.remark; // 备注
        $uibModal.open({
            size: 'lg',
            templateUrl: 'app/intelligent/controlledAtmosphere/views/controlledAtmosphereDetail.html',
            controller: 'controlledAtmosphereDetailsCtrl',
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
.controller("controlledAtmosphereDetailsCtrl", function ($scope, $uibModalInstance,items,$rootScope) {

    $scope.vdevcode = items.vdevcode; // 设备编码
    $scope.vdevname = items.vdevname; // 设备名称
    $scope.idevtdh = items.idevtdh; // 通道号
    $scope.sitecode = items.sitecode; // 站点编码
    $scope.storehouseName = $rootScope.storeHouseCodeObj[items.vcfcode].storehouseName; // 仓房编码
    $scope.valve1 = items.valve1; // 电磁阀1
    $scope.valve2 = items.valve2; // 电磁阀2
    $scope.valve3 = items.valve3; // 电磁阀3
    $scope.n2value1 = items.n2value1; // 氮气浓度1
    $scope.n2value2 = items.n2value2; // 氮气浓度2
    $scope.n2value3 = items.n2value3; // 氮气浓度3
    $scope.n2value4 = items.n2value4; // 氮气浓度4
    $scope.n2value5 = items.n2value5; // 氮气浓度5
    $scope.valarmstatue = items.valarmstatue; // 设备状态 0:正常；1：异常
    $scope.vstatue = items.vstatue; // 操作状态 0关闭，1打开，2反正，3停止
    $scope.updatetime = items.updatetime; // 更新时间
    $scope.remark = items.remark; // 备注

    // 关闭模态窗口
    $scope.cancel = function() {
        $uibModalInstance.close();
    }

}).controller("controlledAtmosphereHistoryCtrl", function ($scope, $state, $rootScope, $stateParams, $uibModal,controlledAtmosphereService) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {};

    // 加载列表
    $scope.loadData = function () {
        controlledAtmosphereService.getJobHistoryPageInfo($scope.pageInfo, $scope.search,$rootScope.orgInfo.orgId).then(function (data) {
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