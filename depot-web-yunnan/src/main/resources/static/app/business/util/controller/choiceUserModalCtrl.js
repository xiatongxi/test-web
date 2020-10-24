angular.module('app.business').controller("choiceUserModalCtrl", 
    function($scope,$rootScope, $http, $state, $uibModalInstance, APP_CONFIG, items) {
	
	$scope.returnResult = [];
    // items为上一个模态窗穿过来的中是 processInstanceId 和  auditResult.
    // 获取列表数据
    $scope.loadData = function() {
        if(items.type == null){
            items.type = "apply";
        }
    	// 需要的参数是流程实例id.
        $http({
            method: 'GET',
            url: APP_CONFIG.businessUrl + '/act/roleList/getUserList',
            params: {
            	procInstId : items.allContent.processInstanceId,
            	type : items.type,
                orgId : $rootScope.userInfo.orgId
            }
        }).then(function successCallback(response) {
        	if (response.data.isEnd) {
        		// 最后的审批节点.
        		// 关闭模态窗.
        		$scope.returnResult.returnType = "isEnd"
        		$uibModalInstance.close($scope.returnResult);
        	} else {
        		// 不是最后的审批节点.
        		// 显示审批人
        		$scope.userList = response.data.userByRoleId;
        	}
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
    }
    
    $scope.loadData();

    $scope.closeModal = function() {
        $scope.returnResult.returnType = "cancel";
        // close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
        $uibModalInstance.close($scope.returnResult);
    }


    // 关闭模态窗口
    $scope.cancel = function() {
        if(items.variable == "2"){
            $scope.closeModal();
        }else {
            var url = '';
            // 需要页面传过来的id.
            if(items.type == "plan"){
                url = '/depot/business/plan/remove';
            }else if(items.type == "contract" || items.type == "transferContract"){
                url = '/depot/business/contract/remove';
            }else if(items.type == "contractChange"  || items.type == "transferContractChange" ){
                url = '/depot/business/contract/changeContractRemove';
            } else{
                url = '/depot/business/deliveryStorageNotice/remove';
            }
            $http({
                method: 'POST',
                url: APP_CONFIG.businessUrl + url,
                params: {
                    id : items.allContent.id,
                    processInstanceId : items.allContent.processInstanceId,
                    planBid : items.allContent.planBid,
                    contractBid : items.allContent.contractBid,
                    originalContractBid : items.originalContractBid
                }
            }).then(function successCallback(response) {
                if (response.data.status == "success") {
                    $scope.closeModal();
                }
            }, function errorCallback(response) {
                // 请求失败执行代码
                console.log(response);
            });

        }

    }
    
    // 选择审批人.
    $scope.choiceUser = function(assignee) {
    	if (assignee == null || assignee == undefined || assignee == '') {
    		alert("请选择审批人！");
    		return;
    	}
    	$scope.returnResult.returnType = "submit";
    	$scope.returnResult.assignee = assignee;
        // 关闭模态窗.
        $uibModalInstance.close($scope.returnResult);
    }
});