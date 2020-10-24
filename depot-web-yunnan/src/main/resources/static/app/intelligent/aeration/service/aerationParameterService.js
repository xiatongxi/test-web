"use strict";

angular.module('app.intelligent').service("aerationParameterService", function($http, $q, $rootScope, APP_CONFIG) {
	//通风记录查询
	this.getPageInfo = function (pageNum, pageSize, aerationParameter) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.intelligentUrl + '/intelligents/aerationParameter/getList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				vcfcode : aerationParameter==undefined?"":aerationParameter.vcfcode
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}
	
	
	// 保存,修改
    this.save = function(aerationParameter) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/aerationParameter/save',
            data: {
            	aerationParameterJson : angular.toJson(aerationParameter),
            	orgId : $rootScope.userInfo.orgId
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });

        return d.promise;
    };

    // 根据id加载数据.
    this.loadDataById = function(id) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/aerationParameter/getById',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    };

    // 根据id删除
    this.remove = function (aerationParameter) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.intelligentUrl + '/intelligents/aerationParameter/deleteById',
            data: {
                id : aerationParameter.id,
                aerationParamJson: angular.toJson(aerationParameter)
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }

    // 数据同步
    this.synchronizationAll = function (orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/intelligents/aerationParameter/synchronizationAll',
            params : {
                orgId : orgId
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    };

});