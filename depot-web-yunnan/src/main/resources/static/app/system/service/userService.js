"use strict";

angular.module('app.system').service("userService", function($http, $q, APP_CONFIG) {

	/**
	 * 初始化验证码
	 */
	this.getCode = function(fontSize, width, heigth, readTime) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/userInfo/getCode',
			params : {
				fontSize : fontSize,
				width : width,
				heigth : heigth,
                readTime : readTime
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}
	
	/**
	 * 查询用户列表
	 */
	this.getPageInfo = function(pageNum, pageSize, username, realName, roleId, orgIds) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/userInfo/getUser',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				username : username,
				realName : realName,
				roleId : roleId,
				orgIds : orgIds
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}
	
	/**
	 * 查询用户列表
	 */
	this.getUserInfo = function(pageNum, pageSize) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/userInfo/getUserInfo',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}
	
	/**
	 * 编辑用户信息，新增或修改
	 */
	this.editUser = function(userId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/userInfo/edit',
			params : {
		    	 userId : userId
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}
	
	/**
	 * 保存用户信息，新增或修改
	 */
	this.saveUser = function(user,userRoleIds) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.systemUrl + '/userInfo/save',
			data : {
				userInfoJson : angular.toJson(user),
				userRoleIds : angular.toJson(userRoleIds)
				//userRoleIds : JSON.stringify(userRoleIds)
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}
	
	/**
	 * 删除用户信息
	 */
	this.deleteUser = function(userId) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.systemUrl + '/userInfo/remove',
			data : {
				userId : userId
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}
	
	/**
	 * 验证用户名是否可用
	 */
	this.validUsername = function(userId, username) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/userInfo/validUsername',
			data : {
				userId : userId,
				username : username
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}
	
	/**
	 * 通过用户名查询手机号
	 */
	this.queryPhoneByusername = function(username) {
		var d = $q.defer();
		$http({ 
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/userInfo/queryPhoneByusername',
			params : {
				username : username
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}
	
	/**
	 * 验证手机号是否存在系统中
	 */
	this.validPhone = function(phoneNumber,userId) {
		var d = $q.defer();
		$http({ 
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/userInfo/validPhone',
			params : {
				phoneNumber : phoneNumber,
				userId : userId
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}
	
	/**
	 * 发送短信验证码
	 */
	this.sendMsg = function(username) {
		var d = $q.defer();
		$http({ 
			method : 'POST',
			url : APP_CONFIG.monitorUrl + '/alarm/sendMsg',
			data : {
				phoneNumber : username
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}
	
	/**
	 * 登录
	 */
	this.login = function(username, password, yzm, from, pOrgId, verifyCode) {
		var d = $q.defer();
		$http({ 
			method : 'POST',
			url : APP_CONFIG.systemUrl + '/userInfo/login',
			data : {
				username : username,
				password : password,
				yzm : yzm,
				from : from,
				pOrgId : pOrgId,
				verifyCode : verifyCode
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}

	/**
	 * 省级平台跳转登录
	 */
	this.loginByProvince = function(username, pOrgId) {
		var d = $q.defer();
		$http({ 
			method : 'POST',
			url : APP_CONFIG.systemUrl + '/userInfo/loginByProvince',
			data : {
				username : username,
				pOrgId : pOrgId
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}
	
	/**
	 * 退出登录
	 */
	this.exitLogin = function() {
		var d = $q.defer();
		$http({ 
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/userInfo/exitLogin',
			params : {}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}

    /**
     * 修改密码
     */
    this.modifyPwd = function(oldPassword, newPassword) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.systemUrl + '/userInfo/modifyPwd',
            data : {
                oldPassword : oldPassword,
                newPassword : newPassword
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }

    /**
     * 重置密码
     */
    this.resetPwd = function(userId,userPwd) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.systemUrl + '/userInfo/resetPassword',
            data : {
                userId : userId,
                userPwd : userPwd
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }
	
	/**
	 * 获取用户登录信息,包括当前用户、当前组织、当前库、当前库编号
	 */
	this.getLoginInfo = function() {
		var d = $q.defer();
		$http({ 
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/userInfo/getLoginInfo'
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}
	
	/**
	 * 验证证书是否有效
	 */
	this.verifyLicense = function() {
		var d = $q.defer();
		$http({ 
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/verifyLicense/verify'
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}

	/**
	 * 查询一个库下所有的用户
	 */
	this.findAllUserByOrgId = function() {
		var d = $q.defer();
		$http({ 
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/userInfo/findAllUserByOrgId',
			params : {}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}

    /**
     * 配置文件里边的出入库连接
     */
    this.forTheConnection = function() {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.systemUrl + '/userInfo/forTheConnection',
            data : {}
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }

	/**
	 * 查询行政机构用户列表
	 */
	this.getPageInfoByOrgClass = function(pageNum, pageSize, orgClassId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/userInfo/getUserByOrgClass',
			params : {
				pageNum : pageNum, 
				pageSize : pageSize, 
				orgClassId : orgClassId
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}
})

angular.module('app.system').service("userRoleService", function($http, $q, APP_CONFIG) {
	
	/**
	 * 查询用户角色列表
	 */
	this.getRoles = function(userId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/userRole/getUserRole',
			params : {
				userId : userId
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}

})
