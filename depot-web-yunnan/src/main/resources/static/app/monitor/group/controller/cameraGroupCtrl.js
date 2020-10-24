"use strict";

angular.module('app.cameraGroup')
    .controller("cameraGroupCtrl", function($scope, $http,alertService,cameraRecordService, $state,cameraGroupService, APP_CONFIG) {
        //获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.loadData = function () {
            cameraGroupService.initList($scope.pageInfo.pageNum, $scope.pageInfo.pageSize)
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

        //显示goup弹窗
        $scope.showEditGroup = function(groupid,groupname){
            $("#cameratab").show();
            $("#groupdModal").modal("show");

            if(groupid != undefined){
                $scope.group = {id : groupid, groupname : groupname};
                cameraGroupService.queryCameraForGroup(groupid).then(function(data){
                    $scope.groupcameralist = data;
                    for(var i = 0;i<$scope.groupcameralist.length;i++){
                        $scope.groupcameralist[i].isjr = $scope.groupcameralist[i].isjr == '1'?true:false;
                    }
                },function(data){
                    console.log(data);
                });
            }else{
                $scope.group = {id : undefined, groupname : undefined};
                cameraRecordService.getAllCamera().then(function (data){
                    $scope.groupcameralist = data;
                });
            }

            $scope.isRepeat();
        };
        
        $scope.back = function () {
            $("#groupdModal").modal("hide");
        };

        var isRepeat = 0;
        $scope.isRepeat = function () {
            isRepeat = 0;
            //循环查询是否有重复的分组名称
            for(var i = 0;i<$scope.pageInfo.list.length;i++){
                if($scope.group.id != $scope.pageInfo.list[i].id && $scope.group.groupname == $scope.pageInfo.list[i].groupname){
                    isRepeat = 1;
                    break;
                }
            }
            if (isRepeat == 1) {
                $("#groupName-error").text("分组名称重复，请修改后再提交！");
            } else {
                $("#groupName-error").text("");
            }
        };

        $scope.saveData = function () {
            if(isRepeat == 1 || $scope.group.groupname == ""){
                return;
            }
            var CameraId = "";
            var groupBox = $("input[type=checkbox][name=cameraBox]:checked").each(function (index,e) {
                CameraId += $(this).val()+",";
            });

            cameraGroupService.saveData(angular.toJson($scope.group),CameraId)
                .then(function (data) {
                    alertService.showSuccess("操作成功");
                    $("#groupdModal").modal("hide");
                    $scope.loadData();
                },function (data) {
                    console.log(data);
                })
        }

        $scope.removebyid = function (groupid) {
            if(confirm("确认删除当前分组？")){
                cameraGroupService.removebyid(groupid)
                    .then(function(data){
                        alertService.showSuccess("操作成功")
                        $scope.loadData();
                    },function(data){
                        console.log(data);
                    });
            }
        }
    })