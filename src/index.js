/* eslint-disable no-console */
(function() {
  const directives = {};

  const smallAngular = {
    directive(name, callback) {
      if (typeof callback !== 'function') {
        throw new Error('Callback must be a function!');
      }

      if (name in directives) {
        throw new Error('Multiple directives are not allowed!');
      }

      directives[name] = callback;
    },
    compile(node) {
      node.getAttributeNames().forEach(name => {
        if (name in directives) {
          directives[name](node);
        }
      });
    },
    bootstrap(node) {
      const nodeElem = node ? node : document.querySelector('*[ng-app]');
      this.compile(nodeElem);
      nodeElem.querySelectorAll('*').forEach(el => {
        this.compile(el);
      });
    }
  };

  smallAngular.directive('ng-show', function(el) {
    console.log('calls directive ng-show on element', el);
  });
  smallAngular.directive('ng-hide', function(el) {
    console.log('calls directive ng-hide on element', el);
  });
  smallAngular.directive('ng-model', function(el) {
    console.log('calls directive ng-model on element', el);
  });
  smallAngular.directive('ng-click', function(el) {
    console.log('calls directive ng-click on element', el);
  });
  smallAngular.directive('ng-uppercase', function(el) {
    console.log('calls directive ng-uppercase on element', el);
  });

  window.smallAngular = smallAngular;
})();

window.onload = () => {
  window.smallAngular.bootstrap();
};