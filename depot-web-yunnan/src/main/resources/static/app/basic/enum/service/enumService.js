"use strict";

angular.module('app.basic').service("enumService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, parentId, enumname) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.basicUrl + '/Enum/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                enumName : enumname,
                parentId : parentId
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

    // 查询一条数据
    this.edit = function(id) {
   	    var d = $q.defer();
    	$http({
    		method: 'GET',
    		url: APP_CONFIG.basicUrl + '/Enum/findByEnum',
    		params: {
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
    
    //提交表单
    this.save = function(basicEnum) {
        var d = $q.defer();
    	$http({
            method: 'POST',
            url: APP_CONFIG.basicUrl + '/Enum/edit',
            data: {
           	    enumJson : angular.toJson(basicEnum)
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
    
    // 删除一条记录
    this.remove = function(id) {
         var d = $q.defer();
         $http({
             method: 'POST',
             url: APP_CONFIG.basicUrl + '/Enum/remove',
             params: {
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
    
    // 获取所有枚举树
    this.getTree = function() {
    	var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.basicUrl + '/Enum/getTree',
        }).then(function successCallback(response) {
       	 // 请求成功执行代码
    		 d.resolve(response.data);
        }, function errorCallback(response) {
       	 // 请求失败执行代码
    		 d.reject("error");
        });
        return d.promise;
    }
    
    // 按父级ID分组的枚举数据组和按枚举ID为单位的独条数据
    this.enumData = function() {
    	var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.basicUrl + '/Enum/findEnumObj',
        }).then(function successCallback(response) {
       	 // 请求成功执行代码
    		 d.resolve(response.data);
        }, function errorCallback(response) {
       	 // 请求失败执行代码
    		 d.reject("error");
        });
        return d.promise;
    }
    
    // 获取所有子节点
    this.getAllChildren = function(enumid) {
    	var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.basicUrl + '/Enum/getAllChildren',
            params: {
            	enumid : enumid
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
    
    function getTreeByData(data, checkedEnum) {
        var topTree = [];
        
        var idMap = new Map();
        var parentidMap = new Map();
        var parentidArray = [];
        for (var i = 0; i < data.enumList.length; i++) {
            // 当前为根.
            var obj = {
                id: data.enumList[i].id,
                name: data.enumList[i].name,
                children: []
            };
            
            var id = data.enumList[i].id;
            var parentid = data.enumList[i].parentid;
            idMap.set(id, obj);
            
            if (parentidMap.has(parentid)) {
                var parentidMapV = parentidMap.get(parentid);
                parentidMapV.push(id);
                parentidMap.set(parentid, parentidMapV);
            } else {
                var parentidMapV = [];
                parentidMapV.push(id);
                parentidMap.set(parentid, parentidMapV);
                parentidArray.push(parentid);
            }
            
            // 判断是否选中.
            if (checkedEnum != undefined && data.enumList[i].id == checkedEnum) {
                obj.selected = true;
            }
                
        }
        
        for (var j = 0; j < parentidArray.length; j++) {
            var parentid = parentidArray[j]; 
            var parentidMapV = parentidMap.get(parentid);
            
            // 第一层.
            if (parentid == data.enumId) {
                for (var k = 0; k < parentidMapV.length; k++) {
                    var id = parentidMapV[k];
                    var obj = idMap.get(id);
                    // 将第一层放入topTree.
                    topTree.push(obj);
                }
            } else {
                for (var k = 0; k < parentidMapV.length; k++) {
                    var id = parentidMapV[k];
                    var obj = idMap.get(id);
                    var parentidObj = idMap.get(parentid);
                    
                    parentidObj.children.push(obj);
                }
            }
        }
        topTree = angular.copy(topTree);
        return topTree;
    }
    
    // 获取树 数据.
    this.getTreeList = function(checkedEnum, type) {
    	var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.basicUrl + '/Enum/getTreeList',
            params : {
                type : type
            },
        }).then(function successCallback(response) {
            var topTree = getTreeByData(response.data, checkedEnum);
       	    // 请求成功执行代码
            d.resolve(topTree);
        }, function errorCallback(response) {
       	     // 请求失败执行代码
    		 d.reject("error");
        });
        return d.promise;
    }
    
    //分类型
    this.getTreeListByTypeId = function(checkedEnum, deviceTypeId) {
    	var d = $q.defer();
    	$http({
    		method: 'GET',
    		url: APP_CONFIG.basicUrl + '/Enum/getTreeTypeList',
    		 params: {
    			 deviceTypeId : deviceTypeId
             }
    	}).then(function successCallback(response) {
    		var topTree = getTreeByData(response.data, checkedEnum);
    		// 请求成功执行代码
    		d.resolve(topTree);
    	}, function errorCallback(response) {
    		// 请求失败执行代码
    		d.reject("error");
    	});
    	return d.promise;
    }
});
