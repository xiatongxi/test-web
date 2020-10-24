"use strict";
angular.module('app.intelligent').controller("basicThresholdSetModalCtrl", function ($scope, $state, $rootScope, $stateParams, $uibModal,$uibModalInstance,$filter,items) {

    // 只读
    $scope.isNotEdit = true;
    // 定义对象
    $scope.thresholdInfo = {};

    // 创建人
    $scope.thresholdInfo.wUpdatePerson = $rootScope.userInfo.realName;
    $scope.thresholdInfo.orgId = $rootScope.depotInfo.orgId;
    // 创建时间
    // $scope.thresholdInfo.wUpdateTime = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");

    // 接收参数
    if (items != undefined || items.length != 0) {
        $scope.thresholdInfo.vCfCode = items.vCfCode;
        $scope.thresholdInfo.wModule = items.wModule;
        $scope.thresholdInfo.wName = items.wName;
        $scope.thresholdInfo.threshold = items.threshold;
        $scope.thresholdInfo.wState = items.wState;
    }

    // 校验
    var validator = $("#ThresholdDetail-form").validate();

    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;
        return this.optional(element)||(checkNumber.test(value));
    },"请输入正确的数字类型，最多两位小数！");

    var validator = null;
    $scope.save = function() {
        // 模态框的校验器，进入时为空.
        if (validator == null) {
            validator = $("#ThresholdDetail-form").validate();
            $.validator.addMethod("validNumber",function(value,element) {
                var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;
                if (this.optional(element)||(checkNumber.test(value))) {
                    return true;
                } else {
                    return false;
                }
            },"请输入正确的数字类型，最多两位小数！");
            $scope.save();
        } else {
            if (validator.form()) {
                $uibModalInstance.close($scope.thresholdInfo);
            }
        }
    };

    // 关闭模态窗口
    $scope.cancel = function() {
        $uibModalInstance.close();
    }

});