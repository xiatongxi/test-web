"use strict";

// --------------------------------综合查询-------------------------综合查询------------------------------------------------------
angular.module('app.synth',[ 'ui.router', 'datatables', 'datatables.bootstrap' ]).config(function($stateProvider) {
		$stateProvider
		.state('app.synth', {
			abstract : true,
			data : {
				title : '查询追溯'
			}
		})
		//粮食追溯
		.state('app.synth.foodstuffTraces', {
			abstract : true,
			data : {
				title : '储粮追溯'
			}
		})
		// 粮食追溯查询列表
		.state('app.synth.foodstuffTraces.foodstuffTracesList', {
			url : '/foodstuffTracesList',
			data : {
				title : '储粮追溯查询列表'
			},
			views : {
				"content@app" : {
					controller : 'foodstuffTracesListCtrl',
					templateUrl : 'app/synth/foodstuffTraces/views/foodstuffTraces-list.html'
				}
			}
		})
		// 粮食追溯进度视图展示(详情)
		.state('app.synth.foodstuffTraces.foodstuffTracesView', {
			url : '/foodstuffTracesView/:food',
			data : {
				title : '储粮追溯详情'
			},
			views : {
				"content@app" : {
					controller : 'foodstuffTracesViewCtrl',
					templateUrl : 'app/synth/foodstuffTraces/views/foodstuffTraces-view.html'
				}
			}
		})

		// 计划追溯查询列表
		.state('app.synth.plan', {
			url : '/synth/plan',
			data : {
				title : '计划信息查询列表'
			},
			views : {
				"content@app" : {
					controller : 'planSynthCtrl',
					templateUrl : 'app/synth/plan/views/planSynth-list.html'
				}
			}
		})
		// 计划追溯进度视图展示(详情)
		.state('app.synth.plan-view', {
			url : '/synth/plan-view/:id',
			data : {
				title : '计划追溯详情'
			},
			views : {
				"content@app" : {
					controller : 'planSynthViewCtrl',
					templateUrl : 'app/synth/plan/views/planSynth-view.html'
				}
			}
		})


		// 人员追溯查询列表
		.state('app.synth.person', {
			url : '/synth/person',
			data : {
				title : '人员信息查询'
			},
			views : {
				"content@app" : {
					controller : 'personSynthCtrl',
					templateUrl : 'app/synth/person/views/person-list.html'
				}
			}
		})
		// 人员追溯查询详情
		.state('app.synth.person.view', {
			url : '/synth/person/view/:id',
			data : {
				title : '人员详情'
			},
			views : {
				"content@app" : {
					controller : 'personSynthViewCtrl',
					templateUrl : 'app/synth/person/views/person-view.html'
				}
			}
		})

		// 粮库追溯查询列表
		.state('app.synth.barn', {
			url : '/synth/barn',
			data : {
				title : '粮库信息查询'
			},
			views : {
				"content@app" : {
					controller : 'barnSynthCtrl',
					templateUrl : 'app/synth/barn/views/barnSynth-list.html'
				}
			}
		})
		// 粮库追溯查询详情
		.state('app.synth.barn.view', {
			url : '/synth/barn/view/:id',
			data : {
				title : '粮库详情'
			},
			views : {
				"content@app" : {
					controller : 'barnSynthViewCtrl',
					templateUrl : 'app/synth/barn/views/barnSynth-view.html'
				}
			}
		})
		/*---------------库内质量追溯-----------------*/
		// 以入库为源头追溯
		.state('app.synth.warehouseSource', {
			url : '/synth/warehouseSource',
			data : {
				title : '以入库为源头追溯列表'
			},
			views : {
				"content@app" : {
					controller : 'warehouseSourceCtrl',
					templateUrl : 'app/synth/qualityTrace/views/warehouseSource-list.html'
				}
			}
		})
		.state('app.synth.warehouseSource.view', {
			url : '/synth/warehouseSource/view/:fcbgz/:btnType',
			data : {
				title : '查看'
			},
			views : {
				"content@app" : {
					controller : 'warehouseSourceViewCtrl',
					templateUrl : 'app/synth/qualityTrace/views/warehouseSource-view.html'
				}
			}
		})
        // 质量安全追溯
		.state('app.synth.qualitySafe', {
			url : '/synth/qualitySafe',
			data : {
				title : '质量安全追溯列表'
			},
			views : {
				"content@app" : {
					controller : 'qualitySafeCtrl',
					templateUrl : 'app/synth/qualityTrace/views/qualitySafe-list.html'
				}
			}
		})
		// 质量事件数据管理
		.state('app.synth.qualityEvent', {
			url : '/synth/qualityEvent',
			data : {
				title : '质量事件数据管理列表'
			},
			views : {
				"content@app" : {
					controller : 'qualityEventCtrl',
					templateUrl : 'app/synth/qualityTrace/views/qualityEvent-list.html'
				}
			}
		})
		.state('app.synth.qualityEvent.edit', {
			url : '/synth/qualityEvent/edit/:id/:btnType',
			data : {
				title : '质量事件数据管理编辑'
			},
			views : {
				"content@app" : {
					controller : 'qualityEventEditCtrl',
					templateUrl : 'app/synth/qualityTrace/views/qualityEvent-edit.html'
				}
			}
		})
		// 质量事件追溯分析
		.state('app.synth.qualityEventAnalyze', {
			url : '/synth/qualityEventAnalyze',
			data : {
				title : '质量事件追溯分析列表'
			},
			views : {
				"content@app" : {
					controller : 'qualityEventAnalyzeCtrl',
					templateUrl : 'app/synth/qualityTrace/views/qualityEventAnalyze-list.html'
				}
			}
		})
		// 质量信用评价
		.state('app.synth.qualityCredit', {
			url : '/synth/qualityCredit',
			data : {
				title : '质量信用评价列表'
			},
			views : {
				"content@app" : {
					// controller : 'qualityCreditCtrl',
					controller : 'customerBadrecordCtrl',
					templateUrl : 'app/synth/qualityTrace/views/qualityCredit-list.html'
				}
			}
		})

		/*---------------粮食安全追溯-----------------*/
		// 生命周期管理列表
        .state('app.synth.lifecycle', {
            url : '/synth/lifecycle/:idCode',//识别码用到
            data : {
                title : '粮库生命周期管理列表'
            },
            views : {
                "content@app" : {
                    controller : 'lifecycleCtrl',
                    templateUrl : 'app/synth/lifecycle/views/lifecycle-list.html'
                }
            }
        })
        // 入库明细(火车)
		.state('app.synth.lifecycle.incomeWarehouseTrain', {
			url : '/synth/lifecycle/incomeWarehouseTrain/:type/:houseId/:warehouseId/:isShowReturn',
			data : {
				title : '火车入库列表'
			},
			views : {
				"content@app" : {
					controller : 'incomeWarehouseCtrl',
					templateUrl : 'app/synth/lifecycle/views/incomeWarehouseTrain-list.html'
				}
			}
		})
		// 入库明细(汽车)
		.state('app.synth.lifecycle.incomeWarehouseTruck', {
			url : '/synth/lifecycle/incomeWarehouseTruck/:type/:houseId/:warehouseId/:isShowReturn',
			data : {
				title : '汽车入库列表'
			},
			views : {
				"content@app" : {
					controller : 'incomeWarehouseCtrl',
					templateUrl : 'app/synth/lifecycle/views/incomeWarehouseTruck-list.html'
				}
			}
		})
		// 追溯出入库详情
		.state('app.synth.lifecycle.warehouseTruckDetail', {
			url : '/synth/lifecycle/warehouseTruckDetail/:obj',
			data : {
				title : '汽车入库详情列表'
			},
			views : {
				"content@app" : {
					controller : 'crkRecordDetailCtrl',
					templateUrl : 'app/synth/lifecycle/views/warehouseTruckDetail.html'
				}
			}
		})
		// 质检信息
		.state('app.synth.lifecycle.qualityCheck', {
			url : '/synth/lifecycle/qualityCheck/:houseId/:warehouseId/:isShowReturn',
			data : {
				title : '质检信息列表'
			},
			views : {
				"content@app" : {
					controller : 'qualityCheckCtrl',
					templateUrl : 'app/synth/lifecycle/views/qualityCheck-list.html'
				}
			}
		})
		// 质检信息详情(质量管理qualitycheckSaveCtrl)
		.state('app.synth.lifecycle.qualityCheckDetail', {
			url : '/synth/lifecycle/qualityCheckDetail/:id/:isNotEdit',
			data : {
				title : '质检信息详情'
			},
			views : {
				"content@app" : {
					controller : 'qualitycheckSaveCtrl',
					templateUrl : 'app/synth/lifecycle/views/qualityCheck-detail.html'
				}
			}
		})

		// 粮情信息
		.state('app.synth.lifecycle.grainAnalysis', {
			url : '/synth/lifecycle/grainAnalysis/:houseId/:isShowReturn',
			data : {
				title : '粮情信息列表'
			},
			views : {
				"content@app" : {
					// controller : 'grainAnalysisCtrl',
					controller : 'grainTempCtrl',
					templateUrl : 'app/synth/lifecycle/views/grainAnalysis-list.html'
				}
			}
		})
		// 作业记录
		.state('app.synth.lifecycle.jobRecord', {
			url : '/synth/lifecycle/jobRecord/:houseId/:isShowReturn',
			data : {
				title : '作业记录列表'
			},
			views : {
				"content@app" : {
					// controller : 'jobRecordCtrl',
					controller : 'ccZyCtrl',
					templateUrl : 'app/synth/lifecycle/views/jobRecord-list.html'
				}
			}
		})
		// 出库明细(默认进入火车出库明细)
		.state('app.synth.lifecycle.outWarehouseTrain', {
			url : '/synth/lifecycle/outWarehouseTrain/:type/:houseId/:warehouseId/:isShowReturn',
			data : {
				title : '火车出库明细列表'
			},
			views : {
				"content@app" : {
					controller : 'outWarehouseCtrl',
					templateUrl : 'app/synth/lifecycle/views/outWarehouseTrain-list.html'
				}
			}
		})
		// 出库明细(汽车出库明细)
		.state('app.synth.lifecycle.outWarehouseTruck', {
			url : '/synth/lifecycle/outWarehouseTruck/:type/:houseId/:warehouseId/:isShowReturn',
			data : {
				title : '汽车出库明细列表'
			},
			views : {
				"content@app" : {
					controller : 'outWarehouseCtrl',
					templateUrl : 'app/synth/lifecycle/views/outWarehouseTruck-list.html'
				}
			}
		})

        // 识别码管理
		.state('app.synth.identifyCode', {
			url: '/synth/identifyCode',//识别码用到
			data: {
				title: '粮食安全生命周期分析'
			},
			views: {
				"content@app": {
					templateUrl: 'app/synth/lifecycle/views/identifyCode-index.html'
				}
			}
		})
});