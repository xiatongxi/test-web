'use strict';

angular.module('app.additionalHome', ['ui.router', 'ngResource']).config(function ($stateProvider) {
    $stateProvider
	    .state('app.additionalHome', {
	        abstract: true
	    })
	    .state('app.additionalHome.qualityCheckHome', {
	        url: '/additionalHome/qualityCheckHome', 
	        views: {
	            "content@app": {
	                controller: 'QualityCheckCtrl',
	                templateUrl: 'app/additionalHome/qualityCheckHome.html'
	            }
	        },
	        resolve:{
	            scripts: function(lazyScript){
	                return lazyScript.register('build/vendor.graphs.js');
	            }
	        }
	    })
	    .state('app.additionalHome.defendHome', {
	    	url: '/additionalHome/defendHome', 
	    	views: {
	    		"content@app": {
	    			controller: 'QualityCheckCtrl',
	    			templateUrl: 'app/additionalHome/defendHome.html'
	    		}
	    	},
	    	resolve:{
	    		scripts: function(lazyScript){
	    			return lazyScript.register('build/vendor.graphs.js');
	    		}
	    	}
	    })
	    .state('app.additionalHome.storageHome', {
	    	url: '/additionalHome/storageHome', 
	    	views: {
	    		"content@app": {
	    			controller: 'QualityCheckCtrl',
	    			templateUrl: 'app/additionalHome/storageHome.html'
	    		}
	    	},
	    	resolve:{
	    		scripts: function(lazyScript){
	    			return lazyScript.register('build/vendor.graphs.js');
	    		}
	    	}
	    })
	    .state('app.additionalHome.businessHome', {
	    	url: '/additionalHome/businessHome', 
	    	views: {
	    		"content@app": {
	    			controller: 'QualityCheckCtrl',
	    			templateUrl: 'app/additionalHome/businessHome.html'
	    		}
	    	},
	    	resolve:{
	    		scripts: function(lazyScript){
	    			return lazyScript.register('build/vendor.graphs.js');
	    		}
	    	}
	    })
	    .state('app.additionalHome.transferHome', {
	    	url: '/additionalHome/transferHome', 
	    	views: {
	    		"content@app": {
	    			controller: 'QualityCheckCtrl',
	    			templateUrl: 'app/additionalHome/transferHome.html'
	    		}
	    	},
	    	resolve:{
	    		scripts: function(lazyScript){
	    			return lazyScript.register('build/vendor.graphs.js');
	    		}
	    	}
	    })
        .state('app.additionalHome-social', {
            url: '/additionalHome-social',
            views: {
                "content@app": {
                    templateUrl: 'app/additionalHome/social-wall.html'
                }
            }
        });
});
