angular.module('app.storage').controller("drugCheckSaveCtrl", function($scope, $rootScope, $filter, $http, $state, $stateParams, $uibModal, 
                                            drugCheckService, drugStandingBookService, drugShelfService, codeRuleService, commonUtilService, APP_CONFIG) {
    $scope.saveFlag = false;
    $scope.isNotEdit = false;
    $scope.checkNumber = {};
	// 加载数据.
    $scope.loadDataById = function(id) {
        drugCheckService.loadDataById(id).then(function(data){
            $scope.drugCheck = data.drugCheck;
            $scope.addedDetail = data.detailList;
            $scope.drugCheck.useDate = $filter('date')($scope.drugCheck.useDate, "yyyy-MM-dd"); 
            $scope.drugCheck.createTime = $filter('date')($scope.drugCheck.createTime, "yyyy-MM-dd"); 
        },function(data){
        });
    }
    
	// 获取货架号数据
	$scope.getShelfData = function() {
		drugShelfService.getShelfMap().then(function(data){
			$scope.shelfMap = data;
		}, function (data) {
			console.log(data);
		});
	}
    $scope.getShelfData();
    
    
    if ($scope.drugCheck == null) {
        $scope.drugCheck = {};
    } 
    
    // 用于存放 子表数据 的数组.
    $scope.addedDetail = [];
    
    if ($stateParams.id != 0) {
        $scope.isNotEdit = $stateParams.isNotEdit;
        $scope.loadDataById($stateParams.id);
    } else {
    	// 新增.
        codeRuleService.getCodeValueByType("drugCheck", $rootScope.orgInfo.orgId).then(function(data) {
    		if (data.status == "success") {
    			$scope.checkNumber.status = "success";
    			$scope.drugCheck.checkNumber = data.codeValue;
    		} else if (data.status == "error") {
    			$scope.checkNumber.msg = data.msg;
    			$scope.checkNumber.status = "error";
    			if(confirm("盘点编号有误！该页面无法保存！原因：" + $scope.checkNumber.msg + " 是否返回到列表页！")) {
    				$scope.retList();
    			}
    		}
    	});
    }
    
    var validator = $("#drugCheck-form").validate();
    
    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;  
        return this.optional(element)||(checkNumber.test(value));
    },"请输入正确的数字类型!");
    
    // 获取货架号台账列表.
    $scope.getShelfList = function() {
    	drugStandingBookService.getShelfStandingBookList($scope.drugCheck.drugKind, $scope.drugCheck.drugName).then(function(data) {
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
    }
    
    
    // 返回.
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go("app.storage.drug.check");
        }
    }
    
    // 保存.
    $scope.save = function () {
    	if ($scope.checkNumber.status != undefined && $scope.checkNumber.status == "error") {
    		if(confirm("盘点编号有误！该页面无法保存！原因：" + $scope.checkNumber.msg + " 是否返回到列表页！")) {
				$scope.retList();
				return;
			} else {
				return;
			}
    	}
    	if (!$scope.saveFlag) {
    		
    		if (validator.form()) {
    			$scope.saveFlag = true;
    			
    			$scope.details = [];
        		for (var i = $scope.addedDetail.length - 1; i >= 0; i--) {
        			if ($scope.addedDetail[i].checkCount != undefined && $scope.addedDetail[i].checkCount != null && $scope.addedDetail[i].checkCount != '') {
        				$scope.details.push($scope.addedDetail[i]);
        			}
        		}
        		if ($scope.addedDetail.length < 1) {
        			alert("没有盘点，请盘点！");
        			$scope.saveFlag = false;
        			return;
    			}
        		
        		
    			$http({
    				method: 'POST',
    				url: APP_CONFIG.drugManageUrl + '/depot/business/drugCheck/save',
    				data: {
    					drugCheckJson : angular.toJson($scope.drugCheck),
    					drugCheckDetailJson : angular.toJson($scope.details),
                        userId : $rootScope.userInfo.userId,
                        orgId : $rootScope.orgInfo.orgId
    				}
    			}).then(function successCallback(response) {
    				if (response.data.status == "success") {
    					alert("保存成功！");
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
