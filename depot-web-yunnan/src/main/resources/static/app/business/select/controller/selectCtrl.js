angular.module('app.business').controller("selectCtrl", function ($scope, $http, $stateParams, $state, $rootScope, selectService, planService, contractService, deliveryStorageNoticeAuditService, APP_CONFIG, drugPurchaseService, $uibModal, drugUseApplyService) {

    $scope.pageInfo = {pageNum: 1, pageSize: 10};

    // 获取列表数据
    $scope.loadData = function () {
        $scope.operator = $rootScope.userInfo.userId;
        //console.log($scope.operator+"****");
        selectService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $stateParams.type, $scope.approval, null, null, $scope.operator, "desc").then(function (data) {
            $scope.pageInfo = data;
        }, function (data) {
            console.log(data);
        });
    };

    $scope.loadData();

    if ($stateParams.type == "complete") {
        $scope.isComplete = true;
        $scope.title = '已办事项列表';
    } else {
        $scope.title = '待办事项列表';

    }

    // 审批页面.
    $scope.auditPage = function (id, processInstanceId, taskType, taskId, auditId, result, dpId, duId, taskName) {
        if (result != "待审批" && result != "驳回") {
            alert("您已经提交该数据，无法再次提交！");
            return;
        }
        if (taskType == "plan") {

            /*location.href=appConfig.businessUrl + '/#/business/plan-audit-save-' + $stateParams.type
            + '/'+id + '/' + processInstanceId +'/' + taskId +'/' +auditId;*/
            ///plan-audit-save/:id/:processInstanceId/:taskId/:auditId',
            $state.go("app.business.plan-audit-save-todo", {
                type: $stateParams.type, id: id,
                processInstanceId: processInstanceId, taskId: taskId, auditId: auditId
            });
        }
        if (taskType == "contract") {
            /* location.href=appConfig.businessUrl + '/#/business/contract-audit-save-' + $stateParams.type
             + '/'+id + '/' + processInstanceId +'/' + taskId +'/' + auditId;*/
            $state.go("app.business.contract-audit-save", {
                type: $stateParams.type, id: id,
                processInstanceId: processInstanceId, taskId: taskId, auditId: auditId
            });


        }
        if (taskType == "contractChange") {
            /*location.href=appConfig.businessUrl + '/#/business/contract-change-audit-save-' + $stateParams.type
            + '/'+id + '/' + processInstanceId +'/' + taskId +'/' + auditId;*/
            $state.go("app.business.contract-change-audit-save", {
                type: $stateParams.type, id: id,
                processInstanceId: processInstanceId, taskId: taskId, auditId: auditId
            });
        }
        if (taskType == "storageNotice") {
            /*location.href=appConfig.businessUrl + '/#/business/storageNotice-audit-edit-' + $stateParams.type
            + '/'+id + '/' + processInstanceId+'/'+ taskId +'/' + auditId;*/
            $state.go("app.business.storageNotice-audit-edit-todo", {
                type: $stateParams.type, id: id,
                processInstanceId: processInstanceId, taskId: taskId, auditId: auditId
            });
        }
        if (taskType == "deliveryNotice") {
            /*location.href=appConfig.businessUrl + '/#/business/deliveryNotice-audit-edit-' + $stateParams.type
            + '/'+id + '/' + processInstanceId +'/'+ taskId +'/' + auditId;*/
            $state.go("app.business.deliveryNotice-audit-edit-todo", {
                type: $stateParams.type, id: id,
                processInstanceId: processInstanceId, taskId: taskId, auditId: auditId
            });
        }
        if (taskType == "storageAeration") {
            /*location.href=appConfig.businessUrl + '/#/business/aerationTask-audit-save-' + $stateParams.type
            + '/'+id + '/0/1' + '/' + processInstanceId +'/'+ taskId +'/' + auditId + '/' + result;*/
            $state.go("app.business.aerationTask-audit-save", {
                type: $stateParams.type, id: id,
                processInstanceId: processInstanceId, taskId: taskId, auditId: auditId
            });
        }
        // 药剂采购
        if (taskType === "drugPurchase") {
            $state.go("app.storage.drug.purchaseAudit-save", {
                id: dpId,
                processInstanceId: processInstanceId,
                taskId: taskId,
                auditId: auditId,
                taskName: taskName
            });
        }
        // 药剂领用
        if (taskType === "drugUseApply") {
            $state.go("app.storage.drug.useApplyAudit-save", {
                id: duId,
                processInstanceId: processInstanceId,
                taskId: taskId,
                auditId: auditId,
                taskName:taskName
            });
        }
        /*if(taskType=="fumigationProgram"){ // 熏蒸
            location.href=APP_CONFIG.businessUrl + '/#/business/fumigation-audit-save-' + $stateParams.type
            + '/'+id + '/' + processInstanceId +'/'+ taskId +'/' + auditId;
        }*/
    };


    // 查看审批页面.
    $scope.viewAuditPage = function (id, processInstanceId, taskId, auditId, taskType, dpId, duId) {
        if (taskType == "plan") {
            /*location.href=appConfig.businessUrl + '/#/business/plan-audit-view-' + $stateParams.type
            + '/' +id + '/' + processInstanceId +'/' + taskId +'/' + auditId;*/

            $state.go("app.business.plan-audit-view", {
                taskType: $stateParams.type, id: id,
                processInstanceId: processInstanceId, taskId: taskId, auditId: auditId
            });
        }
        if (taskType == "contract") {
            /*location.href=appConfig.businessUrl + '/#/business/contract-audit-view-' + $stateParams.type
            + '/'+id + '/' + processInstanceId +'/' + taskId +'/' + auditId;*/

            $state.go("app.business.contract-audit-view", {
                type: $stateParams.type, id: id,
                processInstanceId: processInstanceId, taskId: taskId, auditId: auditId
            });
        }
        if (taskType == "contractChange") {
            /*location.href=APP_CONFIG.businessUrl + '/#/business/contract-change-audit-view-' + $stateParams.type
            + '/'+id + '/' + processInstanceId +'/' + taskId +'/' + auditId;*/

            $state.go("app.business.contract-change-audit-view", {
                type: $stateParams.type, id: id,
                processInstanceId: processInstanceId, taskId: taskId, auditId: auditId
            });
        }
        if (taskType == "storageNotice") {
            /*location.href=APP_CONFIG.businessUrl + '/#/business/storageNotice-audit-view-' + $stateParams.type
             + '/'+id + '/' + processInstanceId+'/' + taskId +'/' + auditId;*/

            $state.go("app.business.storageNotice-audit-view", {
                type: $stateParams.type, id: id,
                processInstanceId: processInstanceId, taskId: taskId, auditId: auditId
            });
        }
        if (taskType == "deliveryNotice") {
            /*location.href=APP_CONFIG.businessUrl + '/#/business/deliveryNotice-audit-view-' + $stateParams.type
            + '/'+id + '/' + processInstanceId +'/' + taskId +'/' + auditId;*/

            $state.go("app.business.deliveryNotice-audit-view", {
                type: $stateParams.type, id: id,
                processInstanceId: processInstanceId, taskId: taskId, auditId: auditId
            });
        }
        // 药剂采购
        if (taskType === "drugPurchase") {
            $state.go("app.storage.drug.purchaseAudit-view", {
                id: dpId,
                processInstanceId: processInstanceId,
                taskId: taskId,
                auditId: auditId
            });
        }
        // 药剂领用
        if (taskType === "drugUseApply") {
            $state.go("app.storage.drug.useApplyAudit-view", {
                id: duId,
                processInstanceId: processInstanceId,
                taskId: taskId,
                auditId: auditId
            });
        }
        /*if(taskType=="storageAeration"){ // 通风
            location.href=APP_CONFIG.baseUrl + '/#/business/aerationTask-audit-view-' + $stateParams.type
            + '/'+id + '/0/1' + '/' + processInstanceId +'/'+ taskId +'/' + auditId;
        }
        if(taskType=="fumigationProgram"){ // 熏蒸
            location.href=APP_CONFIG.baseUrl + '/#/business/fumigation-audit-save-' + $stateParams.type
            + '/'+id + '/' + processInstanceId +'/'+ taskId +'/' + auditId;
        }*/
    };

    // 编辑页面
    $scope.showEdit = function (id, auditState) {
        if (auditState != "0" && auditState != "3") {
            alert("您已经提交该数据，无法修改！");
            return;
        }
        $state.go("app.business.plan-edit", {id: id});
    };

    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

    //修改
    /*$scope.showToEdit = function(taskType,taskTypeName) {
        $scope.planNumber = taskTypeName.split(":")[1];
        if(taskType=="plan"){
               $state.go("app.business.plan-audit-save",{taskType: $stateParams.type,id:id,
                   processInstanceId:processInstanceId,taskId:taskId,auditId:auditId});
        }
    }*/

    // 修改页面.
    $scope.showToEdit = function (id, result, taskType, dpId, duId) {
        if (result != "待审批" && result != "驳回") {
            alert("您已经提交该数据，无法再次提交！");
            return;
        }
        if (taskType == "plan") {

            /*location.href=appConfig.businessUrl + '/#/business/plan-audit-save-' + $stateParams.type
            + '/'+id + '/' + processInstanceId +'/' + taskId +'/' +auditId;*/
            ///plan-audit-save/:id/:processInstanceId/:taskId/:auditId',
            $state.go("app.business.plan-edit", {id: id});

        }
        if (taskType == "contract") {
            /* location.href=appConfig.businessUrl + '/#/business/contract-audit-save-' + $stateParams.type
             + '/'+id + '/' + processInstanceId +'/' + taskId +'/' + auditId;*/
            $state.go("app.business.contract-edit", {id: id});


        }
        if (taskType == "contractChange") {
            /*location.href=appConfig.businessUrl + '/#/business/contract-change-audit-save-' + $stateParams.type
            + '/'+id + '/' + processInstanceId +'/' + taskId +'/' + auditId;*/
            $state.go("app.business.contract-change-edit", {id: id});

        }
        if (taskType == "storageNotice") {
            /*location.href=appConfig.businessUrl + '/#/business/storageNotice-audit-edit-' + $stateParams.type
            + '/'+id + '/' + processInstanceId+'/'+ taskId +'/' + auditId;*/
            $state.go("app.business.storageNotice-edit", {id: id});

        }
        if (taskType == "deliveryNotice") {
            /*location.href=appConfig.businessUrl + '/#/business/deliveryNotice-audit-edit-' + $stateParams.type
            + '/'+id + '/' + processInstanceId +'/'+ taskId +'/' + auditId;*/
            $state.go("app.business.deliveryNotice-edit", {id: id});

        }
        // 药剂采购
        if (taskType === "drugPurchase") {
            $state.go("app.storage.drug.purchase.edit", {id: dpId});

        }
        // 药剂领用
        if (taskType === "drugUseApply") {
            $state.go("app.storage.drug.useApply.edit", {id: duId, updateUser: 1}); // 为时1修改
        }
        /*if(taskType=="storageAeration"){
       	 location.href=appConfig.businessUrl + '/#/business/aerationTask-audit-save-' + $stateParams.type 
       	 + '/'+id + '/0/1' + '/' + processInstanceId +'/'+ taskId +'/' + auditId + '/' + result;
       	 $state.go("app.business.aerationTask-audit-save",{type: $stateParams.type,id:id,
       		 processInstanceId:processInstanceId,taskId:taskId,auditId:auditId});
        }*/

    };


    // 选择审批人.(此提交为驳回时的提交，默认选择上一审批人)
    $scope.choice = function (object) {
        // 药剂
        if (object.taskType === "drugPurchase") { // 药剂采购
            $scope.drugPurchase = {
                id: object.dpId,
                auditState: object.auditState,
                processInstanceId: object.processInstanceId,
                taskType: object.taskType
            };
            $scope.showSubmit($scope.drugPurchase);
        } else if (object.taskType === "drugUseApply") { // 药剂领用
            $scope.drugUseApply = {
                id: object.duId,
                auditState: object.state,
                processInstanceId: object.processInstanceId,
                taskType: object.taskType
            };
            $scope.showSubmit($scope.drugUseApply);
        }

        $scope.object = object;

        $scope.modelItem = [];
        $scope.modelItem.processInstanceId = object.processInstanceId;

        //审批驳回 时，再次提交的审批人为上次的审批人

        if (object.taskType == "plan") {

            /*planService.loadDataById(object.projectId, object.processInstanceId).then(function(data){
                //上一审批人(驳回时，获取上一审批人 为当前审批人)
                    if(data.subAudit!=null){
                        $rootScope.assigneeName = data.subAudit.assigneeName;
                        //console.log($rootScope.assigneeName);
                    }

               },function(data){
            });*/
            planService.loadDataById(object.projectId, object.processInstanceId).then(function (data) {
                $scope.assigneeName = data.subAudit.assigneeName;
                //上一审批人(驳回时，获取上一审批人 为当前审批人)
                if (data.subAudit != null) {
                    $scope.returnResult = [];
                    $http({
                        method: 'GET',
                        url: APP_CONFIG.businessUrl + '/act/roleList/getUserList',
                        params: {
                            procInstId: $scope.modelItem.processInstanceId,
                            type: "plan",
                            orgId: $rootScope.userInfo.orgId
                        }
                    }).then(function successCallback(response) {
                        console.log(response.data + "****");
                        $scope.returnResult.returnType = "submit";
                        $scope.businessSubmit($scope.assigneeName, object.taskType);
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                        console.log(response);
                    });
                }
            }, function (data) {
                console.log(response);
            });
        }
        if (object.taskType == "contract" || object.taskType == "contractChange") {
            //$rootScope.assigneeName = null;
            /*contractService.loadDataByIdAndProcessInstanceId(object.projectId, object.processInstanceId).then(function(data){
                //上一审批人(驳回时，获取上一审批人 为当前审批人)

                    if(data.subAudit!=null){
                        $rootScope.assigneeName = data.subAudit.assigneeName;
                    }

               },function(data){
            });*/
            contractService.loadDataByIdAndProcessInstanceId(object.projectId, object.processInstanceId).then(function (data) {
                //上一审批人(驳回时，获取上一审批人 为当前审批人)
                if (data.subAudit != null) {
                    $scope.assigneeName = data.subAudit.assigneeName;
                    $scope.returnResult = [];
                    //驳回到员工，为第一节点，此时显示审批人
                    $scope.returnResult.returnType = "submit";
                    $scope.businessSubmit($scope.assigneeName, object.taskType);
                }

            }, function (data) {
                console.log(response);
            });
        }

        if (object.taskType == "storageNotice" || object.taskType == "deliveryNotice") {
            /*deliveryStorageNoticeAuditService.loadDataById(object.projectId, object.processInstanceId).then(function(data){
                   //上一审批人(驳回时，获取上一审批人 为当前审批人)
                    if(data.subAudit!=null){
                        $rootScope.assigneeName = data.subAudit.assigneeName;
                    }

               },function(data){
            });*/
            deliveryStorageNoticeAuditService.loadDataById(object.projectId, object.processInstanceId).then(function (data) {
                //上一审批人(驳回时，获取上一审批人 为当前审批人)
                if (data.subAudit != null) {
                    $scope.assigneeName = data.subAudit.assigneeName;
                    $scope.returnResult = [];
                    //驳回到员工，为第一节点，此时显示审批人
                    $scope.returnResult.returnType = "submit";
                    $scope.businessSubmit($scope.assigneeName, object.taskType);
                }

            }, function (data) {
                console.log(response);
            });
        }

        /*$scope.returnResult = [];
        //驳回到员工，为第一节点，此时显示审批人
        $scope.returnResult.returnType = "submit";
        $scope.submit($rootScope.assigneeName,object.taskType);*/

    }

    // 提交.
    $scope.businessSubmit = function (assignee, taskType) {
        if (taskType == "plan") {
            var url = '/depot/business/plan/submit';
        }
        if (taskType == "contract" || taskType == "contractChange") {
            var url = '/depot/business/contract/submit';
        }
        if (taskType == "storageNotice" || taskType == "deliveryNotice") {
            var url = '/depot/business/deliveryStorageNotice/submit';
        }
        $http({
            method: 'POST',
            url: APP_CONFIG.businessUrl + url,
            data: {
                id: $scope.object.projectId,
                assignee: assignee,
                userId: $rootScope.userInfo.userId,
                realName: $rootScope.userInfo.realName

            }
        }).then(function successCallback(response) {
            if (response.data.success == 'success') {
                // 请求成功执行代码
                // 重新加载数据
                alert("提交成功！");
                $scope.loadData();
            } else {
                alert(response.data.msg);
            }
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
    };

    // 药剂采购提交
    $scope.showSubmit = function (drugs) {
        /*if (drugs.taskType === "drugPurchase") {
            if (drugs.auditState != "0" && drugs.auditState != "3") {
                alert("您已经提交该数据，无法再次提交！");
                return;
            } else
                $scope.choiceAuditUser(drugs);
        } else if (drugs.taskType === "drugUseApply") {
            if (drugs.auditState != "0" && drugs.auditState != "3") {
                alert("您已经提交该数据，无法再次提交！");
                return;
            } else
                $scope.choiceAuditUser(drugs);
        }*/
        if (drugs.auditState != "0" && drugs.auditState != "3") {
            alert("您已经提交该数据，无法再次提交！");
            return;
        } else {
            $scope.modelItem = [];
            // 流程id
            $scope.modelItem.processInstanceId = drugs.processInstanceId;
            // 审批状态("0"待提交,"1"审批中,"2"审批结束,"3"审批驳回,"4"审批拒绝.)
            $scope.modelItem.auditState = drugs.auditState;
            // 展开下一个审批人模态框.
            var modalInstance = $uibModal.open({
                size : 'md',
                templateUrl: 'app/business/util/views/choiceAuditUser-view.html',
                controller: 'choiceAuditUserModalCtrl',
                resolve: {
                    // items是一个回调函数
                    items: function () {
                        // 这个值会被模态框的控制器获取到
                        return $scope.modelItem;
                    }
                }
            });

            // 回调函数.
            modalInstance.result.then(function (result) {
                if (result.returnType === "cancel") {
                    // 不做操作.
                } else if (result.returnType === "submit") {
                    // 审批人.
                    $scope.submit(drugs,result.assignee);
                } else if (result.returnType === "isEnd") {
                }
            }, function (reason) {
                console.log(reason);
            });
        }

    };
    // 选择审批人返回结果
    /*$scope.choiceAuditUser = function (drugs) {
        $scope.modelItem = [];
        // 流程id
        $scope.modelItem.processInstanceId = drugs.processInstanceId;
        // 审批状态("0"待提交,"1"审批中,"2"审批结束,"3"审批驳回,"4"审批拒绝.)
        $scope.modelItem.auditState = drugs.auditState;
        // 展开下一个审批人模态框.
        var modalInstance = $uibModal.open({
            size: 'md',
            templateUrl: 'app/business/util/views/choiceAuditUser-view.html',
            controller: 'choiceAuditUserModalCtrl',
            resolve: {
                // items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return $scope.modelItem;
                }
            }
        });
        // 回调函数.
        modalInstance.result.then(function (result) {
            if (result.returnType === "cancel") {
                // 不做操作.
            } else if (result.returnType === "submit") {
                // 审批人.
                $scope.submit(drugs, result.assignee);
            } else if (result.returnType === "isEnd") {
            }
        }, function (reason) {
            console.log(reason);
        });
    };*/
    //提交 assignee 为userId
    $scope.submit = function (drugs, assignee) {
        if (drugs.taskType === "drugPurchase") {
            drugPurchaseService.updateAuditState(drugs, assignee).then(function (data) {
                if (data.status === "success") {
                    alert("提交成功！");
                    $scope.loadData();
                } else {
                    alert(data.msg);
                }
            }, function (data) {
                console.log(data);
            });
        }
        if (drugs.taskType === "drugUseApply") {
            drugUseApplyService.updateAuditState(drugs, assignee).then(function (data) {
                if (data.status == "success") {
                    alert("提交成功！");
                    $scope.loadData();
                } else {
                    alert(data.msg);
                }
            }, function (data) {
                console.log(data);
            });
        }
    }

});