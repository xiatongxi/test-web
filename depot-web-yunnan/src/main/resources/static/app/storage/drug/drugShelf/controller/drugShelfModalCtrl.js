angular.module('app.storage').controller("drugShelfModalCtrl", function ($scope, $uibModalInstance, $filter, $http,
                                                                          drugShelfService, APP_CONFIG, items, $rootScope) {
    $scope.drugShelf = {};
    // 获取列表数据
    $scope.loadData = function (id) {
        $http({
            method: 'GET',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugShelf/edit',
            params: {
                id: id
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            $scope.drugShelf = response.data;
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
    };

    // id不为空，回显.
    if (items.id != null && items.id != undefined && items.id != '') {
        $scope.isNotEdit = items.isNotEdit;
        $scope.loadData(items.id);
    } else {
        // $scope.drugShelf.storageHouseId = 1;
        $scope.drugShelf.storageHouseName = '默认药剂仓房';
    }

    var validator = null;
    // 提交表单
    $scope.save = function () {
        // 模态框的校验器，有时会为空，可能是controller先于页面加载的原因，所以要在保存时，再判断一下校验器是否为undefined.
        if (validator == null) {
            validator = $("#drugShelf-form").validate();
            $scope.save();
        } else {
            if (validator.form()) {
                $http({
                    method: 'POST',
                    url: APP_CONFIG.drugManageUrl + '/depot/business/drugShelf/save',
                    data: {
                        drugShelfJson: angular.toJson($scope.drugShelf),
                        userId: $rootScope.userInfo.userId,
                        orgId: $rootScope.orgInfo.orgId
                    }
                }).then(function successCallback(response) {
                    // 请求成功执行代码
                    if (response.data.status == 'success') {
                        alert("保存成功！");
                        $scope.cancel();
                    } else {
                        alert(response.data.msg);
                    }
                }, function errorCallback(response) {
                    // 请求失败执行代码
                    console.log(response);
                });
            }
        }
    };

    // 关闭模态窗口
    $scope.cancel = function () {
        $uibModalInstance.close();
    };

});