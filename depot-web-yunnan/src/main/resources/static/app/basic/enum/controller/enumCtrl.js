angular.module('app.basic')
	.controller("enumCtrl", function($scope, $rootScope, enumService, permissions, FileUploader, APP_CONFIG) {

    // 获取数据字典大类列表数据
    $scope.loadData = function() {
        $scope.diclist = new Array();
    	for (var key in $rootScope.dicDataList) {
            angular.forEach($rootScope.dicDataList[key], function (item, index) {
                item.parentId = item.parentid;
                $scope.diclist.push(item);
            });
        }
        // 构建功能等级
        $scope.fillLevel(0, 0);
        // 构建树表格
        $scope.drawTable();
    }

    // 通过递归给功能赋等级
    $scope.fillLevel = function(parentId, level) {
        angular.forEach($scope.diclist, function(item, index) {
            if (item.parentid == parentId) {
                item.level = level;
                $scope.fillLevel(item.enumid, level+1);
            }
        });
    }

    // 新增或者修改数据字典信息跳转到录入页面
    $scope.edit = function(id, parentid) {
		enumService.edit(id).then(function(data){
            $scope.basicEnum = data;
            $scope.basicEnum.parentid = parentid;
        },function(data){
            console.log(data);
        });

        // 显示弹出层
        $("#enumModel").modal("show");
    }

    // 提交表单
    $scope.save = function() {
        var addedEnum = null;
    	var validator = $("#basicEnum-form").validate();
    	if (validator.form()) {
	    	enumService.save($scope.basicEnum).then(function(data){
	    		if (data.status == 'success') {
	    			alert("保存成功！");
                    addedEnum = data.basicEnum;
	    		} else {
	                alert("保存失败！");
	            }
	    		
	    		// 关闭弹出层
	            $("#enumModel").modal("hide");
	    		// 更新缓存
                if ($scope.basicEnum.enumid) {
                    angular.forEach($rootScope.dicDataList[$scope.basicEnum.parentid], function (item, index) {
                        if (item.enumid == $scope.basicEnum.enumid) {
                            item = $scope.basicEnum;
                        }
                    })
                } else {
                    $rootScope.dicDataList[$scope.basicEnum.parentid].push(addedEnum);
                }
                sessionStorage.setItem("enumData", angular.toJson($rootScope.dicDataList));
                // 重置弹出层数据
                $scope.basicEnum = {};
                // 重新加载数据
                $scope.loadData();
	        },function(data){
	            console.log(data);
	        });
    	}
    }

    // 删除一条记录
    $scope.remove = function(id, parentid) {
        if (!confirm("确定要删除吗？")) {
            return;
        }

        enumService.remove(id).then(function(data){
        	if (data.status == 'success') {
                angular.forEach($rootScope.dicDataList[parentid], function (item, index) {
                    if (item.enumid == id) {
                        $rootScope.dicDataList[parentid].splice(index, 1);
                    }
                })
                sessionStorage.setItem("enumData", angular.toJson($rootScope.dicDataList));
                // 重新加载数据
        		$scope.loadData();
            } else {
                alert("删除失败！");
            }
        },function(data){
            console.log(data);
        });
    }

    // 操作列按钮
    function operateFormatter(value, row, index) {
        var btns = [
            '<a href="javascript:void(0)" id="add"><i class="fa fa-edit"></i> 添加子项</a>&nbsp;',
        ];
        if (permissions.hasPermission(173)) {
            btns.push('<a href="javascript:void(0)" id="edit"><i class="fa fa-edit"></i> 修改</a>&nbsp;');
        }
//        if (permissions.hasPermission(300)) {
//            btns.push('<a href="javascript:void(0)" id="delete"><i class="fa fa-trash-o"></i> 删除</a>&nbsp;');
//        }
        return btns;
    }

    // 为操作列按钮绑定事件
    window.operateEvents = {
        'click #add': function (e, value, row, index) {
            $scope.edit(null, row.enumid);
        },
        'click #edit': function (e, value, row, index) {
            $scope.edit(row.enumid, row.parentid);
        }
//        'click #delete': function (e, value, row, index) {
//            $scope.remove(row.enumid, row.parentid);
//        }
    };

    // 生成表格树
    $scope.drawTable = function() {
        $("#tb").bootstrapTable('destroy');
        $('#tb').bootstrapTable({
            data: $scope.diclist,	//数据源，必须包含parentId属性
            treeView: true,
            treeCollapseAll: true,//是否全部展开又
            treeId: "enumid",
            treeField: "enumname",
            formatLoadingMessage: function () {
                return "";
            },
            columns: [{
                field: 'enumid',
            }, {
                field: 'enumname',
            }, {
                field: 'enumcode',
            }, {
                field: 'gbcode',
            }, {
                events: operateEvents,
                formatter: operateFormatter
            }]
        })
    }

    $scope.loadData();

    // 文件上传实例
    $scope.uploader = new FileUploader({
        url : APP_CONFIG.basicUrl + '/Enum/importFile',
        autoUpload : true, // 将文件添加到队列后自动上传
        formData : [{fileType:'xlsx'}], // 与文件一起发送的数据
        removeAfterUpload : true, // 从队列上传后删除文件
        // 上传进度
        onProgressItem : function(fileItem, progress) {
            // $scope.jd = progress + "%";
            console.info("正在上传：" + progress + "%");
        },
        // 回调函数，在一个文件上传成功后触发
        onSuccessItem : function(fileItem, response, status, headers) {
        	//console.log(response);
        	if(fileItem.isSuccess && response == ''){
                alert("导入成功");
            } else {
            	alert(response);
            }
            $scope.loadData();
        }
    });

});
