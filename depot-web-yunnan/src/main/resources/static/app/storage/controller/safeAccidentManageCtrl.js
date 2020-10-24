"use strict";
angular.module('app.storage').controller("safeAccidentManageCtrl", function($scope,$state, $rootScope, $stateParams,warehouseService,safeAccidentManageService) {
    // 安全事故管理列表
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.search = {};
    $scope.loadData = function() {
        safeAccidentManageService.getPageInfo($scope.pageInfo,$scope.storehouseId).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log(data);
            });
    };
    $scope.loadData();

    // 显示增加页面
    $scope.showAddAccident=function () {
        $state.go('app.storage.safeproduce.safeAccidentManageList.edit', {id:0,isNotEdit:false});
    };

    // 调转详情页面
    $scope.showDetails=function (id) {
        $state.go('app.storage.safeproduce.safeAccidentManageList.edit', {id:id,isNotEdit:true});
    };

    // 翻页
    $scope.goPage = function(pageNum) {
        $scope.pageInfo.pageNum = pageNum;
        $scope.loadData();
    };

})

.controller("safeAccidentManageSaveCtrl", function($scope,$state, $rootScope, $stateParams,$filter,safeAccidentManageService,warehouseService) {
    $scope.safeProduceAccident={};
    //下面的判断用于查看页面只读状态
    if($stateParams.isNotEdit != null){
        if ($stateParams.isNotEdit == "false") {
            $scope.isNotEdit = false;
        } else if ($stateParams.isNotEdit == "true") {
            $scope.isNotEdit = true;
        }
    }else{
        $scope.isNotEdit = false;
    }
    // id获取
    $scope.loadDataById = function(id) {
        safeAccidentManageService.edit(id).then(function(data){
            if (id==0){
                // 库区名称
                $scope.safeProduceAccident.warehouseName = $rootScope.orgInfo.orgName;
                // 填报日期
                $scope.safeProduceAccident.reportedTime = $filter('date')(new Date(), "yyyy-MM-dd");
            }else{
                $scope.safeProduceAccident = data;
                // 按照单位获取单位下的货位信息
                warehouseService.getStorehouse($rootScope.orgInfo.orgId, $scope.safeProduceAccident.houseId,'0').then(function(data){
                    $scope.warehouseList = data.wareList;  //下拉列表数据
                },function (data) {
                    console.log(data);
                });
                // 整改时间
                $scope.safeProduceAccident.improvementTime = $filter('date')($scope.safeProduceAccident.improvementTime, "yyyy-MM-dd");
                // 检查时间
                $scope.safeProduceAccident.checkTime = $filter('date')($scope.safeProduceAccident.checkTime, "yyyy-MM-dd");
                // 填报日期
                $scope.safeProduceAccident.reportedTime = $filter('date')($scope.safeProduceAccident.reportedTime, "yyyy-MM-dd");
            }
        },function(data){
            console.log(data);
        });
    };
    $scope.loadDataById($stateParams.id);

    //通过仓房号，获取货位号.
    $scope.change = function () {
        if ($scope.safeProduceAccident.houseId != null
            && $scope.safeProduceAccident.houseId != undefined
            && $scope.safeProduceAccident.houseId != '') {
            warehouseService.getStorehouse($rootScope.orgInfo.orgId, $scope.safeProduceAccident.houseId,'0').then(function(data){
                $scope.warehouseList = data.wareList;  //下拉列表数据
            },function (data) {
                console.log(data);
            });
        } else {
            // 设置货位号为空.
            $scope.safeProduceAccident.warehouseId = null;
        }
    };

    // 提交表单
    var validator = $("#safeProduceAccident-form").validate();
    // 只读
    $('input[readOnlyButValid]').on("focusin", function() {
        $(this).prop('readOnly', true);
    });
    $('input[readOnlyButValid]').on("focusout", function() {
        $(this).prop('readOnly', false);
    });

    $scope.saveData = function () {
        if (validator.form()) {
            $scope.safeProduceAccident.orgId = $rootScope.orgInfo.orgId;
            safeAccidentManageService.save($scope.safeProduceAccident).then(function(data){
                if (data.status == 'success') {
                    alert("保存成功！");
                    $scope.back();
                } else {
                    alert("保存失败！");
                }
            },function(data) {
                console.log(data);
            });
        }
    }


});