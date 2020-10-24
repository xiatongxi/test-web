"use strict";


angular.module('app.process', ['ui.router', 'datatables', 'datatables.bootstrap'])

angular.module('app.process').config(function ($stateProvider) {

    $stateProvider
        /*.state('app.process', {
            url: '/process',
            data: {
                title: 'Process'
            },
            views: {
                "content@app": {
                    controller: 'actProcessCtrl',
                    templateUrl: 'app/act/process/views/actProcess-list.html'
                }
            }
        })*/
        
        .state('app.process', {
            abstract: true,
            data: {
                title: '流程管理'
            }
        })
        
        /*********个人所有的任务列表*********/
        
        .state('app.process.list', {
            url: '/process/list',
            data: {
                title: '任务列表'
            },
            views: {
                "content@app": {
                    controller: 'actProcessCtrl',
                    templateUrl: 'app/act/process/views/actProcess-list.html'
                }
            }
        })
        
        .state('app.process.seeProcess', {
            url: '/process/seeProcess',
            data: {
                title: '任务列表'
            },
            views: {
                "content@app": {
                    controller: 'actProcessCtrl',
                    templateUrl: 'app/act/process/views/actProcess-list.html'
                }
            }
        })
});