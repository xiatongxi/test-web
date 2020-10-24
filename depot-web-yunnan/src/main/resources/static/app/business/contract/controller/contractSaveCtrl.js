angular.module('app.business').controller("contractSaveCtrl",
    function($scope, $rootScope, $filter, $http, $state, $stateParams, $uibModal, userService,FileUploader,agentDepotService,
             contractService, storeWareDetailService, commonUtilService, enumService, codeRuleService, APP_CONFIG) {

        $scope.contract = {};
        $scope.contractNumber = {};
        $scope.idList = [];
        $scope.isNotEdit = false;
        // 防止重复提交标识.
        $scope.saveFlag = false;
        // 显示新增明细的按钮(选择计划后，隐藏).
        $scope.addRowButtonShow = true;
        // 是否选择计划,默认为false.
        $scope.selectPlan = false;
        $scope.hidden=true; //明细按钮的显示

      //日期时间的比较
        $scope.changeDate = function() {
    		
            if($scope.contract.enableDate != "" && $scope.contract.enableDate != null && 
                    $scope.contract.disableDate != "" && $scope.contract.disableDate != null){
    			
                $scope.contract.enableDate = $filter('date')($scope.contract.enableDate, "yyyy-MM-dd");//生效日期
                $scope.contract.disableDate = $filter('date')($scope.contract.disableDate, "yyyy-MM-dd");//截止日期
                
                if($scope.contract.enableDate > $scope.contract.disableDate){
                        alert("合同截止日期要大于或者等于合同生效日期");
                        $scope.contract.disableDate = null;
                }
            }
    			
    			
                if($scope.contract.enableDate!="" && $scope.contract.enableDate!=null && 
                        $scope.contract.signingTime!="" && $scope.contract.signingTime!=null){
    				
                    $scope.contract.signingTime = $filter('date')($scope.contract.signingTime, "yyyy-MM-dd");//签订日期
                    $scope.contract.enableDate = $filter('date')($scope.contract.enableDate, "yyyy-MM-dd");//生效日期
    				
                    if($scope.contract.enableDate < $scope.contract.signingTime){
                        alert("合同签订日期要小于或者等于合同生效日期");
                        $scope.contract.signingTime = null;
                     }
                }
    		
        }
        
        //获取合同编号
        $scope.gainContract  = function() {
            codeRuleService.getCodeValueByType("contract", $rootScope.depotId).then(function(data) {
                if (data.status == "success") {
                    $scope.contractNumber.status = "success";
                    $scope.contract.contractNumber = data.codeValue;
                } else if (data.status == "error") {
                    $scope.contractNumber.msg = data.msg;
                    $scope.contractNumber.status = "error";
                    if(confirm("合同编号有误！该页面无法保存！原因：" + $scope.contractNumber.msg + " 是否返回到列表页！")) {
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
        //签订人 信息
        $scope.userInfoMessage = function() {
            userService.getPageInfo(null, null, null,null, null, null).then(function(data){
                $scope.userInfoList = data.list;
            },function(data){
                console.log(data);
            });
        }
        $scope.userInfoMessage();


        $scope.loadDataById = function(id) {
            contractService.loadDataById(id).then(function(data){
                $scope.contract = data.contract;
                $scope.contract.contractType = data.contract.contractType+"";
                $scope.fileList = data.fileList;
                $scope.contract.signingMan=parseInt(data.contract.signingMan);
                $scope.contract.signingTime = $filter('date')($scope.contract.signingTime, "yyyy-MM-dd");
                $scope.contract.enableDate = $filter('date')($scope.contract.enableDate, "yyyy-MM-dd");
                $scope.contract.disableDate = $filter('date')($scope.contract.disableDate, "yyyy-MM-dd");

                // 获取粮食性质 下拉树.
                $scope.getAttributeData();
                // 获取粮食产地 下拉树.
                $scope.getAreaData();
                // 获取粮食产 明细品种.
                $scope.getGrainDetailKind();
            },function(data){
            });
        }

        $scope.loadDataById = function(id, processInstanceId) {
            contractService.loadDataByIdAndProcessInstanceId(id, processInstanceId).then(function(data){
                $scope.contract = data.contract;
                $scope.contract.contractType = data.contract.contractType+"";
                $scope.auditList = data.auditList;
                $scope.fileList = data.fileList;
                $scope.contract.signingMan=parseInt(data.contract.signingMan);
                $scope.processDefinitionId = data.contract.processDefinitionId;
                $scope.processInstanceId = data.contract.processInstanceId;

                $scope.contract.signingTime = $filter('date')($scope.contract.signingTime, "yyyy-MM-dd");
                $scope.contract.enableDate = $filter('date')($scope.contract.enableDate, "yyyy-MM-dd");
                $scope.contract.disableDate = $filter('date')($scope.contract.disableDate, "yyyy-MM-dd");

                if (data.contract.planBid != undefined && data.contract.planBid != null) {
                    // 隐藏新增明细按钮.
                    $scope.addRowButtonShow = false;
                    // 选择了计划.
                    $scope.selectPlan = true;
                }
                // 子表数据.
                $scope.storeWareDetailList = data.storeWareDetailList;
                for (var i=0; i < data.storeWareDetailList.length; i++) {
                    $scope.addedDetail.push(angular.copy(data.storeWareDetailList[i]));
                }

                // 获取粮食性质 下拉树.
                $scope.getAttributeData();
                // 获取粮食产地 下拉树.
                $scope.getAreaData();
                // 获取粮食产 明细品种.
                $scope.getGrainDetailKind();
            },function(data){
            });
        }


        $('input[readOnlyButValid]').on("focusin", function() {
            $(this).prop('readOnly', true);
        });

        $('input[readOnlyButValid]').on("focusout", function() {
            $(this).prop('readOnly', false);
        });

        var validator = $("#contract-form").validate();

        // 自定义验证，验证数字
        $.validator.addMethod("validNumber",function(value,element, params) {
            var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;
            return this.optional(element)||(checkNumber.test(value));
        },"请输入正确的数字类型，最多两位小数！");

        // 自定义验证，验证计划编号是否可用
        $.validator.addMethod("validContractNumber", function(value, element) {
            var result = false;
            // 设置同步
            $.ajaxSetup({
                async: false
            });
            var param = {
                id : $scope.contract.id,
                contractNumber : $scope.contract.contractNumber
            };
            $.get(APP_CONFIG.businessUrl + '/depot/business/contract/validContractNumber', param, function(data){
                result = data;
            });
            // 恢复异步
            $.ajaxSetup({
                async: true
            });
            return result;
        }, "用合同编号已被使用，请重新输入");

        // 返回.
        $scope.retList = function () {
            if ($rootScope.previousState_name != '') {
            	if($rootScope.previousState_name.indexOf("app.additionalHome") != -1){//首页跳转的返回首页
            		$rootScope.isIndexPage = true;
            	}
                $rootScope.back();
            } else {
            	$state.go("app.business.contract");
            }
        }

        $scope.a = "";
        // 计划列表.
        $scope.getPlan = function() {
            // 合同类型.
            //$scope.contract.contractType = null;

            // 选择计划，选择后不能修改合同类型.
            var params = [];
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
                if (result != null) {
                    // 获取明细信息.
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
                        for (var i=0; i< data.list.length; i++) {
                            $scope.idList.push(data.list[i].id);
                            data.list[i].id = "";
                            var sl_index;
                            //收储计划
                            if(result.executeType == 3154){
                                if(data.list[i].remainingNumber!="" && data.list[i].remainingNumber!=null){
                                	sl_index = data.list[i].remainingNumber.indexOf("超出");
                                	if (sl_index != -1) {
                                		data.list[i].inCount = 0;
                                    }
                                    data.list[i].inDetailTotalPrice = commonUtilService.accMul(data.list[i].inCount,data.list[i].inPrice);
                                    continue;
                                }
                            }else if(result.executeType == 3155){//销售计划
                                if(data.list[i].outRemainingNumber!="" && data.list[i].outRemainingNumber!=null){
                                	sl_index = data.list[i].outRemainingNumber.indexOf("超出");
                                	if (sl_index != -1) {
                                		data.list[i].outCount = 0;
                                    }
                                	data.list[i].outDetailTotalPrice = commonUtilService.accMul(data.list[i].outCount,data.list[i].outPrice) ;
                                	continue;
                                }
                            }else{//轮换计划
                            	/* 原if(data.list[i].outRemainingNumber == "0" && data.list[i].remainingNumber!=0){
                            		sl_index = data.list[i].remainingNumber.indexOf("超出");
                            		if (sl_index != -1) {
                                		data.list[i].inCount = 0;
                                    }
                            		data.list[i].inDetailTotalPrice = commonUtilService.accMul(data.list[i].inCount,data.list[i].inPrice);
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
                                	data.list[i].outDetailTotalPrice = commonUtilService.accMul(data.list[i].outCount,data.list[i].outPrice) ;
                                }
                            	
                            }
                            
                        }
                        
                        
                        $scope.addedDetail = data.list;
                        
                        
                        // 计算合同数量.
                        $scope.countSumAmount();
                        //计算总金额
                        $scope.sumPrice();

                    });

                    // 说明选择了计划.
                    if ($scope.contract == null || $scope.contract == undefined) {
                        $scope.contract = {};
                    }
                    
                    $scope.contract.planNumber = result.planNumber;
                    $scope.contract.planBid = result.id;
                    

                    // 根据计划类型，获取合同类型.(轮换计划时，合同类型自选)
                    // 计划：收储计划：3154，销售计划：3155，轮换计划:3156
                    // 合同：收购合同：3147，销售合同3148
                    if (result.executeType== 3154) {
                        $scope.contract.contractType = 3147+"";
                        $scope.selectPlan = true;
                        $scope.isEdit = true;
                    } else if (result.executeType== 3155) {
                        $scope.contract.contractType = 3148+"";
                        $scope.selectPlan = true;
                        $scope.isEdit = true;
                    }else{
                        $scope.selectPlan = false;
                        $scope.isEdit = false;

                    }

                    // 隐藏新增明细的按钮.
                    $scope.addRowButtonShow = false;

                    $scope.getAttributeData();
                }
                // 关闭模态框时刷新页面数据
            }, function (reason) {
                console.log(reason);
            });
        }


        //合同类型的更改
        $scope.changeType = function(){
        	if($scope.contract.planNumber == null){
                // 清空明细.
        		$scope.addedDetail= [];
        	}
        	//总数量变更
            $scope.countSumAmount();
            //总金额变更
            $scope.sumPrice();
        }
        // 清空计划.
        $scope.removePlan = function() {
            if (true) {
                $scope.contract.planNumber = null;
                $scope.contract.planBid = null;
                
                // 运输方式.
                $scope.contract.shippingType = null;
                // 合同类型.
                $scope.contract.contractType = null;
                
                //清空合同数量
                $scope.contract.grainQuantity = null;
                //清空合同金额
                $scope.contract.moneyQuantity = null;

                $scope.selectPlan = false;
                // 隐藏新增明细的按钮.
                $scope.addRowButtonShow = true;
                // 清空明细.
                $scope.addedDetail= [];
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
                    if ($scope.contract == null || $scope.contract == undefined) {
                        $scope.contract = {};
                    }
                    // 客户编号
                    $scope.contract.customerNumber = result.customerNumber;
                    // 客户表id.
                    $scope.contract.customerBid = result.id;
                    // 客户姓名.
                    $scope.contract.customerName = result.name;

                    // 联系方式.证件号
                    if (result.classify == 3152) {
                        // 个人.
                        // 手机号码.
                        $scope.contract.mobile = result.mobile;
                        //身份证号
                        $scope.contract.identification = result.identification;
                    } else if (result.classify == 3153) {
                        // 企业.
                        // 企业电话.
                        $scope.contract.mobile = result.enterprisePhone;
                        //社会信用代码
                        $scope.contract.identification = result.socialCreditCode;
                    }
                    // 开户行名称.
                    $scope.contract.bankName = result.bankName;
                    // 银行账户名称.
                    $scope.contract.accountName = result.accountName;
                    // 开户账号
                    $scope.contract.accountNumber = result.accountNumber;
                    // 客户种粮面积
                    // $scope.contract.plantAcreage = result.plantAcreage;
                    // 每亩补贴数量
                    //$scope.contract.subsidy = result.subsidy;

                }
                // 关闭模态框时刷新页面数据
            }, function (reason) {
                console.log(reason);
            });
        }

        // 清空客户.
        $scope.removeCustomer = function() {
            if (!$scope.isNotEdit && $scope.contract.customerNumber != null) {
                // 客户编号.
                $scope.contract.customerNumber = null;
                // 客户表id.
                $scope.contract.customerBid = null;
                // 客户姓名.
                $scope.contract.customerName = null;

                // 联系方式.
                $scope.contract.mobile = null;
                // 开户行名称.
                $scope.contract.bankName = null;
                // 银行账户名称.
                $scope.contract.accountName = null;
                // 开户账号.
                $scope.contract.accountNumber = null;
                // 客户种粮面积.
                $scope.contract.plantAcreage = null;
                // 每亩补贴数量.
                $scope.contract.subsidy = null;

            }
        }

        // ----------------------------------------------    明细列表     开始          --------------------------------------------------
        // 子表数据模型.
        $scope.storeWareDetail = {};
        // 用于存放 子表数据 的数组.
        $scope.addedDetail = [];

        // 点击新增或者修改时弹出模态窗
        $scope.addRow = function() {
            // 先判断才能新增.
            if ($scope.contract.contractType == '' || $scope.contract.contractType == null ) {
                alert("合同类型必须填写！");
                return;
            }

            var params = [];

            params.detailType = "contract";
            // 合同类型.
            params.executeType = $scope.contract.contractType;
            //计划编号
            params.planNumber = $scope.contract.planNumber;
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
                	if($rootScope.userInfo.orgId != result.state){
    					//仓房名称
    					agentDepotService.getQueryAgentDepotList($rootScope.userInfo.orgId,result.state).then(function(data) {
    						//代储库
    						if(data!=null ){
    							for(var agentDepotId in data){
    								//根据agentDepotId和orgId获取仓房列表
    								agentDepotService.getAgentStorehouseList(agentDepotId, $rootScope.userInfo.orgId).then(function(datas){
    									for (var i = 0; i < datas.length; i++) {
    										if(datas[i].storehouseId == result.houseId){
    											result.houseName = datas[i].storehouseName;
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
    								result.warehouseName = data[i].warehouseName;
    							}
    						}
    					}, function (data) {
    						console.log(data);
    					});
              		 }
                    $scope.addedDetail.push(result);
                    // 计算总数量.
                    $scope.countSumAmount();
                    //计算总金额
                    $scope.sumPrice();
                }
            }, function (reason) {
                console.log(reason);
            });
        }

        //点击编辑时，获取idlist的值
        $scope.iddetailInfo = function() {
        	storeWareDetailService.getByZidAndType($stateParams.id, "contract").then(function(data) {
        		
        		for (var i=0; i< data.list.length; i++) {
                    $scope.idList.push(data.list[i].id);
                }     
            },function(data){
                console.log(data);
            });
        }
        $scope.iddetailInfo();
        
        // 修改时弹出模态窗
        $scope.editRow = function(detailInfo,$event,contract) {
        	
            // 先判断.
            if ($scope.contract.contractType == '' || $scope.contract.contractType == null	) {
                alert("合同类型必须填写！");
                return;
            }
            var copyId = $($event.target).parent().parent().find("td:first").text();
            
            var count = detailInfo.inCount;
            var countAnother = detailInfo.outCount;
            // 索引，用来保存模态框返回的数据.
            var index = $scope.addedDetail.indexOf(detailInfo);

            var params = [];

            	storeWareDetailService.queryStoreWareDetailInfo(copyId).then(function(data){
            		if(data!=null){
            			if($scope.contract.contractType == 3147){   
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
            				
            			}else if($scope.contract.contractType == 3148){
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
            		}
            
            				if($scope.contract.planNumber!=null){
            					params.planNumber = $scope.contract.planNumber; //计划编号
            				} else {
            					count = "N";
            					countAnother = "N";
            				}
            				params.id = contract.id;
            	    		params.detailType = "contract";
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

            	    		if(contract.planBid!=null && contract.planBid!='undefined'){
            	    			params.planBid = contract.planBid ; //该合同的id
            	    		}
            	    		if(contract.id!=null && contract.id!='undefined'){
            	    			params.id = contract.id ; //该合同的id
            	    		}
            	    		
            	    		// 合同类型.
            	            params.executeType = $scope.contract.contractType;
            	    		
            	            params.onlyCanChangeAmount = $scope.selectPlan;
            	    		
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
            	                    
            	                    $scope.addedDetail[index].state = result.state;
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
            	                    $scope.addedDetail[index].planRemainingNumber = result.planRemainingNumber; //计划的剩余数量
            	                    $scope.addedDetail[index].planOutRemainingNumber = result.planOutRemainingNumber; //计划的剩余数量

            	                    // 计算总数量.
            	                    $scope.countSumAmount();
            	                    //计算总金额
            	                    $scope.sumPrice();
            	    				
            	                }
            	            }, function (reason) {
            	                console.log(reason);
            	            });
            	       //});
            	},function(data){
                    console.log(data);
                });
            			
        }   

        // 删除一行
        $scope.deleteRow = function(detailInfo) {

            if ($scope.addedDetail.length <= 1 ) {
                alert("必须填写一条计划详情信息！");
                return;
            }

            if (detailInfo.id != null && detailInfo.id != undefined && detailInfo.id != '') {
                if (!confirm("此条数据为之前保存的数据，确定要删除吗？")) {
                    return;
                }
                storeWareDetailService.deleteDetailDataById(detailInfo.id).then(function(data) {
                    //总数量变更
                    $scope.countSumAmount();
                    //总金额变更
                    $scope.sumPrice();
                },function(data){
                    console.log(data);
                });
            }
            //从数组中移除
            var index = $scope.addedDetail.indexOf(detailInfo);
            if (index != -1) {
                // 从addedDetail移除.
                $scope.addedDetail.splice(index, 1);
              //总数量变更
                $scope.countSumAmount();
                //总金额变更
                $scope.sumPrice();
            }

        }

        // 计算总数量 = 明细数量之和.
        $scope.countSumAmount = function() {
            var totalAmount = 0;
            for (var i = 0; i < $scope.addedDetail.length; i++) {
            	
                if ($scope.contract.contractType==3147 &&$scope.addedDetail[i].inCount != null && $scope.addedDetail[i].inCount != '') {
                    // 累加明细数量.
                    totalAmount += parseFloat($scope.addedDetail[i].inCount);
                }
                if ($scope.contract.contractType==3148 &&$scope.addedDetail[i].outCount != null && $scope.addedDetail[i].outCount != '') {
                	// 累加明细数量.
                	totalAmount += parseFloat($scope.addedDetail[i].outCount);
                }
            }
            $scope.contract.grainQuantity = totalAmount;

        }

        // 计算总金额= 明细金额之和.
        $scope.sumPrice = function() {
            var detailTotalPrice = 0;
            
            for (var i = 0; i < $scope.addedDetail.length; i++) {
                if ($scope.contract.contractType==3147 && $scope.addedDetail[i].inDetailTotalPrice != null && $scope.addedDetail[i].inDetailTotalPrice != '') {
                    // 累加明细金额.
                    detailTotalPrice += parseFloat($scope.addedDetail[i].inDetailTotalPrice);
                }
                if ($scope.contract.contractType==3148 && $scope.addedDetail[i].outDetailTotalPrice != null && $scope.addedDetail[i].outDetailTotalPrice != '') {
                	// 累加明细金额.
                	detailTotalPrice += parseFloat($scope.addedDetail[i].outDetailTotalPrice);
                }
            }
            $scope.contract.moneyQuantity= detailTotalPrice;

        }


        // 计算合同金额.
        $scope.countMoneyQuantity = function() {
            $scope.contract.moneyQuantity = commonUtilService.accMul($scope.contract.grainQuantity, $scope.contract.grainPrice);
        }
        // ----------------------------------------------    计划明细列表     结束          --------------------------------------------------

     // -----------------------------------------------   上传下载相关     开始------------------------------------------------
        var bid = null;
    	// 添加一行，取最大值加1放入数组
    	$scope.linenumber = 0;
    	$scope.linenumbers = [];
    	if ($stateParams.id == '') {
    		$scope.linenumbers = [0];
    	}
    	
    	// 新增一行
    	$scope.addFile = function() {
    		if ($scope.linenumbers.length == 0 ) {
    			$scope.linenumbers.push(0);
    		} else if($scope.fileItem === undefined || $scope.fileItem === null){
    			alert("请先添加文件,在添加浏览框.");
    			return;
    		}else {
    			var maxlinenumber = Math.max.apply(null, $scope.linenumbers);
    			$scope.linenumbers.push(maxlinenumber + 1);
    			$scope.fileItem = null;
    		}
    	}
    	
    	// 文件上传实例
    	$scope.fileIds = [];
    	
    	// 以linenumber为key,以新增的附件对应为value.
    	$scope.fileMap = new Map();
    	
    	// 上传.
    	$scope.uploader = new FileUploader({
    		//url : APP_CONFIG.businessUrl + '/depot/business/file/uploadFile',
    		url : APP_CONFIG.basicUrl + '/fileUpload/updateFileBusiness',
    		autoUpload : true, // 将文件添加到队列后自动上传.
    		formData : [{type : 'contract',userId:$rootScope.userInfo.userId,orgId:$rootScope.userInfo.orgId}], // 与文件一起发送的数据
    		
    		//url : APP_CONFIG.basicUrl + '/fileUpload/uploadFile',
    		//headers : {'content-type':"text/plain;charset=UTF-8"},
    		//formData : [{type : 'plan'}], // 与文件一起发送的数据
    		removeAfterUpload : true, // 从队列上传后删除文件
    		// 上传进度
    		
    		onProgressItem : function(fileItem, progress) {
    			$scope.fileItem = fileItem;
    			if(progress==100){
    				alert("上传成功！");
    			}
    			// console.info("正在上传：" + progress + "%");
    		},
    		// 回调函数，在一个文件上传成功后触发
    		
    		onSuccessItem : function(fileItem, response, status, headers) {
    			
    			// 将新fileId加入到fileIds.
    			$scope.fileIds.push(response.id);
    			// 如果已经存在对应的fileId，先从$scope.fileIds中移除，再添加.
    			if ($scope.fileMap.has($scope.linenumber)) {
    				// 原fileId.
    				var fileId = $scope.fileMap.get($scope.linenumber).id;
    				// 从$scope.fileIds中移除原fileId.
    				var index = $scope.fileIds.indexOf(fileId);
    		        if (index != -1) {
    		            // 后台删除.
    		            $scope.deleteFileByFileId(fileId);
    		        }
    			}
    			
    			$scope.fileMap.set($scope.linenumber, response);
    			
    		}
    	});
    	
    	// 点击文件框
    	$scope.clickInput = function(index) {
    		$scope.linenumber = index;
            document.activeElement.previousSibling.children[0].click();
    		// console.log(angular.element("#fileInputId" + index));
    		// angular.element("#fileInputId" + index).trigger('click');
    	}
    	
    	
    	// 点击浏览按钮.
    	$scope.clickFileInput = function(index) {
    		$scope.linenumber = index;
    	}
    	
    	// 下载文件
    	$scope.download = function(filePath, originalFileName) {
    		$("#filePath").val(filePath);
    		$("#type").val("business");
    		$("#originalFileName").val(originalFileName);
    		$("#download-form").attr("action", APP_CONFIG.businessUrl + '/download');
    		$("#download-form").submit();
        	
    	}
    	
    	// 文件上传实例
    	$scope.deleteFileIds = [];
    	// 回显删除.
    	$scope.deleteFile = function(file) {
    		// 回显删除，先不真正删除，把要删除的附件id保存在数组中，再最后保存的时候传递给后台，进行删除.
    		$scope.deleteFileIds.push(file.id);
    		
    		// 删除文件和数据库信息.
    		// $scope.deleteFileByFileId(file.id);
    		
    		// 从$scope.fileList 移除.
    		var index = $scope.fileList.indexOf(file);
    		if (index != -1) {
    			$scope.fileList.splice(index, 1);
    		}
    	}
    	
    	$scope.deleteFileByLinenumber = function(linenumber) {
    		var index = $scope.linenumbers.indexOf(linenumber);
            if (index != -1) {
            	// 从linenumbers移除.
                $scope.linenumbers.splice(index, 1);
                
                if ($scope.fileMap.has($scope.linenumber)) {
                	// 以linenumber为key从$scope.fileMap获取fileId.
                	   var fileId = $scope.fileMap.get($scope.linenumber).id;
    		        	// 后台删除数据和文件.
    		        	$scope.deleteFileByFileId(fileId, index);
    		        	
    		        	// 从$scope.fileMap移除.
    		        	$scope.fileMap.delete(linenumber);
    			}
            }
    	}
    	
    	$scope.deleteFileByFileId = function(fileId) {
    		businessFileService.remove(fileId).then(function(data){
    			if (data.status == "success") {
    	    		// 删除成功.
    	    		var index = $scope.fileIds.indexOf(fileId);
    	        	if (index != -1) {
    		        	// 从$scope.fileIds中移除.
    		        	$scope.fileIds.splice(index, 1);
    	        	}
    	    	}
    		},function (data) {
    			console.log(data);
    		});
    	}
    	
    	// 新增预览.
    	$scope.showFileByLinenumber = function(linenumber) {
    		if ($scope.fileMap.has($scope.linenumber)) {
            	// 以linenumber为key从$scope.fileMap获取filePath.
            	var filePath = $scope.fileMap.get($scope.linenumber).filePath;
            	window.open(filePath);
    		}
    	}
    	
    	// 回显预览.
    	$scope.showFile = function(filePath, originalFileName) {
    		window.open(filePath);
    	}
        
    	// -----------------------------------------------   上传下载相关     结束           ------------------------------------------------
    	
    	
    	

        // ----------------------------------------------    树形下拉框     开始          --------------------------------------------------
        // 树形下拉框(粮食性质)
        $scope.getAttributeData = function() {
            enumService.getTreeList($scope.contract.grainAttribute, "grainAttribute").then(function(data) {
                $scope.grainAttributeTreeData = data;
            },function(data) {
                console.log(data);
            })
        };

        // 树形下拉框(粮食产地)
        $scope.getAreaData = function() {
            enumService.getTreeList($scope.contract.grainProducingArea, "grainProducingArea").then(function(data) {
                $scope.grainProducingAreaTreeData = data;
            },function(data){
                console.log(data);
            })
        };

        // 树形下拉框(明细品种)
        $scope.getGrainDetailKind = function() {
            enumService.getTreeListByTypeId( "grainDetailKind", $scope.storeWareDetail.grainKind).then(function(data) {
                $scope.grainDetailKindTreeData = data;
            },function(data) {
                console.log(data);
            })
        };


        // ----------------------------------------------    树形下拉框     结束          --------------------------------------------------


        // 进入页面触发
        if ($stateParams.id != 0) {
            $scope.isNotEdit = $stateParams.isNotEdit;
            
            if ($stateParams.isNotEdit == true) {
            	$scope.isEdit = true;
                $scope.loadDataById($stateParams.id, $stateParams.processInstanceId);

            } else {
                //新增页面，不进行操作；修改页面查询后台数据，并且赋值页面

                //提交按钮的显示
                $scope.showCommitContract = true ;
                $scope.isEdit = false;
                $scope.loadDataById($stateParams.id);
                
                $scope.getAttributeData();
                $scope.getAreaData();
            }
        } else {
            // 新增.
            //提交按钮的显示
            $scope.showCommitContract = true ;

            $scope.hidden=false; //隐藏明细按钮
            // 获取粮食性质，粮食产地 下拉树.
            $scope.getAttributeData();
            $scope.getAreaData();
            $scope.getGrainDetailKind();

            // 获取合同编号.
            $scope.gainContract();
        }

        // 保存.
        $scope.save = function (variable) {
            if ($scope.contractNumber.status != undefined && $scope.contractNumber.status == "error") {
                if (confirm("合同编号有误！该页面无法保存！原因：" + $scope.contractNumber.msg + " 是否返回到列表页！")) {
                    $scope.retList();
                    return;
                } else {
                    return;
                }
            }

            if(null != $scope.contract.lybzj && undefined != $scope.contract.lybzj && ""!=$scope.contract.lybzj){
        		if($scope.contract.lybzj == 0 || $scope.contract.lybzj == 0.0 ||$scope.contract.lybzj == 0.00) {
        			alert("请输入合理的履约保证金");
        			$scope.contract.lybzj = "";
        			return false ;  
        		}
        	}
            

            if (!$scope.saveFlag) {
                if (validator.form()) {
                    // 设置saveFlag为true,防止重复提交.
                    $scope.saveFlag = true;

                    $scope.detailList = [];
                    for (var i = 0; i < $scope.addedDetail.length; i++) {
                        if ($scope.addedDetail[i] != null && $scope.addedDetail[i] != '') {
                        	
                            $scope.detailList.push($scope.addedDetail[i]);
                            //收购合同
                            if($scope.contract.contractType == 3147 && $scope.addedDetail[i].inCount == 0){
                            	alert("明细数量有一条为0,请先删除此数据，否则不能提交");
                                return;
                            }
                            //销售合同
                            if($scope.contract.contractType == 3148 && $scope.addedDetail[i].outCount==0){
                            	alert("明细数量有一条为0,请先删除此数据，否则不能提交");
                                return;
                            }

                            if($scope.contract.contractType == 3147 && $scope.detailList[i].inCount!=null){
                            	//如果是收购合同就把销售数量清空
                            	$scope.detailList[i].outCount = null;
                            	$scope.detailList[i].remainingNumber = $scope.detailList[i].inCount ;
                            }
                            if($scope.contract.contractType == 3148 && $scope.detailList[i].outCount!=null){
                            	//如果是销售合同就把收购数量清空
                            	$scope.detailList[i].inCount = null;
                            	$scope.detailList[i].outRemainingNumber = $scope.detailList[i].outCount ;
                            }
                            
                            
                        }
                    }

                    if ($scope.detailList.length == 0) {
                        $scope.saveFlag = false;
                        alert("至少填写一条完整的明细信息！");
                        return;
                    }



                    $http({
                        method: 'POST',
                        url: APP_CONFIG.businessUrl + '/depot/business/contract/save',
                        data: {
                            contractJson : angular.toJson($scope.contract),
                            businessStoreWareDetailJson : angular.toJson($scope.detailList),
                            userId : $rootScope.userInfo.userId,
                            userName : $rootScope.userInfo.userName,
                            realName : $rootScope.userInfo.realName,
                            depotInfoOrgId : $rootScope.orgInfo.orgId,
                            fileIds : angular.toJson($scope.fileIds),
        					deleteFileIds : angular.toJson($scope.deleteFileIds)
                        }
                    }).then(function successCallback(response) {
 
                        if(response.data.status == "success"){
                            if(variable != null && variable != "" && typeof variable != 'undefined' ){
                                if($stateParams.id == 0){
                                    //新增数据返回 id
                                    var id = response.data.id;
                                }else {
                                    //修改页面
                                    var id = $stateParams.id;
                                    variable = "2";
                                }
                                contractService.loadDataById(id).then(function(data){
                                    $scope.contract = data.contract;
                                    $scope.choice($scope.contract,variable);
                                    $scope.contract.signingMan=parseInt(data.contract.signingMan);
                                    $scope.contract.contractType = data.contract.contractType+"";
                                },function(data){
                                });
                            }else{
                                alert("保存成功！");
                                $scope.retList();
                            }
                        }else{
                            alert(response.data.msg);
                            $scope.saveFlag = false;
                        }
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    });
                }
            }
        }

//---------------------------------------------提交(选择审批人)----------------------------
        $scope.pageInfo = {pageNum : 1, pageSize : 10};

        // 获取列表数据
        $scope.loadData = function() {
            contractService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, "", null).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log(data);
            });
        }

        // 选择审批人.
        $scope.choice = function(contract,variable) {
            if (contract.auditState != "0" && contract.auditState != "3") {
                alert("您已经提交该数据，无法再次提交！");
                return;
            }
            $scope.contract = contract;

            $scope.modelItem = [];

            $scope.modelItem.allContent = contract;
            $scope.modelItem.variable = variable;
            $scope.modelItem.type = "contract";

            //审批驳回 时，再次提交的审批人为上次的审批人
            if(contract.auditState == "3"){
                //获取上一审批人
                contractService.loadDataByIdAndProcessInstanceId(contract.id, contract.processInstanceId).then(function(data){
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
                        if(variable == "1"){
                            // 新增则id
                            $scope.contract.id = null;
                        }else{
                            //不做操作
                        }
                        $scope.saveFlag = false;
                    } else if (result.returnType == "submit") {
                        // 审批人.
                        $scope.submit(result.assignee);
                    } /*else if (result.returnType == "isEnd") {
					$scope.audit($scope.modelItem.auditResult, null);
				}*/
                }, function (reason) {
                    console.log(reason);
                });

            }

        }


        // 提交.
        $scope.submit = function(assignee) {
            $http({
                method: 'POST',
                url: APP_CONFIG.businessUrl + '/depot/business/contract/submit',
                data: {
                    id : $scope.contract.id,
                    assignee : assignee,
                    userId : $rootScope.userInfo.userId,
                    realName : $rootScope.userInfo.realName

                }
            }).then(function successCallback(response) {
                if (response.data.success == 'success') {
                    // 请求成功执行代码
                    // 重新加载数据
                    $state.go("app.business.contract");
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
    });
