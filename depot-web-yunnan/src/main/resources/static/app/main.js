'use strict';

$.sound_path = appConfig.sound_path;
$.sound_on = appConfig.sound_on;

var permissionList = []; 
var hasFuncList = [];
var enumData = [];
var userInfoMapData = [];
var localOrCloud;
var displayType;
var userRoleType;//人员角色类型，登录进来进入不同的首页（1:库主任 2:经营人员 3:仓储人员 4:质检人员 5:保卫人员 6:中转人员）

$(function () {

    // moment.js default language
    moment.locale('en')
    
    // 在angular启动前获取权限和字典数据
    /*$.get(appConfig.systemUrl+"/roleFunc/getFuncByUserId", function(data) {
    	hasFuncList = data;
        $.get(appConfig.systemUrl+"/roleButton/getByUser", function(data) {
        	permissionList = data;
        	
        	// 用户id与用户姓名map.
        	userInfoMapData = angular.fromJson(sessionStorage.getItem("userInfoMapData"));
        	if (!userInfoMapData) {
        		$.get(appConfig.systemUrl+"/userInfo/findAllUserMapByOrgId", function(data) {
        			userInfoMapData = data;
        			sessionStorage.setItem("userInfoMapData", angular.toJson(data));
        		})
        	}*/
        	
    		hasFuncList = angular.fromJson(sessionStorage.getItem("hasFuncList"));//在登录的时候存到本地session缓存里
    		permissionList = angular.fromJson(sessionStorage.getItem("permissionList"));//在登录的时候存到本地session缓存里
        	enumData = angular.fromJson(sessionStorage.getItem("enumData"));
        	if (!enumData) {
                $.get(appConfig.basicUrl+"/Enum/findEnumObj", function(data) {
                	enumData = data;
                	sessionStorage.setItem("enumData", angular.toJson(data));
                    angular.bootstrap(document, ['app']);
                })
        	} else {
                angular.bootstrap(document, ['app']);
        	}
        /*})
    })*/
 
});
