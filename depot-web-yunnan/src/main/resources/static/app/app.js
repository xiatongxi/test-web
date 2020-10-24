'use strict';

/**
 * @ngdoc overview
 * @name app [smartadminApp]
 * @description
 * # app [smartadminApp]
 *
 * Main module of the application.
 */

angular.module('app', [
    'ngSanitize',
    'ngAnimate',
    'restangular',
    'ui.router',
    'ui.bootstrap',

    // Smartadmin Angular Common Module
    'SmartAdmin',

    // App
    'app.agile',
    'app.auth',
    'app.layout',
    'app.chat',
    'app.dashboard',
    'app.calendar',
    'app.inbox',
    'app.graphs',
    'app.tables',
    'app.forms',
    'app.ui',
    'app.widgets',
    'app.maps',
    'app.appViews',
    'app.misc',
    'app.smartAdmin',
    'app.eCommerce',
    'angularFileUpload',
    'app.system',
    'app.business',
    'app.basic',
    'app.camera',
    'app.nvr',
    'app.act',
    'app.task',
    'app.process',
   // 'app.qualitycheck',
    'app.alert',
    'app.supervise',
    'app.cameraRecord',
    'app.alarm',
   // 'app.safeproduce',
    //'app.foodbasicinfo',
    'app.qualityDlag',
    'app.cameraGroup',
    //'app.storehouse',
  //  'app.keeper',
    'app.cameraSetting',
  //  'app.payment',
    'app.storage',
    'app.numbermanage',
    'app.synth',
    'multi-select-tree',
    'app.dynamicForm',
    'app.intelligent',
    'app.log',
    'app.additionalHome'
])


.config(function ($provide, $httpProvider, RestangularProvider) {
    // Intercept http calls.
    $provide.factory('ErrorHttpInterceptor', function ($q) {
        var errorCounter = 0;
        function notifyError(rejection) {
        	if (rejection.status == 601) {
    			$.bigBox({
                    title: rejection.status + ' ' + rejection.statusText,
                    content: "登录超时，请重新登录！",
                    color: "#C46A69",
                    icon: "fa fa-warning shake animated",
                    timeout: 6000
                });
        	} else {
        		$.bigBox({
        			title: rejection.status + ' ' + rejection.statusText,
        			content: rejection.data,
        			color: "#C46A69",
        			icon: "fa fa-warning shake animated",
        			number: ++errorCounter,
        			timeout: 6000
        		});
        	}
        }
        return {
            // On request failure
            requestError: function (rejection) {
                // show notification
                notifyError(rejection);

                // Return the promise rejection.
                return $q.reject(rejection);
            },

            // On response failure
            responseError: function (rejection) {
                // show notification
            	if (rejection.status != 601) {
            		// 如果是登录超时，就不报错.
            		notifyError(rejection);
            	}
                // Return the promise rejection.
                return $q.reject(rejection);
            }
        };
    });

    // Add the interceptor to the $httpProvider.
    $httpProvider.interceptors.push('ErrorHttpInterceptor');
    // 增加http拦截器.
    $httpProvider.interceptors.push('httpInterceptor'); 

    RestangularProvider.setBaseUrl(location.pathname.replace(/[^\/]+?$/, ''));
    
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
    	return angular.isObject(data) && String(data) !== '[object File]' ? $.param(data) : data;
    }];
    
    //$httpProvider.defaults.withCredentials = true;跨越session失效

    // 默认表单验证参数
    $.validator.setDefaults({
        errorElement: 'em',
        errorClass: 'invalid',
        highlight: function(element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
            $(element).parent().addClass('state-error').removeClass('state-success');

        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass(errorClass).addClass(validClass);
            $(element).parent().removeClass('state-error').addClass('state-success');
        },
        errorPlacement : function(error, element) {
            error.insertAfter(element.parent());
        }
    })
     
    // 默认日期控件参数
	$.extend($.datepicker.regional, {  
        'zh-CN' : {  
            closeText: '关闭',  
            prevText: '<',  
            nextText: '>',  
            currentText: '今天',  
            monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],  
            monthNamesShort: ['一','二','三','四','五','六','七','八','九','十','十一','十二'],  
            dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],  
            dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],  
            dayNamesMin: ['日','一','二','三','四','五','六'],  
            weekHeader: '周',  
            dateFormat: 'yy-mm-dd',  
            firstDay: 0,  
            isRTL: false,  
            showMonthAfterYear: true,  
            yearSuffix: '年'  
        }  
    });  
    $.datepicker.setDefaults($.datepicker.regional['zh-CN']); 

	
	$.DateTimePicker.i18n["zh-CN"] = $.extend($.DateTimePicker.i18n["zh-CN"], {

        language: "zh-CN",
        labels: {
            'year': '年',
            'month': '月',
            'day': '日',
            'hour': '时',
            'minutes': '分',
            'seconds': '秒',
            'meridiem': '午'
        },
        dateTimeFormat: "yyyy-MM-dd HH:mm",
        dateFormat: "yyyy-MM-dd",
        timeFormat: "HH:mm",

        shortDayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        fullDayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        shortMonthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        fullMonthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],

        titleContentDate: "设置日期",
        titleContentTime: "设置时间",
        titleContentDateTime: "设置日期和时间",

        setButtonContent: "设置",
        clearButtonContent: "清除",
        formatHumanDate: function (oDate, sMode, sFormat) {
            if (sMode === "date")
                return  oDate.dayShort + ", " + oDate.yyyy + "年" +  oDate.month +"月" + oDate.dd + "日";
            else if (sMode === "time")
                return oDate.HH + "时" + oDate.mm + "分" + oDate.ss + "秒";
            else if (sMode === "datetime")
                return oDate.dayShort + ", " + oDate.yyyy + "年" +  oDate.month +"月" + oDate.dd + "日 " + oDate.HH + "时" + oDate.mm + "分";
        }
    });
	$.DateTimePicker.defaults.language = 'zh-CN', //指定中文
	
	String.prototype.replaceAll = function(s1,s2){    
		return this.replace(new RegExp(s1,"gm"),s2);    
	}

})
.constant('APP_CONFIG', window.appConfig)

