angular.module('app.business').controller("fumigationProcessDetailModalCtrl", 
	function($scope, $uibModalInstance, $filter, $http, $rootScope, APP_CONFIG, items) {

	
	if (items != undefined) {
		$scope.detail = {};
		$scope.detail.checkTime = items.checkTime;
		
		$scope.detail.checkPointOne = items.checkPointOne;
		$scope.detail.checkPointTwo = items.checkPointTwo;
		$scope.detail.checkPointThree = items.checkPointThree;
		$scope.detail.checkPointFour = items.checkPointFour;
		$scope.detail.checkPointFive = items.checkPointFive;
		$scope.detail.checkSpace = items.checkSpace;
		$scope.detail.minimumConcentration = items.minimumConcentration;
		$scope.detail.checkMan = items.checkMan;
	}
    
    var validator = null;
	
    
    // 提交表单
    $scope.save = function() {
    	// 模态框的校验器，有时会为空.
    	if (validator == null) {
    		validator = $("#detail-form").validate();
    		$.validator.addMethod("validDetailNumber",function(value,element, params) {
    			var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;
    			if (this.optional(element)||(checkNumber.test(value))) {
					return true
    			} else {
    				return false;
    			}
    		},"请输入正确的数字类型，最多两位小数！");
    		$scope.save();
    	} else {
            if (validator.form()) {
            	$uibModalInstance.close($scope.detail);
            }
    	}

    }
    
	// 关闭模态窗口
	$scope.cancel = function() {
		$uibModalInstance.close();
	}

});