'use strict';


angular.module('app.system')
    .controller('depotProfileCtrl', function($scope, $rootScope, depotImageService, APP_CONFIG) {

        $scope.depotInfo = $rootScope.orgInfo;

        $scope.loadData = function() {
            depotImageService.getByOrgId($scope.depotInfo.orgId).then(function(data) {
                $scope.imagelist = data;
            })
        }
        $scope.loadData();

    });