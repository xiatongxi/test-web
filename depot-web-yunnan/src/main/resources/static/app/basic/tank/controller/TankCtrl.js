angular.module('app.basic')
    .controller("tankCtrl", function($scope, $rootScope, $state,$stateParams, $http, FileUploader, $location,TankService,APP_CONFIG) {

        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.search = {storagetankName:""};

        $scope.loadData = function() {
            TankService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.search.storagetankName,$rootScope.orgInfo.orgId).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log(data);
            });
        }
        $scope.loadData();

        // 新增或修改跳转
        $scope.add = function(id, btnType) {
            $state.go('app.basic.tankEdit',{id:id,btnType:btnType});
        }

        // 删除一条记录
        $scope.remove = function(tank) {
            TankService.remove(tank.id,tank.delFlag).then(function(data){
                if (data.status == 'success') {
                    alert("操作成功！");
                    $scope.loadData();
                } else {
                    alert("操作失败！");
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

        // 文件上传实例
        $scope.uploader = new FileUploader({
            url : APP_CONFIG.basicUrl + '/Tank/importFile',
            autoUpload : true, // 将文件添加到队列后自动上传
            formData : [{fileType:'xlsx', userInfo : angular.toJson($rootScope.userInfo) ,orgCode :$rootScope.orgInfo.orgCode}], // 与文件一起发送的数据
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
    })


.controller("tankCtrlEdit", function($scope, $state, $rootScope, $http, $filter, $location, $stateParams, FileUploader, TankService) {
    // 修改油罐信息
    $scope.edit = function() {
        TankService.findByTank($stateParams.id).then(function(data){
            $scope.tank = data;
            $scope.tank.orgCode =$rootScope.orgInfo.orgCode;
            $scope.tank.createDate = $filter('date')($scope.tank.createDate, "yyyy-MM-dd");
            $scope.tank.builddate = $filter('date')($scope.tank.builddate, "yyyy-MM-dd");
            if ($stateParams.btnType == '1') {
                $scope.isNotEdit = true;
            }
        },function(data){
            console.log(data);
        });
    };

    $scope.tank = {};
    if($stateParams.id != '' && $stateParams.id != null && typeof $stateParams.id != undefined){
        $scope.edit();
    }else{
        $scope.tank.orgCode =$rootScope.orgInfo.orgCode;
    }

    // 油罐编码最多只能输入数字
    $scope.checkUp = function(key) {
    	var text;
    	var a;
    	var reg = /^\d$/g;
    	if (key == "ygbm") {
    		text = $scope.tank.storagetankCode;
    		if (text != null && text != "") {
    			a = text.substring(text.length - 1, text.length);
    			if (!reg.test(a)) {
    				$scope.tank.storagetankCode = text.replace(a, "");
    			}
    		}
    	}
    	
//    	var text = $scope.tank.storagetankCode;
//    	if (text != null && text != "") {
//    		var a = text.substring(text.length - 1, text.length);
//	    	var reg = /^\d$/g;
//	    	if (!reg.test(a)) {
//	    		$scope.tank.storagetankCode = text.replace(a, "");
//	    	}
//    	}
    }
    
    $.validator.addMethod("validThan0",function(value,element, params) {
    	if(value == 0){
    		return this.optional(element); 
    	}else{
    		return this.optional(element) || true;
    	}
    },"请输大于0的数！");

    // 提交表单
    var validator = $("#basicTank-form").validate();
    $scope.save = function() {
        if (validator.form()) {
            TankService.save($scope.tank, $rootScope.userInfo.orgId).then(function(data){
                if (data.status == 'success') {
                    alert("保存成功！");
                    $state.go("app.basic.tankList");
                } else {
                    alert(data.msg);
                }
            },function(data){
                console.log(data);
            });
        }
    };

    $scope.returnTop = function() {
        $state.go("app.basic.tankList");
    }

});