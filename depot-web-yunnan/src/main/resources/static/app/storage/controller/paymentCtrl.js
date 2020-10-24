"use strict";

angular.module('app.storage')
    .controller("paymentCtrl", function($scope, $state,$rootScope, $stateParams,StorehouseService, enumService,paymentService, APP_CONFIG) {
        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.search = {storehouseId:""};
        // $scope.dicDataList = $rootScope.dicDataList;
        $scope.loadData = function () {
            paymentService.loadData($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.search.storehouseId,$scope.type,$scope.searchStartDate,$scope.searchEndDate)
                .then(function(data){
                    $scope.pageInfo = data;
                    for (var j = 0; j < $scope.pageInfo.list.length; j++)
                    {
                        var allPrice = Math.round($scope.pageInfo.list[j].price * $scope.pageInfo.list[j].number * 100) / 100;
                        $scope.pageInfo.list[j].allPrice =allPrice;
                    }
                },function(data){
                    console.log(data);
                });
        };
        $scope.loadData();

        // 仓房列表
        $scope.loadStore = function() {
            StorehouseService.getStorehouseList($rootScope.orgInfo.orgId).then(function(data){
                $scope.storelist = data.houseList;
            },function(data){
                console.log(data);
            });
        }
        $scope.loadStore();

        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }

        // 接收广播，切换仓房
        $scope.$on("storeChangeed", function(event, storehouseId) {
            $scope.search.storehouseId = storehouseId;
            $scope.loadData();
        })

        // 根据id删除信息
        $scope.remove = function(id) {
            paymentService.removeById(id).then(function (data) {
                if(data.status == "success"){
                    alert("删除成功");
                    $scope.loadData();
                }else{
                    alert("删除失败");
                }
            });
        }

        //修改
        $scope.editPage = function (id,type) {$state.go('app.storage.payment.edit',{id:id,type:type}); }

    })
    .controller("paymentEditCtrl", function($scope,$filter,$rootScope,$state, $stateParams,alertService, paymentService, APP_CONFIG) {
        // 获取数据

        $scope.loadData = function () {
            paymentService.loadDataById($stateParams.id)
                .then(function(data){
                    $scope.payment = data;
                    $scope.payment.payTime = $filter('date')($scope.payment.payTime, "yyyy-MM-dd");
                    $scope.allPrice = Math.round($scope.payment.price * $scope.payment.number * 100) / 100
                    var disabled = false;

                    if($stateParams.type == "remove"){
                        disabled = true;
                        $("#payment-form input").attr("style","background-color:hsla(0, 0%, 93%, 0)");
                        $("#payment-form select").attr("style","background-color:hsla(0, 0%, 93%, 0)");
                        $("#payment-form textarea").attr("style","background-color:hsla(0, 0%, 93%, 0)");
                    }
                    $("#payment-form input").attr("disabled",disabled);
                    $("#payment-form select").attr("disabled",disabled);
                    $("#payment-form textarea").attr("disabled",disabled);

                    if($stateParams.type == "edit"){
                        $("#keeps").attr("disabled",true);
                    }
                    //用于控制修改和新增页面的提交按钮隐藏和显示
                    if(disabled){
                        $("#cancel").hide();
                    }else {
                        $("#cancel").show();
                    }

                },function(data){
                    console.log(data);
                });
        };
        //当前保管员所管理的仓房列表
        $scope.getBasicData = function() {
            paymentService.queryByBarn().then(function(data){
                $scope.parentBarn = data;
                $scope.enumBarn = data;
            },function(data){
                console.log(data);
            });
        }
        $scope.payment = {};
        $scope.getBasicData();

        if($stateParams.id != 0){
            $scope.loadData();
        }
        $scope.change = function () {
            if ($scope.payment.houseId != null
                && $scope.payment.houseId != undefined
                && $scope.payment.houseId != '') {

                paymentService.getKepperByHouseId($scope.payment.houseId).then(function(data){
                    var houseNames="";
                    for(var i=0;i<data.length;i++){
                        houseNames+=data[i].name;
                        if(i != data.length-1){
                            houseNames+=",";
                        }
                    }
                    $scope.payment.recorder = houseNames;
                },function (data) {
                    console.log(data);
                });
            } else {
                // 设置货位号为空.
                $scope.payment.houseId = null;
            }
        }

        var validator = $("#payment-form").validate();
        $scope.saveData = function () {
            if(validator.form()) {
                var orgId = $rootScope.userInfo.orgId;//当前登录者的库id
                paymentService.saveData(angular.toJson($scope.payment),orgId)
                    .then(function (data) {
                        //alertService.showSuccess("操作成功");
                        alert("保存成功！");
                        $state.go('app.storage.payment.list');
                    }, function (data) {
                        console.log(data);
                    })
            }
        }

        //排除不是数字的
        $scope.clearNoNum = function(obj,attr){
        	//先把非数字的都替换掉，除了数字和.
        	obj[attr] = obj[attr].replace(/[^\d.]/g,"");
        	//必须保证第一个为数字而不是.
        	obj[attr] = obj[attr].replace(/^\./g,"");
        	//保证只有出现一个.而没有多个.
        	obj[attr] = obj[attr].replace(/\.{2,}/g,"");
        	//保证.只出现一次，而不能出现两次以上
        	obj[attr] = obj[attr].replace(".","$#$").replace(/\./g,"").replace("$#$",".");

        	if(obj.price !=null && obj.price != "" && typeof obj.price != "undefined" &&
                obj.number !=null && obj.number != "" && typeof obj.number != "undefined" ){
                $scope.allPrice = Math.round(obj.price * obj.number * 100) / 100;
            }

        }
        
        $scope.retList = function () { $state.go('app.storage.payment.list'); }
    })
