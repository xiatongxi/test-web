"use strict";
angular.module('app.intelligent').controller("ammeterSettingCtrl", function($scope, $state, $rootScope,$stateParams,$uibModal,ammeterSettingService) {
    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};

    // 加载列表
    $scope.loadData = function() {
    	ammeterSettingService.getPageInfo($scope.pageInfo,$rootScope.orgInfo.orgId,$scope.vcfcode,$scope.vHhtype).then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();

    // 编辑页面
    $scope.showEdit = function(id) {
        $state.go("app.intelligent.energyMonitor.ammeterSetting.edit", {id: id,type: "edit"});
    };
    // 查看页面
    $scope.showView = function(id) {
        $state.go("app.intelligent.energyMonitor.ammeterSetting.edit", {id: id,type: "view"});
    };

    // 删除一条记录.
    $scope.showDelete = function(ammeter) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        ammeterSettingService.remove(ammeter).then(function(data) {
            if (data.retCode == '200') {
                alert("删除成功！");
                $scope.loadData();
            } else {
                alert(data.message);
            }
        });
    };

    // 清空搜索条件
    $scope.empty = function () {
        $scope.vcfcode = '';
        $scope.vHhtype = '';
        $scope.loadData();
    };

    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

    // 数据同步
    $scope.synchronization = function() {
        var orgId = $rootScope.depotInfo.orgId;
        ammeterSettingService.synchronizationAll(orgId).then(function(data){
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
}).controller("ammeterSettingEditCtrl", function($scope, $state, $rootScope, $stateParams, APP_CONFIG, ammeterSettingService) {
        // 防止重复提交标记
        $scope.saveFlag = false;
        $scope.isNotEdit = false;

        // 加载数据.
        $scope.loadDataById = function(id) {
        	ammeterSettingService.loadDataById(id).then(function(data){
                $scope.energyInfo = data.data;
                $scope.energyInfo.vHhtype = Number($scope.energyInfo.vHhtype);
            },function(data){
            	console.log(data);
            });
        };
        
        if ($stateParams.type == 'add') { // 新增
            $scope.isAdd = true;
        } else if ($stateParams.type == 'edit') { // 修改
            $scope.isAdd = false;
            $scope.loadDataById($stateParams.id);
        } else if ($stateParams.type == 'view'){
        	$scope.loadDataById($stateParams.id);
        	$scope.isNotEdit = true;
            $scope.isAdd = false; // 查看
        }
        
        //验证编码是否重复 编码:ng-blur="validCode()"
        /*$scope.validCode = function(){
        	if($scope.energyInfo.vNhCode != null && $scope.energyInfo.vNhCode != ""){
        		var regex = /^[0-9]+$/;
        		if (!regex.test($scope.energyInfo.vNhCode)){
        			$scope.energyInfo.vNhCode = "";
        			alert("只能使用0-9组合");
        		}else{
        			ammeterSettingService.validCode($stateParams.id,$scope.energyInfo.vNhCode).then(function(data){
        				if(data.data.id != null && data.data.id != ""){
        					$scope.energyInfo.vNhCode = "";
        					alert("编码重复了！");
        				}
        			},function(data){
        				console.log(data);
        			});
        		}
        		
        	}
        }*/

        // 校验
        var validator = $("#energyInfo-form").validate();

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


        // 保存
        $scope.save = function () {
            if (!$scope.saveFlag) {
                if (validator.form()) {
                    $scope.saveFlag = true;
                    // 创建更新人
                    $scope.energyInfo.vUpdatePerson = $rootScope.userInfo.userId;
                    $scope.energyInfo.orgId = $rootScope.orgInfo.orgId;
                    // 提交
                    ammeterSettingService.save($scope.energyInfo).then(function(data){
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
                $state.go("app.intelligent.energyMonitor.ammeterSetting");
            }
        };
    });