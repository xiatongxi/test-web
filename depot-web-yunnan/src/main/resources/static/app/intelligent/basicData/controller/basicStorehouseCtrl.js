angular.module('app.basic')
	.controller("basicStorehouseCtrl", function($scope, $rootScope, $state,$stateParams, $http, FileUploader, $location, basicStorehouseService, enumService, APP_CONFIG) {

     // 获取列表数据
	 $scope.pageInfo = {pageNum : 1, pageSize : 10};
	 $scope.store = {};

	//判断是否是代储点仓房信息
	if($stateParams.libraryType == '1'){
		var libraryType = $stateParams.libraryType;
	}else{
		var libraryType = '0';
	}

     $scope.loadData = function() {
         basicStorehouseService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.store, $rootScope.orgInfo.orgId, libraryType).then(function(data){
    		 $scope.pageInfo = data;
    	 },function(data){
    		 console.log(data);
    	 });

    	 //用于判断仓储业务中的仓房管理和基础数据中的仓房信息是否要操作按钮(仓储业务不需要按钮 只要查看)
        if($stateParams.type == 1){
            $scope.isShow = false;
		}else if ($stateParams.type == 2){
             $scope.isShow = true;
		}
     }
        $scope.loadData();

        // 清空搜索条件
        $scope.empty = function () {
            $scope.store.storehouseName = '';
            $scope.loadData();
        };

        // 新增或修改跳转
     $scope.add = function(id, btnType) {
    	 $state.go('app.intelligent.basicData.basicWareHouseSet.view',{id:id, btnType:btnType, orgId:$rootScope.orgInfo.orgId, libraryType:libraryType});
     }
     $scope.edit = function(id, btnType) {
    	 $state.go('app.intelligent.basicData.basicWareHouseSet.edit',{id:id, btnType:btnType, orgId:$rootScope.orgInfo.orgId, libraryType:libraryType});
     }

    // 删除一条记录
    $scope.showDelete = function(id) {
         if (!confirm("确定要删除吗？")) {
             return;
         }
        basicStorehouseService.remove(id).then(function(data){
      		 if (data.status == 'success') {
      			 alert("删除成功！");
      			 $scope.loadData();
      		 } else {
      			 alert("删除失败！");
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
        url : APP_CONFIG.basicUrl + '/Storehouse/importFile',
        autoUpload : true, // 将文件添加到队列后自动上传
        formData : [{fileType:'xlsx', userInfo : angular.toJson($rootScope.userInfo)}], // 与文件一起发送的数据
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
.controller("basicStorehouseCtrlEdit", function($scope, $state, $rootScope, $http, $filter, $location, $stateParams, FileUploader, basicStorehouseService, enumService, APP_CONFIG) {
	// 修改用户信息
    $scope.edit = function() {
        basicStorehouseService.findByStorehouse($stateParams.id, $stateParams.orgId).then(function(data){
            $scope.basicStorehouse = data;
            //判断如果是代储库新增则默认输入登陆用户库名。
            $scope.basicStorehouse.libraryType = $stateParams.libraryType;
            if($stateParams.libraryType != "1"){
                $scope.basicStorehouse.depotName = $rootScope.depotInfo.orgName;
                $scope.basicStorehouse.libraryType = "0";
                document.getElementsByName("depotName").readOnly = true;
            }
            $scope.basicStorehouse.usedate = $filter('date')($scope.basicStorehouse.usedate, "yyyy-MM-dd");
            if ($stateParams.btnType == '1') {
            	$scope.isNotEdit = true;
            }
        },function(data){
        	console.log(data);
        });

   }
    $scope.edit();
    
    // 提交表单
    var validator = $("#basicStorehouseView-form").validate();
    $scope.save = function() {
    	if (validator.form()) {
            basicStorehouseService.save($scope.basicStorehouse, $rootScope.userInfo).then(function(data){
    			if (data.status == 'success') {
    				alert("保存成功！");
    			} else {
    				alert("保存失败！");
    			}
    			$state.go("app.intelligent.basicData.basicWareHouseSet",{type:2,libraryType:$stateParams.libraryType});
    		},function(data){
    			console.log(data);
    		});
    	}
    };

    // 文件上传实例
    $scope.uploader = new FileUploader({
        url : APP_CONFIG.basicUrl + '/fileUpload/uploadFile',
        autoUpload : true, // 将文件添加到队列后自动上传
        formData : [{fileType:'image'}], // 与文件一起发送的数据
        removeAfterUpload : true, // 从队列上传后删除文件
        // 上传进度
        onProgressItem : function(fileItem, progress) {
            console.info("正在上传：" + progress + "%");
        },
        // 回调函数，在一个文件上传成功后触发
        onSuccessItem : function(fileItem, response, status, headers) {
            $scope.basicStorehouse.storeImg = response;
        }
    });

	$scope.returnTop = function() {
    	if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go("app.intelligent.basicData.basicWareHouseSet",{type:2,libraryType:$stateParams.libraryType});
        }
    };
    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^[1-9]\d*$/g; // 不为0的正整数
        return this.optional(element)||(checkNumber.test(value));
    },"请输入正确的不为0的数字整数！");

    //校验输入框只能输入数字和小数
    $scope.clearNoNum = function (obj, attr) {

        //先把非数字的都替换掉，除了数字和.
        obj[attr] = obj[attr].replace(/[^\d.]/g, "");
        //必须保证第一个为数字而不是.
        obj[attr] = obj[attr].replace(/^\./g, "");
        //保证只有出现一个.而没有多个.
        obj[attr] = obj[attr].replace(/\.{2,}/g, "");
        //保证.只出现一次，而不能出现两次以上
        obj[attr] = obj[attr].replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    };

    //校验仓房名称是否存在
    $scope.itExistName = function(vCfName){
        if (vCfName != undefined){
            basicStorehouseService.itExistName(vCfName).then(function (data) {
                if (data.data == true){
                    alert("仓房名称已存在！");
                    $scope.basicStorehouse.storehouseName = '';
                }
            },function(data){
            });
        }
    };
    //校验仓房编码是否存在
    $scope.itExistCode = function(vCfCode){
        if (vCfCode != undefined){
            basicStorehouseService.itExistCode(vCfCode).then(function (data) {
                if (data.data == true){
                    alert("仓房编码已存在！");
                    $scope.basicStorehouse.storehouseCode = '';
                }
            },function(data){
            });
        }
    };
});