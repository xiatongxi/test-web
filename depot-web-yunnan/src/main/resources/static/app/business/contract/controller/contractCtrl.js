angular.module('app.business').controller("contractCtrl", function($scope, $stateParams, $http, $state, $uibModal,$rootScope,
		contractService, APP_CONFIG) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	
	//经营业务下的计划管理
	$scope.menu = $stateParams.menu;
	
    // 获取列表数据
    $scope.loadData = function() {
        contractService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, "", $scope.searchCondition,$stateParams.contractType).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
    $scope.searchCondition = {};
    $scope.loadData();
    
    //清空
    $scope.clearConditions = function() {
    	$scope.searchCondition = {};
    	$scope.loadData();
    }
    
    // 新增页面
    $scope.showAdd = function() {
    	if($scope.menu!=null){
    		 $state.go("app.business.management.contract-edit", {id: 0,menu:$scope.menu});
    	}else{
    		 $state.go("app.business.contract-edit", {id: 0});
    	}
       
    }

    // 编辑页面
    $scope.showEdit = function(id, auditState) {
        if (auditState != "0" && auditState != "3") {
            alert("您已经提交该数据，无法修改！");
            return;
         }
        if($scope.menu!=null){
   		    $state.go("app.business.management.contract-edit", {id: id,menu:$scope.menu});
   	    }else{
   	        $state.go("app.business.contract-edit", {id: id});
   	    }
        
       
    }
    
    // 查看页面
    $scope.showView = function(id, processInstanceId) {
    	if($scope.menu!=null){
      		 $state.go("app.business.management.contract-view", {id: id,processInstanceId : processInstanceId});
      	}else{
      		$state.go("app.business.contract-view", {id : id, processInstanceId : processInstanceId});
        }
    }
    
    // 删除一条记录
    $scope.delete = function(id, auditState, processInstanceId,contract) {
    	
    	if (auditState != "0" && auditState != "3") {
            alert("您已经提交该数据，无法删除！");
            return;
         }
         if (!confirm("确定要删除吗？")) {
             return;
         }
        
        $http({
            method: 'POST',
            url: APP_CONFIG.businessUrl + '/depot/business/contract/remove',
            data: {
            	id : id,
                processInstanceId : processInstanceId,
                planBid : contract.planBid
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            alert("删除成功！");
            // 重新加载数据
            $scope.loadData();
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
        // 关闭弹出层
        $("#myModal").modal("hide");
    }
    
    // 选择审批人.
	$scope.choice = function(contract) {
		if (contract.auditState != "0" && contract.auditState != "3") {
            alert("您已经提交该数据，无法再次提交！");
            return;
        }
        $scope.contract = contract;
 		
 		$scope.modelItem = [];
        $scope.modelItem.allContent = contract;
        $scope.modelItem.variable = "2";
        $scope.modelItem.type = "contract";
 		//审批驳回 时，再次提交的审批人为上次的审批人
		if(contract.auditState == "3"){

			//获取上一审批人
			contractService.loadDataByIdAndProcessInstanceId(contract.id, contract.processInstanceId).then(function(data){
	            //上一审批人(驳回时，获取上一审批人 为当前审批人)
		            if(data.subAudit!=null){
		            	$scope.assigneeName = data.subAudit.assigneeName;
                        $scope.returnResult = [];
                        //驳回到员工，为第一节点，此时显示审批人
                        $scope.returnResult.returnType = "submit";
                        $scope.submit($scope.assigneeName);
		            }
	            
	           },function(data){
	        });

		}else{
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
				} /*else if (result.returnType == "isEnd") {
					$scope.audit($scope.modelItem.auditResult, null);
				}*/
			}, function (reason) {
				console.log(reason);
			});
		}
 		
         /*// 回调函数.
         modalInstance.result.then(function (result) {
         	if (result.returnType == "cancel") {
         		// 不做操作.
         	} else if (result.returnType == "submit") {
         		// 审批人.
         		$scope.submit(result.assignee);
         	} else if (result.returnType == "isEnd") {
         	}
         }, function (reason) {
             console.log(reason);
         });*/
     }
	
    
    
    // 提交.
    $scope.submit = function(assignee) {
         $http({
             method: 'POST',
             url: APP_CONFIG.businessUrl + '/depot/business/contract/submit',
             data: {
                 id : $scope.contract.id,
                 assignee : assignee,
                 userId : $rootScope.userInfo.userId,
                 realName : $rootScope.userInfo.realName
                 
             }
         }).then(function successCallback(response) {
            if (response.data.success == 'success') {
                // 请求成功执行代码
                // 重新加载数据
                $scope.loadData();
                alert("提交成功！");
            } else {
                alert(response.data.msg);
            }
         }, function errorCallback(response) {
             // 请求失败执行代码
             console.log(response);
         });
    }
    
    
 // 审批.
    /*$scope.audit = function (auditResult, assignee) {
    	if($scope.audit.content==null){
			alert("请填写审批意见");
		}else{
			
			$http({
				method: 'POST',
				url: APP_CONFIG.businessUrl + '/depot/business/contract/audit/audit',
				data: {
					contractId : $scope.contractId,
					result : auditResult,
					content : $scope.audit.content,
					processInstanceId : $scope.processInstanceId,
					taskId : $scope.taskId,
					id : $scope.auditId,
					assignee : assignee,
					userId :$rootScope.userInfo.userId,
					realName : $rootScope.userInfo.realName
				}
			}).then(function successCallback(response) {
				// 请求成功执行代码
				alert("审批成功！");
				// 返回.
				$scope.retList();
			}, function errorCallback(response) {
				// 请求失败执行代码
				console.log(response);
			});
		}
         
    }*/
    
     
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData();
     	}
	}
	
});