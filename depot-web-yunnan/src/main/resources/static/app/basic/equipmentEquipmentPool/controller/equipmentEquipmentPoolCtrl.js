angular.module('app.basic')
	.controller("equipmentEquipmentPoolCtrl", function($scope, $rootScope, equipmentEquipmentPoolService, permissions, FileUploader, $uibModal, APP_CONFIG) {
/*
    // 获取数据字典大类列表数据
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.loadData = function() {
    	equipmentEquipmentPoolService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.pools).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
    $scope.loadData();*/
    
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.loadData = function() {
    	equipmentEquipmentPoolService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.pools).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    }
    $scope.loadData();
    // 新增或者修改数据字典信息跳转到录入页面
    $scope.edit = function(id, butType) {

        var uibModalInstance = $uibModal.open({
            size:'md',
            templateUrl: 'app/basic/equipmentEquipmentPool/views/equipmentEquipmentPool-edit.html',
            controller: 'equipmentEquipmentPoolCtrlEdit',
            resolve: {
           	   id : id,
           	   butType : function(){return butType;}
            }
        });
		 uibModalInstance.result.then(function (result) {
		 	$scope.loadData();	// 关闭模态框时刷新页面数据
	     }, function (reason) {
	         console.log(reason);
	     });
    }

    // 删除一条记录
    $scope.remove = function(id) {
        if (!confirm("确定要删除吗？")) {
            return;
        }

        equipmentEquipmentPoolService.remove(id).then(function(data){
        	if (data.status == 'success') {
                // 重新加载数据
        		$scope.loadData();
            } else {
                alert("删除失败！");
            }
        },function(data){
            console.log(data);
        });
    }

    $scope.loadData();

    // 文件上传实例
    $scope.uploader = new FileUploader({
        url : APP_CONFIG.deviceUrl + '/BasicEquipmentEquipmentPool/importFile',
        autoUpload : true, // 将文件添加到队列后自动上传
        formData : [{fileType:'xlsx', orgId:$rootScope.orgInfo.orgId}], // 与文件一起发送的数据
        removeAfterUpload : true, // 从队列上传后删除文件
        // 上传进度
        onProgressItem : function(fileItem, progress) {
            // $scope.jd = progress + "%";
            console.info("正在上传：" + progress + "%");
        },
        // 回调函数，在一个文件上传成功后触发
        onSuccessItem : function(fileItem, response, status, headers) {
            if(fileItem.isSuccess && response == ''){
            	alert("导入成功！");
            } else {
            	alert(response);
            }
            $scope.loadData();
        }
    });
    
    // 翻页
 	$scope.goPage = function(pageNum) {
 		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
      		$scope.pageInfo.pageNum = pageNum;
      		$scope.loadData();
      	}
 	}

})
.controller("equipmentEquipmentPoolCtrlEdit", function($scope, $rootScope, equipmentEquipmentPoolService, id, butType, $uibModalInstance, APP_CONFIG) {

	$scope.edit = function() {
    	equipmentEquipmentPoolService.edit(id).then(function(data){
            $scope.pool = data;
            if (butType == 2) {
            	$scope.isNotEdit = true;
            }
        },function(data){
            console.log(data);
        });
    }
	
	$scope.edit();

    //提交
    $scope.save = function() {
    	var validator = $("#pool-form").validate();
    	if (validator.form()) {
	    	equipmentEquipmentPoolService.save($scope.pool, $rootScope.orgInfo.orgId, $rootScope.userInfo.userId).then(function(data){
	    		if (data.status == 'success') {
	    			alert(data.msg);
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
