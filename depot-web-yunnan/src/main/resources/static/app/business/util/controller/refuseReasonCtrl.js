angular.module('app.business').controller("refuseReasonCtrl", 
    function($scope, $http, $state, $uibModalInstance, APP_CONFIG, items) {
	
	$scope.returnResult = [];
    // items为上一个模态窗传过来的中是 id
    // 暂停

    // 关闭模态窗口
    $scope.cancel = function() {
    	$scope.returnResult.returnType = "success";
        // close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
        $uibModalInstance.close($scope.returnResult);
    }
    
    //(确认)
    $scope.submit = function(refuseReason) {
    	if(refuseReason == null || refuseReason == '' || typeof refuseReason == 'undefined' ){
			alert("请填写暂停或终止的原因");
			return;
		}
    	if(items.type=="discontinue"){
    		var url = '/depot/business/plan/discontinue'; //计划暂停
        }else if(items.type=="finish"){
        	var url = '/depot/business/plan/finish';  //计划终止
        }else if(items.type=="contractDiscontinue"){ 
        	var url = '/depot/business/contract/discontinue'; //合同暂停
        }else if(items.type=="contractFinish"){
        	var url = '/depot/business/contract/finish'; //合同终止
        }else if(items.type=="noticeDiscontinue"){
        	var url = '/depot/business/deliveryStorageNotice/discontinue';  //通知单暂停
        }else if(items.type=="noticeFinish"){
        	var url = '/depot/business/deliveryStorageNotice/finish';  //通知单终止
        }
    
    	
    	$http({
	        method: 'POST',
	        url: APP_CONFIG.businessUrl + url,
	        data: {
	            id : items.id,
	            refuseReason : refuseReason
	        }
	    }).then(function successCallback(response) {
	        alert("执行成功！");
	        $scope.cancel();
	    }, function errorCallback(response) {
	        // 请求失败执行代码
	        console.log(response);
	    });
    }
    
    
});