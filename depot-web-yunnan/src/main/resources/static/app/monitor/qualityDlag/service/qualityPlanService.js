"use strict";

angular.module('app.qualityDlag')
    .service("qualityPlanService", function($http,$state,alertService, $q, APP_CONFIG, $rootScope) {

        this.loadGroupList = function () {
        	var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.monitorUrl + '/group/getGroupListNoPage',
                params : {
                	orgId : orgId
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                d.reject("error");
            });
            return d.promise;
        }

        this.initList = function (pageNum, pageSize) {
        	var orgId = $rootScope.orgInfo.orgId;
            var d = $q.defer();
            $http({
                method : 'GET',
                url : APP_CONFIG.monitorUrl + '/quality/getPlanList',
                params : {
                    pageNum : pageNum,
                    pageSize : pageSize,
                    orgId : orgId
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                d.reject("error");
            });
            return d.promise;
        }

        this.loadDataById = function (id) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: APP_CONFIG.monitorUrl + '/quality/getPlanById',
                params: {
                    planId : id
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                //console.log(response);
            });
            return d.promise;
        }
        
        this.saveData = function (diagPlan) {
        	var orgId = $rootScope.orgInfo.orgId;
        	var userId = $rootScope.userInfo.userId;
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.monitorUrl + '/quality/planSave',
                data: {
                    planJson : diagPlan,
                    orgId : orgId,
                    userId : userId
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                // 请求失败执行代码
            });
            return d.promise;
        }

        this.removeById = function (planId) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: APP_CONFIG.monitorUrl + '/quality/removePlanById',
                data: {
                    planId : planId
                }
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                // 请求失败执行代码
            });
            return d.promise;
        }

        this.getNowFormatDate = function () {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + "_" + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
            return currentdate;
        }
    })
