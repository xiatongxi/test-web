"use strict";
//器材信息
angular.module('app.business')
    .controller("deviceOutCtrl", function($scope, $http,$state,$rootScope,deviceInputService,$stateParams, APP_CONFIG) {
    // 获取列表数据
     $scope.pageInfo = {pageNum : 1, pageSize : 10};
     $scope.search = {deviceTypeId:"5476"};
	 $scope.loadData = function() {
		 deviceInputService.getPageInfoDevice($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,null,$scope.search.deviceTypeId).then(function(data){
			 $scope.pageInfo = data;
	     },function(data){
	         console.log(data);
	     });
	 }
	 $scope.loadData();
	 
	// 报废
 	$scope.showOut = function (id) {
         $http({
             method: 'POST',
             url: APP_CONFIG.deviceUrl + '/deviceOut/Out',
             data: {
             	deviceListJson: angular.toJson({"id":id})
             }
         }).then(function successCallback(response) {
             if (response.data.status == "success") {
                 alert("结束报废成功！");
                 $scope.loadData();
             } else {
                 alert("结束报废失败！");
             }
         }, function errorCallback(response) {
             // 请求失败执行代码
         });
 	}
 	
    // 翻页
    $scope.goPage = function(pageNum) {
        $scope.pageInfo.pageNum = pageNum;
        $scope.loadData();
    }
 	
 	/*//批量报废复选框
	$scope.selected = [];

    var updateSelected = function(action,id,name){
        if(action == 'add' && $scope.selected.indexOf(id) == -1){
            $scope.selected.push(id);
        }
        if(action == 'remove' && $scope.selected.indexOf(id)!=-1){
            var idx = $scope.selected.indexOf(id);
            $scope.selected.splice(idx,1);
        }
        console.log($scope.selected);
    }

    $scope.updateSelection = function($event, id){
        var checkbox = $event.target;
        var action = (checkbox.checked?'add':'remove');
        updateSelected(action,id,checkbox.name);
    }
    
    $scope.isSelected = function(id){
    	return $scope.selected.indexOf(id)>=0;
    }*/
    
    /*// 批量报废
	$scope.moreOut = function () {
		var ids = "";
		for(var i=0; i<$scope.selected.length; i++){
			ids +=$scope.selected[i]+",";
		}
		if(ids!=""){
			$http({
				method: 'POST',
				url: APP_CONFIG.baseUrl + '/deviceOut/outMore',
				data: {
					deviceListJson: angular.toJson({"id":ids})
				}
			}).then(function successCallback(response) {
				if (response.data.status == "success") {
					alert("批量报废成功！");
					$scope.loadData();
				} else {
					alert("批量报废失败！");
				}
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
		}
	}*/
	
         
})
