/* eslint-disable no-console */
(function() {
  const directives = {};

  function findInitialNode() {
    const arrOfAllNodes = Array.from(document.querySelectorAll('*'));

    return arrOfAllNodes.find(node => {
      return node.hasAttribute('ng-app');
    });
  }

  const smallAngular = {
    directive(name, callback) {
      if (typeof callback !== 'function') {
        throw new Error('Callback must be a function!');
      }

      directives[name] = callback;
    },
    compile(node) {
      const attrs = [...node.attributes];
      attrs.forEach(({ name }) => {
        if (name in directives) {
          directives[name](node);
        }
      });
    },
    bootstrap(node) {
      const nodeElem = node ? node : findInitialNode();

      if (node) {
        nodeElem.setAttribute('ng-app', '');
      }
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