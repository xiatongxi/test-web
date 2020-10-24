"use strict";
angular.module('app.system')
	.controller("daibsxCtrl", function($scope, $stateParams, $rootScope,$timeout, $uibModal, selectService, safeProduceNotifyService,$state, APP_CONFIG) {
		// 获取代办事项数据
		$scope.loadTodoData = function() {
			 selectService.getloadTodoData().then(function(data) {
			        $scope.TodoSize = data;
			    },function(data){
			        console.log(data);
			    });
		};
		var headerCtrlScope = $('div[ng-controller="headerCtrl"]').scope();
		$scope.loadTodoData();
		$scope.moreTodo=function() {
			headerCtrlScope.switchTopMenu(8, "app.business.handle-view");
		};

        // 获取生产通知事项数据
        $scope.safeProduceNotifySize = function() {
            safeProduceNotifyService.getPageInfo().then(function(data) {
                $scope.totalSize = data.total;
            },function(data){
                console.log(data);
            });
        };
        $scope.safeProduceNotifySize();
		// 安全生产通知链接
        var safeProduceNotifyCtrlScope = $('div[ng-controller="headerCtrl"]').scope();
        $scope.safeProduceNotifyTodo=function() {
            safeProduceNotifyCtrlScope.switchTopMenu(19, "app.storage.safeproduce.notifyList");
        }

});
