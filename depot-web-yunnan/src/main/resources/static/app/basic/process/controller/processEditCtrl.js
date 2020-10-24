angular.module('app.basic')
	.controller("processEditCtrl", function($scope, $rootScope, $http, $uibModal, $location, $state, processService, APP_CONFIG) {

     // 初始化信息
     $scope.loadData = function() {
    	 processService.edit($stateParams.id, $rootScope.orgInfo.orgId).then(function(data){
             $scope.pageInfo = data;
         },function(data){
             console.log(data);
         });
     }

    //返回和取消
 	$scope.retList = function() {
 		if ($rootScope.previousState_name != '') {
            $state.go("app.basic.processList");
        } else {
            $rootScope.back();
        }
 	}

});