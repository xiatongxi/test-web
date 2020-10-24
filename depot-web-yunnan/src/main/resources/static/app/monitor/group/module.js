"use strict";

angular.module('app.cameraGroup', ['ui.router','app.alert', 'ui.bootstrap', 'datatables', 'datatables.bootstrap']).config(function ($stateProvider) {

    $stateProvider
        .state('app.cameraGroup', {
            abstract: true,
            data: {
                title: '智能安防'
            }
        })
        .state('app.cameraGroup.list', {
            url: '/cameraGroup/list',// 传参 : id/:name/:pwd
            data: {
                title: '分组管理'
            },
            views: {
                "content@app": {
                    controller: 'cameraGroupCtrl as datatables',
                    templateUrl: 'app/monitor/group/veiws/camera-group.html'
                }
            }
        })
});