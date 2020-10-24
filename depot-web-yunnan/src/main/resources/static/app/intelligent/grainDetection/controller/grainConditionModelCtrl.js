"use strict";
angular.module('app.intelligent').controller("grainConditionModelCtrl", function($scope, $uibModalInstance,$uibModal,items,temperatureRecordService,$rootScope) {

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    // 筛选条件
    $scope.search = {};
    // 赋值
    $scope.search.vCfCode = items.vCfCode;

    // 加载列表
    $scope.loadData = function() {
        temperatureRecordService.getTemperatureRecordPageInfo($scope.pageInfo, $scope.search, '0').then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();

    // 详情
    $scope.grainDetectionDetail = function () {
        var params = [];
        params.vCfCode = items.vCfCode; // 仓房编码
        params.time = items.time; // 检测时间
        params.intemp = items.intemp; // 仓内温
        params.inh = items.inh; // 仓内湿
        params.outtemp = items.outtemp; // 仓外温
        params.outh = items.outh; // 仓外湿
        params.max = items.max; // 最高粮温
        params.min = items.min; // 最低粮温
        params.avg = items.avg; // 平均粮温
        params.id = items.id;
        $uibModal.open({
            size:'lg',
            templateUrl: 'app/intelligent/grainDetection/views/humitureDetection-model.html',
            controller: 'humitureDetectionModel',
            resolve: {
                // 传入参数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params;
                }
            }
        });
    };

    // 发送粮温检测请求
    $scope.nowGrainTemperatureDetection = function(){
        if (!confirm("您确认发送粮温检测请求!")){
            return;
        }
        temperatureRecordService.nowGrainTemperatureDetection(items.vCfCode).then(function(data){
            if (data.retCode == '200' && data.message == 'success'){
                var resultStr = data.data;
                var alertResult = '';
                for (var key in resultStr) {
                    if (key == 'error') {
                        alertResult=resultStr[key];
                        alert(alertResult);
                        return;
                    }
                    alertResult+=$rootScope.storeHouseCodeObj[key].storehouseName+':'+resultStr[key]+'; ';
                }
                alert(alertResult);
            } else {
                if (data.retCode == '600' && data.message == '3232302D46696C'){
                    alert("无法连接到设备!");
                }else {
                    alert("请求失败!");
                }
            }
        },function(data){
            console.log(data);
        });
    };

    // 清空搜索时间
    $scope.emptyTime = function() {
        $scope.search.time = '';
        $scope.loadData();
    };

    // 关闭模态窗口
    $scope.cancel = function() {
        $uibModalInstance.close();
    }

});