"use strict";
/**
 * 摄像头回放
 */

angular.module('app.cameraSetting', ['ui.router','app.alert']).config(function ($stateProvider) {

    $stateProvider
        .state('app.cameraSetting', {
            abstract: true,
            data: {
                title: '智能安防 / 配置管理'
            }
        })
        .state('app.cameraSetting.set', {
            url: '/cameraSetting/set',// 传参 : id/:name/:pwd
            data: {
                title: '路径配置'
            },
            views: {
                "content@app": {
                    controller: 'cameraSettingCtrl as datatables',
                    templateUrl: 'app/monitor/setting/views/setting-edit.html'
                }
            }
        })
        .state('app.cameraSetting.alarmList', {
            url: '/alarmSetting/alarmList',
            data: {
                title: '接收人列表'
            },
            views: {
                "content@app": {
                    controller: 'cameraSettingCtrl as datatables',
                    templateUrl: 'app/monitor/setting/views/alarm-list.html'
                }
            }
        })
        .state('app.cameraSetting.alarmEdit', {
            url: '/alarmSetting/alarmEdit',
            data: {
                title: '接收人添加'
            },
            views: {
                "content@app": {
                    controller: 'cameraSettingSave as datatables',
                    templateUrl: 'app/monitor/setting/views/alarm-edit.html'
                }
            }
        })
});