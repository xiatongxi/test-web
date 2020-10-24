"use strict";

angular.module('app.business')
.controller("agentDepotCtrl", function($scope, $rootScope, $http, $state, agentDepotService, FileUploader, agentService, APP_CONFIG, $uibModal) {
    // 获取列表数据
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.loadData = function() {
        agentDepotService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.agentDepotName,"")
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
            $state.go('app.business.agent.basic.agentDepotEdit',{id:id,type:type});
        }else{
            $state.go('app.business.agent.basic.agentDepotEdit');
        }
    };

    //获取代储点名称
    $scope.getAgentData = function() {
        agentService.getQueryAgentList($rootScope.orgInfo.orgId).then(function(data){
            $scope.agentData = data;
        },function(data){
            console.log();
        });
    };
    $scope.getAgentData();

    // 根据id删除信息
    $scope.remove = function(id) {
        agentDepotService.removeById(id).then(function (data) {
            if(data.status == "success"){
                alert("删除成功");
                $scope.loadData();
            }else{
                alert("删除失败");
            }
        });
    };

    // 点击新增或者修改时弹出模态窗
    $scope.addAgentId = function(id) {
        var uibModalInstance = $uibModal.open({
            size:'md',
            templateUrl: 'app/business/agent/basic/views/agentDepot-addEdit.html',
            controller: 'addAgentId',
            resolve: {
                id : id
            }
        });
        uibModalInstance.result.then(function (result) {
            $scope.loadData();	// 关闭模态框时刷新页面数据
        }, function (reason) {
            console.log(reason);
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
        url : APP_CONFIG.agentUrl + '/agentDepot/importDepotFile',
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
.controller("agentSaveDepotCtrl", function($scope, $http, $state, $stateParams, $rootScope, FileUploader, agentDepotService, APP_CONFIG, agentService) {
    $scope.disabled = false;
    $scope.isShow = "1";
    var ids;
    $scope.loadDataById = function(id) {
        ids = id;
        agentDepotService.getAgentDite(id).then(function(data){
            $scope.agentDepotEdit = data;
            $scope.agentDepotEdit.orgId = $scope.agentDepotEdit.orgId*1;
            $scope.agentDepotEdit.agentId = $scope.agentDepotEdit.agentId*1;
            $("#agentDepot-form input").attr("disabled",$scope.disabled );
            $("#agentDepot-form select").attr("disabled",$scope.disabled );
        },function(data){
            console.log();
        });

        $scope.getFileList();
    };

    $scope.getFileList = function() {
        agentService.getFileList(ids,"agentDepot").then(function(data){
            $scope.fileList = data;
        },function(data){
            console.log();
        });
    };

    $scope.getAgentName = function () {
        //获取代储点名称
        $scope.pageInfo = {pageNum : 1, pageSize : 100};
        agentService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, "", $rootScope.orgInfo.orgId).then(function(data){
            $scope.agentData = data;
        },function(data){
            console.log();
        });
    };

    $scope.getAgentName();

    if($stateParams.id != null && $stateParams.type == "edit"){//新增页面，不进行操作；//修改页面查询后台数据，并且赋值页面
        $scope.loadDataById($stateParams.id);
    }else if($stateParams.type == "detail"){//详情页面
        $scope.loadDataById($stateParams.id);
        $scope.disabled = true;
        $scope.isShow = "0";
    }

    $scope.getEmptying = function () {
        $scope.agentDepotEdit = {};
        $state.go('app.business.agent.basic.agentDepotList');
    };

    // 新增或修改保存数据
    var validator = $("#agentDepot-form").validate();
    $scope.saveData = function() {
        if (validator.form()) {
            var dates = angular.toJson($scope.agentDepotEdit);
            agentDepotService.saveAndUpdata(dates).then(function (data) {
                if (data.status == "success") {
                    agentService.getUpdateFile($scope.fileIds,data.agentId,"agentDepot");
                    alert("保存成功");
                    $state.go('app.business.agent.basic.agentDepotList');
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
        formData : [{type : 'agentDepot',userId:$rootScope.userInfo.userId,orgId:$rootScope.userInfo.orgId}], // 与文件一起发送的数据
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
})
.controller("agentLaoDepotCtrl", function($scope, $http, $state, $stateParams, $rootScope, FileUploader, agentDepotService,agentService,warehouseService) {
    $scope.agentDepotName = null;
    $scope.depotList = {};
    $scope.isShow = true;
    $scope.loadDataById = function() {
        agentDepotService.getDepotList($scope.agentDepotName,$stateParams.storehouseId).then(function(data){
            $scope.depotList = data;
            for (var i = 0; i < $scope.depotList.length; i++) {
                for (var j = 0; j < $scope.depotList[i].length; j++) {
                    $scope.depotList[i][j].stateValue = $scope.depotList[i][j].stateValue == '1'?true:false;
                }
            }
            if($scope.depotList[0][0].id !== "" && $scope.depotList[0][0].id !== undefined){
                $scope.isShow = false;
            }
        },function(data){
            console.log();
        });
    };

    $scope.loadDataById();

    $scope.getEmptying = function () {
        $scope.depotList = {};
        $state.go('app.basic.storehouseList',{type:2});
    };

    $scope.deleteAgentDepot = function (id,depotId) {
        agentService.removeStoreHouse(id,depotId).then(function(data){
            $scope.isShow = true;
            // $scope.getEmptying();
        },function(data){
            console.log();
        });
    };

    // 新增或修改保存数据
    $scope.saveLaoData = function() {

        //获取仓房下的货位信息
        var depotId = $rootScope.orgInfo.orgId;
        warehouseService.getStorehouse(depotId, $stateParams.storehouseId).then(function(data){
            var warehouIds = "";
            for (var i = 0; i < data.wareList.length; i++) {
                warehouIds += data.wareList[i].warehouseId +"|"
            }
            if (warehouIds == ""){
                alert("没有相关的货位信息，请查询后再添加代储仓房！");
                return;
            }
            var agentDepotId = $('input[name="stateValue"]:checked').val();
            if(agentDepotId == undefined){
                alert("请选择相关粮库后再点击确定！");
                return;
            }
            agentDepotService.saveLaoDepot(agentDepotId,$stateParams.storehouseId,warehouIds.substring(0,warehouIds.length-1)).then(function (data) {
                if (data.status == "success") {
                    alert("保存成功");
                    $state.go('app.basic.storehouseList',{type:2});
                } else {
                    alert("保存失败");
                }
            });
        },function (data) {
            console.log(data);
        });
    };
})
.controller("addAgentId", function(FileUploader, $scope, $rootScope, $http, $filter, $location, $uibModalInstance, $stateParams, id, agentDepotService, agentService ) {
    $scope.agentId;
    // 获取基础数据
    $scope.getAgentName = function () {
        //获取代储点名称
        $scope.pageInfo = {pageNum : 1, pageSize : 100};
        agentService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, "", $rootScope.orgInfo.orgId).then(function(data){
            $scope.agentData = data;
        },function(data){
            console.log();
        });
    };

    // 初始化模态窗口数据
    $scope.getAgentName();

    // 提交表单
    $scope.save = function() {
        agentDepotService.addAgentId(id,$scope.agentId).then(function(data){
            if (data.status == 'success') {
                alert("保存成功！");
            } else {
                alert("保存失败！");
            }
            $scope.cancel();
        },function(data){
            console.log(data);
        });
    };

    // 关闭模态窗口
    $scope.cancel = function() {
        $uibModalInstance.close();
    }
});