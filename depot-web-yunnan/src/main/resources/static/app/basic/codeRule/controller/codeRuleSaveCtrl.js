angular.module('app.basic').controller("codeRuleSaveCtrl", 
	function($scope, $http, $filter, $stateParams, $state, $uibModal, $rootScope,
			codeRuleService, codeRuleDetailService, commonUtilService, APP_CONFIG) {
	// 防止重复提交.
    $scope.saveFlag = false;
    // 主体.
    $scope.codeRule = {};
    // 子表.
    $scope.codeRuleDetail = {};
    // 用于存放新增子表数据
    $scope.addedDetail = [];
    
    
    $scope.loadDataById = function(id) {
    	codeRuleService.loadDataById(id).then(function(data){
    		$scope.codeRule = data.codeRule;
            $scope.codeRuleDetailList = data.codeRuleDetailList;
            for (var i=0; i < $scope.codeRuleDetailList.length; i++) {
                $scope.addedDetail.push(angular.copy($scope.codeRuleDetailList[i]));
            }
            // 拼写预览.
            $scope.previewCodeFun();
        },function(data){
        });
    }
    
    $scope.isNotEdit = $stateParams.isNotEdit; 
    
    if ($stateParams.id != undefined && $stateParams.id != null && $stateParams.id != '' 
    		&&  $stateParams.id != 0) {
        //新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
        $scope.loadDataById($stateParams.id);
    }

    var validator = $("#codeRule-form").validate();
    
    // 自定义验证，验证数字
    $.validator.addMethod("validInteger",function(value,element, params) {
    	var checkNumber = /^\d*$/g;
        return this.optional(element)||(checkNumber.test(value));  
    },"请输入正确的正整数!");

    // 保存.
    $scope.save = function () {
    	if (!$scope.saveFlag) {
    		if (validator.form()) {
    			// 设置saveFlag为true,防止重复提交.
    			$scope.saveFlag = true;
    			codeRuleService.edit($scope.codeRule, $scope.addedDetail, $rootScope.userInfo).then(function(data){
    				if (data.status == 'success') {
        				alert("保存成功！");
        				$scope.retList();
        			} else {
    					alert(data.msg);
    					$scope.saveFlag = false;
    				}
    	        },function(data){
    	        	console.log(data);
    	        });
    		}
    	}
    }

    // 返回
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go("app.basic.codeRule.list");
        }
    }
    
	// 点击新增时弹出模态窗
    $scope.addRow = function() {
		var params = [];
		
		var uibModalInstance = $uibModal.open({    
            size : 'sm',  
	        templateUrl : 'app/basic/codeRule/views/codeRuleDetailModal.html',
	        controller : 'codeRuleDetailModalCtrl',
            resolve : {
            	// items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params; 
                }
            }  
        }); 
		uibModalInstance.result.then(function (result) {
		 if (result != null && result != undefined && result != '') {
			 $scope.addedDetail.push(angular.copy(result));
			 // 拼写预览.
			 $scope.previewCodeFun();
		 }
	    }, function (reason) {
	        console.log(reason);
	    });
	}

	// 点击修改时弹出模态窗
	$scope.editRow = function(detailInfo) {
    	// 索引，用来保存模态框返回的数据.
    	var index = $scope.addedDetail.indexOf(detailInfo);
		var params = [];
		params.ruleType = detailInfo.ruleType;
		params.ruleValue = detailInfo.ruleValue;
		
		var uibModalInstance = $uibModal.open({
		       size : 'sm',  
		       templateUrl : 'app/basic/codeRule/views/codeRuleDetailModal.html',
		       controller : 'codeRuleDetailModalCtrl',
		       resolve : {
		       	// items是一个回调函数
		           items: function () {
		               // 这个值会被模态框的控制器获取到
		               return params; 
		           }
		       }  
		}); 
		uibModalInstance.result.then(function (result) {
			 if (result != null && result != undefined && result != '') {
				 $scope.addedDetail[index].ruleType = result.ruleType;
				 $scope.addedDetail[index].ruleValue = result.ruleValue;
				 // 拼写预览.
				 $scope.previewCodeFun();
			 }
		 }, function (reason) {
			 console.log(reason);
		 });
	}  
	
    
    // 删除一行
    $scope.deleteRow = function(detailInfo) {
        if (detailInfo.id != null && detailInfo.id != undefined && detailInfo.id != '') {
            if (!confirm("此条数据为之前保存的数据，确定要删除吗？")) {
                return;
            }
            codeRuleDetailService.remove(detailInfo.id).then(function(data) {
                
            },function(data){
                console.log(data);
            });
        }
        var index = $scope.addedDetail.indexOf(detailInfo);
        if (index != -1) {
            $scope.addedDetail.splice(index, 1);
            // 拼写预览.
            $scope.previewCodeFun();
        }
    }
    
    // 预览编码.
    $scope.previewCodeFun = function() {
    	if ($scope.codeRule.serialNumberLength != undefined && $scope.codeRule.serialNumberLength != null) {
    		
    		var spacer = "";
    		
    		if ($scope.codeRule.spacer != undefined && $scope.codeRule.spacer != null) {
    			spacer = $scope.codeRule.spacer;
    		}
    		
    		var serialNumberLength = parseInt($scope.codeRule.serialNumberLength, 10);
    		var serialNumber = "";
    		
    		var detailRule = "";
    		
    		if ($scope.addedDetail.length > 0) {
    			for(var i=0; i < $scope.addedDetail.length; i++) {
    				detailRule += $scope.addedDetail[i].ruleValue;
    				detailRule += spacer;
    			}
    		}
    		
			for(var i = 0; i < serialNumberLength -1;i++) {
				serialNumber += "0";
    		}
			serialNumber = serialNumber + "1";
			
			if (detailRule != "") {
				$scope.previewCode = detailRule + serialNumber;
			} else {
				$scope.previewCode = serialNumber;
				
			}
    	}
    }
    
	$scope.typeList = [
	                   {name : "组织编码", value : "orgCodeType"},
				       {name : "自定义字符", value : "customType"},
				       {name : "日期时间", value : "dateType"},
				       {name : "流水", value : "serialType"}
				];
	
	$scope.dateTypeList = [
	                   {name : "yyyy(年)", value : "yyyy"},
	                   {name : "yyyyMM(年月)", value : "yyyyMM"},
	                   {name : "yyyyMMdd(年月日)", value : "yyyyMMdd"}
	           	];
});
