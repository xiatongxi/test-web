"use strict";
angular.module('app.system')
    .controller("homeworkCtrl", function($scope,$rootScope,$filter,$state,$compile,$timeout,$interval,alertService, $http,ptService, APP_CONFIG) {
        $scope.getIndex = function () {
            ptService.getIndex("3.1").then(function(data){//通风
                $scope.tfData = data;
            });
            ptService.getIndex("3.2").then(function (data) {//熏蒸
                $scope.xzData = data;
            });
            ptService.getIndex("3.3").then(function (data) {//入库
                $scope.rkData = data;
            });
            ptService.getIndex("3.4").then(function (data) {//出库
                $scope.ckData = data;
            });
        };
        $scope.getIndex();
        $scope.getJobDate = function(type,id,process_instance_id) {
            if (type == "3.1") {
                $state.go("app.storage.taskDispatch.aerationSummaryList",{id : id,homePage : "SY"});
            } else if (type == "3.2") {
                $state.go("app.intelligent.fumigation.fumigationList",{id : id,homePage : "SY"});
            }else if (type == "3.3") {
                $state.go("app.supervise.operation.truckList",{id:id,states:"1",homePage:"SY"});
            } else if (type == "3.4") {
                $state.go("app.supervise.operation.truckList",{id:id,states:"3",homePage:"SY"});
            }
        }
    });