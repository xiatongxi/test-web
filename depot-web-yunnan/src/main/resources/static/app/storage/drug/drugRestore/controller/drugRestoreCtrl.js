angular.module('app.storage').controller("drugRestoreCtrl", function($scope, $http, $state,drugRestoreService, drugShelfService) {

    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.searchCondition = {};
    // 获取列表数据
    $scope.loadData = function() {
        drugRestoreService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    };
    // 获取货架号数据
    $scope.getShelfData = function() {
        drugShelfService.getShelfMap().then(function(data){
            $scope.shelfMap = data;
        }, function (data) {
            console.log(data);
        });
    };
    $scope.getShelfData();

    $scope.loadData();

    // 新增页面
    $scope.showAdd = function() {
        $state.go("app.storage.drug.restore.edit", {id: 0});
    };

    // 查看页面
    $scope.showView = function(id) {
        $state.go("app.storage.drug.restore.view", {id: id});
    };

    // 翻页
    $scope.goPage = function(pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    }

});