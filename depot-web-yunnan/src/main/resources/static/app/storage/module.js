"use strict";
//仓储业务
angular.module('app.storage', ['ui.router', 'datatables', 'datatables.bootstrap','app.basic'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.storage', {
                abstract: true,
                data: {
                    title: '仓储业务'
                }
            })
            .state('app.storage.storehouse', {
                abstract: true,
                data: {
                    title: '仓房信息'
                }
            })
            //----------------仓房检查开始---------------//
            .state('app.storage.storehouse.hcklist', {
                url: '/storehouse/hcklist',
                data: {
                    title: '仓房检查记录'
                },
                views: {
                    "content@app": {
                        controller: 'housecheckCtrl',
                        templateUrl: 'app/storage/views/storehouse/storehouse-housecheck-list.html'
                    }
                }
            })

            .state('app.storage.storehouse.repair', {
                url: '/storehouse/repair/:id/:isNotEdit',
                data: {
                    title: '仓房维修'
                },
                views: {
                    "content@app": {
                        controller: 'housecheckSaveCtrl',
                        templateUrl: 'app/storage/views/storehouse/storehouse-housecheck-repair.html'
                    }
                }
            })

            .state('app.storage.storehouse.hckadd', {
                url: '/storehouse/hckadd/:id/:isNotEdit',
                data: {
                    title: '仓房检查记录新增'
                },
                views: {
                    "content@app": {
                        controller: 'housecheckSaveCtrl',
                        templateUrl: 'app/storage/views/storehouse/storehouse-housecheck-edit.html'
                    }
                }
            })
            .state('app.storage.storehouse.hckedit', {
                url: '/storehouse/hckedit/:id/:isNotEdit',
                data: {
                    title: '仓房检查记录修改'
                },
                views: {
                    "content@app": {
                        controller: 'housecheckSaveCtrl',
                        templateUrl: 'app/storage/views/storehouse/storehouse-housecheck-edit.html'
                    }
                }
            })
            //----------------仓房检查结束---------------//

            //----------------仓房维修开始---------------//
            .state('app.storage.storehouse.hrplist', {
                url: '/storehouse/hrplist/:id',
                data: {
                    title: '仓房维修记录'
                },
                views: {
                    "content@app": {
                        controller: 'houserepairCtrl',
                        templateUrl: 'app/storage/views/storehouse/storehouse-houserepair-list.html'
                    }
                }
            })


            //----------------仓房维修结束---------------//


            //----------------仓房基本信息开始---------------//
            .state('app.storage.storehouse.houseinfo', {
                url: '/storehouse/houseinfo/:type',
                data: {
                    title: '仓房基本信息'
                },
                views: {
                    "content@app": {
                       // controller: 'houseinfoCtrl',
                        controller: 'StorehouseCtrl',
                        //templateUrl: 'app/storage/views/storehouse/storehouse-housebaseinfo-view.html'
                        templateUrl: 'app/basic/storehouse/views/Storehouse-list.html'
                    }
                }
            })
            .state('app.storage.storehouse.houseOtherInfo', {
                url: '/storehouse/houseOtherInfo/:storehouseId',
                data: {
                    title: '查看仓房信息'
                },
                views: {
                    "content@app": {
                        controller: 'houseinfoCtrl',
                        templateUrl: 'app/storage/views/storehouse/storehouse-housebaseinfo-otherinfo.html'
                    }
                }
            })
            //----------------仓房基本信息结束---------------//

            //---------------保管员管理卡开始---------------//
            .state('app.storage.keeper', {
                abstract: true,
                data: {
                    title: '保管员管理'
                }
            })


            .state('app.storage.keeper.keeperList', {
                url: '/keeper/keeperList',
                data: {
                    title: '保管员信息列表 '
                },
                views: {
                    "content@app": {
                        controller: 'keeperSaveCtrl',
                        templateUrl: 'app/storage/views/keeper/keeper-list.html'
                    }
                }
            })

            //点新增或修改保管员信息调用
            .state('app.storage.keeper.keeperDetails', {
                url: '/keeperDetails/:id/:showType;',
                data: {
                    title: '保管员详情信息',
                },
                views: {
                    "content@app": {
                        controller: 'keeperCtrlEdit',//该controller使用的是基础信息的保管员中的
                       // templateUrl: 'app/storage/views/keeper/keeper-edit.html'
                        templateUrl: 'app/basic/keeper/views/keeper-edit.html'
                    }
                }
            })

            .state('app.storage.keeper.keepertransferlist', {
                url: '/keeper/keepertransferlist',
                data: {
                    title: '保管员移交记录'
                },
                views: {
                    "content@app": {
                        controller: 'keepertransferCtrl',
                        templateUrl: 'app/storage/views/keeper/keeper-transfer-list.html'
                    }
                }
            })

            .state('app.storage.keeper.transferadd', {
                url: '/keeper/transferadd/:id/:isNotEdit',
                data: {
                    title: '新增保管员移交记录'
                },
                views: {
                    "content@app": {
                        controller: 'keepertransferSaveCtrl',
                        templateUrl: 'app/storage/views/keeper/keeper-transfer-add.html'
                    }
                }
            })
            .state('app.storage.keeper.transferedit', {
                url: '/keeper/transferedit/:id/:isNotEdit',
                data: {
                    title: '修改保管员移交记录'
                },
                views: {
                    "content@app": {
                        controller: 'keepertransferSaveCtrl',
                        templateUrl: 'app/storage/views/keeper/keeper-transfer-edit.html'
                    }
                }
            })
            //---------------保管员管理结束---------------//

            .state('app.storage.foodbasicinfo', {
                abstract: true,
                data: {
                    title: '仓储业务'
                }
            })

         //----------------------------------------------储粮专卡开始------------------------------------------------//
            .state('app.storage.foodbasicinfo.foodbasicinfolist', {
                url: '/foodbasicinfo/foodbasicinfolist',
                data: {
                    title: '储粮专卡'
                },
                views: {
                    "content@app": {
                        controller: 'foodbasicinfoCtrl',
                        templateUrl: 'app/storage/views/foodbasicinfo/foodbasicinfo-list.html'
                    }
                }
            })

            //-------------------------------根据不同的性质的中储粮和品种显示不同的页面开始------------------------------------
            .state('app.storage.foodbasicinfo.foodDetails', {
                url: '/foodbasicinfo/foodDetails/:id/:houseId/:warehouseId',
                data: {
                    title: '储粮专卡详情'
                },
                views: {
                    "content@app": {
                        controller: 'foodDetailsCtrl',
                        templateUrl: 'app/storage/views/foodbasicinfo/foodbasicinfo-list-view.html'
                    }
                }
            })
            .state('app.storage.foodbasicinfo.centralWheat', {
                url: '/foodbasicinfo/centralWheat/:id/:houseId/:warehouseId',
                data: {
                    title: '中央储备粮专卡(小麦)'
                },
                views: {
                    "content@app": {
                        controller: 'foodDetailsCtrl',
                        templateUrl: 'app/storage/views/foodbasicinfo/foodCardDetails/foodbasicinfo-central-wheat.html'
                    }
                }
            })
            .state('app.storage.foodbasicinfo.prefeWheat', {
                url: '/foodbasicinfo/prefeWheat/:id/:houseId/:warehouseId',
                data: {
                    title: '省级储备粮专卡(小麦)'
                },
                views: {
                    "content@app": {
                        controller: 'foodDetailsCtrl',
                        templateUrl: 'app/storage/views/foodbasicinfo/foodCardDetails/foodbasicinfo-prefe-wheat.html'
                    }
                }
            })
            .state('app.storage.foodbasicinfo.centralCorn', {
                url: '/foodbasicinfo/centralCorn/:id/:houseId/:warehouseId',
                data: {
                    title: '中央储备粮专卡(玉米)'
                },
                views: {
                    "content@app": {
                        controller: 'foodDetailsCtrl',
                        templateUrl: 'app/storage/views/foodbasicinfo/foodCardDetails/foodbasicinfo-central-corn.html'
                    }
                }
            })
            .state('app.storage.foodbasicinfo.prefeCorn', {
                url: '/foodbasicinfo/prefeCorn/:id/:houseId/:warehouseId',
                data: {
                    title: '省级储备粮专卡(玉米)'
                },
                views: {
                    "content@app": {
                        controller: 'foodDetailsCtrl',
                        templateUrl: 'app/storage/views/foodbasicinfo/foodCardDetails/foodbasicinfo-prefe-corn.html'
                    }
                }
            })
            .state('app.storage.foodbasicinfo.stateWheat', {
                url: '/foodbasicinfo/stateWheat/:id/:houseId/:warehouseId',
                data: {
                    title: '州级储备粮专卡(小麦)'
                },
                views: {
                    "content@app": {
                        controller: 'foodDetailsCtrl',
                        templateUrl: 'app/storage/views/foodbasicinfo/foodCardDetails/foodbasicinfo-state-wheat.html'
                    }
                }
            })
            .state('app.storage.foodbasicinfo.stateCorn', {
                url: '/foodbasicinfo/stateCorn/:id/:houseId/:warehouseId',
                data: {
                    title: '州级储备粮专卡(玉米)'
                },
                views: {
                    "content@app": {
                        controller: 'foodDetailsCtrl',
                        templateUrl: 'app/storage/views/foodbasicinfo/foodCardDetails/foodbasicinfo-state-corn.html'
                    }
                }
            })
            //-------------------------------根据不同的性质的中储粮和品种显示不同的页面开始------------------------------------
            //----------------储粮专卡结束---------------//

            //----------------封仓管理开始---------------//
            .state('app.storage.foodbasicinfo.fshlist', {
                url: '/foodbasicinfo/fshlist',
                data: {
                    title: '封仓管理'
                },
                views: {
                    "content@app": {
                        controller: 'foodsealhouseCtrl',
                        templateUrl: 'app/storage/views/foodbasicinfo/foodsealhouse/foodsealhouse-list.html'
                    }
                }
            })
            .state('app.storage.foodbasicinfo.sealhouse', {
                url: '/sealhouse/:houseId/:warehouseId/:id',
                data: {
                    title: '封仓管理'
                },
                views: {
                    "content@app": {
                        controller: 'foodsealhouseSubmitCtrl',
                        templateUrl: 'app/storage/views/foodbasicinfo/foodsealhouse/foodsealhouse-add.html'
                    }
                }
            })

            .state('app.storage.foodbasicinfo.basicCard', {
                url: '/basicCard/:foodbasic/:houseId/:warehouseId/:id',
                data: {
                    title: '生成储粮专卡'
                },
                views: {
                    "content@app": {
                        controller: 'sealhouseSaveCtrl',
                        templateUrl: 'app/storage/views/foodbasicinfo/foodsealhouse/foodsealhouse-foodcard.html'
                    }
                }
            })

            .state('app.storage.foodbasicinfo.acceptcheck', {
                url: '/acceptcheck/:id/:isNotEdit',
                data: {
                    title: '验收质量'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckSaveCtrl',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-acceptcheck-edit.html'
                    }
                }
            })

            .state('app.storage.foodbasicinfo.sealhouse.foodbasicdetails', {
                url: '/sealhouse/foodbasicdetails/:houseId/:warehouseId',
                data: {
                    title: '粮情卡'
                },
                views: {
                    "content@app": {
                        controller: 'foodbasicDetailsCtrl',
                        templateUrl: 'app/storage/views/foodbasicinfo/foodsealhouse/foodbasicinfo-details.html'
                    }
                }
            })

            .state('app.storage.foodbasicinfo.sealhouse.centralWheat', {
                url: '/sealhouse/centralWheat/:foodbasic/:houseId/:warehouseId',
                data: {
                    title: '中央储备粮专卡(小麦)'
                },
                views: {
                    "content@app": {
                        controller: 'sealhouseSaveCtrl',
                        templateUrl: 'app/storage/views/foodbasicinfo/foodsealhouse/foodsealhouse-central-wheat.html'
                    }
                }
            })
            .state('app.storage.foodbasicinfo.sealhouse.prefeWheat', {
                url: '/sealhouse/prefeWheat/:foodbasic/:houseId/:warehouseId',
                data: {
                    title: '省级储备粮专卡(小麦)'
                },
                views: {
                    "content@app": {
                        controller: 'sealhouseSaveCtrl',
                        templateUrl: 'app/storage/views/foodbasicinfo/foodsealhouse/foodsealhouse-prefe-corn.html'
                    }
                }
            })
            .state('app.storage.foodbasicinfo.sealhouse.centralCorn', {
                url: '/sealhouse/centralCorn/:foodbasic/:houseId/:warehouseId',
                data: {
                    title: '中央储备粮专卡(玉米)'
                },
                views: {
                    "content@app": {
                        controller: 'sealhouseSaveCtrl',
                        templateUrl: 'app/storage/views/foodbasicinfo/foodsealhouse/foodsealhouse-central-corn.html'
                    }
                }
            })
            .state('app.storage.foodbasicinfo.sealhouse.prefeCorn', {
                url: '/sealhouse/prefeCorn/:foodbasic/:houseId/:warehouseId',
                data: {
                    title: '省级储备粮专卡(玉米)'
                },
                views: {
                    "content@app": {
                        controller: 'sealhouseSaveCtrl',
                        templateUrl: 'app/storage/views/foodbasicinfo/foodsealhouse/foodsealhouse-prefe-corn.html'
                    }
                }
            })
            .state('app.storage.foodbasicinfo.sealhouse.stateCorn', {
                url: '/sealhouse/stateCorn/:foodbasic/:houseId/:warehouseId',
                data: {
                    title: '州级储备粮专卡(玉米)'
                },
                views: {
                    "content@app": {
                        controller: 'sealhouseSaveCtrl',
                        templateUrl: 'app/storage/views/foodbasicinfo/foodsealhouse/foodsealhouse-state-corn.html'
                    }
                }
            })
            .state('app.storage.foodbasicinfo.sealhouse.stateWheat', {
                url: '/sealhouse/stateWheat/:foodbasic/:houseId/:warehouseId',
                data: {
                    title: '州级储备粮专卡(小麦)'
                },
                views: {
                    "content@app": {
                        controller: 'sealhouseSaveCtrl',
                        templateUrl: 'app/storage/views/foodbasicinfo/foodsealhouse/foodsealhouse-state-corn.html'
                    }
                }
            })



            //-----------------------------------封仓管理结束------------------------------------//



            //--------------------------------------安全生产------------------------------------------
            .state('app.storage.safeproduce', {
                abstract: true,
                data: {
                    title: '粮食安全生产管理'
                }
            })

            //----------------安全生产开始---------------//
            .state('app.storage.safeproduce.list', {
                url: '/safeproduce/list/:type/:layerType',
                data: {
                    title: '文件管理'
                },
                views: {
                    "content@app": {
                        controller: 'safeproduceCtrl',
                        templateUrl: 'app/storage/views/safeproduce/safeproduce-list.html'
                    }
                }
            })

            /*--------------安全生产通知---------------*/
            .state('app.storage.safeproduce.notifyList', {
                url: '/safeproduce/list',
                data: {
                    title: '安全生产通告'
                },
                views: {
                    "content@app": {
                        controller: 'safeProduceNotifyCtrl',
                        templateUrl: 'app/storage/views/safeproduce/safeProduceNotify-list.html'
                    }
                }
            })

            .state('app.storage.safeproduce.notifyAdd', {
                url: '/safeproduce/add/:id/:isNotEdit/:topRow',
                data: {
                    title: '安全生产通知编辑'
                },
                views: {
                    "content@app": {
                        controller: 'safeProduceNotifySaveCtrl',
                        templateUrl: 'app/storage/views/safeproduce/safeProduceNotify-edit.html'
                    }
                }
            })

            .state('app.storage.safeproduce.notifyView', {
                url: '/safeproduce/view/:id/:isNotEdit',
                data: {
                    title: '安全生产通知查看'
                },
                views: {
                    "content@app": {
                        controller: 'safeProduceNotifySaveCtrl',
                        templateUrl: 'app/storage/views/safeproduce/safeProduceNotify-view.html'
                    }
                }
            })
            //---------上报粮库危险作业备案--------// 第一版本已迁移到智能仓房模块下 -> 熏蒸作业单
            /*.state('app.storage.safeproduce.recordList', {
                url: '/safeproduce/recordList',
                data: {
                    title: '粮库危险作业备案'
                },
                params:{
                    titleTag: '危险作业备案列表'
                },
                views: {
                    "content@app": {
                        controller: 'dangerJobRecordCtrl',
                        templateUrl: 'app/storage/views/safeproduce/dangerJobRecord-list.html'
                    }
                }
            })

            .state('app.storage.safeproduce.recordList.dangerJobRecord-view', {
                url: '/dangerJobRecord-view/:id',
                data: {
                    title: '危险作业备案查看'
                },
                params:{
                    isNotEdit : true,
                    isNext : false,
                    isLast : true,
                    showNextButton : false,
                    showLastButton : false
                },
                views: {
                    "content@app": {
                        controller: 'dangerJobRecordSaveCtrl',
                        templateUrl: 'app/storage/views/safeproduce/dangerJobRecord-edit.html'
                    }
                }
            })*/
            // 上报粮库危险作业备案(熏蒸作业单 在智能仓房下)
            .state('app.storage.safeproduce.recordList', {
                    url: '/safeproduce/recordList',
                    data: {
                        title: '粮库危险作业备案'
                    },
                    views: {
                        "content@app": {
                            controller: 'homeWorkQueryCtrl',
                            templateUrl: 'app/intelligent/fumigation/views/homework/fumHomeWorkSingle-list.html'
                        }
                    }
                }
            )

            // 安全事故管理
            .state('app.storage.safeproduce.safeAccidentManageList', {
                url: '/safeproduce/safeAccidentManageList',
                data: {
                    title: '安全生产事故管理'
                },
                views: {
                    "content@app": {
                        controller: 'safeAccidentManageCtrl',
                        templateUrl: 'app/storage/views/safeproduce/safeAccidentManage-list.html'
                    }
                }
            })
            // 编辑
            .state('app.storage.safeproduce.safeAccidentManageList.edit', {
                url: '/safeproduce/safeAccidentManageEdit/:id/:isNotEdit',
                data: {
                    title: '安全事故管理编辑'
                },
                views: {
                    "content@app": {
                        controller: 'safeAccidentManageSaveCtrl',
                        templateUrl: 'app/storage/views/safeproduce/safeAccidentManage-edit.html'
                    }
                }
            })
            // ---------------------备案及实施情况的管理------------------- //
            // 三级路由--备案管理
            .state('app.storage.safeproduce.recordManage', {
                abstract: true,
                data: {
                    title: '备案管理'
                }
            })
            // 第一版本已迁移到智能仓房模块下
            // 熏蒸方案
            /*.state('app.storage.safeproduce.recordManage.fumigationPlan', {
                url: '/safeproduce/recordManage/fumigationPlan',
                data: {
                    title: '熏蒸方案'
                },
                params:{
                    titleTag : '熏蒸方案列表',
                    recordManage : true
                },
                views: {
                    "content@app": {
                        controller: 'dangerJobRecordCtrl',
                        templateUrl: 'app/storage/views/safeproduce/dangerJobRecord-list.html'
                    }
                }
            })
            // 详情
            .state('app.storage.safeproduce.recordManage.fumigationPlan.view', {
                url: '/safeproduce/recordManage/fumigationPlan/view/:id',
                data: {
                    title: '熏蒸方案详情'
                },
                params:{
                    isNotEdit : true,
                    isNext : false,
                    isLast : true,
                    showNextButton : false,
                    showLastButton : false
                },
                views: {
                    "content@app": {
                        controller: 'dangerJobRecordSaveCtrl',
                        templateUrl: 'app/storage/views/safeproduce/dangerJobRecord-edit.html'
                    }
                }
            })
            // 熏蒸过程列表
            .state('app.storage.safeproduce.recordManage.fumigationProcess', {
                url: '/safeproduce/recordManage/fumigationProcess',
                data: {
                    title: '熏蒸过程'
                },
                views: {
                    "content@app": {
                        controller: 'fumigationProcessCtrl',
                        templateUrl: 'app/storage/views/safeproduce/safeProduce-fumigationProcessList.html'
                    }
                }
            })
            // 熏蒸过程查看
            .state('app.storage.safeproduce.recordManage.fumigationProcess.view', {
                url: '/safeproduce/recordManage/fumigationProcess/view/:id',
                data: {
                    title: '熏蒸过程详情'
                },
                params:{
                    isNotEdit : true
                },
                views: {
                    "content@app": {
                        controller: 'fumigationProcessSaveCtrl',
                        templateUrl: 'app/storage/fumigation/fumigationProcess/views/fumigationProcess-edit.html'
                    }
                }
            })
            // 善后工作
            .state('app.storage.safeproduce.recordManage.fumigationDealWith', {
                url: '/safeproduce/recordManage/fumigationDealWith/list',
                data: {
                    title: '善后工作'
                },
                views: {
                    "content@app": {
                        controller: 'fumigationDealwithCtrl',
                        templateUrl: 'app/storage/views/safeproduce/safeProduce-fumigationDealWithList.html'
                    }
                }
            })
            // 善后工作详情
            .state('app.storage.safeproduce.recordManage.fumigationDealWith.view', {
                url: '/safeproduce/recordManage/fumigationDealwith/view/:id',
                data: {
                    title: '熏蒸善后详情'
                },
                params:{
                    isNotEdit : true
                },
                views: {
                    "content@app": {
                        controller: 'fumigationDealwithSaveCtrl',
                        templateUrl: 'app/storage/fumigation/fumigationDealwith/views/fumigationDealwith-edit.html'
                    }
                }
            })*/
            //---------------------------------------------------------------------------------
            // 熏蒸方案
            .state('app.storage.safeproduce.recordManage.fumigationPlan', {
                    url: '/safeproduce/recordManage/fumigationPlan/:id/:homePage',
                    data: {
                        title: '熏蒸方案'
                    },
                    views: {
                        "content@app": {
                            controller: 'planQueryCtrl',
                            templateUrl: 'app/intelligent/fumigation/views/plan/fumigation-list.html'
                        }
                    }
                }
            )
            // 熏蒸方案详情
            .state('app.storage.safeproduce.recordManage.fumigationPlan.view', {
                    url: '/safeproduce/recordManage/fumigationPlan/view/:fumType/:fumigationId',
                    data: {
                        title: '熏蒸方案详情'
                    },
                    views: {
                        "content@app": {
                            controller: 'fumigationPlanEditCtrl',
                            templateUrl: 'app/intelligent/fumigation/views/plan/fumigationPlan-edit.html'
                        }
                    }
                }
            )
            // 熏蒸过程
            .state('app.storage.safeproduce.recordManage.fumigationProcess', {
                    url: '/safeproduce/recordManage/fumigationProcess',
                    data: {
                        title: '熏蒸过程'
                    },
                    views: {
                        "content@app": {
                            controller: 'fumHomeWorkCtrl',
                            templateUrl: 'app/intelligent/fumigation/views/homework/fumHomeWorkProcess-list.html'
                        }
                    }
                }
            )
            // 熏蒸过程详情
            .state('app.storage.safeproduce.recordManage.fumigationProcess.view', {
                    url: '/safeproduce/recordManage/fumigationProcess/view/:fumType/:homeWorkId',
                    data: {
                        title: '熏蒸过程详情'
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
            .state('app.storage.safeproduce.recordManage.fumigationDealWith', {
                    url: '/safeproduce/recordManage/fumigationDealWith/list',
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
            .state('app.storage.safeproduce.recordManage.fumigationDealWith.view', {
                    url: '/safeproduce/recordManage/fumigationDealwith/:fumType/:homeWorkId',
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
            // ----------安全检查---------//
            // 三级路由--安全检查
            .state('app.storage.safeproduce.safeCheck', {
                abstract: true,
                data: {
                    title: '安全检查'
                }
            })
            // 节前安全检查
            .state('app.storage.safeproduce.safeCheck.fbelist', {
                url: '/safeproduce/safeCheck/fbelist',
                data: {
                    title: '节前安全检查'
                },
                views: {
                    "content@app": {
                        controller: 'festivalbeforeCtrl',
                        templateUrl: 'app/storage/views/safeproduce/safeproduce-festivalbefore-list.html'
                    }
                }
            })
            .state('app.storage.safeproduce.safeCheck.fbelist.add', {
                url: '/safeproduce/safeCheck/fbeadd/add/:id/:isNotEdit',
                data: {
                    title: '新增'
                },
                views: {
                    "content@app": {
                        controller: 'festivalbeforeSaveCtrl',
                        templateUrl: 'app/storage/views/safeproduce/safeproduce-festivalbefore-edit.html'
                    }
                }
            })
            .state('app.storage.safeproduce.safeCheck.fbelist.edit', {
                url: '/safeproduce/safeCheck/fbeedit/edit/:id/:isNotEdit',
                data: {
                    title: '修改'
                },
                views: {
                    "content@app": {
                        controller: 'festivalbeforeSaveCtrl',
                        templateUrl: 'app/storage/views/safeproduce/safeproduce-festivalbefore-edit.html'
                    }
                }
            })
            .state('app.storage.safeproduce.safeCheck.fbelist.view', {
                url: '/safeproduce/safeCheck/fbeedit/view/:id/:isNotEdit',
                data: {
                    title: '查看'
                },
                views: {
                    "content@app": {
                        controller: 'festivalbeforeSaveCtrl',
                        templateUrl: 'app/storage/views/safeproduce/safeproduce-festivalbefore-edit.html'
                    }
                }
            })

            // 风雨雪三查
            .state('app.storage.safeproduce.safeCheck.wrslist', {
                url: '/safeproduce/safeCheck/wrslist',
                data: {
                    title: '风雨雪三查'
                },
                views: {
                    "content@app": {
                        controller: 'windrainsnowCtrl',
                        templateUrl: 'app/storage/views/safeproduce/safeproduce-windrainsnowcheck-list.html'
                    }
                }
            })
            .state('app.storage.safeproduce.safeCheck.wrslist.add', {
                url: '/safeproduce/safeCheck/wrslist/add/:id/:isNotEdit',
                data: {
                    title: '新增'
                },
                views: {
                    "content@app": {
                        controller: 'windrainsnowSaveCtrl',
                        templateUrl: 'app/storage/views/safeproduce/safeproduce-windrainsnowcheck-edit.html'
                    }
                }
            })
            .state('app.storage.safeproduce.safeCheck.wrslist.edit', {
                url: '/safeproduce/safeCheck/wrslist/edit/:id/:isNotEdit',
                data: {
                    title: '修改'
                },
                views: {
                    "content@app": {
                        controller: 'windrainsnowSaveCtrl',
                        templateUrl: 'app/storage/views/safeproduce/safeproduce-windrainsnowcheck-edit.html'
                    }
                }
            })
            .state('app.storage.safeproduce.safeCheck.wrslist.view', {
                url: '/safeproduce/safeCheck/wrslist/view/:id/:isNotEdit',
                data: {
                    title: '查看'
                },
                views: {
                    "content@app": {
                        controller: 'windrainsnowSaveCtrl',
                        templateUrl: 'app/storage/views/safeproduce/safeproduce-windrainsnowcheck-edit.html'
                    }
                }
            })

            // 三温检查
            .state('app.storage.safeproduce.safeCheck.ttplist', {
                url: '/safeproduce/safeCheck/ttplist/:houseId',
                data: {
                    title: '三温检查'
                },
                views: {
                    "content@app": {
                        controller: 'threetempCheckCtrl',
                        templateUrl: 'app/storage/views/safeproduce/safeproduce-threetempcheck-list.html'
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

            // 其他检查
            .state('app.storage.safeproduce.safeCheck.otherchecklist', {
                url: '/safeproduce/safeCheck/otherchecklist',
                data: {
                    title: '其他检查'
                },
                views: {
                    "content@app": {
                        controller: 'foodotherCheckCtrl',
                        templateUrl: 'app/storage/views/safeproduce/safeproduce-foodothercheck-list.html'
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
            
            /*****************转储管理 start****************/
            .state('app.storage.dumpList', {
                url: '/dump/list',
                data: {
                    title: '转储管理'
                },
                views: {
                    "content@app": {
                        controller: 'dumpCtrl',
                        templateUrl: 'app/storage/dump/views/dump-list.html'
                    }
                }
            })

            .state('app.storage.dumpEdit', {
                url: '/dump/edit/:id/:butType',
                data: {
                    title: '转储详情'
                },
                views: {
                    "content@app": {
                        controller: 'dumpEditCtrl',
                        templateUrl: 'app/storage/dump/views/dump-edit.html'
                    }
                }
            })
            
            /*****************转储管理 end****************/
       /*****************倒仓作业 start****************/
            .state('app.storage.changestorage', {
                abstract: true,
                data: {
                    title: '倒仓作业'
                }
            })
            .state('app.storage.changestorage.changeList', {
                url: '/change/changestorage/list',
                data: {
                    title: '倒仓申请'
                },
                views: {
                    "content@app": {
                        controller: 'ChangestoreCtrl',
                        templateUrl: 'app/storage/changestorage/views/Changestore-list.html'
                    }
                }
            })
            
            //倒仓申请修改新增
            .state('app.storage.changestorage.ChangeStorageCtrlEdit', {
                url: '/change/cru/:id/:orgId/:isNotEdit',
                data: {
                    title: '倒仓申请'
                },
                views: {
                    "content@app": {
                        controller: 'ChangeStorageCtrlEdit',
                        templateUrl: 'app/storage/changestorage/views/Changestore-edit.html'
                    }
                }
            })
            
            //修改子表数据
            .state('app.storage.changestorage.ChangeModalCtrlModal', {
                url: '/change/cru/:taskDetail/:changestorageDetail',
                data: {
                    title: '倒仓编辑'
                },
                views: {
                    "content@app": {
                        controller: 'ChangeModalCtrlModal',
                        templateUrl: 'app/storage/changestorage/views/ChangeModal.html'
                    }
                }
            })
            .state('app.storage.changestorage.changestorework', {
                url: '/change/changestorework/list',
                data: {
                    title: '倒仓作业'
                },
                views: {
                    "content@app": {
                        controller: 'ChangeStoreWorkCtrl',
                        templateUrl: 'app/storage/changestorage/views/ChangeStoreWork-list.html'
                    }
                }
            })
            .state('app.storage.changestorage.changeStoreWorkCtrlEdit', {
                url: '/change/changestorework/:id/:orgId',
                data: {
                    title: '倒仓作业'
                },
                views: {
                    "content@app": {
                        controller: 'changeStoreWorkCtrlEdit',
                        templateUrl: 'app/storage/changestorage/views/ChangeStoreWork-edit.html'
                    }
                }
            })
            //
            /*****************架空期管理 start****************/
            .state('app.storage.overhead', {
                abstract: true,
                data: {
                    title: '架空期管理'
                }
            })
            .state('app.storage.overhead.getList', {
                url: '/overheadGet/list',
                data: {
                    title: '架空期查询'
                },
                views: {
                    "content@app": {
                        controller: 'overheadGetCtrl',
                        templateUrl: 'app/storage/overhead/views/overheadGet-list.html'
                    }
                }
            })
            .state('app.storage.overhead.getApplyList', {
                url: '/overheadAppy/list',
                data: {
                    title: '延期申请'
                },
                views: {
                    "content@app": {
                        controller: 'overheadApplyCtrl',
                        templateUrl: 'app/storage/overhead/views/overheadApply-list.html'
                    }
                }
            })
            //架空期延期申请，修改，新增，查看
            .state('app.storage.overhead.overheadAddCtrl', {
                url: '/overheadAddCtrl/cru/:id/:orgId/:isNotEdit',
                data: {
                    title: '延期申请'
                },
                views: {
                    "content@app": {
                        controller: 'overheadAddCtrl',
                        templateUrl: 'app/storage/overhead/views/overheadApply-edit.html'
                    }
                }
            })
            .state('app.storage.overhead.setList', {
                url: '/overheadSet/list',
                data: {
                    title: '设置管理'
                },
                views: {
                    "content@app": {
                        controller: 'overheadSetCtrl',
                        templateUrl: 'app/storage/overhead/views/overheadSet-list.html'
                    }
                }
            })


            /*****************转储管理 end****************/

            //--------------------------------------质量管理-------------------------------------------
            .state('app.storage.qualitycheck', {
                abstract: true,
                data: {
                    title: '质量管理'
                }
            })
            .state('app.storage.qualitycheck.fck', {
                abstract: true,
                data: {
                    title: '初检质量管理'
                }
            })
            .state('app.storage.qualitycheck.ack', {
                abstract: true,
                data: {
                    title: '验收质量管理'
                }
            })
            .state('app.storage.qualitycheck.spr', {
                abstract: true,
                data: {
                    title: '春秋普查'
                }
            })
            .state('app.storage.qualitycheck.out', {
                abstract: true,
                data: {
                    title: '出库质量管理'
                }
            })
            //----------------粮食初检信息开始---------------//
            .state('app.storage.qualitycheck.fck.fcklist', {
                url: '/storage/qualitycheck/fck/fcklist/:type',
                data: {
                    title: '粮食初检信息列表'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckCtrl',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-firstcheck-list.html'
                    }
                }
            })
            .state('app.storage.qualitycheck.fck.fckadd', {
                url: '/qualitycheck/fck/fckadd/:id/:checkType/:isNotEdit',
                data: {
                    title: '粮食初检新增'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckSaveCtrl as datatables',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-firstcheck-edit.html'
                    }
                }
            })
            .state('app.storage.qualitycheck.fck.fckedit', {
                url: '/qualitycheck/fck/fckedit/:id/:isNotEdit/:storeName/:wareName',
                data: {
                    title: '粮食初检修改'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckSaveCtrl as datatables',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-firstcheck-edit.html'
                    }
                }
            })

            //----------------粮食初检信息结束---------------//

            //----------------粮食验收信息开始---------------//
            .state('app.storage.qualitycheck.ack.acklist', {
                url: '/qualitycheck/ack/acklist/:type',
                data: {
                    title: '粮食验收信息列表'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckCtrl',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-acceptcheck-list.html'
                    }
                }
            })
            .state('app.storage.qualitycheck.ack.ackadd', {
                url: '/qualitycheck/ack/ackadd/:id/:houseId/:warehouseId/:checkType/:isNotEdit',
                data: {
                    title: '粮食验收新增'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckSaveCtrl as datatables',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-acceptcheck-edit.html'
                    }
                }
            })
            .state('app.storage.qualitycheck.ack.ackedit', {
                url: '/qualitycheck/ack/ackedit/:id/:isNotEdit/:storeName/:wareName',
                data: {
                    title: '粮食验收修改'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckSaveCtrl as datatables',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-acceptcheck-edit.html'
                    }
                }
            })
            //----------------粮食验收信息结束---------------//

            //----------------春秋普查信息开始---------------//
            .state('app.storage.qualitycheck.spr.sprlist', {
                url: '/qualitycheck/spr/sprlist/:type/:checkResult',
                data: {
                    title: '春秋普查信息列表'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckCtrl',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-springcheck-list.html'
                    }
                }
            })
            .state('app.storage.qualitycheck.spr.spradd', {
                url: '/qualitycheck/spr/spradd/:id/:isNotEdit',
                data: {
                    title: '春秋普查新增'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckSaveCtrl as datatables',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-springcheck-edit.html'
                    }
                }
            })
            .state('app.storage.qualitycheck.spr.spredit', {
                url: '/qualitycheck/spr/spredit/:id/:isNotEdit/:storeName/:wareName',
                data: {
                    title: '春秋普查修改'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckSaveCtrl as datatables',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-springcheck-edit.html'
                    }
                }
            })

            //----------------春秋普查信息结束---------------//
            
            //----------------日常检验开始---------------//
            .state('app.storage.qualitycheck.daklist', {
                url: '/qualitycheck/daklist/:type',
                data: {
                    title: '日常检查信息列表'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckCtrl',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-dakcheck-list.html'
                    }
                }
            })
            .state('app.storage.qualitycheck.dakedit', {
                url: '/qualitycheck/dakedit/:id/:isNotEdit',
                data: {
                    title: '日常检查修改'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckSaveCtrl as datatables',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-dakcheck-edit.html'
                    }
                }
            })
            .state('app.storage.qualitycheck.dakadd', {
            	url: '/qualitycheck/dakadd/:id/:isNotEdit/:storeName/:wareName',
            	data: {
            		title: '日常检查新增'
            	},
            	views: {
            		"content@app": {
            			controller: 'qualitycheckSaveCtrl as datatables',
            			templateUrl: 'app/storage/views/qualitycheck/qualitycheck-dakcheck-edit.html'
            		}
            	}
            })
            //----------------日常检验结束---------------//
            //----------------第三方检查开始---------------//
            .state('app.storage.qualitycheck.trklist', {
            	url: '/qualitycheck/trklist/:type/:checkResult',
            	data: {
            		title: '第三方检查信息列表'
            	},
            	views: {
            		"content@app": {
            			controller: 'qualitycheckCtrl',
            			templateUrl: 'app/storage/views/qualitycheck/qualitycheck-trkcheck-list.html'
            		}
            	}
            })
             .state('app.storage.qualitycheck.trkedit', {
                url: '/qualitycheck/trkedit/:id/:isNotEdit/:storeName/:wareName',
                data: {
                    title: '第三方检查修改'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckSaveCtrl as datatables',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-trkcheck-edit.html'
                    }
                }
            })
            .state('app.storage.qualitycheck.trkadd', {
            	url: '/qualitycheck/trkadd/:id/:isNotEdit',
            	data: {
            		title: '第三方检查新增'
            	},
            	views: {
            		"content@app": {
            			controller: 'qualitycheckSaveCtrl as datatables',
            			templateUrl: 'app/storage/views/qualitycheck/qualitycheck-trkcheck-edit.html'
            		}
            	}
            })
            
            //----------------第三方检查结束---------------//
            
            //----------------粮食出库信息开始---------------//
            .state('app.storage.qualitycheck.out.outlist', {
                url: '/qualitycheck/out/outlist/:type',
                data: {
                    title: '出库质量信息列表'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckCtrl',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-outcheck-list.html'
                    }
                }
            })
            .state('app.storage.qualitycheck.out.outadd', {
                url: '/qualitycheck/out/outadd/:id/:isNotEdit',
                data: {
                    title: '出库质量新增'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckSaveCtrl as datatables',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-outcheck-edit.html'
                    }
                }
            })
            .state('app.storage.qualitycheck.out.outedit', {
                url: '/qualitycheck/out/outedit/:id/:isNotEdit/:storeName/:wareName',
                data: {
                    title: '出库质量修改'
                },
                views: {
                    "content@app": {
                        controller: 'qualitycheckSaveCtrl as datatables',
                        templateUrl: 'app/storage/views/qualitycheck/qualitycheck-outcheck-edit.html'
                    }
                }
            })
            //----------------粮食出库信息结束---------------//

            .state('app.storage.quantity', {
                abstract: true,
                data: {
                    title: '数量管理'
                }
            })
            .state('app.storage.account', {
                abstract: true,
                data: {
                    title: '保管账'
                }
            })
            //分仓保管账
            .state('app.storage.account.houseKeepAccount', {
                url: '/storage/quantity/houseKeepAccount/:account/:type',
                data: {
                    title: '分仓保管账'
                },
                views: {
                    "content@app": {
                        controller: 'houseKeepAccountCtrl',
                        templateUrl: 'app/storage/views/keepAccount/houseKeepAccount-list.html'
                    }
                }
            })
            //分仓保管账记账
            .state('app.storage.account.houseKeepAccount.houseKeepAccountEdit', {
                url: '/storage/quantity/houseKeepAccountEdit/:account/:butType',
                data: {
                    title: '记账'
                },
                views: {
                    "content@app": {
                        controller: 'houseKeepAccountEditCtrl',
                        templateUrl: 'app/storage/views/keepAccount/houseKeepAccount-edit.html'
                    }
                }
            })
            //保管明细账
            .state('app.storage.account.keepDetailedAccount', {
                url: '/storage/quantity/keepDetailedAccount/:account/:type',
                data: {
                    title: '保管明细账'
                },
                views: {
                    "content@app": {
                        controller: 'keepDetailedAccountCtrl',
                        templateUrl: 'app/storage/views/keepAccount/keepDetailedAccount-list.html'
                    }
                }
            })
            //保管总账
            .state('app.storage.account.keepTotalAccount', {
                url: '/storage/quantity/keepTotalAccount',
                data: {
                    title: '保管总账'
                },
                views: {
                    "content@app": {
                        controller: 'keepTotalAccountCtrl',
                        templateUrl: 'app/storage/views/keepAccount/keepTotalAccount-list.html'
                    }
                }
            })
            //保管总账记账
            .state('app.storage.account.keepTotalAccount.keepTotalAccountEdit', {
                url: '/storage/quantity/keepTotalAccountEdit/:account/:butType',
                data: {
                    title: '记账'
                },
                views: {
                    "content@app": {
                        controller: 'keepTotalAccountEditCtrl',
                        templateUrl: 'app/storage/views/keepAccount/keepTotalAccount-edit.html'
                    }
                }
            })

            .state('app.storage.taskDispatch', {
                abstract: true,
                data: {
                    title: '调度作业管理'
                }
            })

            //通风申请查询页面
            .state('app.storage.taskDispatch.aerationTaskApplyList', {
                url: '/aerationTaskApplyList',
                data: {
                    title: '方案申请列表'
                },
                views: {
                    "content@app": {
                        controller: 'aerationTaskCtrl',
                        templateUrl: 'app/storage/aeration/views/aerationTaskApply-list.html'
                    }
                }
            })
            //通风申请编辑页面
            .state('app.storage.taskDispatch.aerationTaskApplyEdit', {
                url: '/aerationTaskApplyEdit/:id/:butId/:pageType/:taskId/:auditId',
                data: {
                    title: '方案申请'
                },
                views: {
                    "content@app": {
                        controller: 'aerationTaskEdit',
                        templateUrl: 'app/storage/aeration/views/aerationTaskApply-edit.html'
                    }
                }
            })
            //通风方案审批查询页面
            .state('app.storage.taskDispatch.aerationTaskApprovalList', {
                url: '/aerationTaskApprovalList',
                data: {
                    title: '方案审批列表'
                },
                views: {
                    "content@app": {
                        controller: 'approvalCtrl',
                        templateUrl: 'app/storage/aeration/views/aerationTaskApproval-list.html'
                    }
                }
            })
            //通风过程列表页面
            .state('app.storage.taskDispatch.aerationTaskRecordList', {
                url: '/aerationTaskRecordList',
                data: {
                    title: '通风过程列表'
                },
                views: {
                    "content@app": {
                        controller: 'aerationTaskRecordCtrl',
                        templateUrl: 'app/storage/aeration/views/aerationTaskRecord-List.html'
                    }
                }
            })
            //通风过程编辑页面
            .state('app.storage.taskDispatch.aerationTaskRecordEdit', {
                url: '/aerationTaskRecordEdit/:id/:butId',
                data: {
                    title: '通风过程录入'
                },
                views: {
                    "content@app": {
                        controller: 'aerationTaskRecordEdit',
                        templateUrl: 'app/storage/aeration/views/aerationTaskRecord-edit.html'
                    }
                }
            })
            //通风作业善后工作查询页面
            .state('app.storage.taskDispatch.aerationSummaryList', {
                url: '/aerationSummaryList/:id/:homePage',
                data: {
                    title: '善后工作列表'
                },
                views: {
                    "content@app": {
                        controller: 'aerationSummaryCtrl',
                        templateUrl: 'app/storage/aeration/views/aerationSummary-List.html'
                    }
                }
            })
            //通风作业善后工作查询页面
            .state('app.storage.taskDispatch.aerationSummaryEdit', {
                url: '/aerationSummaryEdit/:id/:butType',
                data: {
                    title: '善后工作录入'
                },
                views: {
                    "content@app": {
                        controller: 'aerationSummaryEdit',
                        templateUrl: 'app/storage/aeration/views/aerationSummary-edit.html'
                    }
                }
            })


            // ----------------------------------------熏蒸作业方案申请------------------------------------------熏蒸作业方案-----------------
            .state('app.storage.fumigation', {
                url: '/fumigation',
                data: {
                    title: '熏蒸作业方案申请'
                },
                views: {
                    "content@app": {
                        controller: 'fumigationCtrl',
                        templateUrl: 'app/storage/fumigation/fumigationProgram/views/fumigation-list.html'
                    }
                }
            })

            .state('app.storage.fumigation-edit', {
                url: '/fumigation-edit/:id',
                data: {
                    title: '熏蒸作业方案申请编辑'
                },
                params:{
                    isNotEdit : false,
                    isLast : false,
                    isNext : false,
                    showNextButton : true,
                    showLastButton : true
                },
                views: {
                    "content@app": {
                        controller: 'fumigationSaveCtrl',
                        templateUrl: 'app/storage/fumigation/fumigationProgram/views/fumigation-edit.html'
                    }
                }
            })

            .state('app.storage.fumigation-view', {
                url: '/fumigation-view/:id',
                data: {
                    title: '熏蒸作业方案申请查看'
                },
                params:{
                    isNotEdit : true,
                    isNext : false,
                    isLast : true,
                    showNextButton : false,
                    showLastButton : false
                },
                views: {
                    "content@app": {
                        controller: 'fumigationSaveCtrl',
                        templateUrl: 'app/storage/fumigation/fumigationProgram/views/fumigation-edit.html'
                    }
                }
            })


            // ----------------------------------------审批---------------------------------------------
            .state('app.storage.fumigation-audit', {
                url: '/fumigation-audit',
                data: {
                    title: '熏蒸作业方案审批'
                },
                views: {
                    "content@app": {
                        controller: 'fumigationAuditCtrl',
                        templateUrl: 'app/storage/fumigation/fumigationProgram/views/fumigation-audit-list.html'
                    }
                }
            })

            .state('app.storage.fumigation-audit-save', {
                url: '/fumigation-audit-save/:id',
                data: {
                    title: '熏蒸作业方案审批'
                },
                params: {
                    "isAudit" : true,
                    isNext : false,
                    isLast : true,
                    showNextButton : false,
                    showLastButton : false
                },
                views: {
                    "content@app": {
                        controller: 'fumigationAuditSaveCtrl as datatables',
                        templateUrl: 'app/storage/fumigation/fumigationProgram/views/fumigation-edit.html'
                    }
                }
            })

            .state('app.storage.fumigation-audit-view', {
                url: '/fumigation-audit-view/:id',
                data: {
                    title: '熏蒸作业方案审批查看'
                },
                params: {
                    "isAudit" : false
                },
                views: {
                    "content@app": {
                        controller: 'fumigationAuditSaveCtrl as datatables',
                        templateUrl: 'app/storage/fumigation/fumigationProgram/views/fumigation-edit.html'
                    }
                }
            })

            // ----------------------------------------审批完成---------------------------------------------
            .state('app.storage.fumigation-audit-pass', {
                url: '/fumigation-audit-pass/:id/:homePage',
                data: {
                    title: '熏蒸方案完成'
                },
                params: {
                    "isAudit" : false
                },
                views: {
                    "content@app": {
                        controller: 'fumigationAuditPassCtrl as datatables',
                        templateUrl: 'app/storage/fumigation/fumigationProgram/views/fumigation-audit-pass-list.html'
                    }
                }
            })

            .state('app.storage.fumigation-audit-pass-view', {
                url: '/fumigation-audit-pass-view/:id/:processInstanceId',
                data: {
                    title: '熏蒸方案详情'
                },
                params: {
                    "isAudit" : false
                },
                views: {
                    "content@app": {
                        controller: 'fumigationAuditPassSaveCtrl as datatables',
                        templateUrl: 'app/storage/fumigation/fumigationProgram/views/fumigation-edit.html'
                    }
                }
            })


            .state('app.storage.fumigationProcess', {
	            abstract: true,
	            data: {
	                title: '熏蒸过程'
	            }
            })
            
            .state('app.storage.fumigationProcess.list', {
                url: '/fumigationProcess/list',
                data: {
                    title: '熏蒸过程列表'
                },
                views: {
                    "content@app": {
                        controller: 'fumigationProcessCtrl',
                        templateUrl: 'app/storage/fumigation/fumigationProcess/views/fumigationProcess-list.html'
                    }
                }
            })
            
            .state('app.storage.fumigationProcess.add', {
                url: '/fumigationProcess/add/:id/:fumigateProgramId',
                data: {
                    title: '熏蒸过程新增'
                },
                params:{
                    isNotEdit : false
                },
                views: {
                    "content@app": {
                        controller: 'fumigationProcessSaveCtrl',
                        templateUrl: 'app/storage/fumigation/fumigationProcess/views/fumigationProcess-edit.html'
                    }
                }
            })
            
            .state('app.storage.fumigationProcess.edit', {
                url: '/fumigationProcess/edit/:id',
                data: {
                    title: '熏蒸过程编辑'
                },
                params:{
                    isNotEdit : false
                },
                views: {
                    "content@app": {
                        controller: 'fumigationProcessSaveCtrl',
                        templateUrl: 'app/storage/fumigation/fumigationProcess/views/fumigationProcess-edit.html'
                    }
                }
            })
            
            .state('app.storage.fumigationProcess.view', {
                url: '/fumigationProcess/view/:id',
                data: {
                    title: '熏蒸过程查看'
                },
                params:{
                    isNotEdit : true
                },
                views: {
                    "content@app": {
                        controller: 'fumigationProcessSaveCtrl',
                        templateUrl: 'app/storage/fumigation/fumigationProcess/views/fumigationProcess-edit.html'
                    }
                }
            })
            
            
            .state('app.storage.fumigationDealwith', {
	            abstract: true,
	            data: {
	                title: '熏蒸善后工作'
	            }
            })
            
            .state('app.storage.fumigationDealwith.list', {
                url: '/fumigationDealwith/list',
                data: {
                    title: '善后列表'
                },
                views: {
                    "content@app": {
                        controller: 'fumigationDealwithCtrl',
                        templateUrl: 'app/storage/fumigation/fumigationDealwith/views/fumigationDealwith-list.html'
                    }
                }
            })
            
            .state('app.storage.fumigationDealwith.add', {
                url: '/fumigationDealwith/add/:id/:fumigateProgramId',
                data: {
                    title: '熏蒸善后新增'
                },
                params:{
                    isNotEdit : false
                },
                views: {
                    "content@app": {
                        controller: 'fumigationDealwithSaveCtrl',
                        templateUrl: 'app/storage/fumigation/fumigationDealwith/views/fumigationDealwith-edit.html'
                    }
                }
            })
            
            .state('app.storage.fumigationDealwith.edit', {
                url: '/fumigationDealwith/edit/:id',
                data: {
                    title: '熏蒸善后编辑'
                },
                params:{
                    isNotEdit : false
                },
                views: {
                    "content@app": {
                        controller: 'fumigationDealwithSaveCtrl',
                        templateUrl: 'app/storage/fumigation/fumigationDealwith/views/fumigationDealwith-edit.html'
                    }
                }
            })
            
            .state('app.storage.fumigationDealwith.view', {
                url: '/fumigationDealwith/view/:id',
                data: {
                    title: '熏蒸善后查看'
                },
                params:{
                    isNotEdit : true
                },
                views: {
                    "content@app": {
                        controller: 'fumigationDealwithSaveCtrl',
                        templateUrl: 'app/storage/fumigation/fumigationDealwith/views/fumigationDealwith-edit.html'
                    }
                }
            })

            
            
//------------------------------------仓储业务开始------------------------------------------//
            .state('app.storage.payment', {
                abstract: true,
                data: {
                    title: '仓储业务'
                }
            })
            .state('app.storage.payment.list', {
                url: '/payment/list',
                data: {
                    title: '费用管理'
                },
                views: {
                    "content@app": {
                        controller: 'paymentCtrl as datatables',
                        templateUrl: 'app/storage/views/payment/payment-list.html'
                    }
                }
            })
            .state('app.storage.payment.edit', {
                url: '/payment/edit/:id/:type',
                data: {
                    title: '费用编辑'
                },
                views: {
                    "content@app": {
                        controller: 'paymentEditCtrl as datatables',
                        templateUrl: 'app/storage/views/payment/payment-edit.html'
                    }
                }
            })
            .state('app.storage.grainAnalysis', {
                abstract: true,
                data: {
                    title: '粮情分析报告'
                }
            })
            .state('app.storage.grainAnalysis.weekList', {
                url: '/weekList',
                data: {
                    title: '周粮情分析'
                },
                views: {
                    "content@app": {
                        controller: 'weekAnalysisCtrl',
                        templateUrl: 'app/storage/views/grainAnalysis/weekAnalysis-list.html'
                    }
                }
            })
            .state('app.storage.grainAnalysis.weekEdit', {
                url: '/weekEdit/:id/:butType',
                data: {
                    title: '周粮情分析详情'
                },
                views: {
                    "content@app": {
                        controller: 'weekAnalysisEditCtrl',
                        templateUrl: 'app/storage/views/grainAnalysis/weekAnalysis-edit.html'
                    }
                }
            })
            .state('app.storage.grainAnalysis.monthList', {
                url: '/monthList',
                data: {
                    title: '月粮情分析'
                },
                views: {
                    "content@app": {
                        controller: 'monthAnalysisCtrl',
                        templateUrl: 'app/storage/views/grainAnalysis/monthAnalysis-list.html'
                    }
                }
            })
            .state('app.storage.grainAnalysis.monthEdit', {
                url: '/monthEdit/:id/:butType',
                data: {
                    title: '月粮情分析详情'
                },
                views: {
                    "content@app": {
                        controller: 'monthAnalysisEditCtrl',
                        templateUrl: 'app/storage/views/grainAnalysis/monthAnalysis-edit.html'
                    }
                }
            })
            .state('app.storage.grainAnalysis.yearList', {
                url: '/yearList',
                data: {
                    title: '年粮情分析'
                },
                views: {
                    "content@app": {
                        controller: 'yearAnalysisCtrl',
                        templateUrl: 'app/storage/views/grainAnalysis/yearAnalysis-list.html'
                    }
                }
            })
            .state('app.storage.grainAnalysis.yearEdit', {
                url: '/yearEdit/:id/:butType',
                data: {
                    title: '年粮情分析详情'
                },
                views: {
                    "content@app": {
                        controller: 'yearAnalysisEditCtrl',
                        templateUrl: 'app/storage/views/grainAnalysis/yearAnalysis-edit.html'
                    }
                }
            })
            /*---------------------------------------------------化学药剂管理---------------------------------------------*/
            .state('app.storage.drug', {
                abstract: true,
                data: {
                    title: '化学药剂管理'
                }
            })
            /*--------------------------------------药剂信息维护---------------------------------*/
            .state('app.storage.drug.info', {
                url: '/storage/drug/info',
                data: {
                    title: '药剂信息维护'
                },
                views: {
                    "content@app": {
                        controller: 'drugInfoCtrl',
                        templateUrl: 'app/storage/drug/drugInfo/views/drugInfo-list.html'
                    }
                }
            })
            .state('app.storage.drug.info.edit', {
                url: '/storage/drug/info/edit/:id/:orgId',
                params: {
                    "isNotEdit" : false
                },
                data: {
                    title: '编辑'
                },
                views: {
                    "content@app": {
                        controller: 'drugInfoSaveCtrl',
                        templateUrl: 'app/storage/drug/drugInfo/views/drugInfo-edit.html'
                    }
                }
            })
            .state('app.storage.drug.info.view', {
                url: '/storage/drug/info/view/:id/:orgId',
                params: {
                    "isNotEdit" : true
                },
                data: {
                    title: '查看'
                },
                views: {
                    "content@app": {
                        controller: 'drugInfoSaveCtrl',
                        templateUrl: 'app/storage/drug/drugInfo/views/drugInfo-edit.html'
                    }
                }
            })
            /*--------------------------------------药剂采购管理---------------------------------*/
            .state('app.storage.drug.purchase', {
                url: '/storage/drug/purchase',
                data: {
                    title: '药剂采购申请'
                },
                views: {
                    "content@app": {
                        controller: 'drugPurchaseCtrl',
                        templateUrl: 'app/storage/drug/drugPurchase/views/drugPurchase-list.html'
                    }
                }
            })

            .state('app.storage.drug.purchase.edit', {
                url: '/storage/drug/purchase/edit/:id',
                params: {
                    "isNotEdit" : false
                },
                data: {
                    title: '编辑'
                },
                views: {
                    "content@app": {
                        controller: 'drugPurchaseSaveCtrl',
                        templateUrl: 'app/storage/drug/drugPurchase/views/drugPurchase-edit.html'
                    }
                }
            })


            .state('app.storage.drug.purchase.view', {
                url: '/storage/drug/purchase/view/:id',
                params: {
                    "isNotEdit" : true
                },
                data: {
                    title: '查看'
                },
                views: {
                    "content@app": {
                        controller: 'drugPurchaseSaveCtrl',
                        templateUrl: 'app/storage/drug/drugPurchase/views/drugPurchase-edit.html'
                    }
                }
            })
            /*--------------------------------------药剂采购审批---------------------------------*/
            .state('app.storage.drug.purchaseAudit', {
                url: '/storage/drug/purchaseAudit',
                data: {
                    title: '药剂采购审批'
                },
                views: {
                    "content@app": {
                        controller: 'drugPurchaseAuditCtrl',
                        templateUrl: 'app/storage/drug/drugPurchase/views/drugPurchase-audit-list.html'
                    }
                }
            })
            /*------------药剂采购审批保存------------*/
            .state('app.storage.drug.purchaseAudit-save', {
                url: '/storage/drug/purchaseAudit-save/:id/:processInstanceId/:taskId/:auditId/:taskName',
                data: {
                    title: '审批'
                },
                params: {
                    "isAudit" : true
                },
                views: {
                    "content@app": {
                        controller: 'drugPurchaseAuditSaveCtrl',
                        templateUrl: 'app/storage/drug/drugPurchase/views/drugPurchase-edit.html'
                    }
                }
            })
            /*---------------药剂审批查看----------------*/
            .state('app.storage.drug.purchaseAudit-view', {
                url: '/storage/drug/purchaseAudit-view/:id/:processInstanceId/:taskId/:auditId',
                data: {
                    title: '查看'
                },
                params: {
                    "isAudit" : false
                },
                views: {
                    "content@app": {
                        controller: 'drugPurchaseAuditSaveCtrl',
                        templateUrl: 'app/storage/drug/drugPurchase/views/drugPurchase-edit.html'
                    }
                }
            })
            /*--------------------------------------药剂入库-------------------------------*/
            .state('app.storage.drug.storage', {
                url: '/storage/drug/storage',
                data: {
                    title: '药剂入库'
                },
                views: {
                    "content@app": {
                        controller: 'drugStorageCtrl',
                        templateUrl: 'app/storage/drug/drugStorage/views/drugStorage-list.html'
                    }
                }
            })
            .state('app.storage.drug.storage.edit', {
                url: '/storage/drug/storage/edit/:id',
                params: {
                    "isNotEdit" : false
                },
                data: {
                    title: '编辑'
                },
                views: {
                    "content@app": {
                        controller: 'drugStorageSaveCtrl',
                        templateUrl: 'app/storage/drug/drugStorage/views/drugStorage-edit.html'
                    }
                }
            })
            .state('app.storage.drug.storage.view', {
                url: '/storage/drug/storage/view/:id',
                params: {
                    "isNotEdit" : true
                },
                data: {
                    title: '查看'
                },
                views: {
                    "content@app": {
                        controller: 'drugStorageSaveCtrl',
                        templateUrl: 'app/storage/drug/drugStorage/views/drugStorage-edit.html'
                    }
                }
            })
            /*--------------------------------------药剂领用申请-------------------------------*/
            .state('app.storage.drug.useApply', {
                url: '/storage/drug/useApply',
                data: {
                    title: '药剂领用申请'
                },
                views: {
                    "content@app": {
                        controller: 'drugUseApplyCtrl',
                        templateUrl: 'app/storage/drug/drugUseApply/views/drugUseApply-list.html'
                    }
                }
            })
            .state('app.storage.drug.useApply.edit', {
                url: '/storage/drug/useApply/edit/:id/:updateUser',
                params: {
                    "isNotEdit" : false
                },
                data: {
                    title: '编辑'
                },
                views: {
                    "content@app": {
                        controller: 'drugUseApplySaveCtrl',
                        templateUrl: 'app/storage/drug/drugUseApply/views/drugUseApply-edit.html'
                    }
                }
            })
            .state('app.storage.drug.useApply.view', {
                url: '/storage/drug/useApply/view/:id/:check',
                params: {
                    "isNotEdit" : true
                },
                data: {
                    title: '查看'
                },
                views: {
                    "content@app": {
                        controller: 'drugUseApplySaveCtrl',
                        templateUrl: 'app/storage/drug/drugUseApply/views/drugUseApply-edit.html'
                    }
                }
            })
            /*--------------------------------------药剂领用审批---------------------------------*/
            .state('app.storage.drug.useApplyAudit', {
                url: '/storage/drug/useApplyAudit',
                data: {
                    title: '药剂领用审批'
                },
                views: {
                    "content@app": {
                        controller: 'drugUseApplyAuditCtrl',
                        templateUrl: 'app/storage/drug/drugUseApply/views/drugUseApply-audit-list.html'
                    }
                }
            })
            /*------------药剂领用审批保存------------*/
            .state('app.storage.drug.useApplyAudit-save', {
                url: '/storage/drug/useApplyAudit-save/:id/:processInstanceId/:taskId/:auditId/:taskName',
                data: {
                    title: '审批'
                },
                params: {
                    "isAudit" : true
                },
                views: {
                    "content@app": {
                        controller: 'drugUseApplyAuditSaveCtrl',
                        templateUrl: 'app/storage/drug/drugUseApply/views/drugUseApply-edit.html'
                    }
                }
            })
            /*---------------药剂领用审批查看----------------*/
            .state('app.storage.drug.useApplyAudit-view', {
                url: '/storage/drug/useApplyAudit-view/:id/:processInstanceId/:taskId/:auditId',
                data: {
                    title: '查看'
                },
                params: {
                    "isAudit" : false
                },
                views: {
                    "content@app": {
                        controller: 'drugUseApplyAuditSaveCtrl',
                        templateUrl: 'app/storage/drug/drugUseApply/views/drugUseApply-edit.html'
                    }
                }
            })
            /*--------------------------------------药剂领用登记-------------------------------*/
            .state('app.storage.drug.use', {
                url: '/storage/drug/use',
                data: {
                    title: '药剂领用登记'
                },
                views: {
                    "content@app": {
                        controller: 'drugUseCtrl',
                        templateUrl: 'app/storage/drug/drugUse/views/drugUse-list.html'
                    }
                }
            })
            .state('app.storage.drug.use.edit', {
                url: '/storage/drug/use/edit/:id',
                params: {
                    "isNotEdit" : false
                },
                data: {
                    title: '编辑'
                },
                views: {
                    "content@app": {
                        controller: 'drugUseSaveCtrl',
                        templateUrl: 'app/storage/drug/drugUse/views/drugUse-edit.html'
                    }
                }
            })
            .state('app.storage.drug.use.view', {
                url: '/storage/drug/use/view/:id',
                params: {
                    "isNotEdit" : true
                },
                data: {
                    title: '查看'
                },
                views: {
                    "content@app": {
                        controller: 'drugUseSaveCtrl',
                        templateUrl: 'app/storage/drug/drugUse/views/drugUse-edit.html'
                    }
                }
            })
            /*--------------------------------------药剂归还--------------------------------*/
            .state('app.storage.drug.restore', {
                url: '/storage/drug/restore',
                data: {
                    title:'药剂归还'
                },
                views: {
                    "content@app": {
                        controller: 'drugRestoreCtrl',
                        templateUrl: 'app/storage/drug/drugRestore/views/drugRestore-list.html'
                    }
                }
            })
            // 药剂归还编辑
            .state('app.storage.drug.restore.edit', {
                url: '/storage/drug/restore/edit/:id',
                params: {
                    "isNotEdit" : false
                },
                data: {
                    title: '编辑'
                },
                views: {
                    "content@app": {
                        controller: 'drugRestoreSaveCtrl',
                        templateUrl: 'app/storage/drug/drugRestore/views/drugRestore-edit.html'
                    }
                }
            })
            // 药剂归还查看
            .state('app.storage.drug.restore.view', {
                url: '/storage/drug/restore/view/:id',
                params: {
                    "isNotEdit" : true
                },
                data: {
                    title: '查看'
                },
                views: {
                    "content@app": {
                        controller: 'drugRestoreSaveCtrl',
                        templateUrl: 'app/storage/drug/drugRestore/views/drugRestore-edit.html'
                    }
                }
            })
            /*--------------------------------------药剂销毁-------------------------------*/
            .state('app.storage.drug.drugDestroy', {
                url: '/storage/drug/drugDestroy',
                data: {
                    title: '药剂销毁'
                },
                views: {
                    "content@app": {
                        controller: 'drugDestroyCtrl',
                        templateUrl: 'app/storage/drug/drugDestroy/views/drugDestroy-list.html'
                    }
                }
            })
            .state('app.storage.drug.drugDestroy-edit', {
                url: '/storage/drugDestroy-edit/:id',
                params: {
                    "isNotEdit" : false
                },
                data: {
                    title: '编辑'
                },
                views: {
                    "content@app": {
                        controller: 'drugDestroySaveCtrl',
                        templateUrl: 'app/storage/drug/drugDestroy/views/drugDestroy-edit.html'
                    }
                }
            })
            .state('app.storage.drug.drugDestroy-view', {
                url: '/storage/drugDestroy-view/:id',
                params: {
                    "isNotEdit" : true
                },
                data: {
                    title: '查看'
                },
                views: {
                    "content@app": {
                        controller: 'drugDestroySaveCtrl',
                        templateUrl: 'app/storage/drug/drugDestroy/views/drugDestroy-edit.html'
                    }
                }
            })
            /*--------------------------------------药剂台账-------------------------------*/
            .state('app.storage.drug.standingBook', {
                url: '/storage/drug/standingBook',
                data: {
                    title: '药剂台账'
                },
                views: {
                    "content@app": {
                        controller: 'drugStandingBookCtrl',
                        templateUrl: 'app/storage/drug/drugStandingBook/views/drugStandingBook-list.html'
                    }
                }
            })
            .state('app.storage.drug.standingBook.detail', {
                url: '/storage/drug/standingBook/detail/:drugInfoId/:manufacturer',
                data: {
                    title: '详情'
                },
                views: {
                    "content@app": {
                        controller: 'drugStandingBookDetailCtrl',
                        templateUrl: 'app/storage/drug/drugStandingBook/views/drugStandingBook-detail-list.html'
                    }
                }
            })
            /*--------------------------------------药剂盘点-------------------------------*/
            .state('app.storage.drug.check', {
                url: '/storage/drug/check',
                data: {
                    title: '药剂盘点'
                },
                views: {
                    "content@app": {
                        controller: 'drugCheckCtrl',
                        templateUrl: 'app/storage/drug/drugCheck/views/drugCheck-list.html'
                    }
                }
            })
            .state('app.storage.drug.check.edit', {
                url: '/storage/drug/check/edit/:id',
                params: {
                    "isNotEdit" : false
                },
                data: {
                    title: '编辑'
                },
                views: {
                    "content@app": {
                        controller: 'drugCheckSaveCtrl',
                        templateUrl: 'app/storage/drug/drugCheck/views/drugCheck-edit.html'
                    }
                }
            })
            .state('app.storage.drug.check.view', {
                url: '/storage/drug/check/view/:id',
                params: {
                    "isNotEdit" : true
                },
                data: {
                    title: '查看'
                },
                views: {
                    "content@app": {
                        controller: 'drugCheckSaveCtrl',
                        templateUrl: 'app/storage/drug/drugCheck/views/drugCheck-edit.html'
                    }
                }
            })
            /*--------------------------------------药房管理-------------------------------*/
            .state('app.storage.drug.shelf', {
                url: '/storage/drug/shelf',
                data: {
                    title: '药房管理'
                },
                views: {
                    "content@app": {
                        controller: 'drugShelfCtrl',
                        templateUrl: 'app/storage/drug/drugShelf/views/drugShelf-list.html'
                    }
                }
            })
//------------------------------------仓储业务结束------------------------------------------//

            
            /*********************计划验收管理********************************/
            .state('app.storage.acceptanceList', {//列表
                    url: '/acceptance/acceptance-list/:customerPlanState',
                    data: {
                        title: '验收申请'
                    },
                    views: {
                        "content@app": {
                            controller: 'acceptanceCtrl',
                            templateUrl: 'app/storage/views/acceptance/acceptance-list.html'
                        }
                    }
                }
            )

            .state('app.storage.acceptanceSaveCX', { //新增
                    url: '/acceptance/acceptance-editCX/:id',
                    data: {
                        title: '新增'
                    },
                    params:{
                        isNotEdit : false
                    },
                    views: {
                        "content@app": {
                            controller: 'acceptanceCtrl',
                            templateUrl: 'app/storage/views/acceptance/acceptance-edit.html'
                        }
                    }
                }
            )

            .state('app.storage.acceptanceEditCX', { //详情
                    url: '/acceptance/acceptance-editCX/:id/:plan_id/:acceptance_number',
                    data: {
                        title: '查看'
                    },
                    params:{
                        isNotEdit : true
                    },
                    views: {
                        "content@app": {
                            controller: 'acceptanceCtrl',
                            templateUrl: 'app/storage/views/acceptance/acceptance-edit.html'
                        }
                    }
                }
            )

            .state('app.storage.acceptanceEditYS', {
                    url: '/acceptance/acceptance-editYS/:id',
                    data: {
                        title: '申请验收'
                    },
                    params:{
                        isNotEdit : false
                    },
                    views: {
                        "content@app": {
                            controller: 'acceptanceCtrl',
                            templateUrl: 'app/storage/views/acceptance/acceptance-edit.html'
                        }
                    }
                }
            )
        //****************************************************************************************************************
    });

