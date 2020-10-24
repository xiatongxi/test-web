"use strict";

angular.module('app.business')
    //盘点单
    .controller("deviceCheckCtrl", function($scope, $http,$state,$rootScope,deviceCheckService, $filter,$stateParams, APP_CONFIG) {
     // 获取列表数据
     $scope.pageInfo = {pageNum : 1, pageSize : 10};
     $scope.search = {pdNum:"",starttime:"",endtime:""};


     $scope.loadPdNum = function () {
         deviceCheckService.getCheckListNoPage().then(function(data){
             $scope.pdNum = data;
             $scope.loadData();
         },function(data){
             console.log(data);
         });
     }

	 $scope.loadData = function() {
         deviceCheckService.getPageInfoDevice($scope.pageInfo.pageNum, $scope.pageInfo.pageSize,$scope.search.pdNum,$scope.search.starttime,$scope.search.endtime).then(function(data){
	         $scope.pageInfo = data;
	     },function(data){
	         console.log(data);
	     });
	 }
		
	 $scope.loadPdNum();

     //清空
     $scope.clean = function () {
         $scope.search = {pdNum:"",starttime:"",endtime:""};
         $scope.loadData();
     }
     
     
	 //新增
	 $scope.showCheck = function () {
	    	$state.go('app.business.checkAdd');
	 }

    // 翻页
    $scope.goPage = function(pageNum) {
        $scope.pageInfo.pageNum = pageNum;
        $scope.loadData();
    }

    //根据仓房ID删除数据
    $scope.remove = function (houseId,checkNumber) {
	     if(confirm("确定删除该条数据？")){
             deviceCheckService.remove(houseId,checkNumber).then(function(data){
                 $scope.loadPdNum();
             },function(data){
                 console.log(data);
             });
         }
    }

    //修改
    $scope.loadDataById = function (depot,pddh,type) {
	     $state.go("app.business.checkEdit",{depotId:depot,pddh:pddh,isNotEdit:type});
    }

})
    .controller("deviceCheckAddCtrl", function($scope, $http,$state,$rootScope,$filter,deviceCheckService, equipmentEquipmentPoolService, $stateParams, APP_CONFIG) {
    	// 获取存放位置
	     $scope.equipment = function() {
	     	equipmentEquipmentPoolService.getPageInfo(null, null,null).then(function(data){
	     		$scope.equipmentEquipmentPool = data.list;
	         },function(data){
	             console.log(data);
	         });
	     }
	     $scope.equipment();
	     
    	$scope.dateTimes = function(number,type) {
            var date = new Date();
            date.setDate(date.getDate()-number);//获取number天后的日期
            var years = date.getFullYear();
            var month = date.getMonth()+1;//获取当前月份的日期
            var strDate = date.getDate();

            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }

            if(type == 0) return years + month + strDate;
            if(type == 1) return years + "-" + month + "-" + strDate + " " +date.getHours()+ ":" +date.getMinutes()+ ":" +date.getSeconds();
        };

        $scope.pddTitleName = "新增盘点单";
        $scope.deviceCheck = {};
        $scope.reallyCount = 0;//默认实际数量
        $scope.reason = '无';//默认原因为空
        $scope.deviceCheck.depotId =-1;//仓房d
        $scope.deviceCheck.deviceType = "";//盘点种类
        $scope.deviceCheck.checkDate =$scope.dateTimes(0,1);
        var pddh;//自动生成的盘点单号-20180104003

        //根据盘点时间，获取当天盘点单号
        $scope.getCount = function () {
        	
        		deviceCheckService.getCount($scope.deviceCheck.depotId).then(function(data){//data = 2;
        			pddh =  $scope.deviceCheck.checkNumber = $scope.dateTimes(0,0)+"00"+(data*1+1);
        			if($scope.deviceCheck.depotId == null || $scope.deviceCheck.depotId == 'undefined'){
        				$scope.deviceCheck.depotId =-1;
        			}
        			$scope.deviceCheck.checkNumber  = $scope.deviceCheck.depotId +"-"+ $scope.deviceCheck.deviceType +"-"+ pddh;
        			$scope.changePdzl();
        		},function(data){
        			console.log(data);
        		});
        	
        }
        $scope.getCount();

        //查询盘点种类
        $scope.changePdzl = function () {
        	if(null==$scope.deviceCheck.deviceType || $scope.deviceCheck.deviceType=='undefined'){
        		$scope.deviceCheck.deviceType = "" ;
        	}
            //修改盘点单号
            $scope.deviceCheck.checkNumber  = $scope.deviceCheck.depotId +"-"+ $scope.deviceCheck.deviceType +"-"+ pddh;
            
            	deviceCheckService.changePdzl($scope.deviceCheck.depotId,$scope.deviceCheck.deviceType).then(function(data){
            		$scope.childZl = data;
            		$scope.deviceCheck.checkPerson = data.length>0?data[0].deviceManager:"";
            	},function(data){
            		console.log(data);
            	});
            
        }

        $scope.back = function () {
            $state.go("app.business.deviceCheckList");
        }

        $scope.pd = {};
        $scope.saveData = function () {
            var validator = $("#deviceCheck-form").validate();
            if (validator.form()) {            	
                var Zl = $scope.childZl;//盘点修改中列表数据
                var reallyCountArr = [],reasonArr = [],deviceNameArr = [],modelArr = [],sum=0;
                $("input[name=reallyCount]").each(function () {
                    reallyCountArr[sum] = $(this).val();
                    sum++;
                })
                sum = 0;
                $("input[name=reason]").each(function () {
                    reasonArr[sum] = $(this).val();
                    sum++;
                })

                var sj = [];
                for(var i=0;i<Zl.length;i++){
                    var ins = {};
                    ins.check_number = $scope.deviceCheck.checkNumber;//盘点单号
                    ins.depot_id = $scope.deviceCheck.depotId;//仓房id
                    ins.check_person = $scope.deviceCheck.checkPerson;//负责人
                    ins.device_type = $scope.deviceCheck.deviceType;//盘点种类
                    ins.device_name = Zl[i].deviceName;//器材名称
                    //ins.check_date = $scope.deviceCheck.checkDate;//时间
                    ins.check_date = $filter('date')($scope.deviceCheck.checkDate, "yyyy-MM-dd HH:mm:ss");//时间
                    ins.model = Zl[i].model; //规格型号
                    ins.store_count = Zl[i].useCount;//库存数量
                    ins.really_count = reallyCountArr[i];//实际库存数量
                    ins.check_result = Zl[i].storeCount>reallyCountArr[i]?"盘亏":Zl[i].storeCount<reallyCountArr[i]?"盘盈":"账实相符";
                    ins.reason = reasonArr[i];
                    ins.org_id = $rootScope.userInfo.orgId;
                    sj.push(ins);
                }                        
                // 提交表单
                $http({
                    method: 'POST',
                    url: APP_CONFIG.deviceUrl + '/deviceCheck/save',
                    data: {
                        deviceCheckJson : angular.toJson(sj),
                        type : "add"
                    }
                }).then(function successCallback(response) {
                    if (response.data.status == "success") {
                        alert("保存成功！");
                        $state.go('app.business.deviceCheckList');
                    } else {
                        alert("保存失败！");
                    }
                }, function errorCallback(response) {
                    // 请求失败执行代码
                });
            }
        }

    })
    .controller("deviceCheckEditCtrl", function($scope, $http,$state,$filter,$rootScope,deviceCheckService, equipmentEquipmentPoolService, $stateParams, APP_CONFIG) {
    	// 获取存放位置
	     $scope.equipment = function() {
	     	equipmentEquipmentPoolService.getPageInfo(null, null,null).then(function(data){
	     		$scope.equipmentEquipmentPool = data.list;
	         },function(data){
	             console.log(data);
	         });
	     }
	     $scope.equipment();
    	
    	$scope.dateTimes = function(number,type) {
            var date = new Date();
            date.setDate(date.getDate()-number);//获取number天后的日期
            var years = date.getFullYear();
            var month = date.getMonth()+1;//获取当前月份的日期
            var strDate = date.getDate();

            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }

            if(type == 0) return years + month + strDate;
            if(type == 1) return years + "-" + month + "-" + strDate + " " +date.getHours()+ ":" +date.getMinutes()+ ":" +date.getSeconds();
        };
        $scope.back = function () {
            $state.go("app.business.deviceCheckList");
        }

        $scope.deviceCheck = {};
        $scope.deviceCheck.depotId =-1;//仓房d
        var pddh;//自动生成的盘点单号-20180104003

        //根据盘点时间，获取当天盘点单号
        $scope.getCount = function () {
            deviceCheckService.getCount($scope.deviceCheck.depotId).then(function(data){//data = 2;
                pddh =  $scope.deviceCheck.checkNumber = $scope.dateTimes(0,0)+"00"+(data*1+1);
                if($scope.deviceCheck.depotId == null || $scope.deviceCheck.depotId == 'undefined'){
    				$scope.deviceCheck.depotId =-1;
    			}
                $scope.deviceCheck.checkNumber  = $scope.deviceCheck.depotId +"-"+ $scope.deviceCheck.deviceType +"-"+ pddh;
            },function(data){
                console.log(data);
            });
        }
        $scope.getCount();

        //查询盘点种类
        $scope.changePdzl = function () {
        	if(null==$scope.deviceCheck.deviceType || $scope.deviceCheck.deviceType=='undefined'){
        		$scope.deviceCheck.deviceType = "" ;
        	}
            //修改盘点单号
            $scope.deviceCheck.checkNumber  = $scope.deviceCheck.depotId +"-"+ $scope.deviceCheck.deviceType +"-"+ pddh;

            deviceCheckService.changePdzl($scope.deviceCheck.deviceType).then(function(data){
                $scope.childZl = data;
                $scope.deviceCheck.checkPerson = data.length>0?data[0].deviceManager:"";
            },function(data){
                console.log(data);
            });
        }

        deviceCheckService.loadDataById($stateParams.depotId,$stateParams.pddh).then(function(data){
        	
            $scope.childZl = data;
            if(data.length>0) {
                $scope.deviceCheck = {};
                $scope.deviceCheck.depotId = data[0].depotId;
                $scope.deviceCheck.checkNumber = data[0].checkNumber;
               // $scope.deviceCheck.deviceType = data[0].deviceType;
                $scope.deviceCheck.deviceType=parseInt(data[0].deviceType);
                //$scope.deviceCheck.checkDate = data[0].checkDate;
                $scope.deviceCheck.checkDate =$filter('date')(data[0].checkDate, "yyyy-MM-dd HH:mm:ss");;//时间;
                $scope.deviceCheck.checkPerson = data[0].checkPerson;
            }
            if($stateParams.isNotEdit == "1"){
                $scope.pddTitleName = "盘点单详情";
                $scope.isNotEdit = true;
            }
            else {
                $scope.pddTitleName = "修改盘点单";
                $scope.isNotEdit = false;
            }
        },function(data){
            console.log(data);
        });

        $scope.saveData = function () {
            var validator = $("#deviceCheck-form").validate();
            if (validator.form()) {           	           	
                var Zl = $scope.childZl;//盘点修改中列表数据
                var reallyCountArr = [],reasonArr = [],deviceNameArr = [],modelArr = [],sum=0;
                $("input[name=reallyCount]").each(function () {
                    reallyCountArr[sum] = $(this).val();
                    sum++;
                })
                sum = 0;
                $("input[name=reason]").each(function () {
                    reasonArr[sum] = $(this).val();
                    sum++;
                })

                var sj = [];
                for(var i=0;i<Zl.length;i++){
                    var ins = {};
                    ins.check_number = $scope.deviceCheck.checkNumber;//盘点单号
                    ins.depot_id = $scope.deviceCheck.depotId;//仓房id
                    ins.check_person = $scope.deviceCheck.checkPerson;//负责人
                    ins.device_type = $scope.deviceCheck.deviceType;//盘点种类
                    ins.device_name = Zl[i].deviceName;//器材名称
                    ins.check_date =  $filter('date')($scope.deviceCheck.checkDate, "yyyy-MM-dd HH:mm:ss");;//时间
                    ins.model = Zl[i].model; //规格型号
                    ins.store_count = Zl[i].storeCount;//库存数量
                    ins.really_count = reallyCountArr[i];//实际库存数量
                    ins.check_result = Zl[i].storeCount>reallyCountArr[i]?"盘亏":Zl[i].storeCount<reallyCountArr[i]?"盘盈":"账实相符";
                    ins.reason = reasonArr[i];
                    ins.org_id = $rootScope.userInfo.orgId;
                    sj.push(ins);
                }
                // 提交表单
                $http({
                    method: 'POST',
                    url: APP_CONFIG.deviceUrl + '/deviceCheck/save',
                    data: {
                        deviceCheckJson : angular.toJson(sj),
                        type : "edit"
                    }
                }).then(function successCallback(response) {
                    if (response.data.status == "success") {
                        alert("保存成功！");
                        $state.go('app.business.deviceCheckList');
                    } else {
                        alert("保存失败！");
                    }
                }, function errorCallback(response) {
                    // 请求失败执行代码
                });
            }
        }

    })