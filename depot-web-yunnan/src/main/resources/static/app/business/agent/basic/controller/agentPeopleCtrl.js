"use strict";

angular.module('app.business')
    .controller("agentPeopleCtrl", function($scope, $rootScope, $http, $state, agentPeopleService, agentDepotService) {
        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.loadData = function() {
            agentPeopleService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.agentPeopleName)
            .then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log();
            });
        };
        $scope.loadData();

        //获取代储库名称
        $scope.getAgentDeoptData = function() {
            agentDepotService.getQueryAgentDepotList($rootScope.orgInfo.orgId,null).then(function(data){
                $scope.agentDepot = data;
            },function(data){
                console.log();
            });
        };
        $scope.getAgentDeoptData();

        // 新增或者修改用户信息
        $scope.showEdit = function(id,type) {
            if(id != null) {
                $state.go('app.business.agent.basic.agentPeopleEdit',{id:id,type:type});
            }else{
                $state.go('app.business.agent.basic.agentPeopleEdit');
            }
        };

        // 根据id删除信息
        $scope.remove = function(id) {
            agentPeopleService.removeById(id).then(function (data) {
                if(data.status == "success"){
                    alert("删除成功");
                    $scope.loadData();
                }else{
                    alert("删除失败");
                }
            });
        };
        // 翻页
        $scope.goPage = function(pageNum) {
            if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
                $scope.pageInfo.pageNum = pageNum;
                $scope.loadData();
            }
        };

    })
    .controller("agentPeopleSaveCtrl", function($scope, $http, $state, $stateParams, $rootScope, agentPeopleService, agentDepotService) {
        $scope.disabled = false;
        $scope.isShow = "1";
        $scope.loadDataById = function(id) {
            agentPeopleService.getAgentDite(id).then(function(data){
                $scope.agentPeopleEdit = data;
                $scope.agentPeopleEdit.orgId = $scope.agentPeopleEdit.orgId*1;
                $scope.agentPeopleEdit.gender = $scope.agentPeopleEdit.gender*1;
                $("#agentPeople-form input").attr("disabled",$scope.disabled );
                $("#agentPeople-form select").attr("disabled",$scope.disabled );
            },function(data){
                console.log();
            });
        };

        $scope.getAgentDeopt = function(id) {
            //获取代储库名称
            agentDepotService.getAgentDepotHouse("","").then(function(data){
                $scope.depotList = data.map(function(item) {
                    return {
                        depotId: item.id,
                        depotName: item.agentDepotName
                    }
                });
            },function(data){
                console.log(data);
            });
        };
        $scope.getAgentDeopt();

        if($stateParams.id != null && $stateParams.type == "edit"){//新增页面，不进行操作；//修改页面查询后台数据，并且赋值页面
            $scope.loadDataById($stateParams.id);
        }else if($stateParams.type == "detail"){//详情页面
            $scope.loadDataById($stateParams.id);
            $scope.disabled = true;
            $scope.isShow = "0";
        }

        $scope.getEmptying = function () {
            $scope.agentPeopleEdit = {};
            $state.go('app.business.agent.basic.agentPeopleList');
        };

        // 新增或修改保存数据
        var validator = $("#agentPeople-form").validate();
        $scope.saveData = function() {
            if (validator.form()) {
                var dates = angular.toJson($scope.agentPeopleEdit);
                agentPeopleService.saveAndUpdata(dates).then(function (data) {
                    if (data.status == "success") {
                        alert("保存成功");
                        $state.go('app.business.agent.basic.agentPeopleList');
                    } else {
                        alert("保存失败");
                    }
                });
            }
        };

        $scope.retList = function(){
            $rootScope.back();
        };

    });