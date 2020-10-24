angular.module('app.storage').controller("drugDestroySaveCtrl", function($scope, $filter,$http, $stateParams,
                    $uibModal,$rootScope,drugDestroyService, commonUtilService, APP_CONFIG,drugStorageService) {
    $scope.loadDataById = function(id) {
        drugDestroyService.loadDataById(id).then(function(data){
            $scope.drugDestroy = data;
            $scope.drugDestroy.destroyDate = $filter('date')($scope.drugDestroy.destroyDate, "yyyy-MM-dd"); 
        },function(data){
        });
    };
    
    $scope.isNotEdit = false;
    
    if ($scope.drugDestroy == null) {
        $scope.drugDestroy = {};
    } 
    
    if ($stateParams.id != 0) {
        $scope.isNotEdit = $stateParams.isNotEdit;
        //新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
        $scope.loadDataById($stateParams.id);
    }
    
    var validator = $("#drugDestroy-form").validate();
    
    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^[1-9]\d*$/g; // 不为0的正整数
        return this.optional(element)||(checkNumber.test(value));  
    },"请输入正确的不为0的数字整数！");
    
    // 保存.
    $scope.save = function () {
        if (validator.form()) {
            // 创建人
            $scope.drugDestroy.creater = $rootScope.userInfo.userId;
            // 创建单位
            $scope.drugDestroy.createUnit = $rootScope.orgInfo.orgName;
            // orgId
            $scope.drugDestroy.orgId = $rootScope.orgInfo.orgId;
            $http({
                method: 'POST',
                url: APP_CONFIG.drugManageUrl + '/depot/business/drugDestroy/save',
                data: {
                    drugDestroyJson : angular.toJson($scope.drugDestroy)
                }
            }).then(function successCallback(response) {
                if(response.data.status == "success"){
                    alert("保存成功！");
                    $scope.retList();
                }else{
                    alert("保存失败！请核对药剂信息!");
                }
            }, function errorCallback(response) {
                // 请求失败执行代码
            });
        }
    };
    
    // 返回.
    $scope.retList = function () {
        if ($rootScope.previousState_name != '') {
            $rootScope.back();
        } else {
            $state.go("app.storage.drug.drugDestroy");
        }
    };

    // 获取药剂生产厂家
    $scope.getManufacturerData = function () {
        drugStorageService.getManufacturer().then(function(data){
            $scope.drugManufacturerList = data;
        },function(data){
        });
    };
    $scope.getManufacturerData();
     
});
