"use strict";
//器材信息
angular.module('app.business')
    .controller("deviceInputCtrl", function($scope, $http,$state,$rootScope,deviceInputService,enumService,orgService,$stateParams, APP_CONFIG) {
    	
    // 获取列表数据
    	
    	//分页、查询条件
	     $scope.pageInfo = {pageNum : 1, pageSize : 10};
	     $scope.device = {deviceType:"",deviceName:""};
		 

		 
	 $scope.loadData = function() {
		 
			 if($scope.device.deviceName != undefined && $scope.device.deviceName != ""){
				 
				 if($scope.pageInfo.pageNum!=1||$scope.pageInfo.pageSize!=10){
					 $scope.device.deviceName=$scope.device.deviceName;
				 }else{
					 $scope.device.deviceName = $scope.device.deviceName[0].id;
				 }
		   	 }
		
			 deviceInputService.getPageInfoDevice($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.device.deviceName,$scope.device.deviceType,$rootScope.orgInfo.orgName).then(function(data){
				 $scope.pageInfo = data; 
		     },function(data){
		         console.log(data);
		     });
		 
	 }
	 $scope.loadData();
	 //新增
	 $scope.showAddInput = function () {
		 $state.go('app.business.deviceInputAdd',{id:0,isNotEdit:false});
	 }


    // 翻页
    $scope.goPage = function(pageNum) {
        $scope.pageInfo.pageNum = pageNum;
        $scope.loadData();
    }
    
    // 根据id删除信息
    $scope.remove = function(id) {
    	deviceInputService.removeById(id).then(function (data) {
            if(data.msg == "success"){
                alert("删除成功");
                $scope.loadData();
            }else{
                alert("删除失败");
            }
        });
    }
    
	
	// 查看页面
    $scope.showViewInput = function(id) {
    	$state.go('app.business.inputEdit',{id:id,isNotEdit:true});
    }
    
    //修改页面
    $scope.showEditInput = function(id) {
    	$state.go('app.business.inputEdit',{id:id,isNotEdit:false});
    }

    //树形下拉框获取器材设备名称
    $scope.getDeviceName = function() {
    	$scope.deviceType=angular.fromJson($scope.device.deviceType);
        enumService.getTreeListByTypeId($scope.device.deviceName,$scope.deviceType).then(function(data) {
            $scope.deviceNameTreeData = data;
        },function(data) {
            console.log(data);
        })
    };
    
    
    
})

    .controller("deviceInputCheckCtrl", function($scope, $filter,$http,$state,$rootScope, deviceInputService,equipmentEquipmentPoolService,enumService,$stateParams, APP_CONFIG) {
    	  //根据id获取数据
       $scope.loadDataById = function(id) {
                deviceInputService.loadDataById(id).then(function(data){
                	$scope.device = data;
                	$scope.device.inputTime = $filter('date')($scope.device.inputTime, "yyyy-MM-dd");
                	$scope.device.produceTime = $filter('date')($scope.device.produceTime, "yyyy-MM-dd");
                	$scope.device.position=parseInt(data.position);
                	$scope.device.storageRack=parseInt(data.storageRack);
                	$scope.device.storageRackCell=parseInt(data.storageRackCell);
                	$scope.device.deviceManager = parseInt($scope.device.deviceManager);
                	
                	$scope.getDeviceName();
                },function(data){
                    // console.log(data);
                });
            };
            
          //查看修改调用此方法
         if ($stateParams.id != 0) {
        	 $scope.loadDataById($stateParams.id);
         }
         //判断可否修改
         var disabled = false;
    	 $("#deviceInput-form input").attr("disabled",disabled);
         $("#deviceInput-form select").attr("disabled",disabled);
         
        if($stateParams.isNotEdit != null){
    	    if ($stateParams.isNotEdit == "false") {
                $scope.isNotEdit = false;
            } else if ($stateParams.isNotEdit == "true") {
                $scope.isNotEdit = true;
            }
        }else{
            $scope.isNotEdit = false;
        }
        
        //树形下拉框获取器材设备名称
        $scope.getDeviceName = function() {
        	$scope.deviceType=angular.fromJson($scope.device.deviceType);
        	//$scope.device.deviceName=angular.fromJson($scope.device.deviceName);
            enumService.getTreeListByTypeId($scope.device.deviceName,$scope.deviceType).then(function(data) {
                $scope.deviceNameTreeData = data;
            },function(data) {
                console.log(data);
            })
        };
        
         // 存放位置
         $scope.loadData = function() {
         	equipmentEquipmentPoolService.getPageInfo(null, null,null).then(function(data){
         		$scope.equipmentEquipmentPool = data.list;
             },function(data){
                 console.log(data);
             });
         }
         $scope.loadData();
         
         // 提交表单
         var validator = $("#deviceInput-form").validate();
         $scope.saveData = function() {
     		if (validator.form()) {
     			//粮库名称
     			
     			
     			$scope.deviceName=angular.fromJson($scope.device.deviceName);
     			if(typeof $scope.deviceName == 'object'){
     				$scope.device.deviceName=$scope.deviceName[0].id;
     			}else{
     				$scope.device.deviceName = $scope.deviceName;
     			}
     			//console.log(typeof $scope.deviceName+"******11");
     			
     			//入库的原始数量
     			//$scope.device.deviceManager = $scope.device.useCount+"";
     			$scope.device.useCount = parseInt($scope.device.deviceManager);
     			 if ($scope.device.deviceName == '' || $scope.device.deviceName == null) {
     	            $("#devicename-error").text("必须填写");
     	        } else {
     	            $("#devicename-error").text("");
     	        }
     			
     			$scope.device.orgId=$rootScope.userInfo.orgId;
     			
     		   $http({
   				method: 'POST',
   				url: APP_CONFIG.deviceUrl + '/deviceInput/save',
   				data: {
   					deviceInputJson : angular.toJson($scope.device)
   				}
   			}).then(function successCallback(response) {
   				if(response.data.status == "success"){
   					alert("保存成功！");
   					$state.go('app.business.deviceInputList');
   				}else{
   					alert(response.data.msg);
   					$scope.saveFlag = false;
   				}
   				
   			}, function errorCallback(response) {
   				// 请求失败执行代码
   			});
     		   
     		   
     		   
     		    
     		}
     	}
        
    	
         
    })
