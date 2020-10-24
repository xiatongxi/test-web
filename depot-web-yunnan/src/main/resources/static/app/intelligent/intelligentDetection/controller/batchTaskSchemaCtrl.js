"use strict";
angular.module('app.intelligent').controller("batchTaskSchemaCtrl", function ($scope, $state, $stateParams, $rootScope, $uibModal, bathcTaskSchemaService) {

    // 默认分页
    $scope.pageInfo = {pageNum: 1, pageSize: 10};
    // 筛选条件
    $scope.search = {};

    // 加载列表
    $scope.loadData = function () {
        bathcTaskSchemaService.getTaskSchemaPageInfo($scope.pageInfo, $scope.search, $stateParams.type).then(function (data) {
            $scope.pageInfo = data.data;
        }, function (data) {
            console.log(data);
        });
    };
    $scope.loadData();

    // 新增,编辑 要检测的类型0粮温，1虫害，2气体，3能耗，4数量，5水分，6气象，7数量结果
    $scope.showEdit = function (id) {
        var type = $stateParams.type;
        if (type == '0') {
            if (0 != id && undefined != id && '' != id) {
                // 编辑
                $state.go('app.intelligent.intelligentDetection.grain.edit', {id: id});
            } else {
                // 新增
                $state.go('app.intelligent.intelligentDetection.grain.edit', {id: 0});
            }
        } else if (type == '1') {
            if (0 != id && undefined != id && '' != id) {
                // 编辑
                $state.go('app.intelligent.intelligentDetection.insect.edit', {id: id});
            } else {
                // 新增
                $state.go('app.intelligent.intelligentDetection.insect.edit', {id: 0});
            }
        } else if (type == '2') {
            if (0 != id && undefined != id && '' != id) {
                // 编辑
                $state.go('app.intelligent.intelligentDetection.gas.edit', {id: id});
            } else {
                // 新增
                $state.go('app.intelligent.intelligentDetection.gas.edit', {id: 0});
            }
        } else if (type == '3') {
            if (0 != id && undefined != id && '' != id) {
                // 编辑
                $state.go('app.intelligent.intelligentDetection.energy.edit', {id: id});
            } else {
                // 新增
                $state.go('app.intelligent.intelligentDetection.energy.edit', {id: 0});
            }
        }else if (type == '4'){
            if (0 != id && undefined != id && '' != id) {
                // 编辑
                $state.go('app.intelligent.intelligentDetection.number.edit', {id: id});
            } else {
                // 新增
                $state.go('app.intelligent.intelligentDetection.number.edit', {id: 0});
            }
        }else if (type == '5'){
            if (0 != id && undefined != id && '' != id) {
                // 编辑
                $state.go('app.intelligent.intelligentDetection.dew.edit', {id: id});
            } else {
                // 新增
                $state.go('app.intelligent.intelligentDetection.dew.edit', {id: 0});
            }
        }else if (type == '6'){
            if (0 != id && undefined != id && '' != id) {
                // 编辑
                $state.go('app.intelligent.intelligentDetection.meteorology.edit', {id: id});
            } else {
                // 新增
                $state.go('app.intelligent.intelligentDetection.meteorology.edit', {id: 0});
            }
        }else if (type == '7'){
            if (0 != id && undefined != id && '' != id) {
                // 编辑
                $state.go('app.intelligent.intelligentDetection.numberResult.edit', {id: id});
            } else {
                // 新增
                $state.go('app.intelligent.intelligentDetection.numberResult.edit', {id: 0});
            }
        }
    };

    //启用,关闭
    $scope.showSwitch = function (taskSchema) {
        taskSchema.tUpdateTime = null;
        if (taskSchema.tSwitch == '0') {
            if (!confirm('执行开启任务,请确认')) {
                return;
            }
            // 更新为 1
            taskSchema.tSwitch = '1';
            bathcTaskSchemaService.saveData(taskSchema).then(function (data) {
                if (data.retCode == "200") {
                    alert("开启任务成功");
                    $scope.loadData();
                } else {
                    alert("开启任务失败");
                }
            });
        } else {
            // 更新为 0
            if (!confirm('执行关闭任务,请确认')) {
                return;
            }
            taskSchema.tSwitch = '0';
            bathcTaskSchemaService.saveData(taskSchema).then(function (data) {
                if (data.retCode == "200") {
                    alert("关闭任务成功");
                    $scope.loadData();
                } else {
                    alert("关闭任务失败");
                }
            });
        }
    };

    // 检测列表
    $scope.showGrainDetectionList = function (vCfCode) {
        // 初始参数
        var params = [];
        params.vCfCode = vCfCode;
        $uibModal.open({
            size: 'sm',
            templateUrl: 'app/intelligent/intelligentDetection/views/batchDetectionList-modal.html',
            controller: 'batchDetectionListModalCtrl',
            resolve: {
                // 传入参数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params;
                }
            }
        });
    };
    // 检测过程记录
    $scope.showProcessDetectionList = function (tid) {
        var type = $stateParams.type;
        // 初始参数
        var params = [];
        params.tid = tid;
        params.type = type;
        $uibModal.open({
            size: 'lg',
            templateUrl: 'app/intelligent/intelligentDetection/views/showProcessDetectionList-modal.html',
            controller: 'showProcessDetectionListModalCtrl',
            resolve: {
                // 传入参数
                items: function () {
                    // 这个值会被模态框的控制器获取到
                    return params;
                }
            }
        });
    };
    // 任务详情
    /*$scope.showTaskDetails = function () {

    };*/
    // 删除
    $scope.showDelete = function (id) {
        if (!confirm("确定要删除吗？")) {
            return;
        }
        bathcTaskSchemaService.deleteById(id).then(function (data) {
            if (data.retCode == '200') {
                alert("删除成功！");
                $scope.loadData();
            } else {
                alert(data.message);
            }
        });
    };
    // 翻页
    $scope.goPage = function (pageNum) {
        if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }
    };

    // 清空搜索条件
    $scope.empty = function () {
        $scope.search.tState = '';
        $scope.search.tName = '';
        $scope.loadData();
    };

})

    .controller("batchTimingTaskSaveCtrl", function ($scope, $state, $rootScope, bathcTaskSchemaService, $stateParams,$filter) {

        $scope.taskSchema = {};
        // 时间
        $scope.taskTime = {tTime: '12:30:00'};
        // 周
        $scope.week = {};
        // 月
        $scope.day = {};
        // 年
        $scope.year = {};

        //全选
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
        });

        // 动态表格
        var y = 1;
        for (var i = 0; i < $rootScope.storelist.length; i++) {
            if (i != 0) {
                if (!(i % 10 == 0)) {
                    $('#table_1 tbody tr').eq(y).append(
                        "<td width='100px' style='border-right-width: 1px;border-bottom-width: 1px;'><input type='checkbox' name='p.cfCode' value='"
                        + $rootScope.storelist[i].storehouseCode + "'/>"
                        + $rootScope.storelist[i].storehouseName
                        + "</td>"
                    );
                } else {
                    $('#table_1 tbody').append(
                        "<tr>" + "</tr>"
                    );
                    y++;
                    $('#table_1 tbody tr').eq(y).append(
                        "<td width='100px' style='border-right-width: 1px;border-bottom-width: 1px;'><input type='checkbox' name='p.cfCode' value='"
                        + $rootScope.storelist[i].storehouseCode + "'/>"
                        + $rootScope.storelist[i].storehouseName
                        + "</td>"
                    );
                }
            } else {
                $('#table_1 tbody tr').eq(y).append(
                    "<td width='100px' style='border-right-width: 1px;border-bottom-width: 1px;'><input type='checkbox' name='p.cfCode' value='"
                    + $rootScope.storelist[i].storehouseCode + "'/>"
                    + $rootScope.storelist[i].storehouseName
                    + "</td>"
                );
            }
        }

        // 返回,取消
        $scope.retList = function () {
            var type = $stateParams.type;
            if (type == '0') {
                if ($rootScope.previousState_name != '') {
                    $rootScope.back();
                } else {
                    $state.go("app.intelligent.intelligentDetection.grain");
                }
            } else if (type == '1') {
                if ($rootScope.previousState_name != '') {
                    $rootScope.back();
                } else {
                    $state.go("app.intelligent.intelligentDetection.insect");
                }
            } else if (type == '2') {
                if ($rootScope.previousState_name != '') {
                    $rootScope.back();
                } else {
                    $state.go("app.intelligent.intelligentDetection.gas");
                }
            } else if (type == '3') {
                if ($rootScope.previousState_name != '') {
                    $rootScope.back();
                } else {
                    $state.go("app.intelligent.intelligentDetection.energy");
                }
            }else if (type == '4'){
                if ($rootScope.previousState_name != '') {
                    $rootScope.back();
                } else {
                    $state.go("app.intelligent.intelligentDetection.number");
                }
            }else if (type == '5'){
                if ($rootScope.previousState_name != '') {
                    $rootScope.back();
                } else {
                    $state.go("app.intelligent.intelligentDetection.dew");
                }
            }else if (type == '6'){
                if ($rootScope.previousState_name != '') {
                    $rootScope.back();
                } else {
                    $state.go("app.intelligent.intelligentDetection.meteorology");
                }
            }else if (type == '7'){
                if ($rootScope.previousState_name != '') {
                    $rootScope.back();
                } else {
                    $state.go("app.intelligent.intelligentDetection.numberResult");
                }
            }
        };

        // 时分秒 PM 下午,AM 上午
        $('#basicExample .time').timepicker({
            defaultTime: '12:30:00', // 默认时间
            showMeridian: false, // 设置显示24小时
            showSeconds: true, // 显示秒
            timeFormat: 'HH:mm:ss' // 格式化时间
        });

        // 可选择设置
        $scope.setOptional = function () {
            // 每小时 不显示任何内容
            if ($scope.taskSchema.tDetectionDesc == '' || $scope.taskSchema.tDetectionDesc == undefined) {
                $scope.isHour = true; // 每小时
                $scope.isWeek = true; // 每周
                $scope.isMonth = true; // 每月
                $scope.isYear = true; // 每年
            } else if ($scope.taskSchema.tDetectionDesc == '每小时') { // 每小时
                $scope.isHour = true; // 每小时
                $scope.isWeek = true; // 每周
                $scope.isMonth = true; // 每月
                $scope.isYear = true; // 每年
            } else if ($scope.taskSchema.tDetectionDesc == '每天') { // 每天
                $scope.isHour = false; // 每小时
                $scope.isWeek = true; // 每周
                $scope.isMonth = true; // 每月
                $scope.isYear = true; // 每年
            } else if ($scope.taskSchema.tDetectionDesc == '每周') { // 每周
                $scope.isHour = false; // 每小时
                $scope.isWeek = false; // 每周
                $scope.isMonth = true; // 每月
                $scope.isYear = true; // 每年
            } else if ($scope.taskSchema.tDetectionDesc == '每月') { // 每月
                $scope.isHour = false; // 每小时
                $scope.isWeek = true; // 每周
                $scope.isMonth = false; // 每月
                $scope.isYear = true; // 每年
            } else if ($scope.taskSchema.tDetectionDesc == '每年') { // 每年
                $scope.isHour = false; // 每小时
                $scope.isWeek = true; // 每周
                $scope.isMonth = true; // 每月
                $scope.isYear = false; // 每年
            }
        };
        $scope.setOptional();

        // 修改
        $scope.loadDataById = function (tId) {
            bathcTaskSchemaService.loadDataById(tId).then(function (data) {
                $scope.taskSchema = data.data;
                var tDetectionDesc = $scope.taskSchema.tDetectionDesc; // 表达式描述
                var tSwitch = $scope.taskSchema.tSwitch; // 是否开启标记(开关标记)
                var vCfCode  = $scope.taskSchema.vCfCode; // 仓房字符串
                if(tDetectionDesc.indexOf("时") !== -1){ // 每小时回显
                    $scope.taskSchema.tDetectionDesc = '每小时';
                    $("input[type=radio][name='p.reportTag'][value='"+tSwitch+"']").attr("checked",'checked'); // 是否开启回显
                    $scope.setOptional();
                } else if (tDetectionDesc.indexOf("天") !== -1) { // 每天回显
                    $scope.taskSchema.tDetectionDesc = '每天';
                    $scope.taskTime.tTime = tDetectionDesc.substring(2,tDetectionDesc.length - 2);
                    $("input[type=radio][name='p.reportTag'][value='"+tSwitch+"']").attr("checked",'checked'); // 是否开启回显
                    $scope.setOptional();
                } else if (tDetectionDesc.indexOf("周") !== -1) { // 每周回显
                    $scope.taskSchema.tDetectionDesc = '每周';
                    $scope.taskTime.tTime = tDetectionDesc.substring(tDetectionDesc.indexOf("的") + 1,tDetectionDesc.length - 2); // 每周时间回显
                    $("input[type=radio][name='p.reportTag'][value='"+tSwitch+"']").attr("checked",'checked'); // 是否开启回显
                    var weeks = tDetectionDesc.substring(2,tDetectionDesc.indexOf("的")).split(','); // 获取星期
                    $.each(weeks, function(index, week){ // 循环获取到的星期
                        $.each($("input:checkbox[name='p.weeks']"),function (i,checkbox) { // i,checkbox用于测试查看数据
                            if($(this).val() == week) { // 判断html中的星期value和后端获取的星期是否一致
                                $(this).prop("checked",true); // 一致设置已选中
                            }
                        });
                    });
                    $scope.setOptional();
                } else if (tDetectionDesc.indexOf("月") !== -1) { // 每月回显
                    $scope.taskSchema.tDetectionDesc = '每月';
                    $("input[type=radio][name='p.reportTag'][value='"+tSwitch+"']").attr("checked",'checked'); // 是否开启回显
                    $scope.taskTime.tTime = tDetectionDesc.substring(tDetectionDesc.indexOf("号") + 1,tDetectionDesc.length - 2); // 每月时间回显
                    // 月日期回显 p.days
                    var days = tDetectionDesc.substring(2,tDetectionDesc.indexOf("号")).split(','); // 获取日期
                    $.each(days, function(index, day){ // 循环获取到的星期
                        $.each($("input:checkbox[name='p.days']"),function () {
                            if($(this).val() == day) { // 判断html中的星期value和后端获取的星期是否一致
                                $(this).prop("checked",true); // 一致设置已选中
                            }
                        });
                    });
                    $scope.setOptional();
                } else if (tDetectionDesc.indexOf("年") !== -1) { // 每年回显
                    $scope.taskSchema.tDetectionDesc = '每年';
                    $("input[type=radio][name='p.reportTag'][value='"+tSwitch+"']").attr("checked",'checked'); // 是否开启回显
                    // 每年日期回显 $filter('date')($scope.year.months, "MM-dd");
                    $scope.year.months = tDetectionDesc.substring(2,tDetectionDesc.indexOf("号"));
                    $scope.taskTime.tTime = tDetectionDesc.substring(tDetectionDesc.indexOf("号") + 1,tDetectionDesc.length - 2); // 每年时间回显
                    $scope.setOptional();
                }
                // 回显仓房列表 p.cfCode
                var cfCodes = vCfCode.split(",");
                $.each(cfCodes, function(index, code){ // 循环获取到的仓房编码
                    $.each($("input:checkbox[name='p.cfCode']"),function () {
                        if($(this).val() == code) { // 判断html中的仓房编码和后端获取的仓房编码是否一致
                            $(this).prop("checked",true); // 一致设置已选中
                        }
                    });
                });
            }, function (data) {
                console.log(data);
            });
        };
        if ($stateParams.id != 0) { // 修改
            $scope.loadDataById($stateParams.id);
        }

        // 校验
        var validator = $("#timingTask-form").validate();

        // 保存,修改
        $scope.save = function () {
            // 计划检测时间描述
            if ($scope.taskSchema.tDetectionDesc === '' || $scope.taskSchema.tDetectionDesc === undefined) {
                alert('请选择任务触发时间!');
                return;
            }
            // 拼接cron表达式
            var HhMmSs = $scope.taskTime.tTime.split(':'); // 拼接
            if (!$scope.isYear) { // 每年
                var month = $scope.year.months.substring(5, 7); // 截取月
                var day = $scope.year.months.substring(8, 10); // 截取日
                $scope.taskSchema.tDetectionCron = HhMmSs[2] + ' ' + HhMmSs[1] + ' ' + HhMmSs[0] + ' ' + day + ' ' + month + ' ?';
                // 计划检测时间描述
                $scope.taskSchema.tDetectionDesc += month + ':' + day + '号' + $scope.taskTime.tTime + '执行';
            } else if (!$scope.isMonth) { // 每月
                var days = '';
                $("#month").ready(function () {
                    //被选中的checkbox
                    $.each($('input:checkbox[name="p.days"]:checked'), function () {
                        days += $(this).val() + ',';
                    });
                });
                var lastDays = days.substring(0, days.length - 1);
                $scope.taskSchema.tDetectionCron = HhMmSs[2] + ' ' + HhMmSs[1] + ' ' + HhMmSs[0] + ' ' + lastDays + ' * ?';
                // 计划检测时间描述
                $scope.taskSchema.tDetectionDesc += lastDays + '号' + $scope.taskTime.tTime + '执行';
            } else if (!$scope.isWeek) { // 每周
                var weeks = ''; // 中国周描述
                var CWeeks = ''; // cron公历周使用
                $("#checkbox").ready(function () {
                    //被选中的checkbox
                    $.each($('input:checkbox[name="p.weeks"]:checked'), function () {
                        // 转换为国际周
                        var CWeek = parseInt($(this).val());
                        if (CWeek === 7) { // 7为国际公历每周第一天
                            CWeek = 1;
                        } else { // 其它为(周+1)
                            CWeek = CWeek + 1;
                        }
                        CWeeks += CWeek + ',';
                        // 中国周描述
                        weeks += $(this).val() + ',';
                    });
                });
                var subCWeeks = CWeeks.substring(0, CWeeks.length - 1);
                // cron
                $scope.taskSchema.tDetectionCron = HhMmSs[2] + ' ' + HhMmSs[1] + ' ' + HhMmSs[0] + ' ? * ' + subCWeeks;
                // 计划检测时间描述
                var lastWeeks = weeks.substring(0, weeks.length - 1);
                $scope.taskSchema.tDetectionDesc += lastWeeks + '的' + $scope.taskTime.tTime + '执行';
            } else if (!$scope.isHour) { // 每天
                // cron表达式(每天设置时分秒执行一次)
                $scope.taskSchema.tDetectionCron = HhMmSs[2] + ' ' + HhMmSs[1] + ' ' + HhMmSs[0] + ' * * ?';
                // 计划检测时间描述
                $scope.taskSchema.tDetectionDesc += $scope.taskTime.tTime + '执行';
            } else { // 每小时
                // cron表达式(每小时执行一次)
                $scope.taskSchema.tDetectionCron = '0 0 * * * ?';
                // 计划检测时间描述
                $scope.taskSchema.tDetectionDesc += '执行';
            }
            // 仓房编码
            var cfCode = '';
            $("#box").ready(function () {
                //被选中的checkbox
                $.each($('input:checkbox[name="p.cfCode"]:checked'), function () {
                    cfCode += $(this).val() + ',';
                });
            });
            $scope.taskSchema.vCfCode = cfCode.substring(0, cfCode.length - 1);
            // 是否开启
            $scope.taskSchema.tSwitch = $('input[name="p.reportTag"]:checked').val();
            // 创建人
            $scope.taskSchema.tUpdatePerson = $rootScope.userInfo.realName;
            // 调用保存,修改接口
            if (validator.form()) {
                $scope.taskSchema.tCategory = $stateParams.type;
                // 提交 库点orgid
                $scope.taskSchema.orgId = $rootScope.depotInfo.orgId;
                $scope.taskSchema.tUpdateTime = null;
                bathcTaskSchemaService.saveData($scope.taskSchema).then(function (data) {
                    if (data.retCode == '200' && data.message == 'success') {
                        alert("保存成功");
                        $scope.retList();
                    } else {
                        alert("保存失败");
                    }
                });
            }
        }

    });