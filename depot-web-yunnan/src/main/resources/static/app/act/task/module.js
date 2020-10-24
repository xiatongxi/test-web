"use strict";


angular.module('app.task', ['ui.router', 'datatables', 'datatables.bootstrap'])

angular.module('app.task').config(function ($stateProvider) {
    $stateProvider
        .state('app.task', {
            abstract: true,
            data: {
                title: '任务管理'
            }
        })
        
        /*********个人所有的任务列表*********/
        
        .state('app.task.list', {
            url: '/task/list',
            data: {
                title: '任务列表'
            },
            views: {
                "content@app": {
                    controller: 'actTaskCtrl',
                    templateUrl: 'app/act/task/views/actTask-list.html'
                }
            }
        })
        
        /*********对应的历史审批意见列表*********/
        
        .state('app.task.hislist', {
            url: '/task/hislist/:procInsId',
            data: {
                title: '历史意见列表'
            },
            views: {
                "content@app": {
                    controller: 'actHisTaskCtrl',
                    templateUrl: 'app/act/task/views/actTask-Hislist.html'
                }
            }
        })
        
});