//质量管理
/*angular.module('app.storage.qualitycheck', ['ui.router', 'datatables', 'datatables.bootstrap','app.basic'])
    .config(function ($stateProvider) {
        $stateProvider

    })*/

/*angular.module('app.storehouse', ['ui.router', 'datatables', 'datatables.bootstrap'])
    .config(function ($stateProvider) {
        $stateProvider

        //----------------仓房基本信息结束---------------//
    })*/



/*
angular.module('app.foodbasicinfo', ['ui.router', 'datatables', 'datatables.bootstrap'])
    .config(function ($stateProvider) {
        $stateProvider





    })
*/


/*


angular.module('app.payment', ['ui.router','app.alert', 'datatables', 'datatables.bootstrap']).config(function ($stateProvider) {
    $stateProvider

})
*/



// 数量管理.
angular.module('app.numbermanage', ['ui.router','app.alert', 'datatables', 'datatables.bootstrap']).config(function ($stateProvider) {
    $stateProvider
        .state('app.numbermanage', {
            abstract: true,
            data: {
                title: '仓储业务'
            }
        })
        
        // -------------------------------------------------------------------------------------
        .state('app.numbermanage.numbermanage', {
            url: '/numbermanage/:id',
            data: {
                title: '损益单'
            },
            views: {
                "content@app": {
                    controller: 'sheetCtrl',
                    templateUrl: 'app/storage/views/numberManage/sheet-list.html'
                }
            }
        })
        
        .state('app.numbermanage.numbermanage.sheet-edit', {
                url: '/numbermanage/sheet-edit/:id',
                data: {
                    title: '损益单详情'
                },
                params:{
                    isNotEdit : false
                },
                views: {
                    "content@app": {
                        controller: 'sheetSaveCtrl as datatables',
                        templateUrl: 'app/storage/views/numberManage/sheet-edit.html'
                    }
                }
            }
        )
        
        .state('app.numbermanage.numbermanage.sheet-view', {
                url: '/numbermanage/sheet-view/:id',
                data: {
                    title: '损益单管理编辑'
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
            }
        )
        /*********************库存数量管理********************************/
        .state('app.numbermanage.numbermanage.numberManage-list', {
                url: '/numbermanage/numberManage-list/:id',
                data: {
                    title: '库存数量管理'
                },
                params:{
                    isNotEdit : true
                },
                views: {
                    "content@app": {
                        controller: 'numberManageCtrl as datatables',
                        templateUrl: 'app/storage/views/numberManage/numberManage-list.html'
                    }
                }
            }
        )
        /************数量管理下出入库记录start*************/
        .state('app.supervise.operation.trainList', {
                url: '/operation/trainList/:id',
                data: {
                    title: '火车出入库记录'
                },
                params:{
                	type : 'hc'
                },
                views: {
                    "content@app": {
                        /*controller: 'trainInOutRecordCtrl as datatables',*/
                        controller: 'crkRecordCtrl as datatables',
                        templateUrl: 'app/supervise/views/trainInOutRecord-list.html'
                    }
                }
            })
            .state('app.supervise.operation.truckList', {
                url: '/operation/truckList/:id/:states/:homePage',
                data: {
                    title: '汽车出入库记录'
                },
                params:{
                	type : 'qc'
                },
                views: {
                    "content@app": {
                        /*controller: 'truckInOutRecordCtrl as datatables',*/
                        controller: 'crkRecordCtrl as datatables',
                        templateUrl: 'app/supervise/views/truckInOutRecord-list.html'
                    }
                }
            })
            .state('app.supervise.operation.detail', {
                url: '/operation/detail/:obj',// 传参 : id/:name/:pwd
                data: {
                    title: '汽车出入库记录详情'
                },
                views: {
                    "content@app": {
                        controller: 'crkRecordDetailCtrl as datatables',
                        templateUrl: 'app/supervise/views/crkRecordDetail.html'
                    }
                }
            })
            /************数量管理下出入库记录end*************/

        /*********************库存空仓报警********************************/
        .state('app.numbermanage.numbermanage.emptyPoliceList', {
                url: '/numbermanage/emptyPolice-list/:id',
                data: {
                    title: '库存空仓报警'
                },
                params:{
                    isNotEdit : true
                },
                views: {
                    "content@app": {
                        controller: 'emptyPoliceCtrl as datatables',
                        templateUrl: 'app/storage/views/numberManage/emptyPolice-list.html'
                    }
                }
            }
        )
        
        .state('app.storage.index', {
                url: '/storage/index',
                data: {
                    title: '业务介绍'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/storage/views/index/storage-index.html'
                    }
                }
            }
        )
        //****************************************************************************************************************
})