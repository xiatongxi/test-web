"use strict";

angular.module('app.system').controller("orgCtrl", function($scope, $rootScope, $filter, $state, $stateParams, $uibModal, orgService, APP_CONFIG,WareHouseBasicInfoService) {

	// 获取列表数据
	$scope.search = {orgName:""};
	$scope.loadData = function() {
		orgService.getPageInfo(null,null,null,$scope.search.orgName).then(function(data){
			$scope.orglist = data.list;
		   	// 构建组织等级
		   	$scope.fillLevel($rootScope.orgInfo.parentId, 0);
		   	// 构建树表格
			$scope.drawTable();
		},function(data){
			console.log(data);
		});
	}
	$scope.loadData();

	// 通过递归给组织赋等级
	$scope.fillLevel = function(parentId, level) {
		angular.forEach($scope.orglist, function(item, index) {
			if (item.parentId == parentId) {
				item.level = level;
				$scope.fillLevel(item.orgId, level+1);
			}
		})
	}
	
	// 生成表格树
	$scope.drawTable = function() {
		$("#tb").bootstrapTable('destroy');
		$('#tb').bootstrapTable({
	        data: $scope.orglist,	//数据源，必须包含parentId属性
	        treeView: true,
	        treeId: "orgId",
	        treeField: "orgName",
	        formatLoadingMessage: function () {  
	            return "";  
	        },  
	        columns: [{  
	            field: 'orgId',  
	        }, {  
	            field: 'orgName',  
	        }, {  
	        	formatter: function operateFormatter(value, row, index) {
        			return $rootScope.dicData[row.orgClassId];
	        	}
	        }, {  
	            field: 'address',  
	        },{  
	            field: 'chargePerson',  
	        },{  
	            field: 'contact',  
	        },{  
	        	events: operateEvents,
	            formatter: operateFormatter
	        }] 
		})
	}
	
	// 为操作列按钮绑定事件
	window.operateEvents = {
		'click #add': function (e, value, row, index) {
			$state.go("app.system.org.edit", {parentId:row.orgId});
		},
        'click #addDepart': function (e, value, row, index) {
            $scope.editDepartment(null, row.orgId);
        },
		'click #edit': function (e, value, row, index) {
			if (row.orgClassId==5527) {
                $scope.editDepartment(row.orgId, row.parentId);
			} else {
                $state.go("app.system.org.edit", {orgId:row.orgId, parentId:row.parentId});
			}
		},
		'click #delete': function (e, value, row, index) {
			if (!confirm("确定要删除吗？")) {
				return;
			}
			orgService.deleteOrg(row.orgId).then(function(data){
				// 重新加载数据
				$scope.loadData();
				// 删除多余字段
				delete row.level;
                WareHouseBasicInfoService.saveGrainpoint(row,'D').then(function(data) {
                }, function(data) {
                    console.log(data);
                });
		    },function(data){
		        console.log(data);
		    });
		},
        'click #profile': function (e, value, row, index) {
            $state.go("app.system.org.profile", {orgId:row.orgId});
        }
	};
	
	// 操作列按钮
	function operateFormatter(value, row, index) {
        var btns = [];
        if (row.orgClassId != 5527) {
            btns.push('<a href="javascript:void(0)" id="add"><i class="fa fa-plus"></i> 下级组织</a>');
        }
        btns.push('<a href="javascript:void(0)" id="addDepart"><i class="fa fa-plus"></i> 部门</a>&nbsp;');
        btns.push('<a href="javascript:void(0)" id="edit"><i class="fa fa-edit"></i> 修改</a>&nbsp;');
        btns.push('<a href="javascript:void(0)" id="delete"><i class="fa fa-trash-o"></i> 删除</a>&nbsp;');
        if (row.orgClassId == 5318) {
        	btns.push('<a href="javascript:void(0)" id="profile"><i class="fa fa-file-image-o"></i> 粮库简介</a>');
		}
		return btns;
    }

    // 点击新增或者修改时弹出模态窗
    $scope.editDepartment = function(orgId, parentId) {
        var uibModalInstance = $uibModal.open({
            size:'md',
            templateUrl: 'app/system/views/department.html',
            controller: 'departmentCtrl',
            resolve: {
                orgId : orgId,
                parentId : parentId
            }
        });
        uibModalInstance.result.then(function (result) {
            $scope.loadData();	// 关闭模态框时刷新页面数据
        }, function (reason) {
            console.log(reason);
        });
    }

});

