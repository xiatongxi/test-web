"use strict";
angular.module('app.intelligent').controller("summaryReportCtrl", function($scope, $state, $rootScope,$stateParams,$uibModal,summaryReportService,keeperService) {

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
    		alert("日期不能为空！");
    		return false;
    	}
    	summaryReportService.getSummaryReportListPageInfo($scope.pageInfo,$rootScope.orgInfo.orgId,
    			$scope.searchStartDate,null).then(function(data){
    		for(var i=0;i<data.data.size;i++){
    			var vCfCode = data.data.list[i].storeHouse;
    			var obj = data.data;
    			$scope.getKeeperNames(data.data.list[i]);
    		}
    		$scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();

    // 使用仓房编码获取仓房id,在获取保管员姓名
    $scope.getKeeperNames = function (obj) {
        // 获取保管员姓名
    	var vCfCode = obj.storeHouse;
        if (vCfCode !== undefined && vCfCode !== null && vCfCode !== '') {
            var storeHouseId = $rootScope.storeHouseCodeObj[vCfCode].storehouseId; // 获取仓房id
            keeperService.getKeeperNamesByHouseId(storeHouseId).then(function(data){ // 获取保管员姓名
            	obj.dutyStoreman = data.keeperNames;
            },function (data) {
                console.log(data);
            });
        }
    };
    
    // 清空搜索时间
    $scope.emptyTime = function() {
        $scope.searchStartDate = '';
        $scope.searchEndDate = '';
    };

    // 翻页
    $scope.goPage = function(pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

})
