"use strict";
angular.module('app.storage').controller("dangerJobRecordCtrl", function($scope, $http, $state, $rootScope, $uibModal,$stateParams,
                                                                    fumigationService, enumService, StorehouseService) {
    // 列表页标题
    $scope.titleTag = $stateParams.titleTag;

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    // 获取列表数据
    $scope.loadData = function() {
        // 数组中获取第一个粮食品种id
        if($scope.searchCondition.grainKind != undefined && $scope.searchCondition.grainKind != ""){
            $scope.searchCondition.grainKind = $scope.searchCondition.grainKind[0].id;
            // console.log($scope.searchCondition.grainKind);
        }
        // 熏蒸作业管理列表
        fumigationService.getDangerJobRecordPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            // console.log(data);
        });
        // 树形下拉框(粮食品种)
        enumService.getTreeListByTypeId($scope.searchCondition.grainKind, 1061).then(function(data) {
            var data_new = $scope.data_add(data);
            $scope.grainAttributeTreeDataLspz = data_new;
        },function(data) {
            // console.log(data);
        });
    };

    // 获取基础数据
    $scope.getBasicData = function() {
        //按照单位获取单位下的仓房信息
        var depotId = $rootScope.depotInfo.orgId;
        StorehouseService.getStorehouseList(depotId).then(function(data){
            // $scope.storehouseList = data.houseList;
            $scope.storehouseObj = data.houseObj;
        },function (data) {
            // console.log(data);
        });
    };

    $scope.searchCondition = {};
    $scope.getBasicData();
    $scope.loadData();

    // 清空查询条件.
    $scope.clearConditions = function() {
        $scope.searchCondition = {};
        $scope.loadData();
    };

    // 查看页面
    $scope.showView = function(fumigation) {
        if ($stateParams.recordManage == true) {
            $state.go("app.storage.safeproduce.recordManage.fumigationPlan.view", {id : fumigation.id});
        } else {
            $state.go("app.storage.safeproduce.recordList.dangerJobRecord-view", {id : fumigation.id});
        }
    };

    // 接收广播，切换仓房
    $scope.$on("storeChangeed", function(event, storehouseId) {
        $scope.searchCondition.houseId = storehouseId;
        $scope.loadData();
    });

    // 翻页
    $scope.goPage = function(pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

    // 树形菜单处理
    $scope.data_add = function(data) {
        //var data_new = $scope.data_add(data);
        var e = [];
        if (data.length != 0) {
            //要插入的json对象串
            var a = {"id":null,"name":"请选择","children":[]};
            //将返回的json对象和要插入的json对象串转换为字符串格式
            var f = angular.toJson(a);
            var b = angular.toJson(data);
            //把要插入的json对象串插入返回数据的最前面
            var c = b.substring(0,1);
            var d = b.substring(1,b.length);
            e = c + f + "," + d;
        }
        //最后在转换为json对象返回去
        return angular.fromJson(e);
    }

});