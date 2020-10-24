"use strict";
angular.module('app.intelligent').controller("airConditionControlCtrl", function ($scope, $state, $rootScope, $stateParams, $filter, ktinfoService, $uibModal,airConditionControlService) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {vcfcode: ''};

    // 加载列表
    $scope.loadData = function () {
        ktinfoService.getBasicGrainSetPageInfo($scope.pageInfo, $scope.search).then(function (data) {
            $scope.pageInfo = data.data;
        }, function (data) {
            console.log(data);
        });
    };
    $scope.loadData();

    // 关闭
    $scope.sendClose = function(vcfcode,vdevcode,ktinfo){
        if (!confirm("您确认发送指令!")){
            return;
        }
        ktinfo.vstatue = '0'; // 修改状态为关闭
        airConditionControlService.sendAirConditionDir(vcfcode,vdevcode,'close',ktinfo,$rootScope.userInfo.realName).then(function (data) {
            if (data.retCode == '200' && data.message == 'success'){
                var resultStr = data.data;
                var alertResult = $scope.ifGeneralReturn(resultStr);
                alert(alertResult);
                $scope.loadData();
            } else {
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
        ktinfo.vstatue = '1'; // 修改状态为开启
        airConditionControlService.sendAirConditionDir(vcfcode,vdevcode,'open',ktinfo,$rootScope.userInfo.realName).then(function (data) {
            if (data.retCode == '200' && data.message == 'success'){
                var resultStr = data.data;
                var alertResult = $scope.ifGeneralReturn(resultStr);
                alert(alertResult);
                $scope.loadData();
            } else {
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
        airConditionControlService.sendAirConditionDir(vcfcode,vdevcode,'stop',ktinfo,$rootScope.userInfo.realName).then(function (data) {
            if (data.retCode == '200' && data.message == 'success'){
                var resultStr = data.data;
                var alertResult = $scope.ifGeneralReturn(resultStr);
                alert(alertResult);
            } else {
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
    $scope.showDetails = function (ktinfo,typeSet) {
        // 初始参数
        var params = [];
        params.id = ktinfo.id; // 空调信息id
        params.orgId = ktinfo.orgId; // 库房id
        params.vdevcode = ktinfo.vdevcode; // 设备编码
        params.vdevname = ktinfo.vdevname; // 设备名称
        params.idevtdh = ktinfo.idevtdh; // 通道号
        params.sitecode = ktinfo.sitecode; // 站点编码
        params.vcfcode = ktinfo.vcfcode; // 仓房编码
        params.currenttemp = ktinfo.currenttemp; // 当前温度 设置空调温度
        params.currentmode = ktinfo.currentmode; // 当前模式 设置空调模式
        params.currentspeed = ktinfo.currentspeed; // 当前风速 设置空调风速
        params.intemp = ktinfo.intemp; // 室温
        params.valarmstatue = ktinfo.valarmstatue; // 设备状态 0:正常；1：异常
        params.vstatue = ktinfo.vstatue; // 操作状态 0关闭，1打开，2反正，3停止
        params.updatetime = $filter('date')(ktinfo.updatetime, "yyyy-MM-dd HH:mm:ss"); // 更新时间
        params.remark = ktinfo.remark; // 备注
        params.typeSet = typeSet; // 区分查看和设置
        $uibModal.open({
            size: 'lg',
            templateUrl: 'app/intelligent/coldStorage/views/airConditionControlDetails.html',
            controller: 'airConditionControlDetailsCtrl',
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
.controller("airConditionControlDetailsCtrl", function ($scope, $uibModalInstance,items,$rootScope,ktinfoService,airConditionControlService) {

    $scope.ktinfo = {};
    $scope.vdevcode = items.vdevcode; // 设备编码
    $scope.vdevname = items.vdevname; // 设备名称
    $scope.idevtdh = items.idevtdh; // 通道号
    $scope.sitecode = items.sitecode; // 站点编码
    $scope.storehouseName = $rootScope.storeHouseCodeObj[items.vcfcode].storehouseName; // 仓房编码
    $scope.currenttemp = items.currenttemp; // 当前温度 设置空调温度
    $scope.currentmode = items.currentmode; // 当前模式 设置空调模式
    $scope.currentspeed = items.currentspeed; // 当前风速 设置空调风速
    $scope.intemp = items.intemp; // 室温
    $scope.valarmstatue = items.valarmstatue; // 设备状态 0:正常；1：异常
    $scope.vstatue = items.vstatue; // 操作状态 0关闭，1打开，2反正，3停止
    $scope.updatetime = items.updatetime; // 更新时间
    $scope.remark = items.remark; // 备注
    if (items.typeSet != undefined) { // 区分查看和设置
        $scope.mustNotSet = false;
    } else {
        $scope.mustNotSet = true;
    }

    // 修改值触发
    $scope.resetData = function(){
        // 允许修改值
        $scope.ktinfo.currenttemp = $scope.currenttemp;
        $scope.ktinfo.currentmode = $scope.currentmode;
        $scope.ktinfo.currentspeed = $scope.currentspeed;

        // 不允许修改值,更新时间后台生成当前时间
        $scope.ktinfo.id = items.id;
        $scope.ktinfo.vcfcode = items.vcfcode;
        $scope.ktinfo.vdevcode = $scope.vdevcode;
        $scope.ktinfo.vdevname = $scope.vdevname;
        $scope.ktinfo.idevtdh = $scope.idevtdh;
        $scope.ktinfo.sitecode = $scope.sitecode;
        $scope.ktinfo.intemp = $scope.intemp;
        $scope.ktinfo.valarmstatue = $scope.valarmstatue;
        $scope.ktinfo.vstatue = $scope.vstatue;
        $scope.ktinfo.remark = $scope.remark;
    };

    // 发送指令
    $scope.sendCommand = function(vcfcode,vdevcode){
        // 通用信息
        var alertResult = '';
        // 设置当前温度
        airConditionControlService.sendAirConditionDir(vcfcode,vdevcode,'temp').then(function (data) {
            if (data.retCode == '200' && data.message == 'success'){
                var resultStr = data.data;
                alertResult = $scope.ifGeneralReturn(resultStr);
                // 设置当前风速
                airConditionControlService.sendAirConditionDir(vcfcode,vdevcode,'wind').then(function (data) {
                    if (data.retCode == '200' && data.message == 'success'){
                        var resultStr = data.data;
                        alertResult = $scope.ifGeneralReturn(resultStr);
                        // 设置当前模式
                        airConditionControlService.sendAirConditionDir(vcfcode,vdevcode,'mode').then(function (data) {
                            if (data.retCode == '200' && data.message == 'success'){
                                var resultStr = data.data;
                                alertResult = $scope.ifGeneralReturn(resultStr);
                                alert(alertResult);
                            } else {
                                if (data.retCode == '600' && data.message == '3232302D46696C'){
                                    alert("无法连接到设备!");
                                }else {
                                    alert("请求失败!");
                                }
                            }
                        }, function (data) {
                            console.log(data);
                        });
                    } else {
                        if (data.retCode == '600' && data.message == '3232302D46696C'){
                            alert("无法连接到设备!");
                        }else {
                            alert("请求失败!");
                        }
                    }
                }, function (data) {
                    console.log(data);
                });
            } else {
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

    // 先保存到本地在同步到设备方,最后发送指令设置: 温度,风速,模式参数.
    $scope.saveAndSet = function(){
        if(!angular.equals({},$scope.ktinfo)){
            // 更新基础数据空调设置并同步设备方信息
            ktinfoService.save($scope.ktinfo).then(function (data) {
                if (data.message == 'success' && data.retCode == '200') {
                    // 保存成功执行任务
                    $scope.sendCommand($scope.ktinfo.vcfcode,$scope.ktinfo.vdevcode);
                    $scope.cancel();
                } else {
                    // 保存失败执行任务
                    alert("设置失败！");
                }
            },function (data) {
                // 异常信息
                console.log(data);
            });
        } else {
            // 保存成功执行任务
            $scope.sendCommand(items.vcfcode,items.vdevcode);
        }
    };

    // 关闭模态窗口
    $scope.cancel = function() {
        $uibModalInstance.close();
    }

});