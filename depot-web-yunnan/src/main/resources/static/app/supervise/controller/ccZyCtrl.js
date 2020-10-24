"use strict";

angular.module('app.supervise')
    .controller("ccZyCtrl", function($scope,$http,$rootScope,$state, $stateParams, enumService,StorehouseService, APP_CONFIG) {

        //加载仓房数据
        var depotId = $rootScope.depotInfo.orgId;
        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.search = {};
        $scope.loadData = function() {
        	if ($stateParams.houseId != null && $stateParams.houseId != '') {
        		$scope.search.houseId = $stateParams.houseId;
        	}
            if($scope.search.startDate > $scope.search.endDate){
                alert("开始时间不能大于结束时间，请重新选择后再查询！");
                return;
            }
            $http({
                method : 'GET',
                url : APP_CONFIG.superviseUrl + '/ccZy/list',
                params : {
                    pageNum : $scope.pageInfo.pageNum,
                    pageSize : $scope.pageInfo.pageSize,
                    houseId : $scope.search.houseId!=undefined?$scope.search.houseId:"",
                    startDate : $scope.search.startDate!=undefined?$scope.search.startDate:"",
                    endDate : $scope.search.endDate!=undefined?$scope.search.endDate:""
                }
            }).then(function successCallback(response) {
                $scope.pageInfo = response.data;
            }, function errorCallback(response) {

            });
        };
        $scope.loadData();

        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        };

        // 粮食安全追溯-返回主列表页面
        $scope.returnHomePage = function(){
            if ($stateParams.isShowReturn == 'lifecycle') {
                $state.go('app.synth.lifecycle');
            } else {
                $rootScope.back();
            }
        }

});
