angular.module('app.business').controller("contractAuditPassSaveCtrl",
		function($scope, $rootScope, $http, $filter, $stateParams, $state,$uibModal,userService, 
		        contractService, enumService, APP_CONFIG) {
	
	//签订人 信息
    $scope.userInfoMessage = function() {
	    userService.getPageInfo(null, null, null,null, null, null).then(function(data){
	            $scope.userInfoList = data.list;
	        },function(data){
	            console.log(data);
	        });
    }
    $scope.userInfoMessage();
    
    $scope.loadDataById = function(id, processInstanceId) {
        contractService.loadDataByIdAndProcessInstanceId(id, processInstanceId).then(function(data){
            $scope.contract = data.contract;
            $scope.contract.contractType = data.contract.contractType+"";
            $scope.auditList = data.auditList;
            $scope.fileList = data.fileList;
            $scope.changeDetailList = data.changeDetailList;
            $scope.contract.signingMan=parseInt(data.contract.signingMan);
            $scope.processDefinitionId = data.contract.processDefinitionId;
            $scope.processInstanceId = data.contract.processInstanceId;
            $scope.contract.signingTime = $filter('date')($scope.contract.signingTime, "yyyy-MM-dd"); 
            $scope.contract.enableDate = $filter('date')($scope.contract.enableDate, "yyyy-MM-dd"); 
            $scope.contract.disableDate = $filter('date')($scope.contract.disableDate, "yyyy-MM-dd"); 
            $scope.contract.createTime = $filter('date')($scope.contract.createTime, "yyyy-MM-dd");
            if ($scope.editType == "add") {
            	$scope.contract.changeContent = '';
            	$scope.contract.changeReason = '';
            }
            // 历次变更记录为空，就不显示.
            if ($scope.changeDetailList == null || $scope.changeDetailList.length == 0) {
            	$scope.changeDetailListHide = true;
            } else {
            	$scope.changeDetailListHide = false;
            }
            
        	// 隐藏新增明细按钮.
        	$scope.addRowButtonShow = false;
            // 子表数据.
            $scope.storeWareDetailList = data.storeWareDetailList;
            for (var i=0; i < data.storeWareDetailList.length; i++) {
                $scope.addedDetail.push(angular.copy(data.storeWareDetailList[i]));
            }
            
            $scope.getAttributeData();
            $scope.getAreaData();
           // $scope.getGrainDetailKind();
        },function(data){
        });
    }
    
    $scope.isNotEdit = true;
    // 用于存放 子表数据 的数组.
    $scope.addedDetail = [];
    
    if ($stateParams.id != 0) {
        //新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
        $scope.loadDataById($stateParams.id, $stateParams.processInstanceId);
      //暂停、启用、终止 按钮的显示
        $scope.auditPassContract = true ;
        $scope.selectPlan = true ;//合同类型 不可更改
    }
    
    $scope.retList = function () {
    	if ($rootScope.previousState_name != '') {
    		if($rootScope.previousState_name.indexOf("app.additionalHome") != -1){//首页跳转的返回首页
        		$rootScope.isIndexPage = true;
        	}
    		$rootScope.back();
        } else {
        	$state.go("app.business.contract-audit-pass");
        }
    }

    // ----------------------------------------------    树形下拉框     开始          --------------------------------------------------
    // 树形下拉框(粮食性质)
    $scope.getAttributeData = function() {
        enumService.getTreeList($scope.contract.grainAttribute, "grainAttribute").then(function(data) {
            $scope.grainAttributeTreeData = data;
        },function(data) {
            console.log(data);
        })
    }

    // 树形下拉框(粮食产地)
    $scope.getAreaData = function() {
        enumService.getTreeList($scope.contract.grainProducingArea, "grainProducingArea").then(function(data) {
            $scope.grainProducingAreaTreeData = data;
        },function(data){
            console.log(data);
        })
    }
    
 /*   // 树形下拉框(明细品种)
    $scope.getGrainDetailKind = function() {
    	enumService.getTreeListByTypeId ( $scope.storeWareDetail.grainDetailKind, $scope.storeWareDetail.grainKind).then(function(data) {
            $scope.grainDetailKindTreeData = data;
        },function(data) {
            console.log(data);
        })
    };*/
    
    // ----------------------------------------------    树形下拉框     结束          --------------------------------------------------
   //-----------------------------------------------暂停、终止、启用-------------------------------------
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
	
     // 获取列表数据
     $scope.loadData = function() {
    	 contractService.getPassPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, null).then(function(data){
             $scope.pageInfo = data;
         },function(data){
             console.log(data);
         });
    }
    // 启用.
    $scope.application = function(id) {
        $http({
            method: 'POST',
            url: APP_CONFIG.businessUrl + '/depot/business/contract/application',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
        	if (response.data.status == "error") {
        		alert(response.data.msg);
        	} else {
        		// 重新加载数据
        		$state.go("app.business.contract-audit-pass");
        		$scope.loadData();
        		alert("启用成功！");
        	}
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
    }
    
    // 暂停
    $scope.discontinue = function(id) {
    	var params = [];
		params.id = id;
		params.type = "contractDiscontinue";
    	var uibModalInstance = $uibModal.open({
            size : 'md',  
            templateUrl: 'app/business/util/views/refuseReason-view.html',
            controller: 'refuseReasonCtrl',
            resolve: {
            	// items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params; 
                }
            }  
        });
    	uibModalInstance.result.then(function (result) {
    		if(result.returnType == "success"){
    			$state.go("app.business.contract-audit-pass");
    			$scope.loadData();
    		}
	    }, function (reason) {    
	        console.log(reason);
	    });
    	
    }
    
    // 终止
    $scope.finish = function(id) {
    	var params = [];
		params.id = id;
		params.type = "contractFinish";
    	var uibModalInstance = $uibModal.open({
            size : 'md',  
            templateUrl: 'app/business/util/views/refuseReason-view.html',
            controller: 'refuseReasonCtrl',
            resolve: {
            	// items是一个回调函数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params; 
                }
            }  
        });
    	uibModalInstance.result.then(function (result) {
    		if(result.returnType == "success"){
    			$state.go("app.business.contract-audit-pass");
    			$scope.loadData();
    		}
	    }, function (reason) {    
	        console.log(reason);
	    });
    }
    
    
    
});
