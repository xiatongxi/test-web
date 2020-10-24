angular.module('app.storage').controller("drugShelfCtrl", function ($scope, $http, $uibModal, $state, drugShelfService, APP_CONFIG) {
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    $scope.searchCondition = {};
    // 获取列表数据.
    $scope.loadData = function () {
        drugShelfService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function (data) {
            $scope.pageInfo = data;
        }, function (data) {
            console.log(data);
        });
    };
    $scope.loadData();

    // 清空.
    $scope.clearConditions = function () {
        $scope.searchCondition = {};
        $scope.loadData();
    };

    // 新增 修改.
    $scope.showAdd = function (id) {
        var params = [];
        if (id != undefined && id != null) {
            params.id = id;
        }
        var uibModalInstance = $uibModal.open({
            size: 'sm',
            templateUrl: 'app/storage/drug/drugShelf/views/drugShelfModal.html',
            controller: 'drugShelfModalCtrl',
            resolve: {
                // items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params;
                }
            }
        });
        uibModalInstance.result.then(function (result) {
            // 重新加载.
            $scope.loadData();
        }, function (reason) {
            console.log(reason);
        });
    };

    // 删除一条记录
    $scope.delete = function (id) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        $http({
            method: 'POST',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugShelf/remove',
            data: {
                id: id
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            alert("删除成功！");
            // 重新加载数据
            $scope.loadData();
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
        // 关闭弹出层
        $("#myModal").modal("hide");
    };

    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

});