"use strict";

angular.module('app.system').controller("userCtrl",
    function($scope,$stateParams,$rootScope, userService, orgService,roleService, APP_CONFIG) {

        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.search = {username:"", realName:""};
        $scope.loadData = function() {
            /*orgService.getPageInfo(null,null,null,$scope.search.orgName).then(function(data){
                $scope.orglist = data.list;
                var orgIds = new Array();
                angular.forEach($scope.orglist, function(org, index) {
                    orgIds.push(org.orgId);
                });
                userService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.search.username,
                    $scope.search.realName, null, orgIds.join(",")).then(function(data){
                    $scope.pageInfo = data;
                },function(data){
                    console.log(data);
                });
            },function(data){
                console.log(data);
            });*/
        	userService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.search.username,
                $scope.search.realName, null, null).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log(data);
            });
        }
        $scope.loadData();

        // 删除一条记录
        $scope.remove = function(userId) {
            var flag = confirm("确定要删除吗？");
            console.log(flag);
            if (!flag) {
                return;
            }
            userService.deleteUser(userId).then(function(data){
                // 重新加载数据
                $scope.loadData();
            },function(data){
                console.log(data);
            });
        }

        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }

        //获取用户信息
        $rootScope.user=null;
        $scope.update = function(userId) {
            userService.editUser(userId).then(function(data) {
                $rootScope.user = data;
                if($rootScope.user.status == null || $rootScope.user.status == ""){
                	$rootScope.user.status = "1";
                }else{
                	$rootScope.user.status = ""+$rootScope.user.status;
                }
            },function(data) {
                console.log(data);
            });
        }

        //重置密码
        $scope.resetPwd = function(userId) {
            if (confirm("确定要重置此用户的密码？")) {
                userService.resetPwd(userId).then(function(data) {
                    alert("密码重置成功！");
                });
            }
        }

    });

