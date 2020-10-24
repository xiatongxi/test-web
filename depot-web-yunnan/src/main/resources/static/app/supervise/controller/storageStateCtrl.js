"use strict";

angular.module('app.supervise')
    .controller("storageStateListCtrl", function($scope, $rootScope, $state, StorehouseService) {

        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.store = "";
        var depotId = $rootScope.depotInfo.orgId;

        //默认不是代储点仓房信息
        var libraryType = '0';

        $scope.loadData = function() {
            StorehouseService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.store.storehouseId, $rootScope.orgInfo.orgId, libraryType).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log(data);
            });

            // 获取仓房列表
            StorehouseService.getStorehouseList(depotId, "0").then(function(data){
                $scope.storehouseList = data.houseList;
            },function(data){
                console.log(data);
            });
        }
        $scope.loadData();

        // 新增或修改跳转
        $scope.add = function(id) {
            $state.go('app.supervise.storageStateEdit',{id:id, orgId:$rootScope.orgInfo.orgId});
        }

        // 翻页
        $scope.goPage = function(pageNum) {
            if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
                $scope.pageInfo.pageNum = pageNum;
                $scope.loadData();
            }
        }
    })
.controller("storageStateEditCtrl", function($scope, $stateParams, $state, $filter, $rootScope, StorehouseService,
             temperatureRecordService, kcswService, crkRecordService, warehouseService, gasDetectionPlanService, fumigationPlanService) {
    // 查看用户信息
    $scope.edit = function() {
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.searchCondition = {houseId : $stateParams.id, warehouseId : ""};
        //按照单位获取单位下的仓房信息
        var depotId = $rootScope.orgInfo.orgId;
        warehouseService.getStorehouse(depotId, $scope.searchCondition.houseId).then(function(data){
            $scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
        },function (data) {
            console.log(data);
        });

        StorehouseService.findByStorehouse($stateParams.id, $stateParams.orgId).then(function(data){
            $scope.storehouse = data;
            //判断如果是代储库新增则默认输入登陆用户库名。
            // $scope.storehouse.depotName = $rootScope.depotInfo.orgName;
            // document.getElementsByName("depotName").readOnly = true;
            $scope.storehouse.usedate = $filter('date')($scope.storehouse.usedate, "yyyy-MM-dd");

            //获取仓房ID对应的仓房编号
            $scope.search.vCfCode = $scope.storehouse.storehouseCode;

            //查询粮温情况
            temperatureRecordService.getTemperatureRecordPageInfo($scope.pageInfo, $scope.search).then(function(data){
                $scope.temperature = data.data;
            },function(data){
                console.log(data);
            });

            //气体浓度情况------------------------------------------------------------------------------
            gasDetectionPlanService.getGasDetectionPageInfo($scope.pageInfo, $scope.search).then(function(data){
                $scope.gas = data.data;
            },function(data){
                console.log(data);
            });
        },function(data){
            console.log(data);
        });

        //数量管理-------------------------------------------------------------------------------
        $scope.kcswStr = {ch : $stateParams.id, hwh : null, unitid : $rootScope.orgInfo.orgId};
        kcswService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.kcswStr).then(function(data){
            $scope.numbermanage = data;
        },function(data){
            console.log(data);
        });

        //火车出入库管理---------------------------------------------------------------------------
        $scope.search = {storehouseId:$stateParams.id, warehouseId:"", cazylx:"", pz:"", beginDate:"", endDate:""};
        crkRecordService.getHcPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.search).then(function(data){
            $scope.hcData = data;
        },function(data){
            console.log(data);
        });
        //汽车出入库管理---------------------------------------------------------------------------
        crkRecordService.getQcPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.search).then(function(data){
            $scope.qcData = data;
        },function(data){
            console.log(data);
        });

        //作业状态----------------------------------------------------------------------------------
        fumigationPlanService.getPlanQueryList($scope.pageInfo, $stateParams.id, $stateParams.orgId).then(function(data){
            $scope.planQuery = data;
        },function(data){
            console.log(data);
        });
    };
    $scope.edit();

    $scope.returnTop = function() {
        $rootScope.back();
    }
});