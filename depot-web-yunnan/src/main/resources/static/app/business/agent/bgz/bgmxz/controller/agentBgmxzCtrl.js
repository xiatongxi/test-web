"use strict";

angular.module('app.business')
    .controller("agentBgmxzCtrl", function($scope, $rootScope, $http, $state, agentBgmxzService, FileUploader, 
    		agentService, agentDepotService, warehouseService, StorehouseService, fcbgzService, APP_CONFIG,agentStorehouseService) {

    	// 分页信息
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        // 查询条件
        $scope.conditions = {};
        // 获取列表数据
        $scope.loadData = function() {
        	agentBgmxzService.getList($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.conditions, $rootScope.orgInfo.orgId).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log();
            });
        };
        $scope.loadData();

        // 获取代储点名称
    	$scope.getEditData = function(){
            agentService.getPageInfo("1", "100", "", $rootScope.orgInfo.orgId).then(function(data){
                $scope.agentData = data;
            },function(data){
                console.log();
            });
        };

        $scope.getEditData();

        //获取代储库名称做成下拉列表；
        $scope.getAgentDepotData = function(agentId){
            if(agentId != null){
                agentDepotService.getPageInfo("1", "100", "",agentId).then(function(data){
                    $scope.depotList = data.list.map(function(item) {
                        return {
                            depotId: item.id,
                            depotName: item.agentDepotName
                        }
                    });
                },function(data){
                    console.log(data);
                });
//                agentDepotService.getAgentDepotHouse("",agentId).then(function(data){
//                    $scope.depotList = data.map(function(item) {
//                        return {
//                            depotId: item.id,
//                            depotName: item.agentDepotName
//                        }
//                    });
//                    $scope.getHouseList(depotId);
//                },function(data){
//                    console.log(data);
//                });

            }else{
                $scope.depotList = {};
            }
        };

        //根据代储库获取仓房列表
        $scope.getHouseList = function(depotId) {
            if(depotId != null){
                // StorehouseService.getAgentList(depotId,$rootScope.orgInfo.orgId,"1").then(function(data){
                agentStorehouseService.getDepotToStoreList($rootScope.orgInfo.orgId, depotId).then(function(data){
                    for (var i = 0; i < $scope.depotList.length; i++) {
                        if($scope.depotList[i].depotId == depotId){
                            $scope.orgIds = $scope.depotList[i].orgId;
                            $scope.storehouseList = data;
                        }
                    }
                },function(data){
                    console.log(data);
                })
            }else{
                $scope.storehouseList = {};
            }
        };

        //根据仓房获取货位列表
        $scope.getWareList = function(houseId) {
        	//console.log(houseId);
            if(houseId != null){
                //按照单位获取单位下的仓房信息
                agentStorehouseService.getStorehouse($scope.orgIds, houseId).then(function(data){
                    $scope.warelist = data.wareList;  //下拉列表数据
                },function (data) {
                    console.log(data);
                });
            }else{
                $scope.warelist = {};
            }
        }

        // 新增、修改或者查看用户信息
        $scope.showEdit = function(id,type) {
        	if (type == "add") {
        		id = null;
        	}
        	$state.go('app.business.agent.grainStorage.bgz.bgmxz.edit',{id:id,type:type});
        };

        // 同步代储库保管明细账数据
        $scope.synchro = function() {
        	//查询代储库仓房货位信息
        	agentBgmxzService.selectAgentHouseWareList($rootScope.orgInfo.orgId,"fcbgz").then(function (data) {
                var data = data.strResult;
                //console.log(data);
        		if(data != null && "" != data){
                    //把数据传到出入库用做条件拿到明细账数据传回来
                    //把传回来的数据在插入到代储点的保管明细账表中
                    agentBgmxzService.addCrkFcbgzData(angular.toJson(data), $rootScope.orgInfo.orgId, $rootScope.userInfo.realName).then(function(agentBgmxzData){
//        						alert(agentBgmxzData.msg);
//        						if (agentBgmxzData.status == "200") {
//        						}
                        $scope.loadData();
                    },function(agentBgmxzData){
                        console.log(agentBgmxzData);
                    });
                }
            },function(data){
                console.log(data);
            });
        }

        // 根据id删除信息
        $scope.remove = function(id) {
        	agentBgmxzService.removeById(id).then(function (data) {
                if(data.status == "success"){
                    alert("删除成功");
                    $scope.loadData();
                }else{
                    alert("删除失败");
                }
            });
        };
        // 翻页
     	$scope.goPage = function(pageNum) {
     		if ($scope.pageInfo.pageNum != pageNum && pageNum > 0) {
          		$scope.pageInfo.pageNum = pageNum;
          		$scope.loadData();
          	}
     	}

        // 文件上传实例
        $scope.uploader = new FileUploader({
            url : APP_CONFIG.agentUrl + '/agentNumber/importFile',
            autoUpload : true, // 将文件添加到队列后自动上传
            formData : [{fileType:'xlsx',orgId:$rootScope.orgInfo.orgId}], // 与文件一起发送的数据
            removeAfterUpload : true, // 从队列上传后删除文件
            // 上传进度
            onProgressItem : function(fileItem, progress) {
                // $scope.jd = progress + "%";
                console.info("正在上传：" + progress + "%");
            },
            // 回调函数，在一个文件上传成功后触发
            onSuccessItem : function(fileItem, response, status, headers) {
                if(fileItem.isSuccess && response.errormsg == ''){
                    alert("导入成功！");
                } else {
                    alert(response.errormsg);
                }
                $scope.loadData();
            }
        });
    })
    .controller("agentBgmxzEditCtrl", function($scope, $http, $state, $stateParams, $rootScope, $filter, FileUploader, 
    		agentBgmxzService, agentService, agentDepotService, StorehouseService, warehouseService, enumService) {
    	$(document).ready(function() {
            $("#dtBox").DateTimePicker({
            });
        });
    	
    	$scope.disabled = false;
        $scope.isShow = "1";
        $scope.bgmxz = {};

        $scope.ywlxList = [{id:0, name:"收入"},{id:1, name:"支出"}];

        $scope.loadDataById = function(id) {
        	agentBgmxzService.getFindByKeyData(id).then(function(data){
                $scope.getEditData();
                $scope.getAgentDepotData(data.agentId);
                $scope.getHouseList(data.szlkOrgId);
                $scope.getWareList(data.houseId);

                $scope.bgmxz = data;
                if (data.srsl != 0) {
                	$scope.businessType = 0;
                	$scope.number = data.srsl;
                } else {
                	$scope.businessType = 1;
                	$scope.number = data.zcsl;
                }
                $scope.bgmxz.fssj = $filter('date')($scope.bgmxz.fssj, "yyyy-MM-dd HH:mm:ss");

                $("#agentNumber-form input").attr("disabled",$scope.disabled );
                $("#agentNumber-form select").attr("disabled",$scope.disabled );

                $scope.getTreeListByTypeId();
            },function(data){
                console.log(data);
            });
        };

        //获取代储点名称
        $scope.getEditData = function(){
            agentService.getPageInfo("1", "100", "", $rootScope.orgInfo.orgId).then(function(data){
                $scope.agentData = data;
            },function(data){
                console.log();
            });
        };

        $scope.getTreeListByTypeId = function(){
        	//粮食品种
        	enumService.getTreeListByTypeId($scope.bgmxz.lspz, 1061).then(function(data) {
        		var data_new = $scope.data_add(data);
        		$scope.grainAttributeTreeLspzData = data_new;
        	},function(data) {
        		console.log(data);
        	});
            // 树形下拉框(粮食性质)
            enumService.getTreeListByTypeId($scope.bgmxz.lsxz, 1032).then(function(data) {
                var data_new = $scope.data_add(data);
                $scope.grainAttributeTreeLsxzData = data_new;
            },function(data) {
                console.log(data);
            });
        };

        $scope.getAgentDepotData = function(agentId){
            if(agentId != null){
                //获取代储库名称做成下拉列表；
//                agentDepotService.getPageInfo("1", "100", "",agentId).then(function(data){
//                    $scope.depotList = data.list.map(function(item) {
//                        return {
//                            depotId: item.id,
//                            depotName: item.agentDepotName
//                        }
//                    });
//                },function(data){
//                    console.log(data);
//                });
                agentDepotService.getAgentDepotHouse("", agentId).then(function(data){
                    $scope.depotList = data.map(function(item) {
                        return {
                            depotId: item.id,
                            depotName: item.agentDepotName
                        }
                    });
                    $scope.getHouseList(depotId);
                },function(data){
                    console.log(data);
                });
            }else{
                $scope.depotList = {};
            }
        };

        //根据代储库获取仓房列表
        $scope.getHouseList = function(depotId) {
            if(depotId != null){
                StorehouseService.getAgentList(depotId,$rootScope.orgInfo.orgId,"1").then(function(data){
                    $scope.storehouseList = data;
                },function(data){
                    console.log(data);
                });
            }else{
                $scope.storehouseList = {};
            }
        };

        //根据仓房获取货位列表
        $scope.getWareList = function(houseId) {
            if(houseId != null){
                //按照单位获取单位下的仓房信息
                warehouseService.getStorehouse($rootScope.orgInfo.orgId, houseId, "1").then(function(data){
                    $scope.warelist = data.wareList;  //下拉列表数据
                },function (data) {
                    console.log(data);
                });
            }else{
                $scope.warelist = {};
            }
        };

        if($stateParams.id != null && $stateParams.type == "edit"){//修改页面查询后台数据，并且赋值页面
            $scope.loadDataById($stateParams.id);
        }else if($stateParams.type == "show"){//查看页面
            $scope.loadDataById($stateParams.id);
            $scope.disabled = true;
            $scope.isShow = "0";
        }else{//新增页面，不进行操作；
            $scope.getEditData();//获取代储点名称
            $scope.getTreeListByTypeId();//初始化树形菜单数据
        }

        // 新增或修改保存数据
        var validator = $("#agentBgmxz-form").validate();
        $scope.saveData = function() {
        	//粮食品种必选的验证
        	$scope.grainAttribute_lspz = angular.fromJson($scope.bgmxz.lspz);
        	if ($scope.grainAttribute_lspz == '' || $scope.grainAttribute_lspz == null || $scope.grainAttribute_lspz[0].id == null || $scope.grainAttribute_lspz.length == 0) {
        		$("#grainAttribute_lspz-error").text("必须填写");
        		return;
        	} else {
        		$("#grainAttribute_lspz-error").text("");
        	}
        	//粮食性质必选的验证
            $scope.grainAttribute_lsxz = angular.fromJson($scope.bgmxz.lsxz);
            if ($scope.grainAttribute_lsxz == '' || $scope.grainAttribute_lsxz == null || $scope.grainAttribute_lsxz[0].id == null || $scope.grainAttribute_lsxz.length == 0) {
                $("#grainAttribute_lsxz-error").text("必须填写");
                return;
            } else {
                $("#grainAttribute_lsxz-error").text("");
            }
            if (validator.form()) {
                $scope.bgmxz.lspz = $scope.bgmxz.lspz[0].id;
                $scope.bgmxz.lsxz = $scope.bgmxz.lsxz[0].id;
                var number = 0;
                if ($scope.businessType == "1") {
                	$scope.bgmxz.zcsl = $scope.number;
                } else {
                	$scope.bgmxz.srsl = $scope.number;
                }
                if($stateParams.type == "add"){
                	$scope.bgmxz.createPerson = $rootScope.userInfo.realName;
                	$scope.bgmxz.createDate = $filter('date')(new Date(), "yyyy-MM-dd");
                	$scope.bgmxz.orgId = $rootScope.orgInfo.orgId;
                }
                if ($scope.bgmxz.fssj != undefined && $scope.bgmxz.fssj != null && $scope.bgmxz.fssj != '') {
    				$scope.bgmxz.fssj = new Date($scope.bgmxz.fssj.replace(new RegExp(/-/gm) ,"/"));
    			}
                var dates = angular.toJson($scope.bgmxz);
                agentBgmxzService.saveAndUpdata(dates).then(function (data) {
                    if (data.status == "success") {
                        alert(data.msg);
                        $state.go('app.business.agent.grainStorage.bgz.bgmxz');
                    } else {
                    	alert(data.msg);
                    }
                });
            }
        };

        $scope.retList = function(){
        	if ($rootScope.previousState_name != '') {
            	$rootScope.back();
            } else {
            	$state.go("app.business.agent.grainStorage.bgz.bgmxz");
            }
        };

        $scope.data_add = function(data) {
            var e = [];
            if (data.length != 0) {
                //要插入的json对象串
                var newObj = {"id":null,"name":"请选择","children":[]};
                //将返回的json对象和要插入的json对象串转换为字符串格式
                var f = angular.toJson(newObj);
                var b = angular.toJson(data);
                //把要插入的json对象串插入返回数据的最前面
                var c = b.substring(0,1);
                var d = b.substring(1,b.length);
                e = c + f + "," + d;
            }
            //最后在转换为json对象返回去
            return angular.fromJson(e);
        }
    });