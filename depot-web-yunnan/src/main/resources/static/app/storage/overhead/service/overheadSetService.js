"use strict";

angular.module('app.storage').service("overheadSetService", function($http, $q, APP_CONFIG) {
	//转储管理查询
	this.getPageInfoTOover = function (pageNum, pageSize) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.qualitycheckUrl + '/StorageOverheadSetController/getList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize
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

	//详情
	this.edit = function (id) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.qualitycheckUrl + '/StorageOverheadSetController/edit',
			params : {
				id : id
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

	//保存
	this.save = function (overheadSet) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.qualitycheckUrl + '/StorageOverheadSetController/save',
			data : {
				overheadSetJson : angular.toJson(overheadSet)
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
	this.getPageInfo = function (pageNum, pageSize, applyTimeA, applyTimeB, applyEndA, applyEndB, lhEndA, lhEndB) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.businessUrl + '/depot/business/plan/getJkqPlanNumberList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				applyTimeA : applyTimeA,
				applyTimeB : applyTimeB,
				applyEndA : applyEndA,
				applyEndB : applyEndB,
				lhEndA : lhEndA,
				lhEndB : lhEndB
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
	//查询架空期截止日期距当前日期小于等于30天数据
	this.getCRKPageInfo = function (pageNum, pageSize) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.agileUrl + '/depot/business/plan/getJkqPlanDayList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize
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
	//根据查询架空期距截止时间小于30天数据,用于延期申请
    this.getJkqOveHeadList = function(pageNum, pageSize) {
    	var d = $q.defer();
    	$http({
            method: 'GET',
            url: APP_CONFIG.qualitycheckUrl + '/JkqCrkController/getJkqOveHeadList',
            params : {
            	pageNum : pageNum,
            	pageSize : pageSize
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
           d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
        
        return d.promise;
    }
  //查询 延期申请列表
	this.getApplyPageInfo = function (pageNum, pageSize, isUpload, sqrqA, sqrqB) {
		var d = $q.defer();
		$http({
			method : 'GET',
			url : APP_CONFIG.qualitycheckUrl + '/JkqCrkController/getApplyList',
			params : {
				pageNum : pageNum,
				pageSize : pageSize,
				isUpload : isUpload , // 状态
				sqrqA : sqrqA, //申请日期始
				sqrqB : sqrqB //申请日期末
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
	//架空期延期申请保存
	this.add = function (overFlag, overhead, addDcsl, fileIds) {
		var d = $q.defer();
		$http({
			method : 'POST',
			url : APP_CONFIG.qualitycheckUrl + '/JkqCrkController/add',
			data : {
				overFlag : overFlag,
				overheadApplyJson : angular.toJson(overhead),
				overheadAddDcslson : angular.toJson(addDcsl),
				fileIds : angular.toJson(fileIds)
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
	//删除功能
    this.removeOverApplyData = function(yqsqNo) {
    	var d = $q.defer();
    	$http({
            method: 'POST',
            url: APP_CONFIG.qualitycheckUrl + '/JkqCrkController/removeOverApplyData',
            params : {
            	yqsqNo : yqsqNo
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
           d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
        
        return d.promise;
    }
	//查询,修改功能
    this.findOverheadData = function(applyNo, orgId) {
    	var d = $q.defer();
    	$http({
            method: 'GET',
            url: APP_CONFIG.qualitycheckUrl + '/JkqCrkController/findOverheadData',
            params : {
            	applyNo : applyNo,
            	orgId : orgId
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
           d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
        
        return d.promise;
    }
	 //上传至省平台
    this.present = function(yqsqNo, isUpload){
    	var d = $q.defer();
    	$http({
            method: 'GET',
            url: APP_CONFIG.qualitycheckUrl + '/JkqCrkController/present',
            params : {
            	yqsqNo: yqsqNo,
            	isUpload : isUpload
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
           d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
        
        return d.promise;
    }
});