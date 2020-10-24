"use strict";

angular.module('app.alert',['ui.router']).config(function ($stateProvider) {
    $stateProvider
        .state('app.alert', {
            url : '/alert',
            views: {
                "content@app": {
                    controller: 'alertCtrl'
                    //templateUrl: 'app/system/views/role-edit.html'
                }
            }
        })
})