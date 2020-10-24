"use strict";
angular.module('app.storage').controller("safeproduceCtrl", function ($scope, $uibModal, $stateParams, FileUploader, safeproduceService, APP_CONFIG) {
    // 获取列表数据
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    $scope.search = {fileName: ""};
    $scope.loadData = function () {
        safeproduceService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $stateParams.type, $scope.search.fileName)
            .then(function (data) {
                $scope.pageInfo = data;
                if ("publish" == $stateParams.layerType) {//从前台跳转文档上传页面的时候直接打开上传页面
                    $scope.showAddmsm();
                    $stateParams.layerType = "";//防止刷新列表继续弹出
                }
            }, function (data) {
                console.log(data);
            });
    };
    $scope.loadData();
    $scope.type = $stateParams.type;

    // 转向上传页面
    $scope.showAddmsm = function (id) {
        var uibModalInstance = $uibModal.open({
            size: 'md',
            templateUrl: 'app/storage/views/safeproduce/safeproduce-edit.html',
            controller: 'safeproduceSaveCtrl',
            resolve: {
                id: id,
                type: function () {
                    return $scope.type;
                }
            }
        });
        uibModalInstance.result.then(function (result) {
            $scope.loadData();	// 关闭模态框时刷新页面数据
        }, function (reason) {
            console.log(reason);
        });
    };

    // 预览
    $scope.preview = function (id) {
        var uibModalInstance = $uibModal.open({
            size: 'md',
            templateUrl: 'app/storage/views/safeproduce/safeproduce-view.html',
            controller: 'safeproduceSaveCtrl',
            resolve: {
                id: id,
                type: function () {
                    return $stateParams.type;
                }
            }
        });
    };

    // 删除数据
    $scope.delete = function (id, fileUrl) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        safeproduceService.delete(id, fileUrl).then(function (data) {
            if (data.status === 'success') {
                alert('删除成功!');
                $scope.loadData();
                return;
            }
            alert('删除失败!');
        }, function (data) {
            console.log(data);
        });
    };

    // 翻页
    $scope.goPage = function (pageNum) {
        $scope.pageInfo.pageNum = pageNum;
        $scope.loadData();
    };

    // 下载文件
    $scope.download = function (safeproduce) {
        $("#fileName").val(safeproduce.fileName);
        $("#filePaths").val(safeproduce.fileUrl);
        $("#download-form").attr("action", APP_CONFIG.safeProduceUrl + '/downLoadZipFile');
        $("#download-form").submit();
    }

})

.controller("safeproduceSaveCtrl", function ($scope, $rootScope, $uibModalInstance, id, type, FileUploader, safeproduceService, APP_CONFIG) {
    // 获取数据
    $scope.downloadFiles = [];
    safeproduceService.edit(id).then(function (data) {
        $scope.safeProduce = data;
        if (id) {
            var filePaths = $scope.safeProduce.fileUrl.split(";");
            angular.forEach(filePaths, function (filePath, index) {
                $scope.downloadFiles.push({
                    fileName: filePath.substring(filePath.lastIndexOf("\/") + 1),
                    filePath: filePath
                });
            })
        } else {
            $scope.safeProduce.type = type;
        }
    }, function (data) {
        console.log(data);
    });

    // 保存数据
    $scope.save = function () {
        // $scope.addFile();
        // 拼接文件路径
        var urls = new Array();
        $scope.fileUrls.forEach(function(value,key){
            urls.push(value);
        });
        $scope.safeProduce.fileUrl = urls.join(";");
        // 操作人
        $scope.safeProduce.operator = $rootScope.userInfo.realName;
        //来源
        $scope.safeProduce.source = $rootScope.orgInfo.orgName;
        // 组织机构编码
        $scope.safeProduce.orgId = $rootScope.orgInfo.orgId;
        if (null != $scope.safeProduce.fileName) {
            if ($scope.safeProduce.fileUrl.length > 0) {
                if ($scope.safeProduce.remarks) {
                    safeproduceService.save($scope.safeProduce).then(function (data) {
                        if (data.status == 'success') {
                            alert("提交成功！");
                            $scope.cancel();
                        } else {
                            alert("提交失败！");
                        }
                    }, function (data) {
                        console.log(data);
                    });
                } else {
                    alert('请填写备注信息!');
                }
            } else {
                alert('请选择上传文件!');
            }
        } else {
            alert('文件名称不能为空!');
        }
    };

    // 关闭弹出层
    $scope.cancel = function () {
        $uibModalInstance.close();
    };

    // 添加一行，取最大值加1放入数组
    $scope.linenumber = 0;
    $scope.linenumbers = [0];
    $scope.addFile = function () {
        if ($scope.fileItem === undefined || $scope.fileItem === null) {
            alert("请先添加文件,在添加浏览框.");
            return;
        }
        var maxlinenumber = Math.max.apply(null, $scope.linenumbers);
        $scope.linenumbers.push(maxlinenumber + 1);
        $scope.fileItem = null;
    };

    // 文件上传实例
    // $scope.fileUrls = new Array();
    $scope.fileUrls = new Map();
    $scope.uploader = new FileUploader({
        url: APP_CONFIG.safeProduceUrl + '/fileUpload/uploadFile',
        autoUpload: true, // 将文件添加到队列后自动上传
        formData: [{fileType: 'safeProduceFile'}], // 与文件一起发送的数据
        removeAfterUpload: true, // 从队列上传后删除文件
        // 上传进度
        onProgressItem: function (fileItem, progress) {
            $scope.addFileSign = true;
            $scope.fileItem = fileItem;
            if (progress === 100) {
                $scope.addFileSign = false;
            }
        },
        // 回调函数，在一个文件上传成功后触发
        onSuccessItem: function (fileItem, response, status, headers) {
            // 自动删除单个上传后修改的文件
            if($scope.fileUrls.has($scope.linenumber)){
                console.log($scope.fileUrls.get($scope.linenumber));
                safeproduceService.deleteOnlyFile($scope.fileUrls.get($scope.linenumber));
            }
            $scope.fileUrls.set($scope.linenumber, response);
        }
    });

    // 点击文件框
    $scope.clickInput = function (index) {
        $scope.linenumber = index;
        document.activeElement.previousSibling.children[0].click();
    };

    // 下载文件
    $scope.download = function (filePath) {
        $("#filePath").val(filePath);
        $("#download-form").attr("action", APP_CONFIG.safeProduceUrl + '/download');
        $("#download-form").submit();
    }

});