"use strict";

angular.module('app.system').controller("resetPwdCtrl", 
		function($scope, $rootScope, userService, APP_CONFIG) {
	
	userService.getUserInfo(null, null).then(function(data){
		var dataList = new Array();
        for(var i=0;i<data.list.length;i++){
        	var map = data.list[i];
        	map.realName = map.realName + "("+map.username+")";
        	dataList[i] = map;
        }
        $scope.userInfoList = dataList;
    },function(data){
        console.log(data);
    });
	
	// 自定义验证，验证用户密码是否满足正则
    $.validator.addMethod("validUsePwd", function(value, element) {
    	var result = false;
    	var lv = 0;
		var aLvTxt = ['','低','中','高'];
		var val = $("#newPassword").val();
		if(val.match(/[A-Za-z]/g)){lv++;}
		if(val.match(/[0-9]/g)){lv++;}
		if(val.match(/(.[^A-Za-z0-9])/g)){lv++;}
		if(val.length < 7){lv=0;}
		if(lv > 3){lv=3;}
    	if(lv >= 3){
    		result = true;
    	}
		return result;
    }, "密码不满足大小写字母+数字+特殊字符");

    // 提交表单
    var validator = $("#pwd-form").validate({
        rules: {
            newPassword1 : {
                equalTo: "#newPassword"
            }
        },
        messages: {
            newPassword1 : {
                equalTo: "两次输入的密码不一致！"
            }
        }

    });
    $scope.submit = function() {
    	if (validator.form()) {
    		//重置密码
            userService.resetPwd($scope.userId,md5($scope.newPassword)).then(function(data) {
            	$scope.newPassword = "";
                $scope.newPassword1 = "";
                alert("密码重置成功！");
            }, function(data) {
                console.log(data);
            });
    		
    	}
    }
	 
});

