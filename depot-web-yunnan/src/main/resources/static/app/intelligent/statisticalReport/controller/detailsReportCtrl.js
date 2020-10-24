"use strict";
angular.module('app.intelligent').controller("detailsReportCtrl", function($scope, $state, $rootScope,$stateParams,$uibModal,detailsReportService,keeperService) {

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
    	detailsReportService.getDetailsReportInfo($rootScope.orgInfo.orgId,$scope.searchStorehouseCode,
    			$scope.searchStartDate).then(function(data){
            $scope.getKeeperNames(data.data.storeHouse); // 获取仓房id
            $scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();
    //$scope.searchStorehouseCode = $scope.storelist[0].storehouseCode;

    // 使用仓房编码获取仓房id,在获取保管员姓名
    $scope.getKeeperNames = function (vCfCode) {
        // 获取保管员姓名
        if (vCfCode !== undefined && vCfCode !== null && vCfCode !== '') {
            var storeHouseId = $rootScope.storeHouseCodeObj[vCfCode].storehouseId; // 获取仓房id
            keeperService.getKeeperNamesByHouseId(storeHouseId).then(function(data){ // 获取保管员姓名
                $scope.keeperNames = data.keeperNames;
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

})
