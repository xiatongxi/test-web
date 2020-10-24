"use strict";

angular.module('app.storage').controller("safeProduceNotifyCtrl", function($scope,safeProduceNotifyService,$state, $http,$rootScope, $stateParams, APP_CONFIG) {
    //安全生产通告列表
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.search = {fileName:""};
    $scope.loadData = function() {
        safeProduceNotifyService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.search.fileName)
            .then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    };

    $scope.loadData();

    // 翻页
    $scope.goPage = function(pageNum) {
        $scope.pageInfo.pageNum = pageNum;
        $scope.loadData();
    };

    // 显示增加页面
    $scope.showAddNotify=function () {
        $state.go('app.storage.safeproduce.notifyAdd', {id:0,isNotEdit:false,topRow:$rootScope.orgInfo.orgName+"通告:\n"});
    };
    //修改编辑页面
    $scope.showEditNotify = function (id) {
        $state.go('app.storage.safeproduce.notifyAdd', {id:id,isNotEdit:false});
    };
    // 查看页面
    $scope.showViewNotify = function(id) {
        $state.go('app.storage.safeproduce.notifyAdd', {id:id,isNotEdit:true});
    };

    // 根据id删除信息
    $scope.removeNotify = function(id) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        safeProduceNotifyService.removeById(id).then(function (data) {
            if(data.status == "success"){
                alert("删除成功");
                $scope.loadData();
            }else{
                alert("删除失败");
            }
        });
    }
    
})
    .controller("safeProduceNotifySaveCtrl", function($scope,$rootScope, $state,$http,$stateParams,$filter,safeProduceNotifyService) {
        $scope.safeProduceNotify={};
        //下面的判断用于查看页面只读状态
        if($stateParams.isNotEdit != null){
            if ($stateParams.isNotEdit == "false") { // 修改
                $scope.isNotEdit = false;
            } else if ($stateParams.isNotEdit == "true") { // 查看
                $scope.isNotEdit = true;
            }
        }else{
            $scope.isNotEdit = false;
        }

        if ($stateParams.topRow != null) {
            $scope.safeProduceNotify.notify=$stateParams.topRow;
        }

        $scope.loadDataById = function(id) {
            safeProduceNotifyService.edit(id).then(function(data){
                // console.log(data);
                if (id==0){
                    // 通告人
                    $scope.safeProduceNotify.operator = $rootScope.userInfo.realName;
                    // 通告来源
                    $scope.safeProduceNotify.source = $rootScope.orgInfo.orgName;
                    // 通告事件
                    $scope.safeProduceNotify.operationTime = $filter('date')(new Date(), "yyyy-MM-dd");
                }else{
                    $scope.safeProduceNotify = data;
                    $scope.safeProduceNotify.operationTime = $filter('date')($scope.safeProduceNotify.operationTime, "yyyy-MM-dd");
                }
            },function(data){
                // console.log(data);
            });
        };

        $scope.loadDataById($stateParams.id);

        // 提交表单
        var validator = $("#safeProduceNotify-form").validate();
        $scope.saveData = function () {
            if (validator.form()) {
                $scope.safeProduceNotify.orgId = $rootScope.orgInfo.orgId;
                safeProduceNotifyService.save($scope.safeProduceNotify)
                    .then(function(data){
                    if (data.status == 'success') {
                        alert("保存成功！");
                        //$scope.back();
                        $scope.backLayer();
                    } else {
                        alert("保存失败！");
                    }
                },function(data) {
                    console.log(data);
                });
            }
        }
        
        //返回
	    $scope.backLayer = function(){
	    	$state.go('app.storage.safeproduce.notifyList');
	    }

    });


