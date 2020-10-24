"use strict";
angular.module('app.intelligent').controller("submitReportCtrl", function($scope, $state, $rootScope,$stateParams,$uibModal,submitReportService) {

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    // 筛选条件
    $scope.search = {};

    var date = new Date();
    var nowMonth = date.getMonth() + 1;
    var strDate = date.getDate();
    var endDate = date.getFullYear() + "-" + nowMonth + "-" + strDate;
    $scope.searchStartDate = endDate;
    
    // 加载列表
    $scope.loadData = function() {
    	if($scope.searchStartDate == null || $scope.searchStartDate == ""){
    		alert("检测日期不能为空！");
    		return false;
    	}
    	submitReportService.getSubmitReportList($scope.pageInfo,$rootScope.orgInfo.orgId,
    			$scope.searchStartDate).then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();

    // 清空搜索时间
    $scope.emptyTime = function() {
        $scope.searchStartDate = '';
    };

    // 翻页
    $scope.goPage = function(pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

})
