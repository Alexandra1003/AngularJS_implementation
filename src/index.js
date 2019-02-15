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
      const nodeElem = node || document.querySelector('[ng-app]');
      this.compile(nodeElem);
      nodeElem.querySelectorAll('*').forEach(this.compile);
    }
  };

  smallAngular.directive('ng-show', function(scope, el) {
    const data = el.getAttribute('ng-show');
    el.style.display = eval(data) ? 'block' : 'none';
    scope.$watch('ng-show', () => {
      el.style.display = eval(data) ? 'block' : 'none';
    });
  });

  smallAngular.directive('ng-hide', function(scope, el) {
    const data = el.getAttribute('ng-hide');
    el.style.display = eval(data) ? 'none' : 'block';
    scope.$watch('ng-hide', () => {
      el.style.display = eval(data) ? 'none' : 'block';
    });
  });

  smallAngular.directive('ng-bind', function(scope, el) {
    const data = el.getAttribute('ng-bind');

    if (data in scope) {
      el.innerHTML = scope[data];
      scope.$watch('ng-bind', () => {
        el.innerHTML = scope[data];
      });
    }
  });

  smallAngular.directive('ng-init', function(scope, el) {
    const data = el.getAttribute('ng-init');
    eval(data);
  });

  smallAngular.directive('ng-click', function(scope, el) {
    el.addEventListener('click', () => {
      const data = el.getAttribute('ng-click');
      eval(data);
      scope.$apply();
    });
  });

  smallAngular.directive('ng-model', function(scope, el) {
    const data = el.getAttribute('ng-model');
    el.addEventListener('input', () => {
      if (data in scope) {
        scope[data] = el.value;
        scope.$apply();
      }
    });
  });

  window.smallAngular = smallAngular;
})();

window.smallAngular.directive('make-short', function(scope, el) {
  const length = el.getAttribute('length') || 10;

  el.innerText = `${el.innerText.substr(0, length)}...`;
  scope.$watch('make-short', () => {
    el.innerText = `${el.innerText.substr(0, length)}...`;
  });
});

window.smallAngular.directive('random-color', function(scope, el) {
  el.addEventListener('click', function() {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    el.style.backgroundColor = randomColor;
  });
});

window.onload = () => {
  window.smallAngular.bootstrap();
};