angular.module('app.system').controller("orgEditCtrl",
function($scope, $rootScope, $state, $stateParams, $filter, orgService, enumService, FileUploader, APP_CONFIG,WareHouseBasicInfoService) {

	// 获取组织信息
	$scope.loadOrg = function() {
		orgService.editOrg($stateParams.orgId).then(function(data) {
			$scope.orgInfo = data;
			if (!$stateParams.orgId) {
				$scope.orgInfo.parentId = $stateParams.parentId;
				//$scope.orgInfo.registDate = new Date();
				$scope.orgInfo.infoRegist = $rootScope.userInfo.realName;
				$scope.orgInfo.depotProperty = "1";
			} else {
				$scope.setArea($scope.orgInfo.areaCode);
				$scope.orgInfo.registDate = $filter('date')($scope.orgInfo.registDate, "yyyy-MM-dd");
				$scope.orgInfo.completeDate = $filter('date')($scope.orgInfo.completeDate, "yyyy-MM-dd");
				$scope.orgInfo.useDate = $filter('date')($scope.orgInfo.useDate, "yyyy-MM-dd");
				$scope.orgInfo.depotProperty = $scope.orgInfo.depotProperty == null ? "1":$scope.orgInfo.depotProperty;
			}
		}, function(data) {
			console.log(data);
		});
	}
	
	// 获取行政区划数据
	enumService.getAllChildren(1010).then(function(data) {
		$scope.areaMap = {};
		angular.forEach(data, function(item, index) {
			$scope.areaMap[item.enumid] = item;
		})
		$scope.loadOrg();
	}, function(data) {
		console.log(data);
	});
	
	$scope.validCode = function(){
		var checkNumber = /^\d{3}$/;
		var val = $scope.orgInfo.orgCode;
		if(!checkNumber.test(val)){
			$scope.orgInfo.orgCode = null;
			alert("请输入三位数字！");
		}
	}

	// 提交表单
	var validator = $("#org-form").validate();
    // 自定义验证，验证数字
    $.validator.addMethod("validNumber",function(value,element, params) {
        var checkNumber = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;  
        return this.optional(element)||(checkNumber.test(value));  
    },"请输入大于0的数字，最多两位小数！");
    
    $.validator.addMethod("validInteger",function(value,element, params) {
        var checkNumber = /^\d*$/g;  
        return this.optional(element)||(checkNumber.test(value));  
    },"请输入正确的正整数！");
    
    $.validator.addMethod("isLong",function(value,element, params) {
    	var checkNumber = /^(([1-9]\\d?)|(1[0-7]\\d))(\\.\\d{1,6})|180|0(\\.\\d{1,6})?$/;  
    	if(checkNumber.test(value)){
    		if(73.660000 <= parseFloat(value) && parseFloat(value) <= 135.050000){
    			return this.optional(element)|| true; 
    		}else{
    			return this.optional(element)|| false; 
    		}
    	}else{
    		return this.optional(element)||(checkNumber.test(value));  
    	}
    },"经度格式不正确或者范围在中国之外！");
    
    $.validator.addMethod("isLa",function(value,element, params) {
    	var checkNumber = /^(([1-8]\\d?)|([1-8]\\d))(\\.\\d{1,6})|90|0(\\.\\d{1,6})?$/;  
    	if(checkNumber.test(value)){
    		if(3.860000 <= parseFloat(value) && parseFloat(value) <= 53.550000){
    			return this.optional(element)|| true; 
    		}else{
    			return this.optional(element)|| false; 
    		}
    	}else{
    		return this.optional(element)||(checkNumber.test(value));  
    	}  
    },"纬度格式不正确或者范围在中国之外！");
    
    $.validator.addMethod("validPhone",function(value,element, params) {
    	var checkNumber = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;  
    	return this.optional(element)||(checkNumber.test(value));  
    },"手机号或座机号不正确！");
    
    $.validator.addMethod("validCard",function(value,element, params) {
    	var checkNumber = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;  
    	return this.optional(element)||(checkNumber.test(value));  
    },"身份证号格式不正确！");
    
    $.validator.addMethod("validEmail",function(value,element, params) {
    	var checkNumber = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;  
    	return this.optional(element)||(checkNumber.test(value));  
    },"邮箱格式不正确！");
    
    $.validator.addMethod("validPost",function(value,element, params) {
    	var checkNumber = /^[0-9][0-9]{5}$/;  
    	return this.optional(element)||(checkNumber.test(value));  
    },"邮政编码不正确！");
    
    $.validator.addMethod("validWebsite",function(value,element, params) {
    	var checkNumber = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;  
    	return this.optional(element)||(checkNumber.test(value));  
    },"网站地址不正确！");
    
    $.validator.addMethod("validFax",function(value,element, params) {
    	var checkNumber = /^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/;  
    	return this.optional(element)||(checkNumber.test(value));  
    },"传真号码不正确！");
    
    $.validator.addMethod("validHouseAndWare",function(value,element, params) {
    	var checkNumber = /^\d*$/g; 
    	if(!checkNumber.test(value)){
    		return this.optional(element); 
    	}else{
    		if($("input[name='houseNumber']").val() == "0" && $("input[name='tankNumber']").val() == "0"){
    			return this.optional(element);
    		}else{
    			return this.optional(element) || true;
    		}
    	}
    },"请输入正整数且仓房数和油罐数不能同时为0！");
    
    $.validator.addMethod("validLength",function(value,element, params) {
    	var checkNumber = /^\w{18}$/g;  
    	return this.optional(element)||(checkNumber.test(value));  
    },"请输入18位有效编码！");
    
	$scope.save = function() {
		if (validator.form()) {
			// 行政区划
			$scope.getArea();
			orgService.saveOrg($scope.orgInfo).then(function(data) {
				if (data.status == 'success') {
                    alert("保存成功！");
                    // 定义新增或修改标记
					var cOrU = '';
                    // 在发送推送数据之前根据orgId是否为空判断新增修改
					if ($scope.orgInfo.orgId == null) {
                        // 推送数据使用 (1) 新增返回主键orgId
                        $scope.orgInfo.orgId = data.newOrgId;
                        cOrU = 'I';
					} else {
						cOrU = 'U';
					}
                    // 推送数据使用 (2)
                    //省
                    if ($scope.province) {
                        $scope.orgInfo.province = $rootScope.dicData[$scope.province];
                    }
                    //市
                    if ($scope.city) {
                        $scope.orgInfo.city = $rootScope.dicData[$scope.city];
                    }
                    WareHouseBasicInfoService.saveGrainpoint($scope.orgInfo,cOrU).then(function(data) {
                    }, function(data) {
                        console.log(data);
                    });
                }
				// 跳转到列表页
				$state.go("app.system.org", {parentId : $stateParams.parentId});
            }, function(data) {
                console.log(data);
            });
		}
	};

	// 行政区划
	$scope.getArea = function() {
		$scope.orgInfo.areaName = "";
		if ($scope.province) {
			$scope.orgInfo.areaName += $rootScope.dicData[$scope.province];
			$scope.orgInfo.areaCode = $scope.province;
		}
		if ($scope.city) {
			$scope.orgInfo.areaName += $rootScope.dicData[$scope.city];
			$scope.orgInfo.areaCode = $scope.city;
		}
		if ($scope.county) {
			$scope.orgInfo.areaName += $rootScope.dicData[$scope.county];
			$scope.orgInfo.areaCode = $scope.county;
		}
		//$scope.orgInfo.levelCode = $scope.areaMap[$scope.orgInfo.areaCode].enumcode;
	}

	// 行政区划回显
	$scope.setArea = function(areaCode) {
		var enumCode = $scope.areaMap[areaCode].enumcode;
		if(enumCode.length == 2){//只有省
			var province = $scope.areaMap[areaCode];
			$("#province").append("<option value='"+province.enumid+"'>"+province.enumname+"</option>");
			$scope.province = province.enumid;
		}else if(enumCode.length == 4){//只有省、市
			var city = $scope.areaMap[areaCode];
			var province = $scope.areaMap[city.parentid];
			$("#city").append("<option value='"+city.enumid+"'>"+city.enumname+"</option>");
			$scope.city = city.enumid;
			$("#province").append("<option value='"+province.enumid+"'>"+province.enumname+"</option>");
			$scope.province = province.enumid;
		}else if(enumCode.length == 6){//省、市、县
			var county = $scope.areaMap[areaCode];
			var city = $scope.areaMap[county.parentid];
			var province = $scope.areaMap[city.parentid];
			$("#county").append("<option value='"+areaCode+"'>"+county.enumname+"</option>");
			$scope.county = areaCode;
			$("#city").append("<option value='"+city.enumid+"'>"+city.enumname+"</option>");
			$scope.city = city.enumid;
			$("#province").append("<option value='"+province.enumid+"'>"+province.enumname+"</option>");
			$scope.province = province.enumid;
		}
		
	}

	// 文件上传实例
	$scope.uploader = new FileUploader({
		url : APP_CONFIG.basicUrl + '/fileUpload/uploadFile',
		autoUpload : true, // 将文件添加到队列后自动上传
		formData : [{fileType:'image'}], // 与文件一起发送的数据
		removeAfterUpload : true, // 从队列上传后删除文件
		// 上传进度
		onProgressItem : function(fileItem, progress) {
			console.info("正在上传：" + progress + "%");
		},
		// 回调函数，在一个文件上传成功后触发
		onSuccessItem : function(fileItem, response, status, headers) {
			var nextDiv = document.activeElement.parentNode.nextSibling;
			$scope.orgInfo[nextDiv.name] = response;
		}
	});

});

angular.module('app.system').controller("departmentCtrl",
    function($scope, $rootScope, $uibModalInstance, orgService, parentId, orgId, APP_CONFIG) {

        // 获取组织信息
        $scope.loadOrg = function() {
            orgService.editOrg(parentId).then(function(data) {
                $scope.unitInfo = data;
            }, function(data) {
                console.log(data);
            });
            orgService.editOrg(orgId).then(function(data) {
                $scope.orgInfo = data;
                $scope.orgInfo.orgClassId = 5527;
                $scope.orgInfo.parentId = parentId;
            }, function(data) {
                console.log(data);
            });
        }
        $scope.loadOrg();

        // 提交表单
        $scope.save = function() {
            var validator = $("#org-form").validate();
            if (validator.form()) {
                // 行政区划
                orgService.saveOrg($scope.orgInfo).then(function(data) {
                    alert("保存成功！");
                    // 跳转到列表页
                    $scope.cancel();
                }, function(data) {
                    console.log(data);
                });
            }
        }

        // 关闭模态窗口
        $scope.cancel = function() {
            $uibModalInstance.close();
        }

    })