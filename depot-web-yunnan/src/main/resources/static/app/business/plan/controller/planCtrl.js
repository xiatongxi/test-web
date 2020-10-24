"use strict";
angular.module('app.business').controller("planCtrl",function($scope,$stateParams,$rootScope, $http, $state, $uibModal,
		planService, enumService, APP_CONFIG) {
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.searchCondition = {};
	//储备粮计划
	$scope.attributeType = $stateParams.attributeType;
	$scope.searchCondition.attributeType = $stateParams.attributeType;
	
	//经营业务下的计划管理
	$scope.menu = $stateParams.menu;
	
    // 获取列表数据
    $scope.loadData = function() {
        planService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition,$stateParams.executeType).then(function(data){
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
     
    // 新增页面
    $scope.showAdd = function() {
    	if($scope.attributeType!=null){
    		if($scope.attributeType==1){
        		$state.go("app.business.grainReservesPlan-rotation-apply-edit",{id: 0,attributeType:$scope.attributeType});

        	}else if($scope.attributeType==2){
        		$state.go("app.business.grainReservesPlan-sales-apply-edit",{id: 0,attributeType:$scope.attributeType});
        		

        	}else if($scope.attributeType==3){
        		$state.go("app.business.grainReservesPlan-acquisition-apply-edit",{id: 0,attributeType:$scope.attributeType});

        	}
    	}else if($scope.menu!=null){
    		$state.go("app.business.management.plan-edit",{id: 0,menu:$scope.menu});
    	}else{
    		$state.go("app.business.plan-edit",{id: 0});
    	}
    	
    	
    	
    	
    	 // location.href=appConfig.businessUrl + '/#/business/plan-add/0';
        
    }

    // 编辑页面
    $scope.showEdit = function(id, auditState) {
        if (auditState != "0" && auditState != "3") {
            alert("您已经提交该数据，无法修改！");
            return;
        }
        
        //location.href=APP_CONFIG.baseUrl + '/#/business/plan-edit/'+id;
        if($scope.attributeType==1){
            $state.go("app.business.grainReservesPlan-rotation-apply-edit",{id : id, attributeType:$scope.attributeType});
    	}else if($scope.attributeType==2){
            $state.go("app.business.grainReservesPlan-sales-apply-edit",{id : id, attributeType:$scope.attributeType});
    	}else if($scope.attributeType==3){
            $state.go("app.business.grainReservesPlan-acquisition-apply-edit",{id : id, attributeType:$scope.attributeType});
    	}else{
    		$state.go("app.business.plan-edit",{id: id});

    	}
    }
    
    // 查看页面
    $scope.showView = function(id, processInstanceId) {
    	
    	if($scope.attributeType!=null){
    		if($scope.attributeType==1){
                $state.go("app.business.grainReservesPlan-rotation-view",{id : id, processInstanceId : processInstanceId});
        	}else if($scope.attributeType==2){
                $state.go("app.business.grainReservesPlan-sales-view",{id : id, processInstanceId : processInstanceId});
        	}else if($scope.attributeType==3){
                $state.go("app.business.grainReservesPlan-acquisition-view",{id : id, processInstanceId : processInstanceId});
        	}
    	}else if($scope.menu!=null){
            $state.go("app.business.management.plan-view",{id : id, processInstanceId : processInstanceId});
    	}else{
            $state.go("app.business.plan-view",{id : id, processInstanceId : processInstanceId});

    	}
    	
    	
    	
        //location.href=APP_CONFIG.baseUrl + '/#/business/plan-edit/'+id;
    }
    
     // 删除一条记录
     $scope.delete = function(id, auditState,processInstanceId) {
        if (auditState != "0" && auditState != "3") {
            alert("您已经提交该数据，无法删除！");
            return;
         }
         if (!confirm("确定要删除吗？")) {
             return;
         }
         
         $http({
             method: 'POST',
             url: APP_CONFIG.businessUrl + '/depot/business/plan/remove',
             data: {
                 id : id,
                 processInstanceId : processInstanceId
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
	$scope.choice = function(plan) {
		if (plan.auditState != "0" && plan.auditState != "3") {
            alert("您已经提交该数据，无法再次提交！");
            return;
        }
        $scope.plan = plan;
		
		$scope.modelItem = [];
		
		$scope.modelItem.allContent = plan;
		$scope.modelItem.variable = "2";
		$scope.modelItem.type = "plan";
		
		//审批驳回 时，再次提交的审批人为上次的审批人
		if(plan.auditState == "3"){
			//获取上一审批人
			planService.loadDataById(plan.id, plan.processInstanceId).then(function(data){
				$scope.assigneeName = data.subAudit.assigneeName;
				$scope.returnResult = [];
				$scope.returnResult.returnType = "submit";
				$scope.submit($scope.assigneeName);
	            //上一审批人(驳回时，获取上一审批人 为当前审批人)
		            /*if(data.subAudit==null){
						$scope.returnResult = [];
						$http({
							method: 'GET',
							url: APP_CONFIG.businessUrl + '/act/roleList/getUserList',
							params: {
								procInstId : $scope.modelItem.allContent.processInstanceId,
								type : $scope.modelItem.type,
								orgId : $rootScope.userInfo.orgId
							}
						}).then(function successCallback(response) {
							console.log(response.data);
							$scope.returnResult.returnType = "submit";
							$scope.submit($scope.assigneeName);
						}, function errorCallback(response) {
							// 请求失败执行代码
							console.log(response);
						});
		            }*/
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
				} else if (result.returnType == "isEnd") {
					$scope.audit($scope.modelItem.auditResult, null);
				}
			}, function (reason) {
				console.log(reason);
			});
		}
		
     }
     
     
     // 提交.
     $scope.submit = function(assignee) {
         $http({
             method: 'POST',
             url: APP_CONFIG.businessUrl + '/depot/business/plan/submit',
             data: {
                 id : $scope.plan.id,
                 assignee : assignee,
                 userId :$rootScope.userInfo.userId,
                 realName: $rootScope.userInfo.realName
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
     
     
    // 审批.
 	$scope.audit = function (auditResult,assignee) {
 		if($scope.audit.content==null){
 			alert("请填写审批意见");
 		}else{
 				$http({
 		        method: 'POST',
 		        url: APP_CONFIG.businessUrl + '/depot/business/plan/audit/audit',
 		        data: {
 		            planId : $scope.planId,
 		            result : auditResult,
 		            content : $scope.audit.content,
 		            processInstanceId : $scope.processInstanceId,
 		            taskId : $scope.taskId,
 		            id : $scope.auditId,
 		            assignee : assignee,
 		            userId : $rootScope.userInfo.userId,
 		            realName : $rootScope.userInfo.realName
 			        }
 			    }).then(function successCallback(response) {
 			        // 请求成功执行代码
 			        alert("执行成功！");
 			        $scope.retList();
 			    }, function errorCallback(response) {
 			        // 请求失败执行代码
 			        console.log(response);
 			    });
 		}
 		
 	    
 	}
 	
     
     // 翻页
 	$scope.goPage = function(pageNum) {
 		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
      		$scope.pageInfo.pageNum = pageNum;
      		$scope.loadData();
      	}
 	}
     
});