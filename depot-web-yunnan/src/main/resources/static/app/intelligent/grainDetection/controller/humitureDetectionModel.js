"use strict";
angular.module('app.intelligent').controller("humitureDetectionModel", function ($scope, $state, $rootScope, $uibModalInstance, items, temperatureRecordService, $filter, $uibModal, keeperService, APP_CONFIG, $timeout, Word, Excel) {

    $scope.orgId = $rootScope.depotInfo.orgId;
    $scope.id = items.id;
    $scope.vCfCode = items.vCfCode; // 仓房编码
    $scope.time = items.time; // 检测时间
    $scope.intemp = items.intemp; // 仓内温
    $scope.inh = items.inh; // 仓内湿
    $scope.outtemp = items.outtemp; // 仓外温
    $scope.outh = items.outh; // 仓外湿
    $scope.max = items.max; // 最高粮温
    $scope.min = items.min; // 最低粮温
    $scope.avg = items.avg; // 平均粮温 'yyyy-MM-dd HH:mm:ss'
    $scope.tableTime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'); // 制表时间

    // 获取保管员姓名
    if (items.vCfCode !== undefined && items.vCfCode !== null && items.vCfCode !== '') {
        var storeHouseId = $rootScope.storeHouseCodeObj[items.vCfCode].storehouseId;
        keeperService.getKeeperNamesByHouseId(storeHouseId).then(function (data) {
            $scope.keeperNames = data.keeperNames;
        }, function (data) {
            console.log(data);
        });
    }

    // 合并列计算
    $scope.calculateMethod = function () {
        var tableTwo = ''; // table2 总长度
        var tableThree = ''; // table3 总长度
        var tableThree_1 = ''; // table3 单个对象 长度
        // 仓温仓湿
        $.ajax({
            type: "GET",
            dataType: "json",
            // async:true;   //异步
            async: false,  //同步
            url: APP_CONFIG.intelligentUrl + '/intelligents/temperatureRecord/findByHouseAndTime',
            data: {
                vDatatime: items.time == undefined ? "" : items.time,
                vCfCode: items.vCfCode == undefined ? "" : items.vCfCode,
                lqId: items.id
            },
            success: function (data) {
                tableTwo = data.data.length + 4;
            }
        });
        // 行/列
        $.ajax({
            type: "GET",
            dataType: "json",
            // async:true;   //异步
            async: false,  //同步
            url: APP_CONFIG.intelligentUrl + '/intelligents/temperatureRecord/findByHouseAndTimes',
            data: {
                vDatatime: items.time == undefined ? "" : items.time,
                vCfCode: items.vCfCode == undefined ? "" : items.vCfCode,
                lqId: items.id
            },
            success: function (data) { // Object.keys(detailList[0]).length
                tableThree = Object.keys(data.data[0]).length + 1;
                tableThree_1 = data.data.length;
            }
        });
        // 计算合并列
        if (tableTwo > tableThree) { // table2长
            // table1
            $scope.tableOne_1 = tableTwo - 5;
            // table3
            $scope.tableThree_1 = tableTwo - tableThree + 1;
            // forehead
            $scope.forehead = tableTwo;
        } else if (tableTwo < tableThree) { // table3长
            // table1
            $scope.tableOne_1 = tableThree - 5;
            // table3
            $scope.tableTwo_1 = tableThree - tableTwo + 1;
            // forehead
            $scope.forehead = tableThree;
        } else { // 同样长
            // table1
            $scope.tableOne_1 = tableTwo - 5;
            // forehead
            $scope.forehead = tableTwo;
        }

    };
    $scope.calculateMethod();

    // 动态表
    $scope.getDataToCFCodeAndTime = function () {
        // 仓温仓湿
        temperatureRecordService.findByHouseAndTime(items.vCfCode, items.time, items.id).then(function (data) {
            var wvl = $rootScope.warningValueList[$scope.vCfCode];
            // 动态添加html
            var dataLayerList = data.data;
            // 合并列
            if (dataLayerList != null && dataLayerList.length > 0) {
                for (var i = 0; i < dataLayerList.length; i++) {
                    var lavg = dataLayerList[i].lavg;
                    var lmax = dataLayerList[i].lmax;
                    var lmin = dataLayerList[i].lmin;
                    var aamax = $rootScope.warningValueList[$scope.vCfCode] == undefined ? "" : $rootScope.warningValueList[$scope.vCfCode].high;
                    var aamin = $rootScope.warningValueList[$scope.vCfCode] == undefined ? "" : $rootScope.warningValueList[$scope.vCfCode].low;
                    $(document).ready(function () {
                        // 第一个tr添加td
                        $("#table_5 tr").eq(0).append(
                            "<td style=\"border: 1px solid #000;text-align: center;\">"
                            + '第' + dataLayerList[i].layernumber + '层' + "</td>");
                        // 第二个tr添加td
                        // 区分250设备异常
                        if (lavg == 250) {
                            $("#table_5 tr").eq(1).append(
                                "<td style=\"border: 1px solid #000;text-align: center;\">"
                                + "<acronym title=\"设备异常\"><span style=\"color: red;\">"
                                + "<span style=\"color: red;\">" + -100 + "</span>" + "</acronym>" + "</td>");
                        } else {
                            $("#table_5 tr").eq(1).append(
                                "<td style=\"border: 1px solid #000;text-align: center;\">"
                                + lavg + "</td>");
                        }
                        // 第三个tr添加td(高温报警)
                        if (lmax >= (wvl == undefined ? 100 : wvl.high)) {
                            // 区分250设备异常
                            if (lmax == 250) {
                                $("#table_5 tr").eq(2).append(
                                    "<td style=\"border: 1px solid #000;text-align: center;\">"
                                    + "<acronym title=\"设备异常\"><span style=\"color: red;\">"
                                    + "<span style=\"color: red;\">" + -100 + "</span>" + "</acronym>" + "</td>");
                            } else {
                                $("#table_5 tr").eq(2).append(
                                    "<td style=\"border: 1px solid #000;text-align: center;\">"
                                    + "<acronym title=\"粮温高限报警为: " + aamax + "℃\">"
                                    + "<span style=\"color: red;\">" + lmax + "</span>" + "</acronym>" + "</td>");
                            }
                        } else {
                            $("#table_5 tr").eq(2).append(
                                "<td style=\"border: 1px solid #000;text-align: center;\">"
                                + lmax + "</td>");
                        }
                        // 第四个tr添加td(低温报警)
                        if (lmin == 250) { // 区分250设备异常
                            $("#table_5 tr").eq(3).append(
                                "<td style=\"border: 1px solid #000;text-align: center;\">"
                                + "<acronym title=\"设备异常\"><span style=\"color: red;\">"
                                + "<span style=\"color: red;\">" + -100 + "</span>" + "</acronym>" + "</td>");
                        } else {
                            if (lmin <= (wvl == undefined ? -1 : wvl.low)) {
                                $("#table_5 tr").eq(3).append(
                                    "<td style=\"border: 1px solid #000;text-align: center;\">"
                                    + "<acronym title=\"粮温低限报警为: " + aamin + "℃\">"
                                    + "<span style=\"color: red;\">" + lmin + "</span>" + "</acronym>" + "</td>");
                            } else {
                                $("#table_5 tr").eq(3).append(
                                    "<td style=\"border: 1px solid #000;text-align: center;\">"
                                    + lmin + "</td>");
                            }
                        }
                    });
                }
            }
        }, function (data) {
            console.log(data);
        });
        // 根-层
        temperatureRecordService.findByHouseAndTimes(items.vCfCode, items.time, items.id).then(function (data) {
            var wvl = $rootScope.warningValueList[$scope.vCfCode];
            var detailList = data.data;
            // 获取合并行数(rowspan)
            var rowSize = 0;
            for (var y = 0; y < detailList.length; y++) {
                // 判断层数
                if (detailList[y][1].substr(0, detailList[y][1].indexOf('-')) === '1') {
                    rowSize++;
                }
            }
            if (detailList != null && detailList.length > 0) {
                for (var i = 0; i < Object.keys(detailList[0]).length; i++) {
                    $(document).ready(function () {
                        // 第一个tr添加td(首行)
                        if (i == 0) {
                            $("#table_6 tr").eq(0).append(
                                "<th colspan='" + $scope.tableThree_1 + "' style=\"border: 1px solid #000;text-align: center;\">"
                                + '电缆号' + "</th>");
                            $("#table_6 tr").eq(0).append(
                                "<th style=\"border: 1px solid #000;text-align: center;\">"
                                + '层数' + "</th>");
                            return;
                        }
                        $("#table_6 tr").eq(0).append(
                            "<th style=\"border: 1px solid #000;text-align: center;\">"
                            + '第' + i + '组' + "</th>");
                    });
                }

                // 填充数据
                for (var i = 0; i < detailList.length; i++) {
                    $(document).ready(function () {
                        // 获取每一个对象
                        var obj = detailList[i];
                        // 添加tr
                        $("#table_6 thead").append("<tr></tr>");
                        // 获取第一位值(1-1,2-1,3-1...)
                        var firstIndex = obj[1];
                        if (firstIndex !== null && firstIndex !== undefined && firstIndex !== '') {
                            if (firstIndex.substr(firstIndex.indexOf('-') + 1) === '1') { // 判断是否为第一缆第一层,末尾为1的.
                                var cable = firstIndex.substr(0, firstIndex.indexOf('-')); // 如果是截取第一位为电缆号
                                // 电缆号
                                $("#table_6 tr").eq(i + 1).append(
                                    '<td rowspan="' + rowSize + '" colspan="' + $scope.tableThree_1 + '" style="border: 1px solid #000;text-align: center;">'
                                    + '第' + cable + '缆' + "</td>");
                            }
                        }
                        // tr下添加td()
                        for (var index in obj) {
                            var tier = obj[index];
                            var aamax = $rootScope.warningValueList[$scope.vCfCode] == undefined ? "" : $rootScope.warningValueList[$scope.vCfCode].high;
                            var aamin = $rootScope.warningValueList[$scope.vCfCode] == undefined ? "" : $rootScope.warningValueList[$scope.vCfCode].low;
                            // 拼接层数显示
                            if (typeof tier === 'string' && tier.indexOf('-') !== -1) {
                                tier = '第' + tier.substr(tier.indexOf('-') + 1) + '层';
                            }
                            // 高温,低温报警
                            if (tier >= (wvl == undefined ? 100 : wvl.high)) { // 高温报警
                                // 区分250设备异常
                                if (tier == 250) {
                                    $("#table_6 tr").eq(i + 1).append(
                                        "<td style=\"border: 1px solid #000;text-align: center;\">"
                                        + "<acronym title=\"设备异常\"><span style=\"color: red;\">"
                                        + "<span style=\"color: red;\">" + -100 + "</span>" + "</acronym>" + "</td>");
                                } else {
                                    $("#table_6 tr").eq(i + 1).append(
                                        "<td style=\"border: 1px solid #000;text-align: center;\">"
                                        + "<acronym title=\"粮温高限报警为: " + aamax + "℃\">"
                                        + "<span style=\"color: red;\">" + tier + "</span>" + "</acronym>" + "</td>");
                                }
                            } else if (tier <= (wvl == undefined ? -1 : wvl.low)) { // 低温报警
                                $("#table_6 tr").eq(i + 1).append(
                                    "<td style=\"border: 1px solid #000;text-align: center;\">"
                                    + "<acronym title=\"粮温低限报警为: " + aamin + "℃\">"
                                    + "<span style=\"color: red;\">" + tier + "</span>" + "</acronym>" + "</td>");
                            } else { // 正常值
                                $("#table_6 tr").eq(i + 1).append(
                                    "<td style=\"border: 1px solid #000;text-align: center;\">"
                                    + tier + "</td>");
                            }
                        }
                    });
                }
            }
        }, function (data) {
            console.log(data);
        });
    }
    ;
    $scope.getDataToCFCodeAndTime();

// 粮情趋势(图)
    $scope.vCfCodeGrainSituationTrend = function () {
        var params = [];
        params.vCfCode = items.vCfCode; // 仓房编码
        params.time = items.time; // 检测时间
        $uibModal.open({
            size: 'lg',
            templateUrl: 'app/intelligent/grainInspect/views/grainSituationTrend-model.html',
            controller: 'grainSituationTrendModelCtrl',
            resolve: {
                // 传入参数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params;
                }
            }
        });
    };
// 粮情对比
    $scope.vCfCodeGSituationComparison = function () {
        var params = [];
        params.vCfCode = items.vCfCode; // 仓房编码
        params.time = items.time; // 检测时间
        $uibModal.open({
            size: 'lg',
            templateUrl: 'app/intelligent/grainInspect/views/grainSituationComparison-model.html',
            controller: 'grainSituationComparisonModelCtrl',
            resolve: {
                // 传入参数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params;
                }
            }
        });
    };
// 所有点粮情对比
    $scope.vCfCodePointAllGrainComparison = function () {
        var params = [];
        params.vCfCode = items.vCfCode; // 仓房编码
        params.time = items.time; // 检测时间
        params.id = items.id;
        $uibModal.open({
            size: 'lg',
            templateUrl: 'app/intelligent/grainInspect/views/grainPointAllComparison-model.html',
            controller: 'grainPointAllComparisonModelCtrl',
            resolve: {
                // 传入参数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params;
                }
            }
        });
    };

// 打印
    $scope.print = function () {
        $("#print").printArea();
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
    /*$scope.exportToWord = function (tableId) {
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
                window.navigator.msSaveOrOpenBlob(blob, excelTime + '.' + 'doc');
            } else {
                // Chrome
                window.location = exportHref;
            }
        }, 100);
    };*/

// 关闭模态窗口
    $scope.cancel = function () {
        $uibModalInstance.close();
    };
})
;