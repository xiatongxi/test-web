"use strict";
angular.module('app.intelligent').controller("basicNitrogenSetCtrl", function ($scope, $state, $rootScope, $stateParams, $uibModal, basicNitrogenSetService) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {rName: ''};

    // 加载列表
    $scope.loadData = function() {
        basicNitrogenSetService.getBasicGrainSetPageInfo($scope.pageInfo, $scope.search).then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            // console.log(data);
        });
    };
    $scope.loadData();

    // 删除一条记录.
    $scope.showDelete = function(basicRoomSet) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        basicNitrogenSetService.remove(basicRoomSet).then(function(data) {
            if (data.retCode == '200') {
                alert("删除成功！");
                $scope.loadData();
            } else {
                alert(data.message);
            }
        });
    };

    // 清空搜索条件
    $scope.empty = function () {
        $scope.search.rName = '';
        $scope.loadData();
    };

    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

    // 数据同步
    $scope.synchronization = function() {
        var orgId = $rootScope.depotInfo.orgId;
        basicNitrogenSetService.synchronizationAll(orgId).then(function(data){
            if (data.retCode == '200') {
                alert("数据同步成功！");
                $scope.loadData();
            } else {
                alert(data.message);
            }
        },function(data){
            // console.log(data);
        });
    };

})

.controller("basicNitrogenSaveCtrl", function($scope, $state, $rootScope, $stateParams, APP_CONFIG, basicNitrogenSetService) {
    // 防止重复提交标记
    $scope.saveFlag = false;
    $scope.isNotEdit = false;
    if ($scope.basicRoomSet == null) {
        $scope.basicRoomSet = {};
    }

    // 加载数据.
    $scope.loadDataById = function(id) {
        basicNitrogenSetService.loadDataById(id).then(function(data){
            $scope.basicRoomSet = data.data;
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

    // 校验
    var validator = $("#basicStorehouseView-form").validate();

    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^[1-9]\d*$/g; // 不为0的正整数
        return this.optional(element)||(checkNumber.test(value));
    },"请输入正确的不为0的数字整数！");

    //校验输入框只能输入数字和小数
    $scope.clearNoNum = function (obj, attr) {

        //先把非数字的都替换掉，除了数字和.
        obj[attr] = obj[attr].replace(/[^\d.]/g, "");
        //必须保证第一个为数字而不是.
        obj[attr] = obj[attr].replace(/^\./g, "");
        //保证只有出现一个.而没有多个.
        obj[attr] = obj[attr].replace(/\.{2,}/g, "");
        //保证.只出现一次，而不能出现两次以上
        obj[attr] = obj[attr].replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    };
    // 保存
    $scope.save = function () {
        if (!$scope.saveFlag) {
            if (validator.form()) {
                $scope.saveFlag = true;
                // 提交
                $scope.basicRoomSet.orgId = $rootScope.userInfo.orgId;
                basicNitrogenSetService.save($scope.basicRoomSet).then(function(data){
                    if (data.message == 'success' && data.retCode == '200') {
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
            $state.go("app.intelligent.basicData.parameter.basicNitrogenSet");
        }
    }
    //校验编码是否存在
    $scope.itExistCode = function(vdevcode,vdevname){
        if (vdevcode != undefined && vdevcode != ''){
            basicNitrogenSetService.itExistCode(vdevcode,vdevname).then(function (data) {
                if (data.data == true){
                    alert("氮气房编码已存在！");
                    $scope.basicRoomSet.vdevcode = '';
                }
            },function(data){
            });
        }
        if (vdevname != undefined && vdevname != ''){
            basicNitrogenSetService.itExistCode(vdevcode,vdevname).then(function (data) {
                if (data.data == true){
                    alert("氮气房名称已存在！");
                    $scope.basicRoomSet.nitrogenhouse = '';
                }
            },function(data){
            });
        }
    };
});