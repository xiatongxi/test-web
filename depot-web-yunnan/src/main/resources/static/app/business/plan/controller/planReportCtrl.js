"use strict";
angular.module('app.business').controller("planReportCtrl", function($scope,$rootScope, $http, $state, $uibModal,
		planService, enumService, APP_CONFIG) {
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
    // 获取列表数据
    $scope.loadData = function() {
        planService.getReportPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
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
     

    // 点击上报，修改其状态
    $scope.report = function(id) {
    	$scope.data;
    	//alert("点击上报后不可再取消，确认上报");
    	planService.loadDataById(id).then(function(data){
    		//在json对象里增加一个属性
    		var plan = angular.fromJson(angular.toJson(data));
    		plan.orgName=$rootScope.orgInfo.orgName;
    		plan.orgCode=$rootScope.orgInfo.companyOrgCode;//组织机构代码
    		
    		/*planService.updateStatus(id).then(function(data){
        		//console.log(plan+"----");
                if(data.status=="success"){
                	 $scope.loadData();
                     alert("上报成功！");
                }
                
            },function(data){
                console.log(data);
            });*/
    		
    		//var plan="123";
    		planService.reportPlan(plan).then(function(data){
    			console.log(data+"----上报结果");
                if(data.status=="success"){ 
                	//alert("点击上报后不可再取消，确认上报");
                	planService.updateStatus(id).then(function(data){
                		//console.log(plan+"----");
                        if(data.status=="success"){
                        	 $scope.loadData();
                             alert("上报成功！");
                        }
                    },function(data){
                        console.log(data);
                    });
                	
                }else{
                	alert("省级平台接收数据有误，尽快与其联系！");
                }
                
            },function(data){
                console.log(data);
            });
        	
            
    	},function(data){
            console.log(data);
        });
        // 重新加载数据
        $scope.loadData();
       
    }
    
    
    //查看
    $scope.showView = function(id,processInstanceId) {
    	$state.go("app.business.plan-report-view",{id : id , processInstanceId : processInstanceId});
 	}
    
    
    //上报成功查看
    $scope.showReportView = function(id,processInstanceId) {
    	$state.go("app.business.plan-reportSuccess-view",{id : id, processInstanceId : processInstanceId});
    }

    
     
     
     // 翻页
 	$scope.goPage = function(pageNum) {
 		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
      		$scope.pageInfo.pageNum = pageNum;
      		$scope.loadData();
      	}
 	}
     
});