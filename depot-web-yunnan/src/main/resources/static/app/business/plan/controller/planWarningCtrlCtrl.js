angular.module('app.business').controller("planWarningTimeCtrl", function($scope, $rootScope,$http,
		planWarningService, APP_CONFIG) {

    // 获取列表数据
    $scope.loadData = function() {
    	//查询数据展示页面
    	planWarningService.getWarningTime($rootScope.userInfo.orgId).then(function(data){
			$scope.days = data[0].warningDay;
        },function(data){
            console.log(data);
        });
    	
    }
    $scope.loadData();
    
    
    //预警时间
    $scope.submit = function(days) {
        $http({
            method: 'POST',
            url: APP_CONFIG.businessUrl + '/depot/business/warning/addWarningSetting',
            data: {
            	warningDay : days,
            	orgId : $rootScope.userInfo.orgId
            }
        }).then(function successCallback(response) {
        	alert("预警时间已经设置");
        	$scope.loadData();
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log(response);
        });
        
    }
    

    
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData();
     	}
	}
	
});

angular.module('app.business').controller("planWarningCtrl", function($scope, $rootScope,$http,
		planWarningService,qualitycheckService,StorehouseService,warehouseService, APP_CONFIG) {

	$scope.pageInfo = {pageNum : 1, pageSize : 10};
    // 获取列表数据
    $scope.loadData = function() {
    	
    	//查询预警时间数据展示页面
    	planWarningService.getWarningTime($rootScope.userInfo.orgId).then(function(data){
			$scope.days = data[0].warningDay;
        },function(data){
            console.log(data);
        });
    	
    	qualitycheckService.getTrdStoreQualityList ().then(function(qualitycheckdata){
    		planWarningService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.days,qualitycheckdata).then(function(data){
    			$scope.getBasicData();
        		$scope.loadWare();
        		$scope.pageInfo = data;
            },function(data){
                console.log(data);
            });
    		
    	},function(qualitycheckdata){
            console.log(qualitycheckdata);
        });
    	
    }
    $scope.loadData();
    
    // 翻页
	$scope.goPage = function(pageNum) {
		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
     		$scope.pageInfo.pageNum = pageNum;
     		$scope.loadData();
     	}
	}
	
	// 获取基础数据
	$scope.getBasicData = function() {
		//按照单位获取单位下的仓房信息
		var depotId = $rootScope.orgInfo.orgId;
		StorehouseService.getStorehouseList(depotId).then(function(data){
			//$scope.storehouseList = data.houseList;
			$scope.storehouseObj = data.houseObj;
		},function (data) {
			console.log(data);
		});
		
	}
	
	//货位信息
	$scope.wareMap = {};
	$scope.loadWare = function() {
		warehouseService.getStorehouse($rootScope.orgInfo.orgId, null).then(function(data){
	        $scope.warelist = data.wareList;
	    	angular.forEach($scope.warelist, function(item, index) {
				$scope.wareMap[item.warehouseId] = item.warehouseName;
	    	})
	    },function(data){
	        console.log(data);
	    });
	}
	
});