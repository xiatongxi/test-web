angular.module('app.basic')
	.controller("uploadUserAndCfCtrl", function($scope, $rootScope, $state, APP_CONFIG, userService) {

    // 获取数据字典大类列表数据
    $scope.loadData = function() {

    	userService.findAllUserByOrgId().then(function(data){
            document.getElementById('userDateList').value = angular.toJson(data);
            document.getElementById('uploadDataForm').action = APP_CONFIG.basicUrl +"/basicExportAndImport/exportUserAndCfHw";
            document.getElementById("uploadDataForm").submit(function(){return false; });
    	},function(data){
            console.log(data);
        });
    };

    $scope.loadData();

});