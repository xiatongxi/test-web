angular.module('app.business').controller("drugStandingBookDetailCtrl", function($scope, $rootScope, $http, $state, $stateParams,
		drugStandingBookDetailService, APP_CONFIG) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.searchCondition = {};
    // 获取列表数据
    $scope.loadData = function() {
        drugStandingBookDetailService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.searchCondition).then(function(data){
            $scope.pageInfo = data;
            if (data.list.length > 0) {
            	$scope.info = data.list[0];
            	var dicData = $rootScope.dicData;
            	$scope.drugKind = dicData[$scope.info.drugKind];
            	$scope.drugName = dicData[$scope.info.drugName];
            	$scope.drugType = dicData[$scope.info.drugType];
            	$scope.drugPacking = dicData[$scope.info.drugPacking];
            }
        },function(data){
            console.log(data);
        });
    }
    
    if ($stateParams.drugInfoId != undefined) {
    	$scope.searchCondition.drugInfoId = $stateParams.drugInfoId;
    }
    
    if ($stateParams.manufacturer != undefined) {
    	$scope.searchCondition.manufacturer = $stateParams.manufacturer;
    }
    
    $scope.loadData();

    // 查看页面
    $scope.showDetail = function(id) {
        $state.go("app.business.drug.standingBook.detail", {drugInfoId : drugInfoId, manufacturer : manufacturer});
    }
    
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData();
     	}
	}
	
    // 返回
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
        	$rootScope.back();
        } else {
        	$state.go("app.business.drug.standingBook");
        }
    }
});