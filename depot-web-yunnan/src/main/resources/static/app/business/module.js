"use strict";


angular.module('app.business', ['ui.router', 'ui.bootstrap', 'datatables', 'datatables.bootstrap'])

angular.module('app.business')
    .config(function ($stateProvider) {
    $stateProvider
        .state('app.business', {
            abstract: true,
            data: {
                title: '综合业务管理'
            }
        })
        
        /*----------------------------------------------计划------------------------------------*/
        .state('app.business.plan', {
            url: '/business/plan/:executeType',
            data: {
                title: '计划管理'
            },
            views: {
                "content@app": {
                    controller: 'planCtrl',
                    templateUrl: 'app/business/plan/views/plan-list.html'
                }
            }
        })
        .state('app.business.plan-edit', {
                url: '/business/plan-edit/:id',
                data: {
                    title: '计划编辑'
                },
                params:{
                    isNotEdit : false
                },
                views: {
                    "content@app": {
                        controller: 'planSaveCtrl as datatables',
                        templateUrl: 'app/business/plan/views/plan-edit.html'
                    }
                }
            }
        )
        
        .state('app.business.plan-view', {
            url: '/business/plan-view/:id/:processInstanceId',
            data: {
                title: '计划查看'
            },
            params:{
                    isNotEdit : true
                },
            views: {
                "content@app": {
                    controller: 'planSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        
        .state('app.business.plan-audit', {
            url: '/business/plan-audit',
            params: {
                "type" : "plan"
            },
            data: {
                title: '计划审批'
            },
            views: {
                "content@app": {
                    controller: 'planAuditCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-audit-list.html'
                }
            }
        })
        
        .state('app.business.plan-audit-save', {
            url: '/business/plan-audit-save/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '计划审批编辑'
            },
            params: {
                "isAudit" : true
            },
            views: {
                "content@app": {
                    controller: 'planAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        
        .state('app.business.plan-audit-view', {
            url: '/business/plan-audit-view/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '计划审批查看'
            },
            params: {
                "isAudit" : false
            },
            views: {
                "content@app": {
                    controller: 'planAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        
        // -------------------------------------计划通过-----------------------------------------------------------
        .state('app.business.plan-audit-pass', {
            url: '/business/plan-audit-pass',
            data: {
                title: '计划完成查询'
            },
            views: {
                "content@app": {
                    controller: 'planAuditPassCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-audit-pass-list.html'
                }
            }
        })
        
        .state('app.business.plan-audit-pass-view', {
            url: '/business/plan-audit-pass-view/:id/:processInstanceId',
            data: {
                title: '计划完成查询查看'
            },
            params:{
                isNotEdit : true
            },
            views: {
                "content@app": {
                    controller: 'planAuditPassSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        
        
  //-----------------------------------------计划上报---------------------------------------
        .state('app.business.plan-report', {
        	url: '/business/plan-report',
        	data: {
        		title: '计划上报列表'
        	},
        	params:{
        		isNotEdit : true
        	},
        	views: {
        		"content@app": {
        			controller: 'planReportCtrl as datatables',
        			templateUrl: 'app/business/plan/views/plan-report-list.html'
        		}
        	}
        })
        
        .state('app.business.plan-report-view', {
            url: '/business/plan-report-view/:id/:processInstanceId',
            data: {
                title: '计划上报查看'
            },
            params:{
                    isNotEdit : true
                },
            views: {
                "content@app": {
                    controller: 'planReportSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-report-edit.html'
                }
            }
        })
        
        .state('app.business.plan-reportSuccess-view', {
        	url: '/business/plan-reportSuccess-view/:id/:processInstanceId',
        	data: {
        		title: '计划上报成功查看'
        	},
        	params:{
        		isNotEdit : true
        	},
        	views: {
        		"content@app": {
        			controller: 'planReportSaveCtrl as datatables',
        			templateUrl: 'app/business/plan/views/plan-report-success-edit.html'
        		}
        	}
        })
        
        
        //-----------------------------------------预警管理---------------------------------------
        .state('app.business.plan-warning-list', {
            url: '/business/plan-warning-list',
            data: {
                title: '预警查询'
            },
            views: {
                "content@app": {
                    controller: 'planWarningCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-warning-list.html'
                }
            }
        })
        
        .state('app.business.plan-warning-time', {
        	url: '/business/plan-warning-time',
        	data: {
        		title: '预警时间'
        	},
        	views: {
        		"content@app": {
        			controller: 'planWarningTimeCtrl as datatables',
        			templateUrl: 'app/business/plan/views/plan-warning-time-list.html'
        		}
        	}
        })
        
        /*----------------------------------------------客户------------------------------------*/
        .state('app.business.customer', {
            abstract: true,
            data: {
                title: '客户管理'
            }
        })
        
        .state('app.business.customer.list', {
            url: '/business/customer',
            data: {
                title: '客户档案管理'
            },
            views: {
                "content@app": {
                    controller: 'customerCtrl',
                    templateUrl: 'app/business/customer/views/customer-list.html'
                }
            }
        })
        .state('app.business.customer.add', {
                url: '/business/customer/add/:id',
                data: {
                    title: '客户档案新增'
                },
                views: {
                    "content@app": {
                        controller: 'customerSaveCtrl as datatables',
                        templateUrl: 'app/business/customer/views/customer-edit.html'
                    }
                }
            }
        )
        .state('app.business.customer.edit', {
            url: '/business/customer/edit/:id',
            data: {
                title: '客户档案修改'
            },
            views: {
                "content@app": {
                    controller: 'customerSaveCtrl as datatables',
                    templateUrl: 'app/business/customer/views/customer-edit.html'
                }
            }
        })
        
        
        .state('app.business.customer.badrecord', {
            url: '/business/customer/badrecord',
            data: {
                title: '客户不良记录管理'
            },
            views: {
                "content@app": {
                    controller: 'customerBadrecordCtrl',
                    templateUrl: 'app/business/customer/views/customerBadrecord-list.html'
                }
            }
        })
        
        .state('app.business.customer.blackList', {
            url: '/business/customer/blackList',
            data: {
                title: '客户黑名单管理'
            },
            views: {
                "content@app": {
                    controller: 'customerBlackListCtrl',
                    templateUrl: 'app/business/customer/views/customer-blackList.html'
                }
            }
        })
        
        
        /*------------------------------------------------合同--------------------------------------*/
        .state('app.business.contract', {
            url: '/business/contract/:contractType',
            data: {
                title: '合同申请'
            },
            views: {
                "content@app": {
                    controller: 'contractCtrl',
                    templateUrl: 'app/business/contract/views/contract-list.html'
                }
            }
        })
        
        .state('app.business.contract-edit', {
            url: '/business/contract-edit/:id',
            data: {
                title: '合同编辑'
            },
            params:{
                    isNotEdit : false
            },
            views: {
                "content@app": {
                    controller: 'contractSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-edit.html'
                }
            }
        })
        
        .state('app.business.contract-view', {
            url: '/business/contract-add/:id/:processInstanceId',
            data: {
                title: '合同查看'
            },
            params:{
                isNotEdit : true
            },
            views: {
                "content@app": {
                    controller: 'contractSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-edit.html'
                }
            }
        })
        
        .state('app.business.contract-audit', {
            url: '/business/contract-audit',
            data: {
                title: '合同审批'
            },
            views: {
                "content@app": {
                    controller: 'contractAuditCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-audit-list.html'
                }
            }
        })
        
        .state('app.business.contract-audit-save', {
            url: '/business/contract-audit-save/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '合同审批'
            },
            params: {
                "isAudit" : true
            },
            views: {
                "content@app": {
                    controller: 'contractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-edit.html'
                }
            }
        })
        
        .state('app.business.contract-audit-saves', {
            url: '/business/contract-audit-saves/:id/:processInstanceId/:taskId/:auditId/:type',
            data: {
                title: '合同审批'
            },
            params: {
                "isAudit" : true
            },
            views: {
                "content@app": {
                    controller: 'contractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-edit.html'
                }
            }
        })
        
        .state('app.business.contract-audit-view', {
            url: '/business/contract-audit-view/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '合同审批'
            },
            params: {
                "isAudit" : false
            },
            views: {
                "content@app": {
                    controller: 'contractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-edit.html'
                }
            }
        })
        
        .state('app.business.contract-change', {
            url: '/business/contract-change',
            data: {
                title: '合同变更'
            },
            views: {
                "content@app": {
                    controller: 'contractChangeCtrl',
                    templateUrl: 'app/business/contract/views/contract-change-list.html'
                }
            }
        })
        
        .state('app.business.contract-change-add', {
                url: '/business/contract-change-add/:id',
                data: {
                    title: '合同变更新增'
                },
                params: {
                    "isNotEdit" : false,
                    "editType": "add"
                },
                views: {
                    "content@app": {
                        controller: 'contractChangeSaveCtrl as datatables',
                        templateUrl: 'app/business/contract/views/contract-change-edit.html'
                    }
                }
            }
        )
        .state('app.business.contract-change-edit', {
            url: '/business/contract-change-edit/:id',
            data: {
                title: '合同变更编辑'
            },
            params: {
                    "isNotEdit" : false,
                    "editType": "edit"
            },
            views: {
                "content@app": {
                    controller: 'contractChangeSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-change-edit.html'
                }
            }
        })
        .state('app.business.contract-change-view', {
            url: '/business/contract-change-view/:id/:processInstanceId',
            data: {
                title: '合同变更查看'
            },
            params: {
                    "isNotEdit" : true,
                    "editType": "edit"
            },
            views: {
                "content@app": {
                    controller: 'contractChangeSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-change-edit.html'
                }
            }
        })
        
        // -------------------------------------------------------合同变更审批--------------------------------------------------------
        .state('app.business.contract-change-audit', {
            url: '/business/contract-change-audit',
            data: {
                title: '合同变更审批'
            },
            params: {
                "auditType" : "change"
            },
            views: {
                "content@app": {
                    controller: 'contractAuditCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-change-audit-list.html'
                }
            }
        })
        
        .state('app.business.contract-change-audit-save', {
            url: '/business/contract-change-audit-save/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '合同变更审批'
            },
            params: {
                "isAudit" : true,
                "auditType" : "change"
            },
            views: {
                "content@app": {
                    controller: 'contractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-change-edit.html'
                }
            }
        })
        
        .state('app.business.contract-change-audit-view', {
            url: '/business/contract-change-audit-view/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '合同变更审批查看'
            },
            params: {
                "isAudit" : false,
                "auditType" : "change"
            },
            views: {
                "content@app": {
                    controller: 'contractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-change-edit.html'
                }
            }
        })
        
        
        // -------------------------------------------------------合同完成查询--------------------------------------------------------
        .state('app.business.contract-audit-pass', {
            url: '/business/contract-audit-pass',
            data: {
                title: '合同完成查询'
            },
            views: {
                "content@app": {
                    controller: 'contractAuditPassCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-audit-pass-list.html'
                }
            }
        })
        
        .state('app.business.contract-audit-pass-view', {
            url: '/business/contract-audit-pass-view/:id/:processInstanceId',
            data: {
                title: '合同完成查询'
            },
            params:{
                isNotEdit : true
            },
            views: {
                "content@app": {
                    controller: 'contractAuditPassSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-edit.html'
                }
            }
        })
        
        
         /*-----------------------------------------------------中转合同------------------------------------------------------------*/

        .state('app.business.transferContract', {
            url: '/business/transferContract',
            data: {
                title: '合同管理'
            },
            views: {
                "content@app": {
                    controller: 'transferContractCtrl',
                    templateUrl: 'app/business/transferContract/views/transferContract-list.html'
                }
            }
        })
        
        .state('app.business.transferContract-edit', {
            url: '/business/transferContract-edit/:id',
            data: {
                title: '合同编辑'
            },
            params:{
                    isNotEdit : false
            },
            views: {
                "content@app": {
                    controller: 'transferContractSaveCtrl as datatables',
                    templateUrl: 'app/business/transferContract/views/transferContract-edit.html'
                }
            }
        })
        
        .state('app.business.transferContract-view', {
            url: '/business/transferContract-add/:id/:processInstanceId',
            data: {
                title: '合同查看'
            },
            params:{
                isNotEdit : true
            },
            views: {
                "content@app": {
                    controller: 'transferContractSaveCtrl as datatables',
                    templateUrl: 'app/business/transferContract/views/transferContract-edit.html'
                }
            }
        })
        
        .state('app.business.transferContract-audit', {
            url: '/business/transferContract-audit',
            data: {
                title: '合同审批'
            },
            views: {
                "content@app": {
                    controller: 'transferContractAuditCtrl as datatables',
                    templateUrl: 'app/business/transferContract/views/contract-audit-list.html'
                }
            }
        })
        
        .state('app.business.transferContract-audit-save', {
            url: '/business/transferContract-audit-save/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '合同审批'
            },
            params: {
                "isAudit" : true
            },
            views: {
                "content@app": {
                    controller: 'transferContractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/transferContract/views/transferContract-edit.html'
                }
            }
        })
        
        .state('app.business.transferContract-audit-saves', {
            url: '/business/transferContract-audit-saves/:id/:processInstanceId/:taskId/:auditId/:type',
            data: {
                title: '合同审批'
            },
            params: {
                "isAudit" : true
            },
            views: {
                "content@app": {
                    controller: 'transferContractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/transferContract/views/transferContract-edit.html'
                }
            }
        })
        
        .state('app.business.transferContract-audit-view', {
            url: '/business/transferContract-audit-view/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '合同审批'
            },
            params: {
                "isAudit" : false
            },
            views: {
                "content@app": {
                    controller: 'transferContractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/transferContract/views/transferContract-edit.html'
                }
            }
        })
        
        .state('app.business.transferContract-change', {
            url: '/business/transferContract-change',
            data: {
                title: '合同变更'
            },
            views: {
                "content@app": {
                    controller: 'transferContractChangeCtrl',
                    templateUrl: 'app/business/transferContract/views/contract-change-list.html'
                }
            }
        })
        
        .state('app.business.transferContract-change-add', {
                url: '/business/transferContract-change-add/:id',
                data: {
                    title: '合同变更新增'
                },
                params: {
                    "isNotEdit" : false,
                    "editType": "add"
                },
                views: {
                    "content@app": {
                        controller: 'transferContractChangeSaveCtrl as datatables',
                        templateUrl: 'app/business/transferContract/views/contract-change-edit.html'
                    }
                }
            }
        )
        .state('app.business.transferContract-change-edit', {
            url: '/business/transferContract-change-edit/:id',
            data: {
                title: '合同变更编辑'
            },
            params: {
                    "isNotEdit" : false,
                    "editType": "edit"
            },
            views: {
                "content@app": {
                    controller: 'transferContractChangeSaveCtrl as datatables',
                    templateUrl: 'app/business/transferContract/views/contract-change-edit.html'
                }
            }
        })
        
        .state('app.business.transferContract-change-view', {
            url: '/business/transferContract-change-view/:id/:processInstanceId',
            data: {
                title: '合同变更查看'
            },
            params: {
                    "isNotEdit" : true,
                    "editType": "edit"
            },
            views: {
                "content@app": {
                    controller: 'transferContractChangeSaveCtrl as datatables',
                    templateUrl: 'app/business/transferContract/views/contract-change-edit.html'
                }
            }
        })
        
        // -------------------------------------------------------合同变更审批--------------------------------------------------------
        .state('app.business.transferContract-change-audit', {
            url: '/business/transferContract-change-audit',
            data: {
                title: '合同变更审批'
            },
            params: {
                "auditType" : "change"
            },
            views: {
                "content@app": {
                    controller: 'transferContractAuditCtrl as datatables',
                    templateUrl: 'app/business/transferContract/views/contract-audit-list.html'
                }
            }
        })
        
        .state('app.business.transferContract-change-audit-save', {
            url: '/business/transferContract-change-audit-save/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '合同变更审批'
            },
            params: {
                "isAudit" : true,
                "auditType" : "change"
            },
            views: {
                "content@app": {
                    controller: 'transferContractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/transferContract/views/contract-change-edit.html'
                }
            }
        })
        
        .state('app.business.transferContract-change-audit-view', {
            url: '/business/transferContract-change-audit-view/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '合同变更审批查看'
            },
            params: {
                "isAudit" : false,
                "auditType" : "change"
            },
            views: {
                "content@app": {
                    controller: 'transferContractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/transferContract/views/contract-change-edit.html'
                }
            }
        })
        
        
        // -------------------------------------------------------合同完成查询--------------------------------------------------------
        .state('app.business.transferContract-audit-pass', {
            url: '/business/transferContract-audit-pass',
            data: {
                title: '合同完成查询'
            },
            views: {
                "content@app": {
                    controller: 'transferContractAuditPassCtrl as datatables',
                    templateUrl: 'app/business/transferContract/views/contract-audit-pass-list.html'
                }
            }
        })
        
        .state('app.business.transferContract-audit-pass-view', {
            url: '/business/transferContract-audit-pass-view/:id/:processInstanceId',
            data: {
                title: '合同完成查询'
            },
            params:{
                isNotEdit : true
            },
            views: {
                "content@app": {
                    controller: 'transferContractAuditPassSaveCtrl as datatables',
                    templateUrl: 'app/business/transferContract/views/transferContract-edit.html'
                }
            }
        })
          
        .state('app.business.transferNotice', {
            url: '/business/transferNotice',
            data: {
                title: '发运中转通知单'
            },
            views: {
                "content@app": {
                    controller: 'transferNoticeCtrl',
                    templateUrl: 'app/business/transferContract/views/transferNotice-list.html'
                }
            }
        })
        
        .state('app.business.transferNotice-edit', {
            url: '/business/transferNotice-edit/:id',
            params: {
                "noticeType" : "storage",
                "isNotEdit" : false
            },
            data: {
                title: '发运中转通知单新增'
            },
            views: {
                "content@app": {
                    controller: 'transferNoticeSaveCtrl',
                    templateUrl: 'app/business/transferContract/views/transferNotice-edit.html'
                }
            }
        })
        
        .state('app.business.transferNotice-view', {
            url: '/business/transferNotice-view/:id/:processInstanceId',
            params: {
                "noticeType" : "storage",
                "isNotEdit" : true
            },
            data: {
                title: '发运中转通知单查看'
            },
            views: {
                "content@app": {
                    controller: 'transferNoticeSaveCtrl',
                    templateUrl: 'app/business/transferContract/views/transferNotice-edit.html'
                }
            }
        })
        
        
        .state('app.business.lading', {
        	url: '/business/lading',
        	data: {
        		title: '提货单'
        	},
        	views: {
        		"content@app": {
        			controller: 'ladingCtrl',
        			templateUrl: 'app/business/transferContract/views/lading-list.html'
        		}
        	}
        })
        
          .state('app.business.lading-edit', {
            url: '/business/lading-edit/:id',
            data: {
                title: '提货单新增'
            },
            views: {
                "content@app": {
                    controller: 'ladingSaveCtrl',
                    templateUrl: 'app/business/transferContract/views/lading-edit.html'
                }
            }
        })
        
        .state('app.business.lading-view', {
            url: '/business/lading-view/:id/:type',
            params: {
                "noticeType" : "storage",
                "isNotEdit" : true
            },
            data: {
                title: '提货单查看'
            },
            views: {
                "content@app": {
                    controller: 'ladingSaveCtrl',
                    templateUrl: 'app/business/transferContract/views/lading-edit.html'
                }
            }
        })
        
        
        
        //---------------------------------------------合同收付款-----------------------------------------------------  
        .state('app.business.contract-pay-recevice', {
            url: '/business/contract-pay-recevice',
            data: {
                title: '合同收付款'
            },
            views: {
                "content@app": {
                    controller: 'contractPayReceviceCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-pay-recevice-list.html'
                }
            }
        })
        
        .state('app.business.contract-pay-recevice-view', {
            url: '/business/contract-pay-recevice-view',
            data: {
                title: '合同收付款详情'
            },
            params:{
                isNotEdit : true
            },
            views: {
                "content@app": {
                    controller: 'contractPayReceviceSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-pay-recevice-edit.html'
                }
            }
        })
        
        .state('app.business.contract-performance', {
        	url: '/business/contract-performance',
        	data: {
        		title: '合同履约详情'
        	},
        	params:{
        		isNotEdit : true
        	},
        	views: {
        		"content@app": {
        			controller: 'contractPayReceviceSaveCtrl as datatables',
        			templateUrl: 'app/business/contract/views/contract-performance-list.html'
        		}
        	}
        })
        
        .state('app.business.contract-pay-recevice-details', {
            url: '/business/contract-pay-recevice-details/:contractNum',
            data: {
                title: '合同收付款记录'
            },
            views: {
                "content@app": {
                    controller: 'contractPayReceviceCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-pay-recevice-detailslist.html'
                }
            }
        })
        
        
        
        
        
        
        
        /*-----------------------------------------------------出入库通知单----------------------------------------------------------*/
        
        .state('app.business.deliveryStorageNotice', {
            url: '/business/deliveryStorageNotice/:billType',
            data: {
                title: '出入库通知单管理'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/deliveryStorageNotice-list.html'
                }
            }
        })
        
        .state('app.business.deliveryNotice-edit', {
            url: '/business/deliveryNotice-edit/:id',
            params: {
                "noticeType" : "delivery",
                "isNotEdit" : false
            },
            data: {
                title: '出库通知单管理编辑'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeSaveCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/deliveryNotice-edit.html'
                }
            }
        })
        
        
        .state('app.business.storageNotice-edit', {
            url: '/business/storageNotice-edit/:id',
            params: {
                "noticeType" : "storage",
                "isNotEdit" : false
            },
            data: {
                title: '入库通知单管理编辑'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeSaveCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/storageNotice-edit.html'
                }
            }
        })
        
        .state('app.business.deliveryNotice-view', {
            url: '/business/deliveryNotice-view/:id/:processInstanceId',
            params: {
                "noticeType" : "delivery",
                "isNotEdit" : true
            },
            data: {
                title: '出库通知单管理查看'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeSaveCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/deliveryNotice-edit.html'
                }
            }
        })
        
        
        .state('app.business.storageNotice-view', {
            url: '/business/storageNotice-view/:id/:processInstanceId',
            params: {
                "noticeType" : "storage",
                "isNotEdit" : true
            },
            data: {
                title: '入库通知单管理查看'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeSaveCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/storageNotice-edit.html'
                }
            }
        })
        
        /*--------------------------------出入库通知单审批-------------------------------------*/
        
        .state('app.business.deliveryStorageNotice-audit', {
            url: '/business/deliveryStorageNotice-audit',
            data: {
                title: '出入库通知单审批'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeAuditCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/deliveryStorageNotice-audit-list.html'
                }
            }
        })
        
        .state('app.business.deliveryNotice-audit-edit', {
            url: '/business/deliveryNotice-audit-edit/:id/:processInstanceId/:taskId/:auditId',
            params: {
                "noticeType" : "delivery",
                "isAudit" : true
            },
            data: {
                title: '出库通知单审批编辑'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeAuditSaveCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/deliveryNotice-edit.html'
                }
            }
        })
        
        
        .state('app.business.storageNotice-audit-edit', {
            url: '/business/storageNotice-audit-edit/:id/:processInstanceId/:taskId/:auditId',
            params: {
                "noticeType" : "storage",
                "isAudit" : true
            },
            data: {
                title: '入库通知单审批编辑'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeAuditSaveCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/storageNotice-edit.html'
                }
            }
        })
        
        .state('app.business.deliveryNotice-audit-view', {
            url: '/business/deliveryNotice-audit-view/:id/:processInstanceId/:taskId/:auditId',
            params: {
                "noticeType" : "delivery",
                "isAudit" : false
            },
            data: {
                title: '出库通知单审批查看'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeAuditSaveCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/deliveryNotice-edit.html'
                }
            }
        })
        
        
        .state('app.business.storageNotice-audit-view', {
            url: '/business/storageNotice-audit-view/:id/:processInstanceId/:taskId/:auditId',
            params: {
                "noticeType" : "storage",
                "isAudit" : false
            },
            data: {
                title: '入库通知单审批查看'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeAuditSaveCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/storageNotice-edit.html'
                }
            }
        })
        
       .state('app.business.deliveryStorageNotice-audit-pass', {
            url: '/business/deliveryStorageNotice-audit-pass',
            data: {
                title: '出入库通知单完成查询'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeAuditPassCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/deliveryStorageNotice-audit-pass-list.html'
                }
            }
        })
        
        .state('app.business.deliveryNotice-audit-pass-view', {
            url: '/business/deliveryNotice-audit-pass-view/:id/:processInstanceId/:check',
            params: {
                "noticeType" : "delivery",
                "isNotEdit" : true,
                "fromPage" : "audit-pass"
            },
            data: {
                title: '出库通知单完成查看'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeSaveCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/deliveryNotice-edit.html'
                }
            }
        })

        .state('app.business.storageNotice-audit-pass-view', {
            url: '/business/storageNotice-audit-pass-view/:id/:processInstanceId/:check',
            params: {
                "noticeType" : "storage",
                "isNotEdit" : true,
                "fromPage" : "audit-pass"
            },
            data: {
                title: '入库通知单完成查看'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeSaveCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/storageNotice-edit.html'
                }
            }
        })
        /*--------------------------------------------------进度查询---------------------------------------------------------------*/
        
        .state('app.business.plan-schedule', {
            url: '/business/plan-schedule',
            data: {
                title: '计划进度查询'
            },
            views: {
                "content@app": {
                    controller: 'planScheduleCtrl',
                    templateUrl: 'app/business/schedule/views/plan-schedule-list.html'
                }
            }
        })
        
        .state('app.business.contract-schedule', {
            url: '/business/contract-schedule/:contractType',
            data: {
                title: '合同进度查询'
            },
            views: {
                "content@app": {
                    controller: 'contractScheduleCtrl',
                    templateUrl: 'app/business/schedule/views/contract-schedule-list.html'
                }
            }
        })
        
        .state('app.business.deliveryStorageNotice-schedule', {
            url: '/business/deliveryStorageNotice-schedule',
            data: {
                title: '出入库通知单进度查询'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeScheduleCtrl',
                    templateUrl: 'app/business/schedule/views/deliveryStorageNotice-schedule-list.html'
                }
            }
        })
        
        
        /*------------------------------------------------查询待办事项------------------------------------------------*/
        .state('app.business.handle-view', {
            url: '/business/handle-view',
            params: {
                "isNotEdit" : true,
                "type" : "todo"
            },
            data: {
                title: '查看待办事项'
            },
            views: {
                "content@app": {
                    controller: 'selectCtrl',
                    templateUrl: 'app/business/select/views/select-list.html'
                }
            }
        })
        
        .state('app.business.plan-audit-save-todo', {
            url: '/business/plan-audit-save-todo/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '计划审批'
            },
            params: {
                "isAudit" : true,
                "type" : 'todo'
            },
            views: {
                "content@app": {
                    controller: 'planAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        
        .state('app.business.plan-audit-view-todo', {
            url: '/business/plan-audit-view-todo/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '计划审批'
            },
            params: {
                "isAudit" : false,
                "type" : 'todo'
            },
            views: {
                "content@app": {
                    controller: 'planAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        
        .state('app.business.contract-audit-save-todo', {
            url: '/business/contract-audit-save-todo/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '合同审批',
            },
            params: {
                "isAudit" : true,
                "type" : 'todo'
            },
            views: {
                "content@app": {
                    controller: 'contractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-edit.html'
                }
            }
        })
        .state('app.business.contract-change-audit-save-todo', {
            url: '/business/contract-change-audit-save-todo/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '合同变更审批'
            },
            params: {
                "isAudit" : true,
                "auditType" : "change",
                "type" : "todo"
            },
            views: {
                "content@app": {
                    controller: 'contractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-change-edit.html'
                }
            }
        })
        
        .state('app.business.contract-change-audit-view-todo', {
            url: '/business/contract-change-audit-view-todo/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '合同变更审批查看'
            },
            params: {
                "isAudit" : false,
                "auditType" : "change",
                "type" : "todo"
            },
            views: {
                "content@app": {
                    controller: 'contractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-change-edit.html'
                }
            }
        })
        
        .state('app.business.deliveryNotice-audit-edit-todo', {
            url: '/business/deliveryNotice-audit-edit-todo/:id/:processInstanceId/:taskId/:auditId',
            params: {
                "noticeType" : "delivery",
                "isAudit" : true,
                "type" : "todo"
            },
            data: {
                title: '出库通知单审批编辑'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeAuditSaveCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/deliveryNotice-edit.html'
                }
            }
        })
        
        
        .state('app.business.storageNotice-audit-edit-todo', {
            url: '/business/storageNotice-audit-edit-todo/:id/:processInstanceId/:taskId/:auditId',
            params: {
                "noticeType" : "storage",
                "isAudit" : true,
                "type" : "todo"
            },
            data: {
                title: '入库通知单审批编辑'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeAuditSaveCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/storageNotice-edit.html'
                }
            }
        })
        
        .state('app.business.deliveryNotice-audit-view-todo', {
            url: '/business/deliveryNotice-audit-view-todo/:id/:processInstanceId/:taskId/:auditId',
            params: {
                "noticeType" : "delivery",
                "isAudit" : false,
                "type" : "todo"
            },
            data: {
                title: '出库通知单审批查看'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeAuditSaveCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/deliveryNotice-edit.html'
                }
            }
        })
        
        
        .state('app.business.storageNotice-audit-view-todo', {
            url: '/business/storageNotice-audit-view-todo/:id/:processInstanceId/:taskId/:auditId',
            params: {
                "noticeType" : "storage",
                "isAudit" : false,
                "type" : "todo"
            },
            data: {
                title: '入库通知单审批查看'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeAuditSaveCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/storageNotice-edit.html'
                }
            }
        })
        

        
        
        /******************************查询已办事项************************************/
        .state('app.business.handles-view', {
            url: '/business/handles-view',
            params: {
                "isNotEdit" : true,
                "type" : "complete"
            },
            data: {
                title: '查看待办事项'
            },
            views: {
                "content@app": {
                    controller: 'selectCtrl',
                    templateUrl: 'app/business/select/views/select-list.html'
                }
            }
        })
        
        
        
        .state('app.business.plan-audit-save-complete', {
            url: '/business/plan-audit-save-complete/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '计划审批'
            },
            params: {
                "isAudit" : true,
                "type" : 'complete'
            },
            views: {
                "content@app": {
                    controller: 'planAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        
        .state('app.business.plan-audit-view-complete', {
            url: '/business/plan-audit-view-complete/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '计划审批'
            },
            params: {
                "isAudit" : false,
                "type" : 'complete'
            },
            views: {
                "content@app": {
                    controller: 'planAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        .state('app.business.contract-audit-save-complete', {
            url: '/business/contract-audit-save-complete/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '合同审批',
            },
            params: {
                "isAudit" : true,
                "type": "complete"
            },
            views: {
                "content@app": {
                    controller: 'contractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-edit.html'
                }
            }
        })
        
        .state('app.business.contract-audit-view-complete', {
            url: '/business/contract-audit-view-complete/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '合同审批'
            },
            params: {
                "isAudit" : false,
                "type": "complete"
            },
            views: {
                "content@app": {
                    controller: 'contractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-edit.html'
                }
            }
        })
        
        .state('app.business.contract-change-audit-save-complete', {
            url: '/business/contract-change-audit-save-complete/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '合同变更审批'
            },
            params: {
                "isAudit" : true,
                "auditType" : "change",
                "type": "complete"
            },
            views: {
                "content@app": {
                    controller: 'contractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-change-edit.html'
                }
            }
        })
        .state('app.business.contract-change-audit-view-complete', {
            url: '/business/contract-change-audit-view-complete/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '合同变更审批查看'
            },
            params: {
                "isAudit" : false,
                "auditType" : "change",
                "type" : "complete"
            },
            views: {
                "content@app": {
                    controller: 'contractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-change-edit.html'
                }
            }
        })

        .state('app.business.deliveryNotice-audit-edit-complete', {
            url: '/business/deliveryNotice-audit-edit-complete/:id/:processInstanceId/:taskId/:auditId',
            params: {
                "noticeType" : "delivery",
                "isAudit" : true,
                "type" : "complete"
            },
            data: {
                title: '出库通知单审批编辑'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeAuditSaveCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/deliveryNotice-edit.html'
                }
            }
        })
        
        
        .state('app.business.storageNotice-audit-edit-complete', {
            url: '/business/storageNotice-audit-edit-complete/:id/:processInstanceId/:taskId/:auditId',
            params: {
                "noticeType" : "storage",
                "isAudit" : true,
                "type" : "complete"
            },
            data: {
                title: '入库通知单审批编辑'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeAuditSaveCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/storageNotice-edit.html'
                }
            }
        })
        
        .state('app.business.deliveryNotice-audit-view-complete', {
            url: '/business/deliveryNotice-audit-view-complete/:id/:processInstanceId/:taskId/:auditId',
            params: {
                "noticeType" : "delivery",
                "isAudit" : false,
                "type" : "complete"
            },
            data: {
                title: '出库通知单审批查看'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeAuditSaveCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/deliveryNotice-edit.html'
                }
            }
        })
        
        
        .state('app.business.storageNotice-audit-view-complete', {
            url: '/business/storageNotice-audit-view-complete/:id/:processInstanceId/:taskId/:auditId',
            params: {
                "noticeType" : "storage",
                "isAudit" : false,
                "type" : "complete"
            },
            data: {
                title: '入库通知单审批查看'
            },
            views: {
                "content@app": {
                    controller: 'deliveryStorageNoticeAuditSaveCtrl',
                    templateUrl: 'app/business/deliveryStorageNotice/views/storageNotice-edit.html'
                }
            }
        })
        
        /**********************熏蒸审批*****************************/
        .state('app.business.fumigation-audit-save-todo', {
            url: '/business/fumigation-audit-save-todo/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '熏蒸作业方案审批'
            },
            params: {
                "isAudit" : true,
                "type" : "todo"
            },
            views: {
                "content@app": {
                    controller: 'fumigationAuditSaveCtrl as datatables',
                    templateUrl: 'app/storage/fumigation/fumigationProgram/views/fumigation-edit.html'
                }
            }
        })
        .state('app.business.fumigation-audit-save-complete', {
            url: '/business/fumigation-audit-save-complete/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '熏蒸作业方案审批'
            },
            params: {
                "isAudit" : false,
                "type" : "complete"
            },
            views: {
                "content@app": {
                    controller: 'fumigationAuditSaveCtrl as datatables',
                    templateUrl: 'app/storage/fumigation/fumigationProgram/views/fumigation-edit.html'
                }
            }
        })
        
        // 通风申请编辑页面
        .state('app.business.aerationTask-audit-save-todo', {
            url: '/business/aerationTask-audit-save-todo/:id/:butId/:pageType/:processInstanceId/:taskId/:auditId/:result',
            data: {
                title: '通风作业方案审批'
            },
            params: {
                "isAudit" : false,
            	"fromModule" : "app.business.handle-view"
            },
            views: {
                "content@app": {
                    controller: 'aerationTaskEdit',
                    templateUrl: 'app/storage/views/aerationTask/aerationTaskApply-edit.html'
                }
            }
        })
        
                // 通风申请编辑页面
        .state('app.business.aerationTask-audit-view-complete', {
            url: '/business/aerationTask-audit-view-complete/:id/:butId/:pageType/:processInstanceId/:taskId/:auditId',
            data: {
                title: '通风作业方案审批查看'
            },
            params: {
                "isAudit" : false,
            	"fromModule" : "app.business.handles-view"
            },
            views: {
                "content@app": {
                    controller: 'aerationTaskEdit',
                    templateUrl: 'app/storage/views/aerationTask/aerationTaskApply-edit.html'
                }
            }
        })
        
        // 通风申请编辑页面
		.state('app.business.index', {
		    url: '/business/index',
		    data: {
		        title: '业务介绍'
		    },
		    views: {
		        "content@app": {
		            templateUrl: 'app/business/index/views/business-index.html'
		        }
		    }
		})


        /*---------------------------------------------------代储点管理---------------------------------------------*/

        .state('app.business.agent', {
            abstract: true,
            data: {
                title: '代储点管理'
            }
        })
        .state('app.business.agent.basic', {
            abstract: true,
            data: {
                title: '基本信息'
            }
        })

        /*--------------------------------------代储点信息管理---------------------------------*/
        .state('app.business.agent.basic.agentList', {
            url: '/business/agent/basic/agentList',
            data: {
                title: '代储点信息管理'
            },
            views: {
                "content@app": {
                    controller: 'agentCtrl',
                    templateUrl: 'app/business/agent/basic/views/agent-list.html'
                }
            }
        })

        .state('app.business.agent.basic.agentEdit', {
            url: '/business/agent/basic/agentEdit/:id/:type',
            data: {
                title: '代储点信息详情'
            },
            views: {
                "content@app": {
                    controller: 'agentSaveCtrl',
                    templateUrl: 'app/business/agent/basic/views/agent-edit.html'
                }
            }
        })

        /*--------------------------------------代储粮库信息---------------------------------*/
        .state('app.business.agent.basic.agentDepotList', {
            url: '/business/agent/basic/agentDepotList',
            data: {
                title: '代储点粮库信息'
            },
            views: {
                "content@app": {
                    controller: 'agentDepotCtrl',
                    templateUrl: 'app/business/agent/basic/views/agentDepot-list.html'
                }
            }
        })

        .state('app.business.agent.basic.agentDepotEdit', {
            url: '/business/agent/basic/agentDepotEdit/:id/:type',
            data: {
                title: '代储点粮库详情'
            },
            views: {
                "content@app": {
                    controller: 'agentSaveDepotCtrl',
                    templateUrl: 'app/business/agent/basic/views/agentDepot-edit.html'
                }
            }
        })

        /*--------------------------------------代储粮库仓房信息---------------------------------*/
        //仓房管理list页
        .state('app.business.agent.basic.storehouseList', {
            url: '/business/agent/basic/storehouseList/:type/:libraryType',
            data: {
                title: '代储点仓房管理'
            },
            views: {
                "content@app": {
                    controller: 'StorehouseCtrl',
                    templateUrl: 'app/business/agent/basic/views/agentStorehouse-list.html'
                }
            }
        })
        //点修改调用
        .state('app.business.agent.basic.storehouseEditReq', {
            url: '/business/agent/basic/storehouseEditReq/:id/:btnType/:orgId/:libraryType',
            data: {
                title: '更新代储点仓房'
            },
            views: {
                "content@app": {
                    controller: 'StorehouseCtrlEdit',
                    templateUrl: 'app/basic/storehouse/views/Storehouse-edit.html'
                }
            }
        })
        //初始化货位/廒间信息调用
        .state('app.business.agent.basic.warehouseList', {
            url: '/business/agent/basic/warehouseList/:libraryType',
            data: {
                title: '代储点货位管理'
            },
            views: {
                "content@app": {
                    controller: 'warehouseCtrl',
                    templateUrl: 'app/basic/warehouse/views/warehouseAgent-list.html'
                }
            }
        })
        //初始化货位信息调用
        .state('app.business.agent.basic.warehouseEdit', {
            url: '/business/agent/basic/warehouseEdit/:id/:btnType/:libraryType',
            data: {
                title: '更新代储点货位信息'
            },
            views: {
                "content@app": {
                    controller: 'warehouseCtrlEdit',
                    templateUrl: 'app/basic/warehouse/views/warehouse-edit.html'
                }
            }
        })

        /*--------------------------------------油罐信息---------------------------------*/
        .state('app.business.agent.basic.agentTankList', {
            url: '/business/agent/basic/agentTankList',
            data: {
                title: '油罐信息'
            },
            views: {
                "content@app": {
                    controller: 'agentTankCtrl',
                    templateUrl: 'app/business/agent/basic/views/agentTank-list.html'
                }
            }
        })

        .state('app.business.agent.basic.agentTankEdit', {
            url: '/business/agent/basic/agentTankEdit/:id/:type',
            data: {
                title: '油罐详情'
            },
            views: {
                "content@app": {
                    controller: 'agentTankSaveCtrl',
                    templateUrl: 'app/business/agent/basic/views/agentTank-edit.html'
                }
            }
        })

        /*--------------------------------------人员信息---------------------------------*/
        .state('app.business.agent.basic.agentPeopleList', {
            url: '/business/agent/basic/agentPeopleList',
            data: {
                title: '人员信息'
            },
            views: {
                "content@app": {
                    controller: 'agentPeopleCtrl',
                    templateUrl: 'app/business/agent/basic/views/agentPeople-list.html'
                }
            }
        })

        .state('app.business.agent.basic.agentPeopleEdit', {
            url: '/business/agent/basic/agentPeopleEdit/:id/:type',
            data: {
                title: '人员详情'
            },
            views: {
                "content@app": {
                    controller: 'agentPeopleSaveCtrl',
                    templateUrl: 'app/business/agent/basic/views/agentPeople-edit.html'
                }
            }
        })

        /*--------------------------------------储粮信息---------------------------------*/
        .state('app.business.agent.grainStorage', {
            abstract: true,
            data: {
                title: '储粮信息'
            }
        })
        /*--------------------------------------出入库记录---------------------------------*/
        .state('app.business.agent.grainStorage.crk', {
            abstract: true,
            data: {
                title: '出入库记录'
            }
        })
        /*--------------------------------------火车出入库---------------------------------*/
        .state('app.business.agent.grainStorage.crk.trainList', {
            url: '/business/agent/grainStorage/crk/trainList',
            data: {
                title: '火车出入库'
            },
            views: {
                "content@app": {
                    controller: 'agentHcCtrl',
                    templateUrl: 'app/business/agent/grainStorage/views/hc-list.html'
                }
            }
        })

        .state('app.business.agent.grainStorage.crk.trainEdit', {
            url: '/business/agent/grainStorage/crk/trainEdit/:id/:type',
            data: {
                title: '火车出入库详情'
            },
            views: {
                "content@app": {
                    controller: 'agentHcSaveCtrl',
                    templateUrl: 'app/business/agent/grainStorage/views/hc-edit.html'
                }
            }
        })
        /*--------------------------------------汽车出入库---------------------------------*/
        .state('app.business.agent.grainStorage.crk.carList', {
            url: '/business/agent/grainStorage/crk/carList',
            data: {
                title: '汽车出入库'
            },
            views: {
                "content@app": {
                    controller: 'agentQcCtrl',
                    templateUrl: 'app/business/agent/grainStorage/views/qc-list.html'
                }
            }
        })

        .state('app.business.agent.grainStorage.crk.carEdit', {
            url: '/business/agent/grainStorage/crk/carEdit/:id/:type',
            data: {
                title: '汽车出入库详情'
            },
            views: {
                "content@app": {
                    controller: 'agentQcSaveCtrl',
                    templateUrl: 'app/business/agent/grainStorage/views/qc-edit.html'
                }
            }
        })
        /*--------------------------------------库存数量管理---------------------------------*/
        .state('app.business.agent.grainStorage.numberList', {
            url: '/business/agent/grainStorage/numberList',
            data: {
                title: '库存数量'
            },
            views: {
                "content@app": {
                    controller: 'agentNumberCtrl',
                    templateUrl: 'app/business/agent/grainStorage/views/number-list.html'
                }
            }
        })

        .state('app.business.agent.grainStorage.numberEdit', {
            url: '/business/agent/grainStorage/numberEdit/:id/:type',
            data: {
                title: '库存数量详情'
            },
            views: {
                "content@app": {
                    controller: 'agentNumberSaveCtrl',
                    templateUrl: 'app/business/agent/grainStorage/views/number-edit.html'
                }
            }
        })

        //--------------------------------------质量管理-------------------------------------------
        .state('app.business.agent.grainStorage.quality', {
            abstract: true,
            data: {
                title: '质量管理'
            }
        })
        .state('app.business.agent.grainStorage.quality.fck', {
            abstract: true,
            data: {
                title: '初检质量管理'
            }
        })
        .state('app.business.agent.grainStorage.quality.ack', {
            abstract: true,
            data: {
                title: '验收质量管理'
            }
        })
        .state('app.business.agent.grainStorage.quality.spr', {
            abstract: true,
            data: {
                title: '春秋普查'
            }
        })
        .state('app.business.agent.grainStorage.quality.out', {
            abstract: true,
            data: {
                title: '出库质量管理'
            }
        })
        //----------------粮食初检信息开始---------------//
        .state('app.business.agent.grainStorage.quality.fck.fcklist', {
            url: '/business/agent/grainStorage/qualitycheck/fck/fcklist/:type',
            data: {
                title: '粮食初检信息列表'
            },
            views: {
                "content@app": {
                    controller: 'agentQualityCtrl',
                    templateUrl: 'app/business/agent/grainStorage/views/quality/quality-firstcheck-list.html'
                }
            }
        })
        .state('app.business.agent.grainStorage.quality.fck.fckadd', {
            url: '/business/agent/grainStorage/fckadd/:id/:isNotEdit',
            data: {
                title: '粮食初检新增'
            },
            views: {
                "content@app": {
                    controller: 'agentQualitySaveCtrl as datatables',
                    templateUrl: 'app/business/agent/grainStorage/views/quality/quality-firstcheck-edit.html'
                }
            }
        })
        .state('app.business.agent.grainStorage.quality.fck.fckedit', {
            url: '/business/agent/grainStorage/fckedit/:id/:isNotEdit',
            data: {
                title: '粮食初检修改'
            },
            views: {
                "content@app": {
                    controller: 'agentQualitySaveCtrl as datatables',
                    templateUrl: 'app/business/agent/grainStorage/views/quality/quality-firstcheck-edit.html'
                }
            }
        })

        //----------------粮食初检信息结束---------------//

        //----------------粮食验收信息开始---------------//
        .state('app.business.agent.grainStorage.quality.ack.acklist', {
            url: '/business/agent/grainStorage/acklist/:type',
            data: {
                title: '粮食验收信息列表'
            },
            views: {
                "content@app": {
                    controller: 'agentQualityCtrl',
                    templateUrl: 'app/business/agent/grainStorage/views/quality/quality-acceptcheck-list.html'
                }
            }
        })
        .state('app.business.agent.grainStorage.quality.ack.ackadd', {
            url: '/business/agent/grainStorage/ackadd/:id/:houseId/:warehouseId/:isNotEdit',
            data: {
                title: '粮食验收新增'
            },
            views: {
                "content@app": {
                    controller: 'agentQualitySaveCtrl as datatables',
                    templateUrl: 'app/business/agent/grainStorage/views/quality/quality-acceptcheck-edit.html'
                }
            }
        })
        .state('app.business.agent.grainStorage.quality.ack.ackedit', {
            url: '/business/agent/grainStorage/ackedit/:id/:isNotEdit',
            data: {
                title: '粮食验收修改'
            },
            views: {
                "content@app": {
                    controller: 'agentQualitySaveCtrl as datatables',
                    templateUrl: 'app/business/agent/grainStorage/views/quality/quality-acceptcheck-edit.html'
                }
            }
        })
        //----------------粮食验收信息结束---------------//

        //----------------春秋普查信息开始---------------//
        .state('app.business.agent.grainStorage.quality.spr.sprlist', {
            url: '/business/agent/grainStorage/sprlist/:type/:checkResult',
            data: {
                title: '春秋普查信息列表'
            },
            views: {
                "content@app": {
                    controller: 'agentQualityCtrl',
                    templateUrl: 'app/business/agent/grainStorage/views/quality/quality-springcheck-list.html'
                }
            }
        })
        .state('app.business.agent.grainStorage.quality.spr.spradd', {
            url: '/business/agent/grainStorage/spradd/:id/:isNotEdit',
            data: {
                title: '春秋普查新增'
            },
            views: {
                "content@app": {
                    controller: 'agentQualitySaveCtrl as datatables',
                    templateUrl: 'app/business/agent/grainStorage/views/quality/quality-springcheck-edit.html'
                }
            }
        })
        .state('app.business.agent.grainStorage.quality.spr.spredit', {
            url: '/business/agent/grainStorage/spredit/:id/:isNotEdit',
            data: {
                title: '春秋普查修改'
            },
            views: {
                "content@app": {
                    controller: 'agentQualitySaveCtrl as datatables',
                    templateUrl: 'app/business/agent/grainStorage/views/quality/quality-springcheck-edit.html'
                }
            }
        })

        //----------------春秋普查信息结束---------------//

        //----------------日常检验开始---------------//
        .state('app.business.agent.grainStorage.quality.daklist', {
            url: '/business/agent/grainStorage/daklist/:type',
            data: {
                title: '日常检查信息列表'
            },
            views: {
                "content@app": {
                    controller: 'agentQualityCtrl',
                    templateUrl: 'app/business/agent/grainStorage/views/quality/quality-dakcheck-list.html'
                }
            }
        })
        .state('app.business.agent.grainStorage.quality.dakedit', {
            url: '/business/agent/grainStorage/dakedit/:id/:isNotEdit',
            data: {
                title: '日常检查修改'
            },
            views: {
                "content@app": {
                    controller: 'agentQualitySaveCtrl as datatables',
                    templateUrl: 'app/business/agent/grainStorage/views/quality/quality-dakcheck-edit.html'
                }
            }
        })
        .state('app.business.agent.grainStorage.quality.dakadd', {
            url: '/business/agent/grainStorage/dakadd/:id/:isNotEdit',
            data: {
                title: '日常检查新增'
            },
            views: {
                "content@app": {
                    controller: 'agentQualitySaveCtrl as datatables',
                    templateUrl: 'app/business/agent/grainStorage/views/quality/quality-dakcheck-edit.html'
                }
            }
        })
        //----------------日常检验结束---------------//
        //----------------第三方检查开始---------------//
        .state('app.business.agent.grainStorage.quality.trklist', {
            url: '/business/agent/grainStorage/trklist/:type/:checkResult',
            data: {
                title: '第三方检查信息列表'
            },
            views: {
                "content@app": {
                    controller: 'agentQualityCtrl',
                    templateUrl: 'app/business/agent/grainStorage/views/quality/quality-trkcheck-list.html'
                }
            }
        })
        .state('app.business.agent.grainStorage.quality.trkedit', {
            url: '/business/agent/grainStorage/trkedit/:id/:isNotEdit',
            data: {
                title: '第三方检查修改'
            },
            views: {
                "content@app": {
                    controller: 'agentQualitySaveCtrl as datatables',
                    templateUrl: 'app/business/agent/grainStorage/views/quality/quality-trkcheck-edit.html'
                }
            }
        })
        .state('app.business.agent.grainStorage.quality.trkadd', {
            url: '/business/agent/grainStorage/trkadd/:id/:isNotEdit',
            data: {
                title: '第三方检查新增'
            },
            views: {
                "content@app": {
                    controller: 'agentQualitySaveCtrl as datatables',
                    templateUrl: 'app/business/agent/grainStorage/views/quality/quality-trkcheck-edit.html'
                }
            }
        })

        //----------------第三方检查结束---------------//

        //----------------粮食出库信息开始---------------//
        .state('app.business.agent.grainStorage.quality.out.outlist', {
            url: '/business/agent/grainStorage/out/outlist/:type',
            data: {
                title: '出库质量信息列表'
            },
            views: {
                "content@app": {
                    controller: 'agentQualityCtrl',
                    templateUrl: 'app/business/agent/grainStorage/views/quality/quality-outcheck-list.html'
                }
            }
        })
        .state('app.business.agent.grainStorage.quality.out.outadd', {
            url: '/business/agent/grainStorage/out/outadd/:id/:isNotEdit',
            data: {
                title: '出库质量新增'
            },
            views: {
                "content@app": {
                    controller: 'agentQualitySaveCtrl as datatables',
                    templateUrl: 'app/business/agent/grainStorage/views/quality/quality-outcheck-edit.html'
                }
            }
        })
        .state('app.business.agent.grainStorage.quality.out.outedit', {
            url: '/business/agent/grainStorage/out/outedit/:id/:isNotEdit',
            data: {
                title: '出库质量修改'
            },
            views: {
                "content@app": {
                    controller: 'agentQualitySaveCtrl as datatables',
                    templateUrl: 'app/business/agent/grainStorage/views/quality/quality-outcheck-edit.html'
                }
            }
        })
        
        /***********************************保管账 start********************************/
        .state('app.business.agent.grainStorage.bgz', {
            abstract: true,
            data: {
                title: '保管账'
            }
        })
        .state('app.business.agent.grainStorage.bgz.bgmxz', {
            url: '/agent/grainStorage/bgz/bgmxz/getList',
            data: {
                title: '保管明细账'
            },
            views: {
                "content@app": {
                    controller: 'agentBgmxzCtrl',
                    templateUrl: 'app/business/agent/bgz/bgmxz/views/agent-bgmxz-list.html'
                }
            }
        })
        .state('app.business.agent.grainStorage.bgz.bgmxz.edit', {
            url: '/agent/grainStorage/bgz/bgmxz/getEdit/:id/:type',
            data: {
                title: '保管明细账详情'
            },
            views: {
                "content@app": {
                    controller: 'agentBgmxzEditCtrl',
                    templateUrl: 'app/business/agent/bgz/bgmxz/views/agent-bgmxz-edit.html'
                }
            }
        })
        .state('app.business.agent.grainStorage.bgz.fcbgz', {
            url: '/agent/grainStorage/bgz/fcbgz/getList',
            data: {
                title: '分仓保管账'
            },
            views: {
                "content@app": {
                    controller: 'agentFcbgzCtrl',
                    templateUrl: 'app/business/agent/bgz/fcbgz/views/agent-fcbgz-list.html'
                }
            }
        })
        .state('app.business.agent.grainStorage.bgz.fcbgz.edit', {
            url: '/agent/grainStorage/bgz/fcbgz/getEdit/:obj/:type',
            data: {
                title: '分仓保管账详情'
            },
            views: {
                "content@app": {
                    controller: 'agentFcbgzEditCtrl',
                    templateUrl: 'app/business/agent/bgz/fcbgz/views/agent-fcbgz-edit.html'
                }
            }
        })
        .state('app.business.agent.grainStorage.bgz.bgzz', {
            url: '/agent/grainStorage/bgz/bgzz/getList',
            data: {
                title: '保管总账'
            },
            views: {
                "content@app": {
                    controller: 'agentBgzzCtrl',
                    templateUrl: 'app/business/agent/bgz/bgzz/views/agent-bgzz-list.html'
                }
            }
        })
        .state('app.business.agent.grainStorage.bgz.bgzz.edit', {
            url: '/agent/grainStorage/bgz/bgzz/getEdit/:obj/:type',
            data: {
                title: '保管总账详情'
            },
            views: {
                "content@app": {
                    controller: 'agentBgzzEditCtrl',
                    templateUrl: 'app/business/agent/bgz/bgzz/views/agent-bgzz-edit.html'
                }
            }
        })
        /***********************************保管账 end********************************/

        /*--------------------------------------粮情信息---------------------------------*/
        .state('app.business.agent.temperature', {
            abstract: true,
            data: {
                title: '粮情信息'
            }
        })
        .state('app.business.agent.temperature.dataList', {
            url: '/business/agent/temperature/dataList',
            data: {
                title: '粮情数据列表'
            },
            views: {
                "content@app": {
                    controller: 'agentTemperatureCtrl',
                    templateUrl: 'app/business/agent/temperature/views/agentTemperature-list.html'
                }
            }
        })
        .state('app.business.agent.temperature.dataEdit', {
            url: '/business/agent/temperature/dataEdit/:id',
            data: {
                title: '粮情数据详情'
            },
            views: {
                "content@app": {
                    controller: 'agentTemperatureSaveCtrl',
                    templateUrl: 'app/business/agent/temperature/views/agentTemperature-edit.html'
                }
            }
        })

        /*--------------------------------------视频监控---------------------------------*/
        .state('app.business.agent.monitor', {
            abstract: true,
            data: {
                title: '视频监控'
            }
        })
        .state('app.business.agent.monitor.play', {
            url: '/business/agent/monitorPlay/:orgId',
            data: {
                title: '视频实时画面'
            },
            views: {
                "content@app": {
                    controller: 'cameraAgentPlayCtrl as datatables',
                    templateUrl: 'app/business/agent/monitor/views/camera-play.html'
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
        .state('app.business.agent.monitor.record', {
            url: '/business/agent/monitorRecord/:orgId',
            data: {
                title: '视频回放画面'
            },
            views: {
                "content@app": {
                    controller: 'cameraAgentRecordCtrl',
                    templateUrl: 'app/business/agent/monitor/views/camera-record.html'
                }
            }
        })
        
		/*--------------------------------------生产装备汇总统计分析---------------------------------*/
		.state('app.business.productionEquipment', {
                url: '/business/productionEquipment',
                data: {
    		        title: '生产装备汇总统计'
    		    },
    		    views: {
    		        "content@app": {
    		        	controller: 'productionEquipmentCtrl',
    		            templateUrl: 'app/business/productionEquipment/views/productionEquipment.html'
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
      //-----------------------------------------------------智能器材库------------------------------------------------------//
        .state('app.business.device', {
            abstract: true,
            data: {
                title: '智能器材库'
            }
        })
        //----------------设备入库登记开始---------------//
        .state('app.business.deviceInputList', {
            url: '/deviceInputList',
            data: {
                title: '设备入库列表'
            },
            views: {
                "content@app": {
                    controller: 'deviceInputCtrl',
                    templateUrl: 'app/business/device/views/deviceInput-list.html'
                }
            }
        })  
        .state('app.business.deviceInputAdd', {
        	url: '/deviceInputAdd/:id/:isNotEdit',
        	data: {
        		title: '设备入库'
        	},
        	views: {
        		"content@app": {
        			controller: 'deviceInputCheckCtrl',
        			templateUrl: 'app/business/device/views/deviceInput-edit.html'
        		}
        	}
        })  
        .state('app.business.inputEdit', {
        	url: '/inputEdit/:id/:isNotEdit',
        	data: {
        		title: '设备查看'
        	},
        	views: {
        		"content@app": {
        			controller: 'deviceInputCheckCtrl',
        			templateUrl: 'app/business/device/views/deviceInput-edit.html'
        		}
        	}
        })  
        //----------------设备入库登记结束---------------//
        
        //----------------器材领用开始---------------//
        .state('app.business.deviceGetList', {
        	url: '/deviceGetList',
        	data: {
        		title: '机械器材领用'
        	},
        	views: {
        		"content@app": {
        			controller: 'deviceGetCtrl',
        			templateUrl: 'app/business/device/views/deviceGet-list.html'
        		}
        	}
        })  
        .state('app.business.deviceGetAdd', {
        	url: '/deviceGetAdd',
        	data: {
        		title: '领用信息'
        	},
        	views: {
        		"content@app": {
        			controller: 'deviceGetCtrl',
        			templateUrl: 'app/business/device/views/deviceGet-add.html'
        		}
        	}
        })  
        .state('app.business.deviceGetBack', {
        	url: '/deviceGetBack/:id/:getCount',
        	data: {
        		title: '归还信息'
        	},
        	views: {
        		"content@app": {
        			controller: 'deviceGetBackCtrl',
        			templateUrl: 'app/business/device/views/deviceGet-back.html'
        		}
        	}
        })  
        .state('app.business.deviceChack', {
        	url: '/deviceChack/:id',
        	data: {
        		title: '信息详情'
        	},
        	views: {
        		"content@app": {
        			controller: 'deviceGetBackCtrl',
        			templateUrl: 'app/business/device/views/deviceGet-detail.html'
        		}
        	}
        })  
        //----------------器材领用结束---------------//
        
        //----------------器材保养开始---------------//
        .state('app.business.deviceKeepList', {
        	url: '/deviceKeepList',
        	data: {
        		title: '器材保养'
        	},
        	views: {
        		"content@app": {
        			controller: 'deviceKeepCtrl',
        			templateUrl: 'app/business/device/views/deviceKeep-list.html'
        		}
        	}
        })  
        .state('app.business.deviceKeepAdd', {
        	url: '/deviceKeepAdd',
        	data: {
        		title: '添加保养信息'
        	},
        	views: {
        		"content@app": {
        			controller: 'deviceKeepAddCtrl',
        			templateUrl: 'app/business/device/views/deviceKeep-add.html'
        		}
        	}
        }) 
        .state('app.business.deviceKeepMassage', {
        	url: '/deviceKeepMassage/:id',
        	data: {
        		title: '保养信息明细'
        	},
        	views: {   
        		"content@app": {
        			controller: 'deviceKeepSelCtrl',
        			templateUrl: 'app/business/device/views/deviceKeep-olist.html'
        		}
        	}
        }) 
         //----------------器材保养结束---------------//
        
         //----------------器材维修开始---------------//
        .state('app.business.deviceRepairList', {
        	url: '/deviceRepairList',
        	data: {
        		title: '器材维修'
        	},
        	views: {
        		"content@app": {
        			controller: 'deviceRepairCtrl',
        			templateUrl: 'app/business/device/views/deviceRepair-list.html'
        		}
        	}
        })  
        .state('app.business.devicerepairAdd', {
        	url: '/devicerepairAdd',
        	data: {
        		title: '添加维修信息'
        	},
        	views: {
        		"content@app": {
        			controller: 'deviceRepairAddCtrl',
        			templateUrl: 'app/business/device/views/deviceRepair-add.html'
        		}
        	}
        })  
        .state('app.business.deviceRepairMassage', {
        	url: '/deviceRepairMassage/:id/:isNotEdit',
        	data: {
        		title: '维修信息明细'
        	},
        	views: {   
        		"content@app": {
        			controller: 'deviceRepairSaveCtrl',
        			templateUrl: 'app/business/device/views/deviceRepair-olist.html'
        		}
        	}
        }) 
        
        //----------------器材维修结束---------------//
        
        
        //----------------设备报废开始---------------//
        .state('app.business.deviceOutList', {
        	url: '/deviceOutList',
        	data: {
        		title: '设备报废'
        	},
        	views: {
        		"content@app": {
        			controller: 'deviceOutCtrl',
        			templateUrl: 'app/business/device/views/deviceOut-list.html'
        		}
        	}
        })  
         //----------------设备报废结束---------------//
        //----------------台账开始---------------//
        .state('app.business.deviceAccountList', {
        	url: '/deviceAccountList',
        	data: {
        		title: '台账'
        	},
        	views: {
        		"content@app": {
        			controller: 'deviceAccountCtrl',
        			templateUrl: 'app/business/device/views/deviceAccount-list.html'
        		}
        	}
        })
        
        .state('app.business.accountEdit', {
        	url: '/accountEdit/:id/:isNotEdit',
        	data: {
        		title: '设备台账'
        	},
        	views: {
        		"content@app": {
        			controller: 'deviceInputCheckCtrl',
        			templateUrl: 'app/business/device/views/deviceAccount-edit.html'
        		}
        	}
        }) 
         //----------------台账结束---------------//
        .state('app.business.deviceCheckList', {
        	url: '/deviceCheckList',
        	data: {
        		title: '盘点单'
        	},
        	views: {
        		"content@app": {
        			controller: 'deviceCheckCtrl',
        			templateUrl: 'app/business/device/views/deviceCheck-list.html'
        		}
        	}
        })
        .state('app.business.checkAdd', {
        	url: '/checkAdd',
        	data: {
        		title: '新建盘点单'
        	},
        	views: {
        		"content@app": {
        			controller: 'deviceCheckAddCtrl',
        			templateUrl: 'app/business/device/views/deviceAdd.html'
        		}
        	}
        })
        .state('app.business.checkEdit', {
        	url: '/checkEdit/:depotId/:pddh/:isNotEdit',
        	data: {
        		title: '新建盘点单'
        	},
        	views: {
        		"content@app": {
        			controller: 'deviceCheckEditCtrl',
        			templateUrl: 'app/business/device/views/deviceEdit.html'
        		}
        	}
        })
  //---------------------------------储备粮计划------------------------------------------------------
        
        .state('app.business.grainReservesPlan', {
            url: '/business/grainReservesPlan',
            data: {
                title: '储备粮计划'
            }
        })
     //-----------------------------轮换计划---------------------------
        .state('app.business.grainReservesPlan-rotation', {
            url: '/business/grainReservesPlan-rotation',
            data: {
                title: '年度轮换计划'
            }
            
        })
        
        .state('app.business.grainReservesPlan-rotation-apply', {
        	url: '/business/grainReservesPlan-rotation-apply',
        	 params: {
                 "attributeType" : "1"
             },
        	data: {
        		title: '计划申请'
        	},
        	views: {
        		"content@app": {
        			controller: 'planCtrl',
        			templateUrl: 'app/business/plan/views/plan-rotation-list.html'
        		}
        	}
        })
        
        .state('app.business.grainReservesPlan-rotation-view', {
            url: '/business/grainReservesPlan-rotation-view/:id/:processInstanceId',
            data: {
                title: '计划查看'
            },
            params:{
                    isNotEdit : true
                },
            views: {
                "content@app": {
                    controller: 'planSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        
         .state('app.business.grainReservesPlan-rotation-apply-edit', {
                url: '/business/grainReservesPlan-rotation-apply-edit/:id/:attributeType',
                data: {
                    title: '计划编辑'
                },
                params:{
                    isNotEdit : false
                },
                views: {
                    "content@app": {
                        controller: 'planSaveCtrl as datatables',
                        templateUrl: 'app/business/plan/views/plan-edit.html'
                    }
                }
            }
        )
        
        .state('app.business.grainReservesPlan-rotation-audit', {
            url: '/business/grainReservesPlan-rotation-audit',
            params: {
                "type" : "plan",
                "attributeType" : "1"
            },
            data: {
                title: '计划审批'
            },
            views: {
                "content@app": {
                    controller: 'planAuditCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-audit-rotation-list.html'
                }
            }
        })
        
        .state('app.business.grainReservesPlan-rotation-audit-save', {
            url: '/business/grainReservesPlan-rotation-audit-save/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '计划审批编辑'
            },
            params: {
                "isAudit" : true
            },
            views: {
                "content@app": {
                    controller: 'planAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        
        
        .state('app.business.grainReservesPlan-rotation-audit-view', {
            url: '/business/grainReservesPlan-rotation-audit-view/:id/:processInstanceId/:taskId/:auditId/:attributeType',
            data: {
                title: '计划审批查看'
            },
            params: {
                "isAudit" : false
            },
            views: {
                "content@app": {
                    controller: 'planAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        .state('app.business.grainReservesPlan-rotation-pass', {
            url: '/business/grainReservesPlan-rotation-pass',
            params: {
                "attributeType" : "1"
            },
            data: {
                title: '已审批计划'
            },
            views: {
                "content@app": {
                    controller: 'planAuditPassCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-audit-rotation-pass-list.html'
                }
            }
        })
        
        
        .state('app.business.grainReservesPlan-rotation-pass-view', {
            url: '/business/grainReservesPlan-rotation-pass-view/:id/:processInstanceId',
            data: {
                title: '已审批计划查看'
            },
            params:{
                isNotEdit : true
            },
            views: {
                "content@app": {
                    controller: 'planAuditPassSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })

        
//---------------------------------销售计划------------------------------------------
        .state('app.business.grainReservesPlan-sales', {
            url: '/business/grainReservesPlan-sales',
            data: {
                title: '销售计划'
            }
            
        })
        
        .state('app.business.grainReservesPlan-sales-apply', {
        	url: '/business/grainReservesPlan-sales-apply',
        	 params: {
        		 "attributeType" : "2"
             },
        	data: {
        		title: '计划申请'
        	},
        	views: {
        		"content@app": {
        			controller: 'planCtrl',
        			templateUrl: 'app/business/plan/views/plan-sales-list.html'
        		}
        	}
        })
        
        .state('app.business.grainReservesPlan-sales-view', {
            url: '/business/grainReservesPlan-sales-view/:id/:processInstanceId',
            data: {
                title: '计划查看'
            },
            params:{
                    isNotEdit : true
                },
            views: {
                "content@app": {
                    controller: 'planSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        
        .state('app.business.grainReservesPlan-sales-apply-edit', {
                url: '/business/grainReservesPlan-sales-apply-edit/:id/:attributeType',
                data: {
                    title: '计划编辑'
                },
                params:{
                    isNotEdit : false
                },
                views: {
                    "content@app": {
                        controller: 'planSaveCtrl as datatables',
                        templateUrl: 'app/business/plan/views/plan-edit.html'
                    }
                }
            }
        )
        
        
        .state('app.business.grainReservesPlan-sales-audit', {
            url: '/business/grainReservesPlan-sales-audit',
            params: {
                "type" : "plan",
                "attributeType" : "2"
            },
            data: {
                title: '计划审批'
            },
            views: {
                "content@app": {
                    controller: 'planAuditCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-audit-sales-list.html'
                }
            }
        })
        
        .state('app.business.grainReservesPlan-sales-audit-save', {
            url: '/business/grainReservesPlan-sales-audit-save/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '计划审批编辑'
            },
            params: {
                "isAudit" : true
            },
            views: {
                "content@app": {
                    controller: 'planAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        
        .state('app.business.grainReservesPlan-sales-audit-view', {
            url: '/business/grainReservesPlan-sales-audit-view/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '计划审批查看'
            },
            params: {
                "isAudit" : false
            },
            views: {
                "content@app": {
                    controller: 'planAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        
        .state('app.business.grainReservesPlan-sales-pass', {
            url: '/business/grainReservesPlan-sales-pass',
            params: {
                "attributeType" : "2"
            },
            data: {
                title: '已审批计划'
            },
            views: {
                "content@app": {
                    controller: 'planAuditPassCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-audit-sales-pass-list.html'
                }
            }
        })
        
        .state('app.business.grainReservesPlan-sales-pass-view', {
            url: '/business/grainReservesPlan-sales-pass-view/:id/:processInstanceId',
            data: {
                title: '已审批计划查看'
            },
            params:{
                isNotEdit : true
            },
            views: {
                "content@app": {
                    controller: 'planAuditPassSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })

      //-----------------------------收购计划---------------------------
        .state('app.business.grainReservesPlan-acquisition', {
            url: '/business/grainReservesPlan-acquisition',
            data: {
                title: '收购计划'
            }
            
        })
        
        .state('app.business.grainReservesPlan-acquisition-apply', {
        	url: '/business/grainReservesPlan-acquisition-apply',
        	 params: {
                 "attributeType" : "3"
             },
        	data: {
        		title: '计划申请'
        	},
        	views: {
        		"content@app": {
        			controller: 'planCtrl',
        			templateUrl: 'app/business/plan/views/plan-acquisition-list.html'
        		}
        	}
        })
        
        .state('app.business.grainReservesPlan-acquisition-view', {
            url: '/business/grainReservesPlan-acquisition-view/:id/:processInstanceId',
            data: {
                title: '计划查看'
            },
            params:{
                    isNotEdit : true
                },
            views: {
                "content@app": {
                    controller: 'planSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        
         .state('app.business.grainReservesPlan-acquisition-apply-edit', {
                url: '/business/grainReservesPlan-acquisition-apply-edit/:id/:attributeType',
                data: {
                    title: '计划编辑'
                },
                params:{
                    isNotEdit : false
                },
                views: {
                    "content@app": {
                        controller: 'planSaveCtrl as datatables',
                        templateUrl: 'app/business/plan/views/plan-edit.html'
                    }
                }
            }
        )
        
        .state('app.business.grainReservesPlan-acquisition-audit', {
            url: '/business/grainReservesPlan-acquisition-audit',
            params: {
                "type" : "plan",
                "attributeType" : "3"
            },
            data: {
                title: '计划审批'
            },
            views: {
                "content@app": {
                    controller: 'planAuditCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-audit-acquisition-list.html'
                }
            }
        })
        
        .state('app.business.grainReservesPlan-acquisition-audit-save', {
            url: '/business/grainReservesPlan-acquisition-audit-save/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '计划审批编辑'
            },
            params: {
                "isAudit" : true
            },
            views: {
                "content@app": {
                    controller: 'planAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        
        
        .state('app.business.grainReservesPlan-acquisition-audit-view', {
            url: '/business/grainReservesPlan-acquisition-audit-view/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '计划审批查看'
            },
            params: {
                "isAudit" : false
            },
            views: {
                "content@app": {
                    controller: 'planAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        
        .state('app.business.grainReservesPlan-acquisition-pass', {
            url: '/business/grainReservesPlan-acquisition-pass',
            params: {
                "attributeType" : "3"
            },
            data: {
                title: '已审批计划'
            },
            views: {
                "content@app": {
                    controller: 'planAuditPassCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-audit-acquisition-pass-list.html'
                }
            }
        })
        
        .state('app.business.grainReservesPlan-acquisition-pass-view', {
            url: '/business/grainReservesPlan-acquisition-pass-view/:id/:processInstanceId',
            data: {
                title: '已审批计划查看'
            },
            params:{
                isNotEdit : true
            },
            views: {
                "content@app": {
                    controller: 'planAuditPassSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        
//------------------------------------------------经营管理-------------------------------------------------
        .state('app.business.management', {
            url: '/business/management',
            data: {
                title: '经营管理'
            }
        })
        
        //-------------------------------------------计划管理---------------------------------------
        
        .state('app.business.management.plan', {
            url: '/business/management/plan',
            data: {
                title: '计划管理'
            }
        })
        
        .state('app.business.management.plan-apply', {
        	url: '/business/management/plan-apply',
        	 params: {
                 "menu" : "management"
             },
        	data: {
        		title: '计划申请'
        	},
        	views: {
        		"content@app": {
        			controller: 'planCtrl',
        			templateUrl: 'app/business/plan/views/plan-list.html'
        		}
        	}
        })
        .state('app.business.management.plan-edit', {
                url: '/business/management/plan-edit/:id/:menu',
                data: {
                    title: '计划编辑'
                },
                params:{
                    isNotEdit : false
                },
                views: {
                    "content@app": {
                        controller: 'planSaveCtrl as datatables',
                        templateUrl: 'app/business/plan/views/plan-edit.html'
                    }
                }
            }
        )
        
       .state('app.business.management.plan-view', {
            url: '/business/management/plan-view/:id/:processInstanceId',
            data: {
                title: '计划查看'
            },
            params:{
                    isNotEdit : true
                },
            views: {
                "content@app": {
                    controller: 'planSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        
       
        
        .state('app.business.management.plan-audit', {
            url: '/business/management/plan-audit',
            params: {
                "type" : "plan",
                "menu" : "management"
            },
            data: {
                title: '计划审批'
            },
            views: {
                "content@app": {
                    controller: 'planAuditCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-audit-list.html'
                }
            }
        })
        
        .state('app.business.management.plan-audit-save', {
            url: '/business/management/plan-audit-save/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '计划审批编辑'
            },
            params: {
                "isAudit" : true
            },
            views: {
                "content@app": {
                    controller: 'planAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        
        
        .state('app.business.management.plan-audit-view', {
            url: '/business/management/plan-audit-view/:id/:processInstanceId/:taskId/:auditId/:menu',
            data: {
                title: '计划审批查看'
            },
            params: {
                "isAudit" : false
            },
            views: {
                "content@app": {
                    controller: 'planAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        
        .state('app.business.management.plan-pass', {
            url: '/business/management/plan-pass',
            params: {
                "menu" : "management"
            },
            data: {
                title: '已审批计划'
            },
            views: {
                "content@app": {
                    controller: 'planAuditPassCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-audit-pass-list.html'
                }
            }
        })
        
        .state('app.business.management.plan-pass-view', {
            url: '/business/management/plan-pass-view/:id/:processInstanceId',
            data: {
                title: '已审批计划查看'
            },
            params:{
                isNotEdit : true
            },
            views: {
                "content@app": {
                    controller: 'planAuditPassSaveCtrl as datatables',
                    templateUrl: 'app/business/plan/views/plan-edit.html'
                }
            }
        })
        
        /*----------------------------------------------客户------------------------------------*/
        .state('app.business.management.customer', {
            abstract: true,
            data: {
                title: '客户管理'
            }
        })
        
        .state('app.business.management.customer.list', {
            url: '/business/management/customer/list',
            params: {
                "menu" : "management"
            },
            data: {
                title: '客户档案管理'
            },
            views: {
                "content@app": {
                    controller: 'customerCtrl',
                    templateUrl: 'app/business/customer/views/customer-list.html'
                }
            }
        })
        
        .state('app.business.management.customer.add', {
                url: '/business/management/customer/add/:id/:menu',
                data: {
                    title: '客户档案新增'
                },
                views: {
                    "content@app": {
                        controller: 'customerSaveCtrl as datatables',
                        templateUrl: 'app/business/customer/views/customer-edit.html'
                    }
                }
            }
        )
        .state('app.business.management.customer.edit', {
            url: '/business/management/customer/edit/:id/:menu',
            data: {
                title: '客户档案修改'
            },
            views: {
                "content@app": {
                    controller: 'customerSaveCtrl as datatables',
                    templateUrl: 'app/business/customer/views/customer-edit.html'
                }
            }
        })
        
        
        .state('app.business.management.customer.badrecord', {
            url: '/business/management/customer/badrecord',
            data: {
                title: '客户不良记录管理'
            },
            views: {
                "content@app": {
                    controller: 'customerBadrecordCtrl',
                    templateUrl: 'app/business/customer/views/customerBadrecord-list.html'
                }
            }
        })
        
        .state('app.business.management.customer.blackList', {
            url: '/business/management/customer/blackList',
            data: {
                title: '客户黑名单管理'
            },
            views: {
                "content@app": {
                    controller: 'customerBlackListCtrl',
                    templateUrl: 'app/business/customer/views/customer-blackList.html'
                }
            }
        })
        
      /*------------------------------------------------合同--------------------------------------*/
        .state('app.business.management.contract', {
            abstract: true,
            data: {
                title: '合同管理'
            }
        })
        
        .state('app.business.management.contract.list', {
            url: '/business/management/contract/list',
            params: {
                "menu" : "management"
            },
            data: {
                title: '合同申请'
            },
            views: {
                "content@app": {
                    controller: 'contractCtrl',
                    templateUrl: 'app/business/contract/views/contract-list.html'
                }
            }
        })
        
        .state('app.business.management.contract-edit', {
            url: '/business/management/contract-edit/:id/:menu',
            data: {
                title: '合同编辑'
            },
            params:{
                    isNotEdit : false
            },
            views: {
                "content@app": {
                    controller: 'contractSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-edit.html'
                }
            }
        })
        
        .state('app.business.management.contract-view', {
            url: '/business/management/contract-view/:id/:processInstanceId/:menu',
            data: {
                title: '合同查看'
            },
            params:{
                isNotEdit : true
            },
            views: {
                "content@app": {
                    controller: 'contractSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-edit.html'
                }
            }
        })
       
        .state('app.business.management.contract-audit', {
            url: '/business/management/contract-audit',
            params: {
                "menu" : "management"
            },
            data: {
                title: '合同审批'
            },
            views: {
                "content@app": {
                    controller: 'contractAuditCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-audit-list.html'
                }
            }
        })
        
        .state('app.business.management.contract-audit-save', {
            url: '/business/management/contract-audit-save/:id/:processInstanceId/:taskId/:auditId/:menu',
            data: {
                title: '审批'
            },
            params: {
                "isAudit" : true
            },
            views: {
                "content@app": {
                    controller: 'contractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-edit.html'
                }
            }
        })
        
        .state('app.business.management.contract-audit-saves', {
            url: '/business/management/contract-audit-saves/:id/:processInstanceId/:taskId/:auditId/:type',
            data: {
                title: '合同审批'
            },
            params: {
                "isAudit" : true
            },
            views: {
                "content@app": {
                    controller: 'contractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-edit.html'
                }
            }
        })
        
        .state('app.business.management.contract-audit-view', {
            url: '/business/management/contract-audit-view/:id/:processInstanceId/:taskId/:auditId/:menu',
            data: {
                title: '合同审批查看'
            },
            params: {
                "isAudit" : false
            },
            views: {
                "content@app": {
                    controller: 'contractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-edit.html'
                }
            }
        })
        
        .state('app.business.management.contract-change', {
            url: '/business/management/contract-change',
            params: {
                "menu" : "management"
            },
            data: {
                title: '合同变更'
            },
            views: {
                "content@app": {
                    controller: 'contractChangeCtrl',
                    templateUrl: 'app/business/contract/views/contract-change-list.html'
                }
            }
        })
        
        .state('app.business.management.contract-change-add', {
                url: '/business/management/contract-change-add/:id/:menu',
                data: {
                    title: '合同变更新增'
                },
                params: {
                    "isNotEdit" : false,
                    "editType": "add"
                },
                views: {
                    "content@app": {
                        controller: 'contractChangeSaveCtrl as datatables',
                        templateUrl: 'app/business/contract/views/contract-change-edit.html'
                    }
                }
            }
        )
        .state('app.business.management.contract-change-edit', {
            url: '/business/management/contract-change-edit/:id/:menu',
            data: {
                title: '合同变更编辑'
            },
            params: {
                    "isNotEdit" : false,
                    "editType": "edit"
            },
            views: {
                "content@app": {
                    controller: 'contractChangeSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-change-edit.html'
                }
            }
        })
        .state('app.business.management.contract-change-view', {
            url: '/business/management/contract-change-view/:id/:processInstanceId/:menu',
            data: {
                title: '合同变更查看'
            },
            params: {
                    "isNotEdit" : true,
                    "editType": "edit"
            },
            views: {
                "content@app": {
                    controller: 'contractChangeSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-change-edit.html'
                }
            }
        })
         
        // -------------------------------------------------------合同变更审批--------------------------------------------------------
        .state('app.business.management.contract-change-audit', {
            url: '/business/management/contract-change-audit',
            params: {
            	"auditType" : "change",
                "menu" : "management"
            },
            data: {
                title: '合同变更审批'
            },
            views: {
                "content@app": {
                    controller: 'contractAuditCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-change-audit-list.html'
                }
            }
        })
        
        .state('app.business.management.contract-change-audit-save', {
            url: '/business/management/contract-change-audit-save/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '合同变更审批'
            },
            params: {
                "isAudit" : true,
                "auditType" : "change"
            },
            views: {
                "content@app": {
                    controller: 'contractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-change-edit.html'
                }
            }
        })
        
        .state('app.business.management.contract-change-audit-view', {
            url: '/business/management/contract-change-audit-view/:id/:processInstanceId/:taskId/:auditId',
            data: {
                title: '合同变更审批查看'
            },
            params: {
                "isAudit" : false,
                "auditType" : "change"
            },
            views: {
                "content@app": {
                    controller: 'contractAuditSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-change-edit.html'
                }
            }
        })
        
        
        // -------------------------------------------------------合同完成查询--------------------------------------------------------
        .state('app.business.management.contract-pass', {
            url: '/business/management/contract-pass',
            params: {
                "menu" : "management"
            },
            data: {
                title: '已审批合同'
            },
            views: {
                "content@app": {
                    controller: 'contractAuditPassCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-audit-pass-list.html'
                }
            }
        })
        
        .state('app.business.management.contract-pass-view', {
            url: '/business/management/contract-pass-view/:id/:processInstanceId',
            data: {
                title: '已审批合同查看'
            },
            params:{
                isNotEdit : true
            },
            views: {
                "content@app": {
                    controller: 'contractAuditPassSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-edit.html'
                }
            }
        })  

        
      //---------------------------------------------合同收付款-----------------------------------------------------  
        .state('app.business.management.contract.pay', {
            abstract: true,
            data: {
                title: '合同履约管理'
            }
        })
        
        .state('app.business.management.contract.pay-recevice', {
            url: '/business/management/contract/pay-recevice',
            params: {
                "menu" : "management"
            },
            data: {
                title: '合同收付款'
            },
            views: {
                "content@app": {
                    controller: 'contractPayReceviceCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-pay-recevice-list.html'
                }
            }
        })
        
        .state('app.business.management.contract.pay-recevice-view', {
            url: '/business/management/contract/pay-recevice-view',
            data: {
                title: '合同收付款详情'
            },
            params:{
                isNotEdit : true
            },
            views: {
                "content@app": {
                    controller: 'contractPayReceviceSaveCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-pay-recevice-edit.html'
                }
            }
        })
        
        .state('app.business.management.contract.pay-performance', {
        	url: '/business/management/contract/pay-performance',
        	data: {
        		title: '合同履约详情'
        	},
        	params:{
        		isNotEdit : true,
        		"menu" : "management"
        	},
        	views: {
        		"content@app": {
        			controller: 'contractPayReceviceSaveCtrl as datatables',
        			templateUrl: 'app/business/contract/views/contract-performance-list.html'
        		}
        	}
        })
        
        .state('app.business.management.contract.pay-details', {
            url: '/business/management/contract/pay-details/:contractNum',
            data: {
                title: '合同收付款记录'
            },
            views: {
                "content@app": {
                    controller: 'contractPayReceviceCtrl as datatables',
                    templateUrl: 'app/business/contract/views/contract-pay-recevice-detailslist.html'
                }
            }
        })
        
});