"use strict";
angular.module('app.intelligent').controller("basicGrainSetCtrl", function ($scope, $state, $rootScope, $stateParams, $uibModal, basicGrainSetService) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {vCfCode: ''};

    // 加载列表
    $scope.loadData = function() {
        basicGrainSetService.getBasicGrainSetPageInfo($scope.pageInfo, $scope.search).then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            // console.log(data);
        });
    };
    $scope.loadData();

    // 新增页面
    $scope.showAdd = function() {
        $state.go("app.intelligent.basicData.basicGrainSetList.add", {id: '0'});
    };
    // 编辑页面
    $scope.showEdit = function(id) {
        $state.go("app.intelligent.basicData.basicGrainSetList.edit", {id: id});
    };
    // 查看页面
    $scope.showView = function(id) {
        $state.go("app.intelligent.basicData.basicGrainSetList.view", {id: id});
    };

    // 删除一条记录.
    $scope.showDelete = function(basicGrainSet) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        basicGrainSetService.remove(basicGrainSet).then(function(data) {
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
        basicGrainSetService.synchronizationAll(orgId).then(function(data){
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

.controller("basicGrainSetSaveCtrl", function($scope, $state, $rootScope, $stateParams, APP_CONFIG, basicGrainSetService) {
    // 防止重复提交标记
    $scope.saveFlag = false;
    $scope.isNotEdit = false;
    if ($scope.basicGrainSet == null) {
        $scope.basicGrainSet = {};
    }

    // 加载数据.
    $scope.loadDataById = function(id) {
        basicGrainSetService.loadDataById(id).then(function(data){
            $scope.basicGrainSet = data.data;
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
    //alert($stateParams.id);
    // 校验
    var validator = $("#basicGrainSetEdit-form").validate();

    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element) {
        var checkNumber = /^[1-9]\d*$/g; // 不为0的正整数
        return this.optional(element)||(checkNumber.test(value));
    },"请输入正确的不为0的数字整数！");

    // 保存
    $scope.save = function () {
        if (!$scope.saveFlag) {
            if (validator.form()) {
                $scope.saveFlag = true;
                // 提交
                $scope.basicGrainSet.orgId = $rootScope.depotInfo.orgId;
                basicGrainSetService.save($scope.basicGrainSet).then(function(data){
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
        $scope.search = {vCfCode:$scope.basicGrainSet.vCfCode};
        console.log($scope.search);
        basicGrainSetService.getBasicGrainSetPageInfo($scope.pageInfo, $scope.search).then(function(data){
            $scope.pageInfo = data.data;
            if ($scope.pageInfo.total > 0) {
                alert("该仓房设置已存在,请不要重复添加!");
                $scope.basicGrainSet.vCfCode = '';
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
            $state.go("app.intelligent.basicData.basicGrainSetList");
        }
    }

    //校验编码是否存在
    $scope.itExistCode = function(vdevcode,vdevname){
        if (vdevcode != undefined && vdevcode != ''){
            basicGrainSetService.itExistCode(vdevcode,vdevname).then(function (data) {
                if (data.data == true){
                    alert("粮情编码已存在！");
                    $scope.basicGrainSet.vdevcode = '';
                }
            },function(data){
            });
        }
        if (vdevname != undefined && vdevname != ''){
            basicGrainSetService.itExistCode(vdevcode,vdevname).then(function (data) {
                if (data.data == true){
                    alert("粮情名称已存在！");
                    $scope.basicGrainSet.vdevname = '';
                }
            },function(data){
            });
        }
    };

});