angular.module('app.intelligent').controller("aerationPassListModalCtrl", 
    function($scope, $uibModalInstance, $filter, $http, $uibModal,$rootScope,codeRuleService, $stateParams, aerationTaskService,aerationJobService, APP_CONFIG, items) {

    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.aerationTask = {state : ""};
    // 获取列表数据
    $scope.loadData = function() {
    	$stateParams.approvalState = 4; //审批通过的状态
    	aerationTaskService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.aerationTask ,$stateParams.approvalState).then(function(data){
    		$scope.pageInfo = data.data;
            
    	}).catch(function(data) {
              if (data.status == 601) {
                  // session失效，关闭模态框.
                  $uibModalInstance.close();
              }
        });
    }
    
    $scope.loadData();
    
    
    // 翻页
    $scope.goPage = function(pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
             $scope.pageInfo.pageNum = pageNum;
             $scope.loadData();
         }
    }
    
    // 关闭模态窗口
    $scope.cancel = function() {
        $uibModalInstance.close();
    }
    
    // 选择计划.
    $scope.selectCustomer = function(apply) {
        //获取作业编号
        codeRuleService.getCodeValueByType("storageAeration", $rootScope.userInfo.orgId).then(function(data) {
            if (data.status == "success") {
                //$scope.planNumber.status = "success";
                $scope.taskNumber = data.codeValue;
                //增加到作业表
                aerationJobService.save(apply,$scope.taskNumber).then(function(data) {
                	$uibModalInstance.close(apply);
                	if (data.retCode == '200') {
                		alert("作业新增成功！");
                    } else {
                        alert(data.message);
                    }
                	
                });
            
            } else if (data.status == "error") {
                $scope.msg = data.msg;
                $scope.status = "error";
                if(confirm("通风计划编号有误！该页面无法保存！原因：" + $scope.msg + " 是否返回到列表页！")) {
                    $scope.retList();
                }
                $uibModalInstance.close(apply);
            }
        });
        
        
        
    }
     
     

});