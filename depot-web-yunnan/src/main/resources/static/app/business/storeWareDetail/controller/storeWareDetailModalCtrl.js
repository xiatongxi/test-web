angular.module('app.business').controller("storeWareDetailModalCtrl", 
	function($scope, $uibModalInstance, $filter, $http, $rootScope, APP_CONFIG, items,kcswService,contractService,agentDepotService,
			storeWareDetailService, StorehouseService,qualitycheckService, warehouseService,enumService, commonUtilService) {
	$scope.storeWareDetail={};
	$scope.attributeType=null;
	
	$scope.storeWareDetail.orgId = $rootScope.userInfo.orgId;
	
	
	// 获取主库和代储库的名称
	$scope.agentDepotList = [];
	$scope.agentList = [];
	$scope.depot = {};
	$scope.getDepotData = function() {
		//根据当前登录人的orgId获取其代储库的信息
		var orgId = $rootScope.depotInfo.orgId;
		// 000 是不取手动增加的库点
		agentDepotService.getQueryAgentDepotList(orgId,"000").then(function(data) {
			//代储库
			if(data!=null ){
				$scope.agentList.push(data);
				for(var id in $scope.agentList){
					for(var key in $scope.agentList[id]){
						$scope.agentDepotList.push($scope.agentList[id][key]);
					}
			    }
			}
			//主库
			$scope.depot.depotId = orgId;
			$scope.depot.agentDepotName = $rootScope.depotInfo.orgName;
			$scope.agentDepotList.push($scope.depot);
			
		}, function (data) {
			console.log(data);
		});
	}
	
	//日期时间的比较
	$scope.changeDate = function() {
		
		if($scope.storeWareDetail.productiveYear != null && $scope.storeWareDetail.grainAnnual != null){
			
			enumService.edit($scope.storeWareDetail.productiveYear).then(function(data){
				$scope.productiveYear = parseInt(data.enumname);
				if($scope.storeWareDetail.grainAnnual!=null){
					enumService.edit($scope.storeWareDetail.grainAnnual).then(function(dataa){
						$scope.grainAnnual = parseInt(dataa.enumname);
						if($scope.productiveYear > $scope.grainAnnual){
							if($scope.storeWareDetail.grainAnnual!=null){
								alert("收货年度要大于等于生产年份");
								$scope.storeWareDetail.grainAnnual = null;
							}
						}
					},function(dataa){
						console.log(dataa);
					});
					
				}
				
			},function(data){
				console.log(data);
			});
			
			
		}
			
			
			if($scope.storeWareDetail.inputTime!="" && $scope.storeWareDetail.inputTime!=null && 
					$scope.storeWareDetail.grainAnnual!="" && $scope.storeWareDetail.grainAnnual!=null){
				
				enumService.edit($scope.storeWareDetail.grainAnnual).then(function(data){
					$scope.grainAnnual = parseInt(data.enumname);
					if($scope.storeWareDetail.inputTime!=null){
						
						$scope.inputTime = $filter('date')($scope.storeWareDetail.inputTime, "yyyy");
						if($scope.grainAnnual > $scope.inputTime){
							alert("入库时间要大于等于收货年度");
							$scope.storeWareDetail.inputTime = null;
						}
					}
					
				},function(data){
					console.log(data);
				});
			}
		
	}
	//按照单位获取单位下的仓房信息
	/*$scope.getBasicData = function() {
		var depotId = $rootScope.depotInfo.orgId;
		StorehouseService.getStorehouseList(depotId).then(function(data) {
			$scope.storehouseObj = data.houseObj;
			$scope.storehouseList = data.houseList;
		}, function (data) {
			console.log(data);
		});
	}*/
	
	// houseId与 包含houseName对象的键值对.
	$scope.houseIdMap = new Map();
	// warehouseId与 包含warehouseName对象的键值对.
	$scope.warehouseIdMap = new Map();
	
	//承储库点
	$scope.depotInfo=$rootScope.depotInfo;
	$scope.depotInfoList=[];
	$scope.depotInfoList.push($scope.depotInfo);
	
	
	// 树形下拉框(明细品种)
    $scope.getGrainDetailKind = function() {
        enumService.getTreeListByTypeId($scope.storeWareDetail.grainDetailKind,$scope.storeWareDetail.grainKind).then(function(data) {
            $scope.grainDetailKindTreeData = data;
        },function(data) {
            console.log(data);
        })
    };
    
	// 树形下拉框(粮食性质)
    $scope.getAttributeData = function() {
    	
    	var grainAttributeType="";
    	
    	if(items.attributeType!=undefined && items.attributeType!=null){
    		grainAttributeType=3045; //储备粮
    	}else{
    		grainAttributeType=1032; //所有的粮油性质
    	}

        enumService.getTreeListByTypeId($scope.storeWareDetail.grainAttribute, grainAttributeType).then(function(data) {
            $scope.grainAttributeTreeData = data;
        },function(data) {
            console.log(data);
        })
    };
    
    
   // 树形下拉框(粮食产地)
    $scope.getAreaData = function() {
        enumService.getTreeList($scope.storeWareDetail.grainProducingArea, "grainProducingArea").then(function(data) {
            $scope.grainProducingAreaTreeData = data;
        },function(data){
            console.log(data);
        })
    };
    
    //粮库名称更改获取其下的仓房
    $scope.depotChange = function(){
		if($scope.storeWareDetail.state != null && $scope.storeWareDetail.state != undefined && $scope.storeWareDetail.state != ''){
			$scope.storehouseList = [];
			if ($scope.executeType == 1) { //收储计划
				if($rootScope.userInfo.orgId == $scope.storeWareDetail.state){
					// 主粮库的仓房
					/*StorehouseService.getStorehouseList($scope.storeWareDetail.state).then(function(data) {
						$scope.storehouseObj = data.houseObj;
						$scope.storehouseList = data.houseList;
					}, function (data) {
						console.log(data);
					});*/
					$scope.storehouseList = $rootScope.storeAgentlist ;
				}else{
					//代储库的仓房
					   //根据当前的orgId和代储库的orgId 获取代储库的id business_agent_depot的id
					agentDepotService.getQueryAgentDepotList($rootScope.userInfo.orgId,$scope.storeWareDetail.state).then(function(data) {
						//代储库
						if(data!=null ){
							for(var agentDepotId in data){
								//根据agentDepotId和orgId获取仓房列表
								agentDepotService.getAgentStorehouseList(agentDepotId, $rootScope.userInfo.orgId).then(function(datas){
									$scope.storehouseList = datas;
								}, function (datas) {
									console.log(datas);
								});
						    }
						}
						
					}, function (data) {
						console.log(data);
					});
					
				}
				
			} else if ($scope.executeType == 3 ) { // 3为销售计划  
				
				//查询库存数量(本库中所有的)
		    	kcswService.queryKcData ($scope.storeWareDetail.state,null,null).then(function(kcData){
		    		if(kcData.length>0){
		    			if($scope.storeWareDetail.state!=$rootScope.userInfo.orgId){
		        			//代储库 所有的仓房列表
		        					agentDepotService.getQueryAgentDepotList($rootScope.userInfo.orgId,$scope.storeWareDetail.state).then(function(data) {
		        						//代储库
		        						if(data!=null ){
		        							for(var agentDepotId in data){
		        								//根据agentDepotId和orgId获取仓房列表
		        								agentDepotService.getAgentStorehouseList(agentDepotId, $rootScope.userInfo.orgId).then(function(datas){
		        									for (var j = 0; j < datas.length; j++) {
		        										for (var i = 0; i < kcData.length; i++) {
		        											if(kcData[i].kcsl!=0){
		        												if(datas[j].storehouseId == kcData[i].ch ){
		        													$scope.storehouseList.push(datas[j]);
		        													break;
		        												}
		        											}
		        										}
													}
		        									
		        								}, function (datas) {
		        									console.log(datas);
		        								});
		        							}
		        						}
		        						
		        					}, function (data) {
		        						console.log(data);
		        					});
		        					
		        			
		        		}else{
		        			//主库
		        			for (var i = 0; i < kcData.length; i++) {
		        				if(kcData[i].kcsl!=0){
		        					var ch = kcData[i].ch;
		        					for(var j = 0; j < $rootScope.storeAgentlist.length; j++){
		        						var storehouseId = $rootScope.storeAgentlist[j].storehouseId;
		        						if(storehouseId == ch){
		        							$scope.storehouseList.push(angular.copy($rootScope.storeAgentlist[j]));
		        							break;
		        						}
		        						
		        					}
		        				}
		        			}
		        		}
		    		}else{
		    				alert("该粮库没有符合条件的销售数据");
		    		}
		    		
				},function (kcData) {
					console.log(kcData);
				});
		    	
				
			}else if($scope.executeType == 2){ //2为轮换计划
				//查询库存中符合轮换计划的数据
				kcswService.queryLhData ($scope.storeWareDetail.state).then(function(LhData){
					if(LhData.length>0){
						if($scope.storeWareDetail.state!=$rootScope.userInfo.orgId){
		        			//代储库 所有的仓房列表
		        					agentDepotService.getQueryAgentDepotList($rootScope.userInfo.orgId,$scope.storeWareDetail.state).then(function(data) {
		        						//代储库
		        						if(data!=null ){
		        							for(var agentDepotId in data){
		        								//根据agentDepotId和orgId获取仓房列表
		        								agentDepotService.getAgentStorehouseList(agentDepotId, $rootScope.userInfo.orgId).then(function(datas){
		        									for (var j = 0; j < datas.length; j++) {
		        										for (var i = 0; i < LhData.length; i++) {
		        											if(LhData[i].kcsl!=0){
		        												if(datas[j].storehouseId == LhData[i].ch ){
		        													$scope.storehouseList.push(datas[j]);
		        													break;
		        												}
		        											}
		        										}
													}
		        									
		        								}, function (datas) {
		        									console.log(datas);
		        								});
		        							}
		        						}
		        						
		        					}, function (data) {
		        						console.log(data);
		        					});
		        		}else{
		        			//主库
		        			for (var i = 0; i < LhData.length; i++) {
		        				if(LhData[i].kcsl!=0){
		        					var ch = LhData[i].ch;
		        					for(var j = 0; j < $rootScope.storeAgentlist.length; j++){
		        						var storehouseId = $rootScope.storeAgentlist[j].storehouseId;
		        						if(storehouseId == ch){
		        							$scope.storehouseList.push(angular.copy($rootScope.storeAgentlist[j]));
		        							break;
		        						}
		        						
		        					}
		        				}
		        			}
		        		}
					}
				},function (LhData) {
					console.log(LhData);
				});
				
				
				
				
				
				
	        	//获取第三方检查中符合轮换计划
	        	qualitycheckService.getStoreQualityList ($scope.storeWareDetail.state).then(function(StoreQualitydata){
	        		
	        		if(StoreQualitydata!=null){
	        			
	        			if($rootScope.userInfo.orgId != $scope.storeWareDetail.state){ //代储库
	        				agentDepotService.getQueryAgentDepotList($rootScope.userInfo.orgId,$scope.storeWareDetail.state).then(function(data) {
	    						//代储库
	    						if(data!=null ){
	    							for(var agentDepotId in data){
	    								//根据agentDepotId和orgId获取仓房列表
	    								agentDepotService.getAgentStorehouseList(agentDepotId, $rootScope.userInfo.orgId).then(function(datas){
	    									if(datas.length>0){
	    										for (var j = 0; j < datas.length; j++) {
	    											for (var i = 0; i < StoreQualitydata.length; i++) {
	    												if(datas[j].storehouseId == StoreQualitydata[i].house_id){
	    													if($scope.storehouseList.indexOf(datas[j])==-1){ //不包含返回-1
	    														$scope.storehouseList.push(angular.copy(datas[j]));
		    													break;
	    													}
	    														
	    												}
			    		            				}
												}
	    									}
	    									
	    								}, function (datas) {
	    									console.log(datas);
	    								});
	    						    }
	    						}
	    						
	    					}, function (data) {
	    						console.log(data);
	    					});
	        			}else{
	        				
	        				//本库的第三方中不易存的数据
	        				for (var i = 0; i < StoreQualitydata.length; i++) {
	        					for(var j = 0; j < $rootScope.storeAgentlist.length; j++){
	        						if($rootScope.storeAgentlist[j].storehouseId == StoreQualitydata[i].house_id){
	        							if($scope.storehouseList.indexOf($rootScope.storeAgentlist[j])==-1){ //不包含返回-1
	        								$scope.storehouseList.push(angular.copy($rootScope.storeAgentlist[j]));
	        								break;
	        							}
	        						}
	        					}
		        			}
	        			}
	        		}
	        		
	    		},function (StoreQualitydata) {
	    			console.log(StoreQualitydata);
	    		});
	        	console.log($scope.storehouseList);
	        	if($scope.storehouseList!=null && $scope.storehouseList.length>0){
	        		alert("没有符合轮换条件的数据");
	        	}
			}
		}else{
			//如果粮库为空，其他都置为空
			$scope.storehouseList = [];
			$scope.storeWareDetail.houseId = "";
			$scope.storeWareDetail.warehouseId = "";
			$scope.storeWareDetail.grainAttribute="";
			$scope.getAttributeData();
			$scope.storeWareDetail.grainKind="";
			$scope.getGrainDetailKind();
			$scope.storeWareDetail.grainDetailKind="";
			$scope.storeWareDetail.grainAttribute="";
			//$scope.storeWareDetail.grainGrade="";
			$scope.storeWareDetail.grainGrade="";
			$scope.storeWareDetail.productiveYear="";
			$scope.storeWareDetail.grainAnnual="";
			$scope.storeWareDetail.inputTime  = "";
			$scope.storeWareDetail.grainProducingArea  = "";
			$scope.getAreaData();
			$scope.storeWareDetail.inCount="";
			$scope.storeWareDetail.inPrice="";
			$scope.storeWareDetail.inDetailTotalPrice="";
			$scope.storeWareDetail.outCount="";
			$scope.storeWareDetail.outPrice="";
			$scope.storeWareDetail.outDetailTotalPrice="";
			
		}
		
    }
    /*//销售计划 
    $scope.getXiaoshou = function () {
    	
    	$scope.warehouseList = [];
    	$scope.warehouse={warehouseId:null,warehouseName:null};
		warehouseService.getStorehouse($rootScope.userInfo.orgId, $scope.storeWareDetail.houseId, null).then(function(datas){
			$scope.wareList = datas.wareList;	//查询数据列表货位信息转换
			for(var i = 0; i < datas.wareList.length; i++){
				$scope.warehouse.warehouseId = $scope.wareList[i].warehouseId;
				$scope.warehouse.warehouseName = $scope.wareList[i].warehouseName;
				$scope.warehouseList.push(angular.copy($scope.warehouse));
				$scope.warehouseIdMap.set($scope.warehouse.warehouseId, $scope.warehouse);
    		}
		},function (datas) {
			console.log(datas);
		});
		
	}*/
    
    /*//获取仓房（轮换计划）
    $scope.getCh = function () {
    	var StoreQualityList;
    	//获取第三方检查中符合轮换计划
    	qualitycheckService.getStoreQualityList ().then(function(StoreQualitydata){
    		//StoreQualityList=StoreQualitydata;
    		  $scope.storehouseList = [];
    	    	storeWareDetailService.getChFromDsfjy(StoreQualitydata).then(function(data) {
    	    		if(null!=data && data.length>0){
    	    			for (var i = 0; i < data.length; i++) {
        					var storehouse={};
        					var ch = data[i];
            				$scope.storehouseList.push(angular.copy($rootScope.storehouseObj[ch]));
            				$scope.houseIdMap.set(ch, $scope.storehouseList);
        				}
    	    		}else{
    	    			alert("没有符合轮换条件的数据");
    	    		}
    	    		
    	    		
    			}, function (data) {
    				console.log(data);
    			});
		},function (StoreQualitydata) {
			console.log(StoreQualitydata);
		});
    	
        
	}*/

	// 仓房变更获取其下的货位
	$scope.houseChange = function () {
		if ($scope.storeWareDetail.houseId != null 
				&& $scope.storeWareDetail.houseId != undefined 
				&& $scope.storeWareDetail.houseId != '') {
			    // 查询库存 
			if ($scope.executeType == 1) {
				//主库的货位
				if($rootScope.userInfo.orgId == $scope.storeWareDetail.state){
					// 该仓房下所有的货位.
					warehouseService.getStorehouse($scope.storeWareDetail.state, $scope.storeWareDetail.houseId).then(function(data){
						$scope.warehouseList = data.wareList;  //下拉列表数据
						$scope.warehouseObj = data.wares;	//查询数据列表货位信息转换
					},function (data) {
						console.log(data);
					});
					/*$scope.warehouseList = $rootScope.wareAgentlist;
					alert($scope.warehouseList);*/
				}else{
					//代储库的货位
					   //根据当前的orgId和仓房的id  获取货位的列表
					agentDepotService.getAgentStoreWareList($rootScope.userInfo.orgId,$scope.storeWareDetail.houseId).then(function(data) {
						$scope.warehouseList = data;
					}, function (data) {
						console.log(data);
					});
					
				}
			} else if ($scope.executeType == 3 || $scope.executeType == 2) {
				$scope.warehouseList = [];
				if($scope.storeWareDetail.state != $rootScope.userInfo.orgId){ //代储库
					//代储库该仓房下所有的货位
					agentDepotService.getAgentStoreWareList($rootScope.userInfo.orgId,$scope.storeWareDetail.houseId).then(function(data) {
						
						if(data.length>0 && data!=null){
							//根据库的id和仓房id 查询库存
							kcswService.queryKcData ($scope.storeWareDetail.state,$scope.storeWareDetail.houseId,null).then(function(kcData){
								if(kcData.length>0 && kcData!=null){
									for (var i = 0; i < data.length; i++) {
										for (var j = 0; j < kcData.length; j++) {
											if(data[i].warehouseId == kcData[j].hwh){
													$scope.warehouseList.push(data[i]);
													break;
											}
										}
									}
								}
								
							}, function (kcData) {
								console.log(kcData);
							});
							
							if($scope.executeType == 2){
								qualitycheckService.getStoreQualityList ($scope.storeWareDetail.state).then(function(StoreQualitydata){
									for (var i = 0; i < data.length; i++) {
										for (var j = 0; j < StoreQualitydata.length; j++) {
											if(data[i].warehouseId == StoreQualitydata[j].warehouse_id){
												//console.log(!$scope.warehouseList.indexOf(data[i]));
												if($scope.warehouseList.indexOf(data[i])==-1){
													$scope.warehouseList.push(data[i]);
													break;
												}
												
											}
										}
									}
								}, function (StoreQualitydata) {
									console.log(StoreQualitydata);
								});
							}
						}
						
					}, function (data) {
						console.log(data);
					});
					
				}else{//主库
					//根据仓房id获取名称
					$scope.warehouse={warehouseId:null,warehouseName:null};
					warehouseService.getStorehouse($rootScope.userInfo.orgId, $scope.storeWareDetail.houseId, null).then(function(datas){
						$scope.wareList = datas.wareList;	//查询数据列表货位信息转换
						for(var i = 0; i < datas.wareList.length; i++){
							$scope.warehouse.warehouseId = $scope.wareList[i].warehouseId;
							$scope.warehouse.warehouseName = $scope.wareList[i].warehouseName;
							$scope.warehouseList.push(angular.copy($scope.warehouse));
							$scope.warehouseIdMap.set($scope.warehouse.warehouseId, $scope.warehouse);
			    		}
					},function (datas) {
						console.log(datas);
					});
					//$scope.warehouseList = $rootScope.wareAgentlist;
					
				}
				
					$scope.warehouseChange = function() {
						
						//改变货位时，清空数据
						$scope.storeWareDetail.grainKind=null;
						$scope.storeWareDetail.grainDetailKind=null;
						$scope.getGrainDetailKind(null);
						$scope.storeWareDetail.grainGrade=null;
						$scope.storeWareDetail.grainAttribute=null;
						$scope.getAttributeData();
						$scope.storeWareDetail.inputTime  =null;
						$scope.storeWareDetail.inCount=null;	
						$scope.storeWareDetail.outCount=null;	
						$scope.storeWareDetail.grainAnnual=null;
						$scope.storeWareDetail.grainProducingArea = null;
						$scope.getAreaData();
						
						//赋予数据
						$scope.qualitycheckList = [];
						
						if(items.executeType == 3156){
							
							qualitycheckService.getTrdStoreQualityList($scope.storeWareDetail.houseId,$scope.storeWareDetail.warehouseId).then(function(data){
								for (var i = 0; i < data.length; i++) {
									if(data[i].houseId==$scope.storeWareDetail.houseId && data[i].warehouseId==$scope.storeWareDetail.warehouseId){
										$scope.qualitycheckList.push(angular.copy(data[i]));
									}
								}
								
							},function (data) {
								console.log(data);
							});
							
						storeWareDetailService.getMassageFromKc($scope.storeWareDetail.houseId,$scope.storeWareDetail.warehouseId,$scope.qualitycheckList).then(function(data) {
							//定义原始的库存数量
							$rootScope.count = 0;
							$rootScope.countAnother = 0;
							
							if(data.qualitycheckList!=null && data.qualitycheckList!="[]"){
								$scope.warehouseIdEdit = false;
								var dataQuality = angular.fromJson(data.qualitycheckList);
								for (var i = 0; i < dataQuality.length; i++) {
									
									$scope.storeWareDetail.grainProducingArea = dataQuality[i].location;
									$scope.getAreaData($scope.storeWareDetail.grainProducingArea);
									
									//品种、明细品种
									$scope.storeWareDetail.grainKind = dataQuality[i].subType;
									$scope.storeWareDetail.grainDetailKind = dataQuality[i].subTypeDetailed;
									$scope.getGrainDetailKind($scope.storeWareDetail.grainKind);
									
									//粮食性质
									$scope.storeWareDetail.grainAttribute = dataQuality[i].quality;
									$scope.getAttributeData();
									//等级
									$scope.storeWareDetail.grainGrade = dataQuality[i].level;
									//收货年度
									$scope.storeWareDetail.grainAnnual = dataQuality[i].harvestTime;
									//入库时间
									$scope.storeWareDetail.inputTime = $filter('date')(dataQuality[i].inputTime, "yyyy-MM-dd");
									//轮入数量
									$scope.storeWareDetail.inCount=dataQuality[i].number;
									$scope.storeWareDetail.outCount=dataQuality[i].number;
									$rootScope.count=dataQuality[i].number;
									$rootScope.countAnother=dataQuality[i].number;
									
								}
								
							}
							if(data.list!=null){
								$scope.warehouseIdEdit = false;
								var dataList = angular.fromJson(data.list);
								for (var i = 0; i < dataList.length; i++) {
									//粮油性质
									$scope.storeWareDetail.grainAttribute=parseInt(dataList[i].hwxz);
									$scope.getAttributeData();
									//品种、明细品种
									$scope.storeWareDetail.grainKind=parseInt(dataList[i].pz);
									$scope.storeWareDetail.grainDetailKind=parseInt(dataList[i].mxpz);
									$scope.getGrainDetailKind($scope.storeWareDetail.grainKind);

									$scope.storeWareDetail.grainGrade=parseInt(dataList[i].dj);
									//粮油产地
									$scope.storeWareDetail.grainProducingArea=parseInt(dataList[i].gb);
									$scope.getAreaData($scope.storeWareDetail.grainProducingArea);
									
									$scope.storeWareDetail.inputTime  = $filter('date')(dataList[i].rq, "yyyy-MM-dd");
									
									$scope.storeWareDetail.inCount=dataList[i].kcsl;
									$scope.storeWareDetail.outCount=dataList[i].kcsl;
									$rootScope.count = dataList[i].kcsl;
									$rootScope.countAnother = dataList[i].kcsl;
								}
							}
							
						},function (data) {
							console.log(data);
						});
					 }else{
						 //销售计划
						 kcswService.queryKcData ($scope.storeWareDetail.state,$scope.storeWareDetail.houseId,$scope.storeWareDetail.warehouseId).then(function(data){
					    		for(var i = 0; i < data.length; i++){
					    			$scope.storeWareDetail.grainAttribute=parseInt(data[i].hwxz);
									$scope.getAttributeData();
									//品种、明细品种
									$scope.storeWareDetail.grainKind=parseInt(data[i].pz);
									$scope.storeWareDetail.grainDetailKind=parseInt(data[i].mxpz);
									$scope.getGrainDetailKind($scope.storeWareDetail.grainKind);
									$scope.storeWareDetail.grainGrade=parseInt(data[i].dj);
									//粮油产地
									$scope.storeWareDetail.grainProducingArea=parseInt(data[i].gb);
									$scope.getAreaData($scope.storeWareDetail.grainProducingArea);
									$scope.storeWareDetail.inputTime  = $filter('date')(data[i].rq, "yyyy-MM-dd");
									$scope.storeWareDetail.outCount=data[i].kcsl;
									$rootScope.countAnother = data[i].kcsl;
					    		}
					    		
							},function (data) {
								console.log(data);
							});
					 }
					},function (data) {
						console.log(data);
					}
				}
			
		} else {
			// 设置货位号为空.
			$scope.warehouseList = [];
			$scope.storeWareDetail.warehouseId = "";
			$scope.storeWareDetail.grainAttribute="";
			$scope.getAttributeData();
			$scope.storeWareDetail.grainKind="";
			$scope.getGrainDetailKind();
			$scope.storeWareDetail.grainDetailKind="";
			$scope.storeWareDetail.grainAttribute="";
			//$scope.storeWareDetail.grainGrade="";
			$scope.storeWareDetail.grainGrade="";
			
			$scope.storeWareDetail.productiveYear="";
			$scope.storeWareDetail.grainAnnual="";
			$scope.storeWareDetail.inputTime  = "";
			$scope.storeWareDetail.grainProducingArea  = "";
			$scope.getAreaData();
			$scope.storeWareDetail.inCount="";
			$scope.storeWareDetail.inPrice="";
			$scope.storeWareDetail.inDetailTotalPrice="";
			$scope.storeWareDetail.outCount="";
			$scope.storeWareDetail.outPrice="";
			$scope.storeWareDetail.outDetailTotalPrice="";
			 
		}
		
	}
	
	
	$scope.houseIdEdit = true;
	$scope.warehouseIdEdit = true;
	
	
	// 获取从触发方法带过来的数据.
	if (items != undefined) {
		
		$scope.attributeType = items.attributeType;
		
		//粮库名称
		$scope.storeWareDetail.state = items.state;
		// 仓房id.
		$scope.storeWareDetail.houseId = items.houseId;
		// 货位id.
		$scope.storeWareDetail.warehouseId = items.warehouseId;
		
		$scope.storeWareDetail.grainKind = items.grainKind;
		$scope.storeWareDetail.grainDetailKind = items.grainDetailKind;

		$scope.storeWareDetail.grainAttribute = items.grainAttribute;

		$scope.storeWareDetail.grainGrade = items.grainGrade;
		$scope.storeWareDetail.grainAnnual = items.grainAnnual;
		$scope.storeWareDetail.productiveYear = items.productiveYear;

		$scope.storeWareDetail.inputTime = items.inputTime;
		$scope.storeWareDetail.grainProducingArea = items.grainProducingArea;
		$scope.storeWareDetail.inPrice = items.inPrice;
		$scope.storeWareDetail.inCount = items.inCount;
		$scope.storeWareDetail.outCount = items.outCount;
		$scope.storeWareDetail.outPrice = items.outPrice;
		$rootScope.count = items.originalCount;
		$rootScope.countAnother = items.originalCountAnother;
		$scope.storeWareDetail.remainingNumber = items.remainingNumber; //剩余数量
		$scope.storeWareDetail.outRemainingNumber = items.outRemainingNumber; //剩余数量
		$scope.storeWareDetail.inDetailTotalPrice = items.inDetailTotalPrice;
		$scope.storeWareDetail.outDetailTotalPrice = items.outDetailTotalPrice;
		
		$scope.storeWareDetail.planRemainingNumber = items.planRemainingNumber; 
		$scope.storeWareDetail.planOutRemainingNumber = items.planOutRemainingNumber; 
		
		 $scope.getAttributeData();
		 $scope.getAreaData();
		 $scope.getGrainDetailKind(items.grainKind);
		
		// 明细类型，区分是合同还是计划还是通知单.
		$scope.detailType = items.detailType;
		$scope.isshow = false; 
		$scope.isOutshow = false; 
		$scope.lunru=false;
		$scope.lunchu=false;
		$scope.xiaoshou=false;
		$scope.shouchu=false;
		if ($scope.detailType == "plan") { // 明细类型为计划.
			if (items.executeType == 3154) {
				// 入库
				$scope.executeType = 1;
				$scope.shouchu=true;
			} else if (items.executeType == 3155) {
				// 出库
				$scope.executeType = 3;
				$scope.xiaoshou=true;
			}else if ( items.executeType == 3156) {
				// 轮换计划
				$scope.executeType = 2;
				$scope.lunru=true;
				$scope.lunchu=true;
				
			}
		} else if ($scope.detailType == "contract") { // 明细类型为合同.
			if (items.executeType == 3147) { // 收购.
				// 入库
				$scope.executeType = 1;
				$scope.shouchu=true;
				if(items.planNumber!=null){
					$scope.isshow = true;
				}
				
			} else if (items.executeType == 3148) { // 销售
				// 出库
				$scope.executeType = 3;
				$scope.xiaoshou=true;
				if(items.planNumber!=null){
					$scope.isOutshow = true;
				}
				
			}
		} else if ($scope.detailType == "notice") { // 明细类型为通知单.
			$scope.executeType = items.executeType;
			if($scope.executeType == 1){ //入库
				$scope.shouchu=true;
				$scope.isshow = true;
			}
			if($scope.executeType == 3){ //出库
				$scope.xiaoshou=true;
				$scope.isOutshow = true;
			}
		}
		
		
		// 粮食品种.
		$scope.grainKind = items.grainKind;
		// 粮食明细品种.
		$scope.grainDetailKind = items.grainDetailKind;
		// 粮食产地
		$scope.grainProducingArea = items.grainProducingArea;
		// 粮食等级.
		$scope.grainGrade = items.grainGrade;
		// 粮食性质.
		$scope.grainAttribute = items.grainAttribute;
		
		// 判断出入库类型.
		if ($scope.executeType != undefined) {
				$scope.getDepotData();
				$scope.depotChange();
				$scope.houseChange();
		}
	}
	
	 //总价
	$scope.totalPrice = function () {

		if ($scope.detailType != "plan" && $rootScope.count != "N") {
			if(($rootScope.count - $scope.storeWareDetail.inCount) < 0){
				var nums = $scope.storeWareDetail.inCount - $rootScope.count;
				var titles = "所填数量超出该货位剩余数量"+nums+"公斤";
				alert(titles);
				$scope.storeWareDetail.remainingNumber = "超出:"+nums;
			}else{
				$scope.storeWareDetail.remainingNumber = $rootScope.count - $scope.storeWareDetail.inCount;
			}
		}
		
		if ( $scope.storeWareDetail.inPrice != undefined &&  $scope.storeWareDetail.inCount != null && $scope.storeWareDetail.inPrice != null && $scope.storeWareDetail.inCount != undefined) {
      		 $scope.storeWareDetail.inDetailTotalPrice = commonUtilService.accMul($scope.storeWareDetail.inCount, $scope.storeWareDetail.inPrice);
        }else{
       	     $scope.storeWareDetail.inDetailTotalPrice = 0 ;
        }
        
        
    }
	
	$scope.outTotalPrice = function () {
		if ($scope.detailType != "plan" && $rootScope.count != "N"){
			if(($rootScope.countAnother - $scope.storeWareDetail.outCount) < 0){
				var nums = $scope.storeWareDetail.outCount - $rootScope.countAnother;
				var titles = "所填数量超出该货位剩余数量"+nums+"公斤";
				alert(titles);
				$scope.storeWareDetail.outRemainingNumber = "超出:"+nums;
			}else{
				$scope.storeWareDetail.outRemainingNumber = $rootScope.countAnother - $scope.storeWareDetail.outCount;
			}
		}
		if ( $scope.storeWareDetail.outPrice != null &&  $scope.storeWareDetail.outCount != null) {
			$scope.storeWareDetail.outDetailTotalPrice = commonUtilService.accMul($scope.storeWareDetail.outCount, $scope.storeWareDetail.outPrice);
		}else{
			$scope.storeWareDetail.outDetailTotalPrice = 0;
		}
	}
	
	//粮油性质必选的验证
    $scope.selectOnlyAttribute = function(item, selectedItems) {
        if (item  !== undefined) {
            $("#grainAttribute-error").text("");
            //var treeInput=doucment.getElementById("grainAttribute-label");
             var treeInput=document.getElementsByClassName("tree-input")[1];
             treeInput.style.background="#fff";
             treeInput.style.borderColor="#ccc"
        } else {
            $("#grainAttribute-error").text("必须填写");
        }
    };
	
    //明细品种必选的验证
    $scope.selectOnlyDetailKind = function(item, selectedItems) {
        if (item  !== undefined) {
             $("#grainDetailKind-error").text("");
             var treeInput=document.getElementsByClassName("tree-input")[0];
             treeInput.style.background="#fff";
             treeInput.style.borderColor="#ccc"
        } else {
             $("#grainDetailKind-error").text("必须填写");
        }
		
    };
	
    //粮油产地必选的验证
    $scope.selectOnlyProducingArea = function(item, selectedItems) {
        if (item  !== undefined) {
            $("#grainProducingArea-error").text("");
            //var grainAttributeLabel=doucment.getElementById("grainProducingArea-label");
            var grainAttributeLabel=document.getElementsByClassName("tree-input")[2];
             grainAttributeLabel.style.background="#fff";
             grainAttributeLabel.style.borderColor="#ccc"
        } else {
            $("#grainProducingArea-error").text("必须填写");
			
        }
    };
    
    var validator = null;
    
    // 提交表单
    $scope.save = function() {
    	
    	//验证价格
    	if(null != $scope.storeWareDetail.inPrice && undefined != $scope.storeWareDetail.inPrice && ""!=$scope.storeWareDetail.inPrice){
    		if($scope.storeWareDetail.inPrice == 0 || $scope.storeWareDetail.inPrice == 0.0 ||$scope.storeWareDetail.inPrice == 0.00) {
    			alert("请输入大于0的单价");
    			$scope.storeWareDetail.inPrice = "";
    			return false ;  
    		}
		}
    	if(null != $scope.storeWareDetail.outPrice && undefined != $scope.storeWareDetail.outPrice && ""!=$scope.storeWareDetail.outPrice){
    		if($scope.storeWareDetail.outPrice == 0 || $scope.storeWareDetail.outPrice == 0.0 || $scope.storeWareDetail.outPrice == 0.00) {
    			alert("请输入大于0的单价");
    			$scope.storeWareDetail.outPrice = "";
    			return false ; 
    		}
    	}
    	
    	//校验数量
    	if(null != $scope.storeWareDetail.inCount && undefined != $scope.storeWareDetail.inCount && ""!=$scope.storeWareDetail.inCount){
    		if($scope.storeWareDetail.inCount == 0 || $scope.storeWareDetail.inCount == 0.0 ||$scope.storeWareDetail.inCount == 0.00) {
    			alert("请输入大于0的数量");
    			$scope.storeWareDetail.inCount = "";
    			return false ;  
    		}
    	}
    	if(null != $scope.storeWareDetail.outCount && undefined != $scope.storeWareDetail.outCount && ""!=$scope.storeWareDetail.outCount){
    		if($scope.storeWareDetail.outCount == 0 || $scope.storeWareDetail.outCount == 0.0 || $scope.storeWareDetail.outCount == 0.00) {
    			alert("请输入大于0的数量");
    			$scope.storeWareDetail.outCount = "";
    			return false ; 
    		}
    	}
    	
    	//新增时，给剩余数量赋值
    	if($scope.detailType == "plan" || (items.planNumber==null && $scope.detailType == "contract") ){
    		if($scope.storeWareDetail.inCount!=null && $scope.storeWareDetail.outCount==null){
    			$scope.storeWareDetail.remainingNumber = $scope.storeWareDetail.inCount;
    		}
    		if($scope.storeWareDetail.outCount!=null && $scope.storeWareDetail.inCount==null){
    			$scope.storeWareDetail.outRemainingNumber = $scope.storeWareDetail.outCount;
    		}
    		if($scope.storeWareDetail.inCount!=null && $scope.storeWareDetail.outCount!=null){
    			$scope.storeWareDetail.remainingNumber = $scope.storeWareDetail.inCount;
    			$scope.storeWareDetail.outRemainingNumber = $scope.storeWareDetail.outCount;
    		}
    	}
    	
    	var titles = "";
    	if($scope.detailType != "plan"){//计划不提示
    		if($scope.executeType = 1 && $rootScope.count != "N"){ //收购
    			if(($rootScope.count - $scope.storeWareDetail.inCount) < 0){
    				var nums = $scope.storeWareDetail.inCount - $rootScope.count;
    				var titles = "所填数量超出该货位剩余数量"+nums+"公斤";
    			}
    		}
    		if($scope.executeType = 3 && $rootScope.count != "N"){ //销售
    			if(($rootScope.countAnother - $scope.storeWareDetail.outCount) < 0){
    				var nums = $scope.storeWareDetail.outCount - $rootScope.countAnother;
    				var titles = "所填数量超出该货位剩余数量"+nums+"公斤";
    			}
    		}
    	}
    	
    	// 模态框的校验器，进入时为空.
    	if (validator == null) {
    		validator = $("#storeWareDetail-form").validate();
    		/*$.validator.addMethod("validModalNumber",function(value,element, params) {
    			var checkNumber = /^\d*\.{0,1}\d{1,2}$/g;
    			if (this.optional(element)||(checkNumber.test(value))) {
					return true
    			} else {
    				return false;
    			}
    		},"请输入正确的数字类型，最多两位小数！");*/
    		
    		
    		//明细品种必选的验证
    		$scope.grainDetailKind = angular.fromJson($scope.storeWareDetail.grainDetailKind);
             if ($scope.grainDetailKind == '' || $scope.grainDetailKind == null) {
                 $("#grainDetailKind-error").text("必须填写");
                 var treeInput=document.getElementsByClassName("tree-input")[0];
                 treeInput.style.background="#fff0f0";
                 treeInput.style.borderColor="#A90329"
             } else {
                 $("#grainDetailKind-error").text("");
             }
             
             
             //粮油性质必选的验证
             $scope.grainAttribute = angular.fromJson($scope.storeWareDetail.grainAttribute);
             if ($scope.grainAttribute == '' || $scope.grainAttribute == null) {
                 $("#grainAttribute-error").text("必须填写");
                 var treeInput=document.getElementsByClassName("tree-input")[1];
                 treeInput.style.background="#fff0f0";
                 treeInput.style.borderColor="#A90329"
             } else {
                 $("#grainAttribute-error").text("");
             }
             
             
             //粮油产地必选的验证
             $scope.grainProducingArea = angular.fromJson($scope.storeWareDetail.grainProducingArea);
             if ($scope.grainProducingArea == '' || $scope.grainProducingArea == null) {
                 $("#grainProducingArea-error").text("必须填写");
                 var treeInput=document.getElementsByClassName("tree-input")[2];
                 treeInput.style.background="#fff0f0";
                 treeInput.style.borderColor="#A90329"
             } else {
                 $("#grainProducingArea-error").text("");
             }
             
            if(titles != ""){ 
            	alert(titles);
         	} 
         	$scope.save();
            
    	} else {
    		
            if (validator.form()) {
            	
            	//明细品种
         	    $scope.grainDetailKind = angular.fromJson($scope.storeWareDetail.grainDetailKind);
         	    var num = angular.isNumber($scope.grainDetailKind);
         	    if(!num){
         	    	 $scope.storeWareDetail.grainDetailKind = $scope.grainDetailKind[0].id;
         	    }
         	   
                 
                 //粮油性质
                 $scope.grainAttribute = angular.fromJson($scope.storeWareDetail.grainAttribute);
                 var attribute = angular.isNumber($scope.grainAttribute);
                 if(!attribute){
                	 $scope.storeWareDetail.grainAttribute = $scope.grainAttribute[0].id;
                 }
                 
                 
                 //粮油产地
                 $scope.grainProducingArea = angular.fromJson($scope.storeWareDetail.grainProducingArea);
                 var area = angular.isNumber($scope.grainProducingArea);
                 if(!area){
                	 $scope.storeWareDetail.grainProducingArea = $scope.grainProducingArea[0].id;
                 }
                 
                 
                 //根据id获取粮库的名称 仓房 货位名称
                
                 if($rootScope.depotInfo.orgId == $scope.storeWareDetail.state){ //主库
                	$scope.storeWareDetail.houseName = $rootScope.storehouseObj[$scope.storeWareDetail.houseId].storehouseName;
              		$scope.storeWareDetail.warehouseName=$rootScope.wares[$scope.storeWareDetail.warehouseId].warehouseName;
                 }else{ //代储库
                	 $rootScope.agentDepot = {};
                	 for (var i = 0; i < $scope.agentDepotList.length; i++) { //粮库名称
						if($scope.storeWareDetail.state == $scope.agentDepotList[i].depotId){
							$rootScope.agentDepot.agentDepotName = $scope.agentDepotList[i].agentDepotName;
						}
					}
                 }
                 
                
         		//获取最新的剩余数量
         		if(items.id!=null && items.id!='undefined'){
         			contractService.loadDataByIdAndProcessInstanceId(items.id, null).then(function(data){
         				if(data.storeWareDetailList[0].planRemainingNumber!=null){
         					
         					$scope.storeWareDetail.planRemainingNumber = data.storeWareDetailList[0].planRemainingNumber;
         				}
         				if(data.storeWareDetailList[0].planOutRemainingNumber!=null){
         					
         					$scope.storeWareDetail.planOutRemainingNumber = data.storeWareDetailList[0].planOutRemainingNumber;

         				}
         				$uibModalInstance.close($scope.storeWareDetail);
         				
         			},function(data){
         				console.log(data);
         			});
         		}else if(items.copyId!=null){
         			
         				$uibModalInstance.close($scope.storeWareDetail);
         		}else{
         			$uibModalInstance.close($scope.storeWareDetail);
         		}

            }
    	}

    }
    
	// 关闭模态窗口
	$scope.cancel = function() {
		$uibModalInstance.close();
	}
	
	
});