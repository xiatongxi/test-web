"use strict";


angular.module('app.layout', ['ui.router'])

.config(function ($stateProvider, $urlRouterProvider) {


    $stateProvider
        .state('app', {
            abstract: true,
            views: {
                root: {
                    templateUrl: 'app/layout/layout.tpl.html'
                }
            }
        });
    // $urlRouterProvider.otherwise('/dashboard');
    // 设置默认路由   地址栏输入默认地址，会跳转到该路由.
    $urlRouterProvider.otherwise('/userLogin');

})

