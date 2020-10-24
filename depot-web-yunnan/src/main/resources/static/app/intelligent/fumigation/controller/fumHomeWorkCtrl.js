"use strict";
angular.module('app.intelligent')
    //熏蒸作业列表
    .controller("fumHomeWorkCtrl", function($scope, $state, $rootScope, $stateParams, $uibModal, homeWorkService, StorehouseService) {

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    var orgId = $rootScope.depotInfo.orgId;

    // 加载列表
    $scope.loadData = function() {
        homeWorkService.getFumigationProcessList($scope.pageInfo, $scope.storehouseId, orgId).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();

    // 仓房列表
    $scope.loadStore = function() {
        StorehouseService.getStorehouseList($rootScope.orgInfo.orgId).then(function(data){
            $scope.storelist = data.houseList;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadStore();

    // 详情/修改/添加
    $scope.getAddAndEdit = function(fumType,homeWorkId) {
        $state.go('app.intelligent.fumigation.fumHomeWorkProcessEdit',{fumType:fumType,homeWorkId:homeWorkId});
    };

    // 翻页
    $scope.goPage = function(pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

    // 接收广播，切换仓房
    $scope.$on("storeChangeed", function(event, storehouseId) {
        $scope.storehouseId = storehouseId;
        $scope.loadData();
    });

    // 根据id删除信息
    $scope.removeDetail = function(homeWorkId,fumigationId) {
        homeWorkService.removeDetail(homeWorkId,fumigationId).then(function (data) {
            if(data.status == "success"){
                alert("删除成功");
                $scope.loadData();
            }else{
                alert("删除失败");
            }
        });
    };

    // 熏蒸方案列表.
    $scope.getAddList = function() {
        // 选择计划，选择后不能修改合同类型，粮食品种，明细品种，粮食等级，粮食性质.
        var params = [];
        params.dataType="GC";//熏蒸过程
        var uibModalInstance = $uibModal.open({
            size:'lg',
            templateUrl: 'app/intelligent/fumigation/views/plan/pesticide-list-modal.html',
            controller: 'pesticideListModalCtrl',
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
                // 新增页面
                $state.go('app.intelligent.fumigation.fumHomeWorkProcessEdit',{fumType:"add",homeWorkId:result.id});
            }
            // 关闭模态框时刷新页面数据
        }, function (reason) {
            console.log(reason);
        });
    }
})

// 熏蒸作业过程详情
.controller("fumHomeWorkEditCtrl", function($scope, $filter, $http, $stateParams, $state, $rootScope, $uibModal,
       pesticidePlanService, fumigationPlanService, paymentService, homeWorkService) {

    $scope.fumigationProcess = {};
    $scope.storehouse = {};
    $scope.saveFlag = false;
    $scope.isNotEdit = false;
    $scope.addedDetail = [];

    // 保管员列表.
    $scope.keeperList = [];

    $(document).ready(function() {
        $("#dtBox").DateTimePicker({
        });
    });

    //根据仓房号保管员.
    $scope.storeData = function (houseId) {
        // 通过仓房id，获取保管员.
        paymentService.getKepperByHouseId(houseId).then(function(data){
            $scope.keeperList = data;
        },function(data){
            console.log(data);
        });
    };

    $scope.loadDataById = function(id) {//详情，修改
        homeWorkService.getProcessDeatil(id).then(function(data){
            $scope.fumigation = data.fumigationEdit;
            if ($scope.fumigation.houseId != null) {
                $scope.storeData($scope.fumigation.houseId);
            }
            $scope.fumigationProcess = data.processEdit;
            $scope.addedDetail = data.tQtdevinfoEdit;

            $scope.fumigationProcess.firstUseDrugTime = $filter('date')($scope.fumigationProcess.firstUseDrugTime, "yyyy-MM-dd HH:mm:ss");
            $scope.fumigationProcess.firstSupplementDrugTime = $filter('date')($scope.fumigationProcess.firstSupplementDrugTime, "yyyy-MM-dd HH:mm:ss");
            $scope.fumigationProcess.lastSupplementDrugTime = $filter('date')($scope.fumigationProcess.lastSupplementDrugTime, "yyyy-MM-dd HH:mm:ss");
            $scope.fumigationProcess.taskEndTime = $filter('date')($scope.fumigationProcess.taskEndTime, "yyyy-MM-dd HH:mm:ss");
            $scope.fumigationProcess.bulkStartTime = $filter('date')($scope.fumigationProcess.bulkStartTime, "yyyy-MM-dd HH:mm:ss");
            $scope.fumigationProcess.bulkEndTime = $filter('date')($scope.fumigationProcess.bulkEndTime, "yyyy-MM-dd HH:mm:ss");
            pesticidePlanService.geByFumigationId($scope.fumigation.id).then(function(data){
                $scope.approveList = data;
            },function(data){
                console.log(data);
            });
        },function(data){
            console.log(data);
        });
    };

    $scope.loadAddDataById = function(id) {//新增
        fumigationPlanService.getFumigationPlanDeatil(id).then(function(data){
            $scope.fumigation = data.fumigationEdit;
            if ($scope.fumigation.houseId != null) {
                $scope.storeData($scope.fumigation.houseId);
            }
            $scope.fumigationProcess.fumigationId = id;
        },function(data){
            console.log(data);
        });

        pesticidePlanService.geByFumigationId(id).then(function(data){
            $scope.approveList = data;
        },function(data){
            console.log(data);
        });
    };

    if ($stateParams.fumType == "add") {//新增
        $scope.fumigationProcess.creater = $rootScope.userInfo.userId;
        $scope.fumigationProcess.orgId = $rootScope.depotInfo.orgId;
        $scope.loadAddDataById($stateParams.homeWorkId);
    }else if($stateParams.fumType == "detail"){//详情
        $scope.isNotSave = true;
        $scope.isNotEdit = true;
        $("#fumigationProcess-form input").attr("disabled",true);
        $("#fumigationProcess-form select").attr("disabled",true);
        $scope.loadDataById($stateParams.homeWorkId);
    }else if($stateParams.fumType == "edit"){//修改
        $("#fumigationProcess-form input").attr("disabled",false);
        $("#fumigationProcess-form select").attr("disabled",false);
        $scope.loadDataById($stateParams.homeWorkId);
    }

    var validator = $("#fumigationProcess-form").validate();

    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
        return this.optional(element)||(checkNumber.test(value));
    },"请输入大于0的数字，最多两位小数！");
    
    // 自定义验证，验证熏蒸开始时间不得早于熏蒸结束时间
    $.validator.addMethod("validDrugTime",function(value,element, params) {
    	var beginTime = $scope.fumigationProcess.firstUseDrugTime;
    	var endTime = $scope.fumigationProcess.taskEndTime;
    	if(endTime <= beginTime){
    		return this.optional(element)|| false;
    	}else{
    		return this.optional(element)|| true;
    	}
    },"熏蒸开始时间不得早于结束时间！");
    
    // 自定义验证，验证散气时间不得早于熏蒸开始时间和熏蒸结束时间
    $.validator.addMethod("validTime",function(value,element, params) {
    	var beginTime = $scope.fumigationProcess.firstUseDrugTime;
    	var endTime = $scope.fumigationProcess.taskEndTime;
    	if(value <= beginTime || value <= endTime){
    		return this.optional(element)|| false;
    	}else{
    		return this.optional(element)|| true;
    	}
    },"散气时间不得早于熏蒸开始时间和结束时间！");

    // 气体检测信息添加
    $scope.addRow = function() {
        var params = [];
        params.houseId = $scope.fumigation.houseId;
        var uibModalInstance = $uibModal.open({
            size:'lg',
            templateUrl: 'app/intelligent/fumigation/views/homework/dcsqtinfo-list-modal.html',
            controller: 'dcsqtinfoListModalCtrl',
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
                $scope.addedDetail.push(result);
            }
            // 关闭模态框时刷新页面数据
        }, function (reason) {
            console.log(reason);
        });
    };

    // 气体检测信息删除一行
    $scope.deleteRow = function(detail) {
        var index = $scope.addedDetail.indexOf(detail);
        if (index != -1) {
            $scope.addedDetail.splice(index, 1);
        }
    };

    // 返回.
    $scope.retList = function () {
        $rootScope.back();
    };

    // 保存.
    $scope.save = function () {
        if (!$scope.saveFlag) {
            if (validator.form()) {
                // 设置saveFlag为true,防止重复提交.
                $scope.saveFlag = true;
                var QtId = "";
                for(var i = 0;i<$scope.addedDetail.length;i++){
                    QtId = QtId + $scope.addedDetail[i].id + ",";//气体id
                }
                $scope.fumigationProcess.dcsqtinfoId = QtId.substring(0,QtId.length-1);

                homeWorkService.saveFumigationProcessDate($scope.fumigationProcess).then(function(data){
                    if(data.status == "success"){
                        alert("保存成功！");
                        $scope.retList();
                    } else {
                        alert("保存失败！");
                        $scope.saveFlag = false;
                    }
                },function(data){
                    console.log(data);
                });
            }
        }
    }
})
//熏蒸善后列表
.controller("fumHomeWorkAfterCtrl", function($scope, $state, $rootScope, $stateParams, $uibModal, homeWorkService, StorehouseService) {

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    var orgId = $rootScope.depotInfo.orgId;

    // 加载列表
    $scope.loadData = function() {
        homeWorkService.getFumigationAfterList($scope.pageInfo, $scope.storehouseId, orgId).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();

    // 仓房列表
    $scope.loadStore = function() {
        StorehouseService.getStorehouseList($rootScope.orgInfo.orgId).then(function(data){
            $scope.storelist = data.houseList;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadStore();

    // 详情/修改/添加
    $scope.getAddAndEdit = function(fumType,homeWorkId) {
        $state.go('app.intelligent.fumigation.fumHomeWorkAfterEdit',{fumType:fumType,homeWorkId:homeWorkId});
    };

    // 翻页
    $scope.goPage = function(pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

    // 接收广播，切换仓房
    $scope.$on("storeChangeed", function(event, storehouseId) {
        $scope.storehouseId = storehouseId;
        $scope.loadData();
    });

    // 根据id删除信息
    $scope.removeDetail = function(homeWorkId,fumigationId) {
        homeWorkService.removeAfterDetail(homeWorkId,fumigationId).then(function (data) {
            if(data.status == "success"){
                alert("删除成功");
                $scope.loadData();
            }else{
                alert("删除失败");
            }
        });
    };

    // 熏蒸方案列表.
    $scope.getAddList = function() {
        // 选择计划，选择后不能修改合同类型，粮食品种，明细品种，粮食等级，粮食性质.
        var params = [];
        params.dataType="SH";//熏蒸过程
        var uibModalInstance = $uibModal.open({
            size:'lg',
            templateUrl: 'app/intelligent/fumigation/views/plan/pesticide-list-modal.html',
            controller: 'pesticideListModalCtrl',
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
                // 新增页面
                $state.go('app.intelligent.fumigation.fumHomeWorkAfterEdit',{fumType:"add",homeWorkId:result.id});
            }
            // 关闭模态框时刷新页面数据
        }, function (reason) {
            console.log(reason);
        });
    }
})
// 熏蒸作业善后详情
.controller("fumHomeWorkAfterEditCtrl", function($scope, $filter, $http, $stateParams, $state, $rootScope, $uibModal,
                                            pesticidePlanService, fumigationPlanService, paymentService, homeWorkService) {

    $scope.fumigationAfter = {};
    $scope.storehouse = {};
    $scope.saveFlag = false;
    $scope.isNotEdit = false;

    // 保管员列表.
    $scope.keeperList = [];

    $(document).ready(function() {
        $("#dtBox").DateTimePicker({
        });
    });

    //根据仓房号保管员.
    $scope.storeData = function (houseId) {
        // 通过仓房id，获取保管员.
        paymentService.getKepperByHouseId(houseId).then(function(data){
            $scope.keeperList = data;
        },function(data){
            console.log(data);
        });
    };

    $scope.loadDataById = function(id) {//详情，修改
        homeWorkService.getAfterDeatil(id).then(function(data){
            $scope.fumigationAfter = data.afterEdit;//熏蒸善后数据
            $scope.fumigation = data.fumigationEdit;//熏蒸方案数据
            if ($scope.fumigation.houseId != null) {
                $scope.storeData($scope.fumigation.houseId);
            }
            $scope.fumigationProcess = data.processEdit;//熏蒸作业过程数据

            $scope.fumigationProcess.bulkStartTime = $filter('date')($scope.fumigationProcess.bulkStartTime, "yyyy-MM-dd HH:mm:ss");
            $scope.fumigationProcess.bulkEndTime = $filter('date')($scope.fumigationProcess.bulkEndTime, "yyyy-MM-dd HH:mm:ss");
            $scope.fumigationAfter.checkInsectCageTime = $filter('date')($scope.fumigationAfter.checkInsectCageTime, "yyyy-MM-dd HH:mm:ss");
            pesticidePlanService.geByFumigationId($scope.fumigation.id).then(function(data){
                $scope.approveList = data;//熏蒸虫害数据
            },function(data){
                console.log(data);
            });
        },function(data){
            console.log(data);
        });
    };

    $scope.loadAddDataById = function(id) {//新增
        fumigationPlanService.getFumigationPlanDeatil(id).then(function(data){
            $scope.fumigation = data.fumigationEdit;
            if ($scope.fumigation.houseId != null) {
                $scope.storeData($scope.fumigation.houseId);
            }
            $scope.fumigationAfter.fumigationId = id;
        },function(data){
            console.log(data);
        });

        homeWorkService.getFumIdByProcessDeatil(id).then(function(data){
            $scope.fumigationProcess = data.processEdit[0];
        },function(data){
            console.log(data);
        });

        pesticidePlanService.geByFumigationId(id).then(function(data){
            $scope.approveList = data;
        },function(data){
            console.log(data);
        });
    };

    if ($stateParams.fumType == "add") {//新增
        $scope.fumigationAfter.creater = $rootScope.userInfo.userId;
        $scope.fumigationAfter.orgId = $rootScope.depotInfo.orgId;
        $scope.loadAddDataById($stateParams.homeWorkId);
        $scope.fumigationAfter.xzxgpj = "0";
    }else if($stateParams.fumType == "detail"){//详情
        $scope.isNotSave = true;
        $scope.isNotEdit = true;
        $scope.loadDataById($stateParams.homeWorkId);
    }else if($stateParams.fumType == "edit"){//修改
        $scope.loadDataById($stateParams.homeWorkId);
    }

    var validator = $("#fumigationAfter-form").validate();

    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;
        return this.optional(element)||(checkNumber.test(value));
    },"请输入正确的数字类型，最多两位小数！");

    // 返回.
    $scope.retList = function () {
        $rootScope.back();
    };

    // 保存.
    $scope.save = function () {
        if (!$scope.saveFlag) {
            if (validator.form()) {
                // 设置saveFlag为true,防止重复提交.
                $scope.saveFlag = true;
                homeWorkService.saveFumigationAfterDate($scope.fumigationAfter).then(function(data){
                    if(data.status == "success"){
                        alert("保存成功！");
                        $scope.retList();
                    } else {
                        alert("保存失败！");
                        $scope.saveFlag = false;
                    }
                },function(data){
                    console.log(data);
                });
            }
        }
    }
})
//作业列表
.controller("homeWorkQueryCtrl", function($scope, $state, $rootScope, $stateParams, $uibModal, homeWorkService, StorehouseService) {

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    var orgId = $rootScope.depotInfo.orgId;
    $scope.storehouseObj = $rootScope.storehouseObj;

    // 加载列表
    $scope.loadData = function() {
        homeWorkService.getHomeWorkQueryList($scope.pageInfo, $scope.storehouseId, orgId).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();

    // 仓房列表
    $scope.loadStore = function() {
        StorehouseService.getStorehouseList($rootScope.orgInfo.orgId).then(function(data){
            $scope.storelist = data.houseList;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadStore();

    // 详情
    $scope.getHomeWorkQueryEdit = function(planType,planId) {
        if(planType == 1){//作业过程
            $state.go('app.intelligent.fumigation.fumHomeWorkProcessEdit',{fumType:"detail",homeWorkId:planId});
        }else if(planType == 2){//作业善后
            $state.go('app.intelligent.fumigation.fumHomeWorkAfterEdit',{fumType:"detail",homeWorkId:planId});
        }
    };

    // 翻页
    $scope.goPage = function(pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

    // 接收广播，切换仓房
    $scope.$on("storeChangeed", function(event, storehouseId) {
        $scope.storehouseId = storehouseId;
        $scope.loadData();
    });
})