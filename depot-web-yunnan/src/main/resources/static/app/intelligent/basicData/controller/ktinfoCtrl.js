"use strict";
angular.module('app.intelligent').controller("ktinfoCtrl", function ($scope, $state, $rootScope, $stateParams, $uibModal,ktinfoService) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {vcfcode: ''};

    // 加载列表
    $scope.loadData = function() {
        ktinfoService.getBasicGrainSetPageInfo($scope.pageInfo, $scope.search).then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            // console.log(data);
        });
    };
    $scope.loadData();

    // 新增页面
    $scope.showAdd = function() {
        $state.go("app.intelligent.basicData.parameter.ktinfo.add", {id: '0'});
    };
    // 编辑页面
    $scope.showEdit = function(id) {
        $state.go("app.intelligent.basicData.parameter.ktinfo.edit", {id: id});
    };
    // 查看页面
    $scope.showView = function(id) {
        $state.go("app.intelligent.basicData.parameter.ktinfo.view", {id: id});
    };

    // 删除一条记录.
    $scope.showDelete = function(ktinfo) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        ktinfoService.remove(ktinfo).then(function(data) {
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
    // 数据同步
    $scope.synchronization = function() {
        var orgId = $rootScope.depotInfo.orgId;
        ktinfoService.synchronizationAll(orgId).then(function(data){
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

.controller("ktinfoSaveCtrl", function($scope, $state, $rootScope, $stateParams,$filter, APP_CONFIG, ktinfoService) {
    // 防止重复提交标记
    $scope.saveFlag = false;
    $scope.isNotEdit = false;
    if ($scope.ktinfo == null) {
        $scope.ktinfo = {};
    }

    // 加载数据.
    $scope.loadDataById = function(id) {
        ktinfoService.loadDataById(id).then(function(data){
            $scope.ktinfo = data.data;
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
    var validator = $("#basicGrainSetEdit-form").validate();

    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element) {
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

    //判断数值允许负数
    $scope.clearNoNumf = function f_check_float(obj)
    {
        if (/^(\+|-)?\d+($|\.\d+$)/.test( obj ))
        {
        }
        else
        {
            alert("当前温度请输入数值类型！");
            return false;
        }
    }

    $scope.save = function () {
    // 保存
        if (!$scope.saveFlag) {
            if (validator.form()) {
                $scope.saveFlag = true;
                // 提交
                $scope.ktinfo.orgId = $rootScope.depotInfo.orgId;
                ktinfoService.save($scope.ktinfo).then(function(data){
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
            $state.go("app.intelligent.basicData.parameter.ktinfo");
        }
    }
//校验编码是否存在
    $scope.itExistCode = function(vdevcode,vdevname){
        if (vdevcode != undefined && vdevcode != ''){
            ktinfoService.itExistCode(vdevcode,vdevname).then(function (data) {
                if (data.data == true){
                    alert("设备编码已存在！");
                    $scope.ktinfo.vdevcode = '';
                }
            },function(data){
            });
        }
        if (vdevname != undefined && vdevname != ''){
            ktinfoService.itExistCode(vdevcode,vdevname).then(function (data) {
                if (data.data == true){
                    alert("设备名称已存在！");
                    $scope.ktinfo.vdevname = '';
                }
            },function(data){
            });
        }
    };

});