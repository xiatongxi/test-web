"use strict";

angular.module('app.storage')
.controller("overheadSetCtrl", function($scope, $rootScope, $state, $uibModal,
		enumService, overheadSetService, APP_CONFIG) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.loadData = function() {
    	overheadSetService.getPageInfoTOover($scope.pageInfo.pageNum, $scope.pageInfo.pageSize).then(function(data){
    		$scope.pageInfo = data;
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

	// 点击新增或者修改时弹出模态窗
	$scope.edit = function(id, btnType) {
		$scope.param = {id:id, btnType:btnType};
		var uibModalInstance = $uibModal.open({
	        size:'md',
	        templateUrl: 'app/storage/overhead/views/overheadSet-edit.html',
	        controller: 'overheadSetEditCtrl',
	        resolve: {
		        param : function() {
		        	return $scope.param;
		        }
	        }
		});
		uibModalInstance.result.then(function (result) {
		 	$scope.loadData();	// 关闭模态框时刷新页面数据
	    }, function (result) {
	         console.log(result);
	    });
	}

})
.controller("overheadSetEditCtrl", function($scope, $rootScope, $uibModalInstance, param, overheadSetService, enumService) {

	$scope.getBasicData = function() {
		var deviceTypeId = null;
    	// 树形下拉框(粮食性质)
    	deviceTypeId = 1032;
    	enumService.getTreeListByTypeId($scope.overheadSet.lsxz, deviceTypeId).then(function(data) {
    		var data_new = $scope.data_add(data);
    		$scope.grainAttributeTreeData = data_new;
    	},function(data) {
    		console.log(data);
    	});
	}

	$scope.data_add = function(data) {
		var e = [];
    	if (data.length != 0) {
    		//要插入的json对象串
    		var newObj = {"id":null,"name":"请选择","children":[]};
    		//将返回的json对象和要插入的json对象串转换为字符串格式
    		var f = angular.toJson(newObj);
    		var b = angular.toJson(data);
    		//把要插入的json对象串插入返回数据的最前面
    		var c = b.substring(0,1);
    		var d = b.substring(1,b.length);
    		e = c + f + "," + d;
    	}
    	//最后在转换为json对象返回去
    	return angular.fromJson(e);
	}

	// 初始化模态窗口数据
    $scope.edit = function() {
    	overheadSetService.edit(param.id).then(function(data){
            $scope.overheadSet = data;
            $scope.overheadSet.overheadPeriod = data.overheadPeriod;
            $scope.overheadSet.warningDay = data.warningDay;
            var deviceTypeId = 1032;
        	// 树形下拉框(粮食性质)
        	enumService.getTreeListByTypeId($scope.overheadSet.lsxz, deviceTypeId).then(function(data) {
        		var data_new = $scope.data_add(data);
        		$scope.grainAttributeTreeData = data_new;
        	},function(data) {
        		console.log(data);
        	});
            if (param.btnType == '1') {
                $scope.isNotEdit = true;
            }
        },function(datas){
        	console.log(datas);
        });

    }
    $scope.edit();

    // 提交表单
    $scope.save = function() {
    	var validator = $("#overheadSet-form").validate();
    	//粮油性质必选的验证
        $scope.grainAttribute = angular.fromJson($scope.overheadSet.lsxz);
        if ($scope.grainAttribute == '' || $scope.grainAttribute == null) {
            $("#grainAttribute-error").text("必须填写");
            return;
        } else {
            $("#grainAttribute-error").text("");
        }
    	if (validator.form()) {
    		if($scope.overheadSet.lsxz != undefined && $scope.overheadSet.lsxz != ""){
    			$scope.overheadSet.lsxz = $scope.overheadSet.lsxz[0].id;
       	 	}
    		$scope.overheadSet.orgId = $rootScope.orgInfo.orgId;
    		$scope.overheadSet.createname = $rootScope.userInfo.userId;
    		overheadSetService.save($scope.overheadSet).then(function(data){
	    		if (data.status == 'success') {
	    			alert("保存成功！");
	    		} else {
	                alert("保存失败！");
	            }
	    		$scope.cancel();
	        },function(data){
	            console.log(data);
	        });
    	}
    }

    // 关闭模态窗口
	$scope.cancel = function() {
		$uibModalInstance.close();
	}

});
