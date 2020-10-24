"use strict";
angular.module('app.storage').controller("fumigationCtrl", function($scope, $http, $state, $rootScope, $uibModal,
		$filter, fumigationService, businessApprovalService, APP_CONFIG) {
	
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	
    // 获取列表数据
    $scope.loadData = function() {
        fumigationService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition, $rootScope.userInfo.userId).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }

    $scope.searchCondition = {};
    $scope.loadData();
    
    // 清空查询条件.
    $scope.clearConditions = function() {
    	$scope.searchCondition = {};
    	$scope.loadData();
    }
     
    // 新增页面
    $scope.showAdd = function() {
        $state.go("app.storage.fumigation-edit", {id : 0});
    }

    // 编辑页面
    $scope.showEdit = function(fumigation) {
        if (fumigation.auditState > 1) {
            alert("您已经提交该数据，无法修改！");
            return;
        }
        $state.go("app.storage.fumigation-edit", {id : fumigation.id});
    }

    // 查看页面
    $scope.showView = function(fumigation) {
        $state.go("app.storage.fumigation-view", {id : fumigation.id});
    }
    
    // 接收广播，切换仓房
    $scope.$on("storeChangeed", function(event, storehouseId) {
        $scope.searchCondition.houseId = storehouseId;
        $scope.loadData();
    })
    
    // 删除一条记录
    $scope.remove = function(fumigation) {
       if (fumigation.auditState > 1) {
           alert("您已经提交该数据，无法删除！");
           return;
        }
        if (!confirm("确定要删除吗？")) {
            return;
        }

        fumigationService.remove(fumigation.id).then(function(data){
        	//删除流程轨迹数据
        	businessApprovalService.removeList(fumigation.id, "1").then(function(datas){
        		if (datas.status != "success") {
        			alert("error");
        			return;
        		}
        	},function(data){
                console.log(datas);
            });
        	alert("删除成功！");
            // 重新加载数据
            $scope.loadData();
        },function(data){
            console.log(data);
        });

    }
    
    // 提交申请.
 	$scope.choice = function(fumigation) {
 		if (fumigation.auditState > 1) {
             alert("您已经提交该数据，无法再次提交！");
             return;
        }
        $scope.fumigation = fumigation;

		// 展开下一个审批人模态框.
        var modalInstance = $uibModal.open({
            size : 'md',  
            templateUrl: 'app/storage/aeration/views/approvalUser-view.html',
            controller: 'approvalTaskCtrl',
            resolve: {
            	roleId : 10 //提交给保管科长
            }  
        });

        // 回调函数.
        modalInstance.result.then(function (result) {
        	if (result.returnType == "cancel") {
 				// 不做操作.
 			} else if (result.returnType == "submit") {
 				// 审批人.
 				$scope.submit(result.assignee, result.list);
 			} else if (result.returnType == "isEnd") {
 				
 			}
 		}, function (reason) {
 			console.log(reason);
 		});
	}

    // 提交.
    $scope.submit = function(assignee, userList) {
    	fumigationService.submit($scope.fumigation.id, "2").then(function(data){
    		if (data.success == 'success') {
                // 请求成功后要往轨迹表里面添加流程轨迹数据
    			$scope.saveBusinessApproval($scope.fumigation, assignee, userList);
                // 重新加载数据
                alert("提交成功！");
                $("#myUserList").modal("hide");
                $scope.loadData();
            }
        },function(data){
        	console.log(data);
        });
    }

    //往流程轨迹表添加轨迹数据
    $scope.saveBusinessApproval = function(apply, assignee, userList) {
    	var date = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
    	$scope.businessApproval = {
    			taskTypeName : "熏蒸任务 作业单号:"+apply.fumigateProgramNumber,
    			projectId : apply.id,
    			fromDepartment : $rootScope.orgInfo.orgName,
    			fromPeople : $rootScope.userInfo.realName,
    			fromUserName : $rootScope.userInfo.realName,
    			taskType : "fumigationProgram",
    			projectName : "熏蒸作业申请",
    			result : "待审批",
    			isHide : 0,
    			createTime : new Date(),
    	        //保存申请人的信息,时间.
    			applyName : $rootScope.userInfo.realName,
    			applyNameId : $rootScope.userInfo.userId,
    			applyTime : new Date(),
    	        //下一个待审批人
    			operator : assignee,  //下一个审批人的用户ID
    			operatorName : $rootScope.userInfo.realName,  //当前登录人的realName
    			taskName : "员工提交",
    			taskId : apply.fumigateProgramNumber,
    			content : "同意"
    	};
    	for (var i = 0; i < userList.length; i++) {
    		var obj = userList[i];
    		if (obj.userId == assignee) {
    			$scope.businessApproval.operatorName = obj.realName;
    		}
    	}

    	businessApprovalService.add($scope.businessApproval, "2").then(function(data){
    		if (data.status != 'success') {
                alert("error");
            }
        },function(data){
        	console.log(data);
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