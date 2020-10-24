"use strict";

angular.module('app.nvr', ['ui.router','app.alert', 'datatables', 'datatables.bootstrap']).config(function ($stateProvider) {
        $stateProvider
            .state('app.nvr', {
                abstract: true,
                data: {
                    title: '硬盘录像机'
                }
            })
            .state('app.nvr.list', {
                url: '/nvr/list',// 传参 : id/:name/:pwd
                data: {
                    title: '硬盘录像机列表'
                },
                views: {
                    "content@app": {
                        controller: 'nvrCtrl as datatables',
                        templateUrl: 'app/monitor/views/nvr-list.html'
                    }
                }
            })
            .state('app.nvr.add', {
                url: '/nvr/add/:id',
                data: {
                    title: '硬盘录像机新增'
                },
                views: {
                    "content@app": {
                        controller: 'nvrSaveCtrl as datatables',
                        templateUrl: 'app/monitor/views/nvr-edit.html'
                    }
                }
            })
            .state('app.nvr.edit', {
                url: '/nvr/edit/:id',
                data: {
                    title: '硬盘录像机修改'
                },
                views: {
                    "content@app": {
                        controller: 'nvrSaveCtrl as datatables',
                        templateUrl: 'app/monitor/views/nvr-edit.html'
                    }
                }
            })
    })
    


angular.module('app.camera', ['ui.router', 'datatables', 'datatables.bootstrap'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.camera', {
                abstract: true,
                data: {
                    title: '智能安防'
                }
            })
            .state('app.camera.list', {
                url: '/camera/list',// 传参 : id/:name/:pwd
                data: {
                    title: '摄像头列表'
                },
                views: {
                    "content@app": {
                        controller: 'cameraCtrl as datatables',
                        templateUrl: 'app/monitor/views/camera-list.html'
                    }
                }
            })
            .state('app.camera.edit', {
                url: '/camera/edit/:id/:type',// 传参 : id/:name/:pwd
                data: {
                    title: '摄像机修改'
                },
                views: {
                    "content@app": {
                        controller: 'cameraSaveCtrl as datatables',
                        templateUrl: 'app/monitor/views/camera-edit.html'
                    }
                }
            })
            .state('app.camera.add', {
                url: '/camera/add',
                data: {
                    title: '摄像机新增'
                },
                views: {
                    "content@app": {
                        controller: 'cameraSaveCtrl as datatables',
                        templateUrl: 'app/monitor/views/camera-edit.html'
                    }
                }
            })
            .state('app.camera.play', {
                url: '/camera/play',
                data: {
                    title: '监控通道'
                },
                views: {
                    "content@app": {
                        controller: 'cameraPlayCtrl as datatables',
                        templateUrl: 'app/monitor/views/camera-play.html'
                    }
                },
                resolve: {
                    scripts: function(lazyScript){
                        return lazyScript.register([
                            'bower_components/jquery-jsencrypt/jsencrypt.min.js','bower_components/jquery-jsencrypt/jsWebControl-1.0.0.min.js'
                        ]);
                    }
                }
            })
    });

angular.module('app.alarm', ['ui.router', 'datatables', 'datatables.bootstrap'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.alarm', {
                abstract: true,
                data: {
                    title: '智能安防 / 报警管理'
                }
            })
            .state('app.alarm.list', {
                url: '/alarm/list/:queryCriteria',
                data: {
                    title: '报警记录信息'
                },
                views: {
                    "content@app": {
                        controller: 'alarmCtrl as datatables',
                        templateUrl: 'app/monitor/views/alarm-list.html'
                    }
                }
            })
            .state('app.alarm.setting', {
                url: '/alarm/setting',// 传参 : id/:name/:pwd
                data: {
                    title: '发送方式设置'
                },
                views: {
                    "content@app": {
                        controller: 'alarmTypeCtrl as datatables',
                        templateUrl: 'app/monitor/views/alarm-type.html'
                    }
                }
            })
            .state('app.camera.index', {
                url: '/camera/index',
                data: {
                    title: '业务介绍'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/monitor/index/views/monitor-index.html'
                    }
                }
            })
    });

angular.module('app.log', ['ui.router', 'datatables', 'datatables.bootstrap'])
	.config(function ($stateProvider) {
	    $stateProvider
	        .state('app.log', {
	            abstract: true,
	            data: {
	                title: '智能安防 / 日志管理'
	            }
	        })
	        .state('app.log.list', {
	            url: '/log/list',
	            data: {
	                title: '日志查询'
	            },
	            views: {
	                "content@app": {
	                    controller: 'logCtrl as datatables',
	                    templateUrl: 'app/monitor/views/log-list.html'
	                }
	            }
	        })
	});