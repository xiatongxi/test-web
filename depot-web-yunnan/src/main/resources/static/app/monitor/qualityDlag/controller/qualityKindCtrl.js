"use strict";

/**
 * 质量诊断
 */
angular.module('app.qualityDlag')
    .controller("qualityKindCtrl", function($scope, $http,alertService, $state,qualityKindService, APP_CONFIG) {

        // 获取列表数据
        $scope.loadData = function () {
            qualityKindService.initList()
            .then(function(data){
                $scope.kindlist = data;
            },function(data){
                console.log(data);
            });
        };
        $scope.loadData();

        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        };

        //跳转阈值修改页面
        $scope.updateThresholdValue = function(kingid,kind,thresholdValue){
            $scope.thresholdValue = {kingid : kingid, thresholdValue : thresholdValue, kind : kind};
            $("#qualityKindModal").modal("show");
        };

        //关闭阈值修改页面
        $scope.cancel = function() {
            $("#qualityKindModal").modal("hide");
        };

        $scope.save = function(){
            qualityKindService.updateThresholdValue( $scope.thresholdValue.kingid, $scope.thresholdValue.thresholdValue)
            .then(function(data){
                if(data.status == "success"){
                    $scope.cancel();
                    $scope.loadData();
                }else{
                    alert("操作失败");
                }
            });
        };


        //一键保存
        $scope.allSave = function(){
            var val = "",indexs="";
            $("input[name=newScores]").each(function (index,e) {
                val+=$(this).val()+",";
                indexs+=(index+1)+",";
            })
            qualityKindService.allSave(val,indexs)
            .then(function(data){console.log(data);
                if(data.status == "success"){
                    alertService.showSuccess();
                }else{
                    alert("操作失败");
                }
            });
        };



    });