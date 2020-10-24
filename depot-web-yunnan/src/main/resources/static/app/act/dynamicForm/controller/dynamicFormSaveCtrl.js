"use strict";

angular.module('app.dynamicForm').controller("dynamicFormSaveCtrl", function( $scope, $http, $stateParams , dynamicFormSaveService, APP_CONFIG) {
	// 获取列表数据
    $scope.loadData = function() {
    	dynamicFormSaveService.getPageInfo($stateParams.id , $stateParams.key).then(function(data){
            $scope.params = data.form.formProperties;
            $scope.key = data.key;
            $scope.enums = data;
            $scope.processDefinitionId = data.processDefinitionId;
            console.log(data);
        },function(data){
            console.log(data);
        });
    }
     
    $scope.loadData();
    
    $scope.ok=function(){
    	alert($scope.key);
    }

	// 保存.
	$scope.save = function() {
		$http({
			method : 'POST',
			url : APP_CONFIG.businessUrl + '/act/form/dynamic/task/complete',
			data : {
				formJson : angular.toJson($scope.params),
				keys : $scope.key,
				processDefinitionId : $scope.processDefinitionId
			}
		}).then(function successCallback(response) {

			if (response.data.status == "success") {
				alert("保存成功！");
				$scope.retList();
			} 

		}, function errorCallback(response) {
			// 请求失败执行代码
		});
	}
	
	
	// 选择审批人.
	$scope.choice = function() {
		alert($scope.params);
 		$scope.modelItem = [];
 		$scope.modelItem.processInstanceId = plan.processInstanceId;
         // 展开下一个审批人模态框.
         var modalInstance = $uibModal.open({
             size : 'md',  
             templateUrl: 'app/business/util/views/choiceUser-view.html',
             controller: 'choiceUserModalCtrl',
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
         	if (result.returnType == "cancel") {
         		// 不做操作.
         	} else if (result.returnType == "submit") {
         		// 审批人.
         		$scope.submit(result.assignee);
         	} else if (result.returnType == "isEnd") {
         		$scope.audit($scope.modelItem.auditResult, null);
         	}
         }, function (reason) {
             console.log(reason);
         });
     }
     
     
     // 提交.
     $scope.submit = function(assignee) {
         
         $http({
             method: 'POST',
             url: APP_CONFIG.businessUrl + '/depot/business/plan/submit',
             data: {
                 id : $scope.plan.id,
                 assignee : assignee,
             }
         }).then(function successCallback(response) {
            if (response.data.success == 'success') {
                // 请求成功执行代码
                // 重新加载数据
                alert("提交成功！");
                $scope.loadData();
            } else {
                alert(response.data.msg);
            }
         }, function errorCallback(response) {
             // 请求失败执行代码
             console.log(response);
         });
     }
});