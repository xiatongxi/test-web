"use strict";
angular.module('app.intelligent').controller("basicThresholdSetCtrl", function ($scope, $state, $rootScope, $stateParams, $uibModal, basicThresholdSetService) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {};

    // 加载列表
    $scope.loadData = function() {
        basicThresholdSetService.getThresholdPageInfo($scope.pageInfo, $scope.search).then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            // console.log(data);
        });
    };
    $scope.loadData();

    // 根据id删除列表并删除详情数据
    $scope.showDelete = function (thresholdSetList) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        basicThresholdSetService.removeThreshold(thresholdSetList.id,thresholdSetList).then(function(data){
            if (data.retCode == '200') {
                alert("删除成功！");
                $scope.loadData();
            } else {
                alert(data.message);
            }
        });
    };

    // 新增
    $scope.showAdd = function () {
        $state.go('app.intelligent.basicData.basicThresholdSetList.add', {vCfCode: '0'});
    };
    // 修改
    $scope.showEdit = function (vcfcode) {
        $state.go('app.intelligent.basicData.basicThresholdSetList.edit', {vCfCode: vcfcode});
    };
    // 查看
    $scope.showView = function (vcfcode) {
        $state.go('app.intelligent.basicData.basicThresholdSetList.view', {vCfCode: vcfcode});
    };

    // 清空搜索时间
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

    /*$scope.clearNoNum = function (obj, attr) {
        //先把非数字的都替换掉，除了数字和.
        obj[attr] = obj[attr].replace(/[^\d.]/g, "");
        //必须保证第一个为数字而不是.
        obj[attr] = obj[attr].replace(/^\./g, "");
        //保证只有出现一个.而没有多个.
        obj[attr] = obj[attr].replace(/\.{2,}/g, "");
        //保证.只出现一次，而不能出现两次以上
        obj[attr] = obj[attr].replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    }*/


})

.controller("basicThresholdSetSaveCtrl", function($scope, $state, $rootScope, $stateParams, APP_CONFIG,$uibModal,basicThresholdSetService) {

    // 数据对象
    $scope.thresholdInfo = {};
    // 存放数组.
    $scope.addedDetail = [];

    // 防止重复提交标记
    $scope.saveFlag = false;
    $scope.isNotEdit = false;
    if ($scope.thresholdInfo == null) {
        $scope.thresholdInfo = {};
    }

    // 点击新增或者修改时弹出模态窗
    $scope.addRow = function() {
        // 判断仓房是否选中
        if ($scope.thresholdInfo.vCfCode == '' || $scope.thresholdInfo.vCfCode == undefined ) {
            alert("请选择仓房名称！");
            return;
        }
        var params = [];
        params.vCfCode = $scope.thresholdInfo.vCfCode;
        var uibModalInstance = $uibModal.open({
            size:'lg',
            templateUrl: 'app/intelligent/basicData/views/basicThresholdSet-model.html',
            controller: 'basicThresholdSetModalCtrl',
            resolve: {
                // items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params;
                }
            }
        });
        uibModalInstance.result.then(function (result) {
            if (result != null && result != undefined && result != '') {
                $scope.addedDetail.push(angular.copy(result));
            }
        }, function (reason) {
            // console.log(reason);
        });
    };

    // 查看.
    $scope.loadDataByVcfCode = function(vCfCode) {
        $scope.thresholdInfo.vCfCode = vCfCode;
        basicThresholdSetService.loadDataByVcfCode(vCfCode).then(function(data){
            // 详情数据.
            var thresholdDetailList = data.data;
            for (var i=0; i < thresholdDetailList.length; i++) {
                $scope.addedDetail.push(angular.copy(thresholdDetailList[i]));
            }
        },function(data){

        });
    };

    // 新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
    if ($stateParams.vCfCode != '0') {
        // 编辑，查看.
        $scope.isNotEdit = $stateParams.isNotEdit;
        if ($stateParams.isNotEdit == true) {
            // 查看.
            $scope.loadDataByVcfCode($stateParams.vCfCode);
        } else {
            // 隐藏仓房
            $scope.isShowAdd = true;
            // 编辑.
            $scope.loadDataByVcfCode($stateParams.vCfCode);

        }
    } else {
        // 新增.
    }

    // 效验仓房是否存在
    /*$scope.checkVcfCode = function () {
        $scope.pageInfo = {pageNum: 1, pageSize: 1};
        $scope.search = {vCfCode:$scope.thresholdInfo.vCfCode};
        basicThresholdSetService.getThresholdPageInfo($scope.pageInfo, $scope.search).then(function(data){
            $scope.pageInfo = data.data;
            if ($scope.pageInfo.total > 0) {
                alert("该仓房设置已存在,请不要重复添加!");
                $scope.thresholdInfo.vCfCode = '';
            }
        },function(data){
            // console.log(data);
        });
    };*/

    // 保存
    $scope.save = function () {
        basicThresholdSetService.save($scope.addedDetail,$scope.deleteRowId).then(function(data){
            if (data.message == 'success' && data.retCode == '200') {
                alert('保存成功!');
                $scope.retList();
            } else {
                alert("保存失败！");
            }
        },function(data){
            // console.log(data);
        });
    };

    // 修改时弹出模态窗
    $scope.editRow = function(thresholdModelInfo) {
        // 索引，用来保存模态框返回的数据.
        var index = $scope.addedDetail.indexOf(thresholdModelInfo);
        var params = [];
        // 传入模态框
        params.vCfCode = thresholdModelInfo.vCfCode;
        params.wModule = thresholdModelInfo.wModule;
        params.wName = thresholdModelInfo.wName;
        params.threshold = thresholdModelInfo.threshold;
        params.wState = thresholdModelInfo.wState;

        var uibModalInstance = $uibModal.open({
            size:'lg',
            templateUrl: 'app/intelligent/basicData/views/basicThresholdSet-model.html',
            controller: 'basicThresholdSetModalCtrl',
            resolve: {
                // items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params;
                }
            }
        });
        uibModalInstance.result.then(function (result) {
            if (result != null && result != undefined && result != '') {
                $scope.addedDetail[index].vCfCode = result.vCfCode;
                $scope.addedDetail[index].wModule = result.wModule;
                $scope.addedDetail[index].wName = result.wName;
                $scope.addedDetail[index].threshold = result.threshold;
                $scope.addedDetail[index].wState = result.wState;
                $scope.addedDetail[index].wUpdatePerson = result.wUpdatePerson;
            }
        }, function (reason) {
            console.log(reason);
        });
    };

    // 删除一条
    $scope.deleteRow = function (thresholdInfo) {
        if (thresholdInfo.id != null && thresholdInfo.id != undefined && thresholdInfo.id != '') {
            if (!confirm("您确定删除要此条数据吗？")) {
                return;
            }
            // 缓存要删除的id保存时才真正删除.
            $scope.deleteRowId = thresholdInfo.id;
            //从数组中移除
            var index = $scope.addedDetail.indexOf(thresholdInfo);
            if (index != -1) {
                // 从addedDetail移除.
                $scope.addedDetail.splice(index, 1);
            }
        }

    };

    // 返回,取消
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
            $rootScope.back();
        } else {
            $state.go("app.intelligent.basicData.basicThresholdSetList");
        }
    }

});


