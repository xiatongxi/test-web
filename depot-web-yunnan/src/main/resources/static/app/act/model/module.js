"use strict";


angular.module('app.act', ['ui.router', 'datatables', 'datatables.bootstrap'])

angular.module('app.act').config(function ($stateProvider) {

    $stateProvider
        .state('app.act', {
            url: '/act',
            data: {
                title: '流程列表'
            },
            views: {
                "content@app": {
                    controller: 'actCtrl',
                    templateUrl: 'app/act/model/views/act-list.html'
                }
            }
        })
});