"use strict";

/**
 * 
 * 切换仓房的控制器
 */
angular.module('app.storage').controller("switchStoreCtrl", 
		function($scope, $rootScope, StorehouseService, APP_CONFIG) {
	
	// 切换仓房
	$scope.switchStore = function() {
		$rootScope.currentStore = $scope.storehouseId;
		$rootScope.$broadcast("storeChangeed", $scope.storehouseId);
	}
	 
});
