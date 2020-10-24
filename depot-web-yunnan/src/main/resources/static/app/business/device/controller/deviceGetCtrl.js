"use strict";
var useCount="0";
angular.module('app.business')
    //器材信息
    .controller("deviceGetCtrl", function($scope, $http,$state,$rootScope,orgService,deviceGetService,enumService,equipmentEquipmentPoolService, $stateParams, APP_CONFIG) {
     // 获取列表数据
     $scope.pageInfo = {pageNum : 1, pageSize : 10};
     $scope.search = {deviceName:"",deviceType:""};
     //$scope.deviceGet = undefined;
     $scope.orgId = $rootScope.userInfo.orgId;
	 $scope.loadData = function() {
		 orgService.editOrg($scope.orgId).then(function(data) {
             $scope.orgInfo = data;
         }, function(data) {
             console.log(data);
         });
		 
		 deviceGetService.getPageInfoGet($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.search.deviceName,$scope.search.deviceType, $scope.orgInfo.orgName).then(function(data){
	         $scope.pageInfo = data;
	     },function(data){
	         console.log(data);
	     });
	 }
	 $scope.loadData();
	 
     
	/* $scope.data1 = [];
		$scope.getData=function(){
			enumService.enumData().then(function(data) {
				$scope.orglist = data.parentMap;
				//$scope.orglist = data.enumMap;
				console.log($scope.orglist[1].orgName);
				for(var i=0; i<data.list.length; i++){
					var obj = {
						      id: $scope.orglist[i].orgId,
						      name: $scope.orglist[i].orgName,
						      children: []
						    };
					 $scope.data1.push(obj);
					 $scope.data2 = angular.copy($scope.data1);
				}
				
				},function(data){
					console.log(data);
				})
		    }
		$scope.getData();*/
	 
	/* $scope.House = function() {
		 //alert($scope.houseGetList);
		 console.info($scope.houseGetList);
		 if($scope.houseGetList==undefined){
			 deviceGetService.getHouseList().then(function(data){
		         $scope.houseGetList = data;
		        // alert(data.list);
		         console.info(data);	
               // $scope.houseGetList = data.list;
		     },function(data){
		         console.log(data);
		     });
		 }
	 }*/
	 
	/* $scope.storechange = function() {
		 var depotId = $scope.deviceGet.depotId
		 console.info($scope.typeGetList);
			 deviceGetService.getTypeGetList(depotId).then(function(data){
		         $scope.typeGetList = data;
		         console.info(data);	
		     },function(data){
		         console.log(data);
		     });
	 }*/
	 
		// 获取存放位置
	     $scope.equipment = function() {
	     	equipmentEquipmentPoolService.getPageInfo(null, null,null).then(function(data){
	     		$scope.equipmentEquipmentPool = data.list;
	         },function(data){
	             console.log(data);
	         });
	     }
	     $scope.equipment();
	 
	 //根据类型获取名称
	 $scope.nameChange = function() {
		 console.info($scope.shelfGetList);
		 var depotTypeId = $scope.contentBean.deviceTypeId;
			 deviceGetService.getNameGetList(depotTypeId).then(function(data){
				 $scope.nameGetList = data;
				 //console.info(data);	
			 },function(data){
				 console.log(data);
			 });
	 }
	 
	 
	 //根据名称获取货架
	 $scope.shelfChange = function() {
		 //console.info($scope.shelfGetList);
		 $scope.ShelfGetList = null ;
			 var deviceName = $scope.contentBean.deviceName;
			 deviceGetService.getShelfGetList(deviceName).then(function(data){
				 $scope.ShelfGetList = data;
				 //$scope.ModelGetList = data;
				// console.info(data);	
			 },function(data){
				 console.log(data);
			 });
		 
	 }
	 
	 
	 //根据货架获取规格型号
	 $scope.modelChange = function() {
		 // console.info($scope.shelfGetList);
		 var shelfId = $scope.deviceInput.shelfId;
		 var deviceName = $scope.contentBean.deviceName;
		 deviceGetService.getModelGetList(shelfId,deviceName).then(function(data){
			 $scope.ModelGetList = data;
			 //console.info(shelfId);	
		 },function(data){
			 console.log(data);
		 });
	 }
	 
	 //根据规格型号获取编号
	 $scope.numberChange = function() {
		 
		 var deviceTypeId = $scope.contentBean.deviceTypeId;
		 var deviceName = $scope.contentBean.deviceName;
		 var shelfId = $scope.deviceInput.shelfId;
		 var model = $scope.contentBean.model;
		 deviceGetService.getNumberGetList(deviceTypeId,deviceName,shelfId,model,$rootScope.userInfo.orgId).then(function(data){
			 $scope.numberGetList = data;
		 },function(data){
			 console.log(data);
		 });
	 }
	 
	 //根据编号和规格型号获取可用数量
	 $scope.useCountChange = function() {
		 $scope.contentBean.useCount = null;
		 
		 $scope.deviceGet={};
		 var deviceTypeId = $scope.contentBean.deviceTypeId;
		 var deviceName = $scope.contentBean.deviceName;
		 var shelfId = $scope.deviceInput.shelfId;
		 var number = $scope.contentBean.number;
		 var model = $scope.contentBean.model;
		 $scope.deviceGet.orgId = $rootScope.userInfo.orgId;
		 deviceGetService.getUseCountGetList(deviceTypeId,deviceName,shelfId,number,model).then(function(data){
			 if(data.length>0){
				 $scope.contentBean.useCount = data[0].useCount;
				 $scope.deviceGet.inputId = data[0].id;
			 }
			 
			 console.log(data);
		 },function(data){
			 console.log(data);
		 });
	 }
	 
	 //领取数量改变事件
	 $scope.getCountChange = function(){
		 var useCount=$scope.deviceGet.getCount;
		 var gc=$scope.contentBean.useCount;
		 if(useCount>gc){
			 alert("超过范围");
			 $scope.deviceGet.getCount="";
		 }
	 }
	 
	 $scope.contentNameChange = function() {
		 var depotTypeId  = $scope.deviceInput.deviceTypeId;
		 deviceGetService.getcontentNameList(depotTypeId).then(function(data){
			 $scope.contentNameList = data;
			 // console.info(data);	
			 // $scope.houseGetList = data.list;
		 },function(data){
			 console.log(data);
		 });
	 }
	 
	 
	 
	 //领取
	 $scope.showGet = function () {
	    $state.go('app.business.deviceGetAdd');
	 }
	 
	 
	 //归还
	 $scope.showGetBack = function (id,getCount) {
		 $state.go('app.business.deviceGetBack',{id:id,getCount:getCount});
	 }
	 
	 //查看
	 $scope.showMassage = function (id) {
		 $state.go('app.business.deviceChack',{id:id});
	 }
	 
	 
	 
	/*//根据ID修改信息
	 $scope.updateDeviceGetById = function() {
		 var re = /^[0-9]+$/;
		 if(re.test(deviceGet.backCount) || re.test(deviceGet.brokenCount)){
			 alert("归还数量和故障数量必须为数值！");
			 return false;
		 }
		 if(deviceGet.number < deviceGet.backCount){
			 alert("归还数量不能大于借用总量！");
			 return false;
		 }
		 if(deviceGet.backCount < deviceGet.brokenCount){
			 alert("故障数量不能大于归还数量！");
			 return false;
		 }
		 deviceGetService.updateDeviceGetById($scope.deviceGet).then(function(data){
			 $scope.deviceGet = "{"+data+"}";
			 $scope.deviceGetNumber = "{number:"+$scope.deviceGet.number+"}";
			 console.info($scope.deviceGet.number);
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

   // 提交表单
    
    var validator = $("#deviceGet-form").validate();
    
	$scope.saveData = function () {
		if (validator.form()) {
            $http({
                method: 'POST',
                url: APP_CONFIG.deviceUrl + '/deviceGet/save',
                data: {
                	deviceGetJson : angular.toJson($scope.deviceGet),
                	contentBeanJson:angular.toJson($scope.contentBean)
                	
                }
            }).then(function successCallback(response) {
                if(response.data.status == "success"){
                    alert("保存成功！");
                    $state.go('app.business.deviceGetList');
                }else{
                    alert(response.data.msg);
                }
            }, function errorCallback(response) {
                // 请求失败执行代码
            });
        }
	}
	
	
	/* // 存放位置列表
    $scope.loadPosition = function() {
    	equipmentEquipmentPoolService.getPageInfo(null, null,null).then(function(data){console.log(data);
    		$scope.pageInfo = data.list;
        },function(data){
            console.log(data);
        });
    }*/
	
        
})

	.controller("deviceGetBackCtrl", function($scope, $http,$state,$rootScope,deviceGetService,StorehouseService,commonUtilService, $stateParams, APP_CONFIG) {
		$scope.deviceGet = {};
		//根据id获取name
		/* $scope.getHouseNameById = function(depotId) {
			 StorehouseService.findByStorehouse(depotId).then(function(data) {
					//$scope.deviceGetDetail=data;
					$scope.deviceGet.depotName=data.storehouseName;
					alert(data.storehouseName);
					
					//console.info(data);
				}, function(data) {
					console.log(data);
				});
			}*/
		// 获取基础数据
		$scope.getBasicData = function() {
			//按照单位获取单位下的仓房信息
			var depotId = $rootScope.orgInfo.orgId;
			StorehouseService.getStorehouseList(depotId).then(function(data){
				//$scope.storehouseList = data.houseList;
				$scope.storehouseObj = data.houseObj;
			},function (data) {
				console.log(data);
			});
		}
		
		//根据ID获取信息
			$scope.getDeviceGetById = function(id) {
				$scope.getBasicData();
				deviceGetService.getDeviceGetById(id).then(function(data) {
					$scope.deviceGetDetail=data;
					$scope.deviceGet.number=data[0].number;
					$scope.deviceGet.id=data[0].id;
				
					//console.info(data);
				}, function(data) {
					console.log(data);
				});
				//归还信息
				deviceGetService.getDeviceBackById(id).then(function(data) {
					/*$scope.deviceGet = data;*/
					$scope.deviceBack=data;
					$scope.backSumCount=0;
					for (var i = 0; i < data.length; i++) {
						$scope.backSumCount += data[i].backCount;
					}
				}, function(data) {
					console.log(data);
				});
			}
		
		 var id=$stateParams.id;
		 $scope.getDeviceGetById(id);
		
		 
		
		 
		 
         
		    // 提交表单
		    var validator = $("#deviceBack-form").validate();
			$scope.saveBackData = function () {
				if (validator.form()) {
		            $http({
		                method: 'POST',
		                url: APP_CONFIG.deviceUrl + '/deviceGet/saveBack',
		                data: {
		                	deviceBackJson : angular.toJson($scope.deviceGet)
		                }
		            }).then(function successCallback(response) {
		                if(response.data.status == "success"){
		                    alert("归还成功！");
		                    $state.go('app.business.deviceGetList');
		                }else{
		                    alert(response.data.msg);
		                }
		            }, function errorCallback(response) {
		                // 请求失败执行代码
		            });
		        }
			}
		 
			 //归还数量改变事件
			 $scope.backCountChange = function(){
				 $scope.getDeviceGetById(id);
				 var getCount=$stateParams.getCount;
		$scope.remainingCount = commonUtilService.accSub(getCount, $scope.backSumCount);
				 if($scope.remainingCount < $scope.deviceGet.backCount){
					 alert("归还总数量不能大于借用总量！");
					 $scope.deviceGet.backCount=null;
					 return false;
				 }
				 if($scope.deviceGet.backCount < $scope.deviceGet.brokenCount){
					 alert("故障数量不能大于归还数量！");
					 $scope.deviceGet.brokenCount=null;
					 return false;
				 }
			 }
	})
	
	
   /*.filter('changeBgColor', function() { 
	    return function(id, getCount, backCount) {
	    	if(getCount > backCount){
	    		console.log(id+"-----------"+getCount+"=="+backCount);
	        	$("#"+id).find("tr").css('background-color','red');
	        	console.log($("#"+id));
	        }
	    	return getCount;
	    }
	})*/


