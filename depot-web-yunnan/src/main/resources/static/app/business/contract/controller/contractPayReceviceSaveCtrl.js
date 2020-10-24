angular.module('app.business').controller("contractPayReceviceSaveCtrl", 
		function($scope, $rootScope, $filter, $http, $state, $stateParams, $uibModal, 
				contractService, commonUtilService, enumService, codeRuleService, APP_CONFIG) {
	
    $scope.contract = {};
    $scope.isNotEdit = false;
    // 防止重复提交标识.
    $scope.saveFlag = false;
    
    //经营管理下的合同管理
    $scope.menu = $stateParams.menu;
    //获取合同执行中和执行完毕的数据
    $scope.searchCondition={};
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.getContractData = function() {
        contractService.getModalList($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
            	$scope.contractList = data.list;
            	$scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
    $scope.searchCondition = {};
    $scope.getContractData();

   // 翻页
 	$scope.goPage = function(pageNum) {
 		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
      		$scope.pageInfo.pageNum = pageNum;
      		$scope.getContractData();
      	}
 	}

    var validator = $("#contract-form").validate();
    
	
    // 返回.
    $scope.retList = function () {
    	if ($rootScope.previousState_name != '') {
    		if($rootScope.previousState_name.indexOf("app.additionalHome") != -1){//首页跳转的返回首页
        		$rootScope.isIndexPage = true;
        	}
    		$rootScope.back();
        } else {
        	$state.go("app.business.contract-pay-recevice");
        }
    }

    
    // 保存.
    $scope.saveData = function () {
    	$scope.payStatus = angular.toJson($scope.contract.payStatus);
    	if ($scope.payStatus == '' || $scope.payStatus == null) {
            $("#payStatus-error").text("必须填写");
            //$scope.saveFlag=true;
        } else {
            $("#payStatus-error").text("");
        //}
    	
    	if (!$scope.saveFlag) {
    		if (validator.form()) {
    			// 设置saveFlag为true,防止重复提交.
    			$scope.saveFlag = true;
    			
    			$http({
    				method: 'POST',
    				url: APP_CONFIG.businessUrl + '/depot/business/contractPay/contractPaySave',
    				data: {
    					contractJson : angular.toJson($scope.contract)
    				}
    			}).then(function successCallback(response) {
    				if(response.data.status == "success"){
    					alert("保存成功！");
    					$scope.retList();
    				}else{
    					alert(response.data.msg);
    					$scope.saveFlag = false;
    				}
    				
    			}, function errorCallback(response) {
    				// 请求失败执行代码
    			});
    		}
    	}
     }
   }
    
    
    //合同履约查看
    $scope.showView = function(contractNum) {
    	if($scope.menu!=null){
    		$state.go("app.business.management.contract.pay-details", {contractNum: contractNum});
    	}else{
    		$state.go("app.business.contract-pay-recevice-details", {contractNum: contractNum});
    	}
        
    }
    
});
