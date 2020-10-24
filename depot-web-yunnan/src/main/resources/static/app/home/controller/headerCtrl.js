"use strict";

angular.module('app.system').controller("headerCtrl", 
		function($scope, $rootScope, $uibModal, userService, selectService, systemLogService, $state) {
	$rootScope.isIndexPage = true;

	//判断是否是应急
	$scope.isEmergency = false;
	if(displayType == 2){
        $scope.isEmergency =  true;
	}
	
	//判断是否是省直属库，true默认不是
	if($rootScope.userInfo.orgId == 163 || $rootScope.userInfo.orgId == 164 || sessionStorage.getItem("isDepot") == "false"){
		sessionStorage.setItem("isDepot", false);
		if($rootScope.userInfo.orgId != null && $rootScope.userInfo.orgId != ""){
			sessionStorage.setItem("depotOrgId", $rootScope.userInfo.orgId);
		}
		$("#isDepot").show();
		if(sessionStorage.getItem("depotOrgId") == "163"){//中转库
			$("#swlk").attr("href","http://172.16.3.41:8087/zz/camera.html"); 
		}else{//昆南库
			$("#swlk").attr("href","http://172.16.3.41:8087/kn/camera.html"); 
		}
	}else{
		sessionStorage.setItem("isDepot", true);
		$("#isDepot").hide();
	}

	if ($state.current.url!='/dashboard' && $state.current.url.indexOf("/additionalHome") == -1) {
		$rootScope.isIndexPage = false;
	}
	$rootScope.childSysId = sessionStorage.getItem("childSysId");
	$("#nav-"+$rootScope.childSysId).click();
	$scope.switchTopMenu = function(funcId, stateName) {
		if (funcId!=null) {
			if (funcId==18) {
				$('body').addClass("minified");
			} else {
				$('body').removeClass("minified");
			}
			if (!$("#menu-"+funcId).hasClass('open')) {
				$("#menu-"+funcId).smartCollapseToggle();
			}
			$state.go(stateName);
		} else {
			$rootScope.isIndexPage = true;
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
		$rootScope.childSysId = funcId;
		sessionStorage.setItem("childSysId", funcId);
	}
	
	// 退出登录
	$scope.exitLogin = function() {
		if (confirm("确定要退出登录吗？")) {
			userService.exitLogin().then(function() {
				// 退出登录，userInfo设置为空.
				$rootScope.userInfo = null;
				if(displayType == 2){
                    $state.go("emergencyLogin");
				}else{
                    $state.go("userLogin");
				}
				sessionStorage.setItem("isDepot", true);
			})
		}
	}
	
	$scope.crk = function(){
		var url = $scope.forTheConnections;
		var sheight = screen.height-70;  
		var swidth = screen.width-10;   
		var winoption ="dialogHeight:"+sheight+"px;dialogWidth:"+ swidth +"px;status:no;scroll:no;resizable:yes;center:no;minimize:yes;maximize:yes;location:no";
		systemLogService.save();//保存跳转出入库日志
		try {
			window.showModalDialog(url,window,winoption); 
		}catch(e){
			var win = window.open(url, "_blank", "toolbar=no, menubar=no, scrollbars=no, resizable=yes, location=no, status=no,fullscreen=yes"); 
		}
		//使用iframe弹出
		//window.open('crkLayer/toCrk.html?param='+url, "_blank", "toolbar=no, menubar=no, scrollbars=no, resizable=yes, status=no");
	};
	
	$scope.preview = function(){
		window.open("pdfJs/web/viewer.html","_blank");
	}
	
	$scope.downApp = function(){
		// 显示弹出层
		$("#appModal").modal("show");
	}

	var topMenuCount = 1;
	//判断是否是省直属库，是的话多加一个菜单
	if(sessionStorage.getItem("isDepot") == "false"){
		topMenuCount += 1;
	}
	angular.forEach(hasFuncList, function(func, index) {
		if (func.parentId == 0) {
            topMenuCount += 1;
		}
	})
	
	if(topMenuCount<8){//头部菜单栏少于8个没有向后翻的箭头
		$(".nav-oper-next").hide();
	}

	$.fn.navslider = function(t) {
		var itemWidth = t.itemWidth,
			navPrev = t.navPrev,
			navNext = t.navNext,
			navItem = t.navItem,
			navShowNum = t.navShowNum;
			
		var itemLen=$(navItem+"> .nav-li").length;
		var carouselWidAdd=itemLen*itemWidth;
		var carouselWid=(itemLen-navShowNum)*itemWidth;
		
		$(navItem).css("width",itemLen*itemWidth);
		$(navPrev).hide();
		var nextLeftVal=0, prevLeftVal=0;
		
		
		var resizeFun = function() {
			var winWid = document.documentElement.clientWidth;
			if(winWid > 1230){
				//carouselWid = (itemLen-8)*itemWidth;
				carouselWid = (topMenuCount-8)*itemWidth;
				if(nextLeftVal > -(itemLen-8)*itemWidth){
					$(navNext).show();
				}else{
					$(navItem).stop().animate({left:-(itemLen-8)*itemWidth+"px"},300);
					nextLeftVal=-(itemLen-8)*itemWidth;
					$(navNext).hide();
				}
			}
			if(winWid < 1230 && winWid > 1000){
				carouselWid = (itemLen-6)*itemWidth;
				if(nextLeftVal > -(itemLen-6)*itemWidth){
					$(navNext).show();
				}else{
					$(navItem).stop().animate({left:-(itemLen-6)*itemWidth+"px"},300);
					nextLeftVal=-(itemLen-6)*itemWidth;
					$(navNext).hide();
				}
			}
			if(winWid < 1000 && winWid > 820){
				carouselWid = (itemLen-4)*itemWidth;
				if(nextLeftVal > -(itemLen-4)*itemWidth){
					$(navNext).show();
				}else{
					$(navItem).stop().animate({left:-(itemLen-4)*itemWidth+"px"},300);
					nextLeftVal=-(itemLen-4)*itemWidth;
					$(navNext).hide();
				}
			}
			if(winWid < 820 && winWid > 720){
				carouselWid = (itemLen-3)*itemWidth;
				if(nextLeftVal > -(itemLen-3)*itemWidth){
					$(navNext).show();
				}else{
					$(navItem).stop().animate({left:-(itemLen-3)*itemWidth+"px"},300);
					nextLeftVal=-(itemLen-3)*itemWidth;
					$(navNext).hide();
				}
			}
			if(winWid < 720){
				carouselWid = (itemLen-2)*itemWidth;
				if(nextLeftVal > -(itemLen-2)*itemWidth){
					$(navNext).show();
				}else{
					$(navNext).hide();
				}
			}
		}
		resizeFun();
		window.onresize = function(){
			resizeFun();
		};

        var forTheConnection = function() {
            //配置出入库连接
        	$rootScope.crk_webserviceip;
            if(displayType == 1){
                userService.forTheConnection().then(function(data) {
                    var forTheConnection = data.forTheConnection;
                    var RemoteLogin = data.RemoteLogin;
                    /* 山西使用
                    if(RemoteLogin == "true"){//代表异地登录
                    	$scope.forTheConnections = location.protocol+"//"+location.host + "/Base/Login_checkLogin.action?name="+$rootScope.userInfo.username+"&psw="+$rootScope.userInfo.password+"&RemoteLogin="+RemoteLogin+"&isgetMd5=1";
                    }else{
                    	$scope.forTheConnections = forTheConnection + "?name="+$rootScope.userInfo.username+"&psw="+$rootScope.userInfo.password+"&RemoteLogin="+RemoteLogin+"&isgetMd5=1";
                    }*/
                    $scope.forTheConnections = forTheConnection + "?name="+$rootScope.userInfo.username+"&psw="+$rootScope.userInfo.password+"&RemoteLogin="+RemoteLogin+"&isgetMd5=1";
                    $rootScope.crk_webserviceip = data.crk_url;
                }, function(data) {
                    console.log(data);
                });
            }else{
                $scope.forTheConnections = location.protocol+"//"+location.host + "/Base/Login_checkLogin.action?name=" + $rootScope.userInfo.username + "&psw=" + $rootScope.userInfo.password + "&RemoteLogin=false&isgetMd5=1";
                $rootScope.crk_webserviceip = location.protocol+"//"+location.host;
            }
        };

        //调用下，配置出入库连接
        forTheConnection();
        
        //财务系统跳转链接
        $scope.financeUrl = "http://172.16.3.49:9101/cwgl/Login_checkLogin.action?name=" + $rootScope.userInfo.username + "&psw=" + $rootScope.userInfo.password + "&isgetMd5=1";

		$(navNext).click(function(){
			nextLeftVal=nextLeftVal-itemWidth;
			prevLeftVal=nextLeftVal;
			if(nextLeftVal > -carouselWidAdd){
				$(navItem).stop().animate({left:nextLeftVal+"px"},300);
				if(nextLeftVal == -carouselWid){
					$(navNext).hide();
				}
				$(navPrev).show();
			}
		});
		$(navPrev).click(function(){
			prevLeftVal=nextLeftVal+itemWidth;
			nextLeftVal=prevLeftVal;
			if(prevLeftVal < itemWidth){
				$(navItem).stop().animate({left:prevLeftVal+"px"},300);
				if(prevLeftVal == 0){
					$(navPrev).hide();
				}
				$(navNext).show();
			}
		});
	}

	$("#navCarousel").navslider({
		navNext: '.nav-next',//next标识
		navPrev: '.nav-prev',//prev标识
		navItem: '.nav-item',//内容外部box标识
		navShowNum: 8,//默认展示个数
        itemWidth: 102//菜单宽度
	});
	
	// 全局alert
	window.alert = function(content) {
		$uibModal.open({    
            size:'xs',  
            templateUrl: 'app/alert/views/alert.html',
            controller: 'alertCtrl',
            backdrop: false,
            resolve: {    
            	content : function() {
            		return content;
            	}
            }  
        }); 
	}
	
	$rootScope.now = new Date();
	 
})

angular.module('app').controller("alertCtrl", 
		function($scope, $uibModalInstance, content, APP_CONFIG) {

	$scope.content = content;
	// 点击确定
	$scope.ok = function() {
		$uibModalInstance.close(); 
	}
	// 取消或关闭
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel'); 
	}
	// 回车确定.
	$(document).keydown(function(e) {
        if (e.keyCode == 13) {
        	$scope.ok();
        }
    });
})
