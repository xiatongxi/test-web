"use strict";

angular.module('app.process').service("actHisTaskService", function($http, $q, APP_CONFIG) {
	//根据id加载数据
    this.loadDataById = function(procInsId) {alert(procInsId);
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.businessUrl + '/act/task/historyList',
            data: {
            	procInsId : procInsId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
})
