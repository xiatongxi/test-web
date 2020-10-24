angular.module('app.business').controller("deliveryStorageNoticeAuditSaveCtrl", 
		function($scope, $http, $stateParams, $filter, $uibModal,$state, $rootScope,agentDepotService,
				deliveryStorageNoticeAuditService, deliveryStorageNoticeService,StorehouseService, warehouseService, enumService, APP_CONFIG) {
	
	
	 //代储库数据
    $scope.agentList = [];
    $scope.agentDepotList = [];
    $scope.agentDepotLista = function(){
    	// 000 是不取手动增加的库点
        agentDepotService.getQueryAgentDepotList($rootScope.userInfo.orgId,"000").then(function(data) {
			//代储库
			if(data!=null ){
				$scope.agentList.push(data);
				for(var id in $scope.agentList){
					for(var key in $scope.agentList[id]){
						$scope.agentDepotList.push($scope.agentList[id][key]);
					}
			    }
			}
		}, function (data) {
			console.log(data);
		});
    }
    $scope.agentDepotLista();
    
    $scope.loadDataById = function(id, processInstanceId) {
            deliveryStorageNoticeAuditService.loadDataById(id, processInstanceId).then(function(data){
            $scope.deliveryStorageNotice = data.deliveryStorageNotice;
            //运输方式
            $scope.deliveryStorageNotice.qualityStandard = parseInt(data.deliveryStorageNotice.qualityStandard);
           
            
            $scope.auditList = data.auditList;

            
            $scope.processDefinitionId = data.deliveryStorageNotice.processDefinitionId;
            $scope.processInstanceId = data.deliveryStorageNotice.processInstanceId;
            $scope.deliveryStorageNotice.storageTime = $filter('date')($scope.deliveryStorageNotice.storageTime, "yyyy-MM-dd"); 
            
            // 子表数据.
            $scope.storeWareDetailList = data.storeWareDetailList;
            for (var i=0; i < data.storeWareDetailList.length; i++) {
                $scope.addedDetail.push(angular.copy(data.storeWareDetailList[i]));
            }
            
            /*$scope.getAttributeData();
            $scope.getAreaData();
            $scope.getGrainDetailKind();*/
        },function(data){
        });
    }
    
    // 输入框禁止修改.
    $scope.isNotEdit = true;
    $scope.isAudit = true;
    // 用于存放新增的数据
    $scope.addedDetail = [];
    
    

    $scope.retList = function () {
    	if ($rootScope.previousState_name != '') {
        	if($rootScope.previousState_name.indexOf("app.additionalHome") != -1){//首页跳转的返回首页
        		$rootScope.isIndexPage = true;
        	}
            $rootScope.back();
        } else {
        	$scope.deliveryStorageNotice = {};
        	if ($stateParams.type=="todo"){
       		    $state.go("app.business.handle-view");
           	} else if ($stateParams.type=="complete"){
           		$state.go("app.business.handles-view");
           	} else {
           		$state.go("app.business.deliveryStorageNotice-audit");
           	}
        }

        
    }
    
    // 选择审批人.
    $scope.choice = function(auditResult) {
		$scope.modelItem = [];

        $scope.modelItem.allContent = $scope.deliveryStorageNotice;

		$scope.modelItem.auditResult = auditResult;
        $scope.modelItem.variable = "2";

        if($scope.deliveryStorageNotice.taskName == '经营部经理审批'){ //如果是库领导审批审批说明是最后一步，直接通过
            $scope.audit($scope.modelItem.auditResult, null);
        }else{
            // 展开药品采购详情.
            var modalInstance = $uibModal.open({
                size : 'md',
                templateUrl: 'app/business/util/views/choiceUser-view.html',
                controller: 'choiceUserModalCtrl',
                resolve: {
                    // items是一个回调函数
                    items: function () {
                        // 这个值会被模态框的控制器获取到
                        return $scope.modelItem;
                    }
                }
            });

            // 回调函数.
            modalInstance.result.then(function (result) {
                if (result.returnType == "cancel") {
                    // 不做操作.
                } else if (result.returnType == "submit") {
                    // 审批人.
                    $scope.audit($scope.modelItem.auditResult, result.assignee);
                } else if (result.returnType == "isEnd") {

                    $scope.audit($scope.modelItem.auditResult, null);
                }
            }, function (reason) {
                console.log(reason);
            });
        }
    }
    
    
    // 树形下拉框(粮食性质)
    $scope.getAttributeData = function() {
        enumService.getTreeList($scope.deliveryStorageNotice.grainAttribute, "grainAttribute").then(function(data) {
            $scope.grainAttributeTreeData = data;
        },function(data) {
            console.log(data);
        })
    }

    // 树形下拉框(粮食产地)
    $scope.getAreaData = function() {
        enumService.getTreeList($scope.deliveryStorageNotice.grainProducingArea, "grainProducingArea").then(function(data) {
            $scope.grainProducingAreaTreeData = data;
        },function(data){
            console.log(data);
        })
    }
    
    // 树形下拉框(明细品种)
    /*$scope.getGrainDetailKind = function() {
        enumService.getTreeListByParentId($scope.deliveryStorageNotice.grainDetailKind, "grainDetailKind", $scope.deliveryStorageNotice.goodsKind).then(function(data) {
            $scope.grainDetailKindTreeData = data;
        },function(data) {
            console.log(data);
        })
    };*/

    
    // 如果id不为0，说明是查询或者查看，需要查询后台.
    if ($stateParams.id != 0) {
        $scope.processInstanceId = $stateParams.processInstanceId;
        $scope.taskId = $stateParams.taskId;
        $scope.auditId = $stateParams.auditId;
        $scope.noticeType = $stateParams.noticeType;
        $scope.isAudit = $stateParams.isAudit;
        //新增页面，不进行操作；修改页面查询后台数据，并且赋值页面
        $scope.loadDataById($stateParams.id, $scope.processInstanceId);
       
    }
    
    // 审批.
    $scope.audit = function (auditResult, assignee) {
    	if($scope.audit.content==null && auditResult != 1 ){
			alert("请填写审批意见");
		}else{
			
			$http({
				method: 'POST',
				url: APP_CONFIG.businessUrl + '/depot/business/deliveryStorageNotice/audit/audit',
				data: {
					deliveryStorageNoticeId : $scope.deliveryStorageNotice.id,
					result : auditResult,
					content : $scope.audit.content,
					processInstanceId : $scope.processInstanceId,
					taskId : $scope.taskId,
					id : $scope.auditId,
					assignee : assignee,
					userName : $rootScope.userInfo.userName
				}
			}).then(function successCallback(response) {
				// 请求成功执行代码
				alert("审批成功！");
				// 返回到审批列表.
				$scope.retList();
			}, function errorCallback(response) {
				// 请求失败执行代码
				console.log(response);
			});
		}
         
    }

     
});
