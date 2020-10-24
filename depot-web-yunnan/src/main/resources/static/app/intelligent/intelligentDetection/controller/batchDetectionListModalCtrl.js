"use strict";
angular.module('app.intelligent').controller("batchDetectionListModalCtrl", function ($scope, $state, $rootScope, $uibModalInstance, items, $timeout) {

    $timeout(function () {
        // 解析vCfCode
        var vCfCodeS = [];
        if (items != null) {
            vCfCodeS = items.vCfCode.split(',');
            var y = 0;
            for (var i = 0; i < vCfCodeS.length; i++) {
                if (i % 3 === 0) {
                    $('#table_1 tbody').append("<tr></tr>");
                    y++;
                }
                $('#table_1 tbody tr').eq(y).append(
                    "<td style='text-align:center;'>"
                    + $rootScope.storeHouseCodeObj[vCfCodeS[i]].storehouseName
                    + "</td>"
                );
                if (i == vCfCodeS.length - 1) {
                    if (vCfCodeS.length % 3 == 1) {
                        $('#table_1 tbody tr').eq(y).append(
                            "<td style='text-align:center;'></td>"
                            + "<td style='text-align:center;'></td>"
                        );
                    } else if (vCfCodeS.length % 3 == 2) {
                        $('#table_1 tbody tr').eq(y).append(
                            "<td style='text-align:center;'></td>"
                        );
                    }
                }
            }
        }
    }, 1);

    // 关闭模态窗口
    $scope.cancel = function () {
        $uibModalInstance.close();
    };

});