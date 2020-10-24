angular.module('app.business').controller("transferNoticeSaveCtrl",
    function($scope, $http, $filter, $stateParams, $state, $uibModal, $rootScope,
             transferNoticeService, deliveryStorageNoticeAuditService, commonUtilService,
             storeWareDetailService, enumService, codeRuleService, APP_CONFIG) {

        $scope.deliveryStorageNotice = {};
        $scope.billNumber = {};

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

        $scope.loadDataById = function(id) {
            transferNoticeService.loadDataById(id).then(function(data) {
                $scope.deliveryStorageNotice = data.deliveryStorageNotice;
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

                $scope.getGrainDetailKind();
            }, function(data){
            });
        }

        /*$scope.loadDetailDataByIdAndPID = function(id, processInstanceId) {
            deliveryStorageNoticeAuditService.loadDataById(id, processInstanceId).then(function(data) {
                $scope.deliveryStorageNotice = data.deliveryStorageNotice;
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
        }*/

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
        /* $scope.retList = function () {
             if ($rootScope.previousState_name != '') {
                 $rootScope.back();
             } else {
                 $state.go("app.business.deliveryStorageNotice");
             }
         }*/



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
                templateUrl: 'app/business/util/views/contract-list-modalTransfer.html',
                controller: 'transferContractListModalCtrl',
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
                        // 循环删除计划明细中的id，有这个id会导致删除的时候误认为是删除已有明细.
                        for (var i=0; i< data.list.length; i++) {
                            data.list[i].id = "";
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

                    // 粮食品种.
                    $scope.deliveryStorageNotice.goodsKind = result.grainKind;
                    // 明细品种.
                    $scope.deliveryStorageNotice.grainDetailKind = result.grainDetailKind;
                    // 粮食性质.
                    $scope.deliveryStorageNotice.grainAttribute = result.grainAttribute;
                    // 生产年限.
                    $scope.deliveryStorageNotice.grainAnnual = result.grainAnnual;
                    // 粮食等级.
                    $scope.deliveryStorageNotice.grainGrade = result.grainGrade;
                    // 粮食产地
                    $scope.deliveryStorageNotice.grainProducingArea = result.grainProducingArea;

                    // 起始合同id  用于合同进度查询，防止合同变更后，查询间断的问题.   2017-11-02.
                    $scope.deliveryStorageNotice.rootContractBid = result.rootContractBid;

                    // 客户信息. 2018-01-29.
                    // 客户id.
                    $scope.deliveryStorageNotice.customerBid = result.id;
                    // 客户名称.
                    $scope.deliveryStorageNotice.deliveryCustomer = result.customerName;
                    // 客户编码.
                    //$scope.deliveryStorageNotice.customerNumber = result.customerNumber;
                    // 客户联系电话.
                    $scope.deliveryStorageNotice.mobile = result.mobile;

                    $scope.deliveryStorageNotice.identification = result.identification;

                    // 选择合同标识.
                    $scope.selectContract = true;

                    //$scope.getAttributeData();
                    //$scope.getAreaData();
                    // 获取明细品种下拉树.
                    //$scope.getGrainDetailKind();
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

                // 选择合同标识.
                $scope.selectContract = false;

                // 如果计划编号为空，说明没有选择计划，删除所有合同带出的属性.
                if ($scope.deliveryStorageNotice.planNumber == null) {

                    // 粮食品种.
                    $scope.deliveryStorageNotice.goodsKind = null;
                    // 明细品种.
                    $scope.deliveryStorageNotice.grainDetailKind = null;
                    // 粮食性质.
                    $scope.deliveryStorageNotice.grainAttribute = null;
                    // 生产年限.
                    $scope.deliveryStorageNotice.grainAnnual = null;
                    // 粮食等级.
                    $scope.deliveryStorageNotice.grainGrade = null;
                    // 清空计划的详情列表.
                    $scope.addedDetail = [];
                    // 清空明细品种列表.
                    $scope.grainDetailKindTreeData = [];
                } else {
                    // 计划不为空，说明选择了计划也选择和合同.
                    // 合同的详情有可能和计划的不同，所以要重新获取详情列表.

                    // 获取计划的详情列表.
                    $scope.addedDetail = [];
                    storeWareDetailService.getByZidAndType($scope.deliveryStorageNotice.planBid, "plan").then(function(data) {
                        // 循环删除计划明细中的id，有这个id会导致删除的时候误认为是删除已有明细.
                        for (var i=0; i< data.list.length; i++) {
                            data.list[i].id = "";
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
            }
        }

        // ----------------------------------------------    明细列表     开始          --------------------------------------------------
        // 子表数据模型.
        $scope.storeWareDetail = {};
        // 用于存放 子表数据 的数组.
        $scope.addedDetail = [];

        // 修改时弹出模态窗,通知单只能修改数量.
        $scope.editRow = function(detailInfo) {
            // 索引，用来保存模态框返回的数据.
            var index = $scope.addedDetail.indexOf(detailInfo);

            var params = [];

            params.detailType = "notice";

            params.houseName = detailInfo.houseName;
            params.houseId = detailInfo.houseId;
            params.warehouseName = detailInfo.warehouseName;
            params.warehouseId = detailInfo.warehouseId;
            params.demandAmount = detailInfo.demandAmount;


            // 通知单类型.
            params.executeType = $scope.deliveryStorageNotice.billType;

            // 粮食明细品种.
            params.grainDetailKind = $scope.deliveryStorageNotice.grainDetailKind;
            // 粮食等级.
            params.grainGrade = $scope.deliveryStorageNotice.grainGrade;

            // 只能修改数量.
            params.onlyCanChangeAmount = true;
            var uibModalInstance = $uibModal.open({
                size:'md',
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
                    // 子表数量.
                    $scope.addedDetail[index].demandAmount = result.demandAmount;

                    // 质量标准.
                    $scope.addedDetail[index].qualityStandard = result.qualityStandard;
                    // 计算合同数量 = 明细总数量
                    $scope.countSumAmount();
                }
            }, function (reason) {
                console.log(reason);
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
            }

        }


        // 计算总数量 = 明细数量之和.
        $scope.countSumAmount = function() {
            var totalAmount = 0;
            for (var i = 0; i < $scope.addedDetail.length; i++) {
                if ($scope.addedDetail[i].inCount != null && $scope.addedDetail[i].inCount != '') {
                    // 累加明细数量.
                    totalAmount += parseInt($scope.addedDetail[i].inCount, 10);
                }
            }
            $scope.deliveryStorageNotice.shipingCount = totalAmount;
            $scope.countMoneyQuantity();
        }

        // 计算总金额= 明细金额之和.
        $scope.countMoneyQuantity = function() {
            var detailTotalPrice = 0;
            for (var i = 0; i < $scope.addedDetail.length; i++) {
                if ($scope.addedDetail[i].detailTotalPrice != null && $scope.addedDetail[i].detailTotalPrice != '') {
                    // 累加明细金额.
                    detailTotalPrice += parseInt($scope.addedDetail[i].detailTotalPrice, 10);
                }
            }
            $scope.deliveryStorageNotice.moneyQuantity= detailTotalPrice;

        }
        // ----------------------------------------------    计划明细列表     结束          --------------------------------------------------


        // ----------------------------------------------    树形下拉框     开始          --------------------------------------------------

        // 树形下拉框(明细品种)
        $scope.getGrainDetailKind = function() {
            enumService.getTreeListByTypeId( "grainDetailKind", $scope.storeWareDetail.grainKind).then(function(data) {
                $scope.grainDetailKindTreeData = data;
            },function(data) {
                console.log(data);
            })

        };

        // ----------------------------------------------    树形下拉框     结束          --------------------------------------------------

        // 如果id不为0，说明是查询或者查看，需要查询后台.
        if ($stateParams.id != 0) {
            // 修改.
            $scope.isNotEdit = true;
            $scope.loadDataById($stateParams.id);
            /* $scope.noticeType = $stateParams.noticeType;
             if ($stateParams.isNotEdit == true) {
                 $scope.loadDetailDataByIdAndPID($stateParams.id, $stateParams.processInstanceId);
             } else {
                 $scope.loadDataById($stateParams.id);
             }*/

            /*if ($stateParams.noticeType == "delivery") {
                $scope.deliveryStorageNotice.billType = 3;
            } else {
                $scope.deliveryStorageNotice.billType = 1;
            }*/
        } else {
            // 新增.

            // 编码类型.
            var codeType = "";
            $scope.deliveryStorageNotice.billType = 2;
            codeType = "transferNotice";
            // 获取通知单编号.
            codeRuleService.getCodeValueByType(codeType, $rootScope.orgInfo.orgId).then(function(data) {
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

        // 返回.
        $scope.retList = function () {
        	if ($rootScope.previousState_name != '') {
            	if($rootScope.previousState_name.indexOf("app.additionalHome") != -1){//首页跳转的返回首页
            		$rootScope.isIndexPage = true;
            	}
                $rootScope.back();
            } else {
            	$state.go("app.business.transferNotice");
            }

            //$state.go("app.business.transferNotice");
        }

        // 保存.
        $scope.save = function () {

            if ($scope.billNumber.status != undefined && $scope.billNumber.status == "error") {
                if (confirm("通知单编号有误！该页面无法保存！原因：" + $scope.billNumber.msg + " 是否返回到列表页！")) {
                    $scope.retList();
                    return;
                } else {
                    return;
                }
            }

            if (!$scope.saveFlag) {
                if (validator.form()) {
                    // 设置saveFlag为true,防止重复提交.
                    $scope.saveFlag = true;

                    $scope.detailList = [];

                    var detailSumAmount = 0;
                    for (var i = 0; i < $scope.addedDetail.length; i++) {
                        if ($scope.addedDetail[i].inCount != null && $scope.addedDetail[i].inCount != '') {
                            $scope.detailList.push($scope.addedDetail[i]);
                            // 累加明细数量.
                            detailSumAmount += parseInt($scope.addedDetail[i].inCount, 10);
                        }
                    }

                    if ($scope.detailList.length == 0) {
                        $scope.saveFlag = false;
                        alert("至少填写一条完整的明细信息！");
                        return;
                    }


                    // 通知单数量等于 满足要求的明细信息数量之和.(正常来说都是满足要求的，为了防止有没有选择仓房和货位号的情况)
                    $scope.deliveryStorageNotice.shipingCount = detailSumAmount;
                    
                    $scope.deliveryStorageNotice.qualityStandard = 5387; //发运中转通知单默认是火车的
                    
                    $http({
                        method: 'POST',
                        url: APP_CONFIG.businessUrl + '/depot/business/deliveryStorageNotice/addTransfer',
                        data: {
                            deliveryStorageNoticeJson : angular.toJson($scope.deliveryStorageNotice),
                            businessStoreWareDetailJson : angular.toJson($scope.detailList),
                            userId : $rootScope.userInfo.userId,
                            name : $rootScope.userInfo.realName,
                            orgId : $rootScope.userInfo.orgId
                        }
                    }).then(function successCallback(response) {
                        if(response.data.status == "success") {
                            alert("保存成功！");
                            //location.href=APP_CONFIG.baseUrl + '/#/business/deliveryStorageNotice';
                            $scope.retList();
                        } else {
                            $scope.saveFlag = false;
                            alert(response.data.msg);
                        }
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    });
                }
            }
        }
    });
