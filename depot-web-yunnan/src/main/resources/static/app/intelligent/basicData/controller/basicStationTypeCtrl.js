"use strict";
angular.module('app.intelligent').controller("basicStationTypeCtrl", function ($scope, $state, $rootScope, $stateParams, $uibModal, basicStationTypeService) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {vcfcode: ''};

    // 加载列表
    $scope.loadData = function() {
        basicStationTypeService.getBasicGrainSetPageInfo($scope.pageInfo).then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            // console.log(data);
        });
    };
    $scope.loadData();

    // 删除一条记录.
    $scope.showDelete = function(insect) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        basicStationTypeService.remove(insect).then(function(data) {
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
        basicStationTypeService.synchronizationAll(orgId).then(function(data){
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

});