.run(function ($rootScope, $state, $stateParams,
		permissions, enumService, userService) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.baseUrl = window.appConfig.baseUrl;
    // editableOptions.theme = 'bs3';
    // 前置监听器.
    $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {
    			//处理路由跳转时，海康视频插件没有自动关闭
		    	if ($rootScope.webCtrl != null){
		    		$rootScope.webCtrl.JS_HideWnd();   // 先让窗口隐藏，规避可能的插件窗口滞后于浏览器消失问题 
		    		$rootScope.webCtrl.JS_Disconnect().then(function(){  // 断开与插件服务连接成功
		    		}, 
		    		function() {  // 断开与插件服务连接失败
		    		});
		        }
		    	
    			// 如果路由地址是userLogin，判断是否已经登录，已经登录了就跳到首页.
                if (toState.name == "userLogin") {
                	// 通过java后台方法来判断是否超时，因为通过刷新页面跳转到登录页的，$rootScope中不一定会有userInfo信息.
                	userService.getLoginInfo().then(function(data) {
        				if (data.userInfo != null) {
                            $rootScope.userInfo = data.userInfo;
                            $rootScope.orgInfo = data.orgInfo;
                            $rootScope.depotInfo = data.depotInfo;
                            $rootScope.depotId = data.depotId;
                        }
                		if ($rootScope.userInfo != null) {
                			userRoleType = $rootScope.userInfo.status;
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
                			event.preventDefault();
                		}
                	});
                }else if (toState.name != "emergencyLogin" && window.location.hash.indexOf('#/province') == -1){//其它路由时（排除应急端登录和省级跳转路由）判断用户信息是否失效了，失效了就跳转登录界面
                	// 通过浏览器刷新时，由于后台查询的速度限制，导致$rootScope.userInfo不一定有信息，所以通过前端获取session里的信息
                	if ($rootScope.userInfo == null) {
    		    		$rootScope.userInfo = "<%=session.getAttribute('userInfo')%>"; 
    		    		$rootScope.orgInfo = "<%=session.getAttribute('orgInfo')%>"; 
    		    		$rootScope.depotInfo = "<%=session.getAttribute('depotInfo')%>"; 
    		    		$rootScope.depotId = "<%=session.getAttribute('depotId')%>"; 
    		    	}
                	
                	// 通过java后台方法来判断是否超时，因为通过刷新页面跳转到登录页的，$rootScope中不一定会有userInfo信息.
                	userService.getLoginInfo().then(function(data) {
        				if (data.userInfo != null) {
                            $rootScope.userInfo = data.userInfo;
                            $rootScope.orgInfo = data.orgInfo;
                            $rootScope.depotInfo = data.depotInfo;
                            $rootScope.depotId = data.depotId;
                        }else{
                        	$rootScope.userInfo = null;
                        	$rootScope.orgInfo = null;
                        	$rootScope.depotInfo = null;
                        	$rootScope.depotId = null;
                        	$state.go("userLogin");
                        }
                	});
                }
    })
    $rootScope.$on("$stateChangeSuccess",  function(event, toState, toParams, fromState, fromParams) {
        // to be used for back button //won't work when page is reloaded.  
        $rootScope.previousState_name = fromState.name;  
        $rootScope.previousState_params = fromParams;  
    	if ($state.current.url!='/dashboard' && $state.current.url.indexOf("/additionalHome") == -1) {
    		$rootScope.isIndexPage = false;
    	}
    });  
    //back button function called from back button's ng-click="back()"  
    $rootScope.back = function() {//实现返回的函数  
        $state.go($rootScope.previousState_name,$rootScope.previousState_params);  
    };  
    
    // 字典数据
	$rootScope.dicDataList = enumData.parentMap;
	$rootScope.dicData = enumData.enumMap;
	
	// 用户id 用户姓名 对应数据map.
	$rootScope.userInfoData = userInfoMapData;
    
    // 取权限数据
    permissions.setPermissions(permissionList);

    /*if (window.location.hash == '') {
    	// 为空的情况下，也不用调用getLoginInfo方法.
    } else */if (window.location.hash != null && ((window.location.hash == '#/userLogin') || (window.location.hash.indexOf('#/province') != -1))) {
        // 如果是#/userLogin，就不调用getLoginInfo方法.
    } else if (window.location.hash != null && (window.location.port === '9028')){
		if((window.location.hash === '#/emergencyLogin') || (window.location.hash == "")){
			location.hash = '#/emergencyLogin';
		}      
    } else {
        permissions.getLoginInfo();
    }
    
    //把当前连接添加到信任站点
	var hostname = window.location.hostname;
	try {
		var WshShell=null;
		WshShell = new ActiveXObject("WScript.Shell");
		var str = [];  
		for(var i = 1;i < 2000;i++){ //循环注册表
	    	try{
	    		str[i] = WshShell.RegRead("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Ranges\\Range" + i + "\\:Range");
	    	}catch(e){
		  	}
		}
		var count = false; 
		for(var i = 1;i < str.length;i++){  //循环与ip比较
		    if(str[i] == undefined){
		    	continue;
		    }else{
	    	    if(str[i] == hostname){
	    	    	count = true;
	    	    	break;
	    		}
			}
		}
		if(!count){// 添加信任站点
			WshShell=new ActiveXObject("WScript.Shell");
			var num=108;
			WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Ranges\\Range"+num+"\\","");
			WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Ranges\\Range"+num+"\\http","2","REG_DWORD");
			WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Ranges\\Range"+num+"\\:Range",""+hostname+"");
			/*WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Ranges\\Range"+(num+1)+"\\","");
			WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Ranges\\Range"+(num+1)+"\\https","2","REG_DWORD");
			WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Ranges\\Range"+(num+1)+"\\:Range",""+hostname+"");*/
			//修改IE ActiveX安全设置
			WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\Zones\\3\\1001","0","REG_DWORD");
			WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\Zones\\3\\1004","0","REG_DWORD");
			WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\Zones\\3\\1200","0","REG_DWORD");
			WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\Zones\\3\\1201","0","REG_DWORD");
	        WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\Zones\\3\\1405","0","REG_DWORD");
	        WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\Zones\\3\\2201","0","REG_DWORD");
	        WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\Zones\\3\\1609","0","REG_DWORD");
	        WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\Zones\\3\\1A04","0","REG_DWORD");
	        WshShell.RegWrite("HKCU\\Software\\Microsoft\\Internet Explorer\\New Windows\\PopupMgr","no");
			if(confirm("浏览器初始化成功，请重新打开浏览器！")){
				window.close();
			}
		}
	} catch (e) {
		
	}
    
})


