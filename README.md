# AngularJS_implementation
Create partial implementation of AngularJS directives
### Getting started
- clone this repository
```bash
- npm install
- npm start
```
### Description
In this app you may use such directives:
* ng-show - shows or hides an element due to the value of argument;
```HTML
    <div ng-show="true"> Hello World! </div>
```
* ng-hide - shows or hides an element due to the value of argument;
```HTML
    <div ng-hide="true"> Hello World! </div>
```
* ng-bind - takes data from scope and puts it into HTML;
```HTML
    <button ng-bind="surname"></button>
```
* ng-init - puts data into the scope;
```HTML
    <body ng-app ng-init="surname = 'Surname1'; name ='Name'">
```
* ng-click - executes value of this directive on click event;
```HTML
    <button ng-click='surname = "Surname2"'></button>
```
* ng-model - connects input value with the value of variable in scope;
```HTML
    <input ng-model="name" />
```
* ng-repeat - creates instances for each element in collection according to template;
```HTML
    <li ng-repeat="letter in name"></li>
```
* make-short - cuts the length of text due to the 'length' attribute;
```HTML
    <p make-short>Make short and so on</p>
```
* random-color - changes background color of element in random way on click;
```HTML
    <div random-color> Click to change color. </div>
```
* uppercase - makes the text uppercase;
```HTML
    <p uppercase>Make uppercase</p>
```

If you want to create your own directive, call 'directive' method with the name ot the directive and callback with the main logics.
