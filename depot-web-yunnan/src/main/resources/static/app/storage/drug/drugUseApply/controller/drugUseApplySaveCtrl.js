angular.module('app.storage').controller("drugUseApplySaveCtrl", function($scope, $rootScope, $filter, $http, $state, $stateParams,
		    $uibModal,drugUseApplyService, drugStandingBookService, drugShelfService, commonUtilService, APP_CONFIG,codeRuleService,drugUseApplyAuditService ) {

    // 根据编码类型名称获取编码
    $scope.applyNumber={};
    $scope.applyUser={};
    $scope.drugUseApply={};
	// 加载数据.
    $scope.loadDataById = function(id) {
        drugUseApplyService.loadDataById(id).then(function(data){
            $scope.drugUseApply = data.drugUseApply;
            $scope.applyUser=$scope.drugUseApply.applyUser;
            $scope.addedDetail = data.detailList;
            $scope.drugUseApply.useDate = $filter('date')($scope.drugUseApply.useDate, "yyyy-MM-dd");
            $scope.drugUseApply.createTime = $filter('date')($scope.drugUseApply.createTime, "yyyy-MM-dd");
            //审批详情
            drugUseApplyAuditService.loadDataByApplyName($scope.drugUseApply.applyNumber).then(function(data) {
                $scope.auditList = data.auditList;
            },function(data){
            });
        },function(data){
        });
    };
    
    // 根据编码类型名称获取编码
    $scope.createApplyNumber=function(){
        //获取登录人
        $scope.applyUser=$rootScope.userInfo.realName;
        // 领用申请编号.(暂时使用采购申请编号)
        codeRuleService.getCodeValueByType("drugUseApply",$rootScope.orgInfo.orgId).then(function(data) {
            if (data.status == "success") {
                $scope.applyNumber.status = "success";
                $scope.drugUseApply.applyNumber = data.codeValue;
            } else if (data.status == "error") {
                $scope.applyNumber.msg = data.msg;
                $scope.applyNumber.status = "error";
                if(confirm("领用申请编号有误！该页面无法保存！原因：" + $scope.applyNumber.msg + " 是否返回到列表页！")) {
                    $scope.retList();
                }
            }
        });
    };

    //获取当前时间
    $scope.useLocalDate=function(){
        var date = new Date();
        var years = date.getFullYear();
        var month = date.getMonth()+1;
        var strDate = date.getDate();
        var strHours = date.getHours(); //小时
        var strMinutes = date.getMinutes(); //分
        var strSeconds = date.getSeconds(); //秒
        var currentDate = years + "-" + month + "-" + strDate+" "+strHours+":"+strMinutes+":"+strSeconds;
        return currentDate;
    };
    if ($stateParams.id == 0) {
        $scope.createApplyNumber();
        $scope.drugUseApply.useDate = $scope.useLocalDate();
    }
    if ($stateParams.updateUser == 1){
        $scope.applyUser=$rootScope.userInfo.realName;
	}
    if ($stateParams.check == 2){
        $scope.applyUser="";
    }

    $scope.isNotEdit = false;
    
    if ($scope.drugUseApply == null) {
        $scope.drugUseApply = {};
    } 
    
    // 用于存放 子表数据 的数组.
    $scope.addedDetail = [];
    
    if ($stateParams.id != 0) {
        $scope.isNotEdit = $stateParams.isNotEdit;
        //新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
        $scope.loadDataById($stateParams.id);
    }
    
    var validator = $("#drugUseApply-form").validate();
    
    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;  
        return this.optional(element)||(checkNumber.test(value));  
    },"请输入正确的数字类型，最多两位小数！");
    
    $scope.saveFlag = false;
    
    // 获取货架号台账列表.
    $scope.getShelfList = function() {
    	drugStandingBookService.getShelfStandingBookList($scope.drugUseApply.drugKind, $scope.drugUseApply.drugName).then(function(data) {
    		// 清空.
    		$scope.addedDetail = [];
    		if (data.status == "success") {
    			$scope.shelfStandingBookList = data.shelfStandingBookList;
				for (var i=0; i < $scope.shelfStandingBookList.length; i++) {
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
    $scope.sumUseCount = function() {
    	var sumCount = 0;
    	for (var i = 0; i < $scope.addedDetail.length; i++) {
    		if ($scope.addedDetail[i].useCount != undefined && $scope.addedDetail[i].useCount != "" && $scope.addedDetail[i].useCount != null) {
                var shelfAmount=$scope.addedDetail[i].shelfAmount;
                if ($scope.addedDetail[i].useCount <= shelfAmount) {
                    // 计算总数量
                    var useCount = parseInt($scope.addedDetail[i].useCount, 10);
                    sumCount += useCount;
                } else {
                    // 如果申请数量大于库存数量清空申请数量
                    alert("申请数量不能大于库存数量!");
                    $scope.addedDetail[i].useCount=null;
                }
    		}
    	}
    	$scope.drugUseApply.sumCount = sumCount;
    };
    
    // 返回.
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go("app.storage.drug.useApply");
        }
    };

    //提交 assignee 为userId
    $scope.submit = function (drugUseApply,assignee) {
        drugUseApplyService.updateAuditState(drugUseApply,assignee).then(function(data){
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
        $scope.modelItem.processInstanceId = '68866886';
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
                    drugUseApplyService.deleteDataById($scope.drugUseApply.id);
                    $scope.drugUseApply.id = '';
                    $scope.saveFlag = false;
                }
            } else if (result.returnType === "submit") {
                // 选择审批人确认提交
                $scope.submit($scope.drugUseApply,result.assignee);
            }
        }, function (reason) {
            console.log(reason);
        });
    };
    
    // 保存.
    $scope.save = function (showSubmit) {
    	if (!$scope.saveFlag) {
    		
    		if (validator.form()) {
    			$scope.saveFlag = true;
    			
    			$scope.details = [];
        		for (var i = $scope.addedDetail.length - 1; i >= 0; i--) {
        			if ($scope.addedDetail[i].useCount != undefined && $scope.addedDetail[i].useCount != null && $scope.addedDetail[i].useCount != '') {
        				$scope.details.push($scope.addedDetail[i]);
        			}
        		}
        		if ($scope.drugUseApply.sumCount == undefined || $scope.drugUseApply.sumCount == null || $scope.drugUseApply.sumCount == '') {
        			alert("申请总数量不能为空！");
        			$scope.saveFlag = false;
        			return;
    			}
        		
    			$http({
    				method: 'POST',
    				url: APP_CONFIG.drugManageUrl + '/depot/business/drugUseapply/save',
    				data: {
                        drugUseApplyJson : angular.toJson($scope.drugUseApply),
                        drugUseApplyDetailJson : angular.toJson($scope.details),
                        userId : $rootScope.userInfo.userId,
                        orgId : $rootScope.orgInfo.orgId,
                        applyUser : $scope.applyUser
    				}
    			}).then(function successCallback(response) {
    				if (response.data.status === "success") {
                        if (showSubmit !== undefined) { // 保存并提交操作
                            if($stateParams.id === '0') // 新增操作
                                $scope.drugUseApply.id = response.data.id;
                        } else {
                            alert("保存成功！");
                            $scope.retList();
                        }
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

});
