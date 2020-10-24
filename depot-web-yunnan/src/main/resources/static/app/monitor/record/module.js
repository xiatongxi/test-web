"use strict";
/**
 * 摄像头回放
 */

angular.module('app.cameraRecord', ['ui.router','app.alert', 'ui.bootstrap', 'datatables', 'datatables.bootstrap']).config(function ($stateProvider) {

    $stateProvider
        .state('app.cameraRecord', {
            abstract: true,
            data: {
                title: '智能安防'
            }
        })
        .state('app.cameraRecord.list', {
            url: '/cameraRecord/list',// 传参 : id/:name/:pwd
            data: {
                title: '回放通道'
            },
            views: {
                "content@app": {
                    controller: 'cameraRecordCtrl as datatables',
                    templateUrl: 'app/monitor/record/views/camera-record.html'
                }
            }
        })
});