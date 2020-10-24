angular.module('app.storage').controller("drugUseSaveCtrl", function ($scope, $rootScope, $filter, $http, $state, $stateParams,
                                                                       $uibModal, drugUseService, drugStandingBookService, drugShelfService, commonUtilService, APP_CONFIG, drugUseApplyService) {
    $scope.drugUse = {};
    // 加载数据.
    $scope.loadDataById = function (id) {
        drugUseService.loadDataById(id).then(function (data) {
            $scope.drugUse = data.drugUse;
            $scope.addedDetail = data.detailList;
            $scope.drugUse.useDate = $filter('date')($scope.drugUse.useDate, "yyyy-MM-dd");
            $scope.drugUse.createTime = $filter('date')($scope.drugUse.createTime, "yyyy-MM-dd");
        }, function (data) {
        });
    };

    // 获取货架号数据
    $scope.getShelfData = function () {
        drugShelfService.getShelfMap().then(function (data) {
            $scope.shelfMap = data;
        }, function (data) {
            console.log(data);
        });
    };
    $scope.getShelfData();

    $scope.isNotEdit = false;

    if ($scope.drugUse == null) {
        $scope.drugUse = {};
    }

    // 用于存放 子表数据 的数组.
    $scope.addedDetail = [];

    if ($stateParams.id != 0) {
        $scope.isNotEdit = $stateParams.isNotEdit;
        //新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
        $scope.loadDataById($stateParams.id);
    }

    var validator = $("#drugUse-form").validate();

    // 自定义验证，验证数字
    $.validator.addMethod("validNumber", function (value, element, params) {
        var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;
        return this.optional(element) || (checkNumber.test(value));
    }, "请输入正确的数字类型，最多两位小数！");

    $scope.saveFlag = false;

    // 获取货架号台账列表.
    $scope.getShelfList = function () {
        drugStandingBookService.getShelfStandingBookList($scope.drugUse.drugKind, $scope.drugUse.drugName).then(function (data) {
            // 清空.
            $scope.addedDetail = [];
            if (data.status == "success") {
                $scope.shelfStandingBookList = data.shelfStandingBookList;
                for (var i = 0; i < $scope.shelfStandingBookList.length; i++) {
                    var shelfStandingBook = $scope.shelfStandingBookList[i];

                    var detail = {};
                    detail.drugInfoId = shelfStandingBook.drugInfoId;
                    detail.drugNumber = shelfStandingBook.drugNumber;
                    detail.drugKind = shelfStandingBook.drugKind;
                    detail.drugName = shelfStandingBook.drugName;
                    detail.drugType = shelfStandingBook.drugType;
                    detail.drugPacking = shelfStandingBook.drugPacking;
                    detail.manufacturer = shelfStandingBook.manufacturer;
                    detail.drugSpecification = shelfStandingBook.drugSpecification;
                    detail.shelfId = shelfStandingBook.shelfId;
                    detail.shelfAmount = shelfStandingBook.shelfAmount;

                    $scope.addedDetail.push(detail);
                }
            }
        });
    };

    // 计算总数量.
    $scope.sumUseCount = function () {
        var sumCount = 0;
        for (var i = 0; i < $scope.addedDetail.length; i++) {
            if ($scope.addedDetail[i].useCount != undefined && $scope.addedDetail[i].useCount != "" && $scope.addedDetail[i].useCount != null) {
                var useCount = parseInt($scope.addedDetail[i].useCount, 10);
                sumCount += useCount;
            }
        }
        $scope.drugUse.sumCount = sumCount;
    };

    // 返回.
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
            $rootScope.back();
        } else {
            $state.go("app.storage.drug.use");
        }
    };

    // 保存.
    $scope.save = function () {
        if (!$scope.saveFlag) {

            if (validator.form()) {
                $scope.saveFlag = true;

                $scope.details = [];
                for (var i = $scope.addedDetail.length - 1; i >= 0; i--) {
                    if ($scope.addedDetail[i].useCount != undefined && $scope.addedDetail[i].useCount != null && $scope.addedDetail[i].useCount != '') {
                        $scope.details.push($scope.addedDetail[i]);
                    }
                }
                if ($scope.drugUse.sumCount == undefined || $scope.drugUse.sumCount == null || $scope.drugUse.sumCount == '') {
                    alert("领用总数量不能为空！");
                    $scope.saveFlag = false;
                    return;
                }

                $http({
                    method: 'POST',
                    url: APP_CONFIG.drugManageUrl + '/depot/business/drugUse/save',
                    data: {
                        drugUseJson: angular.toJson($scope.drugUse),
                        drugUseDetailJson: angular.toJson($scope.details),
                        userId: $rootScope.userInfo.userId,
                        orgId: $rootScope.orgInfo.orgId
                    }
                }).then(function successCallback(response) {
                    if (response.data.status == "success") {
                        alert("保存成功！");
                        //更新领用申请数据
                        $scope.retList();
                    } else {
                        alert("保存失败！");
                        $scope.saveFlag = false;
                    }
                }, function errorCallback(response) {
                    // 请求失败执行代码
                });
            }
        }
    };

    //选择已申请的药剂领用-领用申请列表
    $scope.getPlan = function () {
        // 选择申请编号，领用申请编号,药剂名称,药剂种类,申请人,申请日期
        var params = [];
        var uibModalInstance = $uibModal.open({
            size: 'lg',
            templateUrl: 'app/business/util/views/useApply-list-modal.html',
            controller: 'useApplyListModalCtrl',
            resolve: {
                // items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params;
                }
            }
        });
        uibModalInstance.result.then(function (result) {
            if (result != null) {
                // 获取明细信息.药剂标号和审批同意(drugNumber,state 2同意)
                drugUseApplyService.getDetailPageInfo(result.id).then(function (data) {
                    // 循环删除计划明细中的id，有这个id会导致删除的时候误认为是删除已有明细.
                    for (var i = 0; i < data.list.length; i++) {
                        data.list[i].id = "";
                    }
                    $scope.addedDetail = data.list;

                    // 计算合同数量.
                    $scope.sumUseCount();
                });
                // 说明选择了计划.
                if ($scope.drugUse == null || $scope.drugUse == undefined) {
                    $scope.drugUse = {};
                }
                //领用编号
                $scope.drugUse.applyNumber = result.applyNumber;
                //药剂种类
                $scope.drugUse.drugKind = result.drugKind;
                //药剂名称
                $scope.drugUse.drugName = result.drugName;
                //领用数量
                //领用人
                $scope.drugUse.creater = result.creater;
                //领用部门
                $scope.drugUse.useDepartment = result.useDepartment;
                //领用日期
                $scope.useLocalDate = function () {
                    var date = new Date();
                    var years = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var strDate = date.getDate();
                    var strHours = date.getHours(); //小时
                    var strMinutes = date.getMinutes(); //分
                    var strSeconds = date.getSeconds(); //秒
                    var currentDate = years + "-" + month + "-" + strDate + " " + strHours + ":" + strMinutes + ":" + strSeconds;
                    return currentDate;
                };
                $scope.drugUse.useDate = $scope.useLocalDate();
                //记账人
                $scope.drugUse.user = $rootScope.userInfo.realName;
            }
            // 关闭模态框时刷新页面数据
        }, function (reason) {
            console.log(reason);
        });
    };

    // 清空计划.
    $scope.removePlan = function () {
        //领用编号
        $scope.drugUse.applyNumber = null;
        //药剂种类
        $scope.drugUse.drugKind = null;
        //药剂名称
        $scope.drugUse.drugName = null;
        //领用人
        $scope.drugUse.user = null;
        //领用部门
        $scope.drugUse.useDepartment = null;
        //领用日期
        $scope.drugUse.useDate = null;
        //记账人
        $scope.drugUse.realName = null;
        //清空明细.
        $scope.addedDetail = [];
        //清空领用详情
        $scope.drugUse = {};
    };

});
