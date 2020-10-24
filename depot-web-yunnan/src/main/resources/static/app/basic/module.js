"use strict";


angular.module('app.basic', ['ui.router', 'datatables', 'datatables.bootstrap'])

angular.module('app.basic')
    .config(function ($stateProvider) {
    $stateProvider
    .state('app.basic', {
        abstract: true,
        data: {
            title: '基础数据'
        }
    })
    //仓房管理list页
    .state('app.basic.storehouseList', {
        url: '/storehouseList/:type/:libraryType',
        data: {
            title: '仓房管理'
        },
        views: {
            "content@app": {
                controller: 'StorehouseCtrl',
                templateUrl: 'app/basic/storehouse/views/Storehouse-list.html'
            }
        }
    })
    .state('app.basic.agentLaoDepot', {
        url: '/business/agent/basic/agentLaoDepot/:storehouseId',
        data: {
            title: '代储信息设置'
        },
        views: {
            "content@app": {
                controller: 'agentLaoDepotCtrl',
                templateUrl: 'app/business/agent/basic/views/agentLaoDepot.html'
            }
        }
    })
    //点修改调用
    .state('app.basic.storehouseEditReq', {
    	url: '/storehouseEditReq/:id/:btnType/:orgId/:libraryType',
        data: {
            title: '更新仓房'
        },
        views: {
            "content@app": {
                controller: 'StorehouseCtrlEdit',
                templateUrl: 'app/basic/storehouse/views/Storehouse-edit.html'
            }
        }
    })
    //初始化数据字典调用
    .state('app.basic.enumList', {
    	url: '/enumList',
        data: {
            title: '数据字典'
        },
        views: {
            "content@app": {
                controller: 'enumCtrl',
                templateUrl: 'app/basic/enum/views/enum-list.html'
            }
        }
    })
    //初始化货位/廒间信息调用
    .state('app.basic.warehouseList', {
    	url: '/warehouseList/:libraryType',
        data: {
            title: '货位管理'
        },
        views: {
            "content@app": {
                controller: 'warehouseCtrl',
                templateUrl: 'app/basic/warehouse/views/warehouse-list.html'
            }
        }
    })
    //初始化货位信息调用
    .state('app.basic.warehouseEdit', {
    	url: '/warehouseEdit/:id/:btnType/:libraryType',
        data: {
            title: '更新货位信息'
        },
        views: {
            "content@app": {
                controller: 'warehouseCtrlEdit',
                templateUrl: 'app/basic/warehouse/views/warehouse-edit.html'
            }
        }
    })
    //初始化油罐/油罐信息调用
    .state('app.basic.tankList', {
        url: '/tankList',
        data: {
            title: '油罐管理'
        },
        views: {
            "content@app": {
                controller: 'tankCtrl',
                templateUrl: 'app/basic/tank/view/tank-list.html'
            }
        }
    })
    //初始化油罐/油罐信息调用
    .state('app.basic.tankEdit', {
        url: '/tankList/:id/:btnType',
        data: {
            title: '更新油罐管理'
        },
        views: {
            "content@app": {
                controller: 'tankCtrlEdit',
                templateUrl: 'app/basic/tank/view/tank-edit.html'
            }
        }
    })
    //设备器材库查询列表
    .state('app.basic.equipmentEquipmentPoolList', {
    	url: '/equipmentEquipmentPoolList',
        data: {
            title: '设备器材库'
        },
        views: {
            "content@app": {
                controller: 'equipmentEquipmentPoolCtrl',
                templateUrl: 'app/basic/equipmentEquipmentPool/views/equipmentEquipmentPool-list.html'
            }
        }
    })
    //初始化员工信息调用
    .state('app.basic.keeperList', {
    	url: '/keeperList',
        data: {
            title: '员工信息管理'
        },
        views: {
            "content@app": {
                controller: 'keeperCtrl',
                templateUrl: 'app/basic/keeper/views/keeper-list.html'
            }
        }
    })
    //点新增或修改保管员信息调用
    .state('app.basic.keeperEdit', {
    	url: '/keeperEdit/:id/:showType',
        data: {
            title: '更新员工信息'
        },
        views: {
            "content@app": {
                controller: 'keeperCtrlEdit',
                templateUrl: 'app/basic/keeper/views/keeper-edit.html'
            }
        }
    })
    //点查看跳转页面
    .state('app.basic.keeperView', {
    	url: '/keeperView/:id/:types',
        data: {
            title: '员工信息展示'
        },
        views: {
            "content@app": {
                controller: 'keeperViewCtrl',
                templateUrl: 'app/basic/keeper/views/keeper-view.html'
            }
        }
    })
    .state('app.basic.cameraList', {
        url: '/basic/cameraList',// 传参 : id/:name/:pwd
        data: {
            title: '摄像头管理'
        },
        views: {
            "content@app": {
                controller: 'cameraCtrl as datatables',
                templateUrl: 'app/monitor/views/camera-list.html'
            }
        }
    })
        .state('app.basic.cameraEdit', {
            url: '/basic/cameraEdit/:id/:type',// 传参 : id/:name/:pwd
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
        .state('app.basic.cameraAdd', {
            url: '/basic/cameraAdd',
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
        .state('app.basic.nvrList', {
            url: '/basic/nvrList',// 传参 : id/:name/:pwd
            data: {
                title: '硬盘录像机管理'
            },
            views: {
                "content@app": {
                    controller: 'nvrCtrl as datatables',
                    templateUrl: 'app/monitor/views/nvr-list.html'
                }
            }
        })
        .state('app.basic.nvrAdd', {
            url: '/basic/nvrAdd/:id/:type',
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
        .state('app.basic.nvrEdit', {
            url: '/basic/nvrEdit/:id/:type',
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
        //导出用户和仓房货位信息
        .state('app.basic.uploadUserAndCf', {
        	url : '/upload',
        	data: {
        		title: '导出用户和仓房货位信息'
        	},
        	views: {
        		"content@app": {
                    controller: 'uploadUserAndCfCtrl',
                    templateUrl: 'app/basic/index/views/basic-index.html'
                }
        	}
        })
        //基础数据首页
        .state('app.basic.index', {
        	url: '/basic/index',
            data: {
                title: '业务介绍',
            },
            views: {
                "content@app": {
                    templateUrl: 'app/basic/index/views/basic-index.html'
                }
            }
        })
        
        
        .state('app.basic.codeRule', {
        	abstract: true,
            data: {
                title: '编码规则'
            }
        })
        
        // 编码规则-列表
        .state('app.basic.codeRule.list', {
	    	url: '/codeRule/list',
	        data: {
	            title: '编码规则列表',
	        },
	        views: {
	            "content@app": {
	                controller: 'codeRuleCtrl',
	                templateUrl: 'app/basic/codeRule/views/codeRule-list.html'
	            }
	        }
	    })
	    
	    // 编码规则-新增
        .state('app.basic.codeRule.add', {
	    	url: '/codeRule/add',
	        data: {
	            title: '编码规则新增',
	        },
	        params:{
                isNotEdit : false // 可编辑.
            },
	        views: {
	            "content@app": {
	                controller: 'codeRuleSaveCtrl',
	                templateUrl: 'app/basic/codeRule/views/codeRule-edit.html'
	            }
	        }
	    })
	    
	    // 编码规则-编辑
        .state('app.basic.codeRule.edit', {
	    	url: '/codeRule/edit/:id',
	        data: {
	            title: '编码规则编辑',
	        },
	        params:{
                isNotEdit : false // 可编辑.
            },
	        views: {
	            "content@app": {
	                controller: 'codeRuleSaveCtrl',
	                templateUrl: 'app/basic/codeRule/views/codeRule-edit.html'
	            }
	        }
	    })
    
	    // 编码规则-查看.
        .state('app.basic.codeRule.view', {
	    	url: '/codeRule/view/:id',
	        data: {
	            title: '编码规则查看',
	        },
	        params:{
                isNotEdit : true // 不可编辑.
            },
	        views: {
	            "content@app": {
	                controller: 'codeRuleSaveCtrl',
	                templateUrl: 'app/basic/codeRule/views/codeRule-edit.html'
	            }
	        }
	    })

        .state('app.basic.scheduleJob', {
            abstract: true,
            data: {
                title: '定时任务'
            }
        })
        
        .state('app.basic.scheduleJob.list', {
            url: '/scheduleJob/list',
            data: {
                title: '定时任务列表',
            },
            views: {
                "content@app": {
                    controller: 'scheduleJobCtrl',
                    templateUrl: 'app/basic/scheduleJob/views/scheduleJob-list.html'
                }
            }
        })
        
        .state('app.basic.scheduleJob.add', {
            url: '/scheduleJob/add',
            data: {
                title: '定时任务新增',
            },
            params:{
                isNotEdit : false // 可编辑.
            },
            views: {
                "content@app": {
                    controller: 'scheduleJobSaveCtrl',
                    templateUrl: 'app/basic/scheduleJob/views/scheduleJob-edit.html'
                }
            }
        })
        
        .state('app.basic.scheduleJob.edit', {
            url: '/scheduleJob/edit/:id',
            data: {
                title: '定时任务编辑',
            },
            params:{
                isNotEdit : false // 可编辑.
            },
            views: {
                "content@app": {
                    controller: 'scheduleJobSaveCtrl',
                    templateUrl: 'app/basic/scheduleJob/views/scheduleJob-edit.html'
                }
            }
        })
    
        .state('app.basic.scheduleJob.view', {
            url: '/scheduleJob/view/:id',
            data: {
                title: '定时任务查看',
            },
            params:{
                isNotEdit : true // 不可编辑.
            },
            views: {
                "content@app": {
                    controller: 'scheduleJobSaveCtrl',
                    templateUrl: 'app/basic/scheduleJob/views/scheduleJob-edit.html'
                }
            }
        })
        
    //工作流程配置list页
    .state('app.basic.processList', {
        url: '/processList/:type',
        data: {
            title: '工作流程管理'
        },
        views: {
            "content@app": {
                controller: 'processListCtrl',
                templateUrl: 'app/basic/process/views/process-list.html'
            }
        }
    })
    //编辑页
    .state('app.basic.processEdit', {
    	url: '/processEdit/:id/:btnType',
        data: {
            title: '工作流程编辑'
        },
        views: {
            "content@app": {
                controller: 'processEditCtrl',
                templateUrl: 'app/basic/process/views/process-edit.html'
            }
        }
    })
});