"use strict";
/**
 * 摄像头诊断计划
 */
angular.module('app.qualityDlag', ['ui.router', 'ui.bootstrap', 'datatables', 'datatables.bootstrap']).config(function ($stateProvider) {

    $stateProvider
        .state('app.qualityDlag', {
            abstract: true,
            data: {
                title: '智能安防 / 质量诊断'
            }
        })
        .state('app.qualityDlag.playList', {
            url: '/qualityDlag/playList',// 传参 : id/:name/:pwd
            data: {
                title: '质量诊断计划'
            },
            views: {
                "content@app": {
                    controller: 'qualityPlanCtrl as datatables',
                    templateUrl: 'app/monitor/qualityDlag/views/qualityPlay-list.html'
                }
            }
        })
        .state('app.qualityDlag.playEdit', {
            url: '/qualityDlag/playEdit/:planId',// 传参 : id/:name/:pwd
            data: {
                title: '质量诊断计划编辑'
            },
            views: {
                "content@app": {
                    controller: 'qualityPlanEditCtrl as datatables',
                    templateUrl: 'app/monitor/qualityDlag/views/qualityPlan-edit.html'
                }
            }
        })
        .state('app.qualityDlag.resultNewList', {
            url: '/qualityDlag/resultNewList/:isShow',// 传参 : id/:name/:pwd
            data: {
                title: '质量诊断最新结果列表'
            },
            views: {
                "content@app": {
                    controller: 'qualityResultNewCtrl as datatables',
                    templateUrl: 'app/monitor/qualityDlag/views/qualityResult-new-list.html'
                }
            }
        })
        .state('app.qualityDlag.resultList', {
            url: '/qualityDlag/resultList/:isShow/:cameraId',// 传参 : id/:name/:pwd
            data: {
                title: '质量诊断历史结果列表'
            },
            views: {
                "content@app": {
                    controller: 'qualityResultCtrl as datatables',
                    templateUrl: 'app/monitor/qualityDlag/views/qualityResult-list.html'
                }
            }
        })
        .state('app.qualityDlag.resultEdit', {
            url: '/qualityDlag/resultEdit:id',// 传参 : id/:name/:pwd
            data: {
                title: '质量诊断结果详情'
            },
            views: {
                "content@app": {
                    controller: 'qualityResultEditCtrl as datatables',
                    templateUrl: 'app/monitor/qualityDlag/views/qualityResult-edit.html'
                }
            }
        })
        .state('app.qualityDlag.kindList', {
            url: '/qualityDlag/kindList',// 传参 : id/:name/:pwd
            data: {
                title: '阈值管理'
            },
            views: {
                "content@app": {
                    controller: 'qualityKindCtrl as datatables',
                    templateUrl: 'app/monitor/qualityDlag/views/qualityKind-list.html'
                }
            }
        })
})
