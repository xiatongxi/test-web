'use strict';

angular.module('app.system').directive('treeView', [ function() {

	return {
		restrict : 'E',
		templateUrl : '/treeView.html',
		scope : {
			treeData : '=',
			btnData : '=',
			canChecked : '=',
			textField : '@',
			valueField : '@',
			btnClicked : '&',
			itemClicked : '&',
			itemCheckedChanged : '&',
			itemTemplateUrl : '@'
		},
		controller : [ '$scope', function($scope) {
			$scope.itemExpended = function(item, $event) {
				item.isExpend = !item.isExpend;
				$event.stopPropagation();
			};

			$scope.getItemIcon = function(item) {
				var isLeaf = $scope.isLeaf(item);

				if (isLeaf) {
					return 'fa fa-leaf';
				}

				return item.isExpend ? 'fa fa-minus-circle' : 'fa fa-plus-circle';
			};

			$scope.isLeaf = function(item) {
				return !item.children || !item.children.length;
			};

			$scope.warpCallback = function(callback, item, $event) {
				($scope[callback] || angular.noop)({
					$item : item,
					$event : $event
				});
			};
		} ]
	};
}]);