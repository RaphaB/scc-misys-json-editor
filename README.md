SCC Misys JSON Editor - Angular Module for json editing
=======================================================

How to
------

### Install

  You can install the package via **[Bower](https://bower.io/)** :
 
```
bower install scc-misys-json-editor
```

### Include in code

  - Add the call to ng-app **jsonEditor**, to ng-controller **jsonForm**. This should give :

```html
<div ng-app="jsonEditor">
  <div ng-controller="jsonForm">
    <!-- Do stuff here -->
  </div>
</div>
```

  - Include the view __main.html__. You can either include it in same container than controller, or any child within :

```html
<!-- If you used bower to install, it should give this -->
<div ng-include="/bower_components/scc-misys-json-editor/views/">
</div>
```

  - To pass your JSON file name you can either, call the function **initJsonEditor** :
  
```html
<!-- For example : ng-init call in ng-include div -->
<div ng-init="initJsonEditor('your_json_name.json')" ng-include="/bower_components/scc-misys-json-editor/views/">
</div>
``` 

  - Or directly set the variable **jsonName** :
  
```html
<!-- For example : input bound to jsonName to -->
<input ng-model="jsonName" placeholder="Enter you file name here">
<div ng-include="/bower_components/scc-misys-json-editor/views/">
</div>
```

### Customize it

  Rendered template have no base style, customize it as you want :) . Classes and Ids available in code.

Dependancies
------------

In order to run correctly, **scc-misys-json-editor** need certain packages (they are automatically installed using **[Bower](https://bower.io/)**):

  - **[jQuery](https://github.com/jquery/jquery)**
  - **[FileSaver](https://github.com/eligrey/FileSaver.js/)**
  - **[Blob](https://github.com/eligrey/Blob.js/)**