.factory('permissions', function ($rootScope, $state, powerService, roleService, userService, StorehouseService,WareHouseBasicInfoService,basicStationSetService,basicStationTypeService,warehouseService,agentTemperatureService,agentStorehouseService) {
	return {
	    // 获取用户登录信息
		getLoginInfo: function() {
			userService.getLoginInfo().then(function(data) {
				// 如用户信息为空，跳转到登录页
				if (!data.userInfo) {
					//$state.go("userLogin");
				} else {
                    // 当前登录用户
                    $rootScope.userInfo = data.userInfo;
                    // 当前用户所属组织
                    $rootScope.orgInfo = data.orgInfo;
                    // 当前用户所属粮库
                    $rootScope.depotInfo = data.depotInfo;
                    // 当前用户所属粮库编号
                    $rootScope.depotId = data.depotId;
                    //每次刷新都给变量赋值，防止因为刷新丢失
                    userRoleType = $rootScope.userInfo.status;

                    //获取角色列表和角色Map
                    roleService.getRoleTree().then(function(data){
                        $rootScope.rolelist = data.roleList;
                        $rootScope.roleObj = data.roleNameObj;
                    },function(data){
                        console.log(data);
                    });

                    // 获取仓房列表
                    StorehouseService.getStorehouseList($rootScope.orgInfo.orgId, "0").then(function(data){
                        $rootScope.storelist = data.houseList;
                        $rootScope.storehouseObj = data.houseObj;
                        $rootScope.storeHouseCodeObj = data.houseCodeObj;
                    },function(data){
                        console.log(data);
                    });
                    
                    
                    StorehouseService.getStorehouseList($rootScope.orgInfo.orgId, "0").then(function(data){
                        //除去代储仓房的本库仓房  getAgentHouseId
                        agentStorehouseService.getAgentHouseId().then(function(houseIdData){
                        	if(houseIdData!=null && houseIdData.length>0){
                        		for (var i = 0; i < houseIdData.length; i++) {
                        			for (var j = 0; j < data.houseList.length; j++) {
	    								if(houseIdData[i] == data.houseList[j].storehouseId){
	    									data.houseList.splice(j,1);
	    									break;
	    								}
                        			}
    							}
                        		$rootScope.storeAgentlist = data.houseList;
                        	}else{
                        		$rootScope.storeAgentlist = data.houseList;
                        	}
                        },function(houseIdData){
                            console.log(houseIdData);
                        });
                        
                    },function(data){
                        console.log(data);
                    });
                    
                    // 获取货位列表
                    warehouseService.getStorehouse(data.depotId,null, "0").then(function(data){
                    		$rootScope.wareList = data.wareList;
                    		$rootScope.wares = data.wares;
                    },function(data){
                     console.log(data);
                    });
                    
                    
                    warehouseService.getStorehouse(data.depotId,null, "0").then(function(data){
                		//除去代储货位的本库货位  getAgentWareId
                        agentStorehouseService.getAgentWareId().then(function(wareIdData){
                        	if(wareIdData!=null && wareIdData.length>0){
                        		for (var i = 0; i < wareIdData.length; i++) {
                        			for (var j = 0; j < data.wareList.length; j++) {
	    								if(wareIdData[i] == data.wareList[j].warehouseId){
	    									data.wareList.splice(j,1);
	    									break;
	    								}
                        			}
    							}
                        		$rootScope.wareAgentlist = data.wareList;
                        	}else{
                        		$rootScope.wareAgentlist = data.wareList;
                        	}
                        },function(wareIdData){
                            console.log(wareIdData);
                        });
                		
                },function(data){
                 console.log(data);
                });
                    

                    // 获取仓房基本信息
                    WareHouseBasicInfoService.WareHouseBasicInfo(data.orgInfo.orgId, "0").then(function(data){
                        $rootScope.storehouseCode = data.storehouseCode;
                    },function(data){
                        console.log(data);
                    });
                    //获取站点数据信息
                    basicStationSetService.getStations(data).then(function(data){
                        $rootScope.stations = data.data;
                    },function(data){
                        console.log(data);
                    });

                    //获取设备类型数据
                    basicStationTypeService.getBasicStationType(data).then(function(data){
                        $rootScope.stationType = data.data;
                    },function(data){
                        console.log(data);
                    });

                    // 获取代储点仓房基础信息
                    agentTemperatureService.getAgentStoreInfoMap().then(function(data){
                        $rootScope.agentStoreCode = data.agentStoreCode;
                    },function(data){
                        console.log(data);
                    });
                    
                    // 所有用户id与用户姓名map.
            		$.get(appConfig.businessUrl+"/userInfo/findAllUserMapByOrgId", function(data) {
            			$rootScope.userInfoAllData = data;
            		});
            		
            		// 所有组织的id与组织的名称map.
            		$.get(appConfig.businessUrl+"/orgInfo/findAllOrgMap", function(data) {
            			$rootScope.orgInfoAllData = data;
            			console.log(data+".......");
            		});
            		
                    // 用户id与用户姓名map.
            		$.get(appConfig.systemUrl+"/userInfo/findAllUserMapByOrgId", function(data) {
            			userInfoMapData = data;
            			$rootScope.userInfoData = userInfoMapData;
            			sessionStorage.setItem("userInfoMapData", angular.toJson(data));
            		});
            		
            		// 判断当前环境是外网还是库内网
            		$.get(appConfig.systemUrl+"/userInfo/environmentalJudgement", function(data) {
            			localOrCloud = data.localOrCloud;
            			displayType = data.displayType;
            			if(data.depotUrl != null && data.depotUrl != ""){
            				appConfig.intelligentUrl = data.depotUrl;
            			}
            		});
            		
                }
		    })
		},
		setPermissions: function(permissions) {
        	permissionList = permissions;
        	$rootScope.$broadcast('permissionsChanged')
        },
		hasPermission : function(btnId) {
			var flag = false;
			angular.forEach(permissionList, function(item) {
				if (item.btnId == parseInt(btnId)) {
					flag = true;
				}
			})
			return flag;
		},
		// 验证功能权限 
		hasFunc : function(funcId) {
			var flag = false;
			angular.forEach(hasFuncList, function(item) {
				if (item.funcId == parseInt(funcId)) {
					flag = true;
				}
			})
			return flag;
		},
		// 智能仓房按钮权限 
		hasBotton : function(typeId) {
			var flag = false;
			if (parseInt(localOrCloud) == parseInt(typeId)) {
				flag = true;
			}
			return flag;
		}
	};
})

