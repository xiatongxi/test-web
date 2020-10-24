"use strict";
angular.module('app.intelligent').controller("wertherinfoCtrl", function ($scope, $state, $rootScope, $stateParams, $uibModal,wertherinfoService) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {vqxzname: ''};
    // 存放单个对象
    $scope.werther = {};

    // 加载列表
    $scope.loadData = function() {
        wertherinfoService.getBasicGrainSetPageInfo($scope.pageInfo, $scope.search).then(function(data){
            $scope.pageInfo = data.data;
            $scope.werther = data.data.list[0];
        },function(data){
            // console.log(data);
        });
    };
    $scope.loadData();


    // 新增页面
    $scope.showAdd = function() {
        $state.go("app.intelligent.weather.weatherDeviceManager.add", {id: '0'});
    };
    // 编辑页面
    $scope.showEdit = function(id) {
        $state.go("app.intelligent.weather.weatherDeviceManager.edit", {id: id});
    };
    // 查看页面
    $scope.showView = function(id) {
        $state.go("app.intelligent.weather.weatherDeviceManager.view", {id: id,isDisplay: 'ck'});
    };

    // 删除一条记录.
    $scope.showDelete = function(wertherinfo) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        wertherinfoService.remove(wertherinfo).then(function(data) {
            if (data.retCode == '200') {
                alert("删除成功！");
                $scope.loadData();
            } else {
                alert(data.message);
            }
        });
    };

    // 清空搜索时间
    $scope.empty = function() {
        $scope.search.vqxzname = '';
        $scope.search.searchStartDate = '';
        $scope.search.searchEndDate = '';
        $scope.loadData();
    };

    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };
    // 返回,取消
    $scope.retList = function () {
        $rootScope.back();
    }

    // 数据同步
    $scope.synchronization = function() {
        var orgId = $rootScope.depotInfo.orgId;
        wertherinfoService.synchronizationAll(orgId).then(function(data){
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

.controller("wertherinfoSaveCtrl", function($scope, $state, $rootScope, $stateParams,$filter, APP_CONFIG, wertherinfoService) {
    // 防止重复提交标记
    $scope.saveFlag = false;
    $scope.isNotEdit = false;
    if ($scope.wertherinfo == null) {
        $scope.wertherinfo = {};
    }

    // 加载数据.
    $scope.loadDataById = function(id) {
        wertherinfoService.loadDataById(id).then(function(data){
            $scope.wertherinfo = data.data;
        },function(data){
        });
    };

    // 生成5位数字随机数 length->位数从0开始,max->每位上的最大值向下取整
    $scope.getRandom = function (length,max) {
        var code = "";
        for (var i = 0; i < length; i++) {
            code += Math.floor(Math.random() * max);
        }
        return code;
    };

    if ($stateParams.id != '0') { // 新增,修改
        $scope.isNotEdit = $stateParams.isNotEdit;
        $scope.notEditNum = true;
        $scope.notDisplay = false;
        if ($stateParams.isDisplay == 'ck') {
            $scope.notDisplay = false;
        }
        $scope.loadDataById($stateParams.id);
    } else if ($stateParams.id == '0') {
        // 获取5位随机数-气象站编码
        // $scope.wertherinfo.vqxzcode = $scope.getRandom(5,10);
        $scope.notEditNum = true;
        $scope.notDisplay = true;
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

    $scope.save = function () {
    // 保存
        if (!$scope.saveFlag) {
            if (validator.form()) {
                $scope.saveFlag = true;
                // 提交
                $scope.wertherinfo.orgId = $rootScope.depotInfo.orgId;
                wertherinfoService.save($scope.wertherinfo).then(function(data){
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
            $state.go("app.intelligent.weather.weatherDeviceManager");
        }
    }
//校验编码是否存在
    $scope.itExistCode = function(vdevcode,vdevname){
        if (vdevcode != undefined && vdevcode != ''){
            wertherinfoService.itExistCode(vdevcode,vdevname).then(function (data) {
                if (data.data == true){
                    alert("设备编码已存在！");
                    $scope.wertherinfo.vqxzcode = '';
                }
            },function(data){
            });
        }
        if (vdevname != undefined && vdevname != ''){
            wertherinfoService.itExistCode(vdevcode,vdevname).then(function (data) {
                if (data.data == true){
                    alert("设备名称已存在！");
                    $scope.wertherinfo.vqxzname = '';
                }
            },function(data){
            });
        }
    };
});