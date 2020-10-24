'use strict';


angular.module('app.system')
    .controller('profileCtrl', function($scope, $state, $stateParams, depotImageService, orgService,  FileUploader, APP_CONFIG) {

        $scope.depotImages = [];
        $scope.briefIntroduction = "";

        var uploader = $scope.uploader = new FileUploader({
            url : APP_CONFIG.basicUrl + '/fileUpload/uploadFile',
            formData : [{fileType:'image'}], // 与文件一起发送的数据
            // autoUpload : true, // 将文件添加到队列后自动上传
        });

        // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            fileItem.imgUrl = response;
            $scope.depotImages.push(response);
        };

        $scope.save = function() {
            depotImageService.save($stateParams.orgId, $scope.depotImages).then(function(data) {
                if (data.status == 'success') {
                    orgService.updateIntroduction($stateParams.orgId, $scope.briefIntroduction).then(function(data) {
                        if (data.status == 'success') {
                            alert("保存成功");
                            $state.go("app.system.org");
                        }
                    })
                }
            })
        }

    });