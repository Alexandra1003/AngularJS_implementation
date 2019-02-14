/* eslint-disable no-eval */
/* eslint-disable no-console */
(function() {
  const directives = {};
  const watchers = [];
  const rootScope = window;

  rootScope.$watch = (name, watcher) => {
    watchers.push({ name, watcher });
  };

  rootScope.$apply = () => {
    watchers.forEach(({ watcher }) => watcher());
  };

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
          directives[name](rootScope, node, null);
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

  smallAngular.directive('ng-show', function(scope, el, attrs) {
    const data = el.getAttribute('ng-show');
    el.style.display = eval(data) ? 'block' : 'none';
    scope.$watch(data, () => {
      el.style.display = eval(data) ? 'block' : 'none';
    });
  });
  smallAngular.directive('ng-hide', function(el) {
    console.log('calls directive ng-hide on element', el);
  });
  smallAngular.directive('ng-model', function(el) {
    console.log('calls directive ng-model on element', el);
  });
  smallAngular.directive('ng-click', function(scope, el, attrs) {
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