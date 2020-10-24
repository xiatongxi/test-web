"use strict";
angular.module('app.intelligent')
    //施药申请列表
    .controller("pesticidePlanCtrl", function($scope, $state, $rootScope, $stateParams, $uibModal, $filter, pesticidePlanService, StorehouseService, businessApprovalService) {

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.search = {storehouseId:"", warehouseId:""};
    var orgId = $rootScope.depotInfo.orgId;

    // 加载列表
    $scope.loadData = function() {
        pesticidePlanService.getPesticidePlanList($scope.pageInfo, $scope.storehouseId, orgId, "LB").then(function(data){
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
    $scope.getAddAndEdit = function(fumType,pesticideId) {
        $state.go('app.intelligent.fumigation.pesticidePlanEdit',{fumType:fumType,pesticideId:pesticideId});
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
    $scope.removeDetail = function(pesticideId) {
        pesticidePlanService.removeDetail(pesticideId).then(function (data) {
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
        params.dataType="XZ";//熏蒸过程
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
                $state.go('app.intelligent.fumigation.pesticidePlanEdit',{fumType:"add",pesticideId:result.id});
            }
            // 关闭模态框时刷新页面数据
        }, function (reason) {
            console.log(reason);
        });
    };

    // 选择要提交的什么人(熏蒸申请提交按钮).
    $scope.getChoices = function(pesticidePlan) {
        if (pesticidePlan.state > 1) {
            alert("您已经提交该数据，无法再次提交！");
            return;
        }
        $scope.modelItem = [];
        $scope.modelItem.roleName='仓储部经理';
        // 展开下一个审批人模态框.  //提交给仓储部经理
        var modalInstance = $uibModal.open({
            size : 'md',
            templateUrl: 'app/intelligent/aeration/views/approvalUser-view.html',
            controller: 'choiceUserCtrl',
            resolve: {
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return $scope.modelItem;
                }
            }
        });

        // 回调函数.
        modalInstance.result.then(function (result) {
            if (result.returnType == "submit") {
                // 审批人.
                $scope.submit(result.assignee, result.list,pesticidePlan);
            } else if (result.returnType == "isEnd") {

            }
        }, function (reason) {
            console.log(reason);
        });
    };

    //选择好下一环节处理人后点提交
    $scope.submit = function(assignee, userList,pesticidePlan) {
        pesticidePlanService.submit(pesticidePlan.id, 2).then(function(data){
            if (data.status == 'success') {
                // 请求成功后要往轨迹表里面添加流程轨迹数据
                $scope.saveBusinessApproval(pesticidePlan, assignee, userList);
                // 重新加载数据
                alert("提交成功！");
                $("#myU-+serList").modal("hide");
                $scope.loadData();
            } else {
                alert(data.msg);
            }
        },function(data){
            console.log(data);
        });
    };

    //往流程轨迹表添加轨迹数据
    $scope.saveBusinessApproval = function(pesticidePlan, assignee, userList) {
        var date = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
        $scope.businessApproval = {
            taskType : "pesticideApply",
            taskTypeName : "施药申请编号："+pesticidePlan.id,
            processInstanceId : pesticidePlan.id,
            fromDepartment : $rootScope.orgInfo.orgName,
            fromPeople : $rootScope.userInfo.userId,
            fromUserName : $rootScope.userInfo.realName,
            projectName : "施药方案申请",
            result : "待审批",
            isHide : 0,
            createTime : new Date(),
            //保存申请人的信息,时间.
            applyName : $rootScope.userInfo.realName,
            applyNameId : $rootScope.userInfo.userId,
            applyTime : new Date(),
            //下一个待审批人
            operator : assignee,  //下一个审批人的用户ID
            operatorName : assignee,  //下一审批人的name (存的id)
            taskName : "员工提交",
            taskId : pesticidePlan.id,
            content : "同意"
        };
        for (var i = 0; i < userList.length; i++) {
            var obj = userList[i];
            if (obj.userId == assignee) {
                $scope.businessApproval.operatorName = obj.realName;
            }
        }

        businessApprovalService.add($scope.businessApproval, pesticidePlan.state+1).then(function(data){
            if (data.status == 'success') {
                //标识流程数据保存成功
            }
        },function(data){
            console.log(data);
        });
    }
})

// 施药申请详情
.controller("pesticidePlanEditCtrl", function($scope, $filter, $http, $stateParams, $state, $rootScope, $uibModal, pesticidePlanService,
                                              businessApprovalService, fumigationPlanService, paymentService) {

    $scope.pesticide = {};
    $scope.storehouse = {};
    $scope.saveFlag = false;
    $scope.isNotSave = false;

    // 保管员列表.
    $scope.keeperList = [];

    $(document).ready(function() {
        $("#dtBox").DateTimePicker({
        });
    });

    $scope.loadDataById = function(id) {
        pesticidePlanService.gePesticideDeatil(id).then(function(data){
            $scope.fumigation = data.fumigationEdit;
            $scope.pesticide = data.pesticideEdit;

            $scope.fumigation.grainStorageTime = $filter('date')($scope.fumigation.grainStorageTime, "yyyy-MM-dd HH:mm:ss");
            $scope.pesticide.insectProductTime = $filter('date')($scope.pesticide.insectProductTime, "yyyy-MM-dd HH:mm:ss");
            $scope.pesticide.plannDrugStartTime = $filter('date')($scope.pesticide.plannDrugStartTime, "yyyy-MM-dd HH:mm:ss");
            $scope.pesticide.plannDrugUseUpTime = $filter('date')($scope.pesticide.plannDrugUseUpTime, "yyyy-MM-dd HH:mm:ss");
            if ($scope.fumigation.houseId != null) {
                $scope.storeData($scope.fumigation.houseId);
            }
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
            $scope.pesticide.fumigationId = id;
        },function(data){
            console.log(data);
        });
    };

    if ($stateParams.fumType == "add") {//新增
        $scope.pesticide.creater = $rootScope.userInfo.userId;
        $scope.pesticide.orgId = $rootScope.depotInfo.orgId;
        $scope.loadAddDataById($stateParams.pesticideId);
    }else if($stateParams.fumType == "detail"){//详情
        $scope.isNotSave = true;
        $("#pesticidePlan-form input").attr("disabled",true);
        $("#pesticidePlan-form select").attr("disabled",true);
        $scope.loadDataById($stateParams.pesticideId);
    }else if($stateParams.fumType == "edit"){//修改
        $("#pesticidePlan-form input").attr("disabled",false);
        $("#pesticidePlan-form select").attr("disabled",false);
        $scope.loadDataById($stateParams.pesticideId);
    }

    var validator = $("#pesticidePlan-form").validate();

    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;
        return this.optional(element)||(checkNumber.test(value));
    },"请输入正确的数字类型，最多两位小数！");

    //根据仓房号赋值仓型和仓房尺寸
    $scope.storeData = function (houseId) {
        // 获取仓房信息.仓房id.
        // var houseId = obj.fumigation.houseId;
        $scope.emptyByChangeHouseId();

        // 仓房类型
        $scope.storehouse.houseType = Number($scope.storehouseObj[houseId].storehouseType);

        // 通过仓房id，获取保管员.
        paymentService.getKepperByHouseId(houseId).then(function(data){
            $scope.keeperList = data;
        },function(data){
            console.log(data);
        });
    };

    // 置空根据houseId获取的数据.
    $scope.emptyByChangeHouseId = function () {
        $scope.storehouse.houseType = '';

        // 保管员列表.
        $scope.keeperList = [];
    };

    // 返回.
    $scope.retList = function () {
         $rootScope.back();
    };

    // 保存.
    $scope.save = function (types) {
        if (!$scope.saveFlag) {
            if (validator.form()) {
                // 设置saveFlag为true,防止重复提交.
                $scope.saveFlag = true;
                pesticidePlanService.savePesticidePlanDate($scope.pesticide).then(function(data){
                    if(types==1){
                        if (data.status == 'success') {
                            var id = 0;
                            if($stateParams.fumType == "add"){
                                //新增数据返回 id
                                id = data.pesticideId;
                            }else {
                                //修改页面
                                id = $stateParams.pesticideId;
                                types = "2";
                            }
                            pesticidePlanService.gePesticideDeatil(id).then(function(data){
                                $scope.pesticideEdit = data.pesticideEdit;
                                $scope.getChoices($scope.pesticideEdit,types);
                            },function(data){
                            });
                        } else {
                            alert("保存失败！");
                        }
                    }else{
                        if(data.status == "success"){
                            alert("保存成功！");
                            $scope.retList();
                        } else {
                            alert("保存失败！");
                            $scope.saveFlag = false;
                        }
                    }
                },function(data){
                    console.log(data);
                });
            }
        }
    }

    // 选择要提交的什么人(熏蒸申请提交按钮).
    $scope.getChoices = function(pesticideEdit,variable) {
        if (pesticideEdit.state > 1) {
            alert("您已经提交该数据，无法再次提交！");
            return;
        }
        $scope.modelItem = [];
        $scope.modelItem.roleName='仓储部经理';
        // 展开下一个审批人模态框.  //提交给仓储部经理
        var modalInstance = $uibModal.open({
            size : 'md',
            templateUrl: 'app/intelligent/aeration/views/approvalUser-view.html',
            controller: 'choiceUserCtrl',
            resolve: {
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return $scope.modelItem;
                }
            }
        });

        // 回调函数.
        modalInstance.result.then(function (result) {
            if (result.returnType == "cancel") {//点击取消则把刚才添加的数据删除
                if(variable == 1){
                    // 新增则id
                    pesticidePlanService.removeDetail(pesticideEdit.id).then(function(data){
                        if (data.message == 'success')
                            pesticideEdit.id = null;
                    },function(data){
                        console.log(data);
                    });
                }else{
                    //不做操作
                }
            } else if (result.returnType == "submit") {
                // 审批人.
                $scope.submit(result.assignee, result.list,pesticideEdit);
            } else if (result.returnType == "isEnd") {

            }
        }, function (reason) {
            console.log(reason);
        });
    }

    //选择好下一环节处理人后点提交
    $scope.submit = function(assignee, userList,pesticideEdit) {
        pesticidePlanService.submit(pesticideEdit.id, 2).then(function(data){
            if (data.status == 'success') {
                // 请求成功后要往轨迹表里面添加流程轨迹数据
                $scope.saveBusinessApprovals(pesticideEdit, assignee, userList);
                // 重新加载数据
                alert("提交成功！");
                $("#myU-+serList").modal("hide");
                $scope.retList();
            } else {
                alert(data.msg);
            }
        },function(data){
            console.log(data);
        });
    }

    //往流程轨迹表添加轨迹数据
    $scope.saveBusinessApprovals = function(pesticideEdit, assignee, userList) {
        var date = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
        $scope.businessApproval = {
            taskType : "pesticideApply",
            taskTypeName : "施药申请编号："+pesticideEdit.id,
            processInstanceId : pesticideEdit.id,
            fromDepartment : $rootScope.orgInfo.orgName,
            fromPeople : $rootScope.userInfo.userId,
            fromUserName : $rootScope.userInfo.realName,
            projectName : "施药方案申请",
            result : "待审批",
            isHide : 0,
            createTime : new Date(),
            //保存申请人的信息,时间.
            applyName : $rootScope.userInfo.realName,
            applyNameId : $rootScope.userInfo.userId,
            applyTime : new Date(),
            //下一个待审批人
            operator : assignee,  //下一个审批人的用户ID
            operatorName : assignee,  //下一审批人的name (存的id)
            taskName : "员工提交",
            taskId : pesticideEdit.id,
            content : "同意"
        };
        for (var i = 0; i < userList.length; i++) {
            var obj = userList[i];
            if (obj.userId == assignee) {
                $scope.businessApproval.operatorName = obj.realName;
            }
        }

        businessApprovalService.add($scope.businessApproval, pesticideEdit.state+1).then(function(data){
            if (data.status == 'success') {
                //标识流程数据保存成功
            }
        },function(data){
            console.log(data);
        });
    }
})

