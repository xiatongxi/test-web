'use strict';

angular.module('app.system').directive('hasFunc', function(permissions) {  
  return {  
    link: function(scope, element, attrs) {   
   
      var value = attrs.hasFunc;  
   
      function toggleVisibilityBasedOnFunc() {  
        var hasFunc = permissions.hasFunc(value);  
   
        if(hasFunc)  
          element.show();  
        else  
          element.hide();  
      }  
      if (value) {
          toggleVisibilityBasedOnFunc();  
      }
      scope.$on('funcChanged', toggleVisibilityBasedOnFunc);  
    }  
  };  
});  