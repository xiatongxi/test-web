angular.module('app.basic').controller("scheduleJobSaveCtrl", 
	function($scope, $http, $filter, $stateParams, $state, $uibModal, $rootScope,
			scheduleJobService, commonUtilService, APP_CONFIG) {
	// 防止重复提交.
    $scope.saveFlag = false;
    // 主体.
    $scope.scheduleJob = {};
    // 子表.
    $scope.scheduleJobDetail = {};
    // 用于存放新增子表数据
    $scope.addedDetail = [];
    
    
    $scope.loadDataById = function(id) {
    	scheduleJobService.loadDataById(id).then(function(data){
            $scope.scheduleJob = data.scheduleJob;
        },function(data){
        });
    }
    
    $scope.isNotEdit = $stateParams.isNotEdit; 
    
    if ($stateParams.id != undefined && $stateParams.id != null && $stateParams.id != '' 
    		&&  $stateParams.id != 0) {
        //新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
        $scope.loadDataById($stateParams.id);
    }

    var validator = $("#scheduleJob-form").validate();
    
    // 自定义验证，验证数字
    $.validator.addMethod("validInteger",function(value,element, params) {
    	var checkNumber = /^\d*$/g;
        return this.optional(element)||(checkNumber.test(value));  
    },"请输入正确的正整数!");
    
    

    // 保存.
    $scope.save = function () {
    	if (!$scope.saveFlag) {
    		if (validator.form()) {
    			// 设置saveFlag为true,防止重复提交.
    			$scope.saveFlag = true;
    			scheduleJobService.save($scope.scheduleJob, $rootScope.userInfo).then(function(data){
    				if(data.status == "success"){
    					alert("保存成功！");
    					$scope.retList();
    				}else{
    					alert(data.msg);
    					$scope.saveFlag = false;
    				}
    	        },function(data){
    	        	console.log(data);
    	        });
    		}
    		
    	}
    }

    // 返回
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go("app.basic.scheduleJob.list");
        }
    }
    
	
});
