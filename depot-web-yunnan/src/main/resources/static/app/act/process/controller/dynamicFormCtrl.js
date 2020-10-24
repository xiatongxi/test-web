"use strict";

angular.module('app.dynamicForm').controller("dynamicFormCtrl", function($scope,$http,dynamicFormService, $state, APP_CONFIG) {
	$scope.pageInfo = {pageNum : 1, pageSize : 10};
    // 获取列表数据
    $scope.loadData = function() {
    	dynamicFormService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
            console.log(data);
        },function(data){
            console.log(data);
        });
    }
     
    $scope.loadData();
    
    
    //表单页面
    $scope.startupProcess= function(id,key) {
        $state.go("app.dynamicForm.dynamicForm-edit",{id: id , key: key});
    }
    
    // 分页相关方法.
    $scope.go_pages = function(type, pageNum, pigeSize, pages) {
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
        	 dynamicFormService.getPageInfo(pageNumC, pigeSize).then(function(data){
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
        	dynamicFormService.getPageInfo(1, pigeSizeChange).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                //console.log(data);
            });
        }
        $scope.loadData();
    }
});