angular.module('app.system').controller("userEditCtrl",
    function($scope, $rootScope, $state, $stateParams, userService, userRoleService, orgService, roleService, FileUploader, APP_CONFIG) {
	if($stateParams.userId == null || $stateParams.userId == ""){//新增的时候默认为库主任
		$scope.user = {status:"1"};
	}else{
		$("#userPwd").hide();//修改时隐藏密码框
	}	
        /*$scope.loadData = function() {
            // 获取用户信息
                userService.editUser($stateParams.userId).then(function(data) {
                    $scope.user = data;
                    console.log($scope.user);
                    // 获取组织数据
                    $scope.depotlist = [];
                    orgService.getPageInfo().then(function(data) {
                        $scope.orglist = data.list;
                    }, function(data) {
                        console.log(data);
                    });
                console.log(data);
            });
        }
        $scope.loadData();*/

        // 选择公司时改变粮库数据
        $scope.changeCompany = function() {
            $scope.depotlist = [];
            $scope.getChildren($scope.parentOrgId);
        }

        // 获取所有下级粮库，递归
        $scope.getChildren = function(parentId) {
            angular.forEach($scope.orglist, function(item, index) {
                if (item.parentId == parentId) {
                    if (item.orgClassId==5318) {
                        $scope.depotlist.push(item);
                    }
                    $scope.getChildren(item.orgId);
                }
            });
        }

        // 通过递归给功能赋等级
        $scope.hasRoleChildren = function(rolelist, roleId) {
            var flag = false;
            angular.forEach(rolelist, function(item, index) {
                if (item.parentId == roleId) {
                    flag = true;
                }
            })
            return flag;
        }

        $rootScope.userRoleIds=[];
        // 提交表单
        var validator = $("#user-form").validate({
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
        $scope.save = function() {
        	if($scope.user.orgId == null || $scope.user.orgId == ""){
        		alert("请选择机构！");
        		return false;
        	}
            if (validator.form()) {
                // 组织编号
                if ($scope.user.orgId == null || $scope.user.orgId == '') {
                    $scope.user.orgId = $scope.parentOrgId;
                }
                $scope.userOrg=angular.fromJson($scope.user.orgId);
                $scope.userRole=angular.fromJson($scope.userRole.roleIds);
                for (var s = 0; s < $scope.userRole.length; s++) {
                    $scope.userRoleId=$scope.userRole[s].id;
                    $scope.userRoleIds.push($scope.userRoleId);
                }//console.log($scope.userRoleIds);
                $scope.user.orgId=$scope.userOrg[0].id;
                if($stateParams.userId == null || $stateParams.userId == ""){
                	$scope.user.password = md5($scope.user.password);
                }
                userService.saveUser($scope.user,$scope.userRoleIds).then(function(data) {
                    alert("保存成功！");
                    // 跳转到列表页
                    $state.go("app.system.user");
                }, function(data) {
                    console.log(data);
                });
            }
        }

        // 文件上传实例
        $scope.uploader = new FileUploader({
            url : APP_CONFIG.basicUrl + '/fileUpload/uploadFile',
            autoUpload : true, // 将文件添加到队列后自动上传
            formData : [{fileType:'image'}], // 与文件一起发送的数据
            removeAfterUpload : true, // 从队列上传后删除文件
            // 上传进度
            onProgressItem : function(fileItem, progress) {
                console.info("正在上传：" + progress + "%");
            },
            // 回调函数，在一个文件上传成功后触发
            onSuccessItem : function(fileItem, response, status, headers) {
                var nextDiv = document.activeElement.parentNode.nextSibling;
                $scope.user[nextDiv.name] = response;
            }
        });

        // 自定义验证，验证用户名是否可用
        $.validator.addMethod("validUsername", function(value, element) {
            var result = false;
            // 设置同步
            $.ajaxSetup({
                async: false
            });
            var param = {
                userId : $scope.user.userId,
                username : $scope.user.username
            };
            $.get(APP_CONFIG.systemUrl + '/userInfo/validUsername', param, function(data){
                result = data;
            });
            // 恢复异步
            $.ajaxSetup({
                async: true
            });
            return result;
        }, "用户名已被使用，请重新输入");
        
        // 自定义验证，验证手机号是否可用
        $scope.validPhone = function(){
        	if((/^1[3456789]\d{9}$/.test($scope.user.mobile))){ 
        		userService.validPhone($scope.user.mobile,$scope.user.userId).then(function(data) {
	        		if(data){
	        			$scope.user.mobile = "";
	        			alert("手机号已被使用，请重新输入");
	        		}
        		});
            }else{
            	$scope.user.mobile = "";
    			alert("手机号码有误，请重新输入");
            }
        }
        
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
        
        //下拉框(所属组织)
        $rootScope.data1 = [];
        $scope.getOrgData=function() {
            orgService.getTreeListByOrgId().then(function(data) {
                $scope.orglist = data.orgList;
                //console.log(data.orgList);
                $scope.orgId = data.orgId;//console.log(data.orgId);
                for (var i = 0; i < $scope.orglist.length; i++) {
                    if ($scope.orglist[i].id == $scope.orgId) {
                        // 当前为根.
                        var obj = {
                            id: $scope.orglist[i].id,
                            name: $scope.orglist[i].name,
                            children: [],

                        };
                        if($rootScope.user!=null && $scope.orgId==$rootScope.user.orgId){
                            obj.selected=true;
                        }
                        //console.log($scope.orglist);
                        //console.log($scope.orglist.length);
                        for (var j = 0; j < $scope.orglist.length; j++) {
                            //console.log($scope.orglist[j].parentId);
                            if ($scope.orglist[j].parentId == $scope.orgId) {
                                var obj2 = {
                                    id: $scope.orglist[j].id,
                                    name: $scope.orglist[j].name,
                                    children: [],
                                };
                                if($rootScope.user!=null && $scope.orglist[j].id==$rootScope.user.orgId){
                                    obj2.selected=true;
                                }
                                obj.children.push(obj2);
                                $scope.getChildrens(obj2, $scope.orglist[j].id, $scope.orglist);
                            }
                        }

                        $scope.data1.push(obj);
                        break;
                    }
                }
                $scope.data2 = angular.copy($scope.data1);
            },function(data){
                console.log(data);
            });
        }
        $scope.getOrgData();
        $scope.getChildrens = function(obj, id, orglist) {
            for (var j = 0; j < orglist.length; j++) {
                if (orglist[j].parentId == id) {
                    var obj2 = {
                        id: orglist[j].id,
                        name: orglist[j].name,
                        children: [],
                    };
                    if($rootScope.user!=null && orglist[j].id==$rootScope.user.orgId){
                        obj2.selected=true;
                    }
                    obj.children.push(obj2);
                    $scope.getChildrens(obj2, orglist[j].id, orglist);
                }
            }
        }
        
        $scope.selectOnly = function(item, selectedItems) {
        	$scope.getRoleData(item.id);
        	if (selectedItems  !== undefined && selectedItems.length >= 20) {
        		return false;
        	} else {
        		return true;
        	}
        };
        
        $scope.selectOnly1Or2 = function(item, selectedItems) {
        	if (selectedItems  !== undefined && selectedItems.length >= 20) {
        		return false;
        	} else {
        		return true;
        	}
        };

        //树形下拉框(角色)
        $scope.getRoleData=function(orgId) {
        	$rootScope.data3 = [];
            roleService.getRoleTreeByOrg(orgId).then(function(data) {
                $scope.rolelist = data.roleList;
                //console.log($scope.rolelist);
                $scope.roleId = data.roleId;
                for (var i = 0; i < $scope.rolelist.length; i++) {
                    if ($scope.rolelist[i].parentId == $scope.roleId) {
                        // 当前为根.
                        var obj = {
                            id: $scope.rolelist[i].id,
                            name: $scope.rolelist[i].name,
                            children: []
                        };
                        if($rootScope.user!=null){
                            for (var s = 0; s < $rootScope.user.roleIds.length; s++) {
                                if($scope.rolelist[i].id==$rootScope.user.roleIds[s]){
                                    obj.selected=true;
                                }
                            }
                        }
                        //console.log(obj);
                        //console.log($scope.enumlist.length);
                        for (var j = 0; j < $scope.rolelist.length; j++) {
                            //console.log($scope.enumlist[j].parentid);
                            if ($scope.rolelist[j].parentId == $scope.rolelist[i].id) {
                                var obj2 = {
                                    id: $scope.rolelist[j].id,
                                    name: $scope.rolelist[j].name,
                                    children: []
                                };
                                if($rootScope.user!=null){
                                    for (var s = 0; s < $rootScope.user.roleIds.length; s++) {
                                        //console.log($rootScope.user.roleIds[s]);
                                        if($scope.rolelist[j].id==$rootScope.user.roleIds[s]){
                                            obj2.selected=true;
                                        }
                                    }
                                }
                                obj.children.push(obj2);//console.log(obj2);
                                $scope.getChildren(obj2, $scope.rolelist[j].id, $scope.rolelist);
                            }
                        }
                        $scope.data3.push(obj);
                        //console.log($scope.data1);
                    }
                }
                $scope.data4 = angular.copy($scope.data3);
            },function(data){
                console.log(data);
            });
        }
        
        $scope.getRoleData($rootScope.userInfo.orgId);//默认展示当前单位的角色
        $scope.getChildren = function(obj, id, rolelist) {
            for (var j = 0; j < rolelist.length; j++) {
                if (rolelist[j].parentId == id) {
                    var obj2 = {
                        id: rolelist[j].id,
                        name: rolelist[j].name,
                        children: []
                    };
                    if($rootScope.user!=null){
                        for (var s = 0; s < $rootScope.user.roleIds.length; s++) {
                            if(id==$rootScope.user.roleIds[s]){
                                obj2.selected=true;
                            }
                        }
                    }
                    obj.children.push(obj2);
                    $scope.getChildren(obj2, rolelist[j].id, rolelist);
                }
            }
        }

        //返回和取消
        $scope.back = function() {
            if ($rootScope.previousState_name != '') {
                $rootScope.back();
            } else {
                $state.go("app.system.user");
            }
        }
    });

angular.module('app.system').controller("userLoginCtrl",
    function($scope, $rootScope, $state, $location, $stateParams, userService, powerService, permissions, APP_CONFIG) {
		var loginType;//默认是账号登录
		var sendState = 0;//消息发送状态，默认未发送
		$scope.onload = function () {
	        var readTime = new Date().getTime();
	        userService.getCode(16, 70, 30, readTime).then(function(data) {
	        	var image = "data:image/jpg;base64," + data.file;
	            //document.getElementById("validateCode").src = appConfig.systemUrl + "/" + data.file + "?"+new Date().getTime();
	            document.getElementById("validateCode").src = image;
	        }, function(data) {
	            console.log(data);
	        });
	    };
	    
	    var timers;
	    $scope.sendMsg = function(){
	    	if ($scope.username == null || $scope.username == "") {
                alert("请输入用户名！");
                return false;
            }
        	userService.queryPhoneByusername($scope.username).then(function(data) {
        		if(data.phone != null && data.phone != ""){
        			if(sendState == 0){
    	        		userService.sendMsg(data.phone).then(function(data) {
    	        			if(data.status){
    	        				alert("短信发送成功！");
    	        				sendState = 1;
    	        				var time=60;
    	        				$("input[name='sendMsg']").val(time+ '秒');
    	        				timers=setInterval(function(){
    	        					time--;
    	        					if(time <= 0){
    	        						time=0;
    	        						$("input[name='sendMsg']").val('发送验证码');
    	        						clearInterval(timers);
    	        						sendState = 0;
    	        						return false;
    	        					}
    	        					$("input[name='sendMsg']").val(time+ '秒');
    	        				},1000)
    	        				
    	        			}else{
    	        				alert("短信发送失败！");
    	        			}
    	        		});
    	        	}
        		}else{
        			alert("该用户手机号不存在，请完善信息！");
        		}
        	});
	        		
	    }

        //回车登录功能开关
        $scope.isLogin = true; //默认开着

        // 设置为false,下次再因为session超时还会提示，登录超时提示！
        $rootScope.isSessionOverTime = false;
        // 提交表单
        var validator = $("#login-form").validate();
        $scope.login = function() {
            if (validator.form()) {
        		if ($scope.username == null || $scope.username == "") {
                    alert("请输入用户名！");
                    return false;
                } 
        		if ($scope.password == null || $scope.password == "") {
                    alert("请输入密码！");
                    return false;
                }
        		/*if ($scope.verifyCode == null || $scope.verifyCode == "") {
                    alert("请输入手机验证码！");
                    return false;
                }*/
                if ($scope.yzm == undefined) {
                    alert("请输入验证码！");
                    return false;
                }
                userService.login($scope.username, $scope.password, $scope.yzm, null, loginType,$scope.verifyCode).then(function(data) {
                    if (data.status == true) {
                    	clearInterval(timers);//登录成功删除倒计时
                    	userRoleType = data.userInfo.status;
                        permissions.getLoginInfo();
                        // 获取权限后再跳转
                        powerService.getFuncByUserId().then(function(data) {
                            hasFuncList = data;
                            sessionStorage.setItem("hasFuncList", angular.toJson(data));
                            powerService.getButtonByUserId().then(function(data) {
                                permissionList = data;
                                sessionStorage.setItem("permissionList", angular.toJson(data));
                                if($stateParams.emergency){
                                    $state.go("app.system.emergencyJump");
                                }else if(!$stateParams.emergency){
                                	if(userRoleType == "2"){//经营人员
                                		$state.go("app.additionalHome.businessHome");
                                	}else if(userRoleType == "3"){//仓储人员
                                		$state.go("app.additionalHome.storageHome");
                                	}else if(userRoleType == "4"){//质检人员
                                		$state.go("app.additionalHome.qualityCheckHome");
                                	}else if(userRoleType == "5"){//保卫人员
                                		$state.go("app.additionalHome.defendHome");
                                	}else if(userRoleType == "6"){//中转人员
                                		$state.go("app.additionalHome.transferHome");
                                	}else{
                                		$state.go("app.dashboard");
                                	}
                                }
                            })
                        })
                        $scope.isLogin = false; //关闭回车登录开关
                    } else {
                        alert(data.success);
                        $scope.onload();
                    }
                }, function(data) {
                    console.log(data);
                });
            }
        };
        // 回车登录
        $(document).keydown(function(e){
            if(e.keyCode == 13) {
                if ($scope.isLogin) {
                	$("button[type='button']").click();
                    //$scope.login();容易出现获取不到用户名但登录成功
                }
            }
        });
        //重置
        $scope.reset = function(){
        	$scope.username = "";
        	$scope.password = "";
        	$scope.verifyCode = "";
        	$scope.yzm = "";
        }

        $scope.onload();
    });

angular.module('app.system').controller("pwdCtrl",
    function($scope, $rootScope, userService, APP_CONFIG) {
		//验证密码强度
		var lv = 0;
		$scope.qdyz = function(){
			lv = 0;
			var aLvTxt = ['','低','中','高'];
			var val = $("#newPassword").val();
			if(val.match(/[A-Za-z]/g)){lv++;}
    		if(val.match(/[0-9]/g)){lv++;}
    		if(val.match(/(.[^A-Za-z0-9])/g)){lv++;}
			if(val.length < 7){lv=0;}
			if(lv > 3){lv=3;}
			$("#passStrength").removeClass().addClass("strengthLv"+lv).html(aLvTxt[lv]);
		}
		
        // 自定义验证，验证原密码是否正确
        $.validator.addMethod("validPassword", function(value, element) {
            var result = false;
            // 设置同步
            $.ajaxSetup({
                async: false
            });
            var param = {
                oldPassword : value
            };
            $.get(APP_CONFIG.systemUrl + '/userInfo/validPassword', param, function(data){
                result = data;
            });
            // 恢复异步
            $.ajaxSetup({
                async: true
            });
            return result;
        }, "原密码错误，请重新输入");

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
        		if(lv==3){
	                userService.modifyPwd($scope.oldPassword, $scope.newPassword).then(function(data) {
	                    if (data != null) {
	                        $rootScope.userInfo = data;
	                        alert("修改成功！");
	                        $scope.oldPassword = "";
	                        $scope.newPassword = "";
	                        $scope.newPassword1 = "";
	                    }
	                }, function(data) {
	                    console.log(data);
	                });
        		}else{
        			alert("密码强度过低！");
        		}
        	}
        }

    })
    .controller("emergencyTerminal", function($scope,$state,$rootScope) {
        $scope.submit = function() {
            setTimeout(function(){
                //去除头信息
                $("#header").css("display", "none");
                //去除左侧信息
                $("#left-panel").css("display", "none");
                $("#ribbon").css("display", "none");
                $("#main").css("margin-left", "0px").css("margin-top", "0px");
                $(".page-footer").css("display", "none").css("height", "0px");
            },80);

            //配置出入库连接
            if(displayType == 1){
                userService.forTheConnection().then(function(data) {
                    var forTheConnection = data.forTheConnection;
                    var RemoteLogin = data.RemoteLogin;
                    $scope.forTheConnections = forTheConnection + "?name="+$rootScope.userInfo.username+"&psw="+$rootScope.userInfo.password+"&RemoteLogin="+RemoteLogin+"&isgetMd5=1";
                }, function(data) {
                    console.log(data);
                });
            }else{
                $scope.forTheConnections = location.protocol+"//"+location.host + "/Base/Login_checkLogin.action?name=" + $rootScope.userInfo.username + "&psw=" + $rootScope.userInfo.password + "&RemoteLogin=false&isgetMd5=1";
            }
        };

        $scope.crk = function(){
            var url = $scope.forTheConnections;
            var sheight = screen.height-70;
            var swidth = screen.width-10;
            var winoption ="dialogHeight:"+sheight+"px;dialogWidth:"+ swidth +"px;status:no;scroll:no;resizable:yes;center:no;minimize:yes;maximize:yes;location:no";
            try {
                window.showModalDialog(url,window,winoption);
            }catch(e){
                var win = window.open(url, "_blank", "toolbar=no, menubar=no, scrollbars=no, resizable=yes, location=no, status=no,fullscreen=yes");
            }
        };

        $scope.jumpGo = function() {
            if (!$("#menu-218").hasClass('open')) {
                $("#menu-218").smartCollapseToggle();
            }

            $("#header").css("display", "block");
            $("#left-panel").css("display", "block");
            $("#ribbon").css("display", "block");
            $("#main").css("margin-left", "").css("margin-top", "70px");
            $(".page-footer").css("display", "block").css("height", "28px");

            $state.go("app.intelligent.index");

            $rootScope.childSysId = 218;
            sessionStorage.setItem("childSysId", 218);
        };
        $scope.submit();
    });

