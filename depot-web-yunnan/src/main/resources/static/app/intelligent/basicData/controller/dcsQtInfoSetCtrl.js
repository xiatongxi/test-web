"use strict";
angular.module('app.intelligent').controller("dcsQtInfoSetCtrl", function ($scope, $state, $rootScope, $stateParams, $uibModal,dcsQtInfoSetService) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {vCfCode: ''};

    // 加载列表
    $scope.loadData = function() {
        dcsQtInfoSetService.getDcsQtInfoSetPageInfo($scope.pageInfo, $scope.search).then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();

    // 编辑页面::isNotEdit=false,查看页面:isNotEdit=true
    $scope.showEdit = function(id,isNotEdit) {
        $state.go("app.intelligent.basicData.parameter.dcsQtInfo.edit", {id: id,isNotEdit: isNotEdit});
    };

    // 删除一条记录.
    $scope.showDelete = function(dcsQtInfoSetInfo) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        dcsQtInfoSetService.remove(dcsQtInfoSetInfo).then(function(data) {
            if (data.retCode == '200') {
                alert("删除成功！");
                $scope.loadData();
            } else {
                alert(data.message);
            }
        });
    };

    // 数据同步
    $scope.synchronization = function() {
        dcsQtInfoSetService.synchronizationAll().then(function(data){
            if (data.retCode === '200') {
                alert(data.data);
                $scope.loadData();
            }
        },function(data){
            console.log(data);
        });
    };

    // 清空搜索条件
    $scope.empty = function () {
        $scope.search.vCfCode = '';
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

.controller("dcsQtInfoSetCtrlSaveCtrl", function($scope, $state, $rootScope, $stateParams,$filter, APP_CONFIG, dcsQtInfoSetService) {
    // 防止重复提交标记
    $scope.saveFlag = false;
    $scope.isNotEdit = false;
    $scope.dcsQtInfo = {};

    // 加载数据.
    $scope.loadDataById = function(id) {
        dcsQtInfoSetService.loadDataById(id).then(function(data){
            $scope.dcsQtInfo = data.data;
        },function(data){
            console.log(data);
        });
    };

    if ($stateParams.id !== '0') { // 修改,查看
        $scope.loadDataById($stateParams.id);
        $scope.isNotEdit = $stateParams.isNotEdit;
    } else {
        $scope.dcsQtInfo.vUpdatePerson = $rootScope.userInfo.realName;
        $scope.dcsQtInfo.vUpdateTime = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
    }

    // 校验
    var validator = $("#dcsQtInfo-form").validate();

    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element) {
        var checkNumber = /^[1-9]\d*$/g; // 不为0的正整数
        return this.optional(element)||(checkNumber.test(value));
    },"请输入正确的不为0的数字整数！");

    $scope.save = function () {
        // 保存
        if($stateParams.isNotEdit === ''){ // 修改重置操作人,更新时间.
            $scope.dcsQtInfo.vUpdatePerson = $rootScope.userInfo.realName;
            $scope.dcsQtInfo.vUpdateTime = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
        }
        if (!$scope.saveFlag) {
            if (validator.form()) {
                $scope.saveFlag = true;
                // 提交
                $scope.dcsQtInfo.orgId = $rootScope.depotInfo.orgId;
                dcsQtInfoSetService.save($scope.dcsQtInfo).then(function(data){
                    if (data.message === 'success' && data.retCode === '200') {
                        alert('保存成功!');
                        $scope.retList();
                    } else {
                        alert("保存失败！");
                        $scope.saveFlag = false;
                    }
                },function(data){
                    console.log(data);
                });
            }
        }
    };

    // 返回,取消
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
            $rootScope.back();
        } else {
            $state.go("app.intelligent.basicData.parameter.dcsQtInfo");
        }
    }

});
