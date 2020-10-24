"use strict";

angular.module('app.basic').service("keeperService", function($http, $q, APP_CONFIG) {
	//查询列表
    this.getPageInfo = function(pageNum, pageSize, keeperName, orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/Keeper/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                keeperName : keeperName, //职员名称
                orgId : orgId  //单位
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
    this.getKeeperListPageInfo = function(pageNum, pageSize, keeperName, storehouseId, orgId ,roleId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/Keeper/getKeeperList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                keeperName : keeperName, //保管员名称 name : keeper.name, //保管员名称
                orgId : orgId,  //单位
                storehouseId : storehouseId, //仓房
                roleId : roleId //保管员id
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

    // 保管员下拉框获取(以单位为条件获取)
    this.getKeeper = function(orgId) { //传单位ID
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/Keeper/getKeeper',
            params : {
            	orgId : orgId
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
        	// data.wareList的值用于货位下拉列表
        	// data.wares 的值用于查询列表中货位名称的转换
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }
    
    // 提交表单
    this.save = function(keeper, xwxl, zyjs, zyzg, sgz, userInfo) {
        var d = $q.defer();
    	$http({
            method: 'POST',
            url: APP_CONFIG.basicUrl + '/Keeper/edit',
            data: {
            	keeper : angular.toJson(keeper), //保管员基础信息
            	xwxlJson : angular.toJson(xwxl), //保管员学位学历
            	zyjsJson : angular.toJson(zyjs), //保管员专业技术
            	zyzgJson : angular.toJson(zyzg), //保管员职业资格
            	sgzJson : angular.toJson(sgz),  //保管员上岗证
            	userInfo : angular.toJson(userInfo) //登录对象
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

    //新增或修改查询后台一条数据信息
    this.findBasicKeeper = function(id) {
    	var d = $q.defer();
    	$http({
	        method: 'GET',
	        url: APP_CONFIG.basicUrl + '/Keeper/findBasicKeeper',
	        params: {
	            id : id
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
    
    // 删除一条记录
    this.remove = function(id, orgId) {
    	var d = $q.defer(); 
    	$http({
             method: 'POST',
             url: APP_CONFIG.basicUrl + '/Keeper/remove',
             data: {
                 id : id,
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

    // 获取当前保管员所在粮库中所有仓房信息和已有的仓房权限
    this.getUnitStoreKeepList = function(id, orgId, libraryType) {
    	var d = $q.defer(); 
    	$http({
             method: 'GET',
             url: APP_CONFIG.basicUrl + '/Keeper/getUnitStoreKeepList',
             params: {
                 id : id,
                 orgId : orgId,
                 libraryType : libraryType
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
    
    // 提交保管员权限分配
    this.saveKeeperHouse = function(selected, userInfo, bgyId) {
    	var d = $q.defer(); 
    	$http({
             method: 'POST',
             url: APP_CONFIG.basicUrl + '/Keeper/saveKeeperHouse',
             data: {
            	 selected : selected,
            	 userInfo : angular.toJson(userInfo),
                 bgyId : bgyId
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

    // 删除一条保管员证件信息
    this.removeEdu = function(id) {
    	var d = $q.defer(); 
    	$http({
             method: 'POST',
             url: APP_CONFIG.basicUrl + '/Keeper/removeEducation',
             data: {
                 id : id
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
    
    this.getBasicKeeper = function(id) {
    	var d = $q.defer(); 
    	$http({
             method: 'GET',
             url: APP_CONFIG.basicUrl + '/Keeper/getBasicKeeper',
             params: {
                 id : id
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
    
    this.getKeeper = function(roleId) {
    	var d = $q.defer(); 
    	$http({
             method: 'GET',
             url: APP_CONFIG.baseUrl + '/userInfo/getUser',
             params: {
            	 roleId : roleId
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

    //根据仓房id得到这个仓房所负责的保管员
    this.getKeeperNamesByHouseId = function(houseId) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.basicUrl + '/Keeper/getKeeperNamesByHouseId',
            params: {
                houseId : houseId
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

    //更新保管员移交对应保管员的仓房
    this.updateKeeperHouse = function(houseId,receiveId,transferId,roleId) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.basicUrl + '/Keeper/updateKeeperHouse',
            params: {
                houseId : houseId,
                receiveId : receiveId,
                transferId : transferId,
                roleId : roleId
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
