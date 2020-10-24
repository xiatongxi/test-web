angular.module('app.basic').controller("codeRuleDetailModalCtrl", 
	function($scope, $uibModalInstance, $filter, $http, $rootScope, APP_CONFIG, items) {

    var validator = null;
    // 提交表单
    $scope.save = function() {
    	// 模态框的校验器，再外面定义不能正常加载，所以要在保存的时候初始化一下.
    	if (validator == null) {
    		validator = $("#codeRuleDetail-form").validate();
    		$scope.save();
    	} else {
            if (validator.form()) {
            	$uibModalInstance.close($scope.codeRuleDetail);
            }
    	}

    }
    
	// 关闭模态窗口
	$scope.cancel = function() {
		$uibModalInstance.close();
	}

	$scope.typeList = [
	                   {name : "组织编码", value : "orgCodeType"},
				       {name : "自定义字符", value : "customType"},
				       {name : "日期时间", value : "dateType"}
				];
	
	$scope.dateTypeList = [
	                   {name : "yyyy(年)", value : "yyyy"},
	                   {name : "yyyyMM(年月)", value : "yyyyMM"},
	                   {name : "yyyyMMdd(年月日)", value : "yyyyMMdd"}
	           	];
	
	$scope.ruleValueReadOnly = false;
	
	// 类型更改.
	$scope.ruleTypeChange = function() {
		$scope.ruleValueReadOnly = false;
		$scope.codeRuleDetail.ruleValue = "";
		//  如果等于组织编码.
		if ($scope.codeRuleDetail.ruleType == 'orgCodeType') {
			// 如果是组织编码的话，就不能编辑.
			$scope.ruleValueReadOnly = true;
			$scope.codeRuleDetail.ruleValue = $rootScope.orgInfo.orgCode;
		}
	}
	
	// 回显.
	if (items != undefined) {
		$scope.codeRuleDetail = {};
		$scope.codeRuleDetail.ruleType = items.ruleType;
		$scope.ruleTypeChange();
		$scope.codeRuleDetail.ruleValue = items.ruleValue;
	}
	
});