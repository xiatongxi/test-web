"use strict";
angular.module('app.intelligent').controller("selectStationTypeModalCtrl", function ($scope, $state, $rootScope, $uibModalInstance, $timeout) {
    // 类型
    $timeout(function () {
        // var stationType = ['', '液位', '粮情', '油情', '空调', '能耗', '照明', '制氮', '虫情', '气象站', '通风控制', '气体检测', '氮气气调', '数量检测', '多通道气体'];
        var stationTypes = $rootScope.stationType.list;
        var stationType = [''];
        for (var i = 0; i < stationTypes.length; i++) {
            stationType.push(stationTypes[i].vZdTypeName);
        }
        var y = 1;
        for (var i = 1; i < stationType.length; i++) {
            if (i % 3 != 0) {
                $('#table_1 tbody tr').eq(y).append(
                    "<td width='100px' style='border-right-width: 1px;border-bottom-width: 1px;'><input type='checkbox' name='p.sType' value='"
                    + stationType[i] + "'/>"
                    + stationType[i]
                    + "</td>"
                );
            } else {
                $('#table_1 tbody tr').eq(y).append(
                    "<td width='100px' style='border-right-width: 1px;border-bottom-width: 1px;'><input type='checkbox' name='p.sType' value='"
                    + stationType[i] + "'/>"
                    + stationType[i]
                    + "</td>"
                );

                $('#table_1 tbody').append(
                    "<tr>" + "</tr>"
                );
                y++;
            }
        }
    }, 1);

    // 选择.
    $scope.select = function () {
        var days = '';
        $("#box").ready(function () {
            //被选中的checkbox
            $.each($('input:checkbox[name="p.sType"]:checked'), function () {
                days += '/' + $(this).val();
            });
        });
        $uibModalInstance.close(days);
    };

    // 关闭模态窗口
    $scope.cancel = function () {
        $uibModalInstance.close();
    };

    /*//全选
    $('#allChecked').change(function () {
        $('#box tr td').children(':checkbox').prop('checked', $(this).is(':checked') ? true : false);
    });

    //反选
    $('#invertChecked').change(function () {
        if ($(this).is(':checked')) {
            $('#box tr td').children(':checkbox').each(function () {
                $(this).prop('checked', $(this).is(':checked') ? false : true);
            });
        }
    });

    //全不选
    $('#orChecked').change(function () {
        $('#box tr td').children(':checkbox').prop('checked', false);
    });*/

});