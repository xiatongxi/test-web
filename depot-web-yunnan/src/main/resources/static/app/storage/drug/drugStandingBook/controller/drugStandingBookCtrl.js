angular.module('app.storage').controller("drugStandingBookCtrl", function ($scope, $http, $state, drugStandingBookService) {
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    $scope.searchCondition = {drugKind: "", drugName: ""};//搜索条件
    // 获取列表数据
    $scope.loadData = function () {
        drugStandingBookService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function (data) {
            $scope.pageInfo = data;
        }, function (data) {
            console.log(data);
        });
    };
    $scope.loadData();

    // 查看页面
    $scope.showDetail = function (drugInfoId, manufacturer) {
        $state.go("app.storage.drug.standingBook.detail", {drugInfoId: drugInfoId, manufacturer: manufacturer});
    };

    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

});