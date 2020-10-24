angular.module('app.storage')
.controller("qualityDataCtrl", function($scope,$state, $http, $uibModalInstance, warehouseService, keeperService,
                                                 $rootScope, $filter, qualitycheckService, APP_CONFIG, items) {

        $scope.loadDataById = function(id) {
            qualitycheckService.loadDataById(id).then(function(data){
                $scope.qualitycheck = data;
                $scope.qualitycheck.wareHouseName = data.wareHouseName;//用于验收，春秋的回显
                $scope.qualitycheck.inspectionStandardBasis = parseInt($scope.qualitycheck.inspectionStandardBasis);
                $scope.qualitycheck.inputTime = $filter('date')($scope.qualitycheck.inputTime, "yyyy-MM-dd");
                $scope.qualitycheck.chooseTime = $filter('date')($scope.qualitycheck.chooseTime, "yyyy-MM-dd");
                $scope.qualitycheck.checkTime = $filter('date')($scope.qualitycheck.checkTime, "yyyy-MM-dd");
                $scope.qualitycheck.applyCheckTime = $filter('date')($scope.qualitycheck.applyCheckTime, "yyyy-MM-dd");
                $scope.qualitycheck.keeperAdvicesTime = $filter('date')($scope.qualitycheck.keeperAdvicesTime, "yyyy-MM-dd");
                $scope.qualitycheck.chiefAdvicesTime = $filter('date')($scope.qualitycheck.chiefAdvicesTime, "yyyy-MM-dd");
                $scope.qualitycheck.viceManagerAdvicesTime = $filter('date')($scope.qualitycheck.viceManagerAdvicesTime, "yyyy-MM-dd");
                $scope.qualitycheck.managerAdvicesTime = $filter('date')($scope.qualitycheck.managerAdvicesTime, "yyyy-MM-dd");
                $scope.qualitycheck.improveTime = $filter('date')($scope.qualitycheck.improveTime, "yyyy-MM-dd");
                $scope.qualitycheck.checkResultTime = $filter('date')($scope.qualitycheck.checkResultTime, "yyyy-MM-dd");
                $scope.change(0);//点击仓房切换货位
                $scope.edit();
            },function(data){
            });
        }

        $scope.addCheckSon = [];//用于定义保存检测信息的孩子
        //取出子表数据  根据主表id()
        // 新增或修改保管员信息跳转页面加载数据
        $scope.edit = function() {
            var qcSonId = items.id;//接收主表的id关联着子表的ktId
            qualitycheckService.findQualitycheckSonByQcSonId(qcSonId).then(function (data) {
                for (var i=0; i < data.length; i++) {
                    $scope.addCheckSon.push(angular.copy(data[i]));
                }
            })
        }

        /**
         * 级联仓房和货位号
         */
        $scope.getBasicData = function() {
            //按照单位获取单位下的仓房信息
            qualitycheckService.getStorehouseListFromBusiness().then(function(data){
                $scope.storehouseList = data.houseList;
            },function (data) {
                console.log(data);
            });
        }
        $scope.getBasicData();

        //通过仓房号，获取货位号.
        $scope.change = function (type) {
            if ($scope.qualitycheck.houseId != null && $scope.qualitycheck.houseId != undefined && $scope.qualitycheck.houseId != '') {
                warehouseService.getStorehouse($rootScope.orgInfo.orgId, $scope.qualitycheck.houseId, "0").then(function(data){
                	$scope.warehouseList = data.wareList;  //下拉列表数据
        			$scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
        	    },function(data){
        	        console.log(data);
        	    });
                if (type != 0)
                    $scope.findKeeperNames();

            } else {
                // 设置货位号为空.
                $scope.qualitycheck.warehouseId = null;
            }
        }

        //用于初检，验收，春秋普查，日常检查和第三方检查带出的保管员
        $scope.findKeeperNames = function () {
            //通过仓房号获取保管员，用于在第三方检查和日常检查中显示保管员的名字
            keeperService.getKeeperNamesByHouseId($scope.qualitycheck.houseId).then(function (data) {
                $scope.keeper = data;
                $scope.qualitycheck.keeper = $scope.keeper.keeperNames;
            }, function (data) {
                console.log(data);
            });
        }

        $scope.qualitycheck = {};
        if (items.id != 0) {//说明是的查看和修改
            $scope.loadDataById(items.id);
            //这些新增可以变动,修改不可以
            $("#houseNameDis").attr("disabled",true);
            $("#wareNameDis").attr("disabled",true);
            $("#keeps").attr("disabled",true);
        }

        $scope.isNotEdit = items.isNotEdit;

        // 关闭模态窗口
    	$scope.cancel = function() {
    		$uibModalInstance.close();
    	}

    });