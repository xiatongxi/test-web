"use strict";

angular.module('app.supervise', ['ui.router','app.basic','app.business','app.alarm','app.camera','app.numbermanage','datatables']).config(function ($stateProvider) {
        $stateProvider
            .state('app.supervise', {
                abstract: true,
                data: {
                    title: '粮库决策'
                }
            })
            .state('app.supervise.cameraPT', {
                url: '/supervise/cameraPT:showType',
                data: {
                    title: '2.5维展示'
                },
                views: {
                    "content@app": {
                        controller: 'cameraPTCtrl as datatables',
                        templateUrl: 'app/supervise/views/cameraPT.html'
                    }
                }
            })
            .state('app.supervise.monitorPT', {
                url: '/supervise/monitorPT:showType',
                data: {
                    title: '视频监控平面图'
                },
                views: {
                    "content@app": {
                        controller: 'cameraPTCtrl as datatables',
                        templateUrl: 'app/supervise/views/monitorPT.html'
                    }
                }
            })
            .state('app.supervise.grainPT', {
                url: '/supervise/grainPT:showType',
                data: {
                    title: '粮库平面图'
                },
                views: {
                    "content@app": {
                        controller: 'cameraPTCtrl as datatables',
                        templateUrl: 'app/supervise/views/grainPT.html'
                    }
                }
            })

            .state('app.supervise.houseStatePT', {
                url: '/supervise/houseStatePT',
                data: {
                    title: '仓房状态'
                },
                views: {
                    "content@app": {
                        controller: 'houseStatePTCtrl as datatables',
                        templateUrl: 'app/supervise/views/monitorPT.html'
                    }
                }
            })

            //=======================预警显示开始========================//
            .state('app.supervise.warning', {
                abstract: true,
                data: {
                    title: '预警显示'
                }
            })
            // 报警阀值-列表
            .state('app.supervise.warning.basicThresholdSetList', {
                    url: '/supervise/warning/basicThresholdSetList',
                    data: {
                        title: '预警阀值列表'
                    },
                    views: {
                        "content@app": {
                            controller: 'basicThresholdSetCtrl',
                            templateUrl: 'app/intelligent/basicData/views/basicThresholdSet-list.html'
                        }
                    }
                }
            )
            // 报警记录
            .state('app.supervise.warning.record', {
                    url: '/supervise/warning/record',
                    data: {
                        title: '预警记录'
                    },
                    views: {
                        "content@app": {
                            controller: 'warningThresholdCtrl',
                            templateUrl: 'app/intelligent/grainDetection/views/warningThreshold-list.html'
                        }
                    }
                }
            )
            //----------------预警显示结束---------------//


            //----------------仓储状态查看开始---------------//
            .state('app.supervise.storageStateList', {
                url: '/supervise/storageStateList',
                data: {
                    title: '仓储状态查看'
                },
                views: {
                    "content@app": {
                        controller: 'storageStateListCtrl',
                        templateUrl: 'app/supervise/views/storageState/storageState-list.html'
                    }
                }
            })
            .state('app.supervise.storageStateEdit', {
                url: '/supervise/storageStateEdit/:id/:orgId',
                data: {
                    title: '仓储状态详情'
                },
                views: {
                    "content@app": {
                        controller: 'storageStateEditCtrl',
                        templateUrl: 'app/supervise/views/storageState/storageState-edit.html'
                    }
                }
            })
            //----------------仓储状态查看结束---------------//

            //=======================视频监控========================//
            .state('app.supervise.camera', {
                abstract: true,
                data: {
                    title: '视频监控'
                }
            })
            .state('app.supervise.camera.play', {
                url: '/supervise/camera/play',
                data: {
                    title: '实时监控'
                },
                views: {
                    "content@app": {
                        controller: 'cameraPlayCtrl as datatables',
                        templateUrl: 'app/monitor/views/camera-play.html'
                    }
                }
            })
            .state('app.supervise.camera.alarmList', {
                url: '/supervise/camera/alarm/list',
                data: {
                    title: '报警信息发送记录'
                },
                views: {
                    "content@app": {
                        controller: 'alarmCtrl as datatables',
                        templateUrl: 'app/monitor/views/alarm-list.html'
                    }
                }
            })
            //=======================视频监控========================//
            //=======================粮情监测========================//
            .state('app.supervise.situation', {
                abstract: true,
                data: {
                    title: '粮情监测'
                }
            })
            .state('app.supervise.situation.grainTempList', {
                url: '/situation/grainTempList',
                data: {
                    title: '粮情列表'
                },
                views: {
                    "content@app": {
                        controller: 'grainTempCtrl as datatables',
                        templateUrl: 'app/supervise/views/graintemp-list.html'
                    }
                },
                resolve: {
                    scripts: function(lazyScript){
                        return lazyScript.register([
                            'build/vendor.graphs.js'
                        ]);
                    }
                }
            })
            .state('app.supervise.situation.threeTempChart', {
                url: '/situation/threeTempChart:id',
                data: {
                    title: '粮情三温趋势图'
                },
                views: {
                    "content@app": {
                        controller: 'threeTempChartCtrl as datatables',
                        templateUrl: 'app/supervise/views/threetemp-charts.html'
                    }
                },
                resolve: {
                    scripts: function(lazyScript){
                        return lazyScript.register([
                            'build/vendor.graphs.js'
                        ]);
                    }
                }
            })
            // 虫害报警
            .state('app.supervise.situation.insect', {
                    url: '/supervise/situation/insect',
                    data: {
                        title: '虫害报警列表'
                    },
                    params:{
                        showType : "CH"
                    },
                    views: {
                        "content@app": {
                            controller: 'warningThresholdCtrl',
                            templateUrl: 'app/intelligent/grainDetection/views/warningThreshold-list.html'
                        }
                    }
                }
            )
            // 气体报警
            .state('app.supervise.situation.gas', {
                    url: '/supervise/situation/gas',
                    data: {
                        title: '气体报警列表'
                    },
                    params:{
                        showType : "QT"
                    },
                    views: {
                        "content@app": {
                            controller: 'warningThresholdCtrl',
                            templateUrl: 'app/intelligent/grainDetection/views/warningThreshold-list.html'
                        }
                    }
                }
            )
            // 温度报警
            .state('app.supervise.situation.temperature', {
                    url: '/supervise/situation/temperature/:isShow/:houseId',
                    data: {
                        title: '温度报警列表'
                    },
                    params:{
                        showType : "WD"
                    },
                    views: {
                        "content@app": {
                            controller: 'warningThresholdCtrl',
                            templateUrl: 'app/intelligent/grainDetection/views/warningThreshold-list.html'
                        }
                    }
                }
            )
            //=======================粮情监测========================//
            //=======================仓储作业========================//
            .state('app.supervise.operation', {
                abstract: true,
                data: {
                    title: '仓储作业'
                }
            })
            .state('app.supervise.operation.ccZy', {
                url: '/operation/ccZy/:houseId',
                data: {
                    title: '仓储作业记录'
                },
                views: {
                    "content@app": {
                        controller: 'ccZyCtrl as datatables',
                        templateUrl: 'app/supervise/views/ccZy-List.html'
                    }
                }
            })
            //=======================仓储作业========================//
            //=======================储粮信息========================//
            .state('app.supervise.storage', {
                abstract: true,
                data: {
                    title: '储粮信息'
                }
            })
            .state('app.supervise.storage.plan', {
                url: '/storage/plan',
                data: {
                    title: '计划状态'
                },
                views: {
                    "content@app": {
                        controller: 'planCtrl',
                        templateUrl: 'app/supervise/views/cl-plan.html'
                    }
                }
            })
            .state('app.supervise.storage.barnBasic', {
                url: '/storage/barnBasic',
                data: {
                    title: '仓房基本信息'
                },
                views: {
                    "content@app": {
                        controller: 'barnStateCtrl as datatables',
                        templateUrl: 'app/supervise/views/barnState-list.html'
                    }
                }
            })
            .state('app.supervise.storage.barnBasic.rainOrSnow', {
                url: '/storage/barnBasic/rainOrSnow:id',
                data: {
                    title: '风雨雪三查'
                },
                views: {
                    "content@app": {
                        controller: 'rainOrSnowCtrl as datatables',
                        templateUrl: 'app/supervise/views/barnState-RainOrSnow-edit.html'
                    }
                }
            })
            .state('app.supervise.storage.keeperList', {
                url: '/storage/keeperList',
                data: {
                    title: '库级人员信息'
                },
                params:{
                    functionType : "LKJC"
                },
                views: {
                    "content@app": {
                        controller: 'keeperCtrl',
                        templateUrl: 'app/supervise/views/cl-keeper.html'
                    }
                }
            })
            .state('app.supervise.storage.inventory', {
                url: '/storage/inventory/:id',
                data: {
                    title: '库存统计'
                },
                params:{
                    jumpType : "KC"
                },
                views: {
                    "content@app": {
                        controller: 'sheetCtrl',
                        templateUrl: 'app/supervise/views/inventory-list.html'
                    }
                }
            })
            .state('app.supervise.storage.inventoryDetails', {
                url: '/storage/inventoryDetails/:id',
                data: {
                    title: '库存统计详情'
                },
                params:{
                    isNotEdit : true
                },
                views: {
                    "content@app": {
                        controller: 'sheetSaveCtrl',
                        templateUrl: 'app/storage/views/numberManage/sheet-edit.html'
                    }
                }
            })


            //=======================预警提示========================//
            .state('app.supervise.warnPrompt', {
                url: '/supervise/warnPrompt',
                data: {
                    title: '预警提示'
                },
                views: {
                    "content@app": {
                        controller: 'warnPromptCtrl',
                        templateUrl: 'app/supervise/views/warnPrompt-index.html'
                    }
                }
            })
            /*----------------------------决策支持-------------------------------*/
            // 质量追溯统计
            // 二级路由--决策支持
            .state('app.supervise.decisionSupport', {
                abstract: true,
                data: {
                    title: '决策支持'
                }
            })
            // 列表
            .state('app.supervise.decisionSupport.qualityTraceList', {
                url: '/decisionSupport/qualityTraceList',
                data: {
                    title: '质量追溯统计'
                },
                views: {
                    "content@app": {
                        controller: 'qualityTraceCtrl',
                        templateUrl: 'app/supervise/qualityTrace/views/qualityTrace-list.html'
                    }
                }
            })
            // 质量详情
            .state('app.supervise.decisionSupport.qualityTraceList.firstCheckDetail', {
                url: '/decisionSupport/qualityTraceList/firstCheckDetail/:id/:isNotEdit',
                data: {
                    title: '粮食初检详情'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckSaveCtrl',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-firstcheck-edit.html'
                    }
                }
            })
            .state('app.supervise.decisionSupport.qualityTraceList.acceptCheckDetail', {
                url: '/decisionSupport/qualityTraceList/acceptCheckDetail/:id/:isNotEdit',
                data: {
                    title: '粮食验收详情'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckSaveCtrl',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-acceptcheck-edit.html'
                    }
                }
            })
            .state('app.supervise.decisionSupport.qualityTraceList.springCheckDetail', {
                url: '/decisionSupport/qualityTraceList/springCheckDetail/:id/:isNotEdit',
                data: {
                    title: '春秋普查详情'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckSaveCtrl',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-springcheck-edit.html'
                    }
                }
            })
            .state('app.supervise.decisionSupport.qualityTraceList.outCheckDetail', {
                url: '/decisionSupport/qualityTraceList/outCheckDetail/:id/:isNotEdit',
                data: {
                    title: '出库质量详情'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckSaveCtrl',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-outcheck-edit.html'
                    }
                }
            })
            .state('app.supervise.decisionSupport.qualityTraceList.dayCheckDetail', {
                url: '/decisionSupport/qualityTraceList/dayCheckDetail/:id/:isNotEdit',
                data: {
                    title: '日常检查详情'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckSaveCtrl',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-dakcheck-edit.html'
                    }
                }
            })
            .state('app.supervise.decisionSupport.qualityTraceList.thirdCheckDetail', {
                url: '/decisionSupport/qualityTraceList/thirdCheckDetail/:id/:isNotEdit',
                data: {
                    title: '第三方检查详情'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckSaveCtrl',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-trkcheck-edit.html'
                    }
                }
            })

            // 出入库监管统计
            .state('app.supervise.decisionSupport.cycleFoodCount', {
                url: '/decisionSupport/cycleFoodCount',
                data: {
                    title: '出入库监管统计'
                },
                views: {
                    "content@app": {
                        controller: 'cycleFoodCountCtrl',
                        templateUrl: 'app/supervise/views/cycleFoodCount-list.html'
                    }
                }
            })
            .state('app.supervise.decisionSupport.cycleFoodCount.truckDetail', {
                url: '/decisionSupport/cycleFoodCount/truckDetail/:obj',// 传参 : id/:name/:pwd
                data: {
                    title: '汽车出入库详情'
                },
                views: {
                    "content@app": {
                        controller: 'crkRecordDetailCtrl',
                        templateUrl: 'app/supervise/views/crkRecordDetail.html'
                    }
                }
            })
            .state('app.supervise.decisionSupport.cycleFoodCount.trainDetail', {
                url: '/decisionSupport/cycleFoodCount/trainDetail/:obj',// 传参 : id/:name/:pwd
                data: {
                    title: '火车出入库详情'
                },
                views: {
                    "content@app": {
                        controller: 'crkRecordDetailCtrl',
                        templateUrl: 'app/supervise/views/crkRecordDetail.html'
                    }
                }
            })
            // 库存监管统计
            .state('app.supervise.decisionSupport.storeSuperviseList', {
                    url: '/decisionSupport/storeSuperviseList/:id',
                    data: {
                        title: '库存监管统计'
                    },
                    params:{
                        isNotEdit : true
                    },
                    views: {
                        "content@app": {
                            controller: 'numberManageCtrl',
                            templateUrl: 'app/storage/views/numberManage/numberManage-list.html'
                        }
                    }
                }
            )
            // 动态粮情统计
            .state('app.supervise.decisionSupport.dynamicFood', {
                url: '/decisionSupport/dynamicFood',
                data: {
                    title: '动态粮情统计'
                },
                params:{
                    jumpType : "DT"
                },
                views: {
                    "content@app": {
                        controller: 'sheetCtrl',
                        templateUrl: 'app/supervise/views/inventory-list.html'
                    }
                }
            })
            // 动态粮情统计详情
            .state('app.supervise.decisionSupport.dynamicFoodDetail', {
                url: '/decisionSupport/dynamicFoodDetail/:id',
                data: {
                    title: '动态粮情统计详情'
                },
                params:{
                    isNotEdit : true
                },
                views: {
                    "content@app": {
                        controller: 'sheetSaveCtrl as datatables',
                        templateUrl: 'app/storage/views/numberManage/sheet-edit.html'
                    }
                }
            })
            // 粮食购销统计
            // 三级路由--粮食购销统计
            .state('app.supervise.decisionSupport.SalesStatistics', {
                abstract: true,
                data: {
                    title: '粮食购销统计'
                }
            })
            // 计划执行进度
            .state('app.supervise.decisionSupport.SalesStatistics.plan-schedule', {
                url: '/decisionSupport/SalesStatistics/plan-schedule',
                data: {
                    title: '计划执行进度'
                },
                params:{
                    SalesStatistics : true
                },
                views: {
                    "content@app": {
                        controller: 'planScheduleCtrl',
                        templateUrl: 'app/business/schedule/views/plan-schedule-list.html'
                    }
                }
            })
            // 详情
            .state('app.supervise.decisionSupport.SalesStatistics.plan-schedule.plan-view', {
                url: '/decisionSupport/SalesStatistics/plan-schedule/plan-view/:id/:processInstanceId',
                data: {
                    title: '计划详情'
                },
                params:{
                    isNotEdit : true
                },
                views: {
                    "content@app": {
                        controller: 'planSaveCtrl',
                        templateUrl: 'app/business/plan/views/plan-edit.html'
                    }
                }
            })

            // 合同执行进度
            .state('app.supervise.decisionSupport.SalesStatistics.contract-schedule', {
                url: '/decisionSupport/SalesStatistics/contract-schedule',
                data: {
                    title: '合同执行进度'
                },
                params:{
                    SalesStatistics : true
                },
                views: {
                    "content@app": {
                        controller: 'contractScheduleCtrl',
                        templateUrl: 'app/business/schedule/views/contract-schedule-list.html'
                    }
                }
            })
            // 详情
            .state('app.supervise.decisionSupport.SalesStatistics.contract-schedule.contract-view', {
                url: '/decisionSupport/SalesStatistics/contract-schedule/contract-view/:id/:processInstanceId',
                data: {
                    title: '合同详情'
                },
                params:{
                    isNotEdit : true
                },
                views: {
                    "content@app": {
                        controller: 'contractSaveCtrl',
                        templateUrl: 'app/business/contract/views/contract-edit.html'
                    }
                }
            })
            // 通知单执行进度
            .state('app.supervise.decisionSupport.SalesStatistics.deliveryStorageNotice-schedule', {
                url: '/decisionSupport/SalesStatistics/deliveryStorageNotice-schedule',
                data: {
                    title: '通知单执行进度'
                },
                params:{
                    SalesStatistics : true
                },
                views: {
                    "content@app": {
                        controller: 'deliveryStorageNoticeScheduleCtrl',
                        templateUrl: 'app/business/schedule/views/deliveryStorageNotice-schedule-list.html'
                    }
                }
            })
            // 详情
            .state('app.supervise.decisionSupport.SalesStatistics.deliveryStorageNotice-schedule.deliveryNotice-view', {
                url: '/decisionSupport/decisionSupport/deliveryStorageNotice-schedule/deliveryNotice-view/:id/:processInstanceId',
                params: {
                    "noticeType" : "delivery",
                    "isNotEdit" : true
                },
                data: {
                    title: '出库通知单详情'
                },
                views: {
                    "content@app": {
                        controller: 'deliveryStorageNoticeSaveCtrl',
                        templateUrl: 'app/business/deliveryStorageNotice/views/deliveryNotice-edit.html'
                    }
                }
            })
            .state('app.supervise.decisionSupport.SalesStatistics.deliveryStorageNotice-schedule.storageNotice-view', {
                url: '/decisionSupport/SalesStatistics/deliveryStorageNotice-schedule/storageNotice-view/:id/:processInstanceId',
                params: {
                    "noticeType" : "storage",
                    "isNotEdit" : true
                },
                data: {
                    title: '入库通知单详情'
                },
                views: {
                    "content@app": {
                        controller: 'deliveryStorageNoticeSaveCtrl',
                        templateUrl: 'app/business/deliveryStorageNotice/views/storageNotice-edit.html'
                    }
                }
            })
            //分仓保管账--储粮详情
            .state('app.supervise.storage.houseKeepAccount', {
                url: '/storage/houseKeepAccount/:account/:type/:houseId',
                data: {
                    title: '储粮详情'
                },
                views: {
                    "content@app": {
                        controller: 'houseKeepAccountCtrl',
                        templateUrl: 'app/supervise/views/grainStorage/houseKeepAccount-list.html'
                    }
                }
            })
            //分仓保管账记账--储粮详情查看
            .state('app.supervise.storage.houseKeepAccountEdit', {
                url: '/storage/houseKeepAccountEdit/:account/:butType',
                data: {
                    title: '储粮详情查看'
                },
                views: {
                    "content@app": {
                        controller: 'houseKeepAccountEditCtrl',
                        templateUrl: 'app/supervise/views/grainStorage/houseKeepAccount-edit.html'
                    }
                }
            })

});