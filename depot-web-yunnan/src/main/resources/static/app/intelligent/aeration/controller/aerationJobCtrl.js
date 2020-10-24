"use strict";

angular.module('app.intelligent')
.controller("aerationJobCtrl", function($scope, $rootScope, $state, $http, $stateParams, 
		enumService, aerationJobService,$uibModal, APP_CONFIG) {

	
	//通风记录列表数据查询
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.aerationJob = { taskNumber: ""};
    $scope.loadData = function() {

    	aerationJobService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.aerationJob).then(function(data){
    		$scope.pageInfo = data.data;
        },function(data){
            console.log(data);
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


    
    
    
    // 查看页面
    $scope.showView = function(id) {
        $state.go("app.intelligent.aeration.control.aerationJob-view", {id: id});
    };
    
   // 删除一条记录.
    $scope.remove = function(id) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        aerationJobService.remove(id).then(function(data) {
            if (data.retCode == '200') {
                alert("删除成功！");
                $scope.loadData();
            } else {
                alert(data.message);
            }
        });
    };
    
    
    //新增选择通风计划
    $scope.getAerationPlan = function() {
		 var params = [];
		 //params.type = "addBlacklist";
    	
		 var uibModalInstance = $uibModal.open({
			 size:'lg',  
            templateUrl: 'app/intelligent/aeration/views/aerationPass-list-modal.html',
            controller: 'aerationPassListModalCtrl',
            resolve: {
         	    // items是一个回调函数 
               items: function () {
                   // 这个值会被模态框的控制器获取到
                   return params; 
             }
         }  
        }); 
		 uibModalInstance.result.then(function (result) {
			 // 关闭模态框时刷新页面数据
			 if (result != null) {
				 $scope.loadData();
			 }
			 
	     }, function (reason) {    
	         console.log(reason);
	     });
	}
    
    
    
})

.controller("aerationJobEditCtrl", function($scope, $filter,$state, $rootScope, $stateParams, APP_CONFIG, aerationJobService,aerationTaskService,temperatureRecordService,gasDetectionPlanService) {
    // 防止重复提交标记
    $scope.saveFlag = false;
    $scope.isNotEdit = true;
    $scope.search = {};
    $scope.pageInfo = {pageNum : 1, pageSize : 10};

    // 加载数据.
    $scope.loadDataById = function(id) {
    	aerationJobService.edit(id).then(function(data){
            $scope.aerationJob = data.data;
            $scope.aerationJob.orgName = $rootScope.orgInfo.orgName;
           
            //根据计划编号获取仓房编号
            $scope.getHouseByNumber($scope.aerationJob.aerationPlanNumber);
            
            
            /*$scope.aerationParameter.vcfcode=parseInt(data.data.vcfcode);
            $scope.aerationParameter.vdevkindcode=parseInt(data.data.vdevkindcode);*/
            //$scope.aerationParameter.vdevkindcode=parseInt(data.data.vdevkindcode);
        },function(data){
        });
    };
    
    $scope.loadDataById($stateParams.id);
    
    
    //根据计划编号获取仓房编号
    $scope.getHouseByNumber = function(aerationPlanNumber) {
    	aerationTaskService.getHouseByNumber(aerationPlanNumber).then(function(data){
            $scope.JobApplication = data.data;
            $scope.search.vCfCode = $scope.JobApplication.vCfCode;
            $scope.search.startTime = $scope.aerationJob.taskStartTime;
            $scope.search.endTime = $scope.aerationJob.taskEndTime;
            
           //获取通风前后的粮温
            $scope.getTemperature($scope.pageInfo,$scope.search);
            
            //获取通风前后的气体变化
            $scope.getGasDetection($scope.pageInfo,$scope.search);
            
           
        },function(data){
        });
    };
    
    //获取通风前后的粮温
    $scope.getTemperature = function() {
        temperatureRecordService.getTemperatureRecordPageInfo($scope.pageInfo, $scope.search).then(function(data){
            
            //通风后数据
            $scope.aerationAfter = data.data.list[0];
            //通风前数据
            $scope.aerationBefore = data.data.list[data.data.list.length-1];
        },function(data){
            // console.log(data);
        });
    };
    
    
    //获取通风前后的气体变化
    $scope.getGasDetection = function() {
    	 gasDetectionPlanService.getGasDetectionPageInfo($scope.pageInfo, $scope.search).then(function(data){
    		//通风后数据
             $scope.gasAfter = data.data.list[0];
             //通风前数据
             $scope.gasBefore = data.data.list[data.data.list.length-1];
         },function(data){
             console.log(data);
         });
    };
    

    // 返回,取消
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
            $rootScope.back();
        } else {
            $state.go("app.intelligent.aeration.control.aerationJob");
        }
    }

});
