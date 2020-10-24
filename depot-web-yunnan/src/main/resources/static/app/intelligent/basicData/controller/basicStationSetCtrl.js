"use strict";
angular.module('app.intelligent').controller("basicStationSetCtrl", function ($scope, $state, $rootScope, $stateParams, $uibModal, basicStationSetService) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {vZdName: ''};

    // 加载列表
    $scope.loadData = function() {
        basicStationSetService.getBasicGrainSetPageInfo($scope.pageInfo, $scope.search).then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();

    // 删除一条记录.
    $scope.showDelete = function(station) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        basicStationSetService.remove(station).then(function(data) {
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
        $scope.search.vZdName = '';
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
        basicStationSetService.synchronizationAll(orgId).then(function(data){
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

.controller("basicStationSaveCtrl", function($scope, $state, $rootScope, $stateParams, APP_CONFIG, basicStationSetService,$uibModal) {
    // 防止重复提交标记
    $scope.saveFlag = false;
    $scope.isNotEdit = false;
    if ($scope.station == null) {
        $scope.station = {};
    }

    // 加载数据.
    $scope.loadDataById = function(id) {
        basicStationSetService.loadDataById(id).then(function(data){
            $scope.station = data.data;
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
        //$scope.isShowAdd = true;
        $scope.showAdd = false;
        if ($stateParams.displayShow == 'ck') {
            //$scope.isShowAdd = false;
            $scope.showAdd = false;
        }
        $scope.loadDataById($stateParams.id);
    } else if ($stateParams.id == '0') {
        // 获取5位随机数
        // $scope.station.sitecode = $scope.getRandom(5,10);
        //$scope.isShowAdd = true;
        $scope.showAdd = true;
    }

    // 校验
    var validator = $("#basicStorehouseView-form").validate();

    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^[1-9]\d*$/g; // 不为0的正整数
        return this.optional(element)||(checkNumber.test(value));
    },"请输入正确的不为0的数字整数！");

    // 拼接方法
    $scope.pushType = function(){
        // 初始参数
        var uibModalInstance = $uibModal.open({
            size: 'sm',
            templateUrl: 'app/intelligent/basicData/views/selectStationType-modal.html',
            controller: 'selectStationTypeModalCtrl',
            resolve: {
                // 传入参数
                /*items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params;
                }*/
            }
        });
        uibModalInstance.result.then(function (result) {
            if (result != null) {
                // 返回结果字符串
                $scope.station.vZdType=result;
            }
            // 关闭模态框时刷新页面数据
        }, function (reason) {
            console.log(reason);
        });


    };

    // 保存
    $scope.save = function () {
        if (!$scope.saveFlag) {
            if (validator.form()) {
                $scope.saveFlag = true;
                // 创建更新人
                // $scope.station.vUpdatePerson = $rootScope.userInfo.realName;
                // 提交
                $scope.station.orgId = $rootScope.depotInfo.orgId;
                basicStationSetService.save($scope.station).then(function(data){
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
            $state.go("app.intelligent.basicData.StationSet");
        }
    }
    //校验编码是否存在
    $scope.itExistCode = function(vdevcode,vdevname){
        if (vdevcode != undefined && vdevcode != ''){
            basicStationSetService.itExistCode(vdevcode,vdevname).then(function (data) {
                if (data.data == true){
                    alert("通信编码已存在！");
                    $scope.station.sitecode = '';
                }
            },function(data){
            });
        }
        if (vdevname != undefined && vdevname != ''){
            basicStationSetService.itExistCode(vdevcode,vdevname).then(function (data) {
                if (data.data == true){
                    alert("通信名称已存在！");
                    $scope.station.sitename = '';
                }
            },function(data){
            });
        }
    };
});