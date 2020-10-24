angular.module('app.business').controller("choiceAuditUserModalCtrl", function($scope, $http, $state, $uibModalInstance, APP_CONFIG, items,$rootScope) {
    // 提交审批状态("0"待提交,"1"审批中,"2"审批结束,"3"审批驳回,"4"审批拒绝.)
    if (items.auditState === '0' || items.auditState === '3')
        $scope.realName = '仓储部经理';
    else if (items.processDefinitionId === null || items.processDefinitionId === '员工提交') // 员工提交经理审批
        $scope.realName = '库领导';
    else
        $scope.realName = '仓储部经理';

	$scope.returnResult = [];
    // items为上一个模态窗穿过来的中是 processInstanceId 和  auditResult.
    // 获取列表数据
    $scope.userList=[];
    $scope.loadData = function() {
        // 需要的参数是流程实例id.
        $http({
            method: 'GET',
            url: APP_CONFIG.systemUrl + '/userInfo/getAuditUser',
            params: {
                roleName : $scope.realName,
                orgId : $rootScope.orgInfo.orgId
            }
        }).then(function(data){
            $scope.userList = data;
        }, function(data) {
            // 请求失败执行代码
            console.log(data);
        });
    };
    $scope.loadData();

    // 关闭模态窗口
    $scope.cancel = function() {
    	$scope.returnResult.returnType = "cancel";
        // close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
        $uibModalInstance.close($scope.returnResult);
    };
    
    // 选择审批人.
    $scope.choiceUser = function(assignee) {
    	/*if (assignee == null || assignee == undefined || assignee == '') {
    	    if (confirm("请选择审批人")) {
                $scope.choiceUser('0');
            }
                return;
    	}*/
        if (assignee == null || assignee == undefined || assignee == '') {
            alert("请选择审批人！");
            return;
        }
    	$scope.returnResult.returnType = "submit";
    	$scope.returnResult.assignee = assignee;
        // 关闭模态窗.
        $uibModalInstance.close($scope.returnResult);
    }
});