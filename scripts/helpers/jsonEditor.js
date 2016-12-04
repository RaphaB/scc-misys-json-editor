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

function concatAndWriteToFile (data, obj, jsonName) {
    var concat;

    if (data != "") {
	if (data instanceof Array) {
	    data.push(obj);
	    concat = JSON.stringify(data);
	} else {
	    concat = "[" + JSON.stringify(data) + "," + JSON.stringify(obj) + "]";
	}
    }
    else {
    	concat = "[" + JSON.stringify(obj) + "]";
    }
    var blob = new Blob([concat], {type: "text/plain;charset=utf-8"});
    saveAs(blob, jsonName);
}
