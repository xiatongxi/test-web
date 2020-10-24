"use strict";

angular.module('app.basic').service("codeRuleDetailService", function($http, $q, APP_CONFIG) {
    
    // 删除数据.
    this.remove = function(id) {
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.basicUrl + '/depot/basic/codeRuleDetail/remove',
            data : {
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
    
})
