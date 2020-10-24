"use strict";
angular.module('app.intelligent').controller("reportFormsListCtrl", function($scope, $state, $rootScope,$stateParams,$uibModal,temperatureRecordService,Excel,$timeout,$filter,Word) {

    // 默认分页
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    // 筛选条件
    $scope.search = {};
    // 默认报表类型
    $scope.reportForm = '';

    // 加载列表
    $scope.loadData = function() {
        temperatureRecordService.getTemperatureRecordPageInfo($scope.pageInfo, $scope.search,'0').then(function(data){
            $scope.pageInfo = data.data;
        },function(data){
            console.log(data);
        });
    };
    $scope.loadData();

    // 打印 导出PDF
    $scope.print = function() {
        $("#print").printArea();
    };

    // 清空搜索条件
    $scope.emptyCondition = function () {
        $scope.search.vCfCode = '';
        $scope.search.startTime = '';
        $scope.search.endTime = '';
        $scope.reportForm = '';
        $scope.loadData();
    };

    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

    // 导出excel
    $scope.exportToExcel = function (tableId) {
        var excelTime = $filter('date')(new Date(), "yyyyMMddhhmmss");
        var exportHref = Excel.tableToExcel(tableId, 'worksheetName');
        $timeout(function () {
            // IE
            if (window.navigator.msSaveOrOpenBlob) {
                var base64Data = atob(exportHref.split(',')[1]);
                var n = base64Data.length;
                var u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = base64Data.charCodeAt(n)
                }
                var blob = new Blob([u8arr]);
                // excel
                window.navigator.msSaveOrOpenBlob(blob, excelTime + '.' + 'xls');
            } else {
                // Chrome
                window.location = exportHref;
            }
        }, 100);
    };

    // 导出word
    $scope.exportToWord = function (tableId) {
        var excelTime = $filter('date')(new Date(), "yyyyMMddhhmmss");
        var exportHref = Word.tableToWord(tableId, 'worksheetName');
        $timeout(function () {
            // IE
            if (window.navigator.msSaveOrOpenBlob) {
                var base64Data = atob(exportHref.split(',')[1]);
                var n = base64Data.length;
                var u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = base64Data.charCodeAt(n)
                }
                var blob = new Blob([u8arr]);
                // word
                window.navigator.msSaveOrOpenBlob(blob, excelTime + '.' + 'docx');
            } else {
                // Chrome
                window.location = exportHref;
            }
        }, 100);
    };

});