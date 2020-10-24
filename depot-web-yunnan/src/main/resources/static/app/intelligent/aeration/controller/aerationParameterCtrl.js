"use strict";

angular.module('app.intelligent')
.controller("aerationParameterCtrl", function($scope, $rootScope, $state, $http, $stateParams, 
		enumService, aerationParameterService, APP_CONFIG) {

	
	//通风记录列表数据查询
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
	$scope.aerationParameter = {vcfcode : ""};
    $scope.loadData = function() {

    	aerationParameterService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.aerationParameter).then(function(data){
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


    
    // 新增页面
    $scope.showAdd = function() {
        $state.go("app.intelligent.aeration.control.aerationParameter-add", {id: '0'});
    };
    // 编辑页面
    $scope.showEdit = function(id) {
        $state.go("app.intelligent.aeration.control.aerationParameter-edit", {id: id});
    };
    // 查看页面
    $scope.showView = function(id) {
        $state.go("app.intelligent.aeration.control.aerationParameter-view", {id: id});
    };
    
   // 删除一条记录.
    $scope.remove = function(aerationParameter) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        aerationParameterService.remove(aerationParameter).then(function(data) {
            if (data.retCode == '200') {
                alert("删除成功！");
                $scope.loadData();
            } else {
                alert(data.message);
            }
        });
    };

    // 数据同步
    $scope.synchronization = function() {
        var orgId = $rootScope.depotInfo.orgId;
        aerationParameterService.synchronizationAll(orgId).then(function(data){
            if (data.retCode == '200') {
                alert("数据同步成功！");
                $scope.loadData();
            } else {
                alert(data.message);
            }
        },function(data){
            // console.log(data);
        });
    };
})

.controller("aerationParameterEditCtrl", function($scope, $filter,$state, $rootScope, $stateParams, APP_CONFIG, aerationParameterService) {
    // 防止重复提交标记
    $scope.saveFlag = false;
    $scope.isNotEdit = false;
    if ($scope.aerationParameter == null) {
        $scope.aerationParameter = {};
    }

    // 加载数据.
    $scope.loadDataById = function(id) {
    	aerationParameterService.loadDataById(id).then(function(data){
            $scope.aerationParameter = data.data;
            $scope.aerationParameter.vdevkindcode=parseInt(data.data.vdevkindcode);
        },function(data){
        });
    };
    if ($stateParams.id != '0') { // 查看,修改
        $scope.isNotEdit = $stateParams.isNotEdit;
        $scope.isAdd = false;
        $scope.loadDataById($stateParams.id);
    } else {
        $scope.isAdd = true; // 新增
        $scope.aerationParameter.valarmstatue = "0";
        $scope.aerationParameter.vstatue = "0";
        
        
    }

    // 校验
    var validator = $("#aerationParameterView-form").validate();

    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^[1-9]\d*$/g; // 不为0的正整数
        return this.optional(element)||(checkNumber.test(value));
    },"请输入正确的不为0的数字整数！");

    // 保存
    $scope.save = function () {
        if (!$scope.saveFlag) {
            if (validator.form()) {
                $scope.saveFlag = true;
                // 创建更新时间
                $scope.aerationParameter.updatetime = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
                // 提交
                aerationParameterService.save($scope.aerationParameter).then(function(data){
                    if (data.message == 'success' && data.retCode == '200') {
                        alert('保存成功!');
                        $scope.retList();
                    } else {
                        alert("保存失败！");
                        $scope.saveFlag = false;
                    }
                },function(data){
                    console.log(data);
                });
            }
        }
    };

    // 返回,取消
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
            $rootScope.back();
        } else {
            $state.go("app.intelligent.aeration.control.aerationParameter");
        }
    }

});
