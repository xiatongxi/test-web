"use strict";
angular.module('app.intelligent').controller("qtDevinfoDetectionCtrl", function ($scope, $state, $rootScope, $stateParams, $uibModal,qtDevinfoSetService) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {vCfCode: ''};

    // 加载列表
    $scope.loadData = function() {
        qtDevinfoSetService.getBasicGrainSetPageInfo($scope.pageInfo, $scope.search).then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            // console.log(data);
        });
    };
    $scope.loadData();

    // 新增页面
    $scope.showAdd = function() {
        $state.go("app.intelligent.basicData.parameter.qtDevinfo.add", {id: '0'});
    };
    // 编辑页面
    $scope.showEdit = function(id) {
        $state.go("app.intelligent.basicData.parameter.qtDevinfo.edit", {id: id});
    };
    // 查看页面
    $scope.showView = function(id) {
        $state.go("app.intelligent.basicData.parameter.qtDevinfo.view", {id: id,isDisplay: true});
    };

    // 删除一条记录.
    $scope.showDelete = function(qtDevinfo) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        qtDevinfoSetService.remove(qtDevinfo).then(function(data) {
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

    // 数据同步
    $scope.synchronization = function() {
        var orgId = $rootScope.depotInfo.orgId;
        qtDevinfoSetService.synchronizationAll(orgId).then(function(data){
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

.controller("qtDevinfoDetectionSaveCtrl", function($scope, $state, $rootScope, $stateParams,$filter, APP_CONFIG, qtDevinfoSetService) {
    // 防止重复提交标记
    $scope.saveFlag = false;
    $scope.isNotEdit = false;
    if ($scope.qtDevinfo == null) {
        $scope.qtDevinfo = {};
    }

    // 加载数据.
    $scope.loadDataById = function(id) {
        qtDevinfoSetService.loadDataById(id).then(function(data){
            $scope.qtDevinfo = data.data;
            $scope.qtDevinfo.vdevkindcode = $scope.qtDevinfo.vdevkindcode.toString(); // number转string
        },function(data){
        });
    };

    $scope.notDisplay = true; // 只有查看显示
    if ($stateParams.id != '0') { // 修改,查看
        $scope.isNotEdit = $stateParams.isNotEdit;
        $scope.isAdd = false;
        // 查看
        if ($stateParams.isDisplay) {
            $scope.notDisplay = false;
           // $scope.isAdd = false;
        }
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

    $scope.save = function () {
        // 保存
        $scope.qtDevinfo.vvaluetime = $filter('date')($scope.qtDevinfo.vvaluetime, "yyyy-MM-dd HH:mm:ss");
        // sting转number
        if ($scope.qtDevinfo.vdevkindcode !== null && $scope.qtDevinfo.vdevkindcode !== undefined && $scope.qtDevinfo.vdevkindcode !== '')
            $scope.qtDevinfo.vdevkindcode = parseInt($scope.qtDevinfo.vdevkindcode);
        if (!$scope.saveFlag) {
            if (validator.form()) {
                $scope.saveFlag = true;
                // 提交
                $scope.qtDevinfo.orgId = $rootScope.depotInfo.orgId;
                qtDevinfoSetService.save($scope.qtDevinfo).then(function(data){
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

    // 效验仓房是否存在
    $scope.checkVcfCode = function () {
        $scope.pageInfo = {pageNum: 1, pageSize: 1};
        $scope.search = {vCfCode:$scope.qtDevinfo.vCfCode};
        console.log($scope.search);
        basicGrainSetService.getBasicGrainSetPageInfo($scope.pageInfo, $scope.search).then(function(data){
            $scope.pageInfo = data.data;
            if ($scope.pageInfo.total > 0) {
                alert("该仓房设置已存在,请不要重复添加!");
                $scope.qtDevinfo.vCfCode = '';
            }
        },function(data){
            // console.log(data);
        });
    };

    // 返回,取消
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
            $rootScope.back();
        } else {
            $state.go("app.intelligent.basicData.parameter.qtDevinfo");
        }
    }
    //校验编码是否存在
    $scope.itExistCode = function(vdevcode,vdevname){
        if (vdevcode != undefined && vdevcode != ''){
            qtDevinfoSetService.itExistCode(vdevcode,vdevname).then(function (data) {
                if (data.data == true){
                    alert("设备编码已存在！");
                    $scope.qtDevinfo.vdevcode = '';
                }
            },function(data){
            });
        }
        if (vdevname != undefined && vdevname != ''){
            qtDevinfoSetService.itExistCode(vdevcode,vdevname).then(function (data) {
                if (data.data == true){
                    alert("设备名称已存在！");
                    $scope.qtDevinfo.vdevname = '';
                }
            },function(data){
            });
        }
    };
});