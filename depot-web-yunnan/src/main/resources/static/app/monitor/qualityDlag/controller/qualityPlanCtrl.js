"use strict";

/**
 * 质量诊断
 */
angular.module('app.qualityDlag')
    .controller("qualityPlanCtrl", function($scope, alertService, $state,qualityPlanService, APP_CONFIG) {
        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.loadData = function () {
            qualityPlanService.initList($scope.pageInfo.pageNum, $scope.pageInfo.pageSize)
            .then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log(data);
            });
        }
        $scope.loadData();
        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }

        $scope.removeById = function (planId) {
            qualityPlanService.removeById(planId)
                .then(function (data) {
                    alertService.showSuccess("操作成功");
                    $scope.loadData();
                },function (data) {
                    console.log(data);
                })
        }
    })
    .controller("qualityPlanEditCtrl", function($scope,$state,$timeout,alertService, $stateParams,qualityPlanService, APP_CONFIG) {

        //加载当前机构下所有的分组
        $scope.loadGroupList = function () {
            qualityPlanService.loadGroupList().then(function (data) {
                $scope.groupList = data;
            },function (data) {
                console.log(data);
            });
        }
        $scope.loadGroupList();

        $scope.loadDataById = function(id) {
            $timeout(function () {
                qualityPlanService.loadDataById(id);
            },200);
        }
        if($stateParams.planId != '0'){//如果是0,则为新增事件
            // 查询详细信息byId
            qualityPlanService.loadDataById($stateParams.planId).then(function (data) {
                $scope.diagPlan = data;
                $scope.diagPlan.signals = $scope.diagPlan.signals == '1'?true:false;
                $scope.diagPlan.blur = $scope.diagPlan.blur == '1'?true:false;
                $scope.diagPlan.dark = $scope.diagPlan.dark == '1'?true:false;
                $scope.diagPlan.chroma = $scope.diagPlan.chroma == '1'?true:false;
                $scope.diagPlan.freeze = $scope.diagPlan.freeze == '1'?true:false;
                $scope.diagPlan.bright = $scope.diagPlan.bright == '1'?true:false;
                $scope.diagPlan.mono = $scope.diagPlan.mono == '1'?true:false;
                $scope.diagPlan.stripe = $scope.diagPlan.stripe == '1'?true:false;
                $scope.diagPlan.cover = $scope.diagPlan.cover == '1'?true:false;
                $scope.diagPlan.hake = $scope.diagPlan.hake == '1'?true:false;
                $scope.diagPlan.ptz = $scope.diagPlan.ptz == '1'?true:false;
                $scope.diagPlan.contrast = $scope.diagPlan.contrast == '1'?true:false;
                $scope.diagPlan.noise = $scope.diagPlan.noise == '1'?true:false;
                $scope.diagPlan.flash = $scope.diagPlan.flash == '1'?true:false;
                $scope.diagPlan.scene = $scope.diagPlan.scene == '1'?true:false;
                $(".select2").val($scope.diagPlan.groupIds).trigger("change");
            },function (data) {
                console.log(data);
            });
        }else{
            $scope.diagPlan = {};
            $scope.diagPlan.name = qualityPlanService.getNowFormatDate()+"计划";
            $scope.diagPlan.plandate = "0";
            $scope.diagPlan.type = "0";
            $scope.diagPlan.isrepeat = "0";
            //默认不选中
            $scope.diagPlan.signals = false;
            $scope.diagPlan.blur = false;
            $scope.diagPlan.dark = false;
            $scope.diagPlan.chroma = false;
            $scope.diagPlan.freeze = false;
            $scope.diagPlan.bright = false;
            $scope.diagPlan.mono = false;
            $scope.diagPlan.stripe = false;
            $scope.diagPlan.cover = false;
            $scope.diagPlan.hake = false;
            $scope.diagPlan.ptz = false;
            $scope.diagPlan.contrast = false;
            $scope.diagPlan.noise = false;
            $scope.diagPlan.flash = false;
            $scope.diagPlan.scene = false;
        }

        $scope.saveData = function () {
        	if($("#groupIds").val() == null || $("#groupIds").val() == "" || $("#groupIds").val() == undefined){
        		alert("诊断分组不能为空");
        		return false;
        	}
        	if($scope.diagPlan.type == "0"){
                if($scope.diagPlan.plandate == null || $scope.diagPlan.plandate == "" || $scope.diagPlan.plandate == undefined){
                    alert("诊断周期不能为空");
                    return false;
                }
                if($scope.diagPlan.plantime == null || $scope.diagPlan.plantime == "" || $scope.diagPlan.plantime == undefined){
                    alert("检测时间不能为空");
                    return false;
                }
                $scope.diagPlan.plantime = $scope.diagPlan.plantime.length>=8?$scope.diagPlan.plantime:$scope.diagPlan.plantime+":00";
            }else{
                $scope.diagPlan.plantime = $scope.dateTimes();
            }

            $scope.diagPlan.groupIds = $("#groupIds").val();
            qualityPlanService.saveData(angular.toJson($scope.diagPlan))
                .then(function (data) {
                alertService.showSuccess("操作成功");
                $state.go('app.qualityDlag.playList');
            },function (data) {
                console.log(data);
            })
        }

        $scope.dateTimes = function() {
            var date = new Date();
            return date.getHours()+ ":" +date.getMinutes()+ ":" +date.getSeconds();
        };
    })