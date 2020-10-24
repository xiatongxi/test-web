angular.module('app.business').controller("transferNoticeCtrl", function($scope, $http, $state, $uibModal,
		transferNoticeService,$rootScope, APP_CONFIG) {
	
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.searchCondition = {orgId : $rootScope.userInfo.orgId};
     // 获取列表数据
     $scope.loadData = function() {
    	 transferNoticeService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
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
     
    // 新增入库通知单页面
    $scope.showStorageNoticeAdd = function() {
        $state.go("app.business.transferNotice-edit", {id : 0});
    }
    
    // 新增出库通知单页面
    $scope.showDeliveryNoticeAdd = function() {
        $state.go("app.business.transferNotice-edit", {id : 0});
    }

    // 查看页面
    $scope.showView = function(id, billType, processInstanceId) {
        /*if (billType == "1") {
            $state.go("app.business.transferNotice-view", {id : id, processInstanceId : processInstanceId});
        } else if (billType == "3") {
            $state.go("app.business.transferNotice-view", {id : id, processInstanceId : processInstanceId});
        }*/
        $state.go("app.business.transferNotice-view", {id : id, processInstanceId : processInstanceId});
    }
    
    // 编辑页面
    $scope.showEdit = function(id, billType, auditState) {
        if (auditState != "0" && auditState != "3") {
            alert("您已经提交该数据，无法修改！");
            return;
        }
        if (billType == "1") {
            $state.go("app.business.storageNotice-edit", {id : id});
        } else if (billType == "3") {
            $state.go("app.business.deliveryNotice-edit", {id : id});
        }
    }
    
     // 删除一条记录
     $scope.delete = function(deliveryStorageNotice) {
         if (deliveryStorageNotice.auditState != "0") {
            alert("您已经提交该数据，无法删除！");
            return;
         }
         if (!confirm("确定要删除吗？")) {
             return;
         }
         
         $http({
             method: 'POST',
             url: APP_CONFIG.businessUrl + '/depot/business/deliveryStorageNotice/remove',
             data: {
                 id : deliveryStorageNotice.id,
                 processInstanceId : deliveryStorageNotice.processInstanceId
             }
         }).then(function successCallback(response) {
        	 // 重新加载数据
        	 $scope.loadData();
             // 请求成功执行代码
             alert("删除成功！");
         }, function errorCallback(response) {
             // 请求失败执行代码
             console.log(response);
         });
         // 关闭弹出层
         $("#myModal").modal("hide");
     }
     
    // 选择审批人.
 	$scope.choice = function(deliveryStorageNotice) {
 		if (deliveryStorageNotice.auditState != "0" && deliveryStorageNotice.auditState != "3") {
             alert("您已经提交该数据，无法再次提交！");
             return;
         }
         $scope.deliveryStorageNotice = deliveryStorageNotice;
  		
  		 $scope.modelItem = [];
  		 $scope.modelItem.processInstanceId = deliveryStorageNotice.processInstanceId;
  		$scope.modelItem.allContent = deliveryStorageNotice;
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
          	}
          }, function (reason) {
              console.log(reason);
          });
      }
 	
     
     // 提交.
     $scope.submit = function(assignee) {
          $http({
              method: 'POST',
              url: APP_CONFIG.businessUrl + '/depot/business/deliveryStorageNotice/submit',
              data: {
                  id : $scope.deliveryStorageNotice.id,
                  assignee : assignee
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