'use strict';

angular.module('SmartAdmin.Forms').directive('smartTimepicker', function () {
    return {
        restrict: 'A',
        compile: function (tElement, tAttributes) {
            tElement.removeAttr('smart-timepicker data-smart-timepicker');

            var options = {
                showMeridian: false,
                showSeconds: true,
                defaultTime: '13:25:15'
            };

            tElement.timepicker(options);
        }
    }
});
