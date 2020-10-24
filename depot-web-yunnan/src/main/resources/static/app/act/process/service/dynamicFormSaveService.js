"use strict";

angular.module('app.dynamicForm').service("dynamicFormSaveService", function($http, $q, APP_CONFIG) {
	this.getPageInfo = function(id,key) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.businessUrl + '/act/form/dynamic/get-form/start',
			params : {
				processDefinitionId : id,
				key : key
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
})
