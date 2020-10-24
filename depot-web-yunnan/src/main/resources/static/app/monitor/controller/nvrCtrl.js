"use strict";

angular.module('app.nvr')
    .controller("nvrCtrl", function($scope, $rootScope,$state,alertService, $http, FileUploader, nvrService, enumService, APP_CONFIG) {
        // 获取列表数据
        $scope.loadData = function() {
            enumService.enumData().then(function(data){
                $scope.parentObj = data.parentMap;
                $scope.enumObj = data.enumMap;

                nvrService.getPageInfo(1, 10,$scope.nvr).then(function(data){
                    $scope.pageInfo = data;
                },function(data){
                   // console.log(data);
                });
            },function(data){
                // console.log(data);
            });
        }
        $scope.loadData();

    // 分页相关方法.
    $scope.go_page = function(type, pageNum, pigeSize, pages) {
        var pageNumC = pageNum;
        if (type == 'previousPage') {
            if (pageNum <= 1) {
                return;
            }
            pageNumC = pageNum - 1
        } else if (type == 'nextPage') {
            if (pageNum >= pages) {
                return;
            }
            pageNumC = pageNum + 1
        } else if (type == 'firstPage') {
            if (pageNum == 1) {
                return;
            }
            pageNumC = 1;
        } else if (type == 'lastPage') {
            if (pageNum == pages) {
                return;
            }
            pageNumC = pages;
        }
        $scope.loadData = function() {
            nvrService.getPageInfo(pageNumC, pigeSize).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                //console.log(data);
            });
        }
        $scope.loadData();
    }

    // 改变页码.
    $scope.change_pageSize = function(pigeSizeChange) {
        $scope.loadData = function() {
            nvrService.getPageInfo(1, pigeSizeChange).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                //console.log(data);
            });
        }
        $scope.loadData();
    }

        // 新增页面
        $scope.showAdd = function() {
            // $state.go('app.nvr.edit', {id:0});
            $state.go('app.basic.nvrAdd', {id:0,type:'add'});
        }

        // 编辑页面
        $scope.showEdit = function(id,type) {
            // $state.go('app.nvr.edit', {id:id});
            $state.go('app.basic.nvrEdit', {id:id,type:type});
        }

        // 根据id删除信息
        $scope.remove = function(id) {
            nvrService.removeById(id).then(function (data) {
                if(data.msg == "success"){
                    alert("操作成功");
                    $scope.loadData();
                }else{
                    alert("操作失败");
                }
            });
        }

        //通道号更新（弹窗显示）
        $scope.throughEdit = function (nvrId,nvrIp,nvrUsername,nvrPassword,nvrPort,nvrType,FileUploader) {
        $scope.nvrDate = {nvrId : nvrId, nvrIp : nvrIp, nvrUsername : nvrUsername, nvrPassword : nvrPassword, nvrPort : nvrPort, nvrType:nvrType};
            if(nvrIp!=null&&nvrIp!=""&nvrUsername!=null&&nvrUsername!=""&nvrPassword!=null&&nvrPassword!=""){
                nvrService.throughEdit(nvrId).then(function (data){
                    // 请求成功执行代码
                    $scope.throughList = data;
                    $("#myModal").modal("show");
                })
            }else{
                alert("NVR信息不全，不能更新通道号！");
            }
        };

        //修改相关的nvr通道号数据
        $scope.updateChannelNumber = function () {
            nvrService.updateChannelNumber($scope.nvrDate.nvrId,$scope.nvrDate.nvrIp,$scope.nvrDate.nvrUsername,$scope.nvrDate.nvrPassword,
                $scope.nvrDate.nvrPort,$scope.nvrDate.nvrType).then(function (data){
                if(data.msg == "success"){
                    // 请求成功执行代码
                    nvrService.throughEdit($scope.nvrDate.nvrId).then(function (data){
                        // 请求成功执行代码
                        $scope.throughList = data;
                        $("#myModal").modal("hide");
                        alert("更新成功！");
                        // $state.go('app.nvr.list');
                    })
                }else{
                    alert("操作失败");
                }
            })
        }

        // 文件上传实例
        // $scope.jd = "0%";
        $scope.uploader = new FileUploader({
            url : APP_CONFIG.monitorUrl + '/nvr/importFile',
            autoUpload : true, // 将文件添加到队列后自动上传
            formData : [{fileType:'xlsx',orgid:$rootScope.orgInfo.orgId}], // 与文件一起发送的数据
            removeAfterUpload : true, // 从队列上传后删除文件
            // 上传进度
            onProgressItem : function(fileItem, progress) {
                // $scope.jd = progress + "%";
                console.info("正在上传：" + progress + "%");
            },
            // 回调函数，在一个文件上传成功后触发
            onSuccessItem : function(fileItem, response, status, headers) {
                if(fileItem.isSuccess && response == ''){
                    alert("导入成功");
                } else {
                	//alertService.showSuccess(response);
                	alert(response);
                }
                $scope.loadData();
            }
        });

    })
    //***************************************************************************************************************
    .controller("nvrSaveCtrl", function($scope,$filter,$rootScope,$http,$state,alertService,$stateParams, nvrService, enumService, APP_CONFIG) {
        $scope.isShow = "0";
        $scope.loadDataById = function(id) {
            enumService.enumData().then(function(data){
                $scope.parentObj = data.parentMap;
                $scope.enumObj = data.enumMap;

                nvrService.loadDataById(id).then(function(data){
                    $scope.nvr = data;
                    $scope.nvr.installTime = $filter("date")($scope.nvr.installTime,'yyyy-MM-dd');
                    var disabled = false;
                    if($stateParams.type == "detail"){
                        disabled = true;
                        $scope.isShow = "1";
                    }
                    $("#movieForm input").attr("disabled",disabled);
                    $("#movieForm select").attr("disabled",disabled);
                },function(data){
                    // console.log(data);
                });
            },function(data){
                // console.log(data);
            });
        }

        $scope.loadData = function(){
            enumService.enumData().then(function(data){
                $scope.parentObj = data.parentMap;
                $scope.enumObj = data.enumMap;
            },function(data){
                // console.log(data);
            });
        }

        if($stateParams.id != 0){//新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
            $scope.loadDataById($stateParams.id);
        }else{
            $scope.loadData();
        }

        var validator = $("#movieForm").validate();
        $scope.saveData = function () {
            if (validator.form()) {
                $http({
                    method: 'POST',
                    url: APP_CONFIG.monitorUrl + '/nvr/save',
                    data: {
                        nvrJson: angular.toJson($scope.nvr),
                        orgid : $rootScope.orgInfo.orgId
                    }
                }).then(function successCallback(response) {

                    if (response.data.status == "success") {
                        alertService.showSuccess("操作成功");
                        //location.href=APP_CONFIG.monitorUrl + '/#/nvr/list';
                        $state.go('app.nvr.list');
                    } else {
                        alertService.showError("操作失败");
                    }

                }, function errorCallback(response) {
                    // 请求失败执行代码
                });
            }
        }

        $scope.showList = function(){
            $rootScope.back();
        }
    });
