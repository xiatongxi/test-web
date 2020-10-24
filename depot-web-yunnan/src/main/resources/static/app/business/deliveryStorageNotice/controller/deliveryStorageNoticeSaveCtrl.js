angular.module('app.business').controller("deliveryStorageNoticeSaveCtrl",
    function($scope, $http, $filter, $stateParams, $state, $uibModal, $rootScope,agentDepotService,
             deliveryStorageNoticeService, deliveryStorageNoticeAuditService, commonUtilService,
             storeWareDetailService, enumService, codeRuleService, APP_CONFIG) {

        $scope.deliveryStorageNotice = {};
        $scope.billNumber = {};
        $scope.idList = [];
        $scope.planType = null;

        //获取申请人
        $scope.deliveryStorageNotice.creater=$rootScope.userInfo.realName;

        //获取当前时间
        var nowTime=new Date();
        $scope.deliveryStorageNotice.createTime=nowTime;


        // 是否选择合同,默认为false.
        $scope.selectContract = false;
        // 默认是编辑.
        $scope.isNotEdit = false;
        // 保存标识，防止重复提交.
        $scope.saveFlag = false;
        // 显示新增明细的按钮(选择计划后，隐藏).
        $scope.addRowButtonShow = true;

        // 用于存放新增的数据
        $scope.addedDetail = [];

        //获取通知单编号
        $scope.gainPlan = function() {
            codeRuleService.getCodeValueByType(codeType, $rootScope.userInfo.orgId).then(function(data) {
                if (data.status == "success") {
                    $scope.billNumber.status = "success";
                    $scope.deliveryStorageNotice.billNumber = data.codeValue;
                } else if (data.status == "error") {
                    $scope.billNumber.msg = data.msg;
                    $scope.billNumber.status = "error";
                    if(confirm("通知单编号有误！该页面无法保存！原因：" + $scope.billNumber.msg + " 是否返回到列表页！")) {
                        $scope.retList();
                    }
                }
            });
        }
        
        //代储库数据
        $scope.agentList = [];
        $scope.agentDepotList = [];
        $scope.agentDepotLista = function(){
        	// 000 是不取手动增加的库点
            agentDepotService.getQueryAgentDepotList($rootScope.userInfo.orgId,"000").then(function(data) {
    			//代储库
    			if(data!=null ){
    				$scope.agentList.push(data);
    				for(var id in $scope.agentList){
    					for(var key in $scope.agentList[id]){
    						$scope.agentDepotList.push($scope.agentList[id][key]);
    					}
    			    }
    			}
    		}, function (data) {
    			console.log(data);
    		});
        }
        $scope.agentDepotLista();
        //------------------------------提交（选择审批人）-----------------------------------

        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        // 获取列表数据
        $scope.loadData = function() {
            deliveryStorageNoticeService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, null).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log(data);
            });
        }


        // 选择审批人.
        $scope.choice = function(deliveryStorageNotice,variable) {
            if (deliveryStorageNotice.auditState != "0" && deliveryStorageNotice.auditState != "3") {
                alert("您已经提交该数据，无法再次提交！");
                return;
            }
            $scope.deliveryStorageNotice = deliveryStorageNotice;
            //运输方式
            $scope.deliveryStorageNotice.qualityStandard = parseInt(deliveryStorageNotice.qualityStandard);

            $scope.modelItem = [];

            $scope.modelItem.allContent = deliveryStorageNotice;
            $scope.modelItem.variable = variable;
            $scope.modelItem.type = "deliveryStorageNotice";

            //审批驳回 时，再次提交的审批人为上次的审批人
            if(deliveryStorageNotice.auditState == "3"){
                //获取上一审批人
                deliveryStorageNoticeAuditService.loadDataById(deliveryStorageNotice.id, deliveryStorageNotice.processInstanceId).then(function(data){
                    //上一审批人(驳回时，获取上一审批人 为当前审批人)
                    if(data.subAudit!=null){
                        $scope.assigneeName = data.subAudit.assigneeName;
                        $scope.returnResult = [];
                        //驳回到员工，为第一节点，此时显示审批人
                        $scope.returnResult.returnType = "submit";
                        $scope.submit($scope.assigneeName);
                    }

                },function(data){
                });
            }else{
                // 展开下一个审批人模态框.
                var modalInstance = $uibModal.open({
                    size : 'md',
                    templateUrl: 'app/business/util/views/choiceUser-view.html',
                    controller: 'choiceUserModalCtrl',
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
                    if (result.returnType == "cancel") {
                        //不做操作
                        if(variable == "1"){
                            // 新增则id
                            $scope.deliveryStorageNotice.id = null;
                        }else{
                            //不做操作
                        }
                        $scope.saveFlag = false;
                    } else if (result.returnType == "submit") {
                        // 审批人.
                        $scope.submit(result.assignee);
                    } 
                }, function (reason) {
                    console.log(reason);
                });
            }

        }


        // 提交.
        $scope.submit = function(assignee) {
            $http({
                method: 'POST',
                url: APP_CONFIG.businessUrl + '/depot/business/deliveryStorageNotice/submit',
                data: {
                    id : $scope.deliveryStorageNotice.id,
                    assignee : assignee,
                    userId : $rootScope.userInfo.userId,
                    realName : $rootScope.userInfo.realName
                }
            }).then(function successCallback(response) {
                if (response.data.success == 'success') {
                    // 请求成功执行代码
                    // 重新加载数据
                    $state.go("app.business.deliveryStorageNotice");
                    $scope.loadData();
                    alert("提交成功！");
                } else {
                    alert(response.data.msg);
                }
            }, function errorCallback(response) {
                // 请求失败执行代码
                console.log(response);
            });
        }

        //-------------------------------------------------------------------------------------------

        //-----------------------------------------查看中的暂停、终止、启用--------------------------------------------------
        // 启用
        $scope.application = function(id) {
            $http({
                method: 'POST',
                url: APP_CONFIG.businessUrl + '/depot/business/deliveryStorageNotice/application',
                data: {
                    id : id
                }
            }).then(function successCallback(response) {
                if (response.data.status == "error") {
                    alert(response.data.msg);
                } else {
                    // 重新加载数据
                    $state.go("app.business.deliveryStorageNotice-audit-pass");
                    $scope.loadData();
                    alert("启用成功！");
                }
            }, function errorCallback(response) {
                // 请求失败执行代码
                console.log(response);
            });
        }

        // 暂停
        $scope.discontinue = function(id) {
            var params = [];
            params.id = id;
            params.type = "noticeDiscontinue";
            var uibModalInstance = $uibModal.open({
                size : 'md',
                templateUrl: 'app/business/util/views/refuseReason-view.html',
                controller: 'refuseReasonCtrl',
                resolve: {
                    // items是一个回调函数
                    items: function () {
                        // 这个值会被模态框的控制器获取到
                        return params;
                    }
                }
            });
            uibModalInstance.result.then(function (result) {
                if(result.returnType == "success"){
                    $state.go("app.business.deliveryStorageNotice-audit-pass");
                    $scope.loadData();
                }
            }, function (reason) {
                console.log(reason);
            });

        }

        // 终止
        $scope.finish = function(id) {
            var params = [];
            params.id = id;
            params.type = "noticeFinish";
            var uibModalInstance = $uibModal.open({
                size : 'md',
                templateUrl: 'app/business/util/views/refuseReason-view.html',
                controller: 'refuseReasonCtrl',
                resolve: {
                    // items是一个回调函数
                    items: function () {
                        // 这个值会被模态框的控制器获取到
                        return params;
                    }
                }
            });
            uibModalInstance.result.then(function (result) {
                if(result.returnType == "success"){
                    $state.go("app.business.deliveryStorageNotice-audit-pass");
                    $scope.loadData();
                }
            }, function (reason) {
                console.log(reason);
            });

        }

        //----------------------------------------------------------------------------------------------------------

        $scope.loadDataById = function(id) {
            deliveryStorageNoticeService.loadDataById(id).then(function(data) {
                $scope.deliveryStorageNotice = data.deliveryStorageNotice;
                $scope.deliveryStorageNotice.qualityStandard = parseInt(data.deliveryStorageNotice.qualityStandard);
                $scope.deliveryStorageNotice.storageTime = $filter('date')($scope.deliveryStorageNotice.storageTime, "yyyy-MM-dd");

                if (data.deliveryStorageNotice.contractBid != undefined && data.deliveryStorageNotice.contractBid != null) {
                    // 选择了合同.
                    $scope.selectContract = true;
                }

                // 子表数据.
                $scope.storeWareDetailList = data.storeWareDetailList;
                for (var i=0; i < data.storeWareDetailList.length; i++) {
                    $scope.addedDetail.push(angular.copy(data.storeWareDetailList[i]));
                }

                $scope.getAttributeData();
                $scope.getAreaData();
                $scope.getGrainDetailKind();
            }, function(data){
            });
        }

        $scope.loadDetailDataByIdAndPID = function(id, processInstanceId) {
            deliveryStorageNoticeAuditService.loadDataById(id, processInstanceId).then(function(data) {
                
            	$scope.deliveryStorageNotice = data.deliveryStorageNotice;
                $scope.deliveryStorageNotice.qualityStandard = parseInt(data.deliveryStorageNotice.qualityStandard);
                $scope.auditList = data.auditList;

                $scope.processDefinitionId = data.deliveryStorageNotice.processDefinitionId;
                $scope.processInstanceId = data.deliveryStorageNotice.processInstanceId;
                $scope.deliveryStorageNotice.storageTime = $filter('date')($scope.deliveryStorageNotice.storageTime, "yyyy-MM-dd");

                if (data.deliveryStorageNotice.contractBid != undefined && data.deliveryStorageNotice.contractBid != null) {
                    // 选择了合同.
                    $scope.selectContract = true;
                }

                // 子表数据.
                $scope.storeWareDetailList = data.storeWareDetailList;
                for (var i=0; i < data.storeWareDetailList.length; i++) {
                    $scope.addedDetail.push(angular.copy(data.storeWareDetailList[i]));
                }

                $scope.getAttributeData();
                $scope.getAreaData();
                $scope.getGrainDetailKind();
            }, function(data) {
            });
        }

        $('input[readOnlyButValid]').on("focusin", function() {
            $(this).prop('readOnly', true);
        });

        $('input[readOnlyButValid]').on("focusout", function() {
            $(this).prop('readOnly', false);
        });


        // 校验
        var validator = $("#deliveryStorageNotice-form").validate();


        // 自定义验证，验证数字
        $.validator.addMethod("validNumber",function(value,element, params) {
            var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;
            return this.optional(element)||(checkNumber.test(value));
        },"请输入正确的数字类型，最多两位小数！");


        // 返回
        $scope.retList = function () {
            if ($rootScope.previousState_name != '') {
            	if($rootScope.previousState_name.indexOf("app.additionalHome") != -1){//首页跳转的返回首页
            		$rootScope.isIndexPage = true;
            	}
                $rootScope.back();
            } else {
            	$state.go("app.business.deliveryStorageNotice");
            }
        }


      
        
        // 计划列表.
        $scope.getPlan = function() {
            // 入库通知单，只能选择收储和轮换计划；出库通知单，只显示轮换和销售计划.
            var params = [];
            params.billType = $scope.deliveryStorageNotice.billType;
            var uibModalInstance = $uibModal.open({
                size:'lg',
                templateUrl: 'app/business/util/views/plan-list-modal.html',
                controller: 'planListModalCtrl',
                resolve: {
                    // items是一个回调函数
                    items: function () {
                        // 这个值会被模态框的控制器获取到
                        return params;
                    }
                }
            });
            uibModalInstance.result.then(function (result) {
                if (result != null && $scope.deliveryStorageNotice.planBid != result.id) {
                	
                	$scope.planType = result.executeType;
                	
                    // 说明选择了计划 或者 变更了计划.

                    // 清空合同编号.
                    $scope.deliveryStorageNotice.contract = null;
                    // 清空合同id
                    $scope.deliveryStorageNotice.contractBid = null;
                    // 粮食产地
                    $scope.deliveryStorageNotice.grainProducingArea = null;
                    // 起始合同id.
                    $scope.deliveryStorageNotice.rootContractBid = null;

                    //清空通知单数量
                    $scope.deliveryStorageNotice.shipingCount = null;

                    //清空通知单金额
                    $scope.deliveryStorageNotice.moneyQuantity = null;

                    // 客户信息. 2018-01-29.
                    // 客户id.
                    $scope.deliveryStorageNotice.customerBid = null;
                    // 客户名称.
                    $scope.deliveryStorageNotice.deliveryCustomer = null;
                    // 客户编码.
                    $scope.deliveryStorageNotice.customerNumber = null;
                    // 客户联系电话.
                    $scope.deliveryStorageNotice.mobile = null;
                    //证件号
                    $scope.deliveryStorageNotice.identification = null;


                    // 获取计划的详情列表.
                    $scope.addedDetail = [];
                    storeWareDetailService.getByZidAndType(result.id, "plan").then(function(data) {
                    	
                    	//翻译粮库名称
                        $scope.agentDepot = {};
                        if($scope.agentDepotList.length>0){
                        	for (var i = 0; i < $scope.agentDepotList.length; i++) {
                        		for (var j = 0; j < data.list.length; j++) {
                        			if(data.list[j].state != $rootScope.userInfo.orgId){
	                        			if(data.list[j].state == $scope.agentDepotList[i].depotId){
	                        				$scope.agentDepot.agentDepotName = $scope.agentDepotList[i].agentDepotName;
	                        			}
                        			}
                        		}
                        	}
                        }
                        
                        // 循环删除计划明细中的id，有这个id会导致删除的时候误认为是删除已有明细.
                        //$scope.noticeType = $stateParams.noticeType;
                        for (var i=0; i< data.list.length; i++) {
                            $scope.idList.push(data.list[i].id);
                            data.list[i].id = "";
                            var sl_index;
                            if(result.executeType == 3154){
                                if(data.list[i].remainingNumber!="" && data.list[i].remainingNumber!=null){
                                	sl_index = data.list[i].remainingNumber.indexOf("超出");
                                	if (sl_index != -1) {
                                		data.list[i].inCount = 0;
                                	}
                                    data.list[i].inDetailTotalPrice = commonUtilService.accMul(data.list[i].inCount,data.list[i].inPrice);
                                    continue;
                                }
                            }else if(result.executeType == 3155){
                                if(data.list[i].outRemainingNumber!="" && data.list[i].outRemainingNumber!=null){
                                	sl_index = data.list[i].outRemainingNumber.indexOf("超出");
                                	if (sl_index != -1) {
                                		data.list[i].outCount = 0;
                                	}
                                	data.list[i].outDetailTotalPrice = commonUtilService.accMul(data.list[i].outCount,data.list[i].outPrice);
                                	continue;
                                }
                            }else{
                            	/*原if(data.list[i].outRemainingNumber == "0" && data.list[i].remainingNumber!=0){
                            		sl_index = data.list[i].remainingNumber.indexOf("超出");
                                	if (sl_index != -1) {
                                		data.list[i].inCount = 0;
                                	}
                                	data.list[i].inDetailTotalPrice = commonUtilService.accMul(data.list[i].inCount,data.list[i].inPrice);
                            		//data.list[i].outCount = 0;
                                	data.list[i].outDetailTotalPrice = commonUtilService.accMul(data.list[i].outCount,data.list[i].outPrice);
                                	continue;
                                }
                            	if(data.list[i].remainingNumber == "0" && data.list[i].outRemainingNumber!=0){
                            		sl_index = data.list[i].outRemainingNumber.indexOf("超出");
                                	if (sl_index != -1) {
                                		data.list[i].outCount = 0;
                                	}
                                	data.list[i].outDetailTotalPrice = commonUtilService.accMul(data.list[i].outCount,data.list[i].outPrice);
                                	data.list[i].inDetailTotalPrice = commonUtilService.accMul(data.list[i].inCount,data.list[i].inPrice);
                            		continue;
                            	}*/
                            	if(data.list[i].remainingNumber!="" && data.list[i].remainingNumber!=null){
                                	sl_index = data.list[i].remainingNumber.indexOf("超出");
                                	if (sl_index != -1) {
                                		data.list[i].inCount = 0;
                                	}
                                    data.list[i].inDetailTotalPrice = commonUtilService.accMul(data.list[i].inCount,data.list[i].inPrice);
                                }
                            	if(data.list[i].outRemainingNumber!="" && data.list[i].outRemainingNumber!=null){
                                	sl_index = data.list[i].outRemainingNumber.indexOf("超出");
                                	if (sl_index != -1) {
                                		data.list[i].outCount = 0;
                                	}
                                	data.list[i].outDetailTotalPrice = commonUtilService.accMul(data.list[i].outCount,data.list[i].outPrice);
                                }
                            	
                            	
                            }
                            
                            
                        }

                        $scope.addedDetail = data.list;

                        // 计算合同数量.
                        $scope.countSumAmount();
                    });

                    // 计划编号.
                    $scope.deliveryStorageNotice.planNumber = result.planNumber;
                    // 计划id
                    $scope.deliveryStorageNotice.planBid = result.id;

                }
                // 关闭模态框时刷新页面数据
            }, function (reason) {
                console.log(reason);
            });
        }

        // 清空计划.
        $scope.removePlan = function() {
            // 编辑页面，并且计划编号不为空.
            if (!$scope.isNotEdit && $scope.deliveryStorageNotice.planNumber != null) {
                // 计划编号.
                $scope.deliveryStorageNotice.planNumber = null;
                // 计划id
                $scope.deliveryStorageNotice.planBid = null;

                // 如果没有选合同  清空所有可带出数据.
                if ($scope.deliveryStorageNotice.contract == null) {

                    /*// 粮食品种.
                    $scope.deliveryStorageNotice.goodsKind = null;
                    // 明细品种.
                    $scope.deliveryStorageNotice.grainDetailKind = null;
                    // 粮食性质.
                    $scope.deliveryStorageNotice.grainAttribute = null;
                    // 生产年限.
                    $scope.deliveryStorageNotice.grainAnnual = null;
                    // 粮食等级.
                    $scope.deliveryStorageNotice.grainGrade = null;
                    
                    // 粮食产地
                    $scope.deliveryStorageNotice.grainProducingArea = null;*/
                	
                	//运输方式
                    $scope.deliveryStorageNotice.qualityStandard = null;

                    // 清空计划的详情列表.
                    $scope.addedDetail = [];

                    //清空通知单数量
                    $scope.deliveryStorageNotice.shipingCount = null;

                    //清空通知单金额
                    $scope.deliveryStorageNotice.moneyQuantity = null;

                    // 清空明细品种列表.
                    //$scope.grainDetailKindTreeData = [];

                    // 客户信息1111.
                    // 客户id.
                    $scope.deliveryStorageNotice.customerBid = null;
                    // 客户名称.
                    $scope.deliveryStorageNotice.deliveryCustomer = null;
                    // 客户编码.
                    $scope.deliveryStorageNotice.customerNumber = null;
                    // 客户联系电话.
                    $scope.deliveryStorageNotice.mobile = null;
                    //证件号
                    $scope.deliveryStorageNotice.identification = null;
                }
            }



        }

        // 选择合同.
        $scope.getContract = function() {
            var params = [];
            params.billType = $scope.deliveryStorageNotice.billType;

            if ($scope.deliveryStorageNotice !=null
                && $scope.deliveryStorageNotice.planBid != null
                && $scope.deliveryStorageNotice.planBid != undefined) {
                params.planBid = $scope.deliveryStorageNotice.planBid;
            }

            var uibModalInstance = $uibModal.open({
                size:'lg',
                templateUrl: 'app/business/util/views/contract-list-modal.html',
                controller: 'contractListModalCtrl',
                resolve: {
                    items: function () { // items是一个回调函数
                        // 这个值会被模态框的控制器获取到
                        return params;
                    }
                }
            });
            uibModalInstance.result.then(function (result) {
                
                if (result != null && $scope.deliveryStorageNotice.contractBid != result.id) {

                    // 获取合同的详情列表.
                    $scope.addedDetail = [];
                    storeWareDetailService.getByZidAndType(result.id, "contract").then(function(data) {
                    	
                    	//翻译粮库名称
                        $scope.agentDepot = {};
                        if($scope.agentDepotList.length>0){
                        	for (var i = 0; i < $scope.agentDepotList.length; i++) {
                        		for (var j = 0; j < data.list.length; j++) {
                        			if(data.list[j].state != $rootScope.userInfo.orgId){
	                        			if(data.list[j].state == $scope.agentDepotList[i].depotId){
	                        				$scope.agentDepot.agentDepotName = $scope.agentDepotList[i].agentDepotName;
	                        				//alert($scope.agentDepot.agentDepotName);
	                        			}
                        			}
                        		}
                        	}
                        }
                        
                        // 循环删除计划明细中的id，有这个id会导致删除的时候误认为是删除已有明细.
                        for (var i=0; i< data.list.length; i++) {
                            $scope.idList.push(data.list[i].id);
                            data.list[i].id = "";
                            var sl_index;
                            if(result.contractType == 3147){
                                if(data.list[i].remainingNumber!="" && data.list[i].remainingNumber!=null){
                                	sl_index = data.list[i].remainingNumber.toString().indexOf("超出");
                                	if (sl_index != -1) {
                                		data.list[i].inCount = 0;
                                	}
                                    data.list[i].inDetailTotalPrice = commonUtilService.accMul(data.list[i].inCount,data.list[i].inPrice) ;
                                    continue;
                                }
                            }else if(result.contractType == 3148){
                                if(data.list[i].outRemainingNumber!="" && data.list[i].outRemainingNumber!=null){
                                	sl_index = data.list[i].outRemainingNumber.toString().indexOf("超出");
                                	if (sl_index != -1) {
                                		data.list[i].outCount = 0;
                                	}
                                    data.list[i].outDetailTotalPrice = commonUtilService.accMul(data.list[i].outCount,data.list[i].outPrice) ;
                                    continue;
                                }
                            }
                        }
                        $scope.addedDetail = data.list;

                        // 计算合同数量.
                        $scope.countSumAmount();
                    });


                    // 合同编号.
                    $scope.deliveryStorageNotice.contract = result.contractNumber;
                    // 合同id
                    $scope.deliveryStorageNotice.contractBid = result.id;
                    // 计划id
                    $scope.deliveryStorageNotice.planBid = result.planBid;
                    // 计划编号
                    $scope.deliveryStorageNotice.planNumber = result.planNumber;

                    //运输方式
                    $scope.deliveryStorageNotice.qualityStandard = result.shippingType;
                    parseInt($scope.deliveryStorageNotice.qualityStandard);
                   /* // 粮食品种.
                    $scope.deliveryStorageNotice.goodsKind = result.grainKind;
                    // 明细品种.
                    $scope.deliveryStorageNotice.grainDetailKind = result.grainDetailKind;
                    // 粮食性质.
                    $scope.deliveryStorageNotice.grainAttribute = result.grainAttribute;
                    // 生产年限.
                    $scope.deliveryStorageNotice.grainAnnual = result.grainAnnual;
                    //生产年份
                    $scope.deliveryStorageNotice.productiveYear = result.productiveYear;
                    // 粮食等级.
                    $scope.deliveryStorageNotice.grainGrade = result.grainGrade;
                    // 粮食产地
                    $scope.deliveryStorageNotice.grainProducingArea = result.grainProducingArea;*/

                    // 起始合同id  用于合同进度查询，防止合同变更后，查询间断的问题.   2017-11-02.
                    $scope.deliveryStorageNotice.rootContractBid = result.rootContractBid;

                    // 客户信息. 2018-01-29.
                    // 客户id.
                    $scope.deliveryStorageNotice.customerBid = result.customerBid;
                    // 客户名称.
                    $scope.deliveryStorageNotice.deliveryCustomer = result.customerName;
                    // 客户编码.
                    //$scope.deliveryStorageNotice.customerNumber = result.customerNumber;
                    // 客户联系电话.
                    $scope.deliveryStorageNotice.mobile = result.mobile;

                    $scope.deliveryStorageNotice.identification = result.identification;

                    // 选择合同标识.
                    $scope.selectContract = true;

                    /*$scope.getAttributeData();
                    $scope.getAreaData();
                    // 获取明细品种下拉树.
                    $scope.getGrainDetailKind();*/
                }
                // 关闭模态框时刷新页面数据
            }, function (reason) {
                console.log(reason);
            });
        }

        // 清空合同.
        $scope.removeContract = function() {
            if (!$scope.isNotEdit && $scope.deliveryStorageNotice.contract != null) {
                // 合同编号.
                $scope.deliveryStorageNotice.contract = null;
                // 合同id
                $scope.deliveryStorageNotice.contractBid = null;
                // 起始合同id  用于合同进度查询，防止合同变更后，查询间断的问题.   2017-11-02.
                $scope.deliveryStorageNotice.rootContractBid = null;
                // 粮食产地
                //$scope.deliveryStorageNotice.grainProducingArea = null;
                //运输方式
                $scope.deliveryStorageNotice.qualityStandard = null;

                // 选择合同标识.
                $scope.selectContract = false;

                // 如果计划编号为空，说明没有选择计划，删除所有合同带出的属性.
                if ($scope.deliveryStorageNotice.planNumber == null) {

                    /*// 粮食品种.
                    $scope.deliveryStorageNotice.goodsKind = null;
                    // 明细品种.
                    $scope.deliveryStorageNotice.grainDetailKind = null;
                    // 粮食性质.
                    $scope.deliveryStorageNotice.grainAttribute = null;
                    // 生产年限.
                    $scope.deliveryStorageNotice.grainAnnual = null;
                    // 粮食等级.
                    $scope.deliveryStorageNotice.grainGrade = null;*/

                    //清空通知单数量
                    $scope.deliveryStorageNotice.shipingCount = null;

                    //清空通知单金额
                    $scope.deliveryStorageNotice.moneyQuantity = null;

                    // 客户信息.
                    // 客户id.
                    $scope.deliveryStorageNotice.customerBid = null;
                    // 客户名称.
                    $scope.deliveryStorageNotice.deliveryCustomer = null;
                    // 客户编码.
                    $scope.deliveryStorageNotice.customerNumber = null;
                    // 客户联系电话.
                    $scope.deliveryStorageNotice.mobile = null;
                    //证件号
                    $scope.deliveryStorageNotice.identification = null;

                    // 清空计划的详情列表.
                    $scope.addedDetail = [];
                    // 清空明细品种列表.
                    //$scope.grainDetailKindTreeData = [];
                } else {
                    // 计划不为空，说明选择了计划也选择和合同.
                    // 合同的详情有可能和计划的不同，所以要重新获取详情列表.

                    // 获取计划的详情列表.
                    $scope.addedDetail = [];
                    
                    storeWareDetailService.getByZidAndType($scope.deliveryStorageNotice.planBid, "plan").then(function(data) {

                    	//翻译粮库名称
                        $scope.agentDepot = {};
                        if($scope.agentDepotList.length>0){
                        	for (var i = 0; i < $scope.agentDepotList.length; i++) {
                        		for (var j = 0; j < data.list.length; j++) {
                        			if(data.list[j].state != $rootScope.userInfo.orgId){
	                        			if(data.list[j].state == $scope.agentDepotList[i].depotId){
	                        				$scope.agentDepot.agentDepotName = $scope.agentDepotList[i].agentDepotName;
	                        			}
                        			}
                        		}
                        	}
                        }
                        
                        // 循环删除计划明细中的id，有这个id会导致删除的时候误认为是删除已有明细.
                        //$scope.noticeType = $stateParams.noticeType;
                        for (var i=0; i< data.list.length; i++) {
                            $scope.idList.push(data.list[i].id);
                            data.list[i].id = "";
                            var sl_index;
                            if($scope.planType == 3154){
                                if(data.list[i].remainingNumber!="" && data.list[i].remainingNumber!=null){
                                	sl_index = data.list[i].remainingNumber.indexOf("超出");
                                	if (sl_index != -1) {
                                		data.list[i].inCount = 0;
                                	}
                                    data.list[i].inDetailTotalPrice = commonUtilService.accMul(data.list[i].inCount,data.list[i].inPrice);
                                    continue;
                                }
                            }else if($scope.planType == 3155){
                                if(data.list[i].outRemainingNumber!="" && data.list[i].outRemainingNumber!=null){
                                	sl_index = data.list[i].outRemainingNumber.indexOf("超出");
                                	if (sl_index != -1) {
                                		data.list[i].outCount = 0;
                                	}
                                	data.list[i].outDetailTotalPrice = commonUtilService.accMul(data.list[i].outCount,data.list[i].outPrice);
                                	continue;
                                }
                            }else{
                            	if(data.list[i].outRemainingNumber == "0" && data.list[i].remainingNumber!=0){
                            		sl_index = data.list[i].remainingNumber.indexOf("超出");
                                	if (sl_index != -1) {
                                		data.list[i].inCount = 0;
                                	}
                                	data.list[i].inDetailTotalPrice = commonUtilService.accMul(data.list[i].inCount,data.list[i].inPrice);
                            		//data.list[i].outCount = 0;
                                	data.list[i].outDetailTotalPrice = commonUtilService.accMul(data.list[i].outCount,data.list[i].outPrice);
                                	continue;
                                }
                            	if(data.list[i].remainingNumber == "0" && data.list[i].outRemainingNumber!=0){
                            		sl_index = data.list[i].outRemainingNumber.indexOf("超出");
                                	if (sl_index != -1) {
                                		data.list[i].outCount = 0;
                                	}
                                	data.list[i].outDetailTotalPrice = commonUtilService.accMul(data.list[i].outCount,data.list[i].outPrice);
                                	data.list[i].inDetailTotalPrice = commonUtilService.accMul(data.list[i].inCount,data.list[i].inPrice);
                            		continue;
                            	}
                            }
                        }

                        $scope.addedDetail = data.list;

                        // 计算合同数量.
                        $scope.countSumAmount();
                        
                    });
                }

            }
        }

        // 选择客户.
        $scope.getCustomer = function() {
            var params = [];
            params.type = "addBlacklist"; //不是黑名单人员
            var uibModalInstance = $uibModal.open({
                size:'lg',
                templateUrl: 'app/business/util/views/customer-list-modal.html',
                controller: 'customerListModalCtrl',
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
                    if ($scope.deliveryStorageNotice == null || $scope.deliveryStorageNotice == undefined) {
                        $scope.deliveryStorageNotice = {};
                    }
                    // 客户表id.
                    $scope.deliveryStorageNotice.customerBid = result.id;
                    // 客户编号
                    //$scope.deliveryStorageNotice.customerNumber = result.customerNumber;
                    // 客户姓名.
                    $scope.deliveryStorageNotice.deliveryCustomer = result.name;
                    // 联系方式.
                    if (result.classify == 3152) {
                        // 个人.
                        // 手机号码.
                        $scope.deliveryStorageNotice.mobile = result.mobile;
                        //身份证号
                        $scope.deliveryStorageNotice.identification = result.identification;
                    } else if (result.classify == 3153) {
                        // 企业.
                        // 企业电话.
                        $scope.deliveryStorageNotice.mobile = result.enterprisePhone;
                        //社会信用代码
                        $scope.deliveryStorageNotice.identification = result.socialCreditCode;
                    }
                    $("#deliveryCustomer-error").text(""); //去除客户名称的必选项提示
                }
                // 关闭模态框时刷新页面数据
            }, function (reason) {
                console.log(reason);
            });
        }

        // 清空客户.
        $scope.removeCustomer = function() {
            if (!$scope.isNotEdit && $scope.deliveryStorageNotice.identification != null) {
                // 客户表id.
                $scope.deliveryStorageNotice.customerBid = null;
                // 客户编码.
                $scope.deliveryStorageNotice.identification = null;
                // 客户姓名.
                $scope.deliveryStorageNotice.deliveryCustomer = null;
                // 联系方式.
                $scope.deliveryStorageNotice.mobile = null;
                //证件号
                $scope.deliveryStorageNotice.identification = null;
            }
        }

        // ----------------------------------------------    明细列表     开始          --------------------------------------------------
        // 子表数据模型.
        $scope.storeWareDetail = {};
        // 用于存放 子表数据 的数组.
        $scope.addedDetail = [];


      //点击编辑时，获取idlist的值
        $scope.iddetailInfo = function() {
        	storeWareDetailService.getByZidAndType($stateParams.id, "notice").then(function(data) {
        		
        		for (var i=0; i< data.list.length; i++) {
                    $scope.idList.push(data.list[i].id);
                }     
            },function(data){
                console.log(data);
            });
        }
        $scope.iddetailInfo();
        
     // 修改时弹出模态窗,通知单只能修改数量.
        $scope.editRow = function(detailInfo,$event,deliveryStorageNotice) {

            var copyId = $($event.target).parent().parent().find("td:first").text();
            
            var count = detailInfo.inCount;
            var countAnother = detailInfo.outCount;
            

            // 索引，用来保存模态框返回的数据.
            var index = $scope.addedDetail.indexOf(detailInfo);
            var params = [];
            storeWareDetailService.queryStoreWareDetailInfo(copyId).then(function(data){
            	if($scope.deliveryStorageNotice.billType == 1){
    				if(data.remainingNumber!= "" && data.remainingNumber!=null && data.remainingNumber !='undefined'){
    		            var sysl_index = detailInfo.remainingNumber.toString().indexOf(":");
    		            if (sysl_index != -1) {
    		            	detailInfo.remainingNumber = "-" + detailInfo.remainingNumber.substring(sysl_index+1, detailInfo.remainingNumber.length);
    		            	count = commonUtilService.accAdd(detailInfo.remainingNumber, detailInfo.inCount);
    		            	detailInfo.remainingNumber = detailInfo.remainingNumber.toString().replace("-", "超出:");
    		            } else {
    		            	count = commonUtilService.accAdd(detailInfo.remainingNumber, detailInfo.inCount);
    		            }
    				}
    			}else if($scope.deliveryStorageNotice.billType == 3){
    				if(data.outRemainingNumber!= "" && data.outRemainingNumber!=null && data.outRemainingNumber !='undefined'){
    					var sysl_index = detailInfo.outRemainingNumber.toString().indexOf(":");
    					if (sysl_index != -1) {
    		            	detailInfo.outRemainingNumber = "-" + detailInfo.outRemainingNumber.substring(sysl_index+1, detailInfo.outRemainingNumber.length);
    		            	countAnother = commonUtilService.accAdd(detailInfo.outRemainingNumber, detailInfo.outCount);
    		            	detailInfo.outRemainingNumber = detailInfo.outRemainingNumber.toString().replace("-", "超出:");
    		            } else {
    		            	countAnother = commonUtilService.accAdd(detailInfo.outRemainingNumber, detailInfo.outCount);
    		            }
    				}
    			}
            	
	    		if($scope.deliveryStorageNotice.planNumber!=null){
	    			params.planNumber = $scope.deliveryStorageNotice.planNumber;
	    		}
	    		if($scope.deliveryStorageNotice.planBid!=null){
	    			params.planBid = $scope.deliveryStorageNotice.planBid;
	    		}
	    		if($scope.deliveryStorageNotice.contractBid!=null){
	    			params.contractBid = $scope.deliveryStorageNotice.contractBid;
	    		}
	    		
	    		if($scope.deliveryStorageNotice.contract!=null){
	    			params.contractNumber = $scope.deliveryStorageNotice.contract;
	    		}
                params.detailType = "notice";
                params.state = detailInfo.state;//代储库的orgId
                params.houseName = detailInfo.houseName;
                params.houseId = detailInfo.houseId;
                params.warehouseName = detailInfo.warehouseName;
                params.warehouseId = detailInfo.warehouseId;
                params.demandAmount = detailInfo.demandAmount;
                params.grainKind = detailInfo.grainKind;
                params.grainDetailKind = detailInfo.grainDetailKind;
                params.grainAttribute = detailInfo.grainAttribute;
                params.grainGrade = detailInfo.grainGrade;
                params.grainAnnual = detailInfo.grainAnnual;
                params.productiveYear = detailInfo.productiveYear;
                //params.inputTime = detailInfo.inputTime;
                params.inputTime = $filter('date')(detailInfo.inputTime, "yyyy-MM-dd");
                params.grainProducingArea = detailInfo.grainProducingArea;
                params.inPrice = detailInfo.inPrice;
	    		params.inCount = detailInfo.inCount;
	    		params.outPrice = detailInfo.outPrice;
	    		params.outCount = detailInfo.outCount;
	    		params.originalCount = count;
	    		params.originalCountAnother = countAnother;
	    		params.remainingNumber = detailInfo.remainingNumber; //剩余数量
	    		params.outRemainingNumber = detailInfo.outRemainingNumber; //剩余数量
	    		params.inDetailTotalPrice = detailInfo.inDetailTotalPrice;
	    		params.outDetailTotalPrice = detailInfo.outDetailTotalPrice;
	    		params.planRemainingNumber = detailInfo.planRemainingNumber;  //计划的剩余数量
	    		params.planOutRemainingNumber = detailInfo.planOutRemainingNumber;  //计划的剩余数量
	    		params.copyId = copyId;

                // 通知单类型.
                params.executeType = $scope.deliveryStorageNotice.billType;
                // 只能修改数量.
                //params.onlyCanChangeAmount = true;
                //console.log(params);
                var uibModalInstance = $uibModal.open({
                    size:'lg',
                    templateUrl: 'app/business/storeWareDetail/views/storeWareDetailModal.html',
                    controller: 'storeWareDetailModalCtrl',
                    resolve: {
                        // items是一个回调函数
                        items: function () {
                            // 这个值会被模态框的控制器获取到
                            return params;
                        }
                    }
                });
                uibModalInstance.result.then(function (result) {
                    if (result != null && result != undefined && result != '') {
                    	
                    	if(result.state != $rootScope.userInfo.orgId){
	    					//仓房名称
	    					agentDepotService.getQueryAgentDepotList($rootScope.userInfo.orgId,result.state).then(function(data) {
	    						//代储库
	    						if(data!=null ){
	    							for(var agentDepotId in data){
	    								//根据agentDepotId和orgId获取仓房列表
	    								agentDepotService.getAgentStorehouseList(agentDepotId, $rootScope.userInfo.orgId).then(function(datas){
	    									for (var i = 0; i < datas.length; i++) {
	    										if(datas[i].storehouseId == result.houseId){
	    											$scope.addedDetail[index].houseName = datas[i].storehouseName;
	    										}
	    									}
	    								}, function (datas) {
	    									console.log(datas);
	    								});
	    							}
	    						}
	    						
	    					}, function (data) {
	    						console.log(data);
	    					});
	    					//货位名称
	    					agentDepotService.getAgentStoreWareList($rootScope.userInfo.orgId,result.houseId).then(function(data) {
	    						for (var i = 0; i < data.length; i++) {
	    							if(data[i].warehouseId == result.warehouseId){
	    								$scope.addedDetail[index].warehouseName = data[i].warehouseName;
	    							}
	    						}
	    					}, function (data) {
	    						console.log(data);
	    					});
	    				}else{
	    					$scope.addedDetail[index].houseName = result.houseName;
	    					$scope.addedDetail[index].warehouseName = result.warehouseName;
	    				}
	                	
                    	
                        // 子表数量.
                        $scope.addedDetail[index].demandAmount = result.demandAmount;
                        
                        $scope.addedDetail[index].houseId = result.houseId;
	                    $scope.addedDetail[index].warehouseId = result.warehouseId;

                        $scope.addedDetail[index].grainKind = result.grainKind;
                        $scope.addedDetail[index].grainDetailKind = result.grainDetailKind;
                        $scope.addedDetail[index].grainAttribute = result.grainAttribute;
                        $scope.addedDetail[index].grainGrade = result.grainGrade;
                        $scope.addedDetail[index].grainAnnual = result.grainAnnual;
                        $scope.addedDetail[index].productiveYear = result.productiveYear; //生产年份
                        $scope.addedDetail[index].inputTime = result.inputTime;
                        //字表的单价、数量、总价
                        $scope.addedDetail[index].outDetailTotalPrice = result.outDetailTotalPrice;
	                    $scope.addedDetail[index].inDetailTotalPrice = result.inDetailTotalPrice;
	                    $scope.addedDetail[index].inCount = result.inCount;
	                    $scope.addedDetail[index].outCount = result.outCount;
	                    $scope.addedDetail[index].remainingNumber = result.remainingNumber; //剩余数量
	                    $scope.addedDetail[index].outRemainingNumber = result.outRemainingNumber; //剩余数量
	                    $scope.addedDetail[index].inPrice = result.inPrice;
	                    $scope.addedDetail[index].outPrice = result.outPrice;
                        // 计算总数量.
                        $scope.countSumAmount();
                        //计算总金额
                        $scope.countMoneyQuantity();
                    }
                }, function (reason) {
                    console.log(reason);
                });



            });
        }

        // 删除一行
        $scope.deleteRow = function(detail) {
            if ($scope.addedDetail.length <= 1 ) {
                alert("必须填写一条明细信息！");
                return;
            }
            if (detail.id != null && detail.id != undefined && detail.id != '') {
                if (!confirm("此条数据为之前保存的数据，确定要删除吗？")) {
                    return;
                }
                  storeWareDetailService.deleteDetailDataById(detail.id).then(function(data) {
                    // 计算合同数量 = 明细总数量
                    $scope.countSumAmount();
                },function(data){
                    console.log(data);
                });
            }
            var index = $scope.addedDetail.indexOf(detail);
            if (index != -1) {
                $scope.addedDetail.splice(index, 1);
                // 计算合同数量 = 明细总数量
                $scope.countSumAmount();
            }

        }


        // 计算总数量 = 明细数量之和.
        $scope.countSumAmount = function() {
            var totalAmount = 0;
            for (var i = 0; i < $scope.addedDetail.length; i++) {
                //入库 1
                if ($scope.deliveryStorageNotice.billType==1 && $scope.addedDetail[i].inCount != null && $scope.addedDetail[i].inCount != '') {
                    // 累加明细数量.
                    totalAmount += parseFloat($scope.addedDetail[i].inCount);
                }
                //出库3
                if ($scope.deliveryStorageNotice.billType==3 && $scope.addedDetail[i].outCount != null && $scope.addedDetail[i].outCount != '') {
                	// 累加明细数量.
                	totalAmount += parseFloat($scope.addedDetail[i].outCount);
                }
                
            }
            
            $scope.deliveryStorageNotice.shipingCount = totalAmount;
            $scope.countMoneyQuantity();
        }
        

        // 计算总金额= 明细金额之和.
        $scope.countMoneyQuantity = function() {
            var detailTotalPrice = 0;
            for (var i = 0; i < $scope.addedDetail.length; i++) {
                /*if ($scope.addedDetail[i].detailTotalPrice != null && $scope.addedDetail[i].detailTotalPrice != '') {
                    // 累加明细金额.
                    detailTotalPrice += parseFloat($scope.addedDetail[i].detailTotalPrice);
                }*/
                
                //入库
                if ($scope.deliveryStorageNotice.billType==1 && $scope.addedDetail[i].inDetailTotalPrice != null && $scope.addedDetail[i].inDetailTotalPrice != '') {
                    // 累加明细金额.
                    detailTotalPrice += parseFloat($scope.addedDetail[i].inDetailTotalPrice);
                }
                //出库
                if ($scope.deliveryStorageNotice.billType==3 && $scope.addedDetail[i].outDetailTotalPrice != null && $scope.addedDetail[i].outDetailTotalPrice != '') {
                	// 累加明细金额.
                	detailTotalPrice += parseFloat($scope.addedDetail[i].outDetailTotalPrice);
                }
            }
            $scope.deliveryStorageNotice.moneyQuantity= detailTotalPrice;

        }
        // ----------------------------------------------    计划明细列表     结束          --------------------------------------------------


        // ----------------------------------------------    树形下拉框     开始          --------------------------------------------------
        // 树形下拉框(粮食性质)
        $scope.getAttributeData = function() {
            enumService.getTreeList($scope.deliveryStorageNotice.grainAttribute, "grainAttribute").then(function(data) {
                $scope.grainAttributeTreeData = data;
            },function(data) {
                console.log(data);
            })
        }

        // 树形下拉框(粮食产地)
        $scope.getAreaData = function() {
            enumService.getTreeList($scope.deliveryStorageNotice.grainProducingArea, "grainProducingArea").then(function(data) {
                $scope.grainProducingAreaTreeData = data;
            },function(data){
                console.log(data);
            })
        }


        // 树形下拉框(明细品种)
        $scope.getGrainDetailKind = function() {
            enumService.getTreeListByTypeId($scope.deliveryStorageNotice.grainDetailKind, $scope.deliveryStorageNotice.goodsKind).then(function(data) {
                $scope.grainDetailKindTreeData = data;
            },function(data) {
                console.log(data);
            })
        };

        // ----------------------------------------------    树形下拉框     结束          --------------------------------------------------
       
        // 如果id不为0，说明是查询或者查看，需要查询后台.
        if ($stateParams.id != 0) {
            // 修改.
            $scope.isNotEdit = $stateParams.isNotEdit;
            $scope.noticeType = $stateParams.noticeType;
            if ($stateParams.isNotEdit == true) {
                $scope.loadDetailDataByIdAndPID($stateParams.id, $stateParams.processInstanceId);
                //暂停、终止、启用的显示
                if($stateParams.check == 1){
                    $scope.auditPassNotice = true ;
                }
            } else {
                //提交按钮的显示
                $scope.showCommitNotice = true ;
                $scope.loadDataById($stateParams.id);
            }

            if ($stateParams.noticeType == "delivery") {
                $scope.deliveryStorageNotice.billType = 3;
            } else {
                $scope.deliveryStorageNotice.billType = 1;
            }
        } else {
            // 新增.
            //提交按钮的显示
            $scope.showCommitNotice = true ;
            $scope.getAttributeData();
            $scope.getAreaData();

            // 编码类型.
            var codeType = "";
            if ($stateParams.noticeType == "delivery") {
                $scope.deliveryStorageNotice.billType = 3;
                codeType = "deliveryNotice";
            } else {
                $scope.deliveryStorageNotice.billType = 1;
                codeType = "storageNotice";
            }

            // 获取通知单编号.
            $scope.gainPlan();
        }

        // 保存.
        $scope.savePlanData  = function (variable) {
            $http({
                method: 'POST',
                url: APP_CONFIG.businessUrl + '/depot/business/deliveryStorageNotice/save',
                data: {
                    deliveryStorageNoticeJson : angular.toJson($scope.deliveryStorageNotice),
                    businessStoreWareDetailJson : angular.toJson($scope.detailList),
                    userId : $rootScope.userInfo.userId,
                    name : $rootScope.userInfo.realName,
                    orgId : $rootScope.userInfo.orgId,
                    depotInfoOrgId : $rootScope.orgInfo.orgId
                }
            }).then(function successCallback(response) {
                if(response.data.status == "success") {

                    if(variable != null && variable != "" && typeof variable != 'undefined' ){
                        if($stateParams.id == 0){
                            //新增数据返回 id
                            var id = response.data.id;
                        }else {
                            //修改页面
                            var id = $stateParams.id;
                            variable = "2";
                        }

                        deliveryStorageNoticeAuditService.loadDataById(id).then(function(data){
                            $scope.deliveryStorageNotice = data.deliveryStorageNotice;
                            $scope.choice($scope.deliveryStorageNotice,variable);
                        },function(data){
                        });
                    }else{
                        alert("保存成功！");
                        // location.href=APP_CONFIG.businessUrl + '/#/business/deliveryStorageNotice';
                        $state.go("app.business.deliveryStorageNotice");
                    }
                } else {
                    $scope.saveFlag = false;
                    alert(response.data.msg);
                }
            }, function errorCallback(response) {
                // 请求失败执行代码
            });
        }


        $scope.save = function (variable) {
            if ($scope.billNumber.status != undefined && $scope.billNumber.status == "error") {
                if (confirm("通知单编号有误！该页面无法保存！原因：" + $scope.billNumber.msg + " 是否返回到列表页！")) {
                    $scope.retList();
                    return;
                } else {
                    return;
                }
            }
            if(validator.form()){
            	if($scope.deliveryStorageNotice.deliveryCustomer==null || $scope.deliveryStorageNotice.deliveryCustomer == 'undefined'){
            		$("#deliveryCustomer-error").text("必须填写");
            		return ;
            	}
            }
            
          //验证运输方式是否为空
            if($scope.deliveryStorageNotice.qualityStandard==null || $scope.deliveryStorageNotice.qualityStandard == 'undefined'){
        		$scope.saveFlag = false;
        		return ;
        	}
            
            if (!$scope.saveFlag) {
                var titles = "";
                var len = $("td[id^='copyId_']").length;
                $("td[id^='copyId_']").each(function(i){
                    var number = $(this).attr("id").split("_")[1];
                    var copyId = $(this).text();
                    var count = 0;
                    var anotherCount = 0;
                    var num = i;

                        if((len-1) == num){//循环到最后一个
                            
                                //设置saveFlag为true,防止重复提交.
                                $scope.saveFlag = true;

                                $scope.detailList = [];

                                var detailSumAmount = 0;
                                var detailSumAmountAnother = 0;

                                for (var i = 0; i < $scope.addedDetail.length; i++) {
                                    if ($scope.addedDetail[i] != null && $scope.addedDetail[i] != '') {
                                        $scope.detailList.push($scope.addedDetail[i]);

                                        //入库
                                        if($scope.deliveryStorageNotice.billType == "1" && $scope.addedDetail[i].inCount == 0){
                                        	alert("明细数量有一条为0,请先删除此数据，否则不能提交");
                                            return;
                                        }
                                        //出库
                                        if($scope.deliveryStorageNotice.billType == "3" && $scope.addedDetail[i].outCount==0){
                                        	alert("明细数量有一条为0,请先删除此数据，否则不能提交");
                                            return;
                                        }

                                        // 累加明细数量.
                                        if($scope.deliveryStorageNotice.billType == "1" && $scope.addedDetail[i].inCount!=null && $scope.addedDetail[i].inCount!="" && $scope.addedDetail[i].inCount!='undefined'){
                                        	detailSumAmount += parseFloat($scope.addedDetail[i].inCount);
                                        }
                                        if($scope.deliveryStorageNotice.billType == "3" && $scope.addedDetail[i].outCount!=null && $scope.addedDetail[i].outCount!="" && $scope.addedDetail[i].outCount!='undefined'){
                                        	detailSumAmountAnother += parseFloat($scope.addedDetail[i].outCount);
                                        }
                                        
                                    }
                                }

                                if ($scope.detailList.length == 0) {
                                    $scope.saveFlag = false;
                                    alert("至少填写一条完整的明细信息！");
                                    return;
                                }
                                // 通知单数量等于 满足要求的明细信息数量之和.(正常来说都是满足要求的，为了防止有没有选择仓房和货位号的情况)
                                if($scope.deliveryStorageNotice.billType == "1" && $scope.deliveryStorageNotice.detailSumAmount!=null && detailSumAmount!=0 && detailSumAmount!=""){
                                	$scope.deliveryStorageNotice.shipingCount = detailSumAmount;
                                }
                                if($scope.deliveryStorageNotice.billType == "3" && detailSumAmountAnother!=null && detailSumAmountAnother!=0 && detailSumAmountAnother!=""){
                                	$scope.deliveryStorageNotice.shipingCount = detailSumAmountAnother;
                                }
                                

                                if(titles != ""){
                                    var msg = confirm(titles);
                                    if(msg == true){
                                        $scope.savePlanData(variable);
                                    }else{
                                        $scope.saveFlag = false;
                                    }
                                }else{
                                    $scope.savePlanData(variable);
                                }

                        }
                    //});
                });

                }
            }
    });
