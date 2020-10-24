angular.module('app.storage')
    .controller("checkModalCtrl", function($scope, $uibModalInstance,$rootScope, $filter,$http, $uibModal,foodbasicinfoService,qualitycheckService,$stateParams, APP_CONFIG, items) {
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        // 获取列表数据
        $scope.loadData = function(pageNum) {
            $http({
                method: 'GET',
                url: APP_CONFIG.qualitycheckUrl + '/qualitycheck/getThirdCheckList',
                params: {
                    pageNum : pageNum,
                    pageSize : 10,
                    //type可以取的值：0:初检 1：验收 2：春秋普查 3：出库检验 4：日常检验 5：第三方检查
                    //checktype:"5",
                    foodbasicinfoId:items.foodbasicinfoId,
                    houseId:items.houseId,
                    warehouseId:items.warehouseId
                }
            }).then(function successCallback(response) {
                // 请求成功执行代码
                $scope.pageInfo = response.data;
            }, function errorCallback(response) {
                // 请求失败执行代码
                console.log(response);
            });
        }
        // 默认执行.
        $scope.loadData(1);

        // 翻页
        $scope.goPage = function(pageNum) {
            if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
                $scope.pageInfo.pageNum = pageNum;
                $scope.loadData(pageNum);
            }
        }

        // 关闭模态窗口
        $scope.cancel = function() {
            $uibModalInstance.close();
        }

        // 选择第三方检查记录添加，
        var foodbasicinfoId = items.foodbasicinfoId;
        $scope.selectCheck = function(qualitycheck) {
            foodbasicinfoService.saveSelectcheck(qualitycheck,foodbasicinfoId,$rootScope.userInfo.orgId).then(function(data) {
                $uibModalInstance.close(qualitycheck.id);
            },function(data){
                // console.log(data);
            });
        }
    })
    .controller("actSprModalCtrl", function($scope, $uibModalInstance, $state,$filter, $http, $uibModal,qualitycheckService,$stateParams, APP_CONFIG, items) {

        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        // 获取列表数据
        $scope.loadData = function(pageNum) {
            $http({
                method: 'GET',
                url: APP_CONFIG.qualitycheckUrl + '/qualitycheck/getList',
                params: {
                    pageNum : pageNum,
                    pageSize : 10,
                    //type可以取的值：0:初检 1：验收 2：春秋普查 3：出库检验 4：日常检验 5：第三方检查
                    checktype:items.type,
                    flagType:0
                }
            }).then(function successCallback(response) {
                // 请求成功执行代码
                $scope.pageInfo = response.data;
            }, function errorCallback(response) {
                // 请求失败执行代码
                console.log(response);
            });
        }
        // 默认执行.
        $scope.loadData(1);

        // 翻页
        $scope.goPage = function(pageNum) {
            if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
                $scope.pageInfo.pageNum = pageNum;
                $scope.loadData(pageNum);
            }
        }

        // 关闭模态窗口
        $scope.cancel = function() {
            $uibModalInstance.close();
        }
        // 选择一个初检信息进行验收
        $scope.showAddAck = function (houseId,warehouseId) {
            $uibModalInstance.close();//跳转之前关闭提示框
            $state.go('app.storage.qualitycheck.ack.ackadd', {id:0,houseId:houseId,warehouseId:warehouseId,isNotEdit:false});
        }
        // 选择一个验收信息进行普查
        $scope.showAddSpr = function (houseId,warehouseId) {
            $uibModalInstance.close();//跳转之前关闭提示框
            $state.go('app.storage.qualitycheck.spr.spradd', {id:0,houseId:houseId,warehouseId:warehouseId,isNotEdit:false});
        }

    });
