"use strict";


angular.module('app.dynamicForm', ['ui.router', 'datatables', 'datatables.bootstrap'])

angular.module('app.dynamicForm').config(function ($stateProvider) {

    $stateProvider
        .state('app.dynamicForm', {
            abstract: true,
            data: {
                title: '动态表单'
            }
        })
        
        /*********所有的流程列表*********/
        
        .state('app.dynamicForm.list', {
            url: '/dynamicForm/list',
            data: {
                title: '流程动态表单列表'
            },
            views: {
                "content@app": {
                    controller: 'dynamicFormCtrl as datatables',
                    templateUrl: 'app/act/dynamicForm/views/dynamicForm-list.html'
                }
            }
        })
        .state('app.dynamicForm.dynamicForm-edit', {
                url: '/dynamicForm/dynamicForm-edit/:id :key',
                data: {
                    title: '表单编辑'
                },
                params:{
                    isNotEdit : false
                },
                views: {
                    "content@app": {
                        controller: 'dynamicFormSaveCtrl as datatables',
                        templateUrl: 'app/act/dynamicForm/views/dynamicForm-edit.html'
                    }
                }
            }
        )
});