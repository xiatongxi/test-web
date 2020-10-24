angular.module('app.business').controller("customerBadrecordModalCtrl", 
	function($scope, $uibModalInstance, $filter, $http,$rootScope, customerBadrecordService, APP_CONFIG, items) {

    // 获取列表数据
    $scope.loadData = function(id) {
        $http({
            method: 'GET',
            url: APP_CONFIG.customerUrl + '/depot/business/customerBadrecord/edit',
            params: {
                id : id
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            $scope.customerBadrecord = response.data;
            $scope.customerBadrecord.happenDate = $filter('date')($scope.customerBadrecord.happenDate, "yyyy-MM-dd"); 
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
    }
    
    // id不为空，回显.
    if (items.id != null && items.id != undefined && items.id != '') {
    	$scope.isNotEdit = items.isNotEdit;
    	$scope.loadData(items.id);
    } else if (items.customerId != null && items.customerId != undefined && items.customerId != '') {
    	$scope.customerBadrecord = {customerId : items.customerId, name : items.name};
    }
    
    var validator = $("#customerBadrecord-form").validate();
	// 自定义验证，验证数字
	$.validator.addMethod("validNumber",function(value,element, params) {
		var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;  
		return this.optional(element)||(checkNumber.test(value));  
	},"请输入正确的数字类型，最多两位小数！");
    
	// 提交表单
    $scope.save = function() {
    	$scope.customerBadrecord.orgId = $rootScope.userInfo.orgId;
    	//console.log($scope.customerBadrecord.orgId+"********nim");
    	// 模态框的校验器，有时会为空，可能是controller先于页面加载的原因，所以要在保存时，再判断一下校验器是否为undefined.
    	if (validator == undefined) {
    		validator = $("#customerBadrecord-form").validate();
    		$.validator.addMethod("validNumber",function(value,element, params) {
    			var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;  
    			return this.optional(element)||(checkNumber.test(value));  
    		},"请输入正确的数字类型，最多两位小数！");
    		$scope.save();
    	} else {
            if (validator.form()) {
                $http({
                    method: 'POST',
                    url: APP_CONFIG.customerUrl + '/depot/business/customerBadrecord/save',
                    data: {
                        customerBadrecordJson : angular.toJson($scope.customerBadrecord)
                    }
                }).then(function successCallback(response) {
                    // 请求成功执行代码
                   if (response.data.status == 'success') {
                       alert("保存成功！");
                       $scope.cancel();
                   } else {
                       alert("保存失败！");
                   }
                }, function errorCallback(response) {
                    // 请求失败执行代码
                    console.log(response);
                });
            }
    	}

    }
	// 关闭模态窗口
	$scope.cancel = function() {
		$uibModalInstance.close();
	}

});