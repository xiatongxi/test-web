"use strict";

angular.module('app.storage')
    .controller("foodotherCheckCtrl", function($scope, $rootScope, $state, $http, $stateParams,StorehouseService,warehouseService,
                                               enumService,foodothercheckService, APP_CONFIG) {

        $scope.dicData = {
            dicDataList : $rootScope.dicDataList,
            dicData : $rootScope.dicData
        };
        // console.log($scope.dicData);

    // 获取列表数据
    $scope.pageInfo = {pageNum : 1, pageSize : 10};
    $scope.search = {storehouseId:""};
	 $scope.loadData = function() {
         foodothercheckService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,
             $scope.foodothercheck,$scope.search.storehouseId).then(function(data){
	         $scope.pageInfo = data;
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
        };
        $scope.loadStore();

        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        };

        // 接收广播，切换仓房
        $scope.$on("storeChangeed", function(event, storehouseId) {
            $scope.search.storehouseId = storehouseId;
            $scope.loadData();
        });



//显示增加和修改页面
$scope.showAddfothercheck = function (id) {
    $scope.titleTag = '编辑';
    $scope.foodothercheck ={};//先清空  否则查看或者修改之后再点击增加会将上次的数据回显出来
    if (id != '' && id != undefined && id != null) {
        foodothercheckService.loadDataById(id).then(function(data){
            $scope.foodothercheck = data;
        },function(data){
            console.log(data);
        });
    }

    // 仓房列表
    $scope.loadStore = function() {
        StorehouseService.getStorehouseList($rootScope.orgInfo.orgId).then(function(data){
            $scope.storelist = data.houseList;
        },function(data){
            console.log(data);
        });
    };

    // 接收广播，切换仓房
    $scope.$on("storeChangeed", function(event, storehouseId) {
        $scope.foodothercheck.storehouseId = storehouseId;
        $scope.loadData();
    });

    // 显示弹出层
    $("#foodotherCheckModal").modal("show");
    //修改页面 需要将禁用的框再次开启
    $("#foodotherCheck-form select").attr("disabled",false);
    $("#foodotherCheck-form input").attr("disabled",false);
    $("#foodotherCheck-form input[type=radio]").attr("disabled",false);
    $("#foodotherCheck-form textarea").attr("disabled",false);
    $("#operation").show();
};

    //详情
    $scope.showViewothercheckTemp = function (id) {
        $scope.titleTag = '查看';
        if (id != '' && id != undefined && id != null) {
            foodothercheckService.loadDataById(id).then(function(data){
                $scope.foodothercheck = data;

            },function(data){
                console.log(data);
            });
        }

    // 显示弹出层
    $("#foodotherCheckModal").modal("show");
    //查看页面 需要禁用框
    $("#foodotherCheck-form select").attr("disabled",true);
    $("#foodotherCheck-form input").attr("disabled",true);
    $("#foodotherCheck-form input[type=radio]").attr("disabled",true);
    $("#foodotherCheck-form textarea").attr("disabled",true);
    $("#operation").hide();
};

//保存其他检查
// 提交表单
var validator = $("#foodotherCheck-form").validate();
$scope.savefoodothercheck = function () {
    // 模态框的校验器，有时会为空，可能是controller先于页面加载的原因，所以要在保存时，再判断一下校验器是否为undefined.
    if (validator == undefined) {
        validator = $("#foodotherCheck-form").validate();
        $scope.savefoodothercheck();
    }else{
        if(validator.form()) {
            $scope.foodothercheck.orgId = $rootScope.userInfo.orgId;
            foodothercheckService.savefoodothercheck($scope.foodothercheck).then(function(data){
                if (data.status == 'success') {
                    alert("保存成功！");
                    $scope.foodothercheck = {};
                } else {
                    alert("保存失败！");
                }
                $scope.loadData();
                // 关闭弹出层
                $("#foodotherCheckModal").modal("hide");
            },function(data) {
                console.log(data);
            });
        }
    }
};


// 根据id删除信息
$scope.remove = function(id) {
    foodothercheckService.removeById(id).then(function (data) {
        if(data.msg == "success"){
            alert("删除成功");
            $scope.loadData();
        }else{
            alert("删除失败");
        }
    });
}

})
.controller("foodotherCheckSaveCtrl", function($scope,$state, $http,$stateParams,enumService, foodothercheckService, APP_CONFIG) {
    $scope.loadDataById = function(id) {
        enumService.enumData().then(function(data){
            $scope.dicData = dataparentMap;
            $scope.dicPrentData=dataenumMap;
            console.info(data);
            foodothercheckService.loadDataById(id).then(function(data){
                $scope.foodotherCheck = data;
                console.log($scope.foodotherCheck.pestLevel);
                console.log($scope.dicData[43]);
            },function(data){
                // console.log(data);
            });
        },function(data){
            // console.log(data);
        });
    };

    $scope.loadChdj = function() {
        enumService.enumData().then(function(data){
            $scope.dicData = dataparentMap;
            $scope.dicPrentData=dataenumMap;
        },function(data){
            // console.log(data);
        });
    };

    if($stateParams.isNotEdit != null){
        if ($stateParams.isNotEdit == "false") {
            $scope.isNotEdit = false;
        } else if ($stateParams.isNotEdit == "true") {
            $scope.isNotEdit = true;
        }
    }else{
        $scope.isNotEdit = false;
    }

    if($stateParams.id != 0){//新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
        $scope.loadDataById($stateParams.id);
    }else{
        $scope.loadChdj();
    }

});