angular.module('app.system').controller("dockingCtrl",
    function($scope,$rootScope,$stateParams) {

        if($rootScope.userInfo.orgId === 163){
            $scope.username = 'sj_user_163';
        }else if($rootScope.userInfo.orgId === 169){
            $scope.username = 'sj_user_169';
        }else{
            alert("只有昆明和昆南可以查看")
        }
        $scope.dockingSrc = '';

        if($stateParams.type === "1"){
            $scope.dockingSrc  = "http://172.16.2.10:88/BI/showreport.do?id="+ $scope.username + "&pw=%7B" +$rootScope.userInfo.password +"%7D&showmenu=false&showparams=false&resid=EBI$12$S9O3X60M67NL9CU9LQU49BTUML9N1K6Q$1$VR39FJEQ6VMSMWTRUPPM9MK1SCRCVLWL.rpttpl&calcnow=true&@lkmc="+$rootScope.depotInfo.creditCode;
        }else if($stateParams.type === "2"){
            $scope.dockingSrc  = "http://172.16.2.10:88/BI/showreport.do?id="+ $scope.username + "&pw=%7B" +$rootScope.userInfo.password +"%7D&showmenu=false&showparams=false&resid=EBI$12$S9O3X60M67NL9CU9LQU49BTUML9N1K6Q$1$UKRNKI4NWUR8MTMK7SSYUU0LQUKU4S0M.rpttpl&calcnow=true&@lkmc="+$rootScope.depotInfo.creditCode;
        }else if($stateParams.type === "3"){
            $scope.dockingSrc  = "http://172.16.2.10:88/BI/showreport.do?id="+ $scope.username + "&pw=%7B" +$rootScope.userInfo.password +"%7D&showmenu=false&showparams=false&resid=EBI$12$S9O3X60M67NL9CU9LQU49BTUML9N1K6Q$1$UPLNML43WU484TMPDSS68O92CUPUUUYV.rpttpl&calcnow=true&@lkmc="+$rootScope.depotInfo.creditCode;
        }
        $("#dockingId").attr("src",$scope.dockingSrc);

    });
