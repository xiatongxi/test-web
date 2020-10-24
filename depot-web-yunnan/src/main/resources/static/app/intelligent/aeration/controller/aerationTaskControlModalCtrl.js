angular.module('app.intelligent').controller("aerationTaskControlModalCtrl", 
	function($scope, $uibModalInstance, $filter, $http, aerationTaskRecordService,aerationParameterService,$rootScope, APP_CONFIG, items) {
	$scope.aerationTaskControlList={};
	$scope.isNotEdit=true;
    // 获取通风数据数据
    $scope.loadData = function(id) {
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/aerationTask/edit',
            params: {
                id : id
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            $scope.aerationTaskControl = response.data.data;
            //$scope.customerBadrecord.happenDate = $filter('date')($scope.customerBadrecord.happenDate, "yyyy-MM-dd"); 
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
    };
	// 获取熏蒸数据数据
	$scope.loadFumigationData = function(id) {
		$http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/fumigationPlan/getFumigationPlanDeatil',
            params : {
                fumigationId : id
            }
		}).then(function successCallback(response) {
			// 请求成功执行代码
			$scope.aerationTaskControl = response.data.fumigationEdit;
			$scope.loadDeviceData($scope.storehouseObj[response.data.fumigationEdit.houseId].storehouseCode);
		}, function errorCallback(response) {
			// 请求失败执行代码
			console.log(response);
		});
	};
    
    
    //根据仓房编号获取设备信息
    $scope.loadDeviceData = function(vcfcode,vdevkindcode) { //仓房，设备类型
    	$http({
    		method: 'POST',
    		url: APP_CONFIG.intelligentUrl + '/intelligents/aerationParameter/getBycf',
    		params: {
    			vcfcode : vcfcode,
    			vdevkindcode : vdevkindcode,
    		}
    	}).then(function successCallback(response) {
    		// 请求成功执行代码
    		$scope.test = response.data.data;
    		
    	}, function errorCallback(response) {
    		// 请求失败执行代码
    		console.log(response);
    	});
    }
    
    
   /* //根据仓房和设备名称查询是否存在已通风的数据
    $scope.loadRecordData = function(vcfcode,vdevname) {
    	$http({
    		method: 'POST',
    		url: APP_CONFIG.intelligentUrl + '/intelligents/aerationRecord/getByCode',
    		params: {
    			vcfcode : vcfcode,
    			vdevname : vdevname
    		}
    	}).then(function successCallback(response) {
    		// 请求成功执行代码
    		alert(0);
    		//$scope.test = response.data.data;
    		if(response.data.data!=null && angular.equals(response.data.data.vDevName,$scope.test[1].vdevname)){
    			
    			$scope.aerationTaskControlList.vdevkindcode = parseInt(response.data.data.vDeviceCode);
    			
    		}
    		
    		
    		//$scope.aerationTaskControl = response.data.vCfCode;
    		//$scope.customerBadrecord.happenDate = $filter('date')($scope.customerBadrecord.happenDate, "yyyy-MM-dd"); 
    		
    	}, function errorCallback(response) {
    		// 请求失败执行代码
    		console.log(response);
    	});
    }
    */
    
    // id不为空，回显.
    if (items.id != null && items.id != undefined && items.id != '') {
    	$scope.isNotEdit = items.isNotEdit;
    	if(items.dataType == "fumigationData"){
            $scope.loadFumigationData(items.id);
        }else{
            $scope.loadData(items.id);
        }
    }
    
    
	 //提交
	 var validator = $("#aerationTaskControl-form").validate();
	    $scope.save = function() {
	    	
	    	$scope.idObject=[];
	    	for (var i = 0; i < $scope.test.length; i++) {
	    		$scope.controlData={id:null,vstatue:null};
	    		$scope.controlData.id = $scope.test[i].id;
	    		$scope.controlData.vstatue = $scope.test[i].vstatue;
	    		$scope.idObject.push($scope.controlData);
			}
	    	
	    	//console.log($scope.idObject);
	    		// 提交  
	    		$http({
	        		method: 'POST',
	        		url: APP_CONFIG.intelligentUrl + '/intelligents/aerationRecord/save',
	        		params: {
	        			task : angular.toJson($scope.idObject),
	        			aerationTaskControl : $scope.aerationTaskControl,
	        			orgId : $rootScope.userInfo.orgId,
                        saveType : items.dataType
	        		}
	        	}).then(function successCallback(response) {
	        		// 请求成功执行代码
	        		//$scope.test = response.data.data;
	        		if(response.data.retCode=="200"){
	        			alert(response.data.data);
		        		$scope.cancel();
		        		//获取实时的数据
		        		aerationParameterService.synchronizationAll($rootScope.userInfo.orgId).then(function(data){
		                    /*if (data.retCode == '200') {
		                        alert("数据同步成功！");
		                        $scope.loadData();
		                    } else {
		                        alert(data.message);
		                    }*/
		                },function(data){
		                    // console.log(data);
		                });
	        		}else{
	        			$scope.cancel();
	        		}
	        		
	        	}, function errorCallback(response) {
	        		// 请求失败执行代码
	        		console.log(response);
	        	});
	    		
	    		
	    	
	    }
	
	
	/*$scope.vdevkindcode = function(code,id){
		var code = $("select[name='"+code+"']").val();
		var id = $("input[name='"+id+"']").val();
		
		for (var i=0; i < $scope.test.length; i++) {
            if($scope.test[i].id==id){
            	$scope.test[i].vdevKindCode=code;
            }
        }
		
	}
	*/
	$scope.vState = function(id){
		//$scope.aerationTaskControlList={};
		
		var myselect=document.getElementById("a");
		//var index=vstatue.selectedIndex;
		/*$('#testSelect option:selected') .val();//选中的值
		alert(index);
		alert(vstatue.option[index].value+"****12**///***");*/
		//var vstatue = $("select[name='"+vstatue+"']").val();
		var index=myselect.selectedIndex;
		var vstatue = myselect.options[index].value;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
		//console.log(we);
		//alert(we);
		

		//alert(+"***////");
		//var vstatue = $("input[type='radio']:checked").val();
		//var id = $("select[name='"+vstatue+"']").val();
		//var id = $("input[name='"+vstatue+"']").val();
		//alert(vstatue+"*******"+id);
		for (var i=0; i < $scope.test.length; i++) {
            if($scope.test[i].id==id){
            	$scope.test[i].vState=vstatue;
            }
        }
		
	}
	
	
	// 关闭模态窗口
	$scope.cancel = function() {
		$uibModalInstance.close();
	}
	 
});