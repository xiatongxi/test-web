"use strict";

angular.module('app.system').controller("depotUrlCtrl",
    function($scope,$stateParams,$rootScope, depotUrlService, APP_CONFIG) {

        // 获取列表数据
        $scope.pageInfo = {pageNum : 1, pageSize : 10};
        $scope.search = {intranetUrl:"", orgName:"", updateStatus:""};
        $scope.loadData = function() {
        	depotUrlService.getPageInfo($scope.pageInfo.pageNum, $scope.pageInfo.pageSize, $scope.search.intranetUrl,
                $scope.search.orgName,$scope.search.updateStatus).then(function(data){
                $scope.pageInfo = data;
            },function(data){
                console.log(data);
            });
        }
        $scope.loadData();

        // 删除一条记录
        $scope.remove = function(id) {
            var flag = confirm("确定要删除吗？");
            console.log(flag);
            if (!flag) {
                return;
            }
            depotUrlService.deleteUrlConfig(id).then(function(data){
                // 重新加载数据
                $scope.loadData();
            },function(data){
                console.log(data);
            });
        }

        // 翻页
        $scope.goPage = function(pageNum) {
            $scope.pageInfo.pageNum = pageNum;
            $scope.loadData();
        }

        //获取用户信息
        $rootScope.urlConfig=null;
        $scope.update = function(id) {
        	depotUrlService.editUrlConfig(id).then(function(data) {
                $rootScope.urlConfig = data;
            },function(data) {
                console.log(data);
            });
        } 
        
        //导出数据
        $scope.exportTxt = function(){
        	document.getElementById('uploadDataForm').action = APP_CONFIG.systemUrl +"/urlConfig/exportTxt";
            document.getElementById("uploadDataForm").submit(function(){return false; });
        }

    });

angular.module('app.system').controller("depotUrlEditCtrl",
    function($scope, $rootScope, $state, $stateParams, depotUrlService, orgService, roleService, APP_CONFIG) {
		
		if($stateParams.id == null || $stateParams.id == ""){//新增的时候默认为库级
			$scope.urlConfig = {userType:"1"};
		}
        // 获取所有下级粮库，递归
        $scope.getChildren = function(parentId) {
            angular.forEach($scope.orglist, function(item, index) {
                if (item.parentId == parentId) {
                    if (item.orgClassId==5318) {
                        $scope.depotlist.push(item);
                    }
                    $scope.getChildren(item.orgId);
                }
            });
        }

        // 提交表单
        var validator = $("#depotUrl-form").validate();
        $scope.save = function() {
            if (validator.form()) {
                // 组织编号
                if ($scope.urlConfig.orgId == null || $scope.urlConfig.orgId == '') {
                    $scope.urlConfig.orgId = $scope.parentOrgId;
                }
                $scope.userOrg=angular.fromJson($scope.urlConfig.orgId);
                $scope.urlConfig.orgId=$scope.userOrg[0].id;
                $scope.urlConfig.people = $rootScope.userInfo.userId;
                
                depotUrlService.saveUrlConfig($scope.urlConfig).then(function(data) {
                    alert("保存成功！");
                    // 跳转到列表页
                    $state.go("app.system.depotUrl");
                }, function(data) {
                    console.log(data);
                });
            }
        }
        
        // 自定义验证url是否重复
        $.validator.addMethod("validIntranetUrl", function(value, element) {
            var result = false;
            // 设置同步
            $.ajaxSetup({
                async: false
            });
            var param = {
            	intranetUrl : value,
            	id : $scope.urlConfig.id
            };
            $.get(APP_CONFIG.systemUrl + '/urlConfig/validIntranetUrl', param, function(data){
                result = data;
            });
            // 恢复异步
            $.ajaxSetup({
                async: true
            });
            return result;
        }, "url已被使用，请重新输入");

        //下拉框(所属组织)
        $rootScope.data1 = [];
        $scope.getOrgData=function() { 
            orgService.getTreeListByOrgId().then(function(data) {
                $scope.orglist = data.orgList;
                $scope.orgId = data.orgId;
                for (var i = 0; i < $scope.orglist.length; i++) {
                    if ($scope.orglist[i].id == $scope.orgId) {
                        // 当前为根.
                        var obj = {
                            id: $scope.orglist[i].id,
                            name: $scope.orglist[i].name,
                            children: [],

                        };
                        if($rootScope.urlConfig != null && $scope.orgId==$rootScope.urlConfig.orgId){
                            obj.selected=true;
                        }
                        for (var j = 0; j < $scope.orglist.length; j++) {
                            if ($scope.orglist[j].parentId == $scope.orgId) {
                                var obj2 = {
                                    id: $scope.orglist[j].id,
                                    name: $scope.orglist[j].name,
                                    children: [],
                                };
                                if($rootScope.urlConfig != null && $scope.orglist[j].id==$rootScope.urlConfig.orgId){
                                    obj2.selected=true;
                                }
                                obj.children.push(obj2);
                                $scope.getChildrens(obj2, $scope.orglist[j].id, $scope.orglist);
                            }
                        }

                        $scope.data1.push(obj);
                        break;
                    }
                }
                $scope.data2 = angular.copy($scope.data1);
            },function(data){
                console.log(data);
            });
        }
        $scope.getOrgData();
        $scope.getChildrens = function(obj, id, orglist) {
            for (var j = 0; j < orglist.length; j++) {
                if (orglist[j].parentId == id) {
                    var obj2 = {
                        id: orglist[j].id,
                        name: orglist[j].name,
                        children: [],
                    };
                    if($rootScope.urlConfig != null && orglist[j].id==$rootScope.urlConfig.orgId){
                        obj2.selected=true;
                    }
                    obj.children.push(obj2);
                    $scope.getChildrens(obj2, orglist[j].id, orglist);
                }
            }
        }

        $scope.selectOnly1Or2 = function(item, selectedItems) {
            if (selectedItems  !== undefined && selectedItems.length >= 20) {
                return false;
            } else {
                return true;
            }
        };

        //返回和取消
        $scope.back = function() {
            if ($rootScope.previousState_name != '') {
                $rootScope.back();
            } else {
                $state.go("app.system.depotUrl");
            }
        }
    });

