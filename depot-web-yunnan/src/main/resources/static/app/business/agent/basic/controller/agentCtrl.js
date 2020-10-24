"use strict";

angular.module('app.business')
    .controller("agentCtrl", function($scope, $rootScope, $http, $state, agentService, FileUploader, APP_CONFIG) {
        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.loadData = function() {
            agentService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.agentName, $rootScope.orgInfo.orgId)
            .then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log();
            });
        };
        $scope.loadData();

        // 新增或者修改用户信息
        $scope.showEdit = function(id,type) {
            if(id != null) {
                $state.go('app.business.agent.basic.agentEdit',{id:id,type:type});
            }else{
                $state.go('app.business.agent.basic.agentEdit');
            }
        };

        // 根据id删除信息
        $scope.remove = function(id) {
            agentService.removeById(id).then(function (data) {
                if(data.status == "success"){
                    alert("删除成功");
                    $scope.loadData();
                }else{
                    alert("删除失败");
                }
            });
        };
        // 翻页
        $scope.goPage = function(pageNum) {
            if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
                $scope.pageInfo.pageNum = pageNum;
                $scope.loadData();
            }
        };

        // 文件上传实例
        $scope.uploader = new FileUploader({
            url : APP_CONFIG.agentUrl + '/agent/importFile',
            autoUpload : true, // 将文件添加到队列后自动上传
            formData : [{fileType:'xlsx',orgId:$rootScope.orgInfo.orgId}], // 与文件一起发送的数据
            removeAfterUpload : true, // 从队列上传后删除文件
            // 上传进度
            onProgressItem : function(fileItem, progress) {
                // $scope.jd = progress + "%";
                console.info("正在上传：" + progress + "%");
            },
            // 回调函数，在一个文件上传成功后触发
            onSuccessItem : function(fileItem, response, status, headers) {
                if(fileItem.isSuccess && response.errormsg == ''){
                    alert("导入成功！");
                } else {
                    alert(response.errormsg);
                }
                $scope.loadData();
            }
        });
    })
    .controller("agentSaveCtrl", function($scope, $http, $state, $stateParams, $rootScope, FileUploader, agentService, APP_CONFIG) {
        $scope.disabled = false;
        $scope.isShow = "1";
        var ids;
        $scope.loadDataById = function(id) {
            ids = id;
            agentService.getAgentDite(id).then(function(data){
                $scope.agentEdit = data;
                $scope.agentEdit.orgId = $scope.agentEdit.orgId*1;
                $("#agent-form input").attr("disabled",$scope.disabled );
                $("#agent-form select").attr("disabled",$scope.disabled );
            },function(data){
                console.log();
            });

            $scope.getFileList();
        };

        $scope.getFileList = function() {
            agentService.getFileList(ids,"agent").then(function(data){
                $scope.fileList = data;
            },function(data){
                console.log();
            });
        };

        if($stateParams.id != null && $stateParams.type == "edit"){//新增页面，不进行操作；//修改页面查询后台数据，并且赋值页面
            $scope.loadDataById($stateParams.id);
        }else if($stateParams.type == "detail"){//详情页面
            $scope.loadDataById($stateParams.id);
            $scope.disabled = true;
            $scope.isShow = "0";
        }

        $scope.getEmptying = function () {
            $scope.agentEdit = {};
            $state.go('app.business.agent.basic.agentList');
        };

        // 新增或修改保存数据
        var validator = $("#agent-form").validate();
        $scope.saveData = function() {
            if (validator.form()) {
                var dates = angular.toJson($scope.agentEdit);
                agentService.saveAndUpdata(dates).then(function (data) {
                    if (data.status == "success") {
                        agentService.getUpdateFile($scope.fileIds,data.agentId,"agent");
                        alert("保存成功");
                        $state.go('app.business.agent.basic.agentList');
                    } else {
                        alert("保存失败");
                    }
                });
            }
        };

        $scope.retList = function(){
            $rootScope.back();
        };

        // -----------------------------------------------   上传下载相关     开始------------------------------------------------
        var bid = null;
        // 添加一行，取最大值加1放入数组
        $scope.linenumber = 0;
        $scope.linenumbers = [0];

        // 新增一行
        $scope.addFile = function() {
            if ($scope.linenumbers.length == 0 ) {
                $scope.linenumbers.push(0);
            } else {
                var maxlinenumber = Math.max.apply(null, $scope.linenumbers);
                $scope.linenumbers.push(maxlinenumber + 1);
            }
        };

        // 文件上传实例
        $scope.fileIds = [];

        // 以linenumber为key,以新增的附件对应为value.
        $scope.fileMap = new Map();

        // 上传.
        $scope.uploader = new FileUploader({
            url : APP_CONFIG.basicUrl + '/fileUpload/updateFileBusiness',
            autoUpload : true, // 将文件添加到队列后自动上传.
            formData : [{type : 'agent',userId:$rootScope.userInfo.userId,orgId:$rootScope.userInfo.orgId}], // 与文件一起发送的数据
            removeAfterUpload : true, // 从队列上传后删除文件
            // 上传进度
            onProgressItem : function(fileItem, progress) {
                // console.info("正在上传：" + progress + "%");
            },
            // 回调函数，在一个文件上传成功后触发
            onSuccessItem : function(fileItem, response, status, headers) {
                // 将新fileId加入到fileIds.
                $scope.fileIds.push(response.id);
                // 如果已经存在对应的fileId，先从$scope.fileIds中移除，再添加.
                if ($scope.fileMap.has($scope.linenumber)) {
                    // 原fileId.
                    var fileId = $scope.fileMap.get($scope.linenumber).id;
                    // 从$scope.fileIds中移除原fileId.
                    var index = $scope.fileIds.indexOf(fileId);
                    if (index != -1) {
                        // 后台删除.
                        $scope.deleteFileByFileId(fileId);
                    }
                }

                $scope.fileMap.set($scope.linenumber, response);

            }
        });

        // 点击文件框
        $scope.clickInput = function(index) {
            $scope.linenumber = index;
            document.activeElement.previousSibling.children[0].click();
        }

        // 点击浏览按钮.
        $scope.clickFileInput = function(index) {
            $scope.linenumber = index;
        }



        // 下载文件
        $scope.download = function(filePath, originalFileName) {
            $("#filePath").val(filePath);
            $("#type").val("business");
            $("#originalFileName").val(originalFileName);
            $("#download-form").attr("action", APP_CONFIG.basicUrl + '/download');
            $("#download-form").submit();
        }

        // 文件上传实例
        $scope.deleteFileIds = [];

        // 正常删除.
        $scope.deleteFileByLinenumber = function(linenumber) {
            var index = $scope.linenumbers.indexOf(linenumber);
            if (index != -1) {
                // 从linenumbers移除.
                $scope.linenumbers.splice(index, 1);

                if ($scope.fileMap.has($scope.linenumber)) {
                    // 以linenumber为key从$scope.fileMap获取fileId.
                    var fileId = $scope.fileMap.get($scope.linenumber).id;

                    // 后台删除数据和文件.
                    $scope.deleteFileByFileId(fileId, index);

                    // 从$scope.fileMap移除.
                    $scope.fileMap.delete(linenumber);

                    alert("删除成功！");
                }
            }
        }

        $scope.deleteFileByFileId = function(fileId) {
            $http({
                method: 'POST',
                url: APP_CONFIG.basicUrl + '/depot/basic/file/remove',
                data: {
                    id : fileId
                }
            }).then(function successCallback(response) {
                if ( response.data.status == "success") {
                    // 删除成功.
                    var index = $scope.fileIds.indexOf(fileId);
                    if (index != -1) {
                        // 从$scope.fileIds中移除.
                        $scope.fileIds.splice(index, 1);
                    }

                    $scope.getFileList();

                    alert("删除成功！");
                }

            }, function errorCallback(response) {
            });
        }

        // -----------------------------------------------   上传下载相关     结束           ------------------------------------------------
    });