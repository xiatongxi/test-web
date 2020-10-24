"use strict";

angular.module('app.alert').service("alertService", function($http, $q, APP_CONFIG) {
    /**
     * 提示正确信息
     * @param title
     * @param content
     */
    this.showSuccess = function (content) {
        $.bigBox({
            title: "提示",
            content: content == undefined?"操作成功":content,
            color: "#a2c47f",
            icon: "fa fa-check",
            //number: ++errorCounter,
            timeout: 2000
        });
    }

    /**
     * 显示错误信息
     * @param title
     * @param content
     */
    this.showError = function (content) {
        $.bigBox({
            title: "提示",
            content: content == undefined?"操作失败":content,
            color: "#c44c06",
            icon: "fa fa-warning shake animated",
            //number: ++errorCounter,
            timeout: 3000
        });
    }
})
