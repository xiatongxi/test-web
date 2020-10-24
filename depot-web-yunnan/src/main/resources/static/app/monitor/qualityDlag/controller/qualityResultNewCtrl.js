"use strict";

/**
 * 质量诊断
 */
angular.module('app.qualityDlag')
    .controller("qualityResultNewCtrl", function($scope,$rootScope,$stateParams, $http, $state,qualityResultNewService, APP_CONFIG) {
        $scope.isShow = $stateParams.isShow;
        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.loadData = function () {
            qualityResultNewService.initList($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.cameraName)
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

        $scope.getCameraResultList = function(cameraId){
            $state.go('app.qualityDlag.resultList',{isShow:$stateParams.isShow,cameraId:cameraId});
        }

        $scope.returnUp =function () {
            if($stateParams.isShow == "1"){
                $state.go('app.supervise.cameraPT');
            }
            if($stateParams.isShow == "2"){
                $state.go('app.dashboard');
            }
        }
    })
