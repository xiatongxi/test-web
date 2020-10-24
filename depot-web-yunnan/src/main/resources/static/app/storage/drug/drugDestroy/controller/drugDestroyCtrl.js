angular.module('app.storage').controller("drugDestroyCtrl", function($scope, $http, $state, drugDestroyService, APP_CONFIG) {

    // 分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    // 搜索条件
    $scope.searchCondition = {destroyType:'',startTime:'',endTime:''};
        // 获取列表数据
    $scope.loadData = function() {
        drugDestroyService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();
    
    // 新增页面
    $scope.showAdd = function() {
        $state.go("app.storage.drug.drugDestroy-edit", {id: 0});
    };

    // 编辑页面
    $scope.showEdit = function(id, auditState) {
        $state.go("app.storage.drug.drugDestroy-edit", {id: id});
    };
    
    // 查看页面
    $scope.showView = function(id, processInstanceId) {
        $state.go("app.storage.drug.drugDestroy-view",{id : id, processInstanceId : processInstanceId});
    };
    
    // 删除一条记录
    $scope.delete = function(id, auditState) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        
        $http({
            method: 'POST',
            url: APP_CONFIG.drugManageUrl + '/depot/business/drugDestroy/remove',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            alert("删除成功！");
            // 重新加载数据
            $scope.loadData();
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
        // 关闭弹出层
        $("#myModal").modal("hide");
    };
    
    // 分页相关方法.
    $scope.go_page = function(type, pageNum, pageSize, pages) {
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
         drugDestroyService.getPageInfo(pageNumC, pageSize).then(function(data){
             $scope.pageInfo = data;
         },function(data){
         });
    };
     
    // 改变页码.
    $scope.change_pageSize = function(pageSizeChange) {
        drugDestroyService.getPageInfo(1, pageSizeChange).then(function(data){
            $scope.pageInfo = data;
        },function(data){
        });
    }
     
});