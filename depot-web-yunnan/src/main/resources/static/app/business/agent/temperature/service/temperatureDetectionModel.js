"use strict";
angular.module('app.business').controller("temperatureDetectionModel", function ($scope, $state, $rootScope, $uibModalInstance, items,
                                                                                 agentTemperatureService, temperatureRecordService, $filter, keeperService, APP_CONFIG, $timeout, Word, Excel) {
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    $scope.grainStorageTemperature = {};
    // 制表时间
    $scope.tableTime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
    // 接收参数
    $scope.id = items.id;
    $scope.sign = items.sign;
    $scope.storehouseName = items.storehouseName;
    $scope.detectionTime = items.detectionTime;
    $scope.storehouseType = items.storehouseType;
    $scope.designCapacity = items.designCapacity;
    $scope.enterTime = items.enterTime;
    $scope.lspz = items.lspz;
    $scope.nature = items.nature;
    $scope.level = items.level;
    $scope.actualAmount = items.actualAmount;
    $scope.harvestYear = items.harvestYear;
    $scope.houseTemperature = items.houseTemperature;
    $scope.houseHumidity = items.houseHumidity;
    $scope.keeperNames = items.keeper;
    $scope.avg = items.avg;
    $scope.gasTemperature = items.gasTemperature;
    $scope.max = items.max;
    $scope.gasHumidity = items.gasHumidity;
    $scope.min = items.min;
    $scope.agentDepotName = items.agentDepotName;
    // id查询数据sign判断数据来源(1为代储库表手动输入或导入数据,0为智能仓房设备检测数据)
    $scope.loadDataById = function (id, sign) {
        $scope.sign = sign;
        $scope.vCfCode = items.nature;
        $scope.getDataToCFCode(id, sign);
    };

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
            async:false,  //同步
            url: APP_CONFIG.intelligentUrl + '/intelligents/temperatureRecord/findByHouseAndTime',
            data: {
                vDatatime : items.time == undefined ? "":items.time,
                vCfCode : items.vCfCode == undefined ? "":items.vCfCode,
                lqId : items.id
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
            async:false,  //同步
            url: APP_CONFIG.intelligentUrl + '/intelligents/temperatureRecord/findByHouseAndTimes',
            data: {
                vDatatime : items.time == undefined ? "":items.time,
                vCfCode : items.vCfCode == undefined ? "":items.vCfCode,
                lqId : items.id
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
            $scope.tableTwo_1 =  tableThree - tableTwo + 1;
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
    $scope.getDataToCFCode = function (id, sign) {
        // 根-层
        agentTemperatureService.findTemperById(id, sign).then(function (data) {
            var detailList = data.byIdDatas;
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
                // 获取合并行数(rowspan)
                var rowSize = 0;
                for (var y = 0; y < detailList.length; y++) {
                    // 判断层数
                    if (detailList[y][1].substr(0, detailList[y][1].indexOf('-')) === '1') {
                        rowSize++;
                    }
                }
                // 填充数据
                for (var i = 0; i < detailList.length - 1; i++) {
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
                                    '<td rowspan="' + rowSize + '" colspan="' + $scope.tableThree_1 + '"  style="border: 1px solid #000;text-align: center;">'
                                    + '第' + cable + '缆' + "</td>");
                            }
                        }
                        // tr下添加td
                        for (var index in obj) {
                            var tier = obj[index] === 250 ? '设备异常' : obj[index];
                            // 拼接层数显示
                            if (typeof tier === 'string' && tier.indexOf('-') !== -1) {
                                tier = '第' + tier.substr(tier.indexOf('-') + 1) + '层';
                            }
                            $("#table_6 tr").eq(i + 1).append(
                                "<td style=\"border: 1px solid #000;text-align: center;\">"
                                + tier + "</td>");
                        }
                    });
                }
                var rowsData = detailList[detailList.length - 1];
                for (var index in rowsData) {
                    if (rowsData[index] == rowsData.rowNumbers) {
                        break;
                    }
                    var rowData = rowsData[index].split(",");
                    var lavg = rowData[0] === 250 ? '设备异常' : rowData[0];
                    var lmax = rowData[1] === 250 ? '设备异常' : rowData[1];
                    var lmin = rowData[2] === 250 ? '设备异常' : rowData[2];
                    $(document).ready(function () {
                        // 第一个tr添加td
                        $("#table_5 tr").eq(0).append(
                            "<td style=\"border: 1px solid #000;text-align: center;\">"
                            + '第' + index + '层' + "</td>");
                        // 第二个tr添加td
                        $("#table_5 tr").eq(1).append(
                            "<td style=\"border: 1px solid #000;text-align: center;\">"
                            + lavg + "</td>");
                        // 第三个tr添加td
                        $("#table_5 tr").eq(2).append(
                            "<td style=\"border: 1px solid #000;text-align: center;\">"
                            + lmax + "</td>");
                        // 第四个tr添加td
                        $("#table_5 tr").eq(3).append(
                            "<td style=\"border: 1px solid #000;text-align: center;\">"
                            + lmin + "</td>");
                    });
                }
            }
        }, function (data) {
            console.log(data);
        });

    };
    $scope.loadDataById(items.id, 0);

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

    // 关闭模态窗口
    $scope.cancel = function () {
        $uibModalInstance.close();
    };

});