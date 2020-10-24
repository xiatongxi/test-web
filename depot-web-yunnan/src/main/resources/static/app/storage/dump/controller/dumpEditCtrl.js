
angular.module('app.storage')
.controller("dumpEditCtrl", function($scope, $rootScope, $state, $filter, $stateParams, $uibModal,
		dumpService, warehouseService, enumService, APP_CONFIG) {

	// 货位列表
	$scope.loadWare = function(houseId) {
		warehouseService.getStorehouse($rootScope.orgInfo.orgId, houseId, "0").then(function(data){
			$scope.warelist = data.wareList;  //下拉列表数据
			$scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
		},function (data) {
			console.log(data);
		});
	}
	$scope.loadWare(null);

	$scope.addedDetail = [];

	// 初始化页面数据
	$scope.edit = function() {
		dumpService.edit($stateParams.id).then(function(data){
			$scope.dump = data;
			$scope.dump.businessCreateTime = $filter('date')($scope.dump.businessCreateTime, "yyyy-MM-dd");
			if ($stateParams.id != 0) {
				$scope.addedDetailResult = [];
				$scope.addedDetail.push(angular.copy(data));
			}

			// 树形下拉框(粮食性质)
			var deviceTypeId = 1032;
			enumService.getTreeListByTypeId($scope.dump.xLsxz, deviceTypeId).then(function(data) {
				var data_new = $scope.data_add(data);
				$scope.grainAttributeTreeData = data_new;
			},function(data) {
				console.log(data);
			});

		},function(data){
			console.log(data);
		});
		if ($stateParams.butType == 0) { //新增
			$scope.isNotEdit = false;
		} else if ($stateParams.butType == 1) {//查看
			$scope.isNotEdit = true;
		}
	}
	$scope.edit();

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

	// 点击转储明细旁边选择按钮时弹出模态窗
	$scope.addRow = function() {

		var params = [];

		var uibModalInstance = $uibModal.open({
			size:'lg',
			templateUrl: 'app/storage/dump/views/checkDataList.html',
			controller: 'checkDataModalCtrl',
			resolve: {
				// items是一个回调函数
				items: function () {
					// 这个值会被模态框的控制器获取到
					return params;
				}
			}
		});
		uibModalInstance.result.then(function(result) {
			if (result != null && result != undefined && result != '') {
				$scope.addedDetail = [];//避免出现数据累加
				angular.forEach(result , function (i) {
					$scope.addedDetail.push(angular.copy(i));
		        });
			}
		}, function (reason) {
			console.log(reason);
		});
	}

	/* 查看验收信息 */
	$scope.checkTestMessage = function(id) {
		var params = [];
		params.id = id;
		params.isNotEdit = true;
		var uibModalInstance = $uibModal.open({
			size:'lg',
			templateUrl: 'app/storage/dump/views/qualityData.html', //页面跟验收菜单的页面一模一样，出问题了copy那边的
			controller: 'qualityDataCtrl',
			resolve: {
				// items是一个回调函数
				items: function () {
					// 这个值会被模态框的控制器获取到
					return params;
				}
			}
		});
		uibModalInstance.result.then(function(result) {
			if (result != null && result != undefined && result != '') {
				$scope.addedDetail = [];//避免出现数据累加
				angular.forEach(result , function (i) {
					$scope.addedDetail.push(angular.copy(i));
		        });
			}
		}, function (reason) {
			console.log(reason);
		});
		//$state.go('app.storage.qualitycheck.ack.ackedit',{id:id,isNotEdit:true});
	}

	/* 提交表单 */
	$scope.save = function() {
		var validator = $("#dump-form").validate();
		//变动后性质必选的验证
        $scope.grainAttribute = angular.fromJson($scope.dump.xLsxz);
        if ($scope.grainAttribute == '' || $scope.grainAttribute == null || $scope.grainAttribute[0].id == null || $scope.grainAttribute.length == 0) {
            $("#grainAttribute-error").text("必须填写");
            return;
        } else {
            $("#grainAttribute-error").text("");
        }
        if ($scope.addedDetail.length == 0) {
        	alert("请选择至少一条转储明细信息！");
        	return;
        }
        
		if (validator.form()) {
			if ($scope.addedDetail.length > 0) {
				if($scope.dump.xLsxz != undefined && $scope.dump.xLsxz != ""){
					$scope.dump.xLsxz = $scope.dump.xLsxz[0].id;
				}
				$scope.dumpJson = [];
				for (var i = 0; i < $scope.addedDetail.length; i++) {
					$scope.addedDetail[i].orgId = $rootScope.orgInfo.orgId;//单位ID
					$scope.addedDetail[i].createPerson = $rootScope.userInfo.realName;//创建人
					$scope.addedDetail[i].xLsxz = $scope.dump.xLsxz;//变动后性质
					$scope.addedDetail[i].businessCreateTime = $scope.dump.businessCreateTime;
					$scope.addedDetail[i].transferQuantity = $scope.addedDetail[i].clsl;
					$scope.addedDetail[i].approvalNo = $scope.addedDetail[i].ysdh;
					//判断数据里面的粮食性质跟变动后的粮食性质是否一样，一样的数据不许提交
					if ($scope.addedDetail[i].xLsxz == $scope.addedDetail[i].yLsxz) {
						alert("第"+(i+1)+"条数据的原粮油性质跟变动后性质相同，请重新选择！");
						return;
					}
					//删除掉多余的和没用的属性
					if ("undefined" == $scope.addedDetail[i].clsl || "null" == $scope.addedDetail[i].clsl) {
						delete $scope.addedDetail[i].clsl;
					}
					delete $scope.addedDetail[i].houseName;
					delete $scope.addedDetail[i].wareName;
					delete $scope.addedDetail[i].checked;
					delete $scope.addedDetail[i].ysdh;
				}
				dumpService.save($scope.addedDetail, $rootScope.crk_webserviceip).then(function(data){
					if (data.status == 'success') { 
						alert("保存成功！");
					} else {
						alert(data.msg);
					}
					$scope.retrunTop();
				},function(data){
					console.log(data);
				});
			}
		}
	}

	//取消按钮
    $scope.retrunTop = function() {
    	if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go('app.storage.dumpList');
        }
    }

})