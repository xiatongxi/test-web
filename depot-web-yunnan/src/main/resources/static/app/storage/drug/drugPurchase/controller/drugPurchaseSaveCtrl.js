angular.module('app.storage').controller("drugPurchaseSaveCtrl", function($scope, $rootScope, $filter, $http, $state, $stateParams, 
		drugPurchaseService, commonUtilService, codeRuleService, APP_CONFIG,$uibModal,drugPurchaseAuditService) {
	
    $scope.drugPurchase = {applyNumber:''};
	$scope.saveFlag = false;
	$scope.applyNumber = {};
	// 用于存放新增的数据
	$scope.addedDetail = [];
    $scope.auditList = [];
	// 定义只读
    $scope.readOnlyValid = true;

    $scope.loadDataById = function(id) {
        drugPurchaseService.loadDataById(id).then(function(data) {
            $scope.drugPurchase = data;
            //审批详情 $scope.drugPurchase.applyNumber
            if ($scope.drugPurchase.applyNumber != undefined && $scope.drugPurchase.applyNumber != '') {
                drugPurchaseAuditService.loadDataByApplyName($scope.drugPurchase.applyNumber).then(function(data) {
                    $scope.auditList = data.auditList;
                },function(data){
                    console.log(data);
                });
            }
        },function(data){
            console.log(data);
        });
    };
    
    // 查询子表的结构.
    drugPurchaseService.loadDetailDataById().then(function(data){
        $scope.drugPurchaseDetail = data;
        $scope.drugPurchaseDetail.zid = $stateParams.id;
        
        // 如果id不为0，说明是查询或者查看，需要查询后台.
        if ($stateParams.id != 0) {
            $scope.isNotEdit = $stateParams.isNotEdit;

            if ($stateParams.isNotEdit == true) {
                $scope.loadDataById($stateParams.id);
            } else {
                //新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
                $scope.loadDataById($stateParams.id);
            }
            
            // 查询子表数据.
            drugPurchaseService.getDetailPageInfo($stateParams.id).then(function(data){
                $scope.detailPageInfo = data;
                for (var i=0; i < data.size; i++) {
                    $scope.addedDetail.push(data.list[i]);
                }
            }, function(data){
                console.log(data);
            });
        } else {
            // 新增，默认有一条子表数据.
            $scope.addedDetail.push($scope.drugPurchaseDetail={});
            // 采购申请编号.
            codeRuleService.getCodeValueByType("drugPurchase",$rootScope.orgInfo.orgId).then(function(data) {
        		if (data.status == "success") {
        			$scope.applyNumber.status = "success";
        			$scope.drugPurchase.applyNumber = data.codeValue;
        		} else if (data.status == "error") {
        			$scope.applyNumber.msg = data.msg;
        			$scope.applyNumber.status = "error";
        			if(confirm("采购申请编号有误！该页面无法保存！原因：" + $scope.applyNumber.msg + " 是否返回到列表页！")) {
        				$scope.retList();
        			}
        		}
            });
        }
    }, function(data){
        console.log(data);
    });
    
    // 新增一行
    $scope.addRow = function() {
        var drugNumber = $scope.addedDetail[$scope.addedDetail.length-1].drugNumber;
        if (drugNumber != null && drugNumber != undefined && drugNumber != '') {
            $scope.addedDetail.push(angular.copy($scope.drugPurchaseDetail={}));
        } else {
            alert("请添加数据,在新增!");
        }

    };
    
    // 删除一行
    $scope.deleteRow = function(drugPurchaseDetail) {
        if ($scope.addedDetail.length <=1 ) {
            alert("至少要有一条采购申请种类数据！");
            return;
        }
        if (drugPurchaseDetail !=null && drugPurchaseDetail.drugNumber != null
            && drugPurchaseDetail.drugNumber != undefined && drugPurchaseDetail.drugNumber != '') {
            if (!confirm("确定要此条数据删除吗？")) {
                return;
            }
        }
        //如不保存不修改原有数据只修改页面显示效果
        var index = $scope.addedDetail.indexOf(drugPurchaseDetail);
        if (index != -1) {
            $scope.addedDetail.splice(index, 1);
        }
    };
    
    // 校验
    var validator = $("#drugPurchase-form").validate();
    
    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;  
        return this.optional(element)||(checkNumber.test(value));  
    },"请输入正确的数字，最多两位小数！");

    // 自定义验证，验证数字大于0的整数
    $.validator.addMethod("validInt",function(value,element, params) {
        var checkInt = /^[1-9]\d*$/g;
        return this.optional(element)||(checkInt.test(value));
    },"请输入大于0的整数！");
    
    // 计算预计金额.
    $scope.countApplyAmount = function(index) {
    	$scope.addedDetail[index].applyAmount = commonUtilService.accMul($scope.addedDetail[index].applyPrice, $scope.addedDetail[index].applyCount);
    };
    
    // 返回.
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go("app.storage.drug.purchase");
        }
    };

    //提交 assignee 为userId
    $scope.submit = function (drugPurchase,assignee) {
        drugPurchaseService.updateAuditState(drugPurchase,assignee).then(function(data){
            if (data.status == "success") {
                alert("提交成功！");
                $scope.retList();
            } else {
                alert(data.msg);
            }
        },function(data){
            console.log(data);
        });
    };

    // 保存并提交
    $scope.showSubmit = function(){
        $scope.save('showSubmit');
        $scope.modelItem = [];
        $scope.modelItem.processInstanceId = '68846884';
        // 展开下一个审批人模态框.
        var modalInstance = $uibModal.open({
            size : 'md',
            templateUrl: 'app/business/util/views/choiceAuditUser-view.html',
            controller: 'choiceAuditUserModalCtrl',
            backdrop: 'static',
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
                // 未选择审批人取消
                if($stateParams.id === '0'){
                    drugPurchaseService.deleteDataById($scope.drugPurchase.id);
                    $scope.drugPurchase.id = '';
                    $scope.saveFlag = false;
                }
            } else if (result.returnType === "submit") {
                // 选择审批人确认提交
                $scope.submit($scope.drugPurchase,result.assignee);
            }
        }, function (reason) {
            console.log(reason);
        });
    };

        // 保存.
    $scope.save = function (showSubmit) {
    	if ($scope.applyNumber.status != undefined && $scope.applyNumber.status == "error") {
    		if(confirm("采购申请编号有误！该页面无法保存！原因：" + $scope.applyNumber.msg + " 是否返回到列表页！")) {
    			$scope.retList();
    			return;
    		} else {
    			return;
    		}
    	}
    	
    	if (!$scope.saveFlag) {
    		if (validator.form()) {
    			$scope.saveFlag = true;
    			// 遍历，筛选掉空数据。从末尾开始遍历，如从头开始遍历，则会出现错误
    			for (var i = $scope.addedDetail.length-1; i >= 0; i--) {
    				if ($scope.addedDetail[i].drugKind==null || $scope.addedDetail[i].drugKind ==''
    					|| $scope.addedDetail[i].drugName==null || $scope.addedDetail[i].drugName ==''
    						|| $scope.addedDetail[i].drugType==null || $scope.addedDetail[i].drugType ==''
    							|| $scope.addedDetail[i].drugUnit==null || $scope.addedDetail[i].drugUnit ==''
    								|| $scope.addedDetail[i].applyPrice==null || $scope.addedDetail[i].applyPrice ==''
    									|| $scope.addedDetail[i].applyCount==null || $scope.addedDetail[i].applyCount ==''
    										|| $scope.addedDetail[i].applyAmount==null || $scope.addedDetail[i].applyAmount ==''
    				) {
    					$scope.addedDetail.splice(i, 1);
    				}
    			}
    			
    			$http({
    				method: 'POST',
    				url: APP_CONFIG.drugManageUrl + '/depot/business/drugPurchase/save',
    				data: {
    					drugPurchaseJson : angular.toJson($scope.drugPurchase),
    					drugPurchaseDetailJson : angular.toJson($scope.addedDetail),
                        userId : $rootScope.userInfo.userId,
                        orgId : $rootScope.orgInfo.orgId
    				}
    			}).then(function successCallback(response) {
    				if (response.data.status === "success") {
    				    if (showSubmit !== undefined) { // 保存并提交操作
    				        if($stateParams.id === '0') // 新增操作
                                $scope.drugPurchase.id = response.data.id;
                        } else {
                            alert("保存成功！");
                            $scope.retList();
                        }
    				} else {
    					$scope.saveFlag = false;
    					alert(response.data.msg);
    				}
    			}, function errorCallback(response) {
    				// 请求失败执行代码
                    console.log(response);
    			});
    		}
    	}
    };

    //选择已申请的药剂领用-领用申请列表
    $scope.getPlan = function(index) {
        var params = [];
        var uibModalInstance = $uibModal.open({
            size:'lg',
            templateUrl: 'app/business/util/views/drugPurchase-list-modal.html',
            controller: 'drugPurchaseListModalCtrl',
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
                //id用于缓存isEffective是否使用标记--后台使用完重置为空
                $scope.drugPurchaseDetail.id=result.isEffective;
                //药剂编号
                $scope.drugPurchaseDetail.drugNumber=result.drugNumber;
                //药剂种类
                $scope.drugPurchaseDetail.drugKind=result.drugKind;
                //药剂名称
                $scope.drugPurchaseDetail.drugName=result.drugName;
                //药剂包装
                $scope.drugPurchaseDetail.drugPacking=result.drugPacking;
                //药剂单位
                $scope.drugPurchaseDetail.drugUnit=result.drugUnit;
                //规格型号
                // $scope.drugPurchaseDetail.drugSpecification=result.drugSpecification;
                //药剂形态
                $scope.drugPurchaseDetail.drugType=result.drugType;
                //申请人
                if (index != -1) {
                    //数据添加到数组
                    $scope.addedDetail.splice(index,1,$scope.drugPurchaseDetail);
                }
            }
            // 关闭模态框时刷新页面数据
        }, function (reason) {
            // console.log(reason);
        });
    };

});
