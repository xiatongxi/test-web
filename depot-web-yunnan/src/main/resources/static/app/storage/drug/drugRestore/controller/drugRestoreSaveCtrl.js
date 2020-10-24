angular.module('app.storage').controller("drugRestoreSaveCtrl", function($scope, $rootScope, $filter, $http, $state,drugStandingBookService,
                                                                          $stateParams, $uibModal,drugRestoreService, drugShelfService,drugStorageService,drugUseApplyService) {
    $scope.drugRestore = {};
	// 加载数据.
    $scope.loadDataById = function(id) {
        drugRestoreService.loadDataById(id).then(function(data){
            $scope.drugRestore = data.drugRestore;
            $scope.addedDetail = data.detailList;
            $scope.drugRestore.registerTime = $filter('date')($scope.drugRestore.registerTime, "yyyy-MM-dd"); //登记时间
        },function(data){
        });
    };
    
    // 获取货架号列表.
    $scope.getDrugShelfList = function() {
    	drugShelfService.getPageInfo().then(function(data){
            $scope.drugShelfList = data;
        },function(data){
        });
    };
    $scope.getDrugShelfList();

    // 获取药剂生产厂家
    $scope.getManufacturerData = function () {
        drugStorageService.getManufacturer().then(function(data){
            $scope.drugManufacturerList = data;
        },function(data){
        });
    };
    $scope.getManufacturerData();

    $scope.isNotEdit = false;
    
    if ($scope.drugRestore == null) {
        $scope.drugRestore = {};
    }

    if ($stateParams.id != 0) {
        $scope.isNotEdit = $stateParams.isNotEdit;
        //查看页面查询后台数据，并且赋值页面
        $scope.loadDataById($stateParams.id);
    }
    
    $('input[readOnlyButValid]').on("focusin", function() {
        $(this).prop('readOnly', true);
    });

	$('input[readOnlyButValid]').on("focusout", function() {
		$(this).prop('readOnly', false); 
	});
    
    var validator = $("#drugRestore-form").validate();
    
    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^[1-9]\d*$/g; // 不为0的正整数
        return this.optional(element)||(checkNumber.test(value));  
    },"请输入正确的不为0的数字整数！");

    // 获取药品信息列表.
    $scope.getDrugInfoList = function() {
        var params = [];
        params.restoring = '';
        var modalInstance = $uibModal.open({
            size:'lg',
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

        modalInstance.result.then(function (result) {
            if (result != null) {
                // 获取明细信息.药剂标号和审批同意(drugNumber,state 2同意)
                drugUseApplyService.getDetailPageInfo(result.id).then(function(data) {
                    // 循环删除计划明细中的id，有这个id会导致删除的时候误认为是删除已有明细.
                    for (var i=0; i< data.list.length; i++) {
                        data.list[i].id = "";
                    }
                    $scope.addedDetail = data.list;
                });
                //领用编号
                $scope.drugRestore.applyNumber=result.applyNumber;
                // 药剂种类
                $scope.drugRestore.drugKind = result.drugKind;
                // 药剂名称
                $scope.drugRestore.drugName = result.drugName;
            }
            // 关闭模态框时刷新页面数据
        }, function (reason) {
            console.log(reason);
        });
        //获取登录人为登记人,登记日期
        $scope.drugRestore.registerPerson = $rootScope.userInfo.userId;
        $scope.drugRestore.registerTime = $filter('date')(new Date(), "yyyy-MM-dd");
    };

    // 获取货架号台账列表.
    $scope.getShelfList = function() {
        drugStandingBookService.getShelfStandingBookList($scope.drugRestore.drugKind, $scope.drugRestore.drugName).then(function(data) {
            // 清空.
            if (data.status == "success") {
                $scope.addedDetail = [];
                $scope.shelfStandingBookList = data.shelfStandingBookList;
                for (var i=0; i < $scope.shelfStandingBookList.length; i++) {
                    var shelfStandingBook = $scope.shelfStandingBookList[i];

                    var detail = {};
                    detail.drugInfoId = shelfStandingBook.drugInfoId;
                    detail.drugNumber = shelfStandingBook.drugNumber;
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

    // 效验数量
    $scope.checkNumber = function(){
        for (var i = 0; i < $scope.addedDetail.length; i++) {
            if ($scope.addedDetail[i].useCount != undefined && $scope.addedDetail[i].useCount != "" && $scope.addedDetail[i].useCount != null) {
                if ($scope.addedDetail[i].useCount < $scope.addedDetail[i].restoreNumber) {
                    alert("归还数量不能大于领用数量!");
                    $scope.addedDetail[i].restoreNumber = null;
                    return;
                }
                // 归还数量
                var sumCount = 0;
                var useCount = parseInt($scope.addedDetail[i].restoreNumber, 10);
                sumCount += useCount;
                $scope.drugRestore.useCount = sumCount;
            }
        }

    };

    // 返回.
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go("app.storage.drug.restore");
        }
    };
    
    // 保存.
    $scope.save = function() {
        if (validator.form()) {
            drugRestoreService.saveData($scope.drugRestore,$scope.addedDetail).then(function (data) {
                if (data.status == "success") {
                    alert("保存成功");
                    $scope.retList();
                } else {
                    alert("保存失败");
                }
            });
        }
    };

});
