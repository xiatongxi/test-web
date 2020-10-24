angular.module('app.storage').controller("drugStorageSaveCtrl", function ($scope, $rootScope, $filter, $http, $state, $stateParams, $uibModal,
                                                                           drugStorageService, drugShelfService, commonUtilService, APP_CONFIG) {
    // 加载数据.
    $scope.loadDataById = function (id) {
        drugStorageService.loadDataById(id).then(function (data) {
            $scope.drugStorage = data;
            $scope.drugStorage.productionDate = $filter('date')($scope.drugStorage.productionDate, "yyyy-MM-dd");
            $scope.drugStorage.expireDate = $filter('date')($scope.drugStorage.expireDate, "yyyy-MM-dd");
            $scope.drugStorage.createTime = $filter('date')($scope.drugStorage.createTime, "yyyy-MM-dd");
        }, function (data) {
        });
    };

    // 获取货架号列表.
    $scope.getDrugShelfList = function () {
        drugShelfService.getPageInfo().then(function (data) {
            $scope.drugShelfList = data;
        }, function (data) {
        });
    };
    $scope.getDrugShelfList();


    $scope.isNotEdit = false;

    if ($scope.drugStorage == null) {
        $scope.drugStorage = {};
    }

    if ($stateParams.id != 0) {
        $scope.isNotEdit = $stateParams.isNotEdit;
        //新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
        $scope.loadDataById($stateParams.id);
    }

    // 生产日期过期日期效验
    $scope.changeDate = function () {
        if ($scope.drugStorage.productionDate >= $scope.drugStorage.expireDate) {
            alert("生产日期不能小于等于过期日期");
            $scope.drugStorage.expireDate = null;
        }
    };

    $('input[readOnlyButValid]').on("focusin", function () {
        $(this).prop('readOnly', true);
    });

    $('input[readOnlyButValid]').on("focusout", function () {
        $(this).prop('readOnly', false);
    });

    var validator = $("#drugStorage-form").validate();

    // 自定义验证，验证数字
    $.validator.addMethod("validNumber", function (value, element, params) {
        var checkNumber = /^[1-9]\d*$/g; // 不为0的正整数
        return this.optional(element) || (checkNumber.test(value));
    }, "请输入正确的不为0的数字整数！");


    // 获取药品信息列表.
    $scope.getDrugInfoList = function () {
        var modalInstance = $uibModal.open({
            size: 'lg',
            templateUrl: 'app/business/util/views/drugInfo-list-modal.html',
            controller: 'drugInfoListModalCtrl',
            resolve: {}
        });

        modalInstance.result.then(function (result) {
            if (result != undefined && result != null) {
                $scope.drugStorage.drugNumber = result.drugNumber;
                $scope.drugStorage.drugKind = result.drugKind;
                $scope.drugStorage.drugName = result.drugName;
                $scope.drugStorage.drugType = result.drugType;
                $scope.drugStorage.drugPacking = result.drugPacking;
                $scope.drugStorage.drugSpecification = result.drugSpecification;
                $scope.drugStorage.drugInfoId = result.id;
                $scope.drugStorage.controlMan = $rootScope.userInfo.realName;
            }
        }, function (reason) {
            console.log(reason);
        });
    };


    // 返回.
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
            $rootScope.back();
        } else {
            $state.go("app.storage.drug.storage");
        }
    };

    // 保存.
    $scope.save = function () {
        if (validator.form()) {
            $http({
                method: 'POST',
                url: APP_CONFIG.drugManageUrl + '/depot/business/drugStorage/save',
                data: {
                    drugStorageJson: angular.toJson($scope.drugStorage),
                    userId: $rootScope.userInfo.userId,
                    orgId: $rootScope.orgInfo.orgId
                }
            }).then(function successCallback(response) {
                if (response.data.status == "success") {
                    alert("保存成功！");
                    $scope.retList();
                } else {
                    alert(response.data.msg);
                }
            }, function errorCallback(response) {
                // 请求失败执行代码.

            });
        }
    };
    
});
