'use strict';

angular.module('app.system').directive('hasBotton', function(permissions) {  
  return {  
    link: function(scope, element, attrs) {   
   
      var value = attrs.hasBotton;  
   
      function toggleVisibilityBasedOnBotton() {  
        var hasBotton = permissions.hasBotton(value);  

        if(hasBotton)  
          element.show();  
        else  
          element.hide();  
      }  
      if (value) {
          toggleVisibilityBasedOnBotton();  
      }
      scope.$on('bottonChanged', toggleVisibilityBasedOnBotton);  
    }  
  };  
});  