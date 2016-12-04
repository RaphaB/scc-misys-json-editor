'use strict';

/**
 * @ngdoc function
 * @name jsonEditor.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jsonEditor
 */
var myModule = angular.module('jsonEditor');

myModule.controller('jsonForm', function ($scope) {
    $scope.inputs = {url: '', type: 'main', scope: [], content: []};

    $scope.keys = [];
    $scope.nbFields = 0;
    $scope.keys = [];
    $scope.obj = {};

    $scope.inputOptions = [
        {id: 'type_number', value: 'views/type_number.html', name: 'Number'},
        {id: 'type_null', value: 'views/type_null.html', name: 'Null'},
        {id: 'type_text', value: 'views/type_text.html', name: 'Long Text'},
        {id: 'type_string', value: 'views/type_string.html', name: 'String'},
        {id: 'type_boolean', value: 'views/type_boolean.html', name: 'Boolean'},
        {id: 'type_array', value: 'views/type_array.html', name: 'Array'},
        {id: 'type_object', value: 'views/type_object.html', name: 'Object'}
    ];

    $scope.fieldType = {value: $scope.inputOptions[0].value};

    $scope.initJsonEditor = function (jsonName) {
	$scope.jsonName = jsonName;
    };

    $scope.deleteOldKey = function (scope) {
	var currentScope = scope.slice();
	var currentKeyScope = createNgKeyModelFromCustom($scope, ':[' + currentScope + ']:');
	var currentKey = eval('$scope.' + currentKeyScope);
	var valueModel = createNgValueModelFromCustom($scope, ':[' + currentScope + ']:');
	var oldValueModel;

	if (currentKey === $scope.oldKey) {
	    return ;
	}
	currentScope.pop();
	if (currentScope.length === 1) {
	    oldValueModel = 'obj';
	} else {
	    oldValueModel = createNgValueModelFromCustom($scope, ':[' + currentScope + ']:');
	}
	valueModel = valueModel.replace(/keys/g, '$scope.keys');
	oldValueModel = oldValueModel.replace(/keys/g, '$scope.keys') + '[\'' + $scope.oldKey + '\']';
	if (eval('$scope.' + currentKeyScope.replace(/\[[^\]]+\]$/, "")).filter(function (item) {
	    return (item === currentKey);
	}).length === 1 && (eval('$scope.' + oldValueModel) || $scope.oldKey)) {
	    eval('$scope.' + valueModel + ' = $scope.' + oldValueModel);
	    eval('delete $scope.' + oldValueModel);
	    $scope.oldKey = currentKey;
	}
    };

    $scope.checkKey = function (scope) {
	var currentScope = scope.slice();
	var keyModel = createNgKeyModelFromCustom($scope, ':[' + scope + ']:');
	var currentKey = eval('$scope.' + keyModel);
	currentScope.pop();
	var currentKeyScope = eval('$scope.' + keyModel.replace(/\[[^\]]+\]$/, ""));

	if (currentKeyScope.filter(function (item) { return (item === currentKey);}).length > 1) {
	    eval('$scope.' + keyModel + ' = \'' + $scope.definitiveOldKey + '\'');
	    $scope.deleteOldKey(scope);
	} else {
	    $scope.definitiveOldKey = currentKey;
	}
    };

    $scope.saveOldKey = function (scope) {
	var keyModel = createNgKeyModelFromCustom($scope, ':[' + scope + ']:');

	$scope.oldKey = eval('$scope.' + keyModel);
	$scope.definitiveOldKey = $scope.oldKey;
    };

    $scope.addField = function (parent, isNext) {
	var innerContent = [];
	var newScope = parent.scope.slice();
	var type = $scope.fieldType.value.replace(/^.*type_(.+).html$/, '$1');
	var previous = $scope.keys;

	if (isNext) {
	    newScope[0] += 1;
	} else if (newScope.length === 0) {
	    newScope = [0];
	}

	for (var i = 0; i < newScope.length; ++i) {
	    if (!previous[newScope[i]]) {
		previous[newScope[i]] = [];
	    }
	    previous = previous[newScope[i]];
	}
	newScope.push(parent.content.length);

	if (!$scope.fieldType.value.match(/_(array|object).html/)) {
	    innerContent = undefined;
	}
	if (parent.type === 'array') {
	    previous[parent.content.length] = parent.content.length;
	} else {
	    var keyModel = createNgKeyModelFromCustom($scope, ':[' + newScope + ']:');
	    var keyCmd = '$scope.' + keyModel + ' = \'' + keyModel.replace(/[\[\]]/g, '') + '\'';
	    eval(keyCmd);
	}

	var valueCmd = '$scope.' + createNgValueModelFromCustom($scope, ':[' + newScope + ']:').replace(/keys/g, "$scope.keys");
	switch (type) {
	case ("array"):
	    valueCmd += ' = []';
	    break ;
	case ("object"):
	    valueCmd += ' = {}';
	    break ;
	case ("number"):
	    valueCmd += ' = 0';
	    break ;
	case ("string"):
	case ("text"):
	    valueCmd += ' = ""';
	    break ;
	case ("null"):
	    valueCmd += ' = undefined';
	    break ;
	case ("boolean"):
	    valueCmd += ' = true';
	}
	eval(valueCmd);

	parent.content.push({
	    position: parent.content.length - 1,
	    parentType: parent.type,
	    type: $scope.fieldType.value.replace(/^.*type_(.+).html$/, '$1'),
	    url: $scope.fieldType.value,
	    scope: newScope,
	    content: innerContent});
    };

    $scope.submitForm = function () {
    	if ($scope.jsonName != null)
    	{
    	    $.ajax({
    		method: "GET",
    		url: $scope.jsonName,
    		datatype :"JSON",
    		success: function (data) {
		    concatAndWriteToFile(data, $scope.obj, $scope.jsonName);
    		},
		error: function (data) {
		    concatAndWriteToFile([], $scope.obj, "new_json.json");
    		}
	    });
    	}
    	else
    	{
    	    var concat = "[" + JSON.stringify($scope.obj) + "]";
    	    var blob = new Blob([concat], {type: "text/plain;charset=utf-8"});
    	    saveAs(blob, "new_json.json");
    	}
    };
});
