"use strict";

angular.module('app.synth').controller("lifecycleCtrl", function($scope,$rootScope, $http, $state, $filter, $stateParams,
                                    sheetService, StorehouseService, warehouseService, enumService,kcswService) {
    // 粮食安全追溯
    $scope.loadDataSelect = function() {
        $scope.getBasicData();
        /* 先拿到库存实物表的数据 */
        var serchCh = null;
        var serchHwh = null;
        if (undefined != $scope.searchCondition) {
            if (undefined != $scope.searchCondition.houseId) {
                serchCh = $scope.searchCondition.houseId;
            }
            if (undefined != $scope.searchCondition.warehouseId) {
                serchHwh = $scope.searchCondition.warehouseId;
            }
            $scope.kcswStr = {ch : serchCh, hwh : serchHwh, unitid : $rootScope.orgInfo.orgId};
        } else {
            $scope.kcswStr = {ch : null, hwh : null, unitid : $rootScope.orgInfo.orgId};
        }


        //判断是否是识别码页面过来
        $scope.isShow = "0";
        if($stateParams.idCode != null && $stateParams.idCode != ""){
            $scope.isShow = "1";
            var houseList = $rootScope.storelist;
            for (var i = 0; i < houseList.length; i++) {
                if(houseList[i].storehouseCode == $stateParams.idCode){
                    $scope.kcswStr.ch = houseList[i].storehouseId;
                }
            }
        }

        /* 分页信息 */
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        kcswService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.kcswStr).then(function(data){
            if($stateParams.idCode != null && $stateParams.idCode != "" && data.size == 0){
                alert("此唯一识别码不正确或没有数据！");
                $state.go("app.synth.identifyCode");
            }else{
                $scope.pageInfo = data;
            }
        },function(data){
            console.log(data);
        });
    };

    $scope.getBasicData = function() {
        //按照单位获取单位下的仓房信息
        var depotId = $rootScope.orgInfo.orgId;
        StorehouseService.getStorehouseList(depotId, "0").then(function(data){
            $scope.storehouseList = data.houseList;
            $scope.storehouseObj = data.houseObj;
        },function (data) {
            console.log(data);
        });
        var depotId = $rootScope.depotInfo.orgId;
        var cfh = '';
        warehouseService.getStorehouse(depotId,cfh, "0").then(function(data){
            $scope.warehouseList = data.houseList;  //下拉列表数据
            $scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
        },function (data) {
            console.log(data);
        });
    };

    // 仓房列表
    $scope.loadStore = function() {
        $scope.getBasicData();
        StorehouseService.getStorehouseList($rootScope.orgInfo.orgId, "0").then(function(data){
            $scope.storelist = data.houseList;
        },function(data){
            console.log(data);
        });
    };

    $scope.loadDataSelect();
    $scope.loadStore();

    // 货位列表
    $scope.loadWare = function() {
        warehouseService.getStorehouse($rootScope.orgInfo.orgId, $scope.searchCondition.houseId, "0").then(function(data){
            $scope.warelist = data.wareList;
        },function(data){
            console.log(data);
        });
    };

    $scope.searchCondition = {};

    //清空
    $scope.clearConditions = function() {
        $scope.searchCondition = {};
        $scope.loadData();
    };

    // 分页相关方法.
    $scope.go_pages = function(type, pageNum, pageSize, pages) {
        var pageNumC = pageNum;
        if (type == 'previousPage') {
            if (pageNum <= 1) {
                return;
            }
            pageNumC = pageNum - 1
        } else if (type == 'nextPage') {
            if (pageNum >= pages) {
                return;
            }
            pageNumC = pageNum + 1
        } else if (type == 'firstPage') {
            if (pageNum == 1) {
                return;
            }
            pageNumC = 1;
        } else if (type == 'lastPage') {
            if (pageNum == pages) {
                return;
            }
            pageNumC = pages;
        }
        $scope.loadData = function() {
            kcswService.getPageInfo(pageNumC, pageSize,$scope.kcswStr).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                //console.log(data);
            });
        };
        $scope.loadData();
    };

    // 改变页码.
    $scope.change_pageSize = function(pageSizeChange) {
        $scope.loadData = function() {
            kcswService.getPageInfo(1, pageSizeChange,$scope.kcswStr).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                //console.log(data);
            });
        };
        $scope.loadData();
    };

    // 入库明细(默认进入火车入库列表)
    $scope.showIncomeWarehouseDetail = function (numbermanage) {
        $state.go('app.synth.lifecycle.incomeWarehouseTrain',{type:'hc',houseId:numbermanage.ch,warehouseId:numbermanage.hwh,isShowReturn:'lifecycle'});
    };

    // 质检信息
    $scope.showQualityCheckInfo = function (numbermanage) {
        $state.go('app.synth.lifecycle.qualityCheck',{houseId:numbermanage.ch,warehouseId:numbermanage.hwh,isShowReturn:'lifecycle'});
    };

    // 粮情信息
    $scope.showGrainAnalysisInfo = function (numbermanage) {
    	var ch = $rootScope.storehouseObj[numbermanage.ch].storehouseCode;
    	$state.go('app.storage.safeproduce.safeCheck.ttplist',{houseId:ch});
    };

    // 作业记录
    $scope.showJobRecord = function (numbermanage) {
        $state.go('app.synth.lifecycle.jobRecord',{houseId:numbermanage.ch,isShowReturn:'lifecycle'});
    };

    // 出库明细
    $scope.showOutWarehouseDetail = function (numbermanage) {
        $state.go('app.synth.lifecycle.outWarehouseTrain',{type:'hc',houseId:numbermanage.ch,warehouseId:numbermanage.hwh,isShowReturn:'lifecycle'});
    }

});