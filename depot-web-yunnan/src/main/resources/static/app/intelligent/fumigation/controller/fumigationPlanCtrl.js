"use strict";
angular.module('app.intelligent')
    //熏蒸申请列表
    .controller("fumigationPlanCtrl", function($scope, $state, $rootScope, $uibModal, $filter, fumigationPlanService, StorehouseService, businessApprovalService) {

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    var orgId = $rootScope.depotInfo.orgId;
    $scope.storehouseObj = $rootScope.storehouseObj;

    // 加载列表
    $scope.loadData = function() {
        fumigationPlanService.getFumigationPlanList($scope.pageInfo, $scope.storehouseId, orgId, "LB").then(function(data){
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
    $scope.getAddAndEdit = function(fumType,fumigationId) {
        $state.go('app.intelligent.fumigation.fumigationPlanEdit',{fumType:fumType,fumigationId:fumigationId});
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
    $scope.removeDetail = function(fumigationId) {
        fumigationPlanService.removeDetail(fumigationId).then(function (data) {
            if(data.status == "success"){
                alert("删除成功");
                $scope.loadData();
            }else{
                alert("删除失败");
            }
        });
    };

    // 选择要提交的什么人(熏蒸申请提交按钮).
    $scope.getChoices = function(fumigationPlan) {
        if (fumigationPlan.state > 1) {
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
                $scope.submit(result.assignee, result.list,fumigationPlan);
            } else if (result.returnType == "isEnd") {

            }
        }, function (reason) {
            console.log(reason);
        });
    };

    //选择好下一环节处理人后点提交
    $scope.submit = function(assignee, userList,fumigationPlan) {
        fumigationPlanService.submit(fumigationPlan.id, 2).then(function(data){
            if (data.status == 'success') {
                // 请求成功后要往轨迹表里面添加流程轨迹数据
                $scope.saveBusinessApproval(fumigationPlan, assignee, userList);
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
    $scope.saveBusinessApproval = function(fumigationPlan, assignee, userList) {
        var date = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
        $scope.businessApproval = {
            taskType : "fumigationApply",
            taskTypeName : "熏蒸申请编号："+fumigationPlan.id,
            processInstanceId : fumigationPlan.id,
            fromDepartment : $rootScope.orgInfo.orgName,
            fromPeople : $rootScope.userInfo.userId,
            fromUserName : $rootScope.userInfo.realName,
            projectName : "熏蒸方案申请",
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
            taskId : fumigationPlan.id,
            content : "同意"
        };
        for (var i = 0; i < userList.length; i++) {
            var obj = userList[i];
            if (obj.userId == assignee) {
                $scope.businessApproval.operatorName = obj.realName;
            }
        }

        businessApprovalService.add($scope.businessApproval, fumigationPlan.state+1).then(function(data){
            if (data.status == 'success') {
                //标识流程数据保存成功
            }
        },function(data){
            console.log(data);
        });
    }
})

// 熏蒸申请详情
.controller("fumigationPlanEditCtrl", function($scope, $filter, $http, $stateParams, $state, $rootScope, $uibModal, fumigationPlanService, paymentService,
                                               codeRuleService, businessApprovalService) {

    $scope.fumigation = {};
    $scope.pesticide = {};
    $scope.storehouse = {};
    $scope.fumigationNumber = {};
    $scope.saveFlag = false;
    $scope.isNotSave = false;
    $scope.fumPlanId = "";

    $(document).ready(function() {
        $("#dtBox").DateTimePicker({
        });
    });

    $scope.loadDataById = function(id) {
        fumigationPlanService.getFumigationPlanDeatil(id).then(function(data){
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

    if ($stateParams.fumType == "add") {//新增
        $scope.fumigation.creater = $rootScope.userInfo.userId;
        $scope.fumigation.orgId = $rootScope.depotInfo.orgId;

        $scope.pesticide.creater = $rootScope.userInfo.userId;
        $scope.pesticide.orgId = $rootScope.depotInfo.orgId;

        //获取熏蒸编号
        codeRuleService.getCodeValueByType("fumigationProgram",$rootScope.orgInfo.orgId).then(function(data) {
            if (data.status == "success") {
                $scope.fumigationNumber.status = "success";
                $scope.fumPlanId = data.codeValue;
            } else if (data.status == "error") {
                $scope.fumigationNumber.msg = data.msg;
                $scope.fumigationNumber.status = "error";
                if(confirm("熏蒸编号有误！该页面无法保存！原因：" + $scope.fumigationNumber.msg + " 是否返回到列表页！")) {
                    $scope.retList();
                }
            }
        });
    }else if($stateParams.fumType == "detail"){//详情
        $scope.isNotSave = true;
        $("#fumigationPlan-form input").attr("disabled",true);
        $("#fumigationPlan-form select").attr("disabled",true);
        $scope.loadDataById($stateParams.fumigationId);
    }else if($stateParams.fumType == "edit"){//修改
        $("#fumigationPlan-form input").attr("disabled",false);
        $("#fumigationPlan-form select").attr("disabled",false);
        $scope.loadDataById($stateParams.fumigationId);
    }

    var validator = $("#fumigationPlan-form").validate();

    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
        return this.optional(element)||(checkNumber.test(value));
    },"请输入大于0的数字，最多两位小数！");
    
    // 自定义验证，验证熏蒸次数
    $.validator.addMethod("validFrequency",function(value,element, params) {
    	var checkNumber = /^\+?[1-9]\d*$/;
    	return this.optional(element)||(checkNumber.test(value));
    },"请输入大于0的整数！");

    //根据仓房号赋值仓型和仓房尺寸
    $scope.storeData = function (houseId) {
        // 获取仓房信息.仓房id.
        // var houseId = obj.fumigation.houseId;
        $scope.emptyByChangeHouseId();

        // 仓房类型
        $scope.storehouse.houseType = Number($scope.storehouseObj[houseId].storehouseType);
        // 仓房结构_地面
        $scope.storehouse.houseGround = $scope.storehouseObj[houseId].ground;
        // 仓房结构_墙体
        $scope.storehouse.houseWall = $scope.storehouseObj[houseId].wall;
        // 仓房结构_屋顶
        $scope.storehouse.houseRoof = $scope.storehouseObj[houseId].roof;
        // 仓房结构_房架
        $scope.storehouse.houseFrame = $scope.storehouseObj[houseId].house;

        // 通过仓房id，获取保管员.
        paymentService.getKepperByHouseId(houseId).then(function(data){
            $scope.keeperList = data;
        },function(data){
            console.log(data);
        });
        
        //通过仓房获取害虫检查单号
        fumigationPlanService.getJcd(houseId,$stateParams.fumigationId).then(function(data){
        	$scope.jcdList = data;
        },function(data){
        	console.log(data);
        });
        
    };

    // 置空根据houseId获取的数据.
    $scope.emptyByChangeHouseId = function () {
        $scope.storehouse.houseType = '';
        $scope.storehouse.houseGround = '';
        $scope.storehouse.houseWall = '';
        $scope.storehouse.houseRoof = '';
        $scope.storehouse.houseFrame = '';

        // 保管员列表.
        $scope.keeperList = [];
    };

    // 返回.
    $scope.retList = function () {
        $rootScope.back();
        // $state.go('app.intelligent.fumigation.fumigationPlanList');
    };

    // 保存.
    $scope.save = function (types) {
        if (!$scope.saveFlag) {
            if (validator.form()) {
                // 设置saveFlag为true,防止重复提交.
                $scope.saveFlag = true;
                //保存熏蒸数据
                fumigationPlanService.saveFumigationPlanDate($scope.fumigation,$scope.pesticide,$scope.fumPlanId).then(function(data){
                    if(types==1){
                        if (data.status == 'success') {
                            var id = 0;
                            if($stateParams.fumigationId == ""){
                                //新增数据返回 id
                                id = data.fumigationId;
                            }else {
                                //修改页面
                                id = $stateParams.fumigationId;
                                types = "2";
                            }
                            fumigationPlanService.getFumigationPlanDeatil(id).then(function(data){
                                $scope.fumigationEdit = data.fumigationEdit;
                                $scope.getChoices($scope.fumigationEdit,types);
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
    $scope.getChoices = function(fumigationEdit,variable) {
        if (fumigationEdit.state > 1) {
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
                    fumigationPlanService.removeDetail(fumigationEdit.id).then(function(data){
                        if (data.message == 'success')
                            fumigationEdit.id = null;
                    },function(data){
                        console.log(data);
                    });
                }else{
                    //不做操作
                }
            } else if (result.returnType == "submit") {
                // 审批人.
                $scope.submit(result.assignee, result.list,fumigationEdit);
            } else if (result.returnType == "isEnd") {

            }
        }, function (reason) {
            console.log(reason);
        });
    }

    //选择好下一环节处理人后点提交
    $scope.submit = function(assignee, userList,fumigationEdit) {
        fumigationPlanService.submit(fumigationEdit.id, 2).then(function(data){
            if (data.status == 'success') {
                // 请求成功后要往轨迹表里面添加流程轨迹数据
                $scope.saveBusinessApprovals(fumigationEdit, assignee, userList);
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
    $scope.saveBusinessApprovals = function(fumigationEdit, assignee, userList) {
        var date = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
        $scope.businessApproval = {
            taskType : "fumigationApply",
            taskTypeName : "熏蒸申请编号："+fumigationEdit.id,
            processInstanceId : fumigationEdit.id,
            fromDepartment : $rootScope.orgInfo.orgName,
            fromPeople : $rootScope.userInfo.userId,
            fromUserName : $rootScope.userInfo.realName,
            projectName : "熏蒸方案申请",
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
            taskId : fumigationEdit.id,
            content : "同意"
        };
        for (var i = 0; i < userList.length; i++) {
            var obj = userList[i];
            if (obj.userId == assignee) {
                $scope.businessApproval.operatorName = obj.realName;
            }
        }

        businessApprovalService.add($scope.businessApproval, fumigationEdit.state+1).then(function(data){
            if (data.status == 'success') {
                //标识流程数据保存成功
            }
        },function(data){
            console.log(data);
        });
    }
})

//熏蒸审批列表
.controller("fumigationApproveCtrl", function($scope, $state, $rootScope, $stateParams, $uibModal, fumigationPlanService, StorehouseService) {

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    var orgId = $rootScope.depotInfo.orgId;
    $scope.storehouseObj = $rootScope.storehouseObj;

    // 加载列表
    $scope.loadData = function() {
        fumigationPlanService.getFumigationApproveList($scope.pageInfo, $scope.storehouseId, orgId, $rootScope.userInfo.userId).then(function(data){
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
    $scope.getAddAndEdit = function(fumType,fumigationId) {
        $state.go('app.intelligent.fumigation.fumigationApproveEdit',{fumType:fumType,fumigationId:fumigationId});
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

// 熏蒸审批详情
.controller("fumigationApproveEditCtrl", function($scope, $filter, $http, $stateParams, $state, $rootScope, $uibModal, fumigationPlanService, paymentService, businessApprovalService) {

    $scope.fumigation = {};
    $scope.pesticide = {};
    $scope.storehouse = {};
    $scope.isAudit = false;
    $scope.isNotEdit = false;

    // 保管员列表.
    $scope.keeperList = [];

    $scope.loadDataById = function(id) {
        fumigationPlanService.getFumigationPlanDeatil(id).then(function(data){
            $scope.fumigation = data.fumigationEdit;
            $scope.pesticide = data.pesticideEdit;

            $scope.fumigation.approvePeople = $rootScope.userInfo.realName;
            $scope.fumigation.approveDepartment = $rootScope.orgInfo.orgName;

            $scope.pesticide.approvePeople = $rootScope.userInfo.realName;
            $scope.pesticide.approveDepartment = $rootScope.orgInfo.orgName;

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

    if($stateParams.fumType == "approval"){//审核
        $scope.isAudit = true;

        $("#fumigationApprove-form input").attr("disabled",true);
        $("#fumigationApprove-form select").attr("disabled",true);
        $("#approveNote").attr("disabled",false);
        $scope.loadDataById($stateParams.fumigationId);
    }else if($stateParams.fumType == "detail"){//详情
        $("#fumigationApprove-form input").attr("disabled",true);
        $("#fumigationApprove-form select").attr("disabled",true);

        $scope.loadDataById($stateParams.fumigationId);
    }else if($stateParams.fumType == "fumType"){//简略详情
        $("#fumigationApprove-form input").attr("disabled",true);
        $("#fumigationApprove-form select").attr("disabled",true);

        $scope.isNotEdit = true;

        $scope.loadDataById($stateParams.fumigationId);
    }

    //根据仓房号赋值仓型和仓房尺寸
    $scope.storeData = function (houseId) {
        // 仓房类型
        $scope.storehouse.houseType = Number($scope.storehouseObj[houseId].storehouseType);
        // 仓房结构_地面
        $scope.storehouse.houseGround = $scope.storehouseObj[houseId].ground;
        // 仓房结构_墙体
        $scope.storehouse.houseWall = $scope.storehouseObj[houseId].wall;
        // 仓房结构_屋顶
        $scope.storehouse.houseRoof = $scope.storehouseObj[houseId].roof;
        // 仓房结构_房架
        $scope.storehouse.houseFrame = $scope.storehouseObj[houseId].house;

        // 通过仓房id，获取保管员.
        paymentService.getKepperByHouseId(houseId).then(function(data){
            $scope.keeperList = data;
        },function(data){
            console.log(data);
        });
    };

    // 返回.
    $scope.retList = function () {
        $rootScope.back();
    };

    // 审批菜单中选择审批人后通过、驳回、拒绝.
    $scope.audit = function (fumigation, result, content, state) {
        if(state == '0' || state == '6'){
            if(null == content || content == 'undefined'){
                alert("请填写审批意见！");
                return ;
            }else{
                content = "," + content;
            }
        }
        fumigationPlanService.submit($scope.fumigation.id, state).then(function(data){
            if (data.status == 'success') {
                // 请求成功后要往轨迹表里面添加流程轨迹数据
                if (null != result) {
                    $scope.approvalPeople = result.assignee;
                    $scope.approvalPeople_list = result.list;
                }
                $scope.saveBusinessApproval($scope.fumigation, $scope.approvalPeople, $scope.approvalPeople_list, content, state);

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
                    $scope.audit($scope.fumigation, result, content, state);
                } else if (result.returnType == "isEnd") {
                    $scope.audit(null);
                }
            }, function (reason) {
                console.log(reason);
            });
        } else if (state == '4') {
            $scope.audit($scope.fumigation, null, content, state);
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
            taskType : "fumigationApply",
            taskTypeName : "熏蒸申请编号："+apply.id,
            processInstanceId : apply.id,
            fromDepartment : $rootScope.orgInfo.orgName,
            fromPeople : $rootScope.userInfo.userId,
            fromUserName : $rootScope.userInfo.realName,
            projectName : "熏蒸方案申请",
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
            } else {
                alert("保存失败！");
            }
        },function(data){
            console.log(data);
        });
    }
})
//方案列表
.controller("planQueryCtrl", function($scope, $state, $rootScope, $stateParams, $uibModal, fumigationPlanService, StorehouseService) {

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    var orgId = $rootScope.depotInfo.orgId;
    $scope.storehouseObj = $rootScope.storehouseObj;

    // 加载列表
    $scope.loadData = function() {
        fumigationPlanService.getPlanQueryList($scope.pageInfo, $scope.storehouseId, orgId).then(function(data){
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

    // 详情
    $scope.getPlanQueryEdit = function(planType,planId,stateType,fumType) {
        if(planType == 1){
            if(stateType == "审批通过" || stateType == "审批拒绝"){
                $state.go('app.intelligent.fumigation.fumigationApproveEdit',{fumType:fumType,fumigationId:planId});
            }else{
                $state.go('app.intelligent.fumigation.fumigationPlanEdit',{fumType:fumType,fumigationId:planId});
            }
        }else if(planType == 2){
            if(stateType == "施药审批通过"){
                $state.go('app.intelligent.fumigation.pesticideApproveEdit',{fumType:fumType,pesticideId:planId});
            }else{
                $state.go('app.intelligent.fumigation.pesticidePlanEdit',{fumType:fumType,pesticideId:planId});
            }
        }
    };

    //判断是否显示返回按钮
    $scope.isShow = "0";
    if ($stateParams.id != 0) {
        $rootScope.isIndexPage = true;
        $scope.storehouseId = $stateParams.id;
        $scope.isShow = "1";
        $scope.loadData();
    }else{
        $scope.loadData();
    }

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

    //返回上一个链接页面
    $scope.returnUp = function(){
        if($stateParams.homePage == "SY"){//判断是否是从首页进来
            $state.go('app.dashboard');
        }else {
            $state.go('app.supervise.cameraPT');
        }
    }
})