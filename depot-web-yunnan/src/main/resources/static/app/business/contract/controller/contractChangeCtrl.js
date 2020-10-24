angular.module('app.business').controller("contractChangeCtrl", 
		function($scope, $state, $http,$stateParams,$rootScope, $uibModal, contractService, APP_CONFIG) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.searchCondition = {};
	//经营业务下的合同管理
    $scope.menu = $stateParams.menu;
    
    // 获取列表数据
    $scope.loadData = function() {
        contractService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, "change", $scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
    
    
    $scope.loadData();
    
    //清空
    $scope.clearConditions = function() {
    	$scope.searchCondition = {};
    	$scope.loadData();
    }

    // 编辑页面
    $scope.showEdit = function(id, auditState) {
        if (auditState != "0" && auditState != "3") {
            alert("您已经提交该数据，无法再次提交！");
            return;
        }
        if($scope.menu!=null){
    		$state.go('app.business.management.contract-change-edit', {id : id,menu:$scope.menu});
    	}else{
    		 $state.go("app.business.contract-change-edit", {id:id});
    	}
        
       
    }
    
    // 查看页面
    $scope.showView = function(id, processInstanceId) {
    	if($scope.menu!=null){
    		$state.go('app.business.management.contract-change-view', {id : id,processInstanceId : processInstanceId ,menu:$scope.menu});
    	}else{
            $state.go("app.business.contract-change-view", {id:id, processInstanceId : processInstanceId});
    	}
    }
    
    // 获取合同列表.
    // 点击新增或者修改时弹出模态窗
    $scope.getContract = function() {
		 var uibModalInstance = $uibModal.open({    
			 size:'lg',  
			 templateUrl: 'app/business/util/views/contract-list-modal.html',
			 controller: 'contractCanChangeListModalCtrl',
             resolve: {
          	    // items是一个回调函数
                items: function () {
              }
          }  
         }); 
		 uibModalInstance.result.then(function (result) {
			 if (result != null) {
				 if($scope.menu!=null){
					 $state.go("app.business.management.contract-change-add", {id : result.id,menu:$scope.menu});
				 }else{
					 $state.go("app.business.contract-change-add", {id : result.id});
				 }
				
			 }
			 // 关闭模态框时刷新页面数据
	     }, function (reason) {    
	         console.log(reason);
	     });
    }
    
    
    // 删除一条记录
    $scope.delete = function(id, originalContractBid, auditState, processInstanceId,contract) {
        if (auditState != "0") {
            alert("您已经提交该数据，无法再次提交！");
            return;
        }
        if (!confirm("确定要删除吗？")) {
            return;
        }
        
        $http({
            method: 'POST',
            url: APP_CONFIG.businessUrl + '/depot/business/contract/changeContractRemove',
            data: {
                id : id,
                originalContractBid : originalContractBid,
                processInstanceId : processInstanceId,
                planBid : contract.planBid
               
            }
        }).then(function successCallback(response) {
            if (response.data.status == 'success') {
                // 请求成功执行代码
                // 重新加载数据
                $scope.loadData();
                alert("删除成功！");
            } else if(response.data.status == 'error') {
                alert(response.data.msg);
            }
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
        $scope.modelItem.type = "contractChange";
 		
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
     
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData();
     	}
	}
	
});
