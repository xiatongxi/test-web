"use strict";

angular.module('app.basic').service("ChangestoreService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, orgId, businessNo, applyTimeA, applyTimeB) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.qualitycheckUrl + '/StorageChangeStoragehouseTaskController/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                orgId : orgId, //单位ID
                businessNo : businessNo, //倒仓业务单号
                applyTimeA : applyTimeA, //申请日期
                applyTimeB : applyTimeB //申请日期
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
    //提交表单
    this.save = function(change, crk_ip, changestorage, addDcsl, fileIds) {
        var d = $q.defer();
    	$http({
            method: 'POST',
            url: APP_CONFIG.qualitycheckUrl + '/StorageChangeStoragehouseTaskController/edit',
            data: {
            	change : change,
            	crk_ip : crk_ip,
           	    storeChangeStoragehouseJson : angular.toJson(changestorage),
           	    storeChangeStorageaddDcsl : angular.toJson(addDcsl),
           	    fileIds : angular.toJson(fileIds)
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
    //查询功能
    this.findChangeData = function(businessNo, orgId) {
    	var d = $q.defer();
    	$http({
            method: 'GET',
            url: APP_CONFIG.qualitycheckUrl + '/StorageChangeStoragehouseTaskController/findChangeData',
            params : {
            	businessNo : businessNo,
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
    //删除功能
    this.removeChangeData = function(businessNo) {
    	var d = $q.defer();
    	$http({
            method: 'POST',
            url: APP_CONFIG.qualitycheckUrl + '/StorageChangeStoragehouseTaskController/removeChangeData',
            params : {
            	businessNo : businessNo
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
   //查询倒仓作业
    this.getWorkPageInfo = function(pageNum, pageSize, orgId, planStartDateA, planStartDateB) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.qualitycheckUrl + '/StorageChangeStoragehouseTaskController/getWorkPageInfo',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                orgId : orgId, //单位ID
                planStartDateA : planStartDateA, //倒仓日期
                planStartDateB : planStartDateB //倒仓日期
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
    //查询倒仓作业
    this.getChangeDataPageInfo = function(pageNum, pageSize, applyStatus) {
    	 var d = $q.defer();
         $http({
             method : 'GET',
             url : APP_CONFIG.qualitycheckUrl + '/StorageChangeStoragehouseTaskController/getChangeDataPageInfo',
             params : {
                 pageNum : pageNum,
                 pageSize : pageSize,
                 applyStatus :applyStatus
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
    //查询主表数据进行回显
  //查询功能
    this.fandChangeWorkData = function(businessNo) {
    	var d = $q.defer();
    	$http({
            method: 'GET',
            url: APP_CONFIG.qualitycheckUrl + '/StorageChangeStoragehouseTaskController/fandChangeWorkData',
            params : {
            	businessNo : businessNo
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
    //修改主表数据，添加倒仓作业表
    this.updataChangeWork = function(changestorage, addDcsl) {
        var d = $q.defer();
    	$http({
            method: 'POST',
            url: APP_CONFIG.qualitycheckUrl + '/StorageChangeStoragehouseTaskController/updataChangeWork',
            data: {
            	storeChangeStoragehouseJson : angular.toJson(changestorage),
            	storeChangeStorageaddDcsl : angular.toJson(addDcsl)
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
  
  //查询作业功能
    this.findWorkData = function(workNo, orgId) {
    	var d = $q.defer();
    	$http({
            method: 'GET',
            url: APP_CONFIG.qualitycheckUrl + '/StorageChangeStoragehouseTaskController/findWorkData',
            params : {
            	workNo : workNo,
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
    this.present = function(changestorage){
    	var d = $q.defer();
    	$http({
            method: 'GET',
            url: APP_CONFIG.qualitycheckUrl + '/StorageChangeStoragehouseTaskController/present',
            params : {
            	changestorageJson : angular.toJson(changestorage)
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
   //上传省平台
    this.up = function(addDcsl, crk_ip){
    	var d = $q.defer();
    	$http({
            method: 'GET',
            url: APP_CONFIG.qualitycheckUrl + '/StorageChangeStoragehouseTaskController/up',
            params : {
            	changestorageDetailaddDcsl : angular.toJson(addDcsl),
            	crk_ip : crk_ip
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
