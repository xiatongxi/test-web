"use strict";

angular.module('app.system').controller("buttonCtrl", 
	function($scope, $uibModalInstance, funcId, buttonService, APP_CONFIG) {

	 // 获取列表数据
	 $scope.loadData = function() {
		 buttonService.getPageInfo(funcId).then(function(data){
	         $scope.pageInfo = data;
	     },function(data){
	         console.log(data);
	     });
	 }
	 $scope.loadData();

	 // 获取一个空对象，用于新增行
	 buttonService.editButton().then(function(data){
		 $scope.blankButton = data;
		 $scope.blankButton.funcId = funcId;
     },function(data){
         console.log(data);
     });
     // 用于存放新增的数据
     $scope.addedButton = [];
     
     // 新增一行
     $scope.addRow = function() {
    	 $scope.addedButton.push(angular.copy($scope.blankButton));
     }
     
     // 删除一行
     $scope.deleteRow = function(button) {
    	 var index = $scope.addedButton.indexOf(button);
    	 if (index != -1) {
    		 $scope.addedButton.splice(index, 1);
    	 }
     }
	 
	 // 删除一条记录
	 $scope.delete = function(btnId) {
		 if (!confirm("确定要删除吗？")) {
			 return;
		 }
		 buttonService.deleteButton(btnId).then(function(data){
			 // 重新加载数据
			 $scope.loadData();
	     },function(data){
	         console.log(data);
	     });
	 }
	 
	 // 修改一条记录
	 $scope.edit = function(btnId) {
		 //把当前列改成可编辑样式
		 if($("#"+btnId).html() == "<i class=\"fa fa-edit\"></i>修改"){//点击修改
			 //第四行
			 var val = $("#"+btnId).parent().prev().html();
			 var str = "<input type='text' style='width:100%' value='"+val+"'>";
			 $("#"+btnId).parent().prev().html(str);
			 //第三行
			 var val1 = $("#"+btnId).parent().prev().prev().html();
			 var str1 = "<input type='text' style='width:100%' value='"+val1+"'>";
			 $("#"+btnId).parent().prev().prev().html(str1);
			 //第二行
			 var val2 = $("#"+btnId).parent().prev().prev().prev().html();
			 var str2 = "<input type='text' style='width:100%' value='"+val2+"'>";
			 $("#"+btnId).parent().prev().prev().prev().html(str2);
			 $("#"+btnId).html("<i class=\"fa fa-edit\"></i>保存");
		 }else{//点击保存 
			 var val = $("#"+btnId).parent().prev().children().val();
			 var val1 = $("#"+btnId).parent().prev().prev().children().val();
			 var val2 = $("#"+btnId).parent().prev().prev().prev().children().val();
			 $scope.editInfo = {btnId : btnId, funcId : funcId, btnName : val2, btnUrl : val1, remark : val};
			 $scope.editButtonInfo = [];
			 $scope.editButtonInfo.push(angular.copy($scope.editInfo));
			 buttonService.saveButton($scope.editButtonInfo).then(function(data){
				 //第四行
				 $("#"+btnId).parent().prev().html(val);
				 //第三行
				 $("#"+btnId).parent().prev().prev().html(val1);
				 //第二行
				 $("#"+btnId).parent().prev().prev().prev().html(val2);
				 $("#"+btnId).html("<i class=\"fa fa-edit\"></i>修改");
			 },function(data){
				 console.log(data);
			 });
		 }
	 }
	 
	 // 提交保存
	 $scope.save = function() {
		 // 遍历，筛选掉空数据。从末尾开始遍历，如从头开始遍历，则会出现错误
		 for (var i=$scope.addedButton.length-1; i>=0; i--) {
			 if ($scope.addedButton[i].btnName==null || $scope.addedButton[i].btnName=='') {
				 $scope.addedButton.splice(i, 1);
			 }
		 }
		 // 提交
		 if ($scope.addedButton.length) {
			 buttonService.saveButton($scope.addedButton).then(function(data){
				 // 关闭模态窗
				 $uibModalInstance.close();
		     },function(data){
		         console.log(data);
		     });
		 }
	 }

	// 关闭模态窗口
	$scope.cancel = function() {
		$uibModalInstance.close();
	}
	 
});