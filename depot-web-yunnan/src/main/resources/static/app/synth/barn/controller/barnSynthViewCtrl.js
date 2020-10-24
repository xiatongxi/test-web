"use strict";
angular.module('app.synth').controller("barnSynthViewCtrl", 
		function($scope, $state, $rootScope, $filter, $http, $stateParams, 
				barnSynthService, keeperService, threetempcheckService, foodothercheckService, StorehouseService, APP_CONFIG) {
    $scope.loadDataById = function() {
        $scope.keeper = {grainId : "0"};
        $scope.keeper.grainId = $stateParams.id;

        //选中粮库信息
    	barnSynthService.loadDataById($stateParams.id).then(function(data){
            $scope.library = data;
        },function(data){
            console.log(data);
        });
        //隶属企业信息
        barnSynthService.loadAllDataById("1", "99",$stateParams.id).then(function(data){
            $scope.nums = data.size*1-1;
            $scope.libraryList = data;
        },function(data){
            console.log(data);
        });

        //人员信息
        keeperService.getPageInfo("1", "99",$scope.keeper).then(function(data){
            $scope.personneList = data;
        },function(data){
            console.log(data);
        });

        //仓房信息，安全检查，费用管理，业务信息
        barnSynthService.getLibraryAllList($stateParams.id).then(function(data){
            //仓房信息
            $scope.barnList = data.barnDate;
            //业务信息
            $scope.businessList = data.businessDate;
            //安全检查
            $scope.checkList = data.checkDate;
            //费用管理
            $scope.paymentsList = data.paymentsDate;
        },function(data){
            console.log(data);
        });

        // 仓房列表
        StorehouseService.getStorehouseList($stateParams.id).then(function(data){
            $scope.storelist = data.houseList;
        },function(data){
            console.log(data);
        });
    }

	// 接收广播，切换仓房
	$scope.$on("storeChangeed", function(event, storehouseId) {
		$scope.search.storehouseId = storehouseId;
	})


    // 返回
    $scope.upReturn = function () {
    	$state.go("app.synth.barn");
    }


	//详情统一跳转
	$scope.lookUp = function(type, id, types,ids) {
		if (type == "personne") {
            // $state.go('app.basic.keeperView',{id:id,types:$stateParams.id});//人员
            $state.go('app.basic.keeperEdit',{id:id, showType:1});
		} else if (type == "barn") {
            $state.go('app.basic.storehouseEditReq',{id:id, btnType:ids});//仓房
		} else if (type == "contract") {
			if (types == "1") {
                $state.go("app.business.plan-audit-pass-view", {id:id, processInstanceId : ids});
			} else if (types == "2") {
                $state.go("app.business.contract-audit-pass-view", {id:id, processInstanceId : ids});
			}
		} else if (type == "notice") {
			if (types == "1") {
				foodothercheckService.loadDataById(id).then(function(data){
					$scope.foodothercheck = data;

				},function(data){
					console.log(data);
				});

                // 显示弹出层
                $("#foodotherCheckModal").modal("show");
                //查看页面 需要禁用框
                $("#foodotherCheck-form select").attr("disabled",true);
                $("#foodotherCheck-form input").attr("disabled",true);
                $("#foodotherCheck-form input[type=radio]").attr("disabled",true);
                $("#foodotherCheck-form textarea").attr("disabled",true);
			} else if (types == "2") {
                threetempcheckService.loadDataById(id).then(function(data){
                    $scope.threetempcheck = data;
                    $scope.threetempcheck.checkDate = $filter('date')($scope.threetempcheck.checkDate, "yyyy-MM-dd");

                },function(data){
                    console.log(data);
                });

                // 显示弹出层
                $("#threetempCheckModal").modal("show");
                //查看页面 需要禁用框
                $("#threetempCheck-form select").attr("disabled",true);
                $("#threetempCheck-form input").attr("disabled",true);
                $("#threetempCheck-form textarea").attr("disabled",true);
			}
		}
	}

	//点击跳转列表
	$scope.getList = function(flowType) {
		if (flowType == 'enterprise') { //隶属企业信息
			$("#enterprise").show();
			$("#barn").hide();
			$("#personne").hide();
			$("#business").hide();
			$("#security").hide();
			$("#cost").hide();
		} else if (flowType == 'barn') {  //仓房（货位）信息
			$("#enterprise").hide();
			$("#barn").show();
			$("#personne").hide();
			$("#business").hide();
			$("#security").hide();
			$("#cost").hide();
		} else if (flowType == 'personne') {  //库内人员信息
			$("#enterprise").hide();
			$("#barn").hide();
			$("#personne").show();
			$("#business").hide();
			$("#zlGl").hide();
			$("#cost").hide();
		} else if (flowType == 'business') {  //业务信息
			$("#enterprise").hide();
			$("#barn").hide();
			$("#personne").hide();
			$("#business").show();
			$("#security").hide();
			$("#cost").hide();
		} else if (flowType == 'security') {  //安全管理
			$("#enterprise").hide();
			$("#barn").hide();
			$("#personne").hide();
			$("#business").hide();
			$("#security").show();
			$("#cost").hide();
		} else if (flowType == 'cost') {  //费用管理
            $("#enterprise").hide();
            $("#barn").hide();
            $("#personne").hide();
            $("#business").hide();
            $("#security").hide();
            $("#cost").show();
        }
	}

     $scope.loadDataById();
});
