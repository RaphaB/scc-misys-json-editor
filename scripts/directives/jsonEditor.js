'use strict';

var myModule = angular.module('jsonEditor');

myModule.directive('ngKeyModel', function ($compile) {
    return {
	compile: function(element, attr) {
	    element[0].removeAttribute('ng-key-model');
	    return function($scope) {
		var model = createNgKeyModelFromCustom($scope, attr.ngKeyModel);

		element[0].setAttribute('ng-model', model);
		$compile(element[0])($scope);
	    };
	}
    };
});

myModule.directive('ngValueModel', function ($compile) {
    return {
	compile: function(element, attr) {
	    element[0].removeAttribute('ng-value-model');
	    return function($scope) {
		element[0].setAttribute('ng-model', createNgValueModelFromCustom($scope, attr.ngValueModel));
		$compile(element[0])($scope);
	    };
	}
    };
});
