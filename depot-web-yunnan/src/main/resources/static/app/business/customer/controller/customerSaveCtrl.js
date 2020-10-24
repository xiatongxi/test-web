"use strict";
angular.module('app.business').controller("customerSaveCtrl", function($scope, $http, $rootScope,$stateParams, $state,
		customerService, codeRuleService, APP_CONFIG) {
	
	$scope.saveFlag = false;
	$scope.customer = {};
	$scope.customerNumber = {};
    $scope.loadDataById = function(id) {
        customerService.loadDataById(id).then(function(data){
            $scope.customer = data;
        },function(data){
        });
    }
    
    
    if ($stateParams.id != 0) {
        // 修改.
        $scope.loadDataById($stateParams.id);
    } else {
    	// 新增.
    	// 获取客户编号.
    	$scope.orgId=$rootScope.userInfo.orgId;
        codeRuleService.getCodeValueByType("customer",$scope.orgId).then(function(data) {
    		if (data.status == "success") {
    			$scope.customerNumber.status = "success";
    			$scope.customer.customerNumber = data.codeValue;
    		} else if (data.status == "error") {
    			$scope.customerNumber.msg = data.msg;
    			$scope.customerNumber.status = "error";
    			if(confirm("客户编号有误！该页面无法保存！原因：" + $scope.customerNumber.msg + " 是否返回到列表页！")) {
    				$scope.retList();
    			}
    		}
    	});
    }

    var validator = $("#customer-form").validate();
    
    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;  
        return this.optional(element)||(checkNumber.test(value));  
    },"请输入正确的数字类型，最多两位小数！");
    
    $.validator.addMethod("validLength",function(value,element, params) {
    	var checkNumber = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/g;  
    	return this.optional(element)||(checkNumber.test(value));  
    },"请输入正确的身份证号码！");
    
    $.validator.addMethod("qyLength",function(value,element, params) {
    	var checkNumber = /^\w{18}$/g; 
    	return this.optional(element)||(checkNumber.test(value));  
    },"请输入18位的信用代码！");
    
    $.validator.addMethod("validSjh",function(value,element, params) {
    	//var checkNumber = /^(((\\+\\d{2}-)?0\\d{2,3}-\\d{7,8})|(([1][3,4,5,7,8,9][0-9]\\d{8})))$/g; 
    	var checkNumber = /^(13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9})$|(^(0\d{10})|^(0\d{2}-\d{8}))$/g;
    	return this.optional(element)||(checkNumber.test(value));  
    },"请输入正确的手机号！");
    
    
    // 返回.
   /* $scope.retList = function () {
    	$state.go('app.business.customer.list');
    }*/
    // 返回.
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go('app.business.customer.list');
        }
    }
    
    // 保存.
    $scope.save = function () {
    	if ($scope.customerNumber.status != undefined && $scope.customerNumber.status == "error") {
    		if (confirm("客户编号有误！该页面无法保存！原因：" + $scope.customerNumber.msg + " 是否返回到列表页！")) {
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
    			$scope.orgId=$rootScope.userInfo.orgId;
    			customerService.save($scope.customer,$scope.orgId).then(function(data) {
    				if(data.status == "success"){
    					alert("保存成功！");
    					$scope.retList();
    				} else {
    					alert("保存失败！");
    					$scope.saveFlag = false;
    				}
    			});
    		}
    	}
    }


});
