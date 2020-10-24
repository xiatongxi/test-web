"use strict";
angular.module('app.intelligent',['ui.router']).config(function($stateProvider) {
//--------------------------智能仓房--------------------------//
    $stateProvider
        .state('app.intelligent', {
            abstract : true,
            data : {
                title : '智能仓房'
            }
        })
        // 欢迎页
        .state('app.intelligent.index', {
            url: '/intelligent/index/:showType',
            params: {
                showType : "2"
            },
            data: {
                title: '智能仓房'
            },
            views: {
                "content@app": {
                    controller: 'cameraPTCtrlIndex',
                    templateUrl: 'app/intelligent/index-supervise/views/grainPT-index.html'
                }
            }
        })
        /*---------------------------粮情检查--------------------------*/
        // 二级路由--粮情检查
        .state('app.intelligent.grainInspect', {
            abstract: true,
            data: {
                title: '粮情检查'
            }
        })

        // 粮情综合展示
        .state('app.intelligent.grainInspect.comprehensive', {
                url: '/intelligent/grainInspect/comprehensive/:showType',
                params: {
                    showType : "2"
                },
                data: {
                    title: '粮情综合展示'
                },
                views: {
                    "content@app": {
                        controller: 'cameraPTCtrlIndex',
                        templateUrl: 'app/intelligent/index-supervise/views/grainPT-index.html'
                    }
                }
            }
        )
        // 粮情检查分析
        .state('app.intelligent.grainInspect.grainAnalyzeList', {
                url: '/intelligent/grainInspect/grainAnalyzeList',
                data: {
                    title: '粮情检查分析'
                },
                views: {
                    "content@app": {
                        controller: 'grainAnalyzeCtrl',
                        templateUrl: 'app/intelligent/grainInspect/views/grainAnalyze-list.html'
                    }
                },
                resolve: {
                    scripts: function(lazyScript){
                        return lazyScript.register([
                            'build/vendor.graphs.js'
                        ]);
                    }
                }
            }
        )
        // 粮情报表
        .state('app.intelligent.grainInspect.reportFormsList', {
                url: '/intelligent/grainInspect/reportFormsList',
                data: {
                    title: '粮情报表'
                },
                views: {
                    "content@app": {
                        controller: 'reportFormsListCtrl',
                        templateUrl: 'app/intelligent/grainInspect/views/reportForms-list.html'
                    }
                }
            }
        )
        //实时数据查询
        .state('app.intelligent.grainInspect.realTimeData', {
                url: '/intelligent/grainInspect/realTimeData',
                data: {
                    title: '实时数据查询'
                },
                views: {
                    "content@app": {
                        controller: 'realTimeDataListCtrl',
                        templateUrl: 'app/intelligent/grainInspect/views/realTimeData-list.html'
                    }
                },
                resolve: {
                    scripts: function(lazyScript){
                        return lazyScript.register([
                            'build/vendor.graphs.js'
                        ]);
                    }
                }
            }
        )
        // 历史数据查询
        .state('app.intelligent.grainInspect.pastRecordsData', {
                url: '/intelligent/grainInspect/pastRecordsData',
                data: {
                    title: '历史数据查询'
                },
                views: {
                    "content@app": {
                        controller: 'temperatureRecordCtrl',
                        templateUrl: 'app/intelligent/grainInspect/views/pastRecordsData-list.html'
                    }
                }
            }
        )
        /*-----------------------------粮情检测-----------------------------*/
        // 二级路由--粮情检测
        .state('app.intelligent.grainDetection', {
            abstract: true,
            data: {
                title: '粮情检测'
            }
        })
        // 温湿度检测
        .state('app.intelligent.grainDetection.humitureDetectionList', {
                url: '/intelligent/grainDetection/humitureDetectionList',
                data: {
                    title: '温湿度检测'
                },
                views: {
                    "content@app": {
                        controller: 'humitureDetectionCtrl',
                        templateUrl: 'app/intelligent/grainDetection/views/humitureDetection-list.html'
                    }
                },
                resolve: {
                    scripts: function(lazyScript){
                        return lazyScript.register([
                            'build/vendor.graphs.js'
                        ]);
                    }
                }
            }
        )
        // 水分检测
        .state('app.intelligent.grainDetection.dewDetectionList', {
                url: '/intelligent/grainDetection/dewDetectionList',
                data: {
                    title: '水分检测'
                },
                views: {
                    "content@app": {
                        controller: 'dewDetectionCtrl',
                        templateUrl: 'app/intelligent/grainDetection/views/dewDetection-list.html'
                    }
                },
                resolve: {
                    scripts: function(lazyScript){
                        return lazyScript.register([
                            'build/vendor.graphs.js'
                        ]);
                    }
                }
            }
        )
        // 测温记录
        .state('app.intelligent.grainDetection.temperatureRecordList', {
                url: '/intelligent/grainDetection/temperatureRecordList/:show/:vCfCode',
                data: {
                    title: '测温记录'
                },
                views: {
                    "content@app": {
                        controller: 'temperatureRecordCtrl',
                        templateUrl: 'app/intelligent/grainDetection/views/temperatureRecord-list.html'
                    }
                }
            }
        )
        // 粮情数据
        .state('app.intelligent.grainDetection.grainConditionList', {
                url: '/intelligent/grainDetection/grainConditionList',
                data: {
                    title: '粮情数据'
                },
                views: {
                    "content@app": {
                        controller: 'grainConditionCtrl',
                        templateUrl: 'app/intelligent/grainDetection/views/grainCondition-list.html'
                    }
                },
                resolve: {
                    scripts: function(lazyScript){
                        return lazyScript.register([
                            'build/vendor.graphs.js'
                        ]);
                    }
                }
            }
        )
        // 虫害检测
        .state('app.intelligent.grainDetection.insectPestDetectionList', {
                url: '/intelligent/grainDetection/insectPestDetectionList/:show/:vCfCode',
                data: {
                    title: '虫害检测列表'
                },
                views: {
                    "content@app": {
                        controller: 'insectPestDetectionCtrl',
                        templateUrl: 'app/intelligent/grainDetection/views/insectPestDetection-list.html'
                    }
                }
            }
        )
        // 虫害手工录入
        .state('app.intelligent.grainDetection.insectPestDetectionEdit', {
                url: '/intelligent/grainDetection/insectPestDetectionEdit/:type/:insertId',
                data: {
                    title: '虫害检测数据'
                },
                views: {
                    "content@app": {
                        controller: 'insectPestEditCtrl',
                        templateUrl: 'app/intelligent/grainDetection/views/insectPestDetection-edit.html'
                    }
                }
            }
        )
        // 虫害检测图表展示
        .state('app.intelligent.grainDetection.insectPestDetectionList.chart', {
                url: '/intelligent/grainDetection/insectPestDetectionList/chart',
                data: {
                    title: '虫害检测图表'
                },
                views: {
                    "content@app": {
                        controller: 'insectPestDetectionChart',
                        templateUrl: 'app/intelligent/grainDetection/views/insectPestDetectionChart.html'
                    }
                }
            }
        )
        // 故障报警
        .state('app.intelligent.grainDetection.warningThreshold', {
                url: '/intelligent/grainDetection/warningThreshold/:show/:vCfCode',
                data: {
                    title: '报警列表'
                },
                views: {
                    "content@app": {
                        controller: 'warningThresholdCtrl',
                        templateUrl: 'app/intelligent/grainDetection/views/warningThreshold-list.html'
                    }
                }
            }
        )
        /*-----------------------------熏蒸作业-----------------------------*/
        // 二级路由--熏蒸管理
        .state('app.intelligent.fumigation', {
            abstract: true,
            data: {
                title: '熏蒸管理'
            }
        })
        // 熏蒸方案申请
        .state('app.intelligent.fumigation.fumigationPlanList', {
                url: '/intelligent/fumigation/fumigationPlanList',
                data: {
                    title: '熏蒸方案申请'
                },
                views: {
                    "content@app": {
                        controller: 'fumigationPlanCtrl',
                        templateUrl: 'app/intelligent/fumigation/views/plan/fumigationPlan-list.html'
                    }
                }
            }
        )
        // 熏蒸方案申请详情
        .state('app.intelligent.fumigation.fumigationPlanEdit', {
                url: '/intelligent/fumigation/fumigationPlanEdit/:fumType/:fumigationId',
                data: {
                    title: '熏蒸方案申请详情'
                },
                views: {
                    "content@app": {
                        controller: 'fumigationPlanEditCtrl',
                        templateUrl: 'app/intelligent/fumigation/views/plan/fumigationPlan-edit.html'
                    }
                }
            }
        )
        // 熏蒸方案审批
        .state('app.intelligent.fumigation.fumigationApproveList', {
                url: '/intelligent/fumigation/fumigationApproveList',
                data: {
                    title: '熏蒸方案审批'
                },
                views: {
                    "content@app": {
                        controller: 'fumigationApproveCtrl',
                        templateUrl: 'app/intelligent/fumigation/views/plan/fumigationApprove-list.html'
                    }
                }
            }
        )
        // 熏蒸方案审批详情
        .state('app.intelligent.fumigation.fumigationApproveEdit', {
                url: '/intelligent/fumigation/fumigationApproveEdit/:fumType/:fumigationId',
                data: {
                    title: '熏蒸方案审批详情'
                },
                views: {
                    "content@app": {
                        controller: 'fumigationApproveEditCtrl',
                        templateUrl: 'app/intelligent/fumigation/views/plan/fumigationApprove-edit.html'
                    }
                }
            }
        )

        // 施药方案申请
        .state('app.intelligent.fumigation.pesticidePlanList', {
                url: '/intelligent/fumigation/pesticidePlanList',
                data: {
                    title: '施药方案申请'
                },
                views: {
                    "content@app": {
                        controller: 'pesticidePlanCtrl',
                        templateUrl: 'app/intelligent/fumigation/views/plan/pesticidePlan-list.html'
                    }
                }
            }
        )
        // 施药方案申请详情
        .state('app.intelligent.fumigation.pesticidePlanEdit', {
                url: '/intelligent/fumigation/pesticidePlanEdit/:fumType/:pesticideId',
                data: {
                    title: '施药方案申请详情'
                },
                views: {
                    "content@app": {
                        controller: 'pesticidePlanEditCtrl',
                        templateUrl: 'app/intelligent/fumigation/views/plan/pesticidePlan-edit.html'
                    }
                }
            }
        )
        // 施药方案实施
        .state('app.intelligent.fumigation.pesticideApproveList', {
                url: '/intelligent/fumigation/pesticideApproveList',
                data: {
                    title: '施药方案实施'
                },
                views: {
                    "content@app": {
                        controller: 'pesticideApproveCtrl',
                        templateUrl: 'app/intelligent/fumigation/views/plan/pesticideApprove-list.html'
                    }
                }
            }
        )
        // 施药方案实施详情
        .state('app.intelligent.fumigation.pesticideApproveEdit', {
                url: '/intelligent/fumigation/pesticideApproveEdit/:fumType/:pesticideId',
                data: {
                    title: '施药方案实施详情'
                },
                views: {
                    "content@app": {
                        controller: 'pesticideApproveEditCtrl',
                        templateUrl: 'app/intelligent/fumigation/views/plan/pesticideApprove-edit.html'
                    }
                }
            }
        )
        // 熏蒸方案记录
        .state('app.intelligent.fumigation.fumigationList', {
                url: '/intelligent/fumigation/fumigationList/:id/:homePage',
                data: {
                    title: '熏蒸方案记录'
                },
                views: {
                    "content@app": {
                        controller: 'planQueryCtrl',
                        templateUrl: 'app/intelligent/fumigation/views/plan/fumigation-list.html'
                    }
                }
            }
        )
        //熏蒸通风控制
        .state('app.intelligent.fumigation.aerationControl', {
            url: '/intelligent/aeration/aerationControl/:aerationType',
            data: {
                title: '熏蒸通风控制'
            },
            params: {
                aerationType : "fumigation"
            },
            views: {
                "content@app": {
                    controller: 'aerationTaskControl',
                    templateUrl: 'app/intelligent/fumigation/views/homework/fumAerationTaskControl-list.html'
                }
            }
        })
        // 熏蒸作业过程列表
        .state('app.intelligent.fumigation.fumHomeWorkProcess', {
                url: '/intelligent/fumigation/fumHomeWorkProcess',
                data: {
                    title: '熏蒸作业过程列表'
                },
                views: {
                    "content@app": {
                        controller: 'fumHomeWorkCtrl',
                        templateUrl: 'app/intelligent/fumigation/views/homework/fumHomeWorkProcess-list.html'
                    }
                }
            }
        )
        // 熏蒸作业过程详情
        .state('app.intelligent.fumigation.fumHomeWorkProcessEdit', {
                url: '/intelligent/fumigation/fumHomeWorkProcessEdit/:fumType/:homeWorkId',
                data: {
                    title: '熏蒸作业过程详情'
                },
                views: {
                    "content@app": {
                        controller: 'fumHomeWorkEditCtrl',
                        templateUrl: 'app/intelligent/fumigation/views/homework/fumHomeWorkProcess-edit.html'
                    }
                }
            }
        )
        // 熏蒸作业善后
        .state('app.intelligent.fumigation.fumHomeWorkAfter', {
                url: '/intelligent/fumigation/fumHomeWorkAfter',
                data: {
                    title: '熏蒸作业善后'
                },
                views: {
                    "content@app": {
                        controller: 'fumHomeWorkAfterCtrl',
                        templateUrl: 'app/intelligent/fumigation/views/homework/fumHomeWorkAfter-list.html'
                    }
                }
            }
        )
        // 熏蒸作业善后详情
        .state('app.intelligent.fumigation.fumHomeWorkAfterEdit', {
                url: '/intelligent/fumigation/fumHomeWorkAfterEdit/:fumType/:homeWorkId',
                data: {
                    title: '熏蒸作业善后详情'
                },
                views: {
                    "content@app": {
                        controller: 'fumHomeWorkAfterEditCtrl',
                        templateUrl: 'app/intelligent/fumigation/views/homework/fumHomeWorkAfter-edit.html'
                    }
                }
            }
        )
        // 熏蒸作业单
        .state('app.intelligent.fumigation.fumHomeWorkSingle', {
                url: '/intelligent/fumigation/fumHomeWorkSingle',
                data: {
                    title: '熏蒸作业单'
                },
                views: {
                    "content@app": {
                        controller: 'homeWorkQueryCtrl',
                        templateUrl: 'app/intelligent/fumigation/views/homework/fumHomeWorkSingle-list.html'
                    }
                }
            }
        )
        // 能耗检测
        .state('app.intelligent.fumigation.detectionList', {
                url: '/intelligent/fumigation/detectionList/:type',
                data: {
                    title: '能耗检测'
                },
                views: {
                    "content@app": {
                        controller: 'detectionCtrl',
                        templateUrl: 'app/intelligent/energyMonitor/views/detection-list.html'
                    }
                }
            }
        )

        /*-----------------------------气体检测-----------------------------*/
        // 二级路由--气体检测
        .state('app.intelligent.gasDetection', {
            abstract: true,
            data: {
                title: '气体检测'
            }
        })
        // 气体检测-列表
        .state('app.intelligent.gasDetection.gasDetectionList', {
                url: '/intelligent/gasDetection/gasDetectionList',
                data: {
                    title: '气体检测'
                },
                views: {
                    "content@app": {
                        controller: 'gasDetectionCtrl',
                        templateUrl: 'app/intelligent/gasDetection/views/gasDetection-list.html'
                    }
                }
            }
        )
        // 气体检测-分布图查看
        .state('app.intelligent.gasDetection.gasDetectionList.gasDetectionView', {
                url: '/intelligent/gasDetection/gasDetectionList/gasDetectionView/:vCfCode/:vValueTime',
                data: {
                    title: '分布图'
                },
                views: {
                    "content@app": {
                        controller: 'gasDetectionViewCtrl',
                        templateUrl: 'app/intelligent/gasDetection/views/gasDetection-view.html'
                    }
                },
                resolve: {
                    scripts: function(lazyScript){
                        return lazyScript.register([
                            'build/vendor.graphs.js'
                        ]);
                    }
                }
            }
        )
        // 气体检测记录
        .state('app.intelligent.gasDetection.recordList', {
                url: '/intelligent/gasDetection/recordList/:show/:vCfCode',
                data: {
                    title: '气体检测记录'
                },
                views: {
                    "content@app": {
                        controller: 'recordCtrl',
                        templateUrl: 'app/intelligent/gasDetection/views/record-list.html'
                    }
                }
            }
        )
        /*-----------------------------粮食数量监测-----------------------------*/
        // 二级路由--粮食数量监测
        .state('app.intelligent.numberMonitor', {
            abstract: true,
            data: {
                title: '粮食数量监测'
            }
        })
        // 新增,编辑 定时任务
        .state('app.intelligent.numberMonitor.taskSchemaList.edit', {
                url: '/intelligent/numberMonitor/taskSchemaList/edit/:id/:type',
                data: {
                    title: '编辑'
                },
                views: {
                    "content@app": {
                        controller: 'batchTimingTaskSaveCtrl',
                        templateUrl: 'app/intelligent/intelligentDetection/views/batchTimingTask-add.html'
                    }
                }
            }
        )
        // 数量检测分析预警
        .state('app.intelligent.numberMonitor.monitorWarning', {
                url: '/intelligent/numberMonitor/monitorWarning',
                data: {
                    title: '数量检测分析预警'
                },
                views: {
                    "content@app": {
                        controller: 'monitorWarningCtrl',
                        templateUrl: 'app/intelligent/grainNumberMonitor/views/monitorWarning.html'
                    }
                }
            }
        )
        // 数量检测记录
        .state('app.intelligent.numberMonitor.warningHistory', {
                url: '/intelligent/numberMonitor/warningHistory',
                data: {
                    title: '数量检测记录'
                },
                views: {
                    "content@app": {
                        controller: 'warningHistoryCtrl',
                        templateUrl: 'app/intelligent/grainNumberMonitor/views/warningHistory.html'
                    }
                }
            }
        )
        // 高清成像
        .state('app.intelligent.numberMonitor.definitionTV', {
                url: '/intelligent/numberMonitor/definitionTV',
                data: {
                    title: '高清成像'
                },
                views: {
                    "content@app": {
                        controller: 'definitionTVCtrl',
                        templateUrl: 'app/intelligent/grainNumberMonitor/views/definitionTV.html'
                    }
                }
            }
        )
        // 远程监控
        .state('app.intelligent.numberMonitor.remoteMonitor', {
                url: '/intelligent/numberMonitor/remoteMonitor',
                data: {
                    title: '远程监控'
                },
                views: {
                    "content@app": {
                        controller: 'remoteMonitorCtrl',
                        templateUrl: 'app/intelligent/grainNumberMonitor/views/remoteMonitor.html'
                    }
                }
            }
        )
        /*-----------------------------能耗监测-----------------------------*/
        // 二级路由--能耗监测
        .state('app.intelligent.energyMonitor', {
            abstract: true,
            data: {
                title: '能耗监测'
            }
        })
        // 三级路由--能耗电表
        .state('app.intelligent.energyMonitor.energyAmmeter', {
            abstract: true,
            data: {
                title: '能耗电表'
            }
        })
        // 能耗电表

        // 能耗电表设置
        .state('app.intelligent.energyMonitor.ammeterSetting', {
                url: '/intelligent/energyMonitor/ammeterSetting',
                data: {
                    title: '能耗电表设置'
                },
                views: {
                    "content@app": {
                        controller: 'ammeterSettingCtrl',
                        templateUrl: 'app/intelligent/energyMonitor/views/ammeterSetting-list.html'
                    }
                }
            }
        )
        //能耗电表新增编辑
        .state('app.intelligent.energyMonitor.ammeterSetting.edit', {
                url: '/intelligent/energyMonitor/ammeterSetting/edit/:id/:type',
                data: {
                    title: '能耗电表信息编辑'
                },
                views: {
                    "content@app": {
                        controller: 'ammeterSettingEditCtrl',
                        templateUrl: 'app/intelligent/energyMonitor/views/ammeterSetting-edit.html'
                    }
                }
            }
        )
        // 能耗电表查询
        .state('app.intelligent.energyMonitor.meterQuery', {
                url: '/intelligent/energyMonitor/meterQuery',
                data: {
                    title: '能耗电表查询'
                },
                views: {
                    "content@app": {
                        controller: 'meterQueryCtrl',
                        templateUrl: 'app/intelligent/energyMonitor/views/meterQuery-list.html'
                    }
                }
            }
        )

        // 能耗检测
        .state('app.intelligent.energyMonitor.detectionList', {
                url: '/intelligent/energyMonitor/detectionList/:type',
                data: {
                    title: '能耗检测'
                },
                views: {
                    "content@app": {
                        controller: 'detectionCtrl',
                        templateUrl: 'app/intelligent/energyMonitor/views/detection-list.html'
                    }
                }
            }
        )
        // 能耗趋势
        .state('app.intelligent.energyMonitor.trendList', {
                url: '/intelligent/energyMonitor/trendList',
                data: {
                    title: '能耗趋势'
                },
                views: {
                    "content@app": {
                        controller: 'trendCtrl',
                        templateUrl: 'app/intelligent/energyMonitor/views/trend-list.html'
                    }
                },
                resolve: {
                    scripts: function(lazyScript){
                        return lazyScript.register([
                            'build/vendor.graphs.js'
                        ]);
                    }
                }
            }
        )
        // 能耗时间点对比
        .state('app.intelligent.energyMonitor.timePointComparison', {
                url: '/intelligent/energyMonitor/timePointComparison',
                data: {
                    title: '能耗时间点对比'
                },
                views: {
                    "content@app": {
                        controller: 'timePointComparisonCtrl',
                        templateUrl: 'app/intelligent/energyMonitor/views/timePointComparison-list.html'
                    }
                },
                resolve: {
                    scripts: function(lazyScript){
                        return lazyScript.register([
                            'build/vendor.graphs.js'
                        ]);
                    }
                }
            }
        )
        // 能耗时间段对比
        .state('app.intelligent.energyMonitor.timeComparison', {
                url: '/intelligent/energyMonitor/timeComparison',
                data: {
                    title: '能耗时间段对比'
                },
                views: {
                    "content@app": {
                        controller: 'timeComparisonCtrl',
                        templateUrl: 'app/intelligent/energyMonitor/views/timeComparison-list.html'
                    }
                },
                resolve: {
                    scripts: function(lazyScript){
                        return lazyScript.register([
                            'build/vendor.graphs.js'
                        ]);
                    }
                }
            }
        )
        // 按时段统计能耗
        .state('app.intelligent.energyMonitor.dailyConsumption', {
                url: '/intelligent/energyMonitor/dailyConsumption',
                data: {
                    title: '按时段统计能耗'
                },
                views: {
                    "content@app": {
                        controller: 'dailyConsumptionCtrl',
                        templateUrl: 'app/intelligent/energyMonitor/views/dailyConsumption-list.html'
                    }
                }
            }
        )

        /*-----------------------------------------智能通风---------------------------*/
        .state('app.intelligent.aeration', {
            abstract: true,
            data: {
                title: '智能通风'
            }
        })
        /*-------通风计划------*/
        .state('app.intelligent.aeration.plan', {
            abstract: true,
            data: {
                title: '通风计划'
            }
        })
        .state('app.intelligent.aeration.plan.apply', {
                url: '/intelligent/aeration/plan/apply/:approvalState',
                data: {
                    title: '通风计划申请列表'
                },
                views: {
                    "content@app": {
                        controller: 'aerationTaskCtrl',
                        templateUrl: 'app/intelligent/aeration/views/aerationTaskApply-list.html'
                    }
                }
            }
        )

        .state('app.intelligent.aeration.plan.applyEdit', {
            url: '/intelligent/aeration/plan/applyEdit/:id/:butId/:pageType/:taskId/:auditId',
            data: {
                title: '通风计划申请'
            },
            views: {
                "content@app": {
                    controller: 'aerationTaskEdit',
                    templateUrl: 'app/intelligent/aeration/views/aerationTaskApply-edit.html'
                }
            }
        })

        .state('app.intelligent.aeration.control', {
            abstract: true,
            data: {
                title: '通风控制'
            }
        })

        .state('app.intelligent.aeration.control.aerationRecord', {
                url: '/intelligent/aeration/control/aerationRecord',
                data: {
                    title: '通风记录'
                },
                views: {
                    "content@app": {
                        controller: 'aerationTaskRecordCtrl',
                        templateUrl: 'app/intelligent/aeration/views/aerationTaskRecord-list.html'
                    }
                }
            }
        )

        //通风方案审批查询页面
        .state('app.intelligent.aeration.plan.audit', {
            url: '/intelligent/aeration/plan/audit',
            data: {
                title: '通风计划审批'
            },
            views: {
                "content@app": {
                    controller: 'approvalCtrl',
                    templateUrl: 'app/intelligent/aeration/views/aerationTaskApproval-list.html'
                }
            }
        })

        //通风审批已通过计划
        .state('app.intelligent.aeration.plan.auditPass', {
            url: '/intelligent/aeration/plan/auditPass/:approvalState',
            data: {
                title: '通风计划已审批'
            },
            views: {
                "content@app": {
                    controller: 'aerationTaskCtrl',
                    templateUrl: 'app/intelligent/aeration/views/aerationTaskApplyPass-list.html'
                }
            }
        })


        //通风参数值设置列表
        .state('app.intelligent.aeration.control.aerationParameter', {
            url: '/intelligent/aeration/control/aerationParameter',
            data: {
                title: '通风参数值设置'
            },
            views: {
                "content@app": {
                    controller: 'aerationParameterCtrl',
                    templateUrl: 'app/intelligent/aeration/views/aerationParameter-list.html'
                }
            }
        })


        //通风参数值设置新增
        .state('app.intelligent.aeration.control.aerationParameter-add', {
                url: '/intelligent/aeration/control/aerationParameter-add/:id',
                data: {
                    title: '新增'
                },
                views: {
                    "content@app": {
                        controller: 'aerationParameterEditCtrl',
                        templateUrl: 'app/intelligent/aeration/views/aerationParameter-edit.html'
                    }
                }
            }
        )

        // 粮油信息设置-修改
        .state('app.intelligent.aeration.control.aerationParameter-edit', {
                url: '/intelligent/aeration/control/aerationParameter-edit/:id',
                data: {
                    title: '修改'
                },
                params: {
                    "isNotEdit" : false
                },
                views: {
                    "content@app": {
                        controller: 'aerationParameterEditCtrl',
                        templateUrl: 'app/intelligent/aeration/views/aerationParameter-edit.html'
                    }
                }
            }
        )
        // 粮油信息设置-查看
        .state('app.intelligent.aeration.control.aerationParameter-view', {
                url: '/intelligent/aeration/control/aerationParameter-view/:id',
                data: {
                    title: '查看'
                },
                params: {
                    "isNotEdit" : true
                },
                views: {
                    "content@app": {
                        controller: 'aerationParameterEditCtrl',
                        templateUrl: 'app/intelligent/aeration/views/aerationParameter-edit.html'
                    }
                }
            }
        )
        //通风能耗监测
        .state('app.intelligent.aeration.control.detectionList', {
                url: '/intelligent/aeration/control/detectionList/:type',
                data: {
                    title: '能耗检测'
                },
                views: {
                    "content@app": {
                        controller: 'detectionCtrl',
                        templateUrl: 'app/intelligent/energyMonitor/views/detection-list.html'
                    }
                }
            }
        )

        //通风控制
        .state('app.intelligent.aeration.control.aerationControl', {
            url: '/intelligent/aeration/control/aerationControl/:approvalState',
            data: {
                title: '通风控制'
            },
            views: {
                "content@app": {
                    controller: 'aerationTaskControl',
                    templateUrl: 'app/intelligent/aeration/views/aerationTaskControl-list.html'
                }
            }
        })

        //通风作业
        .state('app.intelligent.aeration.control.aerationJob', {
            url: '/intelligent/aeration/control/aerationJob',
            data: {
                title: '通风作业'
            },
            views: {
                "content@app": {
                    controller: 'aerationJobCtrl',
                    templateUrl: 'app/intelligent/aeration/views/aerationJob-list.html'
                }
            }
        })

        //通风作业过程查看
        .state('app.intelligent.aeration.control.aerationJob-view', {
                url: '/intelligent/aeration/control/aerationJob-view/:id',
                data: {
                    title: '查看'
                },
                params: {
                    "isNotEdit" : true
                },
                views: {
                    "content@app": {
                        controller: 'aerationJobEditCtrl',
                        templateUrl: 'app/intelligent/aeration/views/aerationJob-edit.html'
                    }
                }
            }
        )


        //通风分析
        .state('app.intelligent.aeration.analyze', {
            abstract: true,
            data: {
                title: '通风分析'
            }
        })


        //通风效果对比
        .state('app.intelligent.aeration.analyze.compare', {
            url: '/intelligent/aeration/analyze/compare',
            data: {
                title: '通风效果对比'
            },
            views: {
                "content@app": {
                    controller: 'aerationCompareCtrl',
                    templateUrl: 'app/intelligent/aeration/views/aerationCompare-list.html'
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
        
        
        .state('app.intelligent.aeration.control.operationRecord', {
                url: '/intelligent/aeration/control/operationRecord',
                data: {
                    title: '通风记录'
                },
                views: {
                    "content@app": {
                        controller: 'aerationOperationRecordCtrl',
                        templateUrl: 'app/intelligent/aeration/views/aerationOperationRecord-list.html'
                    }
                }
            }
        )
        
        .state('app.intelligent.aeration.control.operationRecord-add', {
                url: '/intelligent/aeration/control/operationRecord-add/:id',
                data: {
                    title: '新增'
                },
                views: {
                    "content@app": {
                        controller: 'aerationOperationRecordEditCtrl',
                        templateUrl: 'app/intelligent/aeration/views/aerationOperationRecord-edit.html'
                    }
                }
            }
        )

        // -修改
        .state('app.intelligent.aeration.control.operationRecord-edit', {
                url: '/intelligent/aeration/control/operationRecord-edit/:id',
                data: {
                    title: '修改'
                },
                params: {
                    "isNotEdit" : false
                },
                views: {
                    "content@app": {
                        controller: 'aerationOperationRecordEditCtrl',
                        templateUrl: 'app/intelligent/aeration/views/aerationOperationRecord-edit.html'
                    }
                }
            }
        )
        // 粮油信息设置-查看
        .state('app.intelligent.aeration.control.operationRecord-view', {
                url: '/intelligent/aeration/control/operationRecord-view/:id',
                data: {
                    title: '查看'
                },
                params: {
                    "isNotEdit" : true
                },
                views: {
                    "content@app": {
                        controller: 'aerationOperationRecordEditCtrl',
                        templateUrl: 'app/intelligent/aeration/views/aerationOperationRecord-edit.html'
                    }
                }
            }
        )
        /*------------------------气象环境监测开始--------------------------*/
        // 二级路由--基础数据
        .state('app.intelligent.weather', {
            abstract: true,
            data: {
                title: '气象环境监测'
            }
        })
        // 气象管理信息
        .state('app.intelligent.weather.weatherManager', {
                url: '/intelligent/weather/weatherManager',
                data: {
                    title: '气象管理'
                },
                views: {
                    "content@app": {
                        controller: 'weatherDetectionCtrl',
                        templateUrl: 'app/intelligent/weather/views/weather-index.html'
                    }
                }
            }
        )
        // 气象管理信息
        .state('app.intelligent.weather.weatherHsitory', {
                url: '/intelligent/weather/weatherHsitory',
                data: {
                    title: '气象历史数据'
                },
                views: {
                    "content@app": {
                        controller: 'weatherDetectionCtrl',
                        templateUrl: 'app/intelligent/weather/views/wertherhsitory-list.html'
                    }
                }
            }
        )
        // 气象检测信息
        .state('app.intelligent.weather.weatherDetection', {
                url: '/intelligent/weather/weatherDetection',
                data: {
                    title: '气象检测'
                },
                views: {
                    "content@app": {
                        controller: 'weatherDetectionCtrl',
                        templateUrl: 'app/intelligent/weather/views/weatherDetection-list.html'
                    }
                }
            }
        )
        // 气象设备管理
        .state('app.intelligent.weather.weatherDeviceManager', {
                url: '/intelligent/weather/weatherDeviceManager',
                data: {
                    title: '气象设备管理'
                },
                views: {
                    "content@app": {
                        controller: 'wertherinfoCtrl',
                        templateUrl: 'app/intelligent/weather/views/wertherinfo-list.html'
                    }
                }
            }
        )
        //新增编辑
        .state('app.intelligent.weather.weatherDeviceManager.add', {
                url: '/intelligent/weather/weatherDeviceManager/add/:id',
                data: {
                    title: '新增'
                },
                views: {
                    "content@app": {
                        controller: 'wertherinfoSaveCtrl',
                        templateUrl: 'app/intelligent/weather/views/wertherinfo-edit.html'
                    }
                }
            }
        )
        //-修改
        .state('app.intelligent.weather.weatherDeviceManager.edit', {
                url: '/intelligent/weather/weatherDeviceManager/edit/:id',
                data: {
                    title: '修改'
                },
                params: {
                    "isNotEdit" : false
                },
                views: {
                    "content@app": {
                        controller: 'wertherinfoSaveCtrl',
                        templateUrl: 'app/intelligent/weather/views/wertherinfo-edit.html'
                    }
                }
            }
        )
        // -查看
        .state('app.intelligent.weather.weatherDeviceManager.view', {
                url: '/intelligent/weather/weatherDeviceManager/view/:id/:isDisplay',
                data: {
                    title: '查看'
                },
                params: {
                    "isNotEdit" : true
                },
                views: {
                    "content@app": {
                        controller: 'wertherinfoSaveCtrl',
                        templateUrl: 'app/intelligent/weather/views/wertherinfo-edit.html'
                    }
                }
            }
        )
        /*------------------------气象环境监测结束--------------------------*/

        // 按作业统计能耗
        .state('app.intelligent.energyMonitor.taskConsumption', {
                url: '/intelligent/energyMonitor/taskConsumption',
                data: {
                    title: '按作业统计能耗'
                },
                views: {
                    "content@app": {
                        controller: 'taskConsumptionCtrl',
                        templateUrl: 'app/intelligent/energyMonitor/views/taskConsumption-list.html'
                    }
                }
            }
        )

        /*-----------------------------统计报表-----------------------------*/
        // 二级路由--统计报表
        .state('app.intelligent.statisticalReport', {
            abstract: true,
            data: {
                title: '统计报表'
            }
        })
        // 汇总报表
        .state('app.intelligent.statisticalReport.summaryReport', {
                url: '/intelligent/statisticalReport/summaryReport',
                data: {
                    title: '汇总报表'
                },
                views: {
                    "content@app": {
                        controller: 'summaryReportCtrl',
                        templateUrl: 'app/intelligent/statisticalReport/views/summaryReport-list.html'
                    }
                }
            }
        )
        // 详情报表
        .state('app.intelligent.statisticalReport.detailsReport', {
                url: '/intelligent/statisticalReport/detailsReport',
                data: {
                    title: '详情报表'
                },
                views: {
                    "content@app": {
                        controller: 'detailsReportCtrl',
                        templateUrl: 'app/intelligent/statisticalReport/views/detailsReport-list.html'
                    }
                }
            }
        )
        // 上报报表
        .state('app.intelligent.statisticalReport.submitReport', {
                url: '/intelligent/statisticalReport/submitReport',
                data: {
                    title: '上报报表'
                },
                views: {
                    "content@app": {
                        controller: 'submitReportCtrl',
                        templateUrl: 'app/intelligent/statisticalReport/views/submitReport-list.html'
                    }
                }
            }
        )
        /*------------------------低温储粮--------------------------*/
        // 二级路由--低温储粮
        .state('app.intelligent.coldStorage', {
            abstract: true,
            data: {
                title: '低温储粮'
            }
        })
        // 空调控制
        .state('app.intelligent.coldStorage.airConditionControl', {
                url: '/intelligent/coldStorage/airConditionControl',
                data: {
                    title: '空调控制'
                },
                views: {
                    "content@app": {
                        controller: 'airConditionControlCtrl',
                        templateUrl: 'app/intelligent/coldStorage/views/airConditionControl.html'
                    }
                }
            }
        )
        // 空调作业记录
        .state('app.intelligent.coldStorage.airConditionJobHistory', {
                url: '/intelligent/coldStorage/airConditionJobHistory',
                data: {
                    title: '空调作业记录'
                },
                views: {
                    "content@app": {
                        controller: 'airConditionJobHistoryCtrl',
                        templateUrl: 'app/intelligent/coldStorage/views/airConditionJobHistory.html'
                    }
                }
            }
        )

        /*------------------------内环流--------------------------*/
        // 二级路由--低温储粮
        .state('app.intelligent.insideCirculation', {
            abstract: true,
            data: {
                title: '内环流'
            }
        })

        // 内环流控制
        .state('app.intelligent.insideCirculation.insideCirculationControl', {
                url: '/intelligent/insideCirculation/insideCirculationControl',
                data: {
                    title: '内环流控制'
                },
                views: {
                    "content@app": {
                        controller: 'insideCirculationCtrl',
                        templateUrl: 'app/intelligent/insideCirculation/views/insideCirculationControl.html'
                    }
                }
            }
        )
        // 内环流记录
        .state('app.intelligent.insideCirculation.insideCirculationRecord', {
                url: '/intelligent/insideCirculation/insideCirculationRecord',
                data: {
                    title: '内环流记录'
                },
                views: {
                    "content@app": {
                        controller: 'insideCirculationHistoryCtrl',
                        templateUrl: 'app/intelligent/insideCirculation/views/airConditionJobHistory.html'
                    }
                }
            }
        )

        /*------------------------气调管理--------------------------*/
        // 二级路由--气调管理
        .state('app.intelligent.controlledAtmosphere', {
            abstract: true,
            data: {
                title: '气调管理'
            }
        })

        // 气调控制
        .state('app.intelligent.controlledAtmosphere.control', {
                url: '/intelligent/controlledAtmosphere/control',
                data: {
                    title: '气调控制'
                },
                views: {
                    "content@app": {
                        controller: 'controlledAtmosphereCtrl',
                        templateUrl: 'app/intelligent/controlledAtmosphere/views/controlledAtmosphereList.html'
                    }
                }
            }
        )
        // 气调作业记录
        .state('app.intelligent.controlledAtmosphere.record', {
                url: '/intelligent/controlledAtmosphere/record',
                data: {
                    title: '气调作业记录'
                },
                views: {
                    "content@app": {
                        controller: 'controlledAtmosphereHistoryCtrl',
                        templateUrl: 'app/intelligent/controlledAtmosphere/views/controlledAtmosphereHistory.html'
                    }
                }
            }
        )

        // 充氮控制
        .state('app.intelligent.controlledAtmosphere.nitrogenChargingControl', {
                url: '/intelligent/controlledAtmosphere/nitrogenChargingcontrol',
                data: {
                    title: '充氮控制'
                },
                views: {
                    "content@app": {
                        controller: 'nitrogenChargingCtrl',
                        templateUrl: 'app/intelligent/controlledAtmosphere/views/nitrogenChargingList.html'
                    }
                }
            }
        )
        // 充氮作业记录
        .state('app.intelligent.controlledAtmosphere.nitrogenChargingRecord', {
                url: '/intelligent/controlledAtmosphere/nitrogenChargingRecord',
                data: {
                    title: '充氮作业记录'
                },
                views: {
                    "content@app": {
                        controller: 'nitrogenChargingHistoryCtrl',
                        templateUrl: 'app/intelligent/controlledAtmosphere/views/nitrogenChargingHistory.html'
                    }
                }
            }
        )


        /*------------------------智能检测开始--------------------------*/
        .state('app.intelligent.intelligentDetection', {
            abstract: true,
            data: {
                title: '智能监测'
            }
        })
        // 测温记录
        .state('app.intelligent.intelligentDetection.grain', {
                url: '/intelligent/intelligentDetection/grain/:type',
                data: {
                    title: '粮情监测'
                },
                views: {
                    "content@app": {
                        controller: 'batchTaskSchemaCtrl',
                        templateUrl: 'app/intelligent/intelligentDetection/views/batchTaskSchema-list.html'
                    }
                }
            }
        )
        // 新增,编辑 定时任务
        .state('app.intelligent.intelligentDetection.grain.edit', {
                url: '/intelligent/intelligentDetection/grain/edit/:id/:type',
                data: {
                    title: '编辑'
                },
                views: {
                    "content@app": {
                        controller: 'batchTimingTaskSaveCtrl',
                        templateUrl: 'app/intelligent/intelligentDetection/views/batchTimingTask-add.html'
                    }
                }
            }
        )
        // 害虫记录
        .state('app.intelligent.intelligentDetection.insect', {
                url: '/intelligent/intelligentDetection/insect/:type',
                data: {
                    title: '虫害监测'
                },
                views: {
                    "content@app": {
                        controller: 'batchTaskSchemaCtrl',
                        templateUrl: 'app/intelligent/intelligentDetection/views/batchTaskSchema-list.html'
                    }
                }
            }
        )
        // 新增,编辑 定时任务
        .state('app.intelligent.intelligentDetection.insect.edit', {
                url: '/intelligent/intelligentDetection/insect/edit/:id/:type',
                data: {
                    title: '编辑'
                },
                views: {
                    "content@app": {
                        controller: 'batchTimingTaskSaveCtrl',
                        templateUrl: 'app/intelligent/intelligentDetection/views/batchTimingTask-add.html'
                    }
                }
            }
        )
        // 气体记录
        .state('app.intelligent.intelligentDetection.gas', {
                url: '/intelligent/intelligentDetection/gas/:type',
                data: {
                    title: '气体监测'
                },
                views: {
                    "content@app": {
                        controller: 'batchTaskSchemaCtrl',
                        templateUrl: 'app/intelligent/intelligentDetection/views/batchTaskSchema-list.html'
                    }
                }
            }
        )
        // 新增,编辑 定时任务
        .state('app.intelligent.intelligentDetection.gas.edit', {
                url: '/intelligent/intelligentDetection/gas/edit/:id/:type',
                data: {
                    title: '编辑'
                },
                views: {
                    "content@app": {
                        controller: 'batchTimingTaskSaveCtrl',
                        templateUrl: 'app/intelligent/intelligentDetection/views/batchTimingTask-add.html'
                    }
                }
            }
        )
        // 能耗记录
        .state('app.intelligent.intelligentDetection.energy', {
                url: '/intelligent/intelligentDetection/energy/:type',
                data: {
                    title: '能耗监测'
                },
                views: {
                    "content@app": {
                        controller: 'batchTaskSchemaCtrl',
                        templateUrl: 'app/intelligent/intelligentDetection/views/batchTaskSchema-list.html'
                    }
                }
            }
        )
        // 新增,编辑 定时任务
        .state('app.intelligent.intelligentDetection.energy.edit', {
                url: '/intelligent/intelligentDetection/energy/edit/:id/:type',
                data: {
                    title: '编辑'
                },
                views: {
                    "content@app": {
                        controller: 'batchTimingTaskSaveCtrl',
                        templateUrl: 'app/intelligent/intelligentDetection/views/batchTimingTask-add.html'
                    }
                }
            }
        )
        // 水分监测
        .state('app.intelligent.intelligentDetection.dew', {
                url: '/intelligent/intelligentDetection/dew/:type',
                data: {
                    title: '水分监测'
                },
                views: {
                    "content@app": {
                        controller: 'batchTaskSchemaCtrl',
                        templateUrl: 'app/intelligent/intelligentDetection/views/batchTaskSchema-list.html'
                    }
                }
            }
        )
        // 新增,编辑 定时任务
        .state('app.intelligent.intelligentDetection.dew.edit', {
                url: '/intelligent/intelligentDetection/dew/edit/:id/:type',
                data: {
                    title: '编辑'
                },
                views: {
                    "content@app": {
                        controller: 'batchTimingTaskSaveCtrl',
                        templateUrl: 'app/intelligent/intelligentDetection/views/batchTimingTask-add.html'
                    }
                }
            }
        )
        // 气象监测
        .state('app.intelligent.intelligentDetection.meteorology', {
                url: '/intelligent/intelligentDetection/meteorology/:type',
                data: {
                    title: '气象监测'
                },
                views: {
                    "content@app": {
                        controller: 'batchTaskSchemaCtrl',
                        templateUrl: 'app/intelligent/intelligentDetection/views/batchTaskSchema-list.html'
                    }
                }
            }
        )
        // 新增,编辑 定时任务
        .state('app.intelligent.intelligentDetection.meteorology.edit', {
                url: '/intelligent/intelligentDetection/meteorology/edit/:id/:type',
                data: {
                    title: '编辑'
                },
                views: {
                    "content@app": {
                        controller: 'batchTimingTaskSaveCtrl',
                        templateUrl: 'app/intelligent/intelligentDetection/views/batchTimingTask-add.html'
                    }
                }
            }
        )
        // 数量监测
        .state('app.intelligent.intelligentDetection.number', {
                url: '/intelligent/intelligentDetection/number/:type',
                data: {
                    title: '数量监测'
                },
                views: {
                    "content@app": {
                        controller: 'batchTaskSchemaCtrl',
                        templateUrl: 'app/intelligent/intelligentDetection/views/batchTaskSchema-list.html'
                    }
                }
            }
        )
        // 新增,编辑 定时任务
        .state('app.intelligent.intelligentDetection.number.edit', {
                url: '/intelligent/intelligentDetection/number/edit/:id/:type',
                data: {
                    title: '编辑'
                },
                views: {
                    "content@app": {
                        controller: 'batchTimingTaskSaveCtrl',
                        templateUrl: 'app/intelligent/intelligentDetection/views/batchTimingTask-add.html'
                    }
                }
            }
        )
        // 数量结果监测
        .state('app.intelligent.intelligentDetection.numberResult', {
                url: '/intelligent/intelligentDetection/numberResult/:type',
                data: {
                    title: '数量结果监测'
                },
                views: {
                    "content@app": {
                        controller: 'batchTaskSchemaCtrl',
                        templateUrl: 'app/intelligent/intelligentDetection/views/batchTaskSchema-list.html'
                    }
                }
            }
        )
        // 新增,编辑 定时任务
        .state('app.intelligent.intelligentDetection.numberResult.edit', {
                url: '/intelligent/intelligentDetection/numberResult/edit/:id/:type',
                data: {
                    title: '编辑'
                },
                views: {
                    "content@app": {
                        controller: 'batchTimingTaskSaveCtrl',
                        templateUrl: 'app/intelligent/intelligentDetection/views/batchTimingTask-add.html'
                    }
                }
            }
        )
        /*------------------------智能检测结束--------------------------*/
        /*------------------------综合查询开始--------------------------*/
        .state('app.intelligent.comprehensive', {
            abstract: true,
            data: {
                title: '综合查询'
            }
        })
        // 测温记录
        .state('app.intelligent.comprehensive.grain', {
                url: '/intelligent/comprehensive/grain',
                data: {
                    title: '测温记录'
                },
                views: {
                    "content@app": {
                        controller: 'temperatureRecordCtrl',
                        templateUrl: 'app/intelligent/grainDetection/views/temperatureRecord-list.html'
                    }
                }
            }
        )
        // 害虫记录
        .state('app.intelligent.comprehensive.insect', {
                url: '/intelligent/comprehensive/insect',
                data: {
                    title: '害虫记录'
                },
                views: {
                    "content@app": {
                        controller: 'insectPestDetectionCtrl',
                        templateUrl: 'app/intelligent/grainDetection/views/insectPestDetection-list.html'
                    }
                }
            }
        )
        // 气体记录
        .state('app.intelligent.comprehensive.gas', {
                url: '/intelligent/comprehensive/gas',
                data: {
                    title: '气体记录'
                },
                views: {
                    "content@app": {
                        controller: 'recordCtrl',
                        templateUrl: 'app/intelligent/gasDetection/views/record-list.html'
                    }
                }
            }
        )
        // 能耗记录
        .state('app.intelligent.comprehensive.energy', {
                url: '/intelligent/comprehensive/energy/:type',
                data: {
                    title: '能耗记录'
                },
                views: {
                    "content@app": {
                        controller: 'detectionCtrl',
                        templateUrl: 'app/intelligent/energyMonitor/views/detection-list.html'
                    }
                }
            }
        )
        // 报警记录
        .state('app.intelligent.comprehensive.warning', {
                url: '/intelligent/comprehensive/warning',
                data: {
                    title: '报警记录'
                },
                views: {
                    "content@app": {
                        controller: 'warningThresholdCtrl',
                        templateUrl: 'app/intelligent/grainDetection/views/warningThreshold-list.html'
                    }
                }
            }
        )
        // 设备操作记录
        .state('app.intelligent.comprehensive.device', {
                url: '/intelligent/comprehensive/device',
                data: {
                    title: '设备操作记录'
                },
                views: {
                    "content@app": {
                        controller: 'comprehensiveDeviceCtrl',
                        templateUrl: 'app/intelligent/comprehensive/views/comprehensiveDevice-list.html'
                    }
                }
            }
        )
        /*------------------------综合查询结束--------------------------*/
        /*------------------------基础数据--------------------------*/
        // 二级路由--基础数据
        .state('app.intelligent.basicData', {
            abstract: true,
            data: {
                title: '基础数据'
            }
        })
        // 仓房信息设置
        .state('app.intelligent.basicData.basicWareHouseSet', {
                url: '/intelligent/basicData/basicWareHouseSet',
                data: {
                    title: '仓房信息设置'
                },
                views: {
                    "content@app": {
                        controller: 'basicStorehouseCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicWareHouseSet-list.html'
                    }
                }
            }
        )
        //仓房设备新增编辑url: '/storehouseEditReq/:id/:btnType/:orgId/:libraryType',
        .state('app.intelligent.basicData.basicWareHouseSet.add', {
                url: '/intelligent/basicData/basicWareHouseSet/add/:id/:btnType/:orgId/:libraryType',
                data: {
                    title: '新增'
                },
                views: {
                    "content@app": {
                        controller: 'basicStorehouseCtrlEdit',
                        templateUrl: 'app/intelligent/basicData/views/basicWareHouseSet-edit.html'
                    }
                }
            }
        )
        //仓房设备新增编辑url: '/storehouseEditReq/:id/:btnType/:orgId/:libraryType',
        .state('app.intelligent.basicData.basicWareHouseSet.edit', {
                url: '/intelligent/basicData/basicWareHouseSet/edit/:id/:btnType/:orgId/:libraryType',
                data: {
                    title: '修改'
                },
                views: {
                    "content@app": {
                        controller: 'basicStorehouseCtrlEdit',
                        templateUrl: 'app/intelligent/basicData/views/basicWareHouseSet-edit.html'
                    }
                }
            }
        )
        // 仓房信息设置-查看
        .state('app.intelligent.basicData.basicWareHouseSet.view', {
                url: '/intelligent/basicData/basicWareHouseSet/view/:id/:btnType/:orgId/:libraryType',
                data: {
                    title: '查看'
                },
                params: {
                    "isNotEdit" : true
                },
                views: {
                    "content@app": {
                        controller: 'basicStorehouseCtrlEdit',
                        templateUrl: 'app/intelligent/basicData/views/basicWareHouseSet-edit.html'
                    }
                }
            }
        )
        //-----------------------------------------
        // 智能仓房报警-列表
        .state('app.intelligent.basicData.basicTemperaturAalarmList', {
                url: '/intelligent/basicData/basicTemperaturAalarmList',
                data: {
                    title: '报警联系人信息设置'
                },
                views: {
                    "content@app": {
                        controller: 'basicTemperaturAalarmCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicAalarmSet-list.html'
                    }
                }
            }
        )
        // 智能仓房报警-新增新
        .state('app.intelligent.basicData.basicTemperaturAalarmList.add', {
                url: '/intelligent/basicData/basicTemperaturAalarmList/add/:id',
                data: {
                    title: '新增'
                },
                views: {
                    "content@app": {
                        controller: 'basicTemperaturAalarmSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicAalarmSet-edit.html'
                    }
                }
            }
        )


        // 智能仓房报警-修改
        .state('app.intelligent.basicData.basicTemperaturAalarmList.edit', {
                url: '/app/intelligent/basicData/basicTemperaturAalarmList/edit/:id',
                data: {
                    title: '修改'
                },
                params: {
                    "isNotEdit" : false
                },
                views: {
                    "content@app": {
                        controller: 'basicTemperaturAalarmSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicAalarmSet-edit.html'
                    }
                }
            }
        )
        // 粮油信息设置-列表
        .state('app.intelligent.basicData.basicGrainSetList', {
                url: '/intelligent/basicData/basicGrainSetList',
                data: {
                    title: '粮油信息设置'
                },
                views: {
                    "content@app": {
                        controller: 'basicGrainSetCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicGrainSet-list.html'
                    }
                }
            }
        )
        // 粮油信息设置-新增
        .state('app.intelligent.basicData.basicGrainSetList.add', {
                url: '/intelligent/basicData/basicGrainSetList/add/:id',
                data: {
                    title: '新增'
                },
                views: {
                    "content@app": {
                        controller: 'basicGrainSetSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicGrainSet-edit.html'
                    }
                }
            }
        )
        // 粮油信息设置-修改
        .state('app.intelligent.basicData.basicGrainSetList.edit', {
                url: '/intelligent/basicData/basicGrainSetList/edit/:id',
                data: {
                    title: '修改'
                },
                params: {
                    "isNotEdit" : false
                },
                views: {
                    "content@app": {
                        controller: 'basicGrainSetSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicGrainSet-edit.html'
                    }
                }
            }
        )
        // 粮油信息设置-查看
        .state('app.intelligent.basicData.basicGrainSetList.view', {
                url: '/intelligent/basicData/basicGrainSetList/view/:id',
                data: {
                    title: '查看'
                },
                params: {
                    "isNotEdit" : true
                },
                views: {
                    "content@app": {
                        controller: 'basicGrainSetSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicGrainSet-edit.html'
                    }
                }
            }
        )
        //=================================== 设备参数管理===============================
        // 三级路由--设备参数管理
        .state('app.intelligent.basicData.parameter', {
            abstract: true,
            data: {
                title: '设备参数管理'
            }
        })
        // 设备参数管理
        .state('app.intelligent.basicData.parameter.basicGasSet', {
                url: '/intelligent/basicData/parameter/basicGasSet',
                data: {
                    title: '气调设备设置'
                },
                views: {
                    "content@app": {
                        controller: 'basicGasSetCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicGasSet-list.html'
                    }
                }
            }
        )
        //气体设备新增编辑
        .state('app.intelligent.basicData.parameter.basicGasSet.add', {
                url: '/intelligent/basicData/parameter/basicGasSet/add/:id',
                data: {
                    title: '新增'
                },
                views: {
                    "content@app": {
                        controller: 'basicGasSetSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicGasSet-edit.html'
                    }
                }
            }
        )
        // 气体信息设置-修改
        .state('app.intelligent.basicData.parameter.basicGasSet.edit', {
                url: '/intelligent/basicData/parameter/basicGasSet/edit/:id',
                data: {
                    title: '修改'
                },
                params: {
                    "isNotEdit" : false
                },
                views: {
                    "content@app": {
                        controller: 'basicGasSetSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicGasSet-edit.html'
                    }
                }
            }
        )
        // 气体信息设置-查看
        .state('app.intelligent.basicData.parameter.basicGasSet.view', {
                url: '/intelligent/basicData/parameter/basicGasSet/view/:id',
                data: {
                    title: '查看'
                },
                params: {
                    "isNotEdit" : true
                },
                views: {
                    "content@app": {
                        controller: 'basicGasSetSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicGasSet-edit.html'
                    }
                }
            }
        )
        //-----------------------------------------
        .state('app.intelligent.basicData.parameter.basicNitrogenSet', {
                url: '/intelligent/basicData/parameter/basicNitrogenSet',
                data: {
                    title: '氮气房参数设置'
                },
                views: {
                    "content@app": {
                        controller: 'basicNitrogenSetCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicNitrogenSet-list.html'
                    }
                }
            }
        )
        //氮气房新增编辑
        .state('app.intelligent.basicData.parameter.basicNitrogenSet.add', {
                url: '/intelligent/basicData/parameter/basicNitrogenSet/add/:id',
                data: {
                    title: '新增'
                },
                views: {
                    "content@app": {
                        controller: 'basicNitrogenSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicNitrogenSet-edit.html'
                    }
                }
            }
        )
        // 氮气房设置-修改
        .state('app.intelligent.basicData.parameter.basicNitrogenSet.edit', {
                url: '/intelligent/basicData/parameter/basicNitrogenSet/edit/:id',
                data: {
                    title: '修改'
                },
                params: {
                    "isNotEdit" : false
                },
                views: {
                    "content@app": {
                        controller: 'basicNitrogenSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicNitrogenSet-edit.html'
                    }
                }
            }
        )
        // 氮气房设置-查看
        .state('app.intelligent.basicData.parameter.basicNitrogenSet.view', {
                url: '/intelligent/basicData/parameter/basicNitrogenSet/view/:id',
                data: {
                    title: '查看'
                },
                params: {
                    "isNotEdit" : true
                },
                views: {
                    "content@app": {
                        controller: 'basicNitrogenSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicNitrogenSet-edit.html'
                    }
                }
            }
        )
        //===================================
        .state('app.intelligent.basicData.parameter.quantityDetection', {
                url: '/intelligent/basicData/parameter/quantityDetection',
                data: {
                    title: '数量检测设置'
                },
                views: {
                    "content@app": {
                        controller: 'quantityDetectionCtrl',
                        templateUrl: 'app/intelligent/basicData/views/quantityDetection-list.html'
                    }
                }
            }
        )
        //氮气房新增编辑
        .state('app.intelligent.basicData.parameter.quantityDetection.add', {
                url: '/intelligent/basicData/parameter/quantityDetection/add/:id',
                data: {
                    title: '新增'
                },
                views: {
                    "content@app": {
                        controller: 'quantityDetectionSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/quantityDetection-edit.html'
                    }
                }
            }
        )
        // 氮气房设置-修改
        .state('app.intelligent.basicData.parameter.quantityDetection.edit', {
                url: '/intelligent/basicData/parameter/quantityDetection/edit/:id',
                data: {
                    title: '修改'
                },
                params: {
                    "isNotEdit" : false
                },
                views: {
                    "content@app": {
                        controller: 'quantityDetectionSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/quantityDetection-edit.html'
                    }
                }
            }
        )
        // 氮气房设置-查看
        .state('app.intelligent.basicData.parameter.quantityDetection.view', {
                url: '/intelligent/basicData/parameter/quantityDetection/view/:id',
                data: {
                    title: '查看'
                },
                params: {
                    "isNotEdit" : true
                },
                views: {
                    "content@app": {
                        controller: 'quantityDetectionSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/quantityDetection-edit.html'
                    }
                }
            }
        )
        //-----------------虫害参数设置--------------
        .state('app.intelligent.basicData.parameter.insectPestDetection', {
                url: '/intelligent/basicData/parameter/insectDetection',
                data: {
                    title: '虫害检测设置'
                },
                views: {
                    "content@app": {
                        controller: 'insectDetectionCtrl',
                        templateUrl: 'app/intelligent/basicData/views/insectDetection-list.html'
                    }
                }
            }
        )
        //虫害新增编辑
        .state('app.intelligent.basicData.parameter.insectPestDetection.add', {
                url: '/intelligent/basicData/parameter/insectDetection/add/:id',
                data: {
                    title: '新增'
                },
                views: {
                    "content@app": {
                        controller: 'insectDetectionSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/insectDetection-edit.html'
                    }
                }
            }
        )
        // 虫害设置-修改
        .state('app.intelligent.basicData.parameter.insectPestDetection.edit', {
                url: '/intelligent/basicData/parameter/insectPestDetection/edit/:id',
                data: {
                    title: '修改'
                },
                params: {
                    "isNotEdit" : false
                },
                views: {
                    "content@app": {
                        controller: 'insectDetectionSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/insectDetection-edit.html'
                    }
                }
            }
        )
        // 虫害设置-查看
        .state('app.intelligent.basicData.parameter.insectPestDetection.view', {
                url: '/intelligent/basicData/parameter/insectPestDetection/view/:id',
                data: {
                    title: '查看'
                },
                params: {
                    "isNotEdit" : true
                },
                views: {
                    "content@app": {
                        controller: 'insectDetectionSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/insectDetection-edit.html'
                    }
                }
            }
        )
        //----------------气体液位设置------------------
        .state('app.intelligent.basicData.parameter.qtDevinfo', {
                url: '/intelligent/basicData/parameter/qtDevinfo',
                data: {
                    title: '气体液位设置'
                },
                views: {
                    "content@app": {
                        controller: 'qtDevinfoDetectionCtrl',
                        templateUrl: 'app/intelligent/basicData/views/qtDevinfoDetection-list.html'
                    }
                }
            }
        )
        //新增编辑
        .state('app.intelligent.basicData.parameter.qtDevinfo.add', {
                url: '/intelligent/basicData/parameter/qtDevinfo/add/:id',
                data: {
                    title: '新增'
                },
                views: {
                    "content@app": {
                        controller: 'qtDevinfoDetectionSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/qtDevinfoDetection-edit.html'
                    }
                }
            }
        )
        //-修改
        .state('app.intelligent.basicData.parameter.qtDevinfo.edit', {
                url: '/intelligent/basicData/parameter/qtDevinfo/edit/:id',
                data: {
                    title: '修改'
                },
                params: {
                    "isNotEdit" : false
                },
                views: {
                    "content@app": {
                        controller: 'qtDevinfoDetectionSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/qtDevinfoDetection-edit.html'
                    }
                }
            }
        )
        // 设置-查看
        .state('app.intelligent.basicData.parameter.qtDevinfo.view', {
                url: '/intelligent/basicData/parameter/qtDevinfo/view/:id/:isDisplay/:qtDevinfo',
                data: {
                    title: '查看'
                },
                params: {
                    "isNotEdit" : true
                },
                views: {
                    "content@app": {
                        controller: 'qtDevinfoDetectionSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/qtDevinfoDetection-edit.html'
                    }
                }
            }
        )

        //----------------多通道气体液位设置------------------
        .state('app.intelligent.basicData.parameter.dcsQtInfo', {
                url: '/intelligent/basicData/parameter/dcsQtInfo',
                data: {
                    title: '多通道气体液位设置'
                },
                views: {
                    "content@app": {
                        controller: 'dcsQtInfoSetCtrl',
                        templateUrl: 'app/intelligent/basicData/views/dcsQtInfoSet-list.html'
                    }
                }
            }
        )
        // 编辑
        .state('app.intelligent.basicData.parameter.dcsQtInfo.edit', {
                url: '/intelligent/basicData/parameter/dcsQtInfo/edit/:id/:isNotEdit',
                data: {
                    title: '编辑'
                },
                views: {
                    "content@app": {
                        controller: 'dcsQtInfoSetCtrlSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/dcsQtInfoSet-edit.html'
                    }
                }
            }
        )
        //----------------气空调设置------------------
        .state('app.intelligent.basicData.parameter.ktinfo', {
                url: '/intelligent/basicData/parameter/ktinfo',
                data: {
                    title: '空调设置'
                },
                views: {
                    "content@app": {
                        controller: 'ktinfoCtrl',
                        templateUrl: 'app/intelligent/basicData/views/ktinfo-list.html'
                    }
                }
            }
        )
        //新增编辑
        .state('app.intelligent.basicData.parameter.ktinfo.add', {
                url: '/intelligent/basicData/parameter/ktinfo/add/:id',
                data: {
                    title: '新增'
                },
                views: {
                    "content@app": {
                        controller: 'ktinfoSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/ktinfo-edit.html'
                    }
                }
            }
        )
        //-修改
        .state('app.intelligent.basicData.parameter.ktinfo.edit', {
                url: '/intelligent/basicData/parameter/ktinfo/edit/:id',
                data: {
                    title: '修改'
                },
                params: {
                    "isNotEdit" : false
                },
                views: {
                    "content@app": {
                        controller: 'ktinfoSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/ktinfo-edit.html'
                    }
                }
            }
        )
        // -查看
        .state('app.intelligent.basicData.parameter.ktinfo.view', {
                url: '/intelligent/basicData/parameter/ktinfo/view/:id',
                data: {
                    title: '查看'
                },
                params: {
                    "isNotEdit" : true
                },
                views: {
                    "content@app": {
                        controller: 'ktinfoSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/ktinfo-edit.html'
                    }
                }
            }
        )
        //===================================
        // 报警阀值设置-列表
        .state('app.intelligent.basicData.basicThresholdSetList', {
                url: '/intelligent/basicData/basicThresholdSetList',
                data: {
                    title: '报警阀值设置'
                },
                views: {
                    "content@app": {
                        controller: 'basicThresholdSetCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicThresholdSet-list.html'
                    }
                }
            }
        )
        // 报警阀值设置-新增
        .state('app.intelligent.basicData.basicThresholdSetList.add', {
                url: '/intelligent/basicData/basicThresholdSetList/add/:vCfCode',
                data: {
                    title: '新增'
                },
                views: {
                    "content@app": {
                        controller: 'basicThresholdSetSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicThresholdSet-edit.html'
                    }
                }
            }
        )
        // 报警阀值设置-查看
        .state('app.intelligent.basicData.basicThresholdSetList.view', {
                url: '/intelligent/basicData/basicThresholdSetList/view/:vCfCode',
                data: {
                    title: '查看'
                },
                params: {
                    "isNotEdit" : true
                },
                views: {
                    "content@app": {
                        controller: 'basicThresholdSetSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicThresholdSet-edit.html'
                    }
                }
            }
        )
        // 报警阀值设置-修改
        .state('app.intelligent.basicData.basicThresholdSetList.edit', {
                url: '/intelligent/basicData/basicThresholdSetList/edit/:vCfCode',
                data: {
                    title: '修改'
                },
                params: {
                    "isNotEdit" : false
                },
                views: {
                    "content@app": {
                        controller: 'basicThresholdSetSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicThresholdSet-edit.html'
                    }
                }
            }
        )
        // 通讯设置
        .state('app.intelligent.basicData.StationSet', {
                url: '/intelligent/basicData/StationSet',
                data: {
                    title: '通讯设置列表'
                },
                views: {
                    "content@app": {
                        controller: 'basicStationSetCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicStationSet-list.html'
                    }
                }
            }
        )
        //通讯设备新增编辑
        .state('app.intelligent.basicData.StationSet.add', {
                url: '/intelligent/basicData/StationSet/add/:id',
                data: {
                    title: '新增'
                },
                views: {
                    "content@app": {
                        controller: 'basicStationSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicStationSet-edit.html'
                    }
                }
            }
        )
        // 通讯信息设置-修改
        .state('app.intelligent.basicData.StationSet.edit', {
                url: '/intelligent/basicData/StationSet/edit/:id',
                data: {
                    title: '修改'
                },
                params: {
                    "isNotEdit" : false
                },
                views: {
                    "content@app": {
                        controller: 'basicStationSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicStationSet-edit.html'
                    }
                }
            }
        )
        // 通讯信息设置-查看
        .state('app.intelligent.basicData.StationSet.view', {
                url: '/intelligent/basicData/StationSet/view/:id/:displayShow',
                data: {
                    title: '查看'
                },
                params: {
                    "isNotEdit" : true
                },
                views: {
                    "content@app": {
                        controller: 'basicStationSaveCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicStationSet-edit.html'
                    }
                }
            }
        )
        // 站点类型
        .state('app.intelligent.basicData.stationType', {
                url: '/intelligent/basicData/stationType',
                data: {
                    title: '站点类型列表'
                },
                views: {
                    "content@app": {
                        controller: 'basicStationTypeCtrl',
                        templateUrl: 'app/intelligent/basicData/views/basicStationType-list.html'
                    }
                }
            }
        )
        /*------------------------以上是已确定的--------------------------*/

        // 虫害任务设置
        .state('app.intelligent.insectPestDetectionTask', {
                url: '/intelligent/insectPestDetectionTask',
                data: {
                    title: '虫害检测图表'
                },
                views: {
                    "content@app": {
                        controller: 'insectPestDetectionCtrl',
                        templateUrl: 'app/intelligent/insectPestDetection/views/insectPestDetectionTask.html'
                    }
                }
            }
        )
        // 汇总报表
        .state('app.intelligent.summaryReport', {
                url: '/intelligent/summaryReport',
                data: {
                    title: '汇总报表'
                },
                views: {
                    "content@app": {
                        controller: 'summaryReportCtrl',
                        templateUrl: 'app/intelligent/statisticalReport/views/summaryReport-list.html'
                    }
                }
            }
        )
});