.factory('httpInterceptor',function($q, $injector, $rootScope, APP_CONFIG) {
    var httpInterceptor = {
		'request':function(config){  
			/*var rootScope = $injector.get('$rootScope');
			if (rootScope.userInfo == undefined || rootScope.userInfo == null) {
				//alert("session过期！");
				console.log(config.url + "前台userInfo session过期");
				window.location.href = APP_CONFIG.baseUrl + "#/userLogin";
			}*/
			// 增加httpType属性，后台获取后可判断请求是否来自angular.
			config.headers['httpType'] = "angularJs";  
			return config ||$q.when(config);

		}, 
		'responseError' : function(response) {
	        if (response.status == 401) {
	        	var rootScope = $injector.get('$rootScope'); 
	            var state = $injector.get('$rootScope').$state.current.name; 
	            rootScope.stateBeforLogin = state; 
	            rootScope.$state.go("login"); 
	            return $q.reject(response); 
	        } else if (response.status === 404) {
	            return $q.reject(response); 
	        }  else if (response.status == 601) {
	        	// 设置为true,下次再因为session超时只会提示一次：登录超时，跳转到登录页后，设置false.
	        	if ($rootScope.isSessionOverTime != true) {
	        		$rootScope.isSessionOverTime = true;
	        		$rootScope.userInfo = null;
	        		window.alert("登录超时，请重新登录！");
	        		/*if (confirm("session失效，是否返回登录页面")) { // 弹出框或者选择框.
		        	window.location.href = "#/userLogin";
		        }*/
	        	}
	        	window.location.href = "#/userLogin";
		        return $q.reject(response); 
		    } 
        },
      
        'response' : function(response) {
        	return response; 
        } 
	} 
    return httpInterceptor; 
}); 

