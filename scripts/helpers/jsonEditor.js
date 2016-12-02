'use strict';

function createNgKeyModelFromCustom($scope, attr) {
    var indexes = attr.replace(/:\[[^,]+,|\]:/g, '').split(',');
    var keyModel = 'keys[' + (indexes.length - 1) + '][' + indexes.join('][') + ']';

    return keyModel;
}

function createNgValueModelFromCustom($scope, attr) {
    var indexes = attr.replace(/:\[[^,]+,|\]:/g, '').split(',').map(function (n) {
	return ((!n) ? 'undefined' : parseInt(n));
    });
    var keys = [];
    var previous = [];

    for (var i = 0; i < indexes.length; ++i) {
	previous.push(indexes[i]);
	keys.push('keys[' + i + '][' + previous.join('][') + ']');
    }
    return 'obj[' + keys.join('][') + ']';
}
