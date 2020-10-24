"use strict";

/**
 * 质量诊断
 */
angular.module('app.qualityDlag')
    .controller("qualityResultCtrl", function($scope,$rootScope,$stateParams, $http, $state,qualityResultService, APP_CONFIG) {
        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.loadData = function () {
            qualityResultService.initList($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$stateParams.cameraId)
            .then(function(data){
                $scope.pageInfo = data;
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

        $scope.getPicture = function (picture) {
            if(picture == "NO"){
                $scope.picture = "styles/img/detail.png";
            }else{
                $scope.picture = picture;
            }
            $("#resultModal").modal("show");
        };

        $scope.getResultEdit = function(id){
            $state.go('app.qualityDlag.resultEdit', {id:id});
        }
        
        $scope.returnUp =function () {
            $state.go('app.qualityDlag.resultNewList',{isShow : $stateParams.isShow});
        }
    })

    //***************************************************************************************************************
    .controller("qualityResultEditCtrl", function($scope, $http,$state,$stateParams,$rootScope,qualityResultService, APP_CONFIG) {
        $scope.loadDataById = function(id) {
            qualityResultService.getResultEdit(id).then(function(data){
                $scope.resultEdit = data.list[0];
            })
        };
        $scope.loadDataById($stateParams.id);

        $scope.cancel = function(){
            $state.go('app.qualityDlag.resultList');
        }

        $scope.retList =function () {
            $rootScope.back();
        }
    });