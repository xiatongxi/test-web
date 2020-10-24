angular.module('app.storage').controller("drugInfoSaveCtrl", function($scope, $rootScope, $filter, $http, $state, $stateParams, 
		drugInfoService, commonUtilService, codeRuleService, APP_CONFIG) {
	
	$scope.saveFlag = false;
	$scope.isNotEdit = false;
	$scope.drugNumber = {};
	// 加载数据.
    $scope.loadDataById = function(id,orgId) {
        drugInfoService.loadDataById(id,orgId).then(function(data) {
            $scope.drugInfo = data;
        },function(data){
        });
    };
    
    
    if ($scope.drugInfo == null) {
        $scope.drugInfo = {};
    }
    
    if ($stateParams.id !== '0' && $stateParams.orgId !== '') { // 修改,查看
        $scope.isNotEdit = $stateParams.isNotEdit;
        $scope.loadDataById($stateParams.id,$stateParams.orgId);
    } else {
    	// 新增.
        codeRuleService.getCodeValueByType("drugInfo", $rootScope.orgInfo.orgId).then(function(data) {
    		if (data.status == "success") {
    			$scope.drugNumber.status = "success";
    			$scope.drugInfo.drugNumber = data.codeValue;
    		} else if (data.status == "error") {
    			$scope.drugNumber.msg = data.msg;
    			$scope.drugNumber.status = "error";
    			if(confirm("药剂编号有误！该页面无法保存！原因：" + $scope.drugNumber.msg + " 是否返回到列表页！")) {
    				$scope.retList();
    			}
    		}
    	});
    }
    
    // 校验
    var validator = $("#drugInfo-form").validate();
    
    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;  
        return this.optional(element)||(checkNumber.test(value));  
    },"请输入正确的数字类型，最多两位小数！");
    
    
    // 保存.
    $scope.save = function () {
    	if ($scope.drugNumber.status != undefined && $scope.drugNumber.status == "error") {
    		if(confirm("药剂编号有误！该页面无法保存！原因：" + $scope.drugNumber.msg + " 是否返回到列表页！")) {
				$scope.retList();
				return;
			} else {
				return;
			}
    	}
    	
    	if (!$scope.saveFlag) {
    		if (validator.form()) {
    			$scope.saveFlag = true;
    			$http({
    				method: 'POST',
    				url: APP_CONFIG.drugManageUrl + '/depot/business/drugInfo/save',
    				data: {
    					drugInfoJson : angular.toJson($scope.drugInfo),
                        userId : $rootScope.userInfo.userId,
                        orgId : $rootScope.orgInfo.orgId
    				}
    			}).then(function successCallback(response) {
    				if(response.data.status == "success"){
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
    };

    // 返回.
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go("app.storage.drug.info");
        }
    };
    
     
});
