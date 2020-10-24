"use strict";
//var useCount="";
angular.module('app.business')
    //器材信息
    .controller("deviceRepairCtrl", function($scope, $http,$state,$rootScope,orgService,deviceRepairService,deviceGetService, $stateParams, APP_CONFIG) {
     // 获取列表数据
     $scope.pageInfo = {pageNum : 1, pageSize : 10};
     $scope.search = {repairStatus:""};
     $scope.orgId = $rootScope.userInfo.orgId;
	 $scope.loadData = function() {
		 orgService.editOrg($scope.orgId).then(function(data) {
             $scope.orgInfo = data;
             //$scope.orgName=$scope.orgInfo.orgName;
         }, function(data) {
             console.log(data);
         });
		 
		 deviceRepairService.getPageInfoDevice($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.search.repairStatus,$scope.orgInfo.orgName).then(function(data){
			 $scope.pageInfo = data;
	         $scope.deviceRepairList = data.list;
	     },function(data){
	         console.log(data);
	     });
	 }
	 $scope.loadData();
	
	/* //获取入库表的仓房信息
	 $scope.House = function() {
		 console.info($scope.houseGetList);
		 if($scope.houseGetList==undefined){
			 deviceGetService.getHouseList().then(function(data){
		         $scope.houseGetList = data;
		         console.info(data);	
               // $scope.houseGetList = data.list;
		     },function(data){
		         console.log(data);
		     });
		 }
	 }*/
	 
	 /*//获取仓房对应的名称
	 $scope.depotIdChange = function() {
		 var depotId = $scope.deviceRepair.depotId; 
		 deviceRepairService.getdeviceNameList(depotId).then(function(data){
			 $scope.deviceNameList = data;
			 console.info(data);	
		 },function(data){
			 console.log(data);
		 });
	 }*/
	 
	
    // 翻页
    $scope.goPage = function(pageNum) {
        $scope.pageInfo.pageNum = pageNum;
        $scope.loadData();
    }
    
	 //添加维护信息页面
	 $scope.showRepair = function () {
	   $state.go('app.business.devicerepairAdd');
	 }
	 
	 //维护信息详情
	 $scope.showRepairMassage = function (id) {
		 $state.go('app.business.deviceRepairMassage',{id:id,isNotEdit:false});
	 }

    	
    	// 结束维修
    	$scope.EndRepair = function (id) {
            $http({
                method: 'POST',
                url: APP_CONFIG.deviceUrl + '/deviceRepair/end',
                data: {
                	deviceListJson: angular.toJson({"id":id})
                }
            }).then(function successCallback(response) {
                if (response.data.status == "success") {
                    alert("结束维修成功！");
                    $scope.loadData();
                } else {
                    alert("结束维修失败！");
                }
            }, function errorCallback(response) {
                // 请求失败执行代码
            });
    	}
    	
    	/*//批量结束维修复选框
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
        
       /* // 批量结束维修
    	$scope.moreDelete = function () {
    		var ids = "";
    		for(var i=0; i<$scope.selected.length; i++){
    			ids +=$scope.selected[i]+",";
    		}
    		if(ids!=""){
    			$http({
    				method: 'POST',
    				url: APP_CONFIG.baseUrl + '/deviceRepair/endMore',
    				data: {
    					deviceListJson: angular.toJson({"id":ids})
    				}
    			}).then(function successCallback(response) {
    				if (response.data.status == "success") {
    					alert("结束维修成功！");
    					$scope.loadData();
    				} else {
    					alert("结束维修失败！");
    				}
    			}, function errorCallback(response) {
    				// 请求失败执行代码
    			});
    		}else{
    			alert("请选择要结束维修的器材");
    		}
    	}
    	
    */
    })
    
     //器材信息
    .controller("deviceRepairSaveCtrl", function($scope, $http,$state,$rootScope,deviceRepairService,deviceGetService, $stateParams, APP_CONFIG) {
    	//根据id查询数据
   			$scope.loadDataById = function(id) {
      		 deviceRepairService.loadDataById(id).then(function(data){
      	         $scope.deviceRepairMassage = data;
      	         console.log(data);
      	     },function(data){
      	         console.log(data);
      	     });
   		 }
   			var id=$stateParams.id;
   			$scope.loadDataById(id);
    })
    
    
        .controller("deviceRepairAddCtrl", function($scope, $http,$state,$rootScope,deviceRepairService,deviceKeepService,deviceGetService, $stateParams, APP_CONFIG) {
        	
        	$scope.deviceRepair={};
        	//获取名称
        	$scope.deviceNameChange=function(){
   				deviceRepairService.getDeviceName().then(function(data){
   					$scope.deviceNameList=data;
   					console.log(data);
   				},function(data){
   					console.log(data);
   				})
   		    }
        	
        	$scope.deviceNameChange();
        	/*//获取设备名称对应的型号
       	 $scope.deviceModelChange = function() {
       		 var deviceName = $scope.deviceRepair.deviceName; 
       		 deviceRepairService.getmodelList(deviceName).then(function(data){
       			 $scope.deviceModelList = data;
       			 console.info(data);	
       			 // $scope.houseGetList = data.list;
       		 },function(data){
       			 console.log(data);
       		 });
       	 }
       	 
       	 //获取设备型号对应的编号
       	 $scope.Modelchange = function() {
       		 var deviceModel = $scope.deviceRepair.model; 
       		 deviceRepairService.getNumberList(deviceModel).then(function(data){
       			 $scope.deviceNumberList = data;
       			 console.info(data);	
       			 // $scope.houseGetList = data.list;
       		 },function(data){
       			 console.log(data);
       		 });
       	 }*/
       	
        	//获取规格型号及编号
        	$scope.deviceModelChange=function(){
        		 var deviceName = $scope.deviceRepair.deviceName;
        		 deviceRepairService.getDeviceModel(deviceName).then(function(data){
   					$scope.deviceInputList=data;
   					//alert(data.useCount);
   					//$scope.deviceRepair.useCount=data[0].useCount;
   					//console.log(data[0].useCount);
   				},function(data){
   					console.log(data);
   				})
        		/* deviceRepairService.getmodelList(deviceName).then(function(data){
   					$scope.deviceInputList=data;
   					//alert(data.useCount);
   					//$scope.deviceRepair.useCount=data[0].useCount;
   					//console.log(data[0].useCount);
   				},function(data){
   					console.log(data);
   				})*/
   		    }
        	
        	 //获取对应数量根据规格型号和设备编号
       	     $scope.Numberchange= function() {
       		     var number = $scope.deviceRepair.number;
       		     var model = $scope.deviceRepair.model;
       		     deviceGetService.getUseCountGetList(number,model).then(function(data){
       			 $scope.deviceUseCountList = data;
       			 //$scope.deviceRepair.repairSumnumber = data[0].useCount;
       			 $scope.deviceRepair.repairSumnumber = data[0].brokenCount;
       		  },function(data){
       			 console.log(data);
       		 });
       	  }
/*       	     //获取对应数量
       	     $scope.Numberchange= function() {
       	    	 var number = $scope.deviceRepair.number;
       	    	 var model = $scope.deviceRepair.model;
       	    	 deviceRepairService.getUseCount(number,model).then(function(data){
       	    		 $scope.deviceUseCountList = data;
       	    		 //$scope.deviceRepair.repairSumnumber = data[0].useCount;
       	    		 $scope.deviceRepair.repairSumnumber = data[0].brokenCount;
       	    	 },function(data){
       	    		 console.log(data);
       	    	 });
       	     }
*/       	     
       	 //维修数量改变事件
       		 $scope.getCountChange = function(){
       			 var repairNumber=$scope.deviceRepair.repairNumber;
       			var brokenCount=$scope.deviceRepair.repairSumnumber;
       			 if(brokenCount<repairNumber){
       				 alert("超过范围");
       				 $scope.deviceRepair.repairNumber="";
       			 }
       		 }
        	// 提交表单
       		  $scope.deviceRepair.orgId = $rootScope.userInfo.orgId;
            var validator = $("#deviceRepair-form").validate();
        	$scope.saveData = function () {
                if (validator.form()) {
                    $http({
                        method: 'POST',
                        url: APP_CONFIG.deviceUrl + '/deviceRepair/save',
                        data: {
                        	deviceRepairJson: angular.toJson($scope.deviceRepair)
                        }
                    }).then(function successCallback(response) {
                        if (response.data.status == "success") {
                            alert("保存成功！");
                            $state.go('app.business.deviceRepairList');
                        } else {
                            alert("保存失败！");
                        }
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    });
                }
        	}
           
        })