//施药审批列表
.controller("pesticideApproveCtrl", function($scope, $state, $rootScope, $stateParams, $uibModal, pesticidePlanService, StorehouseService) {

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.search = {storehouseId:"", warehouseId:""};
    var orgId = $rootScope.depotInfo.orgId;
    $scope.storehouseObj = $rootScope.storehouseObj;

    // 加载列表
    $scope.loadData = function() {
        pesticidePlanService.getPesticideApproveList($scope.pageInfo, $scope.storehouseId, orgId, $rootScope.userInfo.userId).then(function(data){
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
    $scope.getAddAndEdit = function(fumType,pesticideId) {
        $state.go('app.intelligent.fumigation.pesticideApproveEdit',{fumType:fumType,pesticideId:pesticideId});
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

// 施药审批详情
.controller("pesticideApproveEditCtrl", function($scope, $filter, $http, $stateParams, $state, $rootScope, $uibModal, businessApprovalService, pesticidePlanService, paymentService) {

    $scope.pesticide = {};
    $scope.storehouse = {};
    $scope.isAudit = false;
    $scope.isNotEdit = false;

    // 保管员列表.
    $scope.keeperList = [];

    $(document).ready(function() {
        $("#dtBox").DateTimePicker({
        });
    });

    $scope.loadDataById = function(id) {
        pesticidePlanService.gePesticideDeatil(id).then(function(data){
            $scope.fumigation = data.fumigationEdit;
            $scope.pesticide = data.pesticideEdit;

            $scope.pesticide.approvePeople = $rootScope.userInfo.realName;
            $scope.pesticide.approveDepartment = $rootScope.orgInfo.orgName;

            $scope.fumigation.grainStorageTime = $filter('date')($scope.fumigation.grainStorageTime, "yyyy-MM-dd HH:mm:ss");
            $scope.pesticide.insectProductTime = $filter('date')($scope.pesticide.insectProductTime, "yyyy-MM-dd HH:mm:ss");
            $scope.pesticide.plannDrugStartTime = $filter('date')($scope.pesticide.plannDrugStartTime, "yyyy-MM-dd HH:mm:ss");
            $scope.pesticide.plannDrugUseUpTime = $filter('date')($scope.pesticide.plannDrugUseUpTime, "yyyy-MM-dd HH:mm:ss");
            if ($scope.fumigation.houseId != null) {
                // 通过仓房id，获取保管员.
                paymentService.getKepperByHouseId($scope.fumigation.houseId).then(function(data){
                    $scope.keeperList = data;
                },function(data){
                    console.log(data);
                });
            }
        },function(data){
            console.log(data);
        });
    };

    if($stateParams.fumType == "approval"){//审核
        $scope.isAudit = true;

        $scope.loadDataById($stateParams.pesticideId);
    }else if($stateParams.fumType == "detail"){//详情
        $scope.loadDataById($stateParams.pesticideId);
    }else if($stateParams.fumType == "fumType"){//简略详情
        $scope.isNotEdit = true;

        $scope.loadDataById($stateParams.pesticideId);
    }

    // 返回.
    $scope.retList = function () {
        $rootScope.back();
    };

    // 审批菜单中选择审批人后通过、驳回、拒绝.
    $scope.audit = function (pesticide, result, content, state) {
        if(state == '0' || state == '6'){
            if(null == content || content == 'undefined'){
                alert("请填写审批意见！");
                return ;
            }else{
                content = "," + content;
            }
        }
        pesticidePlanService.submit($scope.pesticide.id, state).then(function(data){
            if (data.status == 'success') {
                // 请求成功后要往轨迹表里面添加流程轨迹数据
                if (null != result) {
                    $scope.approvalPeople = result.assignee;
                    $scope.approvalPeople_list = result.list;
                }
                $scope.saveBusinessApproval($scope.pesticide, $scope.approvalPeople, $scope.approvalPeople_list, content, state);

                // 重新加载数据
                alert("提交成功！");
                $("#myUserList").modal("hide");
            } else {
                alert(data.msg);
            }
        },function(data){
            console.log(data);
        });
    };

    // 选择审批人.
    $scope.choice = function(content, state) {
        if (state == '3') {
            // 展开通风申请详情
            $scope.modelItem = [];
            $scope.modelItem.roleName='库领导';
            // 展开下一个审批人模态框.  //提交给库领导
            var modalInstance = $uibModal.open({
                size : 'md',
                templateUrl: 'app/intelligent/aeration/views/approvalUser-view.html',
                controller: 'choiceUserCtrl',
                resolve: {
                    items: function () {
                        // 这个值会被模态框的控制器获取到
                        return $scope.modelItem;
                    }
                }
            });

            // 回调函数.
            modalInstance.result.then(function (result) {
                if (result.returnType == "cancel") {
                    // 不做操作.
                } else if (result.returnType == "submit") {
                    // 审批人.
                    $scope.audit($scope.pesticide, result, content, state);
                } else if (result.returnType == "isEnd") {
                    $scope.audit(null);
                }
            }, function (reason) {
                console.log(reason);
            });
        } else if (state == '4') {
            $scope.audit($scope.pesticide, null, content, state);
        }
    };

    //往流程轨迹表添加轨迹数据
    $scope.saveBusinessApproval = function(apply, assignee, userList, content, state) {
        var taskName = null;
        if (state == '3') {
            taskName = "仓储部经理审批";
            if(null == content || content == 'undefined'){
                content = "同意" ;
            }else{
                content = "同意" + content;
            }

        } else if (state == '4') {
            taskName = "库领导审批";
            if(null == content || content == 'undefined'){
                content = "同意" ;
            }else{
                content = "同意" + content;
            }
        } else if (state == '0') {
            if (apply.state == '2') {
                taskName = "仓储部经理审批";
            } else if (apply.state == '3') {
                taskName = "库领导审批";
            }
            if(null == content || content == 'undefined'){
                content = "驳回" ;
            }else{
                content = "驳回" + content;
            }
        } else if (state == '6') {
            if (apply.state == '2') {
                taskName = "仓储部经理审批";
            } else if (apply.state == '3') {
                taskName = "库领导审批";
            }
            if(null == content || content == 'undefined'){
                content = "拒绝" ;
            }else{
                content = "拒绝" + content;
            }
        }
        var date = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
        $scope.businessApproval = {
            taskType : "pesticideApply",
            taskTypeName : "施药申请编号："+apply.id,
            processInstanceId : apply.id,
            fromDepartment : $rootScope.orgInfo.orgName,
            fromPeople : $rootScope.userInfo.userId,
            fromUserName : $rootScope.userInfo.realName,
            projectName : "施药方案申请",
            result : "待审批",
            isHide : 0,
            createTime : new Date(),
            //保存申请人的信息,时间.
            applyName : $rootScope.userInfo.realName,
            applyNameId : $rootScope.userInfo.userId,
            applyTime : new Date(),
            //下一个待审批人
            operator : assignee,  //下一个审批人的用户ID
            operatorName : assignee,  //下一个审批人的用户ID
            taskName : taskName,
            taskId : apply.id,
            content : content
        };
        //等于4就说明是最后一个人审批通过了，否则就是自己选择的，0是驳回，6是拒绝
        if (state == '1' || state == '2' || state == '3') {
            for (var i = 0; i < userList.length; i++) {
                var obj = userList[i];
                if (obj.userId == assignee) {
                    $scope.businessApproval.operatorName = obj.realName;
                }
            }
        }
        if(state == '4'){
            $scope.businessApproval.operator = $rootScope.userInfo.userId;
        }
        businessApprovalService.add($scope.businessApproval, state).then(function(data){
            if (data.status == 'success') {
                //标识流程数据保存成功
                $scope.retList();
            }
        },function(data){
            console.log(data);
        });
    }
});