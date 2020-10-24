"use strict";

angular.module('app.system').service("orgService", function($http, $q, APP_CONFIG) {
	
	/**
	 * 查询组织列表
	 */
	this.getPageInfo = function(pageNum, pageSize, parentId, orgName) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/orgInfo/getOrg',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				parentId : parentId,
				orgName : orgName
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
	
	this.getTreeListByOrgId = function() {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/orgInfo/getTreeListByOrgId'
		}).then(function successCallback(response) {
			// 请求成功执行代码
			d.resolve(response.data);
		}, function errorCallback(response) {
			// 请求失败执行代码
			d.reject("error");
		});
		return d.promise;
	}

	/**
	 * 查询组织列表(树形结构)
	 */
	this.getTree = function(orgName) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/orgInfo/getTree',
			params : {
				orgName : orgName
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
	
	/**
	 * 编辑组织信息，新增或修改
	 */
	this.editOrg = function(orgId) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.systemUrl + '/orgInfo/edit',
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
	}
	
	/**
	 * 保存组织信息，新增或修改
	 */
	this.saveOrg = function(org) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.systemUrl + '/orgInfo/save',
			data : {
				orgInfoJson : angular.toJson(org)
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
	
	/**
	 * 删除组织信息
	 */
	this.deleteOrg = function(orgId) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.systemUrl + '/orgInfo/remove',
			data : {
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
	}

	this.updateIntroduction = function(orgId, briefIntroduction) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.systemUrl + '/orgInfo/updateSelective',
            data : {
                orgId : orgId,
                briefIntroduction : briefIntroduction
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
