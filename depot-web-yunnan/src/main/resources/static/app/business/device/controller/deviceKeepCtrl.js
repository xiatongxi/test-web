"use strict";

angular.module('app.business')
    //器材信息
    .controller("deviceKeepCtrl", function($scope, $http,$state,$rootScope,orgService,deviceKeepService, $stateParams, APP_CONFIG) {
     // 获取列表数据
     $scope.pageInfo = {pageNum : 1, pageSize : 10};
     $scope.search = {deviceName:"",keepStatus:"",depotId:""};
     $scope.orgId = $rootScope.userInfo.orgId;
	 $scope.loadData = function() {
		 orgService.editOrg($scope.orgId).then(function(data) {
             $scope.orgInfo = data;
             //$scope.orgName=$scope.orgInfo.orgName;
         }, function(data) {
             console.log(data);
         });
		 
		 deviceKeepService.getPageInfoDevice($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.search.deviceName,$scope.search.keepStatus,$scope.orgId,$scope.orgInfo.orgName).then(function(data){
			 $scope.pageInfo = data;
			 $scope.deviceKeepList = data.list; 
	     },function(data){
	         console.log(data);
	     });
	 }
	 $scope.loadData();
    // 翻页
    $scope.goPage = function(pageNum) {
        $scope.pageInfo.pageNum = pageNum;
        $scope.loadData();
    }
    
	 //新增
	 $scope.showKeep = function () {
	    	$state.go('app.business.deviceKeepAdd');
	 }
	 
	 //展示保养信息
	 $scope.showKeepMassage = function (id) {
		 $state.go('app.business.deviceKeepMassage',{id:id});
	 }
	 
	
         
	// 结束保养
	$scope.keepEnd = function (id) {
        $http({
            method: 'POST',
            url: APP_CONFIG.deviceUrl + '/deviceKeep/end',
            data: {
            	deviceListJson: angular.toJson({"id":id})
            }
        }).then(function successCallback(response) {
            if (response.data.status == "success") {
                alert("结束保养成功！");
                $scope.loadData();
            } else {
                alert("结束保养失败！");
            }
        }, function errorCallback(response) {
            // 请求失败执行代码
        });
	}
	
	/*// 批量结束保养
	$scope.moreDelete = function () {
		var ids = "";
		for(var i=0; i<$scope.selected.length; i++){
			ids +=$scope.selected[i]+",";
		}
		if(ids!=""){
			$http({
				method: 'POST',
				url: APP_CONFIG.baseUrl + '/deviceKeep/endMore',
				data: {
					deviceListJson: angular.toJson({"id":ids})
				}
			}).then(function successCallback(response) {
				if (response.data.status == "success") {
					alert("结束保养成功！");
					$scope.loadData();
				} else {
					alert("结束保养失败！");
				}
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
		}else{
			alert("请选择你要结束保养的器材");
		}
	}*/
	
	/*//复选框
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
    }
    */
	/*// 提交表单
    var validator = $("#deviceKeep-form").validate();
	$scope.saveData = function () {
        if (validator.form()) {
        	console.log($scope.deviceList);
            $http({
                method: 'POST',
                url: APP_CONFIG.baseUrl + '/deviceKeep/save',
                data: {
                	deviceAddJson: angular.toJson($scope.deviceList)
                }
            }).then(function successCallback(response) {
                if (response.data.status == "success") {
                    alert("保存成功！");
                    $state.go('app.storage.deviceKeepList');
                } else {
                    alert("保存失败！");
                }
            }, function errorCallback(response) {
                // 请求失败执行代码
            });
        }
	}*/

})

    .controller("deviceKeepSelCtrl", function($scope, $http,$state,$filter,$rootScope,deviceKeepService, $stateParams, APP_CONFIG) {
    	
    	//根据id获取数据
        $scope.loadDataById = function(id) {
       	 deviceKeepService.loadDataById(id).then(function(data){
       		 $scope.deviceKeepMassage = data;
                $scope.deviceKeepMassage.keepStart = $filter('date')($scope.deviceKeepMassage.keepStart, "yyyy-MM-dd");
                $scope.deviceKeepMassage.keepEnd = $filter('date')($scope.deviceKeepMassage.keepEnd, "yyyy-MM-dd");
                },function(data){
                   console.log(data);
                });
            }
            var id=$stateParams.id;
   			$scope.loadDataById(id);
   			
   			
    })
    
        .controller("deviceKeepAddCtrl", function($scope, $http,$state,$filter,$rootScope,deviceKeepService, $stateParams, APP_CONFIG) {
        	
        	//获取名称
        	$scope.deviceNameChange=function(){
   				deviceKeepService.getDeviceName().then(function(data){
   					$scope.deviceKeppList=data;
   					//console.log(data);
   				},function(data){
   					console.log(data);
   				})
   		    }
        	
        	$scope.deviceNameChange();
        	
        	//获取规格型号
        	$scope.deviceList={};
        	$scope.deviceModelChange=function(){
        		 var deviceName = $scope.deviceList.deviceName;
   				deviceKeepService.getDeviceModel(deviceName).then(function(data){
   					$scope.deviceKeepModelList=data;
   					console.log(data);
   				},function(data){
   					console.log(data);
   				})
   		    }
        	
        	// 提交表单
        	$scope.deviceList.orgId = $rootScope.userInfo.orgId;;
            var validator = $("#deviceKeep-form").validate();
        	$scope.saveData = function () {
                if (validator.form()) {
                	console.log($scope.deviceList);
                    $http({
                        method: 'POST',
                        url: APP_CONFIG.deviceUrl + '/deviceKeep/save',
                        data: {
                        	deviceAddJson: angular.toJson($scope.deviceList)
                        	
                        }
                    }).then(function successCallback(response) {
                        if (response.data.status == "success") {
                            alert("保存成功！");
                            $state.go('app.business.deviceKeepList');
                        } else {
                            alert("保存失败！");
                        }
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    });
                }
        	}
        
     })
   