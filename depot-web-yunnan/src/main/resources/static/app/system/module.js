"use strict";


angular.module('app.system', ['ui.router', 'app.ui', 'ui.bootstrap', 'angularFileUpload'])

angular.module('app.system').config(function ($stateProvider) {

    $stateProvider
    .state('app.system', {
        abstract: true,
        data: {
            title: '系统管理'
        }
    })
    .state('app.home', {
        url: '/home',
        data: {
            title: '',
            htmlId: 'extr-page'
        },
        views: {
            "content@app": {
                controller: 'homeCtrl',
                templateUrl: 'app/home/views/home.html'
            }
        }
    })
    .state('app.system.user', {
        url: '/system/user',
        data: {
            title: '用户管理'
        },
        views: {
            "content@app": {
                controller: 'userCtrl',
                templateUrl: 'app/system/views/user-list.html'
            }
        }
    })
    .state('app.system.user.edit', {
        url: '/edit/:userId',
        data: {
            title: '编辑用户信息'
        },
        views: {
            "content@app": {
                controller: 'userEditCtrl',
                templateUrl: 'app/system/views/user-edit.html'
            }
        },
        resolve:{
            scripts: function(lazyScript){
                return lazyScript.register('build/vendor.ui.js');
            }
        }
    })
    .state('app.system.org', {
        url: '/system/org',
        data: {
            title: '组织机构管理'
        },
        views: {
            "content@app": {
                controller: 'orgCtrl',
                templateUrl: 'app/system/views/org-list.html'
            }
        }
    })
        .state('app.system.org.edit', {
            url: '/edit/:orgId/:parentId',
            data: {
                title: '编辑组织机构信息'
            },
            views: {
                "content@app": {
                    controller: 'orgEditCtrl',
                    templateUrl: 'app/system/views/org-edit.html'
                }
            },
        })
        .state('app.system.org.profile', {
            url: '/profile/:orgId',
            data: {
                title: '粮库简介'
            },
            views: {
                "content@app": {
                    controller: 'profileCtrl',
                    templateUrl: 'app/system/views/depot-profile.html'
                }
            },
            resolve:{
                scripts: function(lazyScript){
                    return lazyScript.register('smartadmin-plugin/legacy/ckeditor/ckeditor.js');
                }
            }
        })
    .state('app.system.func', {
        url: '/system/func',
        data: {
            title: '功能管理'
        },
        views: {
            "content@app": {
                controller: 'funcCtrl',
                templateUrl: 'app/system/views/func-list.html'
            }
        }
    })
    .state('app.system.func.edit', {
        url: '/edit/:funcId',
        data: {
            title: '编辑功能信息'
        },
        views: {
            "content@app": {
                controller: 'funcEditCtrl',
                templateUrl: 'app/system/views/func-edit.html'
            }
        }
    })
    .state('app.system.role', {
        url: '/system/role',
        data: {
            title: '角色管理'
        },
        views: {
            "content@app": {
                controller: 'roleCtrl',
                templateUrl: 'app/system/views/role-list.html'
            }
        }
    })
    .state('app.system.role.edit', {
        url: '/edit/:roleId/:parentId',
        data: {
            title: '编辑角色信息'
        },
        views: {
            "content@app": {
                controller: 'roleEditCtrl',
                templateUrl: 'app/system/views/role-edit.html'
            }
        }
    })

    .state('userLogin', {
        url: '/userLogin',
        views: {
            root: {
                templateUrl: 'app/auth/views/login.html',
                controller: 'userLoginCtrl'
            }
        },
        params:{
            emergency : false // 是否是应急跳转
        },
        data: {
            title: 'Login',
            htmlId: 'extr-page'
        },
        resolve:{
            scripts: function(lazyScript){
                return lazyScript.register('bower_components/md5/md5.js');
            }
        }
    })

    .state('emergencyLogin', {
        url: '/emergencyLogin',
        views: {
            root: {
                templateUrl: 'app/auth/views/emergency-login.html',
                controller: 'userLoginCtrl'
            }
        },
        params:{
            emergency : true // 是否是应急跳转
        },
        data: {
            title: 'Login',
            htmlId: 'extr-page'
        }
    })

    .state('app.system.emergencyJump', {
        url: '/emergencyJump',
        views: {
            "content@app": {
                controller: 'emergencyTerminal',
                templateUrl: 'app/auth/views/emergency-jump.html'
            }
        }
    })

    //省级平台用到的视频跳转页面
    .state('province', {
        url: '/province/:userName/:userPassword/:pOrgId',
        views: {
            root: {
                controller: 'provinceCameraCtrl',
                templateUrl: 'app/supervise/views/provincePT.html'
            }
        },
        data: {
            title: 'province',
            htmlId: 'extr-page'
        }
    })

    .state('app.system.pwd', {
        url: '/system/modifyPwd',
        data: {
            title: '修改密码'
        },
        views: {
        	"content@app": {
                templateUrl: 'app/system/views/modify-pwd.html',
                controller: 'pwdCtrl'
            }
        }
    })

    .state('app.system.power', {
        url: '/system/power',
        data: {
            title: '角色权限管理'
        },
        views: {
        	"content@app": {
                templateUrl: 'app/system/views/power.html',
                controller: 'powerCtrl'
            }
        }
    })
    
    .state('app.system.systemLog', {
    	url: '/system/systemLog',
    	data: {
    		title: '日志管理'
    	},
    	views: {
    		"content@app": {
    			templateUrl: 'app/system/views/systemLog.html',
    			controller: 'systemLogCtrl'
    		}
    	}
    })
    
    .state('app.system.depotUrl', {
    	url: '/system/depotUrl',
    	data: {
    		title: '库端url配置'
    	},
    	views: {
    		"content@app": {
    			templateUrl: 'app/system/views/depotUrl-list.html',
    			controller: 'depotUrlCtrl'
    		}
    	}
    })
    .state('app.system.depotUrl.edit', {
        url: '/edit/:id',
        data: {
            title: '编辑url配置'
        },
        views: {
            "content@app": {
                controller: 'depotUrlEditCtrl',
                templateUrl: 'app/system/views/depotUrl-edit.html'
            }
        }
    })
    
    .state('app.system.orgPower', {
        url: '/system/orgPower',
        data: {
            title: '机构授权管理'
        },
        views: {
        	"content@app": {
                templateUrl: 'app/system/views/orgPower.html',
                controller: 'orgPowerCtrl'
            }
        }
    })

    .state('app.system.resetPwd', {
    	url: '/system/resetPwd',
    	data: {
    		title: '重置密码'
    	},
    	views: {
    		"content@app": {
    			templateUrl: 'app/system/views/resetPwd.html',
    			controller: 'resetPwdCtrl'
    		}
    	},
        resolve:{
            scripts: function(lazyScript){
                return lazyScript.register('bower_components/md5/md5.js');
            }
        }
    })
    
    .state('app.system.docking', {
        url: '/docking/:type',
        data: {
            title: '遗留系统对接'
        },
        views: {
            "content@app": {
                templateUrl: 'app/system/views/docking-list.html',
                controller: 'dockingCtrl'
            }
        }
    })
    

})